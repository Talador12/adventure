// Scene-to-ambient-mood mapper — auto-selects background soundscape based on scene name.
// Keywords in the scene name trigger the corresponding mood.

import type { AmbientMood } from '../hooks/useSoundFX';

const SCENE_KEYWORDS: Array<{ keywords: string[]; mood: AmbientMood }> = [
  { keywords: ['tavern', 'inn', 'bar', 'pub', 'alehouse', 'brewery', 'feast', 'banquet'], mood: 'tavern' },
  { keywords: ['dungeon', 'cave', 'crypt', 'tomb', 'underground', 'sewer', 'mine', 'labyrinth', 'catacomb', 'vault', 'cellar'], mood: 'dungeon' },
  { keywords: ['forest', 'wood', 'grove', 'glade', 'jungle', 'swamp', 'marsh', 'garden', 'meadow', 'field', 'river', 'lake', 'shore', 'beach', 'mountain', 'hill', 'plain', 'road', 'trail', 'wilderness'], mood: 'forest' },
  { keywords: ['battle', 'combat', 'fight', 'war', 'siege', 'ambush', 'raid', 'attack', 'arena', 'colosseum'], mood: 'combat' },
  { keywords: ['mystery', 'temple', 'shrine', 'library', 'tower', 'castle', 'palace', 'throne', 'court', 'ritual', 'altar', 'ancient', 'ruin', 'forbidden', 'haunted', 'cursed', 'shadow', 'dark', 'arcane'], mood: 'mystery' },
];

/**
 * Detect the best ambient mood for a scene name.
 * Returns 'none' if no keywords match.
 */
export function detectSceneMood(sceneName: string): AmbientMood {
  if (!sceneName) return 'none';
  const lower = sceneName.toLowerCase();
  for (const entry of SCENE_KEYWORDS) {
    if (entry.keywords.some((kw) => lower.includes(kw))) return entry.mood;
  }
  return 'none';
}
