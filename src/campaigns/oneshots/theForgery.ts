import type { OneShotCampaign } from '../types';

export const theForgery: OneShotCampaign = {
  id: 'oneshot-forgery',
  type: 'oneshot',
  title: 'The Forgery',
  tagline: 'Do not steal the crown. Replace it with a perfect fake. During the coronation. In front of everyone.',
  tone: 'heist',
  themes: ['heist', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 6,
  estimatedHours: 3,
  settingSummary:
    'The Crown of Ardenmere is a powerful magical artifact. In three hours, it will be placed on Prince Darian\'s head during his coronation in front of the entire court. A rebel faction needs the crown replaced with a powerless replica before the ceremony. The prince cannot know. The court cannot know. The switch must happen between the moment the crown leaves the vault and the moment it touches his head.',
  hook: 'The rebel contact lays out the plan: "The crown is in the royal vault until noon. At noon, the Chamberlain carries it to the throne room. At 1, the Archbishop places it on the prince. You have that one-hour window to switch the real crown with this replica. The replica is perfect. The switch must be invisible. The fate of the kingdom depends on the prince wearing a hat that does not work."',
  twist: 'The prince already knows the crown is dangerous. He has been trying to destroy it for months and failed - the crown is indestructible. He WANTS it replaced with a fake but cannot do it himself without alerting his loyalist court. The rebel faction and the prince are secretly working together. The party is the tool both sides need but neither can openly hire.',
  climax: 'The coronation procession. The Chamberlain carries the crown on a velvet pillow through the great hall. Hundreds of eyes. The party must make the switch during the walk from the vault to the throne. If they fail, the crown\'s magic binds the prince to it - and the crown has its own agenda.',
  scenes: [
    {
      title: 'Scene 1: The Plan',
      summary: 'Studying the coronation schedule, the vault security, and the procession route. Finding the moment to strike.',
      challenge: 'exploration',
      keyEvents: [
        'The schedule: vault opens at noon, procession at 12:30, coronation at 1 - tight windows',
        'The vault: three locks, two guards, and a detection ward - cracking it is possible but loud',
        'The procession: the Chamberlain walks through the great hall flanked by honor guards',
        'The best window: the moment the Chamberlain pauses at the altar to present the crown',
      ],
    },
    {
      title: 'Scene 2: Positioning',
      summary: 'Getting into position for the switch. Disguises, distractions, and one very convincing fake crown.',
      challenge: 'social',
      keyEvents: [
        'Cover identities: guests, servants, clergy, or honor guard - each position has advantages',
        'The replica: testing it under detect magic - it passes a casual inspection but not a thorough one',
        'The Chamberlain: old, proud, and handles the crown with reverence - he will notice weight differences',
        'Contingency: what happens if the switch fails mid-procession',
      ],
    },
    {
      title: 'Scene 3: The Switch',
      summary: 'The procession begins. The crown moves. The party acts.',
      challenge: 'puzzle',
      keyEvents: [
        'The procession: music, candles, hundreds of people standing as the crown passes',
        'The pause: the Chamberlain presents the crown at the altar - the three-second window',
        'The switch: sleight of hand, magical misdirection, or a well-timed distraction',
        'The coronation: the fake crown is placed on the prince\'s head - nothing happens. Perfect.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Chamberlain', role: 'unwitting obstacle', personality: 'An elderly official who has served three kings. Handles the crown with reverence and precision. He will notice if something is wrong - his hands know the weight of that crown.' },
    { name: 'Prince Darian', role: 'secret ally', personality: 'The prince being crowned. Publicly eager, privately terrified of the crown\'s power. He cannot help the party without raising suspicion but he will not interfere.', secret: 'He will subtly adjust his schedule to give the party an extra moment if he senses their plan.' },
    { name: 'Rebel Contact Shade', role: 'quest giver', personality: 'A changeling operative who communicates through dead drops and disguises. Efficient, professional, and prepared to sacrifice the party if the mission demands it.' },
  ],
  keyLocations: [
    { name: 'The Royal Vault', description: 'A fortified chamber beneath the throne room. Three locks, two guards, and a ward that screams if unauthorized hands touch the crown.', significance: 'Where the crown starts the day.' },
    { name: 'The Great Hall', description: 'A cavernous room with marble floors, stained glass, and seating for five hundred. The procession route runs from the vault stairs to the throne.', significance: 'Where the switch must happen in plain sight.' },
    { name: 'The Altar', description: 'A stone platform before the throne where the Archbishop blesses the crown. The Chamberlain pauses here. This is the window.', significance: 'The exact spot for the switch.' },
  ],
  dataSystems: ['heistPlanner', 'socialEncounter', 'trapDisarm'],
};
