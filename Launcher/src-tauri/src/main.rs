#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use futures_util::StreamExt;
use reqwest::Client;
use serde::Deserialize;
use sha2::{Digest, Sha256};
use std::fs::File;
use std::io::Write;
use std::path::{Path, PathBuf};
use tauri::{Emitter, Window};
mod commands;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            greet,
            launch_game,
            compare_manifest,
            commands::updater::check_for_update,
            commands::updater::install_update,
            commands::updater::open_releases_page,
            commands::updater::restart_app,
            search_hltb,
            download_game,
            repair_game,
            update_game,
            fetch_remote_data,
            check_path_exists,
            read_local_file,
            open_folder,
            delete_dir,
            create_shortcut,
            check_file_integrity,
            get_file_hash
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn normalize_path(path: &str) -> PathBuf {
    if cfg!(target_os = "windows") {
        PathBuf::from(path.replace("/", "\\"))
    } else {
        PathBuf::from(path)
    }
}

#[tauri::command]
fn launch_game(path: String) -> Result<String, String> {
    let normalized = normalize_path(&path);
    if !normalized.exists() {
        return Err(format!("Game executable not found at: {:?}", normalized));
    }

    #[cfg(target_os = "macos")]
    {
        use std::process::Command;
        if normalized.is_dir() || path.ends_with(".app") {
            let _ = Command::new("xattr")
                .arg("-r")
                .arg("-d")
                .arg("com.apple.quarantine")
                .arg(normalized.to_string_lossy().to_string())
                .output();

            match Command::new("open")
                .arg(normalized.to_string_lossy().to_string())
                .output()
            {
                Ok(out) => {
                    if out.status.success() {
                        return Ok(format!("Opened {}", path));
                    } else {
                        let stderr = String::from_utf8_lossy(&out.stderr);

                        let _ = std::io::stderr().write_all(stderr.as_bytes());
                    }
                }
                Err(e) => {
                    let _ = std::io::stderr().write_all(e.to_string().as_bytes());
                }
            }

            let macos_dir = normalized.join("Contents").join("MacOS");
            if macos_dir.exists() && macos_dir.is_dir() {
                let _ = (|| -> Result<(), String> {
                    use std::os::unix::fs::PermissionsExt;

                    if let Ok(entries) = std::fs::read_dir(&macos_dir) {
                        for ent in entries.flatten() {
                            let p = ent.path();
                            if p.is_file() {
                                if let Ok(meta) = std::fs::metadata(&p) {
                                    let mut perms = meta.permissions();
                                    perms.set_mode(0o755);
                                    let _ = std::fs::set_permissions(&p, perms);
                                }
                            }
                        }
                    }

                    let frameworks_dir = normalized.join("Contents").join("Frameworks");
                    fn set_exec_recursive(p: &std::path::Path) {
                        if let Ok(entries) = std::fs::read_dir(p) {
                            for e in entries.flatten() {
                                let path = e.path();
                                if path.is_dir() {
                                    set_exec_recursive(&path);
                                } else if path.is_file() {
                                    if let Ok(meta) = std::fs::metadata(&path) {
                                        let mut perms = meta.permissions();
                                        #[cfg(target_os = "macos")]
                                        {
                                            use std::os::unix::fs::PermissionsExt;
                                            perms.set_mode(0o755);
                                        }
                                        let _ = std::fs::set_permissions(&path, perms);
                                    }
                                }
                            }
                        }
                    }
                    if frameworks_dir.exists() && frameworks_dir.is_dir() {
                        set_exec_recursive(&frameworks_dir);
                    }

                    Ok(())
                })();

                if let Ok(entries) = std::fs::read_dir(&macos_dir) {
                    for ent in entries.flatten() {
                        let p = ent.path();
                        if p.is_file() {
                            match Command::new(&p).spawn() {
                                Ok(_child) => {
                                    return Ok(format!("Launched inner executable {:?}", p))
                                }
                                Err(e) => {
                                    let msg =
                                        format!("Failed to spawn inner executable {:?}: {}", p, e);
                                    let _ = std::io::stderr().write_all(msg.as_bytes());
                                }
                            }
                        }
                    }
                }
            }

            return Err(format!(
                "Failed to open app {} via open or inner exec",
                path
            ));
        }
    }

    let parent = normalized.parent().unwrap_or_else(|| Path::new("."));

    #[cfg(target_os = "windows")]
    {
        std::process::Command::new(&normalized)
            .current_dir(parent)
            .spawn()
            .map_err(|e| e.to_string())?;
    }

    #[cfg(all(not(target_os = "windows"), not(target_os = "macos")))]
    {
        let path_to_exec = Path::new(&path);
        #[cfg(target_os = "linux")]
        {
            use std::os::unix::fs::PermissionsExt;
            if let Ok(metadata) = std::fs::metadata(path_to_exec) {
                let mut perms = metadata.permissions();
                perms.set_mode(0o755);
                let _ = std::fs::set_permissions(path_to_exec, perms);
            }
        }

        std::process::Command::new(path_to_exec)
            .current_dir(parent)
            .spawn()
            .map_err(|e| e.to_string())?;
    }

    Ok(format!("Launched {}", path))
}

