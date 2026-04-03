// Arcane black market catalog — forbidden items, cursed goods, and stolen magical artifacts for sale.

export type BlackMarketCategory = 'cursed' | 'forbidden' | 'stolen' | 'experimental' | 'counterfeit' | 'planar';
export type RiskLevel = 'low' | 'moderate' | 'high' | 'extreme';

export interface BlackMarketItem {
  name: string;
  category: BlackMarketCategory;
  price: string;
  riskLevel: RiskLevel;
  description: string;
  actualEffect: string;
  hiddenCatch: string;
  legalConsequence: string;
}

const ITEMS: BlackMarketItem[] = [
  { name: 'Bottled Wish (probably real)', category: 'planar', price: '10,000gp', riskLevel: 'extreme', description: 'A sealed djinni lamp. The seller swears it has one wish left.', actualEffect: 'It IS a real djinni lamp. The djinni is furious about being sold and will twist any wish.', hiddenCatch: 'The djinni remembers every owner. It keeps a grudge list.', legalConsequence: 'Possession of bound extraplanar entities: 5 years imprisonment.' },
  { name: 'Scroll of Forbidden Knowledge', category: 'forbidden', price: '2,000gp', riskLevel: 'high', description: 'A scroll containing a spell removed from all spellbooks by order of the Arcane Council.', actualEffect: 'Contains a functional 6th-level spell that was banned for good reason (DM creates the spell).', hiddenCatch: 'Casting it alerts the Arcane Council. They send investigators within 1d4 days.', legalConsequence: 'Use of forbidden magic: permanent exile from all magical institutions.' },
  { name: 'Counterfeit +2 Sword', category: 'counterfeit', price: '800gp (real +2 costs 4,000gp)', riskLevel: 'moderate', description: 'Looks and detects as a +2 longsword. Suspiciously affordable.', actualEffect: '+2 for 1d4 days. Then reverts to a mundane sword with a glamour that fades.', hiddenCatch: 'The glamour fades mid-combat. Always at the worst possible time.', legalConsequence: 'Fraud if you resell it. 500gp fine and a reputation hit.' },
  { name: 'Cloak of Displacement (stolen)', category: 'stolen', price: '3,000gp (retail 5,000gp)', riskLevel: 'moderate', description: 'A genuine Cloak of Displacement. Fell off the back of a cart. Definitely.', actualEffect: 'Functions as advertised — it\'s real. But the previous owner is looking for it.', hiddenCatch: 'The original owner is a noble with connections. They WILL find you.', legalConsequence: 'Receiving stolen goods: confiscation + 1,000gp fine + 30 days in jail.' },
  { name: 'Bag of Devouring (mislabeled)', category: 'cursed', price: '500gp (sold as Bag of Holding)', riskLevel: 'high', description: '"A perfectly normal Bag of Holding. Barely used. Slight smell."', actualEffect: 'It\'s a Bag of Devouring. Anything placed inside has a 50% chance of being eaten.', hiddenCatch: 'The seller knows exactly what it is. Your gold went in the bag. It\'s already gone.', legalConsequence: 'None for possession, but the seller will deny everything.' },
  { name: 'Experimental Growth Potion', category: 'experimental', price: '150gp', riskLevel: 'moderate', description: 'A potion that permanently increases one ability score by 1. "Barely tested."', actualEffect: 'Increases a random ability score by 1. Also increases a random other score by -1.', hiddenCatch: 'Side effects include: random gender swap (10%), growing a tail (15%), or glowing in the dark permanently (20%).', legalConsequence: 'Unlicensed alchemical products: 200gp fine.' },
  { name: 'Soul Coin', category: 'planar', price: '1,000gp', riskLevel: 'extreme', description: 'A coin containing a trapped soul from the Nine Hells. Powers infernal devices.', actualEffect: 'Functions as a power source for infernal machinery. The soul inside can be heard screaming if you listen closely.', hiddenCatch: 'Possessing a soul coin is detectable by fiends. They will come to collect or trade.', legalConsequence: 'Trafficking in souls: death penalty in most jurisdictions.' },
  { name: 'Potion of "Invisibility" (bulk)', category: 'counterfeit', price: '25gp (real costs 180gp)', riskLevel: 'low', description: 'A crate of 10 "invisibility" potions at an unbeatable price.', actualEffect: 'Turns the drinker slightly translucent. Disadvantage on Perception checks against them, not true invisibility.', hiddenCatch: 'Also turns your clothes invisible. You\'re a visible naked person in transparent skin.', legalConsequence: 'Fraud charge if resold. Public indecency if used in town.' },
];

export function getRandomBlackMarketItem(): BlackMarketItem {
  return ITEMS[Math.floor(Math.random() * ITEMS.length)];
}

export function getItemsByCategory(category: BlackMarketCategory): BlackMarketItem[] {
  return ITEMS.filter((i) => i.category === category);
}

export function getItemsByRisk(risk: RiskLevel): BlackMarketItem[] {
  return ITEMS.filter((i) => i.riskLevel === risk);
}

export function getAllBlackMarketCategories(): BlackMarketCategory[] {
  return [...new Set(ITEMS.map((i) => i.category))];
}

export function formatBlackMarketItem(item: BlackMarketItem, showCatch: boolean = false): string {
  const risk = { low: '🟢', moderate: '🟡', high: '🟠', extreme: '🔴' }[item.riskLevel];
  const lines = [`${risk} **${item.name}** *(${item.category}, ${item.price})*`];
  lines.push(`  *${item.description}*`);
  if (showCatch) { lines.push(`  🔍 Real effect: ${item.actualEffect}`); lines.push(`  ⚠️ Hidden catch: ${item.hiddenCatch}`); lines.push(`  ⚖️ Legal: ${item.legalConsequence}`); }
  return lines.join('\n');
}

export { ITEMS as BLACK_MARKET_ITEMS };
