import { useState } from 'react';
import { RepeatMode } from './index';

export const useRepeatMode = () => {
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(RepeatMode.NONE);

  const cycleRepeatMode = () => {
    switch (repeatMode) {
      case RepeatMode.NONE:
        setRepeatMode(RepeatMode.SINGLE);
        break;
      case RepeatMode.SINGLE:
        setRepeatMode(RepeatMode.PLAYLIST);
        break;
      case RepeatMode.PLAYLIST:
        setRepeatMode(RepeatMode.NONE);
        break;
    }
  };

  return { repeatMode, cycleRepeatMode };
};
