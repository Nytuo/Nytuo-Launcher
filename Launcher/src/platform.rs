//! OS integration: launching games, opening folders, shortcuts (port of the Tauri commands).

use std::path::{Path, PathBuf};
use std::process::Command;

pub fn normalize_path(path: &str) -> PathBuf {
    if cfg!(target_os = "windows") {
        PathBuf::from(path.replace('/', "\\"))
    } else {
        PathBuf::from(path)
    }
}

/// `install_path` + a manifest-relative path, tolerant of either slash style.
pub fn build_local_path(install_path: &str, file_path: &str) -> PathBuf {
    let mut base = normalize_path(install_path);
    for part in file_path.replace('\\', "/").split('/').filter(|p| !p.is_empty()) {
        base.push(part);
    }
    base
}

/// Starts the game. Returns the child process when we can supervise it (used for play time);
/// `None` for macOS bundles started through `open`.
pub fn launch_game(path: &str) -> Result<Option<std::process::Child>, String> {
    let p = normalize_path(path);
    if !p.exists() {
        return Err(format!("Game executable not found at: {}", p.display()));
    }

    #[cfg(target_os = "macos")]
    {
        if p.is_dir() || path.ends_with(".app") {
            let _ = Command::new("xattr").args(["-r", "-d", "com.apple.quarantine"]).arg(&p).output();
            if Command::new("open").arg(&p).output().map(|o| o.status.success()).unwrap_or(false) {
                return Ok(None);
            }
            // Fallback: run the inner executable directly.
            let macos_dir = p.join("Contents").join("MacOS");
            if let Ok(entries) = std::fs::read_dir(&macos_dir) {
                use std::os::unix::fs::PermissionsExt;
                for e in entries.flatten().filter(|e| e.path().is_file()) {
                    let _ = std::fs::set_permissions(e.path(), std::fs::Permissions::from_mode(0o755));
                    if let Ok(child) = Command::new(e.path()).spawn() {
                        return Ok(Some(child));
                    }
                }
            }
            return Err(format!("Failed to open app {path}"));
        }
    }

    #[cfg(target_os = "linux")]
    {
        use std::os::unix::fs::PermissionsExt;
        let _ = std::fs::set_permissions(&p, std::fs::Permissions::from_mode(0o755));
    }

    let parent = p.parent().unwrap_or_else(|| Path::new("."));
    spawn_detached(&p, parent).map(Some).map_err(|e| format!("{}: {e}", p.display()))
}

/// Starts the game fully detached from the launcher: null stdio (like the Tauri release build),
/// no inherited console and, on Windows, outside the launcher's job object. Chromium/NW.js
/// is picky about both, and a game that silently hangs is the worst failure mode.
fn spawn_detached(exe: &Path, dir: &Path) -> std::io::Result<std::process::Child> {
    use std::process::Stdio;
    let build = || {
        let mut c = Command::new(exe);
        c.current_dir(dir).stdin(Stdio::null()).stdout(Stdio::null()).stderr(Stdio::null());
        c
    };

    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        const DETACHED_PROCESS: u32 = 0x0000_0008;
        const CREATE_NEW_PROCESS_GROUP: u32 = 0x0000_0200;
        const CREATE_BREAKAWAY_FROM_JOB: u32 = 0x0100_0000;
        // Breakaway is refused (access denied) when the parent job forbids it; retry without.
        let base = DETACHED_PROCESS | CREATE_NEW_PROCESS_GROUP;
        return build()
            .creation_flags(base | CREATE_BREAKAWAY_FROM_JOB)
            .spawn()
            .or_else(|_| build().creation_flags(base).spawn());
    }

    #[cfg(not(windows))]
    build().spawn()
}

pub fn open_folder(path: &str) -> Result<(), String> {
    let p = normalize_path(path);
    if !p.exists() {
        return Err(format!("Folder does not exist: {}", p.display()));
    }
    let res = if cfg!(target_os = "windows") {
        let mut cmd = Command::new("explorer");
        if p.is_file() {
            cmd.arg(format!("/select,{}", p.display()));
        } else {
            cmd.arg(&p);
        }
        cmd.spawn()
    } else if cfg!(target_os = "macos") {
        Command::new("open").arg(&p).spawn()
    } else {
        Command::new("xdg-open").arg(&p).spawn()
    };
    res.map(|_| ()).map_err(|e| e.to_string())
}

/// Open a file with its default handler (used for downloaded installers).
pub fn open_file(path: &Path) -> Result<(), String> {
    let res = if cfg!(target_os = "windows") {
        Command::new("cmd").args(["/C", "start", ""]).arg(path).spawn()
    } else if cfg!(target_os = "macos") {
        Command::new("open").arg(path).spawn()
    } else {
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            let _ = std::fs::set_permissions(path, std::fs::Permissions::from_mode(0o755));
        }
        Command::new("xdg-open").arg(path).spawn()
    };
    res.map(|_| ()).map_err(|e| e.to_string())
}

pub fn delete_dir(path: &str) -> Result<(), String> {
    std::fs::remove_dir_all(normalize_path(path)).map_err(|e| e.to_string())
}

/// Desktop shortcut (Windows only, like the original).
pub fn create_shortcut(name: &str, target: &str, icon: Option<&str>) -> Result<(), String> {
    if !cfg!(target_os = "windows") {
        return Err("Shortcut creation is only supported on Windows".into());
    }
    let esc = |s: &str| s.replace('\'', "''");
    let target = normalize_path(target);
    let mut script = format!(
        "$d=[Environment]::GetFolderPath('Desktop'); $s=(New-Object -ComObject WScript.Shell).CreateShortcut(\"$d\\{}.lnk\"); $s.TargetPath='{}'; $s.WorkingDirectory='{}'; ",
        esc(name),
        esc(&target.to_string_lossy()),
        esc(&target.parent().map(|p| p.to_string_lossy().into_owned()).unwrap_or_default()),
    );
    if let Some(icon) = icon.map(normalize_path).filter(|p| p.exists()) {
        script.push_str(&format!("$s.IconLocation='{}'; ", esc(&icon.to_string_lossy())));
    }
    script.push_str("$s.Save()");
    let out = Command::new("powershell")
        .args(["-NoProfile", "-Command", &script])
        .output()
        .map_err(|e| e.to_string())?;
    if out.status.success() { Ok(()) } else { Err(String::from_utf8_lossy(&out.stderr).into_owned()) }
}

pub fn current_platform() -> &'static str {
    if cfg!(target_os = "windows") {
        "windows"
    } else if cfg!(target_os = "macos") {
        "macos"
    } else {
        "linux"
    }
}
