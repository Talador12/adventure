// Lair action generator — boss monster lair effects that change the battlefield each round.

export type LairTheme = 'fire' | 'ice' | 'undead' | 'swamp' | 'arcane' | 'dragon' | 'aberrant';

export interface LairAction {
  name: string;
  theme: LairTheme;
  description: string;
  mechanicalEffect: string;
  saveDC: number;
  saveType: string;
  areaOfEffect: string;
  initiative: number; // when in the round it triggers (usually 20)
}

const ACTIONS: LairAction[] = [
  { name: 'Erupting Floor', theme: 'fire', description: 'Cracks split the floor and magma erupts in 3 random 10ft squares.', mechanicalEffect: '3d6 fire damage. Creates difficult terrain (lava pools) that deal 2d6 fire per round.', saveDC: 15, saveType: 'DEX', areaOfEffect: 'Three 10ft squares', initiative: 20 },
  { name: 'Freezing Mist', theme: 'ice', description: 'Supernatural cold rolls across the floor. Breath crystallizes. Movement slows.', mechanicalEffect: 'All creatures: speed halved until initiative 20 next round. 2d6 cold damage.', saveDC: 14, saveType: 'CON', areaOfEffect: 'Entire lair', initiative: 20 },
  { name: 'Rising Dead', theme: 'undead', description: 'Skeletal hands burst from the ground, grasping at ankles.', mechanicalEffect: 'Each creature in contact with ground: restrained until end of their turn (STR DC 13 to break free). 1d4 skeletons rise.', saveDC: 13, saveType: 'STR', areaOfEffect: '30ft radius from lair center', initiative: 20 },
  { name: 'Toxic Spores', theme: 'swamp', description: 'Enormous mushrooms release clouds of hallucinogenic spores.', mechanicalEffect: 'Poisoned condition + disadvantage on INT checks for 1 round. Hallucinate enemies in wrong positions (50% miss chance on next attack).', saveDC: 14, saveType: 'CON', areaOfEffect: '20ft radius per mushroom (3 mushrooms)', initiative: 20 },
  { name: 'Arcane Feedback', theme: 'arcane', description: 'The magical wards in the walls pulse, disrupting active spells.', mechanicalEffect: 'All concentration spells: DC 15 concentration check or they end. Spellcasters take 2d4 force damage.', saveDC: 15, saveType: 'CON', areaOfEffect: 'Entire lair', initiative: 20 },
  { name: 'Tail Sweep Tremor', theme: 'dragon', description: 'The dragon\'s tail smashes the ground. The cavern shakes.', mechanicalEffect: 'All creatures on the ground: prone (DEX save). Stalactites fall in 2 random 5ft squares (4d6 bludgeoning).', saveDC: 16, saveType: 'DEX', areaOfEffect: '60ft radius', initiative: 20 },
  { name: 'Reality Warp', theme: 'aberrant', description: 'Space folds. Distances change. Two points that were 30ft apart are now 5ft. Or 100ft.', mechanicalEffect: 'All distances in the lair are randomly halved or doubled for 1 round. Movement becomes unpredictable.', saveDC: 15, saveType: 'WIS', areaOfEffect: 'Entire lair', initiative: 20 },
  { name: 'Grasping Vines', theme: 'swamp', description: 'Thorny vines erupt from the walls and floor, reaching for warm bodies.', mechanicalEffect: 'Grappled (escape DC 14). 1d6 piercing per round grappled. Vines have AC 10, HP 10.', saveDC: 14, saveType: 'DEX', areaOfEffect: 'All creatures within 10ft of walls', initiative: 20 },
  { name: 'Soul Drain Pulse', theme: 'undead', description: 'A wave of necrotic energy pulses from the lich\'s phylactery.', mechanicalEffect: '3d6 necrotic damage. The lich heals for half the total damage dealt.', saveDC: 16, saveType: 'CON', areaOfEffect: '40ft radius from phylactery', initiative: 20 },
  { name: 'Gravity Shift', theme: 'aberrant', description: 'Gravity reverses for 6 seconds. Everything falls upward.', mechanicalEffect: 'All creatures: fall upward 20ft (2d6 bludgeoning on ceiling). Gravity returns next round (2d6 more).', saveDC: 15, saveType: 'DEX', areaOfEffect: 'Entire lair', initiative: 20 },
];

export function getRandomLairAction(): LairAction {
  return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
}

export function getLairActionsByTheme(theme: LairTheme): LairAction[] {
  return ACTIONS.filter((a) => a.theme === theme);
}

export function getLairActionsAboveDC(minDC: number): LairAction[] {
  return ACTIONS.filter((a) => a.saveDC >= minDC);
}

export function getAllLairThemes(): LairTheme[] {
  return [...new Set(ACTIONS.map((a) => a.theme))];
}

export function formatLairAction(action: LairAction): string {
  const icon = { fire: '🔥', ice: '❄️', undead: '💀', swamp: '🌿', arcane: '✨', dragon: '🐉', aberrant: '🌀' }[action.theme];
  return `${icon} **${action.name}** *(Init ${action.initiative}, ${action.theme})*\n  *${action.description}*\n  ⚙️ ${action.mechanicalEffect}\n  Save: ${action.saveType} DC ${action.saveDC} | Area: ${action.areaOfEffect}`;
}

export { ACTIONS as LAIR_ACTIONS };
