import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  gamePath: string;
  language: string;
  setGamePath: (path: string) => void;
  setLanguage: (lang: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      gamePath: 'C:/NytuoLauncher/Games',
      language: 'en',
      setGamePath: (path) => set({ gamePath: path }),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'nytuo-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
