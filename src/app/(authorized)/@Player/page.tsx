"use client";

import { CurrentSong } from "@/components/CorrentSong";
import { SoundControls } from "@/components/SoundControls";
import React from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { VolumeControl } from "@/components/VolumeControl";

export default function Player() {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    audioRef,
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
  } = useAudioPlayer();

  return (
    <div className="h-24 border-t border-zinc-800 flex items-center justify-around">
      <CurrentSong
        key="1"
        artist="Bring Me The Horizon"
        songName="Kool-Aid"
        cover="https://imgs.search.brave.com/F90OQSQxVjf8lA6ErVlKAuCJYrK8RJptKdfEjsmFqpE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvcHQvdGh1bWIv/Mi8yYy9Qb3N0X0h1/bWFuLV9OZXhfR2Vu/LnBuZy81MTJweC1Q/b3N0X0h1bWFuLV9O/ZXhfR2VuLnBuZw"
      />
      <SoundControls 
        isPlaying={isPlaying} 
        onPlayPause={handlePlayPause}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        isLoading={isLoading}
      />
      <VolumeControl
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
      <audio 
        ref={audioRef}
        src="./Bring Me The Horizon - Kool-Aid (Lyric Video).mp3"
      />
    </div>
  );
}
