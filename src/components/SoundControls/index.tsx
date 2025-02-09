import React from "react";
import { RangeInput } from "../ui/RangeInput";
import { Play, Pause, SkipBack, SkipForward, Loader2 } from "lucide-react";

interface SoundControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
  onSeek: (value: number) => void;
  isLoading?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const SoundControls: React.FC<SoundControlsProps> = ({
  isPlaying,
  onPlayPause,
  currentTime,
  duration,
  onSeek,
  isLoading = false,
  onNext,
  onPrevious,
}) => {
  // Format time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate seek value as a percentage
  const seekValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const seekTime = (value / 100) * duration;
    onSeek(seekTime);
  };

  return (
    <div className="flex flex-col items-center w-96 gap-2">
      <div className="w-2/4 flex items-center justify-around">
        <button
          onClick={onPrevious}
          title="previous"
          className="p-1 rounded-md hover:bg-primary/25 disabled:opacity-50"
          disabled={isLoading}
        >
          <SkipBack />
        </button>
        <button
          title={isPlaying ? "pause" : "play"}
          onClick={onPlayPause}
          className="p-2 rounded-md hover:bg-primary/25 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={onNext}
          title="next"
          className="p-1 rounded-md hover:bg-primary/25 disabled:opacity-50"
          disabled={isLoading}
        >
          <SkipForward />
        </button>
      </div>
      <div className="w-full flex items-center justify-between space-x-4">
        <span className="w-10 text-sm text-right">
          {formatTime(currentTime)}
        </span>
        <RangeInput
          className="w-full"
          min={0}
          max={100}
          value={seekValue}
          onChange={handleSeekChange}
          disabled={isLoading || duration === 0}
        />
        <span className="w-10 text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
};
