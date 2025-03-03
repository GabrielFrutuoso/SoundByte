import React, { useMemo } from "react";
import Image from "next/image";
import { Heart, Music } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useGetLikedSongs } from "@/hooks/requests/likedSong/useGetLikedSongs";

interface CurrentSongProps {
  songName: string;
  artist: string;
  cover: string;
  songId?: string;
}

export const CurrentSong = ({
  artist,
  songName,
  cover,
  songId,
}: CurrentSongProps) => {
  const { user } = useUserStore();
  const { data: likedSongs } = useGetLikedSongs(user?.id || "");
  
  const isLikedSong = useMemo(() => {
    if (!songId || !likedSongs) return false;
    return likedSongs.some(
      (likedSong: { song: { id: string } }) => likedSong.song.id === songId
    );
  }, [likedSongs, songId]);


  const hasContent = !!cover;

  return (
    <div className="flex items-center gap-4">
      {hasContent ? (
        <>
          <Image
            className="rounded-lg aspect-square object-cover"
            draggable={false}
            src={cover}
            width={50}
            height={50}
            alt="Album cover"
          />
          <div className="sm:hidden md:flex md:flex-col">
            <h1 className="text-xl font-bold">{songName}</h1>
            <p>{artist}</p>
          </div>
          <div>
            {isLikedSong && <Heart className="cursor-pointer text-lime-500" />}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center rounded-lg aspect-square object-cover w-[50px] h-[50px] bg-neutral-800">
            <Music className="text-zinc-600" />
          </div>
          <div className="sm:hidden md:flex md:flex-col">
            <h1 className="text-xl font-bold">No song selected</h1>
            <p>Select a song to play</p>
          </div>
        </>
      )}
    </div>
  );
};
