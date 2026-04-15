import type { OneShotCampaign } from '../types';

export const theVeteran: OneShotCampaign = {
  id: 'oneshot-veteran',
  type: 'oneshot',
  title: 'The Veteran',
  tagline: 'The greatest swordsman who ever lived is begging for coppers in the rain. His sword arm is gone. He cut it off himself.',
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
        'A party member does a double take at the beggar\'s face. That jaw. That scar. Grand Tournament champion, three years running. Holding a tin cup in the rain',
        'Kael looks through them. Not angry. Not broken. Just done. "I do not do stories anymore."',
        'A one-legged veteran nearby: "You know who that is? Course you do not. Nobody does. He prefers it."',
        'The stump: surgically clean. No ragged scar, no combat damage. A deliberate, single cut. He did this to himself',
      ],
    },
    {
      title: 'Scene 2: The Story',
      summary: 'Investigating what happened. Military records, fellow soldiers, and the commander who stripped Kael of everything.',
      challenge: 'exploration',
      keyEvents: [
        'Military records: one line. "Discharged for insubordination. Refused direct order." The file is thin. Suspiciously thin',
        'A soldier who was there, drinking alone in a tavern: "The order was to execute prisoners. Women. Children. He said no. Then he said something I will never forget."',
        'General Hadren: celebrated hero, medal collection, portrait in the war museum. He gave the order. He destroyed Kael for refusing it',
        'Kael stood in front of his entire company that night. He said, "This arm will not do what you ask." Then he took a field knife and the company watched in silence',
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
    { name: 'Kael Drennan', role: 'the question', personality: 'Speaks in short, flat sentences. No self-pity. Refuses to make eye contact at first. When he finally talks, he picks at the hem of his sleeve. "I could not swing a sword and call myself a good man. So I chose. You want the story to be more complicated than that. It is not."' },
    { name: 'General Hadren', role: 'antagonist', personality: 'Booming laugh. Claps people on the shoulder. Tells war stories at dinner parties. "Drennan? A coward. Could not handle the reality of command. Some men are not built for hard choices." He says this while pouring expensive wine in a manor built on a war pension.' },
    { name: 'Corporal Senna', role: 'witness', personality: 'Drinks steadily but never seems drunk. Stares at the table when she talks. Long pauses between sentences. "Nobody moved. Nobody spoke. Just the sound of the knife. And then he held up his arm - the one that was still attached - and said, \'I am free now.\' Then he walked out the gate."' },
  ],
  keyLocations: [
    { name: 'The Street Corner', description: 'Where a legend begs for coins and nobody recognizes him.', significance: 'The starting image. The gap between who Kael was and where he is.' },
    { name: 'The Military Archives', description: 'Where the official record tells one story and the truth tells another.', significance: 'Where the party learns what happened and why the records lie.' },
    { name: 'Hadren\'s Estate', description: 'A general\'s manor built on the reputation of a war that included orders to kill prisoners.', significance: 'Where the party confronts the man responsible and discovers the limits of justice.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'detectiveCase', 'moralDilemma', 'npcRelationship'],
};
