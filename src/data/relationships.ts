// Character relationship types — bonds between party members.
// Tracked per character pair, affects roleplay prompts and NPC reactions.

export type RelationType = 'ally' | 'rival' | 'mentor' | 'protege' | 'friend' | 'romantic' | 'distrustful' | 'neutral';

export interface CharacterRelationship {
  fromId: string;
  toId: string;
  type: RelationType;
  strength: number; // 1-5
  note?: string;    // player-written context
}

export const RELATION_INFO: Record<RelationType, { label: string; emoji: string; color: string; description: string }> = {
  ally: { label: 'Ally', emoji: '🤝', color: 'text-emerald-400', description: 'Trusted companion in battle and beyond.' },
  rival: { label: 'Rival', emoji: '⚔️', color: 'text-red-400', description: 'Competitive relationship — pushes each other to be better.' },
  mentor: { label: 'Mentor', emoji: '📚', color: 'text-blue-400', description: 'Teaches and guides the other character.' },
  protege: { label: 'Protege', emoji: '🌱', color: 'text-lime-400', description: 'Learning from a more experienced adventurer.' },
  friend: { label: 'Friend', emoji: '😊', color: 'text-amber-400', description: 'Close personal bond beyond adventuring.' },
  romantic: { label: 'Romantic', emoji: '❤️', color: 'text-pink-400', description: 'A deeper connection between characters.' },
  distrustful: { label: 'Distrustful', emoji: '👀', color: 'text-orange-400', description: 'Something about them doesn\'t sit right.' },
  neutral: { label: 'Neutral', emoji: '😐', color: 'text-slate-400', description: 'No strong feelings either way.' },
};

export function getRelationshipBonus(type: RelationType): { attackMod: number; saveMod: number } {
  // Mechanical benefits for being near your ally/mentor in combat
  switch (type) {
    case 'ally': return { attackMod: 0, saveMod: 1 };
    case 'mentor': return { attackMod: 1, saveMod: 0 };
    case 'rival': return { attackMod: 1, saveMod: 0 }; // competitive edge
    case 'friend': return { attackMod: 0, saveMod: 1 };
    default: return { attackMod: 0, saveMod: 0 };
  }
}
