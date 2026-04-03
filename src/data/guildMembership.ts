// Random guild membership perks — benefits and obligations by guild rank.

export type GuildType = 'adventurers' | 'merchants' | 'thieves' | 'mages' | 'crafters' | 'healers';
export type GuildRank = 'initiate' | 'member' | 'veteran' | 'officer' | 'master';

export interface GuildPerk {
  rank: GuildRank;
  name: string;
  description: string;
  mechanicalEffect: string;
}

export interface GuildObligation {
  rank: GuildRank;
  obligation: string;
  frequency: string;
  penalty: string;
}

export interface Guild {
  type: GuildType;
  name: string;
  motto: string;
  entryRequirement: string;
  dues: string;
  perks: GuildPerk[];
  obligations: GuildObligation[];
  ranks: { rank: GuildRank; title: string; xpRequired: number }[];
}

const GUILDS: Guild[] = [
  { type: 'adventurers', name: 'The Silver Compass', motto: 'No quest too bold.', entryRequirement: 'Complete one guild-posted quest.', dues: '5gp/month', perks: [
    { rank: 'initiate', name: 'Guild Contacts', description: 'Access to the quest board and guild tavern.', mechanicalEffect: 'Can accept guild quests. Free basic lodging at any guild hall.' },
    { rank: 'member', name: 'Equipment Loan', description: 'Borrow non-magical equipment for quests.', mechanicalEffect: 'Borrow up to 100gp of gear per quest (returned after).' },
    { rank: 'veteran', name: 'Reputation', description: 'Known by name. NPCs trust you more.', mechanicalEffect: '+2 to Persuasion with commoners. Advantage on CHA checks with other guild members.' },
    { rank: 'officer', name: 'Guild Strike Team', description: 'Call in backup on dangerous quests.', mechanicalEffect: 'Once per month, summon 1d4 guild members (CR 2 each) for one quest.' },
    { rank: 'master', name: 'Guild Hall Authority', description: 'Run your own guild hall. Assign quests.', mechanicalEffect: 'Passive income: 50gp/month. Can assign quests to lower-ranked members.' },
  ], obligations: [
    { rank: 'initiate', obligation: 'Complete 1 guild quest per month.', frequency: 'Monthly', penalty: 'Membership revoked after 2 months of inactivity.' },
    { rank: 'officer', obligation: 'Mentor one initiate.', frequency: 'Ongoing', penalty: 'Demotion to veteran rank.' },
  ], ranks: [{ rank: 'initiate', title: 'Compass Seeker', xpRequired: 0 }, { rank: 'member', title: 'Compass Bearer', xpRequired: 500 }, { rank: 'veteran', title: 'True North', xpRequired: 2000 }, { rank: 'officer', title: 'Star Guide', xpRequired: 5000 }, { rank: 'master', title: 'Grand Navigator', xpRequired: 10000 }] },
  { type: 'merchants', name: 'The Golden Ledger', motto: 'Profit is poetry.', entryRequirement: 'Demonstrate a successful trade (50gp+ profit).', dues: '10gp/month', perks: [
    { rank: 'initiate', name: 'Trade Routes', description: 'Access to guild caravan schedules.', mechanicalEffect: 'Know the safest and fastest trade routes. -20% travel encounter chance.' },
    { rank: 'member', name: 'Bulk Discounts', description: 'Guild negotiated rates at member shops.', mechanicalEffect: '10% discount on all purchases at guild-affiliated shops.' },
    { rank: 'veteran', name: 'Credit Line', description: 'Buy now, pay later.', mechanicalEffect: 'Up to 500gp credit at any guild shop. 5% monthly interest.' },
    { rank: 'officer', name: 'Monopoly License', description: 'Exclusive right to trade specific goods in a region.', mechanicalEffect: '+25% profit on designated goods. Regional reputation +2.' },
    { rank: 'master', name: 'Trade Empire', description: 'Own a fleet of merchant wagons.', mechanicalEffect: 'Passive income: 100gp/month. Can establish new trade routes.' },
  ], obligations: [
    { rank: 'member', obligation: 'Report trade intelligence to the guild.', frequency: 'Per transaction over 100gp', penalty: '50gp fine per unreported transaction.' },
  ], ranks: [{ rank: 'initiate', title: 'Coin Counter', xpRequired: 0 }, { rank: 'member', title: 'Ledger Keeper', xpRequired: 300 }, { rank: 'veteran', title: 'Silver Merchant', xpRequired: 1500 }, { rank: 'officer', title: 'Gold Trader', xpRequired: 4000 }, { rank: 'master', title: 'Platinum Magnate', xpRequired: 8000 }] },
  { type: 'mages', name: 'The Cerulean Tower', motto: 'Knowledge before power.', entryRequirement: 'Cast a 1st-level spell in front of the admissions board.', dues: '15gp/month (paid in components or service)', perks: [
    { rank: 'initiate', name: 'Library Access', description: 'The tower\'s library of common spells.', mechanicalEffect: 'Copy spells from the library at half cost (common spells only).' },
    { rank: 'member', name: 'Laboratory Time', description: 'Access to alchemical and enchanting labs.', mechanicalEffect: 'Advantage on crafting checks for potions and scrolls.' },
    { rank: 'veteran', name: 'Restricted Section', description: 'Access to rare and dangerous knowledge.', mechanicalEffect: 'Copy rare spells. Access to lore on legendary creatures and artifacts.' },
    { rank: 'officer', name: 'Teleportation Circle', description: 'Use the tower\'s permanent circles.', mechanicalEffect: 'Free Teleportation Circle travel between guild towers (major cities).' },
    { rank: 'master', name: 'Archmage\'s Council', description: 'Seat on the ruling council.', mechanicalEffect: 'Political influence. Can request guild resources for major magical undertakings.' },
  ], obligations: [
    { rank: 'initiate', obligation: 'Attend weekly lectures.', frequency: 'Weekly', penalty: 'Access restricted until attendance improves.' },
    { rank: 'veteran', obligation: 'Contribute one new spell or discovery per year.', frequency: 'Annually', penalty: 'Demotion and restricted access.' },
  ], ranks: [{ rank: 'initiate', title: 'Apprentice', xpRequired: 0 }, { rank: 'member', title: 'Acolyte', xpRequired: 400 }, { rank: 'veteran', title: 'Magister', xpRequired: 2000 }, { rank: 'officer', title: 'Archon', xpRequired: 6000 }, { rank: 'master', title: 'Archmage', xpRequired: 12000 }] },
];

