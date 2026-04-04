// Random divine quest giver — gods who show up personally with assignments.

export type DeityManner = 'imperious' | 'casual' | 'cryptic' | 'apologetic' | 'terrifying' | 'absent_minded';

export interface DivineQuest {
  deityName: string;
  deityManner: DeityManner;
  appearance: string;
  quest: string;
  reward: string;
  refusalConsequence: string;
  timeLimit: string;
  complication: string;
  deityQuirk: string;
}

const QUESTS: DivineQuest[] = [
  { deityName: 'Solara, the Dawnmother', deityManner: 'apologetic', appearance: 'A warm golden light that coalesces into a woman\'s form. She looks tired. Gods can look tired, apparently.', quest: '"I\'m so sorry to bother you. Really. But there\'s a cult trying to eat the sun and I can\'t intervene directly because of... rules. Could you...?"', reward: 'A permanent blessing: +1 to all healing received. The sun personally thanks you at dawn for a week.', refusalConsequence: '"I understand. No pressure." *the sun dims noticeably for 3 days* "That\'s not a punishment. I\'m just... sad."', timeLimit: '14 days before the ritual completes.', complication: 'The cult leader is a former cleric of Solara. She still loves them. She wants them stopped, not killed.', deityQuirk: 'Keeps apologizing for the inconvenience. Offers to carry your gear. A GOD offers to carry your gear.' },
  { deityName: 'Korrath, the Iron Judge', deityManner: 'imperious', appearance: 'A 12-foot armored figure materializes in your camp. His warhammer weighs more than your house. The ground cracks.', quest: '"A crime has been committed against the cosmic order. A mortal has stolen the Scales of Justice. You WILL retrieve them. This is not a request."', reward: 'A legendary weapon from Korrath\'s personal armory. Also: legal immunity in every court in the realm.', refusalConsequence: '"Then you are complicit." Disadvantage on all saving throws for 30 days. The Judge remembers.', timeLimit: '7 days. Justice does not wait.', complication: 'The thief is a child. They stole the Scales to save their wrongly-convicted parent. The Scales would prove innocence — if returned to the court.', deityQuirk: 'Speaks ENTIRELY in legal terminology. "Pursuant to divine statute 7.3.1, you are hereby deputized."' },
  { deityName: 'Vex, the Storm Lord', deityManner: 'casual', appearance: 'Lightning strikes your campfire. A figure steps out of the flames, grinning. He\'s wearing a leather jacket. Over plate armor.', quest: '"Hey. So. There\'s this other god\'s temple and it\'s REALLY ugly. I want you to... improve it. With thunder. A lot of thunder. It\'ll be hilarious."', reward: 'A storm in a bottle (3 uses: Call Lightning, 5th level). Also: you can never be struck by lightning. He likes you.', refusalConsequence: '"Boring." He leaves. Your campfire stays struck by lightning for a week. You can\'t put it out.', timeLimit: 'Whenever. Vex isn\'t organized enough for deadlines.', complication: 'The "ugly" temple belongs to Solara. Attacking it starts a divine feud. Vex didn\'t mention this.', deityQuirk: 'Speaks like a surfer bro. "Dude. DUDE. Trust me. This is gonna be EPIC."' },
  { deityName: 'Aelindra, the Whispered Word', deityManner: 'cryptic', appearance: 'No physical form. A book on your shelf opens itself. The pages are blank. Then they\'re not.', quest: '*Text appears:* "A word has been erased from reality. Without it, a concept ceases to exist. Find the word before the world forgets what it meant."', reward: 'The forgotten word is yours to keep. Speaking it grants one casting of Wish — but only once, ever.', refusalConsequence: 'The book closes. A random word disappears from your vocabulary. You can never say it again. You don\'t remember what it was.', timeLimit: 'Every day, more people forget the concept. You have 10 days before it\'s permanent.', complication: 'The erased word is "mercy." The world is becoming crueler by the hour and nobody knows why.', deityQuirk: 'Communicates only through written text. In different handwritings. Sometimes in languages you don\'t speak (but suddenly can).' },
];

export function getRandomDivineQuest(): DivineQuest {
  return QUESTS[Math.floor(Math.random() * QUESTS.length)];
}

export function getQuestsByManner(manner: DeityManner): DivineQuest[] {
  return QUESTS.filter((q) => q.deityManner === manner);
}

export function getAllDeityManners(): DeityManner[] {
  return [...new Set(QUESTS.map((q) => q.deityManner))];
}

export function formatDivineQuest(quest: DivineQuest): string {
  const icon = { imperious: '⚡', casual: '😎', cryptic: '📖', apologetic: '😊', terrifying: '💀', absent_minded: '🤔' }[quest.deityManner];
  const lines = [`${icon} **${quest.deityName}** *(${quest.deityManner})*`];
  lines.push(`  *${quest.appearance}*`);
  lines.push(`  💬 ${quest.quest}`);
  lines.push(`  🏆 Reward: ${quest.reward}`);
  lines.push(`  ❌ Refusal: ${quest.refusalConsequence}`);
  lines.push(`  🎭 Quirk: ${quest.deityQuirk}`);
  return lines.join('\n');
}

export { QUESTS as DIVINE_QUESTS };
