import { create } from 'zustand';

export type DownloadMode = 'install' | 'repair' | 'update';

export interface ActiveDownload {
  gameId: string;
  mode: DownloadMode;
  downloaded: number;
  total: number;
}

interface DownloadState {
  activeDownload: ActiveDownload | null;
  setActiveDownload: (download: ActiveDownload | null) => void;
  updateProgress: (downloaded: number, total: number) => void;
}

export const useDownloadStore = create<DownloadState>((set) => ({
  activeDownload: null,
  setActiveDownload: (download) => set({ activeDownload: download }),
  updateProgress: (downloaded, total) =>
    set((s) => (s.activeDownload ? { activeDownload: { ...s.activeDownload, downloaded, total } } : s)),
}));
