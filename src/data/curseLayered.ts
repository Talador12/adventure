// Layered curse system — curses with progression stages, triggers, and complex removal conditions.

export type CurseOrigin = 'arcane' | 'divine' | 'fey' | 'undead' | 'demonic' | 'natural';
export type LayeredCurseSeverity = 'minor' | 'moderate' | 'severe' | 'legendary';

export interface CurseStage {
  stage: number;
  name: string;
  effect: string;
  trigger: string;
  daysUntilProgression: number | null;
}

export interface RemovalCondition {
  method: string;
  dc: number | null;
  description: string;
}

export interface LayeredCurse {
  name: string;
  origin: CurseOrigin;
  severity: LayeredCurseSeverity;
  description: string;
  stages: CurseStage[];
  removalConditions: RemovalCondition[];
  lore: string;
}

const LAYERED_CURSES: LayeredCurse[] = [
  {
    name: 'The Hunger That Grows',
    origin: 'demonic',
    severity: 'moderate',
    description: 'An insatiable hunger that no food can satisfy.',
    stages: [
      { stage: 1, name: 'Cravings', effect: 'Must eat twice normal rations. Advantage on Perception for food.', trigger: 'Failing to eat double rations for a day', daysUntilProgression: 3 },
      { stage: 2, name: 'Gnawing', effect: 'CON save DC 12 each morning or gain 1 exhaustion.', trigger: 'Missing any meal', daysUntilProgression: 5 },
      { stage: 3, name: 'The Hunger', effect: 'WIS save DC 14 to not eat any food presented. Will eat allies\' rations.', trigger: 'Automatic after 5 days at stage 2', daysUntilProgression: null },
    ],
    removalConditions: [
      { method: 'Fast for 3 days', dc: null, description: 'CON save DC 15 each day or gain exhaustion.' },
      { method: 'Remove Curse (5th level)', dc: 15, description: 'Cast at 5th level or higher.' },
      { method: 'Feed the source demon', dc: null, description: 'Offer a feast of rare foods worth 500gp.' },
    ],
    lore: 'Placed by gluttony demons on those who refuse their hospitality.',
  },
  {
    name: 'Mirror\'s Lie',
    origin: 'fey',
    severity: 'minor',
    description: 'Your reflection no longer matches your actions.',
    stages: [
      { stage: 1, name: 'Mismatch', effect: 'Reflection delayed by 1 second. Unsettling but harmless.', trigger: 'Looking at a mirror at midnight', daysUntilProgression: 7 },
      { stage: 2, name: 'Independence', effect: 'Disadvantage on Deception in reflective surfaces.', trigger: 'The reflection reveals a secret', daysUntilProgression: null },
      { stage: 3, name: 'The Switch', effect: 'CHA contest DC 16 each day or lose 1 CHA permanently.', trigger: 'Automatic after reflection reveals 3 secrets', daysUntilProgression: null },
    ],
    removalConditions: [
      { method: 'Shatter every mirror you own', dc: null, description: 'The reflection has no anchor.' },
      { method: 'Bargain with the fey', dc: null, description: 'Offer something more entertaining than your suffering.' },
      { method: 'Remove Curse', dc: 13, description: 'Standard Remove Curse works.' },
    ],
    lore: 'A favorite trick of bored archfey.',
  },
  {
    name: 'The Unlucky Star',
    origin: 'arcane',
    severity: 'moderate',
    description: 'Misfortune follows you like a shadow.',
    stages: [
      { stage: 1, name: 'Bad Luck', effect: 'DM can force a reroll on any natural 20, once per day.', trigger: 'Rolling a natural 1 on any save', daysUntilProgression: 5 },
      { stage: 2, name: 'Cursed Star', effect: 'Only nat 20 crits. Enemies crit on 19-20 against you.', trigger: 'A natural 1 on a death save', daysUntilProgression: 7 },
      { stage: 3, name: 'Doomed', effect: 'All saving throws at disadvantage. Death saves fail on 1-5.', trigger: 'Automatic after 7 days at stage 2', daysUntilProgression: null },
    ],
    removalConditions: [
      { method: 'Win a game of pure chance 3 times', dc: null, description: 'The universe resets.' },
      { method: 'Sacrifice something precious', dc: null, description: 'An item worth 1000gp+ that you genuinely value.' },
      { method: 'Remove Curse + Bless simultaneously', dc: 15, description: 'Both spells cast by different casters.' },
    ],
    lore: 'Created by a wizard who wanted to prove luck wasn\'t real.',
  },
  {
    name: 'Grave Whispers',
    origin: 'undead',
    severity: 'severe',
    description: 'The dead speak to you. Only you. They\'re getting louder.',
    stages: [
      { stage: 1, name: 'Whispers', effect: '-2 to Perception (living) but advantage on detecting undead.', trigger: 'Entering a graveyard', daysUntilProgression: 3 },
      { stage: 2, name: 'Demands', effect: 'WIS DC 13 each dawn or compelled to fulfill one request.', trigger: 'Refusing a dead spirit 3 times', daysUntilProgression: 5 },
      { stage: 3, name: 'The Threshold', effect: 'Radiant vulnerability. Necrotic resistance. Appear undead.', trigger: 'Automatic after 5 days at stage 2', daysUntilProgression: null },
      { stage: 4, name: 'Claimed', effect: 'CON DC 16 each dawn. 3 failures = death and undead rising.', trigger: 'Automatic after reaching stage 3', daysUntilProgression: 7 },
    ],
    removalConditions: [
      { method: 'Put the original spirit to rest', dc: null, description: 'Resolve their unfinished business.' },
      { method: 'Hallowed ground ritual (24 hours)', dc: 16, description: 'Continuous cleric prayer on consecrated ground.' },
      { method: 'Greater Restoration', dc: null, description: 'Removes stages 1-3. Stage 4 requires Wish.' },
    ],
    lore: 'This curse passes from dead to living through touch.',
  },
  {
    name: 'Gilded Touch',
    origin: 'divine',
    severity: 'legendary',
    description: 'Everything you touch turns to gold. It\'s not wonderful.',
    stages: [
      { stage: 1, name: 'The Gift', effect: 'Touch a non-living object (1 cubic foot) to turn it to gold, once per day.', trigger: 'Using the ability 3 times', daysUntilProgression: null },
      { stage: 2, name: 'The Spread', effect: '25% involuntary chance on touch. Includes weapons and armor.', trigger: 'Involuntarily turning something important to gold', daysUntilProgression: 3 },
      { stage: 3, name: 'The Price', effect: 'Living things you touch must CON DC 15 or begin petrifying.', trigger: 'Automatic after 3 days at stage 2', daysUntilProgression: null },
    ],
    removalConditions: [
      { method: 'Give away ALL your wealth', dc: null, description: 'Every coin and gem to those in need. Mean it.' },
      { method: 'Wish', dc: null, description: 'Only Wish can remove at stage 3.' },
      { method: 'Divine intervention', dc: null, description: 'Prove you understand why greed destroys.' },
    ],
    lore: 'Punishment from the God of Commerce. The irony is the point.',
  },
];

