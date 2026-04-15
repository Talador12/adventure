// Hex travel engine - connects world map movement to encounters, survival, and day/night cycle.
// 1 hex = ~6 miles. Normal pace = 4 hexes/day. Each hex costs movement based on terrain.

import type { OverlandTerrain, WorldHex } from './worldMapGen';
import { OVERLAND_TERRAIN_CONFIG } from './worldMapGen';

export type TravelPace = 'fast' | 'normal' | 'slow' | 'cautious';
export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'dusk' | 'night';
export type TravelEventType = 'encounter' | 'discovery' | 'hazard' | 'rest_site' | 'nothing' | 'social';

export interface TravelEvent {
  type: TravelEventType;
  title: string;
  description: string;
  terrain: OverlandTerrain;
  dc?: number;
  successText?: string;
  failText?: string;
  combatEncounter?: boolean;
}

export interface TravelDayState {
  day: number;
  hexesTraveled: number;
  maxHexesPerDay: number;
  timeOfDay: TimeOfDay;
  events: TravelEvent[];
  fatigueLevel: number; // 0-5 exhaustion
  waterRemaining: number; // days of water
  foodRemaining: number; // days of food
  currentHex: { col: number; row: number };
  weather: string;
  isLost: boolean;
}

const PACE_CONFIG: Record<TravelPace, { hexesPerDay: number; stealthMod: number; perceptionMod: number; encounterMod: number }> = {
  fast:     { hexesPerDay: 5, stealthMod: -5, perceptionMod: -5, encounterMod: 1.2 },
  normal:   { hexesPerDay: 4, stealthMod: 0, perceptionMod: 0, encounterMod: 1.0 },
  slow:     { hexesPerDay: 3, stealthMod: 5, perceptionMod: 5, encounterMod: 0.7 },
  cautious: { hexesPerDay: 2, stealthMod: 10, perceptionMod: 10, encounterMod: 0.4 },
};

const TIME_PROGRESSION: TimeOfDay[] = ['dawn', 'morning', 'afternoon', 'dusk', 'night'];

const WEATHER_TABLE = [
  'Clear skies, warm breeze',
  'Overcast, cool and damp',
  'Light rain, muddy trails',
  'Heavy rain, reduced visibility',
  'Fog rolls in thick',
  'Strong winds, difficult conversation',
  'Scorching heat, need extra water',
  'Bitter cold, need warm gear',
  'Thunderstorm, seek shelter',
  'Perfect traveling weather',
];

