import type { OneShotCampaign } from '../types';

export const theUnsent: OneShotCampaign = {
  id: 'oneshot-unsent',
  type: 'oneshot',
  title: 'The Unsent',
  tagline: 'A post office where undeliverable letters pile up. The oldest one is 50 years undelivered. Both sender and recipient are alive.',
  tone: 'serious',
  themes: ['social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Dead Letter Office in the capital holds thousands of undeliverable letters. A clerk discovers the oldest one, 50 years undelivered, and realizes both the sender and recipient are still alive in the same city. The party is hired to deliver it and close the oldest case in the office\'s history.',
  hook: 'The clerk holds up a yellowed envelope. "This letter has been sitting in our vault for 50 years. Wrong address, returned, readdressed, returned again. The sender and recipient both live in this city. They are both in their 70s. I do not know what is inside, but 50 years is long enough."',
  twist: 'The letter is from a woman to her twin sister. They had a catastrophic falling out over a man 50 years ago and never spoke again. The letter is an apology. The sister moved addresses six times to avoid being found. They live four blocks apart and do not know it.',
  climax: 'Delivering the letter means reopening a wound half a century old. The recipient may not want to read it. The sender may not remember writing it. The party must navigate decades of hurt, stubbornness, and the possibility that some apologies come too late.',
  scenes: [
    {
      title: 'Scene 1: The Sender',
      summary: 'Finding the letter\'s author and learning why she wrote it 50 years ago. She is surprised it was never delivered.',
      challenge: 'social',
      keyEvents: [
        'The sender: Ilsa, 74, a retired seamstress living alone. Sharp, proud, and lonely',
        'She remembers the letter. She wrote it the day after the argument and has regretted the silence since',
        'She thought her sister received it and chose not to respond',
        'Learning the letter was never delivered changes everything: "She never knew I was sorry?"',
      ],
    },
    {
      title: 'Scene 2: The Recipient',
      summary: 'Finding the sister and approaching her with a letter she does not expect. She has built 50 years of justified anger.',
      challenge: 'social',
      keyEvents: [
        'The recipient: Marta, 74, a retired baker, four blocks from her sister. Also alone',
        'She refuses the letter initially. "I have nothing to say to her. Fifty years of nothing."',
        'The party must convince her to at least read it, or accept her refusal',
        'If she reads it: the anger cracks. The apology is exactly what she needed to hear, decades ago',
      ],
    },
    {
      title: 'Scene 3: The Bridge',
      summary: 'The question is not whether the letter is delivered. It is whether two old women can rebuild something after 50 years of silence.',
      challenge: 'social',
      keyEvents: [
        'The party can arrange a meeting or let the letter speak for itself',
        'If they meet: it is awkward, painful, and eventually tender. They have so much to say',
        'If they do not: Marta writes a response. The party delivers it. The cycle begins again, but with hope',
        'The clerk at the Dead Letter Office closes the file. Oldest case resolved',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Ilsa Grent', role: 'the sender', personality: 'A proud, lonely woman who wrote an apology 50 years ago and spent her life thinking it was ignored. Learning it was never delivered is worse than being rejected.' },
    { name: 'Marta Grent', role: 'the recipient', personality: 'A stubborn, hurt woman who built her identity around being wronged. She moved six times to avoid her sister. The letter, if she reads it, demolishes five decades of certainty.' },
    { name: 'Clerk Fenn', role: 'quest giver', personality: 'A fastidious postal worker who takes undelivered mail personally. "Every letter is a conversation that never happened. Fifty years of silence is enough."' },
  ],
  keyLocations: [
    { name: 'The Dead Letter Office', description: 'A vault of thousands of undeliverable letters, sorted by decade, gathering dust.', significance: 'Where the quest begins and the weight of unspoken words is made physical.' },
    { name: 'Ilsa\'s Apartment', description: 'A small, tidy flat with sewing projects and no photographs of family.', significance: 'Where the party meets the sender and learns the letter\'s context.' },
    { name: 'Marta\'s Bakery (retired)', description: 'A closed bakery where Marta lives upstairs, four blocks from the sister she does not know is there.', significance: 'Where the letter is delivered and the story reaches its emotional peak.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'detectiveCase', 'moralDilemma', 'npcRelationship'],
};
