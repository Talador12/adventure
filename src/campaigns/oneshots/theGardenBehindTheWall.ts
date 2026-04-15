import type { OneShotCampaign } from '../types';

export const theGardenBehindTheWall: OneShotCampaign = {
  id: 'oneshot-garden-behind-the-wall',
  type: 'oneshot',
  title: 'The Garden Behind the Wall',
  tagline: 'A walled garden nobody can enter. Birds fly in but never fly out. Something grows inside.',
  tone: 'exploration',
  themes: ['exploration', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'At the edge of town stands a walled garden with 30-foot smooth stone walls and no gate. It has been there longer than the town. Birds fly over the walls and never return. Vegetation spills over the top, growing thicker each year. Nobody knows what is inside. The party is hired to find out.',
  hook: 'The town council has tried everything: ladders (they slide off the walls), tunneling (the walls extend 50 feet underground), flight (a druid flew over and did not come back for three days, returning with no memory). They offer the party a considerable sum to get inside and report back.',
  twist: 'The garden is a seed vault planted by a primordial nature spirit as insurance against apocalypse. Every plant that has ever existed grows inside, including species long extinct. The garden is sentient and protective because it is the last repository of the world\'s botanical heritage. The druid did not lose her memory. The garden asked her not to tell.',
  climax: 'The garden recognizes the party and decides whether to trust them. If it does, it reveals its purpose and asks for protection from the town\'s expansion. If it does not, it tries to absorb them into itself as permanent caretakers.',
  scenes: [
    {
      title: 'Scene 1: Getting Inside',
      summary: 'Finding a way past the walls. Every conventional approach fails. The garden has its own rules for entry.',
      challenge: 'puzzle',
      keyEvents: [
        'Conventional attempts fail: the walls are magically smooth, extend deep underground',
        'A clue: seeds pressed into the wall at a specific point, nearly invisible',
        'The entry method: planting a seed at the base of the wall opens a passage',
        'Inside: a garden of impossible scope, denser than any forest, thrumming with life',
      ],
    },
    {
      title: 'Scene 2: The Living Collection',
      summary: 'Exploring the garden interior. Plants from every era and biome grow side by side. The garden watches and responds to the party.',
      challenge: 'exploration',
      keyEvents: [
        'Species variety: desert cacti beside arctic moss beside tropical orchids, all thriving',
        'Extinct plants: species from textbooks growing as though they never disappeared',
        'The garden responds: paths open and close, flowers turn to face the party',
        'A grove at the center containing a tree so old it predates written history',
      ],
    },
    {
      title: 'Scene 3: The Seed Keeper',
      summary: 'The garden\'s sentient core makes contact. It explains its purpose and asks the party to decide what to tell the town.',
      challenge: 'social',
      keyEvents: [
        'The ancient tree speaks through rustling leaves, scent, and root vibrations',
        'The purpose: a vault for every plant species, a failsafe against extinction',
        'The threat: the town wants the land for expansion and will breach the walls eventually',
        'The choice: protect the garden\'s secret, reveal it to gain official protection, or something else',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Council Chair Parveen', role: 'quest giver', personality: 'A pragmatic leader who sees the garden as wasted land in a growing town. Not malicious, just focused on the town\'s needs. "We need that land. Or at least we need to know why we cannot have it."' },
    { name: 'Druid Wynn', role: 'ally / secret keeper', personality: 'The druid who flew over the wall and returned with "no memory." She remembers everything. The garden asked her to keep its secret. She is relieved someone else might finally know.' },
    { name: 'The Seed Keeper', role: 'sentient garden', personality: 'The oldest living thing in the region. Patient as stone, protective as a parent, and willing to negotiate if approached with respect. It speaks through nature, not words.' },
  ],
  keyLocations: [
    { name: 'The Walled Garden (exterior)', description: '30-foot smooth stone walls with no gate, vegetation spilling over the top.', significance: 'The puzzle that starts the adventure: how do you get inside?' },
    { name: 'The Living Collection', description: 'An impossible garden where every plant species grows together across time and biome.', significance: 'The exploration heart. Every step reveals something that should not exist.' },
    { name: 'The Ancient Grove', description: 'The garden\'s center, dominated by a tree older than civilization that serves as the garden\'s consciousness.', significance: 'Where the party communicates with the garden and makes their choice.' },
  ],
  dataSystems: ['explorationChallenge', 'puzzleLock', 'socialEncounter', 'npcDialogue', 'herbalism'],
};
