"use client";

import { useCountdown } from "./useCountdown";
import CountdownTimer from "./CountdownTimer";
import HeartFrame from "./HeartFrame";
import { SVG_PATTERNS } from "@/lib/svgPatterns";

export default function CountdownSection() {
  const timeRemaining = useCountdown();

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-background via-background to-accent/5 overflow-hidden"
      style={{
        backgroundImage: SVG_PATTERNS.countdownBamboo,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Orbiting decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        {[
          { emoji: "❤️", duration: "18s", radius: "250px", delay: "0s" },
          {
            emoji: "💕",
            duration: "22s",
            radius: "280px",
            delay: "3s",
            reverse: true,
          },
          { emoji: "💖", duration: "20s", radius: "260px", delay: "6s" },
          {
            emoji: "💝",
            duration: "24s",
            radius: "290px",
            delay: "9s",
            reverse: true,
          },
          { emoji: "💗", duration: "19s", radius: "270px", delay: "12s" },
        ].map((item, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 text-4xl opacity-10"
            style={
              {
                animation: `${item.reverse ? "orbitReverse" : "orbit"} ${item.duration} linear infinite`,
                animationDelay: item.delay,
                "--orbit-radius": item.radius,
              } as React.CSSProperties & { "--orbit-radius": string }
            }
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="font-serif text-4xl md:text-3xl sm:text-2xl font-bold text-primary mb-4">
          Counting Down to Our Big Day
        </h2>

        {/* Couple Emoji with Heart Frame */}
        {/* <div className="mb-8 animate-[fadeIn_1s_ease-out] flex justify-center"> */}
        {/*   <HeartFrame> */}
        {/*     <div className="text-6xl md:text-5xl sm:text-4xl">🤵🏻</div> */}
        {/*     <div className="text-6xl md:text-5xl sm:text-4xl">👰🏻 </div> */}
        {/*   </HeartFrame> */}
        {/* </div> */}

        <p className="font-serif text-xl md:text-lg text-muted-foreground italic mb-12">
          We can&apos;t wait to celebrate with you!
        </p>

        {timeRemaining.isComplete ? (
          <p className="text-4xl md:text-3xl text-primary font-bold">
            We are married! 💑
          </p>
        ) : (
          <CountdownTimer
            days={timeRemaining.days}
            hours={timeRemaining.hours}
            minutes={timeRemaining.minutes}
            seconds={timeRemaining.seconds}
          />
        )}
      </div>
    </section>
  );
}
