import type { OneShotCampaign } from '../types';

export const theGhostAccusation: OneShotCampaign = {
  id: 'oneshot-ghost-accusation',
  type: 'oneshot',
  title: 'The Ghost Accusation',
  tagline: 'Five nights. Five accusations. Five different people. The ghost cannot lie. They all pass Zone of Truth. Someone is wrong.',
  tone: 'mystery',
  themes: ['mystery', 'horror', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'Every midnight, the ghost of Alderman Voss appears in the town square and points at a citizen, declaring: "You killed me." A different person each night. Five nights, five accusations. The accused all deny it. Ghosts cannot lie. The party has until midnight to solve the contradiction.',
  hook: 'Night five. The ghost will accuse again at midnight. Five people already accused. The town is tearing itself apart. "The ghost says they are all guilty. They say they are all innocent. One of those things is wrong. Find out which."',
  twist:
    'The ghost is telling the truth: ALL five people are guilty. The alderman was killed by a conspiracy. Five citizens each played a role: one poisoned the food, one barred the door, one bribed the healer to stay away, one distracted the guard, one delivered the killing blow. Each believes the others acted alone.',
  climax:
    'The party realizes it was a conspiracy and must confront all five together. None knew the full plan. Each thought they were the only one acting. The mastermind who coordinated them is the sixth person - the alderman\'s wife, who the ghost has not accused because she technically did not kill him.',
  scenes: [
    {
      title: 'Scene 1: The Accused',
      summary: 'Interviewing the five accused. Each has a motive. Each denies murder. Each is telling a partial truth.',
      challenge: 'social',
      keyEvents: [
        'Accused #1: Brennan the baker. He poisoned the alderman\'s meal. "I put something in his soup. I thought it was a laxative. A woman gave it to me." Zone of Truth: "I did not murder him." True. He thought he was pranking, not killing.',
        'Accused #2: Guardsman Tol. He left his post. "I was told the alderman wanted privacy." Zone of Truth: "I did not murder him." True. He just opened the door.',
        'Accused #3: Healer Messa. She was called away. "An emergency at the mill. When I came back, he was dead." True. The emergency was fabricated.',
        'Each accused did ONE thing. None did everything. All pass Zone of Truth because none of them committed murder alone.',
      ],
    },
    {
      title: 'Scene 2: The Pattern',
      summary: 'Examining the alderman\'s death for evidence of multiple actors. The timeline does not work with a single killer.',
      challenge: 'puzzle',
      keyEvents: [
        'The alderman was poisoned, locked in, and left without medical care.',
        'No single accused had the opportunity to do all three.',
        'Each accused had the opportunity to do one thing.',
        'The realization: five people. Five roles. One coordinated murder.',
      ],
    },
    {
      title: 'Scene 3: The Sixth',
      summary: 'The conspiracy is revealed. The mastermind is the wife who orchestrated it all but is technically innocent of the act itself.',
      challenge: 'social',
      keyEvents: [
        'All five confronted together. None knew about the others. Shock and betrayal.',
        'Who organized this? Each received anonymous instructions. Same handwriting.',
        'The wife. She manipulated all five. She never touched the alderman.',
        'The ghost points at her at midnight. Not for murder. For orchestration.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Ghost of Alderman Voss',
      role: 'victim / accuser',
      personality: 'Dignified in death. Appears at midnight, points, speaks the accusation, and vanishes. Cannot elaborate. Cannot answer questions. Can only accuse.',
    },
    {
      name: 'Marta Voss',
      role: 'the alderman\'s wife / mastermind',
      personality: 'Brings the party tea without being asked. Remembers details about her husband the investigators overlooked. Cries at the right moments. She orchestrated every step and she is the most helpful person in the room.',
      secret: 'The alderman was corrupt and abusive. She organized his death using people he had wronged. She feels no guilt.',
    },
  ],
  keyLocations: [
    {
      name: 'The Town Square',
      description: 'Where the ghost appears every midnight. The cobblestones are cold even in summer where it stands.',
      significance: 'The nightly accusation site and the emotional center of the mystery.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'hauntedLocation'],
};
