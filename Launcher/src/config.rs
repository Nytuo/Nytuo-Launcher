//! Persistent user settings + on-disk locations.

use serde::{Deserialize, Serialize};
use std::path::PathBuf;

pub const APP_DIR: &str = "NytuoLauncher";

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(default)]
pub struct Settings {
    pub game_path: String,
    pub language: String,
}

impl Default for Settings {
    fn default() -> Self {
        // Same default as the Tauri build so existing installs are picked up automatically.
        let game_path = if cfg!(target_os = "windows") {
            "C:/NytuoLauncher/Games".to_string()
        } else {
            dirs::data_dir()
                .unwrap_or_else(|| PathBuf::from("."))
                .join(APP_DIR)
                .join("Games")
                .to_string_lossy()
                .into_owned()
        };
        let language = std::env::var("LANG")
            .ok()
            .and_then(|l| l.get(..2).map(str::to_string))
            .filter(|l| matches!(l.as_str(), "fr" | "es"))
            .unwrap_or_else(|| "en".to_string());
        Self { game_path, language }
    }
}

pub fn config_dir() -> PathBuf {
    let dir = dirs::config_dir().unwrap_or_else(|| PathBuf::from(".")).join(APP_DIR);
    let _ = std::fs::create_dir_all(&dir);
    dir
}

pub fn cache_dir() -> PathBuf {
    let dir = dirs::cache_dir().unwrap_or_else(|| PathBuf::from(".")).join(APP_DIR);
    let _ = std::fs::create_dir_all(&dir);
    dir
}

impl Settings {
    fn file() -> PathBuf {
        config_dir().join("settings.json")
    }

    pub fn load() -> Self {
        std::fs::read_to_string(Self::file())
            .ok()
            .and_then(|s| serde_json::from_str(&s).ok())
            .unwrap_or_default()
    }

    pub fn save(&self) {
        if let Ok(s) = serde_json::to_string_pretty(self) {
            let _ = std::fs::write(Self::file(), s);
        }
    }
}
