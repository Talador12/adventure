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

/**
 * AI-enhanced mood detection — sends encounter description to the AI and returns a mood.
 * Falls back to keyword matching if AI is unavailable.
 */
export async function detectSceneMoodAI(description: string, sceneName: string): Promise<AmbientMood> {
  // Try keyword detection first (instant, no network)
  const keywordResult = detectSceneMood(sceneName);
  if (keywordResult !== 'none') return keywordResult;

  // Try AI analysis
  try {
    const res = await fetch('/api/dm/narrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: `Classify this scene's mood as exactly one word: tavern, dungeon, forest, combat, or mystery.\nScene: ${sceneName}. ${description}`,
        context: 'mood classification',
        history: [],
      }),
    });
    const data = await res.json() as { narration?: string };
    if (data.narration) {
      const lower = data.narration.toLowerCase();
      const moods: AmbientMood[] = ['tavern', 'dungeon', 'forest', 'combat', 'mystery'];
      for (const mood of moods) {
        if (lower.includes(mood)) return mood;
      }
    }
  } catch {
    // AI unavailable — fall back to keyword detection
  }

  return keywordResult;
}
