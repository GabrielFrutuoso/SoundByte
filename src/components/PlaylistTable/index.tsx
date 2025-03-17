import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pause, Plus, Play, Trash } from "lucide-react";
import { AddSongToPlaylistDialog } from "@/components/AddSongToPlaylistDialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

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

interface PlaylistSong {
  id: string;
  playlistId: string;
  songId: string;
  song?: {
    id: string;
    title: string;
    artist: string;
    bannerSrc: string;
    createdAt: string;
  };
}

interface PlaylistTableProps {
  songs: PlaylistSong[];
  isOwner: boolean;
  playlistId: string;
  availableSongs: Song[];
  isCurrentPlaylist: boolean;
  currentSongIndex: number;
  isPlaying: boolean;
  onRowClick: (index: number) => void;
  onRemoveSong: (e: React.MouseEvent, songId: string) => void;
}

export const PlaylistTable = ({
  songs,
  isOwner,
  playlistId,
  availableSongs,
  isCurrentPlaylist,
  currentSongIndex,
  isPlaying,
  onRowClick,
  onRemoveSong,
}: PlaylistTableProps) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 bg-zinc-950">
        <TableRow>
          <TableHead className="text-center">#</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Artista/Banda</TableHead>
          <TableHead>Adicionado por</TableHead>
          <TableHead>Adicionado em</TableHead>
          {isOwner && (
            <TableHead className="text-center">
              <AddSongToPlaylistDialog
                playlistId={playlistId}
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
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song, index) => (
          <ContextMenu key={song.id}>
            <ContextMenuTrigger asChild>
              <TableRow
                className={`cursor-pointer ${
                  isCurrentPlaylist && index === currentSongIndex
                    ? isPlaying
                      ? "bg-zinc-800/80 hover:bg-zinc-700/80"
                      : "bg-zinc-800/40 hover:bg-zinc-700/40"
                    : "hover:bg-zinc-900"
                }`}
                onClick={() => onRowClick(index)}
              >
                <TableCell className="text-center">
                  {isCurrentPlaylist && index === currentSongIndex ? (
                    <div className="flex justify-center">
                      {isPlaying ? (
                        <Pause size={16} className="text-lime-500" />
                      ) : (
                        <Play size={16} className="text-lime-500" />
                      )}
                    </div>
                  ) : (
                    index + 1
                  )}
                </TableCell>
                <TableCell>
                  <div className="">
                    <span
                      className={`line-clamp-1 ${
                        isCurrentPlaylist && index === currentSongIndex
                          ? isPlaying
                            ? "text-lime-500 font-medium"
                            : "text-lime-500 font-medium"
                          : ""
                      }`}
                    >
                      {song.song?.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className={`${
                    isCurrentPlaylist && index === currentSongIndex && isPlaying
                      ? "text-lime-500"
                      : isCurrentPlaylist && index === currentSongIndex
                      ? "text-lime-500"
                      : ""
                  }`}
                >
                  {song.song?.artist}
                </TableCell>
                <TableCell
                  className={`${
                    isCurrentPlaylist && index === currentSongIndex && isPlaying
                      ? "text-lime-500"
                      : isCurrentPlaylist && index === currentSongIndex
                      ? "text-lime-500"
                      : ""
                  }`}
                >
                  Você
                </TableCell>
                <TableCell
                  className={`${
                    isCurrentPlaylist && index === currentSongIndex && isPlaying
                      ? "text-lime-500"
                      : isCurrentPlaylist && index === currentSongIndex
                      ? "text-lime-500"
                      : ""
                  }`}
                >
                  {song.song?.createdAt
                    ? new Date(song.song.createdAt).toLocaleDateString()
                    : ""}
                </TableCell>
                {isOwner && <TableCell className="text-center"></TableCell>}
              </TableRow>
            </ContextMenuTrigger>
            {isOwner && (
              <ContextMenuContent>
                <ContextMenuItem
                  className="text-red-500 focus:text-red-500 focus:bg-red-50/10"
                  onClick={(e) => song.song?.id && onRemoveSong(e, song.song.id)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Remover da playlist
                </ContextMenuItem>
              </ContextMenuContent>
            )}
          </ContextMenu>
        ))}
      </TableBody>
    </Table>
  );
};
