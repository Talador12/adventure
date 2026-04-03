// Combat stance system — aggressive/defensive/balanced with trade-offs.
// Characters choose a stance at the start of their turn for tactical options.

export type Stance = 'aggressive' | 'defensive' | 'balanced' | 'reckless' | 'protective';

export interface StanceConfig {
  stance: Stance;
  name: string;
  emoji: string;
  description: string;
  attackBonus: number;
  damageBonus: number;
  acBonus: number;
  speedBonus: number; // cells
  savingThrowBonus: number;
  drawback: string;
}

export const STANCES: StanceConfig[] = [
  {
    stance: 'balanced', name: 'Balanced', emoji: '⚖️',
    description: 'Standard combat posture. No bonuses or penalties.',
    attackBonus: 0, damageBonus: 0, acBonus: 0, speedBonus: 0, savingThrowBonus: 0,
    drawback: 'None',
  },
  {
    stance: 'aggressive', name: 'Aggressive', emoji: '⚔️',
    description: 'Press the attack. More damage but exposed.',
    attackBonus: 2, damageBonus: 2, acBonus: -2, speedBonus: 1, savingThrowBonus: 0,
    drawback: '-2 AC',
  },
  {
    stance: 'defensive', name: 'Defensive', emoji: '🛡️',
    description: 'Hunker down. Hard to hit but less effective offensively.',
    attackBonus: -2, damageBonus: 0, acBonus: 2, speedBonus: -1, savingThrowBonus: 1,
    drawback: '-2 attack, -5ft speed',
  },
  {
    stance: 'reckless', name: 'Reckless', emoji: '💀',
    description: 'All-out assault. Devastating but dangerous.',
    attackBonus: 4, damageBonus: 4, acBonus: -4, speedBonus: 2, savingThrowBonus: -2,
    drawback: '-4 AC, -2 saving throws',
  },
  {
    stance: 'protective', name: 'Protective', emoji: '🫂',
    description: 'Shield allies. Redirect attacks toward yourself.',
    attackBonus: -1, damageBonus: 0, acBonus: 1, speedBonus: 0, savingThrowBonus: 0,
    drawback: '-1 attack. Adjacent allies gain +1 AC.',
  },
];

export function getStance(stance: Stance): StanceConfig {
  return STANCES.find((s) => s.stance === stance) || STANCES[0];
}

export function applyStanceModifiers(
  baseAttack: number,
  baseDamage: number,
  baseAC: number,
  baseSpeed: number,
  stance: Stance,
): { attack: number; damage: number; ac: number; speed: number } {
  const config = getStance(stance);
  return {
    attack: baseAttack + config.attackBonus,
    damage: baseDamage + config.damageBonus,
    ac: baseAC + config.acBonus,
    speed: Math.max(0, baseSpeed + config.speedBonus),
  };
}

export function formatStanceOptions(): string {
  const lines = ['⚔️ **Combat Stances:**'];
  for (const s of STANCES) {
    const mods: string[] = [];
    if (s.attackBonus !== 0) mods.push(`${s.attackBonus > 0 ? '+' : ''}${s.attackBonus} atk`);
    if (s.damageBonus !== 0) mods.push(`${s.damageBonus > 0 ? '+' : ''}${s.damageBonus} dmg`);
    if (s.acBonus !== 0) mods.push(`${s.acBonus > 0 ? '+' : ''}${s.acBonus} AC`);
    if (s.speedBonus !== 0) mods.push(`${s.speedBonus > 0 ? '+' : ''}${s.speedBonus * 5}ft`);
    lines.push(`${s.emoji} **${s.name}**: ${s.description}${mods.length > 0 ? ` (${mods.join(', ')})` : ''}`);
  }
  return lines.join('\n');
}
