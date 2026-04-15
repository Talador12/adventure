import type { OneShotCampaign } from '../types';

export const theShadowThatStayed: OneShotCampaign = {
  id: 'oneshot-shadow-that-stayed',
  type: 'oneshot',
  title: 'The Shadow That Stayed',
  tagline: 'A party member\'s shadow stops following them. It is still in the room where they slept. It is doing things.',
  tone: 'horror',
  themes: ['horror', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'One morning, a party member wakes to find their shadow is not attached to them. It is still on the floor of the room, but it moves independently. It gestures. It points. It does things the party member did not do. The party member casts no shadow. Other people notice. The shadow is getting more active.',
  hook: 'The innkeeper stares at the party member in the morning light. "Where is your shadow?" They look down. Nothing. Then they look back into the room: their shadow is on the wall, waving at them. Slowly.',
  twist: 'The shadow is not a curse. It is a warning. The shadow detached because something is following the party member from the Shadowfell. The shadow is trying to protect its owner by staying behind to block the pursuer\'s path. It is losing. Each hour, the shadow grows weaker and the pursuer grows closer. When the shadow disappears entirely, the pursuer arrives.',
  climax: 'The shadow fades to nothing. A Shadowfell stalker materializes, drawn to the party member by a debt incurred in a past life. The party must defeat or banish the stalker, and the shadow returns to its owner, exhausted and grateful.',
  scenes: [
    {
      title: 'Scene 1: The Detachment',
      summary: 'Discovering the separated shadow and trying to understand what happened. The shadow communicates through gestures and pantomime.',
      challenge: 'puzzle',
      keyEvents: [
        'Morning discovery: no shadow on the party member, shadow on the wall moving independently',
        'Communication: the shadow points, gestures urgently, mimes running away from something',
        'Public reaction: people stare, children cry, a priest makes a warding sign',
        'The shadow draws something on the wall with its hand: a figure following behind the party',
      ],
    },
    {
      title: 'Scene 2: The Pursuit',
      summary: 'The shadow weakens as the day progresses. It is fighting something the party cannot see. A sage explains what is happening.',
      challenge: 'exploration',
      keyEvents: [
        'The shadow grows fainter each hour. It moves more slowly, gestures more desperately',
        'A sage identifies the phenomenon: Shadowfell detachment, a defense mechanism',
        'The pursuer: a stalker from the Shadowfell, drawn by an old debt, getting closer',
        'Cold spots follow the party. Mirrors show a figure behind them that is not there in person',
      ],
    },
    {
      title: 'Scene 3: The Arrival',
      summary: 'The shadow vanishes. The stalker materializes. The party fights something from the space between light and dark.',
      challenge: 'combat',
      keyEvents: [
        'The shadow flickers and disappears. The air temperature drops 20 degrees',
        'The stalker: a humanoid of pure darkness that steps out of the party member\'s missing shadow',
        'It fights with shadow magic: darkness, fear, and attacks that target the soul',
        'Defeating it: the shadow snaps back to its owner like a rubber band, visibly relieved',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Shadow', role: 'protector / warning', personality: 'Not sentient in the traditional sense, but loyal. It separated to fight something it could not beat. It communicates in gestures, growing more frantic as it weakens. It is the bravest part of its owner.' },
    { name: 'Sage Merivale', role: 'information', personality: 'A specialist in planar phenomena who recognizes the Shadowfell detachment immediately. Excited academically, then terrified practically. "This is remarkable. Also we need to move. Now."' },
    { name: 'The Stalker', role: 'antagonist', personality: 'A Shadowfell entity that collects debts from past lives. It does not speak. It does not negotiate. It arrives, it claims, it leaves. Unless stopped.' },
  ],
  keyLocations: [
    { name: 'The Inn', description: 'Where the shadow detaches and the party first realizes something is wrong.', significance: 'The discovery that starts the clock ticking.' },
    { name: 'The Sage\'s Study', description: 'A cluttered room full of planar research where the phenomenon is identified and the timeline is established.', significance: 'Where the party learns what they are facing and how long they have.' },
    { name: 'The Arrival Point', description: 'Wherever the party is when the shadow finally disappears and the stalker materializes.', significance: 'The climax. The fight happens wherever the countdown reaches zero.' },
  ],
  dataSystems: ['combatNarration', 'monsterLore', 'environmentalHazard', 'encounterWaves', 'hauntedLocation'],
};
