// Random tavern brawl choreographer — staged bar fights with environmental weapons.

export type BrawlTrigger = 'insult' | 'cheating' | 'spilled_drink' | 'old_grudge' | 'mistaken_identity' | 'political_argument' | 'bar_bet_gone_wrong';

export interface BrawlEnvironment {
  name: string;
  weapons: EnvironmentalWeapon[];
  hazards: string[];
  flavorText: string;
}

export interface EnvironmentalWeapon {
  name: string;
  damage: string;
  type: 'improvised' | 'thrown' | 'swung';
  description: string;
}

export interface TavernBrawl {
  trigger: BrawlTrigger;
  triggerDescription: string;
  escalation: string[];
  participants: string[];
  resolution: BrawlResolution[];
  environment: BrawlEnvironment;
}

export interface BrawlResolution {
  condition: string;
  outcome: string;
  reputationChange: number; // -2 to +2
}

const TRIGGERS: { trigger: BrawlTrigger; description: string }[] = [
  { trigger: 'insult', description: 'A drunk patron loudly insults one of the party members\' heritage.' },
  { trigger: 'cheating', description: 'Someone accuses the party of cheating at cards. They might be right.' },
  { trigger: 'spilled_drink', description: 'A massive half-orc\'s drink gets knocked over. He looks at your table.' },
  { trigger: 'old_grudge', description: 'Someone from a party member\'s past walks in and immediately sees red.' },
  { trigger: 'mistaken_identity', description: '"That\'s the one who robbed my shop!" shouts a merchant, pointing at you. It wasn\'t you. Probably.' },
  { trigger: 'political_argument', description: 'A heated debate about the new king escalates from words to fists.' },
  { trigger: 'bar_bet_gone_wrong', description: 'A drinking contest ends with accusations of magical cheating. Chairs start flying.' },
];

const ESCALATIONS: string[][] = [
  ['A glass shatters against the wall.', 'Tables are being flipped.', 'The bartender ducks behind the counter.', 'Someone throws a whole keg.'],
  ['Shoving turns to punching.', 'A chair splinters across someone\'s back.', 'The chandelier is swinging wildly.', 'The bard keeps playing — faster.'],
  ['A window breaks outward.', 'The bouncer is overwhelmed.', 'Someone pulls a knife (the bartender takes it away).', 'The fight spills into the street.'],
];

const PARTICIPANTS: string[][] = [
  ['Angry Dock Workers (3)', 'The Barkeep\'s Nephew', 'A Surprisingly Tough Grandma'],
  ['Off-Duty Guards (2)', 'A Traveling Monk Who Just Wanted Soup', 'The Local Arm-Wrestling Champion'],
  ['Rival Adventuring Party (4)', 'A Very Large Farmer', 'A Halfling Standing On A Table For Reach'],
];

