//! Translations (en / fr / es), extracted verbatim from the React app's `i18n.tsx`.

use std::collections::HashMap;
use std::sync::OnceLock;

type Dict = HashMap<String, String>;

fn dicts() -> &'static HashMap<&'static str, Dict> {
    static D: OnceLock<HashMap<&'static str, Dict>> = OnceLock::new();
    D.get_or_init(|| {
        let load = |raw: &str| serde_json::from_str::<Dict>(raw).unwrap_or_default();
        HashMap::from([
            ("en", load(include_str!("../assets/data/en.json"))),
            ("fr", load(include_str!("../assets/data/fr.json"))),
            ("es", load(include_str!("../assets/data/es.json"))),
        ])
    })
}

pub const LANGUAGES: [(&str, &str); 3] = [("en", "English"), ("fr", "Français"), ("es", "Español")];

/// Plain lookup: selected language, then English, then the key itself.
pub fn t(lang: &str, key: &str) -> String {
    let d = dicts();
    d.get(lang)
        .and_then(|m| m.get(key))
        .or_else(|| d.get("en").and_then(|m| m.get(key)))
        .cloned()
        .unwrap_or_else(|| key.to_string())
}

/// Lookup with `{{var}}` interpolation.
pub fn tr(lang: &str, key: &str, vars: &[(&str, &str)]) -> String {
    let mut s = t(lang, key);
    for (k, v) in vars {
        s = s.replace(&format!("{{{{{k}}}}}"), v);
    }
    s
}
