import type { OneShotCampaign } from '../types';

export const theDoorAtTheEnd: OneShotCampaign = {
  id: 'oneshot-door-at-the-end',
  type: 'oneshot',
  title: 'The Door at the End',
  tagline: 'A door hangs in the sky like a wound. Through the crack, voices beg: "Open it. Our world is dying. Yours is all we have left."',
  tone: 'epic',
  themes: ['epic', 'planar', 'exploration'],
  playerCount: { min: 3, max: 5 },
  level: 8,
  estimatedHours: 3,
  settingSummary:
    'A door appeared in the sky three days ago. Massive, ornate, and slowly opening. Through the crack: a different sky, different stars, a different world. The door is widening. When it opens fully, the two universes will merge. The party must reach the door, understand what is on the other side, and decide: close it forever or step through.',
  hook: 'The door is visible from everywhere, hanging in the sky like a second moon. Through the crack, alien light spills into the world. A voice from the other side, barely audible: "We have been trying to reach you. Our world is dying. Yours is our only hope. Please. Open the door."',
  twist: 'The other universe is this universe - from the future. The world on the other side is what this world becomes in a thousand years if certain choices are not made. The people on the other side are the descendants of everyone alive now. They are asking their ancestors to open a door that would let them rewrite history - erasing the present to save the future.',
  climax: 'At the door. The party sees the future world - a wasteland of magical over-extraction. The future people beg for the door to open. But opening it means the present universe is overwritten by the future\'s timeline changes. Everyone alive now ceases to exist so the future can be rewritten. The party holds the handle of a door that is also a delete button.',
  scenes: [
    {
      title: 'Scene 1: The Door',
      summary: 'The door in the sky. Getting to it. Understanding what is on the other side.',
      challenge: 'exploration',
      keyEvents: [
        'The door: ornate, the size of a city block, hanging where the clouds should be. Sunlight bends around its frame.',
        'Reaching it: a white stone staircase spirals from a farmer\'s field to the sky. Nobody built it. It grew overnight.',
        'The crack: a child presses her face to the gap from the other side. Grey skin, hollow eyes, but alive. She waves.',
        'The voice: clear now, a woman\'s voice, educated and exhausted: "We have been trying to reach you for a thousand years."',
      ],
    },
    {
      title: 'Scene 2: The Other Side',
      summary: 'Stepping through partially. Seeing the future world. Understanding its connection to the present.',
      challenge: 'social',
      keyEvents: [
        'The future world: this world in a thousand years, devastated by magical over-extraction',
        'The future people: descendants of present-day civilizations, technology mixed with dying magic',
        'The realization: this is not another universe - this is the future, and they want to change it',
        'The mechanism: opening the door fully allows timeline rewriting - but it overwrites the present',
      ],
    },
    {
      title: 'Scene 3: The Handle',
      summary: 'The decision. Open (erase the present), close (condemn the future), or find another way.',
      challenge: 'social',
      keyEvents: [
        'The future\'s plea: "You will never exist as you are now. But your world survives. Our world survives."',
        'The present\'s argument: "We have lives. We have people we love. You cannot ask us to not exist."',
        'The third option: send information through instead of people - warn the present to change course',
        'The handle: the party grabs the door and decides the fate of two timelines',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elara of the Future', role: 'future representative', personality: 'A leader from the future world. Desperate, articulate, and fully aware she is asking present-day people to erase themselves. She has made peace with the moral weight. Barely.' },
    { name: 'Stairkeeper Havel', role: 'guide', personality: 'A mage who appeared with the staircase. He is from neither timeline - he is the door\'s guardian, created to ensure whoever touches the handle understands the choice.' },
    { name: 'The Present Voice', role: 'mortal advocate', personality: 'A farmer from the village below the door. No magic, no power. Just a person who does not want to stop existing. His argument is simple and devastating: "I want to see my daughter grow up."' },
  ],
  keyLocations: [
    { name: 'The Door', description: 'An enormous ornate door floating in the sky. Through the crack: alien light, a dying world, and voices begging for help.', significance: 'The central object and the choice.' },
    { name: 'The Staircase', description: 'A spiral staircase of white stone that appeared the same day as the door. It climbs from the ground to the sky, ending at the door\'s threshold.', significance: 'The path to the door.' },
    { name: 'The Future World', description: 'Visible through the crack. A wasteland that was once a paradise. Grey sky, dead forests, and a thousand years of accumulated consequence.', significance: 'The motivation for the future\'s desperation.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
