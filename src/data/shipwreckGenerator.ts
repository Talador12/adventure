// Random shipwreck generator — wrecked vessels with cargo manifests, survivors, and hazards.

export type WreckCondition = 'intact' | 'damaged' | 'half_submerged' | 'scattered_debris' | 'sunk';
export type WreckCause = 'storm' | 'sea_monster' | 'pirate_attack' | 'reef' | 'mutiny' | 'curse' | 'fire';

export interface ShipwreckCargo {
  item: string;
  quantity: string;
  value: number;
  salvageable: boolean;
  salvageDC: number;
}

export interface ShipwreckSurvivor {
  name: string;
  role: string;
  condition: string;
  secret: string;
}

export interface ShipwreckHazard {
  name: string;
  dc: number;
  damage: string;
  description: string;
}

export interface Shipwreck {
  shipName: string;
  shipType: string;
  cause: WreckCause;
  condition: WreckCondition;
  daysSinceWreck: number;
  cargo: ShipwreckCargo[];
  survivors: ShipwreckSurvivor[];
  hazards: ShipwreckHazard[];
  hook: string;
  description: string;
}

const WRECKS: Shipwreck[] = [
  {
    shipName: 'The Maiden\'s Promise',
    shipType: 'Merchant Galleon',
    cause: 'storm',
    condition: 'half_submerged',
    daysSinceWreck: 3,
    cargo: [
      { item: 'Bolts of silk', quantity: '20 crates', value: 500, salvageable: true, salvageDC: 10 },
      { item: 'Sealed wine barrels', quantity: '30', value: 150, salvageable: true, salvageDC: 8 },
      { item: 'Iron ingots', quantity: '50', value: 200, salvageable: false, salvageDC: 0 },
      { item: 'Captain\'s strongbox', quantity: '1', value: 300, salvageable: true, salvageDC: 14 },
    ],
    survivors: [
      { name: 'First Mate Corrin', role: 'Navigator', condition: 'Injured (broken arm)', secret: 'Deliberately steered into the storm to kill the captain.' },
      { name: 'Cook Hilda', role: 'Ship\'s cook', condition: 'Healthy but terrified', secret: 'Saw something in the water before the storm. Something big.' },
    ],
    hazards: [
      { name: 'Collapsing deck', dc: 13, damage: '2d6 bludgeoning', description: 'Waterlogged planks give way underfoot.' },
      { name: 'Trapped air pocket', dc: 11, damage: '0 (but trapped)', description: 'Sealed compartment. Opening floods it in 2 rounds.' },
    ],
    hook: 'The strongbox contains a map to a hidden island — but someone else wants it.',
    description: 'A merchant vessel lodged on coastal rocks, listing hard to port. Waves crash through the broken hull. Gulls circle overhead.',
  },
  {
    shipName: 'The Black Marlin',
    shipType: 'Pirate Sloop',
    cause: 'sea_monster',
    condition: 'scattered_debris',
    daysSinceWreck: 1,
    cargo: [
      { item: 'Stolen gold coins', quantity: '400gp in scattered bags', value: 400, salvageable: true, salvageDC: 12 },
      { item: 'Pirate captain\'s journal', quantity: '1', value: 50, salvageable: true, salvageDC: 10 },
      { item: 'Harpoons (magical)', quantity: '3', value: 200, salvageable: true, salvageDC: 11 },
    ],
    survivors: [
      { name: 'Barnacle Jim', role: 'Lookout', condition: 'Clinging to driftwood, delirious', secret: 'Knows the creature\'s lair location. Will trade info for rescue.' },
    ],
    hazards: [
      { name: 'Sea monster still nearby', dc: 16, damage: '4d8 bludgeoning', description: 'A tentacle surfaces periodically. It hasn\'t left.' },
      { name: 'Debris field', dc: 12, damage: '1d6 piercing', description: 'Sharp wooden splinters and nails in the water.' },
    ],
    hook: 'The journal reveals the pirate was hunting the sea monster for a bounty. The monster got them first.',
    description: 'Shattered wood and torn sailcloth spread across a half-mile of sea. Something very large broke this ship in half.',
  },
  {
    shipName: 'The Emperor\'s Whisper',
    shipType: 'Royal Warship',
    cause: 'mutiny',
    condition: 'intact',
    daysSinceWreck: 7,
    cargo: [
      { item: 'Military weapons cache', quantity: '200 swords, 50 crossbows', value: 2000, salvageable: true, salvageDC: 10 },
      { item: 'Sealed diplomatic pouch', quantity: '1', value: 0, salvageable: true, salvageDC: 8 },
      { item: 'Gold payroll', quantity: '1500gp in locked chest', value: 1500, salvageable: true, salvageDC: 16 },
    ],
    survivors: [
      { name: 'Captain Aldous Vex', role: 'Captain (in chains below)', condition: 'Alive, malnourished, furious', secret: 'The mutiny was justified. He was executing crew for minor offenses.' },
      { name: 'Bosun Krell', role: 'Mutiny leader', condition: 'Dead (killed in the mutiny)', secret: 'His body has a letter from the enemy nation. He was a spy.' },
    ],
    hazards: [
      { name: 'Remaining loyalists', dc: 14, damage: '1d8+3 slashing', description: '3 armed sailors hide in the hold. Paranoid and dangerous.' },
      { name: 'Booby-trapped captain\'s cabin', dc: 15, damage: '3d6 fire', description: 'The captain rigged his quarters to burn if breached.' },
    ],
    hook: 'The diplomatic pouch contains a peace treaty. Both nations need it delivered — or destroyed.',
    description: 'A warship at anchor in a hidden cove. Its flag is torn down. Silence. No crew visible on deck.',
  },
  {
    shipName: 'The Coral Dreamer',
    shipType: 'Elven Swan Ship',
    cause: 'curse',
    condition: 'sunk',
    daysSinceWreck: 100,
    cargo: [
      { item: 'Preserved elven artifacts', quantity: '6 cases', value: 3000, salvageable: true, salvageDC: 15 },
      { item: 'Star charts (ancient)', quantity: '1 tube', value: 500, salvageable: true, salvageDC: 13 },
      { item: 'Cursed figurehead', quantity: '1', value: 0, salvageable: true, salvageDC: 10 },
    ],
    survivors: [],
    hazards: [
      { name: 'Depth (80ft)', dc: 13, damage: 'Drowning rules', description: 'Water Breathing required for extended salvage.' },
      { name: 'Undead crew', dc: 14, damage: '2d6 necrotic', description: 'The drowned sailors still patrol the ship. They attack the living.' },
      { name: 'The curse', dc: 16, damage: 'WIS save or haunted', description: 'Taking the figurehead extends the curse to the salvager.' },
    ],
    hook: 'The star charts show a route to a lost elven city. The undead crew were trying to get there when the curse struck.',
    description: 'Visible through clear water — an elegant ship resting on the seabed, coral growing through its hull. Ghostly lights flicker in the portholes.',
  },
];

