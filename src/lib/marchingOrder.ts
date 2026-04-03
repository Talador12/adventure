// Party marching order — configurable column formation for dungeon exploration.
// Determines who encounters traps first, who gets surprise, ambush targets.

export type MarchPosition = 'point' | 'front' | 'middle' | 'rear' | 'guard';

export interface MarchingSlot {
  characterId: string;
  characterName: string;
  position: MarchPosition;
}

export interface MarchingOrder {
  slots: MarchingSlot[];
  columnWidth: 1 | 2; // single file or two-abreast
}

export const POSITION_DESCRIPTIONS: Record<MarchPosition, { label: string; emoji: string; perks: string; risks: string }> = {
  point: { label: 'Point (Scout)', emoji: '🔭', perks: 'First to spot traps/enemies, advantage on Perception', risks: 'First to trigger traps, targeted by ambushes' },
  front: { label: 'Front Line', emoji: '🛡️', perks: 'Engages enemies first, blocks for the group', risks: 'Takes initial damage, limited retreat' },
  middle: { label: 'Middle', emoji: '📦', perks: 'Protected by front and rear, safe for casters', risks: 'Slow to join combat, blocked by allies' },
  rear: { label: 'Rear', emoji: '🏹', perks: 'Last to be targeted, good for ranged', risks: 'Vulnerable to rear ambush, cut off if front retreats' },
  guard: { label: 'Rear Guard', emoji: '👁️', perks: 'Spots followers/rear threats, advantage on rear Perception', risks: 'First hit by rear ambush, alone if separated' },
};

export function createMarchingOrder(characters: { id: string; name: string; class: string }[]): MarchingOrder {
  if (characters.length === 0) return { slots: [], columnWidth: 1 };

  // Auto-assign based on class
  const roleOrder: Record<string, MarchPosition> = {
    Rogue: 'point', Ranger: 'point',
    Fighter: 'front', Barbarian: 'front', Paladin: 'front',
    Wizard: 'middle', Sorcerer: 'middle', Bard: 'middle',
    Cleric: 'middle', Druid: 'middle', Warlock: 'middle',
    Monk: 'rear',
  };

  const slots = characters.map((c, i) => {
    let position = roleOrder[c.class] || 'middle';
    // Ensure someone is at point and guard
    if (i === 0) position = 'point';
    if (i === characters.length - 1 && characters.length > 2) position = 'guard';
    return { characterId: c.id, characterName: c.name, position };
  });

  return { slots, columnWidth: characters.length <= 3 ? 1 : 2 };
}

export function getCharacterAtPosition(order: MarchingOrder, position: MarchPosition): MarchingSlot[] {
  return order.slots.filter((s) => s.position === position);
}

export function getTrapTarget(order: MarchingOrder): MarchingSlot | null {
  // Point scout triggers traps first
  const point = order.slots.find((s) => s.position === 'point');
  return point || order.slots[0] || null;
}

export function getAmbushTarget(order: MarchingOrder, fromRear: boolean): MarchingSlot[] {
  // Front ambush hits point/front; rear ambush hits guard/rear
  if (fromRear) return order.slots.filter((s) => s.position === 'guard' || s.position === 'rear');
  return order.slots.filter((s) => s.position === 'point' || s.position === 'front');
}

export function formatMarchingOrder(order: MarchingOrder): string {
  if (order.slots.length === 0) return '🚶 **Marching Order:** Not set.';
  const lines = [`🚶 **Marching Order** (${order.columnWidth === 1 ? 'Single File' : 'Two Abreast'}):`];
  const ordered: MarchPosition[] = ['point', 'front', 'middle', 'rear', 'guard'];
  for (const pos of ordered) {
    const chars = order.slots.filter((s) => s.position === pos);
    if (chars.length > 0) {
      const desc = POSITION_DESCRIPTIONS[pos];
      lines.push(`${desc.emoji} **${desc.label}**: ${chars.map((c) => c.characterName).join(', ')}`);
    }
  }
  return lines.join('\n');
}
