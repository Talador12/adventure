// Battle cry generator — race/class-specific war cries for combat initiation.

export type BattleCryRace = 'human' | 'elf' | 'dwarf' | 'halfling' | 'gnome' | 'half-orc' | 'tiefling' | 'dragonborn';
export type BattleCryClass = 'fighter' | 'wizard' | 'rogue' | 'cleric' | 'ranger' | 'paladin' | 'barbarian' | 'bard' | 'druid' | 'monk' | 'sorcerer' | 'warlock';

const RACE_CRIES: Record<BattleCryRace, string[]> = {
  human: ['"For king and country!"', '"Stand together or fall alone!"', '"Our will is stronger than any blade!"'],
  elf: ['"By the light of the ancient stars!"', '"The forest remembers — and so do we."', '"Swift as moonlight, sharp as starfire!"'],
  dwarf: ['"By my beard, you\'ll regret this!"', '"Axes high! Shields locked!"', '"The mountain stands — and so do we!"'],
  halfling: ['"You picked the WRONG shire!"', '"Small feet, big fury!"', '"Dinner can wait. Justice can\'t."'],
  gnome: ['"For science! And violence!"', '"You just activated my trap card!"', '"Size is merely a state of mind!"'],
  'half-orc': ['"BLOOD AND BONE!"', '"My ancestors are watching — I will not disappoint them!"', '"Pain is just weakness leaving the body!"'],
  tiefling: ['"Hell hath no fury like ME!"', '"The fire inside me burns hotter than anything you\'ve got!"', '"My blood is cursed. Your luck is worse."'],
  dragonborn: ['"FEEL THE FURY OF DRAGONS!"', '"By scale and claw, you will fall!"', '"The dragonflight ends here — for you!"'],
};

const CLASS_CRIES: Record<BattleCryClass, string[]> = {
  fighter: ['"Steel meets steel!"', '"Form up! Attack pattern delta!"', '"I\'ve trained my whole life for this moment."'],
  wizard: ['"By the arcane arts, I shall unmake you!"', '"The weave responds to my will alone."', '"Allow me to demonstrate."'],
  rogue: ['"Now you see me..."', '"Nothing personal. Mostly."', '"*silence* (already flanking)"'],
  cleric: ['"My god walks with me — can you say the same?"', '"The divine light shall purge this darkness!"', '"Healing later. Smiting now."'],
  ranger: ['"You\'re in MY territory now."', '"The hunt begins."', '"Nature chose its champion. I chose my arrow."'],
  paladin: ['"By my sacred oath, I will strike you down!"', '"JUSTICE IS NOT BLIND — IT SEES EVERYTHING!"', '"The light compels me. The sword follows."'],
  barbarian: ['"RAAAAAAAAAGH!"', '"I HAVEN\'T EATEN TODAY AND I AM VERY ANGRY!"', '"*incoherent screaming that somehow inspires the party*"'],
  bard: ['"I wrote a song about this! It\'s called \'Your Last Mistake\'!"', '"Let me compose your requiem."', '"Time for the performance of a lifetime — yours."'],
  druid: ['"The wild answers my call!"', '"Nature is not kind. Neither am I."', '"You have angered forces older than civilization."'],
  monk: ['"*assumes stance* Your move."', '"The still river conceals the strongest current."', '"Enlightenment comes. Sometimes as a fist."'],
  sorcerer: ['"This power chose me. You should be running."', '"The magic in my blood demands release!"', '"I don\'t cast spells. I AM the spell."'],
  warlock: ['"My patron sends their regards."', '"The pact is sealed. Your fate is not."', '"I traded my soul for this power. It was a bargain."'],
};

const GENERIC_CRIES: string[] = [
  '"To battle!"', '"For glory!"', '"CHARGE!"', '"Today we fight!"',
  '"No retreat! No surrender!"', '"This ends now!"',
];

export function getBattleCry(race?: BattleCryRace, charClass?: BattleCryClass): string {
  const pool: string[] = [...GENERIC_CRIES];
  if (race && RACE_CRIES[race]) pool.push(...RACE_CRIES[race]);
  if (charClass && CLASS_CRIES[charClass]) pool.push(...CLASS_CRIES[charClass]);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getBattleCryByRace(race: BattleCryRace): string {
  const cries = RACE_CRIES[race];
  if (!cries || cries.length === 0) return GENERIC_CRIES[Math.floor(Math.random() * GENERIC_CRIES.length)];
  return cries[Math.floor(Math.random() * cries.length)];
}

export function getBattleCryByClass(charClass: BattleCryClass): string {
  const cries = CLASS_CRIES[charClass];
  if (!cries || cries.length === 0) return GENERIC_CRIES[Math.floor(Math.random() * GENERIC_CRIES.length)];
  return cries[Math.floor(Math.random() * cries.length)];
}

export function formatBattleCry(characterName: string, race?: BattleCryRace, charClass?: BattleCryClass): string {
  return `⚔️ **${characterName} cries out:** *${getBattleCry(race, charClass)}*`;
}

export function getAllRaces(): BattleCryRace[] {
  return Object.keys(RACE_CRIES) as BattleCryRace[];
}

export function getAllClasses(): BattleCryClass[] {
  return Object.keys(CLASS_CRIES) as BattleCryClass[];
}
