// HomebrewEditor — DM tool to create custom spells and items.
// Homebrew content is stored per-campaign in localStorage and can be assigned to characters.

import { useState, useCallback } from 'react';
import { useGame, type Spell, type Item } from '../../contexts/GameContext';
import type { SpellSchool } from '../../types/game';

const SPELL_SCHOOLS: SpellSchool[] = ['abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'illusion', 'necromancy', 'transmutation'];
const ITEM_TYPES = ['weapon', 'armor', 'potion', 'scroll', 'wondrous', 'ring', 'wand', 'staff'] as const;
const RARITIES = ['common', 'uncommon', 'rare', 'very_rare', 'legendary'] as const;

interface HomebrewEditorProps {
  roomId: string;
}

function storageKey(roomId: string, type: 'spells' | 'items'): string {
  return `adventure:homebrew:${roomId}:${type}`;
}

function loadHomebrew<T>(roomId: string, type: 'spells' | 'items'): T[] {
  try {
    const raw = localStorage.getItem(storageKey(roomId, type));
    return raw ? JSON.parse(raw) as T[] : [];
  } catch { return []; }
}

function saveHomebrew<T>(roomId: string, type: 'spells' | 'items', data: T[]): void {
  try { localStorage.setItem(storageKey(roomId, type), JSON.stringify(data)); } catch { /* ok */ }
}

export default function HomebrewEditor({ roomId }: HomebrewEditorProps) {
  const { characters, updateCharacter } = useGame();
  const [mode, setMode] = useState<'spells' | 'items'>('spells');
  const [customSpells, setCustomSpells] = useState<Spell[]>(() => loadHomebrew(roomId, 'spells'));
  const [customItems, setCustomItems] = useState<Item[]>(() => loadHomebrew(roomId, 'items'));

  // Spell form state
  const [spellName, setSpellName] = useState('');
  const [spellLevel, setSpellLevel] = useState(1);
  const [spellSchool, setSpellSchool] = useState<SpellSchool>('evocation');
  const [spellDesc, setSpellDesc] = useState('');
  const [spellDamage, setSpellDamage] = useState('');
  const [spellRange, setSpellRange] = useState('60ft');
  const [spellConc, setSpellConc] = useState(false);

  // Item form state
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState<typeof ITEM_TYPES[number]>('weapon');
  const [itemRarity, setItemRarity] = useState<typeof RARITIES[number]>('uncommon');
  const [itemDesc, setItemDesc] = useState('');
  const [itemValue, setItemValue] = useState(50);
  const [itemDamage, setItemDamage] = useState('');
  const [itemAcBonus, setItemAcBonus] = useState(0);

  const addSpell = useCallback(() => {
    if (!spellName.trim()) return;
    const spell: Spell = {
      id: `hb-${crypto.randomUUID().slice(0, 8)}`,
      name: spellName.trim(),
      level: spellLevel,
      school: spellSchool,
      description: spellDesc.trim() || `Custom ${spellSchool} spell.`,
      damage: spellDamage.trim() || undefined,
      range: spellRange.trim() || '60ft',
      duration: spellConc ? 'Concentration, 1 minute' : 'Instantaneous',
      isConcentration: spellConc,
      classes: [],
    };
    const next = [...customSpells, spell];
    setCustomSpells(next);
    saveHomebrew(roomId, 'spells', next);
    setSpellName(''); setSpellDesc(''); setSpellDamage('');
  }, [spellName, spellLevel, spellSchool, spellDesc, spellDamage, spellRange, spellConc, customSpells, roomId]);

  const removeSpell = useCallback((id: string) => {
    const next = customSpells.filter((s) => s.id !== id);
    setCustomSpells(next);
    saveHomebrew(roomId, 'spells', next);
  }, [customSpells, roomId]);

  const addItem = useCallback(() => {
    if (!itemName.trim()) return;
    const item: Item = {
      id: `hb-${crypto.randomUUID().slice(0, 8)}`,
      name: itemName.trim(),
      type: itemType === 'weapon' ? 'weapon' : itemType === 'armor' ? 'armor' : itemType === 'potion' ? 'potion' : 'misc',
      rarity: itemRarity === 'very_rare' ? 'rare' : itemRarity === 'legendary' ? 'epic' : itemRarity,
      description: itemDesc.trim() || `Custom ${itemType}.`,
      value: itemValue,
      damage: itemDamage.trim() || undefined,
      acBonus: itemAcBonus || undefined,
      stackable: itemType === 'potion' || itemType === 'scroll',
      quantity: 1,
    };
    const next = [...customItems, item];
    setCustomItems(next);
    saveHomebrew(roomId, 'items', next);
    setItemName(''); setItemDesc(''); setItemDamage(''); setItemAcBonus(0);
  }, [itemName, itemType, itemRarity, itemDesc, itemValue, itemDamage, itemAcBonus, customItems, roomId]);

  const removeItem = useCallback((id: string) => {
    const next = customItems.filter((i) => i.id !== id);
    setCustomItems(next);
    saveHomebrew(roomId, 'items', next);
  }, [customItems, roomId]);

  const grantSpellToCharacter = useCallback((spell: Spell, charId: string) => {
    const char = characters.find((c) => c.id === charId);
    if (!char) return;
    const existing = char.customSpells || [];
    if (existing.some((s) => s.id === spell.id)) return;
    updateCharacter(charId, { customSpells: [...existing, spell] });
  }, [characters, updateCharacter]);

  const grantItemToCharacter = useCallback((item: Item, charId: string) => {
    const char = characters.find((c) => c.id === charId);
    if (!char) return;
    const inv = [...(char.inventory || []), item];
    updateCharacter(charId, { inventory: inv });
  }, [characters, updateCharacter]);

  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        <button onClick={() => setMode('spells')} className={`text-[10px] px-2 py-1 rounded font-semibold ${mode === 'spells' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : 'text-slate-500 hover:text-slate-300'}`}>Spells</button>
        <button onClick={() => setMode('items')} className={`text-[10px] px-2 py-1 rounded font-semibold ${mode === 'items' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-500 hover:text-slate-300'}`}>Items</button>
      </div>

      {mode === 'spells' ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1.5">
            <input value={spellName} onChange={(e) => setSpellName(e.target.value)} placeholder="Spell name" className="col-span-2 text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600" />
            <select value={spellLevel} onChange={(e) => setSpellLevel(Number(e.target.value))} className="text-[10px] px-1 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
              {[0,1,2,3,4,5,6,7,8,9].map((l) => <option key={l} value={l}>{l === 0 ? 'Cantrip' : `Level ${l}`}</option>)}
            </select>
            <select value={spellSchool} onChange={(e) => setSpellSchool(e.target.value as SpellSchool)} className="text-[10px] px-1 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
              {SPELL_SCHOOLS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input value={spellDamage} onChange={(e) => setSpellDamage(e.target.value)} placeholder="Damage (e.g. 3d6)" className="text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600" />
            <input value={spellRange} onChange={(e) => setSpellRange(e.target.value)} placeholder="Range" className="text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600" />
            <label className="col-span-2 flex items-center gap-1 text-[10px] text-slate-400">
              <input type="checkbox" checked={spellConc} onChange={(e) => setSpellConc(e.target.checked)} /> Concentration
            </label>
          </div>
          <textarea value={spellDesc} onChange={(e) => setSpellDesc(e.target.value)} placeholder="Description..." rows={2} className="w-full text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 resize-none" />
          <button onClick={addSpell} disabled={!spellName.trim()} className="w-full text-[10px] py-1.5 rounded bg-purple-600/30 border border-purple-500/40 text-purple-300 font-semibold hover:bg-purple-500/30 disabled:opacity-30 transition-all">+ Create Spell</button>

          {customSpells.length > 0 && (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {customSpells.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-2 py-1 rounded bg-slate-800/50 border border-slate-700/30">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-purple-300">{s.name}</span>
                    <span className="text-[8px] text-slate-500 ml-1">Lv{s.level} {s.school}{s.damage ? ` ${s.damage}` : ''}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <select onChange={(e) => { if (e.target.value) grantSpellToCharacter(s, e.target.value); e.target.value = ''; }} className="text-[8px] px-1 py-0.5 rounded bg-slate-700 border-none text-slate-400">
                      <option value="">Grant to...</option>
                      {characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <button onClick={() => removeSpell(s.id)} className="text-[9px] text-red-500 hover:text-red-400">&times;</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1.5">
            <input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item name" className="col-span-2 text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600" />
            <select value={itemType} onChange={(e) => setItemType(e.target.value as typeof ITEM_TYPES[number])} className="text-[10px] px-1 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
              {ITEM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={itemRarity} onChange={(e) => setItemRarity(e.target.value as typeof RARITIES[number])} className="text-[10px] px-1 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
              {RARITIES.map((r) => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
            </select>
            <input type="number" value={itemValue} onChange={(e) => setItemValue(Number(e.target.value))} placeholder="Value (gp)" className="text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300" />
            <input value={itemDamage} onChange={(e) => setItemDamage(e.target.value)} placeholder="Damage (e.g. 2d6)" className="text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600" />
          </div>
          <textarea value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} placeholder="Description..." rows={2} className="w-full text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 resize-none" />
          <button onClick={addItem} disabled={!itemName.trim()} className="w-full text-[10px] py-1.5 rounded bg-amber-600/30 border border-amber-500/40 text-amber-300 font-semibold hover:bg-amber-500/30 disabled:opacity-30 transition-all">+ Create Item</button>

          {customItems.length > 0 && (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {customItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-2 py-1 rounded bg-slate-800/50 border border-slate-700/30">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-amber-300">{item.name}</span>
                    <span className="text-[8px] text-slate-500 ml-1">{item.type} · {item.rarity}{item.damage ? ` · ${item.damage}` : ''}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <select onChange={(e) => { if (e.target.value) grantItemToCharacter(item, e.target.value); e.target.value = ''; }} className="text-[8px] px-1 py-0.5 rounded bg-slate-700 border-none text-slate-400">
                      <option value="">Grant to...</option>
                      {characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <button onClick={() => removeItem(item.id)} className="text-[9px] text-red-500 hover:text-red-400">&times;</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