fn build_local_path(install_path: &str, file_path: &str) -> PathBuf {
    let mut base = normalize_path(install_path);

    let fp = file_path.replace('\\', "/");
    for part in fp.split('/') {
        if part.is_empty() {
            continue;
        }
        base.push(part);
    }
    base
}

#[derive(Clone, serde::Serialize)]
struct ProgressPayload {
    downloaded: u64,
    total: u64,
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

const BASE_DOWNLOAD_URL: &str = "https://download.nytuo.fr";

async fn fetch_chunk_bytes(
    client: &Client,
    game_id: &str,
    platform: &str,
    chunk_id: &str,
) -> Result<Vec<u8>, String> {
    let repo = game_id.to_uppercase();
    let plat = platform.to_lowercase();
    let url = format!(
        "{}/{}/{}/chunks/{}",
        BASE_DOWNLOAD_URL, repo, plat, chunk_id
    );
    let resp = client.get(&url).send().await.map_err(|e| e.to_string())?;
    if !resp.status().is_success() {
        return Err(format!("{} -> HTTP {}", url, resp.status()));
    }
    let b = resp.bytes().await.map_err(|e| e.to_string())?;
    let bytes = b.to_vec();
    println!("[fetch_chunk] success {} bytes={}", url, bytes.len());
    Ok(bytes)
}

async fn fetch_manifest_for(game_id: &str, platform: &str) -> Result<(Manifest, String), String> {
    let client = Client::new();

    let mut candidates: Vec<String> = Vec::new();

    let game_variants = vec![
        game_id.to_string(),
        game_id.to_uppercase(),
        game_id.to_lowercase(),
    ];

    let capitalize = |s: &str| -> String {
        let mut c = s.chars();
        match c.next() {
            None => String::new(),
            Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
        }
    };

    let platform_variants = vec![
        platform.to_string(),
        capitalize(platform),
        platform.to_lowercase(),
        platform.to_uppercase(),
    ];

    for g in &game_variants {
        for p in &platform_variants {
            candidates.push(format!("{}/{}/{}/manifest.json", BASE_DOWNLOAD_URL, g, p));
        }
    }

    for g in &game_variants {
        candidates.push(format!("{}/{}/manifest.json", BASE_DOWNLOAD_URL, g));
    }

    let mut last_err = String::new();
    for url in candidates {
        let res = client.get(&url).send().await;
        match res {
            Ok(r) => {
                if !r.status().is_success() {
                    last_err = format!("{} -> HTTP {}", url, r.status());
                    continue;
                }
                let text = r.text().await.map_err(|e| e.to_string())?;
                let ttrim = text.trim_start();
                if !ttrim.starts_with('{') && !ttrim.starts_with('[') {
                    last_err = format!("{} -> unexpected body", url);
                    continue;
                }
                let manifest: Manifest = serde_json::from_str(&text).map_err(|e| e.to_string())?;
                return Ok((manifest, text));
            }
            Err(e) => {
                last_err = format!("{} -> {}", url, e.to_string());
            }
        }
    }

    Err(format!(
        "Failed to fetch valid manifest. Last error: {}",
        last_err
    ))
}

#[tauri::command]
async fn download_game(
    window: Window,
    gameId: String,
    platform: String,
    installPath: String,
) -> Result<(), String> {
    let client = Client::new();
    let (manifest, text) = fetch_manifest_for(&gameId, &platform).await?;

    let install_path_pb = normalize_path(&installPath);
    if let Some(parent) = install_path_pb.as_path().parent() {
        let _ = std::fs::create_dir_all(parent);
    }
    let _ = std::fs::create_dir_all(&install_path_pb);
    let _ = std::fs::write(install_path_pb.join("manifest.json"), &text);

    let total_chunks: u64 = manifest.files.iter().map(|f| f.chunks.len() as u64).sum();
    let mut downloaded_chunks: u64 = 0;
    let _ = window.emit("download_started", total_chunks);

    for f in &manifest.files {
        let lp = build_local_path(&installPath, &f.path);
        if let Some(parent) = lp.parent() {
            let _ = std::fs::create_dir_all(parent);
        }
    }

    let repo = gameId.to_uppercase();
    for file_entry in manifest.files {
        let local_path = build_local_path(&installPath, &file_entry.path);

        if let Some(parent) = local_path.parent() {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
        println!("[download] Writing file: {:?}", &local_path);
        let _ = window.emit("download_debug", format!("writing: {:?}", &local_path));
        let mut out = File::create(&local_path).map_err(|e| e.to_string())?;

        for chunk_id in file_entry.chunks {
            let chunk_url = format!(
                "{}/{}/{}/chunks/{}",
                BASE_DOWNLOAD_URL, repo, platform, chunk_id
            );
            println!("[download] Fetching chunk: {}", &chunk_url);
            let _ = window.emit("download_debug", format!("fetching: {}", &chunk_url));
            let bytes = fetch_chunk_bytes(&client, &repo, &platform, &chunk_id).await?;
            println!("[download] chunk {} bytes={}", &chunk_id, bytes.len());
            out.write_all(&bytes).map_err(|e| e.to_string())?;

            downloaded_chunks += 1;
            let payload = ProgressPayload {
                downloaded: downloaded_chunks,
                total: total_chunks,
            };
            let _ = window.emit(
                "download_debug",
                format!("progress emit: {}/{}", payload.downloaded, payload.total),
            );
            let _ = window.emit("download_progress", payload);
        }
    }

    Ok(())
}

#[tauri::command]
async fn compare_manifest(
    gameId: String,
    platform: String,
    gamePath: String,
) -> Result<Vec<String>, String> {
    let client = Client::new();
    let (manifest, _text) = fetch_manifest_for(&gameId, &platform).await?;

    let mut to_download: Vec<String> = Vec::new();

    for file in manifest.files {
        let local_path = normalize_path(&format!("{}/{}", gamePath, file.path));
        let needs = match std::fs::metadata(&local_path) {
            Ok(meta) => meta.len() == 0,
            Err(_) => true,
        };
        if needs {
            to_download.push(file.path);
        }
    }

    Ok(to_download)
}

#[tauri::command]
async fn repair_game(
    window: Window,
    gameId: String,
    platform: String,
    installPath: String,
) -> Result<(), String> {
    let client = Client::new();
    let repo = gameId.to_uppercase();
    let (manifest, _text) = fetch_manifest_for(&gameId, &platform).await?;

    let needs: Vec<&ManifestFile> = manifest
        .files
        .iter()
        .filter(|f| {
            let lp = build_local_path(&installPath, &f.path);
            match std::fs::metadata(&lp) {
                Ok(meta) => meta.len() == 0,
                Err(_) => true,
            }
        })
        .collect();

    let total_chunks: u64 = needs.iter().map(|f| f.chunks.len() as u64).sum();
    let mut downloaded_chunks: u64 = 0;
    let _ = window.emit("download_started", total_chunks);

    for f in &needs {
        if let Some(parent) = build_local_path(&installPath, &f.path).parent() {
            let _ = std::fs::create_dir_all(parent);
        }
    }

    for f in needs {
        let local_path = build_local_path(&installPath, &f.path);
        if let Some(parent) = local_path.parent() {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
        println!("[repair] Writing file: {:?}", &local_path);
        let _ = window.emit(
            "download_debug",
            format!("repair writing: {:?}", &local_path),
        );
        let mut out = File::create(&local_path).map_err(|e| e.to_string())?;

        for chunk_id in &f.chunks {
            let bytes = fetch_chunk_bytes(&client, &repo, &platform, chunk_id).await?;
            println!("[repair] chunk {} bytes={}", &chunk_id, bytes.len());
            out.write_all(&bytes).map_err(|e| e.to_string())?;

            downloaded_chunks += 1;
            let payload = ProgressPayload {
                downloaded: downloaded_chunks,
                total: total_chunks,
            };
            let _ = window.emit(
                "download_debug",
                format!("progress emit: {}/{}", payload.downloaded, payload.total),
            );
            let _ = window.emit("download_progress", payload);
        }
    }

    Ok(())
}

#[tauri::command]
async fn update_game(
    window: Window,
    gameId: String,
    platform: String,
    installPath: String,
) -> Result<(), String> {
    let client = Client::new();
    let repo = gameId.to_uppercase();
    let (manifest, text) = fetch_manifest_for(&gameId, &platform).await?;

    let local_manifest_path = normalize_path(&format!("{}/manifest.json", installPath));
    let mut need_full_update = true;
    if let Ok(local_text) = std::fs::read_to_string(&local_manifest_path) {
        if let Ok(local_manifest) = serde_json::from_str::<Manifest>(&local_text) {
            if local_manifest.version == manifest.version {
                need_full_update = false;
            }
        }
    }

    let mut total_chunks: u64 = 0;
    if need_full_update {
        total_chunks = manifest.files.iter().map(|f| f.chunks.len() as u64).sum();
    } else {
        total_chunks = manifest
            .files
            .iter()
            .filter(|f| {
                let lp = build_local_path(&installPath, &f.path);
                match std::fs::metadata(&lp) {
                    Ok(meta) => meta.len() == 0,
                    Err(_) => true,
                }
            })
            .map(|f| f.chunks.len() as u64)
            .sum();
    }
    let mut downloaded_chunks: u64 = 0;

    for f in &manifest.files {
        let lp = build_local_path(&installPath, &f.path);
        let exists_and_nonzero = match std::fs::metadata(&lp) {
            Ok(meta) => meta.len() > 0,
            Err(_) => false,
        };
        if !need_full_update || !exists_and_nonzero {
            if let Some(parent) = lp.parent() {
                let _ = std::fs::create_dir_all(parent);
            }
        }
    }

    for file_entry in manifest.files {
        let local_path = build_local_path(&installPath, &file_entry.path);
        let exists_and_nonzero = match std::fs::metadata(&local_path) {
            Ok(meta) => meta.len() > 0,
            Err(_) => false,
        };

        if !need_full_update && exists_and_nonzero {
            continue;
        }

        if let Some(parent) = local_path.parent() {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
        println!("[update] Writing file: {:?}", &local_path);
        let _ = window.emit(
            "download_debug",
            format!("update writing: {:?}", &local_path),
        );
        let mut out = File::create(&local_path).map_err(|e| e.to_string())?;
        for chunk_id in file_entry.chunks {
            let chunk_url = format!(
                "{}/{}/{}/chunks/{}",
                BASE_DOWNLOAD_URL, repo, platform, chunk_id
            );
            let bytes = fetch_chunk_bytes(&client, &repo, &platform, &chunk_id).await?;
            println!("[update] chunk {} bytes={}", &chunk_id, bytes.len());
            out.write_all(&bytes).map_err(|e| e.to_string())?;

            downloaded_chunks += 1;
            let payload = ProgressPayload {
                downloaded: downloaded_chunks,
                total: total_chunks,
            };
            let _ = window.emit(
                "download_debug",
                format!("progress emit: {}/{}", payload.downloaded, payload.total),
            );
            let _ = window.emit("download_progress", payload);
        }
    }

    let install_path_pb = normalize_path(&installPath);
    let _ = std::fs::create_dir_all(&install_path_pb);
    let _ = std::fs::write(install_path_pb.join("manifest.json"), &text);

    Ok(())
}

#[tauri::command]
async fn fetch_remote_data(url: String) -> Result<String, String> {
    let client = Client::new();
    let res = client.get(&url).send().await.map_err(|e| e.to_string())?;
    res.text().await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn check_path_exists(path: String) -> bool {
    normalize_path(&path).exists()
}

#[tauri::command]
async fn check_file_integrity(path: String) -> bool {
    let p = normalize_path(&path);
    p.exists() && p.is_file() && p.metadata().map(|m| m.len() > 0).unwrap_or(false)
}

#[tauri::command]
async fn get_file_hash(path: String) -> Result<String, String> {
    let p = normalize_path(&path);
    if !p.exists() || !p.is_file() {
        return Err("File not found".to_string());
    }

    let mut file = File::open(p).map_err(|e| e.to_string())?;
    let mut hasher = Sha256::new();
    std::io::copy(&mut file, &mut hasher).map_err(|e| e.to_string())?;
    let result = hasher.finalize();
    Ok(format!("{:x}", result))
}

#[tauri::command]
async fn read_local_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(normalize_path(&path)).map_err(|e| e.to_string())
}

#[tauri::command]
async fn open_folder(path: String) -> Result<(), String> {
    let p = normalize_path(&path);
    if !p.exists() {
        return Err(format!("Folder does not exist: {:?}", p));
    }

    #[cfg(target_os = "windows")]
    {
        let mut cmd = std::process::Command::new("explorer");
        if p.is_file() {
            let sel = format!("/select,{}", p.to_string_lossy());
            cmd.arg(sel);
        } else {
            cmd.arg(p.to_string_lossy().to_string());
        }
        cmd.spawn().map_err(|e| e.to_string())?;
    }
    #[cfg(target_os = "linux")]
    {
        std::process::Command::new("xdg-open")
            .arg(&path)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(&path)
            .spawn()
            .map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
async fn delete_dir(path: String) -> Result<(), String> {
    std::fs::remove_dir_all(normalize_path(&path)).map_err(|e| e.to_string())
}

#[tauri::command]
async fn create_shortcut(
    path: String,
    name: String,
    target: String,
    icon: Option<String>,
) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        let target_norm = normalize_path(&target);

        let icon_pathbuf = icon.map(|s| normalize_path(&s));
        let icon_exists = icon_pathbuf.as_ref().map(|p| p.exists()).unwrap_or(false);
        let icon_str_escaped = if icon_exists {
            Some(icon_pathbuf.unwrap().to_string_lossy().replace('"', "`\""))
        } else {
            None
        };

        let mut script = format!(
            "$WshShell = New-Object -ComObject WScript.Shell; \
             $path = \"{path}\"; \
             if ($path -eq \"$HOME\\Desktop\") {{ $path = [System.Environment]::GetFolderPath('Desktop') }} \
             $Shortcut = $WshShell.CreateShortcut(\"$path\\{name}.lnk\"); \
             $Shortcut.TargetPath = \"{target}\"; \
",
            path = path.replace("\"", "`\"") ,
            name = name.replace("\"", "`\""),
            target = target_norm.to_string_lossy().replace("\"", "`\"")
        );

        if let Some(icon_escaped) = icon_str_escaped {
            script.push_str(&format!(
                " $Shortcut.IconLocation = \"{}\",0; ",
                icon_escaped
            ));
        }

        script.push_str(" $Shortcut.Save()");

        std::process::Command::new("powershell")
            .arg("-NoProfile")
            .arg("-Command")
            .arg(script)
            .spawn()
            .map_err(|e| e.to_string())?;
        Ok(())
    }
    #[cfg(not(target_os = "windows"))]
    {
        let _ = (path, name, target, icon);
        Err("Shortcut creation is only supported on Windows".to_string())
    }
}

#[tauri::command]
async fn search_hltb(_game_name: &str) -> Result<String, String> {
    Ok(r#"{
        "main_story": {"average": 36000},
        "main_extra": {"average": 54000},
        "completionist": {"average": 108000},
        "all_styles": {"average": 45000}
    }"#
    .to_string())
}