export function getRandomShipwreck(): Shipwreck {
  return WRECKS[Math.floor(Math.random() * WRECKS.length)];
}

export function getShipwrecksByCause(cause: WreckCause): Shipwreck[] {
  return WRECKS.filter((w) => w.cause === cause);
}

export function getShipwrecksByCondition(condition: WreckCondition): Shipwreck[] {
  return WRECKS.filter((w) => w.condition === condition);
}

export function getTotalCargoValue(wreck: Shipwreck): number {
  return wreck.cargo.filter((c) => c.salvageable).reduce((sum, c) => sum + c.value, 0);
}

export function getSalvageableCargo(wreck: Shipwreck): ShipwreckCargo[] {
  return wreck.cargo.filter((c) => c.salvageable);
}

export function formatShipwreck(wreck: Shipwreck): string {
  const icon = { intact: '⛵', damaged: '🔧', half_submerged: '🌊', scattered_debris: '💥', sunk: '🏊' }[wreck.condition];
  const lines = [`${icon} **${wreck.shipName}** *(${wreck.shipType})* — ${wreck.condition.replace(/_/g, ' ')}`];
  lines.push(`  *${wreck.description}*`);
  lines.push(`  Cause: ${wreck.cause.replace(/_/g, ' ')} | Days since wreck: ${wreck.daysSinceWreck}`);
  lines.push(`  💰 Salvageable cargo: ${getTotalCargoValue(wreck)}gp total`);
  if (wreck.survivors.length > 0) lines.push(`  👤 Survivors: ${wreck.survivors.map((s) => s.name).join(', ')}`);
  lines.push(`  🎯 Hook: ${wreck.hook}`);
  return lines.join('\n');
}

export { WRECKS as SHIPWRECKS };
