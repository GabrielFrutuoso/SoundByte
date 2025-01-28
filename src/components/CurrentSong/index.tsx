import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

interface CurrentSongProps {
  songName: string;
  artist: string;
  cover: string;
}

export const CurrentSong = ({ artist, songName, cover }: CurrentSongProps) => {
  return (
    <div className="flex items-center gap-4">
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
        <Heart className="cursor-pointer text-lime-500" />
      </div>
    </div>
  );
};
