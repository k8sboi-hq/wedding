import { WEDDING_DATA } from "@/lib/constants";
import DetailCard from "./DetailCard";
import DoubleHappinessIcon from "@/components/Icons/DoubleHappinessIcon";
import { SVG_PATTERNS } from "@/lib/svgPatterns";

export default function DetailsSection() {
  const { dates, venues } = WEDDING_DATA;

  return (
    <section
      id="details"
      className="relative py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5 overflow-hidden"
      style={{
        backgroundImage: SVG_PATTERNS.detailsCelebration,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Orbiting decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" aria-hidden="true">
        {[
          { emoji: "🌸", duration: "22s", radius: "280px", delay: "0s" },
          {
            emoji: "💐",
            duration: "26s",
            radius: "320px",
            delay: "4s",
            reverse: true,
          },
          { emoji: "🌹", duration: "24s", radius: "300px", delay: "8s" },
          {
            emoji: "💍",
            duration: "20s",
            radius: "340px",
            delay: "12s",
            reverse: true,
          },
          { emoji: "✨", duration: "23s", radius: "310px", delay: "16s" },
          {
            emoji: "🎊",
            duration: "25s",
            radius: "290px",
            delay: "20s",
            reverse: true,
          },
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

      <div
        id="celebration-details"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-3xl sm:text-2xl font-bold text-primary mb-4">
            Celebration Details
          </h2>
          <p className="font-serif text-xl md:text-lg text-muted-foreground italic">
            Join us for two beautiful celebrations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* First Party */}
          <DetailCard
            title="Guest Celebration - Day 1"
            date={dates.firstParty.dateDisplay}
            receptionTime={dates.firstParty.receptionTime}
            dinnerTime={dates.firstParty.dinnerTime}
            venueName={venues.francisHoi.name}
            venueAddress={venues.francisHoi.address}
            venueCity={venues.francisHoi.city}
          />

          {/* Second Party */}
          <DetailCard
            title="Guest Celebration - Day 2"
            date={dates.secondParty.dateDisplay}
            receptionTime={dates.secondParty.receptionTime}
            dinnerTime={dates.secondParty.dinnerTime}
            venueName={venues.gardenPlaza.name}
            venueAddress={`${venues.gardenPlaza.address}, ${venues.gardenPlaza.ward}`}
            venueCity={venues.gardenPlaza.city}
          />
        </div>

        {/* Main Wedding Note */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-primary/20">
            <div className="flex justify-center mb-3">
              <DoubleHappinessIcon className="w-20 h-20" />
            </div>
            <p className="font-serif text-lg text-primary font-semibold mb-2">
              {dates.mainWedding.dateDisplay}
            </p>
            <p className="text-muted-foreground">
              {dates.mainWedding.description}
            </p>
            <p className="text-sm text-muted-foreground italic mt-2">
              {dates.mainWedding.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
