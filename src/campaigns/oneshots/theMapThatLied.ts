import type { OneShotCampaign } from '../types';

export const theMapThatLied: OneShotCampaign = {
  id: 'oneshot-map-that-lied',
  type: 'oneshot',
  title: 'The Map That Lied',
  tagline: 'The map says the treasure is north. The map is a liar. The map is also sentient.',
  tone: 'exploration',
  themes: ['exploration', 'comedy', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 3,
  settingSummary:
    'The party buys a treasure map from a shady merchant. The map is sentient, opinionated, and a pathological liar — but it IS a real treasure map. It just doesn\'t want anyone to find the treasure because the treasure is its creator\'s grave, and it doesn\'t want strangers looting its dead master. The map will misdirect, argue, sulk, and occasionally try to get the party killed — but it can be reasoned with.',
  hook: 'The party buys a treasure map. On the way out of town, the map says: "Turn left." There is no left — they\'re on a bridge. The map says: "Exactly." When they unfold it, the landmarks are moving. The X keeps relocating. The compass rose is spinning. "You look like the looting type. I don\'t like looters."',
  twist:
    'The treasure isn\'t gold — it\'s the wizard\'s magical research: a lifetime of spells, discoveries, and one unfinished masterwork that could change the world. The map has been protecting this legacy for 80 years, sending treasure hunters into swamps, off cliffs, and into monster lairs. It\'s loyal to its dead master. If the party earns its trust, it will lead them true.',
  climax:
    'The party finds the grave-site. The map becomes emotional — this is the first time anyone has earned the right to be here. The treasure is revealed: not gold, but a spellbook of extraordinary power and a letter from the wizard addressed to "whoever the map finally trusts." The map asks to stay with the party — it\'s tired of being alone.',
  scenes: [
    {
      title: 'Scene 1: The Lying Map',
      summary:
        'The party tries to follow the map. The map lies about everything: directions, distances, landmarks. Every instruction is wrong, sometimes dangerously so.',
      challenge: 'exploration',
      keyEvents: [
        'The map says "go through the forest." The forest is a cliff face',
        'The map draws a bridge that doesn\'t exist — the river is very real',
        'The party realizes the map is sentient — it argues when accused of lying',
        'A negotiation begins: "Why won\'t you lead us to the treasure?" "Because you\'ll LOOT IT."',
      ],
    },
    {
      title: 'Scene 2: Earning Trust',
      summary:
        'The party must prove they\'re worthy. The map sets tests: navigate by stars (without the map\'s help), survive an encounter the map intentionally created, and answer a riddle about what treasure truly means.',
      challenge: 'exploration',
      keyEvents: [
        'Test 1: navigate without the map — it watches and judges',
        'Test 2: the map deliberately attracts a monster — "Let\'s see how you handle adversity"',
        'Test 3: the map\'s riddle — "What is treasure that cannot be spent?"',
        'The map softens: "My master was the last person who was kind to me. Show me you\'re kind too."',
      ],
    },
    {
      title: 'Scene 3: The Grave',
      summary:
        'The map leads true. The grave of a forgotten wizard in a hidden valley. The treasure is knowledge, not gold. The map asks to come along.',
      challenge: 'social',
      keyEvents: [
        'The true path — beautiful, hidden, and clearly beloved by the wizard who made it',
        'The grave: a simple marker over an underground study',
        'The spellbook and the letter — a wizard\'s lifetime of work, given freely',
        'The map\'s request: "I\'ve been alone for 80 years. Take me with you."',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Map',
      role: 'guide / obstacle / companion',
      personality:
        'Sarcastic, protective, emotionally complex. Lies as a defense mechanism. Fiercely loyal to its dead master. Deep down, desperately lonely. "I\'m not crying. Maps don\'t cry. This is condensation."',
    },
    {
      name: 'The Shady Merchant',
      role: 'quest giver',
      personality:
        'A traveling merchant who couldn\'t get the map to work and sold it in frustration. "It told me to walk into a lake. I did. I want a refund but it keeps calling me names."',
    },
    {
      name: 'Wizard Elara (ghost, maybe)',
      role: 'the map\'s creator (deceased)',
      personality:
        'Known through the letter and the map\'s stories. A kind, brilliant wizard who made the map as a companion and died of old age. The map was her last and best creation.',
    },
  ],
  keyLocations: [
    {
      name: 'The Wrong Forest',
      description:
        'Where the map sends the party first. It\'s actually a nice forest, just not where the treasure is.',
      significance: 'The first lie and the beginning of the negotiation.',
    },
    {
      name: 'The Testing Grounds',
      description:
        'A series of natural obstacles the map uses to test the party: a river crossing, a monster lair, and a hidden clearing.',
      significance: 'Where trust is earned.',
    },
    {
      name: 'The Hidden Valley',
      description:
        'A beautiful, secluded valley with a wildflower meadow, a stream, and a simple grave marker over an underground wizard\'s study.',
      significance: 'The real destination and the emotional climax.',
    },
  ],
  dataSystems: [
    'lyingMap',
    'travelEncounters',
    'wildernessSurvival',
    'puzzleLock',
    'socialEncounter',
    'treasureMap',
  ],
};
