// Travel encounter tables — biome-specific random events for overland travel.
// DM rolls when the party travels; result may be combat, social, discovery, or hazard.

export type TravelBiome = 'forest' | 'mountain' | 'desert' | 'swamp' | 'plains' | 'coast' | 'underdark' | 'arctic';

export type EncounterType = 'combat' | 'social' | 'discovery' | 'hazard' | 'rest';

export interface TravelEvent {
  id: string;
  biome: TravelBiome;
  type: EncounterType;
  name: string;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  dcCheck?: { ability: string; dc: number; successText: string; failText: string };
}

const EVENTS: TravelEvent[] = [
  // Forest
  { id: 'f-wolves', biome: 'forest', type: 'combat', name: 'Wolf Pack', description: 'A pack of wolves stalks the party through the trees.', difficulty: 'easy' },
  { id: 'f-hermit', biome: 'forest', type: 'social', name: 'Forest Hermit', description: 'A reclusive herbalist offers to trade potions for news of the outside world.' },
  { id: 'f-shrine', biome: 'forest', type: 'discovery', name: 'Ancient Shrine', description: 'A moss-covered shrine to a forgotten deity. Praying may grant a blessing.', dcCheck: { ability: 'WIS', dc: 12, successText: 'A warm light washes over you. Gain 1d6 temp HP.', failText: 'The shrine remains cold and silent.' } },
  { id: 'f-fallen', biome: 'forest', type: 'hazard', name: 'Fallen Tree', description: 'A massive tree blocks the path. Climb over or find another way.', dcCheck: { ability: 'STR', dc: 10, successText: 'You scramble over easily.', failText: 'You slip and take 1d4 bludgeoning damage.' } },
  { id: 'f-glade', biome: 'forest', type: 'rest', name: 'Peaceful Glade', description: 'A sun-dappled clearing with a freshwater spring. Perfect for a short rest.' },

  // Mountain
  { id: 'm-griffon', biome: 'mountain', type: 'combat', name: 'Griffon Nest', description: 'You\'ve stumbled too close to a griffon\'s nest. The mother is not pleased.', difficulty: 'medium' },
  { id: 'm-miner', biome: 'mountain', type: 'social', name: 'Lost Miner', description: 'A dwarf miner is lost and injured. Help them and they\'ll share a map of nearby caves.' },
  { id: 'm-cave', biome: 'mountain', type: 'discovery', name: 'Hidden Cave', description: 'A concealed cave entrance behind a waterfall. Could contain treasure or trouble.' },
  { id: 'm-rockslide', biome: 'mountain', type: 'hazard', name: 'Rockslide', description: 'Loose stones start tumbling!', dcCheck: { ability: 'DEX', dc: 13, successText: 'You dodge the falling rocks.', failText: 'Rocks strike you for 2d6 bludgeoning damage.' } },
  { id: 'm-vista', biome: 'mountain', type: 'rest', name: 'Mountain Vista', description: 'A breathtaking view of the lands below. The party feels inspired.' },

  // Desert
  { id: 'd-scorpion', biome: 'desert', type: 'combat', name: 'Giant Scorpions', description: 'Massive scorpions erupt from the sand beneath your feet!', difficulty: 'medium' },
  { id: 'd-caravan', biome: 'desert', type: 'social', name: 'Trading Caravan', description: 'A merchant caravan offers exotic goods and water at a premium.' },
  { id: 'd-oasis', biome: 'desert', type: 'discovery', name: 'Hidden Oasis', description: 'Palm trees surround a crystal-clear pool. Is it real, or a mirage?', dcCheck: { ability: 'INT', dc: 11, successText: 'It\'s real! Refill water and rest safely.', failText: 'A mirage. The disappointment is crushing. Gain 1 exhaustion.' } },
  { id: 'd-storm', biome: 'desert', type: 'hazard', name: 'Sandstorm', description: 'A wall of sand approaches. Find shelter or endure.', dcCheck: { ability: 'CON', dc: 14, successText: 'You weather the storm.', failText: 'Blinding sand deals 1d6 damage and causes exhaustion.' } },

  // Swamp
  { id: 's-croc', biome: 'swamp', type: 'combat', name: 'Crocodile Ambush', description: 'What you thought was a log lunges at you with snapping jaws!', difficulty: 'easy' },
  { id: 's-witch', biome: 'swamp', type: 'social', name: 'Swamp Witch', description: 'A hag offers to read your fortune — for a price.' },
  { id: 's-ruin', biome: 'swamp', type: 'discovery', name: 'Sunken Ruins', description: 'Stone pillars jut from the murky water. Something glints below the surface.' },
  { id: 's-fog', biome: 'swamp', type: 'hazard', name: 'Poisonous Fog', description: 'A sickly green fog rolls in.', dcCheck: { ability: 'CON', dc: 12, successText: 'You hold your breath and push through.', failText: 'You inhale the fumes. Poisoned for 1 hour.' } },

  // Plains
  { id: 'p-bandits', biome: 'plains', type: 'combat', name: 'Highway Bandits', description: 'Bandits step out from behind a cart wreck. "Your gold or your life!"', difficulty: 'easy' },
  { id: 'p-farmer', biome: 'plains', type: 'social', name: 'Farmer in Need', description: 'A farmer\'s cart is stuck in a rut. Help earns a free meal and gossip.' },
  { id: 'p-stones', biome: 'plains', type: 'discovery', name: 'Standing Stones', description: 'A circle of ancient standing stones pulses with faint magic at dusk.' },

  // Coast
  { id: 'c-pirates', biome: 'coast', type: 'combat', name: 'Pirate Landing', description: 'A pirate skiff has beached on shore. The crew spots you.', difficulty: 'medium' },
  { id: 'c-wreck', biome: 'coast', type: 'discovery', name: 'Shipwreck', description: 'A half-sunken ship lies offshore. Salvage could be valuable — or dangerous.' },
  { id: 'c-tide', biome: 'coast', type: 'hazard', name: 'Rising Tide', description: 'The tide is coming in fast!', dcCheck: { ability: 'STR', dc: 11, successText: 'You reach high ground in time.', failText: 'Swept off your feet. Take 1d6 damage and lose an item.' } },

  // Underdark
  { id: 'u-spider', biome: 'underdark', type: 'combat', name: 'Phase Spider', description: 'A phase spider materializes from the ethereal plane, fangs dripping venom.', difficulty: 'hard' },
  { id: 'u-mushroom', biome: 'underdark', type: 'discovery', name: 'Luminous Mushroom Grove', description: 'Bioluminescent fungi illuminate a cavern. Some may be edible — or hallucinogenic.' },
  { id: 'u-gas', biome: 'underdark', type: 'hazard', name: 'Toxic Gas Pocket', description: 'A pocket of noxious gas hisses from a crack.', dcCheck: { ability: 'CON', dc: 13, successText: 'You notice the gas and hold your breath.', failText: 'You inhale the fumes. Take 2d6 poison damage.' } },

  // Arctic
  { id: 'a-yeti', biome: 'arctic', type: 'combat', name: 'Yeti Attack', description: 'A yeti emerges from the blizzard, howling with rage.', difficulty: 'hard' },
  { id: 'a-crevasse', biome: 'arctic', type: 'hazard', name: 'Hidden Crevasse', description: 'The ice cracks beneath your feet!', dcCheck: { ability: 'DEX', dc: 14, successText: 'You leap clear!', failText: 'You fall 20ft into the crevasse. Take 2d6 damage.' } },
  { id: 'a-cabin', biome: 'arctic', type: 'rest', name: 'Abandoned Cabin', description: 'A snow-buried cabin with a working fireplace. Shelter from the storm.' },
];

export function rollTravelEncounter(biome: TravelBiome): TravelEvent {
  const pool = EVENTS.filter((e) => e.biome === biome);
  if (pool.length === 0) return EVENTS[0];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getEncountersByBiome(biome: TravelBiome): TravelEvent[] {
  return EVENTS.filter((e) => e.biome === biome);
}

export function getAllBiomes(): TravelBiome[] {
  return [...new Set(EVENTS.map((e) => e.biome))];
}

export function formatTravelEvent(event: TravelEvent): string {
  const typeIcon = event.type === 'combat' ? '⚔️' : event.type === 'social' ? '💬' : event.type === 'discovery' ? '🔍' : event.type === 'hazard' ? '⚠️' : '⛺';
  let text = `${typeIcon} **${event.name}** (${event.biome})\n${event.description}`;
  if (event.difficulty) text += `\n*Difficulty: ${event.difficulty}*`;
  if (event.dcCheck) text += `\n*${event.dcCheck.ability} save DC ${event.dcCheck.dc}*`;
  return text;
}