export function getRandomLayeredCurse(): LayeredCurse {
  return LAYERED_CURSES[Math.floor(Math.random() * LAYERED_CURSES.length)];
}

export function getLayeredCursesByOrigin(origin: CurseOrigin): LayeredCurse[] {
  return LAYERED_CURSES.filter((c) => c.origin === origin);
}

export function getLayeredCursesBySeverity(severity: LayeredCurseSeverity): LayeredCurse[] {
  return LAYERED_CURSES.filter((c) => c.severity === severity);
}

export function getStageCount(curse: LayeredCurse): number {
  return curse.stages.length;
}

export function getRemovalMethodCount(curse: LayeredCurse): number {
  return curse.removalConditions.length;
}

export function formatLayeredCurse(curse: LayeredCurse, currentStage: number = 1): string {
  const icon = { arcane: '🔮', divine: '✨', fey: '🌸', undead: '💀', demonic: '👹', natural: '🌿' }[curse.origin];
  const sev = { minor: '🟢', moderate: '🟡', severe: '🟠', legendary: '🔴' }[curse.severity];
  const lines = [`${icon} ${sev} **${curse.name}** *(${curse.origin}, ${curse.severity})*`];
  lines.push(`  *${curse.description}*`);
  const stage = curse.stages.find((s) => s.stage === currentStage);
  if (stage) {
    lines.push(`  **Stage ${stage.stage}: ${stage.name}** — ${stage.effect}`);
  }
  lines.push(`  Removal: ${curse.removalConditions.map((r) => r.method).join(' | ')}`);
  return lines.join('\n');
}

export { LAYERED_CURSES };
