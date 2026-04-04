// Enchanted map that lies — a sentient map with its own agenda and unreliable directions.

export type MapLieType = 'omission' | 'exaggeration' | 'misdirection' | 'invention' | 'truth_disguised';

export interface MapLie { type: MapLieType; whatItShows: string; whatIsActuallyThere: string; whyItLies: string; detectionDC: number; }

export interface LyingMap {
  name: string;
  appearance: string;
  personality: string;
  agenda: string;
  lies: MapLie[];
  truthCondition: string;
  trustScore: number; // how often it tells the truth (0-10)
  ifConfronted: string;
}

const MAPS: LyingMap[] = [
  { name: 'Bartholomew (Bart)', appearance: 'A leather scroll that unfurls reluctantly. The ink moves. Landmarks have tiny faces.', personality: 'Sarcastic, lazy, hates being folded. Complains about everything.', agenda: 'Wants to be brought to a specific location — the resting place of its creator. Will subtly steer all routes there.', lies: [
    { type: 'misdirection', whatItShows: '"Shortcut through the meadow — saves 2 hours!"', whatIsActuallyThere: 'A troll bridge. Bart thinks this is hilarious.', whyItLies: 'Boredom. Watching adventurers fight trolls is the most entertainment Bart gets.', detectionDC: 13 },
    { type: 'omission', whatItShows: 'A clear path through the forest.', whatIsActuallyThere: 'The path is clear — but the forest is an enchanted one (see enchanted forests). Bart "forgot" to mention this.', whyItLies: 'The enchanted forest is near the creator\'s tomb. Bart is steering you.', detectionDC: 15 },
    { type: 'truth_disguised', whatItShows: '"Extremely dangerous. Do not enter. Certain death."', whatIsActuallyThere: 'A perfectly safe village with excellent pie.', whyItLies: 'Bart doesn\'t want you to stop there. It would add 3 days to reaching the tomb.', detectionDC: 12 },
  ], truthCondition: 'Bart is honest when genuinely frightened. Show it a fire (it\'s flammable) and it cooperates for 24 hours.', trustScore: 4, ifConfronted: '"Me? LIE? I\'m a MAP. Maps don\'t lie." (It is currently lying about maps not lying.)' },
  { name: 'The Oracle Chart', appearance: 'A star chart on vellum that updates in real-time. Stars shift when you\'re not looking.', personality: 'Cryptic, ancient, speaks only in riddles. Thinks clarity is beneath it.', agenda: 'Trying to prevent a prophecy from being fulfilled. Every route it shows avoids prophecy-related locations.', lies: [
    { type: 'invention', whatItShows: 'A mountain range where none exists.', whatIsActuallyThere: 'Flat plains. The "mountain" is blocking the route to a prophesied meeting point.', whyItLies: 'If the party reaches the meeting point, the prophecy begins. The map fears this.', detectionDC: 16 },
    { type: 'exaggeration', whatItShows: '"The Canyon of Eternal Doom — impassable."', whatIsActuallyThere: 'A slightly inconvenient ravine with a rope bridge. Bart-level drama.', whyItLies: 'Beyond the canyon is a temple central to the prophecy.', detectionDC: 13 },
  ], truthCondition: 'Speak a verse of the prophecy it\'s trying to prevent. It panics and shows the truth to "warn you away from it."', trustScore: 3, ifConfronted: 'The stars rearrange into the word "PERHAPS" and then go dark for 1 hour.' },
];

export function getRandomLyingMap(): LyingMap {
  return MAPS[Math.floor(Math.random() * MAPS.length)];
}

export function getLieCount(map: LyingMap): number {
  return map.lies.length;
}

export function getDetectableLies(map: LyingMap, insightMod: number): MapLie[] {
  return map.lies.filter((l) => (10 + insightMod) >= l.detectionDC);
}

export function formatLyingMap(map: LyingMap): string {
  const lines = [`🗺️ **${map.name}** *(Trust: ${map.trustScore}/10)*`];
  lines.push(`  *${map.appearance}*`);
  lines.push(`  Personality: ${map.personality}`);
  lines.push(`  🎯 Agenda: ${map.agenda}`);
  lines.push(`  Truth condition: ${map.truthCondition}`);
  lines.push(`  If confronted: *${map.ifConfronted}*`);
  return lines.join('\n');
}

export { MAPS as LYING_MAPS };
