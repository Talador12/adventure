// Random villain lair designer — themed boss rooms with environmental storytelling.

export type LairType = 'throne_room' | 'laboratory' | 'sanctum' | 'arena' | 'nest' | 'void_chamber';

export interface LairFeature { name: string; description: string; mechanicalEffect: string | null; }

export interface VillainLair {
  name: string;
  type: LairType;
  villain: string;
  atmosphere: string;
  features: LairFeature[];
  environmentalStorytelling: string[];
  bossAdvantage: string;
  partyOpportunity: string;
  escapeRoute: string;
}

const LAIRS: VillainLair[] = [
  { name: 'The Obsidian Throne', type: 'throne_room', villain: 'A tyrant who rules through fear', atmosphere: 'Black stone walls. No windows. The only light comes from cracks of lava flowing beneath a glass floor.', features: [
    { name: 'The Glass Floor', description: 'Transparent floor over a lava river. Cracking in places.', mechanicalEffect: 'STR DC 14 stomp: 10ft section shatters. Creatures in area: DEX DC 13 or 6d6 fire.' },
    { name: 'The Iron Throne', description: 'A throne of fused weapons taken from defeated enemies.', mechanicalEffect: 'Sitting grants +2 Intimidation. The villain uses it for advantage on CHA checks.' },
    { name: 'Trophy Banners', description: 'Banners of every kingdom the villain has conquered line the walls.', mechanicalEffect: null },
  ], environmentalStorytelling: ['A child\'s drawing on the wall behind the throne — the villain was once loved.', 'The throne\'s armrests are worn smooth. They sit here for hours. Alone.', 'Fresh flowers in a vase. Someone still brings them. Why?'], bossAdvantage: 'The villain knows every crack in the floor. They never step on weak spots. They can shatter sections tactically.', partyOpportunity: 'The lava beneath can be redirected with a lever behind the throne (Investigation DC 15 to find).', escapeRoute: 'A hidden passage behind the trophy banners leads to the roof.' },
  { name: 'The Flesh Workshop', type: 'laboratory', villain: 'A mad artificer who "improves" living creatures', atmosphere: 'Jars of preserved organs. Tables with leather straps. The smell of formaldehyde and burnt hair.', features: [
    { name: 'Operating Tables', description: 'Four tables with restraints. One is occupied by something still breathing.', mechanicalEffect: 'Freeing the creature: Medicine DC 13. It\'s grateful but unstable (50% ally, 50% feral).' },
    { name: 'Chemical Vats', description: 'Bubbling vats of alchemical solutions. Color-coded. Label: DO NOT MIX.', mechanicalEffect: 'Mixing two vats: random effect (1d6: 1-2 explosion 4d6 acid, 3-4 healing fog 2d8, 5-6 smoke screen).'},
    { name: 'The Masterwork', description: 'A half-finished chimera in a reinforced cage. It has too many eyes.', mechanicalEffect: 'If released: CR 8 chimera variant. Attacks the villain first (it remembers the pain).' },
  ], environmentalStorytelling: ['A journal with entries getting progressively more unhinged. Early pages are beautiful scientific illustrations.', 'A child\'s music box on the desk. It plays when wound. The artificer stops working when they hear it.', 'The "failures" are buried in the back garden. There are a LOT of graves.'], bossAdvantage: 'Can activate any vat remotely. Knows the lab layout blindfolded. Chemical traps on every surface.', partyOpportunity: 'The chimera is the artificer\'s greatest weakness — they won\'t destroy it. Threaten the cage.', escapeRoute: 'A drainage pipe large enough for a Medium creature. Leads to the sewers. Smells awful.' },
  { name: 'The Inverted Spire', type: 'void_chamber', villain: 'A warlock whose patron has consumed the space around them', atmosphere: 'The room is upside down. Or you are. Gravity shifts every few seconds. Stars are visible through the floor.', features: [
    { name: 'Gravity Flux', description: 'Gravity changes direction every 1d4 rounds.', mechanicalEffect: 'DEX DC 13 when gravity shifts or fall to the new "floor" (2d6 bludgeoning). Flying creatures unaffected.' },
    { name: 'The Patron\'s Eye', description: 'A massive eye floats in the center of the room. It blinks. It sees everything.', mechanicalEffect: 'No invisibility or stealth possible. The eye alerts the warlock to all threats.' },
    { name: 'Void Cracks', description: 'Tears in reality line the walls. Things whisper from the other side.', mechanicalEffect: 'Pushing a creature into a void crack: WIS DC 15 or banished for 1 round (returns confused).' },
  ], environmentalStorytelling: ['The warlock\'s original spellbook is pinned to the ceiling. The early spells are normal. The later ones are in a language that hurts.', 'Photos of a family are scattered across every surface. The warlock doesn\'t remember who they are.', 'The patron\'s eye occasionally shows a different scene — a beautiful garden. What the space looked like before.'], bossAdvantage: 'Immune to gravity shifts (patron\'s gift). Can see through the Eye. Can open/close void cracks at will.', partyOpportunity: 'Destroying the Eye (AC 15, HP 50) blinds the warlock AND angers the patron. The patron may turn on the warlock.', escapeRoute: 'The void cracks can be navigated intentionally (Arcana DC 16) to exit to a random nearby location.' },
];

export function getRandomLair(): VillainLair {
  return LAIRS[Math.floor(Math.random() * LAIRS.length)];
}

export function getLairsByType(type: LairType): VillainLair[] {
  return LAIRS.filter((l) => l.type === type);
}

export function getAllLairTypes(): LairType[] {
  return [...new Set(LAIRS.map((l) => l.type))];
}

export function formatLair(lair: VillainLair): string {
  const icon = { throne_room: '👑', laboratory: '🔬', sanctum: '🔮', arena: '🏟️', nest: '🕸️', void_chamber: '🌀' }[lair.type];
  const lines = [`${icon} **${lair.name}** *(${lair.type.replace(/_/g, ' ')})*`];
  lines.push(`  Villain: ${lair.villain}`);
  lines.push(`  *${lair.atmosphere}*`);
  lair.features.forEach((f) => lines.push(`  ⚙️ ${f.name}: ${f.description}`));
  lines.push(`  🎯 Boss advantage: ${lair.bossAdvantage}`);
  lines.push(`  💡 Party opportunity: ${lair.partyOpportunity}`);
  return lines.join('\n');
}

export { LAIRS as VILLAIN_LAIRS };
