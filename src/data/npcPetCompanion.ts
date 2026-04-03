// Random NPC pet/companion — memorable animals that follow NPCs around.

export type PetRole = 'guard' | 'comfort' | 'messenger' | 'assistant' | 'mascot' | 'mysterious';

export interface NpcPet {
  name: string;
  species: string;
  role: PetRole;
  personality: string;
  quirk: string;
  ownerRelationship: string;
  mechanicalUse: string | null;
  plotRelevance: string | null;
}

const PETS: NpcPet[] = [
  { name: 'General Whiskers', species: 'One-eyed tabby cat', role: 'guard', personality: 'Fearless. Has chased off dogs, wolves, and one very confused owlbear.', quirk: 'Sits on the highest available surface and judges everyone. Loudly.', ownerRelationship: 'The tavern owner\'s cat. The tavern owner is afraid of it.', mechanicalUse: 'Advantage on Perception checks while in the tavern (General Whiskers hisses at danger).', plotRelevance: 'The cat disappears for 3 days and returns with a map in its mouth. Nobody knows where it went.' },
  { name: 'Bumble', species: 'Oversized bumblebee (size of a fist)', role: 'comfort', personality: 'Gentle. Lands on sad people. Buzzes soothingly.', quirk: 'Only stings people who lie. Has become an unofficial lie detector.', ownerRelationship: 'The herbalist\'s familiar. Found as a larva in an enchanted garden.', mechanicalUse: 'If Bumble stings someone, they lied. Reliable 90% of the time.', plotRelevance: null },
  { name: 'Scroll', species: 'Tiny pseudodragon (pretends to be a cat)', role: 'messenger', personality: 'Lazy. Will deliver messages but takes naps mid-flight. Arrives 1d4 hours late.', quirk: 'Steals small shiny objects and hides them in its nest (the wizard\'s hat).', ownerRelationship: 'The wizard\'s familiar. The wizard thinks it\'s a cat. Everyone else knows.', mechanicalUse: 'Can deliver messages within the city. Unreliable timing but never loses the message.', plotRelevance: 'Scroll is actually very old and remembers the previous archmage. Knows secrets.' },
  { name: 'Tank', species: 'Tortoise the size of a dinner plate', role: 'mascot', personality: 'Ancient, patient, has seen empires rise and fall. Unimpressed by everything.', quirk: 'The local children race Tank against a snail. The snail usually wins.', ownerRelationship: 'Nobody owns Tank. Tank owns the town square. Has for 300 years.', mechanicalUse: null, plotRelevance: 'Tank\'s shell has runes carved into it. If read (Arcana DC 16), they\'re a map to a vault beneath the town.' },
  { name: 'Duchess', species: 'Pig wearing a tiny crown', role: 'assistant', personality: 'Smarter than most people in town. Understands Common perfectly. Communicates via snorts.', quirk: 'Refuses to eat anything that isn\'t served on a plate. Has standards.', ownerRelationship: 'The farmer\'s prized truffle pig. Worth more than the farm itself.', mechanicalUse: 'Can find hidden objects underground (Investigation +5, truffles OR treasure).', plotRelevance: 'Duchess dug up a cursed artifact. The farmer thought it was a truffle. He\'s been acting strange since.' },
  { name: 'Echo', species: 'Raven that speaks in the voice of dead people', role: 'mysterious', personality: 'Somber. Wise. Only speaks when it has something important to say.', quirk: 'Every sentence it speaks is in a different dead person\'s voice. It has thousands.', ownerRelationship: 'The gravedigger\'s raven. It followed them home from the cemetery one night.', mechanicalUse: 'Can relay one message from a specific dead person (if it has their voice). Once per week.', plotRelevance: 'Echo recently started speaking in the voice of someone who isn\'t dead yet.' },
];

export function getRandomPet(): NpcPet {
  return PETS[Math.floor(Math.random() * PETS.length)];
}

export function getPetsByRole(role: PetRole): NpcPet[] {
  return PETS.filter((p) => p.role === role);
}

export function getPetsWithPlotRelevance(): NpcPet[] {
  return PETS.filter((p) => p.plotRelevance !== null);
}

export function getPetsWithMechanicalUse(): NpcPet[] {
  return PETS.filter((p) => p.mechanicalUse !== null);
}

export function getAllPetRoles(): PetRole[] {
  return [...new Set(PETS.map((p) => p.role))];
}

export function formatPet(pet: NpcPet): string {
  const icon = { guard: '🐕', comfort: '🐝', messenger: '🐦', assistant: '🐷', mascot: '🐢', mysterious: '🐦‍⬛' }[pet.role];
  const lines = [`${icon} **${pet.name}** *(${pet.species}, ${pet.role})*`];
  lines.push(`  *${pet.personality}*`);
  lines.push(`  🎭 Quirk: ${pet.quirk}`);
  lines.push(`  👤 Owner: ${pet.ownerRelationship}`);
  if (pet.mechanicalUse) lines.push(`  ⚙️ ${pet.mechanicalUse}`);
  if (pet.plotRelevance) lines.push(`  📜 ${pet.plotRelevance}`);
  return lines.join('\n');
}

export { PETS as NPC_PETS };
