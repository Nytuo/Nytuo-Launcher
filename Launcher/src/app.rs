//! Application state + all the side-effecting logic. Rendering lives in `ui/`.

use crate::config::Settings;
use crate::content::{self, Achievement, ChangeBlock};
use crate::data::{self, Catalog, Creation, Game};
use crate::i18n;
use crate::images::ImageCache;
use crate::installer::{self, Mode};
use crate::platform;
use crate::stats::{self, Stats};
use gpui_kit::component::input::{InputEvent, InputState};
use gpui_kit::*;
use std::sync::mpsc::{Receiver, Sender, channel};
use std::time::{Duration, Instant};

#[derive(Clone, Debug, PartialEq)]
pub enum Page {
    Library,
    Game(String),
    Creation(String),
    Settings,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Filter {
    All,
    Installed,
    NotInstalled,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum GameTab {
    Overview,
    Changelog,
    Achievements,
    Gallery,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Level {
    Info,
    Success,
    Error,
}

pub struct Toast {
    pub id: u64,
    pub level: Level,
    pub text: String,
    pub born: Instant,
}

pub struct Job {
    pub game_id: String,
    pub mode: Mode,
    pub downloaded: u64,
    pub total: u64,
}

pub struct InstallerJob {
    pub creation_id: String,
    pub downloaded: u64,
    pub total: u64,
}

#[derive(Clone)]
pub struct UpdateInfo {
    pub version: String,
    /// Release page (fallback when there is no installer for this platform).
    pub url: String,
    /// Installer for this platform, when the release ships one.
    pub asset_name: Option<String>,
    pub asset_url: Option<String>,
}

pub enum Confirm {
    Uninstall(String),
}

pub enum Msg {
    Catalog(Catalog),
    RemoteVersion { game_id: String, version: Option<String> },
    ImageReady,
    Progress { downloaded: u64, total: u64 },
    JobDone { game_id: String, mode: Mode, result: Result<(), String> },
    InstallerProgress { downloaded: u64, total: u64 },
    InstallerDone { name: String, result: Result<(), String> },
    Achievements { game_id: String, list: Vec<Achievement> },
    Toast(Level, String),
    Update(UpdateInfo),
    SelfUpdateProgress { downloaded: u64, total: u64 },
    SelfUpdateDone(Result<(), String>),
    Played { game_id: String, started: u64, secs: u64 },
    Exited { game_id: String },
}

pub struct LauncherApp {
    pub settings: Settings,
    pub catalog: Catalog,
    pub ready: bool,
    pub syncing: bool,
    pub page: Page,
    pub back_stack: Vec<Page>,
    pub filter: Filter,
    pub search: Entity<InputState>,
    pub query: String,
    pub job: Option<Job>,
    pub installer_job: Option<InstallerJob>,
    pub achievements: Vec<Achievement>,
    pub changelog: Vec<ChangeBlock>,
    pub game_tab: GameTab,
    pub gallery_index: usize,
    pub toasts: Vec<Toast>,
    toast_seq: u64,
    pub images: ImageCache,
    pub update: Option<UpdateInfo>,
    /// (downloaded, total) while the launcher's own installer downloads.
    pub self_update: Option<(u64, u64)>,
    pub stats: Stats,
    /// Games whose process we started and that are still alive.
    pub running: std::collections::HashSet<String>,
    quit_requested: bool,
    pub launching: Option<(String, Instant)>,
    pub confirm: Option<Confirm>,
    pub scroll: ScrollHandle,
    pub focus: FocusHandle,
    pub tx: Sender<Msg>,
    rx: Receiver<Msg>,
    _subs: Vec<Subscription>,
}

impl LauncherApp {
    pub fn new(window: &mut Window, cx: &mut Context<Self>) -> Self {
        let settings = Settings::load();
        let mut catalog = Catalog::load_cached();
        for g in &mut catalog.games {
            let (installed, version) = installer::read_install_state(g, &settings.game_path);
            g.is_installed = installed;
            g.version = version;
        }
        let (tx, rx) = channel();
        let search = cx.new(|cx| InputState::new(window, cx).placeholder(i18n::t(&settings.language, "search_games_placeholder")));
        let subs = vec![cx.subscribe_in(&search, window, |this: &mut Self, input, ev: &InputEvent, _w, cx| {
            if matches!(ev, InputEvent::Change) {
                this.query = input.read(cx).value().to_string();
                cx.notify();
            }
        })];

        let mut app = Self {
            ready: !catalog.games.is_empty(),
            syncing: true,
            settings,
            catalog,
            page: Page::Library,
            back_stack: Vec::new(),
            filter: Filter::All,
            search,
            query: String::new(),
            job: None,
            installer_job: None,
            achievements: Vec::new(),
            changelog: Vec::new(),
            game_tab: GameTab::Overview,
            gallery_index: 0,
            toasts: Vec::new(),
            toast_seq: 0,
            images: ImageCache::new(),
            update: None,
            self_update: None,
            stats: Stats::load(),
            running: Default::default(),
            quit_requested: false,
            launching: None,
            confirm: None,
            scroll: ScrollHandle::new(),
            focus: cx.focus_handle(),
            tx,
            rx,
            _subs: subs,
        };
        window.focus(&app.focus, cx);
        app.prefetch_catalog_images();
        app.start_sync();
        app.start_update_check();
        crate::analytics::track("app_started", app.settings.language.clone());

        // Pump worker-thread messages onto the UI thread.
        cx.spawn(async move |this, cx| {
            loop {
                cx.background_executor().timer(Duration::from_millis(60)).await;
                let alive = this.update(cx, |app, cx| app.pump(cx)).is_ok();
                if !alive {
                    break;
                }
            }
        })
        .detach();
        app
    }

    pub fn lang(&self) -> &str {
        &self.settings.language
    }

    pub fn t(&self, key: &str) -> String {
        i18n::t(self.lang(), key)
    }

    pub fn tr(&self, key: &str, vars: &[(&str, &str)]) -> String {
        i18n::tr(self.lang(), key, vars)
    }

    pub fn game(&self, id: &str) -> Option<&Game> {
        self.catalog.games.iter().find(|g| g.id == id)
    }

    pub fn creation(&self, id: &str) -> Option<&Creation> {
        self.catalog.creations.iter().find(|c| c.id == id)
    }

    pub fn installed_count(&self) -> usize {
        self.catalog.games.iter().filter(|g| g.is_installed).count()
    }

    // --------------------------------------------------------------- toasts

    pub fn toast(&mut self, level: Level, text: impl Into<String>) {
        self.toast_seq += 1;
        self.toasts.push(Toast { id: self.toast_seq, level, text: text.into(), born: Instant::now() });
        if self.toasts.len() > 4 {
            self.toasts.remove(0);
        }
    }

    // ------------------------------------------------------- message pump

    fn pump(&mut self, cx: &mut Context<Self>) {
        let mut dirty = false;
        while let Ok(msg) = self.rx.try_recv() {
            dirty = true;
            self.handle(msg);
        }
        let before = self.toasts.len();
        self.toasts.retain(|t| t.born.elapsed() < Duration::from_secs(5));
        dirty |= before != self.toasts.len();
        if let Some((_, at)) = &self.launching {
            if at.elapsed() > Duration::from_millis(3000) {
                self.launching = None;
                dirty = true;
            }
        }
        if self.quit_requested {
            cx.quit();
        }
        if dirty {
            cx.notify();
        }
    }

    fn handle(&mut self, msg: Msg) {
        match msg {
            Msg::Catalog(cat) => {
                self.catalog = cat;
                self.ready = true;
                self.syncing = false;
                self.prefetch_catalog_images();
            }
            Msg::RemoteVersion { game_id, version } => {
                if let Some(g) = self.catalog.games.iter_mut().find(|g| g.id == game_id) {
                    g.remote_version = version;
                }
            }
            Msg::ImageReady => {}
            Msg::Progress { downloaded, total } => {
                if let Some(j) = &mut self.job {
                    j.downloaded = downloaded;
                    j.total = total;
                }
            }
            Msg::JobDone { game_id, mode, result } => {
                self.job = None;
                self.refresh_install_state();
                let name = self.game(&game_id).map(|g| g.name.clone()).unwrap_or_default();
                match result {
                    Ok(()) => {
                        let key = match mode {
                            Mode::Install => "install_complete",
                            Mode::Repair => "repair_complete",
                            Mode::Update => "update_complete",
                        };
                        let text = self.tr(key, &[("name", &name)]);
                        self.toast(Level::Success, text);
                        // The installed version just changed; refresh the "update available" badge.
                        self.fetch_remote_version(&game_id);
                    }
                    Err(e) => {
                        eprintln!("download failed: {e}");
                        self.toast(Level::Error, "Failed to download game. Please check your connection.");
                    }
                }
            }
            Msg::InstallerProgress { downloaded, total } => {
                if let Some(j) = &mut self.installer_job {
                    j.downloaded = downloaded;
                    j.total = total;
                }
            }
            Msg::InstallerDone { name, result } => {
                self.installer_job = None;
                match result {
                    Ok(()) => {
                        let text = self.tr("installer_launched", &[("name", &name)]);
                        self.toast(Level::Success, text);
                    }
                    Err(e) => {
                        eprintln!("installer failed: {e}");
                        let text = self.tr("installer_failed", &[("name", &name)]);
                        self.toast(Level::Error, text);
                    }
                }
            }
            Msg::Achievements { game_id, list } => {
                if matches!(&self.page, Page::Game(id) if *id == game_id) {
                    self.achievements = list;
                }
            }
            Msg::Toast(level, text) => self.toast(level, text),
            Msg::Update(info) => self.update = Some(info),
            Msg::SelfUpdateProgress { downloaded, total } => self.self_update = Some((downloaded, total)),
            Msg::SelfUpdateDone(result) => {
                self.self_update = None;
                match result {
                    // The installer is running; get out of its way so it can replace our files.
                    Ok(()) => self.quit_requested = true,
                    Err(e) => {
                        eprintln!("self-update failed: {e}");
                        self.toast(Level::Error, "Update failed. You can download it from the release page.");
                    }
                }
            }
            Msg::Played { game_id, started, secs } => self.stats.record(&game_id, started, secs),
            Msg::Exited { game_id } => {
                self.running.remove(&game_id);
            }
        }
    }

    // ------------------------------------------------------------ workers

    fn start_sync(&mut self) {
        self.syncing = true;
        let (tx, cached, path) = (self.tx.clone(), self.catalog.clone(), self.settings.game_path.clone());
        std::thread::spawn(move || {
            let mut cat = match data::fetch_remote_catalog() {
                Some(fresh) => data::merge_catalog(&cached, fresh),
                None => cached,
            };
            for g in &mut cat.games {
                let (installed, version) = installer::read_install_state(g, &path);
                g.is_installed = installed;
                g.version = version;
            }
            cat.save();
            let games = cat.games.clone();
            let _ = tx.send(Msg::Catalog(cat));
            // Remote versions: one lookup per game, in parallel (each may probe several URLs).
            for g in games {
                let tx = tx.clone();
                std::thread::spawn(move || {
                    let version = installer::read_remote_version(&g);
                    let _ = tx.send(Msg::RemoteVersion { game_id: g.id, version });
                });
            }
        });
    }

    fn fetch_remote_version(&self, game_id: &str) {
        let (tx, game) = (self.tx.clone(), self.game(game_id).cloned());
        if let Some(g) = game {
            std::thread::spawn(move || {
                let version = installer::read_remote_version(&g);
                let _ = tx.send(Msg::RemoteVersion { game_id: g.id, version });
            });
        }
    }

    fn start_update_check(&self) {
        let tx = self.tx.clone();
        std::thread::spawn(move || {
            let Some(json) = ureq::get("https://api.github.com/repos/Nytuo/Nytuo-Launcher/releases/latest")
                .set("User-Agent", "nytuo-launcher")
                .call()
                .ok()
                .and_then(|r| r.into_json::<serde_json::Value>().ok())
            else {
                return;
            };
            let tag = json.get("tag_name").and_then(|v| v.as_str()).unwrap_or("").trim_start_matches('v');
            if crate::util::compare_versions(Some(tag), Some(env!("CARGO_PKG_VERSION"))) == 1 {
                let asset = installer::fetch_latest_release_asset("https://github.com/Nytuo/Nytuo-Launcher");
                let _ = tx.send(Msg::Update(UpdateInfo {
                    version: tag.to_string(),
                    asset_name: asset.as_ref().map(|a| a.name.clone()),
                    asset_url: asset.map(|a| a.url),
                    url: json
                        .get("html_url")
                        .and_then(|v| v.as_str())
                        .unwrap_or("https://github.com/Nytuo/Nytuo-Launcher/releases")
                        .to_string(),
                }));
            }
        });
    }

    /// Downloads the new installer, launches it and quits (the installer replaces the app).
    pub fn install_self_update(&mut self) {
        let Some(u) = self.update.clone() else { return };
        let (Some(name), Some(url)) = (u.asset_name, u.asset_url) else {
            let _ = open_url_os(&u.url);
            return;
        };
        if self.self_update.is_some() {
            return;
        }
        self.self_update = Some((0, 0));
        let tx = self.tx.clone();
        std::thread::spawn(move || {
            let asset = installer::ReleaseAsset { name, url };
            let ptx = tx.clone();
            let result = installer::download_installer(&asset, move |d, t| {
                let _ = ptx.send(Msg::SelfUpdateProgress { downloaded: d, total: t });
            })
            .and_then(|path| platform::open_file(&path));
            let _ = tx.send(Msg::SelfUpdateDone(result));
        });
    }

    pub fn recheck_updates(&mut self) {
        self.start_update_check();
        self.start_sync();
        let text = self.t("checking_updates");
        self.toast(Level::Info, text);
    }

    fn prefetch_catalog_images(&self) {
        let mut urls: Vec<String> = Vec::new();
        for g in &self.catalog.games {
            urls.extend(g.logo.clone());
            urls.extend(g.background.clone());
        }
        for c in &self.catalog.creations {
            urls.extend(c.logo.clone());
        }
        let tx = self.tx.clone();
        self.images.prefetch(urls, move || {
            let _ = tx.send(Msg::ImageReady);
        });
    }

    pub fn prefetch_images(&self, urls: Vec<String>) {
        let tx = self.tx.clone();
        self.images.prefetch(urls, move || {
            let _ = tx.send(Msg::ImageReady);
        });
    }

    pub fn refresh_install_state(&mut self) {
        let path = self.settings.game_path.clone();
        for g in &mut self.catalog.games {
            let (installed, version) = installer::read_install_state(g, &path);
            g.is_installed = installed;
            g.version = version;
        }
    }

    // --------------------------------------------------------- navigation

    pub fn navigate(&mut self, page: Page, cx: &mut Context<Self>) {
        if self.page == page {
            return;
        }
        let prev = std::mem::replace(&mut self.page, page.clone());
        self.back_stack.push(prev);
        self.back_stack.truncate(32);
        self.enter_page(&page);
        cx.notify();
    }

    pub fn go_back(&mut self, cx: &mut Context<Self>) {
        if let Some(prev) = self.back_stack.pop() {
            self.page = prev.clone();
            self.enter_page(&prev);
            cx.notify();
        }
    }

    fn enter_page(&mut self, page: &Page) {
        self.scroll.set_offset(point(px(0.), px(0.)));
        self.confirm = None;
        self.game_tab = GameTab::Overview;
        self.gallery_index = 0;
        self.achievements.clear();
        self.changelog.clear();
        match page {
            Page::Game(id) => {
                self.refresh_install_state();
                self.changelog = content::changelog_for(id);
                if let Some(g) = self.game(id).cloned() {
                    let mut urls = g.screenshots.clone();
                    urls.extend(g.video.as_deref().and_then(crate::util::video_thumbnail));
                    self.prefetch_images(urls);
                }
                let (tx, id, path) = (self.tx.clone(), id.clone(), self.settings.game_path.clone());
                std::thread::spawn(move || {
                    let list = content::load_achievements(&id, &path);
                    let _ = tx.send(Msg::Achievements { game_id: id, list });
                });
            }
            Page::Creation(id) => {
                if let Some(c) = self.creation(id).cloned() {
                    let mut urls = c.screenshots.clone();
                    urls.extend(c.video.as_deref().and_then(crate::util::video_thumbnail));
                    self.prefetch_images(urls);
                }
            }
            _ => {}
        }
    }

    // ------------------------------------------------------------ actions

    pub fn start_job(&mut self, game_id: &str, mode: Mode) {
        if self.job.is_some() {
            let text = self.t("download_already_in_progress");
            self.toast(Level::Error, text);
            return;
        }
        self.job = Some(Job { game_id: game_id.to_string(), mode, downloaded: 0, total: 0 });
        let (tx, id) = (self.tx.clone(), game_id.to_string());
        let install_path = format!("{}/{}", self.settings.game_path, game_id);
        std::thread::spawn(move || {
            let progress_tx = tx.clone();
            let result = installer::run_job(mode, &id, &install_path, move |p| {
                let _ = progress_tx.send(Msg::Progress { downloaded: p.downloaded, total: p.total });
            });
            let _ = tx.send(Msg::JobDone { game_id: id, mode, result });
        });
    }

    pub fn launch(&mut self, game_id: &str) {
        let Some(g) = self.game(game_id).cloned() else { return };
        let base = format!("{}/{}", self.settings.game_path, g.id);
        let exec = match g.exec_for_platform() {
            Some(e) => e.to_string(),
            None if cfg!(target_os = "macos") => format!("{}.app", g.id),
            None if cfg!(target_os = "windows") => "nw.exe".to_string(),
            None => "nw".to_string(),
        };
        if self.running.contains(&g.id) {
            let text = self.tr("already_running", &[("name", &g.name)]);
            self.toast(Level::Info, text);
            return;
        }
        self.launching = Some((g.name.clone(), Instant::now()));
        match platform::launch_game(&format!("{base}/{exec}")) {
            Ok(Some(mut child)) => {
                self.running.insert(g.id.clone());
                // Supervise the process to measure play time.
                let (tx, id, started, t0) = (self.tx.clone(), g.id.clone(), stats::now_unix(), Instant::now());
                std::thread::spawn(move || {
                    let _ = child.wait();
                    let secs = t0.elapsed().as_secs();
                    let _ = tx.send(Msg::Exited { game_id: id.clone() });
                    // Launchers/bootstrappers that exit immediately are not real sessions.
                    if secs >= 5 {
                        let _ = tx.send(Msg::Played { game_id: id, started, secs });
                    }
                });
            }
            Ok(None) => {}
            Err(e) => {
                self.launching = None;
                let text = format!("{}: {e}", self.t("launch_failed"));
                self.toast(Level::Error, text);
            }
        }
    }

    pub fn uninstall(&mut self, game_id: &str) {
        let Some(g) = self.game(game_id).cloned() else { return };
        let path = format!("{}/{}", self.settings.game_path, g.id);
        match platform::delete_dir(&path) {
            Ok(()) => {
                self.refresh_install_state();
                let text = self.tr("uninstall_success", &[("name", &g.name)]);
                self.toast(Level::Success, text);
            }
            Err(e) => {
                eprintln!("uninstall failed: {e}");
                let text = self.tr("failed_uninstall", &[("name", &g.name)]);
                self.toast(Level::Error, text);
            }
        }
    }

    pub fn open_game_folder(&mut self, game_id: &str, sub: Option<&str>) {
        let base = format!("{}/{}", self.settings.game_path, game_id);
        let target = match sub {
            Some(s) if platform::normalize_path(&format!("{base}/{s}")).exists() => format!("{base}/{s}"),
            _ => base,
        };
        if platform::open_folder(&target).is_err() {
            let text = self.t("could_not_open_folder");
            self.toast(Level::Error, text);
        }
    }

    pub fn create_shortcut(&mut self, game_id: &str) {
        let Some(g) = self.game(game_id).cloned() else { return };
        if !cfg!(target_os = "windows") {
            let text = self.t("create_shortcut_only_windows");
            self.toast(Level::Error, text);
            return;
        }
        let base = format!("{}/{}", self.settings.game_path, g.id);
        let exec = g.exec_windows.clone().unwrap_or_else(|| "nw.exe".into());
        match platform::create_shortcut(&g.name, &format!("{base}/{exec}"), Some(&format!("{base}/{}.ico", g.id))) {
            Ok(()) => {
                let text = self.t("shortcut_created");
                self.toast(Level::Success, text);
            }
            Err(e) => {
                eprintln!("shortcut failed: {e}");
                let text = self.t("failed_create_shortcut");
                self.toast(Level::Error, text);
            }
        }
    }

    pub fn download_creation_installer(&mut self, creation_id: &str) {
        if self.installer_job.is_some() {
            return;
        }
        let Some(c) = self.creation(creation_id).cloned() else { return };
        self.installer_job = Some(InstallerJob { creation_id: c.id.clone(), downloaded: 0, total: 0 });
        let tx = self.tx.clone();
        std::thread::spawn(move || {
            let name = c.name.clone();
            let result = (|| {
                let Some(asset) = installer::fetch_latest_release_asset(&c.github) else {
                    // Same fallback as the original: send the user to the GitHub page.
                    let _ = tx.send(Msg::Toast(Level::Error, format!("No installer found for {} on this platform; opening GitHub...", c.name)));
                    let _ = open_url_os(&c.github);
                    return Ok(());
                };
                let progress_tx = tx.clone();
                let path = installer::download_installer(&asset, move |d, t| {
                    let _ = progress_tx.send(Msg::InstallerProgress { downloaded: d, total: t });
                })?;
                platform::open_file(&path)
            })();
            let _ = tx.send(Msg::InstallerDone { name, result });
        });
    }

    pub fn change_game_folder(&mut self, cx: &mut Context<Self>) {
        let rx = cx.prompt_for_paths(PathPromptOptions {
            files: false,
            directories: true,
            multiple: false,
            prompt: Some(self.t("select_install_folder_title").into()),
        });
        cx.spawn(async move |this, cx| {
            if let Ok(Ok(Some(paths))) = rx.await {
                if let Some(p) = paths.first() {
                    let chosen = p.to_string_lossy().replace('\\', "/");
                    let _ = this.update(cx, |app, cx| {
                        app.settings.game_path = chosen;
                        app.settings.save();
                        app.refresh_install_state();
                        app.toast(Level::Success, "Game installation folder updated.");
                        cx.notify();
                    });
                }
            }
        })
        .detach();
    }

    pub fn set_language(&mut self, lang: &str, window: &mut Window, cx: &mut Context<Self>) {
        self.settings.language = lang.to_string();
        self.settings.save();
        let placeholder = self.t("search_games_placeholder");
        self.search.update(cx, |s, cx| s.set_placeholder(placeholder, window, cx));
        cx.notify();
    }
}

/// Opens a URL in the default browser from a worker thread (no `App` handle there).
pub fn open_url_os(url: &str) -> std::io::Result<()> {
    use std::process::Command;
    if cfg!(target_os = "windows") {
        Command::new("cmd").args(["/C", "start", "", url]).spawn().map(|_| ())
    } else if cfg!(target_os = "macos") {
        Command::new("open").arg(url).spawn().map(|_| ())
    } else {
        Command::new("xdg-open").arg(url).spawn().map(|_| ())
    }
}
