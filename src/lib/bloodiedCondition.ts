// Bloodied condition — visual/mechanical indicator when units drop below 50% HP.
// Optional 4e-inspired rule that adds tactical information and triggers.

export interface BloodiedState {
  unitId: string;
  isBloodied: boolean;
  wasBloodied: boolean; // ever been bloodied this combat
  bloodiedThreshold: number;
}

export interface BloodiedConfig {
  enabled: boolean;
  revealToPlayers: boolean; // show bloodied status to players (DM always sees)
  triggerEffects: boolean;  // apply mechanical effects when bloodied
  threshold: number;        // percentage (default 50)
}

export const DEFAULT_BLOODIED_CONFIG: BloodiedConfig = {
  enabled: true,
  revealToPlayers: true,
  triggerEffects: false,
  threshold: 50,
};

export function checkBloodied(currentHp: number, maxHp: number, threshold: number = 50): boolean {
  if (maxHp <= 0) return false;
  return currentHp > 0 && (currentHp / maxHp) * 100 <= threshold;
}

export function getBloodiedNarration(unitName: string, wasAlreadyBloodied: boolean): string {
  if (wasAlreadyBloodied) return '';
  const descriptions = [
    `${unitName} staggers, visibly wounded!`,
    `Blood flows freely from ${unitName}'s injuries.`,
    `${unitName} snarls in pain — they're hurt badly!`,
    `${unitName} is reeling from the damage!`,
    `${unitName} drops to one knee before rising again, bloodied but defiant.`,
  ];
  return `🩸 ${descriptions[Math.floor(Math.random() * descriptions.length)]}`;
}

export function getBloodiedEffects(unitType: 'player' | 'enemy'): string[] {
  if (unitType === 'enemy') {
    return [
      'Morale check may trigger (see Morale system)',
      'May attempt to flee or surrender',
      'Some creatures gain Bloodied Frenzy (+2 damage)',
    ];
  }
  return [
    'Allies within 30ft gain awareness of injury',
    'Healing spells may be prioritized by support classes',
  ];
}

export function countBloodied(units: { id: string; hp: number; maxHp: number; type: string }[]): { bloodiedEnemies: number; bloodiedPlayers: number; totalEnemies: number; totalPlayers: number } {
  let bloodiedEnemies = 0, bloodiedPlayers = 0, totalEnemies = 0, totalPlayers = 0;
  for (const u of units) {
    if (u.hp <= 0) continue;
    if (u.type === 'enemy') { totalEnemies++; if (checkBloodied(u.hp, u.maxHp)) bloodiedEnemies++; }
    else if (u.type === 'player') { totalPlayers++; if (checkBloodied(u.hp, u.maxHp)) bloodiedPlayers++; }
  }
  return { bloodiedEnemies, bloodiedPlayers, totalEnemies, totalPlayers };
}

export function formatBloodiedStatus(units: { id: string; name: string; hp: number; maxHp: number; type: string }[]): string {
  const bloodied = units.filter((u) => u.hp > 0 && checkBloodied(u.hp, u.maxHp));
  if (bloodied.length === 0) return '🩸 No units are bloodied.';
  const lines = ['🩸 **Bloodied Units:**'];
  for (const u of bloodied) {
    const pct = Math.round((u.hp / u.maxHp) * 100);
    lines.push(`• **${u.name}** (${u.type}): ${u.hp}/${u.maxHp} HP (${pct}%)`);
  }
  return lines.join('\n');
}
