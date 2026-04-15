import type { FullCampaign } from '../types';

export const theIllusionWar: FullCampaign = {
  id: 'full-the-illusion-war',
  type: 'full',
  title: 'The Illusion War',
  tagline: 'You lived an entire lifetime in a dream. You were happy. Now wake up and decide if reality is worth choosing.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The Village of Falling Leaves is hidden between folds of reality — a settlement of shadow warriors who abandoned swords generations ago. Their weapon is genjutsu: illusion magic so refined it rewrites perception at the neurological level. A master illusionist can trap you in a false world so convincing you age, love, grieve, and die without ever knowing none of it happened. The village trains its operatives in a compound that exists in a permanent twilight, where the walls shift when you stop looking at them and mirrors show you someone else\'s face.',
  hook: 'The party is recruited by a hooded figure who demonstrates genjutsu by making one player live three years in a blink — marriage, a child, a cottage by a lake — then snaps them back. Six seconds passed. The figure says: "That was a recruitment pitch. The village needs people who can survive having their reality unmade. Interested?" The party is brought to the Village of Falling Leaves and enrolled in the Order of the Unblinking Eye.',
  twist:
    'The village is the illusion. Their "master," Sensei Kagami, trapped them in a training simulation the moment they arrived on day one. Every mission, every friendship, every near-death experience since then has been a construct. The party has been living inside Kagami\'s genjutsu for what feels like months but has been eleven minutes of real time. Kagami did this because the only way to train someone to resist illusions is to put them inside one they cannot detect. The question is: they built real bonds with illusory people. They grew. They changed. Does the fact that it was not real make it not matter?',
  climax:
    'The party must break free from the simulation — but breaking free requires accepting that everything they experienced was false. Some party members may not want to leave. The "people" inside the illusion beg them to stay. Kagami waits on the other side, offering the truth: the real village, the real war, and a choice. Join the order for real, knowing what illusion can do to a mind. Or walk away, keeping the memories of a life that never happened.',
  acts: [
    {
      title: 'Act 1: The Unblinking Eye',
      summary:
        'The party arrives at the village, begins training, and runs their first missions. Each mission involves infiltrating a location where they cannot trust their senses. Mirrors lie. Walls move. Allies might be projections. The training is brutal and disorienting.',
      keyEvents: [
        'Recruitment: the genjutsu demonstration — three years in six seconds',
        'Arrival at the Village of Falling Leaves: twilight compound, shifting architecture',
        'First training exercise: navigate a room where gravity, color, and sound are all false',
        'First mission: infiltrate a merchant guild where every member wears an illusory second face',
        'The party meets the two factions: Guardians (illusion for protection) and Shapers (illusion for control)',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Fracture',
      summary:
        'The faction war between Guardians and Shapers intensifies. Missions become morally complex — the party is asked to plant false memories, erase real ones, and manipulate people who will never know they were manipulated. Cracks in reality start appearing: small inconsistencies the party cannot explain.',
      keyEvents: [
        'A mission to erase a witness\'s memory of a crime — but the witness is a child',
        'A Shaper operative traps a party member in a personal nightmare as a "demonstration"',
        'The ground flickers. For one frame, the village is empty. Nobody else notices.',
        'The party discovers a room in the compound that does not exist on any map. Inside: hundreds of sleeping bodies.',
        'Sensei Kagami gives a speech about "layers of truth" that suddenly feels like a confession',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Waking',
      summary:
        'The party realizes they are inside a simulation. The village, the people, the war — all constructed. They must navigate the collapsing illusion, confront Kagami, and decide whether to wake up or stay in a beautiful lie.',
      keyEvents: [
        'The simulation destabilizes: NPCs glitch, the sky shows seams, a dead ally appears alive',
        'Kagami appears inside the illusion: "You found the edge. Most never do. I am proud of you."',
        'The illusory people become aware they are not real. Some accept it. Some rage.',
        'Each party member faces a personal temptation: the illusion offers them their deepest desire. Stay and have it. Leave and lose it.',
        'The final choice: wake up into the real village, or remain in a perfect dream forever',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Sensei Kagami',
      role: 'mentor / mastermind',
      personality:
        'Folds her hands inside opposite sleeves when at rest. Tilts her head when listening, like a bird. Speaks in riddles not because she enjoys it but because direct answers are dangerous in a world built on lies. Occasionally flickers — her form shifts for a frame, showing an older or younger version of herself. "Truth is a privilege I cannot afford to share carelessly. Ask me a question. I will answer with a question. We will both learn."',
      secret: 'She has run this simulation 47 times with different recruits. The party is the first group to notice the cracks before Act 3.',
    },
    {
      name: 'Ren',
      role: 'ally / Guardian faction leader',
      personality:
        'Young, idealistic, believes illusion should only be used to shield and protect. Fiercely loyal to anyone who earns his trust. Quick to laugh, slow to forgive.',
      secret: 'He is not real. He is a construct Kagami built to represent the "good" path. He does not know this.',
    },
    {
      name: 'Yuki',
      role: 'rival / Shaper faction leader',
      personality:
        'Cold, precise, believes illusion is the ultimate form of power because it requires no violence. Views empathy as a tactical weakness. Respects strength in all its forms.',
      secret: 'Also not real, but unlike Ren, she suspects it. Her growing paranoia is part of the simulation destabilizing.',
    },
  ],
  keyLocations: [
    {
      name: 'The Village of Falling Leaves',
      description:
        'A compound in permanent twilight where walls rearrange when unobserved. Cherry blossoms fall endlessly but never accumulate on the ground.',
      significance: 'The entire campaign takes place here — or appears to. The village is the simulation.',
    },
    {
      name: 'The Hall of Mirrors',
      description:
        'Training facility where every surface is reflective. Each mirror shows a different version of reality. Some show the truth.',
      significance: 'Where the party trains and where the first cracks in the simulation appear.',
    },
    {
      name: 'The Room That Doesn\'t Exist',
      description:
        'A white space between the simulation\'s layers. Hundreds of sleeping bodies float in suspension. The party\'s real bodies are among them.',
      significance: 'The proof that the village is an illusion. Finding this room triggers Act 3.',
    },
  ],
  dataSystems: [
    'illusionPuzzle',
    'socialEncounter',
    'factionReputation',
    'detectiveCase',
    'trapCorridor',
    'npcRelationshipWeb',
    'moralDilemma',
  ],
};
