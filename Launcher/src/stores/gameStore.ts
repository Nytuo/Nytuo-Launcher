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
    logo: resolveFileUrl(remote, remote.logo) || local?.logo,
    background: resolveFileUrl(remote, remote.background) || local?.background,
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

interface GameState {
  games: Game[];
  currentGame: Game | null;
  achievements: Achievement[];
  fetchGames: () => Promise<void>;
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
      currentGame: null,
      achievements: [],
      fetchGames: async () => {
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
        const allRemote = [
          ...remoteGames,
          ...extraGames.filter((g): g is PocketGameRecord => !!g),
        ];
        if (allRemote.length === 0) return; // offline: keep cached catalog as-is

        const existing = get().games;
        const byRepo = new Map(
          existing.map((g) => [(g.repo || g.id).toLowerCase(), g] as const),
        );

        const merged = allRemote.map((remote) => {
          const key = (remote.repo || remote.name || '').toLowerCase();
          const local = byRepo.get(key);
          if (local) byRepo.delete(key);
          return mergeRemoteGame(local, remote);
        });

        set({ games: [...merged, ...byRepo.values()] });
      },
      getGame: (id) => get().games.find((g) => g.id === id),
      setCurrentGame: (game) => set({ currentGame: game }),
      setGame: (id, game) => set({ games: get().games.map((g) => (g.id === id ? game : g)) }),
      setInstalled: (id, installed) =>
        set({
          games: get().games.map((g) => (g.id === id ? { ...g, isInstalled: installed } : g)),
        }),
      refreshInstallationStatus: async (gamePath) => {
        const gamesMap = [...get().games];
        for (const game of gamesMap) {
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

          let found = false;
          for (const candidate of candidates) {
            const path = `${gamePath}/${game.id}/${candidate}`;
            try {
              const exists = await invoke<boolean>('check_path_exists', { path });
              if (exists) {
                game.isInstalled = true;
                try {
                  const localVersion = await invoke<string>('read_local_file', { path });
                  game.version = localVersion.trim();
                } catch {
                  game.version = undefined;
                }
                found = true;
                break;
              }
            } catch {}
          }

          if (!found) {
            game.isInstalled = false;
            game.version = undefined;
          }
        }
        set({ games: gamesMap });
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
          const gamesMap = [...get().games];

          for (const game of gamesMap) {
            if (game.repo && game.version_file) {
              try {
                const url = `https://raw.githubusercontent.com/Nytuo/${game.repo}/master/Windows/${game.version_file}`;
                const version = await invoke<string>('fetch_remote_data', { url });
                const trimmed = version?.trim();
                if (trimmed && !/\s/.test(trimmed)) {
                  game.remoteVersion = trimmed;
                } else {
                  game.remoteVersion = undefined;
                }
              } catch (e) {
                game.remoteVersion = undefined;
              }
            }
          }

          set({ games: gamesMap });
        } catch (err) {
          toast.error('Failed to fetch game versions.');
        }
      },
    }),
    {
      name: 'nytuo-games',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
