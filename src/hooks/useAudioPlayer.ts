import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AudioStore {
  audio: HTMLAudioElement;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentUrl: string | null;
  setSong: (url: string) => void;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  setVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setCurrentTime: (time: number) => void;
}

export const useAudioPlayer = create<AudioStore>()(
  persist(
    (set, get) => ({
      audio: new Audio(),
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      currentUrl: null,

      setSong: (url) => {
        const { audio, volume, currentUrl } = get();
        if (currentUrl === url) return;

        audio.src = url;
        audio.volume = volume;
        set({ currentUrl: url });

        audio.addEventListener("loadedmetadata", () => {
          set({ duration: audio.duration });
        });

        audio.addEventListener("timeupdate", () => {
          set({ currentTime: audio.currentTime });
        });

        audio.addEventListener("ended", () => {
          set({ isPlaying: false });
        });
      },

      play: async () => {
        const { audio } = get();
        try {
          await audio.play();
          set({ isPlaying: true });
        } catch (error) {
          console.error("Play error:", error);
        }
      },

      pause: () => {
        const { audio } = get();
        audio.pause();
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

      setVolume: (event) => {
        const { audio } = get();
        const newVolume = parseFloat(event.target.value);
        if (isFinite(newVolume)) {
          audio.volume = newVolume;
          set({ volume: newVolume });
        }
      },

      setCurrentTime: (time) => {
        const { audio } = get();
        audio.currentTime = time;
        set({ currentTime: time });
      },
    }),
    {
      name: "audio-storage",
      partialize: (state) => ({ volume: state.volume }),
    }
  )
);
