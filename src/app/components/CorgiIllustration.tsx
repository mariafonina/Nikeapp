interface CorgiIllustrationProps {
  type: string;
  className?: string;
}

export function CorgiIllustration({ type, className = '' }: CorgiIllustrationProps) {
  const renderCorgi = () => {
    switch (type) {
      case 'sitting':
        return (
          <svg viewBox="0 0 80 80" fill="none" className={`w-full h-full ${className}`}>
            {/* Body */}
            <ellipse cx="40" cy="50" rx="20" ry="18" fill="#1a1a1a" />
            {/* Head */}
            <circle cx="40" cy="30" r="16" fill="#1a1a1a" />
            {/* Ears */}
            <ellipse cx="30" cy="20" rx="6" ry="12" fill="#1a1a1a" />
            <ellipse cx="50" cy="20" rx="6" ry="12" fill="#1a1a1a" />
            {/* Eyes */}
            <circle cx="35" cy="28" r="3" fill="white" />
            <circle cx="45" cy="28" r="3" fill="white" />
            <circle cx="36" cy="28" r="1.5" fill="#1a1a1a" />
            <circle cx="46" cy="28" r="1.5" fill="#1a1a1a" />
            {/* Nose */}
            <ellipse cx="40" cy="34" rx="2" ry="1.5" fill="#1a1a1a" />
            {/* Tail */}
            <ellipse cx="55" cy="48" rx="8" ry="4" fill="#1a1a1a" transform="rotate(-30 55 48)" />
            {/* Legs */}
            <rect x="32" y="62" width="6" height="12" rx="3" fill="#1a1a1a" />
            <rect x="42" y="62" width="6" height="12" rx="3" fill="#1a1a1a" />
          </svg>
        );
      
      case 'sleep':
        return (
          <svg viewBox="0 0 80 80" fill="none" className={`w-full h-full ${className}`}>
            {/* Body */}
            <ellipse cx="45" cy="50" rx="22" ry="15" fill="#1a1a1a" />
            {/* Head */}
            <circle cx="30" cy="45" r="14" fill="#1a1a1a" />
            {/* Ear */}
            <ellipse cx="25" cy="38" rx="5" ry="10" fill="#1a1a1a" transform="rotate(-20 25 38)" />
            {/* Closed eyes */}
            <path d="M 24 44 Q 27 46 30 44" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Zzz */}
            <text x="55" y="30" fill="#1a1a1a" fontSize="12" fontWeight="bold">Z</text>
            <text x="62" y="22" fill="#1a1a1a" fontSize="10" fontWeight="bold">z</text>
            <text x="68" y="16" fill="#1a1a1a" fontSize="8" fontWeight="bold">z</text>
          </svg>
        );
      
      case 'play':
        return (
          <svg viewBox="0 0 80 80" fill="none" className={`w-full h-full ${className}`}>
            {/* Body - playful pose */}
            <ellipse cx="45" cy="48" rx="18" ry="16" fill="#1a1a1a" transform="rotate(-10 45 48)" />
            {/* Head */}
            <circle cx="35" cy="35" r="15" fill="#1a1a1a" />
            {/* Ears up */}
            <ellipse cx="28" cy="25" rx="5" ry="11" fill="#1a1a1a" />
            <ellipse cx="42" cy="25" rx="5" ry="11" fill="#1a1a1a" />
            {/* Eyes - excited */}
            <circle cx="31" cy="33" r="3" fill="white" />
            <circle cx="39" cy="33" r="3" fill="white" />
            <circle cx="32" cy="33" r="1.5" fill="#1a1a1a" />
            <circle cx="40" cy="33" r="1.5" fill="#1a1a1a" />
            {/* Tongue */}
            <ellipse cx="35" cy="42" rx="3" ry="5" fill="#ff6b9d" />
            {/* Tail wagging */}
            <path d="M 60 45 Q 68 40 70 50" stroke="#1a1a1a" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Legs */}
            <rect x="38" y="58" width="5" height="10" rx="2.5" fill="#1a1a1a" />
            <rect x="48" y="60" width="5" height="10" rx="2.5" fill="#1a1a1a" />
          </svg>
        );
      
      case 'walk':
        return (
          <svg viewBox="0 0 80 80" fill="none" className={`w-full h-full ${className}`}>
            {/* Body */}
            <ellipse cx="42" cy="48" rx="20" ry="16" fill="#1a1a1a" />
            {/* Head */}
            <circle cx="32" cy="38" r="14" fill="#1a1a1a" />
            {/* Ears */}
            <ellipse cx="26" cy="30" rx="5" ry="10" fill="#1a1a1a" />
            <ellipse cx="38" cy="30" rx="5" ry="10" fill="#1a1a1a" />
            {/* Eyes */}
            <circle cx="29" cy="37" r="2.5" fill="white" />
            <circle cx="36" cy="37" r="2.5" fill="white" />
            {/* Nose */}
            <circle cx="32" cy="42" r="2" fill="#1a1a1a" />
            {/* Legs walking */}
            <rect x="32" y="60" width="5" height="12" rx="2.5" fill="#1a1a1a" />
            <rect x="42" y="58" width="5" height="10" rx="2.5" fill="#1a1a1a" />
            <rect x="48" y="60" width="5" height="12" rx="2.5" fill="#1a1a1a" />
            {/* Tail */}
            <ellipse cx="58" cy="46" rx="8" ry="5" fill="#1a1a1a" transform="rotate(-20 58 46)" />
          </svg>
        );
      
      case 'jump':
        return (
          <svg viewBox="0 0 80 80" fill="none" className={`w-full h-full ${className}`}>
            {/* Body - in air */}
            <ellipse cx="40" cy="40" rx="18" ry="15" fill="#1a1a1a" transform="rotate(-15 40 40)" />
            {/* Head */}
            <circle cx="35" cy="28" r="13" fill="#1a1a1a" />
            {/* Ears flying */}
            <ellipse cx="28" cy="20" rx="4" ry="10" fill="#1a1a1a" transform="rotate(-30 28 20)" />
            <ellipse cx="42" cy="18" rx="4" ry="10" fill="#1a1a1a" transform="rotate(20 42 18)" />
            {/* Eyes */}
            <circle cx="32" cy="27" r="2.5" fill="white" />
            <circle cx="38" cy="27" r="2.5" fill="white" />
            {/* Legs extended */}
            <rect x="28" y="50" width="4" height="12" rx="2" fill="#1a1a1a" transform="rotate(-30 30 56)" />
            <rect x="48" y="48" width="4" height="12" rx="2" fill="#1a1a1a" transform="rotate(20 50 54)" />
            {/* Motion lines */}
            <path d="M 20 50 L 15 50" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            <path d="M 20 45 L 13 45" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      
      case 'listen':
        return (
          <svg viewBox="0 0 80 80" fill="none" className={`w-full h-full ${className}`}>
            {/* Body */}
            <ellipse cx="40" cy="50" rx="20" ry="18" fill="#1a1a1a" />
            {/* Head - tilted */}
            <circle cx="38" cy="32" r="15" fill="#1a1a1a" />
            {/* Ears - one up, listening */}
            <ellipse cx="30" cy="22" rx="6" ry="13" fill="#1a1a1a" />
            <ellipse cx="46" cy="24" rx="5" ry="11" fill="#1a1a1a" transform="rotate(20 46 24)" />
            {/* Eyes - alert */}
            <circle cx="34" cy="30" r="3" fill="white" />
            <circle cx="42" cy="30" r="3" fill="white" />
            <circle cx="35" cy="30" r="1.5" fill="#1a1a1a" />
            <circle cx="43" cy="30" r="1.5" fill="#1a1a1a" />
            {/* Sound waves */}
            <path d="M 60 25 Q 65 25 65 30" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 63 22 Q 70 22 70 30" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );
      
      case 'happy':
      default:
        return (
          <svg viewBox="0 0 80 80" fill="none" className={`w-full h-full ${className}`}>
            {/* Body */}
            <ellipse cx="40" cy="50" rx="22" ry="18" fill="#1a1a1a" />
            {/* Head */}
            <circle cx="40" cy="32" r="16" fill="#1a1a1a" />
            {/* Ears */}
            <ellipse cx="30" cy="22" rx="6" ry="12" fill="#1a1a1a" />
            <ellipse cx="50" cy="22" rx="6" ry="12" fill="#1a1a1a" />
            {/* Eyes - happy */}
            <circle cx="35" cy="30" r="3" fill="white" />
            <circle cx="45" cy="30" r="3" fill="white" />
            <circle cx="36" cy="30" r="1.5" fill="#1a1a1a" />
            <circle cx="46" cy="30" r="1.5" fill="#1a1a1a" />
            {/* Smile */}
            <path d="M 33 36 Q 40 40 47 36" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Nose */}
            <circle cx="40" cy="35" r="2" fill="#1a1a1a" />
            {/* Tail wagging */}
            <ellipse cx="58" cy="48" rx="10" ry="5" fill="#1a1a1a" transform="rotate(-25 58 48)" />
            {/* Legs */}
            <rect x="32" y="62" width="6" height="12" rx="3" fill="#1a1a1a" />
            <rect x="42" y="62" width="6" height="12" rx="3" fill="#1a1a1a" />
          </svg>
        );
    }
  };

  return renderCorgi();
}
