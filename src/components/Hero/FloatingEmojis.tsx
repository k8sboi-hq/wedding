interface OrbitingIconConfig {
  emoji: string;
  size: string;
  color: string;
  duration: string;
  orbitRadius: string;
  delay: string;
  reverse?: boolean;
}

export default function FloatingEmojis() {
  const orbitingIcons: OrbitingIconConfig[] = [
    { emoji: "❤️", size: "2.5rem", color: "#dc143c", duration: "20s", orbitRadius: "300px", delay: "0s" },
    { emoji: "💍", size: "2rem", color: "#ffd700", duration: "25s", orbitRadius: "350px", delay: "2s" },
    { emoji: "🌹", size: "2.5rem", color: "#dc143c", duration: "22s", orbitRadius: "320px", delay: "4s" },
    { emoji: "💕", size: "2rem", color: "#ffd700", duration: "24s", orbitRadius: "340px", delay: "6s", reverse: true },
    { emoji: "🌸", size: "2.5rem", color: "#ffd700", duration: "23s", orbitRadius: "310px", delay: "8s" },
    { emoji: "✨", size: "2rem", color: "#ffd700", duration: "21s", orbitRadius: "330px", delay: "10s", reverse: true },
    { emoji: "💐", size: "2.5rem", color: "#dc143c", duration: "26s", orbitRadius: "315px", delay: "12s" },
    { emoji: "💖", size: "2rem", color: "#ffd700", duration: "24s", orbitRadius: "325px", delay: "14s", reverse: true },
  ];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" aria-hidden="true">
      {orbitingIcons.map((item, index) => (
        <div
          key={index}
          className="absolute top-1/2 left-1/2"
          style={{
            fontSize: item.size,
            color: item.color,
            opacity: 0.2,
            animation: `${item.reverse ? 'orbitReverse' : 'orbit'} ${item.duration} linear infinite`,
            animationDelay: item.delay,
            '--orbit-radius': item.orbitRadius,
          } as React.CSSProperties & { '--orbit-radius': string }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
