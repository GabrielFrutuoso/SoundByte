"use client";

import { useEffect, useRef, useState } from "react";
import { usePlaylistStore } from "@/store/playlistStore";
import { useGetToListen } from "@/hooks/requests/listen/useGetToListen";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import { RangeInput } from "@/components/ui/RangeInput";
import { Button } from "@/components/ui/button";

export default function Player() {
  const {
    uuid,
    index,
    nextSong,
    previousSong,
    setMaxIndex,
    setIndex,
    volume,
    setVolume,
  } = usePlaylistStore();
  const { data } = useGetToListen(uuid);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioPlayerRef = useRef<AudioPlayer>(null);

  useEffect(() => {
    if (data?.songs) {
      setMaxIndex(data.songs.length);
    }
  }, [data?.songs, setMaxIndex]);

  useEffect(() => {
    let interval : NodeJS.Timeout;
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

  const handleClickNext = () => {
    console.log("click next");
    if (index === (data?.songs?.length || 0) - 1) {
      setIndex(0);
    } else {
      nextSong();
    }
  };

  const handleClickPrevious = () => {
    if (index === 0) {
      setIndex((data?.songs?.length || 0) - 1);
    } else {
      previousSong();
    }
  };

  const handleEnd = () => {
    console.log("end");
    if (index === (data?.songs?.length || 0) - 1) {
      setIndex(0);
    } else {
      nextSong();
    }
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

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioPlayerRef.current && duration) {
      const newTime = parseFloat(e.target.value) * duration;
      audioPlayerRef.current.audio.current.currentTime = newTime;
      setCurrentTime(newTime);
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

  const progress = duration ? currentTime / duration : 0;
  const safeVolume = volume !== undefined ? volume : 0.5;

  return (
    <div className="h-24 relative border-t border-zinc-800 flex items-center justify-around">
      <div className="w-full absolute -top-2">
        <RangeInput
          className="w-full p-0"
          min={0}
          max={1}
          step={0.001}
          value={progress}
          onChange={handleProgressChange}
        />
      </div>
      {currentSong && (
        <div className="flex items-center text-white text-sm max-w-xs mr-4">
          <div className="w-12 h-12 mr-3">
            <Image
              width={48}
              height={48}
              src={currentSong.bannerSrc || "e"}
              alt="Album Cover"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="truncate">
            <div className="font-medium truncate">{currentSong.title}</div>
            <div className="text-zinc-400 text-xs truncate">
              {currentSong.artist}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button variant={"ghost"} onClick={handleClickPrevious}>
          <SkipBack />
        </Button>
        <Button variant={"ghost"} onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button variant={"ghost"} onClick={handleClickNext}>
          <SkipForward />
        </Button>
      </div>

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
        />
      </div>
    </div>
  );
}
