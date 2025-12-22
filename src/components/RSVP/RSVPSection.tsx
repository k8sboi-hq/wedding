import RSVPForm from "./RSVPForm";
import EnvelopeIcon from "./EnvelopeIcon";
import { SVG_PATTERNS } from "@/lib/svgPatterns";

export default function RSVPSection() {
  return (
    <section
      className="relative py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 overflow-hidden"
      style={{ backgroundImage: SVG_PATTERNS.rsvpPattern, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Orbiting decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        {[
          { type: "envelope", duration: "20s", radius: "280px", delay: "0s" },
          { emoji: "❤️", duration: "24s", radius: "320px", delay: "3s", reverse: true },
          { emoji: "💍", duration: "22s", radius: "300px", delay: "6s" },
          { emoji: "🌹", duration: "26s", radius: "340px", delay: "9s", reverse: true },
          { emoji: "✨", duration: "21s", radius: "310px", delay: "12s" },
          { emoji: "💝", duration: "25s", radius: "290px", delay: "15s", reverse: true },
          { emoji: "🌸", duration: "23s", radius: "330px", delay: "18s" },
          { emoji: "💐", duration: "27s", radius: "315px", delay: "21s", reverse: true },
        ].map((item, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 opacity-10"
            style={{
              animation: `${item.reverse ? 'orbitReverse' : 'orbit'} ${item.duration} linear infinite`,
              animationDelay: item.delay,
              '--orbit-radius': item.radius,
            } as React.CSSProperties & { '--orbit-radius': string }}
          >
            {item.type === "envelope" ? (
              <EnvelopeIcon className="w-10 h-10" />
            ) : (
              <span className="text-4xl">{item.emoji}</span>
            )}
          </div>
        ))}
      </div>

      {/* Center decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5 font-bold">
        囍
      </div>
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 text-8xl opacity-5 font-bold">
        囍
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="mb-4 inline-block">
            <EnvelopeIcon className="w-24 h-24 mx-auto" />
          </div>
          <h2 className="font-serif text-4xl md:text-3xl sm:text-2xl font-bold text-primary mb-4">
            RSVP
          </h2>
          <p className="font-serif text-xl md:text-lg text-muted-foreground italic max-w-2xl mx-auto">
            We would be honored by your presence at our wedding celebration.
            Please let us know if you can join us!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <RSVPForm />
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Can't wait to celebrate with you! 🎉
          </p>
        </div>
      </div>
    </section>
  );
}
