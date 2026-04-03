// Ammunition tracker — track arrows/bolts/darts/sling bullets per character.

export type AmmoType = 'arrows' | 'bolts' | 'darts' | 'sling_bullets' | 'blowgun_needles' | 'javelins';

export interface AmmoState {
  characterId: string;
  ammo: Record<AmmoType, number>;
}

export const AMMO_CONFIG: Record<AmmoType, { name: string; emoji: string; bundleSize: number; bundleCost: number }> = {
  arrows: { name: 'Arrows', emoji: '🏹', bundleSize: 20, bundleCost: 1 },
  bolts: { name: 'Crossbow Bolts', emoji: '➡️', bundleSize: 20, bundleCost: 1 },
  darts: { name: 'Darts', emoji: '🎯', bundleSize: 10, bundleCost: 0.5 },
  sling_bullets: { name: 'Sling Bullets', emoji: '⚫', bundleSize: 20, bundleCost: 0.04 },
  blowgun_needles: { name: 'Blowgun Needles', emoji: '📌', bundleSize: 50, bundleCost: 1 },
  javelins: { name: 'Javelins', emoji: '🗡️', bundleSize: 1, bundleCost: 0.5 },
};

export function createAmmoState(characterId: string): AmmoState {
  return { characterId, ammo: { arrows: 20, bolts: 0, darts: 0, sling_bullets: 0, blowgun_needles: 0, javelins: 0 } };
}

export function fireAmmo(state: AmmoState, type: AmmoType, count: number = 1): { state: AmmoState; success: boolean; remaining: number } {
  const current = state.ammo[type] || 0;
  if (current < count) return { state, success: false, remaining: current };
  const newAmmo = { ...state.ammo, [type]: current - count };
  return { state: { ...state, ammo: newAmmo }, success: true, remaining: current - count };
}

export function addAmmo(state: AmmoState, type: AmmoType, count: number): AmmoState {
  return { ...state, ammo: { ...state.ammo, [type]: (state.ammo[type] || 0) + count } };
}

export function recoverAmmo(state: AmmoState, type: AmmoType, firedCount: number): { state: AmmoState; recovered: number } {
  // After combat, recover half of fired ammo (rounded down)
  const recovered = Math.floor(firedCount / 2);
  return { state: addAmmo(state, type, recovered), recovered };
}

export function getActiveAmmoTypes(state: AmmoState): AmmoType[] {
  return (Object.entries(state.ammo) as [AmmoType, number][]).filter(([, v]) => v > 0).map(([k]) => k);
}

export function formatAmmoStatus(state: AmmoState, characterName: string): string {
  const active = getActiveAmmoTypes(state);
  if (active.length === 0) return `🏹 **${characterName}**: No ammunition tracked.`;
  const lines = [`🏹 **${characterName}'s Ammunition:**`];
  for (const type of active) {
    const config = AMMO_CONFIG[type];
    const count = state.ammo[type];
    const warning = count <= 5 ? ' ⚠️ LOW' : count === 0 ? ' ❌ EMPTY' : '';
    lines.push(`  ${config.emoji} ${config.name}: ${count}${warning}`);
  }
  return lines.join('\n');
}
