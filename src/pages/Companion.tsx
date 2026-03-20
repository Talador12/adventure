// Mobile Companion — streamlined phone UI for joining as a player.
// Shows: character quick-view, dice roller, chat, initiative tracker.
// No battle map, no DM tools — designed for small screens.

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import type { Character } from '../types/game';

export default function Companion() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { characters, units, inCombat, combatRound } = useGame();
  const [selectedCharId, setSelectedCharId] = useState<string | null>(characters[0]?.id || null);
  const [tab, setTab] = useState<'character' | 'dice' | 'chat'>('character');
  const [diceResult, setDiceResult] = useState<{ sides: number; value: number } | null>(null);

  const selectedChar = characters.find((c) => c.id === selectedCharId);
  const currentUnit = units.find((u) => u.isCurrentTurn);
  const myUnit = units.find((u) => u.characterId === selectedCharId);

  // Quick dice roller
  const rollDice = (sides: number) => {
    const value = Math.floor(Math.random() * sides) + 1;
    setDiceResult({ sides, value });
  };

  const statMod = (val: number) => {
    const mod = Math.floor((val - 10) / 2);
    return mod >= 0 ? `+${mod}` : String(mod);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* Compact header */}
      <header className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="text-slate-500 text-xs">&larr;</button>
          <span className="text-sm font-bold text-[#F38020]">Adventure</span>
          <span className="text-[9px] text-slate-600 font-mono">{roomId?.slice(0, 8)}</span>
        </div>
        {inCombat && (
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-900/30 text-red-400 font-bold">COMBAT R{combatRound}</span>
            {currentUnit && <span className="text-[9px] text-amber-400 font-semibold">{currentUnit.name}'s turn</span>}
          </div>
        )}
      </header>

      {/* Character quick-view bar */}
      {selectedChar && (
        <div className="bg-slate-900/60 border-b border-slate-800/50 px-3 py-2 flex items-center justify-between shrink-0">
          <div>
            <span className="text-sm font-bold text-white">{selectedChar.name}</span>
            <span className="text-[9px] text-slate-500 ml-1.5">Lv{selectedChar.level} {selectedChar.race} {selectedChar.class}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className={`font-bold ${selectedChar.hp < selectedChar.maxHp / 3 ? 'text-red-400' : selectedChar.hp < selectedChar.maxHp * 2 / 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {selectedChar.hp}/{selectedChar.maxHp} HP
            </span>
            <span className="text-slate-400">AC {selectedChar.ac}</span>
          </div>
        </div>
      )}

      {/* Main content — tab-based */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'character' && selectedChar && (
          <div className="p-4 space-y-4">
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2">
              {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const).map((stat) => (
                <div key={stat} className="bg-slate-900 rounded-xl border border-slate-800 p-2 text-center">
                  <div className="text-[8px] text-slate-500 font-semibold uppercase">{stat}</div>
                  <div className="text-lg font-black text-white">{selectedChar.stats[stat]}</div>
                  <div className="text-[10px] text-slate-400">{statMod(selectedChar.stats[stat])}</div>
                </div>
              ))}
            </div>

            {/* Conditions */}
            {myUnit && (myUnit.conditions || []).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {(myUnit.conditions || []).map((c, i) => (
                  <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-violet-900/30 border border-violet-700/40 text-violet-300 font-semibold">
                    {c.type}{c.duration > 0 ? ` (${c.duration})` : ''}
                  </span>
                ))}
              </div>
            )}

            {/* Equipped items */}
            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 font-semibold uppercase">Equipped</span>
              {selectedChar.equipment?.weapon && (
                <div className="text-xs text-slate-300">⚔️ {selectedChar.equipment.weapon.name} {selectedChar.equipment.weapon.damageDie ? `(${selectedChar.equipment.weapon.damageDie})` : ''}</div>
              )}
              {selectedChar.equipment?.armor && (
                <div className="text-xs text-slate-300">🛡️ {selectedChar.equipment.armor.name} {selectedChar.equipment.armor.acBonus ? `(AC ${selectedChar.equipment.armor.acBonus})` : ''}</div>
              )}
            </div>

            {/* Initiative order (during combat) */}
            {inCombat && (
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-semibold uppercase">Initiative</span>
                {units.filter((u) => u.hp > 0).sort((a, b) => b.initiative - a.initiative).map((u) => (
                  <div key={u.id} className={`flex items-center justify-between text-xs px-2 py-1 rounded ${u.isCurrentTurn ? 'bg-amber-950/30 border border-amber-500/30' : 'bg-slate-800/30'}`}>
                    <span className={u.type === 'player' ? 'text-[#F38020]' : 'text-red-400'}>{u.name}</span>
                    <span className="text-slate-500">{u.initiative} · {u.hp}/{u.maxHp}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Gold + inventory count */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>💰 {selectedChar.gold?.toFixed(1)} gp</span>
              <span>🎒 {selectedChar.inventory?.length || 0} items</span>
              <span>📜 {selectedChar.customSpells?.length || 0} spells</span>
            </div>
          </div>
        )}

        {tab === 'dice' && (
          <div className="p-4 space-y-4">
            {/* Quick dice buttons */}
            <div className="grid grid-cols-3 gap-2">
              {[4, 6, 8, 10, 12, 20].map((sides) => (
                <button
                  key={sides}
                  onClick={() => rollDice(sides)}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-center hover:bg-slate-800 active:bg-slate-700 transition-all"
                >
                  <div className="text-xs text-slate-400">d{sides}</div>
                  <div className="text-lg font-black text-[#F38020]">🎲</div>
                </button>
              ))}
            </div>

            {/* Result display */}
            {diceResult && (
              <div className="text-center py-6 bg-slate-900 rounded-2xl border border-slate-700">
                <div className="text-[10px] text-slate-500 uppercase">d{diceResult.sides}</div>
                <div className={`text-5xl font-black ${diceResult.value === diceResult.sides ? 'text-yellow-400' : diceResult.value === 1 ? 'text-red-400' : 'text-white'}`}>
                  {diceResult.value}
                </div>
                {diceResult.value === diceResult.sides && <span className="text-xs text-yellow-400 font-bold">CRITICAL!</span>}
                {diceResult.value === 1 && diceResult.sides === 20 && <span className="text-xs text-red-400 font-bold">FUMBLE!</span>}
              </div>
            )}

            {/* D100 + coin flip */}
            <div className="flex gap-2">
              <button onClick={() => rollDice(100)} className="flex-1 bg-slate-800 border border-slate-700 rounded-xl py-2 text-xs text-slate-300 font-semibold hover:bg-slate-700">d100</button>
              <button onClick={() => setDiceResult({ sides: 2, value: Math.random() < 0.5 ? 1 : 2 })} className="flex-1 bg-slate-800 border border-slate-700 rounded-xl py-2 text-xs text-slate-300 font-semibold hover:bg-slate-700">Coin Flip</button>
            </div>
          </div>
        )}

        {tab === 'chat' && (
          <div className="p-4 text-center text-slate-600 text-sm italic">
            Chat available in the full game view.
            <br />
            <button onClick={() => navigate(`/game/${roomId}`)} className="mt-2 text-[#F38020] font-semibold underline">
              Open Full Game →
            </button>
          </div>
        )}

        {!selectedChar && (
          <div className="p-4 space-y-2">
            <p className="text-sm text-slate-400">Select a character:</p>
            {characters.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCharId(c.id)}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-[#F38020]/50 transition-all"
              >
                <span className="text-sm font-semibold text-white">{c.name}</span>
                <span className="text-[10px] text-slate-500 ml-2">Lv{c.level} {c.race} {c.class}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom tab bar */}
      <nav className="bg-slate-900 border-t border-slate-800 flex shrink-0">
        {(['character', 'dice', 'chat'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              tab === t ? 'text-[#F38020] border-t-2 border-[#F38020] bg-[#F38020]/5' : 'text-slate-500'
            }`}
          >
            {t === 'character' ? '👤 Sheet' : t === 'dice' ? '🎲 Dice' : '💬 Chat'}
          </button>
        ))}
      </nav>
    </div>
  );
}
