import { create } from 'zustand'
import { Song, Playlist, LikedSong, LikedPlaylist } from '@prisma/client'

export interface User {
  id: string
  username: string
  email: string
  password?: string
  avatar?: string
  provider?: string
  createdAt: Date
  updatedAt: Date
  songs?: Song[]
  playlists?: Playlist[]
  likedSongs?: LikedSong[]
  likedPlaylists?: LikedPlaylist[]
}

interface UserStore {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  updateUser: (userData: Partial<User>) => void
  clearUser: () => void
  setError: (error: string | null) => void
  setLoading: (isLoading: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user, error: null }),
  
  updateUser: (userData) => 
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null
    })),
  
  clearUser: () => set({ user: null, error: null }),
  
  setError: (error) => set({ error }),
  
  setLoading: (isLoading) => set({ isLoading })
}))