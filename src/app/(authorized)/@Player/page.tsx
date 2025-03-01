"use client";

import { useEffect, useRef, useState } from "react";
import { usePlaylistStore } from "@/store/playlistStore";
import { useGetToListen } from "@/hooks/requests/listen/useGetToListen";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { RangeInput } from "@/components/ui/RangeInput";
import { Progress } from "@/components/ui/progress";
import { SoundControls, RepeatMode } from "@/components/SoundControls";
import { usePlaylistNavigation } from "@/components/SoundControls/usePlaylistNavigation";
import { useRepeatMode } from "@/components/SoundControls/useRepeatMode";
import { CurrentSong } from "@/components/CurrentSong";

export default function Player() {
  const {
    uuid,
    index,
    setMaxIndex,
    volume,
    setVolume,
  } = usePlaylistStore();
  const { data } = useGetToListen(uuid);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioPlayerRef = useRef<AudioPlayer>(null);
  
  const { repeatMode, cycleRepeatMode } = useRepeatMode();
  
  useEffect(() => {
    if (data?.songs) {
      setMaxIndex(data.songs.length);
    }
  }, [data?.songs, setMaxIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && audioPlayerRef.current) {
      interval = setInterval(() => {
        const audio = audioPlayerRef.current?.audio?.current;
        if (audio) {
          setCurrentTime(audio.currentTime);
          if (!duration && audio.duration) setDuration(audio.duration);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);
  
  const currentSong = data?.songs?.[index];

  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (audioPlayerRef.current) {
        const audio = audioPlayerRef.current?.audio?.current;
        if (audio) setDuration(audio.duration);
      }
    };

    if (audioPlayerRef.current?.audio?.current) {
      const audio = audioPlayerRef.current.audio.current;
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () =>
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }
  }, [currentSong]);

  const {
    handleClickNext,
    handleClickPrevious,
    handleEnd: handleEndNavigation,
    toggleShuffle,
    shuffle
  } = usePlaylistNavigation(data, repeatMode);

  const handleEnd = () => {
    if (repeatMode === RepeatMode.SINGLE) {
      if (audioPlayerRef.current?.audio?.current) {
        audioPlayerRef.current.audio.current.currentTime = 0;
        audioPlayerRef.current.audio.current.play();
        return;
      }
    }

    handleEndNavigation(setIsPlaying);
  };

  const togglePlayPause = () => {
    if (audioPlayerRef.current) {
      const audio = audioPlayerRef.current?.audio?.current;
      if (audio?.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio?.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioPlayerRef.current && duration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const progressBarWidth = rect.width;
      const percentage = offsetX / progressBarWidth;
      const newTime = percentage * duration;

      if (audioPlayerRef.current.audio.current) {
        audioPlayerRef.current.audio.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (newVolume >= 0 && newVolume <= 1) {
      setVolume(newVolume);
      if (audioPlayerRef.current?.audio?.current) {
        audioPlayerRef.current.audio.current.volume = newVolume;
      }
    }
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const safeVolume = volume !== undefined ? volume : 0.5;

  return (
    <div className="h-24 relative border-t border-zinc-800 flex items-center justify-around">
      <div
        className="w-full absolute top-0 cursor-pointer"
        onClick={handleProgressClick}
      >
        <Progress value={progressPercentage} className="w-full p-0 h-1" />
      </div>
      <CurrentSong
        artist={currentSong?.artist || ""}
        songName={currentSong?.title || ""}
        cover={currentSong?.bannerSrc || ""}
        songId={currentSong?.id}
      />

      <SoundControls
        isPlaying={isPlaying}
        repeatMode={repeatMode}
        shuffle={shuffle}
        onPlayPause={togglePlayPause}
        onNext={handleClickNext}
        onPrevious={handleClickPrevious}
        onRepeatClick={cycleRepeatMode}
        onShuffleClick={toggleShuffle}
      />

      <div>
        <RangeInput
          min={0}
          max={1}
          step={0.01}
          value={safeVolume}
          onChange={handleVolumeChange}
        />
      </div>

      <div className="hidden">
        <AudioPlayer
          ref={audioPlayerRef}
          src={currentSong?.songURL}
          showSkipControls={true}
          showJumpControls={false}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrevious}
          onEnded={handleEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          volume={safeVolume}
          autoPlayAfterSrcChange={true}
          loop={false} 
        />
      </div>
    </div>
  );
}
