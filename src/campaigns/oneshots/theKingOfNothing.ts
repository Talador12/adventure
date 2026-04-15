import type { OneShotCampaign } from '../types';

export const theKingOfNothing: OneShotCampaign = {
  id: 'oneshot-king-of-nothing',
  type: 'oneshot',
  title: 'The King of Nothing',
  tagline: 'An empty throne at the center of the multiverse. Anyone who sits rules everything. Nobody has survived sitting down.',
  tone: 'epic',
  themes: ['epic', 'planar', 'dark_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 10,
  estimatedHours: 3,
  settingSummary:
    'The Throne of All Things sits at the convergence of every plane of existence. Legend says whoever sits upon it gains absolute power over reality. The catch: the throne tests the sitter\'s soul. Everyone who has ever sat on it - gods, primordials, archdevils - was found wanting and destroyed. The multiverse is in crisis. Someone must sit. The party must decide who.',
  hook: 'The planes are drifting apart. Without a ruler, the multiverse decays. The Throne of All Things has been empty for a millennium and reality is showing the strain. A council of planar beings has summoned the party: "Someone must sit. The throne will test them. Everyone who has tried has died. We need mortals because gods are too proud and fiends are too corrupt. One of you must sit."',
  twist: 'The throne does not test for worthiness. It tests for willingness to let go of power. Every previous sitter grabbed the power and the throne destroyed them for it. The test is: sit on the throne, feel absolute power, and then voluntarily stand up. The throne does not want a ruler. It wants proof that someone can be trusted with power by watching them give it back.',
  climax: 'The throne room. The party member sits. Absolute power floods through them - every wish, every dream, every desire is within reach. The throne waits. The multiverse holds its breath. The sitter must stand up. But the power is intoxicating, the temptation is real, and every second they sit, letting go becomes harder.',
  scenes: [
    {
      title: 'Scene 1: The Convergence',
      summary: 'Traveling to the center of the multiverse. Each plane they pass through is deteriorating.',
      challenge: 'exploration',
      keyEvents: [
        'The journey: through failing planar boundaries, each world showing cracks and decay',
        'The candidates: the party discusses who should sit - each member has strengths and vulnerabilities',
        'Previous failures: the ghosts of former sitters haunt the approach, warning and tempting',
        'The throne room: a vast empty space with a single chair and the weight of everything',
      ],
    },
    {
      title: 'Scene 2: The Decision',
      summary: 'Choosing who sits. The hardest conversation the party has ever had.',
      challenge: 'social',
      keyEvents: [
        'The debate: who among them is most worthy? Most selfless? Most resistant to temptation?',
        'Self-knowledge: each party member must honestly assess their own capacity for power',
        'The ghosts\' testimony: a god who sat for glory, a saint who sat for justice, a nobody who sat for love - all dead',
        'The choice: one party member steps forward (or is pushed, or volunteers reluctantly)',
      ],
    },
    {
      title: 'Scene 3: The Throne',
      summary: 'Someone sits. The power comes. The test begins.',
      challenge: 'social',
      keyEvents: [
        'The power: the sitter sees everything. Every prayer. Every death. Every preventable tragedy. They can fix ALL of it with a thought.',
        'The temptation: a dead parent is alive again. A ruined city is whole. A childhood wound heals. All the sitter has to do is stay seated.',
        'The party\'s role: they see their friend\'s face change. The eyes go distant. The hands grip the armrests. They are losing them. Words are all they have.',
        'The standing: the sitter\'s legs do not want to work. Not physical weakness - the throne makes leaving feel like dying. Every inch upward costs everything.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Arbiter', role: 'planar council representative', personality: 'A being from outside the planes who has watched every previous attempt. Provides information without guidance. "I cannot tell you how to pass the test. I can tell you how everyone else failed."' },
    { name: 'Ghost of Emperor Valkyr', role: 'warning', personality: 'A translucent figure with a crown fused to a cracked skull. Paces the corridor endlessly. Grabs the party by the shoulders with hands they can feel but not see. "I sat for thirty seconds. I remade a continent. I cured a plague. I was reaching for the stars when it burned me from the inside. Thirty seconds. It felt like enough. It was not."' },
    { name: 'The Throne', role: 'the test', personality: 'Not sentient in the way mortals understand. It amplifies desire and rewards surrender. It does not want a king. It wants proof that power can be trusted to the selfless.' },
  ],
  keyLocations: [
    { name: 'The Planar Convergence', description: 'The center of the multiverse where all planes meet. Reality is thin here. Every direction leads to a different world.', significance: 'The approach to the throne.' },
    { name: 'The Throne Room', description: 'A vast empty chamber with a single chair. No decoration. No guards. Just the most powerful object in existence and infinite space.', significance: 'Where the test happens.' },
    { name: 'The Ghost Gallery', description: 'The approach corridor lined with the spirits of every being who sat on the throne and failed. Gods, primordials, mortals - all reduced to warnings.', significance: 'Where the party learns from failure.' },
  ],
  dataSystems: ['socialEncounter', 'npcBackstoryGen'],
};
