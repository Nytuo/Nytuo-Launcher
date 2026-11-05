//! Aptabase analytics (same self-hosted instance + app key as the Tauri build).
//! Sends one anonymous `app_started` event per run; no identifiers beyond a random session id.

use serde_json::json;

const APP_KEY: &str = "A-SH-2810469649";
const ENDPOINT: &str = "https://analytics.nytuo.fr/api/v0/event";

fn session_id() -> String {
    let nanos = std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).map(|d| d.as_nanos()).unwrap_or(0);
    format!("{:x}{:x}", nanos, std::process::id())
}

/// Fire-and-forget on a worker thread. Failures are ignored (offline, blocked, ...).
pub fn track(event: &'static str, locale: String) {
    std::thread::spawn(move || {
        let body = json!({
            "timestamp": crate::util::iso_now(),
            "sessionId": session_id(),
            "eventName": event,
            "systemProps": {
                "isDebug": cfg!(debug_assertions),
                "locale": locale,
                "osName": std::env::consts::OS,
                "osVersion": "",
                "engineName": "gpui",
                "engineVersion": "0.3",
                "appVersion": env!("CARGO_PKG_VERSION"),
                "sdkVersion": concat!("nytuo-launcher@", env!("CARGO_PKG_VERSION")),
            },
            "props": {},
        });
        let _ = ureq::post(ENDPOINT).set("App-Key", APP_KEY).send_json(body);
    });
}
