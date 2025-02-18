import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AudioStore {
  audio: HTMLAudioElement;
  isPlaying: boolean;
  currentSong: string | null;
  duration: number;
  currentTime: number;
  volume: number;
  setSong: (url: string) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setVolumeValue: (value: number) => void;
}

export const useAudioPlayer = create<AudioStore>()(
  persist(
    (set, get) => ({
      audio: new Audio(),
      isPlaying: false,
      currentSong: null,
      duration: 0,
      currentTime: 0,
      volume: 1,
      setSong: (url) => {
        const { audio, volume } = get();
        audio.src = url;
        audio.volume = volume;
        set({ currentSong: url });

        audio.addEventListener("loadedmetadata", () => {
          set({ duration: audio.duration });
        });

        audio.addEventListener("timeupdate", () => {
          set({ currentTime: audio.currentTime });
        });
      },
      play: () => {
        const { audio } = get();
        audio.play();
        set({ isPlaying: true });
      },
      pause: () => {
        const { audio } = get();
        audio.pause();
        set({ isPlaying: false });
      },
      togglePlay: () => {
        const { isPlaying, play, pause } = get();
        if (isPlaying) {
          pause();
        } else {
          play();
        }
      },
      setVolume: (event) => {
        const { audio } = get();
        const newVolume = parseFloat(event.target.value);
        if (!isNaN(newVolume) && isFinite(newVolume)) {
          audio.volume = newVolume;
          set({ volume: newVolume });
        }
      },
      setVolumeValue: (value) => {
        const { audio } = get();
        if (!isNaN(value) && isFinite(value)) {
          const newVolume = Math.min(Math.max(value, 0), 1);
          audio.volume = newVolume;
          set({ volume: newVolume });
        }
      },
    }),
    {
      name: "audio-storage",
      partialize: (state) => ({ volume: state.volume }),
    }
  )
);
