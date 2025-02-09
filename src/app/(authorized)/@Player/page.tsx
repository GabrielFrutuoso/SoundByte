"use client";

import { CurrentSong } from "@/components/CurrentSong";
import { SoundControls } from "@/components/SoundControls";
import { VolumeControl } from "@/components/VolumeControl";
import { useGetPlaylistById } from "@/hooks/requests/playlist/useGetPlaylistById";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { usePlaylistStore } from "@/store/playlistStore";
import { useState, useEffect } from 'react';

export default function Player() {
  const { playlistId, singleSong } = usePlaylistStore();
  const { data: playlist } = useGetPlaylistById(playlistId as string);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState<any | null>(null);

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
    if (singleSong) {
      setCurrentSong(singleSong);
    } else if (playlist) {
      setCurrentSong(playlist.songs[0]?.song);
    }
  }, [singleSong, playlist]);

  const handleNext = () => {
    if (playlist?.songs) {
      const nextIndex = (currentIndex + 1) % (playlist.songs.length);
      setCurrentIndex(nextIndex);
      setCurrentSong(playlist.songs[nextIndex]?.song);
    }
  };

  const handlePrevious = () => {
    if (playlist?.songs) {
      const prevIndex = (currentIndex - 1 + playlist.songs.length) % playlist.songs.length;
      setCurrentIndex(prevIndex);
      setCurrentSong(playlist.songs[prevIndex]?.song);
    }
  };

  useEffect(() => {
    handleSongChange(currentSong?.songURL);
  }, [currentSong]);

  useEffect(() => {
    handleSongChange(playlist?.songs[currentIndex]?.song.songURL);
  }, [playlist, currentIndex]);

  return (
    <div className="h-24 border-t border-zinc-800 flex items-center justify-around">
      <CurrentSong
        key={currentSong?.id}
        songName={currentSong?.title || ""}
        artist={currentSong?.artist || ""}
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
        disabled={!!currentSong?.songURL}
      />
      <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
      <audio ref={audioRef} src={currentSong?.songURL || undefined} />
    </div>
  );
}
