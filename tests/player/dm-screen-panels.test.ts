import { describe, expect, it } from 'vitest';
import {
  DEFAULT_DM_SCREEN_PANELS,
  normalizeDmScreenPanels,
  toggleDmScreenPanel,
} from '../../src/lib/dmScreenPanels';

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
});
