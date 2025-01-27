import { Volume } from "lucide-react";
import { RangeInput } from "../RangeInput";

interface VolumeControlProps {
    volume: number;
    onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

export const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => (
    <div className="w-56 mt-8 flex items-center gap-2">
      <Volume className="shrink-0" />
      <RangeInput 
        value={volume} 
        onChange={onVolumeChange} 
        min={0} 
        max={1} 
        step={0.1} 
      />
    </div>
  );