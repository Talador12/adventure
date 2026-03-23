// Hot-Seat Mode — pass-and-play on a single device for in-person groups.
// Each player selects their character when it's their turn.
// No WebSocket needed — all local, same browser.

import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame, type Unit } from '../contexts/GameContext';

export default function HotSeat() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { characters, units, inCombat, combatRound } = useGame();

  const [activePlayerIdx, setActivePlayerIdx] = useState(0);
  const [showPassScreen, setShowPassScreen] = useState(false);

  const playerChars = characters.filter((c) => units.some((u) => u.characterId === c.id && u.type === 'player'));
  const activeChar = playerChars[activePlayerIdx % playerChars.length];
  const currentUnit = units.find((u) => u.isCurrentTurn);
  const isMyTurn = currentUnit && activeChar && currentUnit.characterId === activeChar.id;

  const passToNext = useCallback(() => {
    const nextIdx = (activePlayerIdx + 1) % Math.max(1, playerChars.length);
    setActivePlayerIdx(nextIdx);
    const nextChar = playerChars[nextIdx];
    // nextChar selected via activePlayerIdx — no global setter needed
    setShowPassScreen(true);
  }, [activePlayerIdx, playerChars]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-6">
      {showPassScreen ? (
        // "Pass the device" screen — hides game state between players
        <div className="text-center space-y-6 animate-fade-in-up">
          <div className="text-6xl">🎲</div>
          <h1 className="text-2xl font-black text-[#F38020]">Pass the Device!</h1>
          <p className="text-lg text-slate-400">
            It's <span className="font-bold text-white">{playerChars[activePlayerIdx]?.name || 'the next player'}'s</span> turn
          </p>
          <button
            onClick={() => setShowPassScreen(false)}
            className="px-8 py-3 rounded-xl bg-[#F38020] text-white font-bold text-lg hover:bg-[#f9a05f] transition-all shadow-lg shadow-[#F38020]/20"
          >
            I'm Ready — Show Game
          </button>
          <p className="text-[10px] text-slate-600">Only click when the correct player is holding the device</p>
        </div>
      ) : (
        // Active player's view
        <div className="w-full max-w-lg space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#F38020]">Hot Seat</h1>
              <span className="text-xs text-slate-500">{roomId?.slice(0, 8)} · {inCombat ? `Round ${combatRound}` : 'Exploration'}</span>
            </div>
            <button onClick={() => navigate(`/game/${roomId}`)} className="text-[10px] text-slate-500 hover:text-slate-300">
              Full Game →
            </button>
          </div>

          {/* Active character card */}
          {activeChar && (
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">{activeChar.race === 'Elf' ? '🧝' : activeChar.race === 'Dwarf' ? '⛏️' : '⚔️'}</div>
              <h2 className="text-xl font-black text-white">{activeChar.name}</h2>
              <p className="text-sm text-slate-400">Level {activeChar.level} {activeChar.race} {activeChar.class}</p>
              <div className="flex justify-center gap-6 mt-3">
                <div>
                  <span className={`text-2xl font-black ${activeChar.hp < activeChar.maxHp / 3 ? 'text-red-400' : activeChar.hp < activeChar.maxHp * 2 / 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {activeChar.hp}
                  </span>
                  <span className="text-sm text-slate-500">/{activeChar.maxHp} HP</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-slate-300">{activeChar.ac}</span>
                  <span className="text-sm text-slate-500"> AC</span>
                </div>
              </div>
              {isMyTurn && (
                <div className="mt-3 px-3 py-1 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-400 text-xs font-bold inline-block animate-pulse">
                  YOUR TURN
                </div>
              )}
            </div>
          )}

          {/* Quick stats grid */}
          {activeChar && (
            <div className="grid grid-cols-6 gap-2">
              {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const).map((stat) => (
                <div key={stat} className="bg-slate-900 rounded-xl border border-slate-800 p-2 text-center">
                  <div className="text-[8px] text-slate-500 uppercase">{stat}</div>
                  <div className="text-lg font-black text-white">{activeChar.stats[stat]}</div>
                </div>
              ))}
            </div>
          )}

          {/* Player selector */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Players</span>
            <div className="flex gap-2 flex-wrap">
              {playerChars.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActivePlayerIdx(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    i === activePlayerIdx ? 'bg-[#F38020] text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pass button */}
          <button
            onClick={passToNext}
            className="w-full py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold hover:bg-slate-700 transition-all text-sm"
          >
            🔄 Pass to Next Player
          </button>
        </div>
      )}
    </div>
  );
}
