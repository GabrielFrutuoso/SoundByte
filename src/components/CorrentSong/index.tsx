import React from "react";
import Image from "next/image";

interface CurrentSongProps {
  songName: string;
  artist: string;
  cover: string;
  key: string | number;
}

export const CurrentSong = ({ artist, songName, cover, key }: CurrentSongProps) => {
  return (
    <div key={key} className="flex items-center gap-4">
      <Image
        className="rounded-lg"
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
    </div>
  );
};
