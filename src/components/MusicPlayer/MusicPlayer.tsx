"use client";

import { useMusicPlayer } from "./useMusicPlayer";
import { PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import PlayerControls from "./PlayerControls";
import VolumeControl from "./VolumeControl";

export default function MusicPlayer() {
  const {
    audioRef,
    currentTrack,
    isPlaying,
    volume,
    isCollapsed,
    togglePlayPause,
    nextTrack,
    prevTrack,
    handleVolumeChange,
    toggleMute,
    toggleCollapse,
  } = useMusicPlayer();

  return (
    <>
      <div
        className={`fixed bottom-4 sm:bottom-8 right-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-primary/20 z-50 transition-all duration-300 ${
          isCollapsed ? "w-16 sm:w-20 p-2" : "p-2 sm:p-4 flex items-center gap-1"
        }`}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className={`min-w-[44px] sm:min-w-[56px] w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-2xl shadow-lg hover:scale-105 transition-transform ${
            isPlaying ? "animate-[pulse_2s_ease-in-out_infinite]" : ""
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <PauseIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          ) : (
            <PlayIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          )}
        </button>

        {!isCollapsed && (
          <>
            {/* Song Info */}
            <div className="flex-1 min-w-[100px] sm:min-w-[150px] max-w-[150px] sm:max-w-[200px]">
              <div className="font-serif font-semibold text-primary text-xs sm:text-sm line-clamp-1">
                {currentTrack.title}
              </div>
              <div className="text-muted-foreground text-[10px] sm:text-xs line-clamp-1">
                {currentTrack.artist}
              </div>
            </div>

            {/* Controls */}
            <PlayerControls onPrev={prevTrack} onNext={nextTrack} />

            {/* Volume Control */}
            <VolumeControl
              volume={volume}
              onVolumeChange={handleVolumeChange}
              onToggleMute={toggleMute}
            />
          </>
        )}

        {/* Expand/Collapse Toggle */}
        <button
          onClick={toggleCollapse}
          className="text-primary hover:scale-110 transition-transform ml-auto"
          aria-label={isCollapsed ? "Expand player" : "Collapse player"}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.file}
        onEnded={nextTrack}
        preload="metadata"
      />
    </>
  );
}
