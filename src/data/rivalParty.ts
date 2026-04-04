// Random NPC rival party — a competing adventuring group with their own goals.

export type RivalDisposition = 'friendly_rival' | 'professional' | 'hostile' | 'mirror';

export interface RivalMember { name: string; role: string; personality: string; weakness: string; }

export interface RivalParty {
  partyName: string;
  disposition: RivalDisposition;
  description: string;
  members: RivalMember[];
  sharedGoal: string;
  competitiveEdge: string;
  respectCondition: string;
  allianceCondition: string;
  betrayalRisk: string;
}

const PARTIES: RivalParty[] = [
  { partyName: 'The Silver Daggers', disposition: 'friendly_rival', description: 'Professional, competent, and annoyingly good at everything. They always arrive one step ahead.', members: [
    { name: 'Captain Rook', role: 'Leader/Fighter', personality: 'Charming, competitive, buys rounds for everyone including enemies.', weakness: 'Pride. Challenge him to anything and he can\'t say no.' },
    { name: 'Whisper', role: 'Rogue/Scout', personality: 'Never speaks above a whisper. Somehow this is more intimidating.', weakness: 'Cats. Completely distracted by any cat. Cannot resist petting one.' },
    { name: 'Brightshield', role: 'Cleric/Tank', personality: 'Relentlessly optimistic. Heals enemies mid-combat "because it\'s the right thing to do."', weakness: 'Can\'t say no to anyone asking for help. Exploitable.' },
    { name: 'Ember', role: 'Sorcerer', personality: 'Barely controlled chaos. Everything is on fire. Including her hair sometimes.', weakness: 'Water. Not afraid of it — just very, very bad at swimming.' },
  ], sharedGoal: 'Same quest, same dungeon, same deadline. Only one group gets the reward.', competitiveEdge: 'Better gear, more experience, and a wagon. They have a WAGON.', respectCondition: 'Beat them to the objective. Not through sabotage — through being genuinely better.', allianceCondition: 'A threat too big for either party alone. They propose a 50/50 split. They mean it.', betrayalRisk: 'Zero. They\'re honest. Annoyingly so. Losing to them feels earned.' },
  { partyName: 'The Hollow Men', disposition: 'hostile', description: 'Former adventurers who sold their morals for efficiency. They complete quests. They don\'t care how.', members: [
    { name: 'The Director', role: 'Leader/Warlock', personality: 'Calm, clinical, treats murder as a line item on a spreadsheet.', weakness: 'His patron is losing patience. He\'s desperate. Desperation makes mistakes.' },
    { name: 'Nails', role: 'Fighter/Enforcer', personality: 'Doesn\'t speak. Doesn\'t need to. 7 feet tall. Carries a hammer bigger than most people.', weakness: 'Former paladin. Showing him genuine heroism triggers guilt. He hesitates.' },
    { name: 'The Twins', role: 'Rogues (2 for 1)', personality: 'Finish each other\'s sentences. Ambush specialists. Always flanking.', weakness: 'If separated by more than 60ft, both panic. Coordinated only when together.' },
  ], sharedGoal: 'They\'ve been hired to retrieve the same thing. By a different client. Their client pays more.', competitiveEdge: 'No morals means no hesitation. They take shortcuts the party won\'t.', respectCondition: 'Outmatch them in ruthless efficiency. They respect competence, not goodness.', allianceCondition: 'Never. They would rather fail alone than share credit.', betrayalRisk: 'Absolute. They will betray you the moment it\'s advantageous. Plan accordingly.' },
  { partyName: 'The Understudies', disposition: 'mirror', description: 'A group of younger adventurers who idolize the party. They copy your tactics. Your gear. Your catchphrases. It\'s flattering and creepy.', members: [
    { name: 'Junior', role: 'Whatever the party leader\'s class is', personality: 'Worships the ground the party leader walks on. Takes notes.', weakness: 'No actual combat experience. Freezes in real danger.' },
    { name: 'Shadow', role: 'Copies the party\'s rogue/stealth character', personality: 'Tries too hard to be mysterious. Trips over things.', weakness: 'Desperately wants approval. Will do anything if the party asks.' },
    { name: 'Sparky', role: 'Copies the party\'s caster', personality: 'Enthusiastic but under-leveled. Cantrips only.', weakness: 'Overestimates their own power constantly. This will get them killed.' },
    { name: 'Tank', role: 'Copies the party\'s tank/fighter', personality: 'Actually pretty competent. Just young. Will be a legend someday.', weakness: 'Loyalty to the group overrides self-preservation.' },
  ], sharedGoal: 'They took the same quest to prove they\'re "just as good." They are not just as good.', competitiveEdge: 'None. They are outmatched. But they have enthusiasm and no self-doubt.', respectCondition: 'Acknowledge them as real adventurers. It means the world to them.', allianceCondition: 'Immediate. They would LOVE to team up. They have fan art of the party. It\'s weird.', betrayalRisk: 'Impossible. They would die for the party. This is the real danger — they WILL die if not protected.' },
];

export function getRandomRivalParty(): RivalParty {
  return PARTIES[Math.floor(Math.random() * PARTIES.length)];
}

export function getPartiesByDisposition(disposition: RivalDisposition): RivalParty[] {
  return PARTIES.filter((p) => p.disposition === disposition);
}

export function getMemberCount(party: RivalParty): number {
  return party.members.length;
}

export function getAllDispositions(): RivalDisposition[] {
  return [...new Set(PARTIES.map((p) => p.disposition))];
}

export function formatRivalParty(party: RivalParty): string {
  const icon = { friendly_rival: '🤝', professional: '💼', hostile: '⚔️', mirror: '🪞' }[party.disposition];
  const lines = [`${icon} **${party.partyName}** *(${party.disposition.replace(/_/g, ' ')})*`];
  lines.push(`  *${party.description}*`);
  party.members.forEach((m) => lines.push(`  👤 ${m.name} (${m.role}): ${m.personality}`));
  lines.push(`  🎯 Goal: ${party.sharedGoal}`);
  lines.push(`  ⚡ Edge: ${party.competitiveEdge}`);
  lines.push(`  Betrayal risk: ${party.betrayalRisk}`);
  return lines.join('\n');
}

export { PARTIES as RIVAL_PARTIES };
