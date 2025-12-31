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
    ? "Chúng mình rất mong được gặp bạn tại đây!"
    : "Chúng mình rất mong được gặp bạn tại đây!";

  return (
    <section id="location" className="relative py-20 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
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
          <h2 className="font-pinyon text-5xl md:text-4xl sm:text-3xl font-bold text-primary mb-3">
            Địa Điểm Tổ Chức
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-accent text-2xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
          </div>

          <p className="font-serif text-xl md:text-lg text-muted-foreground italic">
            {subtitle}
          </p>
        </div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Francis Hội Restaurant Map */}
          {showFirstParty && (
            <div className="relative bg-gradient-to-br from-white via-white to-accent/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-4 border-accent/30 hover:border-accent/50 transition-all duration-300 overflow-hidden group">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl group-hover:border-primary/40 transition-colors" />
              <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary/20 rounded-tr-2xl group-hover:border-primary/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-primary/20 rounded-bl-2xl group-hover:border-primary/40 transition-colors" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/20 rounded-br-2xl group-hover:border-primary/40 transition-colors" />

              {/* Location pin icons in corners */}
              <div className="absolute top-3 left-3 text-accent/30 text-xl group-hover:text-accent/50 transition-colors">📍</div>
              <div className="absolute top-3 right-3 text-accent/30 text-xl group-hover:text-accent/50 transition-colors">📍</div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  {/* Venue label */}
                  <div className="inline-block bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                    <p className="text-xs text-primary uppercase tracking-widest font-semibold">Tiệc Nhà Gái</p>
                  </div>

                  {/* Venue name */}
                  <h3 className="font-pinyon text-3xl md:text-4xl font-bold text-primary mb-4">
                    {venues.francisHoi.name}
                  </h3>

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-12 bg-accent/40" />
                    <span className="text-accent/60">❀</span>
                    <div className="h-px w-12 bg-accent/40" />
                  </div>

                  {/* Address */}
                  <div className="space-y-1 mb-6">
                    <p className="text-muted-foreground font-medium">
                      {venues.francisHoi.address}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {venues.francisHoi.city}
                    </p>
                  </div>

                  {/* Google Maps button */}
                  <a
                    href={venues.francisHoi.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>Xem trên Google Maps</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>

                {/* Map embed with decorative border */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-sm" />
                  <div className="relative">
                    <MapEmbed
                      embedUrl={venues.francisHoi.embedUrl}
                      title={`Map to ${venues.francisHoi.name}`}
                      height="400px"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Garden Plaza Saigon Map */}
          {showSecondParty && (
            <div className="relative bg-gradient-to-br from-white via-white to-accent/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-4 border-accent/30 hover:border-accent/50 transition-all duration-300 overflow-hidden group">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl group-hover:border-primary/40 transition-colors" />
              <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary/20 rounded-tr-2xl group-hover:border-primary/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-primary/20 rounded-bl-2xl group-hover:border-primary/40 transition-colors" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/20 rounded-br-2xl group-hover:border-primary/40 transition-colors" />

              {/* Location pin icons in corners */}
              <div className="absolute top-3 left-3 text-accent/30 text-xl group-hover:text-accent/50 transition-colors">📍</div>
              <div className="absolute top-3 right-3 text-accent/30 text-xl group-hover:text-accent/50 transition-colors">📍</div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  {/* Venue label */}
                  <div className="inline-block bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                    <p className="text-xs text-primary uppercase tracking-widest font-semibold">Tiệc Nhà Trai</p>
                  </div>

                  {/* Venue name */}
                  <h3 className="font-pinyon text-3xl md:text-4xl font-bold text-primary mb-4">
                    {venues.gardenPlaza.name}
                  </h3>

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-12 bg-accent/40" />
                    <span className="text-accent/60">❀</span>
                    <div className="h-px w-12 bg-accent/40" />
                  </div>

                  {/* Address */}
                  <div className="space-y-1 mb-6">
                    <p className="text-muted-foreground font-medium">
                      {venues.gardenPlaza.address}, {venues.gardenPlaza.ward}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {venues.gardenPlaza.city}
                    </p>
                  </div>

                  {/* Google Maps button */}
                  <a
                    href={venues.gardenPlaza.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>Xem trên Google Maps</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>

                {/* Map embed with decorative border */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-sm" />
                  <div className="relative">
                    <MapEmbed
                      embedUrl={venues.gardenPlaza.embedUrl}
                      title={`Map to ${venues.gardenPlaza.name}`}
                      height="400px"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
