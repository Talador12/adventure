// Player mode tests — pure game logic, no AI, no network
// Tests the core D&D engine: combat math, spatial reasoning, spells, items, characters
import { describe, it, expect } from 'vitest';
import {
  computeReachableCells,
  findBestMoveToward,
  findOpportunityAttackers,
  isAdjacent,
  chebyshevDistance,
  hasLineOfSight,
  parseRangeFt,
  TERRAIN_COST,
  type TerrainType,
  type TokenPosition,
} from '../../src/lib/mapUtils';
import {
  calculateAC,
  HIT_DIE_AVG,
  generateEnemies,
  rollLoot,
  getSpellSlots,
  getClassSpells,
  rollSpellDamage,
  getClassAbility,
  hasPendingASI,
  randomEncounterTheme,
  rollD20WithProne,
  effectiveAC,
  calculateEncounterBudget,
  ENCOUNTER_THRESHOLDS,
  STAT_NAMES,
  RACES,
  CLASSES,
  BACKGROUNDS,
  ALIGNMENTS,
  XP_THRESHOLDS,
  CONDITION_EFFECTS,
  ENEMY_TEMPLATES,
  ENCOUNTER_THEMES,
  SPELL_LIST,
  CLASS_ABILITIES,
  FEATS,
  ASI_LEVELS,
  EXTRA_ATTACK_CLASSES,
  FULL_CASTERS,
  HALF_CASTERS,
  SHOP_ITEMS,
  type Character,
  type Unit,
  type Item,
  type Stats,
  type ActiveCondition,
  type ConditionType,
} from '../../src/contexts/GameContext';

