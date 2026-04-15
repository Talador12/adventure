import type { FullCampaign } from '../types';

export const beforeTheFirst: FullCampaign = {
  id: 'full-before-the-first',
  type: 'full',
  title: 'Before the First',
  tagline: 'You are the first word. The first fire. The first song. You are also the last.',
  tone: 'exploration',
  themes: ['planar', 'exploration', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 1, end: 10 },
  estimatedSessions: 16,
  settingSummary:
    'The world is new. Or it looks new. The party awakens in a landscape with no roads, no buildings, no names for anything. The sky is a color that has no word yet. Magic exists but has not been shaped - it manifests as raw force, unpredictable and wild. The party has bodies, instincts, and fragments of knowledge they cannot explain. They can think. They can feel. They cannot yet speak. The campaign is about inventing civilization from scratch: the first word, the first tool, the first shelter, the first song, the first law. Each session, the world gets bigger. Each discovery changes everything. But the landscape holds secrets that do not fit - stones too regular to be natural, depressions too even to be erosion, and a hum beneath the ground that sounds almost like machinery.',
  hook: 'The party wakes in tall grass under an unnamed sky. They cannot speak yet - communication is gesture, expression, and shared experience. Something large moves in the distance. Something small scurries underfoot. The grass sways. Hunger is the first feeling. Survival is the first task. Language comes later.',
  twist:
    'They are not the first. They are the last. A previous civilization existed here - one that reached the stars, mastered magic and technology alike, and destroyed itself so thoroughly that nothing recognizable remains. The too-regular stones are foundations. The even depressions are craters. The hum beneath the ground is a machine that has been running for a million years, waiting for someone to find it. The party is not inventing civilization. They are reinventing it, walking through ruins they cannot recognize because the scale is too vast. The mountain range is a collapsed megastructure. The river follows an ancient canal. The "raw magic" is leaked power from buried infrastructure.',
  climax:
    'The party finds the machine - a vast underground complex that contains the previous civilization\'s final message. It is a seed vault of knowledge: language, mathematics, history, magic theory, and a warning. They destroyed themselves with exactly the tools the party is now rediscovering. The party must decide what to take from the vault and what to leave sealed. Every piece of knowledge accelerates their civilization but also moves it closer to the same mistakes.',
  acts: [
    {
      title: 'Act 1: The Unnamed World',
      summary: 'Survival without language or tools. The party invents basic communication, discovers fire, builds shelter, and begins to understand the world through direct experience.',
      keyEvents: [
        'First communication: the party develops gestures, then sounds, then proto-words',
        'First tool: a shaped stone, a sharpened stick. The world becomes slightly less hostile.',
        'First danger: a predator that is faster, stronger, and better adapted. The party must think, not fight.',
        'First anomaly: a stone too flat, too smooth, too regular. Nature did not make this.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Growing World',
      summary: 'The party explores further, invents more, and begins to encounter the ruins of something they cannot yet understand. Language develops. Magic begins to respond to intent.',
      keyEvents: [
        'First song: someone hums. Magic responds. Melody shapes raw arcane force.',
        'The depression field: a vast flat area with regular depressions. They look like footprints of something enormous.',
        'The hum: beneath the ground, constant and rhythmic. Digging reveals metal that should not exist.',
        'First conflict: another group of sentient beings. Communication is difficult. Misunderstanding is dangerous.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Seed Vault',
      summary: 'The party follows the hum to the underground complex. They discover the previous civilization, its knowledge, and its warning. The choice: what to inherit and what to bury.',
      keyEvents: [
        'The entrance: a door that responds to intent, not keys. The party\'s growing language activates it.',
        'The vault: vast, humming, full of crystallized knowledge. Each crystal is a lifetime of learning.',
        'The warning: the previous civilization\'s last recording. They made the same journey. They reached the stars. They burned.',
        'The choice: take the knowledge and risk the same fate, or seal the vault and build slowly from scratch',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Echo',
      role: 'vault guardian / ancient construct',
      personality: 'A construct left by the previous civilization to tend the seed vault. It has been alone for a million years. It speaks in the old language, which the party must learn to understand. Patient, sad, and desperately hoping the new people will do better.',
    },
    {
      name: 'Murmur',
      role: 'wild magic manifestation / companion',
      personality: 'Not a person but a presence. Raw magic that follows the party and responds to their emotions. It becomes more complex as the party develops language. It might be the land remembering what it once was.',
    },
    {
      name: 'Grit',
      role: 'rival group leader / foil',
      personality: 'The leader of another group of awakened beings. Pragmatic, aggressive, and suspicious. Grit\'s group is inventing the same things on a different timeline. First contact could mean alliance or war.',
    },
    {
      name: 'The Archive',
      role: 'recorded voice / dead civilization',
      personality: 'Not a person but a playback: the previous civilization\'s final speaker, recorded in crystal. Calm, regretful, and honest about what they did wrong. "We built everything. We broke everything. We left this so you would not have to."',
    },
  ],
  keyLocations: [
    { name: 'The Unnamed World', description: 'A landscape without names: tall grass, flowing water, distant peaks, unnamed sky. Beautiful and indifferent. Beneath the surface, the ruins of something vast.', significance: 'The entire campaign surface. Every landmark is a discovery waiting to be named.' },
    { name: 'The Depression Field', description: 'A miles-wide flat area pocked with regular depressions. At scale, they form a pattern - the footprint of a city that stood here a million years ago.', significance: 'The first undeniable evidence that something came before.' },
    { name: 'The Seed Vault', description: 'An underground complex of impossible age. Humming machinery, crystallized knowledge, and the recorded warning of a civilization that reached the stars and burned.', significance: 'The campaign\'s final destination and the source of the ultimate choice.' },
  ],
  dataSystems: ['wildernessSurvival', 'magicalAnomaly', 'wildMagicExpanded', 'terrainAdvantage', 'socialEncounter', 'companionAnimal', 'travelMontage', 'ancientProphecy'],
};
