import type { OneShotCampaign } from '../types';

export const theOtherDoor: OneShotCampaign = {
  id: 'oneshot-other-door',
  type: 'oneshot',
  title: 'The Other Door',
  tagline: 'There is a door in your room that was not there last night. It opens somewhere else entirely.',
  tone: 'exploration',
  themes: ['exploration', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The party is staying at a roadside inn. In the morning, one of them notices a second door in their room that was not there when they went to sleep. It is plain wood, slightly warm, and opens to a sunlit meadow that does not exist outside the inn. The door closes behind them. Getting back is not straightforward.',
  hook: 'The door is unremarkable. No runes, no glow. Just a door where a wall used to be. Through it: warm air, tall grass, birdsong. No sign of the inn, the road, or the town. The door stays open for about ten minutes, then slowly swings shut.',
  twist: 'The meadow is a demiplane created by a dying wizard as a sanctuary for her familiar. The familiar has been alone for decades and has been opening doors to other planes, hoping someone would come through. The doors are not random. The familiar chose the party because it sensed kindness.',
  climax: 'The familiar asks the party to help it complete its master\'s final spell, anchoring the demiplane permanently so the door remains open. The catch: anchoring it requires a piece of each party member\'s memory. Something small. Something they will not remember giving.',
  scenes: [
    {
      title: 'Scene 1: Through the Door',
      summary: 'Exploring the meadow demiplane. It is beautiful, peaceful, and clearly artificial. The sky has no sun, just light. The horizon shimmers.',
      challenge: 'exploration',
      keyEvents: [
        'The meadow: endless grass, perfect weather, flowers that bloom in patterns',
        'The door closes behind the party after 10 minutes',
        'A cottage at the center of the meadow, well-maintained but old',
        'Signs of a single occupant: tiny furniture, claw marks on doorframes, bowls of water',
      ],
    },
    {
      title: 'Scene 2: The Familiar',
      summary: 'Meeting the familiar and learning the story of the demiplane. The wizard who created it, why she made it, and what the familiar needs.',
      challenge: 'social',
      keyEvents: [
        'The familiar: an elderly pseudodragon who speaks telepathically',
        'The wizard\'s story: she was dying, created this place so her companion would be safe',
        'The loneliness: the familiar has been alone for 40 years, opening doors to find company',
        'The request: help complete the anchoring spell so the door stays open permanently',
      ],
    },
    {
      title: 'Scene 3: The Anchoring',
      summary: 'Completing the spell requires navigating the unstable edges of the demiplane and the cost of anchoring it with personal memories.',
      challenge: 'puzzle',
      keyEvents: [
        'The spell components: scattered at the edges of the demiplane where reality frays',
        'The cost: each party member must offer a memory to anchor the plane',
        'The choice: what memory to give, knowing they will never remember it',
        'The door reopens, permanent this time, and the familiar is no longer alone',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Pip', role: 'quest giver / companion', personality: 'An elderly pseudodragon who has been alone for 40 years. Gentle, hopeful, and heartbroken. Speaks in simple, earnest sentences. "I opened so many doors. You are the first to stay."' },
    { name: 'Wizard Thessaly (memory)', role: 'backstory', personality: 'Present only in journals and the familiar\'s memories. A warm, brilliant woman who loved her familiar more than her magic.', secret: 'She could have saved herself instead of creating the demiplane. She chose the familiar.' },
    { name: 'Innkeeper Brynn', role: 'framing device', personality: 'The innkeeper who notices the door is gone when the party returns. Confused but unbothered. "Walls move in old buildings. Happens all the time."' },
  ],
  keyLocations: [
    { name: 'The Roadside Inn', description: 'A perfectly ordinary inn with a door that should not exist.', significance: 'The entry point and return destination.' },
    { name: 'The Meadow Demiplane', description: 'An artificially perfect meadow with no sun, no horizon, and a single cottage at its center.', significance: 'The entire adventure takes place here. Beautiful and melancholy.' },
    { name: 'The Cottage', description: 'Thessaly\'s last gift to her familiar. Full of books, dried flowers, and 40 years of solitude.', significance: 'Where the party learns the story and makes their choice.' },
  ],
  dataSystems: ['planarTravel', 'puzzleLock', 'npcDialogue', 'socialEncounter', 'magicItemGenerator'],
};
