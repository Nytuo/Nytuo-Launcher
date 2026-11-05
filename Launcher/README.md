# Nytuo Launcher (Rust + GPUI)

A pure-Rust rewrite of the launcher (no WebView, no React, no Tauri) on top of
[GPUI](https://www.gpui.rs/) and [GPUI Kit](https://gpui-kit.com) (`gpui-kit` 0.9: GPUI + `gpui-component`).
This replaces the former Tauri/React app (still available in git history before the `gpui-default` merge).

```bash
cargo run            # debug (from this folder)
cargo run --release  # optimised
cargo test           # unit tests (offline)
cargo test -- --ignored manifest   # live manifest check against download.nytuo.fr
```

Needs the Rust toolchain + CMake; on Windows also the Windows SDK (GPUI compiles its shaders with `fxc`).

## Feature parity

| Feature (Tauri/React) | GPUI |
| --- | --- |
| Library from PocketBase (`games` + extra sources), offline cache | ✅ `data.rs`, cached in `%APPDATA%/NytuoLauncher/catalog.json` |
| Install / repair / update from chunked manifests, one download at a time | ✅ `installer.rs` (same URL variants, same rules) |
| Installed-version detection (`manifest.json`, legacy `*_Version.txt`), remote version, update badge | ✅ |
| Launch (Windows / Linux / macOS bundle handling), open folder / saves, uninstall, desktop shortcut | ✅ `platform.rs` |
| Achievements, changelogs (bundled) | ✅ `content.rs` |
| "More from Nytuo" creations + one-click GitHub installer download | ✅ |
| Screenshot gallery | ✅ shared by games and projects; videos show a YouTube thumbnail with a play button and open in the browser (no WebView = no embedded player) |
| en / fr / es, game folder picker, search + filters | ✅ translations reused verbatim |
| Custom title bar + window controls | ✅ own title bar (so the back button can receive clicks) |
| Launcher self-update | ✅ downloads the release installer for your OS, launches it and quits (no signature check, unlike the Tauri updater) |
| Aptabase analytics | ✅ one anonymous `app_started` event, same instance/key (`analytics.rs`) |
| Time played / last played | ✅ real tracking from the game process (`stats.rs`, `playtime.json`); sessions under 5 s ignored; macOS `open` launches can't be timed |

## Layout changes

* Persistent sidebar: Home, Settings, installed games (with update dots) and a live download card.
* Home: featured hero (update ready → installed → first installable), filter chips, responsive card grid.
* Game page: hero, action bar with explicit *Manage* row (no hidden dropdown), progress card, tabs
  (Overview / Recent updates / Achievements / Gallery).
* UI is built from `gpui-kit` widgets: Button, Tag (pills), Progress, GroupBox (panels), TabBar (tabs, filters, language) and the native GPUI grid; the palette is pushed into the component theme (`ui::apply_theme`). Toasts and the uninstall modal are custom. Installs write `manifest.json` last so an interrupted
  install never shows up as installed.

## UX notes

Accent is the logo blue `#0047C3` (lighter tint for text on dark surfaces). Keyboard: `Esc` closes dialog / clears search / goes back,
`Ctrl+F` or `Ctrl+K` search, `Ctrl+,` settings, `Alt+←` back. Disabled actions explain why in a tooltip, destructive actions ask first.

## Layout of the code

```
src/app.rs        state, message pump, all side effects
src/data.rs       models + PocketBase client
src/installer.rs  downloader, install state, creation installers
src/platform.rs   OS integration
src/content.rs    changelog / achievement parsing (data embedded from assets/data)
src/images.rs     on-disk cache for remote images (GPUI has no HTTP client)
src/ui/           kit.rs (palette + widgets), mod.rs (shell), library / game / creation / settings
tools/            dev helpers (ui-shot.ps1 screenshots the window, add-i18n.cjs)
```

## Releases

`.github/workflows/release.yml` (manual dispatch, draft release) builds the same artifact set as the former Tauri app:
`nytuo-launcher_<v>_x64-setup.exe` (NSIS), `nytuo-launcher_<v>_{aarch64,x64}.dmg` + `.app.tar.gz`,
`.deb` / `.rpm` / `.AppImage` for x86_64 and arm64, minisign `.sig` files (same `TAURI_SIGNING_PRIVATE_KEY`) and `latest.json`,
so existing 4.x installs keep updating and the Homebrew cask workflow keeps working. Installers come from
[`cargo-packager`](https://github.com/crabnebula-dev/cargo-packager) (config in `Cargo.toml`) and `cargo-generate-rpm`.
The Windows installer was verified locally; the macOS and Linux jobs have not run yet — dispatch one pre-release before relying on them.
