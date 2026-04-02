// Inspiration point system — earn/spend inspiration with custom DM triggers.
// DM defines triggers; players earn inspiration for RP and clever play.

export interface InspirationTrigger {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export const DEFAULT_TRIGGERS: InspirationTrigger[] = [
  { id: 'great_rp', name: 'Great Roleplay', description: 'Played their character convincingly in a dramatic moment.', emoji: '🎭' },
  { id: 'clever_plan', name: 'Clever Plan', description: 'Came up with a creative solution to a problem.', emoji: '💡' },
  { id: 'team_player', name: 'Team Player', description: 'Helped another player shine or sacrificed personal gain for the party.', emoji: '🤝' },
  { id: 'backstory', name: 'Backstory Moment', description: 'Incorporated their backstory into the narrative.', emoji: '📖' },
  { id: 'comic_relief', name: 'Comic Relief', description: 'Made everyone at the table laugh with in-character humor.', emoji: '😂' },
  { id: 'heroic_act', name: 'Heroic Act', description: 'Took a significant personal risk for the greater good.', emoji: '⭐' },
  { id: 'npc_interaction', name: 'NPC Connection', description: 'Created a memorable interaction with an NPC.', emoji: '💬' },
  { id: 'lore_discovery', name: 'Lore Discovery', description: 'Uncovered important world lore through investigation.', emoji: '🔍' },
];

export interface InspirationState {
  characterId: string;
  hasInspiration: boolean;
  timesEarned: number;
  timesSpent: number;
  history: { trigger: string; timestamp: number }[];
}

export function createInspirationState(characterId: string): InspirationState {
  return { characterId, hasInspiration: false, timesEarned: 0, timesSpent: 0, history: [] };
}

export function grantInspiration(state: InspirationState, triggerId: string): InspirationState {
  return {
    ...state,
    hasInspiration: true,
    timesEarned: state.timesEarned + 1,
    history: [...state.history, { trigger: triggerId, timestamp: Date.now() }].slice(-20),
  };
}

export function spendInspiration(state: InspirationState): { state: InspirationState; success: boolean } {
  if (!state.hasInspiration) return { state, success: false };
  return { state: { ...state, hasInspiration: false, timesSpent: state.timesSpent + 1 }, success: true };
}

export function formatInspirationStatus(states: InspirationState[], characterNames: Record<string, string>): string {
  const lines = ['⭐ **Inspiration:**'];
  for (const s of states) {
    const name = characterNames[s.characterId] || s.characterId;
    lines.push(`${s.hasInspiration ? '⭐' : '☆'} **${name}**: ${s.hasInspiration ? 'Has inspiration' : 'No inspiration'} (earned ${s.timesEarned}×, spent ${s.timesSpent}×)`);
  }
  return lines.join('\n');
}
