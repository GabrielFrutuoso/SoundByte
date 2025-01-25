import React from "react";
import { RangeInput } from "../RangeInput";
import { Play, SkipBack, SkipForward } from "lucide-react";

export const SoundControls = () => {
  return (
    <div className="flex flex-col items-center w-96">
      <div className="w-2/4 flex items-center justify-around">
        <button title="previous" className="p-1 rounded-md hover:bg-primary/25">
          <SkipBack />
        </button>
        <button title="play/pause" className="p-1 rounded-md hover:bg-primary/25">
          <Play />
        </button>
        <button title="next" className="p-1 rounded-md hover:bg-primary/25">
          <SkipForward />
        </button>
      </div>
      <div className="w-full flex items-center justify-between space-x-4">
        <span>{"1:45"}</span>
        <RangeInput className="w-full" min={0} max={100} defaultValue={50} />
        <span>{"3:45"}</span>
      </div>
    </div>
  );
};