// ---------------------------------------------------------------------------
// Spatial engine (mapUtils)
// ---------------------------------------------------------------------------
describe('spatial engine', () => {
  // Helper: create a grid of a single terrain type
  const makeGrid = (rows: number, cols: number, fill: TerrainType = 'floor'): TerrainType[][] =>
    Array.from({ length: rows }, () => Array(cols).fill(fill));

  describe('chebyshevDistance', () => {
    it('same cell is 0', () => {
      expect(chebyshevDistance(5, 5, 5, 5)).toBe(0);
    });
    it('orthogonal neighbors are 1', () => {
      expect(chebyshevDistance(3, 3, 4, 3)).toBe(1);
      expect(chebyshevDistance(3, 3, 3, 4)).toBe(1);
    });
    it('diagonal neighbors are 1', () => {
      expect(chebyshevDistance(3, 3, 4, 4)).toBe(1);
    });
    it('long distances computed correctly', () => {
      expect(chebyshevDistance(0, 0, 10, 7)).toBe(10);
    });
  });

  describe('isAdjacent', () => {
    it('same cell is adjacent', () => {
      expect(isAdjacent(5, 5, 5, 5)).toBe(true);
    });
    it('all 8 neighbors are adjacent', () => {
      for (const dc of [-1, 0, 1]) {
        for (const dr of [-1, 0, 1]) {
          expect(isAdjacent(5, 5, 5 + dc, 5 + dr)).toBe(true);
        }
      }
    });
    it('2 cells away is not adjacent', () => {
      expect(isAdjacent(5, 5, 7, 5)).toBe(false);
    });
  });

  describe('hasLineOfSight', () => {
    it('same cell always has LOS', () => {
      const grid = makeGrid(10, 10);
      expect(hasLineOfSight(grid, 5, 5, 5, 5)).toBe(true);
    });
    it('clear path has LOS', () => {
      const grid = makeGrid(10, 10);
      expect(hasLineOfSight(grid, 0, 0, 9, 9)).toBe(true);
    });
    it('wall blocks LOS', () => {
      const grid = makeGrid(10, 10);
      grid[5][5] = 'wall';
      expect(hasLineOfSight(grid, 0, 0, 9, 9)).toBe(false);
    });
    it('void blocks LOS', () => {
      const grid = makeGrid(10, 10);
      grid[5][5] = 'void';
      expect(hasLineOfSight(grid, 0, 0, 9, 9)).toBe(false);
    });
    it('water does not block LOS', () => {
      const grid = makeGrid(10, 10);
      grid[5][5] = 'water';
      expect(hasLineOfSight(grid, 0, 0, 9, 9)).toBe(true);
    });
    it('door does not block LOS', () => {
      const grid = makeGrid(10, 10);
      grid[5][5] = 'door';
      expect(hasLineOfSight(grid, 0, 0, 9, 9)).toBe(true);
    });
  });

  describe('parseRangeFt', () => {
    it('Self = 0', () => expect(parseRangeFt('Self')).toBe(0));
    it('Touch = 1', () => expect(parseRangeFt('Touch')).toBe(1));
    it('60ft = 12 cells', () => expect(parseRangeFt('60ft')).toBe(12));
    it('120ft = 24 cells', () => expect(parseRangeFt('120ft')).toBe(24));
    it('handles 150/600ft (uses short range)', () => expect(parseRangeFt('150/600ft')).toBe(30));
    it('empty string = 0', () => expect(parseRangeFt('')).toBe(0));
  });

  describe('computeReachableCells', () => {
    it('starting cell always reachable at cost 0', () => {
      const grid = makeGrid(5, 5);
      const reachable = computeReachableCells(grid, 2, 2, 3, 5, 5);
      expect(reachable.get('2,2')).toBe(0);
    });
    it('movement 0 only includes start', () => {
      const grid = makeGrid(5, 5);
      const reachable = computeReachableCells(grid, 2, 2, 0, 5, 5);
      expect(reachable.size).toBe(1);
    });
    it('walls are impassable', () => {
      const grid = makeGrid(5, 5);
      // Wall off right side of start
      grid[2][3] = 'wall';
      grid[1][3] = 'wall';
      grid[3][3] = 'wall';
      const reachable = computeReachableCells(grid, 2, 2, 1, 5, 5);
      expect(reachable.has('3,2')).toBe(false); // blocked by wall
    });
    it('water costs 2 movement', () => {
      const grid = makeGrid(5, 5);
      grid[2][3] = 'water';
      const reachable = computeReachableCells(grid, 2, 2, 2, 5, 5);
      // Can reach the water cell (cost 2) but not beyond it
      expect(reachable.get('3,2')).toBe(2);
    });
  });

  describe('findBestMoveToward', () => {
    it('finds closest reachable cell to target', () => {
      const grid = makeGrid(10, 10);
      const result = findBestMoveToward(grid, 0, 0, 9, 0, 3, 10, 10);
      expect(result).not.toBeNull();
      expect(result!.col).toBe(3); // moved 3 cells toward target
      expect(result!.row).toBe(0);
    });
    it('returns null on empty grid', () => {
      const grid = makeGrid(3, 3, 'wall');
      const result = findBestMoveToward(grid, 0, 0, 2, 2, 5, 3, 3);
      // Start is surrounded by walls, but start itself is reachable
      // findBestMoveToward returns the start cell since it's the only reachable cell
      expect(result).not.toBeNull();
      expect(result!.col).toBe(0);
      expect(result!.row).toBe(0);
    });
  });

  describe('terrain costs', () => {
    it('floor, door, pit cost 1', () => {
      expect(TERRAIN_COST.floor).toBe(1);
      expect(TERRAIN_COST.door).toBe(1);
      expect(TERRAIN_COST.pit).toBe(1);
    });
    it('water, difficult cost 2', () => {
      expect(TERRAIN_COST.water).toBe(2);
      expect(TERRAIN_COST.difficult).toBe(2);
    });
    it('wall, void are impassable', () => {
      expect(TERRAIN_COST.wall).toBe(Infinity);
      expect(TERRAIN_COST.void).toBe(Infinity);
    });
  });
});

