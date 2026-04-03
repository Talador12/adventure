// Druid wild shape bestiary — form options with stat blocks, terrain bonuses, and RP notes.

export type WildShapeTerrain = 'forest' | 'arctic' | 'desert' | 'aquatic' | 'mountain' | 'grassland' | 'underground';
export type WildShapeRole = 'scout' | 'combat' | 'utility' | 'transport' | 'infiltration';

export interface WildShapeForm {
  name: string;
  cr: number;
  terrains: WildShapeTerrain[];
  role: WildShapeRole;
  hp: number;
  ac: number;
  speed: string;
  attacks: string;
  specialAbilities: string[];
  terrainBonus: string;
  rpNote: string;
  druidLevel: number; // minimum druid level to use
}

const FORMS: WildShapeForm[] = [
  { name: 'Wolf', cr: 0.25, terrains: ['forest', 'grassland', 'arctic'], role: 'scout', hp: 11, ac: 13, speed: '40ft', attacks: 'Bite +4 (2d4+2 piercing, DC 11 STR or prone)', specialAbilities: ['Pack Tactics (advantage with ally within 5ft)', 'Keen Hearing and Smell (advantage on Perception)'], terrainBonus: 'Forest: advantage on Stealth. Arctic: no movement penalty in snow.', rpNote: 'Wolves are social. NPCs react with fear or reverence. Dogs become confused.', druidLevel: 2 },
  { name: 'Brown Bear', cr: 1, terrains: ['forest', 'mountain', 'arctic'], role: 'combat', hp: 34, ac: 11, speed: '40ft, climb 30ft', attacks: 'Multiattack: Bite +5 (1d8+4) + Claws +5 (2d6+4)', specialAbilities: ['Keen Smell', 'Multiattack at CR 1 (rare and powerful)'], terrainBonus: 'Forest: advantage on foraging checks. Mountain: no penalty for difficult terrain.', rpNote: 'The go-to combat form. Terrifying in enclosed spaces. Can\'t fit through small doors.', druidLevel: 2 },
  { name: 'Giant Spider', cr: 1, terrains: ['forest', 'underground'], role: 'infiltration', hp: 26, ac: 14, speed: '30ft, climb 30ft', attacks: 'Bite +5 (1d8+3 piercing + 2d8 poison, DC 11 CON half)', specialAbilities: ['Spider Climb (walls and ceilings)', 'Web Sense (detect creatures touching web)', 'Web Walker (ignore web difficult terrain)'], terrainBonus: 'Underground: darkvision 60ft. Can set traps with webbing.', rpNote: 'Freaks out most NPCs. Perfect for scouting dungeons. Party members may also freak out.', druidLevel: 2 },
  { name: 'Giant Eagle', cr: 1, terrains: ['mountain', 'grassland'], role: 'transport', hp: 26, ac: 13, speed: '10ft, fly 80ft', attacks: 'Multiattack: Beak +5 (1d6+3) + Talons +5 (2d6+3)', specialAbilities: ['Keen Sight (advantage on Perception using sight)', 'Flyby (no opportunity attacks when flying past)'], terrainBonus: 'Mountain: can ride thermals for no-effort altitude gains.', rpNote: 'Can carry one Medium creature. Revolutionary for scouting and travel. Available at Druid 8 (fly).', druidLevel: 8 },
  { name: 'Dire Wolf', cr: 1, terrains: ['forest', 'arctic', 'mountain'], role: 'combat', hp: 37, ac: 14, speed: '50ft', attacks: 'Bite +5 (2d6+3 piercing, DC 13 STR or prone)', specialAbilities: ['Pack Tactics', 'Keen Hearing and Smell', 'Knockdown on every hit'], terrainBonus: 'Arctic: immune to cold weather effects. Can pull a sled.', rpNote: 'Bigger than a horse. Children love you. Adults run.', druidLevel: 2 },
  { name: 'Giant Octopus', cr: 1, terrains: ['aquatic'], role: 'utility', hp: 52, ac: 11, speed: '10ft, swim 60ft', attacks: 'Tentacles +5 (2d6+3 bludgeoning, grapple DC 16)', specialAbilities: ['Hold Breath (1 hour)', 'Ink Cloud (20ft heavily obscured)', 'Underwater Camouflage (+5 Stealth)'], terrainBonus: 'Aquatic: the undisputed king of underwater forms.', rpNote: 'Can open jars, pick locks (tentacle dexterity), and squeeze through 1-inch gaps.', druidLevel: 2 },
  { name: 'Cat', cr: 0, terrains: ['forest', 'grassland', 'underground'], role: 'infiltration', hp: 2, ac: 12, speed: '40ft, climb 30ft', attacks: 'Claws +0 (1 slashing)', specialAbilities: ['Keen Smell', 'Tiny size (fit through small openings)', 'No one suspects a cat'], terrainBonus: 'Urban: can go literally anywhere without suspicion.', rpNote: 'The ultimate spy form. Zero combat ability. Infinite infiltration potential.', druidLevel: 2 },
  { name: 'Elk', cr: 0.25, terrains: ['forest', 'grassland', 'mountain'], role: 'transport', hp: 13, ac: 10, speed: '50ft', attacks: 'Ram +5 (1d6+3, charge bonus 2d6)', specialAbilities: ['Charge (bonus 2d6 if 20ft move)', 'Hooves +5 (2d4+3) on prone targets'], terrainBonus: 'Grassland: 60ft speed on open ground.', rpNote: 'Fastest land form at low levels. Majestic. Can carry a halfling rider.', druidLevel: 2 },
];

export function getFormsByCR(maxCR: number): WildShapeForm[] {
  return FORMS.filter((f) => f.cr <= maxCR);
}

export function getFormsByTerrain(terrain: WildShapeTerrain): WildShapeForm[] {
  return FORMS.filter((f) => f.terrains.includes(terrain));
}

export function getFormsByRole(role: WildShapeRole): WildShapeForm[] {
  return FORMS.filter((f) => f.role === role);
}

export function getFormsByLevel(druidLevel: number): WildShapeForm[] {
  const maxCR = druidLevel >= 8 ? 1 : druidLevel >= 4 ? 0.5 : 0.25;
  const canFly = druidLevel >= 8;
  const canSwim = druidLevel >= 4;
  return FORMS.filter((f) => {
    if (f.cr > maxCR) return false;
    if (f.speed.includes('fly') && !canFly) return false;
    if (f.speed.includes('swim') && !canSwim) return false;
    return f.druidLevel <= druidLevel;
  });
}

export function getAllWildShapeTerrains(): WildShapeTerrain[] {
  return ['forest', 'arctic', 'desert', 'aquatic', 'mountain', 'grassland', 'underground'];
}

export function formatWildShapeForm(form: WildShapeForm): string {
  const icon = { scout: '👁️', combat: '⚔️', utility: '🔧', transport: '🏃', infiltration: '🐱' }[form.role];
  const lines = [`${icon} **${form.name}** *(CR ${form.cr}, ${form.role}, Druid ${form.druidLevel}+)*`];
  lines.push(`  HP: ${form.hp} | AC: ${form.ac} | Speed: ${form.speed}`);
  lines.push(`  Attack: ${form.attacks}`);
  form.specialAbilities.forEach((a) => lines.push(`  ⚙️ ${a}`));
  lines.push(`  🌍 Terrain: ${form.terrainBonus}`);
  lines.push(`  💬 RP: ${form.rpNote}`);
  return lines.join('\n');
}

export { FORMS as WILD_SHAPE_FORMS };
