import type { OneShotCampaign } from '../types';

export const theKnock: OneShotCampaign = {
  id: 'oneshot-knock',
  type: 'oneshot',
  title: 'The Knock',
  tagline: 'Three knocks at midnight. Nobody at the door. But the door is now unlocked. It was not before.',
  tone: 'horror',
  themes: ['horror', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The party is staying in a fortified manor house during a storm. At midnight, three knocks at the front door. Nobody is outside. But the heavy iron deadbolt, which requires a key from either side, is now unlocked. The party locked it themselves two hours ago. Something is inside the house.',
  hook: 'The knock is loud, deliberate, and exactly three times. The party opens the door: rain, darkness, nobody. They close it. The deadbolt is unlocked. The key is still in the party member\'s pocket. The bolt moved on its own. From the inside.',
  twist: 'The knocking is not something trying to get in. It is something that is already inside, knocking to let something else out. The manor sits on a sealed tomb. Three knocks is the unlocking ritual. Each knock opens one of three seals in the basement. When all three are open, whatever is sealed below is free. The first knock happened an hour before the party arrived. They heard the third.',
  climax: 'Two seals are already broken. The third is cracking. The party must reinforce the final seal before what is beneath the manor breaks free, or descend into the tomb to confront it directly.',
  scenes: [
    {
      title: 'Scene 1: After the Knock',
      summary: 'Investigating the unlocked door leads to more anomalies. Doors throughout the house are unlocking themselves. Something moves in the walls.',
      challenge: 'exploration',
      keyEvents: [
        'Every locked door in the house is now unlocked. Cabinets, wardrobes, the wine cellar',
        'A cold draft from the basement, which the party locked earlier. Also unlocked',
        'Scratching sounds inside the walls, moving downward toward the foundation',
        'The manor\'s history: built on the site of an old temple. The basement is older than the house',
      ],
    },
    {
      title: 'Scene 2: The Seals',
      summary: 'The basement reveals three ritual seals set into the floor. Two are cracked open. The third is holding but fracturing.',
      challenge: 'puzzle',
      keyEvents: [
        'Three stone circles in the basement floor, carved with binding runes',
        'Two are split open, the stone cracked from below, the runes dark',
        'The third glows faintly, cracks spreading across its surface',
        'Something beneath the seals pushes against the stone. The floor vibrates',
      ],
    },
    {
      title: 'Scene 3: The Third Seal',
      summary: 'The final seal breaks. The party either reinforces it, confronts what emerges, or escapes the manor before it is consumed.',
      challenge: 'combat',
      keyEvents: [
        'The third seal cracks: a hand of shadow reaches through the gap',
        'The entity: a bound revenant sealed centuries ago, powerful and furious',
        'Reinforcing the seal: requires a ritual found in the manor\'s library, performed under pressure',
        'If the seal fails completely: the revenant rises and the party fights in a collapsing basement',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Caretaker Vorn', role: 'information / victim', personality: 'Found behind a locked door in his nightshirt, holding a fire poker with both hands. Whispers. Will not look at the floor. "My grandmother said there are three rules about this house. Never knock three times. Never go into the basement after dark. And if the locks open on their own, leave. I broke two of those tonight."' },
    { name: 'The Sealed One', role: 'antagonist', personality: 'Does not speak. Does not have a face. It is a shape that presses against stone from below, leaving handprints in the mortar. When the third seal cracks, the sound it makes is not a voice. It is the sound of stone being pushed aside by something that has been patient for centuries.' },
  ],
  keyLocations: [
    { name: 'The Manor', description: 'A fortified house on a hill, older than it looks, built on a foundation that predates the building by centuries.', significance: 'The entire adventure takes place here. Every unlocked door is a countdown.' },
    { name: 'The Basement', description: 'Older than the house above it, with three ritual seals set into the stone floor.', significance: 'Where the seals are found and the truth about the knocking is revealed.' },
    { name: 'The Front Door', description: 'A heavy oak door with an iron deadbolt that unlocked itself from the inside.', significance: 'The first sign that something is wrong. The hook that starts everything.' },
  ],
  dataSystems: ['hauntedLocation', 'puzzleLock', 'encounterWaves', 'environmentalHazard', 'combatNarration'],
};
