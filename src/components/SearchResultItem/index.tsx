import { Heart, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "@/store/playlistStore";
import { SearchResultType } from "@/app/types/SearchResult.type";
import { useUserStore } from "@/store/userStore";
import { useLikePlaylist } from "@/hooks/requests/playlist/useLikePlaylist";
import { useDisikePlaylist } from "@/hooks/requests/playlist/useDislikePlaylist";
import { useGetLikedPlaylists } from "@/hooks/requests/likedPlaylist/useGetLikedPlaylists";

export const SearchResultItem = ({
  result,
  type,
}: {
  result: SearchResultType;
  type: string;
}) => {
  const { singleSongId, playlistId, setPlaylistId, setSingleSongId, setIndex } =
    usePlaylistStore();
  const { mutate: likePlaylist } = useLikePlaylist();
  const { mutate: disLikePlaylist } = useDisikePlaylist();
  const { user } = useUserStore();

  const [isLiked, setIsLiked] = useState(false);
  const { data: likedPlaylists } = useGetLikedPlaylists(
    user?.id || ""
  );
  useEffect(() => {
    const liked = likedPlaylists?.find(
      (likedPlaylist) => likedPlaylist.playlist.id === result.id
    );
    setIsLiked(!!liked);
  }, [likedPlaylists, result.id]);
 console.log("liked", likedPlaylists?.find(
  (likedPlaylist) => likedPlaylist.playlist.id === result.id
))
  const handleSongSelect = (id: string | number) => {
    if (type === "song") {
      setPlaylistId("");
      setSingleSongId(String(id));
      setIndex(undefined);
    } else {
      setPlaylistId(String(id));
      setSingleSongId(undefined);
      setIndex(0);
    }
  };

  const handleLikePlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.id || type !== "playlist") return;

    if (isLiked) {
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
  };

  return (
    <div
      className={`flex flex-col gap-2 w-full cursor-pointer group ${
        (singleSongId === result.id && type === "song") ||
        (playlistId === result.id && type === "playlist")
          ? "text-lime-500"
          : ""
      }`}
    >
      <div className="relative w-full aspect-square">
        <div className="flex items-center justify-center bg-white/15 group-hover:visible invisible absolute w-full h-full rounded-lg z-10">
          <button
            className="flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 p-1 rounded-lg absolute right-2 bottom-2 bg-transparent [&_svg]:size-10 text-secondary-foreground"
            onClick={() => handleSongSelect(result.id)}
          >
            <Play />
          </button>
          {type === "playlist" && (
            <button
              className={`flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 p-1 rounded-lg bg-transparent [&_svg]:size-12 ${
                isLiked ? "text-lime-500" : "text-secondary-foreground"
              }`}
              onClick={handleLikePlaylist}
            >
              <Heart fill={isLiked ? "currentColor" : "none"} />
            </button>
          )}
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

      <div className="w-full">
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
