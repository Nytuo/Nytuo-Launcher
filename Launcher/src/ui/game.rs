//! Game details page: hero, play / install actions, progress and the Overview / Changelog /
//! Achievements / Gallery tabs.

use super::kit::*;
use crate::app::{Confirm, GameTab, LauncherApp};
use crate::content::ChangeKind;
use crate::data::Game;
use crate::installer::Mode;
use gpui_kit::component::tab::{Tab, TabBar};
use gpui_kit::component::IconName;
use gpui_kit::prelude::*;
use gpui_kit::*;

fn info_row(label: String, value: String) -> Div {
    div()
        .flex()
        .flex_row()
        .justify_between()
        .gap_4()
        .py_2()
        .border_b_1()
        .border_color(col(BORDER))
        .text_size(px(13.))
        .child(div().text_color(col(MUTED)).flex_shrink_0().child(label))
        .child(div().min_w_0().text_right().font_weight(FontWeight::SEMIBOLD).child(value))
}

impl LauncherApp {
    pub fn game_page(&mut self, id: &str, avail: f32, cx: &mut Context<Self>) -> AnyElement {
        let Some(g) = self.game(id).cloned() else {
            return div().p_10().child(muted(self.t("game_not_found"))).into_any_element();
        };
        let job = self.job.as_ref().map(|j| (j.game_id == g.id, j.mode, j.downloaded, j.total));
        let downloading = job.is_some_and(|j| j.0);
        
        let content_w = (avail - 80.).min(1180.);
        let wide = content_w > 860.;

        let background = self.image(&g.background);
        let logo = self.image(&g.logo);

        // ---- hero
        let mut badges = div().flex().flex_row().flex_wrap().gap_2();
        if let Some(v) = &g.version {
            badges = badges.child(pill(format!("v{v}"), MUTED));
        }
        if g.is_installed {
            badges = badges.child(pill(self.t("installed"), GREEN));
        }
        if g.update_available() {
            badges = badges.child(pill(
                self.tr("update_to", &[("version", g.remote_version.as_deref().unwrap_or(""))]),
                AMBER,
            ));
        }
        if g.web_only {
            badges = badges.child(pill(self.t("web_only"), BLUE));
        }
        let played = self.stats.get(&g.id);
        let meta: Vec<String> = [
            g.developers.clone(),
            g.release_date.clone(),
            g.status.as_deref().map(crate::util::title_case),
            played.map(|p| format!("{} {}", crate::stats::format_duration(p.total_secs), self.t("played"))),
        ]
        .into_iter()
        .flatten()
        .collect();

        let hero = div()
            .relative()
            .w_full()
            .h(px(330.))
            .overflow_hidden()
            .child(div().absolute().size_full().bg(color_gradient(g.colors.as_deref())))
            .when_some(background, |d, p| d.child(div().absolute().size_full().opacity(0.7).child(cover(p))))
            .child(div().absolute().size_full().bg(fade_to_bg(180.)))
            .child(
                div()
                    .absolute()
                    .size_full()
                    .flex()
                    .flex_row()
                    .items_end()
                    .gap_6()
                    .px_10()
                    .pb_6()
                    .child(
                        div()
                            .size(px(150.))
                            .flex_shrink_0()
                            .rounded(px(22.))
                            .overflow_hidden()
                            .bg(alpha(BG, 0.55))
                            .border_1()
                            .border_color(alpha(0xffffff, 0.12))
                            .p_3()
                            .when_some(logo, |d, p| d.child(contain(p).rounded(px(14.)))),
                    )
                    .child(
                        div()
                            .flex_1()
                            .min_w_0()
                            .flex()
                            .flex_col()
                            .gap_2()
                            .child(badges)
                            .child(
                                div()
                                    .text_size(px(if wide { 46. } else { 34. }))
                                    .font_weight(FontWeight::EXTRA_BOLD)
                                    .line_height(relative(1.05))
                                    .child(g.name.clone()),
                            )
                            .when(!meta.is_empty(), |d| d.child(muted(meta.join("  ·  ")))),
                    ),
            );

        // ---- primary actions
        let mut actions = div().flex().flex_row().flex_wrap().items_center().gap_3();
        let gid = g.id.clone();
        if g.is_installed {
            let id = gid.clone();
            let running = self.running.contains(&g.id);
            let label = if running { self.t("running") } else { self.t("play") };
            actions = actions.child(
                button("play", &label, Some(IconName::Play), Kind::Primary, Sz::Lg, running).when(!running, |b| {
                    b.on_click(cx.listener(move |this, _, _, cx| {
                        this.launch(&id);
                        cx.notify();
                    }))
                }),
            );
            if g.update_available() {
                let id = gid.clone();
                let label = self.tr("update_to", &[("version", g.remote_version.as_deref().unwrap_or(""))]);
                let busy = job.is_some();
                actions = actions.child(
                    button("update", &label, Some(IconName::RefreshCw), Kind::Secondary, Sz::Lg, busy).when(busy, |b| b.tooltip(tip(self.t("download_already_in_progress")))).when(!busy, |b| {
                        b.on_click(cx.listener(move |this, _, _, cx| {
                            this.start_job(&id, Mode::Update);
                            cx.notify();
                        }))
                    }),
                );
            }
        } else if !g.web_only {
            let id = gid.clone();
            let busy = job.is_some();
            let label = if downloading { self.t("installing") } else { self.t("install_now") };
            actions = actions.child(
                button("install", &label, Some(IconName::ArrowDown), Kind::Primary, Sz::Lg, busy).when(busy, |b| b.tooltip(tip(self.t("download_already_in_progress")))).when(!busy, |b| {
                    b.on_click(cx.listener(move |this, _, _, cx| {
                        this.start_job(&id, Mode::Install);
                        cx.notify();
                    }))
                }),
            );
        } else {
            actions = actions.child(div().max_w(px(380.)).child(muted(self.t("web_only_notice"))));
        }
        for (key, label, ic, url) in [
            ("play-online", self.t("play_online"), IconName::Globe, g.online_url.clone()),
            ("site", self.t("visit_website"), IconName::ExternalLink, g.website.clone()),
            ("itch", self.t("view_on_itch"), IconName::ExternalLink, g.itch.clone()),
            ("gamejolt", self.t("view_on_gamejolt"), IconName::ExternalLink, g.gamejolt.clone()),
        ] {
            if let Some(url) = url {
                actions = actions.child(
                    button(key, &label, Some(ic), Kind::Secondary, Sz::Lg, false)
                        .on_click(cx.listener(move |_, _, _, cx| cx.open_url(&url))),
                );
            }
        }

        // ---- management row (installed only)
        let mut manage = div().flex().flex_row().flex_wrap().gap_2().items_center();
        if g.is_installed {
            let (a, b, c, d) = (gid.clone(), gid.clone(), gid.clone(), gid.clone());
            manage = manage
                .child(eyebrow(self.t("manage")).mr_2())
                .child(
                    button("m-folder", &self.t("open_game_folder"), Some(IconName::FolderOpen), Kind::Secondary, Sz::Sm, false)
                        .on_click(cx.listener(move |this, _, _, cx| {
                            this.open_game_folder(&a, None);
                            cx.notify();
                        })),
                )
                .child(
                    button("m-saves", &self.t("open_save_folder"), Some(IconName::Folder), Kind::Secondary, Sz::Sm, false)
                        .on_click(cx.listener(move |this, _, _, cx| {
                            this.open_game_folder(&b, Some("Saves"));
                            cx.notify();
                        })),
                );
            if cfg!(target_os = "windows") {
                manage = manage.child(
                    button("m-shortcut", &self.t("create_shortcut"), Some(IconName::Plus), Kind::Secondary, Sz::Sm, false)
                        .on_click(cx.listener(move |this, _, _, cx| {
                            this.create_shortcut(&c);
                            cx.notify();
                        })),
                );
            }
            let busy = job.is_some();
            manage = manage
                .child(
                    button("m-repair", &self.t("repair_files"), Some(IconName::RotateCw), Kind::Secondary, Sz::Sm, busy).when(busy, |b| b.tooltip(tip(self.t("download_already_in_progress")))).when(!busy, |bt| {
                        bt.on_click(cx.listener(move |this, _, _, cx| {
                            this.start_job(&d, Mode::Repair);
                            cx.notify();
                        }))
                    }),
                )
                .child({
                    let id = gid.clone();
                    button("m-uninstall", &self.t("uninstall_game"), Some(IconName::Delete), Kind::Danger, Sz::Sm, busy).when(!busy, |bt| {
                        bt.on_click(cx.listener(move |this, _, _, cx| {
                            this.confirm = Some(Confirm::Uninstall(id.clone()));
                            cx.notify();
                        }))
                    })
                });
        }

        let mut action_card = panel(20., 16.).child(actions);
        if g.is_installed {
            action_card = action_card.child(manage);
        }

        // ---- download progress
        let progress_card = job.filter(|j| j.0).map(|(_, mode, done, total)| {
            let pct = if total > 0 { done as f32 * 100. / total as f32 } else { 0. };
            let title = match mode {
                Mode::Install => self.t("downloading"),
                Mode::Repair => self.t("repair_files"),
                Mode::Update => self.t("update"),
            };
            panel(20., 12.)
                .child(
                    div()
                        .flex()
                        .flex_row()
                        .justify_between()
                        .items_end()
                        .child(
                            div()
                                .flex()
                                .flex_col()
                                .child(div().font_weight(FontWeight::BOLD).child(title))
                                .child(muted(self.t("overall_progress"))),
                        )
                        .child(
                            div()
                                .text_size(px(26.))
                                .font_weight(FontWeight::EXTRA_BOLD)
                                .child(format!("{}%", pct.round() as u32)),
                        ),
                )
                .child(progress_bar("dl-progress", pct, 10.))
                .child(muted(if total > 0 { format!("{done} / {total}") } else { "…".to_string() }))
        });

        // ---- tabs
        let tab_list = [
            (GameTab::Overview, self.t("tab_overview"), None),
            (GameTab::Changelog, self.t("recent_updates"), None),
            (
                GameTab::Achievements,
                self.t("tab_achievements"),
                (!self.achievements.is_empty()).then(|| {
                    format!("{}/{}", self.achievements.iter().filter(|a| a.unlocked).count(), self.achievements.len())
                }),
            ),
            (
                GameTab::Gallery,
                self.t("gallery_title"),
                (!g.screenshots.is_empty() || g.video.is_some())
                    .then(|| (g.screenshots.len() + usize::from(g.video.is_some())).to_string()),
            ),
        ];
        let selected = tab_list.iter().position(|t| t.0 == self.game_tab).unwrap_or(0);
        let order: Vec<GameTab> = tab_list.iter().map(|t| t.0).collect();
        let tabs = TabBar::new("game-tabs")
            .underline()
            .selected_index(selected)
            .on_click(cx.listener(move |this, idx: &usize, _, cx| {
                this.game_tab = order[*idx];
                cx.notify();
            }))
            .children(tab_list.into_iter().map(|(_, label, count)| {
                Tab::new().label(label).when_some(count, |t, c| t.suffix(pill(c, MUTED).ml_2()))
            }));

        let body = match self.game_tab {
            GameTab::Overview => self.tab_overview(&g, wide),
            GameTab::Changelog => self.tab_changelog(),
            GameTab::Achievements => self.tab_achievements(content_w),
            GameTab::Gallery => self.gallery(&g.screenshots, g.video.as_deref(), content_w, cx),
        };

        div()
            .flex()
            .flex_col()
            .child(hero)
            .child(
                div()
                    .w_full()
                    .max_w(px(1260.))
                    .mx_auto()
                    .px_10()
                    .pb_12()
                    .flex()
                    .flex_col()
                    .gap_5()
                    .child(action_card)
                    .children(progress_card)
                    .child(tabs)
                    .child(body),
            )
            .into_any_element()
    }

