// Plane of existence reference — quick lookup for all D&D planes.

export interface PlaneInfo { name: string; category: 'inner' | 'outer' | 'transitive' | 'material'; emoji: string; description: string; inhabitants: string; hazards: string; }

export const PLANES: PlaneInfo[] = [
  { name: 'Material Plane', category: 'material', emoji: '🌍', description: 'The default world where most campaigns take place.', inhabitants: 'All mortal races.', hazards: 'None inherent.' },
  { name: 'Feywild', category: 'transitive', emoji: '🧚', description: 'A vibrant, magical echo of the Material Plane. Time flows strangely.', inhabitants: 'Fey, eladrin, satyrs, hags.', hazards: 'Memory loss, time distortion, enchantment.' },
  { name: 'Shadowfell', category: 'transitive', emoji: '🌑', description: 'A dark, gloomy reflection of the Material Plane. Despair seeps into visitors.', inhabitants: 'Shadow creatures, undead, the Raven Queen.', hazards: 'Despair (WIS saves), shadow corruption.' },
  { name: 'Ethereal Plane', category: 'transitive', emoji: '👻', description: 'An overlapping plane of mist. Used for ethereal travel and hauntings.', inhabitants: 'Ghosts, phase spiders, night hags.', hazards: 'Getting lost in deep ethereal.' },
  { name: 'Astral Plane', category: 'transitive', emoji: '✨', description: 'A silvery void connecting all planes. No aging. Thoughts = movement.', inhabitants: 'Githyanki, astral dreadnoughts.', hazards: 'Psychic wind, silver cord severance = death.' },
  { name: 'Elemental Plane of Fire', category: 'inner', emoji: '🔥', description: 'Endless flames, magma seas, and the City of Brass.', inhabitants: 'Efreet, fire elementals, salamanders.', hazards: '10d10 fire per round unprotected.' },
  { name: 'Elemental Plane of Water', category: 'inner', emoji: '🌊', description: 'An infinite ocean with no surface or floor.', inhabitants: 'Marids, water elementals, merfolk.', hazards: 'Drowning, crushing pressure at depth.' },
  { name: 'Elemental Plane of Air', category: 'inner', emoji: '💨', description: 'Endless sky with floating earthmotes and permanent storms.', inhabitants: 'Djinni, air elementals, aarakocra.', hazards: 'Falling (no ground), lightning storms.' },
  { name: 'Elemental Plane of Earth', category: 'inner', emoji: '🪨', description: 'Solid rock with rare caverns. Crushing, claustrophobic.', inhabitants: 'Dao, earth elementals, xorn.', hazards: 'Suffocation, cave-ins, getting embedded in stone.' },
  { name: 'The Nine Hells', category: 'outer', emoji: '😈', description: 'Nine layers of lawful evil. Home of devils and infernal contracts.', inhabitants: 'Devils, Asmodeus, damned souls.', hazards: 'Soul corruption, infernal law, fire/cold by layer.' },
  { name: 'The Abyss', category: 'outer', emoji: '👿', description: 'Infinite chaotic evil layers. Each ruled by a demon lord.', inhabitants: 'Demons, demon lords (Demogorgon, Orcus).', hazards: 'Corruption, madness, infinite hostile layers.' },
  { name: 'Mount Celestia', category: 'outer', emoji: '⛰️', description: 'Seven heavens of lawful good. Radiant peaks of virtue.', inhabitants: 'Angels, archons, good-aligned souls.', hazards: 'Overwhelming awe (evil creatures take radiant damage).' },
];

export function getPlane(name: string): PlaneInfo | undefined { return PLANES.find((p) => p.name.toLowerCase().includes(name.toLowerCase())); }
export function getPlanesByCategory(category: PlaneInfo['category']): PlaneInfo[] { return PLANES.filter((p) => p.category === category); }

export function formatPlanarReference(): string {
  const lines = ['🌌 **Planes of Existence:**'];
  const categories = ['material', 'transitive', 'inner', 'outer'] as const;
  for (const cat of categories) {
    lines.push(`\n**${cat.charAt(0).toUpperCase() + cat.slice(1)} Planes:**`);
    for (const p of getPlanesByCategory(cat)) lines.push(`${p.emoji} **${p.name}**: ${p.description}`);
  }
  return lines.join('\n');
}
