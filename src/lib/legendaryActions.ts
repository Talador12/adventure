// Legendary action tracker — manage legendary and lair actions for boss monsters.
// Bosses get 3 legendary actions per round, refreshing at start of their turn.

export interface LegendaryAction {
  name: string;
  cost: number; // 1-3 legendary actions
  description: string;
}

export interface LairAction {
  name: string;
  description: string;
  initiativeCount: number; // typically 20
}

export interface LegendaryMonster {
  id: string;
  name: string;
  maxLegendaryActions: number;
  currentLegendaryActions: number;
  legendaryActions: LegendaryAction[];
  lairActions: LairAction[];
  hasLair: boolean;
  usedLairThisRound: boolean;
}

export const LEGENDARY_TEMPLATES: Omit<LegendaryMonster, 'id' | 'currentLegendaryActions' | 'usedLairThisRound'>[] = [
  {
    name: 'Adult Dragon', maxLegendaryActions: 3,
    legendaryActions: [
      { name: 'Detect', cost: 1, description: 'Make a Perception check.' },
      { name: 'Tail Attack', cost: 1, description: 'Make a tail attack (+11, 2d8+6 bludgeoning).' },
      { name: 'Wing Attack', cost: 2, description: 'All creatures within 10ft make DC 19 DEX save or take 2d6+6 bludgeoning and are knocked prone. Dragon flies up to half its speed.' },
    ],
    lairActions: [
      { name: 'Magma Eruption', description: 'A geyser of magma erupts. DC 15 DEX save or 3d6 fire damage.', initiativeCount: 20 },
      { name: 'Tremor', description: 'The ground shakes. DC 15 DEX save or fall prone.', initiativeCount: 20 },
    ],
    hasLair: true,
  },
  {
    name: 'Lich', maxLegendaryActions: 3,
    legendaryActions: [
      { name: 'Cantrip', cost: 1, description: 'Cast a cantrip.' },
      { name: 'Paralyzing Touch', cost: 1, description: 'Touch attack: DC 18 CON save or paralyzed.' },
      { name: 'Frightening Gaze', cost: 2, description: 'One creature within 10ft: DC 18 WIS save or frightened for 1 minute.' },
      { name: 'Disrupt Life', cost: 3, description: 'All living creatures within 20ft take 6d6 necrotic damage (DC 18 CON half).' },
    ],
    lairActions: [
      { name: 'Spirit Tether', description: 'One creature DC 18 CON save or restrained by ghostly hands.', initiativeCount: 20 },
      { name: 'Rot', description: 'Food and water within the lair spoil. Potions require DC 13 save or become inert.', initiativeCount: 20 },
    ],
    hasLair: true,
  },
  {
    name: 'Beholder', maxLegendaryActions: 3,
    legendaryActions: [
      { name: 'Eye Ray', cost: 1, description: 'Use one random eye ray.' },
    ],
    lairActions: [
      { name: 'Slippery Surfaces', description: 'A 10ft square becomes slimy. Difficult terrain + DC 10 DEX or fall prone.', initiativeCount: 20 },
      { name: 'Grasping Appendages', description: 'Tendrils grow in 10ft square. DC 15 STR or restrained.', initiativeCount: 20 },
    ],
    hasLair: true,
  },
];

export function createLegendaryMonster(template: typeof LEGENDARY_TEMPLATES[0]): LegendaryMonster {
  return { id: crypto.randomUUID(), ...template, currentLegendaryActions: template.maxLegendaryActions, usedLairThisRound: false };
}

export function useLegendaryAction(monster: LegendaryMonster, actionIndex: number): { monster: LegendaryMonster; success: boolean; narration: string } {
  const action = monster.legendaryActions[actionIndex];
  if (!action) return { monster, success: false, narration: 'Invalid action.' };
  if (monster.currentLegendaryActions < action.cost) return { monster, success: false, narration: `Not enough legendary actions (need ${action.cost}, have ${monster.currentLegendaryActions}).` };
  return {
    monster: { ...monster, currentLegendaryActions: monster.currentLegendaryActions - action.cost },
    success: true,
    narration: `👑 **${monster.name}** uses **${action.name}** (${action.cost} LA)! ${action.description}`,
  };
}

export function refreshLegendaryActions(monster: LegendaryMonster): LegendaryMonster {
  return { ...monster, currentLegendaryActions: monster.maxLegendaryActions, usedLairThisRound: false };
}

export function useLairAction(monster: LegendaryMonster, actionIndex: number): { monster: LegendaryMonster; narration: string } {
  if (!monster.hasLair || monster.usedLairThisRound) return { monster, narration: '' };
  const action = monster.lairActions[actionIndex];
  if (!action) return { monster, narration: '' };
  return {
    monster: { ...monster, usedLairThisRound: true },
    narration: `🏰 **Lair Action!** ${action.name}: ${action.description}`,
  };
}

export function formatLegendaryStatus(monster: LegendaryMonster): string {
  const laBar = '⚡'.repeat(monster.currentLegendaryActions) + '◻️'.repeat(monster.maxLegendaryActions - monster.currentLegendaryActions);
  const lines = [`👑 **${monster.name}** — Legendary Actions: [${laBar}] ${monster.currentLegendaryActions}/${monster.maxLegendaryActions}`];
  for (const a of monster.legendaryActions) lines.push(`  • **${a.name}** (${a.cost} LA): ${a.description}`);
  if (monster.hasLair) {
    lines.push(`🏰 Lair Actions:${monster.usedLairThisRound ? ' (used this round)' : ''}`);
    for (const l of monster.lairActions) lines.push(`  • **${l.name}**: ${l.description}`);
  }
  return lines.join('\n');
}
