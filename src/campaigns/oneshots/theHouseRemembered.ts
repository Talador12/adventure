import type { OneShotCampaign } from '../types';

export const theHouseRemembered: OneShotCampaign = {
  id: 'oneshot-house-remembered',
  type: 'oneshot',
  title: 'The House Remembered',
  tagline: 'An abandoned house that was never abandoned. The food is fresh. The family has been dead for 30 years.',
  tone: 'horror',
  themes: ['horror', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A house on the edge of town that has been "abandoned" for 30 years. Except the lights turn on at night. The chimney smokes. When the party enters, the house is immaculate: warm fire, fresh bread on the table, beds turned down. The family that lived here died 30 years ago in a fire. The house does not know they are gone.',
  hook: 'The front door opens easily. Inside: the smell of baking bread, a fire crackling, a child\'s toy on the rug. A table set for four with steam rising from the soup. The party sits down. A voice from upstairs: "Dinner is ready, loves." The family died in 996. It is 1026.',
  twist: 'The house is sentient. Not haunted, sentient. It loved the family that lived in it and when they died in the fire, it refused to accept it. It has been recreating their routines every day for 30 years: cooking meals nobody eats, turning down beds nobody sleeps in, calling out to people who will never answer. The house is not dangerous. It is grieving.',
  climax: 'The party must help the house accept the family\'s death. If they succeed, the house finally goes dark and cold, at peace. If they fail or are cruel, the house becomes hostile, trapping them inside its grief, recreating the fire that killed the family with the party inside.',
  scenes: [
    {
      title: 'Scene 1: The Living House',
      summary: 'Entering the house and experiencing its impossible domesticity. Everything is warm, fresh, and 30 years out of date.',
      challenge: 'exploration',
      keyEvents: [
        'Fresh bread, warm fire, set table: all maintained by an invisible presence',
        'Family portraits on the walls: a couple and two children, dated 30 years ago',
        'The house responds to the party: doors open for them, chairs pull out, blankets appear',
        'It calls them by the family\'s names. It thinks they are the family',
      ],
    },
    {
      title: 'Scene 2: The Memory',
      summary: 'The house replays the family\'s last day. The party witnesses the routines of people who died 30 years ago, re-enacted by a house that cannot let go.',
      challenge: 'exploration',
      keyEvents: [
        'Morning routine: invisible footsteps on stairs, breakfast dishes appearing, a child\'s laughter',
        'The house becomes confused when the party does not follow the family\'s routines',
        'A room that the house keeps locked: the room where the fire started',
        'Approaching the locked room makes the house agitated: temperature drops, doors slam',
      ],
    },
    {
      title: 'Scene 3: The Fire',
      summary: 'Helping the house remember what happened, or failing to, and facing the consequences of a grieving building.',
      challenge: 'social',
      keyEvents: [
        'Opening the locked room: charred walls, the only part of the house that shows the truth',
        'The house reacts: the smell of smoke, rising heat, phantom flames in the walls',
        'Gentle approach: acknowledging the family, honoring their memory, giving the house permission to rest',
        'Hostile approach: the house recreates the fire with the party trapped inside, a desperate denial',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The House', role: 'the heart / threat', personality: 'Communicates through its environment. Happy: warm fire, fresh bread smell, blankets appearing on chairs. Confused: doors opening and closing, rooms rearranging. Upset: temperature drops, shutters slam, the smell of smoke. Grieving: every light dims simultaneously and the house makes a sound like settling timber that sounds exactly like a sigh.' },
    { name: 'Neighbor Hesta', role: 'context', personality: 'Clutches her shawl and will not cross the gate. Talks in a low voice as if the house might hear. "I leave flowers at the gate sometimes. Daisies. Mira liked daisies. The flowers are always gone by morning. Arranged in a vase in the window. A vase that has not moved in thirty years."' },
    { name: 'The Verrin Family (memory)', role: 'the past', personality: 'Not ghosts. Routines. Invisible footsteps down the stairs every morning at 7. The sound of a chair pulling out. A child\'s laugh that comes from an empty room. The clink of a spoon stirring tea that is not there. The house plays these sounds on schedule, every day, because that is what a family sounds like and the house cannot bear the silence.' },
  ],
  keyLocations: [
    { name: 'The Verrin House', description: 'A house that is simultaneously abandoned and fully lived-in, warm and haunted, loving and dangerous.', significance: 'The entire adventure. The house is the NPC, the location, and the threat.' },
    { name: 'The Dining Room', description: 'A table set for four with fresh food that nobody eats, every night, for 30 years.', significance: 'Where the house\'s grief is most visible and most heartbreaking.' },
    { name: 'The Locked Room', description: 'The room where the fire started, the only space that shows the truth.', significance: 'The key to resolving the house\'s grief and the most dangerous room to enter.' },
  ],
  dataSystems: ['hauntedLocation', 'socialEncounter', 'environmentalHazard', 'puzzleLock', 'combatNarration'],
};
