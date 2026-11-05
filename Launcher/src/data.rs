//! Catalog models + PocketBase client (port of `gameStore.ts`, `creationStore.ts`, `lib/pocketbase.ts`).

use crate::{config, util};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashSet;

pub const POCKETBASE_URL: &str = "https://pocket.nytuo.fr";

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
#[serde(default)]
pub struct Game {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub background: Option<String>,
    pub logo: Option<String>,
    pub version_file: Option<String>,
    pub repo: Option<String>,
    pub online_url: Option<String>,
    pub release_date: Option<String>,
    pub developers: Option<String>,
    pub status: Option<String>,
    pub website: Option<String>,
    pub colors: Option<String>,
    pub itch: Option<String>,
    pub gamejolt: Option<String>,
    pub screenshots: Vec<String>,
    pub video: Option<String>,
    pub exec_windows: Option<String>,
    pub exec_linux: Option<String>,
    pub exec_macos: Option<String>,
    pub web_only: bool,
    // Local / derived state, re-resolved on every start.
    pub is_installed: bool,
    pub version: Option<String>,
    pub remote_version: Option<String>,
}

impl Game {
    pub fn exec_for_platform(&self) -> Option<&str> {
        if cfg!(target_os = "windows") {
            self.exec_windows.as_deref()
        } else if cfg!(target_os = "macos") {
            self.exec_macos.as_deref()
        } else {
            self.exec_linux.as_deref()
        }
    }

