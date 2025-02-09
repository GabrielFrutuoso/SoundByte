import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Song = any; // Assuming Song type is defined elsewhere, if not, define it here
type PlaylistStore = {
  playlistId: string | null;
  setPlaylistId: (playlistId: string) => void;
  singleSong: Song | null;
};

export const usePlaylistStore = create<PlaylistStore>()(
  persist(
    (set) => ({
      playlistId: null,
      singleSong: null,
      setPlaylistId: (playlistId) => set({ playlistId }),
      setSingleSong: (singleSong: Song | null) => set({ singleSong }),
    }),
    {
      name: 'playlist-storage',
    }
  )
);
