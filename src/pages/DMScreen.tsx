// DM Screen — separate browser tab with stat blocks, initiative order, party HP, and DM notes.
// Synced from the main Game tab via BroadcastChannel.

import { useState, useEffect } from 'react';
import type { Unit } from '../contexts/GameContext';
import {
  DEFAULT_DM_SCREEN_PANELS,
  DM_SCREEN_PANEL_IDS,
  DM_SCREEN_PANEL_LABELS,
  type DMScreenPanelId,
  normalizeDmScreenPanels,
  toggleDmScreenPanel,
} from '../lib/dmScreenPanels';
import {
  formatRollFormula,
  normalizeRollHistory,
  rollDmDice,
  trimRollHistory,
  type DMScreenRoll,
} from '../lib/dmScreenDice';

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
const PANEL_STORAGE_KEY = 'adventure:dm-screen:panels';
const NOTES_STORAGE_KEY = 'adventure:dm-screen:notes';
const ROLLS_STORAGE_KEY = 'adventure:dm-screen:rolls';

function loadPanels(): DMScreenPanelId[] {
  try {
    const raw = localStorage.getItem(PANEL_STORAGE_KEY);
    return raw ? normalizeDmScreenPanels(JSON.parse(raw)) : [...DEFAULT_DM_SCREEN_PANELS];
  } catch {
    return [...DEFAULT_DM_SCREEN_PANELS];
  }
}

