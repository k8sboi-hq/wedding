"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileCarouselProps {
  photos: readonly Photo[];
  onPhotoClick: (index: number) => void;
}

export default function MobileCarousel({
  photos,
  onPhotoClick,
}: MobileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Photo carousel"
      aria-roledescription="carousel"
    >
      {/* ARIA live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Photo {currentIndex + 1} of {photos.length}: {currentPhoto.caption}
      </div>

      {/* Carousel Container - Full Width */}
      <div className="overflow-hidden shadow-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {photos.map((photo, index) => (
            <div
              key={`${photo.src}-${index}`}
              className="min-w-full relative"
              style={{ paddingBottom: "100%" }} // Square aspect ratio for full-width mobile
            >
              {/* Blurred Background */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
                style={{ backgroundImage: `url(${photo.src})` }}
              />

              {/* Main Photo */}
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() => onPhotoClick(index)}
                role="button"
                tabIndex={index === currentIndex ? 0 : -1}
                aria-label={`View full-size ${photo.caption}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPhotoClick(index);
                  }
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6">
                <h3 className="font-serif text-white text-xl sm:text-2xl mb-1">
                  {photo.caption}
                </h3>
                <p className="text-white/90 text-base sm:text-lg">{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-xl transition-all hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
        aria-label="Previous photo"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={goToNext}
        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-xl transition-all hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
        aria-label="Next photo"
      >
        <ChevronRight size={26} />
      </button>

      {/* Dot Navigation */}
      <div
        className="flex justify-center gap-2 mt-6 px-4"
        role="tablist"
        aria-label="Photo navigation"
      >
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentIndex
                ? "w-8 h-3 bg-primary"
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to photo ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
          />
        ))}
      </div>

      {/* Photo Counter */}
      <div className="text-center mt-3 px-4 text-sm text-text-light">
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
}
