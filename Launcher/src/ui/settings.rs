//! Settings page.

use super::kit::*;
use crate::app::LauncherApp;
use crate::i18n::LANGUAGES;
use gpui_kit::component::group_box::GroupBox;
use gpui_kit::component::tab::{Tab, TabBar};
use gpui_kit::component::IconName;
use gpui_kit::prelude::*;
use gpui_kit::*;

impl LauncherApp {
    fn section(&self, title: String, subtitle: String) -> GroupBox {
        panel(24., 16.).child(div().flex().flex_col().gap_1().child(heading(title)).when(!subtitle.is_empty(), |d| d.child(muted(subtitle))))
    }

    pub fn settings_page(&mut self, cx: &mut Context<Self>) -> AnyElement {
        // -- general
        let selected = LANGUAGES.iter().position(|l| l.0 == self.settings.language).unwrap_or(0);
        let langs = TabBar::new("languages")
            .segmented()
            .selected_index(selected)
            .on_click(cx.listener(|this, idx: &usize, window, cx| this.set_language(LANGUAGES[*idx].0, window, cx)))
            .children(LANGUAGES.iter().map(|(_, name)| Tab::new().label(*name)));

        let general = self
            .section(self.t("general"), self.t("manage_settings"))
            .child(
                div()
                    .flex()
                    .flex_col()
                    .gap_2()
                    .child(eyebrow(self.t("games_installation_folder")))
                    .child(
                        div()
                            .flex()
                            .flex_row()
                            .gap_2()
                            .child(
                                div()
                                    .flex_1()
                                    .min_w_0()
                                    .h(px(38.))
                                    .px_3()
                                    .flex()
                                    .items_center()
                                    .rounded(px(10.))
                                    .bg(col(SURFACE2))
                                    .border_1()
                                    .border_color(col(BORDER))
                                    .text_size(px(13.))
                                    .truncate()
                                    .child(self.settings.game_path.clone()),
                            )
                            .child(
                                button("pick-folder", &self.t("change"), Some(IconName::FolderOpen), Kind::Secondary, Sz::Md, false)
                                    .on_click(cx.listener(|this, _, _, cx| this.change_game_folder(cx))),
                            ),
                    ),
            )
            .child(div().flex().flex_col().gap_2().child(eyebrow(self.t("language_label"))).child(langs));

        // -- updates
        let status = match &self.update {
            Some(u) => (format!("v{} available", u.version), AMBER),
            None => (self.t("launcher_up_to_date"), MUTED),
        };
        let mut upd_buttons = div().flex().flex_row().gap_2().child(
            button("check-updates", &self.t("force_update"), Some(IconName::RefreshCw), Kind::Secondary, Sz::Sm, false)
                .on_click(cx.listener(|this, _, _, cx| {
                    this.recheck_updates();
                    cx.notify();
                })),
        );
        if let Some(u) = &self.update {
            let url = u.url.clone();
            let busy = self.self_update.is_some();
            upd_buttons = upd_buttons
                .child(
                    button("open-release", &self.t("view_release"), Some(IconName::ExternalLink), Kind::Secondary, Sz::Sm, false)
                        .on_click(cx.listener(move |_, _, _, cx| cx.open_url(&url))),
                )
                .child(
                    button("install-update", &self.t("install_update"), Some(IconName::ArrowDown), Kind::Primary, Sz::Sm, busy).when(!busy, |b| {
                        b.on_click(cx.listener(|this, _, _, cx| {
                            this.install_self_update();
                            cx.notify();
                        }))
                    }),
                );
        }
        let updates = self.section(self.t("update"), self.t("update_description")).child(
            div()
                .flex()
                .flex_row()
                .items_center()
                .justify_between()
                .p_4()
                .rounded(px(12.))
                .bg(col(SURFACE2))
                .border_1()
                .border_color(col(BORDER))
                .child(
                    div()
                        .flex()
                        .flex_col()
                        .child(div().font_weight(FontWeight::BOLD).text_size(px(14.)).child(self.tr("version_text", &[("version", env!("CARGO_PKG_VERSION"))])))
                        .child(div().text_size(px(12.)).text_color(col(status.1)).child(status.0)),
                )
                .child(upd_buttons),
        );

        // -- about
        let about = self.section(self.t("about_community"), String::new()).child(
            div()
                .flex()
                .flex_row()
                .gap_2()
                .child(
                    button("web", &self.t("website"), Some(IconName::Globe), Kind::Secondary, Sz::Md, false)
                        .on_click(cx.listener(|_, _, _, cx| cx.open_url("https://nytuo.fr/software/launcher"))),
                )
                .child(
                    button("gh", &self.t("github"), Some(IconName::Github), Kind::Secondary, Sz::Md, false)
                        .on_click(cx.listener(|_, _, _, cx| cx.open_url("https://github.com/Nytuo"))),
                ),
        );

        div()
            .w_full()
            .max_w(px(860.))
            .mx_auto()
            .px_10()
            .py_10()
            .flex()
            .flex_col()
            .gap_5()
            .child(
                div()
                    .flex()
                    .flex_col()
                    .gap_1()
                    .child(div().text_size(px(30.)).font_weight(FontWeight::EXTRA_BOLD).child(self.t("settings")))
                    .child(muted(self.t("settings_description"))),
            )
            .child(general)
            .child(updates)
            .child(about)
            .child(div().pt_4().text_center().text_size(px(11.)).text_color(col(MUTED)).child("© 2026 Nytuo Launcher — Rust + GPUI"))
            .into_any_element()
    }
}
