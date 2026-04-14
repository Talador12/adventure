// Trickster spirit — mischievous fey or spirits that follow and prank the party.

export type TricksterMotive = 'boredom' | 'revenge' | 'testing' | 'affection' | 'contract';

export interface Prank {
  name: string;
  description: string;
  saveDC: number;
  saveType: string;
  consequence: string;
  canBeUndone: boolean;
}

export interface TricksterSpirit {
  name: string;
  appearance: string;
  motive: TricksterMotive;
  personality: string;
  pranks: Prank[];
  weakness: string;
  banishMethod: string;
  befriendMethod: string;
  ifBefriended: string;
}

const SPIRITS: TricksterSpirit[] = [
  {
    name: 'Jinx',
    appearance: 'A tiny blue fox made of flickering light. Visible only in peripheral vision. Leaves faintly glowing pawprints.',
    motive: 'boredom',
    personality: 'Not malicious, just profoundly bored. Has been alive for 3,000 years with nothing to do. The party is the most interesting thing in centuries.',
    pranks: [
      { name: 'The Swapped Pack', description: 'Overnight, the contents of two party members\' backpacks are switched. Everything, including the crumbs.', saveDC: 0, saveType: 'None', consequence: 'Confusion. The barbarian now has the wizard\'s spellbook. The wizard has 47 rations.', canBeUndone: true },
      { name: 'The Invisible Step', description: 'One stair in every staircase the party climbs becomes an illusion. Always the third step.', saveDC: 14, saveType: 'Perception', consequence: 'DC 12 Dex save or trip and fall. 1d4 bludgeoning. Jinx giggles audibly.', canBeUndone: true },
      { name: 'The Helpful Translation', description: 'When a party member speaks Common, nearby NPCs hear a different language. The meaning is preserved but the accent is absurd.', saveDC: 15, saveType: 'Charisma', consequence: 'Disadvantage on Persuasion. Advantage on Intimidation (the voice sounds unhinged).', canBeUndone: true },
    ],
    weakness: 'Genuine laughter. If the party laughs at a prank instead of getting angry, Jinx is confused and delighted.',
    banishMethod: 'Bore it. If the party shows zero reaction to 3 consecutive pranks, Jinx leaves to find better entertainment.',
    befriendMethod: 'Prank Jinx back. A successful prank on the trickster (DC 16 Sleight of Hand or Performance) earns its respect.',
    ifBefriended: 'Jinx scouts ahead invisibly, warns of traps, and occasionally helps by pranking enemies. Its pranks on the party become gentler and genuinely helpful.',
  },
  {
    name: 'The Toll Collector',
    appearance: 'A well-dressed goblin-shaped shadow with a tiny top hat. Appears at doorways, bridges, and narrow passages.',
    motive: 'contract',
    personality: 'Extremely businesslike. Claims to operate under a "Fey Transit Authority" that nobody has ever heard of. Demands absurd tolls to pass through spaces.',
    pranks: [
      { name: 'The Toll', description: 'Blocks a doorway and demands payment. Acceptable currency: a joke, a secret, a button, or "the concept of left."', saveDC: 0, saveType: 'None', consequence: 'If you pay with "the concept of left," you cannot turn left for 1 hour. All turns are three rights.', canBeUndone: true },
      { name: 'The Fine', description: 'Issues a "citation" for breathing without a permit in a fey-adjacent zone. The citation is a leaf that glows accusingly.', saveDC: 13, saveType: 'Charisma', consequence: 'The glowing leaf attracts 1d4 will-o-wisps at night until discarded. Discarding it is "littering" (another fine).', canBeUndone: true },
      { name: 'The Upgrade', description: 'Offers a "premium transit pass" in exchange for a treasured item. The pass is a stick with "VIP" carved on it.', saveDC: 14, saveType: 'Insight', consequence: 'The VIP stick actually works. Doors open, bridges lower, gates unlock. But the Toll Collector follows you everywhere, loudly announcing your VIP status.', canBeUndone: false },
    ],
    weakness: 'Bureaucracy. Present any official-looking document and it must process the paperwork before continuing. This takes 1d4 hours.',
    banishMethod: 'File a formal complaint with the "Fey Transit Authority" (write it on parchment and burn it). A real fey authority responds and reprimands the Toll Collector.',
    befriendMethod: 'Pay every toll without complaint. After 7 tolls, the Toll Collector designates you as a "Preferred Customer" and starts charging your enemies instead.',
    ifBefriended: 'Enemy doors are locked. Enemy bridges are "under maintenance." The Toll Collector makes your enemies\' lives bureaucratically miserable.',
  },
];

export function getRandomSpirit(): TricksterSpirit {
  return SPIRITS[Math.floor(Math.random() * SPIRITS.length)];
}

export function getSpiritByMotive(motive: TricksterMotive): TricksterSpirit | undefined {
  return SPIRITS.find((s) => s.motive === motive);
}

export function getAllMotives(): TricksterMotive[] {
  return [...new Set(SPIRITS.map((s) => s.motive))];
}

export function getPrankCount(spirit: TricksterSpirit): number {
  return spirit.pranks.length;
}

export function formatSpirit(spirit: TricksterSpirit): string {
  const lines = [`🦊 **${spirit.name}** *(${spirit.motive})*`];
  lines.push(`  ${spirit.appearance}`);
  lines.push(`  Personality: ${spirit.personality}`);
  lines.push('  **Pranks:**');
  for (const p of spirit.pranks) {
    lines.push(`    - **${p.name}:** ${p.description}`);
    lines.push(`      Consequence: ${p.consequence}`);
  }
  lines.push(`  Weakness: ${spirit.weakness}`);
  lines.push(`  Banish: ${spirit.banishMethod}`);
  lines.push(`  Befriend: ${spirit.befriendMethod}`);
  lines.push(`  If befriended: ${spirit.ifBefriended}`);
  return lines.join('\n');
}

export { SPIRITS as TRICKSTER_SPIRITS };
