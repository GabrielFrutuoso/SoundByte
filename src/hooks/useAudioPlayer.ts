import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AudioStore {
  audio: HTMLAudioElement;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  setSong: (url: string) => void;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => void;
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

      setSong: (url) => {
        const { audio, volume } = get();
        audio.src = url;
        audio.volume = volume;

        audio.addEventListener("loadedmetadata", () => {
          set({ duration: audio.duration });
        });

        audio.addEventListener("timeupdate", () => {
          set({ currentTime: audio.currentTime });
        });

        audio.addEventListener("ended", () => {
          set({ isPlaying: false, currentTime: 0 });
        });
      },

      play: async () => {
        const { audio } = get();
        await audio.play();
        set({ isPlaying: true });
      },

      pause: () => {
        const { audio } = get();
        audio.pause();
        set({ isPlaying: false });
      },

      togglePlay: () => {
        const { isPlaying, play, pause } = get();
        if (isPlaying) pause();
        else play();
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
