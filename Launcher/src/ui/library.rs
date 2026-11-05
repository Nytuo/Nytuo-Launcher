//! Home / library page.

use super::kit::*;
use crate::app::{Filter, LauncherApp, Page};
use crate::data::{Creation, Game};
use gpui_kit::component::tab::{Tab, TabBar};
use gpui_kit::component::tag::Tag;
use gpui_kit::component::IconName;
use gpui_kit::component::input::Input;
use gpui_kit::prelude::*;
use gpui_kit::*;

const PAD: f32 = 40.;
const GAP: f32 = 16.;

/// Column count + card width for a fluid grid.
fn grid(avail: f32, min_card: f32) -> (usize, f32) {
    let inner = (avail - PAD * 2. - 14.).max(min_card);
    let cols = (((inner + GAP) / (min_card + GAP)).floor() as usize).max(1);
    (cols, (inner - GAP * (cols as f32 - 1.)) / cols as f32)
}

impl LauncherApp {
    fn filtered_games(&self) -> Vec<Game> {
        let q = self.query.trim().to_lowercase();
        self.catalog
            .games
            .iter()
            .filter(|g| match self.filter {
                Filter::All => true,
                Filter::Installed => g.is_installed,
                Filter::NotInstalled => !g.is_installed,
            })
            .filter(|g| q.is_empty() || g.name.to_lowercase().contains(&q))
            .cloned()
            .collect()
    }

    pub fn library_page(&mut self, avail: f32, cx: &mut Context<Self>) -> AnyElement {
        let (cols, card_w) = grid(avail, 230.);
        let games = self.filtered_games();
        let featured = self
            .catalog
            .games
            .iter()
            .find(|g| g.update_available())
            .or_else(|| self.catalog.games.iter().find(|g| g.is_installed))
            .or_else(|| self.catalog.games.iter().find(|g| !g.web_only))
            .cloned();

        let subtitle = if self.ready {
            self.tr(
                "library_subtitle",
                &[("count", &self.installed_count().to_string()), ("total", &self.catalog.games.len().to_string())],
            )
        } else {
            self.t("loading_library")
        };

        let filters = [
            (Filter::All, "filter_all"),
            (Filter::Installed, "filter_installed"),
            (Filter::NotInstalled, "filter_not_installed"),
        ];
        let selected = filters.iter().position(|f| f.0 == self.filter).unwrap_or(0);
        let chips = TabBar::new("filters")
            .pill()
            .selected_index(selected)
            .on_click(cx.listener(move |this, idx: &usize, _, cx| {
                this.filter = filters[*idx].0;
                cx.notify();
            }))
            .children(filters.iter().map(|(_, key)| Tab::new().label(self.t(key))));

        let mut grid_el = div().grid().grid_cols(cols as u16).gap(px(GAP));
        for g in &games {
            grid_el = grid_el.child(self.game_card(g, card_w, cx));
        }

        let mut page = div()
            .flex()
            .flex_col()
            .gap_6()
            .px(px(PAD))
            .py_8()
            .child(
                div()
                    .flex()
                    .flex_row()
                    .items_end()
                    .justify_between()
                    .gap_4()
                    .child(
                        div()
                            .flex()
                            .flex_col()
                            .gap_1()
                            .child(
                                div()
                                    .text_size(px(30.))
                                    .font_weight(FontWeight::EXTRA_BOLD)
                                    .child(self.t("nytuo_launcher")),
                            )
                            .child(muted(subtitle)),
                    )
                    .child(
                        div()
                            .w(px(300.))
                            .child(Input::new(&self.search).prefix(icon(IconName::Search, 16., MUTED)).cleanable(true)),
                    ),
            );

        if let (Some(g), true) = (featured, self.query.is_empty() && self.filter == Filter::All) {
            page = page.child(self.hero_banner(&g, cx));
        }

        page = page.child(chips);
        page = if !self.ready {
            page.child(muted(self.t("loading_library")))
        } else if games.is_empty() {
            page.child(muted(self.t("no_games_match")))
        } else {
            page.child(grid_el)
        };

        if !self.catalog.creations.is_empty() {
            let (ccols, cw) = grid(avail, 230.);
            let mut cgrid = div().grid().grid_cols(ccols as u16).gap(px(GAP));
            for c in &self.catalog.creations {
                cgrid = cgrid.child(self.creation_card(c, cw, cx));
            }
            page = page.child(
                div()
                    .flex()
                    .flex_col()
                    .gap_4()
                    .pt_4()
                    .child(
                        div()
                            .flex()
                            .flex_col()
                            .gap_1()
                            .child(heading(self.t("more_from_nytuo")))
                            .child(muted(self.t("more_from_nytuo_subtitle"))),
                    )
                    .child(cgrid),
            );
        }
        page.into_any_element()
    }

