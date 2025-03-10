import { SongItemProps } from "@/app/types/SongProps.type";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/playlistStore";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useUserStore } from "@/store/userStore";
import { useDisikeSongs } from "@/hooks/requests/song/useDislikeSong";
import { useLikeSongs } from "@/hooks/requests/song/useLikeSong";
import { useGetLikedSongs } from "@/hooks/requests/likedSong/useGetLikedSongs";

interface LikedSong {
  song: {
    id: string;
  };
}

export const SongItem = ({ id, bannerSrc, title, artist }: SongItemProps) => {
  const { uuid, setUuid, setIndex } = usePlayerStore();
  const audioPlayer = useAudioPlayer();
  const isCurrentlyPlaying = audioPlayer.isPlaying && uuid === id;
  const { user: currentUser } = useUserStore();
  const [isLiked, setIsLiked] = useState(false);

  const { data: likedSongs } = useGetLikedSongs(currentUser?.id || "");
  const { mutate: likeSong } = useLikeSongs();
  const { mutate: dislikeSong } = useDisikeSongs();

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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleLike}>
          {isLiked ? "Descurtir :(" : "Curtir <3"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