    fn tab_overview(&self, g: &Game, wide: bool) -> AnyElement {
        let desc = g.description.clone().unwrap_or_else(|| self.t("no_description"));
        let mut rows: Vec<(String, String)> = Vec::new();
        let mut add = |label: &str, v: Option<String>| {
            if let Some(v) = v {
                rows.push((label.to_string(), v));
            }
        };
        add(&self.t("installed_version"), g.version.clone().map(|v| format!("v{v}")));
        add(&self.t("latest_version"), g.remote_version.clone().map(|v| format!("v{v}")));
        add(
            &self.t("time_played"),
            Some(self.stats.get(&g.id).map(|p| crate::stats::format_duration(p.total_secs)).unwrap_or_else(|| "—".into())),
        );
        add(
            &self.t("last_played"),
            Some(self.stats.get(&g.id).map(|p| crate::stats::format_date(p.last_played)).unwrap_or_else(|| self.t("never"))),
        );
        add(&self.t("developers"), g.developers.clone());
        add(&self.t("release_date"), g.release_date.clone());
        add(&self.t("status"), g.status.as_deref().map(crate::util::title_case));
        if g.is_installed {
            add(&self.t("location"), Some(format!("{}/{}", self.settings.game_path, g.id)));
        }

        let mut details = panel(20., 0.).child(eyebrow(self.t("details")).pb_2());
        for (label, value) in rows {
            details = details.child(info_row(label, value));
        }

        div()
            .flex()
            .when(wide, |d| d.flex_row())
            .when(!wide, |d| d.flex_col())
            .gap_5()
            .items_start()
            .child(
                panel(24., 12.)
                    .flex_1()
                    .min_w_0()
                    .child(eyebrow(self.t("about")))
                    .child(div().text_size(px(14.)).line_height(relative(1.6)).text_color(col(0xc9cfdd)).child(desc)),
            )
            .child(div().when(wide, |d| d.w(px(340.)).flex_shrink_0()).when(!wide, |d| d.w_full()).child(details))
            .into_any_element()
    }