    /// Wide banner for the game you most likely want to open next.
    fn hero_banner(&self, g: &Game, cx: &mut Context<Self>) -> impl IntoElement {
        let id = g.id.clone();
        let id2 = g.id.clone();
        let primary = if g.is_installed && !g.update_available() {
            ("hero-play", self.t("play"), IconName::Play)
        } else if g.update_available() {
            ("hero-update", self.tr("update_to", &[("version", g.remote_version.as_deref().unwrap_or(""))]), IconName::RefreshCw)
        } else {
            ("hero-open", self.t("install_now"), IconName::ArrowDown)
        };
        let is_play = primary.0 == "hero-play";
        let busy = self.job.is_some();
        let kicker = if g.update_available() {
            self.t("hero_update_ready")
        } else if g.is_installed {
            self.t("hero_jump_back")
        } else {
            self.t("hero_featured")
        };

        div()
            .relative()
            .h(px(250.))
            .w_full()
            .rounded(px(22.))
            .overflow_hidden()
            .border_1()
            .border_color(col(BORDER))
            .child(div().absolute().size_full().bg(color_gradient(g.colors.as_deref())))
            .when_some(self.image(&g.background), |d, p| d.child(div().absolute().size_full().opacity(0.75).child(cover(p).rounded(px(21.)))))
            .child(div().absolute().size_full().bg(linear_gradient(
                90.,
                linear_color_stop(alpha(BG, 0.92), 0.),
                linear_color_stop(alpha(BG, 0.0), 0.85),
            )))
            .child(
                div()
                    .absolute()
                    .size_full()
                    .p_8()
                    .flex()
                    .flex_col()
                    .justify_end()
                    .gap_3()
                    .child(eyebrow(kicker).text_color(col(ACCENT_HOVER)))
                    .child(div().text_size(px(34.)).font_weight(FontWeight::EXTRA_BOLD).child(g.name.clone()))
                    .when_some(g.description.clone(), |d, desc| {
                        d.child(div().max_w(px(520.)).text_size(px(13.)).text_color(col(0xc9cfdd)).line_clamp(2).child(desc))
                    })
                    .child(
                        div()
                            .flex()
                            .flex_row()
                            .gap_2()
                            .pt_1()
                            .child({
                                let b = button(primary.0, &primary.1, Some(primary.2), Kind::Primary, Sz::Md, !is_play && busy);
                                if is_play {
                                    b.on_click(cx.listener(move |this, _, _, cx| {
                                        this.launch(&id);
                                        cx.notify();
                                    }))
                                } else {
                                    let id = g.id.clone();
                                    b.when(!busy, |b| b.on_click(cx.listener(move |this, _, _, cx| this.navigate(Page::Game(id.clone()), cx))))
                                }
                            })
                            .child(
                                button("hero-details", &self.t("details"), None, Kind::Secondary, Sz::Md, false)
                                    .on_click(cx.listener(move |this, _, _, cx| this.navigate(Page::Game(id2.clone()), cx))),
                            ),
                    ),
            )
    }

    fn game_card(&self, g: &Game, w: f32, cx: &mut Context<Self>) -> impl IntoElement {
        let job = self.job.as_ref().filter(|j| j.game_id == g.id);
        let pct = job.map(|j| if j.total > 0 { j.downloaded as f32 * 100. / j.total as f32 } else { 0. });
        let badge = if let Some(p) = pct {
            Some(pill(format!("{}%", p.round() as u32), ACCENT_HOVER))
        } else if g.update_available() {
            Some(pill(self.t("update"), AMBER))
        } else if g.is_installed {
            Some(pill(self.t("installed"), GREEN))
        } else if g.web_only {
            Some(pill(self.t("web_only"), BLUE))
        } else {
            None
        };
        self.media_card(
            format!("game-{}", g.id),
            Page::Game(g.id.clone()),
            &g.name,
            g.description.clone(),
            self.image(&g.background),
            self.image(&g.logo),
            g.colors.as_deref(),
            badge,
            pct,
            w,
            cx,
        )
    }

