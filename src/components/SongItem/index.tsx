import React from "react";
import Image from "next/image";

interface SongItemProps {
  songName: string;
  isPrivate: boolean;
  creator: string
  cover: string;
  key: string | number;
}

export const SongItem = ({ songName, cover, creator, key }: SongItemProps) => {
  return (
    <div key={key} className="flex items-center gap-2 py-1">
      <Image
        className="rounded-lg"
        draggable={false}
        src={cover}
        width={50}
        height={50}
        alt="Album cover"
      />
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">{songName}</h1>
        <p>playlist - {creator}</p>
      </div>
    </div>
  );
};
