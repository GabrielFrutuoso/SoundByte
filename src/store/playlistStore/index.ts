import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlaylistStore {
  uuid: string | undefined;
  index: number;
  maxIndex: number;
  setUuid: (uuid: string) => void;
  setIndex: (index: number) => void;
  setMaxIndex: (max: number) => void;
  nextSong: () => void;
  previousSong: () => void;
}

export const usePlaylistStore = create<PlaylistStore>()(
  persist(
    (set) => ({
      uuid: undefined,
      index: 0,
      maxIndex: 0,

      setUuid: (uuid) => set({ uuid, index: 0 }),
      setIndex: (index) => set({ index }),
      setMaxIndex: (max) => set({ maxIndex: max }),

      nextSong: () =>
        set((state) => ({
          index:
            state.index < state.maxIndex - 1 ? state.index + 1 : state.index,
        })),

      previousSong: () =>
        set((state) => ({
          index: state.index > 0 ? state.index - 1 : state.index,
        })),
    }),
    { name: "playlist-storage" }
  )
);
