//! Root view: custom title bar, sidebar, routed page, toasts and modals.

mod creation;
mod gallery;
mod game;
mod kit;
mod library;
mod settings;

use crate::app::{Confirm, LauncherApp, Level, Page};
use crate::installer::Mode;
use gpui_kit::component::IconName;
use gpui_kit::prelude::*;
use gpui_kit::*;
use kit::*;
pub use kit::apply_theme;

pub const SIDEBAR_W: f32 = 236.;

impl LauncherApp {
    /// Local path of a cached remote image, if it already downloaded.
    pub fn image(&self, url: &Option<String>) -> Option<std::path::PathBuf> {
        url.as_deref().and_then(|u| self.images.get(u))
    }

    /// Custom title bar. The back button lives *outside* the drag region: on Windows a
    /// `WindowControlArea::Drag` hitbox turns every click inside it into a caption click,
    /// which is why a button nested in `gpui-component`'s `TitleBar` never fired.
    fn titlebar(&self, window: &Window, cx: &mut Context<Self>) -> impl IntoElement {
        let can_back = !self.back_stack.is_empty();
        let native_controls = cfg!(target_os = "windows");
        let maximized = window.is_maximized();

        let control = |id: &'static str, ic: IconName, area: WindowControlArea, danger: bool| {
            div()
                .id(id)
                .w(px(46.))
                .h_full()
                .flex()
                .items_center()
                .justify_center()
                .window_control_area(area)
                .cursor_pointer()
                .hover(move |s| s.bg(if danger { col(RED) } else { col(SURFACE3) }))
                .child(icon(ic, 14., TEXT))
        };
        let mut min = control("win-min", IconName::WindowMinimize, WindowControlArea::Min, false);
        let mut max = control(
            "win-max",
            if maximized { IconName::WindowRestore } else { IconName::WindowMaximize },
            WindowControlArea::Max,
            false,
        );
        let mut close = control("win-close", IconName::WindowClose, WindowControlArea::Close, true);
        if !native_controls {
            // Windows handles these through the non-client hit test; elsewhere we act on the click.
            min = min.on_click(|_, window, _| window.minimize_window());
            max = max.on_click(|_, window, _| window.zoom_window());
            close = close.on_click(|_, window, _| window.remove_window());
        }

