// Random terrain smell — what does this place smell like?
export const TERRAIN_SMELLS: Record<string, string[]> = {
  forest: ['Pine needles and damp earth.', 'Rotting leaves and mushrooms.', 'Wildflowers and tree sap.', 'Something dead, not far away.'],
  swamp: ['Sulfur and decay.', 'Stagnant water and rot.', 'Mud and crushed reeds.', 'Something sweet — dangerously sweet.'],
  mountain: ['Cold, thin air with a metallic edge.', 'Lichen and wet stone.', 'Snow and nothing else.'],
  desert: ['Hot sand and baked earth.', 'Nothing. The heat kills all scent.', 'A faint whiff of spice on the wind.'],
  dungeon: ['Mildew and old stone.', 'Iron — old blood.', 'Rat droppings and damp.', 'Ozone — magical discharge.'],
  cave: ['Bat guano and mineral dust.', 'Sulfurous fumes from deep below.', 'Cool, wet limestone.'],
  city: ['Baking bread and horse dung.', 'Smoke, sweat, and perfume.', 'Fresh fish from the market.'],
  tavern: ['Ale, roasting meat, and woodsmoke.', 'Spilled wine and sawdust.', 'Pipe tobacco and old leather.'],
};
export function getTerrainSmell(terrain: string): string { const pool = TERRAIN_SMELLS[terrain] || TERRAIN_SMELLS['forest']; return pool[Math.floor(Math.random() * pool.length)]; }
export function formatTerrainSmell(terrain: string): string { return `👃 *${getTerrainSmell(terrain)}*`; }
