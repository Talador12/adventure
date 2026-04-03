// Minion rules — simplified 1-HP enemies for horde encounters.
// Minions die on any hit, deal static damage, and can be spawned in bulk.

export interface MinionTemplate {
  id: string;
  name: string;
  ac: number;
  speed: number;
  attackBonus: number;
  staticDamage: number;
  damageType: string;
  cr: number;
  xpValue: number;
  specialTrait?: string;
}

export const MINION_TEMPLATES: MinionTemplate[] = [
  { id: 'goblin-m', name: 'Goblin Minion', ac: 13, speed: 6, attackBonus: 4, staticDamage: 3, damageType: 'slashing', cr: 0.125, xpValue: 5, specialTrait: 'Nimble Escape: Disengage as bonus action' },
  { id: 'skeleton-m', name: 'Skeleton Minion', ac: 13, speed: 6, attackBonus: 4, staticDamage: 4, damageType: 'piercing', cr: 0.125, xpValue: 5, specialTrait: 'Vulnerable to bludgeoning' },
  { id: 'zombie-m', name: 'Zombie Minion', ac: 8, speed: 4, attackBonus: 3, staticDamage: 3, damageType: 'bludgeoning', cr: 0.125, xpValue: 5 },
  { id: 'bandit-m', name: 'Bandit Minion', ac: 12, speed: 6, attackBonus: 3, staticDamage: 3, damageType: 'slashing', cr: 0.125, xpValue: 5 },
  { id: 'cultist-m', name: 'Cultist Minion', ac: 12, speed: 6, attackBonus: 3, staticDamage: 2, damageType: 'slashing', cr: 0.125, xpValue: 5, specialTrait: 'Dark Devotion: Advantage on saves vs charm/fright' },
  { id: 'kobold-m', name: 'Kobold Minion', ac: 12, speed: 6, attackBonus: 4, staticDamage: 3, damageType: 'piercing', cr: 0.125, xpValue: 5, specialTrait: 'Pack Tactics: Advantage if ally within 5ft' },
  { id: 'imp-m', name: 'Imp Minion', ac: 13, speed: 4, attackBonus: 5, staticDamage: 4, damageType: 'piercing', cr: 0.25, xpValue: 10, specialTrait: 'Fly 8, Invisibility (until it attacks)' },
  { id: 'orc-m', name: 'Orc Minion', ac: 13, speed: 6, attackBonus: 5, staticDamage: 5, damageType: 'slashing', cr: 0.25, xpValue: 10, specialTrait: 'Aggressive: Bonus action to move toward hostile' },
];

export function createMinions(templateId: string, count: number): { id: string; name: string; templateId: string; alive: boolean }[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${templateId}-${i + 1}`,
    name: `${MINION_TEMPLATES.find((t) => t.id === templateId)?.name || 'Minion'} ${i + 1}`,
    templateId,
    alive: true,
  }));
}

export function getMinionTemplate(id: string): MinionTemplate | undefined {
  return MINION_TEMPLATES.find((t) => t.id === id);
}

export function calculateMinionXP(templateId: string, count: number): number {
  const template = getMinionTemplate(templateId);
  return (template?.xpValue || 0) * count;
}

export function formatMinionGroup(templateId: string, count: number, alive: number): string {
  const template = getMinionTemplate(templateId);
  if (!template) return 'Unknown minion template.';
  const lines = [`💀 **${template.name}** ×${alive}/${count}`];
  lines.push(`AC: ${template.ac} | HP: 1 | Attack: +${template.attackBonus} for ${template.staticDamage} ${template.damageType}`);
  lines.push(`Speed: ${template.speed * 5}ft | CR: ${template.cr} | XP: ${template.xpValue} each`);
  if (template.specialTrait) lines.push(`*${template.specialTrait}*`);
  lines.push(`*Minion rule: Dies on any hit. On a save for half damage, takes no damage instead.*`);
  return lines.join('\n');
}
