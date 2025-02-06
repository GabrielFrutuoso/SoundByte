"use client";

import React, { useEffect, useState } from "react";
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
  layout?: number;
}

export const PlaylistItem = ({
  id,
  songName,
  cover,
  creator,
  variant,
  hideText,
  layout,
}: PlaylistItemProps & baseStyleProps) => {
  const [name, setName] = useQueryState("playlist", {
    throttleMs: 1000,
    shallow: true,
    parse: (value) => value || null,
    defaultValue: null,
  });

  const [playlistId, setPlaylistId] = useState("");

  useEffect(() => {
    const storedPlaylistId = typeof window !== "undefined" ? localStorage.getItem('playlistId') : null;
    if (storedPlaylistId) {
      setPlaylistId(JSON.parse(storedPlaylistId || '{"playlistId": ""}').playlistId);
    }
  }, [name]);

  const handlePlaylistSelect = async (playlistId: string | number) => {
    await setName(String(playlistId));
  };

  useEffect(() => {
    if (name !== "") {
      if (typeof window !== "undefined") {
        localStorage.setItem("playlistId", JSON.stringify({ playlistId: name }));
      }
    }
  }, [name]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={baseStyle({
            variant,
            className: `${playlistId == id ? "text-lime-300" : ""} `,
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
          {layout !== 4.5 && (
          <Link href={`/${id}/playlist`}>
            <div className={`flex flex-col ${hideText && "text-lg font-bold"}`}>
              <h1>{songName}</h1>
              <p className={`${hideText && "hidden"}`}>playlist - {creator}</p>
            </div>
          </Link>
          )}
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem>Compartilhar</ContextMenuItem>
        <ContextMenuItem>Descurtir</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
