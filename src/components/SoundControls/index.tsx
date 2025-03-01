import React from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";
import { Button } from "../ui/button";

export enum RepeatMode {
  NONE = "NONE",
  SINGLE = "SINGLE",
  PLAYLIST = "PLAYLIST",
}

interface SoundControlsProps {
  isPlaying: boolean;
  repeatMode: RepeatMode;
  shuffle: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onRepeatClick: () => void;
  onShuffleClick: () => void;
}

export const SoundControls: React.FC<SoundControlsProps> = ({
  isPlaying,
  repeatMode,
  shuffle,
  onPlayPause,
  onNext,
  onPrevious,
  onRepeatClick,
  onShuffleClick,
}) => {
  const getRepeatButton = () => {
    switch (repeatMode) {
      case RepeatMode.NONE:
        return <Repeat />;
      case RepeatMode.SINGLE:
        return <Repeat className="text-lime-500" />;
      case RepeatMode.PLAYLIST:
        return <Repeat className="text-blue-500" />;
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        className="[&_svg]:size-4"
        variant={"ghost"}
        onClick={onRepeatClick}
        title={`Repeat Mode: ${repeatMode}`}
      >
        {getRepeatButton()}
      </Button>
      <Button
        className="[&_svg]:size-5"
        variant={"ghost"}
        onClick={onPrevious}
      >
        <SkipBack />
      </Button>
      <Button
        className="[&_svg]:size-5"
        variant={"ghost"}
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>
      <Button
        className="[&_svg]:size-5"
        variant={"ghost"}
        onClick={onNext}
      >
        <SkipForward />
      </Button>
      <Button
        className="[&_svg]:size-4"
        variant={"ghost"}
        onClick={onShuffleClick}
        title={shuffle ? "Disable Shuffle" : "Enable Shuffle"}
      >
        <Shuffle className={shuffle ? "text-lime-500" : ""} />
      </Button>
    </div>
  );
};
