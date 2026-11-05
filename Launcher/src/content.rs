//! Bundled changelogs + achievements (embedded at compile time) and their parsers.

use crate::platform::normalize_path;
use include_dir::{Dir, include_dir};

static DATA: Dir = include_dir!("$CARGO_MANIFEST_DIR/assets/data");

#[derive(Clone, Debug, PartialEq)]
pub enum ChangeKind {
    New,
    Fixed,
    Enhanced,
    Other,
}

#[derive(Clone, Debug)]
pub struct ChangeEntry {
    pub kind: ChangeKind,
    pub label: String,
    pub text: String,
}

#[derive(Clone, Debug, Default)]
pub struct ChangeBlock {
    pub version: Option<String>,
    pub entries: Vec<ChangeEntry>,
}

fn strip_tags(s: &str) -> String {
    let mut out = String::new();
    let mut in_tag = false;
    for c in s.chars() {
        match c {
            '<' => in_tag = true,
            '>' => in_tag = false,
            c if !in_tag => out.push(c),
            _ => {}
        }
    }
    out.replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&quot;", "\"")
        .replace("&#39;", "'")
        .replace("&nbsp;", " ")
        .trim()
        .to_string()
}

/// Parses the HTML-ish changelog format (`1.0.0:` header followed by
/// `<p><span class="new">New</span>text</p>` lines). Falls back to plain lines.
pub fn parse_changelog(raw: &str) -> Vec<ChangeBlock> {
    let mut blocks: Vec<ChangeBlock> = Vec::new();
    for line in raw.lines().map(str::trim).filter(|l| !l.is_empty()) {
        let is_header = !line.contains('<')
            && line.ends_with(':')
            && line.chars().next().is_some_and(|c| c.is_ascii_digit());
        if is_header {
            blocks.push(ChangeBlock {
                version: Some(line.trim_end_matches(':').trim().to_string()),
                entries: Vec::new(),
            });
            continue;
        }
        if blocks.is_empty() {
            blocks.push(ChangeBlock::default());
        }
        let block = blocks.last_mut().unwrap();

        // <span class="kind">Label</span>rest
        if let Some(start) = line.find("<span") {
            if let Some(end) = line.find("</span>") {
                let span = &line[start..end];
                let kind_name = span
                    .split("class=\"")
                    .nth(1)
                    .and_then(|s| s.split('"').next())
                    .unwrap_or("")
                    .to_lowercase();
                let kind = match kind_name.as_str() {
                    "new" | "chlog-new" => ChangeKind::New,
                    "fixed" | "chlog-fixed" => ChangeKind::Fixed,
                    "enhanced" => ChangeKind::Enhanced,
                    _ => ChangeKind::Other,
                };
                let label = strip_tags(&line[start..end + 7]);
                let text = strip_tags(&line[end + 7..]);
                block.entries.push(ChangeEntry { kind, label, text });
                continue;
            }
        }
        let text = strip_tags(line);
        if !text.is_empty() {
            block.entries.push(ChangeEntry { kind: ChangeKind::Other, label: String::new(), text });
        }
    }
    blocks
}

pub fn changelog_for(game_id: &str) -> Vec<ChangeBlock> {
    DATA.get_file(format!("changelogs/{}.txt", game_id.to_uppercase()))
        .and_then(|f| f.contents_utf8())
        .map(parse_changelog)
        .unwrap_or_default()
}

#[derive(Clone, Debug)]
pub struct Achievement {
    pub name: String,
    pub unlocked: bool,
}

fn lines(text: &str) -> Vec<String> {
    text.lines().map(str::trim).filter(|l| !l.is_empty()).map(str::to_string).collect()
}

/// All achievements of a game (bundled list, else the game's own folder) + the unlocked ones.
pub fn load_achievements(game_id: &str, game_path: &str) -> Vec<Achievement> {
    let bundled = [game_id.to_uppercase(), game_id.to_string()]
        .iter()
        .find_map(|id| DATA.get_file(format!("achievements/{id}/AllAchievements.txt")))
        .and_then(|f| f.contents_utf8().map(str::to_string));
    let local_dir = normalize_path(&format!("{game_path}/{game_id}/Achievements"));
    let all = bundled.or_else(|| std::fs::read_to_string(local_dir.join("AllAchievements.txt")).ok());
    let Some(all) = all else { return Vec::new() };
    let unlocked = std::fs::read_to_string(local_dir.join("AchDone.txt")).map(|t| lines(&t)).unwrap_or_default();
    lines(&all)
        .into_iter()
        .map(|name| Achievement { unlocked: unlocked.contains(&name), name })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_changelog() {
        let b = parse_changelog("0.0.2-alpha:\n<p><span class=\"new\">New</span>Multiplayer</p>\n0.0.1:\n<p><span class=\"fixed\">Fix</span>Bug &amp; stuff</p>");
        assert_eq!(b.len(), 2);
        assert_eq!(b[0].version.as_deref(), Some("0.0.2-alpha"));
        assert_eq!(b[0].entries[0].kind, ChangeKind::New);
        assert_eq!(b[0].entries[0].text, "Multiplayer");
        assert_eq!(b[1].entries[0].text, "Bug & stuff");
    }

    #[test]
    fn bundled_data_present() {
        assert!(!changelog_for("sfo").is_empty());
    }
}
