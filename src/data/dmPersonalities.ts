// DM AI personality modes — affect narration tone, combat descriptions, and NPC dialogue.
// DM selects a mode and the system prompt is adjusted accordingly.

export type DMPersonality = 'classic' | 'humorous' | 'dramatic' | 'grimdark' | 'whimsical';

export interface PersonalityConfig {
  id: DMPersonality;
  name: string;
  emoji: string;
  description: string;
  systemPromptSuffix: string;
  combatFlavorStyle: string;
  npcDialogueStyle: string;
}

export const DM_PERSONALITIES: PersonalityConfig[] = [
  {
    id: 'classic', name: 'Classic', emoji: '📖',
    description: 'Traditional fantasy narrator — balanced, descriptive, immersive.',
    systemPromptSuffix: 'Narrate in a classic high-fantasy style. Be descriptive but not overwrought. Use vivid imagery and maintain dramatic tension.',
    combatFlavorStyle: 'Use classic fantasy combat descriptions — steel clashing, spells crackling, shields splintering.',
    npcDialogueStyle: 'NPCs speak naturally in a medieval fantasy setting. Vary speech patterns by social class.',
  },
  {
    id: 'humorous', name: 'Comedic', emoji: '😂',
    description: 'Light-hearted and punny — perfect for casual sessions.',
    systemPromptSuffix: 'Narrate with humor and wit. Include puns, pop culture references, and absurd situations. Keep it fun and lighthearted but still tell a story.',
    combatFlavorStyle: 'Make combat descriptions funny — slapstick injuries, dramatic overreactions, comical enemy behavior.',
    npcDialogueStyle: 'NPCs are quirky characters with exaggerated personalities. Everyone has a funny quirk or verbal tic.',
  },
  {
    id: 'dramatic', name: 'Epic', emoji: '⚡',
    description: 'High-stakes, cinematic — every moment feels legendary.',
    systemPromptSuffix: 'Narrate like an epic movie trailer. Everything is high-stakes, dramatic, and cinematic. Use powerful imagery, intense emotions, and cliffhanger moments.',
    combatFlavorStyle: 'Combat is EPIC — slow-motion descriptions, thunderous impacts, heroic poses, battlefield-shaking moments.',
    npcDialogueStyle: 'NPCs speak with gravitas and purpose. Every conversation feels like a pivotal scene in a movie.',
  },
  {
    id: 'grimdark', name: 'Grimdark', emoji: '💀',
    description: 'Dark, gritty, morally grey — no easy victories.',
    systemPromptSuffix: 'Narrate in a dark, gritty tone. The world is harsh and unforgiving. Victory comes at a cost. Moral choices are never black and white. Describe the brutal reality of combat and survival.',
    combatFlavorStyle: 'Combat is brutal and visceral — describe injuries realistically, the psychological toll of violence, the smell of blood.',
    npcDialogueStyle: 'NPCs are cynical, desperate, or hardened by a cruel world. Trust is rare and betrayal is common.',
  },
  {
    id: 'whimsical', name: 'Fairy Tale', emoji: '✨',
    description: 'Storybook narration — magical, wonder-filled, gentle.',
    systemPromptSuffix: 'Narrate like a fairy tale being told by a fireside storyteller. Use gentle, wonder-filled language. Magic is everywhere and the world is full of small miracles.',
    combatFlavorStyle: 'Even combat has a magical quality — sparkling spells, enchanted weapons that hum, enemies that poof into sparkles when defeated.',
    npcDialogueStyle: 'NPCs are colorful storybook characters — wise old owls, mischievous sprites, kind-hearted giants.',
  },
];

export function getPersonality(id: DMPersonality): PersonalityConfig {
  return DM_PERSONALITIES.find((p) => p.id === id) || DM_PERSONALITIES[0];
}

export function getSystemPromptForPersonality(id: DMPersonality): string {
  const p = getPersonality(id);
  return `${p.systemPromptSuffix}\n\nCombat style: ${p.combatFlavorStyle}\nNPC dialogue: ${p.npcDialogueStyle}`;
}
