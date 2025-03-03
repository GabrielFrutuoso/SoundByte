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
import { Ellipsis, Heart, Music, Pause, Play } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { usePlayerStore } from "@/store/playlistStore";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function Playlist() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: playlist } = useGetPlaylistById(id as string);

  const { setUuid, setIndex, uuid, index } = usePlayerStore();
  const audioPlayer = useAudioPlayer();

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
        <Pause
          size={40}
          className="cursor-pointer hover:text-lime-500"
          onClick={handlePlayPlaylist}
        />
      );
    } else {
      return (
        <Play
          size={40}
          className="cursor-pointer hover:text-lime-500"
          onClick={handlePlayPlaylist}
        />
      );
    }
  };

  return (
    <div className="h-full flex flex-col px-12 pt-12 space-y-4">
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
          <div className="flex gap-3">
            {getPlayButton()}
            <Heart className="text-lime-500" size={40} />
            <Ellipsis size={40} />
          </div>
        </div>
      </div>

      <Separator orientation="horizontal" />
      {(playlist?.songs?.length ?? 0) > 0 ? (
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
            {playlist?.songs.map((song, songIndex) => (
              <TableRow
                key={song?.song?.id}
                className={`hover:bg-zinc-800 text-lg font-semibold cursor-pointer ${
                  isCurrentPlaylist && index === songIndex ? "bg-zinc-800" : ""
                }`}
                onClick={() => handlePlaySong(songIndex)}
              >
                <TableCell>
                  <div className="flex items-center">
                    {isCurrentPlaylist && index === songIndex && isPlaying ? (
                      <Pause size={16} className="text-lime-500 mr-2" />
                    ) : (
                      <Play
                        size={16}
                        className={`${
                          isCurrentPlaylist && index === songIndex
                            ? "text-lime-500"
                            : ""
                        } mr-2`}
                      />
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
            ))}
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
