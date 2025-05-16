type InitiativeEntry = {
  name: string;
  hp: number;
  isCurrentTurn: boolean;
};

const InitiativeBar = ({ entries }: { entries: InitiativeEntry[] }) => (
  <div className="flex gap-2 overflow-x-auto rounded-2xl bg-parchment p-4 shadow-md">
    {entries.map((entry, idx) => (
      <div key={entry.name} className={`w-36 rounded-xl border-2 p-2 text-center transition-all ${entry.isCurrentTurn ? 'border-mana bg-white font-bold' : 'border-shadow bg-parchment'}`}>
        <div className="text-display text-lg">{entry.name}</div>
        <div className="text-sm text-ink">HP: {entry.hp}</div>
      </div>
    ))}
  </div>
);

export default InitiativeBar;
