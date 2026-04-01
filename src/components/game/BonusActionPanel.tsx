// BonusActionPanel — extracted class-specific bonus action buttons.
// Displays available bonus actions based on character class + level.
// Renders nothing if the character's class has no special bonus actions.

import { memo } from 'react';
import type { Unit, Character } from '../../types/game';

interface BonusActionPanelProps {
  character: Character;
  playerUnit: Unit;
  isPlayerTurn: boolean;
  bonusUsed: boolean;
  onMarkBonusUsed: () => void;
  // These would need to be passed as callbacks:
  className: string;
  level: number;
}

// This component is a placeholder for the extracted bonus action logic.
// The actual bonus action buttons remain in CombatToolbar for now because
// they depend on many shared callbacks (applyCondition, setUnits, castSpell,
// removeCondition, updateCharacter, etc). Full extraction would require
// a context or prop-drilling refactor.
//
// The class-specific bonus actions are:
// - Barbarian: Rage (condition)
// - Bard: Bardic Inspiration (grant die to ally)
// - Cleric: Turn Undead (frighten undead)
// - Druid: Wild Shape (transform)
// - Fighter: Second Wind (heal)
// - Monk: Step of the Wind (dash+disengage)
// - Paladin: Divine Smite (toggle)
// - Ranger: Hunter's Mark (mark target)
// - Rogue: Cunning Action (dash/disengage)
// - Sorcerer: Metamagic (quicken/twin)

export function getBonusActionLabel(charClass: string): string | null {
  const labels: Record<string, string> = {
    Barbarian: 'Rage', Bard: 'Inspire', Cleric: 'Turn Undead', Druid: 'Wild Shape',
    Fighter: 'Second Wind', Monk: 'Step of Wind', Paladin: 'Divine Smite',
    Ranger: "Hunter's Mark", Rogue: 'Cunning Action', Sorcerer: 'Metamagic',
  };
  return labels[charClass] || null;
}

export function hasBonusAction(charClass: string, level: number): boolean {
  if (charClass === 'Rogue' && level >= 2) return true;
  if (charClass === 'Monk' && level >= 2) return true;
  if (charClass === 'Druid' && level >= 2) return true;
  if (charClass === 'Sorcerer' && level >= 3) return true;
  if (['Barbarian', 'Bard', 'Cleric', 'Fighter', 'Paladin', 'Ranger'].includes(charClass)) return true;
  return false;
}

export default memo(function BonusActionPanel({ character, playerUnit, isPlayerTurn, bonusUsed }: BonusActionPanelProps) {
  const label = getBonusActionLabel(character.class);
  if (!label || !hasBonusAction(character.class, character.level)) return null;

  return (
    <span className={`text-[8px] font-semibold ${bonusUsed ? 'text-slate-600' : 'text-violet-400'}`} title={bonusUsed ? `${label} (used)` : `${label} available`}>
      {bonusUsed ? `[${label}]` : `⚡${label}`}
    </span>
  );
});
