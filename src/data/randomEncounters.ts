// Random encounter tables by environment — DM rolls for wandering encounters.

export interface RandomEncounterEntry {
  name: string;
  cr: number;
  count: [number, number]; // min, max
  description: string;
}

export const RANDOM_ENCOUNTER_TABLES: Record<string, RandomEncounterEntry[]> = {
  forest: [
    { name: 'Wolf Pack', cr: 0.25, count: [3, 6], description: 'Hungry wolves circling the party, drawn by the scent of rations.' },
    { name: 'Goblin Ambush', cr: 0.25, count: [4, 8], description: 'Goblins hiding in the trees, waiting to spring a trap.' },
    { name: 'Owlbear', cr: 3, count: [1, 1], description: 'A territorial owlbear defending its nest.' },
    { name: 'Dryad', cr: 1, count: [1, 2], description: 'A dryad emerges from an ancient oak — hostile if the forest has been harmed.' },
    { name: 'Bandit Camp', cr: 0.25, count: [3, 5], description: 'Bandits camped along the trail, demanding a toll.' },
    { name: 'Giant Spider Nest', cr: 1, count: [2, 4], description: 'Webbing blocks the path — giant spiders descend from the canopy.' },
  ],
  dungeon: [
    { name: 'Skeleton Patrol', cr: 0.25, count: [4, 8], description: 'Animated skeletons marching through the corridors.' },
    { name: 'Gelatinous Cube', cr: 2, count: [1, 1], description: 'A transparent ooze filling the entire passage.' },
    { name: 'Mimic', cr: 2, count: [1, 1], description: 'That treasure chest is not what it seems...' },
    { name: 'Zombie Horde', cr: 0.25, count: [5, 10], description: 'Shambling undead, slow but relentless.' },
    { name: 'Rust Monster', cr: 0.5, count: [1, 3], description: 'Antennae twitching, hungry for metal equipment.' },
    { name: 'Trapped Room', cr: 0, count: [0, 0], description: 'Pressure plates, dart traps, and a locked door. Perception DC 14, Thieves\' Tools DC 12.' },
  ],
  mountain: [
    { name: 'Rock Slide', cr: 0, count: [0, 0], description: 'DEX save DC 13 or take 2d6 bludgeoning damage from falling rocks.' },
    { name: 'Orc War Band', cr: 1, count: [3, 5], description: 'Orcs descending from their mountain stronghold.' },
    { name: 'Griffon', cr: 2, count: [1, 2], description: 'A griffon swoops from a cliff ledge, protecting its territory.' },
    { name: 'Troll', cr: 5, count: [1, 1], description: 'A troll emerges from a cave, regenerating and hungry.' },
    { name: 'Mountain Goats', cr: 0, count: [0, 0], description: 'Harmless but blocking a narrow ledge. Animal Handling DC 10 to pass.' },
  ],
  swamp: [
    { name: 'Will-o\'-Wisp', cr: 2, count: [1, 3], description: 'Ethereal lights luring travelers into quicksand.' },
    { name: 'Giant Crocodile', cr: 5, count: [1, 1], description: 'Lunges from the murky water without warning.' },
    { name: 'Lizardfolk Hunters', cr: 0.5, count: [3, 6], description: 'Lizardfolk defending their territory from intruders.' },
    { name: 'Stirge Swarm', cr: 0.25, count: [6, 12], description: 'Blood-sucking stirges descend in a cloud.' },
    { name: 'Hag\'s Bargain', cr: 0, count: [0, 0], description: 'A green hag offers a deal — helpful but always with a price.' },
  ],
  urban: [
    { name: 'Pickpocket', cr: 0, count: [0, 0], description: 'A nimble thief attempts to lift a coin purse. Perception DC 15 to notice.' },
    { name: 'Bar Brawl', cr: 0.25, count: [3, 6], description: 'Drunken thugs pick a fight in the tavern.' },
    { name: 'Cult Meeting', cr: 0.5, count: [4, 6], description: 'Cultists in the sewers performing a dark ritual.' },
    { name: 'Guard Patrol', cr: 0.5, count: [3, 4], description: 'City guards suspicious of armed strangers.' },
    { name: 'Mysterious Merchant', cr: 0, count: [0, 0], description: 'A cloaked figure sells rare items — but are they stolen?' },
  ],
};

export function rollRandomEncounter(environment: string): RandomEncounterEntry {
  const table = RANDOM_ENCOUNTER_TABLES[environment] || RANDOM_ENCOUNTER_TABLES.forest;
  return table[Math.floor(Math.random() * table.length)];
}

export function rollEncounterCount(entry: RandomEncounterEntry): number {
  if (entry.count[0] === 0 && entry.count[1] === 0) return 0;
  return entry.count[0] + Math.floor(Math.random() * (entry.count[1] - entry.count[0] + 1));
}
