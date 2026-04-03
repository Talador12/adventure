// Random unusual shop item — things you find in peculiar shops.
export interface UnusualItem { name: string; price: string; description: string; actuallyUseful: boolean; }
const ITEMS: UnusualItem[] = [
  { name: 'Self-Stirring Teacup', price: '5gp', description: 'Stirs itself when filled with hot liquid. Never spills.', actuallyUseful: false },
  { name: 'Boots of Comfortable Walking', price: '25gp', description: 'Your feet never hurt. No blisters. Ever.', actuallyUseful: true },
  { name: 'Rock of Gravity Detection', price: '1gp', description: 'Drop it. If it falls, gravity is working. Guaranteed.', actuallyUseful: false },
  { name: 'Everlasting Chalk', price: '10gp', description: 'Never wears down. Write on anything. Can\'t be erased.', actuallyUseful: true },
  { name: 'Jar of Preserved Sunshine', price: '50gp', description: 'Open it to release bright light (30ft) for 10 minutes. One use.', actuallyUseful: true },
  { name: 'Mood Ring (Actual Magic)', price: '15gp', description: 'Changes color based on the wearer\'s genuine emotions. Can\'t be fooled.', actuallyUseful: true },
  { name: 'Bag of Endless Sand', price: '3gp', description: 'Pull out a handful of sand whenever you want. Why? That\'s your problem.', actuallyUseful: false },
  { name: 'Compass of Regret', price: '20gp', description: 'Points toward the last place you made a mistake. Uncomfortable.', actuallyUseful: true },
  { name: 'Fork of Tasting', price: '8gp', description: 'Tells you if food is poisoned. Whispers "poison" or "safe." Loudly.', actuallyUseful: true },
  { name: 'Cloak of Billowing', price: '10gp', description: 'Billows dramatically at will. No wind required.', actuallyUseful: false },
];
export function getRandomShopItem(): UnusualItem { return ITEMS[Math.floor(Math.random() * ITEMS.length)]; }
export function formatShopItem(i: UnusualItem): string { return `🏪 **${i.name}** (${i.price})${i.actuallyUseful ? ' ✅' : ' 🎭'}\n*${i.description}*`; }