function loadNotes(): string {
  try {
    return localStorage.getItem(NOTES_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function loadRolls(): DMScreenRoll[] {
  try {
    const raw = localStorage.getItem(ROLLS_STORAGE_KEY);
    return raw ? normalizeRollHistory(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

export default function DMScreen() {
  const [state, setState] = useState<DMScreenState>({
    units: [], inCombat: false, combatRound: 0, turnIndex: 0, sceneName: '', dmNotes: '', partyInventoryCount: 0,
  });
  const [connected, setConnected] = useState(false);
  const [visiblePanels, setVisiblePanels] = useState<DMScreenPanelId[]>(loadPanels);
  const [notes, setNotes] = useState(loadNotes);
  const [rollModifier, setRollModifier] = useState('0');
  const [rollHistory, setRollHistory] = useState<DMScreenRoll[]>(loadRolls);

  useEffect(() => {
    localStorage.setItem(PANEL_STORAGE_KEY, JSON.stringify(visiblePanels));
  }, [visiblePanels]);

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(ROLLS_STORAGE_KEY, JSON.stringify(rollHistory));
  }, [rollHistory]);

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

  const panelClass = 'bg-slate-900 border border-slate-800 rounded-xl p-4';
  const latestRoll = rollHistory[0];

  const handleRoll = (sides: number) => {
    const modifier = Number.parseInt(rollModifier, 10);
    const roll = rollDmDice(sides, Number.isFinite(modifier) ? modifier : 0);
    setRollHistory((prev) => trimRollHistory([roll, ...prev]));
  };

  const renderPanel = (panel: DMScreenPanelId) => {
    if (panel === 'initiative') {
      return (
        <div key={panel} className={panelClass}>
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
      );
    }

    if (panel === 'party') {
      return (
        <div key={panel} className={panelClass}>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Party ({players.length})</h2>
          <div className="space-y-2">
            {players.length === 0 && <p className="text-xs text-slate-600 italic">No party synced yet</p>}
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
                    <div className={`h-full rounded-full transition-all duration-300 ${hpPct < 33 ? 'bg-red-500' : hpPct < 66 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.max(0, Math.min(100, hpPct))}%` }} />
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
      );
    }

    if (panel === 'enemies') {
      return (
        <div key={panel} className={panelClass}>
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
      );
    }

    if (panel === 'currentTurn') {
      return (
        <div key={panel} className={`${panelClass} ${currentUnit && inCombat ? 'border-amber-500/30 bg-amber-950/10 text-center' : ''}`}>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Current Turn</h2>
          {currentUnit && inCombat ? (
            <>
              <div className="text-2xl font-black text-amber-300">{currentUnit.name}</div>
              <div className="text-xs text-slate-400 mt-1">HP {currentUnit.hp}/{currentUnit.maxHp} · AC {currentUnit.ac} · Initiative {currentUnit.initiative}</div>
            </>
          ) : <p className="text-xs text-slate-600 italic">No active combat turn</p>}
        </div>
      );
    }

    if (panel === 'dice') {
      return (
        <div key={panel} className={`${panelClass} bg-gradient-to-br from-slate-900 to-slate-950`}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">DM Dice Tray</h2>
              <p className="text-[10px] text-slate-600">Private rolls, saved on this screen.</p>
            </div>
            <label className="flex items-center gap-1 text-[10px] text-slate-500">
              Mod
              <input
                value={rollModifier}
                onChange={(e) => setRollModifier(e.target.value)}
                className="w-14 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-right text-slate-200 outline-none focus:border-[#F38020]/60"
                inputMode="numeric"
              />
            </label>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[4, 6, 8, 10, 12, 20, 100].map((sides) => (
              <button
                key={sides}
                onClick={() => handleRoll(sides)}
                className="rounded-lg border border-[#F38020]/30 bg-[#F38020]/10 px-3 py-2 text-xs font-black text-[#F38020] transition-all hover:-translate-y-0.5 hover:border-[#F38020] hover:bg-[#F38020]/20"
              >
                d{sides}
              </button>
            ))}
          </div>

          {latestRoll ? (
            <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-950/10 p-3 text-center">
              <div className="text-[10px] uppercase tracking-wider text-amber-500">Latest Roll</div>
              <div className="mt-1 text-4xl font-black text-amber-300">{latestRoll.total}</div>
              <div className="mt-1 text-xs text-slate-500">{formatRollFormula(latestRoll)}</div>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-center text-xs text-slate-600">No rolls yet</div>
          )}

          {rollHistory.length > 0 && (
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">History</span>
                <button onClick={() => setRollHistory([])} className="text-[10px] text-slate-600 hover:text-red-400">Clear</button>
              </div>
              {rollHistory.slice(0, 6).map((roll) => (
                <div key={roll.id} className="flex items-center justify-between rounded border border-slate-800 bg-slate-950/40 px-2 py-1 text-xs">
                  <span className="text-slate-500">{formatRollFormula(roll)}</span>
                  <span className="font-bold text-slate-200">{roll.total}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (panel === 'reference') {
      return (
        <div key={panel} className={panelClass}>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Rules</h2>
          <div className="grid gap-2 text-xs text-slate-400">
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
              <div className="font-bold text-slate-300">Difficulty DCs</div>
              <div className="mt-1 grid grid-cols-5 gap-1 text-[10px] text-slate-500">
                <span>Easy 10</span><span>Med 15</span><span>Hard 20</span><span>Heroic 25</span><span>Mythic 30</span>
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
              <div className="font-bold text-slate-300">Cover</div>
              <p className="mt-1 text-[10px] text-slate-500">Half +2 AC/DEX saves · 3/4 +5 AC/DEX saves · Full blocks targeting.</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
              <div className="font-bold text-slate-300">Concentration</div>
              <p className="mt-1 text-[10px] text-slate-500">CON save DC = max(10, half damage). Fail drops spell zones tied to that caster.</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
              <div className="font-bold text-slate-300">Death Saves</div>
              <p className="mt-1 text-[10px] text-slate-500">3 successes stabilize · 3 failures die · nat 20: 1 HP · nat 1: two failures.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={panel} className={panelClass}>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">DM Notes</h2>
        <textarea
          value={notes || state.dmNotes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Private notes for this screen..."
          className="min-h-40 w-full resize-y rounded-lg border border-slate-700 bg-slate-950/70 p-3 text-xs text-slate-200 outline-none focus:border-[#F38020]/60"
        />
        <p className="mt-2 text-[9px] text-slate-600">Saved locally in this browser.</p>
      </div>
    );
  };

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

      <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Visible Panels</h2>
          <button
            onClick={() => setVisiblePanels([...DEFAULT_DM_SCREEN_PANELS])}
            className="rounded border border-slate-700 px-2 py-1 text-[10px] font-semibold text-slate-400 transition-colors hover:border-[#F38020]/60 hover:text-[#F38020]"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {DM_SCREEN_PANEL_IDS.map((panel) => {
            const active = visiblePanels.includes(panel);
            return (
              <button
                key={panel}
                onClick={() => setVisiblePanels((prev) => toggleDmScreenPanel(prev, panel))}
                className={`rounded-full border px-3 py-1 text-[10px] font-semibold transition-all ${active ? 'border-[#F38020]/70 bg-[#F38020]/10 text-[#F38020]' : 'border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'}`}
              >
                {active ? '✓ ' : ''}{DM_SCREEN_PANEL_LABELS[panel]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visiblePanels.map(renderPanel)}
      </div>

      <div className="mt-4 text-center text-[9px] text-slate-700">
        Open the Game tab to sync data · Press ? in the game for keyboard shortcuts
      </div>
    </div>
  );
}
