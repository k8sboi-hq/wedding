import { WEDDING_DATA } from "@/lib/constants";
import { SVG_PATTERNS } from "@/lib/svgPatterns";

export default function Footer() {
  const { couple, dates } = WEDDING_DATA;

  return (
    <footer
      className="relative bg-gradient-to-b from-background via-primary/5 to-background py-20 overflow-hidden"
      style={{
        backgroundImage: SVG_PATTERNS.footerPattern,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 text-accent">
        囍
      </div>
      <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 text-accent">
        囍
      </div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-8xl opacity-5 text-primary">
        ❤️
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Thank You Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-gradient-to-br from-white via-white to-accent/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-accent/30 overflow-hidden">
            {/* Decorative corner flourishes */}
            <div className="absolute top-3 left-3 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />

            {/* Heart decorations */}
            <div className="absolute top-2 left-2 text-accent/30 text-xl">
              💝
            </div>
            <div className="absolute top-2 right-2 text-accent/30 text-xl">
              💝
            </div>
            <div className="absolute bottom-2 left-2 text-accent/30 text-xl">
              💝
            </div>
            <div className="absolute bottom-2 right-2 text-accent/30 text-xl">
              💝
            </div>

            <div className="relative z-10 text-center">
              {/* Title */}
              <h2 className="font-pinyon text-4xl md:text-5xl text-primary font-bold mb-4">
                Lời Cảm Ơn
              </h2>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-accent" />
                <span className="text-accent text-2xl">✦</span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-accent" />
              </div>

              {/* Thank you message */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed">
                  Chúng mình xin chân thành cảm ơn tất cả những lời chúc phúc và
                  món quà ý nghĩa
                </p>
                <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                  Mỗi lời chúc, mỗi món quà đều là nguồn động viên lớn lao giúp
                  chúng mình bắt đầu hành trình mới với đầy niềm tin và hạnh
                  phúc
                </p>
                <p className="font-serif text-base text-muted-foreground italic mt-6">
                  Sự hiện diện và tình cảm của quý khách là món quà vô giá nhất
                  🙏
                </p>
              </div>

              {/* Decorative elements */}
              <div className="flex justify-center gap-4 mt-8 text-3xl">
                <span className="animate-[fadeIn_2s_ease-out]">🌸</span>
                <span className="animate-[fadeIn_2.2s_ease-out]">💐</span>
                <span className="animate-[fadeIn_2.4s_ease-out]">🌹</span>
                <span className="animate-[fadeIn_2.6s_ease-out]">💖</span>
                <span className="animate-[fadeIn_2.8s_ease-out]">✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Couple Information */}
        <div className="text-center mb-8">
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <span className="text-primary/50 text-2xl">❀</span>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          {/* Names */}
          <p className="font-pinyon text-3xl md:text-4xl text-primary mb-3">
            {couple.groom.firstName} & {couple.bride.firstName}
          </p>

          {/* Date */}
          <p className="font-serif text-lg text-muted-foreground mb-2">
            {dates.mainWedding.dateDisplay}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <span className="text-primary/50 text-2xl">❀</span>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for our special day
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            © 2026 {couple.groom.firstName} & {couple.bride.firstName}. All
            Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
