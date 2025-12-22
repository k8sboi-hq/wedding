interface CoupleIllustrationProps {
  className?: string;
}

export default function CoupleIllustration({ className = "w-64 h-64" }: CoupleIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
      fill="none"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="groomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c3e50" />
          <stop offset="100%" stopColor="#1a252f" />
        </linearGradient>

        <linearGradient id="brideGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="50%" stopColor="#c41e3a" />
          <stop offset="100%" stopColor="#dc143c" />
        </linearGradient>

        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#f4c430" />
        </linearGradient>

        <radialGradient id="bgGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx="100" cy="100" r="95" fill="url(#bgGlow)" />

      {/* Decorative circle frame */}
      <circle
        cx="100"
        cy="100"
        r="85"
        stroke="#ffd700"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />

      {/* GROOM - Simple silhouette (Left) */}
      <g transform="translate(60, 90)">
        {/* Head circle */}
        <circle cx="0" cy="0" r="18" fill="#2c3e50" />

        {/* Glasses accent */}
        <g stroke="#ffd700" strokeWidth="1.5" fill="none" opacity="0.8">
          <circle cx="-6" cy="0" r="4" />
          <circle cx="6" cy="0" r="4" />
          <line x1="-2" y1="0" x2="2" y2="0" />
        </g>

        {/* Body - Áo dài style */}
        <path
          d="M-12 20 L-15 65 L-8 65 L-5 45 L0 40 L0 65 L-8 65"
          fill="url(#groomGradient)"
          stroke="#ffd700"
          strokeWidth="0.5"
        />
        <path
          d="M12 20 L15 65 L8 65 L5 45 L0 40 L0 65 L8 65"
          fill="url(#groomGradient)"
          stroke="#ffd700"
          strokeWidth="0.5"
        />

        {/* Mandarin collar */}
        <rect
          x="-8"
          y="18"
          width="16"
          height="4"
          rx="1"
          fill="#2c3e50"
          stroke="#ffd700"
          strokeWidth="0.5"
        />

        {/* Decorative center line */}
        <line x1="0" y1="22" x2="0" y2="50" stroke="#ffd700" strokeWidth="0.8" opacity="0.6" />

        {/* Gold button */}
        <circle cx="0" cy="24" r="1.5" fill="#ffd700" />
      </g>

      {/* BRIDE - Simple silhouette (Right) */}
      <g transform="translate(140, 90)">
        {/* Head circle */}
        <circle cx="0" cy="0" r="18" fill="#dc143c" opacity="0.3" />

        {/* Hair bun */}
        <circle cx="0" cy="-15" r="8" fill="#2c2c2c" />
        <circle cx="0" cy="-8" r="12" fill="#2c2c2c" />

        {/* Gold hair ornaments */}
        <circle cx="-10" cy="-10" r="3" fill="#ffd700" />
        <circle cx="10" cy="-10" r="3" fill="#ffd700" />

        {/* Face accent - simplified */}
        <circle cx="0" cy="2" r="14" fill="#f4c2a4" opacity="0.9" />

        {/* Body - Áo dài style */}
        <path
          d="M-12 20 L-16 65 L-8 65 L-5 45 L0 40 L0 65 L-8 65"
          fill="url(#brideGradient)"
          stroke="#ffd700"
          strokeWidth="0.5"
        />
        <path
          d="M12 20 L16 65 L8 65 L5 45 L0 40 L0 65 L8 65"
          fill="url(#brideGradient)"
          stroke="#ffd700"
          strokeWidth="0.5"
        />

        {/* Mandarin collar */}
        <rect
          x="-8"
          y="18"
          width="16"
          height="4"
          rx="1"
          fill="#dc143c"
          stroke="#ffd700"
          strokeWidth="0.5"
        />

        {/* Decorative embroidery */}
        <g opacity="0.6">
          <circle cx="-5" cy="30" r="2" fill="#ffd700" />
          <circle cx="0" cy="32" r="2.5" fill="#ffd700" />
          <circle cx="5" cy="30" r="2" fill="#ffd700" />
          <path d="M-5 30 Q0 35 5 30" stroke="#ffd700" strokeWidth="0.5" fill="none" />
        </g>

        {/* Decorative center line */}
        <line x1="0" y1="22" x2="0" y2="50" stroke="#ffd700" strokeWidth="0.8" opacity="0.6" />

        {/* Gold button */}
        <circle cx="0" cy="24" r="1.5" fill="#ffd700" />
      </g>

      {/* Central heart with Double Happiness */}
      <g transform="translate(100, 110)">
        {/* Heart shape */}
        <path
          d="M0 10 L-10 0 Q-15 -5 -15 -10 Q-15 -15 -10 -18 Q-5 -20 0 -15 Q5 -20 10 -18 Q15 -15 15 -10 Q15 -5 10 0 Z"
          fill="#dc143c"
          opacity="0.2"
        />
        <path
          d="M0 10 L-10 0 Q-15 -5 -15 -10 Q-15 -15 -10 -18 Q-5 -20 0 -15 Q5 -20 10 -18 Q15 -15 15 -10 Q15 -5 10 0 Z"
          stroke="#dc143c"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Double Happiness symbol */}
        <text
          x="0"
          y="0"
          fontFamily="serif"
          fontSize="14"
          fill="#dc143c"
          textAnchor="middle"
          fontWeight="bold"
        >
          囍
        </text>
      </g>

      {/* Apricot blossoms - minimalist */}
      <g opacity="0.4">
        {/* Top left */}
        <g transform="translate(40, 50)">
          <circle cx="0" cy="0" r="2" fill="#ffd700" />
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 4}
              cy={Math.sin((angle * Math.PI) / 180) * 4}
              rx="2"
              ry="3"
              fill="#ffd700"
            />
          ))}
        </g>

        {/* Top right */}
        <g transform="translate(160, 50)">
          <circle cx="0" cy="0" r="2" fill="#ffd700" />
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 4}
              cy={Math.sin((angle * Math.PI) / 180) * 4}
              rx="2"
              ry="3"
              fill="#ffd700"
            />
          ))}
        </g>

        {/* Bottom left */}
        <g transform="translate(30, 160)">
          <circle cx="0" cy="0" r="1.5" fill="#ffd700" />
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 3}
              cy={Math.sin((angle * Math.PI) / 180) * 3}
              rx="1.5"
              ry="2.5"
              fill="#ffd700"
            />
          ))}
        </g>

        {/* Bottom right */}
        <g transform="translate(170, 160)">
          <circle cx="0" cy="0" r="1.5" fill="#ffd700" />
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 3}
              cy={Math.sin((angle * Math.PI) / 180) * 3}
              rx="1.5"
              ry="2.5"
              fill="#ffd700"
            />
          ))}
        </g>
      </g>

      {/* Top decorative Double Happiness */}
      <text
        x="100"
        y="35"
        fontFamily="serif"
        fontSize="20"
        fill="#ffd700"
        textAnchor="middle"
        fontWeight="bold"
        opacity="0.15"
      >
        囍
      </text>

      {/* Decorative sparkles */}
      <g opacity="0.5" fill="#ffd700">
        <circle cx="50" cy="70" r="1.5" />
        <circle cx="150" cy="70" r="1.5" />
        <circle cx="45" cy="130" r="1.2" />
        <circle cx="155" cy="130" r="1.2" />
        <circle cx="100" cy="25" r="1.8" />
      </g>

      {/* Decorative connecting ribbons */}
      <g opacity="0.2" stroke="#ffd700" strokeWidth="1" fill="none">
        <path d="M75 85 Q100 80 125 85" />
        <path d="M75 95 Q100 90 125 95" />
      </g>
    </svg>
  );
}
