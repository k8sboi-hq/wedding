"use client";

import { useState } from "react";
import { WEDDING_DATA } from "@/lib/constants";
import { SVG_PATTERNS } from "@/lib/svgPatterns";
import DesktopCarousel from "./DesktopCarousel";
import MobileCarousel from "./MobileCarousel";
import Lightbox from "./Lightbox";
import FloatingEmojis from "../Hero/FloatingEmojis";

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedPhotoIndex(null), 300); // Wait for animation
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (selectedPhotoIndex === null) return;

    const totalPhotos = WEDDING_DATA.photos.length;
    if (direction === "prev") {
      setSelectedPhotoIndex(
        selectedPhotoIndex === 0 ? totalPhotos - 1 : selectedPhotoIndex - 1
      );
    } else {
      setSelectedPhotoIndex(
        selectedPhotoIndex === totalPhotos - 1 ? 0 : selectedPhotoIndex + 1
      );
    }
  };

  return (
    <section
      id="gallery"
      className="relative py-20 overflow-hidden bg-gradient-to-b from-cream via-white to-cream"
      style={{
        backgroundImage: SVG_PATTERNS.carouselLotus,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Floating Decorative Elements */}
      <FloatingEmojis />

      {/* Section Header */}
      <div className="container mx-auto px-4 relative z-10 mb-12">
        <div className="text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-primary mb-4">
            Our Journey Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-4" />
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Every moment captured, every memory cherished. A visual story of our
            love from the first date to forever.
          </p>
        </div>
      </div>

      {/* Mobile Carousel - visible only on small screens */}
      <div className="md:hidden container mx-auto px-4 relative z-10">
        <MobileCarousel
          photos={WEDDING_DATA.photos}
          onPhotoClick={handlePhotoClick}
        />
      </div>

      {/* Desktop/Tablet Carousel - hidden on small screens, full width */}
      <div className="hidden md:block container mx-auto relative z-10">
        <DesktopCarousel
          photos={WEDDING_DATA.photos}
          onPhotoClick={handlePhotoClick}
        />
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedPhotoIndex !== null && (
        <Lightbox
          photos={WEDDING_DATA.photos}
          currentIndex={selectedPhotoIndex}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  );
}
