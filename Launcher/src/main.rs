#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod analytics;
mod app;
mod config;
mod content;
mod data;
mod i18n;
mod images;
mod installer;
mod platform;
mod stats;
mod ui;
mod util;

use gpui_kit::component::{Theme, ThemeMode, TitleBar};
use gpui_kit::*;
use rust_embed::RustEmbed;
use std::borrow::Cow;

#[derive(RustEmbed)]
#[folder = "assets/images"]
#[prefix = "images/"]
struct AppImages;

/// Icons from GPUI Kit + the launcher's own images.
struct LauncherAssets;

impl AssetSource for LauncherAssets {
    fn load(&self, path: &str) -> Result<Option<Cow<'static, [u8]>>> {
        if let Some(f) = AppImages::get(path) {
            return Ok(Some(f.data));
        }
        gpui_kit::assets::Assets.load(path)
    }

    fn list(&self, path: &str) -> Result<Vec<SharedString>> {
        let mut v = gpui_kit::assets::Assets.list(path)?;
        v.extend(AppImages::iter().filter(|n| n.starts_with(path)).map(|n| SharedString::from(n.to_string())));
        Ok(v)
    }
}

fn main() {
    gpui_kit::application().with_assets(LauncherAssets).run(|cx| {
        gpui_kit::init(cx);
        Theme::change(ThemeMode::Dark, None, cx);
        ui::apply_theme(cx);

        let bounds = Bounds::centered(None, size(px(1320.), px(820.)), cx);
        let mut titlebar = TitleBar::title_bar_options();
        titlebar.title = Some("Nytuo Launcher".into());
        let options = WindowOptions {
            titlebar: Some(titlebar),
            app_id: Some("fr.nytuo.launcher".into()),
            window_bounds: Some(WindowBounds::Windowed(bounds)),
            window_min_size: Some(size(px(960.), px(620.))),
            ..TitleBar::window_options()
        };
        gpui_kit::open_window(options, cx, |window, cx| cx.new(|cx| app::LauncherApp::new(window, cx)))
            .expect("failed to open the launcher window");
        cx.activate(true);
    });
}
