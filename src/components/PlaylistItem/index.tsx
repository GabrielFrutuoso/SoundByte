"use client";

import React from "react";
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
import { usePlaylistStore } from "@/store/playlistStore";

export interface PlaylistItemProps {
  id: string | number;
  title: string;
  bannerSrc: string;
  isPrivate: boolean;
  variant?: string;
  isInMenu?: boolean;
  layout?: number;
  songIndex: number;
}

export const PlaylistItem = ({
  id,
  title,
  bannerSrc,
  variant,
  isInMenu,
  layout,
}: PlaylistItemProps & baseStyleProps) => {
  const { playlistId, setPlaylistId, setSingleSongId, setIndex } =
    usePlaylistStore();

  const handlePlaylistSelect = (id: string | number) => {
    setPlaylistId(String(id));
    setSingleSongId(undefined);
    setIndex(0);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={baseStyle({
            variant,
            className: `${playlistId === String(id) ? "text-lime-500" : ""}`,
          })}
        >
          <div
            onClick={() => handlePlaylistSelect(id)}
            className="relative group"
          >
            <button className="flex items-center justify-center bg-white/25 group-hover:visible invisible absolute w-full h-full rounded-lg">
              <Play />
            </button>
            <Image
              className={` ${
                isInMenu && "w-20"
              } rounded-lg aspect-square object-cover`}
              draggable={false}
              src={bannerSrc}
              width={50}
              height={50}
              alt="Album cover"
            />
          </div>
          {layout !== 4.5 && (
            <Link className="w-full" href={`/playlist?id=${id}`}>
              <div
                className={`flex flex-col ${isInMenu && "text-lg font-bold"}`}
              >
                <h1>{title}</h1>
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
