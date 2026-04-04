import type { OneShotCampaign } from '../types';

export const theMuseumHeist: OneShotCampaign = {
  id: 'oneshot-museum-heist',
  type: 'oneshot',
  title: 'The Museum Heist',
  tagline: 'The exhibits are alive. The security is cursed. The painting you need is running.',
  tone: 'heist',
  themes: ['heist', 'comedy', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 6,
  estimatedHours: 4,
  settingSummary:
    'The Royal Museum of Antiquities holds a stolen artifact that belongs to the party\'s patron. Legal channels have failed — it\'s heist time. Problem: the museum\'s security is entirely magical. Paintings attack intruders. Statues come alive. The suit of armor on floor 3 has opinions. And the artifact they need is in a portrait that moves between frames.',
  hook: 'A patron shows the party a deed proving an artifact in the museum is rightfully theirs. The museum refuses to return it. "Get my heirloom back. I don\'t care how. But don\'t damage anything else — I have a reputation."',
  twist: 'The artifact doesn\'t want to leave. It\'s been enjoying museum life — admiring visitors, chatting with other exhibits at night, and avoiding the boring estate where it was kept for centuries. The party must convince a sentient artifact that home is better than a museum.',
  climax: 'The museum\'s guardian — a giant suit of enchanted armor — activates. The artifact hides in different paintings. The party must chase it through living exhibits while avoiding the guardian and convincing the artifact to come willingly.',
  scenes: [
    {
      title: 'Scene 1: Casing the Museum',
      summary: 'Daytime visit. Map the exhibits, identify security, and realize the painting with the artifact keeps moving to different rooms.',
      challenge: 'exploration',
      keyEvents: [
        'Tour: the museum has 4 wings — each with different magical security',
        'The artifact spotted: a glowing amulet in a portrait that winks at the party',
        'Security noted: living paintings, animated statues, the guardian armor',
        'The plan: return at night when only the magical security is active',
      ],
    },
    {
      title: 'Scene 2: After Hours',
      summary: 'Night infiltration. Every exhibit comes alive. The museum is a dungeon of art.',
      challenge: 'exploration',
      keyEvents: [
        'Entry: past the locked doors (or through the skylight, or the sewers)',
        'The living gallery: paintings try to pull the party inside, statues ask for passwords',
        'The artifact\'s portrait: it\'s moved to a different wing — the chase begins',
        'The guardian armor activates: "UNAUTHORIZED VISITORS. REMAIN STILL FOR INCARCERATION."',
      ],
    },
    {
      title: 'Scene 3: The Chase',
      summary: 'The artifact flees through paintings. The guardian pursues the party. Chaos in the museum at night.',
      challenge: 'combat',
      keyEvents: [
        'Chase through the portrait gallery: the artifact jumps between paintings',
        'The guardian armor: a boss fight among priceless (and screaming) exhibits',
        'Cornering the artifact: it\'s hiding in a landscape painting, pretending to be a bush',
        'Negotiation: convince the artifact that home isn\'t that boring (or lie convincingly)',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Amulet of Alara', role: 'the target / reluctant', personality: 'A sentient amulet that loves attention. Museum life means thousands of admirers daily. Home means a dusty shelf. "I\'m APPRECIATED here!"' },
    { name: 'Sir Galvanize', role: 'guardian armor', personality: 'A massive animated suit of armor that takes museum security very seriously. Speaks in all caps. "I LIVE TO SERVE. AND TO APPREHEND."' },
    { name: 'Mona (portrait)', role: 'living exhibit / informant', personality: 'A woman in a painting who watches everything and gossips with other portraits. Will share security info for compliments.' },
  ],
  keyLocations: [
    { name: 'The Royal Museum', description: 'A grand building where every exhibit has a personality and most have magical security.', significance: 'The entire one-shot takes place here.' },
    { name: 'The Portrait Gallery', description: 'A wing of living paintings that serve as both art and a highway for the fleeing artifact.', significance: 'Where the chase scene occurs.' },
    { name: 'The Vault', description: 'The museum\'s most secure room. The guardian armor stands at the door. The alarm is a very loud painting.', significance: 'The backup extraction point.' },
  ],
  dataSystems: ['heistPlanner', 'trapDisarm', 'sentientItem', 'combatNarration', 'puzzleLock', 'socialEncounter'],
};
