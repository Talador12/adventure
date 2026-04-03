// Merchant haggling mini-game — price negotiation with NPC personality modifiers.

export type MerchantMood = 'generous' | 'fair' | 'firm' | 'greedy' | 'desperate';
export type HaggleTactic = 'flattery' | 'intimidation' | 'sob_story' | 'bulk_deal' | 'walk_away' | 'trade_offer';

export interface HaggleResult { priceMultiplier: number; merchantReaction: string; relationshipChange: number; }

export interface MerchantPersonality {
  mood: MerchantMood;
  baseMarkup: number; // 1.0 = fair price, 1.5 = 50% markup
  weakTo: HaggleTactic[];
  immuneTo: HaggleTactic[];
  description: string;
}

const PERSONALITIES: MerchantPersonality[] = [
  { mood: 'generous', baseMarkup: 0.9, weakTo: ['flattery', 'sob_story'], immuneTo: [], description: 'Genuinely kind. Will give discounts to people they like. Don\'t exploit them.' },
  { mood: 'fair', baseMarkup: 1.0, weakTo: ['bulk_deal', 'trade_offer'], immuneTo: ['sob_story'], description: 'Business is business. Respects competence. Dislikes drama.' },
  { mood: 'firm', baseMarkup: 1.2, weakTo: ['walk_away', 'bulk_deal'], immuneTo: ['flattery', 'sob_story'], description: 'Knows the value of everything. Won\'t budge without a good reason.' },
  { mood: 'greedy', baseMarkup: 1.5, weakTo: ['intimidation', 'walk_away'], immuneTo: ['flattery', 'sob_story'], description: 'Gouges prices. Smells desperation. Respects only power and scarcity.' },
  { mood: 'desperate', baseMarkup: 0.7, weakTo: ['bulk_deal', 'trade_offer', 'flattery'], immuneTo: ['intimidation'], description: 'Needs to sell. Will accept almost any offer. Intimidation just makes them cry.' },
];

const TACTIC_RESULTS: Record<HaggleTactic, { dc: number; skill: string; successDiscount: number; failurePenalty: number }> = {
  flattery: { dc: 12, skill: 'Persuasion', successDiscount: 0.1, failurePenalty: 0 },
  intimidation: { dc: 14, skill: 'Intimidation', successDiscount: 0.15, failurePenalty: 0.1 },
  sob_story: { dc: 13, skill: 'Performance', successDiscount: 0.15, failurePenalty: 0.05 },
  bulk_deal: { dc: 11, skill: 'Persuasion', successDiscount: 0.1, failurePenalty: 0 },
  walk_away: { dc: 13, skill: 'Insight', successDiscount: 0.2, failurePenalty: 0 },
  trade_offer: { dc: 12, skill: 'Persuasion', successDiscount: 0.1, failurePenalty: 0 },
};

export function getMerchantPersonality(mood: MerchantMood): MerchantPersonality | undefined {
  return PERSONALITIES.find((p) => p.mood === mood);
}

export function getRandomMood(): MerchantMood {
  return PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)].mood;
}

export function resolveHaggle(mood: MerchantMood, tactic: HaggleTactic, rollResult: number): HaggleResult {
  const personality = getMerchantPersonality(mood)!;
  const tacticInfo = TACTIC_RESULTS[tactic];
  if (personality.immuneTo.includes(tactic)) return { priceMultiplier: personality.baseMarkup + 0.05, merchantReaction: '"Nice try. That doesn\'t work on me."', relationshipChange: -1 };
  const weak = personality.weakTo.includes(tactic);
  const dc = weak ? tacticInfo.dc - 3 : tacticInfo.dc;
  if (rollResult >= dc) {
    const discount = weak ? tacticInfo.successDiscount * 1.5 : tacticInfo.successDiscount;
    return { priceMultiplier: Math.max(0.5, personality.baseMarkup - discount), merchantReaction: '"You drive a hard bargain. Fine."', relationshipChange: 1 };
  }
  return { priceMultiplier: personality.baseMarkup + tacticInfo.failurePenalty, merchantReaction: '"I don\'t think so. Price stays."', relationshipChange: 0 };
}

export function getAllMoods(): MerchantMood[] {
  return PERSONALITIES.map((p) => p.mood);
}

export function getAllTactics(): HaggleTactic[] {
  return Object.keys(TACTIC_RESULTS) as HaggleTactic[];
}

export function formatHaggleResult(result: HaggleResult, basePrice: number): string {
  const finalPrice = Math.round(basePrice * result.priceMultiplier);
  const diff = finalPrice - basePrice;
  const icon = diff < 0 ? '💚' : diff > 0 ? '💸' : '🤝';
  return `${icon} Final price: ${finalPrice}gp (${diff >= 0 ? '+' : ''}${diff}gp) — *${result.merchantReaction}*`;
}

export { PERSONALITIES as MERCHANT_PERSONALITIES, TACTIC_RESULTS };
