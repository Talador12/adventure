// Monster court etiquette — rules and customs for attending courts of powerful creatures.

export type CourtType = 'dragon' | 'vampire' | 'fey' | 'lich' | 'aboleth' | 'beholder';

export interface CourtCustom {
  rule: string;
  punishment: string;
}

export interface CourtOffering {
  item: string;
  reaction: string; // how the ruler responds
  value: 'insulting' | 'acceptable' | 'impressive' | 'legendary';
}

export interface MonsterCourt {
  type: CourtType;
  title: string;
  description: string;
  greetingProtocol: string;
  customs: CourtCustom[];
  offerings: CourtOffering[];
  taboos: string[];
  safeTopics: string[];
  dangerousTopics: string[];
  exitProtocol: string;
  questHook: string;
}

const COURTS: MonsterCourt[] = [
  {
    type: 'dragon',
    title: 'The Hoard Court of Korvathax the Gilded',
    description: 'An ancient red dragon who holds court atop a mountain of gold coins. Petitioners stand on a platform of lesser treasures. Speaking is permitted only when the dragon\'s tail stops moving.',
    greetingProtocol: 'Bow until your forehead touches the gold. Do not look up until addressed. Present your tribute with both hands, arms extended. Never say the word "bigger" in reference to anything.',
    customs: [
      { rule: 'All tribute is weighed before the audience begins. Anything less than 500gp gets you eaten.', punishment: 'Being eaten.' },
      { rule: 'Do not touch any gold in the hoard. Not even to steady yourself if you slip.', punishment: 'Lose the hand that touched it. The dragon is precise with fire.' },
      { rule: 'Flattery is expected but must be creative. Repeating a compliment heard before earns a dismissal.', punishment: 'Ejected from the mountain via the fast way (off the cliff).' },
      { rule: 'If the dragon falls asleep during your petition, wait silently. This is a test of patience.', punishment: 'Waking the dragon results in becoming the next test for future petitioners.' },
    ],
    offerings: [
      { item: 'Gold coins (500+)', reaction: 'Acceptable. The dragon nods. This is the minimum.', value: 'acceptable' },
      { item: 'A magic item the dragon does not own', reaction: 'Impressed. The dragon examines it for 10 minutes, asking questions about its provenance.', value: 'impressive' },
      { item: 'Knowledge of a larger hoard', reaction: 'The dragon\'s eyes narrow with greed. You have its full attention. Name your price.', value: 'legendary' },
      { item: 'Copper coins', reaction: 'The dragon laughs so hard the mountain shakes. You are spared for being entertaining. This time.', value: 'insulting' },
    ],
    taboos: ['Mentioning other dragons by name', 'Implying the hoard is "enough"', 'Sitting down without permission', 'Wearing gold jewelry (the dragon considers it theirs-in-waiting)'],
    safeTopics: ['The beauty of the hoard', 'Military history', 'The inferiority of younger dragons', 'Weather patterns (dragons care about flight conditions)'],
    dangerousTopics: ['Dragonslayers', 'The price of gold', 'Polymorphed dragons', 'That time a halfling stole from a dragon'],
    exitProtocol: 'Walk backward until you reach the tunnel. Turn around only when you can no longer see the gold. Running is interpreted as theft.',
    questHook: 'Korvathax wants a specific gem from a rival dragon\'s hoard. Not for its value - it was his mother\'s. He cannot get it himself without starting a war.',
  },
  {
    type: 'vampire',
    title: 'The Midnight Salon of Countess Vaeloria',
    description: 'A decadent court held between midnight and dawn in a crumbling palace. Chandeliers of bone. Wine that may or may not be wine. Everyone is beautiful and nobody blinks enough.',
    greetingProtocol: 'Present an invitation (forged ones work if the forgery is good enough - DC 18). Kiss the Countess\'s ring. Do not flinch at the cold. Make exactly one witty remark before being seated.',
    customs: [
      { rule: 'Never refuse a drink. The contents are your problem.', punishment: 'Social death. No vampire in the region will deal with you again.' },
      { rule: 'Do not mention the sun, daylight, garlic, or holy symbols. They are not feared - they are considered gauche.', punishment: 'Asked to leave. Your invitation is revoked for a century.' },
      { rule: 'Dancing is mandatory when the music plays. Partners are assigned. Refusal is a declaration of hostility.', punishment: 'The Countess takes it as a personal insult. Charm Person, DC 17.' },
      { rule: 'Mortal blood must not be spilled on the dance floor. The carpet is 400 years old.', punishment: 'You replace the carpet. The cost is approximately your entire net worth.' },
    ],
    offerings: [
      { item: 'A bottle of rare vintage wine', reaction: 'The Countess smiles. "You understand civilization." Rapport improved.', value: 'acceptable' },
      { item: 'A living person who volunteered willingly', reaction: 'The Countess is genuinely touched. "Consent is so rare. How thoughtful."', value: 'impressive' },
      { item: 'Information about a vampire hunter in the region', reaction: 'The salon goes silent. Every vampire in the room is now your ally.', value: 'legendary' },
      { item: 'Garlic bread', reaction: 'The Countess stares for a full 30 seconds. Then laughs. Then stops laughing. Leave now.', value: 'insulting' },
    ],
    taboos: ['Asking a vampire their age', 'Mentioning anyone who was staked', 'Bringing uninvited mortals', 'Wearing turtlenecks'],
    safeTopics: ['Art, music, and theater', 'The decline of mortal civilization', 'Fashion across the centuries', 'Wine (always wine)'],
    dangerousTopics: ['Religion', 'Vampire hierarchy disputes', 'Who sired whom', 'The taste of different blood types (considered vulgar)'],
    exitProtocol: 'Thank the Countess for her hospitality. Accept a parting gift (refusing is a fatal insult). Leave before dawn or the doors seal until the next midnight.',
    questHook: 'The Countess wants her stolen portrait returned. It was painted with her blood and the thief can use it to control her. She cannot retrieve it herself - the thief lives in a cathedral.',
  },
  {
    type: 'lich',
    title: 'The Ossuary Parliament of Arch-Lich Veranthor',
    description: 'A vast underground library where the shelves are made of bone and the books are bound in things best not examined. The lich sits at a desk covered in ongoing experiments. It might take an hour before it notices you.',
    greetingProtocol: 'State your name, your field of study, and what you can offer to the pursuit of knowledge. If you have no field of study, make one up. Ignorance is the only unforgivable sin here.',
    customs: [
      { rule: 'Do not touch the books without permission. Some are alive. Some bite.', punishment: 'The book you touched becomes your problem. It follows you home and reads itself aloud at 3 AM.' },
      { rule: 'All conversations must advance knowledge in some way. Small talk is banned.', punishment: 'The lich casts Silence on you for the remainder of the visit.' },
      { rule: 'If the lich asks you a question, you must answer honestly. It can detect lies and considers them a waste of time.', punishment: 'Teleported to a pocket dimension library and forced to research the answer. You return when you find it.' },
      { rule: 'Destroy nothing. Everything in the Ossuary has a purpose, even if that purpose is not immediately apparent.', punishment: 'You are added to the collection. Temporarily. Probably.' },
    ],
    offerings: [
      { item: 'A rare spell scroll', reaction: '"Adequate." The lich files it. You may ask one question.', value: 'acceptable' },
      { item: 'A book from a lost civilization', reaction: 'The lich stops everything. Examines the book for 1 hour. You now have a research partner.', value: 'impressive' },
      { item: 'A previously unknown magical theorem', reaction: 'The lich stands up. This has not happened in 200 years. Name any favor.', value: 'legendary' },
      { item: 'A popular fiction novel', reaction: 'The lich reads the back cover, sighs, and adds it to a pile labeled "Mortal Nonsense." No respect gained.', value: 'insulting' },
    ],
    taboos: ['Asking about the lich\'s phylactery', 'Calling necromancy "evil"', 'Suggesting the lich is lonely', 'Anti-undead spells cast within 100 feet'],
    safeTopics: ['Magical theory', 'History (the lich lived through most of it)', 'Planar mechanics', 'The inadequacy of modern magical education'],
    dangerousTopics: ['The lich\'s former life', 'Who else has a phylactery', 'Whether undeath is "worth it"', 'The gods\' opinion on liches'],
    exitProtocol: 'Say "I have no further questions." The lich nods. Leave through the bone door. Do not look back. The exit is different every time.',
    questHook: 'Veranthor needs a live sample of a thought - literally, a thought extracted from a mind flayer\'s brain. In exchange, it will answer any one question about anything in existence.',
  },
];

