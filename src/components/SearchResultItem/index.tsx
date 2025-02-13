import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import { usePlaylistStore } from "@/store/playlistStore";
import { SearchResultType } from "@/app/types/SearchResult.type";

export const SearchResultItem = ({
  result,
  type,
}: {
  result: SearchResultType;
  type: string;
}) => {
  const { singleSongId, playlistId, setPlaylistId, setSingleSongId, setIndex } =
    usePlaylistStore();

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

  return (
    <div
      className={`flex flex-col gap-2 w-60 cursor-pointer group ${
        (singleSongId === result.id && type === "song") ||
        (playlistId === result.id && type === "playlist")
          ? "text-lime-500"
          : ""
      }`}
    >
      <div className="relative">
        <button
          onClick={() => handleSongSelect(result.id)}
          className="flex items-center justify-center bg-white/25 group-hover:visible invisible absolute w-full h-full rounded-lg"
        >
          <Play size={40} />
        </button>
        <Image
          className="w-full object-cover aspect-square rounded-lg"
          draggable={false}
          width={500}
          height={500}
          src={result?.bannerSrc}
          priority
          alt="Album cover"
        />
      </div>

      <div>
        <p
          title={result?.title}
          className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {result?.title}
        </p>
        <p className="text-sm font-thin opacity-75 text-ellipsis overflow-hidden whitespace-nowrap">
          {result?.artist}
        </p>
      </div>
    </div>
  );
};
