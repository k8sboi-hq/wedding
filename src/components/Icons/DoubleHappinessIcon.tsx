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
      {/* Outer decorative circle - Gold */}
      <circle cx="50" cy="50" r="45" fill="#ffd700" opacity="0.15" />
      <circle
        cx="50"
        cy="50"
        r="42"
        stroke="#ffd700"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />

      {/* Inner decorative circle - Red */}
      <circle cx="50" cy="50" r="38" fill="#dc143c" opacity="0.08" />

      {/* Double Happiness character with gradient effect */}
      <defs>
        <linearGradient
          id="doubleHappinessGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="50%" stopColor="#c41e3a" />
          <stop offset="100%" stopColor="#dc143c" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shadow layer */}
      <text
        x="50"
        y="63"
        fontFamily="serif"
        fontSize="42"
        fill="#000000"
        textAnchor="middle"
        fontWeight="bold"
        opacity="0.1"
      >
        囍
      </text>

      {/* Main Double Happiness character */}
      <text
        x="50"
        y="62"
        fontFamily="serif"
        fontSize="42"
        fill="url(#doubleHappinessGradient)"
        textAnchor="middle"
        fontWeight="bold"
        filter="url(#glow)"
      >
        囍
      </text>

      {/* Gold outline for the character */}
      <text
        x="50"
        y="62"
        fontFamily="serif"
        fontSize="42"
        fill="none"
        stroke="#ffd700"
        strokeWidth="0.5"
        textAnchor="middle"
        fontWeight="bold"
        opacity="0.6"
      >
        囍
      </text>
    </svg>
  );
}
