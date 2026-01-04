"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/constants";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface LightboxProps {
  photos: readonly Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentPhoto = photos[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onNavigate("prev");
          break;
        case "ArrowRight":
          onNavigate("next");
          break;
        case " ":
          e.preventDefault();
          setIsSlideshow((prev) => !prev);
          break;
      }
    },
    [onClose, onNavigate],
  );

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        onNavigate("next");
      } else {
        onNavigate("prev");
      }
    }

    setTouchStart(null);
  };

  // Slideshow auto-advance
  useEffect(() => {
    if (!isSlideshow) return;

    const interval = setInterval(() => {
      onNavigate("next");
    }, 5000);

    return () => clearInterval(interval);
  }, [isSlideshow, onNavigate]);

  // Set up keyboard listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  // Handle zoom on desktop
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
      setIsZoomed(!isZoomed);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery lightbox"
    >
      {/* ARIA live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Photo {currentIndex + 1} of {photos.length}: {currentPhoto.caption}
      </div>

      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all text-white hover:scale-110"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation Controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("prev");
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all text-white hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
        aria-label="Previous photo"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("next");
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all text-white hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
        aria-label="Next photo"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slideshow Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsSlideshow(!isSlideshow);
        }}
        className="absolute bottom-24 sm:bottom-32 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all text-white hover:scale-110"
        aria-label={isSlideshow ? "Pause slideshow" : "Start slideshow"}
      >
        {isSlideshow ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Main Content Container */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center px-4 pb-24 sm:pb-32 pt-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image Container */}
        <div
          className="relative w-full max-w-6xl h-[60vh] sm:h-[70vh] cursor-zoom-in"
          onClick={handleImageClick}
          style={{
            cursor: isZoomed ? "zoom-out" : "zoom-in",
          }}
        >
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            sizes="100vw"
            className={`object-contain transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : undefined
            }
            priority
          />
        </div>

        {/* Photo Information */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 sm:p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-2xl sm:text-3xl">
                {currentPhoto.caption}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  currentPhoto.category === "dating"
                    ? "bg-pink-500/80"
                    : currentPhoto.category === "engagement"
                      ? "bg-purple-500/80"
                      : "bg-primary/80"
                }`}
              >
                {currentPhoto.category.charAt(0).toUpperCase() +
                  currentPhoto.category.slice(1)}
              </span>
            </div>

            {/* <p className="text-white/90 text-base sm:text-lg mb-2"> */}
            {/*   {currentPhoto.story} */}
            {/* </p> */}

            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <span>{currentPhoto.location}</span>
              <span>•</span>
              <span>
                {new Date(currentPhoto.date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>•</span>
              <span>
                {currentIndex + 1} / {photos.length}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation hint for mobile */}
        <div className="absolute bottom-32 sm:bottom-40 left-1/2 -translate-x-1/2 text-white/50 text-xs sm:text-sm text-center md:hidden animate-pulse">
          Swipe left or right to navigate
        </div>

        {/* Keyboard shortcuts hint for desktop */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-white/30 text-xs text-center hidden md:block">
          Use arrow keys to navigate • Space to toggle slideshow • ESC to close
        </div>
      </div>
    </div>
  );
}
