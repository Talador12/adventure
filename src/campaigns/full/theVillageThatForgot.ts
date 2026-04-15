import type { FullCampaign } from '../types';

export const theVillageThatForgot: FullCampaign = {
  id: 'full-village-that-forgot',
  type: 'full',
  title: 'The Village That Forgot',
  tagline: 'Your character sheet is blank. Your name is gone. The villager next to you is fading.',
  tone: 'horror',
  themes: ['horror', 'mystery', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 15,
  settingSummary:
    'The village of Millhaven wakes one morning with no memories. Every resident — including the party — has forgotten who they are. As fragments of memory return, the party realizes something ancient beneath the village is feeding on their identities, growing stronger with each forgotten name.',
  hook: 'The players wake in a tavern with no memory of who they are, why they are here, or what their names were. Their character sheets are blank except for stats and class abilities — names, backstories, and bonds are missing. They must rediscover themselves.',
  twist:
    'The entity erasing memories is not malevolent — it is a dying god trying to reassemble its own shattered identity from the fragments of mortal minds. The villagers\' memories are being woven into a new divine consciousness. The "villain" is a desperate, terrified godling.',
  climax:
    'The party confronts the nascent god beneath the village. They can destroy it (restoring all memories but killing a newborn deity), negotiate (letting it keep some memories in exchange for others), or sacrifice their own identities to complete it (the god is reborn, but the party forgets everything again).',
  acts: [
    {
      title: 'Act 1: The Blank Page',
      summary:
        'The party and all villagers have amnesia. Players rediscover their abilities through gameplay. Fragments of memory surface as dreams — but each dream costs someone else a memory.',
      keyEvents: [
        'Wake with amnesia — no names, no backstory, just instinct',
        'First combat reveals class abilities organically',
        'Dream fragments begin — each player recovers a memory shard',
        'A villager vanishes — not dead, just... forgotten by reality',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Unraveling',
      summary:
        'The party investigates the source. More villagers disappear. The town historian\'s journal reveals Millhaven was built on a temple to a forgotten god. The memory thefts are getting more aggressive.',
      keyEvents: [
        'The historian\'s hidden journal — pages going blank in real time',
        'The well at the village center glows at midnight',
        'Party member recovers a false memory — planted by the entity',
        'The mayor remembers everything and is terrified into silence',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The God Below',
      summary:
        'Beneath Millhaven lies a temple where the entity — half-formed, confused, afraid — is assembling a new consciousness from stolen memories. The party must decide its fate.',
      keyEvents: [
        'Descent into the temple — architecture shifts as the god "dreams"',
        'The entity speaks through borrowed voices — fragments of villagers',
        'Memory labyrinth — each player faces their forgotten past',
        'The final choice — destroy, bargain, or sacrifice',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'The Hollow Mayor',
      role: 'reluctant ally',
      personality:
        'The only person in town who remembers everything. He speaks in whispers, leaning close, eyes darting to corners. He writes notes to himself and burns them after reading. He touches the walls of his office as if confirming they are real. He flinches when someone says his name, as if afraid it will be taken. Haunted, exhausted, terrified that remembering makes you a target.',
      secret: 'He made a deal with the entity years ago - his family\'s safety in exchange for leading victims to the village. His family is safe. He has not looked in a mirror since.',
    },
    {
      name: 'Moth',
      role: 'mysterious child',
      personality:
        'A child found in the temple ruins who seems immune to the amnesia. She speaks in riddles and hums songs nobody taught her. She draws pictures of things that have not happened yet with crayons that should have run out weeks ago. Her eyes are slightly too large. She smells like old stone and library dust.',
      secret: 'Moth is the entity\'s first attempt at a mortal form - a fragment given shape. She does not know this. She thinks she is a normal child who happens to know things.',
    },
    {
      name: 'Old Bess',
      role: 'comic relief / tragic figure',
      personality:
        'The tavern owner who cheerfully introduces herself every 10 minutes because she keeps forgetting she already has. She pours drinks with practiced ease - her hands remember even when her mind does not. Surprisingly perceptive despite her condition. Between introductions, she sometimes pauses and stares at a spot on the wall where a family portrait used to hang. She does not know what she is looking for.',
    },
    {
      name: 'The Weaver',
      role: 'antagonist / sympathetic villain',
      personality:
        'The nascent god, speaking through stolen memories. Not evil — confused, frightened, desperately lonely. Alternates between childlike wonder and ancient rage.',
      secret: 'It was once a god of memory and stories, killed by its own followers when they decided to forget the old ways.',
    },
  ],
  keyLocations: [
    {
      name: 'Millhaven',
      description:
        'An idyllic farming village that feels slightly wrong — buildings don\'t quite match, as if assembled from different villages\' memories.',
      significance: 'The entire village sits on top of the buried temple.',
    },
    {
      name: 'The Temple of Unnamed Things',
      description:
        'A vast underground complex where architecture shifts like a dream. Rooms rearrange when you\'re not looking.',
      significance: 'Where the entity dwells and the final confrontation takes place.',
    },
    {
      name: 'The Memory Well',
      description:
        'The village well at the crossroads. At midnight, it glows and whispers names of people who no longer exist.',
      significance: 'The conduit between the village and the entity below.',
    },
  ],
  dataSystems: [
    'dreamSequence',
    'hauntedLocation',
    'npcBackstoryGen',
    'puzzleLock',
    'darkBargain',
    'magicalAnomaly',
    'cataclysmCountdown',
    'oracleConsultation',
    'backstoryComplication',
  ],
};
