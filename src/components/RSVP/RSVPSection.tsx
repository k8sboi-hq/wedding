"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import EnvelopeIcon from "./EnvelopeIcon";
import RSVPForm from "./RSVPForm";
import { SVG_PATTERNS } from "@/lib/svgPatterns";

interface RSVPSectionProps {
  guestName?: string | null;
}

export default function RSVPSection({
  guestName: serverGuestName,
}: RSVPSectionProps) {
  const [displayName, setDisplayName] = useState<string>(
    serverGuestName || "Bạn",
  );
  const [party, setParty] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const partyParam = params.get("party");

    // Update display name if server provided one
    if (serverGuestName) {
      setDisplayName(serverGuestName);
    }

    if (partyParam) {
      setParty(partyParam);
    }
  }, [serverGuestName]);

  // Hide RSVP section if no guest name provided
  if (!serverGuestName) {
    return null;
  }
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
          {/* Icon with glow */}
          <div className="mb-6 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
              <EnvelopeIcon className="relative w-28 h-28 mx-auto animate-[fadeIn_1.5s_ease-out]" />
            </div>
          </div>

          {/* Personalized greeting if guest name is provided */}
          {/* {serverGuestName && ( */}
          {/*   <p className="font-serif text-2xl md:text-xl text-primary mb-4 animate-[fadeIn_1s_ease-out]"> */}
          {/*     Kính gửi <span className="font-semibold">{displayName}</span> 💐 */}
          {/*   </p> */}
          {/* )} */}

          {/* Title */}
          <h2 className="font-pinyon text-5xl md:text-4xl sm:text-3xl font-bold text-primary mb-3">
            Lời Mời Chân Thành
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-accent text-2xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
          </div>

          {/* Subtitle */}
          <p className="font-serif text-xl md:text-lg text-muted-foreground italic max-w-2xl mx-auto mb-4 leading-relaxed">
            Sự hiện diện của bạn là món quà quý giá nhất với chúng mình
          </p>
          {/* <p className="font-serif text-base md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed"> */}
          {/*   Nếu không thể đến tham dự trực tiếp nhưng vẫn muốn gửi lời chúc */}
          {/*   phúc, chúng mình sẽ vô cùng cảm động */}
          {/* </p> */}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-white via-white to-accent/5 backdrop-blur-sm rounded-2xl border-4 border-accent/30 shadow-2xl p-8 md:p-12 overflow-hidden">
            {/* Decorative corner flourishes */}
            <div className="absolute top-3 left-3 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg z-30" />
            <div className="absolute top-3 right-3 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-lg z-30" />
            <div className="absolute bottom-3 left-3 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-lg z-30" />
            <div className="absolute bottom-3 right-3 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg z-30" />

            {/* Decorative hearts in corners */}
            <div className="absolute top-2 left-2 text-accent/30 text-xl z-30">
              💌
            </div>
            <div className="absolute top-2 right-2 text-accent/30 text-xl z-30">
              💌
            </div>
            <div className="absolute bottom-2 left-2 text-accent/30 text-xl z-30">
              💌
            </div>
            <div className="absolute bottom-2 right-2 text-accent/30 text-xl z-30">
              💌
            </div>
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

            <div className="flex flex-col items-center gap-8 relative z-10">
              {/* Invitation cards with enhanced styling */}
              <div className="w-full space-y-8">
                {(party === "1" || party === null) && (
                  <div className="relative w-full max-w-lg mx-auto group">
                    {/* Decorative border glow */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-300" />

                    <div className="relative">
                      <Image
                        src="/assets/1st-party-invitation.png"
                        alt="1st Party Wedding Invitation"
                        width={600}
                        height={800}
                        className="w-full h-auto rounded-xl shadow-2xl border-4 border-white"
                        priority
                      />
                      <div className="absolute top-[30%] md:top-[30%] left-0 right-0 text-center">
                        <p
                          className="font-dancing text-xl md:text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                          style={{ color: "#b82428" }}
                        >
                          {displayName}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {(party === "2" || party === null) && (
                  <div className="relative w-full max-w-lg mx-auto group">
                    {/* Decorative border glow */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-300" />

                    <div className="relative">
                      <Image
                        src="/assets/2nd-party-invitation.png"
                        alt="2nd Party Wedding Invitation"
                        width={600}
                        height={800}
                        className="w-full h-auto rounded-xl shadow-2xl border-4 border-white"
                        priority={party === "2"}
                      />
                      <div className="absolute top-[30%] md:top-[31%] left-0 right-0 text-center">
                        <p className="font-dancing text-xl md:text-4xl text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                          {displayName}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Decorative divider before RSVP form */}
              <div className="flex items-center justify-center gap-3 w-full">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <span className="text-accent/60 text-lg">❀</span>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              </div>

              {/* RSVP Form */}
              {party && (
                <RSVPForm
                  guestName={displayName}
                  party={party as "1" | "2"}
                />
              )}

              {/* Enhanced CTA Button */}
              {/* <button */}
              {/*   onClick={() => setShowQRCode(!showQRCode)} */}
              {/*   className="group relative px-10 py-4 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-serif text-lg md:text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 flex items-center gap-3" */}
              {/*   style={{ */}
              {/*     cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 40 48' style='fill:black;font-size:32px;'><text y='32'>💝</text></svg>") 16 0, pointer`, */}
              {/*     backgroundSize: "200% 100%", */}
              {/*   }} */}
              {/* > */}
              {/*   <span className="text-2xl group-hover:scale-110 transition-transform"> */}
              {/*     💝 */}
              {/*   </span> */}
              {/*   <span>{showQRCode ? "Ẩn Mã QR" : "Gửi Lời Chúc Phúc"}</span> */}
              {/*   <span className="text-2xl group-hover:scale-110 transition-transform"> */}
              {/*     💝 */}
              {/*   </span> */}
              {/* </button> */}

              {/* Subtle note below button */}
              {/* {!showQRCode && ( */}
              {/*   <p className="text-sm text-muted-foreground italic"> */}
              {/*     Nhấn để hiển thị mã QR chuyển khoản */}
              {/*   </p> */}
              {/* )} */}
            </div>
          </div>
        </div>

        {showQRCode && (
          <div
            id="payment-detail"
            className="max-w-3xl mx-auto mt-10 animate-in fade-in slide-in-from-top-4 duration-500"
          >
            <div className="relative bg-gradient-to-br from-white via-white to-accent/5 backdrop-blur-sm rounded-2xl border-4 border-accent/30 shadow-2xl p-8 md:p-12 overflow-hidden">
              {/* Decorative corner flourishes */}
              <div className="absolute top-3 left-3 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />

              {/* Sparkle decorations */}
              <div className="absolute top-2 left-2 text-accent/30 text-xl">
                ✨
              </div>
              <div className="absolute top-2 right-2 text-accent/30 text-xl">
                ✨
              </div>
              <div className="absolute bottom-2 left-2 text-accent/30 text-xl">
                ✨
              </div>
              <div className="absolute bottom-2 right-2 text-accent/30 text-xl">
                ✨
              </div>

              <div className="relative z-10">
                {/* Title */}
                <div className="text-center mb-8">
                  <h3 className="font-pinyon text-3xl md:text-4xl text-primary font-bold mb-3">
                    Thông Tin Chuyển Khoản
                  </h3>

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-12 bg-accent/40" />
                    <span className="text-accent/60">❀</span>
                    <div className="h-px w-12 bg-accent/40" />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                  {/* QR Codes - Both displayed side by side on desktop, stacked on mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {/* Groom QR Code */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-lg" />
                        <div className="relative bg-white rounded-2xl border-4 border-accent/40 shadow-2xl overflow-hidden">
                          <Image
                            src="/assets/my-bank-qr.jpg"
                            alt="Groom Bank QR Code"
                            width={300}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                      {/* Bank details for Groom */}
                      <div className="w-full bg-accent/5 rounded-xl p-6 border border-accent/20">
                        <div className="space-y-3 text-center">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                              Ngân Hàng
                            </p>
                            <p className="font-serif text-lg text-foreground font-semibold">
                              Techcombank
                            </p>
                          </div>
                          <div className="h-px bg-accent/20" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                              Số Tài Khoản
                            </p>
                            <p className="font-mono text-lg text-foreground font-semibold">
                              1919031996
                            </p>
                          </div>
                          <div className="h-px bg-accent/20" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                              Chủ Tài Khoản
                            </p>
                            <p className="font-serif text-lg text-foreground font-semibold">
                              HUYNH DANG KHOA
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bride QR Code */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-lg" />
                        <div className="relative bg-white rounded-2xl border-4 border-accent/40 shadow-2xl overflow-hidden">
                          <Image
                            src="/assets/wife-bank-qr.jpg"
                            alt="Bride Bank QR Code"
                            width={300}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                      {/* Bank details for Bride */}
                      <div className="w-full bg-accent/5 rounded-xl p-6 border border-accent/20">
                        <div className="space-y-3 text-center">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                              Ngân Hàng
                            </p>
                            <p className="font-serif text-lg text-foreground font-semibold">
                              Sacombank
                            </p>
                          </div>
                          <div className="h-px bg-accent/20" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                              Số Tài Khoản
                            </p>
                            <p className="font-mono text-lg text-foreground font-semibold">
                              0501 2906 5394
                            </p>
                          </div>
                          <div className="h-px bg-accent/20" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                              Chủ Tài Khoản
                            </p>
                            <p className="font-serif text-lg text-foreground font-semibold">
                              LUU NGUYEN HONG SUONG
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gratitude message */}
                  <div className="text-center space-y-2 max-w-md">
                    <p className="font-serif text-lg text-muted-foreground italic">
                      Mỗi lời chúc phúc đều làm ấm lòng chúng mình
                    </p>
                    <p className="text-sm text-muted-foreground/80">
                      Cảm ơn bạn đã dành thời gian và tấm lòng 💝
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom message */}
        <div className="text-center mt-12">
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <span className="text-primary/50 text-2xl">❀</span>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <p className="font-serif text-lg text-muted-foreground italic max-w-2xl mx-auto">
            Tình yêu và sự ủng hộ của bạn là món quà quý giá nhất chúng mình có
            thể nhận được 💝
          </p>
        </div>
      </div>
    </section>
  );
}