    fn creation_card(&self, c: &Creation, w: f32, cx: &mut Context<Self>) -> impl IntoElement {
        self.media_card(
            format!("creation-{}", c.id),
            Page::Creation(c.id.clone()),
            &c.name,
            c.summary.clone(),
            None,
            self.image(&c.logo),
            c.colors.as_deref(),
            c.status.as_deref().map(|s| pill(crate::util::title_case(s), MUTED)),
            None,
            w,
            cx,
        )
    }

    /// The one card used for games *and* "More from Nytuo" projects.
    #[allow(clippy::too_many_arguments)]
    fn media_card(
        &self,
        key: String,
        page: Page,
        name: &str,
        description: Option<String>,
        background: Option<std::path::PathBuf>,
        logo: Option<std::path::PathBuf>,
        colors: Option<&str>,
        badge: Option<Tag>,
        pct: Option<f32>,
        w: f32,
        cx: &mut Context<Self>,
    ) -> impl IntoElement {
        const R: f32 = 15.; // card radius (16) minus the 1px border
        let h = w * 0.62;
        let side = (h - 36.).min(w - 36.);
        div()
            .id(SharedString::from(key))
            .w_full()
            .flex()
            .flex_col()
            .rounded(px(16.))
            .overflow_hidden()
            .bg(col(SURFACE))
            .border_1()
            .border_color(col(BORDER))
            .cursor_pointer()
            .hover(|s| s.border_color(col(ACCENT_HOVER)).bg(col(SURFACE2)))
            .on_click(cx.listener(move |this, _, _, cx| this.navigate(page.clone(), cx)))
            .child(
                div()
                    .relative()
                    .w_full()
                    .h(px(h))
                    .rounded_t(px(R))
                    .bg(color_gradient(colors))
                    .overflow_hidden()
                    .map(|d| match (&background, &logo) {
                        (Some(bg), logo) => d.child(cover(bg.clone()).rounded_t(px(R))).when_some(logo.clone(), |d, l| {
                            d.child(div().absolute().bottom_2().left_2().h(px(38.)).max_w(relative(0.65)).child(contain(l).rounded(px(8.))))
                        }),
                        (None, Some(l)) => d.child(
                            // Absolute box = definite size, so the image can never overflow the cover.
                            div().absolute().size_full().flex().items_center().justify_center().child(
                                img(l.clone()).w(px(side)).h(px(side)).object_fit(ObjectFit::Contain).rounded(px(14.)),
                            ),
                        ),
                        (None, None) => d.child(
                            div()
                                .size_full()
                                .flex()
                                .items_center()
                                .justify_center()
                                .px_4()
                                .text_size(px(14.))
                                .font_weight(FontWeight::BOLD)
                                .child(name.to_string()),
                        ),
                    })
                    .child(
                        div().absolute().size_full().rounded_t(px(R)).bg(linear_gradient(
                            0.,
                            linear_color_stop(alpha(0x000000, 0.0), 0.),
                            linear_color_stop(alpha(0x000000, 0.45), 1.),
                        )),
                    )
                    .when_some(badge, |d, b| d.child(div().absolute().top_2().right_2().child(b)))
                    .when_some(pct, |d, p| d.child(div().absolute().bottom_0().left_0().right_0().child(progress_bar("card-progress", p, 4.)))),
            )
            .child(
                div()
                    .p_3()
                    .flex()
                    .flex_col()
                    .gap_1()
                    .child(div().truncate().text_size(px(14.)).font_weight(FontWeight::BOLD).child(name.to_string()))
                    .child(
                        div()
                            .h(px(36.))
                            .text_size(px(12.))
                            .line_height(px(17.))
                            .text_color(col(MUTED))
                            .line_clamp(2)
                            .text_ellipsis()
                            .child(description.unwrap_or_default()),
                    ),
            )
    }
}
