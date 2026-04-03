// Random diplomatic gift generator — culturally appropriate gifts for foreign dignitaries.

export type GiftCulture = 'dwarven' | 'elvish' | 'orcish' | 'human_noble' | 'halfling' | 'dragonborn' | 'fey';
export type GiftOutcome = 'impressed' | 'satisfied' | 'indifferent' | 'offended';

export interface DiplomaticGift {
  name: string;
  culture: GiftCulture;
  value: number;
  description: string;
  culturalSignificance: string;
  reactionIfGiven: GiftOutcome;
  taboo: string | null; // what NOT to give this culture
}

const GIFTS: DiplomaticGift[] = [
  { name: 'Masterwork Warhammer', culture: 'dwarven', value: 200, description: 'A finely crafted warhammer with clan runes.', culturalSignificance: 'Dwarves value craftsmanship. A good weapon says "I respect your skills."', reactionIfGiven: 'impressed', taboo: 'Never give a dwarf an empty mug. It implies they can\'t fill their own.' },
  { name: 'Aged Mountain Ale (barrel)', culture: 'dwarven', value: 50, description: 'A 20-year oak-aged mountain ale. Complex, peaty, strong.', culturalSignificance: 'Sharing ale is sharing fellowship. Older ale = deeper respect.', reactionIfGiven: 'satisfied', taboo: null },
  { name: 'Living Song Crystal', culture: 'elvish', value: 300, description: 'A crystal that replays a captured piece of music when sunlight hits it.', culturalSignificance: 'Elves treasure art that endures. Music preserved in crystal is deeply personal.', reactionIfGiven: 'impressed', taboo: 'Never give an elf something made of iron. It\'s considered toxic and insulting.' },
  { name: 'Ancient Poetry Collection', culture: 'elvish', value: 150, description: 'Handwritten poems from a pre-cataclysm poet.', culturalSignificance: 'Preserving the past is sacred to elves. Original manuscripts are priceless emotionally.', reactionIfGiven: 'impressed', taboo: null },
  { name: 'Trophy Skull (worthy enemy)', culture: 'orcish', value: 0, description: 'The skull of a powerful creature you personally defeated.', culturalSignificance: 'Orcs respect strength. Showing proof of your kills is the highest compliment.', reactionIfGiven: 'impressed', taboo: 'Never offer gold as a primary gift. Orcs view it as trying to buy loyalty — deeply offensive.' },
  { name: 'Imported Pipe Tobacco', culture: 'halfling', value: 30, description: 'Rare southern tobacco blend. Smooth, aromatic, with hints of cherry.', culturalSignificance: 'Halflings value comfort and sharing. Pipe tobacco is personal and communal.', reactionIfGiven: 'satisfied', taboo: 'Never give a halfling a travel pack. It implies they should leave home. Rude.' },
  { name: 'Royal Seal Ring', culture: 'human_noble', value: 500, description: 'A signet ring bearing the party\'s emblem, set with a gemstone.', culturalSignificance: 'Among human nobles, a seal ring is a symbol of trust and alliance.', reactionIfGiven: 'impressed', taboo: 'Never give a noble something cheap. They notice. They ALWAYS notice.' },
  { name: 'Dragon Scale Cloak Pin', culture: 'dragonborn', value: 250, description: 'A cloak pin made from a shed dragon scale, polished to a mirror finish.', culturalSignificance: 'Dragonborn honor their draconic heritage. Dragon materials show understanding.', reactionIfGiven: 'impressed', taboo: 'Never mock or diminish any dragon in a dragonborn\'s presence. Even evil dragons are kin.' },
  { name: 'Riddle Box', culture: 'fey', value: 100, description: 'A puzzle box that sings a different tune each time it\'s opened.', culturalSignificance: 'Fey love novelty. Something that is never the same twice is the perfect gift.', reactionIfGiven: 'impressed', taboo: 'Never give a fey something boring. Boredom is considered a personal attack.' },
];

export function getRandomGift(): DiplomaticGift {
  return GIFTS[Math.floor(Math.random() * GIFTS.length)];
}

export function getGiftsForCulture(culture: GiftCulture): DiplomaticGift[] {
  return GIFTS.filter((g) => g.culture === culture);
}

export function getGiftsByOutcome(outcome: GiftOutcome): DiplomaticGift[] {
  return GIFTS.filter((g) => g.reactionIfGiven === outcome);
}

export function getGiftsWithTaboos(): DiplomaticGift[] {
  return GIFTS.filter((g) => g.taboo !== null);
}

export function getAllGiftCultures(): GiftCulture[] {
  return [...new Set(GIFTS.map((g) => g.culture))];
}

export function formatGift(gift: DiplomaticGift): string {
  const outcome = { impressed: '⭐', satisfied: '✅', indifferent: '😐', offended: '😡' }[gift.reactionIfGiven];
  const lines = [`🎁 ${outcome} **${gift.name}** *(${gift.culture}, ${gift.value}gp)*`];
  lines.push(`  *${gift.description}*`);
  lines.push(`  📜 Significance: ${gift.culturalSignificance}`);
  if (gift.taboo) lines.push(`  🚫 Taboo: ${gift.taboo}`);
  return lines.join('\n');
}

export { GIFTS as DIPLOMATIC_GIFTS };
