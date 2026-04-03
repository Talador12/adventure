// Combat turn checklist — remind players what they can do on their turn.

export interface TurnAction { name: string; description: string; type: 'action' | 'bonus' | 'movement' | 'reaction' | 'free' | 'other'; }

export const TURN_ACTIONS: TurnAction[] = [
  { name: 'Attack', description: 'Make one melee or ranged attack (Extra Attack = more).', type: 'action' },
  { name: 'Cast a Spell', description: 'Cast a spell with a casting time of 1 action.', type: 'action' },
  { name: 'Dash', description: 'Double your movement speed for the turn.', type: 'action' },
  { name: 'Disengage', description: 'Your movement doesn\'t provoke opportunity attacks this turn.', type: 'action' },
  { name: 'Dodge', description: 'Attacks against you have disadvantage. Advantage on DEX saves.', type: 'action' },
  { name: 'Help', description: 'Give an ally advantage on their next check or attack.', type: 'action' },
  { name: 'Hide', description: 'Make a Stealth check to become hidden.', type: 'action' },
  { name: 'Ready', description: 'Prepare an action to trigger on a specific condition.', type: 'action' },
  { name: 'Use an Object', description: 'Interact with a complex object (beyond free interaction).', type: 'action' },
  { name: 'Grapple/Shove', description: 'Contested Athletics check to grapple or shove.', type: 'action' },
  { name: 'Move', description: 'Move up to your speed. Can split before/after action.', type: 'movement' },
  { name: 'Bonus Action Spell', description: 'Cast a bonus action spell (limits main action to cantrips).', type: 'bonus' },
  { name: 'Off-Hand Attack', description: 'Light weapon in off hand — attack with no ability mod to damage.', type: 'bonus' },
  { name: 'Opportunity Attack', description: 'Melee attack when enemy leaves your reach (uses reaction).', type: 'reaction' },
  { name: 'Free Object Interaction', description: 'Draw/sheathe a weapon, open a door, pick up an item.', type: 'free' },
  { name: 'Speak', description: 'Say a few words (free, ~6 seconds of speech).', type: 'free' },
];

export function getActionsByType(type: TurnAction['type']): TurnAction[] { return TURN_ACTIONS.filter((a) => a.type === type); }

export function formatTurnChecklist(): string {
  const lines = ['📋 **Your Turn — What Can You Do?**'];
  const groups: [string, TurnAction['type']][] = [['⚔️ Actions (pick ONE)', 'action'], ['🏃 Movement', 'movement'], ['⚡ Bonus Action (if available)', 'bonus'], ['🛡️ Reaction (1 per round)', 'reaction'], ['🆓 Free', 'free']];
  for (const [header, type] of groups) {
    lines.push(`\n**${header}:**`);
    for (const a of getActionsByType(type)) lines.push(`  • **${a.name}**: ${a.description}`);
  }
  return lines.join('\n');
}
