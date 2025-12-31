import { PreviousIcon, NextIcon } from "./Icons";

interface PlayerControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function PlayerControls({ onPrev, onNext }: PlayerControlsProps) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        onClick={onPrev}
        className="text-primary hover:text-primary/80 transition-colors"
        aria-label="Previous track"
      >
        <PreviousIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={onNext}
        className="text-primary hover:text-primary/80 transition-colors"
        aria-label="Next track"
      >
        <NextIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