    pub fn update_available(&self) -> bool {
        self.is_installed
            && util::compare_versions(self.remote_version.as_deref(), self.version.as_deref()) == 1
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
#[serde(default)]
pub struct Author {
    pub name: String,
    pub role: Option<String>,
    pub url: Option<String>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
#[serde(default)]
pub struct Feature {
    pub name: String,
    pub description: String,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
#[serde(default)]
pub struct Creation {
    pub id: String,
    pub name: String,
    pub logo: Option<String>,
    pub summary: Option<String>,
    pub description: Option<String>,
    pub status: Option<String>,
    pub role: Option<String>,
    pub website: Option<String>,
    pub github: String,
    pub github_dl: bool,
    pub documentation: Option<String>,
    pub homebrew: Option<String>,
    pub video: Option<String>,
    pub screenshots: Vec<String>,
    pub tech: Vec<String>,
    pub features: Vec<Feature>,
    pub authors: Vec<Author>,
    pub creation_date: Option<String>,
    pub colors: Option<String>,
    /// (store label, url) pairs: Flathub, Chocolatey, Snap Store, Google Play, ...
    pub stores: Vec<(String, String)>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct Catalog {
    pub games: Vec<Game>,
    pub creations: Vec<Creation>,
}

impl Catalog {
    fn file() -> std::path::PathBuf {
        config::config_dir().join("catalog.json")
    }

    pub fn load_cached() -> Self {
        std::fs::read_to_string(Self::file())
            .ok()
            .and_then(|s| serde_json::from_str(&s).ok())
            .unwrap_or_default()
    }

    pub fn save(&self) {
        if let Ok(s) = serde_json::to_string(self) {
            let _ = std::fs::write(Self::file(), s);
        }
    }
}

// ---------------------------------------------------------------- PocketBase

fn fetch_collection(collection: &str, filter: Option<&str>) -> Vec<Value> {
    let mut req = ureq::get(&format!("{POCKETBASE_URL}/api/collections/{collection}/records"))
        .query("perPage", "200")
        .query("sort", "-created");
    if let Some(f) = filter {
        req = req.query("filter", f);
    }
    req.call()
        .ok()
        .and_then(|r| r.into_json::<Value>().ok())
        .and_then(|v| v.get("items").cloned())
        .and_then(|v| v.as_array().cloned())
        .unwrap_or_default()
}

fn str_of(v: &Value, key: &str) -> Option<String> {
    v.get(key)
        .and_then(Value::as_str)
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .map(str::to_string)
}

fn file_url(record: &Value, file: &str) -> String {
    format!(
        "{POCKETBASE_URL}/api/files/{}/{}/{}",
        str_of(record, "collectionId").unwrap_or_default(),
        str_of(record, "id").unwrap_or_default(),
        file
    )
}

fn file_of(record: &Value, key: &str) -> Option<String> {
    str_of(record, key).map(|f| file_url(record, &f))
}

fn files_of(record: &Value, key: &str) -> Vec<String> {
    record
        .get(key)
        .and_then(Value::as_array)
        .map(|a| a.iter().filter_map(Value::as_str).map(|f| file_url(record, f)).collect())
        .unwrap_or_default()
}

/// A JSON column that PocketBase may return either parsed or as a string.
fn json_column(record: &Value, key: &str) -> Option<Value> {
    match record.get(key)? {
        Value::String(s) => serde_json::from_str(s).ok(),
        Value::Null => None,
        other => Some(other.clone()),
    }
}

fn parse_authors(record: &Value) -> Vec<Author> {
    json_column(record, "authors")
        .and_then(|v| serde_json::from_value(v).ok())
        .unwrap_or_default()
}

/// Games hosted in other collections but shown next to the main ones.
type ExtraSource = (&'static str, &'static str, &'static [(&'static str, &'static str)]);
const EXTRA_SOURCES: &[ExtraSource] = &[(
    "University",
    "qfk63ekxezmvuz1", // "The Little Princess"
    &[
        ("repo", "TLP"),
        ("execWindows", "thelittleprincess.exe"),
        ("execLinux", "thelittleprincess.x86_64"),
        ("execMac", "thelittleprincess.app"),
        ("versionFile", "TLP_Version.txt"),
    ],
)];

fn game_from_record(r: &Value) -> Game {
    let authors = parse_authors(r);
    let developers = authors
        .iter()
        .map(|a| a.name.as_str())
        .filter(|n| !n.is_empty())
        .collect::<Vec<_>>()
        .join(", ");
    let repo = str_of(r, "repo");
    let name = str_of(r, "name");
    let raw_id = str_of(r, "id").unwrap_or_default();
    let id = util::slugify(repo.as_deref().or(name.as_deref()).unwrap_or(&raw_id));
    let (ew, el, em) = (str_of(r, "execWindows"), str_of(r, "execLinux"), str_of(r, "execMac"));
    Game {
        name: name.or_else(|| repo.clone()).unwrap_or_else(|| id.clone()),
        logo: file_of(r, "logo"),
        background: file_of(r, "background"),
        screenshots: files_of(r, "screenshots"),
        video: str_of(r, "video"),
        description: str_of(r, "summary").or_else(|| str_of(r, "description")),
        release_date: str_of(r, "creationDate"),
        developers: (!developers.is_empty()).then_some(developers),
        status: str_of(r, "status"),
        website: str_of(r, "website"),
        colors: str_of(r, "colors"),
        version_file: str_of(r, "versionFile"),
        online_url: str_of(r, "onlineEmbedUrl"),
        itch: str_of(r, "itch"),
        gamejolt: str_of(r, "gamejolt"),
        web_only: ew.is_none() && el.is_none() && em.is_none(),
        exec_windows: ew,
        exec_linux: el,
        exec_macos: em,
        repo,
        id,
        ..Default::default()
    }
}

fn fetch_games() -> Vec<Game> {
    let mut records = fetch_collection("games", None);
    for (collection, id, overrides) in EXTRA_SOURCES {
        let found = fetch_collection(collection, Some(&format!("id='{id}'"))).into_iter().next();
        if let Some(mut rec) = found {
            if let Some(obj) = rec.as_object_mut() {
                for (k, v) in *overrides {
                    obj.insert((*k).to_string(), Value::String((*v).to_string()));
                }
            }
            records.push(rec);
        }
    }
    let mut seen = HashSet::new();
    records
        .iter()
        .map(game_from_record)
        .filter(|g| seen.insert(g.id.to_lowercase()))
        .collect()
}

fn fetch_creations() -> Vec<Creation> {
    fetch_collection("softwares", None)
        .iter()
        .filter(|r| str_of(r, "name").is_some_and(|n| n != "Nytuo-Launcher"))
        .map(|r| {
            let tech: Vec<String> = json_column(r, "icons")
                .and_then(|v| v.get("icons").cloned())
                .and_then(|v| serde_json::from_value(v).ok())
                .unwrap_or_default();
            let features: Vec<Feature> = json_column(r, "information")
                .and_then(|v| serde_json::from_value(v).ok())
                .unwrap_or_default();
            let stores = [
                ("Flathub", "flathub"),
                ("Chocolatey", "chocolatey"),
                ("Snap Store", "snapstore"),
                ("Google Play", "android"),
                ("Microsoft Store", "windowsStore"),
                ("itch.io", "itch"),
                ("Game Jolt", "gamejolt"),
            ]
            .iter()
            .filter_map(|(label, key)| str_of(r, key).map(|u| ((*label).to_string(), u)))
            .collect();
            Creation {
                id: str_of(r, "id").unwrap_or_default(),
                name: str_of(r, "name").unwrap_or_default(),
                logo: file_of(r, "logo"),
                summary: str_of(r, "summary"),
                description: str_of(r, "description"),
                status: str_of(r, "status"),
                role: str_of(r, "role"),
                website: str_of(r, "website"),
                github: str_of(r, "github").unwrap_or_default(),
                github_dl: r.get("githubDL").and_then(Value::as_bool).unwrap_or(false),
                documentation: str_of(r, "documentation"),
                homebrew: str_of(r, "homebrew"),
                video: str_of(r, "video"),
                screenshots: files_of(r, "screenshots"),
                tech,
                features,
                authors: parse_authors(r),
                creation_date: str_of(r, "creationDate"),
                colors: str_of(r, "colors"),
                stores,
            }
        })
        .collect()
}

/// Fetch the live catalog. `None` when offline / empty so the caller keeps the cache.
pub fn fetch_remote_catalog() -> Option<Catalog> {
    let games = fetch_games();
    if games.is_empty() {
        return None;
    }
    Some(Catalog { games, creations: fetch_creations() })
}

/// Merge a fresh catalog into the cached one: remote wins, local-only entries are kept,
/// and locally resolved state (install / versions) is carried over.
pub fn merge_catalog(cached: &Catalog, fresh: Catalog) -> Catalog {
    let mut games: Vec<Game> = fresh
        .games
        .into_iter()
        .map(|mut g| {
            if let Some(old) = cached.games.iter().find(|o| o.id.eq_ignore_ascii_case(&g.id)) {
                g.is_installed = old.is_installed;
                g.version = old.version.clone();
                g.remote_version = old.remote_version.clone();
            }
            g
        })
        .collect();
    let have: HashSet<String> = games.iter().map(|g| g.id.to_lowercase()).collect();
    games.extend(cached.games.iter().filter(|g| !have.contains(&g.id.to_lowercase())).cloned());
    Catalog { games, creations: fresh.creations }
}
