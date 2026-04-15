import type { OneShotCampaign } from '../types';

export const theLastGuest: OneShotCampaign = {
  id: 'oneshot-last-guest',
  type: 'oneshot',
  title: 'The Last Guest',
  tagline: 'An inn where guests check in but never check out. They do not disappear. They just do not want to leave.',
  tone: 'horror',
  themes: ['horror', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The party stays at a roadside inn that is suspiciously full. Every room is occupied. Some guests have been here for weeks. Nobody wants to leave. The inn is comfortable, the food is excellent, and the beds are the best anyone has ever slept in. Too good. Leaving feels physically wrong. Like stepping into cold water. Like abandoning something precious.',
  hook: 'The innkeeper smiles warmly. "Checking out? Of course. The door is right there." The party member reaches for the door handle and stops. They do not want to leave. Not cannot. Do not want to. The desire to stay is overwhelming and it is not natural.',
  twist: 'The inn is a mimic. Not the building. The comfort. The inn is built on a psychic node that amplifies contentment and suppresses the desire to leave. It was created centuries ago as a rest stop for weary travelers. The magic was meant to last one night. It has been running for 400 years and has gotten stronger. The innkeeper is the latest victim, trapped longest, now part of the enchantment.',
  climax: 'The party must fight through the compulsion to stay and reach the basement where the psychic node is embedded in the foundation. Destroying it means the comfort vanishes and every guest suddenly feels 400 years of suppressed discomfort at once.',
  scenes: [
    {
      title: 'Scene 1: The Perfect Inn',
      summary: 'Arriving and experiencing the inn\'s impossible comfort. Everything is perfect. Too perfect. The desire to stay is immediate.',
      challenge: 'social',
      keyEvents: [
        'The inn: warm, clean, perfectly appointed, with the best food the party has ever tasted',
        'The guests: happy, relaxed, none of them planning to leave. Some have been here for months',
        'The compulsion: subtle at first. "One more night." Then stronger. "Why would I leave?"',
        'A guest who has been here for a year still thinks they arrived yesterday',
      ],
    },
    {
      title: 'Scene 2: The Resistance',
      summary: 'Realizing the enchantment and fighting it. Trying to leave is physically uncomfortable. The inn resists investigation.',
      challenge: 'puzzle',
      keyEvents: [
        'Detecting magic: the entire building radiates enchantment, strongest from below',
        'Attempting to leave: Wisdom saves against a compulsion that makes departure feel like loss',
        'The innkeeper: a victim, not a villain, aware something is wrong but unable to care enough to act',
        'The basement door: locked, warded, and the inn\'s magic is strongest around it',
      ],
    },
    {
      title: 'Scene 3: The Node',
      summary: 'Reaching the basement and confronting the psychic node. Destroying it is the right thing to do. It is also the last thing the party wants.',
      challenge: 'combat',
      keyEvents: [
        'The node: a crystal embedded in the foundation, pulsing with warm, golden light',
        'The compulsion peaks: every party member wants to sit down, relax, stay forever',
        'Wisdom saves each round. Failure means stopping, sitting, smiling',
        'Destroying the node: the comfort vanishes instantly. Every guest wakes from the dream at once',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Innkeeper Dalton', role: 'victim / obstacle', personality: 'Moves like someone underwater. Polishes the same glass for ten minutes without noticing. Smiles vaguely. "Checking out? Of course. The door is right there." Gestures toward the door the way someone gestures toward a window on the hundredth floor. "But why would you? Supper is almost ready. It is always almost ready." He does not realize he has been saying that for eleven years.' },
    { name: 'Mara', role: 'recent victim / ally', personality: 'Grips the edge of the table with white knuckles. Talks through her teeth. "I have a family. Two children. I need to leave. I know I need to leave. But I do not want to. It feels like - have you ever been in a warm bath and the water is perfect and you know you should get out but you cannot make yourself move? It is like that. Except I have been in this bath for three days. Help me. Please."' },
    { name: 'The Node', role: 'the threat', personality: 'A crystal the size of a fist embedded in the foundation stone, pulsing with warm golden light. Standing near it feels like the best morning of your life. The urge to sit down next to it and never get up is not a compulsion. It is a promise. That is what makes it dangerous. It does not force. It offers. And the offer is perfect.' },
  ],
  keyLocations: [
    { name: 'The Hearthstone Inn', description: 'A roadside inn that is the most comfortable place in the world and the hardest place to leave.', significance: 'The trap. Every comfortable detail is part of the enchantment.' },
    { name: 'The Common Room', description: 'Where happy, content guests sit and never leave, surrounded by perfect warmth and perfect food.', significance: 'Where the party experiences the compulsion and sees its long-term effects.' },
    { name: 'The Basement', description: 'A locked foundation chamber containing the psychic node that powers the enchantment.', significance: 'The climax. Reaching it and destroying it while fighting the desire to stop.' },
  ],
  dataSystems: ['hauntedLocation', 'puzzleLock', 'socialEncounter', 'environmentalHazard', 'combatNarration'],
};
