import type { OneShotCampaign } from '../types';

export const theEmptyChair: OneShotCampaign = {
  id: 'oneshot-empty-chair',
  type: 'oneshot',
  title: 'The Empty Chair',
  tagline: 'A family dinner with an empty chair. The person who sat there disappeared a year ago. Tonight, the chair is warm.',
  tone: 'serious',
  themes: ['mystery', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The party is invited to dinner at the home of a merchant family as thanks for a prior favor. One chair at the table is empty. The family sets a plate there every night for Tommas, the eldest son, who vanished a year ago. Tonight, when the party sits down, the empty chair is warm. A handprint appears in the condensation on the unused glass.',
  hook: 'The mother freezes when she touches the chair. "It is warm. It has never been warm." The glass fogs as they watch. A finger traces letters in the condensation: H-E-L-P.',
  twist: 'Tommas is not dead. He is trapped in a mirror in the house\'s attic, placed there by a rival merchant who used a cursed looking glass to imprison him. The rival has been slowly taking over the family business. Tommas has been trying to reach his family for a year, but the mirror only connects to the house during family meals when emotions run high.',
  climax: 'The party must find the mirror in the attic, break the curse without shattering the glass (which would kill Tommas), and confront the rival merchant who has been visiting the family as a "concerned friend."',
  scenes: [
    {
      title: 'Scene 1: The Dinner',
      summary: 'A family dinner that becomes a seance. The empty chair communicates. The family is terrified and hopeful.',
      challenge: 'social',
      keyEvents: [
        'The warm chair, the fogged glass, the traced letters: Tommas is present but not visible',
        'Communication: yes/no questions answered by knocks, single words traced in condensation',
        'Tommas reveals: he is trapped, he is in the house, someone put him there',
        'The family\'s reactions: the mother is determined, the father is skeptical, the sister believes',
      ],
    },
    {
      title: 'Scene 2: The Mirror',
      summary: 'Searching the house for where Tommas is imprisoned. The attic mirror is the answer, but it is warded and dangerous.',
      challenge: 'puzzle',
      keyEvents: [
        'Searching the house: Tommas guides them with temperature changes, warm means closer',
        'The attic: dusty, forgotten, with a covered mirror that radiates cold',
        'The mirror: Tommas is visible inside, pounding on the glass, aging normally, terrified',
        'The ward: breaking it requires understanding who placed it and why',
      ],
    },
    {
      title: 'Scene 3: The Rival',
      summary: 'Confronting the person who cursed Tommas. He is downstairs, having arrived for dinner as a "family friend."',
      challenge: 'combat',
      keyEvents: [
        'The rival merchant: arrived at the house during the search, acting concerned',
        'Evidence links him: the curse matches items he gifted the family',
        'Confrontation: he denies everything, then panics when the party reveals the mirror',
        'Breaking the curse: the rival has the counter-phrase, willingly or not, Tommas is freed',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Tommas Veren', role: 'the trapped', personality: 'Visible only in the mirror. Pounds on the glass with flat palms. Mouths words that make no sound. When he sees his mother, he presses his hand against the glass and does not move it. He has watched his family eat dinner every night for a year, three feet away, unable to make a sound.' },
    { name: 'Elara Veren', role: 'the mother', personality: 'Sets the plate with careful hands every night. Knife and fork exactly right. Stands too quickly when she hears the chair is warm. Grabs the nearest party member by the arm. "Tell me where he is. I will tear this house apart with my hands. Tell me where my son is."' },
    { name: 'Merchant Calder Brynn', role: 'antagonist', personality: 'Arrives with flowers and condolences, as he does every week. Laughs too easily. Touches his collar when he lies. "Terrible business about Tommas. I think of him often." He has been dining at this table for a year, sitting across from the chair of the man he imprisoned, making small talk with the family he is robbing.' },
  ],
  keyLocations: [
    { name: 'The Veren Home', description: 'A warm merchant household where an empty chair is set at every dinner.', significance: 'The entire adventure takes place in and around this house.' },
    { name: 'The Dining Room', description: 'A family table with one empty chair that is warm for the first time in a year.', significance: 'Where contact is made and the mystery begins.' },
    { name: 'The Attic', description: 'A dusty forgotten space containing a warded mirror with a man trapped inside.', significance: 'Where Tommas is found and the curse must be broken.' },
  ],
  dataSystems: ['detectiveCase', 'npcDialogue', 'socialEncounter', 'puzzleLock', 'combatNarration'],
};
