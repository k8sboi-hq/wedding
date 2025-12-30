"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import EnvelopeIcon from "./EnvelopeIcon";
import { SVG_PATTERNS } from "@/lib/svgPatterns";

export default function RSVPSection() {
  const [guestName, setGuestName] = useState<string>("friend");
  const [party, setParty] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get("guest");
    const partyParam = params.get("party");

    if (guest) {
      setGuestName(decodeURIComponent(guest));
    }

    if (partyParam) {
      setParty(partyParam);
    }
  }, []);
  return (
    <section
      className="relative py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 overflow-hidden"
      style={{
        backgroundImage: SVG_PATTERNS.rsvpPattern,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Orbiting decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        {[
          { type: "envelope", duration: "20s", radius: "280px", delay: "0s" },
          {
            emoji: "❤️",
            duration: "24s",
            radius: "320px",
            delay: "3s",
            reverse: true,
          },
          { emoji: "💍", duration: "22s", radius: "300px", delay: "6s" },
          {
            emoji: "🌹",
            duration: "26s",
            radius: "340px",
            delay: "9s",
            reverse: true,
          },
          { emoji: "✨", duration: "21s", radius: "310px", delay: "12s" },
          {
            emoji: "💝",
            duration: "25s",
            radius: "290px",
            delay: "15s",
            reverse: true,
          },
          { emoji: "🌸", duration: "23s", radius: "330px", delay: "18s" },
          {
            emoji: "💐",
            duration: "27s",
            radius: "315px",
            delay: "21s",
            reverse: true,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 opacity-10"
            style={
              {
                animation: `${item.reverse ? "orbitReverse" : "orbit"} ${item.duration} linear infinite`,
                animationDelay: item.delay,
                "--orbit-radius": item.radius,
              } as React.CSSProperties & { "--orbit-radius": string }
            }
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
            Your Presence is Our Present
          </h2>
          <p className="font-serif text-xl md:text-lg text-muted-foreground italic max-w-2xl mx-auto mb-4">
            Though miles may keep us apart on our special day, your love
            transcends all distance.
          </p>
          <p className="font-serif text-lg md:text-base text-muted-foreground max-w-2xl mx-auto">
            If you cannot join us in person but still wish to shower us with
            your blessings, we would be deeply touched by your thoughtfulness.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border-3 border-accent shadow-xl p-8 md:p-12">
            <div className="flex flex-col items-center gap-6">
              {(party === "1" || party === null) && (
                <div className="relative mb-6 w-full max-w-lg">
                  <Image
                    src="/assets/1st-party-invitation.png"
                    alt="1st Party Wedding Invitation"
                    width={600}
                    height={800}
                    className="w-full h-auto rounded-lg shadow-md"
                    priority
                  />
                  <div className="absolute top-[30%] md:top-[30%] left-0 right-0 text-center">
                    <p
                      className="font-dancing text-xl md:text-4xl font-bold drop-shadow-lg"
                      style={{ color: "#b82428" }}
                    >
                      {guestName}
                    </p>
                  </div>
                </div>
              )}

              {(party === "2" || party === null) && (
                <div className="relative mb-6 w-full max-w-lg">
                  <Image
                    src="/assets/2nd-party-invitation.png"
                    alt="2nd Party Wedding Invitation"
                    width={600}
                    height={800}
                    className="w-full h-auto rounded-lg shadow-md"
                    priority={party === "2"}
                  />
                  <div className="absolute top-[30%] md:top-[31%] left-0 right-0 text-center">
                    <p className="font-dancing text-xl md:text-4xl text-white font-bold drop-shadow-lg">
                      {guestName}
                    </p>
                  </div>
                </div>
              )}

              <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-muted-foreground text-sm mb-2">
                    QR Code Placeholder
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Bank Transfer QR Code will appear here
                  </p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="font-serif text-lg text-muted-foreground">
                  Scan to send your heartfelt wishes
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Every gesture of kindness fills our hearts with joy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="font-serif text-muted-foreground italic">
            Your love and support are the greatest gifts we could ever receive
            💝
          </p>
        </div>
      </div>
    </section>
  );
}
