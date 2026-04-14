// Ghost ship — haunted vessels with crews, cargo, and unfinished business.

export type ShipFate = 'storm' | 'mutiny' | 'curse' | 'monster' | 'plague' | 'war';

export interface GhostCrewMember {
  name: string;
  role: string;
  unfinishedBusiness: string;
  canBeFreed: string;
}

export interface GhostShip {
  name: string;
  fate: ShipFate;
  description: string;
  discoveryHook: string;
  crew: GhostCrewMember[];
  hauntedCargo: string;
  shipAbility: string;
  resolutionMethod: string;
  rewardIfResolved: string;
}

const SHIPS: GhostShip[] = [
  {
    name: 'The Weeping Mast',
    fate: 'mutiny',
    description: 'A three-masted galleon that appears on foggy nights. Its sails are tattered but it moves against the wind. Water streams from every porthole like tears. The figurehead\'s face changes to match whoever is looking at it.',
    discoveryHook: 'Fishermen report their nets catching rotted cargo with the ship\'s name branded on the crates. The cargo is 200 years old but the brand is fresh.',
    crew: [
      { name: 'Captain Elspeth Moray', role: 'Captain (ghost)', unfinishedBusiness: 'Her crew mutinied and locked her in the brig before the storm. She died believing they betrayed her. She needs to know the truth: the first mate was charmed by a sea hag.', canBeFreed: 'Tell her about the charm. Show proof (the hag\'s totem is in the first mate\'s quarters). She forgives and fades.' },
      { name: 'First Mate Corvin', role: 'First Mate (ghost)', unfinishedBusiness: 'He led the mutiny under magical compulsion and does not remember why. He carries overwhelming guilt. The charm broke when he died but the guilt stayed.', canBeFreed: 'Remove the sea hag\'s totem from his cabin. His memory clears. He apologizes to the captain and fades.' },
      { name: 'Cook Agnes', role: 'Ship\'s Cook (ghost)', unfinishedBusiness: 'She hid in the galley during the mutiny and died when the ship sank. She does not care about the mutiny. She is angry because her best recipe went down with the ship.', canBeFreed: 'Find her recipe book in the galley (waterlogged but readable). Copy it. She dictates corrections and fades, satisfied.' },
    ],
    hauntedCargo: 'The hold contains 200-year-old spices that are still potent (worth 2,000gp), a sealed chest that screams when opened (contains the sea hag\'s payment for the mutiny), and a barrel of rum that never empties (cursed: drinker cannot stop until DC 15 Con save).',
    shipAbility: 'The Weeping Mast can sail without wind and phase through icebergs. If the party resolves the crew\'s business, the ship becomes a functional ghost vessel they can summon once per month.',
    resolutionMethod: 'Free all three crew members by resolving their unfinished business. The sea hag\'s totem must be destroyed (it is in the first mate\'s quarters, behind a warded chest).',
    rewardIfResolved: 'The ship becomes summonable once per month for 24 hours. It can carry the party across any body of water instantly. Also: Agnes\'s recipe is genuinely excellent and grants +2 to cooking checks.',
  },
  {
    name: 'The Iron Covenant',
    fate: 'war',
    description: 'A warship made entirely of rusted iron that surfaces during naval battles. It does not take sides. It attacks everything. Its cannons fire spectral rounds that pass through hulls and hit crew directly.',
    discoveryHook: 'A naval commander hires the party to investigate why three warships from different nations vanished in the same stretch of sea. Survivors describe "a ship that was already dead."',
    crew: [
      { name: 'Admiral Drust Ironblood', role: 'Admiral (revenant)', unfinishedBusiness: 'He was betrayed by every nation he served. His fleet was sunk by allies during a false flag operation. He will not stop fighting until someone admits the truth publicly.', canBeFreed: 'Bring proof of the false flag operation to a public court. Any nation will do. He wants acknowledgment, not revenge.' },
      { name: 'Helmsman Rath', role: 'Helmsman (ghost)', unfinishedBusiness: 'He steered the ship into the ambush because the navigation charts were forged. He blames himself. He needs to know the charts were fakes.', canBeFreed: 'Show him the original (un-forged) charts. Compare them to his. He sees the discrepancy and accepts he was deceived.' },
      { name: 'Powder Monkey Sim', role: 'Child Sailor (ghost)', unfinishedBusiness: 'He was 12. He should not have been on a warship. He wants to go home.', canBeFreed: 'Take his ghost to the village where he was born. His mother\'s grave is there. He sits beside it and fades.' },
    ],
    hauntedCargo: 'The armory contains spectral weapons that deal force damage instead of physical (+1 longsword, +1 crossbow). The war chest holds military intelligence from 300 years ago that is still politically explosive.',
    shipAbility: 'The Iron Covenant is nearly indestructible. It regenerates damage. Its spectral cannons ignore cover and armor. Fighting it conventionally is suicide.',
    resolutionMethod: 'Resolve all three crew members\' unfinished business. The Admiral is the hardest - political proof is required. The child is the most emotionally devastating.',
    rewardIfResolved: 'The spectral weapons solidify and become permanent. The military intelligence is worth 5,000gp to the right buyer. The Iron Covenant sinks peacefully and does not return.',
  },
];

export function getRandomShip(): GhostShip {
  return SHIPS[Math.floor(Math.random() * SHIPS.length)];
}

export function getShipByFate(fate: ShipFate): GhostShip | undefined {
  return SHIPS.find((s) => s.fate === fate);
}

export function getAllFates(): ShipFate[] {
  return [...new Set(SHIPS.map((s) => s.fate))];
}

export function getCrewCount(ship: GhostShip): number {
  return ship.crew.length;
}

export function formatShip(ship: GhostShip): string {
  const lines = [`⚓ **${ship.name}** *(${ship.fate})*`];
  lines.push(`  ${ship.description}`);
  lines.push(`  Hook: ${ship.discoveryHook}`);
  lines.push('  **Crew:**');
  for (const c of ship.crew) {
    lines.push(`    - **${c.name}** (${c.role}): ${c.unfinishedBusiness}`);
    lines.push(`      Free: ${c.canBeFreed}`);
  }
  lines.push(`  Cargo: ${ship.hauntedCargo}`);
  lines.push(`  Ship ability: ${ship.shipAbility}`);
  lines.push(`  Resolution: ${ship.resolutionMethod}`);
  lines.push(`  Reward: ${ship.rewardIfResolved}`);
  return lines.join('\n');
}

export { SHIPS as GHOST_SHIPS };