// Biome-to-encounter mapping
const TERRAIN_ENCOUNTERS: Partial<Record<OverlandTerrain, TravelEvent[]>> = {
  plains: [
    { type: 'encounter', title: 'Merchant Caravan', description: 'A well-guarded caravan of merchants heading the opposite direction. They are willing to trade.', terrain: 'plains' },
    { type: 'discovery', title: 'Ancient Standing Stones', description: 'A circle of weathered menhirs hums with residual magic. Resting here restores 1 spell slot.', terrain: 'plains' },
    { type: 'hazard', title: 'Prairie Fire', description: 'Smoke rises ahead. A grass fire is spreading fast toward the party.', terrain: 'plains', dc: 13, successText: 'You outflank the fire through a creek bed.', failText: 'The fire catches up. Each party member takes 2d6 fire damage.' },
    { type: 'social', title: 'Wandering Shepherd', description: 'An old shepherd and her dog. She knows the area well and shares rumors about the road ahead.', terrain: 'plains' },
    { type: 'nothing', title: 'Quiet Miles', description: 'The wind whispers through the grass. Nothing interrupts the journey.', terrain: 'plains' },
  ],
  forest: [
    { type: 'encounter', title: 'Territorial Owlbear', description: 'An owlbear blocks the trail, guarding a nest of eggs. It is not hostile unless you approach.', terrain: 'forest', combatEncounter: true },
    { type: 'discovery', title: 'Hidden Spring', description: 'Crystal-clear water bubbles from moss-covered rocks. Safe to drink. Refill water supplies.', terrain: 'forest' },
    { type: 'hazard', title: 'Tangled Path', description: 'The trail disappears into thick undergrowth. Navigation becomes difficult.', terrain: 'forest', dc: 12, successText: 'You find blazes on the trees and stay on course.', failText: 'Lost for 1d4 hours. Consume extra rations.' },
    { type: 'social', title: 'Woodcutter Camp', description: 'Three woodcutters around a fire. They offer to share their meal and warn about wolves to the north.', terrain: 'forest' },
    { type: 'rest_site', title: 'Sheltered Hollow', description: 'A natural depression between ancient oaks. Dry, sheltered from wind. Perfect campsite.', terrain: 'forest' },
  ],
  mountains: [
    { type: 'hazard', title: 'Rockslide', description: 'Loose scree shifts above. The ground trembles.', terrain: 'mountains', dc: 14, successText: 'You press against the cliff face as rocks thunder past.', failText: 'Rocks hit the party. 3d6 bludgeoning damage, half on a DC 13 Dex save.' },
    { type: 'discovery', title: 'Eagle Aerie', description: 'A giant eagle nests on a crag above. It watches but does not attack. Its nest glints with something metallic.', terrain: 'mountains' },
    { type: 'encounter', title: 'Mountain Goat Herd', description: 'A herd of unusually large goats blocks a narrow pass. Their herder, a taciturn dwarf, sells cheese.', terrain: 'mountains' },
    { type: 'hazard', title: 'Thin Air', description: 'The altitude takes its toll. Breathing becomes labored.', terrain: 'mountains', dc: 12, successText: 'Slow pace helps you acclimatize.', failText: 'One level of exhaustion from altitude sickness.' },
    { type: 'nothing', title: 'Breathtaking Vista', description: 'The view from the pass is staggering. You can see for 50 miles in every direction.', terrain: 'mountains' },
  ],
  swamp: [
    { type: 'hazard', title: 'Quicksand', description: 'The ground gives way beneath your feet. Someone is sinking.', terrain: 'swamp', dc: 13, successText: 'You pull free before going under.', failText: 'Lose a piece of gear and take 1d6 damage struggling free.' },
    { type: 'encounter', title: 'Will-o-Wisps', description: 'Dancing lights lead deeper into the marsh. Beautiful but almost certainly a trap.', terrain: 'swamp', combatEncounter: true },
    { type: 'discovery', title: 'Sunken Shrine', description: 'Half-submerged stonework. An altar to a forgotten god still holds an offering bowl with coins.', terrain: 'swamp' },
    { type: 'hazard', title: 'Swamp Gas', description: 'Bubbles of foul gas rise from the muck. The air shimmers.', terrain: 'swamp', dc: 11, successText: 'You hold your breath and move quickly through.', failText: 'Poisoned for 1 hour. Disadvantage on ability checks.' },
    { type: 'social', title: 'Hermit Herbalist', description: 'A reclusive woman lives in a stilted hut. She trades healing salves for interesting stories.', terrain: 'swamp' },
  ],
  desert: [
    { type: 'hazard', title: 'Sandstorm', description: 'The horizon disappears in a wall of sand. It hits fast.', terrain: 'desert', dc: 14, successText: 'You find shelter behind a dune and wait it out.', failText: 'Lost for 1d6 hours. Each party member takes 1d4 damage and exhaustion.' },
    { type: 'discovery', title: 'Oasis', description: 'Palm trees and cool water. An oasis appears like a miracle. It is real.', terrain: 'desert' },
    { type: 'encounter', title: 'Sand Wurm Sign', description: 'Massive furrows in the sand. Something enormous passed through here recently. Very recently.', terrain: 'desert', combatEncounter: true },
    { type: 'hazard', title: 'Scorching Heat', description: 'The sun is merciless. Water consumption doubles.', terrain: 'desert', dc: 12, successText: 'You travel during dawn and dusk, resting through midday.', failText: 'One level of exhaustion. Consume double water.' },
    { type: 'social', title: 'Desert Nomads', description: 'A caravan of desert nomads. They share water freely and ask for news from the green lands.', terrain: 'desert' },
  ],
  ruins: [
    { type: 'discovery', title: 'Hidden Cache', description: 'Behind a collapsed wall, a sealed chest. Still intact after centuries.', terrain: 'ruins' },
    { type: 'encounter', title: 'Restless Dead', description: 'Bones reassemble in the moonlight. The dead here do not rest easy.', terrain: 'ruins', combatEncounter: true },
    { type: 'hazard', title: 'Collapsing Floor', description: 'The stone underfoot cracks. Part of the ruin is giving way.', terrain: 'ruins', dc: 13, successText: 'You leap back as the floor falls into darkness below.', failText: 'Fall 20 feet. 2d6 bludgeoning damage.' },
    { type: 'discovery', title: 'Ancient Inscription', description: 'Words carved in a dead language. They describe the location of something valuable nearby.', terrain: 'ruins' },
    { type: 'nothing', title: 'Echoing Silence', description: 'Wind moves through empty doorways. Nothing here but dust and memory.', terrain: 'ruins' },
  ],
  hills: [
    { type: 'discovery', title: 'Hilltop Fort', description: 'An abandoned watchtower with a clear view of the surrounding terrain. Good defensible campsite.', terrain: 'hills' },
    { type: 'encounter', title: 'Hill Giant Territory', description: 'Thrown boulders crash nearby. A hill giant does not want company.', terrain: 'hills', combatEncounter: true },
    { type: 'social', title: 'Mining Camp', description: 'A small mining operation. The miners are tired but friendly. They trade ore for food.', terrain: 'hills' },
    { type: 'nothing', title: 'Rolling Green', description: 'Gentle slopes covered in wildflowers. Peaceful. Almost suspiciously so.', terrain: 'hills' },
    { type: 'hazard', title: 'Flash Flood', description: 'A dry gulley fills suddenly with rushing water from rain higher up.', terrain: 'hills', dc: 12, successText: 'You scramble to high ground in time.', failText: 'Swept downstream. 2d6 damage and lose 1d4 hours.' },
  ],
  tundra: [
    { type: 'hazard', title: 'Whiteout', description: 'Snow and wind erase all landmarks. Navigation is impossible.', terrain: 'tundra', dc: 15, successText: 'You anchor to a rock face and wait for visibility.', failText: 'Wandered in circles. Lost a full day. One level exhaustion.' },
    { type: 'encounter', title: 'Frost Wolf Pack', description: 'Yellow eyes in the snow. They have been following since dawn.', terrain: 'tundra', combatEncounter: true },
    { type: 'discovery', title: 'Frozen Mammoth', description: 'A perfectly preserved mammoth in the ice. Something glints in its tusk.', terrain: 'tundra' },
    { type: 'social', title: 'Ice Fisher', description: 'A lone fisherman on a frozen lake. He shares dried fish and directions to the nearest shelter.', terrain: 'tundra' },
    { type: 'rest_site', title: 'Ice Cave', description: 'A natural cave in the permafrost. Cold but out of the wind. Survivable.', terrain: 'tundra' },
  ],
  coast: [
    { type: 'discovery', title: 'Shipwreck', description: 'A vessel broken on the rocks. The cargo hold is partially accessible at low tide.', terrain: 'coast' },
    { type: 'encounter', title: 'Merfolk Traders', description: 'Merfolk surface near shore and offer to trade underwater treasures for surface goods.', terrain: 'coast' },
    { type: 'hazard', title: 'Rip Current', description: 'The tide shifts violently. Anyone near the water is pulled.', terrain: 'coast', dc: 13, successText: 'You swim parallel to shore and escape.', failText: 'Pulled out to sea. Exhaustion and lose 1d4 hours getting back.' },
    { type: 'social', title: 'Fishing Village', description: 'A tiny hamlet of three huts. They have fresh fish and tales of what lurks offshore.', terrain: 'coast' },
    { type: 'nothing', title: 'Tidal Pools', description: 'Beautiful pools teeming with colorful creatures. A moment of peace.', terrain: 'coast' },
  ],
  village: [
    { type: 'social', title: 'Village Market', description: 'A small market with local goods. Prices are fair and the gossip is free.', terrain: 'village' },
    { type: 'rest_site', title: 'The Local Inn', description: 'Warm beds, hot food, cold ale. A proper rest in civilization.', terrain: 'village' },
    { type: 'social', title: 'Town Notice Board', description: 'Wanted posters, job listings, missing persons. A bulletin board tells the story of a community.', terrain: 'village' },
    { type: 'discovery', title: 'Village Elder', description: 'The elder knows the history of the region. Asking the right questions reveals hidden locations on the map.', terrain: 'village' },
    { type: 'nothing', title: 'Peaceful Stop', description: 'Children playing, smoke from chimneys, the smell of bread. Civilization.', terrain: 'village' },
  ],
  city: [
    { type: 'social', title: 'Guild Hall', description: 'The adventurers guild has contracts, information, and rivalry in equal measure.', terrain: 'city' },
    { type: 'social', title: 'Black Market Contact', description: 'A hooded figure in an alley offers rare goods at steep prices. No questions asked.', terrain: 'city' },
    { type: 'discovery', title: 'Library', description: 'The city library contains maps, histories, and one book that should not exist.', terrain: 'city' },
    { type: 'rest_site', title: 'Luxury Inn', description: 'Fine dining, private rooms, a bath. Remove all levels of exhaustion.', terrain: 'city' },
    { type: 'encounter', title: 'Pickpocket', description: 'A quick hand in the crowd. Someone just lifted your coin purse.', terrain: 'city', dc: 14, successText: 'You catch the thief. She offers information as payment for mercy.', failText: 'Gone. Lose 2d10 gold.' },
  ],
};

