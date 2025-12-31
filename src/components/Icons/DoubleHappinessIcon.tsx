interface DoubleHappinessIconProps {
  className?: string;
}

export default function WeddingHouseIcon({
  className = "w-16 h-16",
}: DoubleHappinessIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
    >
      <defs>
        {/* Gradient for house walls */}
        <linearGradient
          id="houseWallGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#fff5e6" />
          <stop offset="100%" stopColor="#f5e6d3" />
        </linearGradient>

        {/* Gradient for roof */}
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="50%" stopColor="#c41e3a" />
          <stop offset="100%" stopColor="#a01828" />
        </linearGradient>

        {/* Gradient for door */}
        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b4513" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>

        {/* Gradient for happiness character */}
        <linearGradient
          id="doubleHappinessGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#f4c430" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow with romantic tones */}
      <circle cx="50" cy="50" r="45" fill="#ffd700" opacity="0.08" />
      <circle cx="50" cy="50" r="40" fill="#ff91a4" opacity="0.05" />

      {/* Traditional Vietnamese house */}

      {/* Roof - traditional curved style */}
      <path
        d="M 15 35 Q 50 25 85 35 L 80 40 Q 50 32 20 40 Z"
        fill="url(#roofGradient)"
        stroke="#a01828"
        strokeWidth="1"
      />

      {/* Roof decorative ridge with gold */}
      <path
        d="M 15 35 Q 50 25 85 35"
        stroke="#ffd700"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />

      {/* Floral garland along roof */}
      <g opacity="0.6">
        <circle cx="30" cy="32" r="1.5" fill="#ff91a4" />
        <circle cx="40" cy="29" r="1.5" fill="#ff6b9d" />
        <circle cx="50" cy="27" r="1.5" fill="#ff91a4" />
        <circle cx="60" cy="29" r="1.5" fill="#ff6b9d" />
        <circle cx="70" cy="32" r="1.5" fill="#ff91a4" />
        <circle cx="35" cy="30" r="1" fill="#ffd700" />
        <circle cx="45" cy="28" r="1" fill="#ffd700" />
        <circle cx="55" cy="28" r="1" fill="#ffd700" />
        <circle cx="65" cy="30" r="1" fill="#ffd700" />
      </g>

      {/* Main house body */}
      <rect
        x="20"
        y="40"
        width="60"
        height="45"
        fill="url(#houseWallGradient)"
        stroke="#d4a574"
        strokeWidth="1.5"
      />

      {/* Left window with warm amber glow */}
      <rect
        x="28"
        y="48"
        width="12"
        height="12"
        fill="#ffe4b3"
        stroke="#654321"
        strokeWidth="1"
        opacity="0.9"
      />
      <rect
        x="29"
        y="49"
        width="10"
        height="10"
        fill="#ffd700"
        opacity="0.2"
      />
      <line
        x1="34"
        y1="48"
        x2="34"
        y2="60"
        stroke="#8b6914"
        strokeWidth="0.8"
      />
      <line
        x1="28"
        y1="54"
        x2="40"
        y2="54"
        stroke="#8b6914"
        strokeWidth="0.8"
      />

      {/* Right window with warm amber glow */}
      <rect
        x="60"
        y="48"
        width="12"
        height="12"
        fill="#ffe4b3"
        stroke="#654321"
        strokeWidth="1"
        opacity="0.9"
      />
      <rect
        x="61"
        y="49"
        width="10"
        height="10"
        fill="#ffd700"
        opacity="0.2"
      />
      <line
        x1="66"
        y1="48"
        x2="66"
        y2="60"
        stroke="#8b6914"
        strokeWidth="0.8"
      />
      <line
        x1="60"
        y1="54"
        x2="72"
        y2="54"
        stroke="#8b6914"
        strokeWidth="0.8"
      />

      {/* Door */}
      <rect
        x="43"
        y="60"
        width="14"
        height="25"
        fill="url(#doorGradient)"
        stroke="#654321"
        strokeWidth="1.2"
        rx="1"
      />

      {/* Door panels */}
      <rect
        x="44.5"
        y="62"
        width="11"
        height="10"
        fill="none"
        stroke="#8b6914"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <rect
        x="44.5"
        y="73"
        width="11"
        height="10"
        fill="none"
        stroke="#8b6914"
        strokeWidth="0.6"
        opacity="0.5"
      />

      {/* Door handle with elegant detail */}
      <circle cx="53" cy="75" r="1.2" fill="#ffd700" />
      <circle cx="53" cy="75" r="0.6" fill="#f4c430" />

      {/* Red decorative banner above door */}
      <rect
        x="40"
        y="55"
        width="20"
        height="4"
        fill="#dc143c"
        stroke="#a01828"
        strokeWidth="0.5"
      />

      {/* Small roses flanking the double happiness character */}
      <g opacity="0.7">
        {/* Left rose */}
        <circle cx="42" cy="57" r="1" fill="#ff6b9d" />
        <circle cx="41.5" cy="56.5" r="0.5" fill="#ff91a4" />

        {/* Right rose */}
        <circle cx="58" cy="57" r="1" fill="#ff6b9d" />
        <circle cx="58.5" cy="56.5" r="0.5" fill="#ff91a4" />
      </g>

      {/* Shadow layer for happiness character */}
      <text
        x="50"
        y="59"
        fontFamily="serif"
        fontSize="10"
        fill="#000000"
        textAnchor="middle"
        fontWeight="bold"
        opacity="0.15"
      >
        囍
      </text>

      {/* Main Double Happiness character on the banner */}
      <text
        x="50"
        y="58.5"
        fontFamily="serif"
        fontSize="10"
        fill="url(#doubleHappinessGradient)"
        textAnchor="middle"
        fontWeight="bold"
        filter="url(#glow)"
      >
        囍
      </text>

      {/* Foundation/base */}
      <rect x="18" y="85" width="64" height="3" fill="#8b7355" opacity="0.6" />

      {/* Decorative plants on sides */}
      <g opacity="0.6">
        {/* Left plant */}
        <ellipse cx="15" cy="82" rx="3" ry="5" fill="#6b8e23" />
        <ellipse cx="13" cy="80" rx="2.5" ry="4" fill="#6b8e23" />
        <ellipse cx="17" cy="81" rx="2" ry="3.5" fill="#6b8e23" />

        {/* Right plant */}
        <ellipse cx="85" cy="82" rx="3" ry="5" fill="#6b8e23" />
        <ellipse cx="83" cy="80" rx="2.5" ry="4" fill="#6b8e23" />
        <ellipse cx="87" cy="81" rx="2" ry="3.5" fill="#6b8e23" />
      </g>

      {/* Hanging red lanterns on sides */}
      <g opacity="0.8">
        {/* Left lantern */}
        <line x1="20" y1="32" x2="20" y2="36" stroke="#dc143c" strokeWidth="0.5" />
        <ellipse cx="20" cy="38" rx="3" ry="4" fill="#dc143c" stroke="#a01828" strokeWidth="0.5" />
        <rect x="19" y="36" width="2" height="1" fill="#ffd700" opacity="0.6" />
        <line x1="20" y1="42" x2="20" y2="43" stroke="#ffd700" strokeWidth="0.8" />

        {/* Right lantern */}
        <line x1="80" y1="32" x2="80" y2="36" stroke="#dc143c" strokeWidth="0.5" />
        <ellipse cx="80" cy="38" rx="3" ry="4" fill="#dc143c" stroke="#a01828" strokeWidth="0.5" />
        <rect x="79" y="36" width="2" height="1" fill="#ffd700" opacity="0.6" />
        <line x1="80" y1="42" x2="80" y2="43" stroke="#ffd700" strokeWidth="0.8" />
      </g>

      {/* Heart decorations near roof */}
      <g opacity="0.6">
        {/* Left heart */}
        <path d="M 28 33 Q 26 31 24 33 Q 22 35 24 37 L 28 40 L 32 37 Q 34 35 32 33 Q 30 31 28 33" fill="#ff6b9d" />

        {/* Right heart */}
        <path d="M 72 33 Q 70 31 68 33 Q 66 35 68 37 L 72 40 L 76 37 Q 78 35 76 33 Q 74 31 72 33" fill="#ff6b9d" />
      </g>

      {/* Enhanced floral decorations */}
      <g opacity="0.7">
        {/* Left flower cluster */}
        <circle cx="12" cy="78" r="2" fill="#ff6b9d" />
        <circle cx="10" cy="76" r="1.5" fill="#ff91a4" />
        <circle cx="14" cy="76" r="1.5" fill="#ff91a4" />
        <circle cx="12" cy="75" r="1" fill="#ffd700" />

        {/* Right flower cluster */}
        <circle cx="88" cy="78" r="2" fill="#ff6b9d" />
        <circle cx="86" cy="76" r="1.5" fill="#ff91a4" />
        <circle cx="90" cy="76" r="1.5" fill="#ff91a4" />
        <circle cx="88" cy="75" r="1" fill="#ffd700" />
      </g>

      {/* Gold sparkles around the house */}
      <g opacity="0.6">
        <circle cx="15" cy="42" r="1" fill="#ffd700" />
        <circle cx="85" cy="42" r="1" fill="#ffd700" />
        <circle cx="25" cy="28" r="0.8" fill="#ffd700" />
        <circle cx="75" cy="28" r="0.8" fill="#ffd700" />
        <circle cx="50" cy="22" r="1.2" fill="#ffd700" />
        <circle cx="35" cy="25" r="0.6" fill="#ffd700" />
        <circle cx="65" cy="25" r="0.6" fill="#ffd700" />
      </g>
    </svg>
  );
}
