import type { OneShotCampaign } from '../types';

export const theVeteran: OneShotCampaign = {
  id: 'oneshot-veteran',
  type: 'oneshot',
  title: 'The Veteran',
  tagline: 'A one-armed veteran begging in the street was once the greatest swordsman alive. What happened?',
  tone: 'serious',
  themes: ['war', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A party member recognizes a beggar in the street: Kael Drennan, once legendary as the finest swordsman in the kingdom. He is missing an arm, dressed in rags, and does not seem to recognize anyone. The party investigates how the greatest blade alive ended up on the street.',
  hook: 'A beggar holds out a cup. A party member does a double take. That face. Older, thinner, but unmistakable. Kael Drennan won the Grand Tournament three times. His sword arm is gone at the shoulder. He looks through the party member like they are not there.',
  twist: 'Kael did not lose his arm in battle. He cut it off himself. After the last war, he was ordered to execute prisoners. He refused. His commander took his rank, his pension, and his reputation. Kael cut off his own sword arm so he could never be ordered to use it again. The kingdom calls him a deserter. He calls himself free.',
  climax: 'The party must decide whether to restore Kael\'s reputation (which he does not want), help him on his own terms (which means accepting his choice), or confront the commander who destroyed him (who is now a celebrated general).',
  scenes: [
    {
      title: 'Scene 1: The Beggar',
      summary: 'Finding Kael and trying to understand what happened to him. He is not forthcoming. He is not interested in help.',
      challenge: 'social',
      keyEvents: [
        'The recognition: a legend reduced to begging, unrecognized by everyone but the party',
        'Kael refuses to talk about the past. He is not angry. He is done',
        'Other veterans on the street know him. "He does not take charity. He does not take pity."',
        'A clue: Kael\'s stump is surgically clean. Not a battle wound. A deliberate cut',
      ],
    },
    {
      title: 'Scene 2: The Story',
      summary: 'Investigating what happened. Military records, fellow soldiers, and the commander who stripped Kael of everything.',
      challenge: 'exploration',
      keyEvents: [
        'Military records: "Discharged for insubordination. Refused direct order."',
        'Fellow soldiers: "He was ordered to kill prisoners. Women and children among them."',
        'The commander: General Hadren, now celebrated, who gave the order and punished the refusal',
        'Kael\'s choice: he cut off his arm the night after the order, in front of his entire company',
      ],
    },
    {
      title: 'Scene 3: The Choice',
      summary: 'What does the party do with the truth? Kael does not want restoration. He wants to be left alone. But the truth matters.',
      challenge: 'social',
      keyEvents: [
        'Confront Hadren: he denies everything. Official records support him. Kael has no proof',
        'Restore Kael: he refuses. "I did not lose my arm. I gave it up. There is a difference."',
        'Help on his terms: a meal, a coat, respect. Not pity, not a campaign, not a cause',
        'The party carries the truth. What they do with it defines the ending',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Kael Drennan', role: 'the question', personality: 'Once the greatest swordsman alive. Now a one-armed beggar by choice. He is not broken. He made a decision that cost him everything and he would make it again. "I could not swing a sword and call myself a good man. So I chose."' },
    { name: 'General Hadren', role: 'antagonist', personality: 'The commander who ordered the execution of prisoners and destroyed Kael for refusing. Celebrated, powerful, and certain that history will remember him as a hero. He might be right.' },
    { name: 'Corporal Senna', role: 'witness', personality: 'A soldier who served under Kael and watched him cut off his own arm. She has carried the truth for years. "He stood in front of the whole company and said, \'This arm will not do what you ask.\' Then he took a field knife and..."' },
  ],
  keyLocations: [
    { name: 'The Street Corner', description: 'Where a legend begs for coins and nobody recognizes him.', significance: 'The starting image. The gap between who Kael was and where he is.' },
    { name: 'The Military Archives', description: 'Where the official record tells one story and the truth tells another.', significance: 'Where the party learns what happened and why the records lie.' },
    { name: 'Hadren\'s Estate', description: 'A general\'s manor built on the reputation of a war that included orders to kill prisoners.', significance: 'Where the party confronts the man responsible and discovers the limits of justice.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'detectiveCase', 'moralDilemma', 'npcRelationship'],
};
