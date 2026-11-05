//! Play-time tracking: total time and last-played timestamp per game, stored next to the settings.

use crate::config;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct GameStats {
    pub total_secs: u64,
    /// Unix timestamp (seconds) of the last session start.
    pub last_played: u64,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct Stats(pub HashMap<String, GameStats>);

impl Stats {
    fn file() -> std::path::PathBuf {
        config::config_dir().join("playtime.json")
    }

    pub fn load() -> Self {
        std::fs::read_to_string(Self::file()).ok().and_then(|s| serde_json::from_str(&s).ok()).unwrap_or_default()
    }

    pub fn save(&self) {
        if let Ok(s) = serde_json::to_string(self) {
            let _ = std::fs::write(Self::file(), s);
        }
    }

    pub fn record(&mut self, game_id: &str, started: u64, secs: u64) {
        let e = self.0.entry(game_id.to_string()).or_default();
        e.total_secs += secs;
        e.last_played = started;
        self.save();
    }

    pub fn get(&self, game_id: &str) -> Option<&GameStats> {
        self.0.get(game_id)
    }
}

pub fn now_unix() -> u64 {
    std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).map(|d| d.as_secs()).unwrap_or(0)
}

/// "2h 05m", "14m", "< 1m", "—".
pub fn format_duration(secs: u64) -> String {
    match secs {
        0 => "—".into(),
        1..=59 => "< 1m".into(),
        s if s < 3600 => format!("{}m", s / 60),
        s => format!("{}h {:02}m", s / 3600, (s % 3600) / 60),
    }
}

/// UTC `YYYY-MM-DD` from a unix timestamp (civil-from-days algorithm, no chrono needed).
pub fn format_date(ts: u64) -> String {
    if ts == 0 {
        return "—".into();
    }
    let z = (ts / 86_400) as i64 + 719_468;
    let era = z.div_euclid(146_097);
    let doe = z.rem_euclid(146_097);
    let yoe = (doe - doe / 1460 + doe / 36_524 - doe / 146_096) / 365;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = doy - (153 * mp + 2) / 5 + 1;
    let m = if mp < 10 { mp + 3 } else { mp - 9 };
    let y = yoe + era * 400 + i64::from(m <= 2);
    format!("{y:04}-{m:02}-{d:02}")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn formats() {
        assert_eq!(format_date(0), "—");
        assert_eq!(format_date(1_700_000_000), "2023-11-14");
        assert_eq!(format_duration(7500), "2h 05m");
        assert_eq!(format_duration(840), "14m");
    }
}
