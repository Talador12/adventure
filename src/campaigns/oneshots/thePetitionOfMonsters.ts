import type { OneShotCampaign } from '../types';

export const thePetitionOfMonsters: OneShotCampaign = {
  id: 'oneshot-petition-monsters',
  type: 'oneshot',
  title: 'The Petition of Monsters',
  tagline: 'The monsters are suing for peace. You\'re their lawyers.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 4,
  settingSummary:
    'A delegation of monsters — a goblin chief, an ogre matriarch, a kobold diplomat, and a very polite bugbear — have arrived at the capital with a legal petition for peaceful coexistence. They need legal representation. No human lawyer will take the case. The party, who owe a favor to the court clerk, are appointed as their defense attorneys. The trial is in 6 hours.',
  hook: 'The court clerk hands the party a stack of papers: "You\'re representing the Monster Delegation in their petition for recognized personhood and territorial rights. The prosecution is the Adventurers\' Guild, who argue that monsters are inherently hostile. Trial starts at noon. The goblin chief bit the last lawyer. Don\'t let him do that."',
  twist: 'The Adventurers\' Guild doesn\'t oppose monster rights on principle — they oppose it because if monsters are recognized as persons, killing them becomes murder, and the Guild loses its primary revenue source. This is an economic argument disguised as a safety one. If the party exposes this, public opinion shifts dramatically.',
  climax: 'Closing arguments. The Guild\'s lawyer delivers a fear-based speech about monster attacks. The party must counter with evidence gathered during the trial: monster communities that have lived peacefully for decades, monsters who saved human children, and the economic truth about the Guild\'s opposition. The jury is six citizens who are scared but listening.',
  scenes: [
    {
      title: 'Scene 1: Meet the Clients',
      summary: 'The party meets the monster delegation, prepares the case, and discovers that their clients are more civilized than expected (mostly).',
      challenge: 'social',
      keyEvents: [
        'The goblin chief: articulate, angry, keeps calling humans "the tall problem"',
        'The ogre matriarch: gentle, soft-spoken, brought cookies for the judge',
        'The kobold diplomat: has a 40-page legal brief written in perfect Common',
        'Case prep: the party must build arguments from testimony, evidence, and character witnesses',
      ],
    },
    {
      title: 'Scene 2: The Trial',
      summary: 'Courtroom drama. Witnesses, cross-examinations, and objections. The Guild\'s lawyer is good. The party must be better.',
      challenge: 'social',
      keyEvents: [
        'Prosecution witness: a farmer whose livestock was stolen by goblins (the goblins paid — he lost the receipt)',
        'Defense witness: a village that has coexisted with kobolds for 30 years',
        'The Guild\'s economic argument slips out — a party member can catch it',
        'A dramatic moment: the ogre matriarch testifies about saving a human child from a flood',
      ],
    },
    {
      title: 'Scene 3: Closing Arguments',
      summary: 'The final speeches. The jury deliberates. The party\'s argument either changes history or fails.',
      challenge: 'social',
      keyEvents: [
        'The Guild\'s closing: fear, statistics, "monsters are monsters"',
        'The party\'s closing: the human story, economic truth, a vision of coexistence',
        'Jury deliberation: tense, the party can\'t influence it anymore',
        'The verdict — and what it means for monster-kind',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Chief Grix', role: 'goblin client', personality: 'A goblin chief who taught himself Common law from a stolen textbook. Smart, angry, and trying very hard not to bite anyone. "I have RIGHTS. I read about them. In a book. That I found."' },
    { name: 'Matriarch Unda', role: 'ogre client', personality: 'A gentle ogre who bakes and gardens. She brought muffins. The judge ate one and tried to hide it. "We just want to grow vegetables and not be stabbed."' },
    { name: 'Barrister Sharpe', role: 'prosecution', personality: 'The Adventurers\' Guild\'s lawyer. Slick, persuasive, and genuinely believes monsters are dangerous. When the economic motive is exposed, he falters.' },
    { name: 'Judge Ironwood', role: 'the judge', personality: 'A stern, fair half-elf judge who is trying very hard to be impartial while an ogre keeps offering her cookies.' },
  ],
  keyLocations: [
    { name: 'The High Court', description: 'A grand courtroom with uncomfortable benches, a high judge\'s bench, and a jury box currently occupied by six very nervous citizens.', significance: 'Where the trial takes place.' },
    { name: 'The Holding Room', description: 'Where the monster delegation waits between sessions. They\'ve decorated it with hand-picked wildflowers.', significance: 'Where case prep happens.' },
    { name: 'The Evidence Chamber', description: 'Where physical evidence is stored: treaties, trade records, and one very important lost receipt.', significance: 'Where the economic truth is discovered.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'magicalCourtroom', 'npcBackstoryGen', 'questRewardNegotiation'],
};
