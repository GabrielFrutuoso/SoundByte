"use client";

import React from "react";
import Image from "next/image";
import { baseStyle, baseStyleProps } from "./style";
import { Pause, Play } from "lucide-react";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";
import { useDisikePlaylist } from "@/hooks/requests/playlist/useDislikePlaylist";
import { useLikePlaylist } from "@/hooks/requests/playlist/useLikePlaylist";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { usePlayerStore } from "@/store/playlistStore";

export interface PlaylistItemProps {
  id: string;
  title: string;
  bannerSrc: string;
  isPrivate: boolean;
  variant?: string;
  isInMenu?: boolean;
  songIndex: number;
  isCollapsed?: boolean;
}

export const PlaylistItem = ({
  id,
  title,
  bannerSrc,
  variant,
  isInMenu,
  isCollapsed,
}: PlaylistItemProps & baseStyleProps) => {
  const { setUuid, uuid } = usePlayerStore();
  const { play, pause, isPlaying } = useAudioPlayer();

  const { user: currentUser } = useUserStore();

  const handlePlaylistSelect = () => {
    setUuid(id);
  };

  const { mutate: likePlaylist } = useLikePlaylist();
  const { mutate: disLikePlaylist } = useDisikePlaylist();

  const handleLike = async () => {
    const likedPlaylists = currentUser?.likedPlaylists;
    if (
      !likedPlaylists?.some((likedPlaylist) => likedPlaylist.playlist.id === id)
    ) {
      likePlaylist({ playlistId: id, userId: currentUser?.id || "" });
    } else {
      disLikePlaylist({ playlistId: id, userId: currentUser?.id || "" });
    }
  };

  const isCurrentPlaylist = uuid === id;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={baseStyle({
            variant,
            className: isCurrentPlaylist ? "text-lime-500" : "",
          })}
        >
          <div className="relative group">
            <button
              onClick={() => {
                if (isPlaying && isCurrentPlaylist) {
                  pause();
                } else {
                  handlePlaylistSelect();
                  play();
                }
              }}
              className="flex items-center justify-center bg-white/25 group-hover:visible invisible absolute w-full h-full rounded-lg"
            >
              {isPlaying && isCurrentPlaylist ? <Pause /> : <Play />}
            </button>
            <Image
              className={`${
                isInMenu && "w-20"
              } rounded-lg aspect-square object-cover`}
              draggable={false}
              src={bannerSrc}
              width={50}
              height={50}
              alt="Album cover"
            />
          </div>
          {!isCollapsed && (
            <Link className="w-full" href={`/playlist?id=${id}`}>
              <div
                title={title}
                className={`flex flex-col ${
                  isInMenu && "text-lg font-bold"
                } text-ellipsis overflow-hidden whitespace-nowrap`}
              >
                <h1>{title}</h1>
              </div>
            </Link>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            const url = `${window.location.origin}/playlist?id=${id}`;
            navigator.clipboard.writeText(url);
            toast({
              title: "Copiado para a área de transferência",
              description: "Use Ctrl + V para colar o link",
            });
          }}
        >
          Compartilhar
        </ContextMenuItem>
        <ContextMenuItem onClick={handleLike}>
          {currentUser?.likedPlaylists?.some(
            (likedPlaylist) => likedPlaylist.playlist.id === id
          )
            ? "descurtir :("
            : "curtir <3"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
