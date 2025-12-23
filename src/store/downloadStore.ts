import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Download } from '@/src/types';

interface DownloadState {
  downloads: Download[];
  addDownload: (download: Download) => void;
  removeDownload: (id: string) => void;
  clearAllDownloads: () => void;
}

export const useDownloadStore = create<DownloadState>()(
  persist(
    (set) => ({
      downloads: [],
      addDownload: (download) =>
        set((state) => ({
          downloads: [download, ...state.downloads],
        })),
      removeDownload: (id) =>
        set((state) => ({
          downloads: state.downloads.filter((d) => d.id !== id),
        })),
      clearAllDownloads: () => set({ downloads: [] }),
    }),
    {
      name: 'download-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

