type InitiativeEntry = {
  name: string;
  hp: number;
  isCurrentTurn: boolean;
};

const InitiativeBar = ({ entries }: { entries: InitiativeEntry[] }) => (
  <div className="flex gap-2 overflow-x-auto bg-parchment p-4 rounded-2xl shadow-md">
    {entries.map((entry, idx) => (
      <div
        key={entry.name}
        className={`p-2 rounded-xl border-2 w-36 text-center transition-all ${entry.isCurrentTurn ? "border-mana bg-white font-bold" : "border-shadow bg-parchment"}`}
      >
        <div className="text-display text-lg">{entry.name}</div>
        <div className="text-ink text-sm">HP: {entry.hp}</div>
      </div>
    ))}
  </div>
);

export default InitiativeBar;
