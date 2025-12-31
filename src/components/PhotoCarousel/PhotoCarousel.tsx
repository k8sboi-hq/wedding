'use client';

import Image from 'next/image';
import { WEDDING_DATA } from '@/lib/constants';
import { SVG_PATTERNS } from '@/lib/svgPatterns';
import { useCarousel } from './useCarousel';
import CarouselControls from './CarouselControls';
import CarouselDots from './CarouselDots';

export default function PhotoCarousel() {
  const { photos } = WEDDING_DATA;
  const {
    currentIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    stopAutoPlay,
    startAutoPlay,
  } = useCarousel({ totalSlides: photos.length });

  return (
    <section
      id="photos"
      className="relative py-20 bg-gradient-to-br from-primary/3 via-accent/5 to-primary/3 overflow-hidden"
      style={{ backgroundImage: SVG_PATTERNS.carouselLotus, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Orbiting decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" aria-hidden="true">
        {[
          { emoji: "📸", duration: "22s", radius: "280px", delay: "0s" },
          { emoji: "💕", duration: "26s", radius: "320px", delay: "4s", reverse: true },
          { emoji: "🌸", duration: "24s", radius: "300px", delay: "8s" },
          { emoji: "✨", duration: "20s", radius: "340px", delay: "12s", reverse: true },
          { emoji: "💐", duration: "23s", radius: "310px", delay: "16s" },
        ].map((item, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 text-4xl opacity-10"
            style={{
              animation: `${item.reverse ? 'orbitReverse' : 'orbit'} ${item.duration} linear infinite`,
              animationDelay: item.delay,
              '--orbit-radius': item.radius,
            } as React.CSSProperties & { '--orbit-radius': string }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Double Happiness Decorations */}
      <div className="absolute top-12 right-[10%] text-6xl text-primary/8 font-bold z-10" aria-hidden="true">囍</div>
      <div className="absolute bottom-12 left-[10%] text-6xl text-primary/8 font-bold z-10" aria-hidden="true">囍</div>

      <div className="container mx-auto px-4 relative z-20">
        <h2 className="font-serif text-4xl md:text-3xl sm:text-2xl font-bold text-center text-primary mb-12">
          Our Journey Together
        </h2>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="min-w-full relative"
                  style={{
                    paddingBottom: '66.67%', // 3:2 aspect ratio
                  }}
                >
                  {/* Blurred Background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
                    style={{ backgroundImage: `url(${photo.src})` }}
                  />
                  {/* Main Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="relative w-full h-full">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 896px"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <p className="text-white text-lg font-serif bg-black/70 backdrop-blur-sm py-2 px-4 rounded-full inline-block">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <CarouselControls onPrev={prevSlide} onNext={nextSlide} />

          {/* Dots */}
          <CarouselDots
            total={photos.length}
            current={currentIndex}
            onDotClick={goToSlide}
          />
        </div>
      </div>
    </section>
  );
}
