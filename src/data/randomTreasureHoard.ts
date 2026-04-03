// Random treasure hoard — DMG-style hoard with coins, gems, art, and magic items.
export interface TreasureHoard { coins: string; gems: string[]; artObjects: string[]; magicItems: string[]; totalEstimate: string; }
const GEM_POOL = ['Azurite (10gp)', 'Agate (10gp)', 'Moonstone (50gp)', 'Onyx (50gp)', 'Garnet (100gp)', 'Pearl (100gp)', 'Topaz (500gp)', 'Star Ruby (1,000gp)'];
const ART_POOL = ['Silver ewer (25gp)', 'Carved bone statuette (25gp)', 'Gold bracelet (250gp)', 'Jeweled crown (750gp)', 'Painting by a master (250gp)', 'Silk robe with gold thread (75gp)'];
const MAGIC_POOL = ['Potion of Healing', 'Spell Scroll (1st)', '+1 Weapon', 'Bag of Holding', 'Cloak of Protection', 'Boots of Elvenkind', 'Ring of Protection', 'Flame Tongue', 'Spell Scroll (3rd)', 'Gauntlets of Ogre Power'];
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN<T>(arr: T[], n: number): T[] { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }
function rollDice(n: number, d: number): number { let t = 0; for (let i = 0; i < n; i++) t += Math.floor(Math.random() * d) + 1; return t; }
export function generateHoard(tier: 'low' | 'medium' | 'high'): TreasureHoard {
  const coins = tier === 'low' ? `${rollDice(6, 6) * 100}cp, ${rollDice(3, 6) * 100}sp, ${rollDice(2, 6) * 10}gp` : tier === 'medium' ? `${rollDice(2, 6) * 100}sp, ${rollDice(2, 6) * 100}gp, ${rollDice(3, 6) * 10}pp` : `${rollDice(4, 6) * 1000}gp, ${rollDice(5, 6) * 100}pp`;
  return { coins, gems: pickN(GEM_POOL, tier === 'low' ? 2 : tier === 'medium' ? 3 : 5), artObjects: pickN(ART_POOL, tier === 'low' ? 1 : 2), magicItems: pickN(MAGIC_POOL, tier === 'low' ? 1 : tier === 'medium' ? 2 : 3), totalEstimate: tier === 'low' ? '~200-500gp' : tier === 'medium' ? '~2,000-5,000gp' : '~10,000-30,000gp' };
}
export function formatHoard(h: TreasureHoard): string { const lines = ['💎 **Treasure Hoard:**']; lines.push(`💰 Coins: ${h.coins}`); if (h.gems.length > 0) lines.push(`💠 Gems: ${h.gems.join(', ')}`); if (h.artObjects.length > 0) lines.push(`🎨 Art: ${h.artObjects.join(', ')}`); if (h.magicItems.length > 0) lines.push(`✨ Magic: ${h.magicItems.join(', ')}`); lines.push(`📊 Estimated total: ${h.totalEstimate}`); return lines.join('\n'); }
