import type { OneShotCampaign } from '../types';

export const theCollection: OneShotCampaign = {
  id: 'oneshot-collection',
  type: 'oneshot',
  title: 'The Collection',
  tagline: 'A room full of jars. Each jar contains a face. Not a mask. A face. The people are still alive. They are in the next room.',
  tone: 'horror',
  themes: ['horror', 'dark_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 6,
  estimatedHours: 3,
  settingSummary:
    'The party investigates a missing persons case that leads to a manor outside of town. In the basement, they find a room of glass jars, each containing a perfectly preserved human face, removed surgically from living people. The faces move. They blink. In the next room: the faceless people, alive, conscious, and unable to scream.',
  hook: 'The first jar is at eye level. The face inside opens its eyes and looks at the party member looking at it. Its mouth opens in a silent scream. The jar is sealed. There are 47 more jars on the shelves.',
  twist: 'The collector is not a serial killer. She is a hag who believes she is an artist. She considers faces the ultimate medium and her collection the greatest gallery ever assembled. She removes faces painlessly and keeps the donors alive because she is not cruel. She does not understand why anyone would object. The faces are more beautiful on display than on people, she insists.',
  climax: 'The party confronts the hag in her gallery. She offers to let the faceless people go if the party can convince her that faces belong on people. She genuinely does not understand. If persuasion fails, combat is the only option, and the hag fights to protect her art.',
  scenes: [
    {
      title: 'Scene 1: The Gallery',
      summary: 'Finding the jars and the faceless people. The horror is clinical, not chaotic. Everything is organized and well-maintained.',
      challenge: 'exploration',
      keyEvents: [
        'The jar room: shelves of glass jars, each containing a living face, labeled with dates',
        'The faces react: they see the party, they try to speak, they are aware and trapped',
        'The next room: 48 people sitting in chairs, faceless, breathing, conscious, fed and cared for',
        'The manor is clean, well-lit, and organized. This is not a dungeon. It is a studio',
      ],
    },
    {
      title: 'Scene 2: The Artist',
      summary: 'Meeting the hag. She is gracious, articulate, and completely sincere in her belief that faces are art objects meant to be displayed.',
      challenge: 'social',
      keyEvents: [
        'The hag: elegant, hospitable, offering tea beside her collection',
        'She explains: "Faces are wasted on people who do not appreciate them. They squint, they frown."',
        'She shows her favorites: a child\'s face, frozen in laughter. A warrior\'s face, mid-battle cry',
        'She offers the party a deal: convince her faces belong on people and she will return them',
      ],
    },
    {
      title: 'Scene 3: The Argument',
      summary: 'Persuading the hag that faces are not art, or fighting her when persuasion fails. The faceless people wait for the outcome.',
      challenge: 'combat',
      keyEvents: [
        'The argument: what makes a face valuable? Expression, identity, connection, humanity?',
        'If persuaded: the hag is genuinely moved. She returns the faces, one by one, with care',
        'If not persuaded: she fights with illusion magic, her collected faces screaming in their jars',
        'The restoration: faces returned to their owners. The gratitude is indescribable',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Curator', role: 'antagonist', personality: 'A night hag who considers herself an artist of the highest order. She is polite, intelligent, and horrifying because she genuinely believes she is doing beautiful work. "I freed these faces from the tyranny of human emotion. They are pure now. Perfect."' },
    { name: 'The Faceless', role: 'the victims', personality: 'Forty-eight people, alive and aware, without faces. They communicate through gestures and muffled sounds. They are not in pain. They are in a hell that is worse: they cannot express what they feel.' },
    { name: 'Investigator Carr', role: 'quest giver', personality: 'The detective who traced the missing persons to this manor and needs the party because going in alone was not an option. "I looked through the window. I saw the jars. I left. I am not going back in there without help."' },
  ],
  keyLocations: [
    { name: 'The Manor', description: 'A well-maintained estate that doubles as a gallery of stolen faces. Clean, organized, and deeply wrong.', significance: 'The adventure location. The juxtaposition of domestic comfort and horror is the point.' },
    { name: 'The Gallery', description: 'Rows of glass jars on shelves, each containing a living human face that blinks and tries to scream.', significance: 'The central horror image. The room where the party understands what they are dealing with.' },
    { name: 'The Sitting Room', description: 'Where the faceless people wait in chairs, cared for physically but robbed of identity.', significance: 'The human cost. Seeing the victims makes the horror personal.' },
  ],
  dataSystems: ['combatNarration', 'monsterLore', 'socialEncounter', 'hauntedLocation', 'encounterWaves'],
};
