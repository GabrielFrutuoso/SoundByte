import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { RangeInput } from "../RangeInput";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  onVolumeChange,
}) => {
  const getVolumeIcon = (volume: number) => {
    if (volume === 0) {
      return <VolumeX className="shrink-0" />;
    }
    if (volume <= 0.3) {
      return <Volume className="shrink-0" />;
    }
    if (volume <= 0.7) {
      return <Volume1 className="shrink-0" />;
    }
    return <Volume2 className="shrink-0" />;
  };

  return (
    <div className="w-56 mt-8 flex items-center gap-2">
      {getVolumeIcon(volume)}
      <RangeInput
        value={volume}
        onChange={onVolumeChange}
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  );
};
