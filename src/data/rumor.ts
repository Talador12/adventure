// Overheard rumors — things NPCs whisper that may or may not be true.
export type RumorReliability = 'true' | 'half_true' | 'false' | 'dangerously_false';
export interface Rumor { text: string; reliability: RumorReliability; source: string; hook: string | null; }
const RUMORS: Rumor[] = [
  { text: '"The blacksmith\'s new apprentice? Used to be a noble. Ask about the scar."', reliability: 'true', source: 'Tavern gossip', hook: 'The apprentice is hiding from assassins sent by their own family.' },
  { text: '"There\'s gold in the old mine. The reason nobody goes there isn\'t the collapse — it\'s what lives in it now."', reliability: 'half_true', source: 'Drunk miner', hook: 'Gold is there. So is a nest of ankhegs.' },
  { text: '"The mayor is a vampire. I SAW him not eat garlic bread at the festival."', reliability: 'false', source: 'Paranoid farmer', hook: null },
  { text: '"The healing potions from that new shop? They work. But the headaches get worse each time."', reliability: 'true', source: 'A repeat customer', hook: 'The potions are cut with addictive fey substances. The shop is a front.' },
  { text: '"Don\'t go east of the river after dark. The trees MOVE."', reliability: 'dangerously_false', source: 'A child', hook: 'The trees don\'t move. The things hiding BEHIND the trees move. The trees are the only safe cover.' },
  { text: '"The king\'s advisor speaks to something in the basement every full moon. Something that answers."', reliability: 'half_true', source: 'Former palace servant', hook: 'The advisor consults a bound devil for political advice. The devil\'s advice is always technically correct.' },
];
export function getRandomRumor(): Rumor { return RUMORS[Math.floor(Math.random() * RUMORS.length)]; }
export function getRumorsByReliability(r: RumorReliability): Rumor[] { return RUMORS.filter((rum) => rum.reliability === r); }
export function getRumorsWithHooks(): Rumor[] { return RUMORS.filter((r) => r.hook !== null); }
export function formatRumor(r: Rumor, showTruth: boolean = false): string {
  const icon = { true: '✅', half_true: '🟡', false: '❌', dangerously_false: '💀' }[r.reliability];
  const lines = [`👂 *${r.text}*`, `  Source: ${r.source}`];
  if (showTruth) { lines.push(`  ${icon} Reliability: ${r.reliability.replace(/_/g, ' ')}`); if (r.hook) lines.push(`  📜 Hook: ${r.hook}`); }
  return lines.join('\n');
}
export { RUMORS };
