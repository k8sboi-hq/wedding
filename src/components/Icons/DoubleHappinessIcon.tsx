interface DoubleHappinessIconProps {
  className?: string;
}

export default function DoubleHappinessIcon({
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

      {/* Background glow */}
      <circle cx="50" cy="50" r="45" fill="#ffd700" opacity="0.1" />

      {/* Traditional Vietnamese house */}

      {/* Roof - traditional curved style */}
      <path
        d="M 15 35 Q 50 25 85 35 L 80 40 Q 50 32 20 40 Z"
        fill="url(#roofGradient)"
        stroke="#a01828"
        strokeWidth="1"
      />

      {/* Roof decorative ridge */}
      <path
        d="M 15 35 Q 50 25 85 35"
        stroke="#ffd700"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />

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

      {/* Left window */}
      <rect
        x="28"
        y="48"
        width="12"
        height="12"
        fill="#87CEEB"
        stroke="#654321"
        strokeWidth="1"
        opacity="0.7"
      />
      <line x1="34" y1="48" x2="34" y2="60" stroke="#654321" strokeWidth="0.8" />
      <line x1="28" y1="54" x2="40" y2="54" stroke="#654321" strokeWidth="0.8" />

      {/* Right window */}
      <rect
        x="60"
        y="48"
        width="12"
        height="12"
        fill="#87CEEB"
        stroke="#654321"
        strokeWidth="1"
        opacity="0.7"
      />
      <line x1="66" y1="48" x2="66" y2="60" stroke="#654321" strokeWidth="0.8" />
      <line x1="60" y1="54" x2="72" y2="54" stroke="#654321" strokeWidth="0.8" />

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

      {/* Door handle */}
      <circle cx="53" cy="75" r="1" fill="#ffd700" />

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
      <rect
        x="18"
        y="85"
        width="64"
        height="3"
        fill="#8b7355"
        opacity="0.6"
      />

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

      {/* Gold sparkles around the house */}
      <g opacity="0.5">
        <circle cx="12" cy="38" r="1" fill="#ffd700" />
        <circle cx="88" cy="38" r="1" fill="#ffd700" />
        <circle cx="25" cy="30" r="0.8" fill="#ffd700" />
        <circle cx="75" cy="30" r="0.8" fill="#ffd700" />
        <circle cx="50" cy="22" r="1.2" fill="#ffd700" />
      </g>
    </svg>
  );
}
