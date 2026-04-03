// Merchant caravan generator — traveling merchants with unique inventories and quests.

export type CaravanOrigin = 'eastern_empire' | 'northern_wastes' | 'elven_woods' | 'dwarven_holds' | 'desert_tribes' | 'underdark';

export interface CaravanMerchant {
  name: string;
  personality: string;
  specialty: string;
}

export interface CaravanItem {
  name: string;
  price: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'exotic';
  description: string;
}

export interface MerchantCaravan {
  origin: CaravanOrigin;
  caravan_name: string;
  merchant: CaravanMerchant;
  inventory: CaravanItem[];
  questHook: string;
  guardCount: number;
  dangerLevel: 'safe' | 'risky' | 'perilous';
  flavorText: string;
}

const CARAVANS: Omit<MerchantCaravan, 'inventory'>[] = [
  { origin: 'eastern_empire', caravan_name: 'The Jade Serpent', merchant: { name: 'Mei-Ling the Silk Trader', personality: 'Shrewd but fair. Speaks softly, carries a hidden blade.', specialty: 'Silk, spices, and alchemical reagents' }, questHook: 'Mei-Ling needs an escort through bandit-held territory. Payment in rare spices worth 200gp.', guardCount: 6, dangerLevel: 'risky', flavorText: 'Silk banners flutter from painted wagons. The scent of ginger and jasmine fills the air.' },
  { origin: 'northern_wastes', caravan_name: 'Frostbeard\'s Wagons', merchant: { name: 'Bjorn Frostbeard', personality: 'Loud, generous, will arm-wrestle for discounts.', specialty: 'Furs, mammoth ivory, and cold-weather gear' }, questHook: 'Bjorn\'s prize mammoth ivory tusk was stolen by goblins last night. He\'ll trade his best weapon for its return.', guardCount: 8, dangerLevel: 'risky', flavorText: 'Massive sleds packed with furs, pulled by shaggy oxen. Everything smells of woodsmoke.' },
  { origin: 'elven_woods', caravan_name: 'The Silver Leaf', merchant: { name: 'Thandril Moonwhisper', personality: 'Patient, enigmatic. Answers questions with questions.', specialty: 'Elven wine, enchanted trinkets, and living seeds' }, questHook: 'Thandril seeks a rare moonpetal flower that only blooms on the next full moon. Will trade an enchanted item.', guardCount: 4, dangerLevel: 'safe', flavorText: 'Wagons of pale wood, seemingly grown rather than built. Fireflies orbit the lead cart at all hours.' },
  { origin: 'dwarven_holds', caravan_name: 'Ironvein Trading Co.', merchant: { name: 'Gundra Ironvein', personality: 'All business. Prices are firm. Quality is non-negotiable.', specialty: 'Weapons, armor, and mining equipment' }, questHook: 'A rival dwarven clan has been counterfeiting Ironvein steel. Gundra needs proof of the forgery.', guardCount: 10, dangerLevel: 'safe', flavorText: 'Iron-bound wagons, each one a rolling forge. The rhythmic clang of a hammer never stops.' },
  { origin: 'desert_tribes', caravan_name: 'The Sand Serpent', merchant: { name: 'Zara al-Rashid', personality: 'Theatrical storyteller. Everything comes with a legend.', specialty: 'Gems, glass art, and desert survival gear' }, questHook: 'Zara\'s water supply is running low. A nearby oasis has been claimed by a sand wurm. Clear it for discounted gems.', guardCount: 5, dangerLevel: 'perilous', flavorText: 'Camels laden with colorful cloth. Glass chimes sing in the breeze. Sand seems to follow the caravan.' },
  { origin: 'underdark', caravan_name: 'The Pale Market', merchant: { name: 'Xilriss the Quiet', personality: 'Speaks in whispers. Eyes dart constantly. Deals in secrets as much as goods.', specialty: 'Mushrooms, poisons, and bioluminescent materials' }, questHook: 'Xilriss needs someone to deliver a sealed package to a contact in the next city. Don\'t open it. Don\'t ask.', guardCount: 3, dangerLevel: 'perilous', flavorText: 'Lightless wagons with no windows. The merchandise glows faintly. The guards have no eyes.' },
];