export function getRandomCourt(): MonsterCourt {
  return COURTS[Math.floor(Math.random() * COURTS.length)];
}

export function getCourtByType(type: CourtType): MonsterCourt | undefined {
  return COURTS.find((c) => c.type === type);
}

export function getAllCourtTypes(): CourtType[] {
  return [...new Set(COURTS.map((c) => c.type))];
}

export function getTabooCount(court: MonsterCourt): number {
  return court.taboos.length + court.dangerousTopics.length;
}

export function formatCourt(court: MonsterCourt): string {
  const lines = [`👑 **${court.title}** *(${court.type} court)*`];
  lines.push(`  ${court.description}`);
  lines.push(`  Greeting: ${court.greetingProtocol}`);
  lines.push('  **Customs:**');
  for (const c of court.customs) {
    lines.push(`    - ${c.rule}`);
    lines.push(`      Punishment: ${c.punishment}`);
  }
  lines.push('  **Safe topics:** ' + court.safeTopics.join(', '));
  lines.push('  **Dangerous topics:** ' + court.dangerousTopics.join(', '));
  lines.push('  **Taboos:** ' + court.taboos.join(', '));
  lines.push(`  Exit: ${court.exitProtocol}`);
  lines.push(`  📜 Quest: ${court.questHook}`);
  return lines.join('\n');
}

export { COURTS as MONSTER_COURTS };
