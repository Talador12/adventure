// Campaign Starter Kit catalog tests
import { describe, it, expect } from 'vitest';
import {
  ALL_CAMPAIGNS,
  FULL_CAMPAIGNS,
  ONESHOT_CAMPAIGNS,
  getCampaignById,
  getRandomCampaign,
  filterCampaigns,
  getAvailableTones,
  getAvailableThemes,
  getCampaignsByTone,
  getCampaignsByTheme,
  formatCampaignSummary,
  formatCampaignCard,
} from '../../src/campaigns/index';
import type {
  FullCampaign,
  OneShotCampaign,
  CampaignStarterKit,
} from '../../src/campaigns/types';

// ---------------------------------------------------------------------------
// Catalog integrity
// ---------------------------------------------------------------------------
describe('campaign catalog — integrity', () => {
  it('has 35 full campaigns', () => {
    expect(FULL_CAMPAIGNS.length).toBe(35);
  });

  it('has 37 one-shot campaigns', () => {
    expect(ONESHOT_CAMPAIGNS.length).toBe(37);
  });

  it('ALL_CAMPAIGNS contains all 72', () => {
    expect(ALL_CAMPAIGNS.length).toBe(72);
  });

  it('all campaigns have unique IDs', () => {
    const ids = ALL_CAMPAIGNS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all campaigns have unique titles', () => {
    const titles = ALL_CAMPAIGNS.map((c) => c.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('full campaigns all have type "full"', () => {
    FULL_CAMPAIGNS.forEach((c) => expect(c.type).toBe('full'));
  });

  it('one-shot campaigns all have type "oneshot"', () => {
    ONESHOT_CAMPAIGNS.forEach((c) => expect(c.type).toBe('oneshot'));
  });
});

// ---------------------------------------------------------------------------
// Full campaign structure validation
// ---------------------------------------------------------------------------
describe('full campaigns — structure', () => {
  it.each(FULL_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s has required fields',
    (_title, campaign) => {
      const c = campaign as FullCampaign;
      expect(c.id).toBeTruthy();
      expect(c.title.length).toBeGreaterThan(3);
      expect(c.tagline.length).toBeGreaterThan(10);
      expect(c.tone).toBeTruthy();
      expect(c.themes.length).toBeGreaterThan(0);
      expect(c.playerCount.min).toBeGreaterThanOrEqual(1);
      expect(c.playerCount.max).toBeGreaterThanOrEqual(c.playerCount.min);
      expect(c.levelRange.start).toBeGreaterThanOrEqual(1);
      expect(c.levelRange.end).toBeGreaterThan(c.levelRange.start);
      expect(c.estimatedSessions).toBeGreaterThanOrEqual(8);
      expect(c.settingSummary.length).toBeGreaterThan(50);
      expect(c.hook.length).toBeGreaterThan(30);
      expect(c.twist.length).toBeGreaterThan(30);
      expect(c.climax.length).toBeGreaterThan(30);
    },
  );

  it.each(FULL_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s has 3+ acts',
    (_title, campaign) => {
      const c = campaign as FullCampaign;
      expect(c.acts.length).toBeGreaterThanOrEqual(3);
      c.acts.forEach((act) => {
        expect(act.title.length).toBeGreaterThan(3);
        expect(act.summary.length).toBeGreaterThan(20);
        expect(act.keyEvents.length).toBeGreaterThanOrEqual(3);
        expect(act.estimatedSessions).toBeGreaterThanOrEqual(1);
      });
    },
  );

  it.each(FULL_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s has 3+ key NPCs',
    (_title, campaign) => {
      const c = campaign as FullCampaign;
      expect(c.keyNPCs.length).toBeGreaterThanOrEqual(3);
      c.keyNPCs.forEach((npc) => {
        expect(npc.name.length).toBeGreaterThan(2);
        expect(npc.role.length).toBeGreaterThan(2);
        expect(npc.personality.length).toBeGreaterThan(15);
      });
    },
  );

  it.each(FULL_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s has 3+ key locations',
    (_title, campaign) => {
      const c = campaign as FullCampaign;
      expect(c.keyLocations.length).toBeGreaterThanOrEqual(3);
      c.keyLocations.forEach((loc) => {
        expect(loc.name.length).toBeGreaterThan(2);
        expect(loc.description.length).toBeGreaterThan(15);
        expect(loc.significance.length).toBeGreaterThan(10);
      });
    },
  );

  it.each(FULL_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s references data systems',
    (_title, campaign) => {
      const c = campaign as FullCampaign;
      expect(c.dataSystems.length).toBeGreaterThanOrEqual(3);
    },
  );

  it('act session estimates sum reasonably', () => {
    FULL_CAMPAIGNS.forEach((c) => {
      const actTotal = c.acts.reduce((s, a) => s + a.estimatedSessions, 0);
      // acts should sum to roughly the campaign estimate (within 50%)
      expect(actTotal).toBeGreaterThanOrEqual(c.estimatedSessions * 0.5);
      expect(actTotal).toBeLessThanOrEqual(c.estimatedSessions * 1.5);
    });
  });
});

// ---------------------------------------------------------------------------
// One-shot campaign structure validation
// ---------------------------------------------------------------------------
describe('one-shot campaigns — structure', () => {
  it.each(ONESHOT_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s has required fields',
    (_title, campaign) => {
      const c = campaign as OneShotCampaign;
      expect(c.id).toBeTruthy();
      expect(c.title.length).toBeGreaterThan(3);
      expect(c.tagline.length).toBeGreaterThan(10);
      expect(c.tone).toBeTruthy();
      expect(c.themes.length).toBeGreaterThan(0);
      expect(c.playerCount.min).toBeGreaterThanOrEqual(1);
      expect(c.playerCount.max).toBeGreaterThanOrEqual(c.playerCount.min);
      expect(c.level).toBeGreaterThanOrEqual(1);
      expect(c.level).toBeLessThanOrEqual(20);
      expect(c.estimatedHours).toBeGreaterThanOrEqual(2);
      expect(c.settingSummary.length).toBeGreaterThan(50);
      expect(c.hook.length).toBeGreaterThan(30);
      expect(c.twist.length).toBeGreaterThan(30);
      expect(c.climax.length).toBeGreaterThan(30);
    },
  );

  it.each(ONESHOT_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s has 3+ scenes',
    (_title, campaign) => {
      const c = campaign as OneShotCampaign;
      expect(c.scenes.length).toBeGreaterThanOrEqual(3);
      c.scenes.forEach((scene) => {
        expect(scene.title.length).toBeGreaterThan(3);
        expect(scene.summary.length).toBeGreaterThan(20);
        expect(scene.challenge.length).toBeGreaterThan(2);
        expect(scene.keyEvents.length).toBeGreaterThanOrEqual(3);
      });
    },
  );

  it.each(ONESHOT_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s has 2+ key NPCs',
    (_title, campaign) => {
      const c = campaign as OneShotCampaign;
      expect(c.keyNPCs.length).toBeGreaterThanOrEqual(2);
      c.keyNPCs.forEach((npc) => {
        expect(npc.name.length).toBeGreaterThan(2);
        expect(npc.role.length).toBeGreaterThan(2);
        expect(npc.personality.length).toBeGreaterThan(15);
      });
    },
  );

  it.each(ONESHOT_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s has 2+ key locations',
    (_title, campaign) => {
      const c = campaign as OneShotCampaign;
      expect(c.keyLocations.length).toBeGreaterThanOrEqual(2);
      c.keyLocations.forEach((loc) => {
        expect(loc.name.length).toBeGreaterThan(2);
        expect(loc.description.length).toBeGreaterThan(15);
        expect(loc.significance.length).toBeGreaterThan(10);
      });
    },
  );

  it.each(ONESHOT_CAMPAIGNS.map((c) => [c.title, c]))(
    '%s references data systems',
    (_title, campaign) => {
      const c = campaign as OneShotCampaign;
      expect(c.dataSystems.length).toBeGreaterThanOrEqual(3);
    },
  );
});

// ---------------------------------------------------------------------------
// Lookup functions
// ---------------------------------------------------------------------------
describe('campaign catalog — lookup', () => {
  it('getCampaignById returns correct campaign', () => {
    const c = getCampaignById('full-shattered-crown');
    expect(c).toBeDefined();
    expect(c!.title).toBe('The Shattered Crown');
  });

  it('getCampaignById returns undefined for invalid ID', () => {
    expect(getCampaignById('nonexistent')).toBeUndefined();
  });

  it('getRandomCampaign returns a campaign', () => {
    const c = getRandomCampaign();
    expect(c).toBeDefined();
    expect(c.id).toBeTruthy();
    expect(c.title).toBeTruthy();
  });

  it('getRandomCampaign("full") returns full campaign', () => {
    const c = getRandomCampaign('full');
    expect(c.type).toBe('full');
  });

  it('getRandomCampaign("oneshot") returns one-shot', () => {
    const c = getRandomCampaign('oneshot');
    expect(c.type).toBe('oneshot');
  });
});

// ---------------------------------------------------------------------------
// Filter functions
// ---------------------------------------------------------------------------
describe('campaign catalog — filtering', () => {
  it('filter by type=full returns only full campaigns', () => {
    const results = filterCampaigns({ type: 'full' });
    expect(results.length).toBe(35);
    results.forEach((c) => expect(c.type).toBe('full'));
  });

  it('filter by type=oneshot returns only one-shots', () => {
    const results = filterCampaigns({ type: 'oneshot' });
    expect(results.length).toBe(37);
    results.forEach((c) => expect(c.type).toBe('oneshot'));
  });

  it('filter by tone returns matching campaigns', () => {
    const results = filterCampaigns({ tone: 'comedic' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    results.forEach((c) => expect(c.tone).toBe('comedic'));
  });

  it('filter by theme returns campaigns containing that theme', () => {
    const results = filterCampaigns({ theme: 'heist' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    results.forEach((c) => expect(c.themes).toContain('heist'));
  });

  it('filter by playerCount returns campaigns supporting that count', () => {
    const results = filterCampaigns({ playerCount: 4 });
    expect(results.length).toBeGreaterThan(0);
    results.forEach((c) => {
      expect(c.playerCount.min).toBeLessThanOrEqual(4);
      expect(c.playerCount.max).toBeGreaterThanOrEqual(4);
    });
  });

  it('filter by levelRange returns overlapping campaigns', () => {
    const results = filterCampaigns({ levelRange: { min: 1, max: 5 } });
    expect(results.length).toBeGreaterThan(0);
  });

  it('filter by searchTerm matches title', () => {
    const results = filterCampaigns({ searchTerm: 'goblin' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((c) => c.title.toLowerCase().includes('goblin'))).toBe(
      true,
    );
  });

  it('filter by searchTerm matches NPC names', () => {
    const results = filterCampaigns({ searchTerm: 'Splurt' });
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it('filter by searchTerm matches locations', () => {
    const results = filterCampaigns({ searchTerm: 'lighthouse' });
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it('combined filters narrow results', () => {
    const all = filterCampaigns({ type: 'full' });
    const filtered = filterCampaigns({ type: 'full', tone: 'horror' });
    expect(filtered.length).toBeLessThan(all.length);
    filtered.forEach((c) => {
      expect(c.type).toBe('full');
      expect(c.tone).toBe('horror');
    });
  });

  it('empty filter returns all campaigns', () => {
    const results = filterCampaigns({});
    expect(results.length).toBe(72);
  });
});

// ---------------------------------------------------------------------------
// Aggregation functions
// ---------------------------------------------------------------------------
describe('campaign catalog — aggregation', () => {
  it('getAvailableTones returns unique tones', () => {
    const tones = getAvailableTones();
    expect(tones.length).toBeGreaterThanOrEqual(5);
    expect(new Set(tones).size).toBe(tones.length);
  });

  it('getAvailableThemes returns unique themes', () => {
    const themes = getAvailableThemes();
    expect(themes.length).toBeGreaterThanOrEqual(5);
    expect(new Set(themes).size).toBe(themes.length);
  });

  it('getCampaignsByTone groups correctly', () => {
    const grouped = getCampaignsByTone();
    const keys = Object.keys(grouped);
    expect(keys.length).toBeGreaterThanOrEqual(5);
    for (const tone of keys) {
      grouped[tone].forEach((c) => expect(c.tone).toBe(tone));
    }
  });

  it('getCampaignsByTheme groups correctly', () => {
    const grouped = getCampaignsByTheme();
    const keys = Object.keys(grouped);
    expect(keys.length).toBeGreaterThanOrEqual(5);
    for (const theme of keys) {
      grouped[theme].forEach((c) => expect(c.themes).toContain(theme));
    }
  });

  it('every campaign appears in at least one tone group', () => {
    const grouped = getCampaignsByTone();
    const allGrouped = Object.values(grouped).flat();
    expect(allGrouped.length).toBe(72);
  });
});

// ---------------------------------------------------------------------------
// Format functions
// ---------------------------------------------------------------------------
describe('campaign catalog — formatting', () => {
  it('formatCampaignSummary includes title for full campaign', () => {
    const c = FULL_CAMPAIGNS[0];
    const text = formatCampaignSummary(c);
    expect(text).toContain(c.title);
    expect(text).toContain(c.tagline);
    expect(text).toContain('Acts:');
    expect(text).toContain('Key NPCs:');
    expect(text).toContain('Key Locations:');
    expect(text).toContain('Data Systems:');
  });

  it('formatCampaignSummary includes title for one-shot', () => {
    const c = ONESHOT_CAMPAIGNS[0];
    const text = formatCampaignSummary(c);
    expect(text).toContain(c.title);
    expect(text).toContain(c.tagline);
    expect(text).toContain('Scenes:');
    expect(text).toContain('Key NPCs:');
  });

  it('formatCampaignCard is concise', () => {
    const c = FULL_CAMPAIGNS[0];
    const text = formatCampaignCard(c);
    expect(text).toContain(c.title);
    expect(text).toContain(c.tone);
    expect(text.split('\n').length).toBeLessThanOrEqual(3);
  });

  it('formatCampaignCard works for one-shots', () => {
    const c = ONESHOT_CAMPAIGNS[0];
    const text = formatCampaignCard(c);
    expect(text).toContain(c.title);
    expect(text).toContain('h');
  });
});

// ---------------------------------------------------------------------------
// Tone diversity
// ---------------------------------------------------------------------------
describe('campaign catalog — tone diversity', () => {
  it('has at least 2 comedic campaigns', () => {
    const comedic = ALL_CAMPAIGNS.filter((c) => c.tone === 'comedic');
    expect(comedic.length).toBeGreaterThanOrEqual(2);
  });

  it('has at least 1 horror campaign', () => {
    const horror = ALL_CAMPAIGNS.filter((c) => c.tone === 'horror');
    expect(horror.length).toBeGreaterThanOrEqual(1);
  });

  it('has at least 1 mystery campaign', () => {
    const mystery = ALL_CAMPAIGNS.filter((c) => c.tone === 'mystery');
    expect(mystery.length).toBeGreaterThanOrEqual(1);
  });

  it('has at least 1 heist campaign', () => {
    const heist = ALL_CAMPAIGNS.filter((c) => c.tone === 'heist');
    expect(heist.length).toBeGreaterThanOrEqual(1);
  });

  it('has at least 1 survival campaign', () => {
    const survival = ALL_CAMPAIGNS.filter((c) => c.tone === 'survival');
    expect(survival.length).toBeGreaterThanOrEqual(1);
  });

  it('has campaigns covering level 1-5 tier', () => {
    const tier1 = filterCampaigns({ levelRange: { min: 1, max: 5 } });
    expect(tier1.length).toBeGreaterThanOrEqual(3);
  });

  it('has campaigns covering level 5-10 tier', () => {
    const tier2 = filterCampaigns({ levelRange: { min: 5, max: 10 } });
    expect(tier2.length).toBeGreaterThanOrEqual(3);
  });

  it('has campaigns for 3 players', () => {
    const small = filterCampaigns({ playerCount: 3 });
    expect(small.length).toBeGreaterThanOrEqual(10);
  });
});

// ---------------------------------------------------------------------------
// Specific campaign content validation
// ---------------------------------------------------------------------------
describe('specific campaigns — content quality', () => {
  it('The Shattered Crown has political intrigue data systems', () => {
    const c = getCampaignById('full-shattered-crown')!;
    expect(c.dataSystems).toContain('courtIntrigue');
    expect(c.dataSystems).toContain('factionWar');
  });

  it('The Recurring Goblin has comedy data systems', () => {
    const c = getCampaignById('full-recurring-goblin')!;
    expect(c.dataSystems).toContain('monsterEvolution');
    expect(c.dataSystems).toContain('fantasyInsults');
  });

  it('Vault of the Dead God has heist data systems', () => {
    const c = getCampaignById('full-vault-dead-god')!;
    expect(c.dataSystems).toContain('heistPlanner');
    expect(c.dataSystems).toContain('trapDisarm');
  });

  it('Familiar Strike is a comedic one-shot', () => {
    const c = getCampaignById('oneshot-familiar-strike')!;
    expect(c.tone).toBe('comedic');
    expect(c.type).toBe('oneshot');
    expect(c.dataSystems).toContain('familiarRebellion');
  });

  it('The Poisoned Patron is a mystery one-shot', () => {
    const c = getCampaignById('oneshot-poisoned-patron')!;
    expect(c.tone).toBe('mystery');
    expect(c.dataSystems).toContain('detectiveCase');
  });

  it('The Last Lighthouse has nautical data systems', () => {
    const c = getCampaignById('full-last-lighthouse')!;
    expect(c.dataSystems).toContain('navalCombat');
    expect(c.dataSystems).toContain('shipCrewManagement');
  });

  it('every campaign has a hook that sets up the story', () => {
    ALL_CAMPAIGNS.forEach((c) => {
      expect(c.hook.length).toBeGreaterThan(50);
    });
  });

  it('every campaign has a twist that changes the story', () => {
    ALL_CAMPAIGNS.forEach((c) => {
      expect(c.twist.length).toBeGreaterThan(50);
    });
  });

  it('every campaign has a climax that resolves the story', () => {
    ALL_CAMPAIGNS.forEach((c) => {
      expect(c.climax.length).toBeGreaterThan(50);
    });
  });

  it('full campaigns have NPCs with secrets', () => {
    FULL_CAMPAIGNS.forEach((c) => {
      const withSecrets = c.keyNPCs.filter((npc) => npc.secret);
      expect(withSecrets.length).toBeGreaterThanOrEqual(1);
    });
  });
});
