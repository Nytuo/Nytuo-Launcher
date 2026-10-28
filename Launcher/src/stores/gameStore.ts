import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';
import {
  fetchPocketCollection,
  resolveFileUrl,
  resolveFileUrls,
  parseAuthors,
  slugify,
  type PocketRecord,
} from '@/lib/pocketbase';

export interface Achievement {
  name: string;
  unlocked: boolean;
}

export interface Game {
  id: string;
  name: string;
  description?: string;
  background?: string;
  logo?: string;
  version_file?: string;
  repo?: string;
  online_url?: string;
  version?: string;
  remoteVersion?: string;
  rating?: string;
  tags?: string;
  critic_score?: string;
  genres?: string;
  styles?: string;
  release_date?: string;
  developers?: string;
  editors?: string;
  trophies_unlocked?: string;
  screenshots?: string[];
  videos?: string[];
  importer_id?: string;
  exec_args?: string;
  game_importer_id?: string;
  stats?: { time_played: string; date_of_play: string }[];
  isInstalled?: boolean;
  exec_name?: {
    windows?: string;
    linux?: string;
    macos?: string;
  };
  webOnly?: boolean;
  status?: string;
  website?: string;
  colors?: string;
  itch?: string;
  gamejolt?: string;
}

interface PocketGameRecord extends PocketRecord {
  repo?: string;
  name?: string;
  logo?: string;
  background?: string;
  screenshots?: string[];
  video?: string;
  summary?: string;
  description?: string;
  information?: string;
  creationDate?: string;
  status?: string;
  colors?: string;
  itch?: string;
  gamejolt?: string;
  website?: string;
  authors?: unknown;
  versionFile?: string;
  onlineEmbedUrl?: string;
  execWindows?: string;
  execLinux?: string;
  execMac?: string;
}

const EXTRA_GAME_SOURCES: { collection: string; id: string; overrides: Partial<PocketGameRecord> }[] =
  [
    {
      collection: 'University',
      id: 'qfk63ekxezmvuz1', // "The Little Princess"
      overrides: {
        repo: 'TLP',
        execWindows: 'thelittleprincess.exe',
        execLinux: 'thelittleprincess.x86_64',
        execMac: 'thelittleprincess.app',
        versionFile: 'TLP_Version.txt',
      },
    },
  ];

// Bundled /images/* assets were removed; only keep cached remote URLs.
function remoteOnly(url?: string): string | undefined {
  return url && /^https?:\/\//.test(url) ? url : undefined;
}

function mergeRemoteGame(local: Game | undefined, remote: PocketGameRecord): Game {
  const authors = parseAuthors(remote.authors);
  const developers = authors.map((a) => a.name).filter(Boolean).join(', ');
  const id = local?.id ?? slugify(remote.repo || remote.name || remote.id);

  const execName =
    remote.execWindows || remote.execLinux || remote.execMac
      ? {
          windows: remote.execWindows || local?.exec_name?.windows,
          linux: remote.execLinux || local?.exec_name?.linux,
          macos: remote.execMac || local?.exec_name?.macos,
        }
      : local?.exec_name;

  return {
    id,
    name: remote.name || local?.name || remote.repo || id,
    logo: resolveFileUrl(remote, remote.logo) || remoteOnly(local?.logo),
    background: resolveFileUrl(remote, remote.background) || remoteOnly(local?.background),
    screenshots: resolveFileUrls(remote, remote.screenshots),
    videos: remote.video ? [remote.video] : local?.videos,
    description: remote.summary || remote.description || local?.description,
    release_date: remote.creationDate || local?.release_date,
    developers: developers || local?.developers,
    status: remote.status || local?.status,
    website: remote.website || local?.website,
    colors: remote.colors || local?.colors,
    version_file: remote.versionFile || local?.version_file,
    repo: remote.repo || local?.repo,
    online_url: remote.onlineEmbedUrl || local?.online_url,
    itch: remote.itch || local?.itch,
    gamejolt: remote.gamejolt || local?.gamejolt,
    exec_name: execName,
    webOnly: !execName?.windows && !execName?.linux && !execName?.macos,
    isInstalled: local?.isInstalled,
    version: local?.version,
    remoteVersion: local?.remoteVersion,
  };
}

