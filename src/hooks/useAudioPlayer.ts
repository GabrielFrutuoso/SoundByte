import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AudioStore {
  isPlaying: boolean;
  currentUrl: string | null;
  songId: string | null;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  setCurrentUrl: (url: string | null) => void;
  setSongId: (id: string | null) => void;
}

export const useAudioPlayer = create<AudioStore>()(
  persist(
    (set, get) => ({
      isPlaying: false,
      currentUrl: null,
      songId: null,

      setCurrentUrl: (url: string | null) => {
        if (url !== get().currentUrl) {
          set({ currentUrl: url });
        }
      },

      setSongId: (id: string | null) => {
        if (id !== get().songId) {
          set({ songId: id });
        }
      },

      play: async () => {
        try {
          if (!get().isPlaying) {
            set({ isPlaying: true });
          }
        } catch (error) {
          console.error("Play error:", error);
        }
      },

      pause: () => {
        if (get().isPlaying) {
          set({ isPlaying: false });
        }
      },

      togglePlay: async () => {
        const { isPlaying, play, pause } = get();
        if (isPlaying) {
          pause();
        } else {
          await play();
        }
      },
    }),
    {
      name: "audio-storage",
    }
  )
);
