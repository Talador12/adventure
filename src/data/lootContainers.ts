// Random loot container — chest/corpse/cache with themed contents.

export interface LootContainer { type: string; description: string; contents: string[]; trap: string | null; totalValue: number; }

const CONTAINER_TYPES = ['Wooden chest', 'Iron-banded strongbox', 'Rotting sack', 'Skeleton\'s belongings', 'Hidden wall cache', 'Hollow tree stump', 'Under a loose flagstone', 'Inside a statue\'s mouth', 'Buried crate', 'Leather satchel'];
const MUNDANE_LOOT = ['2d6 copper pieces', '1d4 silver pieces', 'A rusty dagger', 'A half-eaten ration', 'A torn map fragment', 'A wooden holy symbol', 'A set of loaded dice', 'A love letter (undelivered)', 'A key to an unknown lock', 'A small gemstone (10gp)'];
const GOOD_LOOT = ['3d6 gold pieces', 'A healing potion', 'A silver ring (25gp)', 'A spell scroll (1st level)', 'An ornate dagger (50gp)', 'A vial of holy water', 'A gem worth 50gp', 'A set of thieves\' tools'];
const TRAPS = ['Poison needle (CON DC 12, 1d4 poison)', 'Fire glyph (DEX DC 13, 2d6 fire)', 'Acid spray (DEX DC 11, 1d6 acid)', null, null, null]; // null = no trap

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateLootContainer(tier: 'low' | 'medium' | 'high' = 'medium'): LootContainer {
  const mundaneCount = tier === 'low' ? 2 : tier === 'medium' ? 3 : 2;
  const goodCount = tier === 'low' ? 0 : tier === 'medium' ? 1 : 3;
  const contents: string[] = [];
  for (let i = 0; i < mundaneCount; i++) contents.push(pick(MUNDANE_LOOT));
  for (let i = 0; i < goodCount; i++) contents.push(pick(GOOD_LOOT));
  const value = tier === 'low' ? 5 + Math.floor(Math.random() * 15) : tier === 'medium' ? 25 + Math.floor(Math.random() * 75) : 100 + Math.floor(Math.random() * 200);
  return { type: pick(CONTAINER_TYPES), description: `A ${pick(CONTAINER_TYPES).toLowerCase()}, ${pick(['dusty and old', 'recently placed', 'half-hidden', 'partially open', 'locked (DC 12)'])}.`, contents, trap: pick(TRAPS), totalValue: value };
}

export function formatLootContainer(container: LootContainer): string {
  const lines = [`📦 **${container.type}**`];
  lines.push(`*${container.description}*`);
  if (container.trap) lines.push(`🪤 **TRAPPED:** ${container.trap}`);
  lines.push('Contents:');
  for (const c of container.contents) lines.push(`  • ${c}`);
  lines.push(`~${container.totalValue}gp total value`);
  return lines.join('\n');
}
