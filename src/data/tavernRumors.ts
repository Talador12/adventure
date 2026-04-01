// Tavern rumor tables — DM rolls for setting-appropriate rumors and quest hooks.
// Categorized by tone: helpful, misleading, ominous, humorous.

export interface Rumor {
  text: string;
  type: 'helpful' | 'misleading' | 'ominous' | 'humorous';
  questHook?: boolean; // true = could lead to an adventure
}

export const TAVERN_RUMORS: Rumor[] = [
  // Helpful — true information
  { text: '"The merchant caravan that went missing last week? Goblins took it. Their camp is in the hills east of here."', type: 'helpful', questHook: true },
  { text: '"If you\'re heading to the ruins, bring fire. The creatures down there hate it."', type: 'helpful' },
  { text: '"The blacksmith has a magic weapon she\'ll sell for a favor — clear the rats from her cellar."', type: 'helpful', questHook: true },
  { text: '"There\'s a healer in the temple who can cure that curse, but she asks for a rare herb from the Darkwood."', type: 'helpful', questHook: true },
  { text: '"The duke\'s daughter has been sneaking out at night. Someone ought to find out where she goes."', type: 'helpful', questHook: true },
  // Misleading — false or exaggerated
  { text: '"The dragon in the mountain? Oh, that\'s just old wives\' tales. Nothing up there but goats."', type: 'misleading' },
  { text: '"I heard the wizard in the tower can grant wishes. Just bring him a thousand gold."', type: 'misleading' },
  { text: '"The bridge to the north is perfectly safe. Ignore the screams at night."', type: 'misleading' },
  { text: '"Vampires? In this town? Don\'t be ridiculous. The pale bartender is just... anemic."', type: 'misleading' },
  // Ominous — foreboding
  { text: '"Something stirs beneath the old cemetery. The dead don\'t rest easy these days."', type: 'ominous', questHook: true },
  { text: '"The king\'s advisor has been meeting with hooded figures in the dead of night."', type: 'ominous', questHook: true },
  { text: '"Three villages to the south have gone silent. No traders, no travelers, nothing."', type: 'ominous', questHook: true },
  { text: '"They say the old gods are waking. And they\'re angry."', type: 'ominous' },
  { text: '"The well water tastes strange lately. And the cattle are acting... wrong."', type: 'ominous', questHook: true },
  // Humorous — comic relief
  { text: '"Did you hear? The baker challenged the blacksmith to a duel. Over a bread recipe."', type: 'humorous' },
  { text: '"My cousin saw a talking frog in the swamp. Said it wanted to be kissed. He ran."', type: 'humorous' },
  { text: '"The bard who performed last night? Turned out to be three halflings in a trenchcoat."', type: 'humorous' },
  { text: '"Someone put a \'wanted\' poster up for the mayor\'s cat. Apparently it stole a whole ham."', type: 'humorous' },
];

export function rollRumor(): Rumor {
  return TAVERN_RUMORS[Math.floor(Math.random() * TAVERN_RUMORS.length)];
}

export function rollRumors(count: number): Rumor[] {
  const shuffled = [...TAVERN_RUMORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
