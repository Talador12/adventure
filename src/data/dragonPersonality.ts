// Dragon personality matrix — unique dragon behaviors, hoard preferences, and negotiation styles.

export type DragonColor = 'red' | 'blue' | 'green' | 'black' | 'white' | 'gold' | 'silver' | 'bronze' | 'copper' | 'brass';
export type DragonAge = 'wyrmling' | 'young' | 'adult' | 'ancient';
export type NegotiationStyle = 'imperious' | 'cunning' | 'wrathful' | 'scholarly' | 'mercantile' | 'playful';

export interface DragonHoardPreference { category: string; examples: string[]; value: string; }
export interface DragonPersonalityTrait { trait: string; behavior: string; exploitable: boolean; }

export interface DragonProfile {
  color: DragonColor;
  alignment: string;
  negotiationStyle: NegotiationStyle;
  personalityTraits: DragonPersonalityTrait[];
  hoardPreferences: DragonHoardPreference[];
  parleyCondition: string;
  insultTrigger: string;
  respectTrigger: string;
  sampleDialogue: string[];
}

const PROFILES: DragonProfile[] = [
  { color: 'red', alignment: 'CE', negotiationStyle: 'imperious', personalityTraits: [
    { trait: 'Overwhelming Pride', behavior: 'Must be addressed by full title. Refuses to look down at creatures.', exploitable: true },
    { trait: 'Collector\'s Obsession', behavior: 'Knows every coin in the hoard. Notices if ONE is missing.', exploitable: false },
    { trait: 'Grudge Keeper', behavior: 'Remembers every slight for centuries. Will destroy a bloodline for an insult.', exploitable: true },
  ], hoardPreferences: [{ category: 'Gold', examples: ['Coins, crowns, golden artifacts, gilded weapons'], value: 'Maximum volume. Quality secondary to quantity.' }, { category: 'Trophies', examples: ['Skulls of heroes, broken weapons of failed challengers'], value: 'Proof of dominance.' }], parleyCondition: 'Offer tribute worth at least 1000gp AND address the dragon as "Your Magnificence."', insultTrigger: 'Compare them unfavorably to ANY other dragon. Instant combat.', respectTrigger: 'Acknowledge their supremacy without being asked. Genuine fear impresses them.', sampleDialogue: ['"You stand in the presence of greatness. Kneel, or burn. I care not which."', '"Your tribute is... adequate. Barely. You may speak. Briefly."', '"I have destroyed kingdoms that displeased me less than you do right now."'] },
  { color: 'gold', alignment: 'LG', negotiationStyle: 'scholarly', personalityTraits: [
    { trait: 'Sage\'s Curiosity', behavior: 'Asks questions constantly. Fascinated by mortal ingenuity.', exploitable: true },
    { trait: 'Burden of Responsibility', behavior: 'Feels personally responsible for nearby mortals. Guilt is a weapon against them.', exploitable: true },
    { trait: 'Ancient Patience', behavior: 'Will talk for hours. Days. Prefers conversation to combat.', exploitable: false },
  ], hoardPreferences: [{ category: 'Knowledge', examples: ['Rare books, maps, spell scrolls, historical artifacts'], value: 'Information is the only true treasure.' }, { category: 'Art', examples: ['Paintings, sculptures, music boxes, poetry collections'], value: 'Beauty preserves what gold cannot.' }], parleyCondition: 'Come in peace with an interesting question or a piece of unknown knowledge.', insultTrigger: 'Threaten innocents in the dragon\'s territory. The gold dragon becomes terrifying.', respectTrigger: 'Demonstrate wisdom beyond your years. The dragon becomes a mentor.', sampleDialogue: ['"Fascinating. Tell me more. I have not heard that perspective in... 400 years."', '"I do not wish to fight you. But I will, if you force me. You will not enjoy it."', '"Sit. Eat. You look tired. We have much to discuss before I let you leave."'] },
  { color: 'copper', alignment: 'CG', negotiationStyle: 'playful', personalityTraits: [
    { trait: 'Compulsive Joker', behavior: 'Tells riddles and puns. Won\'t get serious unless someone laughs first.', exploitable: true },
    { trait: 'Mischief Lover', behavior: 'Pranks visitors. Shapeshifts to walk among mortals. Finds tragedy hilarious.', exploitable: false },
    { trait: 'Secretly Lonely', behavior: 'Keeps visitors talking as long as possible. The jokes are a defense mechanism.', exploitable: true },
  ], hoardPreferences: [{ category: 'Curiosities', examples: ['Joke books, puzzle boxes, clockwork toys, unusual items'], value: 'If it makes you laugh or think, it belongs in the hoard.' }, { category: 'Stories', examples: ['The dragon collects STORIES. Tell a good one, pay no gold.'], value: 'A story never heard before is worth more than diamonds.' }], parleyCondition: 'Tell a joke the dragon hasn\'t heard. If it laughs, you have an audience.', insultTrigger: 'Being boring. The dragon will literally fall asleep and ask you to leave.', respectTrigger: 'Out-riddle the dragon. No one has managed it in 200 years. It dreams of the day.', sampleDialogue: ['"Why did the adventurer cross the dungeon? To get to the OTHER SLIDE! ... Get it? Slide? Like a trap? No? Tough crowd."', '"I\'ll make you a deal. Answer my riddle and take whatever you want. Fail, and you stay for dinner. As the entertainment. Not the meal. Probably."', '"You\'re funny. I like you. That\'s rare. Most people I like are dead. Unrelated. Mostly."'] },
  { color: 'green', alignment: 'LE', negotiationStyle: 'cunning', personalityTraits: [
    { trait: 'Master Manipulator', behavior: 'Never lies directly. Every truth is a weapon. Every gift is a trap.', exploitable: false },
    { trait: 'Information Hoarder', behavior: 'Knows secrets about everyone in the region. Trades secrets for secrets.', exploitable: true },
    { trait: 'Patient Schemer', behavior: 'Plans decades ahead. Current visitors are pieces in a game already in progress.', exploitable: false },
  ], hoardPreferences: [{ category: 'Secrets', examples: ['Blackmail material, sealed letters, confession scrolls, encoded journals'], value: 'A secret is a key. The dragon collects keys to every door.' }, { category: 'Debts', examples: ['Favors owed, blood oaths sworn, contracts signed'], value: 'Gold is finite. Debt is forever.' }], parleyCondition: 'Offer a secret the dragon doesn\'t already know. It will verify.', insultTrigger: 'Attempting deception. The dragon sees through ALL lies and considers the attempt insulting.', respectTrigger: 'Being genuinely honest. The dragon finds honesty refreshing and slightly unsettling.', sampleDialogue: ['"I know why you\'re here. I know who sent you. I know what they didn\'t tell you. Shall we discuss that?"', '"I never lie. I simply... curate the truth. You\'ll find we have much in common."', '"You may leave with what you came for. The price is one secret. Your deepest one. I\'ll know if you\'re holding back."'] },
];