// One entry per game id, first occurrence wins. Remote records can resolve to the
// same id (same repo, or an extra source that is also in the main collection).
function dedupeGames(games: Game[]): Game[] {
  const seen = new Set<string>();
  return games.filter((g) => {
    const key = g.id.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function currentPlatform(): string {
  return navigator.userAgent.includes('Windows')
    ? 'windows'
    : navigator.userAgent.includes('Mac')
      ? 'macos'
      : 'linux';
}

async function fetchRemoteCatalog(): Promise<PocketGameRecord[]> {
  const [remoteGames, extraGames] = await Promise.all([
    fetchPocketCollection<PocketGameRecord>('games'),
    Promise.all(
      EXTRA_GAME_SOURCES.map(async (src) => {
        const [record] = await fetchPocketCollection<PocketGameRecord>(src.collection, {
          filter: `id='${src.id}'`,
        });
        return record ? { ...record, ...src.overrides } : undefined;
      }),
    ),
  ]);
  return [...remoteGames, ...extraGames.filter((g): g is PocketGameRecord => !!g)];
}

function mergeCatalog(existing: Game[], allRemote: PocketGameRecord[]): Game[] {
  const byRepo = new Map(existing.map((g) => [(g.repo || g.id).toLowerCase(), g] as const));

  const merged = allRemote.map((remote) => {
    const key = (remote.repo || remote.name || '').toLowerCase();
    const local = byRepo.get(key);
    if (local) byRepo.delete(key);
    return mergeRemoteGame(local, remote);
  });

  return dedupeGames([...merged, ...byRepo.values()]);
}

// Installed state of one game: manifest.json first, *_Version.txt files as legacy fallback.
async function readInstallState(
  game: Game,
  gamePath: string,
): Promise<Pick<Game, 'isInstalled' | 'version'>> {
  const manifestPath = `${gamePath}/${game.id}/manifest.json`;
  try {
    if (await invoke<boolean>('check_path_exists', { path: manifestPath })) {
      const manifest = JSON.parse(await invoke<string>('read_local_file', { path: manifestPath }));
      if (typeof manifest.version === 'string' && manifest.version.trim().length > 0) {
        return { isInstalled: true, version: manifest.version.trim() };
      }
    }
  } catch {}

  const candidates: string[] = [];
  if (game.version_file && game.version_file.trim().length > 0) {
    candidates.push(game.version_file.trim());
  }

  const idUpper = game.id.toUpperCase();
  candidates.push(`${idUpper}_Version.txt`);
  candidates.push(`Version${idUpper}.txt`);

  if ((game as any).importer_id) {
    const imp = String((game as any).importer_id).toUpperCase();
    candidates.push(`Version${imp}.txt`);
  }
  if ((game as any).game_importer_id) {
    const gip = String((game as any).game_importer_id).toUpperCase();
    candidates.push(`Version${gip}.txt`);
  }

  for (const candidate of candidates) {
    const path = `${gamePath}/${game.id}/${candidate}`;
    try {
      if (await invoke<boolean>('check_path_exists', { path })) {
        let version: string | undefined;
        try {
          version = (await invoke<string>('read_local_file', { path })).trim();
        } catch {}
        return { isInstalled: true, version };
      }
    } catch {}
  }

  return { isInstalled: false, version: undefined };
}

async function resolveInstallState(games: Game[], gamePath: string): Promise<Game[]> {
  return Promise.all(
    games.map(async (game) => ({ ...game, ...(await readInstallState(game, gamePath)) })),
  );
}

// Latest published version: manifest.json from the download server, then the GitHub txt.
async function readRemoteVersion(game: Game): Promise<string | undefined> {
  try {
    const version = await invoke<string>('fetch_remote_manifest_version', {
      gameId: game.id,
      platform: currentPlatform(),
    });
    if (version && !/\s/.test(version)) return version;
  } catch {}

  if (game.repo && game.version_file) {
    try {
      const url = `https://raw.githubusercontent.com/Nytuo/${game.repo}/master/Windows/${game.version_file}`;
      const version = (await invoke<string>('fetch_remote_data', { url }))?.trim();
      if (version && !/\s/.test(version)) return version;
    } catch {}
  }

  return undefined;
}

async function resolveRemoteVersions(games: Game[]): Promise<Game[]> {
  return Promise.all(
    games.map(async (game) => ({ ...game, remoteVersion: await readRemoteVersion(game) })),
  );
}

interface GameState {
  games: Game[];
  // False until loadLibrary has finished resolving install and remote versions.
  // The library waits on this so no card shows before its state is known.
  ready: boolean;
  currentGame: Game | null;
  achievements: Achievement[];
  loadLibrary: (gamePath: string) => Promise<void>;
  getGame: (id: string) => Game | undefined;
  setCurrentGame: (game: Game | null) => void;
  setGame: (id: string, game: Game) => void;
  fetchAchievements: (id: string, gamePath: string) => Promise<void>;
  fetchRemoteVersions: () => Promise<void>;
  setInstalled: (id: string, installed: boolean) => void;
  refreshInstallationStatus: (gamePath: string) => Promise<void>;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      games: [],
      ready: false,
      currentGame: null,
      achievements: [],
      loadLibrary: async (gamePath) => {
        try {
          let games = get().games;
          try {
            const remote = await fetchRemoteCatalog();
            // Offline or empty: keep the cached catalog as-is.
            if (remote.length > 0) games = mergeCatalog(games, remote);
          } catch {}

          games = dedupeGames(games);
          games = await resolveInstallState(games, gamePath);
          games = await resolveRemoteVersions(games);
          set({ games });
        } catch (err) {
          console.error('Failed to load library:', err);
        } finally {
          set({ ready: true });
        }
      },
      getGame: (id) => get().games.find((g) => g.id === id),
      setCurrentGame: (game) => set({ currentGame: game }),
      setGame: (id, game) => set({ games: get().games.map((g) => (g.id === id ? game : g)) }),
      setInstalled: (id, installed) =>
        set({
          games: get().games.map((g) => (g.id === id ? { ...g, isInstalled: installed } : g)),
        }),
      refreshInstallationStatus: async (gamePath) => {
        set({ games: await resolveInstallState(get().games, gamePath) });
      },
      fetchAchievements: async (id, gamePath) => {
        try {
          const gameIdUpper = id.toUpperCase();

          const candidates = [
            `/achievements/${gameIdUpper}/AllAchievements.txt`,
            `/Achievements/${gameIdUpper}/AllAchievements.txt`,
            `/achievements/${id}/AllAchievements.txt`,
          ];

          let allAchText = '';
          let fetched = false;
          for (const p of candidates) {
            try {
              const response = await fetch(p);
              if (!response.ok) continue;
              const text = await response.text();

              if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<html')) {
                continue;
              }
              allAchText = text;
              fetched = true;
              break;
            } catch {
              continue;
            }
          }

          if (!fetched) {
            const localPath = `${gamePath}/${id}/Achievements/AllAchievements.txt`;
            const existsLocal = await invoke<boolean>('check_path_exists', { path: localPath });
            if (existsLocal) {
              try {
                allAchText = await invoke<string>('read_local_file', { path: localPath });
                fetched = true;
              } catch {}
            }
          }

          if (!fetched) throw new Error('Achievements file not found');
          const allAchList = allAchText
            .split('\n')
            .map((a) => a.trim())
            .filter((a) => a.length > 0);

          let unlockedList: string[] = [];
          const achDonePath = `${gamePath}/${id}/Achievements/AchDone.txt`;
          const exists = await invoke<boolean>('check_path_exists', { path: achDonePath });

          if (exists) {
            const unlockedText = await invoke<string>('read_local_file', { path: achDonePath });
            unlockedList = unlockedText
              .split('\n')
              .map((a) => a.trim())
              .filter((a) => a.length > 0);
          }

          const achievements: Achievement[] = allAchList.map((name) => ({
            name,
            unlocked: unlockedList.includes(name),
          }));

          set({ achievements });
        } catch (err) {
          console.error('Failed to load achievements:', err);
          set({ achievements: [] });
        }
      },
      fetchRemoteVersions: async () => {
        try {
          set({ games: await resolveRemoteVersions(get().games) });
        } catch (err) {
          toast.error('Failed to fetch game versions.');
        }
      },
    }),
    {
      name: 'nytuo-games',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => {
        const { ready, ...persisted } = state;
        return persisted;
      },
      migrate: (persisted) => {
        const state = persisted as { games?: Game[] };
        return {
          ...state,
          games: dedupeGames(state.games ?? []).map((g) => ({
            ...g,
            logo: remoteOnly(g.logo),
            background: remoteOnly(g.background),
          })),
        };
      },
    },
  ),
);
