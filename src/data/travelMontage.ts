// Travel montage generator — narrative vignettes for long journeys instead of "you travel for 3 days."
export type MontageType = 'bonding' | 'discovery' | 'hardship' | 'comedy' | 'foreshadowing' | 'beauty';
export interface TravelMontage { type: MontageType; title: string; narration: string; interactionPrompt: string; mechanicalEffect: string | null; }
const MONTAGES: TravelMontage[] = [
  { type: 'bonding', title: 'The Campfire Confession', narration: 'On the second night, during watch, someone opens up about something they\'ve never told anyone.', interactionPrompt: 'Ask each player: "What does your character share that they\'ve been carrying?" No pressure. Silence is also an answer.', mechanicalEffect: 'Any character who shares gains advantage on saves made to protect the party for 24 hours.' },
  { type: 'discovery', title: 'The Unmarked Shrine', narration: 'Half-hidden by vines: a tiny stone shrine to a god nobody recognizes. Fresh flowers sit before it. Someone still visits.', interactionPrompt: 'Investigate (DC 12) or Religion (DC 14) to learn more. Leave an offering?', mechanicalEffect: 'Offering accepted: +1 to next save. Offering rejected (wrong god): minor curse (hiccups for 1d4 hours).' },
  { type: 'hardship', title: 'The Broken Wheel', narration: 'The cart wheel snaps. Rain starts. The next town is 8 hours away. On foot. Carrying everything.', interactionPrompt: 'How does each character handle frustration? Who complains? Who leads? Who just starts walking?', mechanicalEffect: '1 level of exhaustion unless they find a creative solution (Athletics DC 13 to repair, Nature DC 12 to find shortcut).' },
  { type: 'comedy', title: 'The Wrong Mushroom', narration: 'Someone ate a forest mushroom for breakfast. It wasn\'t poisonous. It was... musical. Every step produces a different note.', interactionPrompt: 'The affected character leaves a musical trail. Stealth is impossible. But the bard is DELIGHTED.', mechanicalEffect: 'Stealth impossible for 4 hours. Performance checks have advantage (you ARE the instrument).' },
  { type: 'foreshadowing', title: 'The Dead Birds', narration: 'A line of dead birds along the road. All facing the same direction. Toward your destination.', interactionPrompt: 'Nature DC 13: they died of fright. Something ahead scared them to death mid-flight. From miles away.', mechanicalEffect: null },
  { type: 'beauty', title: 'The Golden Hour', narration: 'The sunset hits the valley and for 10 minutes, everything is gold. The river. The grass. The clouds. Even the dust.', interactionPrompt: 'Nobody needs to say anything. Just describe it. Let the table sit in it for a moment.', mechanicalEffect: 'All party members remove 1 level of exhaustion. Beauty heals.' },
  { type: 'discovery', title: 'The Traveler Going the Other Way', narration: 'A lone traveler heading AWAY from your destination. Fast. They don\'t want to talk. When pressed: "Turn around. While you can."', interactionPrompt: 'Persuasion DC 14 to get more. Insight DC 13: they\'re genuinely terrified, not lying.', mechanicalEffect: null },
];
export function getRandomMontage(): TravelMontage { return MONTAGES[Math.floor(Math.random() * MONTAGES.length)]; }
export function getMontagesByType(t: MontageType): TravelMontage[] { return MONTAGES.filter((m) => m.type === t); }
export function getAllMontageTypes(): MontageType[] { return [...new Set(MONTAGES.map((m) => m.type))]; }
export function formatMontage(m: TravelMontage): string {
  const icon = { bonding: '❤️', discovery: '🔍', hardship: '🌧️', comedy: '😂', foreshadowing: '🌑', beauty: '🌅' }[m.type];
  return `${icon} **${m.title}** *(${m.type})*\n  *${m.narration}*\n  🎭 ${m.interactionPrompt}${m.mechanicalEffect ? `\n  ⚙️ ${m.mechanicalEffect}` : ''}`;
}
export { MONTAGES as TRAVEL_MONTAGES };
