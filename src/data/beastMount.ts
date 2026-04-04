// Magical beast mount catalog — exotic rideable creatures with stats and temperaments.

export type MountCategory = 'land' | 'flying' | 'aquatic' | 'burrowing' | 'exotic';
export type MountTemperament = 'docile' | 'spirited' | 'stubborn' | 'wild' | 'bonded';

export interface BeastMount {
  name: string;
  species: string;
  category: MountCategory;
  temperament: MountTemperament;
  speed: string;
  hp: number;
  ac: number;
  carryCapacity: string;
  specialAbility: string;
  feedingRequirements: string;
  price: number;
  tamingDC: number;
  quirk: string;
}

const MOUNTS: BeastMount[] = [
  { name: 'Thunderhoof', species: 'Dire Elk', category: 'land', temperament: 'spirited', speed: '60ft', hp: 30, ac: 12, carryCapacity: '400 lbs (Medium + gear)', specialAbility: 'Charge: +2d6 damage after 20ft run. Can jump 15ft without a check.', feedingRequirements: 'Grass and grain. 10lbs/day. Loves apples.', price: 200, tamingDC: 13, quirk: 'Refuses to walk through puddles. Will jump over them dramatically instead.' },
  { name: 'Skywhisper', species: 'Giant Owl', category: 'flying', temperament: 'bonded', speed: '10ft walk, 60ft fly', hp: 20, ac: 13, carryCapacity: '200 lbs (Small or lightweight Medium)', specialAbility: 'Silent flight: advantage on Stealth while flying. Darkvision 120ft.', feedingRequirements: 'Small mammals. 2 rabbits/day. Will hunt on its own if released.', price: 500, tamingDC: 14, quirk: 'Judges your decisions by hooting disapprovingly. One hoot = minor concern. Three hoots = terrible idea.' },
  { name: 'Riptide', species: 'Giant Seahorse', category: 'aquatic', temperament: 'docile', speed: '40ft swim', hp: 25, ac: 11, carryCapacity: '300 lbs underwater', specialAbility: 'Water Breathing aura: rider can breathe underwater while mounted.', feedingRequirements: 'Seaweed and small fish. Eats continuously while swimming.', price: 300, tamingDC: 10, quirk: 'Changes color based on mood. Pink = happy. Grey = sad. Red = RUN.' },
  { name: 'Granite', species: 'Bulette Pup', category: 'burrowing', temperament: 'wild', speed: '40ft walk, 30ft burrow', hp: 40, ac: 15, carryCapacity: '500 lbs', specialAbility: 'Tremorsense 30ft. Can burst from underground (surprise attack, +3d6 damage).', feedingRequirements: 'Rocks. Literally eats rocks. And occasionally halflings if not watched.', price: 800, tamingDC: 16, quirk: 'Purrs when scratched behind the ear plates. The purring causes minor earthquakes.' },
  { name: 'Stardust', species: 'Phase Spider (tamed)', category: 'exotic', temperament: 'stubborn', speed: '30ft walk, 30ft climb, Ethereal Jaunt', hp: 26, ac: 14, carryCapacity: '250 lbs', specialAbility: 'Ethereal Jaunt: shift to Ethereal Plane for 1 round (rider goes too). 3/day.', feedingRequirements: 'Ethereal moths. Or regular moths. It\'s not picky about the plane of origin.', price: 1500, tamingDC: 15, quirk: 'Builds a web nest every time you stop for more than 10 minutes. Your campsite is always decorated.' },
  { name: 'Blaze', species: 'Young Nightmare (redeemed)', category: 'exotic', temperament: 'bonded', speed: '60ft walk, 90ft fly', hp: 45, ac: 13, carryCapacity: '400 lbs', specialAbility: 'Flaming hooves: leaves fire trail (difficult terrain, 1d4 fire). Ethereal stride 1/day.', feedingRequirements: 'Brimstone and charcoal. Eats campfires if left unattended.', price: 5000, tamingDC: 18, quirk: 'Was evil. Chose not to be. Still has nightmares about its former master. Wakes up screaming (fire).' },
];

export function getRandomMount(): BeastMount {
  return MOUNTS[Math.floor(Math.random() * MOUNTS.length)];
}

export function getMountsByCategory(category: MountCategory): BeastMount[] {
  return MOUNTS.filter((m) => m.category === category);
}

export function getMountsByMaxPrice(maxPrice: number): BeastMount[] {
  return MOUNTS.filter((m) => m.price <= maxPrice);
}

export function getAllMountCategories(): MountCategory[] {
  return [...new Set(MOUNTS.map((m) => m.category))];
}

export function formatMount(mount: BeastMount): string {
  const icon = { land: '🐎', flying: '🦅', aquatic: '🐚', burrowing: '🪱', exotic: '✨' }[mount.category];
  const lines = [`${icon} **${mount.name}** *(${mount.species}, ${mount.temperament}, ${mount.price}gp)*`];
  lines.push(`  Speed: ${mount.speed} | HP: ${mount.hp} | AC: ${mount.ac} | Carry: ${mount.carryCapacity}`);
  lines.push(`  ⚙️ ${mount.specialAbility}`);
  lines.push(`  🍖 Feed: ${mount.feedingRequirements}`);
  lines.push(`  🎭 Quirk: ${mount.quirk}`);
  return lines.join('\n');
}

export { MOUNTS as BEAST_MOUNTS };
