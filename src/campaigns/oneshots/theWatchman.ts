import type { OneShotCampaign } from '../types';

export const theWatchman: OneShotCampaign = {
  id: 'oneshot-watchman',
  type: 'oneshot',
  title: 'The Watchman',
  tagline: 'A guard watched the same gate for 30 years. Tonight is his last shift. One story does not add up.',
  tone: 'serious',
  themes: ['mystery', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The party passes through a city gate on the night a veteran watchman, Brenn, works his final shift before retirement. He offers them tea and begins telling stories about the people who have passed through his gate over 30 years. The stories are fascinating. One of them describes a traveler whose details do not match anyone who exists. The party starts listening more carefully.',
  hook: 'Brenn pours tea from a battered kettle. "Thirty years at this gate. I remember every face. Let me tell you about the strangest ones." His stories are warm, funny, and sharp. Then he describes a woman who arrived 15 years ago, and the details contradict what the party knows about the world.',
  twist: 'The woman in the story is Brenn himself. Fifteen years ago, Brenn was cursed and forced to live as someone else for a year. The person who cursed him passed through the gate that same night and Brenn could not stop them because he did not know who he was at the time. He has been watching the gate for 15 years, waiting for the cursor to return. Tonight is not his retirement. It is the night the cursor finally comes back.',
  climax: 'The cursor arrives at the gate at midnight. Brenn has waited 15 years for this. The party must help him confront the person who stole a year of his life, or talk him out of revenge and toward a retirement he has earned.',
  scenes: [
    {
      title: 'Scene 1: The Stories',
      summary: 'Brenn tells stories about 30 years of travelers. Each is a miniature tale. One does not fit.',
      challenge: 'social',
      keyEvents: [
        'Story 1: a merchant who always lied about his cargo (funny, harmless)',
        'Story 2: a couple who eloped through the gate at dawn (romantic, sweet)',
        'Story 3: a woman who arrived with no name, no memory, and no past (this one is wrong)',
        'The party notices inconsistencies if they ask questions about Story 3',
      ],
    },
    {
      title: 'Scene 2: The Truth',
      summary: 'Pressing Brenn on the inconsistent story reveals the curse, the lost year, and why he never retired.',
      challenge: 'social',
      keyEvents: [
        'Brenn admits the woman was him. The curse made him forget himself for a full year',
        'During that year, the cursor passed through the gate freely',
        'Brenn has tracked the cursor\'s pattern: they pass through every 15 years, always at midnight',
        'Tonight is the night. Brenn is not retiring. He is settling a debt',
      ],
    },
    {
      title: 'Scene 3: Midnight',
      summary: 'The cursor arrives. Brenn confronts them. The party must decide whether to support justice, mercy, or restraint.',
      challenge: 'combat',
      keyEvents: [
        'Midnight: a cloaked figure approaches the gate. Brenn stands. "I remember you now."',
        'The cursor: a fey creature that steals identities for amusement, returning every 15 years',
        'Combat or negotiation: the fey is powerful but not prepared for Brenn to remember',
        'Resolution: Brenn gets his answer, the fey is dealt with, and the old watchman can finally rest',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Brenn Marsh', role: 'quest giver / protagonist', personality: 'A veteran gatekeep with 30 years of stories and one unfinished piece of business. Patient as stone, sharp as a blade, and ready for tonight. "I have watched this gate for 30 years. Not because I love the work. Because someone is coming back."' },
    { name: 'The Cursor', role: 'antagonist', personality: 'A fey entity that steals identities for sport, passing through mortal gates on a 15-year cycle. Amused by Brenn\'s persistence but underestimates his resolve.' },
    { name: 'Guard Captain Thren', role: 'framing device', personality: 'Brenn\'s superior who organized the retirement party. She has no idea why Brenn insisted on working tonight instead of attending. "The man has earned his rest. He will not take it."' },
  ],
  keyLocations: [
    { name: 'The City Gate', description: 'A stone gate manned by one watchman for 30 years, with a kettle, a chair, and 30 years of memories.', significance: 'The entire adventure takes place here. One gate, one night, one confrontation.' },
    { name: 'The Gatehouse', description: 'A small room behind the gate where Brenn keeps his kettle, his logbook, and his stories.', significance: 'Where the stories are told and the truth is revealed.' },
    { name: 'The Road Beyond', description: 'The approach to the gate, visible from Brenn\'s post, where the cursor will appear at midnight.', significance: 'The direction Brenn has been watching for 15 years.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'detectiveCase', 'combatNarration', 'feyEncounter'],
};
