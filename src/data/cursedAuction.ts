// Cursed artifact auction — bidding wars for dangerous magical items.

export type AuctionRisk = 'low' | 'moderate' | 'high' | 'catastrophic';

export interface AuctionLot {
  lotNumber: number;
  name: string;
  description: string;
  truNature: string; // what the auctioneer doesn't tell you
  startingBid: number;
  estimatedValue: number;
  risk: AuctionRisk;
  rivalBidder: string;
  rivalMaxBid: number;
  curseEffect: string | null;
}

export interface CursedAuction {
  auctionName: string;
  location: string;
  auctioneer: string;
  lots: AuctionLot[];
  houseRules: string[];
  plotTwist: string;
}

const AUCTIONS: CursedAuction[] = [
  { auctionName: 'The Midnight Bazaar', location: 'A condemned warehouse, midnight sharp. Invitation only.', auctioneer: 'Madame Vesper — a tiefling in a top hat who speaks entirely in rhyming couplets.', lots: [
    { lotNumber: 1, name: 'The Weeping Locket', description: 'A silver locket that cries real tears. Opens to reveal a miniature portrait that changes daily.', truNature: 'Contains the soul of a child who died 200 years ago. The tears are the child\'s grief.', startingBid: 100, estimatedValue: 500, risk: 'moderate', rivalBidder: 'A necromancer who wants the soul.', rivalMaxBid: 400, curseEffect: 'Wearer hears crying at night. -2 to long rest recovery unless the soul is freed.' },
    { lotNumber: 2, name: 'The Gambler\'s Coin', description: 'A gold coin that always lands on the side you call. Never fails.', truNature: 'It grants luck by stealing it from others nearby. Someone within 30ft gets equally bad luck.', startingBid: 200, estimatedValue: 1000, risk: 'high', rivalBidder: 'A halfling crime boss who understands exactly what it does.', rivalMaxBid: 800, curseEffect: 'Every time you succeed, someone near you critically fails. The coin decides who.' },
    { lotNumber: 3, name: 'Bottle of Captured Starlight', description: 'Literally bottled starlight. Illuminates a 60ft radius with daylight-equivalent light.', truNature: 'The light is from a dying star. It will go supernova in 1d4 months. Inside the bottle.', startingBid: 500, estimatedValue: 2000, risk: 'catastrophic', rivalBidder: 'An astronomer who knows what it really is and is trying to save it.', rivalMaxBid: 1500, curseEffect: 'Ticking time bomb. When it goes: 20d6 radiant in 100ft radius.' },
  ], houseRules: ['All sales final.', 'No violence on premises (enforced by invisible golems).', 'Payment in gold, gems, or "interesting alternatives."', 'The auctioneer is never wrong. Even when she is.'], plotTwist: 'Lot 4 (unlisted): The auctioneer herself. She\'s selling her own contract. Whoever buys it owns her services for 1 year.' },
  { auctionName: 'The Estate of the Late Archmage', location: 'The archmage\'s former tower. Everything must go. Literally everything.', auctioneer: 'The archmage\'s ghost, who is doing this under protest.', lots: [
    { lotNumber: 1, name: 'Self-Stirring Cauldron', description: 'A cauldron that stirs itself. Useful for alchemy.', truNature: 'It stirs EVERYTHING. Installed in a kitchen, it stirs the soup, the coffee, and eventually the air.', startingBid: 50, estimatedValue: 200, risk: 'low', rivalBidder: 'A potion shop owner.', rivalMaxBid: 150, curseEffect: 'Creates a 5ft vortex if left unattended for more than 8 hours.' },
    { lotNumber: 2, name: 'The Archmage\'s Diary', description: 'Personal journal spanning 300 years. Valuable research notes inside.', truNature: 'The diary is sentient. It reads YOU while you read it. It judges. It gossips.', startingBid: 300, estimatedValue: 2000, risk: 'moderate', rivalBidder: 'The Cerulean Tower (mages\' guild). They want the research.', rivalMaxBid: 1500, curseEffect: 'The diary tells other books your secrets. Libraries become awkward.' },
    { lotNumber: 3, name: 'Staff of the Archmage', description: 'The famous Staff of Quel\'tharis. +3. 50 charges. The real deal.', truNature: 'It\'s real, but the archmage\'s personality is imprinted on it. It backseat-drives all spellcasting.', startingBid: 5000, estimatedValue: 30000, risk: 'moderate', rivalBidder: 'A young wizard who was the archmage\'s final apprentice. Emotional attachment.', rivalMaxBid: 8000, curseEffect: 'The staff criticizes your spell choices. "A FIREBALL? In this economy? Use Cone of Cold, you amateur."' },
  ], houseRules: ['The ghost may bid on their own items (to prevent them leaving).', 'Items may defend themselves.', 'The tower is the final lot. It comes with the ghost.'], plotTwist: 'The archmage faked their death to escape debts. The ghost is an illusion. The real archmage is bidding anonymously on their own staff.' },
];

export function getRandomAuction(): CursedAuction {
  return AUCTIONS[Math.floor(Math.random() * AUCTIONS.length)];
}

export function getTotalLots(auction: CursedAuction): number {
  return auction.lots.length;
}

export function getCursedLots(auction: CursedAuction): AuctionLot[] {
  return auction.lots.filter((l) => l.curseEffect !== null);
}

export function getHighRiskLots(auction: CursedAuction): AuctionLot[] {
  return auction.lots.filter((l) => l.risk === 'high' || l.risk === 'catastrophic');
}

export function formatAuction(auction: CursedAuction): string {
  const lines = [`🔨 **${auction.auctionName}**`];
  lines.push(`  📍 ${auction.location}`);
  lines.push(`  🎩 Auctioneer: ${auction.auctioneer}`);
  auction.lots.forEach((l) => {
    const risk = { low: '🟢', moderate: '🟡', high: '🟠', catastrophic: '🔴' }[l.risk];
    lines.push(`  ${risk} Lot ${l.lotNumber}: **${l.name}** — Starting: ${l.startingBid}gp`);
  });
  lines.push(`  🔄 Twist: ${auction.plotTwist}`);
  return lines.join('\n');
}

export { AUCTIONS as CURSED_AUCTIONS };