        div()
            .id("titlebar")
            .h(px(36.))
            .w_full()
            .flex_shrink_0()
            .flex()
            .flex_row()
            .items_center()
            .bg(col(SIDEBAR))
            .border_b_1()
            .border_color(col(BORDER))
            .child(
                div()
                    .id("back")
                    .ml_2()
                    .size(px(28.))
                    .flex()
                    .items_center()
                    .justify_center()
                    .rounded_md()
                    .when(can_back, |d| {
                        d.cursor_pointer()
                            .hover(|s| s.bg(col(SURFACE3)))
                            .tooltip(tip(self.t("back")))
                            .on_click(cx.listener(|this, _, _, cx| this.go_back(cx)))
                            .child(icon(IconName::ArrowLeft, 16., TEXT))
                    })
                    .when(!can_back, |d| d.child(icon(IconName::ArrowLeft, 16., BORDER))),
            )
            .child(
                div()
                    .id("drag")
                    .flex_1()
                    .h_full()
                    .flex()
                    .items_center()
                    .px_3()
                    .window_control_area(WindowControlArea::Drag)
                    .when(!native_controls, |d| {
                        d.on_mouse_down(MouseButton::Left, |_, window, _| window.start_window_move())
                    })
                    .text_size(px(12.))
                    .font_weight(FontWeight::SEMIBOLD)
                    .text_color(col(MUTED))
                    .child("Nytuo Launcher"),
            )
            .child(div().h_full().flex().flex_row().child(min).child(max).child(close))
    }

    fn nav_item(
        &self,
        id: &'static str,
        ic: IconName,
        label: String,
        active: bool,
        page: Page,
        cx: &mut Context<Self>,
    ) -> impl IntoElement {
        div()
            .id(id)
            .flex()
            .flex_row()
            .items_center()
            .gap_3()
            .h(px(38.))
            .px_3()
            .rounded(px(10.))
            .cursor_pointer()
            .text_size(px(13.))
            .font_weight(FontWeight::SEMIBOLD)
            .text_color(col(if active { TEXT } else { MUTED }))
            .bg(if active { alpha(ACCENT, 0.16) } else { alpha(ACCENT, 0.0) })
            .hover(|s| s.bg(col(SURFACE2)).text_color(col(TEXT)))
            .on_click(cx.listener(move |this, _, _, cx| this.navigate(page.clone(), cx)))
            .child(icon(ic, 16., if active { ACCENT_HOVER } else { MUTED }))
            .child(label)
    }

    fn sidebar(&self, cx: &mut Context<Self>) -> impl IntoElement {
        let installed: Vec<_> = self.catalog.games.iter().filter(|g| g.is_installed).cloned().collect();
        let mut list = div().flex().flex_col().gap_1();
        for g in installed {
            let id = g.id.clone();
            let active = self.page == Page::Game(g.id.clone());
            let downloading = self.job.as_ref().is_some_and(|j| j.game_id == g.id);
            list = list.child(
                div()
                    .id(SharedString::from(format!("side-{}", g.id)))
                    .flex()
                    .flex_row()
                    .items_center()
                    .gap_2()
                    .h(px(36.))
                    .px_2()
                    .rounded(px(10.))
                    .cursor_pointer()
                    .bg(if active { alpha(ACCENT, 0.16) } else { alpha(ACCENT, 0.0) })
                    .hover(|s| s.bg(col(SURFACE2)))
                    .on_click(cx.listener(move |this, _, _, cx| this.navigate(Page::Game(id.clone()), cx)))
                    .child(
                        div()
                            .size(px(24.))
                            .rounded(px(6.))
                            .overflow_hidden()
                            .flex_shrink_0()
                            .bg(col(SURFACE3))
                            .when_some(self.image(&g.logo), |d, p| d.child(contain(p).rounded(px(6.)))),
                    )
                    .child(
                        div()
                            .flex_1()
                            .min_w_0()
                            .truncate()
                            .text_size(px(13.))
                            .text_color(col(if active { TEXT } else { MUTED }))
                            .child(g.name.clone()),
                    )
                    .when(g.update_available(), |d| d.child(dot(AMBER)))
                    .when(downloading, |d| d.child(icon(IconName::ArrowDown, 14., ACCENT_HOVER))),
            );
        }

        let mut footer = div().flex().flex_col().gap_2();
        if let Some(job) = &self.job {
            let pct = if job.total > 0 { job.downloaded as f32 * 100. / job.total as f32 } else { 0. };
            let name = self.game(&job.game_id).map(|g| g.name.clone()).unwrap_or_default();
            let id = job.game_id.clone();
            let verb = match job.mode {
                Mode::Install => self.t("installing"),
                Mode::Repair => self.t("repair_files"),
                Mode::Update => self.t("update"),
            };
            footer = footer.child(
                div()
                    .id("active-job")
                    .cursor_pointer()
                    .on_click(cx.listener(move |this, _, _, cx| this.navigate(Page::Game(id.clone()), cx)))
                    .child(
                        panel(12., 8.)
                            .child(
                                div()
                                    .flex()
                                    .flex_row()
                                    .justify_between()
                                    .text_size(px(12.))
                                    .child(div().truncate().font_weight(FontWeight::SEMIBOLD).child(format!("{verb} · {name}")))
                                    .child(div().text_color(col(MUTED)).child(format!("{}%", pct.round() as u32))),
                            )
                            .child(progress_bar("side-progress", pct, 5.)),
                    ),
            );
        }
        if let Some(u) = &self.update {
            let progress = self.self_update;
            let label = match progress {
                Some((d, t)) if t > 0 => format!("{} {}%", self.t("updating_launcher"), d * 100 / t),
                Some(_) => self.t("updating_launcher"),
                None => self.tr("launcher_update_available", &[("version", &u.version)]),
            };
            footer = footer.child(
                div()
                    .id("update-banner")
                    .flex()
                    .flex_row()
                    .items_center()
                    .gap_2()
                    .p_3()
                    .rounded(px(12.))
                    .cursor_pointer()
                    .bg(alpha(AMBER, 0.12))
                    .border_1()
                    .border_color(alpha(AMBER, 0.4))
                    .hover(|s| s.bg(alpha(AMBER, 0.2)))
                    .when(progress.is_none(), |d| d.on_click(cx.listener(|this, _, _, cx| {
                        this.install_self_update();
                        cx.notify();
                    })))
                    .child(icon(IconName::RefreshCw, 16., AMBER))
                    .child(
                        div()
                            .text_size(px(12.))
                            .text_color(col(AMBER))
                            .font_weight(FontWeight::SEMIBOLD)
                            .child(label),
                    ),
            );
        }
        footer = footer.child(
            div()
                .text_size(px(11.))
                .text_color(col(MUTED))
                .px_1()
                .child(format!("v{} · GPUI", env!("CARGO_PKG_VERSION"))),
        );

        div()
            .w(px(SIDEBAR_W))
            .h_full()
            .flex_shrink_0()
            .flex()
            .flex_col()
            .gap_4()
            .p_3()
            .bg(col(SIDEBAR))
            .border_r_1()
            .border_color(col(BORDER))
            .child(
                div()
                    .flex()
                    .flex_row()
                    .items_center()
                    .gap_3()
                    .px_2()
                    .pt_1()
                    .child(img("images/logo.png").size(px(34.)).object_fit(ObjectFit::Contain))
                    .child(
                        div()
                            .text_size(px(15.))
                            .font_weight(FontWeight::EXTRA_BOLD)
                            .child(self.t("nytuo_launcher")),
                    ),
            )
            .child(
                div()
                    .flex()
                    .flex_col()
                    .gap_1()
                    .child(self.nav_item(
                        "nav-library",
                        IconName::LayoutDashboard,
                        self.t("home"),
                        self.page == Page::Library,
                        Page::Library,
                        cx,
                    ))
                    .child(self.nav_item(
                        "nav-settings",
                        IconName::Settings,
                        self.t("settings"),
                        self.page == Page::Settings,
                        Page::Settings,
                        cx,
                    )),
            )
            .child(
                div()
                    .flex_1()
                    .min_h_0()
                    .flex()
                    .flex_col()
                    .gap_2()
                    .child(eyebrow(format!("{} · {}", self.t("installed"), self.installed_count())).px_2())
                    .child(div().id("side-list").flex_1().min_h_0().overflow_y_scroll().child(list)),
            )
            .child(footer)
    }

    /// Keyboard model: Esc = dismiss dialog / clear search / go back, Ctrl+F (or Ctrl+K) = search,
    /// Alt+Left = back, Ctrl+, = settings.
    fn on_key(&mut self, ev: &KeyDownEvent, window: &mut Window, cx: &mut Context<Self>) {
        let k = ev.keystroke.key.as_str();
        let m = &ev.keystroke.modifiers;
        let cmd = m.control || m.platform;
        if k == "escape" {
            if self.confirm.is_some() {
                self.confirm = None;
            } else if !self.query.is_empty() {
                self.search.update(cx, |s, cx| s.set_value("", window, cx));
                self.query.clear();
            } else {
                self.go_back(cx);
            }
            window.focus(&self.focus, cx);
            cx.notify();
        } else if cmd && (k == "f" || k == "k") {
            self.navigate(Page::Library, cx);
            let handle = self.search.focus_handle(cx);
            window.focus(&handle, cx);
        } else if cmd && k == "," {
            self.navigate(Page::Settings, cx);
        } else if m.alt && k == "left" {
            self.go_back(cx);
        }
    }

    fn toasts(&self) -> impl IntoElement {
        let mut stack = div()
            .absolute()
            .right_4()
            .bottom_4()
            .flex()
            .flex_col()
            .gap_2()
            .items_end();
        for t in &self.toasts {
            let (c, ic) = match t.level {
                Level::Info => (BLUE, IconName::Info),
                Level::Success => (GREEN, IconName::CircleCheck),
                Level::Error => (RED, IconName::CircleAlert),
            };
            stack = stack.child(
                div()
                    .flex()
                    .flex_row()
                    .items_center()
                    .gap_3()
                    .max_w(px(420.))
                    .px_4()
                    .py_3()
                    .rounded(px(12.))
                    .bg(col(SURFACE2))
                    .border_1()
                    .border_color(alpha(c, 0.5))
                    .shadow_lg()
                    .text_size(px(13.))
                    .child(icon(ic, 18., c))
                    .child(div().child(t.text.clone())),
            );
        }
        stack
    }

    fn modal(&self, cx: &mut Context<Self>) -> Option<AnyElement> {
        let Confirm::Uninstall(id) = self.confirm.as_ref()?;
        let name = self.game(id)?.name.clone();
        let id = id.clone();
        Some(
            div()
                .id("modal-backdrop")
                .absolute()
                .size_full()
                .flex()
                .items_center()
                .justify_center()
                .bg(alpha(0x000000, 0.6))
                .occlude()
                .on_click(cx.listener(|this, _, _, cx| {
                    this.confirm = None;
                    cx.notify();
                }))
                .child(
                    div()
                        .id("modal")
                        .w(px(420.))
                        .on_click(|_, _, cx| cx.stop_propagation())
                        .child(
                    panel(24., 16.)
                        .child(heading(self.t("uninstall_game")))
                        .child(muted(format!("{name} — {}", self.t("uninstall_confirm"))))
                        .child(
                            div()
                                .flex()
                                .flex_row()
                                .justify_end()
                                .gap_2()
                                .child(
                                    button("cancel", &self.t("cancel"), None, Kind::Secondary, Sz::Md, false).on_click(
                                        cx.listener(|this, _, _, cx| {
                                            this.confirm = None;
                                            cx.notify();
                                        }),
                                    ),
                                )
                                .child(
                                    button("confirm", &self.t("uninstall_game"), Some(IconName::Delete), Kind::Danger, Sz::Md, false)
                                        .on_click(cx.listener(move |this, _, _, cx| {
                                            this.confirm = None;
                                            this.uninstall(&id);
                                            cx.notify();
                                        })),
                                ),
                        ),
                        ),
                )
                .into_any_element(),
        )
    }
}

