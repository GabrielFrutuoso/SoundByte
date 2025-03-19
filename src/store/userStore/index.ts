import { create } from "zustand";

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  provider: string;
  createdAt?: string;
  updatedAt?: string;
  likedPlaylists: Array<{
    playlist: {
      id: string;
    };
  }>;
  likedSongs: Array<{
    song: {
      id: string;
    };
  }>;
};

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (userData: Partial<User>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (userData) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    })),
  clearUser: () => set({ user: null }),
}));
