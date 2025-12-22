export default function HeartFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative inline-block ">
      {/* Heart-shaped SVG frame */}
      <svg
        viewBox="0 0 200 200"
        className="w-64 h-64 md:w-56 md:h-56 sm:w-48 sm:h-48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for heart */}
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#ff6b6b", stopOpacity: 0.3 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#c92a2a", stopOpacity: 0.3 }}
            />
          </linearGradient>

          {/* Pattern for decorative elements */}
          <pattern
            id="flowerPattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="2" fill="#ffd700" opacity="0.4" />
          </pattern>
        </defs>

        {/* Main heart shape */}
        <path
          d="M100,170 C100,170 30,120 30,80 C30,55 45,40 65,40 C80,40 90,50 100,65 C110,50 120,40 135,40 C155,40 170,55 170,80 C170,120 100,170 100,170 Z"
          fill="url(#heartGradient)"
          stroke="#c92a2a"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Decorative inner border */}
        <path
          d="M100,160 C100,160 40,115 40,80 C40,60 52,48 68,48 C82,48 92,58 100,70 C108,58 118,48 132,48 C148,48 160,60 160,80 C160,115 100,160 100,160 Z"
          fill="none"
          stroke="#ffd700"
          strokeWidth="1.5"
          strokeDasharray="3,3"
          opacity="0.6"
        />

        {/* Decorative flowers/leaves around the heart */}
        {/* Top left flower */}
        <g transform="translate(50, 45)">
          <circle cx="0" cy="0" r="4" fill="#ffd700" opacity="0.7" />
          <circle cx="-4" cy="-2" r="3" fill="#ffd700" opacity="0.5" />
          <circle cx="4" cy="-2" r="3" fill="#ffd700" opacity="0.5" />
          <circle cx="0" cy="-4" r="3" fill="#ffd700" opacity="0.5" />
        </g>

        {/* Top right flower */}
        <g transform="translate(150, 45)">
          <circle cx="0" cy="0" r="4" fill="#ffd700" opacity="0.7" />
          <circle cx="-4" cy="-2" r="3" fill="#ffd700" opacity="0.5" />
          <circle cx="4" cy="-2" r="3" fill="#ffd700" opacity="0.5" />
          <circle cx="0" cy="-4" r="3" fill="#ffd700" opacity="0.5" />
        </g>

        {/* Bottom flowers */}
        <g transform="translate(85, 155)">
          <circle cx="0" cy="0" r="3" fill="#ffa500" opacity="0.6" />
          <circle cx="-3" cy="2" r="2" fill="#ffa500" opacity="0.4" />
          <circle cx="3" cy="2" r="2" fill="#ffa500" opacity="0.4" />
        </g>

        <g transform="translate(115, 155)">
          <circle cx="0" cy="0" r="3" fill="#ffa500" opacity="0.6" />
          <circle cx="-3" cy="2" r="2" fill="#ffa500" opacity="0.4" />
          <circle cx="3" cy="2" r="2" fill="#ffa500" opacity="0.4" />
        </g>

        {/* Decorative leaves */}
        <ellipse
          cx="35"
          cy="70"
          rx="8"
          ry="4"
          fill="#ff6b6b"
          opacity="0.3"
          transform="rotate(-45 35 70)"
        />
        <ellipse
          cx="165"
          cy="70"
          rx="8"
          ry="4"
          fill="#ff6b6b"
          opacity="0.3"
          transform="rotate(45 165 70)"
        />
      </svg>

      {/* Content inside heart */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center">
        {children}
      </div>
    </div>
  );
}
