// Random social encounter generator — non-combat encounters with stakes and relationship outcomes.

export type SocialSetting = 'tavern' | 'court' | 'marketplace' | 'temple' | 'road' | 'festival';
export type SocialStake = 'reputation' | 'information' | 'alliance' | 'romance' | 'rivalry' | 'trade';

export interface SocialEncounter {
  title: string;
  setting: SocialSetting;
  stake: SocialStake;
  description: string;
  npcInvolved: string;
  approaches: { approach: string; skill: string; dc: number; outcome: string }[];
  criticalSuccess: string;
  criticalFailure: string;
}

const ENCOUNTERS: SocialEncounter[] = [
  { title: 'The Merchant\'s Dilemma', setting: 'marketplace', stake: 'trade', description: 'A merchant is selling a "magical" sword at a steep discount. It might be real. It might be junk. The merchant seems nervous.', npcInvolved: 'Corbin the Anxious Merchant', approaches: [
    { approach: 'Inspect the sword', skill: 'Arcana', dc: 14, outcome: 'Determine it IS magical — the merchant doesn\'t know what they have. Worth 10× asking price.' },
    { approach: 'Intimidate for truth', skill: 'Intimidation', dc: 12, outcome: 'He admits he stole it and needs quick cash. Price drops 50%.' },
    { approach: 'Haggle fairly', skill: 'Persuasion', dc: 13, outcome: 'Get a fair price. Corbin becomes a future contact for rare items.' },
  ], criticalSuccess: 'Corbin becomes a loyal informant. Gives you first pick of all incoming rare goods.', criticalFailure: 'You buy a cursed sword. Corbin is already gone by the time you figure it out.' },
  { title: 'The Noble\'s Favor', setting: 'court', stake: 'alliance', description: 'A minor noble approaches you at a gala. They want you to embarrass their rival — subtly. In exchange: political backing.', npcInvolved: 'Lady Celeste Ashwick', approaches: [
    { approach: 'Accept and scheme', skill: 'Deception', dc: 15, outcome: 'The rival is humiliated. Lady Celeste owes you a major favor.' },
    { approach: 'Refuse diplomatically', skill: 'Persuasion', dc: 13, outcome: 'Lady Celeste respects your integrity. No favor, but no enemy either.' },
    { approach: 'Warn the rival', skill: 'Insight', dc: 14, outcome: 'The rival is grateful. You gain THEIR favor instead. Lady Celeste becomes a minor enemy.' },
  ], criticalSuccess: 'Both nobles end up owing you. You become a power broker at court.', criticalFailure: 'You\'re caught in the middle. Both nobles despise you. Court doors close.' },
  { title: 'The Broken Priest', setting: 'temple', stake: 'information', description: 'A priest is drinking alone in the temple gardens. They look haunted. They know something about the missing villagers.', npcInvolved: 'Father Aldric', approaches: [
    { approach: 'Listen with empathy', skill: 'Insight', dc: 11, outcome: 'He confesses — he saw undead take the villagers. He did nothing out of fear.' },
    { approach: 'Appeal to duty', skill: 'Persuasion', dc: 13, outcome: 'He gives you the location of the undead lair and a blessing (+1d4 to next save vs undead).' },
    { approach: 'Threaten to expose', skill: 'Intimidation', dc: 14, outcome: 'He tells everything but hates you. He may warn the enemy.' },
  ], criticalSuccess: 'Father Aldric joins the party as a temporary NPC ally. He wants redemption.', criticalFailure: 'He panics and flees town. The information dies with him. The undead hear about you.' },
  { title: 'The Friendly Rival', setting: 'tavern', stake: 'rivalry', description: 'Another adventuring party is in the same tavern. Their leader challenges yours to a drinking contest. Reputation is on the line.', npcInvolved: 'Captain Rook of the Silver Daggers', approaches: [
    { approach: 'Accept the challenge', skill: 'Constitution', dc: 14, outcome: 'Win and earn their respect. They\'ll share intel on a nearby dungeon.' },
    { approach: 'Counter with a bet', skill: 'Persuasion', dc: 13, outcome: 'Turn the contest into a profitable wager. Winner takes 50gp and bragging rights.' },
    { approach: 'Decline gracefully', skill: 'Performance', dc: 12, outcome: 'Tell a better story instead. The crowd loves it. Rook is impressed but not defeated.' },
  ], criticalSuccess: 'The Silver Daggers become allies. Joint quests become possible. Shared intelligence.', criticalFailure: 'Humiliated publicly. The Silver Daggers spread your shame. -2 reputation in this town.' },
  { title: 'The Lost Child', setting: 'road', stake: 'reputation', description: 'A child blocks the road, crying. They\'re lost. Or are they bait for an ambush? Or genuinely in danger?', npcInvolved: 'Pip (age 8, terrified)', approaches: [
    { approach: 'Help immediately', skill: 'Medicine', dc: 10, outcome: 'Genuine lost child. Return them to the village for gratitude and a home-cooked meal.' },
    { approach: 'Check for ambush first', skill: 'Perception', dc: 14, outcome: 'No ambush — but you spot tracks. Something took the child\'s family. Quest unlocked.' },
    { approach: 'Ignore and move on', skill: 'None', dc: 0, outcome: 'The child is found dead the next day. The town remembers you passed by.' },
  ], criticalSuccess: 'You rescue the child AND discover a bandit camp. The village names a holiday after you.', criticalFailure: 'It WAS a trap. Bandits ambush while you\'re distracted with the child. The child is their accomplice.' },
];

export function getRandomSocialEncounter(): SocialEncounter {
  return ENCOUNTERS[Math.floor(Math.random() * ENCOUNTERS.length)];
}

export function getEncountersBySetting(setting: SocialSetting): SocialEncounter[] {
  return ENCOUNTERS.filter((e) => e.setting === setting);
}

export function getEncountersByStake(stake: SocialStake): SocialEncounter[] {
  return ENCOUNTERS.filter((e) => e.stake === stake);
}

export function getAllSettings(): SocialSetting[] {
  return [...new Set(ENCOUNTERS.map((e) => e.setting))];
}

export function formatSocialEncounter(encounter: SocialEncounter): string {
  const icon = { tavern: '🍺', court: '👑', marketplace: '🏪', temple: '⛪', road: '🛤️', festival: '🎪' }[encounter.setting];
  const lines = [`${icon} **${encounter.title}** *(${encounter.setting}, ${encounter.stake})*`];
  lines.push(`  *${encounter.description}*`);
  lines.push(`  NPC: ${encounter.npcInvolved}`);
  lines.push('  **Approaches:**');
  encounter.approaches.forEach((a) => lines.push(`    🎯 ${a.approach} (${a.skill} DC ${a.dc})`));
  return lines.join('\n');
}

export { ENCOUNTERS as SOCIAL_ENCOUNTERS };
