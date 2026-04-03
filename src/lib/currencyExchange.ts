// Currency exchange rates — regional currencies with conversion rates.

export interface RegionalCurrency {
  id: string;
  name: string;
  symbol: string;
  region: string;
  rateToGold: number; // how many of this currency = 1gp
}

export const REGIONAL_CURRENCIES: RegionalCurrency[] = [
  { id: 'gp', name: 'Gold Piece', symbol: 'gp', region: 'Standard', rateToGold: 1 },
  { id: 'dragons', name: 'Dragon', symbol: '🐉', region: 'Waterdeep', rateToGold: 1 },
  { id: 'suns', name: 'Sun', symbol: '☀️', region: 'Calimshan', rateToGold: 2 },
  { id: 'nobles', name: 'Noble', symbol: '👑', region: 'Cormyr', rateToGold: 0.5 },
  { id: 'guilders', name: 'Guilder', symbol: '⚜️', region: 'Baldur\'s Gate', rateToGold: 0.8 },
  { id: 'mithral', name: 'Mithral Coin', symbol: '💎', region: 'Elvish Lands', rateToGold: 0.1 },
  { id: 'iron', name: 'Iron Mark', symbol: '⚒️', region: 'Dwarven Holds', rateToGold: 5 },
  { id: 'shells', name: 'Trade Shell', symbol: '🐚', region: 'Coastal Tribes', rateToGold: 10 },
];

export function convert(amount: number, fromCurrency: string, toCurrency: string): { result: number; rate: string } {
  const from = REGIONAL_CURRENCIES.find((c) => c.id === fromCurrency);
  const to = REGIONAL_CURRENCIES.find((c) => c.id === toCurrency);
  if (!from || !to) return { result: 0, rate: 'Unknown currency.' };
  const inGold = amount / from.rateToGold;
  const result = Math.round(inGold * to.rateToGold * 100) / 100;
  return { result, rate: `1 ${from.name} = ${(to.rateToGold / from.rateToGold).toFixed(2)} ${to.name}` };
}

export function formatExchangeRates(): string {
  const lines = ['💱 **Regional Currency Exchange:**'];
  for (const c of REGIONAL_CURRENCIES) {
    if (c.id === 'gp') continue;
    lines.push(`${c.symbol} **${c.name}** (${c.region}): ${c.rateToGold} ${c.name} = 1gp`);
  }
  return lines.join('\n');
}
