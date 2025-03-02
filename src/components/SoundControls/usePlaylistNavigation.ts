import { useState, useEffect } from "react";
import { RepeatMode } from "./index";
import { usePlayerStore } from "@/store/playlistStore";

interface Song {
  id: string;
  songURL: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface PlaylistData {
  songs?: Song[];
}

export const usePlaylistNavigation = (
  data: PlaylistData | undefined,
  repeatMode: RepeatMode
) => {
  const { 
    index, 
    setIndex, 
    nextSong, 
    previousSong, 
    shuffle, 
    setShuffle 
  } = usePlayerStore();
  
  const [playedSongs, setPlayedSongs] = useState<Set<number>>(new Set());

  useEffect(() => {
    setPlayedSongs(new Set(shuffle ? [index] : []));
  }, [shuffle, index]);

  const getNextShuffledIndex = () => {
    const totalSongs = data?.songs?.length || 0;

    if (playedSongs.size >= totalSongs && repeatMode === RepeatMode.NONE) {
      return -1;
    }

    if (playedSongs.size >= totalSongs && repeatMode === RepeatMode.PLAYLIST) {
      setPlayedSongs(new Set([index]));
    }

    let candidates = Array.from({ length: totalSongs }, (_, i) => i).filter(
      (i) => !playedSongs.has(i)
    );

    if (candidates.length === 0) {
      if (repeatMode === RepeatMode.PLAYLIST) {
        candidates = Array.from({ length: totalSongs }, (_, i) => i).filter(
          (i) => i !== index
        );
      } else {
        return -1;
      }
    }

    const randomIndex =
      candidates[Math.floor(Math.random() * candidates.length)];
    return randomIndex;
  };

  const handleClickNext = () => {
    if (shuffle) {
      const nextIndex = getNextShuffledIndex();
      if (nextIndex !== -1) {
        setPlayedSongs((prev) => new Set([...prev, nextIndex]));
        setIndex(nextIndex);
      }
    } else if (index === (data?.songs?.length || 0) - 1) {
      setIndex(0);
    } else {
      nextSong();
    }
  };

  const handleClickPrevious = () => {
    if (shuffle) {
      const randomIndex = Math.floor(
        Math.random() * (data?.songs?.length || 0)
      );
      setPlayedSongs((prev) => new Set([...prev, randomIndex]));
      setIndex(randomIndex);
    } else if (index === 0) {
      setIndex((data?.songs?.length || 0) - 1);
    } else {
      previousSong();
    }
  };

  const handleEnd = (setIsPlaying: (playing: boolean) => void) => {
    if (repeatMode === RepeatMode.SINGLE) {
      return true;
    }

    if (shuffle) {
      const nextIndex = getNextShuffledIndex();
      if (nextIndex === -1) {
        setIsPlaying(false);
      } else {
        setPlayedSongs((prev) => new Set([...prev, nextIndex]));
        setIndex(nextIndex);
      }
    } else if (index === (data?.songs?.length || 0) - 1) {
      if (repeatMode === RepeatMode.PLAYLIST) {
        setIndex(0);
      } else {
        setIsPlaying(false);
      }
    } else {
      nextSong();
    }
    
    return false; 
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
    setPlayedSongs(new Set());
  };

  return {
    handleClickNext,
    handleClickPrevious,
    handleEnd,
    toggleShuffle,
    playedSongs,
    shuffle
  };
};
