//! Small hand-rolled widgets + the colour palette. Everything here is stateless.

use crate::util;
use gpui_kit::prelude::*;
use gpui_kit::component::group_box::{GroupBox, GroupBoxVariants};
use gpui_kit::component::progress::Progress;
use gpui_kit::component::tag::Tag;
use gpui_kit::component::{Disableable, Icon, IconName, Sizable, Theme};
use gpui_kit::*;
use std::path::PathBuf;

pub const BG: u32 = 0x0a0c11;
pub const SIDEBAR: u32 = 0x0d1016;
pub const SURFACE: u32 = 0x12151d;
pub const SURFACE2: u32 = 0x1a1e29;
pub const SURFACE3: u32 = 0x232938;
pub const BORDER: u32 = 0x262c3c;
pub const TEXT: u32 = 0xeceff6;
pub const MUTED: u32 = 0xa0a8bc;
/// Exact blue of the logo (#0047C3).
pub const ACCENT: u32 = 0x0047c3;
/// Lighter tint used for text/icons on dark surfaces and hover states (keeps contrast >= 4.5:1).
pub const ACCENT_HOVER: u32 = 0x6ea8ff;
pub const ACCENT_PRESS: u32 = 0x1a5ad6;
pub const GREEN: u32 = 0x34d399;
pub const AMBER: u32 = 0xfbbf24;
pub const RED: u32 = 0xf87171;
pub const BLUE: u32 = 0x60a5fa;

pub fn col(hex: u32) -> Hsla {
    rgb(hex).into()
}

pub fn alpha(hex: u32, a: f32) -> Hsla {
    let mut c = col(hex);
    c.a = a;
    c
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum Kind {
    Primary,
    Secondary,
    Ghost,
    Danger,
}

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum Sz {
    Sm,
    Md,
    Lg,
}

pub fn icon(name: IconName, size: f32, color: u32) -> Icon {
    Icon::new(name).size(px(size)).text_color(col(color))
}

/// Clickable button. Attach `.on_click(...)` on the result (skip it when `disabled`).
pub fn button(
    id: impl Into<ElementId>,
    label: &str,
    ic: Option<IconName>,
    kind: Kind,
    size: Sz,
    disabled: bool,
) -> Stateful<Div> {
    let (bg, bg_hover, fg, border) = match kind {
        Kind::Primary => (ACCENT, ACCENT_PRESS, 0xffffff, ACCENT),
        Kind::Secondary => (SURFACE2, SURFACE3, TEXT, BORDER),
        Kind::Ghost => (0x00000000, SURFACE2, TEXT, 0x00000000),
        Kind::Danger => (0x00000000, 0x3a1a1f, RED, 0x4a2229),
    };
    let (h, px_, text, isz) = match size {
        Sz::Sm => (34., 12., 12.5, 15.),
        Sz::Md => (40., 16., 13., 16.),
        Sz::Lg => (52., 28., 16., 20.),
    };
    let visible_border = kind != Kind::Ghost;
    let base = div()
        .id(id)
        .flex()
        .flex_row()
        .items_center()
        .justify_center()
        .gap_2()
        .h(px(h))
        .px(px(px_))
        .rounded(px(if size == Sz::Lg { 14. } else { 10. }))
        .border_1()
        .border_color(alpha(border, if visible_border { 1.0 } else { 0.0 }))
        .bg(if kind == Kind::Ghost || kind == Kind::Danger { alpha(bg, 0.0) } else { col(bg) })
        .text_color(col(fg))
        .text_size(px(text))
        .font_weight(FontWeight::SEMIBOLD)
        .whitespace_nowrap()
        .when_some(ic, |d, name| d.child(icon(name, isz, fg)))
        .when(!label.is_empty(), |d| d.child(label.to_string()));
    if disabled {
        base.opacity(0.45).cursor_not_allowed()
    } else {
        base.cursor_pointer().hover(move |s| s.bg(col(bg_hover)))
    }
}

/// Small coloured status pill (`gpui-component` Tag).
pub fn pill(text: impl Into<SharedString>, color: u32) -> Tag {
    Tag::custom(alpha(color, 0.16), col(color), alpha(color, 0.35))
        .rounded_full()
        .small()
        .child(text.into())
}

pub fn dot(color: u32) -> Div {
    div().size(px(8.)).rounded_full().bg(col(color)).flex_shrink_0()
}

/// `gpui-component` progress bar, 0..=100.
pub fn progress_bar(id: impl Into<ElementId>, percent: f32, height: f32) -> Progress {
    Progress::new(id).value(percent).h(px(height)).color(col(ACCENT_HOVER))
}

/// Surface panel (`gpui-component` GroupBox). Children stack vertically inside the padded surface.
pub fn panel(pad: f32, gap: f32) -> GroupBox {
    GroupBox::new().outline().content_style(
        StyleRefinement::default()
            .p(px(pad))
            .gap(px(gap))
            .bg(col(SURFACE))
            .rounded(px(16.))
            .border_1()
            .border_color(col(BORDER)),
    )
}

/// Same surface look for the rare spots that need a plain `Div` (clickable / row layouts).
pub fn surface() -> Div {
    div().rounded(px(16.)).bg(col(SURFACE)).border_1().border_color(col(BORDER))
}

/// Tooltip builder for `.tooltip(...)`, used to explain why a control is disabled.
pub fn tip(text: String) -> impl Fn(&mut Window, &mut App) -> AnyView + 'static {
    move |window, cx| gpui_kit::component::tooltip::Tooltip::new(text.clone()).build(window, cx)
}

