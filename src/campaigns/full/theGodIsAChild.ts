import type { FullCampaign } from '../types';

export const theGodIsAChild: FullCampaign = {
  id: 'full-god-is-child',
  type: 'full',
  title: 'The God Is a Child',
  tagline: 'A new god was just born. It has the power of creation. It has the mind of a toddler.',
  tone: 'epic',
  themes: ['epic', 'classic_fantasy', 'exploration'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 15 },
  estimatedSessions: 18,
  settingSummary:
    'A new god spontaneously manifests — the first divine birth in ten thousand years. It appears as a child, confused, frightened, and enormously powerful. Its tantrums reshape geography. Its laughter creates life. Its nightmares birth monsters. Every existing religion, every pantheon, and every power on the continent wants to claim, control, or destroy it. The party is tasked with protecting a child that could accidentally unmake a city by crying.',
  hook: 'A pillar of light strikes a field. When it fades, a child sits in a crater — glowing, humming with power, crying. The crying causes a minor earthquake. The nearest village starts praying. Within hours, three armies are marching toward the field.',
  twist:
    'The child-god didn\'t appear spontaneously — it was created by the existing gods as their replacement. The old pantheon is dying (divine entropy — gods weaken over eons) and they pooled their remaining power to create a successor. But they put all their power into creation and none into guidance. The child has the combined might of an entire pantheon and zero understanding of it. The old gods are now powerless and can only watch.',
  climax:
    'Three factions converge on the child: an army that wants to worship it, a cult that wants to bind it, and a coalition that wants to kill it before it destroys the world by accident. The party must protect the child through a three-way battle, help it understand its power, and guide it through its "first decision" — a conscious divine act that will define what kind of god it becomes.',
  acts: [
    {
      title: 'Act 1: The Birth',
      summary:
        'The child appears. Chaos erupts. The party is among the first on scene and must protect the child from the immediate surge of interest — pilgrims, armies, assassins.',
      keyEvents: [
        'The pillar of light and the crying child-god',
        'First divine tantrum: the child is scared, an earthquake cracks the road',
        'Three factions identified: the Church of the Dawn (worship), the Chain of Binding (control), the Silver Compact (destroy)',
        'The party earns the child\'s trust by being the first people who are kind to it',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Education',
      summary:
        'The party must teach a god how to be a god — while on the run. Every emotion the child feels has catastrophic physical consequences. Happy = flowers everywhere. Sad = rain for miles. Angry = volcanos.',
      keyEvents: [
        'Teaching control: the child learns that feelings have consequences',
        'The old gods make contact (through dreams) — they explain what the child is',
        'The child accidentally creates a species (oops) — now what?',
        'The binding cult gets close — they have chains forged from dead god-metal',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The First Decision',
      summary:
        'All three factions converge. The party must protect the child through a battle and guide it to its first conscious divine act. What the child chooses defines the new age.',
      keyEvents: [
        'Three-way battle: worshippers vs. binders vs. destroyers vs. the party',
        'The child is overwhelmed — its power flares uncontrollably',
        'The party must calm a panicking god (the most important Persuasion check ever)',
        'The First Decision: the child chooses what kind of god to be, guided by the party\'s example',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'The Child (Lumen)',
      role: 'the god / protected figure',
      personality:
        'A divine being with the mind of a 5-year-old. Curious, affectionate, easily frightened. Doesn\'t understand why everyone is scared of it. "I just want to play. Why is everyone running?"',
    },
    {
      name: 'High Priestess Vara',
      role: 'faction leader (worship)',
      personality:
        'An archfey who embodies summer — warm, generous, powerful, and currently being consumed by her own season. She radiates heat involuntarily. Her touch burns. She misses being able to hold flowers without igniting them.',
      secret: 'She was the first to suggest creating the child-god. The other gods followed her lead. She feels personally responsible for the chaos.',
    },
    {
      name: 'Chainmaster Kolvir',
      role: 'faction leader (control)',
      personality:
        'Head of the Chain of Binding. Believes uncontrolled divine power will destroy the world. Not evil — pragmatic to the point of cruelty. "A leashed god is a safe god."',
    },
    {
      name: 'The Echo of Solara (old god)',
      role: 'spectral mentor',
      personality:
        'The last whisper of the old sun goddess. Speaks through sunlight. Can offer advice but has no power left. "We gave everything to create it. Please... raise it well."',
    },
  ],
  keyLocations: [
    {
      name: 'The Birthfield',
      description: 'A crater in a farmer\'s field, now a holy site, warzone, and pilgrimage destination simultaneously.',
      significance: 'Where the story begins.',
    },
    {
      name: 'The Wandering Path',
      description: 'The party travels with the child across the continent, each region affected by the child\'s emotions.',
      significance: 'The primary adventure environment.',
    },
    {
      name: 'The Convergence',
      description: 'A mountaintop where ley lines meet — the place where the child\'s First Decision will reshape the world.',
      significance: 'The final confrontation and the child\'s defining moment.',
    },
  ],
  dataSystems: [
    'deityPantheon',
    'cataclysmCountdown',
    'massCombat',
    'diplomaticNegotiation',
    'factionWar',
    'naturalDisaster',
    'ancientProphecy',
    'partyMoraleTracker',
    'divineIntervention',
  ],
};
