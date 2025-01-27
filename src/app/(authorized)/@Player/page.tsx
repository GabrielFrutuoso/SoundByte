"use client";

import { CurrentSong } from "@/components/CorrentSong";
import { RangeInput } from "@/components/RangeInput";
import { SoundControls } from "@/components/SoundControls";
import { Volume } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleLoadStart = () => setIsLoading(true);
    
    const handleCanPlay = () => {
      setIsLoading(false);
      setDuration(audioElement.duration);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: ErrorEvent) => {
      console.error('Audio Error:', e);
      setIsLoading(false);
    };

    // Set initial volume
    audioElement.volume = volume;

    // Add event listeners
    audioElement.addEventListener('loadstart', handleLoadStart);
    audioElement.addEventListener('canplay', handleCanPlay);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('error', handleError);

    // Cleanup
    return () => {
      audioElement.removeEventListener('loadstart', handleLoadStart);
      audioElement.removeEventListener('canplay', handleCanPlay);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('error', handleError);
    };
  }, [volume]);

  const handlePlayPause = () => {
    if (!audioRef.current || isLoading) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Play Error:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number) => {
    if (!audioRef.current || isLoading) return;
    
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

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
      <div className="w-56 mt-8 flex items-center gap-2">
        <Volume className="shrink-0" />
        <RangeInput 
          value={volume} 
          onChange={handleVolumeChange} 
          min={0} 
          max={1} 
          step={0.1} 
        />
      </div>
      <audio 
        ref={audioRef}
        src="./Bring Me The Horizon - Kool-Aid (Lyric Video).mp3"
      />
    </div>
  );
}
