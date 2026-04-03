// Random guild generator — guild name, purpose, leader, HQ.

export interface GeneratedGuild { name: string; purpose: string; leader: string; hq: string; reputation: string; memberCount: string; secretAgenda: string; }

const PREFIXES = ['The', 'Order of the', 'Brotherhood of', 'Guild of', 'Society of', 'Circle of'];
const GUILD_NOUNS = ['Iron Fist', 'Silver Tongue', 'Hidden Blade', 'Crimson Rose', 'Golden Scale', 'Midnight Star', 'Stone Shield', 'Emerald Eye', 'Burning Phoenix', 'Silent Hand', 'Raven\'s Wing', 'Thunderheart'];
const PURPOSES = ['Mercenary company for hire', 'Thieves\' guild running the underworld', 'Merchant cartel controlling trade', 'Arcane scholars researching forbidden magic', 'Religious order spreading the faith', 'Assassin brotherhood', 'Adventurers\' guild organizing expeditions', 'Political faction seeking power', 'Monster hunters protecting the realm', 'Spy network gathering intelligence'];
const LEADERS = ['A cunning halfling with a silver tongue', 'A scarred veteran who speaks softly', 'A mysterious figure known only by codename', 'A charismatic tiefling with grand ambitions', 'An ancient elf who has led for centuries', 'Twin brothers who share leadership', 'A reformed criminal seeking redemption', 'A young prodigy with dangerous ideas'];
const HQS = ['A hidden basement beneath a tavern', 'An imposing guildhall in the merchant quarter', 'A converted temple on the outskirts', 'A ship anchored in the harbor', 'A network of tunnels beneath the city', 'A tower overlooking the city walls', 'A mobile camp that changes location weekly', 'A respectable-looking manor with many secrets'];
const AGENDAS = ['Secretly working to overthrow the local government', 'Searching for a legendary artifact', 'Protecting a dangerous secret about the world', 'Controlled by a dragon in disguise', 'Actually a front for a cult', 'Planning a heist that could change the balance of power', 'Nothing sinister — they\'re genuinely what they claim to be', 'Infiltrated by a rival organization'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateGuild(): GeneratedGuild {
  return { name: `${pick(PREFIXES)} ${pick(GUILD_NOUNS)}`, purpose: pick(PURPOSES), leader: pick(LEADERS), hq: pick(HQS), reputation: pick(['Well-respected', 'Feared', 'Secretive', 'Controversial', 'Beloved by the poor', 'Distrusted by authorities']), memberCount: `${20 + Math.floor(Math.random() * 180)} members`, secretAgenda: pick(AGENDAS) };
}

export function formatGuild(guild: GeneratedGuild): string {
  return `⚜️ **${guild.name}**\n🎯 Purpose: ${guild.purpose}\n👤 Leader: ${guild.leader}\n🏠 HQ: ${guild.hq}\n📢 Reputation: ${guild.reputation} (${guild.memberCount})\n🤫 Secret: ${guild.secretAgenda}`;
}
