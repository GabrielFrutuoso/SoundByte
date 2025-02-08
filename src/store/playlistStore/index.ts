import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PlaylistStore = {
  playlistId: string | null;
  setPlaylistId: (playlistId: string) => void;
};

export const usePlaylistStore = create<PlaylistStore>()(
  persist(
    (set) => ({
      playlistId: null,
      setPlaylistId: (playlistId) => set({ playlistId }),
    }),
    {
      name: 'playlist-storage',
    }
  )
);
