import { describe, expect, it } from 'vitest';
import {
  DEFAULT_DM_SCREEN_PANELS,
  normalizeDmScreenPanels,
  toggleDmScreenPanel,
} from '../../src/lib/dmScreenPanels';
import { formatRollFormula, normalizeRollHistory, rollDie, rollDmDice, trimRollHistory } from '../../src/lib/dmScreenDice';

describe('DM screen panel preferences', () => {
  it('uses default panels for invalid input', () => {
    expect(normalizeDmScreenPanels(null)).toEqual(DEFAULT_DM_SCREEN_PANELS);
    expect(normalizeDmScreenPanels(['bogus'])).toEqual(DEFAULT_DM_SCREEN_PANELS);
  });

  it('filters unknown panels and removes duplicates', () => {
    expect(normalizeDmScreenPanels(['notes', 'bogus', 'party', 'notes'])).toEqual(['notes', 'party']);
  });

  it('toggles a visible panel off', () => {
    expect(toggleDmScreenPanel(['initiative', 'party'], 'party')).toEqual(['initiative']);
  });

  it('keeps at least one panel visible', () => {
    expect(toggleDmScreenPanel(['initiative'], 'initiative')).toEqual(['initiative']);
  });

  it('appends a hidden panel', () => {
    expect(toggleDmScreenPanel(['initiative'], 'notes')).toEqual(['initiative', 'notes']);
  });

  it('accepts dice and reference panels', () => {
    expect(normalizeDmScreenPanels(['dice', 'reference'])).toEqual(['dice', 'reference']);
  });
});

describe('DM screen dice tray', () => {
  it('rolls deterministic dice with injected random source', () => {
    expect(rollDie(20, () => 0)).toBe(1);
    expect(rollDie(20, () => 0.999)).toBe(20);
  });

  it('adds modifiers to roll totals', () => {
    const roll = rollDmDice(20, 3, 'd20', 1000, () => 0.5);
    expect(roll.dice[0].value).toBe(11);
    expect(roll.total).toBe(14);
  });

  it('formats roll formulas with positive and negative modifiers', () => {
    expect(formatRollFormula(rollDmDice(8, 2, 'd8', 1, () => 0))).toBe('d8: 1 + 2');
    expect(formatRollFormula(rollDmDice(8, -1, 'd8', 1, () => 0))).toBe('d8: 1 - 1');
  });

  it('normalizes persisted roll history', () => {
    const raw = [rollDmDice(6, 0, 'd6', 1, () => 0.5), { bogus: true }];
    expect(normalizeRollHistory(raw)).toHaveLength(1);
  });

  it('trims roll history', () => {
    const rolls = Array.from({ length: 4 }, (_, i) => rollDmDice(6, 0, 'd6', i, () => 0));
    expect(trimRollHistory(rolls, 2)).toHaveLength(2);
  });
});
