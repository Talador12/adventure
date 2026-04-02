// PuzzleEncounter — DM presents a puzzle, players submit guesses.
// Correct answer progresses the encounter. Hints available via INT check.
import { useState } from 'react';
import type { Puzzle } from '../../data/puzzles';
import { checkAnswer, getRandomPuzzle, getPuzzlesByType, PUZZLE_LIBRARY } from '../../data/puzzles';

interface Props {
  onAddDmMessage: (text: string) => void;
}

export default function PuzzleEncounter({ onAddDmMessage }: Props) {
  const [activePuzzle, setActivePuzzle] = useState<Puzzle | null>(null);
  const [guess, setGuess] = useState('');
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const presentPuzzle = (puzzle: Puzzle) => {
    setActivePuzzle(puzzle);
    setGuess('');
    setHintsRevealed(0);
    setSolved(false);
    setAttempts(0);
    onAddDmMessage(`🧩 **Puzzle: ${puzzle.name}** (${puzzle.difficulty})\n${puzzle.prompt}`);
  };

  const submitGuess = () => {
    if (!activePuzzle || !guess.trim()) return;
    setAttempts((a) => a + 1);
    if (checkAnswer(activePuzzle, guess)) {
      setSolved(true);
      onAddDmMessage(`✅ **Correct!** ${activePuzzle.reward || 'The puzzle is solved.'}`);
    } else {
      onAddDmMessage(`❌ "${guess}" is not the answer. ${activePuzzle.consequence || 'Try again.'}`);
    }
    setGuess('');
  };

  const revealHint = () => {
    if (!activePuzzle || hintsRevealed >= activePuzzle.hints.length) return;
    const hint = activePuzzle.hints[hintsRevealed];
    setHintsRevealed((h) => h + 1);
    onAddDmMessage(`💡 **Hint ${hintsRevealed + 1}:** ${hint}`);
  };

  return (
    <div className="space-y-2">
      {/* Active puzzle */}
      {activePuzzle && !solved && (
        <div className="rounded-lg border border-violet-600/40 bg-violet-900/20 p-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-violet-400 font-semibold uppercase tracking-wider">🧩 {activePuzzle.name}</span>
            <span className="text-[8px] text-slate-500">{activePuzzle.difficulty} · {activePuzzle.type}</span>
          </div>
          <div className="text-[10px] text-violet-200 italic">{activePuzzle.prompt}</div>

          {/* Guess input */}
          <div className="flex gap-1">
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter answer..."
              className="flex-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-200 placeholder:text-slate-600 focus:border-violet-500 focus:outline-none"
              onKeyDown={(e) => { if (e.key === 'Enter') submitGuess(); }}
            />
            <button onClick={submitGuess} disabled={!guess.trim()} className="px-2 py-1 rounded bg-violet-700 hover:bg-violet-600 disabled:opacity-30 text-[9px] text-white font-semibold transition-all">
              Submit
            </button>
          </div>

          {/* Hints + attempts */}
          <div className="flex items-center gap-2 text-[9px]">
            {hintsRevealed < activePuzzle.hints.length && (
              <button onClick={revealHint} className="text-amber-400 hover:text-amber-300 transition-colors">
                💡 Hint ({hintsRevealed}/{activePuzzle.hints.length})
              </button>
            )}
            <span className="text-slate-600">Attempts: {attempts}</span>
            <button onClick={() => { setActivePuzzle(null); setSolved(false); }} className="text-slate-600 hover:text-slate-400 ml-auto">Dismiss</button>
          </div>
        </div>
      )}

      {/* Solved banner */}
      {solved && activePuzzle && (
        <div className="rounded-lg border border-emerald-600/40 bg-emerald-900/20 p-2 text-[10px] text-emerald-400 font-semibold flex items-center justify-between">
          <span>✅ Puzzle solved in {attempts} attempt{attempts !== 1 ? 's' : ''}!</span>
          <button onClick={() => { setActivePuzzle(null); setSolved(false); }} className="text-[9px] text-slate-500 hover:text-slate-400">Clear</button>
        </div>
      )}

      {/* Puzzle browser */}
      {!activePuzzle && (
        <div>
          <div className="flex gap-1">
            <button
              onClick={() => presentPuzzle(getRandomPuzzle())}
              className="flex-1 text-[10px] py-1.5 rounded bg-violet-900/20 border border-violet-600/30 text-violet-400 font-semibold hover:bg-violet-800/30 transition-all"
            >
              🎲 Random Puzzle
            </button>
            <button
              onClick={() => setShowBrowser(!showBrowser)}
              className="text-[10px] px-2 py-1.5 rounded bg-slate-800/50 border border-slate-700/40 text-slate-400 hover:text-violet-400 transition-all"
            >
              {showBrowser ? '▼' : '▶'} Browse ({PUZZLE_LIBRARY.length})
            </button>
          </div>
          {showBrowser && (
            <div className="mt-1 space-y-1 max-h-40 overflow-y-auto">
              {Object.entries(getPuzzlesByType()).map(([type, puzzles]) => (
                <div key={type}>
                  <div className="text-[8px] text-slate-600 uppercase font-bold mt-1">{type}</div>
                  {puzzles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => presentPuzzle(p)}
                      className="w-full text-left px-2 py-1 rounded hover:bg-slate-800/50 transition-all flex items-center justify-between"
                    >
                      <span className="text-[9px] text-slate-300 truncate">{p.name}</span>
                      <span className={`text-[8px] ${p.difficulty === 'hard' ? 'text-red-400' : p.difficulty === 'medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {p.difficulty}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
