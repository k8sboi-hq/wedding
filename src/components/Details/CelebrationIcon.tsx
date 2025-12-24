interface CelebrationIconProps {
  className?: string;
}

export default function CelebrationIcon({ className = "w-16 h-16" }: CelebrationIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
    >
      <defs>
        {/* Gold gradient for champagne */}
        <linearGradient id="champagneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#f4c430" />
          <stop offset="100%" stopColor="#e6b800" />
        </linearGradient>

        {/* Glass gradient for shine */}
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#e8f4f8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>

        {/* Radial gradient for glow */}
        <radialGradient id="glowGradient" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Drinking and Toasting Glasses */}

      {/* Background glow */}
      <circle cx="50" cy="40" r="45" fill="url(#glowGradient)" />

      {/* Left glass tilted right */}
      <g transform="rotate(15 35 50)">
        {/* Glass bowl */}
        <path
          d="M 32 35 L 28 55 L 42 55 L 38 35 Z"
          fill="url(#glassGradient)"
          stroke="#b8d4e0"
          strokeWidth="0.8"
        />

        {/* Champagne liquid */}
        <path
          d="M 33 40 L 29 54 L 41 54 L 37 40 Z"
          fill="url(#champagneGradient)"
          opacity="0.85"
        />

        {/* Stem */}
        <rect x="33.5" y="55" width="3" height="15" fill="#d4d4d4" />

        {/* Base */}
        <ellipse cx="35" cy="72" rx="6" ry="2" fill="#b8b8b8" />

        {/* Glass shine */}
        <path
          d="M 33 36 L 32.5 42 L 34 42 L 33.5 36 Z"
          fill="#ffffff"
          opacity="0.6"
        />
      </g>

      {/* Right glass tilted left */}
      <g transform="rotate(-15 65 50)">
        {/* Glass bowl */}
        <path
          d="M 62 35 L 58 55 L 72 55 L 68 35 Z"
          fill="url(#glassGradient)"
          stroke="#b8d4e0"
          strokeWidth="0.8"
        />

        {/* Champagne liquid */}
        <path
          d="M 63 40 L 59 54 L 71 54 L 67 40 Z"
          fill="url(#champagneGradient)"
          opacity="0.85"
        />

        {/* Stem */}
        <rect x="63.5" y="55" width="3" height="15" fill="#d4d4d4" />

        {/* Base */}
        <ellipse cx="65" cy="72" rx="6" ry="2" fill="#b8b8b8" />

        {/* Glass shine */}
        <path
          d="M 63 36 L 62.5 42 L 64 42 L 63.5 36 Z"
          fill="#ffffff"
          opacity="0.6"
        />
      </g>

      {/* Clinking sparkle/splash at top */}
      <g opacity="0.8">
        <circle cx="50" cy="28" r="2" fill="#ffd700" />
        <line x1="50" y1="24" x2="50" y2="32" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="46" y1="28" x2="54" y2="28" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="47" y1="25" x2="53" y2="31" stroke="#ffd700" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="53" y1="25" x2="47" y2="31" stroke="#ffd700" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Champagne bubbles rising from left glass */}
      <g opacity="0.7">
        <circle cx="30" cy="48" r="1.2" fill="#ffd700" />
        <circle cx="33" cy="44" r="1" fill="#ffd700" />
        <circle cx="36" cy="40" r="0.8" fill="#ffd700" />
        <circle cx="32" cy="50" r="1" fill="#ffd700" />
        <circle cx="38" cy="46" r="0.9" fill="#ffd700" />
      </g>

      {/* Champagne bubbles rising from right glass */}
      <g opacity="0.7">
        <circle cx="62" cy="48" r="1.2" fill="#ffd700" />
        <circle cx="65" cy="44" r="1" fill="#ffd700" />
        <circle cx="68" cy="40" r="0.8" fill="#ffd700" />
        <circle cx="64" cy="50" r="1" fill="#ffd700" />
        <circle cx="60" cy="46" r="0.9" fill="#ffd700" />
      </g>

      {/* Decorative sparkles around the scene */}
      <g opacity="0.6">
        <circle cx="20" cy="35" r="1.5" fill="#ffd700" />
        <circle cx="80" cy="35" r="1.5" fill="#ffd700" />
        <circle cx="25" cy="25" r="1" fill="#ffd700" />
        <circle cx="75" cy="25" r="1" fill="#ffd700" />
        <circle cx="45" cy="20" r="1.2" fill="#ffd700" />
        <circle cx="55" cy="20" r="1.2" fill="#ffd700" />
        <circle cx="15" cy="45" r="1" fill="#ffd700" />
        <circle cx="85" cy="45" r="1" fill="#ffd700" />
      </g>

      {/* Small splash particles */}
      <g opacity="0.5">
        <circle cx="48" cy="26" r="0.8" fill="#f4c430" />
        <circle cx="52" cy="26" r="0.8" fill="#f4c430" />
        <circle cx="46" cy="30" r="0.6" fill="#f4c430" />
        <circle cx="54" cy="30" r="0.6" fill="#f4c430" />
      </g>
    </svg>
  );
}
