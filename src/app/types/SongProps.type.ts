export interface SongItemProps {
    id: string
    title: string
    artist: string
    bannerSrc: string
    songURL: string,
    isPrivate: boolean,
    createdAt: Date,
    updatedAt: Date,
    userUUID: string,
    genreId: number,
  }