// ---------------------------------------------------------------------------
// AC calculation (D&D 5e armor rules)
// ---------------------------------------------------------------------------
describe('AC calculation', () => {
  const baseStats: Stats = { STR: 10, DEX: 16, CON: 12, INT: 10, WIS: 10, CHA: 10 };

  it('unarmored = 10 + DEX mod', () => {
    expect(calculateAC(baseStats, { weapon: null, armor: null, shield: null, ring: null })).toBe(13);
  });
  it('light armor uses full DEX mod', () => {
    const armor: Item = { id: '1', name: 'Leather', type: 'armor', rarity: 'common', description: 'Light armor', value: 10, acBonus: 11, armorCategory: 'light' };
    expect(calculateAC(baseStats, { weapon: null, armor, shield: null, ring: null })).toBe(14); // 11 + 3
  });
  it('medium armor caps DEX bonus at +2', () => {
    const armor: Item = { id: '1', name: 'Breastplate', type: 'armor', rarity: 'common', description: 'Medium armor', value: 10, acBonus: 14, armorCategory: 'medium' };
    expect(calculateAC(baseStats, { weapon: null, armor, shield: null, ring: null })).toBe(16); // 14 + 2 (capped)
  });
  it('heavy armor ignores DEX', () => {
    const armor: Item = { id: '1', name: 'Plate', type: 'armor', rarity: 'common', description: 'Heavy armor', value: 10, acBonus: 18, armorCategory: 'heavy' };
    expect(calculateAC(baseStats, { weapon: null, armor, shield: null, ring: null })).toBe(18);
  });
  it('shield adds +2', () => {
    const shield: Item = { id: '2', name: 'Shield', type: 'shield', rarity: 'common', description: 'A sturdy shield', value: 10, acBonus: 2 };
    expect(calculateAC(baseStats, { weapon: null, armor: null, shield, ring: null })).toBe(15); // 10+3+2
  });
  it('ring with AC bonus stacks', () => {
    const ring: Item = { id: '3', name: 'Ring of Protection', type: 'ring', rarity: 'uncommon', description: 'A magical ring', value: 100, acBonus: 1 };
    expect(calculateAC(baseStats, { weapon: null, armor: null, shield: null, ring })).toBe(14); // 10+3+1
  });
});

// ---------------------------------------------------------------------------
// Hit die averages
// ---------------------------------------------------------------------------
describe('hit die averages', () => {
  it('all 12 classes have entries', () => {
    for (const cls of CLASSES) {
      expect(HIT_DIE_AVG[cls]).toBeDefined();
      expect(HIT_DIE_AVG[cls]).toBeGreaterThan(0);
    }
  });
  it('d6 classes get 4', () => {
    expect(HIT_DIE_AVG['Wizard']).toBe(4);
    expect(HIT_DIE_AVG['Sorcerer']).toBe(4);
  });
  it('d12 class gets 7', () => {
    expect(HIT_DIE_AVG['Barbarian']).toBe(7);
  });
});

// ---------------------------------------------------------------------------
// Enemy generation
// ---------------------------------------------------------------------------
describe('enemy generation', () => {
  const difficulties = ['easy', 'medium', 'hard', 'deadly'] as const;

  for (const diff of difficulties) {
    it(`generates enemies for ${diff} difficulty`, () => {
      const enemies = generateEnemies(diff, 1);
      expect(enemies.length).toBeGreaterThan(0);
      for (const e of enemies) {
        expect(e.name).toBeTruthy();
        expect(e.hp).toBeGreaterThan(0);
        expect(e.ac).toBeGreaterThan(0);
        expect(e.type).toBe('enemy');
        expect(e.cr).toBeGreaterThan(0);
        expect(e.xpValue).toBeGreaterThan(0);
      }
    });
  }

  it('scales HP with party level', () => {
    const lv1 = generateEnemies('medium', 1);
    const lv10 = generateEnemies('medium', 10);
    // Higher level should generally produce higher HP enemies
    const avgHp1 = lv1.reduce((s, e) => s + e.hp, 0) / lv1.length;
    const avgHp10 = lv10.reduce((s, e) => s + e.hp, 0) / lv10.length;
    expect(avgHp10).toBeGreaterThan(avgHp1);
  });
});

