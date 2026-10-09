import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  fetchPocketCollection,
  resolveFileUrl,
  resolveFileUrls,
  type PocketRecord,
} from '@/lib/pocketbase';

export interface Creation {
  id: string;
  name: string;
  logo?: string;
  summary?: string;
  description?: string;
  information?: string;
  status?: string;
  role?: string;
  link?: string;
  website?: string;
  github: string;
  githubDL?: boolean;
  documentation?: string;
  screenshots: string[];
  video?: string;
  icons?: string;
  creationDate?: string;
  forkOf?: string;
  homebrew?: string;
  flathub?: string;
  chocolatey?: string;
  snapstore?: string;
  android?: string;
  windowsStore?: string;
  authors?: unknown;
  itch?: string;
  gamejolt?: string;
  colors?: string;
}

interface PocketSoftwareRecord extends PocketRecord {
  name?: string;
  logo?: string;
  summary?: string;
  description?: string;
  information?: string;
  status?: string;
  role?: string;
  link?: string;
  website?: string;
  github?: string;
  githubDL?: boolean;
  documentation?: string;
  screenshots?: string[];
  video?: string;
  icons?: string;
  creationDate?: string;
  forkOf?: string;
  homebrew?: string;
  flathub?: string;
  chocolatey?: string;
  snapstore?: string;
  android?: string;
  windowsStore?: string;
  authors?: unknown;
  itch?: string;
  gamejolt?: string;
  colors?: string;
}

interface CreationState {
  creations: Creation[];
  fetchCreations: () => Promise<void>;
  getCreation: (id: string) => Creation | undefined;
}

export const useCreationStore = create<CreationState>()(
  persist(
    (set, get) => ({
      creations: [],
      getCreation: (id) => get().creations.find((c) => c.id === id),
      fetchCreations: async () => {
        const records = await fetchPocketCollection<PocketSoftwareRecord>('softwares');
        const creations = records
          .filter((r) => r.name && r.name !== 'Nytuo-Launcher')
          .map((r) => ({
            id: r.id,
            name: r.name as string,
            logo: resolveFileUrl(r, r.logo),
            summary: r.summary,
            description: r.description,
            information: r.information,
            status: r.status,
            role: r.role,
            link: r.link,
            website: r.website,
            github: r.github || '',
            githubDL: r.githubDL,
            documentation: r.documentation,
            screenshots: resolveFileUrls(r, r.screenshots),
            video: r.video,
            icons: r.icons,
            creationDate: r.creationDate,
            forkOf: r.forkOf,
            homebrew: r.homebrew,
            flathub: r.flathub,
            chocolatey: r.chocolatey,
            snapstore: r.snapstore,
            android: r.android,
            windowsStore: r.windowsStore,
            authors: r.authors,
            itch: r.itch,
            gamejolt: r.gamejolt,
            colors: r.colors,
          }));
        set({ creations });
      },
    }),
    {
      name: 'nytuo-creations',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