// Roll a travel event based on terrain and encounter chance
export function rollTravelEvent(hex: WorldHex, pace: TravelPace, rng?: () => number): TravelEvent | null {
  const roll = rng ? rng() : Math.random();
  const encounterChance = 0.35 * PACE_CONFIG[pace].encounterMod;
  if (roll > encounterChance) return null;

  const events = TERRAIN_ENCOUNTERS[hex.terrain];
  if (!events || events.length === 0) {
    return { type: 'nothing', title: 'Uneventful Hex', description: `The ${OVERLAND_TERRAIN_CONFIG[hex.terrain].label.toLowerCase()} stretches on. Nothing of note.`, terrain: hex.terrain };
  }
  const idx = Math.floor((rng ? rng() : Math.random()) * events.length);
  return events[idx];
}

// Calculate movement cost for entering a hex
export function hexMovementCost(hex: WorldHex): number {
  return OVERLAND_TERRAIN_CONFIG[hex.terrain].travelCost;
}

// Get max hexes per day based on pace
export function maxHexesForPace(pace: TravelPace): number {
  return PACE_CONFIG[pace].hexesPerDay;
}

// Roll daily weather
export function rollWeather(rng?: () => number): string {
  const idx = Math.floor((rng ? rng() : Math.random()) * WEATHER_TABLE.length);
  return WEATHER_TABLE[idx];
}

