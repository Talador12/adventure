// Poison crafting system — harvest, apply, and track poisons.

export interface Poison { id: string; name: string; type: 'contact' | 'ingested' | 'inhaled' | 'injury'; dc: number; effect: string; harvestDC: number; craftCost: number; duration: string; }

export const POISONS: Poison[] = [
  { id: 'basic', name: 'Basic Poison', type: 'injury', dc: 10, effect: '1d4 poison damage.', harvestDC: 10, craftCost: 25, duration: '1 minute' },
  { id: 'serpent', name: 'Serpent Venom', type: 'injury', dc: 11, effect: '3d6 poison damage (half on save).', harvestDC: 14, craftCost: 100, duration: '1 minute' },
  { id: 'drow', name: 'Drow Poison', type: 'injury', dc: 13, effect: 'Unconscious for 1 hour (save at advantage after 1 min).', harvestDC: 16, craftCost: 200, duration: '1 hour' },
  { id: 'pale-tincture', name: 'Pale Tincture', type: 'ingested', dc: 16, effect: '1d6 poison/24h for 7 days. CON saves to end.', harvestDC: 18, craftCost: 500, duration: '7 days' },
  { id: 'torpor', name: 'Torpor', type: 'ingested', dc: 15, effect: 'Poisoned + incapacitated for 4d6 hours.', harvestDC: 16, craftCost: 300, duration: '4d6 hours' },
  { id: 'truth-serum', name: 'Truth Serum', type: 'ingested', dc: 11, effect: 'Can\'t knowingly lie for 1 hour.', harvestDC: 12, craftCost: 75, duration: '1 hour' },
  { id: 'midnight-tears', name: 'Midnight Tears', type: 'ingested', dc: 17, effect: 'No effect until midnight, then 9d6 poison damage.', harvestDC: 20, craftCost: 1500, duration: 'Delayed' },
  { id: 'carrion-crawler', name: 'Carrion Crawler Mucus', type: 'contact', dc: 13, effect: 'Poisoned + paralyzed for 1 minute (save each round).', harvestDC: 14, craftCost: 150, duration: '1 minute' },
];

export function getPoison(id: string): Poison | undefined { return POISONS.find((p) => p.id === id); }

export function applyPoison(weaponName: string, poisonId: string): string {
  const poison = getPoison(poisonId);
  if (!poison) return 'Unknown poison.';
  return `☠️ **${poison.name}** applied to ${weaponName}.\nNext hit: target makes CON DC ${poison.dc} save.\nEffect: ${poison.effect}\nDuration: ${poison.duration}`;
}

export function harvestPoison(poisonId: string, natureMod: number): { success: boolean; roll: number; narration: string } {
  const poison = getPoison(poisonId);
  if (!poison) return { success: false, roll: 0, narration: 'Unknown poison.' };
  const roll = Math.floor(Math.random() * 20) + 1 + natureMod;
  const success = roll >= poison.harvestDC;
  return { success, roll, narration: success ? `✅ Harvested **${poison.name}**! (${roll} ≥ DC ${poison.harvestDC})` : `❌ Failed to harvest. (${roll} < DC ${poison.harvestDC}) ${roll === 1 ? '⚠️ You poison yourself!' : ''}` };
}

export function formatPoisonList(): string {
  const lines = ['☠️ **Poisons:**'];
  for (const p of POISONS) lines.push(`• **${p.name}** (${p.type}, DC ${p.dc}): ${p.effect} — Harvest DC ${p.harvestDC}, ${p.craftCost}gp`);
  return lines.join('\n');
}
