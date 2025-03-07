"use client";

import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useGetPlaylistById } from "@/hooks/requests/playlist/useGetPlaylistById";
import { Heart, Music, Pause, Play, Share2 } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePlayerStore } from "@/store/playlistStore";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { PlaylistItemSkeleton, PlaylistSkeleton } from "./Skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";
import { useLikePlaylist } from "@/hooks/requests/playlist/useLikePlaylist";
import { useGetLikedPlaylists } from "@/hooks/requests/likedPlaylist/useGetLikedPlaylists";
import { useDisikePlaylist } from "@/hooks/requests/playlist/useDislikePlaylist";

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

  useEffect(() => {
    const liked = likedPlaylists?.find(
      (likedPlaylist) => likedPlaylist.playlist.id === id
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

  const handlePlaySong = useCallback(
    (songIndex: number) => {
      if (isCurrentPlaylist && index === songIndex && isPlaying) {
        audioPlayer.pause();
      } else if (isCurrentPlaylist && index === songIndex && !isPlaying) {
        audioPlayer.play();
      } else {
        setUuid(id as string);
        setIndex(songIndex);
        audioPlayer.play();
      }
    },
    [id, setUuid, setIndex, audioPlayer, isCurrentPlaylist, index, isPlaying]
  );

  const getPlayButton = () => {
    if (isCurrentPlaylist && isPlaying) {
      return (
        <Button
          title="Parar"
          onClick={handlePlayPlaylist}
          variant="ghost"
          size={"icon"}
          className="[&_svg]:size-8"
        >
          <Pause className="cursor-pointer hover:text-lime-500" />
        </Button>
      );
    } else {
      return (
        <Button
          title="Tocar"
          onClick={handlePlayPlaylist}
          variant="ghost"
          size={"icon"}
          className="[&_svg]:size-8"
        >
          <Play size={40} className="cursor-pointer hover:text-lime-500" />
        </Button>
      );
    }
  };

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
              {getPlayButton()}
              <Button
                variant="ghost"
                size={"icon"}
                className="[&_svg]:size-8"
                onClick={handleLike}
              >
                <Heart
                  className={isLiked ? "text-lime-500" : ""}
                  fill={isLiked ? "currentColor" : "none"}
                />
              </Button>
              <Button
                title="Compartilhar"
                variant="ghost"
                size={"icon"}
                className="[&_svg]:size-8"
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
            </div>
          </div>
        </div>
      )}

      <Separator orientation="horizontal" />
      {!isLoading && (playlist?.songs?.length ?? 0) > 0 ? (
        <Table>
          <TableHeader className="sticky top-0 bg-zinc-950">
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Nome da musica</TableHead>
              <TableHead>Artista/Banda</TableHead>
              <TableHead>Adicionado por</TableHead>
              <TableHead>Adicionado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <PlaylistItemSkeleton />
            ) : (
              playlist?.songs.map((song, songIndex) => (
                <TableRow
                  key={song?.song?.id}
                  className={`text-lg font-thin cursor-pointer ${
                    isCurrentPlaylist && index === songIndex
                      ? "text-lime-500"
                      : ""
                  }`}
                  onClick={() => handlePlaySong(songIndex)}
                >
                  <TableCell>
                    <div className="flex items-center">
                      {isCurrentPlaylist && index === songIndex && isPlaying ? (
                        <Pause size={16} className="text-lime-500" />
                      ) : (
                        <span className="text-lg px-1">{songIndex + 1}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{song?.song?.title}</TableCell>
                  <TableCell>{song?.song?.artist}</TableCell>
                  <TableCell>{song?.song?.user?.username}</TableCell>
                  <TableCell>
                    {new Date(song?.song?.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-zinc-600">
          <Music size={100} />
          <p className="text-2xl font-bold">Nenhuma música nesta playlist</p>
        </div>
      )}
    </div>
  );
}
