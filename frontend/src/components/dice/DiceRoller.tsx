import { useState } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import DiceIcon from './DiceIcon';

type DiceMode = 'tower' | 'table';
type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

const diceTypes: DiceType[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];

const DiceRoller = () => {
  const [mode, setMode] = useState<DiceMode>('tower');
  const [results, setResults] = useState<Record<DiceType, number>>({
    d4: 1,
    d6: 1,
    d8: 1,
    d10: 1,
    d12: 1,
    d20: 1,
  });

  const [lastRolled, setLastRolled] = useState<DiceType | null>(null);
  const [history, setHistory] = useState<{ type: DiceType; value: number; timestamp: number }[]>([]);

  const rollSound = new Howl({
    src: [mode === 'tower' ? '/sounds/tower.mp3' : '/sounds/table.mp3'],
    volume: 0.5,
  });

  const rollDie = (type: DiceType) => {
    const max = parseInt(type.slice(1));
    const value = Math.floor(Math.random() * max) + 1;

    rollSound.play();

    setResults((prev) => ({ ...prev, [type]: value }));
    setLastRolled(type);
    setHistory((prev) => [{ type, value, timestamp: Date.now() }, ...prev.slice(0, 9)]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Mode Toggle */}
      <div className="mb-4 flex justify-center gap-4">
        {['tower', 'table'].map((m) => (
          <button key={m} className={`rounded-lg px-4 py-2 font-display transition-all ${mode === m ? 'bg-mana text-white shadow-md ring-2 ring-mana' : 'bg-stone-700 text-parchment hover:bg-stone-600 hover:text-white'}`} onClick={() => setMode(m as DiceMode)}>
            {m === 'tower' ? '🗼 Tower' : '🪵 Table'}
          </button>
        ))}
      </div>

      {/* Dice Grid */}
      <div className="flex max-w-2xl flex-wrap justify-center gap-4 rounded-xl border border-stone-700 bg-stone-800 p-4 shadow-md">
        {diceTypes.map((type) => {
          const value = results[type];
          const max = parseInt(type.slice(1));
          const isCritSuccess = value === max;
          const isCritFail = value === 1;
          const isLastRolled = lastRolled === type;

          const highlightColor = isCritSuccess ? 'text-yellow-400' : isCritFail ? 'text-red-500' : 'text-mana';

          const animation = isLastRolled
            ? {
                scale: isCritSuccess ? 1.25 : isCritFail ? 1.1 : 1.05,
                rotate: isCritFail ? 15 : 0,
              }
            : {};

          return (
            <button key={type} onClick={() => rollDie(type)} className="group flex flex-col items-center focus:outline-none">
              <motion.div key={`${type}-${value}`} className={`cursor-pointer ${highlightColor}`} animate={animation} transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}>
                <DiceIcon type={type} />
              </motion.div>

              <motion.span key={`value-${type}-${value}`} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} className={`mt-1 font-display text-sm ${isCritSuccess ? 'text-yellow-400' : isCritFail ? 'text-red-500' : 'text-parchment'}`}>
                {type.toUpperCase()}: {value}
              </motion.span>
            </button>
          );
        })}
      </div>

      {/* Roll History */}
      <div className="mt-6 w-full max-w-md rounded-xl border border-stone-700 bg-stone-900 p-4 text-parchment shadow">
        <h2 className="mb-2 font-display text-lg">🎲 Roll History</h2>
        {history.length === 0 && <p className="text-sm italic text-stone-400">No rolls yet.</p>}
        <ul className="max-h-48 space-y-1 overflow-y-auto pr-2 text-sm">
          {history.map((entry) => (
            <li key={entry.timestamp} className={`flex items-center justify-between rounded-md px-2 py-1 ${entry.value === 1 ? 'text-red-500' : entry.value === parseInt(entry.type.slice(1)) ? 'text-yellow-400' : 'text-white'}`}>
              <span className="w-12 font-bold">{entry.type.toUpperCase()}</span>
              <span className="flex-1 text-right">→ {entry.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiceRoller;