// Advance time of day based on hexes traveled
export function getTimeOfDay(hexesTraveled: number, maxHexes: number): TimeOfDay {
  const ratio = hexesTraveled / maxHexes;
  if (ratio <= 0) return 'dawn';
  if (ratio <= 0.25) return 'morning';
  if (ratio <= 0.6) return 'afternoon';
  if (ratio <= 0.85) return 'dusk';
  return 'night';
}

// Check if party gets lost in difficult terrain
export function rollNavigationCheck(terrain: OverlandTerrain, pace: TravelPace, rng?: () => number): { lost: boolean; dc: number } {
  const baseDC: Partial<Record<OverlandTerrain, number>> = {
    dense_forest: 15, swamp: 14, mountains: 13, desert: 14, tundra: 13,
  };
  const dc = baseDC[terrain];
  if (!dc) return { lost: false, dc: 0 };
  const roll = Math.floor((rng ? rng() : Math.random()) * 20) + 1 + PACE_CONFIG[pace].perceptionMod;
  return { lost: roll < dc, dc };
}

// Create initial travel day state
export function createTravelDay(day: number, currentHex: { col: number; row: number }, pace: TravelPace, water: number, food: number): TravelDayState {
  return {
    day,
    hexesTraveled: 0,
    maxHexesPerDay: maxHexesForPace(pace),
    timeOfDay: 'dawn',
    events: [],
    fatigueLevel: 0,
    waterRemaining: water,
    foodRemaining: food,
    currentHex,
    weather: rollWeather(),
    isLost: false,
  };
}