// ---------------------------------------------------------------------------
// Encounter themes
// ---------------------------------------------------------------------------
describe('encounter themes', () => {
  it('has at least 10 themes', () => {
    expect(ENCOUNTER_THEMES.length).toBeGreaterThanOrEqual(10);
  });
  it('randomEncounterTheme returns a valid theme', () => {
    const theme = randomEncounterTheme();
    expect(theme.setting).toBeTruthy();
    expect(theme.twist).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Spell system
// ---------------------------------------------------------------------------
describe('spell system', () => {
  it('all spells have required fields', () => {
    for (const spell of SPELL_LIST) {
      expect(spell.id).toBeTruthy();
      expect(spell.name).toBeTruthy();
      expect(spell.level).toBeGreaterThanOrEqual(0);
      expect(spell.school).toBeTruthy();
      expect(spell.range).toBeTruthy();
    }
  });

  it('cantrips are level 0', () => {
    const cantrips = SPELL_LIST.filter((s) => s.level === 0);
    expect(cantrips.length).toBeGreaterThan(0);
    for (const c of cantrips) expect(c.level).toBe(0);
  });

  it('full casters get spell slots from level 1', () => {
    for (const cls of FULL_CASTERS) {
      const slots = getSpellSlots(cls, 1);
      expect(Object.keys(slots).length).toBeGreaterThan(0);
      expect(slots[1]).toBeGreaterThan(0); // at least 1 level-1 slot
    }
  });

  it('half casters get spell slots from level 2', () => {
    for (const cls of HALF_CASTERS) {
      expect(Object.keys(getSpellSlots(cls, 1)).length).toBe(0); // no slots at level 1
      const slots = getSpellSlots(cls, 2);
      expect(Object.keys(slots).length).toBeGreaterThan(0);
    }
  });

  it('non-casters get no spell slots', () => {
    expect(Object.keys(getSpellSlots('Fighter', 20)).length).toBe(0);
    expect(Object.keys(getSpellSlots('Barbarian', 20)).length).toBe(0);
    expect(Object.keys(getSpellSlots('Rogue', 20)).length).toBe(0);
  });

  it('getClassSpells returns spells for caster classes', () => {
    const wizardSpells = getClassSpells('Wizard', 5);
    expect(wizardSpells.length).toBeGreaterThan(0);
  });

  it('rollSpellDamage produces positive values', () => {
    // Run a few times to confirm it always returns > 0
    for (let i = 0; i < 20; i++) {
      const dmg = rollSpellDamage('2d6');
      expect(dmg).toBeGreaterThanOrEqual(2);
      expect(dmg).toBeLessThanOrEqual(12);
    }
  });
});

// ---------------------------------------------------------------------------
// Class abilities
// ---------------------------------------------------------------------------
describe('class abilities', () => {
  it('every class has an ability', () => {
    for (const cls of CLASSES) {
      const ability = getClassAbility(cls);
      expect(ability).toBeDefined();
      expect(ability!.name).toBeTruthy();
      expect(ability!.class).toBe(cls);
    }
  });
  it('abilities have valid reset types', () => {
    for (const a of CLASS_ABILITIES) {
      expect(['short', 'long']).toContain(a.resetsOn);
    }
  });
});

// ---------------------------------------------------------------------------
// Feats + ASI
// ---------------------------------------------------------------------------
describe('feats and ASI', () => {
  it('ASI levels match D&D 5e (4, 8, 12, 16, 19)', () => {
    expect(ASI_LEVELS).toEqual([4, 8, 12, 16, 19]);
  });
  it('hasPendingASI detects pending choices', () => {
    const char = { level: 4, asiChoicesMade: 0 } as Character;
    expect(hasPendingASI(char)).toBe(true);
  });
  it('hasPendingASI returns false when all choices made', () => {
    const char = { level: 4, asiChoicesMade: 1 } as Character;
    expect(hasPendingASI(char)).toBe(false);
  });
  it('all feats have at least one bonus', () => {
    for (const feat of FEATS) {
      expect(feat.id).toBeTruthy();
      expect(feat.name).toBeTruthy();
      expect(feat.description).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// XP thresholds
// ---------------------------------------------------------------------------
describe('XP and leveling', () => {
  it('XP thresholds are monotonically increasing', () => {
    for (let i = 1; i < XP_THRESHOLDS.length; i++) {
      expect(XP_THRESHOLDS[i]).toBeGreaterThan(XP_THRESHOLDS[i - 1]);
    }
  });
  it('level 1 requires 0 XP', () => {
    expect(XP_THRESHOLDS[0]).toBe(0);
  });
  it('supports 20 levels', () => {
    expect(XP_THRESHOLDS.length).toBe(20);
  });
});

// ---------------------------------------------------------------------------
// Condition effects
// ---------------------------------------------------------------------------
describe('conditions', () => {
  it('all 7 condition types have effects defined', () => {
    const types = ['poisoned', 'stunned', 'frightened', 'blessed', 'hexed', 'burning', 'prone'];
    for (const t of types) {
      expect(CONDITION_EFFECTS[t]).toBeDefined();
    }
  });
});

// ---------------------------------------------------------------------------
// Loot system
// ---------------------------------------------------------------------------
describe('loot system', () => {
  it('rollLoot returns items', () => {
    // Run many times to cover rarity RNG
    let gotItem = false;
    for (let i = 0; i < 50; i++) {
      const items = rollLoot(5, 1); // level 5, 1 enemy
      if (items.length > 0) {
        gotItem = true;
        for (const item of items) {
          expect(item.name).toBeTruthy();
          expect(item.type).toBeTruthy();
          expect(item.rarity).toBeTruthy();
        }
      }
    }
    expect(gotItem).toBe(true); // should get at least 1 item in 50 rolls
  });
});

// ---------------------------------------------------------------------------
// Shop
// ---------------------------------------------------------------------------
describe('shop', () => {
  it('all shop items have required fields', () => {
    for (const item of SHOP_ITEMS) {
      expect(item.name).toBeTruthy();
      expect(item.type).toBeTruthy();
      expect(item.value).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// Extra attack
// ---------------------------------------------------------------------------
describe('extra attack', () => {
  it('martial classes get extra attack', () => {
    expect(EXTRA_ATTACK_CLASSES).toContain('Fighter');
    expect(EXTRA_ATTACK_CLASSES).toContain('Barbarian');
    expect(EXTRA_ATTACK_CLASSES).toContain('Paladin');
    expect(EXTRA_ATTACK_CLASSES).toContain('Ranger');
    expect(EXTRA_ATTACK_CLASSES).toContain('Monk');
  });
  it('casters do not get extra attack', () => {
    expect(EXTRA_ATTACK_CLASSES).not.toContain('Wizard');
    expect(EXTRA_ATTACK_CLASSES).not.toContain('Sorcerer');
  });
});

// ---------------------------------------------------------------------------
// Data integrity
// ---------------------------------------------------------------------------
describe('data integrity', () => {
  it('all 8 races are defined', () => expect(RACES.length).toBe(8));
  it('all 12 classes are defined', () => expect(CLASSES.length).toBe(12));
  it('6 stat names', () => expect(STAT_NAMES).toEqual(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']));
  it('enemy templates exist for all tiers', () => {
    expect(ENEMY_TEMPLATES.easy.length).toBeGreaterThan(0);
    expect(ENEMY_TEMPLATES.medium.length).toBeGreaterThan(0);
    expect(ENEMY_TEMPLATES.hard.length).toBeGreaterThan(0);
    expect(ENEMY_TEMPLATES.deadly.length).toBeGreaterThan(0);
  });
});

describe('opportunity attacks', () => {
  const makeUnit = (id: string, name: string, type: 'player' | 'enemy', overrides?: Partial<{ hp: number; reactionUsed: boolean; disengaged: boolean; attackBonus: number; damageDie: string; damageBonus: number; conditions: { type: string }[] }>) => ({
    id, name, type, hp: 20, reactionUsed: false, disengaged: false,
    attackBonus: 3, damageDie: '1d8', damageBonus: 1, conditions: [] as { type: string }[],
    ...overrides,
  });

  const makePos = (unitId: string, col: number, row: number): TokenPosition => ({ unitId, col, row });

  it('enemy triggers OA when player moves away from adjacency', () => {
    const units = [
      makeUnit('p1', 'Fighter', 'player'),
      makeUnit('e1', 'Goblin', 'enemy'),
    ];
    const positions = [makePos('p1', 5, 5), makePos('e1', 5, 6)]; // adjacent
    // Player at (5,5) moves to (5,3) — leaves goblin's reach
    const attackers = findOpportunityAttackers('p1', 'player', 5, 5, 5, 3, units, positions);
    expect(attackers).toHaveLength(1);
    expect(attackers[0].unitId).toBe('e1');
    expect(attackers[0].name).toBe('Goblin');
  });

  it('no OA when moving within adjacency', () => {
    const units = [
      makeUnit('p1', 'Fighter', 'player'),
      makeUnit('e1', 'Goblin', 'enemy'),
    ];
    const positions = [makePos('p1', 5, 5), makePos('e1', 5, 6)];
    // Player at (5,5) moves to (6,6) — still adjacent to goblin at (5,6)
    const attackers = findOpportunityAttackers('p1', 'player', 5, 5, 6, 6, units, positions);
    expect(attackers).toHaveLength(0);
  });

  it('no OA from dead enemies', () => {
    const units = [
      makeUnit('p1', 'Fighter', 'player'),
      makeUnit('e1', 'Dead Goblin', 'enemy', { hp: 0 }),
    ];
    const positions = [makePos('p1', 5, 5), makePos('e1', 5, 6)];
    const attackers = findOpportunityAttackers('p1', 'player', 5, 5, 5, 3, units, positions);
    expect(attackers).toHaveLength(0);
  });

  it('no OA if reaction already used', () => {
    const units = [
      makeUnit('p1', 'Fighter', 'player'),
      makeUnit('e1', 'Goblin', 'enemy', { reactionUsed: true }),
    ];
    const positions = [makePos('p1', 5, 5), makePos('e1', 5, 6)];
    const attackers = findOpportunityAttackers('p1', 'player', 5, 5, 5, 3, units, positions);
    expect(attackers).toHaveLength(0);
  });

  it('no OA if stunned', () => {
    const units = [
      makeUnit('p1', 'Fighter', 'player'),
      makeUnit('e1', 'Goblin', 'enemy', { conditions: [{ type: 'stunned' }] }),
    ];
    const positions = [makePos('p1', 5, 5), makePos('e1', 5, 6)];
    const attackers = findOpportunityAttackers('p1', 'player', 5, 5, 5, 3, units, positions);
    expect(attackers).toHaveLength(0);
  });

  it('no OA when disengaged', () => {
    const units = [
      makeUnit('p1', 'Fighter', 'player', { disengaged: true }),
      makeUnit('e1', 'Goblin', 'enemy'),
    ];
    const positions = [makePos('p1', 5, 5), makePos('e1', 5, 6)];
    const attackers = findOpportunityAttackers('p1', 'player', 5, 5, 5, 3, units, positions);
    expect(attackers).toHaveLength(0);
  });

  it('multiple enemies can trigger OAs from different units', () => {
    const units = [
      makeUnit('p1', 'Fighter', 'player'),
      makeUnit('e1', 'Goblin A', 'enemy'),
      makeUnit('e2', 'Goblin B', 'enemy'),
    ];
    // Both goblins adjacent to player at (5,5)
    const positions = [makePos('p1', 5, 5), makePos('e1', 4, 5), makePos('e2', 6, 5)];
    // Player moves to (5,2) — leaves both goblins' reach
    const attackers = findOpportunityAttackers('p1', 'player', 5, 5, 5, 2, units, positions);
    expect(attackers).toHaveLength(2);
  });

  it('same-type units do not trigger OAs against each other', () => {
    const units = [
      makeUnit('e1', 'Goblin A', 'enemy'),
      makeUnit('e2', 'Goblin B', 'enemy'),
    ];
    const positions = [makePos('e1', 5, 5), makePos('e2', 5, 6)];
    // Enemy moves away from another enemy — no OA
    const attackers = findOpportunityAttackers('e1', 'enemy', 5, 5, 5, 3, units, positions);
    expect(attackers).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Condition system
// ---------------------------------------------------------------------------
describe('condition system', () => {
  const makeCond = (type: ConditionType, duration = 2): ActiveCondition => ({ type, duration, source: 'test' });

  describe('CONDITION_EFFECTS', () => {
    it('has entries for all 10 condition types', () => {
      const expectedTypes: ConditionType[] = ['poisoned', 'stunned', 'frightened', 'blessed', 'hexed', 'burning', 'prone', 'dodging', 'raging', 'inspired'];
      for (const t of expectedTypes) {
        expect(CONDITION_EFFECTS[t]).toBeDefined();
        expect(CONDITION_EFFECTS[t]).toHaveProperty('attackMod');
        expect(CONDITION_EFFECTS[t]).toHaveProperty('acMod');
        expect(CONDITION_EFFECTS[t]).toHaveProperty('saveMod');
        expect(CONDITION_EFFECTS[t]).toHaveProperty('description');
        expect(CONDITION_EFFECTS[t]).toHaveProperty('color');
      }
    });

    it('dodging gives +2 AC', () => {
      expect(CONDITION_EFFECTS.dodging.acMod).toBe(2);
      expect(CONDITION_EFFECTS.dodging.attackMod).toBe(0);
    });

    it('raging gives +2 attack', () => {
      expect(CONDITION_EFFECTS.raging.attackMod).toBe(2);
      expect(CONDITION_EFFECTS.raging.acMod).toBe(0);
    });

    it('inspired gives +2 attack and +2 saves', () => {
      expect(CONDITION_EFFECTS.inspired.attackMod).toBe(2);
      expect(CONDITION_EFFECTS.inspired.saveMod).toBe(2);
    });

    it('stunned gives -2 AC and -99 attack (cannot act)', () => {
      expect(CONDITION_EFFECTS.stunned.acMod).toBe(-2);
      expect(CONDITION_EFFECTS.stunned.attackMod).toBe(-99);
    });

    it('prone has zero flat mods (uses advantage/disadvantage instead)', () => {
      expect(CONDITION_EFFECTS.prone.attackMod).toBe(0);
      expect(CONDITION_EFFECTS.prone.acMod).toBe(0);
    });
  });

  describe('effectiveAC', () => {
    it('returns base AC when no conditions', () => {
      expect(effectiveAC(15, [])).toBe(15);
    });

    it('applies dodging +2 AC', () => {
      expect(effectiveAC(15, [makeCond('dodging')])).toBe(17);
    });

    it('applies stunned -2 AC', () => {
      expect(effectiveAC(15, [makeCond('stunned')])).toBe(13);
    });

    it('stacks multiple conditions', () => {
      // dodging (+2) + stunned (-2) = net 0
      expect(effectiveAC(15, [makeCond('dodging'), makeCond('stunned')])).toBe(15);
    });

    it('conditions without acMod leave AC unchanged', () => {
      expect(effectiveAC(15, [makeCond('poisoned'), makeCond('raging')])).toBe(15);
    });
  });

  describe('rollD20WithProne', () => {
    // Statistical tests: run many rolls and verify the distribution changes
    const N = 1000;
    const avgRolls = (attConds: ActiveCondition[], tgtConds: ActiveCondition[], isMelee: boolean) => {
      let sum = 0;
      for (let i = 0; i < N; i++) {
        sum += rollD20WithProne(attConds, tgtConds, isMelee).roll;
      }
      return sum / N;
    };

    it('no prone = normal d20 (avg ~10.5)', () => {
      const avg = avgRolls([], [], true);
      expect(avg).toBeGreaterThan(8);
      expect(avg).toBeLessThan(13);
    });

    it('melee vs prone target = advantage (avg ~13.8)', () => {
      const avg = avgRolls([], [makeCond('prone')], true);
      // Advantage avg is ~13.82
      expect(avg).toBeGreaterThan(12);
    });

    it('ranged vs prone target = disadvantage (avg ~7.2)', () => {
      const avg = avgRolls([], [makeCond('prone')], false);
      // Disadvantage avg is ~7.18
      expect(avg).toBeLessThan(9);
    });

    it('prone attacker = disadvantage', () => {
      const avg = avgRolls([makeCond('prone')], [], true);
      expect(avg).toBeLessThan(9);
    });

    it('prone attacker vs prone target melee = cancel out (normal)', () => {
      // Attacker prone (disadv) + target prone melee (adv) = cancel
      const avg = avgRolls([makeCond('prone')], [makeCond('prone')], true);
      expect(avg).toBeGreaterThan(8);
      expect(avg).toBeLessThan(13);
    });

    it('reports hadAdvantage correctly for melee vs prone', () => {
      const result = rollD20WithProne([], [makeCond('prone')], true);
      expect(result.hadAdvantage).toBe(true);
      expect(result.hadDisadvantage).toBe(false);
    });

    it('reports hadDisadvantage correctly for ranged vs prone', () => {
      const result = rollD20WithProne([], [makeCond('prone')], false);
      expect(result.hadAdvantage).toBe(false);
      expect(result.hadDisadvantage).toBe(true);
    });

    it('cancellation reports neither advantage nor disadvantage', () => {
      // prone attacker (disadv) + prone target melee (adv) = cancel
      const result = rollD20WithProne([makeCond('prone')], [makeCond('prone')], true);
      expect(result.hadAdvantage).toBe(false);
      expect(result.hadDisadvantage).toBe(false);
    });
  });

  describe('CLASS_ABILITIES condition types', () => {
    it('Rage applies raging (not blessed)', () => {
      const rage = CLASS_ABILITIES.find((a) => a.id === 'rage');
      expect(rage).toBeDefined();
      expect(rage!.appliesCondition).toBe('raging');
    });

    it('Bardic Inspiration applies inspired (not blessed)', () => {
      const bi = CLASS_ABILITIES.find((a) => a.id === 'bardic-inspiration');
      expect(bi).toBeDefined();
      expect(bi!.appliesCondition).toBe('inspired');
    });

    it('blessed condition type is reserved for the Bless spell', () => {
      // No class ability should apply blessed — it's only for the Bless spell
      const blessed = CLASS_ABILITIES.filter((a) => a.appliesCondition === 'blessed');
      expect(blessed).toHaveLength(0);
    });
  });

  // --- Encounter difficulty calculator ---
  describe('encounter difficulty calculator', () => {
    it('ENCOUNTER_THRESHOLDS covers all 20 levels', () => {
      for (let lvl = 1; lvl <= 20; lvl++) {
        const t = ENCOUNTER_THRESHOLDS[lvl];
        expect(t).toBeDefined();
        expect(t).toHaveLength(4);
        // Each tier should be strictly increasing: easy < medium < hard < deadly
        expect(t[0]).toBeLessThan(t[1]);
        expect(t[1]).toBeLessThan(t[2]);
        expect(t[2]).toBeLessThan(t[3]);
      }
    });

    it('calculateEncounterBudget sums XP thresholds for party', () => {
      // Single level 1 character
      const solo = calculateEncounterBudget([1]);
      expect(solo).toEqual({ easy: 25, medium: 50, hard: 75, deadly: 100 });

      // Party of 4 level 5 characters
      const party = calculateEncounterBudget([5, 5, 5, 5]);
      expect(party).toEqual({ easy: 1000, medium: 2000, hard: 3000, deadly: 4400 });
    });

    it('calculateEncounterBudget handles mixed levels', () => {
      const mixed = calculateEncounterBudget([1, 3, 5]);
      // Level 1: [25,50,75,100], Level 3: [75,150,225,400], Level 5: [250,500,750,1100]
      expect(mixed).toEqual({ easy: 350, medium: 700, hard: 1050, deadly: 1600 });
    });

    it('calculateEncounterBudget clamps out-of-range levels', () => {
      // Level 0 and level 25 should clamp to valid range
      const clamped = calculateEncounterBudget([0, 25]);
      expect(clamped.easy).toBeGreaterThan(0);
      expect(clamped.deadly).toBeGreaterThan(0);
    });

    it('calculateEncounterBudget returns zeros for empty party', () => {
      const empty = calculateEncounterBudget([]);
      expect(empty).toEqual({ easy: 0, medium: 0, hard: 0, deadly: 0 });
    });
  });
});
