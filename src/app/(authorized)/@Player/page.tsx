"use client";

import { useEffect, useRef, useState } from "react";
import { useGetToListen } from "@/hooks/requests/listen/useGetToListen";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Progress } from "@/components/ui/progress";
import { SoundControls, RepeatMode } from "@/components/SoundControls";
import { usePlaylistNavigation } from "@/components/SoundControls/usePlaylistNavigation";
import { useRepeatMode } from "@/components/SoundControls/useRepeatMode";
import { CurrentSong } from "@/components/CurrentSong";
import { VolumeControl } from "@/components/VolumeControl";
import { usePlayerStore } from "@/store/playlistStore";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function Player() {
  const { uuid, index, setMaxIndex, volume, setVolume, isMuted } =
    usePlayerStore();
  const { data } = useGetToListen(uuid);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioPlayerRef = useRef<AudioPlayer>(null);
  const audioPlayer = useAudioPlayer();

  const { repeatMode, cycleRepeatMode } = useRepeatMode();

  useEffect(() => {
    if (audioPlayerRef.current?.audio?.current) {
      audioPlayerRef.current.audio.current.muted = isMuted;
    }
  }, [isMuted]);

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
  const hasSongSource = !!currentSong?.songURL;

  useEffect(() => {
    if (!hasSongSource && isPlaying) {
      setIsPlaying(false);
      if (audioPlayerRef.current?.audio?.current) {
        audioPlayerRef.current.audio.current.pause();
      }
    }
  }, [hasSongSource, isPlaying]);

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
    shuffle,
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
    if (!hasSongSource) return;

    if (audioPlayerRef.current) {
      const audio = audioPlayerRef.current?.audio?.current;
      if (audio?.paused) {
        audio.play();
        setIsPlaying(true);
        audioPlayer.play();
      } else {
        audio?.pause();
        setIsPlaying(false);
        audioPlayer.pause();
      }
    }
  };

  // When the song changes, update the audio player
  useEffect(() => {
    // Reset state when song changes
    setCurrentTime(0);
    setDuration(0);

    // If there's a valid song source and isPlaying is true, play the song
    if (hasSongSource && audioPlayer.isPlaying) {
      if (audioPlayerRef.current?.audio?.current) {
        audioPlayerRef.current.audio.current.play().catch((err) => {
          console.error("Error playing audio:", err);
          setIsPlaying(false);
          audioPlayer.pause();
        });
      }
    }
  }, [uuid, index, hasSongSource]);

  // Sync local state with audioPlayer state - avoiding circular updates
  useEffect(() => {
    // This effect syncs the audioPlayer hook state with the local playing state
    // BUT only runs when the audioPlayer.isPlaying changes
    const syncWithAudioPlayer = () => {
      if (audioPlayer.isPlaying && !isPlaying && hasSongSource) {
        if (audioPlayerRef.current?.audio?.current) {
          audioPlayerRef.current.audio.current.play().catch(() => {
            // If play fails, update both states to avoid inconsistency
            setIsPlaying(false);
          });
          setIsPlaying(true);
        }
      } else if (!audioPlayer.isPlaying && isPlaying) {
        if (audioPlayerRef.current?.audio?.current) {
          audioPlayerRef.current.audio.current.pause();
          setIsPlaying(false);
        }
      }
    };

    syncWithAudioPlayer();
  }, [audioPlayer.isPlaying, hasSongSource]);

  useEffect(() => {
    const prevAudioPlayerIsPlaying = audioPlayer.isPlaying;

    if (isPlaying !== prevAudioPlayerIsPlaying) {
      if (isPlaying) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  }, [isPlaying]);

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
    <div
      className={`h-24 relative border-t border-zinc-800 flex items-center justify-around ${
        !hasSongSource ? "opacity-70" : ""
      }`}
    >
      <div
        className={`w-full absolute top-0 ${
          hasSongSource ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        onClick={hasSongSource ? handleProgressClick : undefined}
      >
        <Progress value={progressPercentage} className="w-full p-0 h-1" />
      </div>
      <CurrentSong
        artist={currentSong?.artist || ""}
        songName={currentSong?.title || "No song selected"}
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
        disabled={!hasSongSource}
      />

      <VolumeControl
        volume={safeVolume}
        onVolumeChange={handleVolumeChange}
        disabled={!hasSongSource}
      />

      <div className="hidden">
        <AudioPlayer
          ref={audioPlayerRef}
          src={hasSongSource ? currentSong?.songURL : undefined}
          showSkipControls={true}
          showJumpControls={false}
          onClickNext={hasSongSource ? handleClickNext : undefined}
          onClickPrevious={hasSongSource ? handleClickPrevious : undefined}
          onEnded={hasSongSource ? handleEnd : undefined}
          onPlay={() => hasSongSource && setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          volume={safeVolume}
          autoPlayAfterSrcChange={hasSongSource}
          loop={false}
          muted={isMuted}
        />
      </div>
    </div>
  );
}
