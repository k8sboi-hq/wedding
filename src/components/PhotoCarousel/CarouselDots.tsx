interface CarouselDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

export default function CarouselDots({ total, current, onDotClick }: CarouselDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            index === current
              ? 'bg-primary w-8'
              : 'bg-primary/30 hover:bg-primary/50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
