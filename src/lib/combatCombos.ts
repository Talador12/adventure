// Combat combo system — detects and rewards chained abilities.
// Tracks recent actions and announces combos when conditions are met.

export interface ComboDefinition {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requiredActions: string[]; // action type sequence
  withinRounds: number; // must happen within N rounds
  reward: string; // flavor text
  bonusDamage?: number;
}

export interface ComboTracker {
  recentActions: { action: string; round: number; characterName: string }[];
  triggeredCombos: string[]; // combo IDs already triggered this combat
}

export const COMBO_DEFINITIONS: ComboDefinition[] = [
  {
    id: 'trip-strike', name: 'Trip & Strike', emoji: '🦵⚔️',
    description: 'Shove a target prone, then an ally attacks with melee advantage.',
    requiredActions: ['shove', 'melee_attack'],
    withinRounds: 1,
    reward: 'The enemy hits the ground and takes a heavy blow before they can recover!',
    bonusDamage: 2,
  },
  {
    id: 'grapple-slam', name: 'Grapple Slam', emoji: '🤼💥',
    description: 'Grapple an enemy, then shove them prone for the classic pin.',
    requiredActions: ['grapple', 'shove'],
    withinRounds: 1,
    reward: 'Pinned! The target is grappled AND prone — devastating combo.',
    bonusDamage: 0,
  },
  {
    id: 'spell-sword', name: 'Spell & Sword', emoji: '✨⚔️',
    description: 'A caster debuffs an enemy, then a martial attacks them.',
    requiredActions: ['spell_debuff', 'melee_attack'],
    withinRounds: 2,
    reward: 'Magic softens the target just before steel finds flesh!',
    bonusDamage: 3,
  },
  {
    id: 'flank-strike', name: 'Flanking Strike', emoji: '🗡️🗡️',
    description: 'Two allies attack the same target from opposite sides in the same round.',
    requiredActions: ['melee_attack', 'melee_attack_same_target'],
    withinRounds: 1,
    reward: 'Caught between two blades — nowhere to run!',
    bonusDamage: 2,
  },
  {
    id: 'heal-and-rally', name: 'Heal & Rally', emoji: '💚⚔️',
    description: 'Heal a downed ally, and they attack on their next turn.',
    requiredActions: ['heal_downed', 'attack_after_heal'],
    withinRounds: 2,
    reward: 'Back from the brink and fighting mad!',
    bonusDamage: 1,
  },
  {
    id: 'focus-fire', name: 'Focus Fire', emoji: '🎯🎯🎯',
    description: 'Three or more party members attack the same enemy in one round.',
    requiredActions: ['attack_same_target', 'attack_same_target', 'attack_same_target'],
    withinRounds: 1,
    reward: 'Concentrated fire — the enemy never stood a chance!',
    bonusDamage: 4,
  },
];

export function createComboTracker(): ComboTracker {
  return { recentActions: [], triggeredCombos: [] };
}

export function recordAction(tracker: ComboTracker, action: string, round: number, characterName: string): ComboTracker {
  return {
    ...tracker,
    recentActions: [...tracker.recentActions, { action, round, characterName }].slice(-20),
  };
}

export function checkForCombos(tracker: ComboTracker, currentRound: number): { combo: ComboDefinition; participants: string[] }[] {
  const found: { combo: ComboDefinition; participants: string[] }[] = [];

  for (const combo of COMBO_DEFINITIONS) {
    if (tracker.triggeredCombos.includes(combo.id)) continue;

    const recentInWindow = tracker.recentActions.filter(
      (a) => currentRound - a.round <= combo.withinRounds
    );

    // Simple check: all required actions present in window (different characters for multi-person combos)
    const matched: string[] = [];
    const remaining = [...combo.requiredActions];

    for (const action of recentInWindow) {
      const idx = remaining.indexOf(action.action);
      if (idx !== -1) {
        remaining.splice(idx, 1);
        if (!matched.includes(action.characterName)) matched.push(action.characterName);
      }
    }

    if (remaining.length === 0 && matched.length >= 1) {
      found.push({ combo, participants: matched });
    }
  }

  return found;
}

export function formatCombo(combo: ComboDefinition, participants: string[]): string {
  return `${combo.emoji} **COMBO: ${combo.name}!** (${participants.join(' + ')})\n${combo.reward}${combo.bonusDamage ? ` (+${combo.bonusDamage} bonus damage)` : ''}`;
}
