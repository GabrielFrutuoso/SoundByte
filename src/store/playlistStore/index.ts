import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PlayerStore {
  uuid: string | undefined;
  index: number;
  maxIndex: number;
  shuffle: boolean;
  isMuted: boolean;
  setMuted: (isMuted: boolean) => void;
  setShuffle: (shuffle: boolean) => void;
  setUuid: (uuid: string) => void;
  setIndex: (index: number) => void;
  setMaxIndex: (max: number) => void;
  nextSong: () => void;
  previousSong: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerStore>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (persist as any)(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => {
      return {
        uuid: undefined,
        index: 0,
        maxIndex: 0,
        shuffle: false,
        isMuted: false,
        volume: 0.5,
        setUuid: (uuid: string) => set({ uuid, index: 0 }),
        setIndex: (index: number) => set({ index }),
        setMaxIndex: (max: number) => set({ maxIndex: max }),
        setShuffle: (shuffle: boolean) => set({ shuffle }),
        setVolume: (volume: number) => set({ volume }),
        setMuted: (isMuted: boolean) => set({ isMuted }),

        nextSong: () =>
          set((state: PlayerStore) => {
            if (state.maxIndex === 0) return {};
            
            if (state.shuffle) {
              return {};
            } else {
              const nextIndex = (state.index + 1) % state.maxIndex;
              return { index: nextIndex };
            }
          }),

        previousSong: () =>
          set((state: PlayerStore) => {
            if (state.maxIndex === 0) return {};
            
            if (state.shuffle) {
              return {};
            } else {
              const prevIndex = (state.index - 1 + state.maxIndex) % state.maxIndex;
              return { index: prevIndex };
            }
          }),
      };
    },
    { name: "Player-storage" }
  )
);
