export type Platform = 'windows' | 'linux' | 'macos';

export interface ReleaseAsset {
  name: string;
  url: string;
}

// Checked in priority order per platform against GitHub release asset
// filenames - matches the installer formats Tauri's own bundler produces
// (nsis/msi, dmg/pkg, deb/rpm/AppImage).
const EXTENSION_PRIORITY: Record<Platform, string[]> = {
  windows: ['.exe', '.msi'],
  macos: ['.dmg', '.pkg'],
  linux: ['.appimage', '.deb', '.rpm'],
};

export function detectPlatform(): Platform {
  const ua = typeof window !== 'undefined' ? window.navigator.userAgent : '';
  if (ua.includes('Windows')) return 'windows';
  if (ua.includes('Mac')) return 'macos';
  return 'linux';
}

export function parseGithubRepo(url: string): { owner: string; repo: string } | undefined {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return undefined;
  return { owner: match[1], repo: match[2] };
}

/**
 * Finds the best-matching installer asset on a GitHub repo's latest release
 * for the given platform. Returns undefined if the repo/release/asset can't
 * be resolved.
 */
export async function fetchLatestReleaseAsset(
  githubUrl: string,
  platform: Platform,
): Promise<ReleaseAsset | undefined> {
  const parsed = parseGithubRepo(githubUrl);
  if (!parsed) return undefined;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/releases/latest`,
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    const assets: { name: string; browser_download_url: string }[] = data.assets || [];

    for (const ext of EXTENSION_PRIORITY[platform]) {
      const match = assets.find((a) => a.name.toLowerCase().endsWith(ext));
      if (match) return { name: match.name, url: match.browser_download_url };
    }
    return undefined;
  } catch {
    return undefined;
  }
}