/// Pushes the launcher palette into the `gpui-component` theme so every stock widget matches.
pub fn apply_theme(cx: &mut App) {
    Theme::update(cx, |t| {
        let c = &mut t.colors;
        c.background = col(BG);
        c.foreground = col(TEXT);
        c.border = col(BORDER);
        c.input = col(BORDER);
        c.ring = col(ACCENT_HOVER);
        c.muted = col(SURFACE2);
        c.muted_foreground = col(MUTED);
        c.popover = col(SURFACE2);
        c.popover_foreground = col(TEXT);
        c.primary = col(ACCENT);
        c.primary_hover = col(ACCENT_PRESS);
        c.primary_active = col(ACCENT_PRESS);
        c.primary_foreground = col(0xffffff);
        c.button_primary = col(ACCENT);
        c.button_primary_hover = col(ACCENT_PRESS);
        c.button_primary_active = col(ACCENT_PRESS);
        c.button_primary_foreground = col(0xffffff);
        c.secondary = col(SURFACE2);
        c.secondary_hover = col(SURFACE3);
        c.secondary_active = col(SURFACE3);
        c.secondary_foreground = col(TEXT);
        c.accent = col(SURFACE3);
        c.accent_foreground = col(TEXT);
        c.progress_bar = col(ACCENT_HOVER);
        c.group_box = col(SURFACE);
        c.group_box_foreground = col(TEXT);
        c.tab = col(0x00000000);
        c.tab_active = col(SURFACE3);
        c.tab_active_foreground = col(TEXT);
        c.tab_foreground = col(MUTED);
        c.tab_bar = col(0x00000000);
        c.tab_bar_segmented = col(SURFACE);
        c.danger = col(RED);
        c.success = col(GREEN);
        c.warning = col(AMBER);
    });
}

pub fn heading(text: impl Into<SharedString>) -> Div {
    div().text_size(px(18.)).font_weight(FontWeight::BOLD).text_color(col(TEXT)).child(text.into())
}

pub fn eyebrow(text: impl Into<SharedString>) -> Div {
    div()
        .text_size(px(11.))
        .font_weight(FontWeight::BOLD)
        .text_color(col(MUTED))
        .child(text.into().to_uppercase())
}

pub fn muted(text: impl Into<SharedString>) -> Div {
    div().text_size(px(13.)).text_color(col(MUTED)).child(text.into())
}

/// Image filling its (relatively positioned) parent.
pub fn cover(path: PathBuf) -> Img {
    img(path).size_full().object_fit(ObjectFit::Cover)
}

pub fn contain(path: PathBuf) -> Img {
    img(path).size_full().object_fit(ObjectFit::Contain)
}

/// 135° gradient built from the game's `colors` field, falling back to a neutral one.
pub fn color_gradient(colors: Option<&str>) -> Background {
    let parsed = colors.map(util::parse_colors).unwrap_or_default();
    let (a, b) = match parsed.as_slice() {
        [] => (0x2a2f45, 0x14172a),
        [one] => (*one, SURFACE),
        [first, .., last] => (*first, *last),
    };
    linear_gradient(135., linear_color_stop(alpha(a, 0.85), 0.), linear_color_stop(alpha(b, 0.85), 1.))
}

/// Fade from transparent to the page background (used over hero images).
pub fn fade_to_bg(angle: f32) -> Background {
    linear_gradient(
        angle,
        linear_color_stop(alpha(BG, 0.0), 0.),
        linear_color_stop(alpha(BG, 1.0), 1.),
    )
}
