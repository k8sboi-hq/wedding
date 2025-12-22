interface IconProps {
  className?: string;
}

export function PlayIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* Decorative heart background */}
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="#ffd700"
        opacity="0.15"
      />
      {/* Play triangle with gradient */}
      <defs>
        <linearGradient id="playGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="100%" stopColor="#c41e3a" />
        </linearGradient>
      </defs>
      <path
        d="M8 5.5v13c0 .828.895 1.344 1.614.931l9.5-5.5a1.125 1.125 0 0 0 0-1.862l-9.5-5.5A1.125 1.125 0 0 0 8 5.5z"
        fill="url(#playGradient)"
      />
      {/* Gold accent stroke */}
      <path
        d="M8 5.5v13c0 .828.895 1.344 1.614.931l9.5-5.5a1.125 1.125 0 0 0 0-1.862l-9.5-5.5A1.125 1.125 0 0 0 8 5.5z"
        stroke="#ffd700"
        strokeWidth="0.5"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function PauseIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* Decorative circle background */}
      <circle cx="12" cy="12" r="10" fill="#ffd700" opacity="0.12" />
      <defs>
        <linearGradient id="pauseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="100%" stopColor="#c41e3a" />
        </linearGradient>
      </defs>
      {/* Left bar with decorative caps */}
      <rect x="6.5" y="5" width="3.5" height="14" rx="1.5" fill="url(#pauseGradient)" />
      <rect x="6.5" y="5" width="3.5" height="14" rx="1.5" stroke="#ffd700" strokeWidth="0.5" fill="none" opacity="0.6" />
      {/* Right bar with decorative caps */}
      <rect x="14" y="5" width="3.5" height="14" rx="1.5" fill="url(#pauseGradient)" />
      <rect x="14" y="5" width="3.5" height="14" rx="1.5" stroke="#ffd700" strokeWidth="0.5" fill="none" opacity="0.6" />
      {/* Decorative flourish */}
      <path d="M12 3.5 Q12 4 11.5 4 M12 20.5 Q12 20 12.5 20" stroke="#ffd700" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="chevronLeftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="100%" stopColor="#c41e3a" />
        </linearGradient>
      </defs>
      {/* Main chevron */}
      <path
        d="M15 18l-6-6 6-6"
        stroke="url(#chevronLeftGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative swirl accent */}
      <path
        d="M16.5 6 Q17 5.5 17.5 6"
        stroke="#ffd700"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M16.5 18 Q17 18.5 17.5 18"
        stroke="#ffd700"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="chevronRightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="100%" stopColor="#c41e3a" />
        </linearGradient>
      </defs>
      {/* Main chevron */}
      <path
        d="M9 18l6-6-6-6"
        stroke="url(#chevronRightGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative swirl accent */}
      <path
        d="M7.5 6 Q7 5.5 6.5 6"
        stroke="#ffd700"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M7.5 18 Q7 18.5 6.5 18"
        stroke="#ffd700"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function PreviousIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <defs>
        <linearGradient id="prevGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="100%" stopColor="#c41e3a" />
        </linearGradient>
      </defs>
      {/* Subtle heart detail */}
      <path
        d="M12 4.5c-.3-.3-.7-.5-1.1-.5-.8 0-1.4.6-1.4 1.4 0 .8 1.2 1.6 2.5 2.6 1.3-1 2.5-1.8 2.5-2.6 0-.8-.6-1.4-1.4-1.4-.4 0-.8.2-1.1.5z"
        fill="#ffd700"
        opacity="0.25"
      />
      {/* Double chevron - previous track */}
      <path
        d="M18 18l-6-6 6-6"
        stroke="url(#prevGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18l-6-6 6-6"
        stroke="url(#prevGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Gold accent on chevrons */}
      <path
        d="M18 18l-6-6 6-6 M12 18l-6-6 6-6"
        stroke="#ffd700"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function NextIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <defs>
        <linearGradient id="nextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" />
          <stop offset="100%" stopColor="#c41e3a" />
        </linearGradient>
      </defs>
      {/* Subtle heart detail */}
      <path
        d="M12 4.5c-.3-.3-.7-.5-1.1-.5-.8 0-1.4.6-1.4 1.4 0 .8 1.2 1.6 2.5 2.6 1.3-1 2.5-1.8 2.5-2.6 0-.8-.6-1.4-1.4-1.4-.4 0-.8.2-1.1.5z"
        fill="#ffd700"
        opacity="0.25"
      />
      {/* Double chevron - next track */}
      <path
        d="M6 18l6-6-6-6"
        stroke="url(#nextGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18l6-6-6-6"
        stroke="url(#nextGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Gold accent on chevrons */}
      <path
        d="M6 18l6-6-6-6 M12 18l6-6-6-6"
        stroke="#ffd700"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  );
}
