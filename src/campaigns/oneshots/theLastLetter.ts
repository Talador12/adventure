import type { OneShotCampaign } from '../types';

export const theLastLetter: OneShotCampaign = {
  id: 'oneshot-last-letter',
  type: 'oneshot',
  title: 'The Last Letter',
  tagline: 'A soldier\'s last letter home was never sent. The party delivers it. The family has moved on.',
  tone: 'serious',
  themes: ['war', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The party finds a sealed letter in the belongings of a fallen soldier at a battlefield memorial. The letter is addressed to his family in a village three days\' travel away. It was written the night before the battle that killed him, 10 years ago. The party decides to deliver it.',
  hook: 'The letter is water-stained but intact. The seal is unbroken. A name and village are clearly written on the front. The battlefield caretaker says: "We find these sometimes. Usually too late. This one might still matter."',
  twist: 'The letter does not contain goodbyes. It contains a confession. The soldier deserted his post the night before the battle, leaving his unit exposed. He went back at dawn and died fighting to cover his mistake. The family believes he was a hero. The letter reveals he was both a coward and a hero in the same night.',
  climax: 'The party must decide whether to deliver the letter as-is, destroy it to preserve the family\'s memory, or find a way to tell the truth that honors both the failure and the redemption.',
  scenes: [
    {
      title: 'Scene 1: The Journey',
      summary: 'Traveling to the village with the letter. The party meets people who knew the soldier and hears stories about him.',
      challenge: 'social',
      keyEvents: [
        'A fellow veteran on the road who served with the soldier: "Good man. Brave man."',
        'A shrine at a crossroads with the soldier\'s name among the honored dead',
        'A merchant who sold the soldier his last provisions: "He was nervous. More than usual."',
        'The village comes into view: small, peaceful, with a war memorial in the square',
      ],
    },
    {
      title: 'Scene 2: The Family',
      summary: 'Meeting the soldier\'s family. His wife remarried. His son, now a teenager, worships his father\'s memory. A statue of the soldier stands in the village square.',
      challenge: 'social',
      keyEvents: [
        'The widow: kind, remarried, at peace. She has mourned and moved forward',
        'The son: 16, wears his father\'s medal, plans to enlist. His father is his hero',
        'The statue: erected by the village after the battle, inscribed "He stood when others fell"',
        'The party reads the letter privately and discovers its contents',
      ],
    },
    {
      title: 'Scene 3: The Decision',
      summary: 'What to do with the letter. Every option has consequences for a family that has built their lives around a version of the truth.',
      challenge: 'social',
      keyEvents: [
        'Deliver it whole: the family learns the full truth, the son\'s image of his father shatters',
        'Destroy it: the hero narrative survives, but the soldier\'s actual redemption goes unrecognized',
        'Edit the truth: find a way to honor the man who ran and the man who came back',
        'No matter what, the party carries the weight of the decision',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Maren Ashwick', role: 'the widow', personality: 'A strong woman who grieved, healed, and built a new life. She does not need the letter. But she would want to know the truth if asked. "I loved him. All of him. Even the parts I did not know."' },
    { name: 'Dorin Ashwick', role: 'the son', personality: 'A 16-year-old who never knew his father and has built an identity around his heroism. Earnest, idealistic, and about to enlist. The letter could change everything for him.' },
    { name: 'Sergeant Brannick', role: 'witness', personality: 'A veteran on the road who served with the soldier. He knows the truth but never told anyone. "He ran. Then he came back. That second part matters more."' },
  ],
  keyLocations: [
    { name: 'The Battlefield Memorial', description: 'A quiet field with rows of markers. Where the letter was found.', significance: 'The starting point and the weight of war.' },
    { name: 'Ashwick Village', description: 'A peaceful village with a war memorial and a statue of a man who was more complicated than anyone knew.', significance: 'The destination and the community built on a partial truth.' },
    { name: 'The Family Home', description: 'A warm house with a medal on the mantle and a son who wants to be his father.', significance: 'Where the decision is made and its consequences are felt.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'travelEncounter', 'moralDilemma', 'npcRelationship'],
};
