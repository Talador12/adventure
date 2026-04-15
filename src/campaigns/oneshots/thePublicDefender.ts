import type { OneShotCampaign } from '../types';

export const thePublicDefender: OneShotCampaign = {
  id: 'oneshot-public-defender',
  type: 'oneshot',
  title: 'The Public Defender',
  tagline: 'A goblin stole medicine for his sick child. He is guilty. You are his defense. Make it matter.',
  tone: 'political',
  themes: ['political', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Grix the goblin broke into an apothecary and stole fever medicine. His daughter is dying. He is guilty. The law is clear. But the law does not ask why. The party is appointed as his public defenders. Their job is not to prove innocence - it is to prove that justice requires context.',
  hook: 'The court clerk hands the party a case file: "Defendant Grix. Goblin. Breaking and entering, theft. Open and shut. He has no money, no lawyer, no chance. You are his chance. Trial starts in four hours. Good luck."',
  twist: 'The apothecary owner, Master Hale, has been selling diluted medicine to goblin customers at full price for years. Grix\'s daughter got sicker because the "medicine" he bought legally was watered down. Grix stole the real thing when the fake stuff stopped working. The theft is a symptom of a bigger crime nobody has prosecuted.',
  climax: 'The trial. The prosecution presents a clean case: goblin broke in, goblin stole goods, done. The party presents Grix\'s story, the diluted medicine evidence, and puts the system itself on trial. The judge must decide: punish the theft, or acknowledge the failure that caused it.',
  scenes: [
    {
      title: 'Scene 1: The Client',
      summary: 'Meeting Grix in jail. Understanding his story. Building a defense from empathy and evidence.',
      challenge: 'social',
      keyEvents: [
        'Grix: small, scared, worried about his daughter, not about himself',
        'The story: his daughter Pip has fever sickness, the bought medicine did not work, he panicked',
        'The evidence: Grix still has the receipt for the medicine he bought legally - it cost his entire savings',
        'The question: why did the legal medicine not work?',
      ],
    },
    {
      title: 'Scene 2: The Investigation',
      summary: 'Digging into the apothecary\'s practices. Finding the pattern of exploitation that led to this moment.',
      challenge: 'exploration',
      keyEvents: [
        'The apothecary: two price lists hidden in a drawer - one for humans, one for goblins (higher)',
        'The medicine: samples from Grix\'s purchased bottle vs. what he stole - different concentrations',
        'Other goblin customers: a pattern of diluted medicine sold at premium prices to non-human buyers',
        'A sympathetic apprentice: confirms Hale has been cutting goblin medicine for years',
      ],
    },
    {
      title: 'Scene 3: The Trial',
      summary: 'Courtroom drama. The prosecution wants a conviction. The defense wants justice. The jury wants to go home.',
      challenge: 'social',
      keyEvents: [
        'Prosecution: "He broke in. He stole. The law is the law."',
        'Defense: Grix\'s story, the diluted medicine, the price discrimination',
        'Master Hale on the stand: squirms when confronted with two sets of books',
        'Closing: the party argues that a system that fails its most vulnerable members should not punish them for surviving',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Grix', role: 'defendant', personality: 'Speaks in short, broken Common. Keeps asking if Pip is okay - every few minutes, no matter the conversation topic. Shows the party a drawing Pip made of their family. Holds it like it is made of glass. When the court asks him to state what he did, he says "I stole medicine. My daughter was dying. I would do it again."' },
    { name: 'Master Hale', role: 'hidden antagonist', personality: 'Over-enunciates every word like he is speaking to someone slow. Calls himself "a pillar of this community" three times in one conversation. Adjusts his cuffs when nervous. When confronted about the two price lists, his voice goes up half an octave.' },
    { name: 'Judge Aldric Stone', role: 'the bench', personality: 'Rubs the bridge of his nose when lawyers waste his time. Interrupts with "Relevant point, counselor?" Writes notes constantly. Looks bored until the diluted medicine evidence comes out - then he sets down his quill and just listens.' },
  ],
  keyLocations: [
    { name: 'The City Jail', description: 'A cold stone building. Grix\'s cell has a blanket and a drawing his daughter made him. It is the only color in the room.', significance: 'Where the party meets their client.' },
    { name: 'Hale\'s Apothecary', description: 'A well-stocked shop with a clean front counter and a very different story in the back room.', significance: 'Where the evidence of exploitation is found.' },
    { name: 'The Courtroom', description: 'Wood-paneled, formal, intimidating. A goblin in chains looks very small in this room built for humans.', significance: 'Where the trial takes place.' },
  ],
  dataSystems: ['socialEncounter', 'npcBackstoryGen'],
};
