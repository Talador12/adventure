// Armor class breakdown — show AC sources (base + armor + shield + DEX + magic).

export interface ACSource { label: string; value: number; }
export interface ACBreakdown { total: number; sources: ACSource[]; formula: string; }

export type ArmorType = 'unarmored' | 'light' | 'medium' | 'heavy' | 'natural' | 'mage_armor';

const ARMOR_BASE: Record<string, { base: number; type: ArmorType; maxDex: number }> = {
  'None': { base: 10, type: 'unarmored', maxDex: 99 },
  'Padded': { base: 11, type: 'light', maxDex: 99 },
  'Leather': { base: 11, type: 'light', maxDex: 99 },
  'Studded Leather': { base: 12, type: 'light', maxDex: 99 },
  'Hide': { base: 12, type: 'medium', maxDex: 2 },
  'Chain Shirt': { base: 13, type: 'medium', maxDex: 2 },
  'Scale Mail': { base: 14, type: 'medium', maxDex: 2 },
  'Breastplate': { base: 14, type: 'medium', maxDex: 2 },
  'Half Plate': { base: 15, type: 'medium', maxDex: 2 },
  'Ring Mail': { base: 14, type: 'heavy', maxDex: 0 },
  'Chain Mail': { base: 16, type: 'heavy', maxDex: 0 },
  'Splint': { base: 17, type: 'heavy', maxDex: 0 },
  'Plate': { base: 18, type: 'heavy', maxDex: 0 },
  'Mage Armor': { base: 13, type: 'mage_armor', maxDex: 99 },
  'Natural Armor': { base: 10, type: 'natural', maxDex: 99 },
};

export function calculateACBreakdown(armorName: string, dexMod: number, hasShield: boolean, magicBonus: number = 0, otherBonuses: ACSource[] = []): ACBreakdown {
  const armor = ARMOR_BASE[armorName] || ARMOR_BASE['None'];
  const sources: ACSource[] = [];
  const effectiveDex = Math.min(dexMod, armor.maxDex);

  sources.push({ label: `Base (${armorName || 'Unarmored'})`, value: armor.base });
  if (effectiveDex > 0 && armor.maxDex > 0) sources.push({ label: `DEX mod${armor.maxDex < 99 ? ` (max +${armor.maxDex})` : ''}`, value: effectiveDex });
  if (hasShield) sources.push({ label: 'Shield', value: 2 });
  if (magicBonus > 0) sources.push({ label: 'Magic bonus', value: magicBonus });
  for (const b of otherBonuses) sources.push(b);

  const total = sources.reduce((s, src) => s + src.value, 0);
  const formula = sources.map((s) => `${s.value}`).join(' + ');
  return { total, sources, formula };
}

export function formatACBreakdown(breakdown: ACBreakdown, characterName: string): string {
  const lines = [`🛡️ **${characterName}**: AC **${breakdown.total}**`];
  for (const s of breakdown.sources) lines.push(`  + ${s.value} (${s.label})`);
  lines.push(`  = ${breakdown.formula} = **${breakdown.total}**`);
  return lines.join('\n');
}

export function getArmorNames(): string[] { return Object.keys(ARMOR_BASE); }
