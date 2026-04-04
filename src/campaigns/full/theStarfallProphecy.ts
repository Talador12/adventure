import type { FullCampaign } from '../types';

export const theStarfallProphecy: FullCampaign = {
  id: 'full-starfall-prophecy',
  type: 'full',
  title: 'The Starfall Prophecy',
  tagline: 'The stars are going out. Someone is collecting them.',
  tone: 'epic',
  themes: ['planar', 'exploration', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 18 },
  estimatedSessions: 22,
  settingSummary:
    'Stars have been disappearing from the night sky — one per week, always in the same constellation pattern. Astronomers are panicked. Diviners can\'t see the future anymore. An ancient prophecy says when the last star falls, the boundary between planes shatters. The party must find out who is stealing stars and why before the sky goes dark.',
  hook: 'A star falls from the sky and lands near the party — not a meteor, but a crystallized drop of divine light the size of a fist. It whispers a name: theirs. An astral entity arrives minutes later, desperate to retrieve it, and the party is pulled into a planar chase.',
  twist:
    'The stars aren\'t being stolen — they\'re leaving. Each star is a sleeping god from a previous age, and something is waking them up. The "thief" is actually a celestial trying to prevent the gods from returning, because the last time the old gods were awake, they destroyed the world and rebuilt it. The prophecy isn\'t about the world ending — it\'s about the world being overwritten.',
  climax:
    'The party reaches the edge of the Astral Sea where the old gods are gathering. They can join the celestial\'s desperate fight to keep the gods asleep, negotiate with the waking gods (who aren\'t evil — just incomprehensibly vast), or use the fallen star they found in session 1 to bridge the gap between ages and create a new covenant.',
  acts: [
    {
      title: 'Act 1: The Falling Star',
      summary:
        'The party obtains a fallen star, is pursued by astral entities, and begins to understand that the night sky is changing. Divination magic is failing across the world.',
      keyEvents: [
        'A star falls — crystallized divine light, it speaks the party\'s names',
        'An astral deva arrives, demands the star back, is ambushed by shadow agents',
        'Astronomers confirm: 12 stars gone in 12 weeks, always the same constellation',
        'The party must travel to the Astral Sea to understand what\'s happening',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Astral Sea',
      summary:
        'Planar travel through the Astral Sea, visiting star-shrines and consulting ancient entities. The party discovers the truth about stars being sleeping gods. The celestial guardian explains the stakes.',
      keyEvents: [
        'First astral voyage — the party acquires a spelljammer helm or astral skiff',
        'Star-shrine visitation — each empty shrine tells the story of the god that left',
        'The Celestial Warden explains: the old gods are waking, the world is in danger',
        'A waking god speaks to the party — it\'s curious, not hostile, but overwhelming',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: The Edge of Everything',
      summary:
        'The old gods gather at the boundary between ages. Reality frays. The party makes the most consequential choice in the campaign — and possibly in the history of their world.',
      keyEvents: [
        'Reality begins to glitch — old-age architecture bleeds through, ancient creatures appear',
        'The last star prepares to fall — this is the point of no return',
        'The party reaches the Gathering — dozens of sleeping gods stirring',
        'The final choice: fight, negotiate, or bridge — each has massive consequences',
      ],
      estimatedSessions: 9,
    },
  ],
  keyNPCs: [
    {
      name: 'Stellara',
      role: 'celestial guardian / ally',
      personality:
        'An ancient solar who has been keeping the gods asleep for millennia. Exhausted, desperate, and terrified of failure. She\'s been alone in this duty for so long she\'s forgotten what trust feels like.',
      secret: 'She was created by the old gods as a warden. If they all wake, her purpose ends and she ceases to exist.',
    },
    {
      name: 'The Astronomer',
      role: 'quest giver / mortal scholar',
      personality:
        'A half-elf wizard who has spent her life mapping stars. Brilliant, obsessive, alternates between excitement about discovering cosmic truth and terror about what it means.',
    },
    {
      name: 'Khavel, the First Dreamer',
      role: 'the first waking god',
      personality:
        'An old god of curiosity and creation. It speaks by reshaping reality around it — a flower blooms to mean "yes," a stone crumbles to mean "no." Not malicious. Simply too large for mortal reality to contain.',
    },
    {
      name: 'The Shadow Collector',
      role: 'antagonist',
      personality:
        'An entity that feeds on the darkness left when stars vanish. It wants all the gods to wake so it can feast on the resulting chaos. Slithering, whispering, always in the corner of your eye.',
    },
  ],
  keyLocations: [
    {
      name: 'The Observatory of Falling Light',
      description:
        'A mountaintop observatory where the Astronomer tracks the disappearing stars. Telescopes point at empty patches of sky.',
      significance: 'Where the investigation begins and the party gets their astral bearings.',
    },
    {
      name: 'The Astral Sea',
      description:
        'An infinite silver void dotted with star-shrines, god-corpses, and the debris of previous ages. Beautiful, dangerous, disorienting.',
      significance: 'The primary setting for Act 2.',
    },
    {
      name: 'The Boundary',
      description:
        'The edge of the current age, where reality becomes thin and the previous world bleeds through. Two realities overlap in an impossible landscape.',
      significance: 'Where the old gods gather and the final confrontation takes place.',
    },
  ],
  dataSystems: [
    'spelljammerHelm',
    'astralEncounter',
    'astralShipCombat',
    'ancientProphecy',
    'cataclysmCountdown',
    'pocketDimension',
    'deityPantheon',
    'planarRift',
    'artifactHistory',
  ],
};
