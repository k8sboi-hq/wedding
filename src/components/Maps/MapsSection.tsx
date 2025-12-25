import { WEDDING_DATA } from "@/lib/constants";
import MapEmbed from "./MapEmbed";
import { PartyFilter, getCelebrations } from "@/lib/partyFilter";

interface MapsSectionProps {
  partyFilter: PartyFilter;
}

export default function MapsSection({ partyFilter }: MapsSectionProps) {
  const { venues } = WEDDING_DATA;
  const { showFirstParty, showSecondParty } = getCelebrations(partyFilter);

  // Determine subtitle based on what's shown
  const subtitle = showFirstParty && showSecondParty
    ? "Find your way to our celebrations"
    : "Find your way to our celebration";

  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
      {/* Orbiting decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        {[
          { emoji: "📍", duration: "20s", radius: "250px", delay: "0s" },
          { emoji: "🗺️", duration: "24s", radius: "290px", delay: "4s", reverse: true },
          { emoji: "✨", duration: "22s", radius: "270px", delay: "8s" },
          { emoji: "💍", duration: "26s", radius: "310px", delay: "12s", reverse: true },
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-3xl sm:text-2xl font-bold text-primary mb-4">
            Venue Locations
          </h2>
          <p className="font-serif text-xl md:text-lg text-muted-foreground italic">
            {subtitle}
          </p>
        </div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Francis Hội Restaurant Map */}
          {showFirstParty && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-accent/30">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                  {venues.francisHoi.name}
                </h3>
                <p className="text-muted-foreground mb-1">
                  {venues.francisHoi.address}
                </p>
                <p className="text-muted-foreground mb-4">
                  {venues.francisHoi.city}
                </p>
                <a
                  href={venues.francisHoi.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
              <MapEmbed
                embedUrl={venues.francisHoi.embedUrl}
                title={`Map to ${venues.francisHoi.name}`}
                height="400px"
              />
            </div>
          )}

          {/* Garden Plaza Saigon Map */}
          {showSecondParty && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-accent/30">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                  {venues.gardenPlaza.name}
                </h3>
                <p className="text-muted-foreground mb-1">
                  {venues.gardenPlaza.address}, {venues.gardenPlaza.ward}
                </p>
                <p className="text-muted-foreground mb-4">
                  {venues.gardenPlaza.city}
                </p>
                <a
                  href={venues.gardenPlaza.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
              <MapEmbed
                embedUrl={venues.gardenPlaza.embedUrl}
                title={`Map to ${venues.gardenPlaza.name}`}
                height="400px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
