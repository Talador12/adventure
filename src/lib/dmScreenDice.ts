// DM screen dice helpers — deterministic in tests, random in the UI.

export interface DMScreenDieResult {
  sides: number;
  value: number;
}

export interface DMScreenRoll {
  id: string;
  label: string;
  dice: DMScreenDieResult[];
  modifier: number;
  total: number;
  createdAt: number;
}

const MAX_ROLL_HISTORY = 20;

export function rollDie(sides: number, rng: () => number = Math.random): number {
  const safeSides = Math.max(2, Math.floor(sides));
  return Math.floor(rng() * safeSides) + 1;
}

export function rollDmDice(
  sides: number,
  modifier = 0,
  label = `d${sides}`,
  now = Date.now(),
  rng: () => number = Math.random,
): DMScreenRoll {
  const die = rollDie(sides, rng);
  const safeModifier = Number.isFinite(modifier) ? Math.trunc(modifier) : 0;
  return {
    id: `${now}-${sides}-${die}-${safeModifier}`,
    label,
    dice: [{ sides: Math.max(2, Math.floor(sides)), value: die }],
    modifier: safeModifier,
    total: die + safeModifier,
    createdAt: now,
  };
}

export function trimRollHistory(rolls: DMScreenRoll[], max = MAX_ROLL_HISTORY): DMScreenRoll[] {
  return rolls.slice(0, Math.max(1, max));
}

export function normalizeRollHistory(raw: unknown, max = MAX_ROLL_HISTORY): DMScreenRoll[] {
  if (!Array.isArray(raw)) return [];
  const rolls: DMScreenRoll[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const roll = item as Partial<DMScreenRoll>;
    if (!Array.isArray(roll.dice) || typeof roll.total !== 'number') continue;
    rolls.push({
      id: typeof roll.id === 'string' ? roll.id : `roll-${rolls.length}`,
      label: typeof roll.label === 'string' ? roll.label : 'roll',
      dice: roll.dice
        .filter((d): d is DMScreenDieResult => !!d && typeof d.sides === 'number' && typeof d.value === 'number')
        .map((d) => ({ sides: Math.floor(d.sides), value: Math.floor(d.value) })),
      modifier: typeof roll.modifier === 'number' ? Math.trunc(roll.modifier) : 0,
      total: Math.trunc(roll.total),
      createdAt: typeof roll.createdAt === 'number' ? roll.createdAt : 0,
    });
  }
  return trimRollHistory(rolls.filter((r) => r.dice.length > 0), max);
}

export function formatRollFormula(roll: DMScreenRoll): string {
  const dice = roll.dice.map((d) => `d${d.sides}: ${d.value}`).join(', ');
  const mod = roll.modifier === 0 ? '' : roll.modifier > 0 ? ` + ${roll.modifier}` : ` - ${Math.abs(roll.modifier)}`;
  return `${dice}${mod}`;
}