// Process entering a new hex during travel
export function enterHex(state: TravelDayState, hex: WorldHex, pace: TravelPace): TravelDayState {
  const cost = hexMovementCost(hex);
  if (cost === Infinity) return { ...state }; // cannot enter

  const newState = { ...state, events: [...state.events] };
  newState.hexesTraveled += cost;
  newState.currentHex = { col: hex.col, row: hex.row };
  newState.timeOfDay = getTimeOfDay(newState.hexesTraveled, newState.maxHexesPerDay);

  // Navigation check for difficult terrain
  const nav = rollNavigationCheck(hex.terrain, pace);
  if (nav.lost) {
    newState.isLost = true;
    newState.hexesTraveled += 1; // lost costs extra movement
    newState.events.push({
      type: 'hazard',
      title: 'Lost!',
      description: `Navigation failed (DC ${nav.dc}). The party wanders for hours in the ${OVERLAND_TERRAIN_CONFIG[hex.terrain].label.toLowerCase()}.`,
      terrain: hex.terrain,
    });
  }

  // Roll for encounter
  const event = rollTravelEvent(hex, pace);
  if (event) newState.events.push(event);

  return newState;
}

// End of day - consume resources
export function endTravelDay(state: TravelDayState, partySize: number): TravelDayState {
  const newState = { ...state };
  newState.waterRemaining -= partySize * 0.5; // half-gallon per person per day
  newState.foodRemaining -= partySize * 0.5; // half-ration per person per day (assumes foraging)
  if (newState.waterRemaining <= 0) newState.fatigueLevel = Math.min(5, newState.fatigueLevel + 1);
  if (newState.foodRemaining <= 0) newState.fatigueLevel = Math.min(5, newState.fatigueLevel + 1);
  return newState;
}

// Format a travel day summary for DM chat
export function formatTravelDay(state: TravelDayState): string {
  const lines = [
    `**Day ${state.day} — ${state.weather}**`,
    `Hexes traveled: ${state.hexesTraveled}/${state.maxHexesPerDay} | Time: ${state.timeOfDay}`,
    `Supplies: ${state.waterRemaining.toFixed(1)} water, ${state.foodRemaining.toFixed(1)} food | Exhaustion: ${state.fatigueLevel}`,
  ];
  if (state.isLost) lines.push('⚠️ The party is lost!');
  if (state.events.length === 0) {
    lines.push('_Uneventful travel._');
  } else {
    for (const e of state.events) {
      lines.push(`\n**${e.title}** (${e.type})`);
      lines.push(e.description);
      if (e.dc) lines.push(`_DC ${e.dc} — Success: ${e.successText} | Failure: ${e.failText}_`);
    }
  }
  return lines.join('\n');
}

export { PACE_CONFIG, TIME_PROGRESSION, WEATHER_TABLE };
