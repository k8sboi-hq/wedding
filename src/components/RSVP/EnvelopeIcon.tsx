interface EnvelopeIconProps {
  className?: string;
}

export default function EnvelopeIcon({ className = "w-16 h-16" }: EnvelopeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="50%" stopColor="#c41e3a" />
          <stop offset="100%" stopColor="#dc143c" />
        </linearGradient>

        <linearGradient id="sealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#f4c430" />
        </linearGradient>

        <filter id="envelopeGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Decorative outer glow */}
      <circle cx="32" cy="32" r="30" fill="#ffd700" opacity="0.1" />

      {/* Envelope back flap (bottom layer) */}
      <path
        d="M8 22 L32 36 L56 22 L56 44 Q56 46 54 46 L10 46 Q8 46 8 44 Z"
        fill="url(#envelopeGradient)"
        opacity="0.9"
      />

      {/* Envelope body with gradient */}
      <rect
        x="8"
        y="22"
        width="48"
        height="24"
        rx="2"
        fill="url(#envelopeGradient)"
        filter="url(#envelopeGlow)"
      />

      {/* Gold decorative border */}
      <rect
        x="8"
        y="22"
        width="48"
        height="24"
        rx="2"
        stroke="#ffd700"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />

      {/* Decorative corner flourishes */}
      <g opacity="0.8">
        {/* Top-left flourish */}
        <path
          d="M10 24 Q10 23 11 23 L13 23"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M10 24 Q10 25 10 26"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Top-right flourish */}
        <path
          d="M54 24 Q54 23 53 23 L51 23"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M54 24 Q54 25 54 26"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Bottom-left flourish */}
        <path
          d="M10 44 Q10 45 11 45 L13 45"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M10 44 Q10 43 10 42"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Bottom-right flourish */}
        <path
          d="M54 44 Q54 45 53 45 L51 45"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M54 44 Q54 43 54 42"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />
      </g>

      {/* Envelope flap (top layer) */}
      <path
        d="M8 22 L32 36 L56 22 L32 10 Z"
        fill="#c41e3a"
        filter="url(#envelopeGlow)"
      />

      {/* Flap border */}
      <path
        d="M8 22 L32 36 L56 22 L32 10 Z"
        stroke="#ffd700"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />

      {/* Decorative lines on flap */}
      <g opacity="0.5">
        <line x1="20" y1="18" x2="26" y2="22" stroke="#ffd700" strokeWidth="0.6" />
        <line x1="38" y1="22" x2="44" y2="18" stroke="#ffd700" strokeWidth="0.6" />
      </g>

      {/* Wax seal with Double Happiness symbol */}
      <circle
        cx="32"
        cy="34"
        r="9"
        fill="url(#sealGradient)"
        filter="url(#envelopeGlow)"
      />

      {/* Seal border */}
      <circle
        cx="32"
        cy="34"
        r="9"
        stroke="#dc143c"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />

      {/* Decorative seal edge */}
      <circle
        cx="32"
        cy="34"
        r="8"
        stroke="#dc143c"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
        strokeDasharray="2 1"
      />

      {/* Double Happiness character on seal */}
      <text
        x="32"
        y="37"
        fontFamily="serif"
        fontSize="10"
        fill="#dc143c"
        textAnchor="middle"
        fontWeight="bold"
      >
        囍
      </text>

      {/* Decorative sparkles around seal */}
      <g opacity="0.7">
        <circle cx="24" cy="28" r="0.8" fill="#ffd700" />
        <circle cx="40" cy="28" r="0.8" fill="#ffd700" />
        <circle cx="24" cy="40" r="0.8" fill="#ffd700" />
        <circle cx="40" cy="40" r="0.8" fill="#ffd700" />
      </g>

      {/* Top decorative ribbon/bow */}
      <g opacity="0.6">
        <path
          d="M28 12 Q32 10 36 12"
          stroke="#ffd700"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="26" cy="13" r="1.5" fill="#ffd700" />
        <circle cx="38" cy="13" r="1.5" fill="#ffd700" />
      </g>

      {/* Bottom decorative elements */}
      <g opacity="0.4">
        <path
          d="M14 34 Q16 33 18 34"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M46 34 Q48 33 50 34"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
        />
      </g>
    </svg>
  );
}
