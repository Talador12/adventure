// Random trap generator — procedural traps from parts (trigger + effect + DC).

export interface GeneratedTrap {
  name: string;
  trigger: string;
  effect: string;
  detectionDC: number;
  disableDC: number;
  saveDC: number;
  saveAbility: string;
  damage: string;
}

const TRIGGERS = ['Pressure plate', 'Tripwire', 'Opening a door', 'Picking up an item', 'Stepping on a specific tile', 'Breaking a magical seal', 'Moving through a narrow passage', 'Reading an inscription aloud'];
const EFFECTS = [
  { effect: 'Poison darts fire from the wall', saveAbility: 'DEX', damage: '1d4 + 2d6 poison' },
  { effect: 'A pit opens beneath the target', saveAbility: 'DEX', damage: '2d6 bludgeoning (fall)' },
  { effect: 'A scything blade swings from the ceiling', saveAbility: 'DEX', damage: '2d10 slashing' },
  { effect: 'A glyph explodes with fire', saveAbility: 'DEX', damage: '4d6 fire' },
  { effect: 'A net drops from above (restrained)', saveAbility: 'STR', damage: 'Restrained (DC 12 to escape)' },
  { effect: 'Sleeping gas fills the room', saveAbility: 'CON', damage: 'Unconscious 1d4 rounds' },
  { effect: 'Lightning arcs between metal surfaces', saveAbility: 'DEX', damage: '3d8 lightning' },
  { effect: 'The floor becomes extremely slippery', saveAbility: 'DEX', damage: 'Prone + 1d6 bludgeoning' },
  { effect: 'A loud alarm sounds, alerting nearby creatures', saveAbility: '-', damage: 'None (alerts enemies)' },
  { effect: 'Rocks fall from above', saveAbility: 'DEX', damage: '2d10 bludgeoning' },
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateRandomTrap(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): GeneratedTrap {
  const dcBase = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 13 : 16;
  const variance = Math.floor(Math.random() * 3) - 1;
  const trigger = pick(TRIGGERS);
  const effect = pick(EFFECTS);
  return {
    name: `${trigger} → ${effect.effect.split(' ').slice(0, 3).join(' ')}...`,
    trigger, effect: effect.effect,
    detectionDC: dcBase + variance, disableDC: dcBase + variance + 1,
    saveDC: dcBase + variance, saveAbility: effect.saveAbility,
    damage: effect.damage,
  };
}

export function formatGeneratedTrap(trap: GeneratedTrap): string {
  const lines = [`🪤 **Random Trap:**`];
  lines.push(`Trigger: ${trap.trigger}`);
  lines.push(`Effect: ${trap.effect}`);
  lines.push(`Detection: Perception/Investigation DC ${trap.detectionDC}`);
  lines.push(`Disable: Thieves' Tools DC ${trap.disableDC}`);
  if (trap.saveAbility !== '-') lines.push(`Save: ${trap.saveAbility} DC ${trap.saveDC}`);
  lines.push(`Damage: ${trap.damage}`);
  return lines.join('\n');
}
