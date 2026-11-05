//! Chunked game downloader + install-state detection (port of `download_game`,
//! `repair_game`, `update_game`, `readInstallState`, `readRemoteVersion`).

use crate::data::Game;
use crate::platform::{build_local_path, current_platform, normalize_path};
use serde::Deserialize;
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;

const BASE_DOWNLOAD_URL: &str = "https://download.nytuo.fr";

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Mode {
    Install,
    Repair,
    Update,
}

#[derive(Deserialize)]
struct ManifestFile {
    path: String,
    chunks: Vec<String>,
}

#[derive(Deserialize)]
struct Manifest {
    version: String,
    files: Vec<ManifestFile>,
}

fn capitalize(s: &str) -> String {
    let mut c = s.chars();
    match c.next() {
        None => String::new(),
        Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
    }
}

/// Tries the same URL variants as the original launcher (the server is case sensitive).
fn fetch_manifest(game_id: &str, platform: &str) -> Result<(Manifest, String), String> {
    let games = [game_id.to_string(), game_id.to_uppercase(), game_id.to_lowercase()];
    let platforms = [
        platform.to_string(),
        capitalize(platform),
        platform.to_lowercase(),
        platform.to_uppercase(),
    ];
    let mut candidates = Vec::new();
    for g in &games {
        for p in &platforms {
            candidates.push(format!("{BASE_DOWNLOAD_URL}/{g}/{p}/manifest.json"));
        }
    }
    for g in &games {
        candidates.push(format!("{BASE_DOWNLOAD_URL}/{g}/manifest.json"));
    }

    let mut last_err = String::new();
    for url in candidates {
        match ureq::get(&url).call() {
            Ok(resp) => {
                let text = resp.into_string().map_err(|e| e.to_string())?;
                let t = text.trim_start();
                if !t.starts_with('{') && !t.starts_with('[') {
                    last_err = format!("{url} -> unexpected body");
                    continue;
                }
                let manifest: Manifest = serde_json::from_str(&text).map_err(|e| e.to_string())?;
                return Ok((manifest, text));
            }
            Err(e) => last_err = format!("{url} -> {e}"),
        }
    }
    Err(format!("Failed to fetch valid manifest. Last error: {last_err}"))
}

fn needs_download(path: &Path) -> bool {
    std::fs::metadata(path).map(|m| m.len() == 0).unwrap_or(true)
}

pub struct Progress {
    pub downloaded: u64,
    pub total: u64,
}

