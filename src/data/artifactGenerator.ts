// Random artifact generator — procedural legendary items with history and powers.

export interface Artifact {
  name: string;
  type: ArtifactType;
  origin: string;
  power: string;
  curse: string | null;
  history: string;
  rarity: 'legendary' | 'artifact';
  attunement: boolean;
}

export type ArtifactType = 'weapon' | 'armor' | 'jewelry' | 'tome' | 'staff' | 'relic';

const PREFIXES: string[] = [
  'The Shattered', 'The Eternal', 'The Whispering', 'The Burning', 'The Frozen',
  'The Shadow', 'The Golden', 'The Cursed', 'The Ancient', 'The Storm',
];

const SUFFIXES: Record<ArtifactType, string[]> = {
  weapon: ['Blade', 'Hammer', 'Axe', 'Spear', 'Bow', 'Dagger'],
  armor: ['Shield', 'Helm', 'Breastplate', 'Gauntlets', 'Crown'],
  jewelry: ['Ring', 'Amulet', 'Circlet', 'Pendant', 'Brooch'],
  tome: ['Codex', 'Grimoire', 'Scroll', 'Tome', 'Manuscript'],
  staff: ['Staff', 'Scepter', 'Rod', 'Wand', 'Orb'],
  relic: ['Eye', 'Heart', 'Skull', 'Hand', 'Chalice'],
};

const ORIGINS: string[] = [
  'Forged in dragonfire by a mad smith who spoke to flames.',
  'Pulled from the corpse of a god during the Dawn War.',
  'Crafted by elven artificers in the Age of Stars.',
  'Found in the deepest vault of a dwarven kingdom, sealed for millennia.',
  'Woven from moonlight by a fey queen\'s tears.',
  'Created by a lich as their masterwork before ascending to undeath.',
  'Fell from the sky during a celestial alignment.',
  'Carved from the bones of a primordial titan.',
];

const POWERS: Record<ArtifactType, string[]> = {
  weapon: ['+3 to attack and damage. On a crit, deals an extra 3d6 radiant damage.', 'Vorpal property — nat 20 decapitates (non-immune) enemies.', 'Returns when thrown. Can be summoned from any distance as a bonus action.'],
  armor: ['Grants resistance to all non-magical damage.', 'Once per day, absorb a spell of 5th level or lower targeting you.', 'AC bonus of +3. Advantage on saving throws vs. magic.'],
  jewelry: ['Grants truesight to 60 ft.', 'Three wishes (1d3 charges, do not replenish).', 'Teleport to any location you have visited, once per dawn.'],
  tome: ['Learn any 3 spells from any class list. They are always prepared.', 'Once per day, automatically succeed on an Arcana or History check.', 'Summon an echo of the tome\'s author to answer one question truthfully.'],
  staff: ['Cast any spell of 7th level or lower (7 charges, regain 1d4+3 at dawn).', 'Create a 60-ft antimagic field, once per dawn.', 'Channel lightning: 10d6 lightning damage in 120ft line, DEX save DC 19.'],
  relic: ['Raise a creature dead up to 100 years, once per month.', 'Commune with the dead — ask 5 questions of any corpse within 10 ft.', 'Grant one creature permanent immunity to one damage type.'],
};

const CURSES: string[] = [
  'Slowly corrupts the wielder — alignment shifts one step toward evil per month.',
  'Cannot be unequipped without Remove Curse cast at 7th level.',
  'Attracts fiends — random demon encounter chance increased by 25%.',
  'Drains 1d4 HP at every dawn. The artifact heals that amount instead.',
  'Whispers constantly. Disadvantage on Perception checks relying on hearing.',
  null as unknown as string, // no curse (40% chance when selected)
  null as unknown as string,
  null as unknown as string,
  null as unknown as string,
];

const HISTORIES: string[] = [
  'It has passed through the hands of 12 kings. All of them died violently.',
  'Lost for a thousand years in the Underdark, found by a blind kobold.',
  'The last person to use it became a constellation. Literally.',
  'Legends say it was broken once before — and reassembled itself.',
  'A dragon once offered its entire hoard for this item. The offer was refused.',
  'It has a twin, somewhere. When both are united, something catastrophic happens.',
  'The artifact has its own name and occasionally corrects people who mispronounce it.',
  'Three wars have been fought over it. The fourth is brewing.',
];

export function generateArtifact(type?: ArtifactType): Artifact {
  const artifactType = type || (['weapon', 'armor', 'jewelry', 'tome', 'staff', 'relic'] as ArtifactType[])[Math.floor(Math.random() * 6)];
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const suffixList = SUFFIXES[artifactType];
  const suffix = suffixList[Math.floor(Math.random() * suffixList.length)];
  const origin = ORIGINS[Math.floor(Math.random() * ORIGINS.length)];
  const power = POWERS[artifactType][Math.floor(Math.random() * POWERS[artifactType].length)];
  const curseRoll = CURSES[Math.floor(Math.random() * CURSES.length)];
  const history = HISTORIES[Math.floor(Math.random() * HISTORIES.length)];

  return {
    name: `${prefix} ${suffix}`,
    type: artifactType,
    origin,
    power,
    curse: curseRoll || null,
    history,
    rarity: Math.random() > 0.5 ? 'artifact' : 'legendary',
    attunement: true,
  };
}

export function getArtifactTypes(): ArtifactType[] {
  return ['weapon', 'armor', 'jewelry', 'tome', 'staff', 'relic'];
}

export function formatArtifact(a: Artifact): string {
  const icon = { weapon: '⚔️', armor: '🛡️', jewelry: '💍', tome: '📖', staff: '🪄', relic: '💀' }[a.type];
  const lines = [`${icon} **${a.name}** *(${a.rarity}, ${a.type}, requires attunement)*`];
  lines.push(`  *Origin:* ${a.origin}`);
  lines.push(`  *Power:* ${a.power}`);
  if (a.curse) lines.push(`  *Curse:* ⚠️ ${a.curse}`);
  lines.push(`  *History:* ${a.history}`);
  return lines.join('\n');
}
