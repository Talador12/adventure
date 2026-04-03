// Random cursed item generator — items that seem useful but have hidden costs.
export interface CursedItem { name: string; appearanceEffect: string; trueEffect: string; identifyDC: number; removeCurse: string; }
const ITEMS: CursedItem[] = [
  { name: 'Sword of Borrowed Time', appearanceEffect: '+2 to attack and damage rolls.', trueEffect: 'Each kill ages the wielder 1d4 years.', identifyDC: 18, removeCurse: 'Remove Curse + atonement to a death god.' },
  { name: 'Ring of Friendship', appearanceEffect: 'Advantage on Persuasion checks.', trueEffect: 'You can\'t say no to any request made to you.', identifyDC: 15, removeCurse: 'Remove Curse or successfully refuse 3 requests while wearing it.' },
  { name: 'Boots of Swiftness', appearanceEffect: 'Speed +10ft.', trueEffect: 'You can\'t stop moving on your turn. Must use full movement.', identifyDC: 14, removeCurse: 'Remove Curse. The boots fall off and run away.' },
  { name: 'Amulet of Health', appearanceEffect: 'CON becomes 19.', trueEffect: 'You can\'t eat or drink anything. Sustenance comes from the amulet — but you\'re always hungry.', identifyDC: 17, removeCurse: 'Greater Restoration.' },
  { name: 'Cloak of Shadows', appearanceEffect: 'Advantage on Stealth checks.', trueEffect: 'In bright light, you take 1d4 radiant damage per round.', identifyDC: 13, removeCurse: 'Expose the cloak to sunlight for 1 hour while not wearing it.' },
  { name: 'Shield of Cowardice', appearanceEffect: '+2 AC.', trueEffect: 'You must use your reaction to block every attack — even against allies.', identifyDC: 14, removeCurse: 'Remove Curse. The shield shatters dramatically.' },
  { name: 'Horn of Blasting', appearanceEffect: 'Deals 5d6 thunder in a 30ft cone.', trueEffect: '10% chance per use it explodes, dealing the damage to the user.', identifyDC: 16, removeCurse: 'Survives the explosion? Curse breaks. Good luck.' },
  { name: 'Bag of Devouring', appearanceEffect: 'Appears to be a Bag of Holding.', trueEffect: 'The bag eats items placed in it. 50% chance per day an item is consumed.', identifyDC: 15, removeCurse: 'Turn the bag inside out while empty. The creature inside escapes.' },
];
export function getRandomCursedItem(): CursedItem { return ITEMS[Math.floor(Math.random() * ITEMS.length)]; }
export function formatCursedItem(item: CursedItem, identified: boolean = false): string { const lines = [`😈 **${item.name}**`]; lines.push(`✨ Appears to: ${item.appearanceEffect}`); if (identified) { lines.push(`💀 True effect: ${item.trueEffect}`); lines.push(`🔍 Identify DC: ${item.identifyDC}`); lines.push(`🔓 Remove: ${item.removeCurse}`); } else lines.push('*Requires Identify (DC ' + item.identifyDC + ') to reveal true nature.*'); return lines.join('\n'); }
