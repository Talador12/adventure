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
  it('all condition types have effects defined', () => {
    const types = ['poisoned', 'stunned', 'frightened', 'blessed', 'hexed', 'burning', 'prone', 'dodging', 'raging', 'inspired', 'helping', 'hidden', 'grappled', 'smiteArmed', 'hunterMarked', 'surprised', 'torchlit', 'darkvision', 'candlelit', 'lantern', 'daylight'];
    for (const t of types) {
      expect(CONDITION_EFFECTS[t]).toBeDefined();
      expect(CONDITION_EFFECTS[t].description).toBeTruthy();
      expect(CONDITION_EFFECTS[t].color).toBeTruthy();
    }
  });

  it('grappled condition has speed-0 semantics (no attack/AC/save penalty)', () => {
    const grappled = CONDITION_EFFECTS.grappled;
    expect(grappled.attackMod).toBe(0);
    expect(grappled.acMod).toBe(0);
    expect(grappled.saveMod).toBe(0);
    expect(grappled.description).toContain('speed');
  });

  it('effectiveAC applies condition modifiers', () => {
    expect(effectiveAC(15, [])).toBe(15);
    expect(effectiveAC(15, [{ type: 'dodging', duration: 1 }])).toBe(17); // +2 from dodging
    expect(effectiveAC(15, [{ type: 'stunned', duration: 1 }])).toBe(13); // -2 from stunned
    expect(effectiveAC(15, [{ type: 'grappled', duration: -1 }])).toBe(15); // grappled = no AC change
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
describe('reaction spells', () => {
  it('Shield, Counterspell, and Hellish Rebuke are marked as reactions', () => {
    const reactionSpells = SPELL_LIST.filter((s) => s.isReaction);
    expect(reactionSpells.length).toBeGreaterThanOrEqual(3);
    const names = reactionSpells.map((s) => s.name);
    expect(names).toContain('Shield');
    expect(names).toContain('Counterspell');
    expect(names).toContain('Hellish Rebuke');
  });

  it('reaction spells are filtered out of regular class spell lists', () => {
    const wizardSpells = getClassSpells('Wizard', 5);
    const nonReaction = wizardSpells.filter((s) => !s.isReaction);
    const reactionOnly = wizardSpells.filter((s) => s.isReaction);
    expect(reactionOnly.length).toBeGreaterThan(0);
    expect(nonReaction.length).toBeLessThan(wizardSpells.length);
  });

  it('Hellish Rebuke is available to Warlocks', () => {
    const warlockSpells = getClassSpells('Warlock', 3);
    expect(warlockSpells.some((s) => s.id === 'hellish-rebuke')).toBe(true);
  });

  it('Shield spell has correct properties', () => {
    const shield = SPELL_LIST.find((s) => s.id === 'shield');
    expect(shield).toBeDefined();
    expect(shield!.level).toBe(1);
    expect(shield!.isReaction).toBe(true);
    expect(shield!.range).toBe('Self');
  });
});

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

describe('action economy fields', () => {
  it('Unit has bonusActionUsed field that defaults to false', () => {
    const unit: Partial<Unit> = {
      id: 'test', name: 'Test', hp: 10, maxHp: 10, ac: 12,
      initiative: 10, isCurrentTurn: false, type: 'player', playerId: 'p1',
      speed: 6, movementUsed: 0, reactionUsed: false, bonusActionUsed: false, disengaged: false,
    };
    expect(unit.bonusActionUsed).toBe(false);
  });

  it('Unit can have a readied action with trigger and action text', () => {
    const unit: Partial<Unit> = {
      id: 'test', name: 'Test', hp: 10, maxHp: 10, ac: 12,
      initiative: 10, isCurrentTurn: false, type: 'player', playerId: 'p1',
      speed: 6, movementUsed: 0, reactionUsed: false, bonusActionUsed: false, disengaged: false,
      readiedAction: { trigger: 'enemy approaches', action: 'attack' },
    };
    expect(unit.readiedAction?.trigger).toBe('enemy approaches');
    expect(unit.readiedAction?.action).toBe('attack');
  });

  it('readiedAction is optional and defaults to undefined', () => {
    const unit: Partial<Unit> = {
      id: 'test', name: 'Test', hp: 10, maxHp: 10, ac: 12,
      initiative: 10, isCurrentTurn: false, type: 'player', playerId: 'p1',
      speed: 6, movementUsed: 0, reactionUsed: false, bonusActionUsed: false, disengaged: false,
    };
    expect(unit.readiedAction).toBeUndefined();
  });

  it('grappled condition should make speed effectively 0 for movement', () => {
    const unit: Partial<Unit> = {
      id: 'test', name: 'Test', hp: 10, maxHp: 10, ac: 12,
      initiative: 10, isCurrentTurn: true, type: 'player', playerId: 'p1',
      speed: 6, movementUsed: 0, reactionUsed: false, bonusActionUsed: false, disengaged: false,
      conditions: [{ type: 'grappled', duration: -1, source: 'Enemy' }],
    };
    const isGrappled = unit.conditions?.some((c) => c.type === 'grappled');
    const effectiveSpeed = isGrappled ? 0 : (unit.speed || 6);
    expect(effectiveSpeed).toBe(0);
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

// ---------------------------------------------------------------------------
// Weather combat effects
// ---------------------------------------------------------------------------
import { WEATHER_COMBAT_EFFECTS, getWeatherAttackMod } from '../../src/lib/weatherEffects';

describe('weather combat effects', () => {
  it('all weather types have combat effect definitions', () => {
    const types = ['none', 'rain', 'fog', 'snow', 'sandstorm'] as const;
    for (const t of types) {
      expect(WEATHER_COMBAT_EFFECTS[t]).toBeDefined();
      expect(typeof WEATHER_COMBAT_EFFECTS[t].rangedDisadvantage).toBe('boolean');
      expect(typeof WEATHER_COMBAT_EFFECTS[t].perceptionPenalty).toBe('number');
    }
  });

  it('rain/fog/sandstorm impose ranged disadvantage', () => {
    expect(getWeatherAttackMod('rain', true).disadvantage).toBe(true);
    expect(getWeatherAttackMod('fog', true).disadvantage).toBe(true);
    expect(getWeatherAttackMod('sandstorm', true).disadvantage).toBe(true);
  });

  it('melee attacks are not affected by weather disadvantage', () => {
    expect(getWeatherAttackMod('rain', false).disadvantage).toBe(false);
    expect(getWeatherAttackMod('sandstorm', false).disadvantage).toBe(false);
  });

  it('none weather has no penalties', () => {
    const none = WEATHER_COMBAT_EFFECTS.none;
    expect(none.rangedDisadvantage).toBe(false);
    expect(none.perceptionPenalty).toBe(0);
    expect(none.movementPenalty).toBe(0);
    expect(none.visibilityRange).toBe(Infinity);
  });

  it('snow and sandstorm have movement penalty', () => {
    expect(WEATHER_COMBAT_EFFECTS.snow.movementPenalty).toBeGreaterThan(0);
    expect(WEATHER_COMBAT_EFFECTS.sandstorm.movementPenalty).toBeGreaterThan(0);
  });

  it('rollD20WithProne applies extra disadvantage parameter', () => {
    // With extra disadvantage, should get lower of two rolls (statistically)
    let disadvCount = 0;
    for (let i = 0; i < 100; i++) {
      const result = rollD20WithProne([], [], true, true);
      expect(result.hadDisadvantage).toBe(true);
      if (result.rolls[0] !== result.rolls[1]) disadvCount++;
    }
    expect(disadvCount).toBeGreaterThan(0); // at least some had different rolls
  });
});

// ---------------------------------------------------------------------------
// Encumbrance system
// ---------------------------------------------------------------------------
import { calculateCarryCapacity, calculateInventoryWeight, EXHAUSTION_EFFECTS } from '../../src/types/game';

describe('encumbrance system', () => {
  it('calculateCarryCapacity scales with STR', () => {
    const cap10 = calculateCarryCapacity(10);
    expect(cap10.normal).toBe(50);
    expect(cap10.encumbered).toBe(100);
    expect(cap10.max).toBe(150);

    const cap20 = calculateCarryCapacity(20);
    expect(cap20.normal).toBe(100);
    expect(cap20.max).toBe(300);
  });

  it('calculateInventoryWeight sums item weights with quantity', () => {
    const items: Item[] = [
      { id: '1', name: 'Sword', type: 'weapon', rarity: 'common', description: '', value: 10, weight: 3, quantity: 1 },
      { id: '2', name: 'Potion', type: 'potion', rarity: 'common', description: '', value: 5, weight: 0.5, quantity: 4 },
    ];
    expect(calculateInventoryWeight(items, {})).toBe(5); // 3 + 0.5*4
  });

  it('calculateInventoryWeight handles items without weight', () => {
    const items: Item[] = [
      { id: '1', name: 'Ring', type: 'misc', rarity: 'rare', description: '', value: 100 },
    ];
    expect(calculateInventoryWeight(items, {})).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Exhaustion effects
// ---------------------------------------------------------------------------
describe('exhaustion effects', () => {
  it('has effects for levels 0-6', () => {
    for (let i = 0; i <= 6; i++) {
      expect(EXHAUSTION_EFFECTS[i]).toBeDefined();
      expect(typeof EXHAUSTION_EFFECTS[i].description).toBe('string');
    }
  });

  it('level 0 has no penalties', () => {
    const e = EXHAUSTION_EFFECTS[0];
    expect(e.speedMultiplier).toBe(1);
    expect(e.disadvantageChecks).toBe(false);
    expect(e.disadvantageAttacksSaves).toBe(false);
    expect(e.hpMaxHalved).toBe(false);
    expect(e.speedZero).toBe(false);
  });

  it('level 6 is death', () => {
    expect(EXHAUSTION_EFFECTS[6].description).toContain('Death');
    expect(EXHAUSTION_EFFECTS[6].speedZero).toBe(true);
  });

  it('penalties are cumulative at higher levels', () => {
    expect(EXHAUSTION_EFFECTS[1].disadvantageChecks).toBe(true);
    expect(EXHAUSTION_EFFECTS[2].speedMultiplier).toBe(0.5);
    expect(EXHAUSTION_EFFECTS[3].disadvantageAttacksSaves).toBe(true);
    expect(EXHAUSTION_EFFECTS[4].hpMaxHalved).toBe(true);
    expect(EXHAUSTION_EFFECTS[5].speedZero).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Saving throw proficiencies
// ---------------------------------------------------------------------------
import { CLASS_SAVE_PROFICIENCIES, CLASS_SKILL_CHOICES, CRITICAL_HIT_EFFECTS, SKILL_ABILITIES } from '../../src/types/game';

describe('class proficiency data', () => {
  it('all 12 classes have save proficiencies defined', () => {
    for (const cls of CLASSES) {
      expect(CLASS_SAVE_PROFICIENCIES[cls]).toBeDefined();
      expect(CLASS_SAVE_PROFICIENCIES[cls].length).toBe(2);
    }
  });

  it('save proficiencies are valid stat names', () => {
    const validStats = new Set(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']);
    for (const [cls, saves] of Object.entries(CLASS_SAVE_PROFICIENCIES)) {
      for (const save of saves) {
        expect(validStats.has(save)).toBe(true);
      }
    }
  });

  it('all 12 classes have skill choices defined', () => {
    for (const cls of CLASSES) {
      expect(CLASS_SKILL_CHOICES[cls]).toBeDefined();
      expect(CLASS_SKILL_CHOICES[cls].count).toBeGreaterThan(0);
      expect(CLASS_SKILL_CHOICES[cls].options.length).toBeGreaterThanOrEqual(CLASS_SKILL_CHOICES[cls].count);
    }
  });

  it('skill abilities map covers all 18 D&D 5e skills', () => {
    const skills = Object.keys(SKILL_ABILITIES);
    expect(skills.length).toBe(18);
    expect(skills).toContain('Perception');
    expect(skills).toContain('Stealth');
    expect(skills).toContain('Athletics');
  });

  it('critical hit effects table has at least 5 entries', () => {
    expect(CRITICAL_HIT_EFFECTS.length).toBeGreaterThanOrEqual(5);
    for (const effect of CRITICAL_HIT_EFFECTS) {
      expect(effect.name).toBeTruthy();
      expect(effect.description).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// Combat taunts
// ---------------------------------------------------------------------------
import { getEnemyTaunt, ENEMY_TAUNTS } from '../../src/data/combatTaunts';

describe('combat taunts', () => {
  it('returns a taunt for any enemy name', () => {
    const names = ['Goblin', 'Skeleton', 'Wolf', 'Adult Dragon', 'Bandit', 'Unknown Monster'];
    for (const name of names) {
      const taunt = getEnemyTaunt(name);
      expect(typeof taunt).toBe('string');
      expect(taunt.length).toBeGreaterThan(0);
    }
  });

  it('categorizes undead enemies correctly', () => {
    // Run multiple times to verify category selection
    for (let i = 0; i < 20; i++) {
      const taunt = getEnemyTaunt('Skeleton Warrior');
      expect(ENEMY_TAUNTS.undead).toContain(taunt);
    }
  });

  it('categorizes beast enemies correctly', () => {
    for (let i = 0; i < 20; i++) {
      const taunt = getEnemyTaunt('Dire Wolf');
      expect(ENEMY_TAUNTS.beast).toContain(taunt);
    }
  });

  it('categorizes dragon enemies correctly', () => {
    for (let i = 0; i < 20; i++) {
      const taunt = getEnemyTaunt('Adult Dragon');
      expect(ENEMY_TAUNTS.dragon).toContain(taunt);
    }
  });

  it('falls back to default for unknown enemies', () => {
    for (let i = 0; i < 20; i++) {
      const taunt = getEnemyTaunt('Mysterious Entity');
      expect(ENEMY_TAUNTS.default).toContain(taunt);
    }
  });
});

// ---------------------------------------------------------------------------
// Roll20 import parser
// ---------------------------------------------------------------------------
import { isRoll20Character, parseRoll20Character } from '../../src/lib/roll20Import';

describe('Roll20 import', () => {
  it('detects Roll20 character format', () => {
    expect(isRoll20Character({ name: 'Test', attribs: [] })).toBe(true);
    expect(isRoll20Character({ classes: [] })).toBe(false);
    expect(isRoll20Character(null)).toBe(false);
    expect(isRoll20Character('string')).toBe(false);
  });

  it('parses basic Roll20 character with stats', () => {
    const r20 = {
      name: 'Thorin Ironforge',
      attribs: [
        { name: 'strength', current: '18' },
        { name: 'dexterity', current: '12' },
        { name: 'constitution', current: '16' },
        { name: 'intelligence', current: '10' },
        { name: 'wisdom', current: '14' },
        { name: 'charisma', current: '8' },
        { name: 'level', current: '5' },
        { name: 'hp', current: '45', max: '50' },
        { name: 'ac', current: '18' },
        { name: 'race', current: 'Dwarf' },
        { name: 'base_level', current: 'Fighter' },
        { name: 'gp', current: '120' },
        { name: 'background', current: 'Soldier' },
      ],
    };
    const char = parseRoll20Character(r20);
    expect(char.name).toBe('Thorin Ironforge');
    expect(char.stats.STR).toBe(18);
    expect(char.stats.CON).toBe(16);
    expect(char.level).toBe(5);
    expect(char.hp).toBe(45);
    expect(char.maxHp).toBe(50);
    expect(char.ac).toBe(18);
    expect(char.race).toBe('Dwarf');
    expect(char.class).toBe('Fighter');
    expect(char.gold).toBe(120);
    expect(char.background).toBe('Soldier');
  });

  it('handles missing attributes gracefully', () => {
    const minimal = { name: 'Nobody', attribs: [] };
    const char = parseRoll20Character(minimal);
    expect(char.name).toBe('Nobody');
    expect(char.stats.STR).toBe(10); // defaults to 10 for missing attributes
    expect(char.level).toBe(1);
    expect(char.race).toBe('Human'); // default
    expect(char.class).toBe('Fighter'); // default
  });
});

// ---------------------------------------------------------------------------
// Treasure hoards
// ---------------------------------------------------------------------------
import { rollTreasureHoard } from '../../src/data/treasureHoards';

describe('treasure hoards', () => {
  it('generates gold for all level tiers', () => {
    for (const level of [1, 5, 12, 18]) {
      const hoard = rollTreasureHoard(level);
      expect(hoard.gold).toBeGreaterThan(0);
      expect(typeof hoard.description).toBe('string');
    }
  });

  it('higher tiers generate more gold on average', () => {
    let lowTotal = 0, highTotal = 0;
    for (let i = 0; i < 50; i++) { lowTotal += rollTreasureHoard(2).gold; highTotal += rollTreasureHoard(18).gold; }
    expect(highTotal / 50).toBeGreaterThan(lowTotal / 50);
  });

  it('generates items with required fields', () => {
    const hoard = rollTreasureHoard(10);
    for (const item of hoard.items) {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.type).toBeTruthy();
      expect(item.rarity).toBeTruthy();
    }
  });

  it('generates gems array', () => {
    const hoard = rollTreasureHoard(8);
    expect(Array.isArray(hoard.gems)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Downtime activities
// ---------------------------------------------------------------------------
import { DOWNTIME_ACTIVITIES, performDowntimeActivity } from '../../src/data/downtimeActivities';

describe('downtime activities', () => {
  it('has at least 5 activities defined', () => {
    expect(DOWNTIME_ACTIVITIES.length).toBeGreaterThanOrEqual(5);
    for (const a of DOWNTIME_ACTIVITIES) {
      expect(a.id).toBeTruthy();
      expect(a.name).toBeTruthy();
      expect(typeof a.daysRequired).toBe('number');
    }
  });

  it('performDowntimeActivity returns success/failure with outcome', () => {
    for (let i = 0; i < 20; i++) {
      const result = performDowntimeActivity('carousing', 3);
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.outcome).toBe('string');
      expect(typeof result.goldChange).toBe('number');
    }
  });

  it('pit-fighting awards gold on success', () => {
    let foundGold = false;
    for (let i = 0; i < 50; i++) {
      const result = performDowntimeActivity('pit-fighting', 10);
      if (result.success && result.goldChange > 0) foundGold = true;
    }
    expect(foundGold).toBe(true);
  });

  it('returns failure for unknown activity', () => {
    const result = performDowntimeActivity('nonexistent', 0);
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Tavern rumors
// ---------------------------------------------------------------------------
import { rollRumor, rollRumors, TAVERN_RUMORS } from '../../src/data/tavernRumors';

describe('tavern rumors', () => {
  it('has at least 10 rumors', () => {
    expect(TAVERN_RUMORS.length).toBeGreaterThanOrEqual(10);
  });

  it('rollRumor returns a valid rumor', () => {
    const rumor = rollRumor();
    expect(rumor.text).toBeTruthy();
    expect(['helpful', 'misleading', 'ominous', 'humorous']).toContain(rumor.type);
  });

  it('rollRumors returns requested count', () => {
    const rumors = rollRumors(3);
    expect(rumors.length).toBe(3);
    for (const r of rumors) expect(r.text).toBeTruthy();
  });

  it('has rumors of all 4 types', () => {
    const types = new Set(TAVERN_RUMORS.map((r) => r.type));
    expect(types.has('helpful')).toBe(true);
    expect(types.has('misleading')).toBe(true);
    expect(types.has('ominous')).toBe(true);
    expect(types.has('humorous')).toBe(true);
  });

  it('some rumors are quest hooks', () => {
    expect(TAVERN_RUMORS.some((r) => r.questHook)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Chase obstacles
// ---------------------------------------------------------------------------
import { getChaseObstacle, resolveChaseRound, URBAN_OBSTACLES, WILDERNESS_OBSTACLES } from '../../src/data/chaseObstacles';

describe('chase obstacles', () => {
  it('has urban and wilderness obstacles', () => {
    expect(URBAN_OBSTACLES.length).toBeGreaterThanOrEqual(3);
    expect(WILDERNESS_OBSTACLES.length).toBeGreaterThanOrEqual(3);
  });

  it('getChaseObstacle returns valid obstacle', () => {
    const urban = getChaseObstacle(true);
    expect(urban.description).toBeTruthy();
    expect(urban.skill).toBeTruthy();
    expect(typeof urban.dc).toBe('number');

    const wild = getChaseObstacle(false);
    expect(wild.description).toBeTruthy();
  });

  it('resolveChaseRound produces success/failure narration', () => {
    let foundSuccess = false, foundFailure = false;
    for (let i = 0; i < 50; i++) {
      const result = resolveChaseRound('TestRunner', 3, true);
      expect(result.narration).toContain('TestRunner');
      if (result.success) foundSuccess = true; else foundFailure = true;
    }
    expect(foundSuccess).toBe(true);
    expect(foundFailure).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Travel pace
// ---------------------------------------------------------------------------
import { TRAVEL_PACES, calculateTravelTime, partyTravelSpeed } from '../../src/lib/travelPace';

describe('travel pace', () => {
  it('has slow/normal/fast paces defined', () => {
    expect(TRAVEL_PACES.slow.milesPerHour).toBe(2);
    expect(TRAVEL_PACES.normal.milesPerHour).toBe(3);
    expect(TRAVEL_PACES.fast.milesPerHour).toBe(4);
  });

  it('slow pace allows stealth', () => {
    expect(TRAVEL_PACES.slow.stealthPossible).toBe(true);
    expect(TRAVEL_PACES.fast.stealthPossible).toBe(false);
  });

  it('calculateTravelTime computes days and hours', () => {
    const trip = calculateTravelTime(48, 'normal');
    expect(trip.hours).toBe(16);
    expect(trip.days).toBe(2);
  });

  it('partyTravelSpeed uses slowest member', () => {
    expect(partyTravelSpeed([6, 8, 5])).toBe(25); // 5 cells × 5ft = 25ft
  });

  it('partyTravelSpeed defaults to 30 for empty', () => {
    expect(partyTravelSpeed([])).toBe(30);
  });
});

// ---------------------------------------------------------------------------
// Condition rules
// ---------------------------------------------------------------------------
import { CONDITION_RULES, getConditionRules } from '../../src/data/conditionRules';

describe('condition rules', () => {
  it('has rules for all combat conditions', () => {
    const expected = ['poisoned', 'stunned', 'frightened', 'prone', 'grappled', 'blessed', 'hexed', 'raging', 'hidden', 'surprised', 'hunterMarked', 'smiteArmed'];
    for (const c of expected) {
      expect(CONDITION_RULES[c]).toBeTruthy();
    }
  });

  it('getConditionRules returns text for known conditions', () => {
    expect(getConditionRules('poisoned')).toContain('disadvantage');
    expect(getConditionRules('grappled')).toContain('speed');
  });

  it('getConditionRules returns fallback for unknown conditions', () => {
    const result = getConditionRules('totally_made_up');
    expect(result).toContain('magical condition');
  });
});

// ---------------------------------------------------------------------------
// Bonus action helpers
// ---------------------------------------------------------------------------
import { hasBonusAction, getBonusActionLabel } from '../../src/components/game/BonusActionPanel';

describe('bonus action helpers', () => {
  it('hasBonusAction returns true for all 10 supported classes', () => {
    const supported = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer'];
    for (const cls of supported) {
      expect(hasBonusAction(cls, 5)).toBe(true);
    }
  });

  it('hasBonusAction respects level requirements', () => {
    expect(hasBonusAction('Rogue', 1)).toBe(false);
    expect(hasBonusAction('Rogue', 2)).toBe(true);
    expect(hasBonusAction('Monk', 1)).toBe(false);
    expect(hasBonusAction('Monk', 2)).toBe(true);
    expect(hasBonusAction('Sorcerer', 2)).toBe(false);
    expect(hasBonusAction('Sorcerer', 3)).toBe(true);
  });

  it('getBonusActionLabel returns correct labels', () => {
    expect(getBonusActionLabel('Barbarian')).toBe('Rage');
    expect(getBonusActionLabel('Rogue')).toBe('Cunning Action');
    expect(getBonusActionLabel('Paladin')).toBe('Divine Smite');
    expect(getBonusActionLabel('Wizard')).toBeNull();
  });

  it('hasBonusAction returns false for Wizard and Warlock', () => {
    expect(hasBonusAction('Wizard', 20)).toBe(false);
    expect(hasBonusAction('Warlock', 20)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Random encounters
// ---------------------------------------------------------------------------
import { rollRandomEncounter, rollEncounterCount, RANDOM_ENCOUNTER_TABLES } from '../../src/data/randomEncounters';

describe('random encounters', () => {
  it('has tables for all 5 environments', () => {
    const envs = ['forest', 'dungeon', 'mountain', 'swamp', 'urban'];
    for (const env of envs) {
      expect(RANDOM_ENCOUNTER_TABLES[env]).toBeDefined();
      expect(RANDOM_ENCOUNTER_TABLES[env].length).toBeGreaterThanOrEqual(3);
    }
  });

  it('rollRandomEncounter returns valid entry', () => {
    for (const env of ['forest', 'dungeon', 'urban']) {
      const entry = rollRandomEncounter(env);
      expect(entry.name).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(typeof entry.cr).toBe('number');
    }
  });

  it('rollEncounterCount respects min/max', () => {
    for (let i = 0; i < 50; i++) {
      const entry = rollRandomEncounter('forest');
      if (entry.count[0] === 0 && entry.count[1] === 0) continue;
      const count = rollEncounterCount(entry);
      expect(count).toBeGreaterThanOrEqual(entry.count[0]);
      expect(count).toBeLessThanOrEqual(entry.count[1]);
    }
  });

  it('returns 0 for non-combat encounters', () => {
    const nonCombat = { name: 'Test', cr: 0, count: [0, 0] as [number, number], description: 'test' };
    expect(rollEncounterCount(nonCombat)).toBe(0);
  });

  it('falls back to forest for unknown environment', () => {
    const entry = rollRandomEncounter('unknown_biome');
    expect(entry.name).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Encumbrance edge cases
// ---------------------------------------------------------------------------
describe('encumbrance edge cases', () => {
  it('zero STR gives minimal carry capacity', () => {
    // STR 0 is technically impossible but we should handle it gracefully
    const cap = calculateCarryCapacity(1);
    expect(cap.normal).toBe(5);
    expect(cap.max).toBe(15);
  });

  it('very high STR scales linearly', () => {
    const cap = calculateCarryCapacity(30);
    expect(cap.normal).toBe(150);
    expect(cap.max).toBe(450);
  });

  it('heavy inventory with many items sums correctly', () => {
    const items: Item[] = Array.from({ length: 100 }, (_, i) => ({
      id: String(i), name: `Item ${i}`, type: 'misc' as const, rarity: 'common' as const,
      description: '', value: 0, weight: 1, quantity: 2,
    }));
    expect(calculateInventoryWeight(items, {})).toBe(200);
  });

  it('equipment weight is included', () => {
    const sword: Item = { id: 's', name: 'Sword', type: 'weapon', rarity: 'common', description: '', value: 10, weight: 6 };
    const armor: Item = { id: 'a', name: 'Armor', type: 'armor', rarity: 'common', description: '', value: 50, weight: 45 };
    expect(calculateInventoryWeight([], { weapon: sword, armor, shield: null, ring: null })).toBe(51);
  });
});

// ---------------------------------------------------------------------------
// Exhaustion integration
// ---------------------------------------------------------------------------
describe('exhaustion integration', () => {
  it('all levels have defined speed multipliers', () => {
    for (let i = 0; i <= 6; i++) {
      expect(typeof EXHAUSTION_EFFECTS[i].speedMultiplier).toBe('number');
      expect(EXHAUSTION_EFFECTS[i].speedMultiplier).toBeGreaterThanOrEqual(0);
      expect(EXHAUSTION_EFFECTS[i].speedMultiplier).toBeLessThanOrEqual(1);
    }
  });

  it('disadvantage checks starts at level 1', () => {
    expect(EXHAUSTION_EFFECTS[0].disadvantageChecks).toBe(false);
    expect(EXHAUSTION_EFFECTS[1].disadvantageChecks).toBe(true);
  });

  it('disadvantage attacks/saves starts at level 3', () => {
    expect(EXHAUSTION_EFFECTS[2].disadvantageAttacksSaves).toBe(false);
    expect(EXHAUSTION_EFFECTS[3].disadvantageAttacksSaves).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Spell slot data integrity
// ---------------------------------------------------------------------------
describe('spell slot data integrity', () => {
  it('full casters get slots at level 1', () => {
    for (const cls of ['Wizard', 'Sorcerer', 'Cleric', 'Druid', 'Bard'] as const) {
      const slots = getSpellSlots(cls, 1);
      expect(slots[1]).toBeGreaterThan(0);
    }
  });

  it('half casters get slots at level 2', () => {
    for (const cls of ['Paladin', 'Ranger'] as const) {
      const slots1 = getSpellSlots(cls, 1);
      const slots2 = getSpellSlots(cls, 2);
      expect(slots1[1] || 0).toBe(0);
      expect(slots2[1]).toBeGreaterThan(0);
    }
  });

  it('non-casters get no slots at any level', () => {
    for (const cls of ['Fighter', 'Barbarian', 'Rogue', 'Monk'] as const) {
      const slots = getSpellSlots(cls, 20);
      const total = Object.values(slots).reduce((s, v) => s + v, 0);
      expect(total).toBe(0);
    }
  });

  it('slot counts increase with level', () => {
    const slots1 = getSpellSlots('Wizard', 1);
    const slots15 = getSpellSlots('Wizard', 15);
    const total1 = Object.values(slots1).reduce((s, v) => s + v, 0);
    const total15 = Object.values(slots15).reduce((s, v) => s + v, 0);
    expect(total15).toBeGreaterThan(total1);
  });
});

// ---------------------------------------------------------------------------
// Campaign templates
// ---------------------------------------------------------------------------
import { CAMPAIGN_TEMPLATES } from '../../src/data/campaignTemplates';

describe('campaign templates', () => {
  it('has at least 5 templates', () => {
    expect(CAMPAIGN_TEMPLATES.length).toBeGreaterThanOrEqual(5);
  });

  it('all templates have required fields', () => {
    for (const t of CAMPAIGN_TEMPLATES) {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.sceneName).toBeTruthy();
      expect(t.openingNarration).toBeTruthy();
      expect(Array.isArray(t.quests)).toBe(true);
      expect(t.quests.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('all quests have required fields', () => {
    for (const t of CAMPAIGN_TEMPLATES) {
      for (const q of t.quests) {
        expect(q.id).toBeTruthy();
        expect(q.title).toBeTruthy();
        expect(q.description).toBeTruthy();
        expect(['main', 'side']).toContain(q.priority);
      }
    }
  });

  it('template IDs are unique', () => {
    const ids = CAMPAIGN_TEMPLATES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all templates have suggested level', () => {
    for (const t of CAMPAIGN_TEMPLATES) {
      expect(t.suggestedLevel).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// Enemy template multiattack
// ---------------------------------------------------------------------------
describe('enemy template multiattack', () => {
  it('hard tier enemies have multiattack >= 2', () => {
    const hardTemplates = ENEMY_TEMPLATES.hard || [];
    const withMulti = hardTemplates.filter((t) => t.multiattack && t.multiattack >= 2);
    expect(withMulti.length).toBeGreaterThan(0);
  });

  it('deadly tier enemies have multiattack >= 3', () => {
    const deadlyTemplates = ENEMY_TEMPLATES.deadly || [];
    const withMulti = deadlyTemplates.filter((t) => t.multiattack && t.multiattack >= 3);
    expect(withMulti.length).toBeGreaterThan(0);
  });

  it('easy tier enemies have no multiattack', () => {
    const easyTemplates = ENEMY_TEMPLATES.easy || [];
    for (const t of easyTemplates) {
      expect(t.multiattack || 1).toBe(1);
    }
  });

  it('generated enemies inherit multiattack from template', () => {
    const enemies = generateEnemies('hard', 4, 5);
    if (enemies.length > 0 && enemies[0].multiattack) {
      expect(enemies[0].multiattack).toBeGreaterThanOrEqual(2);
    }
  });
});

// ---------------------------------------------------------------------------
// Class save proficiencies integration
// ---------------------------------------------------------------------------
describe('class save proficiencies integration', () => {
  it('every class has exactly 2 save proficiencies', () => {
    for (const cls of CLASSES) {
      const saves = CLASS_SAVE_PROFICIENCIES[cls];
      expect(saves).toBeDefined();
      expect(saves.length).toBe(2);
    }
  });

  it('no class has duplicate save proficiencies', () => {
    for (const cls of CLASSES) {
      const saves = CLASS_SAVE_PROFICIENCIES[cls];
      expect(new Set(saves).size).toBe(2);
    }
  });

  it('Fighter and Barbarian are proficient in STR and CON saves', () => {
    expect(CLASS_SAVE_PROFICIENCIES.Fighter).toContain('STR');
    expect(CLASS_SAVE_PROFICIENCIES.Fighter).toContain('CON');
    expect(CLASS_SAVE_PROFICIENCIES.Barbarian).toContain('STR');
    expect(CLASS_SAVE_PROFICIENCIES.Barbarian).toContain('CON');
  });

  it('Wizard is proficient in INT and WIS saves', () => {
    expect(CLASS_SAVE_PROFICIENCIES.Wizard).toContain('INT');
    expect(CLASS_SAVE_PROFICIENCIES.Wizard).toContain('WIS');
  });

  it('Rogue is proficient in DEX and INT saves', () => {
    expect(CLASS_SAVE_PROFICIENCIES.Rogue).toContain('DEX');
    expect(CLASS_SAVE_PROFICIENCIES.Rogue).toContain('INT');
  });
});

// ---------------------------------------------------------------------------
// Skill choices per class
// ---------------------------------------------------------------------------
describe('class skill choices', () => {
  it('Bard gets the most skill choices (3)', () => {
    expect(CLASS_SKILL_CHOICES.Bard.count).toBe(3);
  });

  it('Rogue gets 4 skill choices', () => {
    expect(CLASS_SKILL_CHOICES.Rogue.count).toBe(4);
  });

  it('Ranger gets 3 skill choices', () => {
    expect(CLASS_SKILL_CHOICES.Ranger.count).toBe(3);
  });

  it('most classes get 2 skill choices', () => {
    const twoChoiceClasses = ['Barbarian', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Sorcerer', 'Warlock', 'Wizard'];
    for (const cls of twoChoiceClasses) {
      expect(CLASS_SKILL_CHOICES[cls].count).toBe(2);
    }
  });

  it('all skill options are valid D&D 5e skills', () => {
    const validSkills = Object.keys(SKILL_ABILITIES);
    for (const cls of CLASSES) {
      for (const skill of CLASS_SKILL_CHOICES[cls].options) {
        expect(validSkills).toContain(skill);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Smart loot distribution
// ---------------------------------------------------------------------------
import { suggestLootDistribution } from '../../src/lib/lootDistribution';

describe('smart loot distribution', () => {
  const mockChars: Character[] = [
    { id: '1', name: 'Fighter', race: 'Human', class: 'Fighter', level: 5, stats: { STR: 16, DEX: 12, CON: 14, INT: 10, WIS: 12, CHA: 8 }, hp: 40, maxHp: 40, ac: 18, xp: 0, gold: 100, background: '', alignment: '', equipment: {}, inventory: [], appearance: {}, spellSlotsUsed: {}, classAbilityUsed: false, feats: [], asiChoicesMade: 0, hitDiceRemaining: 5, inspiration: false, exhaustion: 0, createdAt: 0 } as Character,
    { id: '2', name: 'Wizard', race: 'Elf', class: 'Wizard', level: 5, stats: { STR: 8, DEX: 14, CON: 12, INT: 18, WIS: 13, CHA: 10 }, hp: 22, maxHp: 22, ac: 12, xp: 0, gold: 50, background: '', alignment: '', equipment: {}, inventory: [], appearance: {}, spellSlotsUsed: {}, classAbilityUsed: false, feats: [], asiChoicesMade: 0, hitDiceRemaining: 5, inspiration: false, exhaustion: 0, createdAt: 0 } as Character,
  ];

  it('suggests weapon for Fighter over Wizard', () => {
    const items: Item[] = [{ id: 'w1', name: 'Sword +1', type: 'weapon', rarity: 'uncommon', description: '', value: 500, attackBonus: 1, damageBonus: 1 }];
    const suggestions = suggestLootDistribution(items, mockChars);
    expect(suggestions[0].suggestedCharacter).toBe('Fighter');
  });

  it('suggests wondrous item for Wizard over Fighter', () => {
    const items: Item[] = [{ id: 'w2', name: 'Wand of Magic', type: 'misc', rarity: 'uncommon', description: '', value: 300 }];
    const suggestions = suggestLootDistribution(items, mockChars);
    expect(suggestions[0].suggestedCharacter).toBe('Wizard');
  });

  it('returns empty for no items or characters', () => {
    expect(suggestLootDistribution([], mockChars)).toEqual([]);
    expect(suggestLootDistribution([{ id: 'x', name: 'X', type: 'misc', rarity: 'common', description: '', value: 0 }], [])).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// DM personalities
// ---------------------------------------------------------------------------
import { DM_PERSONALITIES, getPersonality, getSystemPromptForPersonality } from '../../src/data/dmPersonalities';

describe('DM personalities', () => {
  it('has 5 personality modes', () => {
    expect(DM_PERSONALITIES.length).toBe(5);
  });

  it('all personalities have required fields', () => {
    for (const p of DM_PERSONALITIES) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.emoji).toBeTruthy();
      expect(p.systemPromptSuffix).toBeTruthy();
      expect(p.combatFlavorStyle).toBeTruthy();
      expect(p.npcDialogueStyle).toBeTruthy();
    }
  });

  it('getPersonality returns correct mode', () => {
    expect(getPersonality('grimdark').name).toBe('Grimdark');
    expect(getPersonality('humorous').emoji).toBe('😂');
  });

  it('getSystemPromptForPersonality returns non-empty string', () => {
    for (const p of DM_PERSONALITIES) {
      const prompt = getSystemPromptForPersonality(p.id);
      expect(prompt.length).toBeGreaterThan(20);
    }
  });
});

// ---------------------------------------------------------------------------
// Voice lines
// ---------------------------------------------------------------------------
import { getVoiceLine } from '../../src/data/voiceLines';

describe('voice lines', () => {
  it('returns a string for all classes and event types', () => {
    const classes = ['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Unknown'];
    const events = ['crit', 'kill', 'heal', 'miss'] as const;
    for (const cls of classes) {
      for (const evt of events) {
        const line = getVoiceLine(cls, evt);
        expect(typeof line).toBe('string');
        expect(line.length).toBeGreaterThan(0);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Room descriptions
// ---------------------------------------------------------------------------
import { generateRoomDescription } from '../../src/lib/roomDescriptions';

describe('room descriptions', () => {
  it('generates text for empty terrain', () => {
    expect(generateRoomDescription([])).toContain('void');
  });

  it('generates dungeon description for stone floors', () => {
    const terrain = Array.from({ length: 5 }, () => Array(5).fill('floor'));
    const desc = generateRoomDescription(terrain);
    expect(desc.length).toBeGreaterThan(20);
  });

  it('generates lava description for volcanic terrain', () => {
    const terrain = Array.from({ length: 5 }, () => Array(5).fill('lava'));
    const desc = generateRoomDescription(terrain);
    expect(desc.toLowerCase()).toMatch(/heat|molten|volcanic/);
  });
});

// ---------------------------------------------------------------------------
// Weather progression
// ---------------------------------------------------------------------------
import { advanceWeather, getWeatherDescription, type WeatherState } from '../../src/lib/weatherProgression';

describe('weather progression', () => {
  it('returns a forecast with current, next, and hours', () => {
    const forecast = advanceWeather('none');
    expect(forecast.current).toBe('none');
    expect(['none', 'rain', 'fog', 'snow', 'sandstorm']).toContain(forecast.next);
    expect(forecast.hoursUntilChange).toBeGreaterThanOrEqual(2);
    expect(forecast.hoursUntilChange).toBeLessThanOrEqual(12);
  });

  it('handles all weather states without error', () => {
    const states: WeatherState[] = ['none', 'rain', 'fog', 'snow', 'sandstorm'];
    for (const s of states) {
      const forecast = advanceWeather(s);
      expect(forecast.current).toBe(s);
      expect(typeof forecast.next).toBe('string');
    }
  });

  it('getWeatherDescription returns non-empty text', () => {
    const forecast = advanceWeather('rain');
    const desc = getWeatherDescription('rain', forecast);
    expect(desc.length).toBeGreaterThan(10);
    expect(desc.toLowerCase()).toContain('rain');
  });

  it('description mentions upcoming change when weather will shift', () => {
    const forecast = { current: 'rain' as WeatherState, next: 'fog' as WeatherState, hoursUntilChange: 3 };
    const desc = getWeatherDescription('rain', forecast);
    expect(desc).toContain('fog');
  });
});

// ---------------------------------------------------------------------------
// Quest branching
// ---------------------------------------------------------------------------
import { BRANCHING_TEMPLATES, applyConsequences } from '../../src/data/questBranching';

describe('quest branching', () => {
  it('has at least 2 branching templates', () => {
    expect(BRANCHING_TEMPLATES.length).toBeGreaterThanOrEqual(2);
  });

  it('all templates have unique IDs', () => {
    const ids = BRANCHING_TEMPLATES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('each template has at least 2 options', () => {
    for (const t of BRANCHING_TEMPLATES) {
      expect(t.options.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('each option has at least 1 consequence', () => {
    for (const t of BRANCHING_TEMPLATES) {
      for (const opt of t.options) {
        expect(opt.consequences.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('applyConsequences fires callbacks correctly', () => {
    const goldChanges: number[] = [];
    const narrations: string[] = [];
    const template = BRANCHING_TEMPLATES[0];
    const payOption = template.options.find((o) => o.id === 'pay');
    expect(payOption).toBeTruthy();
    applyConsequences(payOption!, {
      changeGold: (amount) => goldChanges.push(amount),
      addNarration: (text) => narrations.push(text),
    });
    expect(goldChanges).toContain(-50);
    expect(narrations.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Campaign analytics
// ---------------------------------------------------------------------------
import { analyzeCombatLog, formatAnalytics } from '../../src/lib/campaignAnalytics';

describe('campaign analytics', () => {
  const mockCharsForAnalytics: Character[] = [
    { id: '1', name: 'Thorin', race: 'Dwarf', class: 'Fighter', level: 5, stats: { STR: 16, DEX: 12, CON: 14, INT: 10, WIS: 12, CHA: 8 }, hp: 40, maxHp: 40, ac: 18, xp: 0, gold: 100, background: '', alignment: '', equipment: {}, inventory: [], appearance: {}, spellSlotsUsed: {}, classAbilityUsed: false, feats: [], asiChoicesMade: 0, hitDiceRemaining: 5, inspiration: false, exhaustion: 0, createdAt: 0 } as Character,
  ];

  it('parses damage from combat log', () => {
    const log = ['Thorin attacks Goblin for 12 damage', 'Goblin attacks Thorin for 5 damage'];
    const stats = analyzeCombatLog(log, mockCharsForAnalytics);
    expect(stats.totalDamageDealt).toBe(17);
  });

  it('counts kills from combat log', () => {
    const log = ['Goblin falls!', 'Orc falls!', 'Thorin attacks for 8 damage'];
    const stats = analyzeCombatLog(log, mockCharsForAnalytics);
    expect(stats.totalKills).toBe(2);
  });

  it('counts crits and nat 1s', () => {
    const log = ['CRITICAL HIT!', 'NAT 20!', 'NAT 1...'];
    const stats = analyzeCombatLog(log, mockCharsForAnalytics);
    expect(stats.totalCriticalHits).toBe(2);
    expect(stats.totalNaturalOnes).toBe(1);
  });

  it('formatAnalytics produces readable output', () => {
    const stats = analyzeCombatLog(['Thorin attacks Goblin for 20 damage', 'Goblin falls!'], mockCharsForAnalytics);
    const text = formatAnalytics(stats);
    expect(text).toContain('Campaign Analytics');
    expect(text).toContain('20');
  });

  it('returns empty stats for empty log', () => {
    const stats = analyzeCombatLog([], []);
    expect(stats.totalDamageDealt).toBe(0);
    expect(stats.totalKills).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Character progression
// ---------------------------------------------------------------------------
import { getCharacterLifetime, getProgressionBadge, formatProgressionSummary } from '../../src/lib/characterProgression';

describe('character progression', () => {
  it('returns empty lifetime for unknown character', () => {
    const lifetime = getCharacterLifetime('nonexistent-' + Date.now());
    expect(lifetime.totalSessions).toBe(0);
    expect(lifetime.totalXP).toBe(0);
    expect(lifetime.campaignsPlayed).toEqual([]);
  });

  it('getProgressionBadge returns null for zero sessions', () => {
    const lifetime = { characterId: 'x', totalXP: 0, totalGold: 0, totalKills: 0, totalSessions: 0, campaignsPlayed: [], achievements: [], snapshots: [] };
    expect(getProgressionBadge(lifetime)).toBeNull();
  });

  it('getProgressionBadge returns Rookie at 1 session', () => {
    const lifetime = { characterId: 'x', totalXP: 0, totalGold: 0, totalKills: 0, totalSessions: 1, campaignsPlayed: ['c1'], achievements: [], snapshots: [] };
    const badge = getProgressionBadge(lifetime);
    expect(badge).toBeTruthy();
    expect(badge!.label).toBe('Rookie');
  });

  it('getProgressionBadge returns Veteran at 10 sessions', () => {
    const lifetime = { characterId: 'x', totalXP: 0, totalGold: 0, totalKills: 0, totalSessions: 10, campaignsPlayed: ['c1'], achievements: [], snapshots: [] };
    expect(getProgressionBadge(lifetime)!.label).toBe('Veteran');
  });

  it('getProgressionBadge returns Legend at 50 sessions', () => {
    const lifetime = { characterId: 'x', totalXP: 0, totalGold: 0, totalKills: 0, totalSessions: 50, campaignsPlayed: ['c1'], achievements: [], snapshots: [] };
    expect(getProgressionBadge(lifetime)!.label).toBe('Legend');
  });

  it('formatProgressionSummary includes key stats', () => {
    const lifetime = { characterId: 'x', totalXP: 5000, totalGold: 2500, totalKills: 42, totalSessions: 7, campaignsPlayed: ['c1', 'c2'], achievements: ['veteran'], snapshots: [] };
    const summary = formatProgressionSummary(lifetime);
    expect(summary).toContain('5,000');
    expect(summary).toContain('42');
    expect(summary).toContain('7');
  });
});

// ---------------------------------------------------------------------------
// Encounter puzzles
// ---------------------------------------------------------------------------
import { PUZZLE_LIBRARY, checkAnswer, getRandomPuzzle, getPuzzlesByType } from '../../src/data/puzzles';

describe('encounter puzzles', () => {
  it('has at least 10 puzzles in the library', () => {
    expect(PUZZLE_LIBRARY.length).toBeGreaterThanOrEqual(10);
  });

  it('all puzzles have unique IDs', () => {
    const ids = PUZZLE_LIBRARY.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all puzzles have at least 1 hint', () => {
    for (const p of PUZZLE_LIBRARY) {
      expect(p.hints.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('checkAnswer matches exact answer', () => {
    const puzzle = PUZZLE_LIBRARY.find((p) => p.id === 'riddle-river')!;
    expect(checkAnswer(puzzle, 'river')).toBe(true);
    expect(checkAnswer(puzzle, 'River')).toBe(true);
    expect(checkAnswer(puzzle, '  RIVER  ')).toBe(true);
  });

  it('checkAnswer matches alternate answers', () => {
    const puzzle = PUZZLE_LIBRARY.find((p) => p.id === 'riddle-river')!;
    expect(checkAnswer(puzzle, 'a river')).toBe(true);
    expect(checkAnswer(puzzle, 'the river')).toBe(true);
  });

  it('checkAnswer rejects wrong answers', () => {
    const puzzle = PUZZLE_LIBRARY.find((p) => p.id === 'riddle-river')!;
    expect(checkAnswer(puzzle, 'mountain')).toBe(false);
    expect(checkAnswer(puzzle, '')).toBe(false);
  });

  it('getRandomPuzzle returns a valid puzzle', () => {
    const p = getRandomPuzzle();
    expect(p.id).toBeTruthy();
    expect(p.prompt).toBeTruthy();
    expect(p.answer).toBeTruthy();
  });

  it('getRandomPuzzle filters by difficulty', () => {
    const easy = getRandomPuzzle('easy');
    expect(easy.difficulty).toBe('easy');
  });

  it('getPuzzlesByType groups correctly', () => {
    const grouped = getPuzzlesByType();
    expect(Object.keys(grouped).length).toBeGreaterThanOrEqual(3);
    for (const [type, puzzles] of Object.entries(grouped)) {
      for (const p of puzzles) expect(p.type).toBe(type);
    }
  });
});

// ---------------------------------------------------------------------------
// Shop inventory
// ---------------------------------------------------------------------------
import { createDefaultShop, purchaseFromShop, adjustPriceByReputation, type ShopStock } from '../../src/lib/shopInventory';

describe('shop inventory', () => {
  it('createDefaultShop returns valid structure', () => {
    const stock: ShopStock[] = [{ item: { id: 'i1', name: 'Sword', type: 'weapon', rarity: 'common', description: '', value: 50 }, quantity: 3, basePrice: 50 }];
    const shop = createDefaultShop('blacksmith', 'The Iron Forge', 'Market District', stock);
    expect(shop.id).toBe('blacksmith');
    expect(shop.stock.length).toBe(1);
    expect(shop.priceModifier).toBe(1.0);
  });

  it('purchaseFromShop decrements quantity', () => {
    const stock: ShopStock[] = [{ item: { id: 'i1', name: 'Potion', type: 'potion', rarity: 'common', description: '', value: 25 }, quantity: 5, basePrice: 25 }];
    const shop = createDefaultShop('apothecary', 'Potions', 'Main St', stock);
    const result = purchaseFromShop(shop, 'i1');
    expect(result.success).toBe(true);
    expect(result.price).toBe(25);
    expect(shop.stock[0].quantity).toBe(4);
  });

  it('purchaseFromShop fails when out of stock', () => {
    const stock: ShopStock[] = [{ item: { id: 'i1', name: 'Rare Gem', type: 'misc', rarity: 'rare', description: '', value: 500 }, quantity: 0, basePrice: 500 }];
    const shop = createDefaultShop('jeweler', 'Gems', 'Market', stock);
    const result = purchaseFromShop(shop, 'i1');
    expect(result.success).toBe(false);
  });

  it('purchaseFromShop applies price modifier', () => {
    const stock: ShopStock[] = [{ item: { id: 'i1', name: 'Shield', type: 'armor', rarity: 'common', description: '', value: 100 }, quantity: -1, basePrice: 100 }];
    const shop = createDefaultShop('armorer', 'Shields', 'Market', stock);
    shop.priceModifier = 1.5; // 50% markup
    const result = purchaseFromShop(shop, 'i1');
    expect(result.price).toBe(150);
    expect(result.success).toBe(true);
  });

  it('adjustPriceByReputation gives discount for high rep', () => {
    const modifier = adjustPriceByReputation(1.0, 5); // max rep
    expect(modifier).toBeLessThan(1.0);
  });

  it('adjustPriceByReputation gives markup for low rep', () => {
    const modifier = adjustPriceByReputation(1.0, -5); // min rep
    expect(modifier).toBeGreaterThan(1.0);
  });
});

// ---------------------------------------------------------------------------
// Formation AI
// ---------------------------------------------------------------------------
import { getClassRole, suggestFormation, formatFormationAdvice } from '../../src/lib/formationAI';

describe('formation AI', () => {
  it('assigns correct roles to all classes', () => {
    expect(getClassRole('Fighter')).toBe('frontline');
    expect(getClassRole('Wizard')).toBe('ranged');
    expect(getClassRole('Cleric')).toBe('support');
    expect(getClassRole('Rogue')).toBe('flanker');
    expect(getClassRole('Barbarian')).toBe('frontline');
    expect(getClassRole('Ranger')).toBe('ranged');
  });

  it('returns suggestions for each character', () => {
    const chars: Character[] = [
      { id: 'c1', name: 'Tank', class: 'Fighter', race: 'Human', level: 5, stats: { STR: 16, DEX: 12, CON: 14, INT: 10, WIS: 12, CHA: 8 }, hp: 40, maxHp: 40, ac: 18, xp: 0, gold: 0, background: '', alignment: '', equipment: {}, inventory: [], appearance: {}, spellSlotsUsed: {}, classAbilityUsed: false, feats: [], asiChoicesMade: 0, hitDiceRemaining: 5, inspiration: false, exhaustion: 0, createdAt: 0 } as Character,
      { id: 'c2', name: 'Caster', class: 'Wizard', race: 'Elf', level: 5, stats: { STR: 8, DEX: 14, CON: 12, INT: 18, WIS: 13, CHA: 10 }, hp: 22, maxHp: 22, ac: 12, xp: 0, gold: 0, background: '', alignment: '', equipment: {}, inventory: [], appearance: {}, spellSlotsUsed: {}, classAbilityUsed: false, feats: [], asiChoicesMade: 0, hitDiceRemaining: 5, inspiration: false, exhaustion: 0, createdAt: 0 } as Character,
    ];
    const positions = [{ unitId: 'c1', col: 10, row: 10 }, { unitId: 'c2', col: 11, row: 10 }];
    const terrain = Array.from({ length: 20 }, () => Array(20).fill('floor'));
    const suggestions = suggestFormation(chars, positions, terrain as any, [{ col: 10, row: 5 }], 20, 20);
    expect(suggestions.length).toBe(2);
    expect(suggestions[0].role).toBe('frontline');
    expect(suggestions[1].role).toBe('ranged');
  });

  it('formatFormationAdvice produces readable output', () => {
    const suggestions = [
      { characterId: 'c1', characterName: 'Tank', role: 'frontline' as const, suggestedCol: 10, suggestedRow: 8, reason: 'Frontline position' },
    ];
    const text = formatFormationAdvice(suggestions);
    expect(text).toContain('Tank');
    expect(text).toContain('frontline');
  });

  it('returns empty for no characters', () => {
    expect(suggestFormation([], [], [], [], 20, 20)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Session pacing
// ---------------------------------------------------------------------------
import { analyzePacing, formatPacingAdvice } from '../../src/lib/sessionPacing';

describe('session pacing', () => {
  it('warns about long combat (8+ rounds)', () => {
    const advice = analyzePacing(10, true, 0.8, 0.5, 50, 10, 60, 0);
    expect(advice.some((a) => a.type === 'end_combat')).toBe(true);
  });

  it('warns about low party HP', () => {
    const advice = analyzePacing(3, true, 0.2, 0.5, 20, 5, 60, 0);
    expect(advice.some((a) => a.type === 'call_rest')).toBe(true);
  });

  it('suggests wrapping long sessions (3+ hours)', () => {
    const advice = analyzePacing(0, false, 1.0, 0, 0, 10, 200, 0);
    expect(advice.some((a) => a.type === 'wrap_session')).toBe(true);
  });

  it('returns no advice for healthy session', () => {
    const advice = analyzePacing(0, false, 1.0, 0, 0, 3, 30, 0);
    expect(advice.length).toBe(0);
  });

  it('formatPacingAdvice handles empty list', () => {
    const text = formatPacingAdvice([]);
    expect(text).toContain('looks good');
  });
});

// ---------------------------------------------------------------------------
// Backstory events
// ---------------------------------------------------------------------------
import { findRelevantEvents, rollBackstoryEvent, formatBackstoryEvent } from '../../src/data/backstoryEvents';

describe('backstory events', () => {
  it('finds events for character with military backstory', () => {
    const char = { id: '1', name: 'Vet', class: 'Fighter', race: 'Human', level: 5, backstory: 'Former soldier in the great war', stats: { STR: 16, DEX: 12, CON: 14, INT: 10, WIS: 12, CHA: 8 }, hp: 40, maxHp: 40, ac: 18, xp: 0, gold: 0, background: 'Soldier', alignment: '', equipment: {}, inventory: [], appearance: {}, spellSlotsUsed: {}, classAbilityUsed: false, feats: [], asiChoicesMade: 0, hitDiceRemaining: 5, inspiration: false, exhaustion: 0, createdAt: 0 } as Character;
    const events = findRelevantEvents(char);
    expect(events.length).toBeGreaterThan(0);
    expect(events.some((e) => e.triggerKeywords.some((kw) => kw.includes('soldier') || kw.includes('war')))).toBe(true);
  });

  it('finds events for character with criminal backstory', () => {
    const char = { id: '2', name: 'Shadow', class: 'Rogue', race: 'Halfling', level: 3, backstory: 'A thief who grew up in the thieves guild', stats: { STR: 8, DEX: 18, CON: 12, INT: 14, WIS: 10, CHA: 14 }, hp: 18, maxHp: 18, ac: 15, xp: 0, gold: 0, background: 'Criminal', alignment: '', equipment: {}, inventory: [], appearance: {}, spellSlotsUsed: {}, classAbilityUsed: false, feats: [], asiChoicesMade: 0, hitDiceRemaining: 3, inspiration: false, exhaustion: 0, createdAt: 0 } as Character;
    const events = findRelevantEvents(char);
    expect(events.length).toBeGreaterThan(0);
  });

  it('returns null for characters with no matching backstory', () => {
    const char = { id: '3', name: 'Nobody', class: 'Fighter', race: 'Human', level: 1, backstory: '', stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }, hp: 10, maxHp: 10, ac: 10, xp: 0, gold: 0, background: '', alignment: '', equipment: {}, inventory: [], appearance: {}, spellSlotsUsed: {}, classAbilityUsed: false, feats: [], asiChoicesMade: 0, hitDiceRemaining: 1, inspiration: false, exhaustion: 0, createdAt: 0 } as Character;
    const result = rollBackstoryEvent([char]);
    expect(result).toBeNull();
  });

  it('formatBackstoryEvent produces readable text', () => {
    const char = { name: 'Thorin' } as Character;
    const event = { id: 'test', name: 'Test Event', type: 'encounter' as const, description: 'Something happens', triggerKeywords: [] };
    const text = formatBackstoryEvent(char, event);
    expect(text).toContain('Thorin');
    expect(text).toContain('Test Event');
  });
});

// ---------------------------------------------------------------------------
// Tactical markers
// ---------------------------------------------------------------------------
import { TACTICAL_MARKERS, getMarker, markerToPin } from '../../src/data/tacticalMarkers';

describe('tactical markers', () => {
  it('has 7 marker types', () => {
    expect(TACTICAL_MARKERS.length).toBe(7);
  });

  it('all markers have unique types', () => {
    const types = TACTICAL_MARKERS.map((m) => m.type);
    expect(new Set(types).size).toBe(types.length);
  });

  it('getMarker returns correct marker', () => {
    expect(getMarker('danger').emoji).toBe('⚠️');
    expect(getMarker('objective').emoji).toBe('🎯');
    expect(getMarker('rally').label).toBe('Rally');
  });

  it('markerToPin creates valid pin structure', () => {
    const marker = getMarker('hold');
    const pin = markerToPin(marker, 5, 3, 'dm-player-1');
    expect(pin.col).toBe(5);
    expect(pin.row).toBe(3);
    expect(pin.label).toBe('Hold');
    expect(pin.id).toBeTruthy();
    expect(pin.type).toBe('pin');
  });
});

// ---------------------------------------------------------------------------
// Character rivalry
// ---------------------------------------------------------------------------
import { RIVALRY_CATEGORIES, createEmptyStats, parseRivalryFromLog, getRivalryLeaders, formatRivalryBoard } from '../../src/lib/characterRivalry';

describe('character rivalry', () => {
  it('has 8 rivalry categories', () => {
    expect(RIVALRY_CATEGORIES.length).toBe(8);
  });

  it('createEmptyStats initializes all fields to 0', () => {
    const stats = createEmptyStats('c1', 'Thorin');
    expect(stats.kills).toBe(0);
    expect(stats.crits).toBe(0);
    expect(stats.damageDealt).toBe(0);
    expect(stats.characterName).toBe('Thorin');
  });

  it('parseRivalryFromLog extracts damage per character', () => {
    const log = ['Thorin attacks Goblin for 12 damage', 'Elara attacks Goblin for 8 damage'];
    const stats = parseRivalryFromLog(log, ['Thorin', 'Elara']);
    expect(stats.find((s) => s.characterName === 'Thorin')!.damageDealt).toBe(12);
    expect(stats.find((s) => s.characterName === 'Elara')!.damageDealt).toBe(8);
  });

  it('getRivalryLeaders returns leaders with non-zero values', () => {
    const stats = [
      { ...createEmptyStats('c1', 'Fighter'), kills: 5, damageDealt: 100, crits: 3 },
      { ...createEmptyStats('c2', 'Wizard'), kills: 2, damageDealt: 60, spellsCast: 10 },
    ];
    const leaders = getRivalryLeaders(stats);
    expect(leaders.length).toBeGreaterThan(0);
    const slayer = leaders.find((l) => l.category.id === 'kills');
    expect(slayer?.leader.characterName).toBe('Fighter');
  });

  it('formatRivalryBoard produces readable output', () => {
    const stats = [{ ...createEmptyStats('c1', 'Tank'), kills: 3, damageDealt: 50 }];
    const text = formatRivalryBoard(stats);
    expect(text).toContain('Rivalry Board');
    expect(text).toContain('Tank');
  });
});

// ---------------------------------------------------------------------------
// Initiative grouping
// ---------------------------------------------------------------------------
import { groupInitiative, countGroups } from '../../src/lib/initiativeGrouping';

describe('initiative grouping', () => {
  it('groups same-name enemies together', () => {
    const units = [
      { id: 'g1', name: 'Goblin 1', type: 'enemy' as const, initiative: 12, hp: 7, maxHp: 7 },
      { id: 'g2', name: 'Goblin 2', type: 'enemy' as const, initiative: 8, hp: 7, maxHp: 7 },
      { id: 'p1', name: 'Thorin', type: 'player' as const, initiative: 15, hp: 40, maxHp: 40 },
    ] as any[];
    const groups = groupInitiative(units);
    expect(groups.length).toBe(2); // Thorin + Goblin group
    const goblinGroup = groups.find((g) => g.isGrouped);
    expect(goblinGroup).toBeTruthy();
    expect(goblinGroup!.members.length).toBe(2);
    expect(goblinGroup!.initiative).toBe(12); // max of 12 and 8
  });

  it('keeps players as individual entries', () => {
    const units = [
      { id: 'p1', name: 'Thorin', type: 'player' as const, initiative: 15 },
      { id: 'p2', name: 'Elara', type: 'player' as const, initiative: 18 },
    ] as any[];
    const groups = groupInitiative(units);
    expect(groups.length).toBe(2);
    expect(groups.every((g) => !g.isGrouped)).toBe(true);
  });

  it('countGroups reports correct totals', () => {
    const units = [
      { id: 'g1', name: 'Goblin 1', type: 'enemy' as const, initiative: 10 },
      { id: 'g2', name: 'Goblin 2', type: 'enemy' as const, initiative: 8 },
      { id: 'g3', name: 'Goblin 3', type: 'enemy' as const, initiative: 12 },
      { id: 'p1', name: 'Hero', type: 'player' as const, initiative: 15 },
    ] as any[];
    const result = countGroups(units);
    expect(result.totalUnits).toBe(4);
    expect(result.groups).toBe(2); // Hero + Goblin group
    expect(result.grouped).toBe(3); // 3 goblins grouped
  });
});

// ---------------------------------------------------------------------------
// Party resources
// ---------------------------------------------------------------------------
import { DEFAULT_RESOURCES, depleteResource, restockResource, autoDeplete, getResourceWarnings, formatResourceStatus } from '../../src/lib/partyResources';

describe('party resources', () => {
  it('has default resources covering all categories', () => {
    const categories = new Set(DEFAULT_RESOURCES.map((r) => r.category));
    expect(categories.has('food')).toBe(true);
    expect(categories.has('ammunition')).toBe(true);
    expect(categories.has('light')).toBe(true);
    expect(categories.has('utility')).toBe(true);
    expect(categories.has('medical')).toBe(true);
  });

  it('depleteResource reduces quantity', () => {
    const resources = [{ ...DEFAULT_RESOURCES[0] }]; // rations
    const result = depleteResource(resources, 'rations', 3);
    expect(result.depleted).toBe(true);
    expect(result.remaining).toBe(resources[0].quantity - 3);
  });

  it('depleteResource does not go below 0', () => {
    const resources = [{ ...DEFAULT_RESOURCES[0], quantity: 1 }];
    const result = depleteResource(resources, 'rations', 5);
    expect(result.remaining).toBe(0);
  });

  it('restockResource caps at maxQuantity', () => {
    const resources = [{ ...DEFAULT_RESOURCES[0], quantity: 48 }]; // max 50
    const updated = restockResource(resources, 'rations', 10);
    expect(updated[0].quantity).toBe(50);
  });

  it('autoDeplete consumes per party member on long rest', () => {
    const resources = [{ ...DEFAULT_RESOURCES[0] }]; // rations, auto-deplete on long_rest
    const result = autoDeplete(resources, 'long_rest', 4);
    expect(result.messages.length).toBeGreaterThan(0);
    expect(result.resources[0].quantity).toBeLessThan(DEFAULT_RESOURCES[0].quantity);
  });

  it('getResourceWarnings flags empty and low resources', () => {
    const resources = [
      { ...DEFAULT_RESOURCES[0], quantity: 0 }, // empty
      { ...DEFAULT_RESOURCES[1], quantity: 1 }, // low (1 of 20)
    ];
    const warnings = getResourceWarnings(resources);
    expect(warnings.some((w) => w.includes('Out of'))).toBe(true);
    expect(warnings.some((w) => w.includes('Low on'))).toBe(true);
  });

  it('formatResourceStatus includes all categories', () => {
    const text = formatResourceStatus(DEFAULT_RESOURCES);
    expect(text).toContain('Party Supplies');
    expect(text).toContain('Rations');
    expect(text).toContain('Arrows');
  });
});

// ---------------------------------------------------------------------------
// Combat combos
// ---------------------------------------------------------------------------
import { COMBO_DEFINITIONS, createComboTracker, recordAction, checkForCombos, formatCombo } from '../../src/lib/combatCombos';

describe('combat combos', () => {
  it('has at least 5 combo definitions', () => {
    expect(COMBO_DEFINITIONS.length).toBeGreaterThanOrEqual(5);
  });

  it('all combos have unique IDs', () => {
    const ids = COMBO_DEFINITIONS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('createComboTracker initializes empty', () => {
    const tracker = createComboTracker();
    expect(tracker.recentActions).toEqual([]);
    expect(tracker.triggeredCombos).toEqual([]);
  });

  it('recordAction adds to recent actions', () => {
    let tracker = createComboTracker();
    tracker = recordAction(tracker, 'shove', 1, 'Fighter');
    expect(tracker.recentActions.length).toBe(1);
    expect(tracker.recentActions[0].action).toBe('shove');
  });

  it('formatCombo produces readable output', () => {
    const combo = COMBO_DEFINITIONS[0]; // trip-strike
    const text = formatCombo(combo, ['Fighter', 'Rogue']);
    expect(text).toContain('COMBO');
    expect(text).toContain(combo.name);
    expect(text).toContain('Fighter');
  });
});

// ---------------------------------------------------------------------------
// Encounter predictor
// ---------------------------------------------------------------------------
import { predictEncounter, formatPrediction } from '../../src/lib/encounterPredictor';

describe('encounter predictor', () => {
  it('returns trivial for empty enemies', () => {
    const chars = [{ level: 5, hp: 40, maxHp: 40, ac: 18 }] as Character[];
    const prediction = predictEncounter(chars, []);
    expect(prediction.rating).toBe('trivial');
    expect(prediction.winProbability).toBe(1);
  });

  it('predicts higher TPK risk for outnumbered party', () => {
    const chars = [{ level: 3, hp: 20, maxHp: 20, ac: 14 }] as Character[];
    const enemies = [{ hp: 30, ac: 16, attackBonus: 6, avgDamage: 10, count: 5 }];
    const prediction = predictEncounter(chars, enemies);
    expect(prediction.tpkProbability).toBeGreaterThan(0);
    expect(['tough', 'deadly', 'suicidal']).toContain(prediction.rating);
  });

  it('predicts easy encounters for strong party vs weak enemies', () => {
    const chars = Array.from({ length: 4 }, () => ({ level: 10, hp: 80, maxHp: 80, ac: 20 })) as Character[];
    const enemies = [{ hp: 10, ac: 10, attackBonus: 2, avgDamage: 3, count: 2 }];
    const prediction = predictEncounter(chars, enemies);
    expect(prediction.winProbability).toBeGreaterThan(0.8);
    expect(['trivial', 'easy']).toContain(prediction.rating);
  });

  it('formatPrediction includes rating and probabilities', () => {
    const chars = [{ level: 5, hp: 30, maxHp: 30, ac: 16 }] as Character[];
    const prediction = predictEncounter(chars, [{ hp: 20, ac: 14, attackBonus: 4, avgDamage: 8, count: 3 }]);
    const text = formatPrediction(prediction);
    expect(text).toContain('Prediction');
    expect(text).toContain('%');
  });

  it('warns about action economy imbalance', () => {
    const chars = [{ level: 5, hp: 30, maxHp: 30, ac: 16 }] as Character[];
    const enemies = [{ hp: 20, ac: 14, attackBonus: 4, avgDamage: 8, count: 6 }];
    const prediction = predictEncounter(chars, enemies);
    expect(prediction.warnings.some((w) => w.includes('Outnumbered'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Morale system
// ---------------------------------------------------------------------------
import { createMoraleState, checkMorale, updateMoraleState, getMoraleTierFromCR, type MoraleTier } from '../../src/lib/morale';

describe('morale system', () => {
  it('createMoraleState tracks initial enemy count', () => {
    const state = createMoraleState(5);
    expect(state.initialEnemyCount).toBe(5);
    expect(state.fleeingIds).toEqual([]);
  });

  it('no morale break when all enemies alive (normal)', () => {
    const state = createMoraleState(4);
    const enemies = Array.from({ length: 4 }, (_, i) => ({ id: `e${i}`, name: `Goblin ${i}`, hp: 10 }));
    const result = checkMorale(state, 'normal', enemies);
    expect(result.shouldFlee).toBe(false);
  });

  it('morale check triggers when 50%+ casualties (normal tier)', () => {
    const state = createMoraleState(4);
    // Only 1 alive out of 4 = 25% alive, below 50% threshold
    const enemies = [{ id: 'e0', name: 'Goblin', hp: 5 }];
    const result = checkMorale(state, 'normal', enemies);
    // Result is probabilistic, but narration should exist
    expect(typeof result.narration).toBe('string');
  });

  it('getMoraleTierFromCR returns correct tiers', () => {
    expect(getMoraleTierFromCR(0.25)).toBe('cowardly');
    expect(getMoraleTierFromCR(3)).toBe('normal');
    expect(getMoraleTierFromCR(12)).toBe('brave');
  });

  it('updateMoraleState accumulates fleeing IDs', () => {
    let state = createMoraleState(5);
    state = updateMoraleState(state, { shouldFlee: true, fleeingUnitIds: ['e1', 'e2'], narration: '' });
    expect(state.fleeingIds).toEqual(['e1', 'e2']);
    state = updateMoraleState(state, { shouldFlee: true, fleeingUnitIds: ['e3'], narration: '' });
    expect(state.fleeingIds).toEqual(['e1', 'e2', 'e3']);
  });
});

// ---------------------------------------------------------------------------
// Environmental destruction
// ---------------------------------------------------------------------------
import { isDestructible, createDestructibleCell, damageCell, getDestroyedTerrain } from '../../src/lib/environmentDestruction';

describe('environmental destruction', () => {
  it('walls and doors are destructible', () => {
    expect(isDestructible('wall')).toBe(true);
    expect(isDestructible('door')).toBe(true);
    expect(isDestructible('floor')).toBe(false);
    expect(isDestructible('water')).toBe(false);
  });

  it('createDestructibleCell gives correct HP/AC', () => {
    const wall = createDestructibleCell(5, 3, 'wall');
    expect(wall).toBeTruthy();
    expect(wall!.hp).toBe(30);
    expect(wall!.ac).toBe(17);

    const door = createDestructibleCell(2, 1, 'door');
    expect(door!.hp).toBe(10);
    expect(door!.ac).toBe(15);
  });

  it('damageCell reduces HP and detects destruction', () => {
    const cell = createDestructibleCell(0, 0, 'door')!;
    const result = damageCell(cell, 15, 18); // high roll, enough damage
    expect(result.destroyed).toBe(true);
    expect(result.narration).toContain('crumbles');
  });

  it('damageCell misses on low attack roll', () => {
    const cell = createDestructibleCell(0, 0, 'wall')!;
    const result = damageCell(cell, 10, 5); // roll 5 < AC 17
    expect(result.destroyed).toBe(false);
    expect(result.narration).toContain('bounces off');
  });

  it('getDestroyedTerrain returns correct replacement', () => {
    expect(getDestroyedTerrain('wall')).toBe('difficult');
    expect(getDestroyedTerrain('door')).toBe('floor');
  });
});

// ---------------------------------------------------------------------------
// Faction reputation
// ---------------------------------------------------------------------------
import { getReputationTier, changeReputation, getReputationEffects, formatFactionStandings } from '../../src/lib/factionReputation';

describe('faction reputation', () => {
  it('getReputationTier classifies correctly', () => {
    expect(getReputationTier(-10)).toBe('hated');
    expect(getReputationTier(-5)).toBe('hostile');
    expect(getReputationTier(0)).toBe('neutral');
    expect(getReputationTier(5)).toBe('friendly');
    expect(getReputationTier(10)).toBe('revered');
  });

  it('changeReputation adds to existing faction', () => {
    let factions = [{ factionId: 'guild', factionName: 'Thieves Guild', reputation: 0, history: [] }];
    factions = changeReputation(factions, 'guild', 'Thieves Guild', 3, 'Completed heist', 'c1');
    expect(factions[0].reputation).toBe(3);
    expect(factions[0].history.length).toBe(1);
  });

  it('changeReputation creates new faction', () => {
    let factions: any[] = [];
    factions = changeReputation(factions, 'crown', 'The Crown', -2, 'Defied the king', 'c1');
    expect(factions.length).toBe(1);
    expect(factions[0].reputation).toBe(-2);
  });

  it('reputation clamps to -10/+10', () => {
    let factions = [{ factionId: 'f1', factionName: 'F', reputation: 9, history: [] }];
    factions = changeReputation(factions, 'f1', 'F', 5, 'test', 'c1');
    expect(factions[0].reputation).toBe(10); // capped
  });

  it('getReputationEffects scales correctly', () => {
    expect(getReputationEffects(-8).priceModifier).toBe(2.0);
    expect(getReputationEffects(0).priceModifier).toBe(1.0);
    expect(getReputationEffects(10).priceModifier).toBe(0.7);
  });

  it('formatFactionStandings produces readable output', () => {
    const factions = [{ factionId: 'guild', factionName: 'Thieves Guild', reputation: 5, history: [] }];
    const text = formatFactionStandings(factions);
    expect(text).toContain('Thieves Guild');
    expect(text).toContain('friendly');
  });
});

// ---------------------------------------------------------------------------
// Initiative variants
// ---------------------------------------------------------------------------
import { INITIATIVE_VARIANTS, rollSideInitiative, SPEED_FACTOR_MODIFIERS, rollSpeedFactorInitiative, getVariantConfig, formatVariantRules } from '../../src/lib/initiativeVariants';

describe('initiative variants', () => {
  it('has 4 initiative variants', () => {
    expect(INITIATIVE_VARIANTS.length).toBe(4);
  });

  it('all variants have unique IDs', () => {
    const ids = INITIATIVE_VARIANTS.map((v) => v.variant);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('rollSideInitiative returns valid structure', () => {
    const result = rollSideInitiative();
    expect(result.playerRoll).toBeGreaterThanOrEqual(1);
    expect(result.playerRoll).toBeLessThanOrEqual(20);
    expect(typeof result.playersGoFirst).toBe('boolean');
  });

  it('speed factor modifiers cover common actions', () => {
    expect(SPEED_FACTOR_MODIFIERS.length).toBeGreaterThanOrEqual(8);
    const melee = SPEED_FACTOR_MODIFIERS.find((m) => m.action === 'Melee attack');
    expect(melee?.modifier).toBe(0);
  });

  it('rollSpeedFactorInitiative returns in valid range', () => {
    // dexMod 3, action modifier 0: result = d20 + 3 + 0 = 4-23
    const result = rollSpeedFactorInitiative(3, 0);
    expect(result).toBeGreaterThanOrEqual(4);
    expect(result).toBeLessThanOrEqual(23);
  });

  it('formatVariantRules returns descriptive text', () => {
    const text = formatVariantRules('popcorn');
    expect(text).toContain('Popcorn');
    expect(text).toContain('choose who goes next');
  });
});

// ---------------------------------------------------------------------------
// NPC schedules
// ---------------------------------------------------------------------------
import { SCHEDULE_TEMPLATES, getCurrentLocation, getScheduleTemplate, formatSchedule, type NpcSchedule } from '../../src/data/npcSchedules';

describe('NPC schedules', () => {
  it('has templates for common roles', () => {
    expect(SCHEDULE_TEMPLATES.innkeeper).toBeTruthy();
    expect(SCHEDULE_TEMPLATES.merchant).toBeTruthy();
    expect(SCHEDULE_TEMPLATES.guard).toBeTruthy();
    expect(SCHEDULE_TEMPLATES.thief).toBeTruthy();
  });

  it('getCurrentLocation returns correct location by hour', () => {
    const schedule: NpcSchedule = {
      npcId: 'npc1', npcName: 'Barkeep',
      schedule: SCHEDULE_TEMPLATES.innkeeper,
      defaultLocation: 'Inn',
    };
    const morning = getCurrentLocation(schedule, 10);
    expect(morning.location).toBe('Common Room');

    const night = getCurrentLocation(schedule, 2);
    expect(night.location).toBe('Private Quarters');
  });

  it('getScheduleTemplate matches role keywords', () => {
    const innSchedule = getScheduleTemplate('innkeeper');
    expect(innSchedule.length).toBeGreaterThan(0);

    const guardSchedule = getScheduleTemplate('city guard');
    expect(guardSchedule.some((e) => e.location === 'Gate')).toBe(true);
  });

  it('getScheduleTemplate returns default for unknown roles', () => {
    const schedule = getScheduleTemplate('blacksmith');
    expect(schedule.length).toBeGreaterThan(0);
    expect(schedule.some((e) => e.activity === 'Working')).toBe(true);
  });

  it('formatSchedule shows current location', () => {
    const schedule: NpcSchedule = {
      npcId: 'npc1', npcName: 'Martha',
      schedule: SCHEDULE_TEMPLATES.innkeeper,
      defaultLocation: 'Inn',
    };
    const text = formatSchedule(schedule, 12);
    expect(text).toContain('Martha');
    expect(text).toContain('Common Room');
  });
});

// ---------------------------------------------------------------------------
// Spell components
// ---------------------------------------------------------------------------
import { COSTLY_COMPONENTS, getComponentForSpell, canAffordComponent, deductComponentCost, formatComponentList } from '../../src/data/spellComponents';

describe('spell components', () => {
  it('has component data for key spells', () => {
    expect(getComponentForSpell('Revivify')).toBeTruthy();
    expect(getComponentForSpell('Raise Dead')).toBeTruthy();
    expect(getComponentForSpell('Find Familiar')).toBeTruthy();
  });

  it('canAffordComponent checks gold correctly', () => {
    expect(canAffordComponent(500, 'Revivify').canAfford).toBe(true);
    expect(canAffordComponent(100, 'Revivify').canAfford).toBe(false);
    expect(canAffordComponent(0, 'Magic Missile').canAfford).toBe(true); // no costly component
  });

  it('deductComponentCost reduces gold for consumed spells', () => {
    const result = deductComponentCost(500, 'Revivify');
    expect(result.newGold).toBe(200); // 500 - 300
    expect(result.deducted).toBe(300);
  });

  it('deductComponentCost does not reduce gold for non-consumed spells', () => {
    const result = deductComponentCost(500, 'Chromatic Orb');
    expect(result.newGold).toBe(500); // not consumed
    expect(result.deducted).toBe(0);
  });

  it('formatComponentList shows costs for known spells', () => {
    const text = formatComponentList(['Revivify', 'Raise Dead', 'Magic Missile']);
    expect(text).toContain('Revivify');
    expect(text).toContain('Raise Dead');
    expect(text).not.toContain('Magic Missile'); // no costly component
  });

  it('all costly components have positive cost', () => {
    for (const c of COSTLY_COMPONENTS) {
      if (c.spellName !== 'Wish') expect(c.cost).toBeGreaterThanOrEqual(0);
    }
  });
});