export function getGuild(type: GuildType): Guild | undefined {
  return GUILDS.find((g) => g.type === type);
}

export function getPerksForRank(guild: Guild, rank: GuildRank): GuildPerk[] {
  const rankOrder: GuildRank[] = ['initiate', 'member', 'veteran', 'officer', 'master'];
  const maxIdx = rankOrder.indexOf(rank);
  return guild.perks.filter((p) => rankOrder.indexOf(p.rank) <= maxIdx);
}

export function getObligationsForRank(guild: Guild, rank: GuildRank): GuildObligation[] {
  const rankOrder: GuildRank[] = ['initiate', 'member', 'veteran', 'officer', 'master'];
  const maxIdx = rankOrder.indexOf(rank);
  return guild.obligations.filter((o) => rankOrder.indexOf(o.rank) <= maxIdx);
}

export function getAllGuildTypes(): GuildType[] {
  return GUILDS.map((g) => g.type);
}

export function formatGuild(guild: Guild, rank: GuildRank = 'initiate'): string {
  const perks = getPerksForRank(guild, rank);
  const lines = [`🏛️ **${guild.name}** *(${guild.type})* — *"${guild.motto}"*`];
  lines.push(`  Entry: ${guild.entryRequirement} | Dues: ${guild.dues}`);
  lines.push(`  Rank: ${guild.ranks.find((r) => r.rank === rank)?.title ?? rank}`);
  lines.push('  **Active Perks:**');
  perks.forEach((p) => lines.push(`    ✅ ${p.name}: ${p.mechanicalEffect}`));
  return lines.join('\n');
}

export { GUILDS };
