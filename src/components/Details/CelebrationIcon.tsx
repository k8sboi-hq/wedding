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
        {/* Gold gradient for petals */}
        <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#f4c430" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>

        {/* Radial gradient for glow */}
        <radialGradient id="glowGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Traditional Vietnamese Apricot Blossom (Hoa Mai) */}

      {/* Background glow */}
      <circle cx="50" cy="50" r="45" fill="url(#glowGradient)" />

      {/* Large center blossom */}
      <g transform="translate(50, 50)">
        {/* Petals */}
        <ellipse cx="0" cy="-12" rx="6" ry="10" fill="url(#petalGradient)" transform="rotate(0)" />
        <ellipse cx="0" cy="-12" rx="6" ry="10" fill="url(#petalGradient)" transform="rotate(72)" />
        <ellipse cx="0" cy="-12" rx="6" ry="10" fill="url(#petalGradient)" transform="rotate(144)" />
        <ellipse cx="0" cy="-12" rx="6" ry="10" fill="url(#petalGradient)" transform="rotate(216)" />
        <ellipse cx="0" cy="-12" rx="6" ry="10" fill="url(#petalGradient)" transform="rotate(288)" />

        {/* Petal outlines */}
        <ellipse cx="0" cy="-12" rx="6" ry="10" stroke="#f4a460" strokeWidth="0.5" fill="none" transform="rotate(0)" opacity="0.6" />
        <ellipse cx="0" cy="-12" rx="6" ry="10" stroke="#f4a460" strokeWidth="0.5" fill="none" transform="rotate(72)" opacity="0.6" />
        <ellipse cx="0" cy="-12" rx="6" ry="10" stroke="#f4a460" strokeWidth="0.5" fill="none" transform="rotate(144)" opacity="0.6" />
        <ellipse cx="0" cy="-12" rx="6" ry="10" stroke="#f4a460" strokeWidth="0.5" fill="none" transform="rotate(216)" opacity="0.6" />
        <ellipse cx="0" cy="-12" rx="6" ry="10" stroke="#f4a460" strokeWidth="0.5" fill="none" transform="rotate(288)" opacity="0.6" />

        {/* Center stamens */}
        <circle cx="0" cy="0" r="3" fill="#f4a460" />
        <g opacity="0.8">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos((angle * Math.PI) / 180) * 4}
              y2={Math.sin((angle * Math.PI) / 180) * 4}
              stroke="#dc143c"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          ))}
        </g>
      </g>

      {/* Upper right blossom */}
      <g transform="translate(70, 30)">
        {/* Petals */}
        <ellipse cx="0" cy="-8" rx="4.5" ry="7" fill="url(#petalGradient)" transform="rotate(0)" />
        <ellipse cx="0" cy="-8" rx="4.5" ry="7" fill="url(#petalGradient)" transform="rotate(72)" />
        <ellipse cx="0" cy="-8" rx="4.5" ry="7" fill="url(#petalGradient)" transform="rotate(144)" />
        <ellipse cx="0" cy="-8" rx="4.5" ry="7" fill="url(#petalGradient)" transform="rotate(216)" />
        <ellipse cx="0" cy="-8" rx="4.5" ry="7" fill="url(#petalGradient)" transform="rotate(288)" />

        {/* Center */}
        <circle cx="0" cy="0" r="2" fill="#f4a460" />
      </g>

      {/* Lower left blossom */}
      <g transform="translate(30, 65)">
        {/* Petals */}
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill="url(#petalGradient)" transform="rotate(0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill="url(#petalGradient)" transform="rotate(72)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill="url(#petalGradient)" transform="rotate(144)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill="url(#petalGradient)" transform="rotate(216)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill="url(#petalGradient)" transform="rotate(288)" />

        {/* Center */}
        <circle cx="0" cy="0" r="1.8" fill="#f4a460" />
      </g>

      {/* Small buds */}
      <g opacity="0.7">
        <ellipse cx="52" cy="47" rx="2.5" ry="4" fill="#ffd700" transform="rotate(-30 52 47)" />
        <ellipse cx="42" cy="52" rx="2" ry="3.5" fill="#ffd700" transform="rotate(20 42 52)" />
        <ellipse cx="60" cy="40" rx="2.5" ry="4" fill="#ffd700" transform="rotate(-45 60 40)" />
      </g>

      {/* Decorative sparkles */}
      <g opacity="0.6">
        <circle cx="45" cy="40" r="1" fill="#ffd700" />
        <circle cx="65" cy="25" r="1.2" fill="#ffd700" />
        <circle cx="55" cy="35" r="0.8" fill="#ffd700" />
        <circle cx="40" cy="55" r="1" fill="#ffd700" />
        <circle cx="25" cy="70" r="1.2" fill="#ffd700" />
      </g>
    </svg>
  );
}
