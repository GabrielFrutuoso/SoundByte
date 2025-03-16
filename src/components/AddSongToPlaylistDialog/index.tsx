"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useAddSongToPlaylist } from "@/hooks/requests/playlist/useAddSongToPlaylist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

interface AddSongToPlaylistDialogProps {
  playlistId: string;
  availableSongs: Song[];
  trigger?: React.ReactNode;
}

export const AddSongToPlaylistDialog = ({
  playlistId,
  availableSongs,
  trigger,
}: AddSongToPlaylistDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { mutate: addSongToPlaylist } = useAddSongToPlaylist();
  const [isOpen, setIsOpen] = useState(false);

  const filteredSongs = useMemo(() => {
    if (!searchTerm.trim()) return availableSongs;
    
    const term = searchTerm.toLowerCase().trim();
    return availableSongs.filter((song: Song) => 
      song.title.toLowerCase().includes(term) || 
      song.artist.toLowerCase().includes(term)
    );
  }, [availableSongs, searchTerm]);

  const handleAddSongToPlaylist = (songId: string) => {
    if (!playlistId) return;
    
    addSongToPlaylist({
      playlistId,
      songId,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus size={16} /> Adicionar música
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar música à playlist</DialogTitle>
        </DialogHeader>
        <div className="relative my-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            placeholder="Pesquisar por título ou artista..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[400px] pr-4">
          {filteredSongs.length === 0 ? (
            <p className="text-muted-foreground py-4 text-center">
              {availableSongs.length === 0 
                ? "Não há músicas disponíveis para adicionar" 
                : "Nenhuma música encontrada com esses termos"}
            </p>
          ) : (
            <div className="space-y-2 py-2">
              {filteredSongs.map((song: Song) => (
                <div 
                  key={song.id} 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer"
                  onClick={() => handleAddSongToPlaylist(song.id)}
                >
                  <div className="flex items-center gap-3">
                    {song.bannerSrc && (
                      <Image
                        src={song.bannerSrc}
                        width={40}
                        height={40}
                        className="rounded-sm object-cover aspect-square"
                        alt={`Capa de ${song.title}`}
                      />
                    )}
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Plus size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
