import type { OneShotCampaign } from '../types';

export const theTeachersStand: OneShotCampaign = {
  id: 'oneshot-teachers-stand',
  type: 'oneshot',
  title: 'The Teacher\'s Stand',
  tagline: 'She taught real history. They fired her. Tomorrow morning, every student in the Academy walks out.',
  tone: 'political',
  themes: ['political', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2.5,
  settingSummary:
    'Professor Mira Sandoval taught the real history of the Conquest - not the heroic version in the approved textbooks, but the one with displacement, broken treaties, and cultural erasure. The Academy Board fired her. Her students want to walk out in protest. The party helps them organize a peaceful demonstration that cannot be ignored.',
  hook: 'A student named Fen knocks on the party\'s door: "Professor Sandoval was fired for teaching the truth about the Conquest. The Board says she was \'promoting division.\' She was promoting history. We are walking out tomorrow morning. We need help making sure it works and nobody gets hurt."',
  twist: 'The Academy Board chair, Headmaster Corvin, was Professor Sandoval\'s student twenty years ago. She taught him the same history. He knows it is true. He fired her because the city\'s noble families - who fund the Academy - threatened to pull funding. He chose the institution over the truth and hates himself for it.',
  climax: 'The walkout. Students leave their classrooms and gather in the Academy courtyard. The Board calls the city guard. The party must keep the demonstration peaceful, protect the students, and force a public reckoning. Headmaster Corvin arrives and must choose: stand with his students or with the nobles\' money.',
  scenes: [
    {
      title: 'Scene 1: Organizing',
      summary: 'The party helps students plan a walkout that is safe, visible, and impossible to dismiss. This means flyers, allies, and a message.',
      challenge: 'social',
      keyEvents: [
        'Meeting the students: passionate, scared, ranging from age 14 to 20, diverse backgrounds',
        'The message: not just about Sandoval - about what history the Academy teaches and why',
        'Allies: sympathetic teachers, a journalist from the city paper, parents who support their kids',
        'Logistics: when, where, what to say, what to do if the guards come',
      ],
    },
    {
      title: 'Scene 2: The Night Before',
      summary: 'Opposition materializes. Someone is trying to discredit the walkout before it happens. The party must protect the movement.',
      challenge: 'exploration',
      keyEvents: [
        'Anonymous threats: notes slipped under student doors warning of expulsion',
        'A planted rumor: someone is spreading word that the walkout is actually a riot',
        'The journalist: willing to cover the story but needs proof of Sandoval\'s firing cause',
        'Professor Sandoval: visited in her home, she gives the party her teaching notes as evidence',
      ],
    },
    {
      title: 'Scene 3: The Walkout',
      summary: 'Morning. Students stream out of classrooms. The Board panics. The guards arrive. The party keeps the peace.',
      challenge: 'social',
      keyEvents: [
        'The walkout begins: dozens of students, then a hundred, filling the courtyard',
        'The city guard arrives: they do not want to arrest children but they have orders',
        'The speech: a student reads from Sandoval\'s notes - the real history, spoken aloud',
        'Headmaster Corvin: arrives, sees his own students, and must choose publicly',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Professor Mira Sandoval', role: 'inspiration', personality: 'Teaches even when she is not teaching. Points at things and asks questions instead of giving answers. "Why do you think they rewrote that chapter? What are they afraid you will learn?" Packs her books slowly, like she is leaving a friend\'s house for the last time.' },
    { name: 'Fen', role: 'student leader', personality: 'Talks too fast when nervous, which is always. Carries a list of every student who said yes and rereads it when she doubts herself. Practices her walkout speech in the mirror and hates every version. Seventeen years old and carrying something that should weigh more than she does.' },
    { name: 'Headmaster Corvin', role: 'conflicted authority', personality: 'Pauses too long before answering questions about Sandoval. Straightens things on his desk that are already straight. When students quote Sandoval\'s lessons back to him, his jaw tightens and he looks out the window.', secret: 'He kept Sandoval\'s original history textbook in his desk drawer for twenty years.' },
  ],
  keyLocations: [
    { name: 'Aldwick Academy', description: 'A stone campus with ivy-covered walls, lecture halls, and a central courtyard large enough for every student.', significance: 'Where the walkout happens and the confrontation takes place.' },
    { name: 'Sandoval\'s Home', description: 'A modest cottage full of books, maps, and primary-source documents. The walls are covered in student artwork.', significance: 'Where the truth is documented and the evidence lives.' },
    { name: 'The Courtyard', description: 'The heart of the Academy. A fountain, stone benches, and enough space for a crowd. Today it becomes a stage.', significance: 'Where the students make their stand.' },
  ],
  dataSystems: ['socialEncounter', 'npcBackstoryGen'],
};
