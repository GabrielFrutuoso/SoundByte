import React from "react";
import Image from "next/image";
import { baseStyle, baseStyleProps } from "./style";
import { Play } from "lucide-react";

interface PlaylistItemProps {
  songName: string;
  isPrivate: boolean;
  creator: string;
  cover: string;
  variant?: string;
  hideText?: boolean;
}

export const PlaylistItem = ({
  songName,
  cover,
  creator,
  variant,
  hideText,
}: PlaylistItemProps & baseStyleProps) => {
  return (
    <div className={baseStyle({ variant })}>
      <div className="relative">
        <button className="flex items-center justify-center bg-white/25 group-hover:visible invisible absolute w-full h-full rounded-lg">
          <Play />
        </button>
        <Image
          className={` ${hideText && "w-16"} rounded-lg aspect-square object-cover`}
          draggable={false}
          src={cover}
          width={50}
          height={50}
          alt="Album cover"
        />
      </div>

      <div className={`flex flex-col ${hideText && "text-lg font-bold"}`}>
        <h1>{songName}</h1>
        <p className={`${hideText && "hidden"}`}>playlist - {creator}</p>
      </div>
    </div>
  );
};
