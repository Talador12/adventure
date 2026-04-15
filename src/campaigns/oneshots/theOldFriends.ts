import type { OneShotCampaign } from '../types';

export const theOldFriends: OneShotCampaign = {
  id: 'oneshot-old-friends',
  type: 'oneshot',
  title: 'The Old Friends',
  tagline: 'Best friends for forty years. Neither has spoken in ten. Neither remembers why. There is an empty chair in the workshop.',
  tone: 'social',
  themes: ['social', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Gareth and Tomlin were inseparable for forty years. Partners in a smithy, godfathers to each other\'s children, the backbone of the community. Ten years ago, they stopped speaking. Nobody knows why. The town suffers for it. The party is asked to fix it.',
  hook: 'The town council is desperate: "Gareth and Tomlin\'s feud is tearing us apart. People take sides. The smithy closed. The harvest festival has TWO competing committees. Please. Get them in the same room. Make them talk."',
  twist:
    'Neither man remembers what started the fight. The original argument was trivial (a borrowed tool not returned). But pride calcified it into a decade of silence. Both men miss each other desperately and are too stubborn to make the first move.',
  climax:
    'The party gets them in the same room. The conversation starts hostile, then reveals neither remembers the original cause. Decades of friendship almost lost over a borrowed hammer. The laughter or the tears that follow determine the ending.',
  scenes: [
    {
      title: 'Scene 1: The Investigation',
      summary: 'The party talks to each man separately. Both are hurt. Both blame the other. Neither gives a clear reason.',
      challenge: 'social',
      keyEvents: [
        'Gareth\'s side: "He knows what he did." (He does not remember what Tomlin did.)',
        'Tomlin\'s side: "He started it." (He cannot remember how it started.)',
        'Talking to wives, children, and neighbors. Nobody knows the original cause.',
        'Clues: both men kept mementos from their friendship. Neither threw anything away.',
      ],
    },
    {
      title: 'Scene 2: Getting Them Close',
      summary: 'The party engineers encounters. A market stall. A shared errand. Every near-meeting almost works and then stubborn pride kicks in.',
      challenge: 'social',
      keyEvents: [
        'Attempt 1: "Accidentally" seated at the same tavern table. Both leave.',
        'Attempt 2: A crisis that requires both their skills. They cooperate silently.',
        'A breakthrough moment: one of them almost apologizes. The other flinches. Reset.',
        'The party realizes the direct approach is needed. Get them in a room. Lock the door.',
      ],
    },
    {
      title: 'Scene 3: The Room',
      summary: 'Locked in. No escape. The party mediates a conversation forty years in the making.',
      challenge: 'social',
      keyEvents: [
        'Initial hostility. Arms crossed. Jaws set.',
        'The party asks the simple question: "What started this?"',
        'Silence. Neither can answer. The realization dawns.',
        'A borrowed hammer. That is all it was. Laughter, tears, or both.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Gareth Stone',
      role: 'feuding friend #1',
      personality: 'Stubborn as iron. A master smith. Misses his friend every day but will bite off his own tongue before admitting it.',
    },
    {
      name: 'Tomlin Briggs',
      role: 'feuding friend #2',
      personality: 'Equally stubborn. A master carpenter. Has a chair in his workshop that he keeps empty because that is where Gareth used to sit.',
    },
  ],
  keyLocations: [
    {
      name: 'The Village of Copperfield',
      description: 'A friendly village divided in half by the pettiest feud in living memory.',
      significance: 'The social terrain. Everyone has an opinion about whose side they are on.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker'],
};
