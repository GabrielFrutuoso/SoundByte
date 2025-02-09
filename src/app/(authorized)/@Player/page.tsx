"use client";

import { CurrentSong } from "@/components/CurrentSong";
import { SoundControls } from "@/components/SoundControls";
import { VolumeControl } from "@/components/VolumeControl";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useGetToListen } from "@/hooks/requests/listen/useGetToListen";
import { usePlaylistStore } from "@/store/playlistStore";

export default function Player() {
  const { playlistId, singleSongId, index, increaseIndex, decreaseIndex } = usePlaylistStore();
  console.log(`Fetching song with singleSongId: ${singleSongId}, playlistId: ${playlistId}, index: ${index}`);
  const validIndex = index !== undefined ? index : 0;
  const { data: currentSong } = useGetToListen(undefined, "8607565e-f68f-462c-9d77-7cd8a83cde31", validIndex);

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

  const onNext = () => {
    increaseIndex();
  };
  const onPrevious = () => {
    decreaseIndex();
  };

  return (
    <div className="h-24 border-t border-zinc-800 flex items-center justify-around">
      <CurrentSong
        key={currentSong?.id}
        songName={currentSong?.title || ""}
        artist={currentSong?.artist || ""}
        cover={currentSong?.bannerSrc || ''}
      />
      <SoundControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        isLoading={isLoading}
        onNext={onNext}
        onPrevious={onPrevious}
      />
      <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
      <audio ref={audioRef} src={currentSong?.songURL || undefined} />
    </div>
  );
}
