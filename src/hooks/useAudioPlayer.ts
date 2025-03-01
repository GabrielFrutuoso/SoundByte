import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AudioStore {
  isPlaying: boolean;
  currentUrl: string | null;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
}

export const useAudioPlayer = create<AudioStore>()(
  persist(
    (set, get) => ({
      isPlaying: false,
      currentUrl: null,

      play: async () => {
        try {
          set({ isPlaying: true });
        } catch (error) {
          console.error("Play error:", error);
        }
      },

      pause: () => {
        set({ isPlaying: false });
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
