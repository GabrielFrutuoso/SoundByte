import { Heart, Pause, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "@/store/playlistStore";
import { SearchResultType } from "@/app/types/SearchResult.type";
import { useUserStore } from "@/store/userStore";
import { useLikePlaylist } from "@/hooks/requests/playlist/useLikePlaylist";
import { useDisikePlaylist } from "@/hooks/requests/playlist/useDislikePlaylist";
import { useGetLikedPlaylists } from "@/hooks/requests/likedPlaylist/useGetLikedPlaylists";
import { useLikeSongs } from "@/hooks/requests/song/useLikeSong";
import { useDisikeSongs } from "@/hooks/requests/song/useDislikeSong";
import { useGetLikedSongs } from "@/hooks/requests/likedSong/useGetLikedSongs";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

interface LikedSong {
  song: {
    id: string;
  };
}

export const SearchResultItem = ({
  result,
  type,
}: {
  result: SearchResultType;
  type: string;
}) => {
  const { setUuid, uuid } = usePlaylistStore();
  const { play, pause, isPlaying } = useAudioPlayer();
  const { mutate: likePlaylist } = useLikePlaylist();
  const { mutate: disLikePlaylist } = useDisikePlaylist();
  const { mutate: likeSong } = useLikeSongs();
  const { mutate: disLikeSong } = useDisikeSongs();
  const { user } = useUserStore();
  const [isLikedPlaylist, setIsLikedPlaylist] = useState(false);
  const [isLikedSong, setIsLikedSong] = useState(false);
  const { data: likedPlaylists } = useGetLikedPlaylists(user?.id || "");
  const { data: likedSongs } = useGetLikedSongs(user?.id || "");

  useEffect(() => {
    if (type === "playlist") {
      const liked = likedPlaylists?.find(
        (likedPlaylist) => likedPlaylist.playlist.id === result.id
      );
      setIsLikedPlaylist(!!liked);
    } else if (type === "song") {
      const liked = likedSongs?.find(
        (likedSong: LikedSong) => likedSong.song.id === result.id
      );
      setIsLikedSong(!!liked);
    }
  }, [likedPlaylists, likedSongs, result.id, type]);

  const handleSongSelect = (id: string | number) => {
    setUuid(String(id));
  };

  const handleLike = (e: React.MouseEvent, type: string) => {
    e.stopPropagation();
    if (!user?.id) return;

    if (type === "playlist") {
      if (isLikedPlaylist) {
        disLikePlaylist({
          userId: user.id,
          playlistId: result.id,
        });
      } else {
        likePlaylist({
          userId: user.id,
          playlistId: result.id,
        });
      }
    } else if (type === "song") {
      if (isLikedSong) {
        disLikeSong({
          songId: result.id,
          userId: user.id,
        });
      } else {
        likeSong({
          songId: result.id,
          userId: user.id,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full cursor-pointer group">
      <div className="relative w-full aspect-square">
        <div className="flex items-center justify-center bg-white/15 group-hover:visible invisible absolute w-full h-full rounded-lg z-10">
          <button
            className={"flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 p-1 rounded-lg absolute right-2 bottom-2 bg-transparent [&_svg]:size-10 text-secondary-foreground"}
            onClick={() => {
              if (isPlaying && uuid === result.id) {
                pause();
              } else {
                handleSongSelect(result.id);
                play();
              }
            }}
          >
            {isPlaying && uuid === result.id ? <Pause /> : <Play />}
          </button>
          <button
            className={`flex justify-center items-center w-16 h-16 sm:w-10 sm:h-10 p-1 rounded-lg bg-transparent [&_svg]:size-20 ${
              isLikedPlaylist || isLikedSong
                ? "text-lime-500"
                : "text-secondary-foreground"
            }`}
            onClick={(e) => handleLike(e, type)}
          >
            <Heart
              fill={isLikedPlaylist || isLikedSong ? "currentColor" : "none"}
            />
          </button>
        </div>
        <Image
          className="object-cover aspect-square rounded-lg"
          draggable={false}
          src={result?.bannerSrc}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority
          alt="Album cover"
        />
      </div>

      <div className={`w-full ${uuid === result.id ? "text-lime-500" : ""}`}>
        <p
          title={result?.title}
          className="text-base sm:text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {result?.title}
        </p>
        <p className="text-xs sm:text-sm font-thin opacity-75 text-ellipsis overflow-hidden whitespace-nowrap">
          {result?.artist}
        </p>
      </div>
    </div>
  );
};
