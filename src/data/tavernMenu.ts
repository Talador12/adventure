// Food and drink menu — tavern menus with prices and effects.
export interface MenuItem { name: string; type: 'food' | 'drink'; price: string; description: string; effect?: string; }
export const TAVERN_MENU: MenuItem[] = [
  { name: 'Ale', type: 'drink', price: '4cp', description: 'A mug of the house brew.' },
  { name: 'Fine Wine', type: 'drink', price: '1sp', description: 'A glass of imported elven wine.' },
  { name: 'Dragon\'s Breath Whiskey', type: 'drink', price: '5sp', description: 'Burns going down. Literally.', effect: 'CON DC 10 or cough fire (1 damage to self, harmless but dramatic).' },
  { name: 'Dwarven Stout', type: 'drink', price: '8cp', description: 'So thick you could stand a spoon in it.', effect: '+1 temp HP. One drink max.' },
  { name: 'Bread and Cheese', type: 'food', price: '2cp', description: 'Simple but filling.' },
  { name: 'Roast Boar', type: 'food', price: '3sp', description: 'A whole boar, slow-roasted with herbs.', effect: 'Counts as a full day\'s rations.' },
  { name: 'Mystery Stew', type: 'food', price: '1cp', description: 'Don\'t ask what\'s in it.', effect: 'Roll d6: 1-2 delicious, 3-4 mediocre, 5-6 CON DC 8 or sick.' },
  { name: 'Elven Waybread', type: 'food', price: '2gp', description: 'Lembas-like travel bread. Lasts forever.', effect: 'One piece sustains a person for a full day.' },
  { name: 'Honeyed Mead', type: 'drink', price: '6cp', description: 'Sweet and potent.', effect: 'Advantage on CHA checks for 10 minutes, then disadvantage for 10.' },
  { name: 'Coffee', type: 'drink', price: '3cp', description: 'Bitter and strong. Keeps you alert.', effect: 'Advantage on saves vs sleep for 4 hours.' },
];
export function getMenuByType(type: MenuItem['type']): MenuItem[] { return TAVERN_MENU.filter((m) => m.type === type); }
export function formatTavernMenu(): string { const lines = ['🍺 **Tavern Menu:**', '\n**Drinks:**']; for (const m of getMenuByType('drink')) lines.push(`  ${m.name} (${m.price}) — ${m.description}${m.effect ? ` *${m.effect}*` : ''}`); lines.push('\n**Food:**'); for (const m of getMenuByType('food')) lines.push(`  ${m.name} (${m.price}) — ${m.description}${m.effect ? ` *${m.effect}*` : ''}`); return lines.join('\n'); }
