type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";

const DiceIcon = ({ type }: { type: DiceType }) => {
  const base = "w-16 h-16 text-mana";

  switch (type) {
    case "d4":
      return (
        <svg viewBox="0 0 120 100" className={base} fill="none" stroke="currentColor" strokeWidth={4}>
          <polygon points="60,10 10,90 110,90" />
          <line x1="60" y1="10" x2="60" y2="90" />
        </svg>
      );

    case "d6":
      return (
        <svg viewBox="0 0 100 100" className={base} fill="none" stroke="currentColor" strokeWidth={4}>
          <rect x="10" y="10" width="80" height="80" rx="8" />
          <circle cx="30" cy="30" r="5" />
          <circle cx="50" cy="50" r="5" />
          <circle cx="70" cy="70" r="5" />
        </svg>
      );

    case "d8":
      return (
        <svg viewBox="0 0 100 100" className={base} fill="none" stroke="currentColor" strokeWidth={4}>
          <polygon points="50,5 95,50 50,95 5,50" />
          <line x1="50" y1="5" x2="50" y2="95" />
        </svg>
      );

    case "d10":
      return (
        <svg viewBox="0 0 120 100" className={base} fill="none" stroke="currentColor" strokeWidth={4}>
          <polygon points="60,5 105,35 95,95 25,95 15,35" />
          <line x1="60" y1="5" x2="60" y2="95" />
        </svg>
      );

    case "d12":
      return (
        <svg viewBox="0 0 120 100" className={base} fill="none" stroke="currentColor" strokeWidth={4}>
          <polygon points="60,5 95,15 115,50 95,85 60,95 25,85 5,50 25,15" />
          <line x1="60" y1="5" x2="60" y2="95" />
        </svg>
      );

    case "d20":
      return (
        <svg viewBox="0 0 120 100" className={base} fill="none" stroke="currentColor" strokeWidth={4}>
          <polygon points="60,5 100,20 115,60 90,95 30,95 5,60 20,20" />
          <line x1="60" y1="5" x2="60" y2="95" />
        </svg>
      );

    default:
      return null;
  }
};

export default DiceIcon;
