"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import EnvelopeIcon from "./EnvelopeIcon";
import { SVG_PATTERNS } from "@/lib/svgPatterns";

export default function RSVPSection() {
  const [guestName, setGuestName] = useState<string>("friend");
  const [party, setParty] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

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
      id="rsvp"
      className="relative py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 overflow-hidden"
      style={{
        backgroundImage: SVG_PATTERNS.rsvpPattern,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border-3 border-accent shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Falling flowers effect */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {[
                { emoji: "🌸", delay: "0s", duration: "8s", left: "10%" },
                { emoji: "💎", delay: "1s", duration: "10s", left: "20%" },
                { emoji: "🌼", delay: "2s", duration: "9s", left: "30%" },
                { emoji: "❤️", delay: "0.5s", duration: "11s", left: "40%" },
                { emoji: "🌸", delay: "3s", duration: "8.5s", left: "50%" },
                { emoji: "💍", delay: "1.5s", duration: "10.5s", left: "60%" },
                { emoji: "🌺", delay: "2.5s", duration: "9.5s", left: "70%" },
                { emoji: "✨", delay: "4s", duration: "8s", left: "80%" },
                { emoji: "🌷", delay: "3.5s", duration: "11s", left: "90%" },
                { emoji: "❤️", delay: "5s", duration: "12s", left: "15%" },
                { emoji: "🌸", delay: "4.5s", duration: "9s", left: "25%" },
                { emoji: "💍", delay: "6s", duration: "10s", left: "35%" },
                { emoji: "🌻", delay: "5.5s", duration: "8.5s", left: "45%" },
                { emoji: "❤️", delay: "7s", duration: "11s", left: "55%" },
                { emoji: "🌷", delay: "6.5s", duration: "9.5s", left: "65%" },
                { emoji: "⭐", delay: "8s", duration: "10.5s", left: "75%" },
              ].map((flower, index) => (
                <div
                  key={index}
                  className="absolute opacity-60"
                  style={{
                    left: flower.left,
                    top: "0",
                    animation: `fall ${flower.duration} linear ${flower.delay} infinite`,
                  }}
                >
                  <div
                    style={{
                      animation: `sway 3s ease-in-out infinite`,
                      animationDelay: flower.delay,
                    }}
                  >
                    <div
                      style={{
                        animation: `rotate 4s linear infinite`,
                        animationDelay: flower.delay,
                        fontSize: "1.5rem",
                      }}
                    >
                      {flower.emoji}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6 relative">
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

              <button
                onClick={() => setShowQRCode(!showQRCode)}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-serif text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{
                  cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 40 48' style='fill:black;font-size:32px;'><text y='32'>💝</text></svg>") 16 0, pointer`,
                }}
              >
                {showQRCode ? "Hide QR Code" : "Send Your Blessings"}
              </button>
            </div>
          </div>
        </div>

        {showQRCode && (
          <div className="max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border-3 border-accent shadow-xl p-8 md:p-12">
              <div className="flex flex-col items-center gap-6">
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
        )}

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
