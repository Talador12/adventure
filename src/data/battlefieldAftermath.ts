// Random battlefield aftermath — post-combat environment storytelling and scavenging.

export type BattleScale = 'skirmish' | 'battle' | 'siege' | 'war';

export interface AftermathDetail { category: string; description: string; }
export interface ScavengeOpportunity { item: string; findDC: number; value: number; condition: string; }

export interface BattlefieldAftermath {
  scale: BattleScale;
  name: string;
  timeSinceBattle: string;
  atmosphere: string;
  details: AftermathDetail[];
  scavengeOpportunities: ScavengeOpportunity[];
  survivors: string | null;
  environmentalHazard: string;
  narrativeMoment: string;
}

const AFTERMATHS: BattlefieldAftermath[] = [
  { scale: 'skirmish', name: 'The Roadside Ambush', timeSinceBattle: '2 hours ago', atmosphere: 'Fresh blood. Broken arrows. A horse standing alone, confused. Flies haven\'t found the bodies yet.', details: [
    { category: 'Visual', description: 'Six bodies — four bandits, two merchants. The merchants died holding hands.' },
    { category: 'Auditory', description: 'A faint groan from behind the overturned cart. Someone is alive.' },
    { category: 'Olfactory', description: 'Iron. Pine sap from broken branches. Spilled wine from a shattered barrel.' },
  ], scavengeOpportunities: [
    { item: 'Merchant\'s lockbox (under the cart)', findDC: 12, value: 75, condition: 'Intact but locked (DC 13).' },
    { item: 'Bandit leader\'s coded message', findDC: 14, value: 0, condition: 'In a boot. Reveals the bandit camp location.' },
    { item: 'Serviceable shortbow + 12 arrows', findDC: 8, value: 15, condition: 'Blood-spattered but functional.' },
  ], survivors: 'One merchant guard, bleeding from the gut. Will die in 1 hour without healing. Knows who ordered the ambush.', environmentalHazard: 'Wolves will arrive in 2 hours, drawn by the blood. The horse bolts if approached carelessly.', narrativeMoment: 'The two merchants are still holding hands. Their wedding rings match. One is warm. One is cold.' },
  { scale: 'battle', name: 'The Fallen Standard', timeSinceBattle: '1 day ago', atmosphere: 'Crows. Everywhere. The field is black with them. They scatter when you approach but don\'t go far.', details: [
    { category: 'Visual', description: 'Hundreds of bodies. Two army banners — one torn down, one still standing. The ground is churned to mud.' },
    { category: 'Auditory', description: 'Wind through broken weapons. Crows arguing over territory. A flag snapping in the breeze.' },
    { category: 'Olfactory', description: 'Death. The sweet, awful smell that doesn\'t leave your clothes for days.' },
  ], scavengeOpportunities: [
    { item: 'Officer\'s sword (+1, battered)', findDC: 14, value: 200, condition: 'Nicked and bloody but magical.' },
    { item: 'Gold coins scattered across the field', findDC: 10, value: 50, condition: 'From split purses and pay chests.' },
    { item: 'Battle maps from the command tent', findDC: 16, value: 100, condition: 'Reveals troop movements and a planned second attack.' },
    { item: 'A locket with a portrait and a lock of hair', findDC: 12, value: 5, condition: 'Worth nothing in gold. Worth everything to someone.' },
  ], survivors: 'A soldier playing dead among the corpses. They\'re from the losing side. Terrified. Has critical intel.', environmentalHazard: 'Looting parties from the winning army return at nightfall. If caught, the party is assumed to be enemy scavengers.', narrativeMoment: 'The standing banner belongs to the losing side. Someone drove it into the ground with their dying strength. It hasn\'t fallen.' },
  { scale: 'siege', name: 'The Broken Gate', timeSinceBattle: '3 days ago', atmosphere: 'Smoke. The walls are blackened. The gate is splinters. Inside: silence where there should be a city.', details: [
    { category: 'Visual', description: 'The gate is gone. Catapult stones embedded in buildings. Scorch marks from magical fire. A child\'s toy on the cobblestones.' },
    { category: 'Auditory', description: 'Dripping water from burst pipes. A dog barking, alone. Wind through empty windows.' },
    { category: 'Olfactory', description: 'Ash. Copper. Something sweet and terrible from the collapsed granary.' },
  ], scavengeOpportunities: [
    { item: 'Intact potion shop inventory (partially)', findDC: 14, value: 200, condition: '3 potions survived. Labels burned off. Effects unknown.' },
    { item: 'Noble\'s hidden safe (in the rubble of the manor)', findDC: 18, value: 500, condition: 'Still locked. Still trapped (DC 15 poison needle).' },
    { item: 'Siege engine bolt (magical)', findDC: 12, value: 50, condition: 'Lodged in a wall. Radiates evocation magic. Can be repurposed.' },
  ], survivors: 'A group of civilians hiding in the sewers. 20 people, including children. No food. 2 days of water left.', environmentalHazard: 'Fires still smolder. Structures collapse without warning (DEX DC 13, 3d6 bludgeoning). Disease risk in 1 week.', narrativeMoment: 'A message was carved into the wall near the gate, in the defenders\' last hours: "We held for 17 days. Remember us."' },
];

export function getRandomAftermath(): BattlefieldAftermath {
  return AFTERMATHS[Math.floor(Math.random() * AFTERMATHS.length)];
}

export function getAftermathByScale(scale: BattleScale): BattlefieldAftermath[] {
  return AFTERMATHS.filter((a) => a.scale === scale);
}

export function getAftermathsWithSurvivors(): BattlefieldAftermath[] {
  return AFTERMATHS.filter((a) => a.survivors !== null);
}

export function getAllBattleScales(): BattleScale[] {
  return ['skirmish', 'battle', 'siege', 'war'];
}

export function formatAftermath(aftermath: BattlefieldAftermath): string {
  const icon = { skirmish: '⚔️', battle: '🏴', siege: '🏰', war: '💀' }[aftermath.scale];
  const lines = [`${icon} **${aftermath.name}** *(${aftermath.scale}, ${aftermath.timeSinceBattle})*`];
  lines.push(`  *${aftermath.atmosphere}*`);
  aftermath.details.forEach((d) => lines.push(`  ${d.category}: ${d.description}`));
  lines.push(`  ⚠️ Hazard: ${aftermath.environmentalHazard}`);
  lines.push(`  💔 ${aftermath.narrativeMoment}`);
  return lines.join('\n');
}

export { AFTERMATHS as BATTLEFIELD_AFTERMATHS };
