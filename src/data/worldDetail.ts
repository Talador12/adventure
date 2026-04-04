// World detail generator — small lived-in details that make a setting feel real.
export type DetailContext = 'tavern' | 'city_street' | 'forest' | 'dungeon' | 'market' | 'temple' | 'battlefield';
export interface WorldDetail { context: DetailContext; detail: string; sensory: string; implication: string; }
const DETAILS: WorldDetail[] = [
  { context: 'tavern', detail: 'A dog sleeps under the corner table. It has its own mug. The barkeep fills it without being asked.', sensory: 'The dog snores. The mug is dented but clean. The barkeep scratches its ears on the way past.', implication: 'This tavern is home. People stay because it feels like one.' },
  { context: 'city_street', detail: 'Children have drawn a hopscotch grid in chalk. One square says "DRAGON." They skip it every time.', sensory: 'Chalk dust on cobblestones. Children laughing. The sound stops when a shadow passes overhead.', implication: 'The dragon is real to them. The adults pretend it isn\'t. The children know better.' },
  { context: 'forest', detail: 'A tree has grown around a sword embedded in its trunk. The sword is rusty. The tree is healthy.', sensory: 'Bark grown smooth over steel. Moss on the hilt. A bird has nested in the crossguard.', implication: 'Someone drove this sword in decades ago. With force. With fury. The forest chose peace.' },
  { context: 'dungeon', detail: 'Scratched into the wall: a calendar. 847 marks. Someone counted every day they were trapped here.', sensory: 'Deep scratches. Some fresh, some worn smooth by desperate fingers. The last mark is unfinished.', implication: 'They were here for over 2 years. The unfinished mark means they stopped. Escaped? Or...' },
  { context: 'market', detail: 'A merchant sells "genuine hero teeth." They\'re just horse teeth. But tourists don\'t know that.', sensory: 'A velvet display case. Teeth of suspicious uniformity. A sales pitch delivered with unwavering confidence.', implication: 'This economy runs on adventurer tourism. The locals have adapted.' },
  { context: 'temple', detail: 'The prayer candles are arranged by color. Except one. Someone lit a black candle in the white section.', sensory: 'Wax drippings in wrong colors. The black candle burns faster than the others. The flame is steady.', implication: 'Someone prayed for something the temple wouldn\'t approve of. The god answered anyway.' },
  { context: 'battlefield', detail: 'A single boot. Left foot. Good quality. Still laced. No body nearby. Just the boot.', sensory: 'Leather, well-oiled. The laces are tied neatly. It faces east. Toward home.', implication: 'Someone didn\'t make it. But someone else took the body. They left the boot because it didn\'t fit.' },
  { context: 'tavern', detail: 'A chair at the bar has a small plaque: "Reserved for Aldric." Aldric died 5 years ago. Nobody sits there.', sensory: 'The plaque is brass, polished daily. The chair is pushed in. A ghost of routine.', implication: 'Aldric mattered. To this place and these people. Memory is its own kind of magic.' },
];
export function getRandomDetail(): WorldDetail { return DETAILS[Math.floor(Math.random() * DETAILS.length)]; }
export function getDetailsByContext(c: DetailContext): WorldDetail[] { return DETAILS.filter((d) => d.context === c); }
export function getAllDetailContexts(): DetailContext[] { return [...new Set(DETAILS.map((d) => d.context))]; }
export function formatDetail(d: WorldDetail): string {
  return `🌍 *(${d.context.replace(/_/g, ' ')})*\n  ${d.detail}\n  👁️ ${d.sensory}\n  💭 ${d.implication}`;
}
export { DETAILS as WORLD_DETAILS };