/// Runs one install / repair / update. `on_progress` is called once per downloaded chunk.
pub fn run_job(
    mode: Mode,
    game_id: &str,
    install_path: &str,
    mut on_progress: impl FnMut(Progress),
) -> Result<(), String> {
    let platform = current_platform();
    let (manifest, manifest_text) = fetch_manifest(game_id, platform)?;
    let repo = game_id.to_uppercase();

    let full = match mode {
        Mode::Install => true,
        Mode::Repair => false,
        Mode::Update => {
            // Same version already installed -> only fill in what is missing.
            std::fs::read_to_string(normalize_path(&format!("{install_path}/manifest.json")))
                .ok()
                .and_then(|t| serde_json::from_str::<Manifest>(&t).ok())
                .map(|local| local.version != manifest.version)
                .unwrap_or(true)
        }
    };

    let files: Vec<&ManifestFile> = manifest
        .files
        .iter()
        .filter(|f| full || needs_download(&build_local_path(install_path, &f.path)))
        .collect();
    let total: u64 = files.iter().map(|f| f.chunks.len() as u64).sum();
    let mut done: u64 = 0;
    on_progress(Progress { downloaded: 0, total });

    std::fs::create_dir_all(normalize_path(install_path)).map_err(|e| e.to_string())?;

    for file in files {
        let local = build_local_path(install_path, &file.path);
        if let Some(parent) = local.parent() {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
        let mut out = File::create(&local).map_err(|e| format!("{}: {e}", local.display()))?;
        for chunk in &file.chunks {
            let url = format!("{BASE_DOWNLOAD_URL}/{repo}/{platform}/chunks/{chunk}");
            let resp = ureq::get(&url).call().map_err(|e| format!("{url} -> {e}"))?;
            std::io::copy(&mut resp.into_reader(), &mut out).map_err(|e| e.to_string())?;
            done += 1;
            on_progress(Progress { downloaded: done, total });
        }
    }

    // Written last so an interrupted install never looks installed.
    if mode != Mode::Repair || !normalize_path(install_path).join("manifest.json").exists() {
        std::fs::write(normalize_path(install_path).join("manifest.json"), manifest_text)
            .map_err(|e| e.to_string())?;
    }
    Ok(())
}

// ------------------------------------------------------------ install state

/// Installed state of one game: `manifest.json` first, `*_Version.txt` files as legacy fallback.
pub fn read_install_state(game: &Game, game_path: &str) -> (bool, Option<String>) {
    let dir = format!("{game_path}/{}", game.id);
    let manifest_path = normalize_path(&format!("{dir}/manifest.json"));
    if let Some(v) = std::fs::read_to_string(&manifest_path)
        .ok()
        .and_then(|t| serde_json::from_str::<serde_json::Value>(&t).ok())
        .and_then(|v| v.get("version").and_then(|v| v.as_str()).map(|s| s.trim().to_string()))
        .filter(|v| !v.is_empty())
    {
        return (true, Some(v));
    }

    let upper = game.id.to_uppercase();
    let mut candidates = Vec::new();
    if let Some(vf) = game.version_file.as_deref().map(str::trim).filter(|s| !s.is_empty()) {
        candidates.push(vf.to_string());
    }
    candidates.push(format!("{upper}_Version.txt"));
    candidates.push(format!("Version{upper}.txt"));
    for c in candidates {
        let p = normalize_path(&format!("{dir}/{c}"));
        if p.exists() {
            let v = std::fs::read_to_string(&p).ok().map(|s| s.trim().to_string());
            return (true, v);
        }
    }
    (false, None)
}

/// Latest published version: manifest on the download server, then the GitHub txt fallback.
pub fn read_remote_version(game: &Game) -> Option<String> {
    let ok = |v: &str| !v.is_empty() && !v.chars().any(char::is_whitespace);
    if let Ok((m, _)) = fetch_manifest(&game.id, current_platform()) {
        let v = m.version.trim().to_string();
        if ok(&v) {
            return Some(v);
        }
    }
    if let (Some(repo), Some(vf)) = (&game.repo, &game.version_file) {
        let url = format!("https://raw.githubusercontent.com/Nytuo/{repo}/master/Windows/{vf}");
        if let Ok(resp) = ureq::get(&url).call() {
            if let Ok(t) = resp.into_string() {
                let v = t.trim().to_string();
                if ok(&v) {
                    return Some(v);
                }
            }
        }
    }
    None
}

// -------------------------------------------------- "creations" installers

pub struct ReleaseAsset {
    pub name: String,
    pub url: String,
}

/// Best installer asset on a GitHub repo's latest release for this platform.
pub fn fetch_latest_release_asset(github_url: &str) -> Option<ReleaseAsset> {
    let rest = github_url.split("github.com/").nth(1)?;
    let mut parts = rest.split('/');
    let (owner, repo) = (parts.next()?, parts.next()?.trim_end_matches(".git"));
    let json: serde_json::Value = ureq::get(&format!("https://api.github.com/repos/{owner}/{repo}/releases/latest"))
        .set("User-Agent", "nytuo-launcher")
        .call()
        .ok()?
        .into_json()
        .ok()?;
    let assets = json.get("assets")?.as_array()?;
    let priority: &[&str] = match current_platform() {
        "windows" => &[".exe", ".msi"],
        "macos" => &[".dmg", ".pkg"],
        _ => &[".appimage", ".deb", ".rpm"],
    };
    for ext in priority {
        for a in assets {
            let name = a.get("name")?.as_str()?;
            if name.to_lowercase().ends_with(ext) {
                return Some(ReleaseAsset {
                    name: name.to_string(),
                    url: a.get("browser_download_url")?.as_str()?.to_string(),
                });
            }
        }
    }
    None
}

/// Downloads to the temp dir (streaming, with progress) and returns the saved path.
pub fn download_installer(
    asset: &ReleaseAsset,
    mut on_progress: impl FnMut(u64, u64),
) -> Result<std::path::PathBuf, String> {
    let resp = ureq::get(&asset.url).call().map_err(|e| format!("Download failed: {e}"))?;
    let total = resp.header("Content-Length").and_then(|v| v.parse().ok()).unwrap_or(0);
    let dir = std::env::temp_dir().join("NytuoLauncherDownloads");
    std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let dest = dir.join(&asset.name);
    let mut out = File::create(&dest).map_err(|e| e.to_string())?;
    let mut reader = resp.into_reader();
    let (mut buf, mut done) = (vec![0u8; 64 * 1024], 0u64);
    loop {
        let n = reader.read(&mut buf).map_err(|e| e.to_string())?;
        if n == 0 {
            break;
        }
        out.write_all(&buf[..n]).map_err(|e| e.to_string())?;
        done += n as u64;
        on_progress(done, total);
    }
    Ok(dest)
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Hits the real download server; run with `cargo test -- --ignored`.
    #[test]
    #[ignore]
    fn manifest_parses_from_live_server() {
        let (m, _) = fetch_manifest("SGB", current_platform()).expect("manifest");
        assert!(!m.version.is_empty());
        assert!(!m.files.is_empty());
        println!("SGB v{} -> {} files, {} chunks", m.version, m.files.len(), m.files.iter().map(|f| f.chunks.len()).sum::<usize>());
    }

    /// Full install -> detect -> break a file -> repair round trip in a scratch dir.
    /// Downloads ~230 MB; run with `E2E_DIR=<dir> cargo test -- --ignored e2e`.
    #[test]
    #[ignore]
    fn e2e_install_repair() {
        let dir = std::env::var("E2E_DIR").expect("E2E_DIR");
        let install = format!("{dir}/SGB");
        let mut last = 0;
        run_job(Mode::Install, "SGB", &install, |p| last = p.total).expect("install");
        assert!(last > 0);

        let game = Game { id: "SGB".into(), ..Default::default() };
        let (installed, version) = read_install_state(&game, &dir);
        assert!(installed);
        assert_eq!(version.as_deref(), Some("1.1.0.1"));

        let victim = std::path::Path::new(&install).join("dxwebsetup.exe");
        std::fs::remove_file(&victim).expect("remove");
        run_job(Mode::Repair, "SGB", &install, |_| {}).expect("repair");
        assert!(victim.metadata().unwrap().len() > 0);

        crate::platform::delete_dir(&install).expect("uninstall");
        assert!(!read_install_state(&game, &dir).0);
    }
}
