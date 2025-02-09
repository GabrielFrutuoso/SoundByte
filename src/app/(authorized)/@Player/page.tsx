"use client";

import { CurrentSong } from "@/components/CurrentSong";
import { SoundControls } from "@/components/SoundControls";
import { VolumeControl } from "@/components/VolumeControl";
import { useGetPlaylistById } from "@/hooks/requests/playlist/useGetPlaylistById";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { usePlaylistStore } from "@/store/playlistStore";
import { useEffect, useState } from "react";

export default function Player() {
  const { playlistId } = usePlaylistStore();
  const { data: playlist } = useGetPlaylistById(playlistId as string);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    handleSongChange,
  } = useAudioPlayer();

  useEffect(() => {
    if (playlist?.songs?.[currentIndex]?.song?.songURL) {
      handleSongChange(playlist.songs[currentIndex].song.songURL);
    }
  }, [playlist, currentIndex]);

  const handleNext = () => {
    if (!playlist?.songs) return;
    const nextIndex = (currentIndex + 1) % playlist.songs.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    if (!playlist?.songs) return;
    const prevIndex =
      (currentIndex - 1 + playlist.songs.length) % playlist.songs.length;
    setCurrentIndex(prevIndex);
  };

  const currentSong = playlist?.songs?.[currentIndex]?.song;

  return (
    <div className="h-24 border-t border-zinc-800 flex items-center justify-around">
      <CurrentSong
        key={currentIndex}
        artist={currentSong?.artist || ""}
        songName={currentSong?.title || ""}
        cover={currentSong?.bannerSrc || undefined}
      />
      <SoundControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        isLoading={isLoading}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
      <audio ref={audioRef} src={currentSong?.songURL || undefined} />
    </div>
  );
}
