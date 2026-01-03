"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DesktopCarouselProps {
  photos: readonly Photo[];
  onPhotoClick: (index: number) => void;
}

export default function DesktopCarousel({
  photos,
  onPhotoClick,
}: DesktopCarouselProps) {
  const PHOTOS_PER_SLIDE = 8; // 2 rows × 4 columns
  const totalSlides = Math.ceil(photos.length / PHOTOS_PER_SLIDE);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 8000); // 8 seconds per slide since there are 8 photos

    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

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

  // Get photos for current slide
  const getCurrentSlidePhotos = () => {
    const start = currentSlide * PHOTOS_PER_SLIDE;
    const end = start + PHOTOS_PER_SLIDE;
    return photos.slice(start, end);
  };

  const currentSlidePhotos = getCurrentSlidePhotos();

  return (
    <div
      className="relative -mx-4 lg:-mx-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      role="region"
      aria-label="Photo carousel"
      aria-roledescription="carousel"
    >
      {/* ARIA live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentSlide + 1} of {totalSlides}
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Generate slides */}
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            const slidePhotos = photos.slice(
              slideIndex * PHOTOS_PER_SLIDE,
              (slideIndex + 1) * PHOTOS_PER_SLIDE
            );

            return (
              <div key={slideIndex} className="min-w-full px-4 lg:px-8">
                {/* 2 Rows × 4 Columns Grid */}
                <div className="grid grid-cols-4 grid-rows-2 gap-4 lg:gap-6">
                  {slidePhotos.map((photo, photoIndex) => {
                    const absoluteIndex =
                      slideIndex * PHOTOS_PER_SLIDE + photoIndex;

                    return (
                      <div
                        key={`${photo.src}-${absoluteIndex}`}
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-cream/50"
                        onClick={() => onPhotoClick(absoluteIndex)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onPhotoClick(absoluteIndex);
                          }
                        }}
                        role="button"
                        tabIndex={slideIndex === currentSlide ? 0 : -1}
                        aria-label={`View ${photo.caption} - ${photo.location}`}
                      >
                        {/* Photo Image */}
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 1024px) 25vw, 20vw"
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          loading={slideIndex === 0 && photoIndex < 4 ? "eager" : "lazy"}
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <h3 className="font-serif text-white text-lg lg:text-xl mb-1 line-clamp-1">
                            {photo.caption}
                          </h3>
                          <p className="text-white/90 text-sm mb-1 line-clamp-1">
                            {photo.location}
                          </p>
                          <p className="text-white/70 text-xs">
                            {new Date(photo.date).toLocaleDateString("vi-VN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm ${
                              photo.category === "dating"
                                ? "bg-pink-500/80"
                                : photo.category === "engagement"
                                ? "bg-purple-500/80"
                                : "bg-primary/80"
                            }`}
                          >
                            {photo.category.charAt(0).toUpperCase() +
                              photo.category.slice(1)}
                          </span>
                        </div>

                        {/* Focus ring */}
                        <div className="absolute inset-0 ring-4 ring-accent ring-opacity-0 focus-within:ring-opacity-100 rounded-lg transition-all pointer-events-none" />
                      </div>
                    );
                  })}

                  {/* Fill empty spaces in last slide if needed */}
                  {slidePhotos.length < PHOTOS_PER_SLIDE &&
                    Array.from({
                      length: PHOTOS_PER_SLIDE - slidePhotos.length,
                    }).map((_, emptyIndex) => (
                      <div
                        key={`empty-${emptyIndex}`}
                        className="aspect-[4/3] rounded-lg bg-gradient-to-br from-cream/30 to-accent/10 opacity-30"
                        aria-hidden="true"
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary rounded-full p-3 lg:p-4 shadow-xl transition-all hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary rounded-full p-3 lg:p-4 shadow-xl transition-all hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Dot Navigation */}
      {totalSlides > 1 && (
        <div
          className="flex justify-center gap-3 mt-8"
          role="tablist"
          aria-label="Slide navigation"
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentSlide
                  ? "w-12 h-4 bg-primary"
                  : "w-4 h-4 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentSlide}
              role="tab"
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="text-center mt-4 text-sm text-text-light">
        Slide {currentSlide + 1} of {totalSlides} • {photos.length} photos total
      </div>
    </div>
  );
}
