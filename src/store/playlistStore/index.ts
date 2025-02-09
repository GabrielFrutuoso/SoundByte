import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PlaylistStore = {
  playlistId: string | undefined;
  setPlaylistId: (playlistId: string) => void;
  singleSongId: string | undefined;
  setSingleSongId: (singleSongId: string) => void;
  index: number | undefined;
  setIndex: (index: number) => void;
  increaseIndex: () => void;
  decreaseIndex: () => void;
};

export const usePlaylistStore = create<PlaylistStore>()(
  persist(
    (set) => ({
      playlistId: undefined,
      singleSongId: undefined,
      index: 0, 
      setPlaylistId: (playlistId) => set({ playlistId }),
      setSingleSongId: (singleSongId) => set({ singleSongId }),
      setIndex: (index) => set({ index }),
      increaseIndex: () => set((state) => ({ index: (state?.index ?? 0) + 1 })),
      decreaseIndex: () => set((state) => ({ index: (state?.index ?? 0) - 1 })),
    }),
    { name: 'playlist-storage' }
  )
);
