import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import defaultGames from '../data/games.json';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';

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
  platforms?: string;
  rating?: string;
  status?: string;
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
      games: defaultGames as Game[],
      currentGame: null,
      achievements: [],
      fetchGames: async () => {},
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
                if (version) {
                  game.remoteVersion = version.trim();
                }
              } catch (e) {}
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
