import { SongItemProps } from "@/app/types/SongProps.type";
import { Pause, Play, FolderPlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/playlistStore";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "../ui/context-menu";
import { useUserStore } from "@/store/userStore";
import { useDisikeSongs } from "@/hooks/requests/song/useDislikeSong";
import { useLikeSongs } from "@/hooks/requests/song/useLikeSong";
import { useGetLikedSongs } from "@/hooks/requests/likedSong/useGetLikedSongs";
import { useAddSongToPlaylist } from "@/hooks/requests/playlist/useAddSongToPlaylist";
import { useGetPlaylistsByUser } from "@/hooks/requests/playlist/useGetPlaylistsByUser/route";
import { useDeleteSongs } from "@/hooks/requests/song/useDeleteSong";
import { DeleteDialog } from "../DeleteDialog";

interface LikedSong {
  song: {
    id: string;
  };
}

export const SongItem = ({
  id,
  bannerSrc,
  title,
  artist,
  userUUID,
}: SongItemProps) => {
  const { uuid, setUuid, setIndex } = usePlayerStore();
  const audioPlayer = useAudioPlayer();
  const isCurrentlyPlaying = audioPlayer.isPlaying && uuid === id;
  const { user: currentUser } = useUserStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: likedSongs } = useGetLikedSongs(currentUser?.id || "");
  const { data: userPlaylists } = useGetPlaylistsByUser(currentUser?.id || "");
  const { mutate: likeSong } = useLikeSongs();
  const { mutate: dislikeSong } = useDisikeSongs();
  const { mutate: addSongToPlaylist } = useAddSongToPlaylist();
  const { mutate: deleteSong } = useDeleteSongs();

  useEffect(() => {
    if (likedSongs) {
      const isLikedSong = likedSongs.some(
        (likedSong: LikedSong) => likedSong.song.id === id
      );
      setIsLiked(isLikedSong);
    }
  }, [likedSongs, id]);

  const handleSongSelect = () => {
    setUuid(id);
    setIndex(0);
  };

  const handleLike = async () => {
    if (!currentUser?.id) return;

    if (isLiked) {
      dislikeSong({ songId: id, userId: currentUser.id });
    } else {
      likeSong({ songId: id, userId: currentUser.id });
    }
  };

  const handleAddToPlaylist = (playlistId: string) => {
    addSongToPlaylist({ playlistId, songId: id });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onClick={handleSongSelect}
          className={`flex flex-col gap-2 w-60 cursor-pointer group ${
            uuid === id ? "text-lime-500" : ""
          }`}
        >
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isCurrentlyPlaying) {
                  audioPlayer.pause();
                } else {
                  handleSongSelect();
                  audioPlayer.play();
                }
              }}
              className="flex items-center justify-center bg-white/25 group-hover:visible invisible absolute w-full h-full rounded-lg"
            >
              {isCurrentlyPlaying ? <Pause size={40} /> : <Play size={40} />}
            </button>
            <Image
              className="w-full object-cover aspect-square rounded-lg"
              draggable={false}
              width={500}
              height={500}
              src={bannerSrc}
              priority
              alt="Album cover"
            />
          </div>

          <div>
            <p
              title={title}
              className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {title}
            </p>
            <p
              title={artist}
              className="text-sm font-thin opacity-75 text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {artist}
            </p>
          </div>
        </div>

        <DeleteDialog
          isOpen={isDialogOpen}
          onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
          title={"Deletar música"}
          description={`tem certeza que quer deletar ${title}?`}
          onDelete={() => deleteSong({ songId: id })}
        />
        
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleLike}>
          {isLiked ? "Descurtir :(" : "Curtir <3"}
        </ContextMenuItem>
        {currentUser?.id === userUUID && (
          <ContextMenuItem onClick={() => setIsDialogOpen(true)}>
            Deletar música
          </ContextMenuItem>
        )}
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <div className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4" />
              <span>Adicionar à playlist</span>
            </div>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="max-h-60 overflow-y-auto">
            {userPlaylists && userPlaylists.length > 0 ? (
              userPlaylists.map((playlist) => (
                <ContextMenuItem
                  key={playlist.id}
                  onClick={() => handleAddToPlaylist(playlist.id)}
                >
                  {playlist.title}
                </ContextMenuItem>
              ))
            ) : (
              <ContextMenuItem disabled>
                Nenhuma playlist encontrada
              </ContextMenuItem>
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};
