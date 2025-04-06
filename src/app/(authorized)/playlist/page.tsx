"use client";

import { Separator } from "@/components/ui/separator";
import { useGetPlaylistById } from "@/hooks/requests/playlist/useGetPlaylistById";
import { Heart, Music, Play, Share2, Plus } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePlayerStore } from "@/store/playlistStore";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { PlaylistSkeleton } from "./Skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";
import { useLikePlaylist } from "@/hooks/requests/playlist/useLikePlaylist";
import { useGetLikedPlaylists } from "@/hooks/requests/likedPlaylist/useGetLikedPlaylists";
import { useDisikePlaylist } from "@/hooks/requests/playlist/useDislikePlaylist";
import { useRemoveSongFromPlaylist } from "@/hooks/requests/playlist/useRemoveSongFromPlaylist";
import { useGetSongs } from "@/hooks/requests/song/useGetSongs";
import { AddSongToPlaylistDialog } from "@/components/AddSongToPlaylistDialog";
import { PlaylistTable } from "@/components/PlaylistTable";

interface Song {
  id: string;
  title: string;
  artist: string;
  bannerSrc: string;
  songURL: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  userUUID: string;
  genreId: number;
  user?: {
    username: string;
  };
}

interface LikedPlaylist {
  playlist: {
    id: string;
  };
}

export default function Playlist() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: playlist, isLoading } = useGetPlaylistById(id as string);

  const { setUuid, setIndex, uuid, index } = usePlayerStore();
  const audioPlayer = useAudioPlayer();
  const { user } = useUserStore();
  const { mutate: likePlaylist } = useLikePlaylist();
  const { mutate: dislikePlaylist } = useDisikePlaylist();
  const { data: likedPlaylists } = useGetLikedPlaylists(user?.id || "");
  const [isLiked, setIsLiked] = useState(false);
  const { mutate: removeSongFromPlaylist } = useRemoveSongFromPlaylist();
  const { data: songsResponse } = useGetSongs("", "", 100);

  useEffect(() => {
    const liked = likedPlaylists?.find(
      (likedPlaylist: LikedPlaylist) => likedPlaylist.playlist.id === id
    );
    setIsLiked(!!liked);
  }, [likedPlaylists, id]);

  const isCurrentPlaylist = useMemo(() => uuid === id, [uuid, id]);

  const isPlaying = audioPlayer.isPlaying;

  const handlePlayPlaylist = useCallback(() => {
    if (isCurrentPlaylist && isPlaying) {
      audioPlayer.pause();
    } else if (isCurrentPlaylist && !isPlaying) {
      audioPlayer.play();
    } else {
      setUuid(id as string);
      setIndex(0);
      audioPlayer.play();
    }
  }, [id, setUuid, setIndex, audioPlayer, isCurrentPlaylist, isPlaying]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.id || !id) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para curtir playlists",
        variant: "destructive",
      });
      return;
    }

    if (isLiked) {
      dislikePlaylist({
        userId: user.id,
        playlistId: id,
      });
    } else {
      likePlaylist({
        userId: user.id,
        playlistId: id,
      });
    }
  };

  const isPlaylistOwner = useMemo(() => {
    return playlist?.userId === user?.id;
  }, [playlist, user]);

  const handleRemoveSongFromPlaylist = (
    e: React.MouseEvent,
    songId: string
  ) => {
    e.stopPropagation();
    if (!id) return;

    removeSongFromPlaylist({
      playlistId: id,
      songId: songId,
    });
  };

  const availableSongs = useMemo(() => {
    const songs = songsResponse?.data || [];

    if (!songs.length || !playlist?.songs) return [];

    const playlistSongIds = playlist.songs.map((ps) => ps.song?.id);
    return songs.filter((song: Song) => !playlistSongIds.includes(song.id));
  }, [songsResponse, playlist]);

  return (
    <div className="h-full flex flex-col px-12 pt-12 space-y-4">
      {isLoading ? (
        <PlaylistSkeleton />
      ) : (
        <div className="flex items-center gap-4">
          {playlist?.bannerSrc && (
            <Image
              className="rounded-lg aspect-square object-cover"
              draggable={false}
              src={playlist?.bannerSrc as string}
              width={200}
              height={200}
              alt="Album cover"
            />
          )}
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-4xl font-bold">{playlist?.title}</h1>
              <h2 className="text-muted-foreground">
                {playlist?.user?.username}
              </h2>
            </div>
            <div className="flex gap-2">
              <Button
                title="Tocar"
                onClick={handlePlayPlaylist}
                variant="ghost"
                className="[&_svg]:size-8 px-1"
              >
                <Play
                  size={40}
                  className="cursor-pointer hover:text-lime-500"
                />
              </Button>

              <Button
                title="Compartilhar"
                variant="ghost"

                className="[&_svg]:size-8 px-1"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/playlist/${playlist?.id}`
                  );
                  toast({
                    title: "Link copiado!",
                    description: "Use o link para compartilhar a playlist",
                    variant: "default",
                  });
                }}
              >
                <Share2 />
              </Button>
              <Button
                variant="ghost"
                className="[&_svg]:size-8 px-1"
                onClick={handleLike}
              >
                <Heart
                  className={isLiked ? "text-lime-500" : ""}
                  fill={isLiked ? "currentColor" : "none"}
                />
                <span className={isLiked ? "text-lime-500 text-2xl" : "text-2xl"}>{playlist?.likesCount}</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <Separator orientation="horizontal" />
      {!isLoading && (playlist?.songs?.length ?? 0) > 0 ? (
        <PlaylistTable
          songs={playlist?.songs || []}
          isOwner={isPlaylistOwner}
          playlistId={id as string}
          availableSongs={availableSongs}
          isCurrentPlaylist={isCurrentPlaylist}
          currentSongIndex={index || 0}
          isPlaying={audioPlayer.isPlaying}
          onRowClick={(songIndex) => {
            if (isCurrentPlaylist) {
              if (songIndex === index && audioPlayer.isPlaying) {
                audioPlayer.pause();
              } else {
                setIndex(songIndex);
                audioPlayer.play();
              }
            } else {
              setIndex(songIndex);
              setUuid(id as string);
              audioPlayer.play();
            }
          }}
          onRemoveSong={handleRemoveSongFromPlaylist}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-zinc-600">
          <Music size={100} />
          <p className="text-2xl font-bold">Nenhuma música nesta playlist</p>
          {isPlaylistOwner && (
            <AddSongToPlaylistDialog
              playlistId={id as string}
              availableSongs={availableSongs}
              trigger={
                <Button
                  title="Adicionar música"
                  variant="link"
                  className="gap-2"
                >
                  <Plus size={16} /> Adicionar música
                </Button>
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
