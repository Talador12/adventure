// Haunted carnival — creepy carnival attractions with games, rides, prizes, and hidden dangers.

export type AttractionType = 'game' | 'ride' | 'show' | 'food_stall' | 'fortune_teller';

export interface CarnivalPrize {
  name: string;
  description: string;
  cursed: boolean;
  curseEffect?: string;
}

export interface CarnivalAttraction {
  name: string;
  type: AttractionType;
  description: string;
  mechanicalChallenge: string;
  hiddenDanger: string;
  prize?: CarnivalPrize;
}

export interface HauntedCarnival {
  name: string;
  owner: string;
  ownerSecret: string;
  description: string;
  arrivalHook: string;
  attractions: CarnivalAttraction[];
  darkSecret: string;
  escapeCondition: string;
  timeLimit: string;
}

const CARNIVALS: HauntedCarnival[] = [
  {
    name: 'The Mirthless Midway',
    owner: 'Ringmaster Gideon Twill, a man whose smile never reaches his eyes and whose shadow moves independently.',
    ownerSecret: 'Gideon died 40 years ago. The carnival is his afterlife. He needs 100 souls to move on. He has 97.',
    description: 'A carnival that appears at crossroads on moonless nights. The tents are striped in colors that do not exist in daylight. The music plays backward. Everyone is having a wonderful time and cannot explain why.',
    arrivalHook: 'A child in town says the carnival appeared overnight. Nobody remembers it arriving. The tickets are free. The exits are hard to find.',
    attractions: [
      { name: 'The Strength Test', type: 'game', description: 'Ring the bell with a mallet. The bell is 30 feet up. The mallet weighs 1 pound. Something is wrong with the gravity near the top.', mechanicalChallenge: 'DC 16 Athletics to ring the bell. Each attempt costs you 1 year of age (you do not notice). Detect Magic reveals transmutation.', hiddenDanger: 'After 3 attempts, you are visibly older. After 6, you are elderly. The age is real.', prize: { name: 'Teddy Bear of Vigor', description: 'A stuffed bear that is warm to the touch.', cursed: true, curseEffect: 'Restores 1 year of lost age per long rest. You must keep it with you or the aging accelerates.' } },
      { name: 'The Mirror Maze', type: 'ride', description: 'A hall of mirrors where your reflections do different things than you do. Some lead. Some follow. One is trying to replace you.', mechanicalChallenge: 'DC 14 Perception to track which reflection is hostile. DC 15 Investigation to find the real exit (there are 7 fake exits that loop back).', hiddenDanger: 'If the hostile reflection touches you (fails DC 13 Dex save), it swaps places. You are now in the mirror. Your reflection walks away wearing your face.' },
      { name: 'The Fortune Teller', type: 'fortune_teller', description: 'Madame Esmeralda sits in a tent that smells like old roses. She knows things she should not. Her predictions are always accurate. This is the problem.', mechanicalChallenge: 'No check needed. She tells you one true thing about your future. DC 16 Insight to realize she is reading from a book titled with your name.', hiddenDanger: 'The prediction becomes a self-fulfilling prophecy. The more you try to avoid it, the more likely it becomes. Madame Esmeralda is genuinely sorry about this.' },
      { name: 'The Ferris Wheel of Forgotten Things', type: 'ride', description: 'A Ferris wheel that shows you memories you have lost at the top. Beautiful, devastating, and addictive.', mechanicalChallenge: 'DC 13 Wisdom save to voluntarily get off. Each ride costs one current memory (DM picks). Failure means riding again.', hiddenDanger: 'After 3 rides you forget why you came to the carnival. After 5 you forget your party members. The carnival fills the gaps with false memories of always being here.' },
      { name: 'Gideon\'s Grand Finale', type: 'show', description: 'The main tent show. Gideon performs impossible magic. A woman is sawed in half (she does not come back together). A man vanishes (he does not reappear). The audience applauds.', mechanicalChallenge: 'DC 15 Insight to realize the "volunteers" are real people being taken. DC 17 Arcana to identify the binding magic holding the tent together.', hiddenDanger: 'Gideon asks for a volunteer from the party. Refusing breaks the carnival\'s spell temporarily - everyone sees the decay underneath the glamour.' },
    ],
    darkSecret: 'Every person who "wins" a prize at the carnival is slowly bound to it. When the carnival moves on, they go with it, becoming carnival workers. The cotton candy vendor was a paladin 6 months ago.',
    escapeCondition: 'Destroy Gideon\'s ledger (hidden under the main stage). It contains every name of every soul he has collected. Burning it frees them all - but Gideon becomes a hostile wraith.',
    timeLimit: 'Dawn. If the party is still inside at sunrise, the carnival vanishes with them in it. It reappears at the next crossroads in 1d4 weeks.',
  },
  {
    name: 'Thornwick\'s Traveling Wondershow',
    owner: 'Percival Thornwick III, an impeccably dressed gnome who speaks exclusively in carnival barker cadence.',
    ownerSecret: 'Thornwick is a fey creature banished from the Feywild. The carnival is his prison. He is genuinely trying to entertain because joy weakens the bars of his cage.',
    description: 'A carnival that is almost normal. The popcorn is great. The games are fair. The fun house is actually fun. But every 13th visitor sees the second carnival underneath - the one made of thorns and teeth.',
    arrivalHook: 'The carnival has been in town for 3 days. Everyone loves it. Then people start disappearing on the 4th night. Always the 13th visitor through the gate.',
    attractions: [
      { name: 'The Ring Toss of Binding', type: 'game', description: 'Toss rings onto bottles. The bottles have tiny creatures trapped inside. Winning frees one.', mechanicalChallenge: 'DC 12 Dexterity (simple ring toss). Each success frees a tiny fey. They are grateful but confused.', hiddenDanger: 'The bottles that remain unbroken at closing time absorb a new creature. The "prizes" are the freed fey. They follow you home.', prize: { name: 'Bottle Sprite', description: 'A tiny fey creature in a bottle pendant.', cursed: false } },
      { name: 'The Tunnel of Love (and Consequences)', type: 'ride', description: 'A boat ride through a dark tunnel. Romantic music. Enchanted fireflies. Then the boat goes off the marked path into water that is not water.', mechanicalChallenge: 'DC 14 Wisdom save to resist the charm effect that makes you trust everything you see. DC 13 Perception to notice the path divergence.', hiddenDanger: 'The "off-path" section shows illusions of your deepest desire. Reaching for it pulls you into the water, which is a portal to the Feywild.' },
      { name: 'The Test Your Courage Booth', type: 'game', description: 'Put your hand into a box. Something is in there. It might bite. It might give you treasure. The carnival worker assures you it is "probably fine."', mechanicalChallenge: 'No ability check. Pure player choice. The box contains 1d6: 1=mimic bite (2d6), 2-3=nothing, 4-5=50gp gem, 6=Ring of Feather Falling.', hiddenDanger: 'The box reads your fears. Whatever is inside is always what scares you most. A character afraid of snakes finds snakes. A character afraid of failure finds an empty box.' },
      { name: 'Thornwick\'s Spectacular Spectacular', type: 'show', description: 'A stage show where Thornwick performs genuine magic disguised as tricks. The audience thinks it is all props and wires. It is not.', mechanicalChallenge: 'DC 16 Arcana to realize the magic is real. DC 14 Insight to see Thornwick is performing under duress - his smile is a grimace.', hiddenDanger: 'The show\'s finale requires a "volunteer" to be the target of a Polymorph spell (temporary, but real). The audience thinks it is a costume change.' },
    ],
    darkSecret: 'The 13th visitor through the gate each night is pulled into the thorned version of the carnival, where the attractions are lethal. Thornwick does not control this - it is a condition of his banishment. He hates it.',
    escapeCondition: 'Find Thornwick\'s original name (carved into the central tent pole in Sylvan) and speak it aloud. This breaks his banishment and dissolves the carnival. He owes you a fey favor.',
    timeLimit: 'The carnival stays for 7 days. On the 7th night, the thorned version consumes the real one permanently. All visitors become permanent attractions.',
  },
];

