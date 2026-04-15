import type { OneShotCampaign } from '../types';

export const theChildsQuestion: OneShotCampaign = {
  id: 'oneshot-childs-question',
  type: 'oneshot',
  title: 'The Child\'s Question',
  tagline: 'A child asks: "Where do people go when they die?" The one-shot is about finding a real answer.',
  tone: 'serious',
  themes: ['planar', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'A child whose mother recently died asks the party a simple question: "Where do people go when they die?" Not what the temple says. Not what the storybooks say. A real answer. The party, moved by the question, sets out to find one. In a world where the afterlife is verifiably real, this should be easy. It is not.',
  hook: 'The child, Moss, sits on a temple step after the funeral. The priests gave their answer. It was not enough. Moss looks at the party with the devastating clarity of a child who knows when adults are guessing. "You fight monsters. You go to dangerous places. Have you ever seen where people go?"',
  twist: 'The answer is different for everyone. The party consults a cleric, a necromancer, a ghost, and a planar scholar. Each gives a different answer, all true from their perspective. The afterlife is not one place. It is shaped by belief, by action, by the god one worships. The real answer to Moss\'s question is: "Your mother went where she believed she would go. And she believed in somewhere good."',
  climax: 'The party returns to Moss with not one answer but many, and the honest truth that nobody knows for certain but that every source they found pointed to something good. Moss decides what to believe. The party does too.',
  scenes: [
    {
      title: 'Scene 1: The Question',
      summary: 'Moss asks the question and the party decides to find a real answer. They visit the temple, which gives doctrine, not truth.',
      challenge: 'social',
      keyEvents: [
        'The funeral: Moss\'s mother, a kind woman, gone to illness',
        'The temple answer: "She is with the gods." Moss: "Which gods? She prayed to three."',
        'The party promises to find out. They begin consulting sources of genuine knowledge',
        'First stop: a cleric who can cast Speak with Dead, who offers a sobering perspective',
      ],
    },
    {
      title: 'Scene 2: The Search',
      summary: 'Consulting multiple sources: a cleric, a reformed necromancer, a willing ghost, and a planar scholar. Each has a different true answer.',
      challenge: 'exploration',
      keyEvents: [
        'The cleric: "The soul goes to its patron deity. But what of those with no patron?"',
        'The necromancer: "I have pulled souls back. They come from different places. All of them real."',
        'The ghost: "I am still here because I chose to stay. Others chose to go. I do not know where."',
        'The scholar: "The planes are real. The afterlife is mapped. But the maps disagree."',
      ],
    },
    {
      title: 'Scene 3: The Answer',
      summary: 'Returning to Moss with the truth: not one answer but many, and the honest admission that certainty is impossible but hope is justified.',
      challenge: 'social',
      keyEvents: [
        'The party presents what they learned, honestly, without simplifying',
        'Moss listens carefully. Children understand more than adults expect',
        'The core truth: every source agrees the soul persists. Where it goes depends on belief',
        'Moss\'s conclusion: "She believed in the garden. So she is in the garden." It is enough',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Moss', role: 'the question', personality: 'A 7-year-old who just lost their mother and is too smart for easy answers. Not precocious in a cute way. Smart in a way that makes adults uncomfortable. "The priest said she is with the gods. But he says that about everyone. It cannot be true for all of them."' },
    { name: 'Cleric Arden', role: 'one answer', personality: 'A genuine, thoughtful cleric who admits the limits of their knowledge. "I have faith. Faith is not the same as knowing. I wish I could tell you I know."' },
    { name: 'Vesper', role: 'another answer', personality: 'A ghost who stayed behind and can describe the moment of choice: going somewhere or staying. "I saw a door. I chose not to go through it. Others did. They seemed happy." She does not know what is behind the door.' },
  ],
  keyLocations: [
    { name: 'The Temple Steps', description: 'Where Moss sits after the funeral and asks the question that starts everything.', significance: 'Where the question is asked and the answer is eventually delivered.' },
    { name: 'The Scholar\'s Tower', description: 'A planar researcher\'s cluttered study with maps of the afterlife that disagree with each other.', significance: 'Where the party learns that even experts do not agree on the answer.' },
    { name: 'The Graveyard', description: 'Where Moss\'s mother is buried and where a ghost offers their perspective on what comes after.', significance: 'A place of both grief and the closest thing to a firsthand account.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'planarTravel', 'npcRelationship', 'moralDilemma'],
};