impl Render for LauncherApp {
    fn render(&mut self, window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let avail = f32::from(window.viewport_size().width) - SIDEBAR_W;
        let page = match self.page.clone() {
            Page::Library => self.library_page(avail, cx),
            Page::Game(id) => self.game_page(&id, avail, cx),
            Page::Creation(id) => self.creation_page(&id, cx),
            Page::Settings => self.settings_page(cx),
        };
        let launching = self.launching.clone();

        div()
            .size_full()
            .flex()
            .flex_col()
            .bg(col(BG))
            .text_color(col(TEXT))
            .track_focus(&self.focus)
            .on_key_down(cx.listener(|this, ev: &KeyDownEvent, window, cx| this.on_key(ev, window, cx)))
            .child(self.titlebar(window, cx))
            .child(
                div()
                    .flex_1()
                    .min_h_0()
                    .flex()
                    .flex_row()
                    .child(self.sidebar(cx))
                    .child(
                        div()
                            .flex_1()
                            .min_w_0()
                            .h_full()
                            .relative()
                            .child(
                                div()
                                    .id("page-scroll")
                                    .size_full()
                                    .overflow_y_scroll()
                                    .track_scroll(&self.scroll)
                                    .child(page),
                            )
                            .when_some(launching, |d, (name, _)| {
                                d.child(
                                    div()
                                        .absolute()
                                        .top_4()
                                        .left_0()
                                        .right_0()
                                        .flex()
                                        .justify_center()
                                        .child(
                                            div()
                                                .flex()
                                                .items_center()
                                                .gap_3()
                                                .px_5()
                                                .py_3()
                                                .rounded_full()
                                                .bg(col(ACCENT))
                                                .shadow_lg()
                                                .text_size(px(14.))
                                                .font_weight(FontWeight::BOLD)
                                                .text_color(col(0xffffff))
                                                .child(icon(IconName::Play, 16., 0xffffff))
                                                .child(self.tr("launching", &[("name", &name)])),
                                        ),
                                )
                            })
                            .child(self.toasts()),
                    ),
            )
            .children(self.modal(cx))
    }
}