const INVENTORIES: Record<CaravanOrigin, CaravanItem[]> = {
  eastern_empire: [
    { name: 'Bolt of Shimmersilk', price: 50, rarity: 'uncommon', description: 'Fabric that changes color in light. Perfect for disguises.' },
    { name: 'Firepowder (3 charges)', price: 100, rarity: 'rare', description: 'Throw to create a 10ft burst of flame. 2d6 fire, DEX DC 12 half.' },
    { name: 'Jade Healing Statuette', price: 75, rarity: 'uncommon', description: 'Crush to restore 3d8 HP. Single use.' },
    { name: 'Spice of True Taste', price: 15, rarity: 'common', description: 'Add to any food to detect poison (turns blue).' },
  ],
  northern_wastes: [
    { name: 'Mammoth Fur Cloak', price: 40, rarity: 'common', description: 'Advantage on saves vs. extreme cold.' },
    { name: 'Frostbrand Oil (3 applications)', price: 120, rarity: 'rare', description: 'Apply to weapon: +1d6 cold damage for 1 hour.' },
    { name: 'Berserker Brew', price: 30, rarity: 'uncommon', description: 'Advantage on STR checks for 10 minutes. Disadvantage on INT checks.' },
    { name: 'Mammoth Ivory Horn', price: 60, rarity: 'uncommon', description: 'Blow to rally allies: +1 to saves for 1 minute.' },
  ],
  elven_woods: [
    { name: 'Moonpetal Wine', price: 80, rarity: 'rare', description: 'Drink to gain darkvision 60ft for 8 hours.' },
    { name: 'Living Seed', price: 200, rarity: 'exotic', description: 'Plant to grow a full tree in 1 minute. Creates difficult terrain in 30ft.' },
    { name: 'Whisperleaf', price: 25, rarity: 'uncommon', description: 'Burn to send a 25-word message to anyone you know within 1 mile.' },
    { name: 'Starlight Lantern', price: 45, rarity: 'uncommon', description: 'Produces bright light 30ft. Only visible to the holder\'s allies.' },
  ],
  dwarven_holds: [
    { name: 'Ironvein Warhammer', price: 150, rarity: 'uncommon', description: '+1 warhammer. Glows near precious metals within 30ft.' },
    { name: 'Mithral Chainmail Links (repair kit)', price: 100, rarity: 'rare', description: 'Repair any metal armor to full. One use.' },
    { name: 'Stonebrew Ale (6-pack)', price: 20, rarity: 'common', description: 'Heals 1d4 HP per bottle. Tastes like granite and courage.' },
    { name: 'Seismic Pick', price: 90, rarity: 'uncommon', description: 'Strikes stone and reveals hidden passages within 10ft. 3 charges/day.' },
  ],
  desert_tribes: [
    { name: 'Mirage Veil', price: 180, rarity: 'rare', description: 'Wear to appear as a different creature for 1 hour. CHA DC 15 to see through.' },
    { name: 'Sandglass Dagger', price: 130, rarity: 'rare', description: '+1 dagger. On crit, target is slowed (half speed) for 1 round.' },
    { name: 'Sun Salt', price: 10, rarity: 'common', description: 'Purifies 1 gallon of water. Also blinds undead (thrown, DC 10).' },
    { name: 'Desert Rose Gem', price: 250, rarity: 'exotic', description: 'Contains one casting of Create Water (3rd level). Shatters after use.' },
  ],
  underdark: [
    { name: 'Glowcap Spores (pouch)', price: 35, rarity: 'uncommon', description: 'Throw to illuminate 20ft for 1 hour. Sticks to surfaces.' },
    { name: 'Drow Sleeping Poison (3 doses)', price: 150, rarity: 'rare', description: 'CON DC 13 or unconscious for 1 hour. Injury delivery.' },
    { name: 'Cave Fisher Silk Rope (50ft)', price: 70, rarity: 'uncommon', description: 'Unbreakable by non-magical means. Supports 2000lbs.' },
    { name: 'Mindshroom', price: 200, rarity: 'exotic', description: 'Eat for telepathy 30ft for 1 hour. WIS DC 12 or also hear surface thoughts.' },
  ],
};

export function generateCaravan(origin?: CaravanOrigin): MerchantCaravan {
  const template = origin
    ? CARAVANS.find((c) => c.origin === origin) || CARAVANS[Math.floor(Math.random() * CARAVANS.length)]
    : CARAVANS[Math.floor(Math.random() * CARAVANS.length)];
  return { ...template, inventory: INVENTORIES[template.origin] };
}

export function getCaravanByOrigin(origin: CaravanOrigin): MerchantCaravan {
  return generateCaravan(origin);
}

export function getAllOrigins(): CaravanOrigin[] {
  return CARAVANS.map((c) => c.origin);
}

export function getExoticItems(caravan: MerchantCaravan): CaravanItem[] {
  return caravan.inventory.filter((i) => i.rarity === 'exotic');
}

export function formatCaravan(caravan: MerchantCaravan): string {
  const icon = { eastern_empire: '🏯', northern_wastes: '❄️', elven_woods: '🌿', dwarven_holds: '⛏️', desert_tribes: '🏜️', underdark: '🕳️' }[caravan.origin];
  const danger = { safe: '🟢', risky: '🟡', perilous: '🔴' }[caravan.dangerLevel];
  const lines = [`${icon} **${caravan.caravan_name}** ${danger} *(${caravan.origin.replace(/_/g, ' ')})*`];
  lines.push(`  *${caravan.flavorText}*`);
  lines.push(`  **Merchant:** ${caravan.merchant.name} — ${caravan.merchant.personality}`);
  lines.push(`  **Guards:** ${caravan.guardCount} | **Specialty:** ${caravan.merchant.specialty}`);
  lines.push('  **Inventory:**');
  caravan.inventory.forEach((i) => {
    const rarIcon = { common: '⚪', uncommon: '🟢', rare: '🔵', exotic: '🟣' }[i.rarity];
    lines.push(`    ${rarIcon} ${i.name} (${i.price}gp) — ${i.description}`);
  });
  lines.push(`  **Quest:** ${caravan.questHook}`);
  return lines.join('\n');
}