const ENVIRONMENTS: BrawlEnvironment[] = [
  {
    name: 'The Rusty Anchor (dockside dive)',
    weapons: [
      { name: 'Bottle', damage: '1d4', type: 'swung', description: 'A thick glass bottle. Shatters dramatically.' },
      { name: 'Bar Stool', damage: '1d6', type: 'swung', description: 'Heavy oak. Good reach.' },
      { name: 'Mug of Ale', damage: '1', type: 'thrown', description: 'Mostly splash damage. 5ft blind on hit.' },
      { name: 'Dartboard', damage: '1d4', type: 'thrown', description: 'Still has darts in it. Improvised shuriken.' },
    ],
    hazards: ['Slippery floor (DEX DC 10 or fall prone)', 'Open fireplace (1d6 fire if shoved in)', 'Wobbly stairs to second floor'],
    flavorText: 'Sawdust floors, ship figureheads on the walls, and a suspicious stain on the ceiling. The kind of place where fights are practically on the menu.',
  },
  {
    name: 'The Golden Goblet (upscale tavern)',
    weapons: [
      { name: 'Silver Candlestick', damage: '1d6', type: 'swung', description: 'Elegant and painful. Professor Plum would approve.' },
      { name: 'Wine Bottle (vintage)', damage: '1d4+1', type: 'swung', description: 'A 50-year aged red. What a waste.' },
      { name: 'Roast Turkey', damage: '1d4', type: 'thrown', description: 'Still on the serving platter. Greasy.' },
      { name: 'Tablecloth Yank', damage: '0', type: 'improvised', description: 'Pull the tablecloth — everything slides into the enemy\'s lap.' },
    ],
    hazards: ['Crystal chandelier (DEX DC 12 to swing on, 3d6 fall damage if it breaks)', 'Marble floor (disadvantage on Athletics to grapple)', 'Expensive artwork (DM tracks damages for the bill)'],
    flavorText: 'Velvet curtains, crystal glasses, and a sommelier who is currently hiding under a table. This is going to cost someone a fortune.',
  },
  {
    name: 'The Hog & Hammer (working class pub)',
    weapons: [
      { name: 'Hammer (decorative)', damage: '1d8', type: 'swung', description: 'Mounted on the wall. Not decorative anymore.' },
      { name: 'Wheel of Cheese', damage: '1d4', type: 'thrown', description: 'Dense aged cheddar. Surprisingly effective.' },
      { name: 'Fireplace Poker', damage: '1d6 + 1d4 fire', type: 'swung', description: 'Pulled from the coals. Still hot.' },
      { name: 'Wooden Tray', damage: '1d4', type: 'swung', description: 'Makeshift shield (+1 AC, breaks on nat 1).' },
    ],
    hazards: ['Bearskin rug (DEX DC 11 or trip)', 'Boiling stew pot (2d6 fire if knocked over)', 'Mounted antlers on the wall (improvised weapon, 1d8 piercing)'],
    flavorText: 'Low ceilings, dark corners, and the faint smell of decades of spilled ale. The regulars don\'t even look up when the first chair breaks.',
  },
];

const RESOLUTIONS: BrawlResolution[] = [
  { condition: 'Party wins the brawl decisively', outcome: 'Free drinks for the night. The regulars respect strength.', reputationChange: 1 },
  { condition: 'Party loses but fights well', outcome: 'Bought a round by the winner. Grudging respect earned.', reputationChange: 0 },
  { condition: 'Party uses lethal force', outcome: 'The city guard arrives. Potential arrest or fine (50gp).', reputationChange: -2 },
  { condition: 'Party de-escalates peacefully', outcome: 'The barkeep is grateful. Free lodging and a future favor.', reputationChange: 2 },
  { condition: 'Brawl destroys the tavern', outcome: 'Barkeep demands 200gp in damages. Banned for life (or until you pay).', reputationChange: -1 },
  { condition: 'Party buys everyone drinks after', outcome: 'Instant legend status. The bard writes a song about it.', reputationChange: 2 },
];

export function generateBrawl(): TavernBrawl {
  const trigger = TRIGGERS[Math.floor(Math.random() * TRIGGERS.length)];
  const escalation = ESCALATIONS[Math.floor(Math.random() * ESCALATIONS.length)];
  const participants = PARTICIPANTS[Math.floor(Math.random() * PARTICIPANTS.length)];
  const environment = ENVIRONMENTS[Math.floor(Math.random() * ENVIRONMENTS.length)];
  return {
    trigger: trigger.trigger,
    triggerDescription: trigger.description,
    escalation,
    participants,
    resolution: RESOLUTIONS,
    environment,
  };
}

export function getEnvironmentalWeapons(brawl: TavernBrawl): EnvironmentalWeapon[] {
  return brawl.environment.weapons;
}

export function getAllTriggers(): BrawlTrigger[] {
  return TRIGGERS.map((t) => t.trigger);
}

export function formatBrawl(brawl: TavernBrawl): string {
  const lines = [`🍺 **TAVERN BRAWL at ${brawl.environment.name}!**`];
  lines.push(`  *Trigger:* ${brawl.triggerDescription}`);
  lines.push(`  *Participants:* ${brawl.participants.join(', ')}`);
  lines.push('  **Escalation:**');
  brawl.escalation.forEach((e, i) => lines.push(`    ${i + 1}. ${e}`));
  lines.push('  **Environmental Weapons:**');
  brawl.environment.weapons.forEach((w) => lines.push(`    🔧 ${w.name} (${w.damage} ${w.type}) — ${w.description}`));
  lines.push('  **Hazards:**');
  brawl.environment.hazards.forEach((h) => lines.push(`    ⚠️ ${h}`));
  return lines.join('\n');
}

export { TRIGGERS as BRAWL_TRIGGERS, ENVIRONMENTS as BRAWL_ENVIRONMENTS };
