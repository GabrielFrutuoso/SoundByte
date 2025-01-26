import { CurrentSong } from "@/components/CorrentSong";
import { RangeInput } from "@/components/RangeInput";
import { SoundControls } from "@/components/SoundControls";
import { Volume } from "lucide-react";
import React from "react";

export const Player = () => {
  return (
    <div className="h-24 border-t border-zinc-800 flex items-center justify-around">
      <CurrentSong
        key="1"
        artist="Bring Me The Horizon"
        songName="Kool-Aid"
        cover="https://imgs.search.brave.com/F90OQSQxVjf8lA6ErVlKAuCJYrK8RJptKdfEjsmFqpE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvcHQvdGh1bWIv/Mi8yYy9Qb3N0X0h1/bWFuLV9OZXhfR2Vu/LnBuZy81MTJweC1Q/b3N0X0h1bWFuLV9O/ZXhfR2VuLnBuZw"
      />
      <SoundControls />
      {/* <audio src=""></audio> */}
      <div className="w-56 mt-8 flex items-center gap-2">
        <Volume />
        <RangeInput />
      </div>
    </div>
  );
};
