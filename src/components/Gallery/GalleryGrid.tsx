"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/constants";

interface GalleryGridProps {
  photos: readonly Photo[];
  onPhotoClick: (index: number) => void;
}

export default function GalleryGrid({ photos, onPhotoClick }: GalleryGridProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {photos.map((photo, index) => (
        <div
          key={`${photo.src}-${index}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-cream/50"
          onClick={() => onPhotoClick(index)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPhotoClick(index);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`View ${photo.caption} - ${photo.location}, ${photo.date}`}
        >
          {/* Loading skeleton */}
          {!loadedImages.has(index) && (
            <div className="absolute inset-0 bg-gradient-to-br from-cream/50 to-accent/20 animate-pulse" />
          )}

          {/* Photo Image */}
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              loadedImages.has(index) ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => handleImageLoad(index)}
            loading={index < 6 ? "eager" : "lazy"}
          />

          {/* Hover Overlay with Info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
            <h3 className="font-serif text-white text-xl sm:text-2xl mb-2">
              {photo.caption}
            </h3>
            <p className="text-white/90 text-sm sm:text-base mb-1">
              {photo.location}
            </p>
            <p className="text-white/70 text-xs sm:text-sm">
              {new Date(photo.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm ${
                photo.category === "dating"
                  ? "bg-pink-500/80"
                  : photo.category === "engagement"
                  ? "bg-purple-500/80"
                  : "bg-primary/80"
              }`}
            >
              {photo.category.charAt(0).toUpperCase() + photo.category.slice(1)}
            </span>
          </div>

          {/* Focus ring for accessibility */}
          <div className="absolute inset-0 ring-4 ring-accent ring-opacity-0 focus-within:ring-opacity-100 rounded-xl transition-all pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
