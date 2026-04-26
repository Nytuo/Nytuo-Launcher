import { create } from 'zustand';

interface AppState {
  achievementsVisible: boolean;
  toggleAchievementsVisible: () => void;
  playBGMusic: (url: string) => void;
  stopBGMusic: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  achievementsVisible: true,
  toggleAchievementsVisible: () =>
    set((state) => ({ achievementsVisible: !state.achievementsVisible })),
  playBGMusic: (url) => console.log('Playing bg music:', url),
  stopBGMusic: () => console.log('Stopping bg music'),
}));
