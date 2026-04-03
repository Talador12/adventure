// Bulk NPC stat block generator — create N enemies with randomized HP.

export interface BulkEnemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  ac: number;
  attackBonus: number;
  damageDie: string;
  initiative: number;
  cr: number;
}

export interface BulkGenConfig {
  baseName: string;
  count: number;
  baseHp: number;
  hpVariance: number; // ± this amount
  ac: number;
  attackBonus: number;
  damageDie: string;
  dexMod: number;
  cr: number;
}

export function generateBulkEnemies(config: BulkGenConfig): BulkEnemy[] {
  return Array.from({ length: config.count }, (_, i) => {
    const hpRoll = config.baseHp + Math.floor(Math.random() * (config.hpVariance * 2 + 1)) - config.hpVariance;
    const hp = Math.max(1, hpRoll);
    return {
      id: `bulk-${crypto.randomUUID().slice(0, 8)}`,
      name: `${config.baseName} ${i + 1}`,
      hp, maxHp: hp, ac: config.ac,
      attackBonus: config.attackBonus, damageDie: config.damageDie,
      initiative: Math.floor(Math.random() * 20) + 1 + config.dexMod,
      cr: config.cr,
    };
  });
}

export const BULK_PRESETS: BulkGenConfig[] = [
  { baseName: 'Goblin', count: 6, baseHp: 7, hpVariance: 3, ac: 15, attackBonus: 4, damageDie: '1d6+2', dexMod: 2, cr: 0.25 },
  { baseName: 'Skeleton', count: 5, baseHp: 13, hpVariance: 4, ac: 13, attackBonus: 4, damageDie: '1d6+2', dexMod: 2, cr: 0.25 },
  { baseName: 'Bandit', count: 6, baseHp: 11, hpVariance: 3, ac: 12, attackBonus: 3, damageDie: '1d8+1', dexMod: 1, cr: 0.125 },
  { baseName: 'Kobold', count: 8, baseHp: 5, hpVariance: 2, ac: 12, attackBonus: 4, damageDie: '1d4+2', dexMod: 2, cr: 0.125 },
  { baseName: 'Orc', count: 4, baseHp: 15, hpVariance: 5, ac: 13, attackBonus: 5, damageDie: '1d12+3', dexMod: 1, cr: 0.5 },
  { baseName: 'Guard', count: 4, baseHp: 11, hpVariance: 3, ac: 16, attackBonus: 3, damageDie: '1d8+1', dexMod: 1, cr: 0.125 },
];

export function formatBulkEnemies(enemies: BulkEnemy[]): string {
  if (enemies.length === 0) return 'No enemies generated.';
  const lines = [`⚔️ **Bulk Enemies** (${enemies.length}):`];
  for (const e of enemies) {
    lines.push(`• **${e.name}**: ${e.hp} HP, AC ${e.ac}, +${e.attackBonus} (${e.damageDie}), Init ${e.initiative}`);
  }
  const totalXP = enemies.reduce((s, e) => s + (e.cr <= 0.25 ? 50 : e.cr <= 0.5 ? 100 : 200), 0);
  lines.push(`Total XP: ~${totalXP}`);
  return lines.join('\n');
}