    fn tab_changelog(&self) -> AnyElement {
        if self.changelog.is_empty() {
            return panel(24., 0.).child(muted(self.t("no_changelog"))).into_any_element();
        }
        let mut col_el = div().flex().flex_col().gap_4();
        for block in &self.changelog {
            let mut c = panel(20., 12.);
            if let Some(v) = &block.version {
                c = c.child(div().text_size(px(16.)).font_weight(FontWeight::EXTRA_BOLD).child(format!("v{v}")));
            }
            for e in &block.entries {
                let color = match e.kind {
                    ChangeKind::New => GREEN,
                    ChangeKind::Fixed => RED,
                    ChangeKind::Enhanced => BLUE,
                    ChangeKind::Other => MUTED,
                };
                c = c.child(
                    div()
                        .flex()
                        .flex_row()
                        .items_start()
                        .gap_3()
                        .when(!e.label.is_empty(), |d| d.child(div().w(px(84.)).flex_shrink_0().child(pill(e.label.clone(), color))))
                        .child(div().flex_1().min_w_0().text_size(px(13.)).line_height(relative(1.5)).child(e.text.clone())),
                );
            }
            col_el = col_el.child(c);
        }
        col_el.into_any_element()
    }

    fn tab_achievements(&self, content_w: f32) -> AnyElement {
        if self.achievements.is_empty() {
            return panel(24., 0.).child(muted(self.t("no_achievements"))).into_any_element();
        }
        let done = self.achievements.iter().filter(|a| a.unlocked).count();
        let total = self.achievements.len();
        let cols = (((content_w + 12.) / (280. + 12.)).floor() as u16).max(1);
        let mut grid = div().grid().grid_cols(cols).gap_3();
        for a in &self.achievements {
            let (c, ic) = if a.unlocked { (GREEN, IconName::CircleCheck) } else { (MUTED, IconName::Star) };
            grid = grid.child(
                div()
                    .w_full()
                    .flex()
                    .flex_row()
                    .items_center()
                    .gap_3()
                    .p_3()
                    .rounded(px(12.))
                    .bg(col(SURFACE2))
                    .border_1()
                    .border_color(if a.unlocked { alpha(GREEN, 0.4) } else { col(BORDER) })
                    .opacity(if a.unlocked { 1. } else { 0.65 })
                    .child(icon(ic, 20., c))
                    .child(
                        div()
                            .flex()
                            .flex_col()
                            .min_w_0()
                            .child(div().truncate().text_size(px(13.)).font_weight(FontWeight::SEMIBOLD).child(a.name.clone()))
                            .child(div().text_size(px(11.)).text_color(col(c)).child(if a.unlocked { self.t("unlocked") } else { self.t("locked") })),
                    ),
            );
        }
        div()
            .flex()
            .flex_col()
            .gap_4()
            .child(
                panel(20., 12.)
                    .child(
                        div()
                            .flex()
                            .flex_row()
                            .justify_between()
                            .child(div().font_weight(FontWeight::BOLD).child(self.t("all_achievements")))
                            .child(muted(format!("{done} / {total}"))),
                    )
                    .child(progress_bar("ach-progress", done as f32 * 100. / total as f32, 8.)),
            )
            .child(grid)
            .into_any_element()
    }
}
