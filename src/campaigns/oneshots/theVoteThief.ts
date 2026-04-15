import type { OneShotCampaign } from '../types';

export const theVoteThief: OneShotCampaign = {
  id: 'oneshot-vote-thief',
  type: 'oneshot',
  title: 'The Vote Thief',
  tagline: 'Election night. Someone is magically altering ballots. You have until dawn to save democracy.',
  tone: 'political',
  themes: ['political', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The city of Aldenmere holds its first free election after decades of noble rule. A reform candidate threatens the old guard. On election night, poll workers discover that enchanted ink is rewriting ballots mid-count. The party is a citizen watchdog group tasked with protecting the vote.',
  hook: 'A panicked poll worker rushes to the party: "The ballots are changing. I watched a vote for Maren rewrite itself to say Lord Duskfall. The ink is alive. If we do not find the source by dawn count, the election is stolen and nobody will believe us."',
  twist: 'The enchantment is not coming from Lord Duskfall\'s camp. His own chief of staff planted it - without Duskfall\'s knowledge - because she genuinely believes the reform candidate will destroy the city\'s economy. She is not evil. She is scared. And she is wrong.',
  climax: 'The party confronts the chief of staff in the counting hall as the final ballots are tallied. She has a wand that controls the ink. She makes her case - reform will cause chaos, people will starve. The party must disarm her (combat or persuasion) and decide: expose her publicly (destroying Duskfall\'s legitimate campaign too) or handle it quietly (justice vs. political fallout).',
  scenes: [
    {
      title: 'Scene 1: The Discovery',
      summary: 'The party investigates the polling stations and discovers the enchanted ink pattern. The ballots are changing in three specific districts.',
      challenge: 'exploration',
      keyEvents: [
        'Examining ballots: the ink is transmutation magic, high-level, applied to the paper before distribution',
        'Pattern recognition: only ballots in working-class districts are affected',
        'Interviewing poll workers: one saw a woman in fine clothes visiting the paper mill yesterday',
        'The clock is ticking: the count finishes at dawn, four hours away',
      ],
    },
    {
      title: 'Scene 2: The Paper Trail',
      summary: 'Tracing the enchanted paper back to its source. The party follows the supply chain from polling station to paper mill to the person who placed the order.',
      challenge: 'exploration',
      keyEvents: [
        'The paper mill: the night foreman was paid to let someone enchant a specific batch',
        'The payment: traced to a discretionary fund in Lord Duskfall\'s campaign office',
        'The campaign office: Duskfall is genuinely asleep and unaware - his chief of staff Velara is missing',
        'A choice: wake Duskfall and warn him, or find Velara first',
      ],
    },
    {
      title: 'Scene 3: The Counting Hall',
      summary: 'Confrontation with Velara as the final count approaches. She is in the counting hall with the control wand, ready to finalize the stolen election.',
      challenge: 'social',
      keyEvents: [
        'Velara\'s argument: "Maren\'s reforms will collapse trade agreements. Thousands will lose work. I am saving them."',
        'The party must counter her logic or disarm her - combat risks destroying ballots',
        'If persuaded, Velara breaks down: she has been awake for three days, terrified of change',
        'The aftermath: the true count, the announcement, and what happens to Velara',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Velara Ashton', role: 'antagonist', personality: 'Duskfall\'s chief of staff. Brilliant, exhausted, genuinely believes she is preventing economic collapse. Not corrupt - just convinced she knows better than the voters.', secret: 'Her family lost everything in the last economic downturn. Her fear is personal, not political.' },
    { name: 'Candidate Maren Lowe', role: 'reform candidate', personality: 'A former teacher who ran on workers\' rights and public education. Calm, principled, and completely unaware that her election is being stolen.' },
    { name: 'Lord Duskfall', role: 'unwitting figure', personality: 'An old-money noble who genuinely wanted to win fairly. Horrified when he learns what Velara did. His reaction depends on how the party handles it.' },
  ],
  keyLocations: [
    { name: 'The Counting Hall', description: 'A converted warehouse where ballots from all districts are brought for the final count. Long tables, oil lamps, tired volunteers.', significance: 'Where the climax happens and the election is decided.' },
    { name: 'Thornwick Paper Mill', description: 'A riverside mill that supplied all the ballot paper. Smells like wet pulp and lye. The night crew is nervous.', significance: 'Where the enchantment was applied to the ballots.' },
    { name: 'Duskfall Campaign Office', description: 'A well-appointed townhouse with campaign posters and cold coffee. Velara\'s desk is covered in economic projections and half-finished letters.', significance: 'Where the party discovers Velara\'s motive and trail.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'questRewardNegotiation'],
};
