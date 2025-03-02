import { Volume1, Volume2, VolumeX } from "lucide-react";
import { RangeInput } from "../ui/RangeInput";
import { usePlayerStore } from "@/store/playlistStore";
import { useState, useEffect } from "react";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  onVolumeChange,
  disabled = false,
}) => {
  const { isMuted, setMuted } = usePlayerStore();
  const [prevVolume, setPrevVolume] = useState(volume > 0 ? volume : 0.5);


  useEffect(() => {
    if (!isMuted && volume > 0) {
      setPrevVolume(volume);
    }
  }, [volume, isMuted]);


  const toggleMute = () => {
    if (disabled) return;
    setMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const newVolume = parseFloat(e.target.value);
    
    if (newVolume > 0 && isMuted) {
      setMuted(false);
    }
    
    if (newVolume === 0 && !isMuted) {
      setMuted(true);
    }
    
    onVolumeChange(e);
  };

  const getVolumeIcon = () => {
    if (isMuted) {
      return <VolumeX onClick={toggleMute} className={`shrink-0 ${disabled ? 'text-gray-500' : 'cursor-pointer'}`} />;
    } else if (volume === 0) {
      return <VolumeX onClick={toggleMute} className={`shrink-0 ${disabled ? 'text-gray-500' : 'cursor-pointer'}`} />;
    } else if (volume <= 0.3) {
      return <Volume1 onClick={toggleMute} className={`shrink-0 ${disabled ? 'text-gray-500' : 'cursor-pointer'}`} />;
    } else {
      return <Volume2 onClick={toggleMute} className={`shrink-0 ${disabled ? 'text-gray-500' : 'cursor-pointer'}`} />;
    }
  };

  return (
    <div className={`w-56 flex items-center gap-2 ${disabled ? 'opacity-50' : ''}`}>
      {getVolumeIcon()}
      <RangeInput
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        min={0}
        max={1}
        step={0.1}
        className={`${isMuted ? "opacity-50" : ""} ${disabled ? "cursor-not-allowed" : ""}`}
        disabled={disabled}
      />
    </div>
  );
};
