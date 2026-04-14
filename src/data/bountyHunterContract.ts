// Bounty hunter contract — target dossiers with complications, false leads, and moral grey areas.

export type BountyDifficulty = 'easy' | 'moderate' | 'hard' | 'legendary';
export type TargetStatus = 'alive_only' | 'dead_or_alive' | 'proof_of_death';

export interface BountyComplication {
  description: string;
  mechanicalEffect: string;
}

export interface BountyContract {
  targetName: string;
  alias: string;
  description: string;
  crime: string;
  difficulty: BountyDifficulty;
  reward: string;
  status: TargetStatus;
  lastSeen: string;
  distinguishingFeatures: string[];
  complications: BountyComplication[];
  falseLead: string;
  moralTwist: string;
  actualThreatLevel: string;
}

const CONTRACTS: BountyContract[] = [
  {
    targetName: 'Elara Dawnwhisper',
    alias: 'The Sparrow',
    description: 'Half-elf woman, mid-30s, auburn hair usually hidden under a wide-brimmed hat. Moves like a dancer. Always has a book.',
    crime: 'Stole the Scepter of Valdris from the Royal Treasury. Killed two guards during the escape.',
    difficulty: 'hard',
    reward: '2,000gp from the Crown',
    status: 'alive_only',
    lastSeen: 'The Fishbone Inn, port district of Saltmarsh. Traveling with a halfling fence.',
    distinguishingFeatures: ['Scar across left palm (knife oath)', 'Speaks with a slight Elvish accent on stressed words', 'Wears a locket she never opens'],
    complications: [
      { description: 'A rival bounty hunter (Krag the Toothless) is also tracking her. He does not care about the "alive" part.', mechanicalEffect: 'Krag shows up at the worst moment. CR 5 veteran with no regard for collateral damage.' },
      { description: 'Elara has recruited local street children as lookouts. Harming them turns the whole port district against the party.', mechanicalEffect: 'DC 15 Stealth to approach unnoticed. Failure means Elara knows you are coming and prepares an ambush.' },
    ],
    falseLead: 'A woman matching her description is spotted at the docks. It is actually a decoy - a changeling paid to distract bounty hunters while Elara leaves by the south gate.',
    moralTwist: 'The Scepter of Valdris is a mind-control artifact. The King was using it on his own citizens. Elara stole it to stop him. The guards she killed were already under its influence.',
    actualThreatLevel: 'Elara is a level 8 rogue/ranger. She will not fight if she can run. If cornered, she fights to escape, not to kill.',
  },
  {
    targetName: 'Brother Malius',
    alias: 'The Penitent',
    description: 'Human male, 50s, shaved head, burn scars on both forearms. Wears simple grey robes. Walks with a limp. Smells like incense.',
    crime: 'Burned down the Temple of Lathander in Greendale. 14 dead including 3 children.',
    difficulty: 'moderate',
    reward: '1,500gp from the Church of Lathander',
    status: 'dead_or_alive',
    lastSeen: 'A hermitage in the Greywood Forest. He has been there for 6 months. He is not hiding.',
    distinguishingFeatures: ['Burn scars on both forearms (self-inflicted)', 'Speaks in a whisper', 'Carries a children\'s toy - a wooden horse'],
    complications: [
      { description: 'The local village considers Malius a saint. He has been healing the sick and feeding the poor since arriving. They will protect him.', mechanicalEffect: 'DC 18 Persuasion to convince villagers to step aside. Violence against villagers results in the party being declared outlaws in the region.' },
      { description: 'Malius will not resist arrest. He wants to be taken back. He wants to confess publicly.', mechanicalEffect: 'No combat required. The complication is emotional, not physical. He asks the party to deliver letters to the families of the victims.' },
    ],
    falseLead: 'A charcoal seller in Greendale claims to have seen Malius heading north toward the mountains. He is lying to protect Malius, who saved his daughter\'s life.',
    moralTwist: 'The temple fire was not arson. Malius was performing a ritual to banish a demon that had possessed the head priest. The fire was the demon\'s death throes. Malius could not control it. The children died because of the demon, not Malius. He blames himself anyway.',
    actualThreatLevel: 'Malius is a level 6 cleric who has sworn off violence. He will not fight. He will not even defend himself. This is the hardest part.',
  },
  {
    targetName: 'The Ink',
    alias: 'Unknown (the target has no known real name)',
    description: 'Race, age, and gender unknown. Appears as a living shadow with glowing white eyes. Communicates through words that appear written on nearby surfaces.',
    crime: 'Assassinated three members of the Merchant Council of Highbridge. Method: ink poisoning through enchanted contracts.',
    difficulty: 'legendary',
    reward: '5,000gp from the surviving council members',
    status: 'proof_of_death',
    lastSeen: 'Everywhere and nowhere. Messages signed "INK" appear on bathroom mirrors, wanted posters, and the inside of the bounty hunter\'s own journal.',
    distinguishingFeatures: ['No physical form - manifests as animate ink/shadow', 'Writing appears on surfaces near the target', 'Smells like old parchment and iron gall ink'],
    complications: [
      { description: 'The Ink is aware of the bounty and considers it flattering. It has started leaving helpful (accurate) clues for the party as a game.', mechanicalEffect: 'Each dawn, a new clue appears written in the party\'s equipment. The clues are real but lead through increasingly dangerous locations.' },
      { description: 'The Ink can inhabit any written document. Every book, scroll, and letter is a potential hiding place and attack vector.', mechanicalEffect: 'DC 18 Arcana to detect which document the Ink is hiding in. Touching an inhabited document deals 3d6 necrotic damage (DC 15 Con save for half).' },
    ],
    falseLead: 'A rival assassin named Quill is framed for the murders. Quill uses poison ink but is a mundane poisoner, not whatever the Ink is. Quill is terrified and genuinely innocent of these particular murders.',
    moralTwist: 'The three council members were running a slave trading ring through "contract labor" agreements. The Ink is the collective rage of everyone who signed those contracts. It is not a person. It is an emergent entity born from suffering.',
    actualThreatLevel: 'The Ink is a CR 10 equivalent. It cannot be killed conventionally. Destroying all copies of the slave contracts disperses it. The surviving council members do not want those contracts found.',
  },
];

