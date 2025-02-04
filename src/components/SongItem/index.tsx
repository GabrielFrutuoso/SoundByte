import { SongItemProps } from "@/app/types/SongProps.type";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

export const SongItem = (song: SongItemProps) => {
  return (
    <div className="flex flex-col gap-2 w-60 cursor-pointer group">
      <div className="relative">
        <button className="flex items-center justify-center bg-white/25 group-hover:visible invisible absolute w-full h-full rounded-lg">
          <Play size={40} />
        </button>
        <Image
          className="w-full object-cover aspect-square rounded-lg"
          draggable={false}
          width={500}
          height={500}
          src={song?.bannerSrc}
          priority
          alt="Album cover"
        />
      </div>

      <div>
        <p className="text-lg font-bold">{song?.title}</p>
        <p className="text-sm font-thin opacity-75">{song?.artist}</p>
      </div>
    </div>
  );
};
