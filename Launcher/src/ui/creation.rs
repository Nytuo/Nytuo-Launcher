//! "More from Nytuo" project page (apps / tools distributed as installers).

use super::kit::*;
use crate::app::LauncherApp;
use crate::util;
use gpui_kit::component::IconName;
use gpui_kit::prelude::*;
use gpui_kit::*;

/// Fixed reading width of the project page (including its 40px side padding).
const CONTENT_W: f32 = 1000.;

impl LauncherApp {
    pub fn creation_page(&mut self, id: &str, cx: &mut Context<Self>) -> AnyElement {
        let Some(c) = self.creation(id).cloned() else {
            return div().p_10().child(muted(self.t("creation_not_found"))).into_any_element();
        };
        let (status_label, status_color) = match c.status.as_deref() {
            Some("active") => (Some("Active"), GREEN),
            Some("maintained") => (Some("Maintained"), BLUE),
            Some("wip") => (Some("Work in Progress"), AMBER),
            Some("archived") => (Some("Archived"), MUTED),
            _ => (None, MUTED),
        };
        let can_download = c.github_dl && !c.github.is_empty();
        let job = self.installer_job.as_ref().filter(|j| j.creation_id == c.id);
        let installing = job.is_some();

        let mut tech = div().flex().flex_row().flex_wrap().justify_center().gap_2();
        for t in &c.tech {
            tech = tech.child(pill(util::tag_parser(t), MUTED));
        }

        let mut buttons = div().flex().flex_row().flex_wrap().justify_center().gap_3().pt_2();
        if can_download {
            let cid = c.id.clone();
            buttons = buttons.child(
                button("dl", &self.t("download_and_run_installer"), Some(IconName::ArrowDown), Kind::Primary, Sz::Lg, installing)
                    .when(!installing, |b| {
                        b.on_click(cx.listener(move |this, _, _, cx| {
                            this.download_creation_installer(&cid);
                            cx.notify();
                        }))
                    }),
            );
        }
        if let Some(site) = c.website.clone() {
            buttons = buttons.child(
                button("site", &self.t("visit_website"), Some(IconName::Globe), Kind::Secondary, Sz::Lg, false)
                    .on_click(cx.listener(move |_, _, _, cx| cx.open_url(&site))),
            );
        }
        if !c.github.is_empty() && !can_download {
            let gh = c.github.clone();
            buttons = buttons.child(
                button("gh", "GitHub", Some(IconName::Github), Kind::Secondary, Sz::Lg, false)
                    .on_click(cx.listener(move |_, _, _, cx| cx.open_url(&gh))),
            );
        }

        let mut hero = div()
            .flex()
            .flex_col()
            .items_center()
            .text_center()
            .gap_4()
            .child(
                div()
                    .size(px(120.))
                    .rounded(px(26.))
                    .overflow_hidden()
                    .bg(col(SURFACE))
                    .border_1()
                    .border_color(col(BORDER))
                    .p_4()
                    .when_some(self.image(&c.logo), |d, p| d.child(contain(p).rounded(px(14.)))),
            )
            .children(status_label.map(|l| {
                div().flex().items_center().gap_2().child(dot(status_color)).child(div().text_size(px(12.)).text_color(col(MUTED)).child(l))
            }))
            .child(div().text_size(px(38.)).font_weight(FontWeight::EXTRA_BOLD).child(c.name.clone()))
            .when_some(c.summary.clone(), |d, s| d.child(div().max_w(px(620.)).text_size(px(15.)).text_color(col(MUTED)).child(s)))
            .child(tech)
            .child(buttons);
        if can_download {
            hero = hero.child(div().max_w(px(440.)).text_size(px(11.)).text_color(col(MUTED)).child(self.t("creation_not_managed_notice")));
        }
        if let Some(j) = job {
            let pct = if j.total > 0 { j.downloaded as f32 * 100. / j.total as f32 } else { 0. };
            hero = hero.child(
                div()
                    .w(px(300.))
                    .flex()
                    .flex_col()
                    .gap_1()
                    .child(progress_bar("inst-progress", pct, 8.))
                    .child(muted(if j.total > 0 { format!("{} / {}", util::format_bytes(j.downloaded), util::format_bytes(j.total)) } else { "…".into() })),
            );
        }

        let mut page = div()
            .w_full()
            .max_w(px(CONTENT_W))
            .mx_auto()
            .px_10()
            .py_12()
            .flex()
            .flex_col()
            .gap_10()
            .child(hero);

        if let Some(d) = c.description.clone() {
            page = page.child(div().max_w(px(680.)).mx_auto().text_center().text_size(px(14.)).line_height(relative(1.7)).text_color(col(0xc9cfdd)).child(d));
        }

        if !c.authors.is_empty() {
            let mut row = div().flex().flex_row().flex_wrap().justify_center().gap_2();
            for a in &c.authors {
                row = row.child(
                    div()
                        .px_3()
                        .py_1()
                        .rounded_full()
                        .bg(col(SURFACE))
                        .border_1()
                        .border_color(col(BORDER))
                        .text_size(px(13.))
                        .child(a.name.clone())
                        .when_some(a.role.clone(), |d, r| d.child(div().text_color(col(MUTED)).child(format!(" — {r}")))),
                );
            }
            page = page.child(div().flex().flex_col().items_center().gap_3().child(eyebrow(if c.authors.len() > 1 { "Authors" } else { "Author" })).child(row));
        }

        if !c.features.is_empty() {
            let mut grid = div().grid().grid_cols(2).gap(px(16.));
            for f in &c.features {
                grid = grid.child(
                    panel(20., 4.)
                        .child(div().font_weight(FontWeight::BOLD).child(f.name.clone()))
                        .child(div().text_size(px(12.5)).line_height(relative(1.55)).text_color(col(MUTED)).child(f.description.clone())),
                );
            }
            page = page.child(
                div()
                    .flex()
                    .flex_col()
                    .gap_4()
                    .child(heading(self.tr("features_title", &[("name", &c.name)])).text_center())
                    .child(grid),
            );
        }

        if let Some(doc) = c.documentation.clone() {
            page = page.child(
                surface()
                    .p_5()
                    .flex()
                    .flex_row()
                    .items_center()
                    .gap_4()
                    .child(icon(IconName::BookOpen, 24., ACCENT_HOVER))
                    .child(
                        div()
                            .flex_1()
                            .flex()
                            .flex_col()
                            .child(div().font_weight(FontWeight::BOLD).child(self.t("documentation_title")))
                            .child(muted(self.t("documentation_subtitle"))),
                    )
                    .child(
                        button("docs", &self.t("view_documentation"), Some(IconName::ExternalLink), Kind::Secondary, Sz::Sm, false)
                            .on_click(cx.listener(move |_, _, _, cx| cx.open_url(&doc))),
                    ),
            );
        }

        if let Some(brew) = c.homebrew.clone() {
            let cmd = format!("brew install --cask {brew}");
            let copy = cmd.clone();
            page = page.child(
                surface()
                    .p_4()
                    .flex()
                    .flex_row()
                    .items_center()
                    .justify_between()
                    .gap_4()
                    .child(div().font_family("Consolas").text_size(px(13.)).child(cmd))
                    .child(
                        button("brew", &self.t("copy"), Some(IconName::Copy), Kind::Secondary, Sz::Sm, false).on_click(cx.listener(
                            move |this, _, _, cx| {
                                cx.write_to_clipboard(ClipboardItem::new_string(copy.clone()));
                                let text = this.t("copied_to_clipboard");
                                this.toast(crate::app::Level::Success, text);
                                cx.notify();
                            },
                        )),
                    ),
            );
        }

        let mut links: Vec<(String, String)> = Vec::new();
        if !c.github.is_empty() {
            links.push(("GitHub".into(), c.github.clone()));
        }
        links.extend(c.stores.clone());
        if !links.is_empty() {
            let mut row = div().flex().flex_row().flex_wrap().justify_center().gap_2();
            for (i, (label, url)) in links.into_iter().enumerate() {
                row = row.child(
                    button(SharedString::from(format!("store-{i}")), &label, Some(IconName::ExternalLink), Kind::Secondary, Sz::Sm, false)
                        .on_click(cx.listener(move |_, _, _, cx| cx.open_url(&url))),
                );
            }
            page = page.child(
                div().flex().flex_col().items_center().gap_4().child(heading(self.tr("get_title", &[("name", &c.name)]))).child(row),
            );
        }

        if !c.screenshots.is_empty() || c.video.is_some() {
            page = page.child(
                div()
                    .flex()
                    .flex_col()
                    .gap_4()
                    .child(heading(self.t("gallery_title")))
                    .child(self.gallery(&c.screenshots, c.video.as_deref(), CONTENT_W - 80., cx)),
            );
        }

        // Soft colour wash behind the page, like the original.
        div()
            .relative()
            .w_full()
            .child(div().absolute().top_0().left_0().right_0().h(px(360.)).opacity(0.25).bg(color_gradient(c.colors.as_deref())))
            .child(div().absolute().top_0().left_0().right_0().h(px(360.)).bg(fade_to_bg(180.)))
            .child(page)
            .into_any_element()
    }
}
