// CustomMonsterCreator — DM tool for building custom monsters with stat block and abilities.
// Creates a Monster object compatible with the existing spawn system.
// Persists custom monsters to localStorage for reuse across sessions.
import { useState, useCallback } from 'react';
import type { Monster, MonsterType, MonsterSize, Environment } from '../../data/monsters';
import { TYPE_ICONS, MONSTER_TYPES } from '../../data/monsters';
import type { EnemyAbility } from '../../types/game';

interface CustomMonsterCreatorProps {
  onSpawn: (monster: Monster, count: number) => void;
  roomId: string;
}

const SIZES: MonsterSize[] = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
const CR_OPTIONS = [0.125, 0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ABILITY_TYPES: EnemyAbility['type'][] = ['attack', 'aoe', 'condition', 'heal'];

const STORAGE_KEY = (room: string) => `adventure:custom-monsters:${room}`;

function loadCustomMonsters(room: string): Monster[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(room));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCustomMonsters(room: string, monsters: Monster[]) {
  try { localStorage.setItem(STORAGE_KEY(room), JSON.stringify(monsters)); } catch { /* ok */ }
}

function formatCR(cr: number): string {
  if (cr === 0.125) return '1/8';
  if (cr === 0.25) return '1/4';
  if (cr === 0.5) return '1/2';
  return String(cr);
}

// CR-based XP values (D&D 5e DMG)
function xpForCR(cr: number): number {
  const table: Record<number, number> = {
    0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100,
    5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900,
  };
  return table[cr] ?? Math.round(cr * 1000);
}

// Reasonable defaults based on CR
function defaultsForCR(cr: number): { hp: number; ac: number; attackBonus: number; damageBonus: number; speed: number } {
  return {
    hp: Math.round(8 + cr * 15),
    ac: Math.round(10 + cr * 0.8 + 2),
    attackBonus: Math.round(2 + cr * 0.7),
    damageBonus: Math.round(1 + cr * 0.5),
    speed: 6,
  };
}

interface AbilityDraft {
  name: string;
  type: EnemyAbility['type'];
  damageDie: string;
  cooldown: number;
  description: string;
  isRanged: boolean;
  range: number;
}

const EMPTY_ABILITY: AbilityDraft = { name: '', type: 'attack', damageDie: '1d6', cooldown: 2, description: '', isRanged: false, range: 0 };

export default function CustomMonsterCreator({ onSpawn, roomId }: CustomMonsterCreatorProps) {
  const [savedMonsters, setSavedMonsters] = useState<Monster[]>(() => loadCustomMonsters(roomId));
  const [showForm, setShowForm] = useState(false);
  const [spawnCount, setSpawnCount] = useState(1);

  // Form state
  const [name, setName] = useState('Custom Beast');
  const [cr, setCR] = useState(1);
  const [type, setType] = useState<MonsterType>('monstrosity');
  const [size, setSize] = useState<MonsterSize>('Medium');
  const [hp, setHp] = useState(23);
  const [ac, setAc] = useState(13);
  const [attackBonus, setAttackBonus] = useState(4);
  const [damageDie, setDamageDie] = useState('1d8');
  const [damageBonus, setDamageBonus] = useState(2);
  const [dexMod, setDexMod] = useState(1);
  const [speed, setSpeed] = useState(6);
  const [description, setDescription] = useState('');
  const [abilities, setAbilities] = useState<AbilityDraft[]>([]);

  // Auto-fill defaults when CR changes
  const handleCRChange = useCallback((newCR: number) => {
    setCR(newCR);
    const d = defaultsForCR(newCR);
    setHp(d.hp);
    setAc(d.ac);
    setAttackBonus(d.attackBonus);
    setDamageBonus(d.damageBonus);
    setSpeed(d.speed);
  }, []);

  const buildMonster = useCallback((): Monster => ({
    name,
    cr,
    type,
    size,
    environments: ['any' as Environment],
    hp: [hp, hp],
    ac,
    attackBonus,
    damageDie,
    damageBonus,
    dexMod,
    speed,
    xpValue: xpForCR(cr),
    abilities: abilities.filter((a) => a.name.trim()).map((a) => ({
      name: a.name,
      type: a.type,
      damageDie: a.damageDie || undefined,
      cooldown: a.cooldown,
      description: a.description,
      isRanged: a.isRanged || undefined,
      range: a.isRanged ? a.range : undefined,
    })),
    description: description || `A custom ${size.toLowerCase()} ${type}.`,
  }), [name, cr, type, size, hp, ac, attackBonus, damageDie, damageBonus, dexMod, speed, description, abilities]);

  const handleSave = () => {
    const monster = buildMonster();
    const updated = [...savedMonsters.filter((m) => m.name !== monster.name), monster];
    setSavedMonsters(updated);
    saveCustomMonsters(roomId, updated);
    setShowForm(false);
  };

  const handleSpawn = (monster: Monster) => {
    onSpawn(monster, spawnCount);
  };

  const handleDelete = (monsterName: string) => {
    const updated = savedMonsters.filter((m) => m.name !== monsterName);
    setSavedMonsters(updated);
    saveCustomMonsters(roomId, updated);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Custom Monsters</label>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-[9px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Create'}
        </button>
      </div>

      {/* Creation form */}
      {showForm && (
        <div className="space-y-2 bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/50">
          {/* Name + CR */}
          <div className="flex gap-2">
            <input
              value={name} onChange={(e) => setName(e.target.value)}
              className="flex-1 text-xs bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:border-purple-500 outline-none"
              placeholder="Monster name"
            />
            <select
              value={cr} onChange={(e) => handleCRChange(Number(e.target.value))}
              className="text-xs bg-slate-800 border border-slate-700 rounded px-1 py-1 text-slate-200"
            >
              {CR_OPTIONS.map((c) => <option key={c} value={c}>CR {formatCR(c)}</option>)}
            </select>
          </div>

          {/* Type + Size */}
          <div className="flex gap-2">
            <select value={type} onChange={(e) => setType(e.target.value as MonsterType)} className="flex-1 text-[10px] bg-slate-800 border border-slate-700 rounded px-1 py-1 text-slate-200">
              {MONSTER_TYPES.map((t) => <option key={t} value={t}>{TYPE_ICONS[t]} {t}</option>)}
            </select>
            <select value={size} onChange={(e) => setSize(e.target.value as MonsterSize)} className="flex-1 text-[10px] bg-slate-800 border border-slate-700 rounded px-1 py-1 text-slate-200">
              {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'HP', value: hp, set: setHp },
              { label: 'AC', value: ac, set: setAc },
              { label: 'Atk+', value: attackBonus, set: setAttackBonus },
              { label: 'Dmg+', value: damageBonus, set: setDamageBonus },
              { label: 'DEX', value: dexMod, set: setDexMod },
              { label: 'Speed', value: speed, set: setSpeed },
            ].map(({ label, value, set }) => (
              <div key={label} className="flex items-center gap-1">
                <span className="text-[9px] text-slate-500 w-8">{label}</span>
                <input
                  type="number" value={value} onChange={(e) => set(Number(e.target.value))}
                  className="w-full text-[10px] bg-slate-800 border border-slate-700 rounded px-1 py-0.5 text-slate-200 text-center"
                />
              </div>
            ))}
          </div>

          {/* Damage die */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-slate-500">Damage Die</span>
            <input
              value={damageDie} onChange={(e) => setDamageDie(e.target.value)}
              className="flex-1 text-[10px] bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-slate-200"
              placeholder="1d8"
            />
          </div>

          {/* Description */}
          <input
            value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full text-[10px] bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
            placeholder="Description (optional)"
          />

          {/* Abilities */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500 font-semibold uppercase">Abilities</span>
              <button onClick={() => setAbilities([...abilities, { ...EMPTY_ABILITY }])} className="text-[8px] text-purple-400 hover:text-purple-300">+ Add</button>
            </div>
            {abilities.map((ab, i) => (
              <div key={i} className="flex gap-1 items-start bg-slate-900/40 rounded p-1.5">
                <div className="flex-1 space-y-1">
                  <div className="flex gap-1">
                    <input value={ab.name} onChange={(e) => { const u = [...abilities]; u[i] = { ...ab, name: e.target.value }; setAbilities(u); }} className="flex-1 text-[9px] bg-slate-800 border border-slate-700 rounded px-1 py-0.5 text-slate-200" placeholder="Name" />
                    <select value={ab.type} onChange={(e) => { const u = [...abilities]; u[i] = { ...ab, type: e.target.value as EnemyAbility['type'] }; setAbilities(u); }} className="text-[9px] bg-slate-800 border border-slate-700 rounded px-1 py-0.5 text-slate-200">
                      {ABILITY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-1">
                    <input value={ab.damageDie} onChange={(e) => { const u = [...abilities]; u[i] = { ...ab, damageDie: e.target.value }; setAbilities(u); }} className="w-14 text-[9px] bg-slate-800 border border-slate-700 rounded px-1 py-0.5 text-slate-200" placeholder="Die" />
                    <input type="number" value={ab.cooldown} onChange={(e) => { const u = [...abilities]; u[i] = { ...ab, cooldown: Number(e.target.value) }; setAbilities(u); }} className="w-10 text-[9px] bg-slate-800 border border-slate-700 rounded px-1 py-0.5 text-slate-200" title="Cooldown" />
                    <label className="flex items-center gap-0.5 text-[8px] text-slate-400">
                      <input type="checkbox" checked={ab.isRanged} onChange={(e) => { const u = [...abilities]; u[i] = { ...ab, isRanged: e.target.checked }; setAbilities(u); }} className="w-3 h-3" />
                      Ranged
                    </label>
                  </div>
                </div>
                <button onClick={() => setAbilities(abilities.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300 text-[10px] px-1">×</button>
              </div>
            ))}
          </div>

          {/* Save + Spawn buttons */}
          <div className="flex gap-2 pt-1">
            <button onClick={handleSave} className="flex-1 text-[10px] py-1.5 rounded bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30 font-semibold transition-colors">
              Save Monster
            </button>
            <button onClick={() => handleSpawn(buildMonster())} className="flex-1 text-[10px] py-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 font-semibold transition-colors">
              Spawn Now
            </button>
          </div>
        </div>
      )}

      {/* Saved monsters list */}
      {savedMonsters.length > 0 && !showForm && (
        <div className="space-y-1">
          {savedMonsters.map((m) => (
            <div key={m.name} className="flex items-center gap-2 bg-slate-800/40 rounded-lg p-2 border border-slate-700/40">
              <span className="text-sm">{TYPE_ICONS[m.type] || '👹'}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold text-slate-200 truncate">{m.name}</div>
                <div className="text-[9px] text-slate-500">CR {formatCR(m.cr)} · {m.size} {m.type} · HP {m.hp[0]} · AC {m.ac}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <input
                  type="number" min={1} max={10} value={spawnCount}
                  onChange={(e) => setSpawnCount(Math.max(1, Math.min(10, Number(e.target.value))))}
                  className="w-8 text-center text-[9px] bg-slate-800 border border-slate-700 rounded py-0.5 text-slate-200"
                />
                <button onClick={() => handleSpawn(m)} className="text-[9px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-colors">
                  Spawn
                </button>
                <button onClick={() => handleDelete(m.name)} className="text-[9px] text-slate-600 hover:text-red-400 transition-colors">×</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {savedMonsters.length === 0 && !showForm && (
        <p className="text-[9px] text-slate-600 italic">No custom monsters yet. Click + Create to build one.</p>
      )}
    </div>
  );
}
