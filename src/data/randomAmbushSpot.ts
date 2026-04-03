// Random ambush location — where enemies set up their attack.
export interface AmbushSpot { location: string; advantage: string; counterplay: string; terrain: string; }
const SPOTS: AmbushSpot[] = [
  { location: 'Behind boulders along a narrow mountain pass.', advantage: 'Three-quarters cover. High ground.', counterplay: 'Athletics DC 14 to climb up and flank.', terrain: 'Mountain' },
  { location: 'Inside a covered wagon on the road — disguised as merchants.', advantage: 'Surprise round. Party doesn\'t suspect.', counterplay: 'Insight DC 15 to notice something\'s off before the attack.', terrain: 'Road' },
  { location: 'In the trees above, using vines and branches.', advantage: 'Ranged attacks from above. Hard to reach in melee.', counterplay: 'Perception DC 14 to spot them. Nature DC 12 to predict likely spots.', terrain: 'Forest' },
  { location: 'Underwater in a ford the party must cross.', advantage: 'Grapple attacks while party is in waist-deep water.', counterplay: 'Perception DC 13 notices ripples. Half speed in the water.', terrain: 'River' },
  { location: 'Behind the door of a room the party just entered. Door swings shut.', advantage: 'Surprised from behind. Exit blocked.', counterplay: 'Passive Perception 14+ notices the door mechanism.', terrain: 'Dungeon' },
  { location: 'Buried in sand/snow. They erupt from the ground.', advantage: 'Surprise. Difficult terrain (loose sand/snow) for the party.', counterplay: 'Survival DC 13 notices disturbed ground.', terrain: 'Desert/Arctic' },
];
export function getRandomAmbushSpot(): AmbushSpot { return SPOTS[Math.floor(Math.random() * SPOTS.length)]; }
export function formatAmbushSpot(a: AmbushSpot): string { return `🎯 **Ambush Setup** (${a.terrain}):\n📍 ${a.location}\n🛡️ Enemy advantage: ${a.advantage}\n🎲 Counterplay: ${a.counterplay}`; }