export function getRandomContract(): BountyContract {
  return CONTRACTS[Math.floor(Math.random() * CONTRACTS.length)];
}

export function getContractsByDifficulty(difficulty: BountyDifficulty): BountyContract[] {
  return CONTRACTS.filter((c) => c.difficulty === difficulty);
}

export function getAllDifficulties(): BountyDifficulty[] {
  return [...new Set(CONTRACTS.map((c) => c.difficulty))];
}

export function getRewardValue(contract: BountyContract): number {
  const match = contract.reward.match(/(\d[\d,]*)/);
  return match ? parseInt(match[1].replace(',', ''), 10) : 0;
}

export function formatContract(contract: BountyContract): string {
  const diff = { easy: '🟢', moderate: '🟡', hard: '🔴', legendary: '💀' };
  const lines = [`${diff[contract.difficulty]} **BOUNTY: ${contract.targetName}** aka "${contract.alias}"`];
  lines.push(`  ${contract.description}`);
  lines.push(`  Crime: ${contract.crime}`);
  lines.push(`  Reward: ${contract.reward} (${contract.status.replace(/_/g, ' ')})`);
  lines.push(`  Last seen: ${contract.lastSeen}`);
  lines.push(`  Features: ${contract.distinguishingFeatures.join(', ')}`);
  lines.push('  **Complications:**');
  for (const c of contract.complications) {
    lines.push(`    - ${c.description}`);
  }
  lines.push(`  False lead: ${contract.falseLead}`);
  lines.push(`  Moral twist: ${contract.moralTwist}`);
  return lines.join('\n');
}

export { CONTRACTS as BOUNTY_CONTRACTS };
