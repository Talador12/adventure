// Shopkeeper personality generator — instant personality for any merchant.
export interface ShopkeeperPersonality { greeting: string; haggleStyle: string; quirk: string; secret: string; mood: 'friendly' | 'grumpy' | 'nervous' | 'enthusiastic' | 'suspicious'; }
const GREETINGS = ['Welcome, welcome! What can I get you?', 'Yeah? What do you want?', '*eyes you suspiciously* Can I... help you?', 'AH! A customer! Finally! Come in, come in!', 'Good day, traveler. Browse at your leisure.', '*barely looks up* Prices are on the tags.'];
const HAGGLE_STYLES = ['Won\'t budge an inch on price', 'Enjoys the back-and-forth', 'Caves immediately if pressured', 'Gets offended by lowball offers', 'Will trade favors instead of gold', 'Adds hidden fees after agreeing'];
const QUIRKS = ['Counts every coin three times', 'Talks to the merchandise', 'Insists on wrapping everything elaborately', 'Has a pet rat on their shoulder', 'Tells a story about every item', 'Speaks in whispers for no reason'];
const SECRETS = ['Actually a fence for the thieves\' guild', 'Sells cursed items knowingly', 'Is saving up to leave town forever', 'Has a hidden room with rare magic items', 'Nothing — just a normal shopkeeper', 'Is an informant for the crown'];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
export function generateShopkeeper(): ShopkeeperPersonality { return { greeting: pick(GREETINGS), haggleStyle: pick(HAGGLE_STYLES), quirk: pick(QUIRKS), secret: pick(SECRETS), mood: pick(['friendly', 'grumpy', 'nervous', 'enthusiastic', 'suspicious']) }; }
export function formatShopkeeper(s: ShopkeeperPersonality): string { return `🏪 **Shopkeeper:**\n💬 *"${s.greeting}"* (${s.mood})\n🤝 Haggle: ${s.haggleStyle}\n🎭 Quirk: ${s.quirk}\n🤫 Secret: ${s.secret}`; }
