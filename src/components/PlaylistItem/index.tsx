import React from "react";
import Image from "next/image";
import { baseStyle, baseStyleProps } from "./style";

interface PlaylistItemProps {
  songName: string;
  isPrivate: boolean;
  creator: string;
  cover: string;
  key: string | number;
  variant?: string;
  hideText?: boolean;
}

export const PlaylistItem = ({
  songName,
  cover,
  creator,
  key,
  variant,
  hideText,
}: PlaylistItemProps & baseStyleProps) => {
  return (
    <div key={key} className={baseStyle({ variant })}>
      <Image
        className={` ${hideText && "w-16"} rounded-lg`}
        draggable={false}
        src={cover}
        width={50}
        height={50}
        alt="Album cover"
      />
      <div className={`flex flex-col ${hideText && "text-lg font-bold"}`}>
        <h1>{songName}</h1>
        <p className={`${hideText && "hidden"}`}>playlist - {creator}</p>
      </div>
    </div>
  );
};
