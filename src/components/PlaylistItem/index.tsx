"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { baseStyle, baseStyleProps } from "./style";
import { Play } from "lucide-react";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useQueryState } from "nuqs";

interface PlaylistItemProps {
  id: string | number;
  songName: string;
  isPrivate: boolean;
  creator: string;
  cover: string;
  variant?: string;
  hideText?: boolean;
}

export const PlaylistItem = ({
  id,
  songName,
  cover,
  creator,
  variant,
  hideText,
}: PlaylistItemProps & baseStyleProps) => {
  const [name, setName] = useQueryState("playlist", {
    throttleMs: 1000,
    shallow: true,
    parse: (value) => value || null,
    defaultValue: null,
  });

  const handlePlaylistSelect = async (playlistId: string | number) => {
    await setName(String(playlistId));
  };

  useEffect(() => {
    if (name !== "") {
      localStorage.setItem("playlistId", JSON.stringify({ playlistId: name }));
    }
  }, [name]);

  const playlistId = JSON.parse(localStorage.getItem('playlistId') || '{"playlistId": ""}')

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={baseStyle({
            variant,
            className: `${playlistId.playlistId == id ? "text-lime-300" : ""} `,
          })}
        >
          <div className="relative">
            <button
              onClick={() => handlePlaylistSelect(id)}
              className="flex items-center justify-center bg-white/25 group-hover:visible invisible absolute w-full h-full rounded-lg"
            >
              <Play />
            </button>
            <Image
              className={` ${
                hideText && "w-16"
              } rounded-lg aspect-square object-cover`}
              draggable={false}
              src={cover}
              width={50}
              height={50}
              alt="Album cover"
            />
          </div>
          <Link href={`/${id}/playlist`}>
            <div className={`flex flex-col ${hideText && "text-lg font-bold"}`}>
              <h1>{songName}</h1>
              <p className={`${hideText && "hidden"}`}>playlist - {creator}</p>
            </div>
          </Link>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem>Compartilhar</ContextMenuItem>
        <ContextMenuItem>Descurtir</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
