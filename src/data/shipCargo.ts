// Ship cargo manifest generator — trade goods with regional value differences and smuggling risk.

export type CargoRegion = 'northern_kingdom' | 'southern_empire' | 'island_chain' | 'desert_coast' | 'elven_ports' | 'dwarven_holds';
export type CargoLegality = 'legal' | 'restricted' | 'contraband';

export interface CargoItem {
  name: string;
  baseValue: number; // per unit in gp
  weight: number; // per unit in lbs
  legality: CargoLegality;
  regionalPrices: Partial<Record<CargoRegion, number>>; // multiplier per region
  spoilage: number | null; // days until worthless (null = doesn't spoil)
  description: string;
}

export interface CargoManifest {
  shipName: string;
  origin: CargoRegion;
  destination: CargoRegion;
  cargo: { item: CargoItem; quantity: number }[];
  totalValue: number;
  totalWeight: number;
  smugglingRisk: boolean;
}

const CARGO_ITEMS: CargoItem[] = [
  { name: 'Silk Bolts', baseValue: 50, weight: 5, legality: 'legal', regionalPrices: { northern_kingdom: 1.5, desert_coast: 0.7, elven_ports: 1.2 }, spoilage: null, description: 'Fine eastern silk. Worth more in cold climates where it can\'t be produced.' },
  { name: 'Iron Ingots', baseValue: 10, weight: 50, legality: 'legal', regionalPrices: { island_chain: 2.0, dwarven_holds: 0.5, elven_ports: 1.5 }, spoilage: null, description: 'Refined iron. Dwarves have plenty, islands have none.' },
  { name: 'Spiced Wine (barrel)', baseValue: 30, weight: 200, legality: 'legal', regionalPrices: { northern_kingdom: 1.8, dwarven_holds: 2.0, desert_coast: 0.8 }, spoilage: 180, description: 'Fine vintage. Commands premium prices in lands that can\'t grow grapes.' },
  { name: 'Arcane Components', baseValue: 100, weight: 2, legality: 'restricted', regionalPrices: { elven_ports: 0.6, dwarven_holds: 2.0, northern_kingdom: 1.5 }, spoilage: null, description: 'Regulated spell components. Requires a license to trade in most ports.' },
  { name: 'Dragonpowder', baseValue: 200, weight: 1, legality: 'contraband', regionalPrices: { southern_empire: 3.0, island_chain: 2.5, northern_kingdom: 2.0 }, spoilage: null, description: 'Explosive alchemical compound. Banned everywhere, wanted everywhere.' },
  { name: 'Fresh Fruit (crate)', baseValue: 5, weight: 30, legality: 'legal', regionalPrices: { northern_kingdom: 3.0, dwarven_holds: 2.5, desert_coast: 0.5 }, spoilage: 7, description: 'Tropical fruit. Must sell fast or it rots. Massive markup in cold climates.' },
  { name: 'Preserved Fish (barrel)', baseValue: 8, weight: 100, legality: 'legal', regionalPrices: { desert_coast: 1.5, dwarven_holds: 1.3, island_chain: 0.5 }, spoilage: 60, description: 'Salted and smoked. Staple trade good. Low risk, low reward.' },
  { name: 'Elven Lace', baseValue: 75, weight: 1, legality: 'legal', regionalPrices: { northern_kingdom: 2.0, southern_empire: 1.8, dwarven_holds: 0.3 }, spoilage: null, description: 'Exquisite handmade lace. Dwarves don\'t understand the appeal.' },
  { name: 'Healing Herbs (pouch)', baseValue: 15, weight: 1, legality: 'legal', regionalPrices: { desert_coast: 2.0, dwarven_holds: 1.5, island_chain: 1.3 }, spoilage: 30, description: 'Medicinal plants. High demand in regions with few healers.' },
  { name: 'Stolen Artifacts', baseValue: 500, weight: 10, legality: 'contraband', regionalPrices: { southern_empire: 2.0, island_chain: 1.5, desert_coast: 1.8 }, spoilage: null, description: 'Museum pieces "liberated" from their display cases. Very hot.' },
];

export function generateManifest(origin: CargoRegion, destination: CargoRegion, itemCount: number = 4): CargoManifest {
  const shuffled = [...CARGO_ITEMS].sort(() => Math.random() - 0.5).slice(0, itemCount);
  const cargo = shuffled.map((item) => ({ item, quantity: Math.floor(Math.random() * 10) + 1 }));
  const totalValue = cargo.reduce((sum, c) => sum + c.item.baseValue * c.quantity * (c.item.regionalPrices[destination] ?? 1), 0);
  const totalWeight = cargo.reduce((sum, c) => sum + c.item.weight * c.quantity, 0);
  const smugglingRisk = cargo.some((c) => c.item.legality !== 'legal');
  return { shipName: `The ${['Swift', 'Golden', 'Iron', 'Storm'][Math.floor(Math.random() * 4)]} ${['Arrow', 'Tide', 'Wind', 'Fortune'][Math.floor(Math.random() * 4)]}`, origin, destination, cargo, totalValue: Math.round(totalValue), totalWeight, smugglingRisk };
}

export function getCargoByLegality(legality: CargoLegality): CargoItem[] {
  return CARGO_ITEMS.filter((c) => c.legality === legality);
}

export function getPerishableCargo(): CargoItem[] {
  return CARGO_ITEMS.filter((c) => c.spoilage !== null);
}

export function getBestTradeRoute(item: CargoItem): { from: CargoRegion; to: CargoRegion; multiplier: number } | null {
  let best = { from: '' as CargoRegion, to: '' as CargoRegion, multiplier: 0 };
  const prices = item.regionalPrices;
  const regions = Object.keys(prices) as CargoRegion[];
  for (const r of regions) {
    if ((prices[r] ?? 1) > best.multiplier) best = { from: regions.find((rr) => (prices[rr] ?? 1) < 1) ?? r, to: r, multiplier: prices[r] ?? 1 };
  }
  return best.multiplier > 0 ? best : null;
}

export function getAllCargoRegions(): CargoRegion[] {
  return ['northern_kingdom', 'southern_empire', 'island_chain', 'desert_coast', 'elven_ports', 'dwarven_holds'];
}

export function formatManifest(manifest: CargoManifest): string {
  const lines = [`📦 **${manifest.shipName}** — ${manifest.origin.replace(/_/g, ' ')} → ${manifest.destination.replace(/_/g, ' ')}`];
  lines.push(`  Total Value: ${manifest.totalValue}gp | Weight: ${manifest.totalWeight} lbs${manifest.smugglingRisk ? ' | ⚠️ CONTRABAND' : ''}`);
  manifest.cargo.forEach((c) => {
    const legal = { legal: '✅', restricted: '⚠️', contraband: '🚫' }[c.item.legality];
    lines.push(`  ${legal} ${c.item.name} × ${c.quantity} (${c.item.baseValue}gp ea)${c.item.spoilage ? ` — spoils in ${c.item.spoilage} days` : ''}`);
  });
  return lines.join('\n');
}

export { CARGO_ITEMS };
