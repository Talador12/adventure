// Random encounter setup — pre-combat positioning and conditions.
export interface EncounterSetup { enemyPosition: string; advantage: string; environment: string; specialCondition: string | null; }
const SETUPS: EncounterSetup[] = [
  { enemyPosition: 'Enemies are fortified behind overturned tables and barricades.', advantage: 'Enemies have half cover (+2 AC).', environment: 'Indoor — confined space.', specialCondition: null },
  { enemyPosition: 'Enemies surround the party from three directions.', advantage: 'No one can be flanked by the party on Round 1.', environment: 'Open area — crossroads.', specialCondition: 'Surprise round if the party failed Perception.' },
  { enemyPosition: 'A sniper on a rooftop, melee enemies on the ground.', advantage: 'Ranged enemy has high ground (+1 to hit, three-quarters cover).', environment: 'Urban street.', specialCondition: null },
  { enemyPosition: 'Enemies emerge from the water/ground/shadows.', advantage: 'Surprise round for enemies if party failed passive Perception.', environment: 'Varies.', specialCondition: 'Enemies have surprise.' },
  { enemyPosition: 'Single powerful enemy in the center of a ritual circle.', advantage: 'The circle provides +2 to saves while standing in it.', environment: 'Ritual chamber.', specialCondition: 'Breaking the circle (3 rounds of attacks, AC 15) removes the bonus.' },
  { enemyPosition: 'Enemies are retreating through a narrow corridor.', advantage: 'Only 2 party members can engage at once. Ranged has clear line.', environment: 'Dungeon hallway.', specialCondition: 'Chase rules may apply.' },
];
export function getRandomSetup(): EncounterSetup { return SETUPS[Math.floor(Math.random() * SETUPS.length)]; }
export function formatEncounterSetup(s: EncounterSetup): string { return `⚔️ **Encounter Setup:**\n📍 Position: ${s.enemyPosition}\n🛡️ Advantage: ${s.advantage}\n🏔️ Environment: ${s.environment}${s.specialCondition ? `\n⚡ Special: ${s.specialCondition}` : ''}`; }
