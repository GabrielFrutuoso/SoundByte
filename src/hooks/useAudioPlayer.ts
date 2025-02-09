import { useState, useRef, useEffect } from "react";

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.volume = volume;

    const handleLoadStart = () => {
      setIsLoading(true);
      setTimeout(() => {
        if (audioElement.readyState === 0) {
          setIsLoading(false);
          console.error("Audio failed to load within timeout");
        }
      }, 5000);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setDuration(audioElement.duration);
    };

    const handleLoadedData = () => {
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
      console.error("Audio Error:", e);
      setIsLoading(false);
    };

    audioElement.addEventListener("loadstart", handleLoadStart);
    audioElement.addEventListener("canplay", handleCanPlay);
    audioElement.addEventListener("loadeddata", handleLoadedData);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("ended", handleEnded);
    audioElement.addEventListener("error", handleError);

    if (audioElement.readyState >= 2) {
      setIsLoading(false);
      setDuration(audioElement.duration);
    }

    return () => {
      audioElement.removeEventListener("loadstart", handleLoadStart);
      audioElement.removeEventListener("canplay", handleCanPlay);
      audioElement.removeEventListener("loadeddata", handleLoadedData);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("ended", handleEnded);
      audioElement.removeEventListener("error", handleError);
    };
  }, [volume]);

  const handlePlayPause = () => {
    if (!audioRef.current || isLoading) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Play Error:", error);
        setIsLoading(false);
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

  const handleSongChange = (src?: string) => {
    if (!audioRef.current || !src) return;
    
    setIsLoading(true);
    setIsPlaying(false);
    setCurrentTime(0);
    
    audioRef.current.src = src;
    audioRef.current.load();
    
    // Auto-play when ready
    const playWhenReady = () => {
      audioRef.current?.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('Auto-play Error:', error);
          setIsPlaying(false);
        });
      audioRef.current?.removeEventListener('canplay', playWhenReady);
    };
    
    audioRef.current.addEventListener('canplay', playWhenReady);
  };

  return {
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
  };
}
