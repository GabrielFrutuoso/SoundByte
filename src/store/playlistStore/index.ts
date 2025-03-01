import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PlaylistStore {
  uuid: string | undefined;
  index: number;
  maxIndex: number;
  loop: boolean;
  setLoop: (loop: boolean) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
  setUuid: (uuid: string) => void;
  setIndex: (index: number) => void;
  setMaxIndex: (max: number) => void;
  nextSong: () => void;
  previousSong: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

// Fix the TypeScript issue by using 'any' as a temporary workaround
export const usePlaylistStore = create<PlaylistStore>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (persist as any)(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => {
      return {
        uuid: undefined,
        index: 0,
        maxIndex: 0,
        loop: false,
        shuffle: false,
        volume: 0.5,
        
        setUuid: (uuid: string) => set({ uuid, index: 0 }),
        setIndex: (index: number) => set({ index }),
        setMaxIndex: (max: number) => set({ maxIndex: max }),
        setLoop: (loop: boolean) => set({ loop }),
        setShuffle: (shuffle: boolean) => set({ shuffle }),
        setVolume: (volume: number) => set({ volume }),

        nextSong: () =>
          set((state: PlaylistStore) => {
            if (state.maxIndex === 0) return {};
            
            if (state.shuffle) {
              return {};
            } else {
              const nextIndex = (state.index + 1) % state.maxIndex;
              return { index: nextIndex };
            }
          }),

        previousSong: () =>
          set((state: PlaylistStore) => {
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
    { name: "playlist-storage" }
  )
);
