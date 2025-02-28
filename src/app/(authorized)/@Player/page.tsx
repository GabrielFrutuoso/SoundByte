"use client";

import { useState, useEffect } from "react";
import { usePlaylistStore } from "@/store/playlistStore";
import { useGetToListen } from "@/hooks/requests/listen/useGetToListen";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function Player() {
  // Get data from playlist store and listen hook
  const { uuid, index, nextSong, previousSong, setMaxIndex, setIndex } = usePlaylistStore();
  const { data } = useGetToListen(uuid);
  
  // Set maximum index when data is loaded
  useEffect(() => {
    if (data?.songs) {
      setMaxIndex(data.songs.length);
    }
  }, [data?.songs, setMaxIndex]);
  
  // Get current song
  const currentSong = data?.songs?.[index];

  // Handle click next
  const handleClickNext = () => {
    console.log("click next");
    // Check if we're at the last song
    if (index === data?.songs?.length - 1) {
      setIndex(0); // Loop back to the first song
    } else {
      nextSong();
    }
  };

  // Handle click previous
  const handleClickPrevious = () => {
    if (index === 0) {
      setIndex(data?.songs?.length - 1);
    } else {
      previousSong();
    }
  };

  // Handle end of song
  const handleEnd = () => {
    console.log("end");
    // Check if we're at the last song
    if (index === data?.songs?.length - 1) {
      setIndex(0); // Loop back to the first song
    } else {
      nextSong();
    }
  };

  console.log(currentSong);
  

  return (
    <div className="h-24 border-t border-zinc-800 flex items-center justify-around">
      {/* Display current song info if available */}
      {currentSong && (
        <div className="flex items-center text-white text-sm max-w-xs mr-4">
          <div className="w-12 h-12 mr-3">
            <img 
              src={currentSong.bannerSrc || "e"} 
              alt="Album Cover" 
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="truncate">
            <div className="font-medium truncate">{currentSong.title}</div>
            <div className="text-zinc-400 text-xs truncate">{currentSong.artist}</div>
          </div>
        </div>
      )}

      {/* Audio player */}
      <AudioPlayer
        volume={0.5}
        src={currentSong?.songURL}
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPrevious}
        onEnded={handleEnd}
        onError={() => console.log("play error")}
        onPlay={() => console.log("onPlay")}
        onPause={() => console.log("onPause")}
        autoPlayAfterSrcChange={true}
        className="sound-byte-player"
      />

      <style jsx global>{`
        .sound-byte-player.rhap_container {
          background-color: transparent;
          box-shadow: none;
          padding: 0;
          width: 70%;
        }
        .sound-byte-player .rhap_main-controls-button {
          color: white;
        }
        .sound-byte-player .rhap_progress-filled {
          background-color: #3b82f6; /* blue-500 */
        }
        .sound-byte-player .rhap_progress-indicator,
        .sound-byte-player .rhap_volume-indicator {
          background: white;
        }
        .sound-byte-player .rhap_progress-bar,
        .sound-byte-player .rhap_volume-bar {
          background-color: #3f3f46; /* zinc-700 */
        }
        .sound-byte-player .rhap_time {
          color: #a1a1aa; /* zinc-400 */
        }
      `}</style>
    </div>
  );
}
