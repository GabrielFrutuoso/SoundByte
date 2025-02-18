"use client";

import { CurrentSong } from "@/components/CurrentSong";
import { SoundControls } from "@/components/SoundControls";
import { VolumeControl } from "@/components/VolumeControl";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useGetToListen } from "@/hooks/requests/listen/useGetToListen";
import { usePlaylistStore } from "@/store/playlistStore";
import { useEffect } from "react";

export default function Player() {
  const { playlistId, singleSongId, index, increaseIndex, decreaseIndex } =
    usePlaylistStore();

  const validIndex = index !== undefined ? index : 0;
  const { data } = useGetToListen(singleSongId, playlistId, validIndex);

  const {
    isPlaying,
    play,
    pause,
    setSong,
    audio,
    duration,
    currentTime,
    volume,
    setVolume,
  } = useAudioPlayer();

  const onNext = () => {
    increaseIndex();
  };
  const onPrevious = () => {
    decreaseIndex();
  };

  useEffect(() => {
    if (data?.songURL) {
      setSong(data.songURL);
    }
  }, [data?.songURL, setSong]);

  useEffect(() => {
    if (data?.message) {
      pause();
    }
  }, [data?.message, pause]);

  return (
    <div className="h-24 border-t border-zinc-800 flex items-center justify-around">
      <CurrentSong
        key={data?.id}
        songName={data?.title || ""}
        artist={data?.artist || ""}
        cover={data?.bannerSrc || ""}
        songId={data?.id || ""}
      />
      <SoundControls
        isPlaying={isPlaying && data !== undefined}
        onPlayPause={() => (isPlaying ? pause() : play())}
        currentTime={currentTime}
        duration={duration}
        onSeek={(time) => {
          audio.currentTime = time;
        }}
        isLoading={false}
        onNext={onNext}
        onPrevious={onPrevious}
        disabled={!!data?.message}
      />
      <VolumeControl volume={volume} onVolumeChange={setVolume} />
      <audio src={data?.songURL || undefined} />
    </div>
  );
}
