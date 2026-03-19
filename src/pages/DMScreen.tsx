// DM Screen — separate browser tab with stat blocks, initiative order, party HP, and DM notes.
// Synced from the main Game tab via BroadcastChannel.

import { useState, useEffect } from 'react';
import type { Unit } from '../contexts/GameContext';

interface DMScreenState {
  units: Unit[];
  inCombat: boolean;
  combatRound: number;
  turnIndex: number;
  sceneName: string;
  dmNotes: string;
  partyInventoryCount: number;
}

const CHANNEL_NAME = 'adventure-dm-screen';

export default function DMScreen() {
  const [state, setState] = useState<DMScreenState>({
    units: [], inCombat: false, combatRound: 0, turnIndex: 0, sceneName: '', dmNotes: '', partyInventoryCount: 0,
  });
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (e) => {
      if (e.data?.type === 'dm-screen-sync') {
        setState(e.data.state as DMScreenState);
        setConnected(true);
      }
    };
    // Request initial sync
    channel.postMessage({ type: 'dm-screen-request' });
    return () => channel.close();
  }, []);

  const { units, inCombat, combatRound, sceneName } = state;
  const players = units.filter((u) => u.type === 'player');
  const enemies = units.filter((u) => u.type === 'enemy' && u.hp > 0);
  const currentUnit = units.find((u) => u.isCurrentTurn);
  const sortedByInit = [...units].filter((u) => u.hp > 0 || (u.hp === 0 && u.type === 'player')).sort((a, b) => b.initiative - a.initiative);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-[#F38020]">DM Screen</h1>
          <p className="text-xs text-slate-500">{sceneName || 'No scene'} {inCombat ? `— Round ${combatRound}` : ''}</p>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${connected ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
          {connected ? 'Synced' : 'Waiting for Game tab...'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Initiative Order */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Initiative Order</h2>
          <div className="space-y-1.5">
            {sortedByInit.length === 0 && <p className="text-xs text-slate-600 italic">No combat active</p>}
            {sortedByInit.map((u) => (
              <div key={u.id} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${u.isCurrentTurn ? 'border-amber-500/50 bg-amber-950/20' : 'border-slate-800 bg-slate-800/30'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 w-5">{u.initiative}</span>
                  <span className={`text-sm font-semibold ${u.type === 'player' ? 'text-[#F38020]' : 'text-red-400'}`}>{u.name}</span>
                  {u.isCurrentTurn && <span className="text-[8px] text-amber-400 font-bold animate-pulse">TURN</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">AC {u.ac}</span>
                  <span className={`text-xs font-bold ${u.hp <= 0 ? 'text-red-500' : u.hp < u.maxHp / 3 ? 'text-red-400' : u.hp < u.maxHp * 2 / 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {u.hp}/{u.maxHp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Party Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Party ({players.length})</h2>
          <div className="space-y-2">
            {players.map((p) => {
              const hpPct = p.maxHp > 0 ? (p.hp / p.maxHp) * 100 : 0;
              return (
                <div key={p.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F38020]">{p.name}</span>
                    <span className={`font-bold ${hpPct < 33 ? 'text-red-400' : hpPct < 66 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {p.hp}/{p.maxHp} HP
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${hpPct < 33 ? 'bg-red-500' : hpPct < 66 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.max(0, Math.min(100, hpPct))}%` }}
                    />
                  </div>
                  {(p.conditions || []).length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {(p.conditions || []).map((c, i) => (
                        <span key={i} className="text-[8px] px-1.5 py-0.5 rounded bg-violet-900/30 text-violet-300">{c.type}{c.duration > 0 ? ` (${c.duration})` : ''}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enemy Stat Blocks */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Enemies ({enemies.length})</h2>
          <div className="space-y-2">
            {enemies.length === 0 && <p className="text-xs text-slate-600 italic">No enemies in play</p>}
            {enemies.map((e) => (
              <div key={e.id} className="px-3 py-2 rounded-lg border border-red-900/30 bg-red-950/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-red-400">{e.name}</span>
                  <span className="text-xs font-bold text-red-300">{e.hp}/{e.maxHp}</span>
                </div>
                <div className="flex gap-3 text-[10px] text-slate-500 mt-0.5">
                  <span>AC {e.ac}</span>
                  {e.attackBonus !== undefined && <span>+{e.attackBonus} to hit</span>}
                  {e.damageDie && <span>{e.damageDie} dmg</span>}
                  {e.cr && <span>CR {e.cr}</span>}
                </div>
                {(e.conditions || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(e.conditions || []).map((c, i) => (
                      <span key={i} className="text-[8px] px-1.5 py-0.5 rounded bg-violet-900/30 text-violet-300">{c.type}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current turn callout */}
      {currentUnit && inCombat && (
        <div className="mt-4 p-4 rounded-xl border-2 border-amber-500/30 bg-amber-950/10 text-center">
          <span className="text-xs text-amber-400 uppercase tracking-wider font-bold">Current Turn</span>
          <div className="text-2xl font-black text-amber-300 mt-1">{currentUnit.name}</div>
          <div className="text-xs text-slate-400 mt-1">
            HP {currentUnit.hp}/{currentUnit.maxHp} · AC {currentUnit.ac} · Initiative {currentUnit.initiative}
          </div>
        </div>
      )}

      <div className="mt-4 text-center text-[9px] text-slate-700">
        Open the Game tab to sync data · Press ? in the game for keyboard shortcuts
      </div>
    </div>
  );
}
