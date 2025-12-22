import { WEDDING_DATA } from "@/lib/constants";
import { SVG_PATTERNS } from "@/lib/svgPatterns";

export default function Footer() {
  const { couple, dates } = WEDDING_DATA;

  return (
    <footer
      className="relative bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8 overflow-hidden"
      style={{ backgroundImage: SVG_PATTERNS.footerPattern, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-5">
        囍
      </div>
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 text-6xl opacity-5">
        囍
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <p className="font-serif text-xl mb-2">
          {couple.groom.fullName} & {couple.bride.fullName}
        </p>
        <p className="text-sm opacity-90">
          {dates.mainWedding.dateDisplay}
        </p>
        <p className="text-xs mt-4 opacity-75">
          © 2025 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
