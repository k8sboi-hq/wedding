import Image from "next/image";
import FloatingEmojis from "./FloatingEmojis";
import { WEDDING_DATA } from "@/lib/constants";
import { SVG_PATTERNS } from "@/lib/svgPatterns";

export default function HeroSection() {
  const { couple, dates } = WEDDING_DATA;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 pt-16"
      style={{
        backgroundImage: SVG_PATTERNS.heroRose,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Double Happiness Background Symbol */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-accent opacity-5 select-none pointer-events-none"
        aria-hidden="true"
      >
        囍
      </div>

      {/* Floating Emojis */}
      <FloatingEmojis />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Couple Photo */}
        <div className="mb-8 inline-block animate-[fadeIn_1s_ease-out]">
          <div className="relative w-[350px] h-[350px] md:w-[280px] md:h-[280px] sm:w-[220px] sm:h-[220px]">
            <div className="absolute inset-0 rounded-full border-8 md:border-6 border-accent-pink shadow-[0_15px_50px_rgba(220,20,60,0.4),0_0_0_15px_rgba(255,145,164,0.25),0_0_40px_rgba(255,145,164,0.15)] animate-[lotusPulse_4s_ease-in-out_infinite]">
              <Image
                id="couple-photo"
                src="/assets/top_image.webp"
                alt="Engagement photo of Khoa and Sương"
                fill
                className="rounded-full object-cover"
                priority
                sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 350px"
              />
            </div>
          </div>
        </div>

        {/* Couple Names */}
        <h1 className="font-serif text-5xl md:text-4xl sm:text-3xl font-bold text-primary animate-[fadeInUp_1s_ease-out]">
          <span className="block mb-2">
            {couple.groom.firstName}
            <span className="text-3xl md:text-2xl sm:text-xl text-muted-foreground ml-2">
              ({couple.groom.englishName})
            </span>
          </span>
          <span className="block text-accent text-6xl md:text-5xl sm:text-4xl my-4">
            &
          </span>
          <span className="block mt-2">
            {couple.bride.firstName}
            <span className="text-3xl md:text-2xl sm:text-xl text-muted-foreground ml-2">
              ({couple.bride.englishName})
            </span>
          </span>
        </h1>

        {/* Quote */}
        {/* <p className="mt-6 font-pinyon text-3xl md:text-2xl sm:text-xl text-muted-foreground animate-[fadeInUp_1.2s_ease-out]"> */}
        {/*   Bình yên là khi có nhau */}
        {/* </p> */}
      </div>
    </section>
  );
}