export function getRandomCarnival(): HauntedCarnival {
  return CARNIVALS[Math.floor(Math.random() * CARNIVALS.length)];
}

export function getAttractionCount(carnival: HauntedCarnival): number {
  return carnival.attractions.length;
}

export function getCursedPrizes(carnival: HauntedCarnival): CarnivalPrize[] {
  return carnival.attractions.filter((a) => a.prize?.cursed).map((a) => a.prize!);
}

export function formatCarnival(carnival: HauntedCarnival): string {
  const lines = [`🎪 **${carnival.name}**`];
  lines.push(`  ${carnival.description}`);
  lines.push(`  Owner: ${carnival.owner}`);
  lines.push(`  Hook: ${carnival.arrivalHook}`);
  lines.push('  **Attractions:**');
  for (const a of carnival.attractions) {
    lines.push(`    - **${a.name}** (${a.type}): ${a.description}`);
    lines.push(`      Challenge: ${a.mechanicalChallenge}`);
    lines.push(`      Danger: ${a.hiddenDanger}`);
  }
  lines.push(`  Dark Secret: ${carnival.darkSecret}`);
  lines.push(`  Escape: ${carnival.escapeCondition}`);
  lines.push(`  Time Limit: ${carnival.timeLimit}`);
  return lines.join('\n');
}

export { CARNIVALS as HAUNTED_CARNIVALS };
