import { SongItemProps } from "@/app/types/SongProps.type";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import { usePlayerStore } from "@/store/playlistStore";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export const SongItem = ({ id, bannerSrc, title, artist }: SongItemProps) => {
  const { uuid, setUuid, setIndex } = usePlayerStore();
  const audioPlayer = useAudioPlayer();
  const isCurrentlyPlaying = audioPlayer.isPlaying && uuid === id;

  const handleSongSelect = () => {
    setUuid(id);
    setIndex(0);
  };

  return (
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
  );
};
