import type { OneShotCampaign } from '../types';

export const theCensorBoard: OneShotCampaign = {
  id: 'oneshot-censor-board',
  type: 'oneshot',
  title: 'The Censor Board',
  tagline: 'They banned the play. You are performing it anyway. In front of the people who banned it.',
  tone: 'political',
  themes: ['political', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The playwright Orin Ashvale wrote "The Gilded Cage" - a play about a wealthy family that keeps servants in magical bondage. The Censor Board banned it for "inciting class unrest." The theater company has been ordered to perform the Board\'s approved replacement: a comedy about happy servants. The party is the theater company. They plan to perform the original.',
  hook: 'Director Tamsin gathers the party backstage: "The Censor Board is in the front row. The approved script is garbage. The real script is in your hands. We perform the original. If we get caught before the final act, we go to jail. If we finish the play, the audience will not let them arrest us. Curtain in twenty minutes."',
  twist: 'The head censor, Lord Ashvale, is the playwright\'s father. He banned the play to protect his son from prosecution under the sedition laws HE helped write twenty years ago. His censorship is not ideological - it is paternal. The play is about his own family.',
  climax: 'The final act. Lord Ashvale recognizes the play and stands to stop it. The audience is riveted. The party must finish the performance while the old man struggles between his role as censor and his love for his son. The ending of the play mirrors his choice.',
  scenes: [
    {
      title: 'Scene 1: Backstage',
      summary: 'Preparing for the subversive performance. Memorizing lines, hiding the real scripts, and dealing with a suspicious stage manager who works for the Board.',
      challenge: 'social',
      keyEvents: [
        'Script swap: the approved comedy scripts must stay visible while the real ones are hidden',
        'The stage manager: reports to the Censor Board, must be distracted or convinced',
        'Rehearsal: the party practices key scenes - performance checks will determine crowd reaction',
        'The Censor Board arrives: five officials in the front row, including Lord Ashvale',
      ],
    },
    {
      title: 'Scene 2: Acts One and Two',
      summary: 'Performing the banned play in front of the censors. The first act passes as the approved comedy. The second act diverges.',
      challenge: 'social',
      keyEvents: [
        'Act One: close enough to the approved version that the censors do not notice immediately',
        'Act Two: the real play begins - the audience leans in, the censors frown',
        'A censor whispers to a guard - the party has minutes before they are stopped',
        'Improvisation: the party must adapt lines on the fly to stay one step ahead of intervention',
      ],
    },
    {
      title: 'Scene 3: The Final Act',
      summary: 'Lord Ashvale stands. The guards move. The play must finish. The audience decides.',
      challenge: 'social',
      keyEvents: [
        'Lord Ashvale recognizes the play - his face shows shock, then grief, then something else',
        'Guards advance toward the stage - the audience protests, blocking the aisles',
        'The final monologue: about a father who built the cage and a son who wrote about it',
        'Ashvale\'s choice: does he stop the play or let his son\'s truth be heard',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Director Tamsin', role: 'quest giver', personality: 'A tiefling theater director who has been fighting censorship for years. Dramatic, brave, and fully aware this might end her career. "Art that cannot offend is not art."' },
    { name: 'Lord Ashvale', role: 'antagonist / father', personality: 'Head of the Censor Board. Stern, powerful, and haunted by the knowledge that his son wrote a masterpiece about their family\'s cruelty. He banned it out of love, not ideology.', secret: 'He has read the play a dozen times in private. He wept each time.' },
    { name: 'Orin Ashvale', role: 'absent playwright', personality: 'The playwright, in hiding. His words are the weapon. He wrote the play knowing his father would ban it - and hoping his father would understand why.' },
  ],
  keyLocations: [
    { name: 'The Silver Stage Theater', description: 'A grand theater with velvet seats, a wide stage, and excellent acoustics. Tonight it is a battleground.', significance: 'Where the performance and confrontation happen.' },
    { name: 'Backstage', description: 'Cramped, cluttered with props and costumes. Hidden compartments where the real scripts are stashed.', significance: 'Where the conspiracy is planned and the swap happens.' },
    { name: 'The Front Row', description: 'Five ornate chairs reserved for the Censor Board. Lord Ashvale sits center.', significance: 'Where the antagonist watches his son\'s truth unfold.' },
  ],
  dataSystems: ['socialEncounter', 'npcBackstoryGen'],
};
