"use client";

import { CurrentSong } from "@/components/CurrentSong";
import { SoundControls } from "@/components/SoundControls";
import { VolumeControl } from "@/components/VolumeControl";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useGetToListen } from "@/hooks/requests/listen/useGetToListen";
import { usePlaylistStore } from "@/store/playlistStore";
import { useEffect } from "react";

export default function Player() {
  const { uuid, index, nextSong, previousSong, setMaxIndex } =
    usePlaylistStore();
  const { data } = useGetToListen(uuid);
  const {
    isPlaying,
    play,
    pause,
    setSong,
    currentTime,
    duration,
    volume,
    setVolume,
    setCurrentTime,
  } = useAudioPlayer();

  const currentSong = data?.songs?.[index];

  useEffect(() => {
    if (data?.songs) {
      setMaxIndex(data.songs.length);
      if (!data.songs.length) {
        pause();
      }
    }
  }, [data?.songs, setMaxIndex, pause]);

  useEffect(() => {
    if (currentSong?.songURL) {
      setSong(currentSong.songURL);
      if (isPlaying) play();
    } else {
      pause();
    }
  }, [currentSong?.songURL, setSong, play, isPlaying, pause]);

  return (
    <div className="h-24 border-t border-zinc-800 flex items-center justify-around">
      <CurrentSong
        key={currentSong?.id}
        songName={currentSong?.title || ""}
        artist={currentSong?.artist || ""}
        cover={currentSong?.bannerSrc || ""}
        songId={currentSong?.id || ""}
      />
      <SoundControls
        isPlaying={isPlaying && currentSong !== undefined}
        onPlayPause={() => (isPlaying ? pause() : play())}
        currentTime={currentTime}
        duration={duration}
        onSeek={setCurrentTime}
        isLoading={false}
        onNext={nextSong}
        onPrevious={previousSong}
        disabled={!currentSong?.songURL}
      />
      <VolumeControl volume={volume} onVolumeChange={setVolume} />
    </div>
  );
}
