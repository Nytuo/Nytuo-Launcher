//! Small pure helpers ported from the React app (`lib/utils.ts`, `lib/tech.ts`, `lib/pocketbase.ts`).

/// `1` when `a > b`, `-1` when `a < b`, `0` otherwise (or when either is missing).
pub fn compare_versions(a: Option<&str>, b: Option<&str>) -> i32 {
    let (Some(a), Some(b)) = (a, b) else { return 0 };
    let parse = |s: &str| -> Vec<u64> {
        s.split(|c| c == '.' || c == '-')
            .map(|p| p.trim().parse::<u64>().unwrap_or(0))
            .collect()
    };
    let (pa, pb) = (parse(a), parse(b));
    for i in 0..pa.len().max(pb.len()) {
        let (x, y) = (pa.get(i).copied().unwrap_or(0), pb.get(i).copied().unwrap_or(0));
        if x > y {
            return 1;
        }
        if x < y {
            return -1;
        }
    }
    0
}

pub fn slugify(value: &str) -> String {
    let mut out = String::new();
    let mut last_sep = true;
    for c in value.to_lowercase().chars() {
        let c = match c {
            'à' | 'á' | 'â' | 'ä' | 'ã' => 'a',
            'é' | 'è' | 'ê' | 'ë' => 'e',
            'í' | 'ì' | 'î' | 'ï' => 'i',
            'ó' | 'ò' | 'ô' | 'ö' | 'õ' => 'o',
            'ú' | 'ù' | 'û' | 'ü' => 'u',
            'ç' => 'c',
            'ñ' => 'n',
            other => other,
        };
        if c.is_ascii_alphanumeric() {
            out.push(c);
            last_sep = false;
        } else if !last_sep {
            out.push('_');
            last_sep = true;
        }
    }
    out.trim_matches('_').to_string()
}

/// Parses `#rrggbb` / `#rgb` / `rrggbb` into a packed 0xRRGGBB value.
pub fn parse_hex_color(s: &str) -> Option<u32> {
    let s = s.trim().trim_start_matches('#');
    match s.len() {
        6 => u32::from_str_radix(s, 16).ok(),
        3 => {
            let v = u32::from_str_radix(s, 16).ok()?;
            let (r, g, b) = ((v >> 8) & 0xf, (v >> 4) & 0xf, v & 0xf);
            Some((r * 17) << 16 | (g * 17) << 8 | b * 17)
        }
        _ => None,
    }
}

/// The `colors` field is a comma separated list of CSS colours; keep the ones we can parse.
pub fn parse_colors(colors: &str) -> Vec<u32> {
    colors.split(',').filter_map(parse_hex_color).collect()
}

/// Turns a devicon slug (e.g. "csharp-plain") into a display name ("C♯").
pub fn tag_parser(tag: &str) -> String {
    let mut res: String = tag
        .to_lowercase()
        .split(' ')
        .map(|w| {
            let mut c = w.chars();
            match c.next() {
                Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
                None => String::new(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ");
    if res.contains("sharp") {
        res = res.replace("sharp", "♯");
    } else if res.contains("Dotnetcore") {
        res = res.replace("Dotnetcore", ".NET Core");
    } else if res.contains("Nodejs") {
        res = res.replace("Nodejs", "Node.JS");
    } else if res.contains("Unrealengine") {
        res = res.replace("Unrealengine", "Unreal Engine");
    }
    res.split('-')
        .next()
        .unwrap_or("")
        .chars()
        .filter(|c| !c.is_ascii_digit())
        .collect()
}

/// "wip" -> "WIP", "active" -> "Active".
pub fn title_case(s: &str) -> String {
    if s.eq_ignore_ascii_case("wip") {
        return "Work in progress".into();
    }
    let mut c = s.chars();
    match c.next() {
        Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
        None => String::new(),
    }
}

/// Current UTC time as RFC 3339 (`2026-11-05T14:03:09Z`).
pub fn iso_now() -> String {
    let ts = crate::stats::now_unix();
    let (h, m, sec) = ((ts % 86_400) / 3600, (ts % 3600) / 60, ts % 60);
    format!("{}T{h:02}:{m:02}:{sec:02}Z", crate::stats::format_date(ts))
}

/// Thumbnail URL for a YouTube watch / embed / short link (no WebView means no embedded player).
pub fn video_thumbnail(url: &str) -> Option<String> {
    let id = if let Some(rest) = url.split("youtu.be/").nth(1) {
        rest
    } else if let Some(rest) = url.split("/embed/").nth(1) {
        rest
    } else {
        url.split("v=").nth(1)?
    };
    let id: String = id.chars().take_while(|c| c.is_ascii_alphanumeric() || *c == '-' || *c == '_').collect();
    (!id.is_empty()).then(|| format!("https://img.youtube.com/vi/{id}/hqdefault.jpg"))
}

pub fn format_bytes(n: u64) -> String {
    const UNITS: [&str; 4] = ["B", "KB", "MB", "GB"];
    let mut v = n as f64;
    let mut i = 0;
    while v >= 1024.0 && i < UNITS.len() - 1 {
        v /= 1024.0;
        i += 1;
    }
    if i == 0 { format!("{n} B") } else { format!("{v:.1} {}", UNITS[i]) }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn versions() {
        assert_eq!(compare_versions(Some("1.2.0"), Some("1.1.9")), 1);
        assert_eq!(compare_versions(Some("1.0.0.7"), Some("1.0.0.7")), 0);
        assert_eq!(compare_versions(Some("0.0.1-alpha"), Some("0.0.2-alpha")), -1);
        assert_eq!(compare_versions(None, Some("1")), 0);
    }

    #[test]
    fn slug() {
        assert_eq!(slugify("The Little Prinçess!"), "the_little_princess");
    }

    #[test]
    fn colors() {
        assert_eq!(parse_colors("#ff0000, #0f0"), vec![0xff0000, 0x00ff00]);
        assert_eq!(tag_parser("csharp-plain"), "C♯");
    }
}
