// Random treasure map generator — multi-step treasure hunts with landmarks and riddles.

export type MapCondition = 'pristine' | 'weathered' | 'torn' | 'coded' | 'magical';
export type TreasureTier = 'minor' | 'moderate' | 'major' | 'legendary';

export interface MapLandmark {
  name: string;
  description: string;
  clue: string;
  findDC: number;
}

export interface TreasureMap {
  name: string;
  condition: MapCondition;
  tier: TreasureTier;
  origin: string;
  landmarks: MapLandmark[];
  finalLocation: string;
  treasure: string;
  guardian: string | null;
  trap: string | null;
  riddle: string;
  riddleAnswer: string;
}

const MAPS: TreasureMap[] = [
  { name: 'Captain Blacktide\'s Last Chart', condition: 'weathered', tier: 'major', origin: 'Found in a bottle washed ashore. Smells of rum and regret.', landmarks: [
    { name: 'The Crying Cliff', description: 'A cliff face where water seeps through limestone, resembling tears.', clue: '"Where the stone weeps, turn east and count one hundred paces."', findDC: 12 },
    { name: 'The Broken Crown', description: 'A rock formation shaped like a shattered crown.', clue: '"The king\'s head holds the next secret. Look beneath."', findDC: 14 },
    { name: 'The Dead Man\'s Palm', description: 'A palm tree with five trunks, shaped like an open hand.', clue: '"The middle finger points true. Dig where its shadow falls at noon."', findDC: 13 },
  ], finalLocation: 'A sea cave accessible only at low tide.', treasure: '2,000gp in mixed coins, a +1 cutlass, a spyglass of true seeing.', guardian: 'The ghost of Captain Blacktide guards the hoard. He wants someone to hear his story before he\'ll rest.', trap: 'The cave floods at high tide. 4 hours to search before drowning.', riddle: 'I have cities but no houses, forests but no trees, and water but no fish. What am I?', riddleAnswer: 'A map' },
  { name: 'The Dwarven Inheritance', condition: 'coded', tier: 'major', origin: 'Encoded in dwarven runes on a bronze plate. The key is a specific ale recipe.', landmarks: [
    { name: 'The Anvil Stone', description: 'A boulder shaped like a blacksmith\'s anvil.', clue: '"Strike the anvil three times with a hammer. The echo reveals the path."', findDC: 13 },
    { name: 'The Twin Pillars', description: 'Two natural stone columns flanking a valley entrance.', clue: '"Walk between the brothers at dawn. Your shadow points the way."', findDC: 11 },
  ], finalLocation: 'A sealed dwarven vault behind a waterfall.', treasure: 'Mithral forge tools (1,500gp), a +2 warhammer, 500gp in gems.', guardian: 'An iron golem guards the vault. It only allows those of dwarven blood — or those who can prove they know the forge-oath.', trap: 'The vault has a gas trap (CON DC 15 or sleep for 1d4 hours).', riddle: 'I am not alive, but I grow; I don\'t have lungs, but I need air; I don\'t have a mouth, but water kills me. What am I?', riddleAnswer: 'Fire' },
  { name: 'The Witch\'s Garden Map', condition: 'magical', tier: 'moderate', origin: 'The map only appears under moonlight. Otherwise, it looks like a blank piece of leather.', landmarks: [
    { name: 'The Singing Stones', description: 'A circle of standing stones that hum in the wind.', clue: '"When the stones sing in harmony, step into the center and speak the third word of the old tongue."', findDC: 14 },
    { name: 'The Moonpool', description: 'A natural pool that reflects the moon even during the day.', clue: '"Drop a silver coin and speak your true desire. The water shows the way."', findDC: 12 },
  ], finalLocation: 'A hidden garden growing impossible plants.', treasure: '3 rare alchemical ingredients (200gp each), a staff of the woodlands, seeds that grow into a treant.', guardian: null, trap: 'The plants are sentient and will entangle anyone who picks without asking permission (STR DC 15).', riddle: 'I can be cracked, made, told, and played. What am I?', riddleAnswer: 'A joke' },
  { name: 'The Dragon\'s Tax Receipt', condition: 'pristine', tier: 'legendary', origin: 'An ancient dragon kept meticulous records. This is a receipt for "storage services" — for its own hoard.', landmarks: [
    { name: 'The Scorched Valley', description: 'A valley where nothing grows. The rock is glass-smooth from ancient dragonfire.', clue: '"Fly or fall. The treasure awaits those who do not touch the ground."', findDC: 15 },
    { name: 'The Obsidian Gate', description: 'A gate carved from a single piece of volcanic glass.', clue: '"Speak the dragon\'s name. All of it. Yes, all thirty-seven syllables."', findDC: 16 },
    { name: 'The Chamber of Echoes', description: 'A cavern where every sound repeats for minutes.', clue: '"Silence is the key. Make no sound from gate to treasure."', findDC: 14 },
  ], finalLocation: 'A vault inside a dormant volcano.', treasure: '10,000gp, a dragon egg, a legendary weapon (DM\'s choice), 3 artifacts.', guardian: 'The dragon isn\'t dead. It\'s sleeping. On top of the treasure. Good luck.', trap: 'Touching the treasure without disabling the ward wakes the dragon (CR 17+).', riddle: 'What can fly without wings, cry without eyes, and wherever it goes, darkness follows?', riddleAnswer: 'A cloud' },
];

export function getRandomTreasureMap(): TreasureMap {
  return MAPS[Math.floor(Math.random() * MAPS.length)];
}

export function getMapsByTier(tier: TreasureTier): TreasureMap[] {
  return MAPS.filter((m) => m.tier === tier);
}

export function getLandmarkCount(map: TreasureMap): number {
  return map.landmarks.length;
}

export function getMapsWithGuardians(): TreasureMap[] {
  return MAPS.filter((m) => m.guardian !== null);
}

export function getAllConditions(): MapCondition[] {
  return ['pristine', 'weathered', 'torn', 'coded', 'magical'];
}

export function formatTreasureMap(map: TreasureMap, showAnswer: boolean = false): string {
  const icon = { pristine: '📜', weathered: '🗺️', torn: '📄', coded: '🔐', magical: '✨' }[map.condition];
  const tier = { minor: '🟢', moderate: '🟡', major: '🟠', legendary: '🔴' }[map.tier];
  const lines = [`${icon} ${tier} **${map.name}** *(${map.condition}, ${map.tier})*`];
  lines.push(`  *${map.origin}*`);
  lines.push(`  Landmarks: ${map.landmarks.map((l) => l.name).join(' → ')} → ${map.finalLocation}`);
  lines.push(`  💰 Treasure: ${map.treasure}`);
  lines.push(`  ❓ Riddle: *"${map.riddle}"*`);
  if (showAnswer) lines.push(`  🔑 Answer: ${map.riddleAnswer}`);
  if (map.guardian) lines.push(`  🐉 Guardian: ${map.guardian}`);
  return lines.join('\n');
}

export { MAPS as TREASURE_MAPS };