export function getDragonProfile(color: DragonColor): DragonProfile | undefined {
  return PROFILES.find((p) => p.color === color);
}

export function getProfilesByNegotiationStyle(style: NegotiationStyle): DragonProfile[] {
  return PROFILES.filter((p) => p.negotiationStyle === style);
}

export function getExploitableTraits(profile: DragonProfile): DragonPersonalityTrait[] {
  return profile.personalityTraits.filter((t) => t.exploitable);
}

export function getAllDragonColors(): DragonColor[] {
  return PROFILES.map((p) => p.color);
}

export function formatDragonProfile(profile: DragonProfile): string {
  const lines = [`🐉 **${profile.color.charAt(0).toUpperCase() + profile.color.slice(1)} Dragon** *(${profile.alignment}, ${profile.negotiationStyle})*`];
  lines.push('  **Personality:**');
  profile.personalityTraits.forEach((t) => lines.push(`    ${t.exploitable ? '🎯' : '⚙️'} ${t.trait}: ${t.behavior}`));
  lines.push(`  🗣️ Parley: ${profile.parleyCondition}`);
  lines.push(`  ⚡ Insult: ${profile.insultTrigger}`);
  lines.push(`  ✅ Respect: ${profile.respectTrigger}`);
  return lines.join('\n');
}

export { PROFILES as DRAGON_PROFILES };
