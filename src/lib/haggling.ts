// Merchant haggling mini-game — CHA-based bargaining with NPC personality.
// Player makes a CHA check vs merchant's Haggle DC. Result adjusts price.

export type MerchantPersonality = 'greedy' | 'fair' | 'generous' | 'stubborn' | 'nervous';

export interface HaggleResult {
  originalPrice: number;
  finalPrice: number;
  discount: number; // percentage
  roll: number;
  dc: number;
  success: boolean;
  criticalSuccess: boolean;
  criticalFail: boolean;
  narration: string;
}

const PERSONALITY_CONFIG: Record<MerchantPersonality, { dc: number; maxDiscount: number; failMarkup: number; flavor: string }> = {
  greedy: { dc: 16, maxDiscount: 10, failMarkup: 10, flavor: 'narrows their eyes and crosses their arms' },
  fair: { dc: 12, maxDiscount: 15, failMarkup: 0, flavor: 'considers your offer thoughtfully' },
  generous: { dc: 8, maxDiscount: 25, failMarkup: 0, flavor: 'smiles warmly at your approach' },
  stubborn: { dc: 18, maxDiscount: 5, failMarkup: 15, flavor: 'scowls and refuses to budge' },
  nervous: { dc: 10, maxDiscount: 20, failMarkup: 5, flavor: 'fidgets and looks around anxiously' },
};

export function haggle(
  originalPrice: number,
  chaModifier: number,
  merchantPersonality: MerchantPersonality = 'fair',
  proficiencyBonus: number = 0,
  advantage: boolean = false,
): HaggleResult {
  const config = PERSONALITY_CONFIG[merchantPersonality];
  const dc = config.dc;

  // Roll
  let roll1 = Math.floor(Math.random() * 20) + 1;
  let roll2 = Math.floor(Math.random() * 20) + 1;
  const naturalRoll = advantage ? Math.max(roll1, roll2) : roll1;
  const totalRoll = naturalRoll + chaModifier + proficiencyBonus;

  const criticalSuccess = naturalRoll === 20;
  const criticalFail = naturalRoll === 1;

  let discount: number;
  let narration: string;

  if (criticalFail) {
    discount = -config.failMarkup; // price goes UP
    narration = `The merchant ${config.flavor}. Your fumbled attempt offends them — price goes UP ${config.failMarkup}%!`;
  } else if (criticalSuccess) {
    discount = config.maxDiscount + 10; // extra 10% on nat 20
    narration = `Natural 20! The merchant is so charmed they offer their best price — ${config.maxDiscount + 10}% off!`;
  } else if (totalRoll >= dc + 5) {
    discount = config.maxDiscount;
    narration = `Excellent haggling! The merchant ${config.flavor} and offers ${config.maxDiscount}% off.`;
  } else if (totalRoll >= dc) {
    discount = Math.round(config.maxDiscount * 0.6);
    narration = `A fair bargain. The merchant agrees to ${Math.round(config.maxDiscount * 0.6)}% off.`;
  } else {
    discount = 0;
    narration = `The merchant ${config.flavor}. No discount today.`;
  }

  const finalPrice = Math.max(1, Math.round(originalPrice * (1 - discount / 100)));

  return {
    originalPrice,
    finalPrice,
    discount,
    roll: totalRoll,
    dc,
    success: discount > 0,
    criticalSuccess,
    criticalFail,
    narration,
  };
}

export function getPersonalityFromDisposition(disposition: number): MerchantPersonality {
  if (disposition >= 2) return 'generous';
  if (disposition >= 1) return 'fair';
  if (disposition === 0) return 'fair';
  if (disposition >= -1) return 'stubborn';
  return 'greedy';
}

export function formatHaggleResult(result: HaggleResult, itemName: string): string {
  const lines = [`🤝 **Haggling for ${itemName}:**`];
  lines.push(`Roll: ${result.roll} vs DC ${result.dc}${result.criticalSuccess ? ' (NAT 20!)' : ''}${result.criticalFail ? ' (NAT 1!)' : ''}`);
  lines.push(result.narration);
  if (result.discount !== 0) {
    lines.push(`Price: ~~${result.originalPrice}gp~~ → **${result.finalPrice}gp** (${result.discount > 0 ? '-' : '+'}${Math.abs(result.discount)}%)`);
  } else {
    lines.push(`Price: ${result.originalPrice}gp (no change)`);
  }
  return lines.join('\n');
}
