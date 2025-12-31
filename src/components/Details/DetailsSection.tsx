import { WEDDING_DATA } from "@/lib/constants";
import DetailCard from "./DetailCard";
import WeddingHouseIcon from "@/components/Icons/DoubleHappinessIcon";
import { SVG_PATTERNS } from "@/lib/svgPatterns";
import { PartyFilter, getCelebrations } from "@/lib/partyFilter";

interface DetailsSectionProps {
  partyFilter: PartyFilter;
}

export default function DetailsSection({ partyFilter }: DetailsSectionProps) {
  const { dates, venues } = WEDDING_DATA;
  const { showFirstParty, showSecondParty } = getCelebrations(partyFilter);

  // Determine subtitle based on what's shown
  const subtitle = "Cảm ơn bạn đã đến chung vui cùng chúng mình!";
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
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
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
            Thông tin buổi lễ & tiệc
          </h2>
          <p className="font-serif text-xl md:text-lg text-muted-foreground italic">
            Cảm ơn bạn đã đến chung vui cùng chúng mình!
          </p>
        </div>

        {/* Main Wedding Note */}
        <div
          id="home-celebration"
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-white via-white to-accent/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border-4 border-accent/30 overflow-hidden">
            {/* Decorative corner flourishes */}
            <div className="absolute top-3 left-3 w-12 h-12 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-12 h-12 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-12 h-12 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-12 h-12 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />

            {/* Decorative hearts in corners */}
            <div className="absolute top-2 left-2 text-accent text-xl opacity-30">
              ❤
            </div>
            <div className="absolute top-2 right-2 text-accent text-xl opacity-30">
              ❤
            </div>
            <div className="absolute bottom-2 left-2 text-accent text-xl opacity-30">
              ❤
            </div>
            <div className="absolute bottom-2 right-2 text-accent text-xl opacity-30">
              ❤
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Icon with glow */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
                  <WeddingHouseIcon className="relative w-28 h-28 md:w-32 md:h-32 animate-[fadeIn_1.5s_ease-out]" />
                </div>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
                <span className="text-accent text-2xl">✦</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
              </div>

              {/* Date - more prominent */}
              <p className="font-pinyon text-4xl md:text-5xl text-primary font-bold mb-4 animate-[fadeInUp_1s_ease-out]">
                {dates.mainWedding.dateDisplay}
              </p>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <span className="text-primary/40">❋</span>
                <div className="h-px w-12 bg-primary/30" />
                <span className="text-primary/40">❋</span>
                <div className="h-px w-12 bg-primary/30" />
                <span className="text-primary/40">❋</span>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-foreground font-medium mb-3 leading-relaxed">
                {dates.mainWedding.description}
              </p>

              {/* Subtitle */}
              <p className="text-base text-muted-foreground italic">
                {dates.mainWedding.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 my-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <span className="text-primary/50 text-3xl">❀</span>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Celebration Cards Section */}
        <div id="celebration-cards" className="relative">
          {/* Section introduction */}
          <div className="text-center mb-10">
            <h3 className="font-pinyon text-3xl md:text-4xl text-primary mb-3">
              Chi Tiết Tiệc Mừng
            </h3>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-12 bg-accent/40" />
              <span className="text-accent/60 text-lg">✦</span>
              <div className="h-px w-12 bg-accent/40" />
            </div>
          </div>

          {/* Cards Grid */}
          <div
            className={`grid ${showFirstParty && showSecondParty ? "md:grid-cols-2" : "md:grid-cols-1 max-w-2xl"} gap-10 mx-auto ${showFirstParty && showSecondParty ? "max-w-5xl" : ""}`}
          >
            {/* First Party */}
            {showFirstParty && (
              <div className="animate-[fadeInUp_0.8s_ease-out]">
                <DetailCard
                  title="Tiệc Nhà Gái"
                  date={dates.firstParty.dateDisplay}
                  receptionTime={dates.firstParty.receptionTime}
                  dinnerTime={dates.firstParty.dinnerTime}
                  venueName={venues.francisHoi.name}
                  venueAddress={venues.francisHoi.address}
                  venueCity={venues.francisHoi.city}
                />
              </div>
            )}

            {/* Second Party */}
            {showSecondParty && (
              <div className="animate-[fadeInUp_1s_ease-out]">
                <DetailCard
                  title="Tiệc Nhà Trai"
                  date={dates.secondParty.dateDisplay}
                  receptionTime={dates.secondParty.receptionTime}
                  dinnerTime={dates.secondParty.dinnerTime}
                  venueName={venues.gardenPlaza.name}
                  venueAddress={`${venues.gardenPlaza.address}, ${venues.gardenPlaza.ward}`}
                  venueCity={venues.gardenPlaza.city}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
