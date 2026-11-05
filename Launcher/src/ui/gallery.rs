//! Screenshot / video gallery shared by the game and project pages.
//! Videos show their thumbnail with a play button and open in the browser (no embedded player).

use super::kit::*;
use crate::app::LauncherApp;
use crate::util;
use gpui_kit::component::IconName;
use gpui_kit::prelude::*;
use gpui_kit::*;

struct Slide {
    image_url: String,
    video_url: Option<String>,
}

fn play_badge(size: f32) -> Div {
    div().absolute().size_full().flex().items_center().justify_center().child(
        div()
            .size(px(size))
            .rounded_full()
            .flex()
            .items_center()
            .justify_center()
            .bg(alpha(ACCENT, 0.92))
            .shadow_lg()
            .child(icon(IconName::Play, size * 0.45, 0xffffff)),
    )
}

impl LauncherApp {
    pub fn gallery(&self, shots: &[String], video: Option<&str>, content_w: f32, cx: &mut Context<Self>) -> AnyElement {
        let mut slides: Vec<Slide> = Vec::new();
        if let Some(v) = video {
            // Fall back to the first screenshot as the poster when the link is not a YouTube one.
            if let Some(poster) = util::video_thumbnail(v).or_else(|| shots.first().cloned()) {
                slides.push(Slide { image_url: poster, video_url: Some(v.to_string()) });
            }
        }
        slides.extend(shots.iter().map(|s| Slide { image_url: s.clone(), video_url: None }));
        if slides.is_empty() {
            return panel(24., 0.).child(muted(self.t("no_gallery"))).into_any_element();
        }

        let n = slides.len();
        let idx = self.gallery_index.min(n - 1);
        let h = (content_w * 0.5).min(560.);
        let nav = |id: &'static str, ic: IconName, delta: isize, cx: &mut Context<Self>| {
            div()
                .id(id)
                .size(px(44.))
                .flex()
                .items_center()
                .justify_center()
                .rounded_full()
                .cursor_pointer()
                .bg(alpha(0x000000, 0.6))
                .hover(|s| s.bg(alpha(0x000000, 0.85)))
                .on_click(cx.listener(move |this, _, _, cx| {
                    this.gallery_index = (this.gallery_index as isize + delta).rem_euclid(n as isize) as usize;
                    cx.notify();
                }))
                .child(icon(ic, 20., 0xffffff))
        };

        let current = &slides[idx];
        let mut viewer = div()
            .id("gallery-viewer")
            .relative()
            .w_full()
            .h(px(h))
            .rounded(px(16.))
            .overflow_hidden()
            .bg(col(SURFACE))
            .border_1()
            .border_color(col(BORDER))
            .when_some(self.images.get(&current.image_url), |d, p| d.child(contain(p).rounded(px(15.))));
        if let Some(url) = current.video_url.clone() {
            viewer = viewer
                .cursor_pointer()
                .on_click(cx.listener(move |_, _, _, cx| cx.open_url(&url)))
                .child(play_badge(72.))
                .child(div().absolute().bottom_3().left_3().child(pill(self.t("watch_video"), 0xffffff)));
        }
        if n > 1 {
            viewer = viewer
                .child(div().absolute().left_3().top_0().bottom_0().flex().items_center().child(nav("g-prev", IconName::ChevronLeft, -1, cx)))
                .child(div().absolute().right_3().top_0().bottom_0().flex().items_center().child(nav("g-next", IconName::ChevronRight, 1, cx)));
        }

        let mut el = div().flex().flex_col().gap_3().child(viewer);
        if n > 1 {
            let mut thumbs = div().flex().flex_row().flex_wrap().gap_2();
            for (i, s) in slides.iter().enumerate() {
                let active = i == idx;
                thumbs = thumbs.child(
                    div()
                        .id(SharedString::from(format!("thumb-{i}")))
                        .relative()
                        .w(px(124.))
                        .h(px(72.))
                        .rounded(px(10.))
                        .overflow_hidden()
                        .cursor_pointer()
                        .bg(col(SURFACE2))
                        .border_2()
                        .border_color(if active { col(ACCENT_HOVER) } else { alpha(ACCENT, 0.) })
                        .opacity(if active { 1. } else { 0.72 })
                        .hover(|s| s.opacity(1.))
                        .on_click(cx.listener(move |this, _, _, cx| {
                            this.gallery_index = i;
                            cx.notify();
                        }))
                        .when_some(self.images.get(&s.image_url), |d, p| d.child(cover(p).rounded(px(8.))))
                        .when(s.video_url.is_some(), |d| d.child(play_badge(28.))),
                );
            }
            el = el.child(thumbs);
        }
        el.into_any_element()
    }
}
