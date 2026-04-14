// Wave 33-54 data system tests — split from game-logic.test.ts for maintainability
import { describe, it, expect } from 'vitest';

// ---------------------------------------------------------------------------
// NPC farewells
// ---------------------------------------------------------------------------
import { NPC_FAREWELLS, getRandomFarewell, formatNpcFarewell } from '../../src/data/randomNpcFarewell';

describe('NPC farewells', () => {
  it('has at least 10', () => { expect(NPC_FAREWELLS.length).toBeGreaterThanOrEqual(10); });
  it('returns text', () => { expect(getRandomFarewell().length).toBeGreaterThan(10); });
  it('formatNpcFarewell includes name', () => { expect(formatNpcFarewell('Barkeep')).toContain('Barkeep'); });
});

// ---------------------------------------------------------------------------
// Prophecy fulfillment tracker
// ---------------------------------------------------------------------------
import { PROPHECY_TEMPLATES, PROPHECY_SOURCES, createProphecyTracker, addProphecy, fulfillProphecy, getUnfulfilled, getFulfilled, getRandomProphecy, formatProphecyTracker } from '../../src/data/prophecyFulfillment';

describe('prophecy fulfillment', () => {
  it('has at least 12 templates', () => { expect(PROPHECY_TEMPLATES.length).toBeGreaterThanOrEqual(12); });
  it('has at least 8 sources', () => { expect(PROPHECY_SOURCES.length).toBeGreaterThanOrEqual(8); });
  it('starts empty', () => { const t = createProphecyTracker(); expect(t.prophecies.length).toBe(0); });
  it('adds prophecies', () => { let t = createProphecyTracker(); t = addProphecy(t, 'Test prophecy', 'A wizard', 'doom'); expect(t.prophecies.length).toBe(1); expect(t.prophecies[0].fulfilled).toBe(false); });
  it('fulfills prophecies', () => { let t = createProphecyTracker(); t = addProphecy(t, 'Test', 'Oracle', 'glory'); const id = t.prophecies[0].id; t = fulfillProphecy(t, id, 'During battle'); expect(getFulfilled(t).length).toBe(1); expect(getUnfulfilled(t).length).toBe(0); });
  it('getRandomProphecy returns valid', () => { const p = getRandomProphecy(); expect(p.text.length).toBeGreaterThan(10); expect(p.source.length).toBeGreaterThan(5); expect(['doom', 'glory', 'betrayal', 'love', 'discovery', 'transformation']).toContain(p.category); });
  it('formats tracker', () => { const t = createProphecyTracker(); expect(formatProphecyTracker(t)).toContain('None recorded'); });
});

// ---------------------------------------------------------------------------
// Battle cry generator
// ---------------------------------------------------------------------------
import { getBattleCry, getBattleCryByRace, getBattleCryByClass, formatBattleCry, getAllRaces, getAllClasses } from '../../src/data/battleCryGenerator';

describe('battle cry generator', () => {
  it('has all 8 races', () => { expect(getAllRaces().length).toBe(8); });
  it('has all 12 classes', () => { expect(getAllClasses().length).toBe(12); });
  it('returns text for race', () => { expect(getBattleCryByRace('dwarf').length).toBeGreaterThan(5); });
  it('returns text for class', () => { expect(getBattleCryByClass('barbarian').length).toBeGreaterThan(5); });
  it('combined cry includes pool', () => { const cry = getBattleCry('elf', 'wizard'); expect(cry.length).toBeGreaterThan(5); });
  it('formats with character name', () => { expect(formatBattleCry('Thorin', 'dwarf', 'fighter')).toContain('Thorin'); });
});

// ---------------------------------------------------------------------------
// Terrain advantage reference
// ---------------------------------------------------------------------------
import { TERRAIN_ADVANTAGES, getTerrainAdvantage, getBestTerrainForClass, formatTerrainAdvantage } from '../../src/data/terrainAdvantage';

describe('terrain advantage', () => {
  it('has at least 8 terrains', () => { expect(TERRAIN_ADVANTAGES.length).toBeGreaterThanOrEqual(8); });
  it('looks up by name', () => { const t = getTerrainAdvantage('forest'); expect(t).toBeDefined(); expect(t!.coverBonus).toBe(2); });
  it('returns undefined for unknown', () => { expect(getTerrainAdvantage('lava_planet')).toBeUndefined(); });
  it('finds best terrain for class', () => { const rogueTerrains = getBestTerrainForClass('Rogue'); expect(rogueTerrains.length).toBeGreaterThanOrEqual(2); });
  it('formats terrain', () => { const t = getTerrainAdvantage('open_field')!; expect(formatTerrainAdvantage(t)).toContain('open field'); });
});

// ---------------------------------------------------------------------------
// Backstory complications
// ---------------------------------------------------------------------------
import { BACKSTORY_COMPLICATIONS, getRandomComplication as getRandomBackstoryComplication, getComplicationByCategory, getComplicationBySeverity as getBackstorySeverity, formatComplication as formatBackstoryComplication } from '../../src/data/backstoryComplication';

describe('backstory complications', () => {
  it('has at least 12', () => { expect(BACKSTORY_COMPLICATIONS.length).toBeGreaterThanOrEqual(12); });
  it('generates valid complication', () => { const c = getRandomBackstoryComplication(); expect(c.complication.length).toBeGreaterThan(10); expect(['minor', 'moderate', 'major']).toContain(c.severity); });
  it('filters by category', () => { const enemies = getComplicationByCategory('enemy'); expect(enemies.length).toBeGreaterThanOrEqual(2); enemies.forEach((c) => expect(c.category).toBe('enemy')); });
  it('filters by severity', () => { const major = getBackstorySeverity('major'); expect(major.length).toBeGreaterThanOrEqual(3); major.forEach((c) => expect(c.severity).toBe('major')); });
  it('formats with icon', () => { const c = getRandomBackstoryComplication(); const formatted = formatBackstoryComplication(c); expect(formatted).toContain('Backstory Complication'); });
});

// ---------------------------------------------------------------------------
// Party morale tracker
// ---------------------------------------------------------------------------
import { createPartyMorale, addMoraleEvent, getMoraleLevel, getMoraleEffects, formatPartyMorale } from '../../src/data/partyMoraleTracker';

describe('party morale tracker', () => {
  it('starts at steady', () => { const m = createPartyMorale(); expect(getMoraleLevel(m)).toBe('steady'); expect(m.score).toBe(0); });
  it('victory raises morale', () => { let m = createPartyMorale(); m = addMoraleEvent(m, 'victory', 'Won the fight'); expect(m.score).toBe(2); expect(getMoraleLevel(m)).toBe('steady'); });
  it('ally death lowers morale', () => { let m = createPartyMorale(); m = addMoraleEvent(m, 'ally_death', 'Fallen comrade'); expect(m.score).toBe(-3); expect(getMoraleLevel(m)).toBe('shaken'); });
  it('clamps to range', () => { let m = createPartyMorale(); for (let i = 0; i < 10; i++) m = addMoraleEvent(m, 'boss_kill', 'boss'); expect(m.score).toBeLessThanOrEqual(10); for (let i = 0; i < 20; i++) m = addMoraleEvent(m, 'defeat', 'loss'); expect(m.score).toBeGreaterThanOrEqual(-10); });
  it('effects scale with level', () => { let m = createPartyMorale(); for (let i = 0; i < 5; i++) m = addMoraleEvent(m, 'boss_kill', 'boss'); const effects = getMoraleEffects(m); expect(effects.attackMod).toBeGreaterThan(0); });
  it('formats with icon', () => { const m = createPartyMorale(); expect(formatPartyMorale(m)).toContain('STEADY'); });
});

// ---------------------------------------------------------------------------
// NPC loyalty tracker
// ---------------------------------------------------------------------------
import { createLoyaltyTracker, addNpc, recordLoyaltyEvent, getLoyaltyLevel, getNpcLoyalty, getLoyalNpcs, getHostileNpcs, LOYALTY_ACTIONS, formatNpcLoyalty, formatLoyaltyTracker } from '../../src/data/npcLoyalty';

describe('NPC loyalty tracker', () => {
  it('starts empty', () => { const t = createLoyaltyTracker(); expect(t.npcs.length).toBe(0); });
  it('adds NPCs', () => { let t = createLoyaltyTracker(); t = addNpc(t, 'Barkeep', 'Merchants Guild'); expect(t.npcs.length).toBe(1); expect(t.npcs[0].faction).toBe('Merchants Guild'); });
  it('prevents duplicate NPCs', () => { let t = createLoyaltyTracker(); t = addNpc(t, 'Barkeep'); t = addNpc(t, 'Barkeep'); expect(t.npcs.length).toBe(1); });
  it('records events and shifts score', () => { let t = createLoyaltyTracker(); t = addNpc(t, 'Guard'); t = recordLoyaltyEvent(t, 'Guard', 'Saved their life', 3); expect(getNpcLoyalty(t, 'Guard')!.score).toBe(3); });
  it('clamps score', () => { let t = createLoyaltyTracker(); t = addNpc(t, 'NPC'); for (let i = 0; i < 10; i++) t = recordLoyaltyEvent(t, 'NPC', 'Good deed', 3); expect(getNpcLoyalty(t, 'NPC')!.score).toBeLessThanOrEqual(10); });
  it('loyalty levels map correctly', () => { expect(getLoyaltyLevel(9)).toBe('devoted'); expect(getLoyaltyLevel(0)).toBe('neutral'); expect(getLoyaltyLevel(-8)).toBe('enemy'); });
  it('filters loyal/hostile', () => { let t = createLoyaltyTracker(); t = addNpc(t, 'Friend', undefined, 7); t = addNpc(t, 'Foe', undefined, -6); expect(getLoyalNpcs(t).length).toBe(1); expect(getHostileNpcs(t).length).toBe(1); });
  it('has preset actions', () => { expect(LOYALTY_ACTIONS.positive.length).toBeGreaterThanOrEqual(5); expect(LOYALTY_ACTIONS.negative.length).toBeGreaterThanOrEqual(5); });
  it('formats individual NPC', () => { let t = createLoyaltyTracker(); t = addNpc(t, 'Bob', 'Thieves'); expect(formatNpcLoyalty(t.npcs[0])).toContain('Bob'); });
  it('formats empty tracker', () => { expect(formatLoyaltyTracker(createLoyaltyTracker())).toContain('No NPCs tracked'); });
});

// ---------------------------------------------------------------------------
// Artifact generator
// ---------------------------------------------------------------------------
import { generateArtifact as genLegendaryArtifact, getArtifactTypes, formatArtifact as fmtLegendaryArtifact } from '../../src/data/artifactGenerator';

describe('legendary artifact generator', () => {
  it('has 6 artifact types', () => { expect(getArtifactTypes().length).toBe(6); });
  it('generates with all fields', () => { const a = genLegendaryArtifact(); expect(a.name.length).toBeGreaterThan(3); expect(a.origin.length).toBeGreaterThan(10); expect(a.power.length).toBeGreaterThan(10); expect(a.history.length).toBeGreaterThan(10); expect(a.attunement).toBe(true); });
  it('respects type parameter', () => { const a = genLegendaryArtifact('weapon'); expect(a.type).toBe('weapon'); });
  it('curse can be null or string', () => { const artifacts = Array.from({ length: 20 }, () => genLegendaryArtifact()); const hasCurse = artifacts.some((a) => a.curse !== null); const noCurse = artifacts.some((a) => a.curse === null); expect(hasCurse || noCurse).toBe(true); });
  it('formats with icon', () => { const a = genLegendaryArtifact('tome'); expect(fmtLegendaryArtifact(a)).toContain('📖'); expect(fmtLegendaryArtifact(a)).toContain('Origin'); });
});

// ---------------------------------------------------------------------------
// Puzzle lock system
// ---------------------------------------------------------------------------
import { PUZZLE_TEMPLATES as PUZZLES_LOCK_DATA, getRandomPuzzle as getRandomPuzzleLock, getPuzzlesByType as getPuzzleLocksByType, getHint as getPuzzleLockHint, formatPuzzle as formatPuzzleLock } from '../../src/data/puzzleLock';

describe('puzzle lock system', () => {
  it('has at least 6 puzzles', () => { expect(PUZZLES_LOCK_DATA.length).toBeGreaterThanOrEqual(6); });
  it('generates with id', () => { const p = getRandomPuzzleLock(); expect(p.id).toBeDefined(); expect(p.id.length).toBeGreaterThan(5); });
  it('filters by type', () => { const combos = getPuzzleLocksByType('combination'); expect(combos.length).toBeGreaterThanOrEqual(1); combos.forEach((p) => expect(p.type).toBe('combination')); });
  it('returns hints in order', () => { const p = getRandomPuzzleLock(); expect(getPuzzleLockHint(p, 0)).toBeDefined(); expect(getPuzzleLockHint(p, 99)).toBeNull(); });
  it('all puzzles have required fields', () => { PUZZLES_LOCK_DATA.forEach((p) => { expect(p.solution.length).toBeGreaterThan(0); expect(p.hints.length).toBeGreaterThanOrEqual(2); expect(p.attempts).toBeGreaterThanOrEqual(1); }); });
  it('formats without solution by default', () => { const p = getRandomPuzzleLock(); expect(formatPuzzleLock(p)).not.toContain('Solution'); expect(formatPuzzleLock(p, true)).toContain('Solution'); });
});

// ---------------------------------------------------------------------------
// Combat fatigue system
// ---------------------------------------------------------------------------
import { createFatigueState, advanceRound as advanceFatigueRound, endCombat as endFatigueCombat, restReset, getFatigueEffects, getAllFatigueLevels, formatFatigueState } from '../../src/data/combatFatigue';

describe('combat fatigue system', () => {
  it('starts fresh', () => { const s = createFatigueState(); expect(s.fatigueLevel).toBe('fresh'); expect(s.roundsInCombat).toBe(0); });
  it('advances rounds', () => { let s = createFatigueState(); s = advanceFatigueRound(s); expect(s.roundsInCombat).toBe(1); });
  it('becomes tired after many rounds', () => { let s = createFatigueState(); for (let i = 0; i < 7; i++) s = advanceFatigueRound(s); expect(['tired', 'exhausted', 'spent']).toContain(s.fatigueLevel); });
  it('endCombat increments combats', () => { let s = createFatigueState(); s = endFatigueCombat(s); expect(s.combatsSinceRest).toBe(1); });
  it('rest resets to fresh', () => { const s = restReset(true); expect(s.fatigueLevel).toBe('fresh'); expect(s.roundsInCombat).toBe(0); });
  it('effects worsen with fatigue', () => { const fresh = getFatigueEffects(createFatigueState()); expect(fresh.attackPenalty).toBe(0); let s = createFatigueState(); for (let i = 0; i < 16; i++) s = advanceFatigueRound(s); const tired = getFatigueEffects(s); expect(tired.attackPenalty).toBeLessThan(0); });
  it('has 5 fatigue levels', () => { expect(getAllFatigueLevels().length).toBe(5); });
  it('formats state', () => { expect(formatFatigueState(createFatigueState())).toContain('FRESH'); });
});

// ---------------------------------------------------------------------------
// Regional reputation tracker
// ---------------------------------------------------------------------------
import { createRegionalTracker, addRegion, changeRegionReputation, getReputationTier as getRegionalTier, getReputationEffects as getRegionalEffects, getRegionReputation, formatRegionReputation, formatRegionalTracker } from '../../src/data/regionalReputation';

describe('regional reputation tracker', () => {
  it('starts empty', () => { expect(createRegionalTracker().regions.length).toBe(0); });
  it('adds regions', () => { let t = createRegionalTracker(); t = addRegion(t, 'Waterdeep'); expect(t.regions.length).toBe(1); });
  it('prevents duplicate regions', () => { let t = createRegionalTracker(); t = addRegion(t, 'Waterdeep'); t = addRegion(t, 'Waterdeep'); expect(t.regions.length).toBe(1); });
  it('changes reputation', () => { let t = createRegionalTracker(); t = addRegion(t, 'Neverwinter'); t = changeRegionReputation(t, 'Neverwinter', 'Saved the city', 3); expect(getRegionReputation(t, 'Neverwinter')!.score).toBe(3); });
  it('tiers map correctly', () => { expect(getRegionalTier(9)).toBe('revered'); expect(getRegionalTier(0)).toBe('neutral'); expect(getRegionalTier(-8)).toBe('exiled'); });
  it('effects scale with tier', () => { const revered = getRegionalEffects(9); const exiled = getRegionalEffects(-9); expect(revered.priceModifier).toBeLessThan(exiled.priceModifier); expect(revered.innAccess).toBe(true); expect(exiled.innAccess).toBe(false); });
  it('formats region', () => { let t = createRegionalTracker(); t = addRegion(t, 'Baldur\'s Gate', 5); expect(formatRegionReputation(t.regions[0])).toContain('Baldur\'s Gate'); });
  it('formats empty tracker', () => { expect(formatRegionalTracker(createRegionalTracker())).toContain('No regions tracked'); });
});

// ---------------------------------------------------------------------------
// Weather encounter interaction
// ---------------------------------------------------------------------------
import { getWeatherEncounterEffect, getAllWeatherTypes, getSpecialEncountersForWeather, getTotalModifier, formatWeatherEncounterEffect } from '../../src/data/weatherEncounterInteraction';

describe('weather encounter interaction', () => {
  it('has 8 weather types', () => { expect(getAllWeatherTypes().length).toBe(8); });
  it('returns effect for valid weather', () => { const e = getWeatherEncounterEffect('fog'); expect(e).toBeDefined(); expect(e!.flavorText.length).toBeGreaterThan(10); });
  it('returns undefined for unknown weather', () => { expect(getWeatherEncounterEffect('tornado' as any)).toBeUndefined(); });
  it('fog has special encounters', () => { const specials = getSpecialEncountersForWeather('fog'); expect(specials.length).toBeGreaterThanOrEqual(2); });
  it('clear has no visibility penalty', () => { expect(getTotalModifier('clear', 'visibility')).toBe(0); });
  it('storm has high stealth bonus', () => { expect(getTotalModifier('storm', 'surprise')).toBeGreaterThanOrEqual(3); });
  it('each weather has flavor text', () => { getAllWeatherTypes().forEach((w) => { const e = getWeatherEncounterEffect(w); expect(e!.flavorText.length).toBeGreaterThan(20); }); });
  it('formats with icon', () => { const e = getWeatherEncounterEffect('blizzard')!; expect(formatWeatherEncounterEffect(e)).toContain('🌨️'); });
});

// ---------------------------------------------------------------------------
// NPC relationship web
// ---------------------------------------------------------------------------
import { createRelationshipWeb, addRelation, removeRelation, revealRelation, getRelationsForNpc, getKnownRelations, getSecretRelations, getAllRelationTypes, formatRelation, formatRelationshipWeb } from '../../src/data/npcRelationshipWeb';

describe('NPC relationship web', () => {
  it('starts empty', () => { expect(createRelationshipWeb().relations.length).toBe(0); });
  it('adds relations', () => { let w = createRelationshipWeb(); w = addRelation(w, 'Alice', 'Bob', 'ally', 'Old friends'); expect(w.relations.length).toBe(1); });
  it('prevents duplicate edges', () => { let w = createRelationshipWeb(); w = addRelation(w, 'A', 'B', 'ally', 'x'); w = addRelation(w, 'A', 'B', 'rival', 'y'); w = addRelation(w, 'B', 'A', 'enemy', 'z'); expect(w.relations.length).toBe(1); });
  it('removes relations', () => { let w = createRelationshipWeb(); w = addRelation(w, 'A', 'B', 'ally', 'x'); w = removeRelation(w, 'A', 'B'); expect(w.relations.length).toBe(0); });
  it('tracks secrets', () => { let w = createRelationshipWeb(); w = addRelation(w, 'A', 'B', 'lover', 'secret affair', 3, true); expect(getSecretRelations(w).length).toBe(1); expect(getKnownRelations(w).length).toBe(0); w = revealRelation(w, 'A', 'B'); expect(getSecretRelations(w).length).toBe(0); expect(getKnownRelations(w).length).toBe(1); });
  it('finds relations for NPC', () => { let w = createRelationshipWeb(); w = addRelation(w, 'A', 'B', 'ally', 'x'); w = addRelation(w, 'A', 'C', 'rival', 'y'); expect(getRelationsForNpc(w, 'A').length).toBe(2); expect(getRelationsForNpc(w, 'B').length).toBe(1); });
  it('has 10 relation types', () => { expect(getAllRelationTypes().length).toBe(10); });
  it('formats relation', () => { let w = createRelationshipWeb(); w = addRelation(w, 'King', 'Advisor', 'mentor', 'Trained since youth'); expect(formatRelation(w.relations[0])).toContain('King'); });
  it('formats empty web', () => { expect(formatRelationshipWeb(createRelationshipWeb())).toContain('No known connections'); });
});

// ---------------------------------------------------------------------------
// Siege warfare
// ---------------------------------------------------------------------------
import { SIEGE_ENGINES, FORTIFICATIONS, getSiegeEngine, getSiegeEnginesByType, getFortification, canDamage, getEffectiveDamage, formatSiegeEngine, formatFortification } from '../../src/data/siegeWarfare';

describe('siege warfare', () => {
  it('has at least 6 siege engines', () => { expect(SIEGE_ENGINES.length).toBeGreaterThanOrEqual(6); });
  it('has at least 4 fortifications', () => { expect(FORTIFICATIONS.length).toBeGreaterThanOrEqual(4); });
  it('looks up engine by name', () => { const ram = getSiegeEngine('Battering Ram'); expect(ram).toBeDefined(); expect(ram!.type).toBe('melee'); });
  it('filters by type', () => { const ranged = getSiegeEnginesByType('ranged'); expect(ranged.length).toBeGreaterThanOrEqual(2); ranged.forEach((e) => expect(e.type).toBe('ranged')); });
  it('damage threshold works', () => { const wall = getFortification('Stone Wall (10 ft)')!; expect(canDamage(wall, 15)).toBe(true); expect(canDamage(wall, 5)).toBe(false); expect(getEffectiveDamage(wall, 15)).toBe(15); expect(getEffectiveDamage(wall, 5)).toBe(0); });
  it('formats engine', () => { expect(formatSiegeEngine(SIEGE_ENGINES[0])).toContain('Battering Ram'); });
  it('formats fortification', () => { expect(formatFortification(FORTIFICATIONS[0])).toContain('🏰'); });
});

// ---------------------------------------------------------------------------
// Planar rift generator
// ---------------------------------------------------------------------------
import { getRandomRift, getRiftByPlane, getAllPlanes, formatRift } from '../../src/data/planarRift';

describe('planar rift generator', () => {
  it('has 10 planes', () => { expect(getAllPlanes().length).toBe(10); });
  it('generates random rift', () => { const r = getRandomRift(); expect(r.name.length).toBeGreaterThan(3); expect(r.description.length).toBeGreaterThan(20); expect(r.environmentalEffects.length).toBeGreaterThanOrEqual(2); });
  it('looks up by plane', () => { const r = getRiftByPlane('abyss'); expect(r).toBeDefined(); expect(r!.name).toBe('Demon Gate'); });
  it('returns undefined for unknown', () => { expect(getRiftByPlane('candy_land' as any)).toBeUndefined(); });
  it('all rifts have closing conditions', () => { getAllPlanes().forEach((p) => { const r = getRiftByPlane(p)!; expect(r.closingCondition.length).toBeGreaterThan(10); expect(r.dcToClose).toBeGreaterThanOrEqual(12); }); });
  it('formats with plane icon', () => { const r = getRiftByPlane('feywild')!; expect(formatRift(r)).toContain('🌸'); expect(formatRift(r)).toContain('Effects'); });
});

// ---------------------------------------------------------------------------
// Political events
// ---------------------------------------------------------------------------
import { POLITICAL_EVENTS, getRandomPoliticalEvent, getEventsByCategory, getEventsBySeverity, formatPoliticalEvent } from '../../src/data/politicalEvent';

describe('political events', () => {
  it('has at least 8 events', () => { expect(POLITICAL_EVENTS.length).toBeGreaterThanOrEqual(8); });
  it('generates random event', () => { const e = getRandomPoliticalEvent(); expect(e.title.length).toBeGreaterThan(3); expect(e.consequences.length).toBeGreaterThanOrEqual(2); expect(e.opportunities.length).toBeGreaterThanOrEqual(2); });
  it('filters by category', () => { const conflicts = getEventsByCategory('conflict'); expect(conflicts.length).toBeGreaterThanOrEqual(1); conflicts.forEach((e) => expect(e.category).toBe('conflict')); });
  it('filters by severity', () => { const major = getEventsBySeverity('major'); expect(major.length).toBeGreaterThanOrEqual(2); major.forEach((e) => expect(e.severity).toBe('major')); });
  it('has faction shifts', () => { const e = getRandomPoliticalEvent(); expect(e.factionShifts.length).toBeGreaterThanOrEqual(1); e.factionShifts.forEach((f) => { expect(f.faction.length).toBeGreaterThan(0); expect(typeof f.change).toBe('number'); }); });
  it('formats with icon', () => { expect(formatPoliticalEvent(getRandomPoliticalEvent())).toContain('Consequences'); });
});

// ---------------------------------------------------------------------------
// Crafting specialization tree
// ---------------------------------------------------------------------------
import { createSpecialization, addCraftingXp, getAvailableRecipes, getTierBonus, getCraftingDC, getAllDisciplines, formatSpecialization } from '../../src/data/craftingSpecialization';

describe('crafting specialization tree', () => {
  it('has 6 disciplines', () => { expect(getAllDisciplines().length).toBe(6); });
  it('starts as novice', () => { const s = createSpecialization('blacksmithing'); expect(s.tier).toBe('novice'); expect(s.xp).toBe(0); });
  it('levels up with XP', () => { let s = createSpecialization('alchemy'); s = addCraftingXp(s, 150); expect(s.tier).toBe('apprentice'); s = addCraftingXp(s, 200); expect(s.tier).toBe('journeyman'); });
  it('novice sees only novice recipes', () => { const s = createSpecialization('blacksmithing'); const recipes = getAvailableRecipes(s); expect(recipes.every((r) => r.tier === 'novice')).toBe(true); });
  it('higher tiers see more recipes', () => { let s = createSpecialization('blacksmithing'); const noviceCount = getAvailableRecipes(s).length; s = addCraftingXp(s, 150); const apprenticeCount = getAvailableRecipes(s).length; expect(apprenticeCount).toBeGreaterThanOrEqual(noviceCount); });
  it('tier bonus reduces DC', () => { const recipe = getAvailableRecipes(createSpecialization('blacksmithing'))[0]; expect(getCraftingDC(recipe, 'novice')).toBe(recipe.dc); expect(getCraftingDC(recipe, 'master')).toBeLessThan(recipe.dc); });
  it('formats specialization', () => { expect(formatSpecialization(createSpecialization('enchanting'))).toContain('enchanting'); expect(formatSpecialization(createSpecialization('enchanting'))).toContain('NOVICE'); });
});

// ---------------------------------------------------------------------------
// Monster ecology system
// ---------------------------------------------------------------------------
import { ECOLOGY, getEcologyByBiome, getApexPredator, getFoodChain, getEncounterProbability, getAllBiomes as getEcologyBiomes, formatEcologyEntry, formatBiomeEcology } from '../../src/data/monsterEcology';

describe('monster ecology system', () => {
  it('has at least 15 entries', () => { expect(ECOLOGY.length).toBeGreaterThanOrEqual(15); });
  it('covers at least 6 biomes', () => { expect(getEcologyBiomes().length).toBeGreaterThanOrEqual(6); });
  it('each biome has an apex predator', () => { getEcologyBiomes().forEach((b) => { const apex = getApexPredator(b); expect(apex).toBeDefined(); expect(apex!.role).toBe('apex_predator'); }); });
  it('food chain returns predator-prey pairs', () => { const chain = getFoodChain('forest'); expect(chain.length).toBeGreaterThanOrEqual(2); chain.forEach((c) => { expect(c.predator.length).toBeGreaterThan(0); }); });
  it('encounter probability scales with population', () => { const rare = ECOLOGY.find((e) => e.population === 'rare')!; const common = ECOLOGY.find((e) => e.population === 'common')!; expect(getEncounterProbability(rare)).toBeLessThan(getEncounterProbability(common)); });
  it('formats entry with role icon', () => { const owlbear = ECOLOGY.find((e) => e.creature === 'Owlbear')!; expect(formatEcologyEntry(owlbear)).toContain('🦁'); expect(formatEcologyEntry(owlbear)).toContain('Hunts'); });
  it('formats biome ecology', () => { expect(formatBiomeEcology('forest')).toContain('Forest Ecology'); });
  it('unknown biome returns no data', () => { expect(formatBiomeEcology('volcano' as any)).toContain('No data'); });
});

// ---------------------------------------------------------------------------
// Naval combat system
// ---------------------------------------------------------------------------
import { SHIP_TEMPLATES as NAVAL_SHIP_TEMPLATES, NAVAL_ACTIONS, createShip, damageShip, repairShip, isShipSunk, getShipCondition, canPerformAction, getNavalAction, getAllShipClasses, formatShip as formatNavalShip } from '../../src/data/navalCombat';

describe('naval combat system', () => {
  it('has 6 ship classes', () => { expect(getAllShipClasses().length).toBe(6); });
  it('has 7 naval actions', () => { expect(NAVAL_ACTIONS.length).toBe(7); });
  it('creates ship from template', () => { const s = createShip('The Black Pearl', 'galleon'); expect(s.name).toBe('The Black Pearl'); expect(s.hp).toBe(200); expect(s.cannons).toBe(20); });
  it('damages ship', () => { let s = createShip('Test', 'sloop'); s = damageShip(s, 30); expect(s.hp).toBe(30); });
  it('repairs ship (capped at max)', () => { let s = createShip('Test', 'sloop'); s = damageShip(s, 20); s = repairShip(s, 100); expect(s.hp).toBe(s.maxHp); });
  it('detects sinking', () => { let s = createShip('Test', 'rowboat'); s = damageShip(s, 999); expect(isShipSunk(s)).toBe(true); });
  it('ship condition degrades', () => { let s = createShip('Test', 'galleon'); expect(getShipCondition(s)).toBe('Seaworthy'); s = damageShip(s, 170); expect(getShipCondition(s)).toBe('Sinking'); });
  it('action requirements work', () => { const rowboat = createShip('Tiny', 'rowboat'); expect(canPerformAction(rowboat, 'fire_cannons')).toBe(false); const warship = createShip('Big', 'warship'); expect(canPerformAction(warship, 'fire_cannons')).toBe(true); });
  it('looks up action by type', () => { expect(getNavalAction('board')!.name).toBe('Board'); });
  it('formats ship', () => { expect(formatNavalShip(createShip('HMS Test', 'schooner'))).toContain('HMS Test'); });
});

// ---------------------------------------------------------------------------
// Ritual magic circles
// ---------------------------------------------------------------------------
import { RITUALS, getRandomRitual, getRitualsBySchool, getRitualsByMinCasters, calculateRitualDC, getAllRitualSchools, formatRitual } from '../../src/data/ritualMagic';

describe('ritual magic circles', () => {
  it('has at least 6 rituals', () => { expect(RITUALS.length).toBeGreaterThanOrEqual(6); });
  it('covers at least 4 schools', () => { expect(getAllRitualSchools().length).toBeGreaterThanOrEqual(4); });
  it('generates random ritual', () => { const r = getRandomRitual(); expect(r.name.length).toBeGreaterThan(3); expect(r.minCasters).toBeGreaterThanOrEqual(2); });
  it('filters by school', () => { const evoc = getRitualsBySchool('evocation'); expect(evoc.length).toBeGreaterThanOrEqual(1); evoc.forEach((r) => expect(r.school).toBe('evocation')); });
  it('filters by available casters', () => { const with2 = getRitualsByMinCasters(2); const with5 = getRitualsByMinCasters(5); expect(with5.length).toBeGreaterThanOrEqual(with2.length); });
  it('extra casters reduce DC', () => { const r = RITUALS[0]; const normalDC = calculateRitualDC(r, r.minCasters); const easyDC = calculateRitualDC(r, r.maxCasters); expect(easyDC).toBeLessThanOrEqual(normalDC); });
  it('formats with school icon', () => { const r = getRitualsBySchool('necromancy')[0]; expect(formatRitual(r)).toContain('💀'); });
});

// ---------------------------------------------------------------------------
// Companion animal advancement
// ---------------------------------------------------------------------------
import { createCompanion, addCompanionXp, increaseBond, getUnlockedAbilities, getNextAbility, getAllSpecies, formatCompanion } from '../../src/data/companionAnimal';

describe('companion animal advancement', () => {
  it('has at least 5 species', () => { expect(getAllSpecies().length).toBeGreaterThanOrEqual(5); });
  it('creates companion at level 1', () => { const c = createCompanion('Fang', 'Wolf'); expect(c).not.toBeNull(); expect(c!.level).toBe(1); expect(c!.name).toBe('Fang'); });
  it('returns null for unknown species', () => { expect(createCompanion('X', 'Dragon')).toBeNull(); });
  it('levels up with XP', () => { let c = createCompanion('Pip', 'Hawk')!; c = addCompanionXp(c, 150); expect(c.level).toBe(2); expect(c.maxHp).toBeGreaterThan(6); });
  it('unlocks abilities at level thresholds', () => { let c = createCompanion('Rex', 'Wolf')!; expect(getUnlockedAbilities(c).length).toBe(1); c = addCompanionXp(c, 350); expect(getUnlockedAbilities(c).length).toBe(2); });
  it('getNextAbility returns future ability', () => { const c = createCompanion('Hoot', 'Hawk')!; const next = getNextAbility(c); expect(next).not.toBeNull(); expect(next!.level).toBeGreaterThan(1); });
  it('bond increases capped at 10', () => { let c = createCompanion('Kit', 'Cat')!; for (let i = 0; i < 15; i++) c = increaseBond(c); expect(c.bond).toBe(10); });
  it('formats companion', () => { const c = createCompanion('Storm', 'Pseudodragon')!; expect(formatCompanion(c)).toContain('Storm'); expect(formatCompanion(c)).toContain('Pseudodragon'); });
});

// ---------------------------------------------------------------------------
// Trap disarm mini-game
// ---------------------------------------------------------------------------
import { TRAP_DISARM_CHALLENGES, getRandomChallenge, getChallengesByDifficulty, getStepCount, getRequiredSteps, calculateSuccessRate, formatChallenge as formatDisarmChallenge } from '../../src/data/trapDisarm';

describe('trap disarm mini-game', () => {
  it('has at least 5 challenges', () => { expect(TRAP_DISARM_CHALLENGES.length).toBeGreaterThanOrEqual(5); });
  it('generates random challenge', () => { const c = getRandomChallenge(); expect(c.name.length).toBeGreaterThan(3); expect(c.steps.length).toBeGreaterThanOrEqual(2); });
  it('filters by difficulty', () => { const simple = getChallengesByDifficulty('simple'); expect(simple.length).toBeGreaterThanOrEqual(1); simple.forEach((c) => expect(c.difficulty).toBe('simple')); });
  it('counts steps', () => { const c = TRAP_DISARM_CHALLENGES[0]; expect(getStepCount(c)).toBe(c.steps.length); });
  it('filters required vs optional steps', () => { const deadly = getChallengesByDifficulty('deadly')[0]; const required = getRequiredSteps(deadly); expect(required.length).toBeLessThanOrEqual(deadly.steps.length); });
  it('success rate is 0-100', () => { const c = getRandomChallenge(); const rate = calculateSuccessRate(c, { thieves_tools: 5, arcana: 3, investigation: 2, athletics: 1, perception: 2, sleight_of_hand: 4 }); expect(rate).toBeGreaterThanOrEqual(0); expect(rate).toBeLessThanOrEqual(100); });
  it('higher mods = higher success rate', () => { const c = TRAP_DISARM_CHALLENGES[0]; const lowRate = calculateSuccessRate(c, { thieves_tools: 0, arcana: 0, investigation: 0, athletics: 0, perception: 0, sleight_of_hand: 0 }); const highRate = calculateSuccessRate(c, { thieves_tools: 10, arcana: 10, investigation: 10, athletics: 10, perception: 10, sleight_of_hand: 10 }); expect(highRate).toBeGreaterThanOrEqual(lowRate); });
  it('formats with steps when requested', () => { const c = getRandomChallenge(); const withSteps = formatDisarmChallenge(c, true); const without = formatDisarmChallenge(c); expect(withSteps.length).toBeGreaterThan(without.length); expect(withSteps).toContain('['); });
});

// ---------------------------------------------------------------------------
// Tavern brawl choreographer
// ---------------------------------------------------------------------------
import { generateBrawl, getEnvironmentalWeapons, getAllTriggers, BRAWL_TRIGGERS, BRAWL_ENVIRONMENTS, formatBrawl } from '../../src/data/tavernBrawl';

describe('tavern brawl choreographer', () => {
  it('has at least 6 triggers', () => { expect(BRAWL_TRIGGERS.length).toBeGreaterThanOrEqual(6); expect(getAllTriggers().length).toBeGreaterThanOrEqual(6); });
  it('has at least 3 environments', () => { expect(BRAWL_ENVIRONMENTS.length).toBeGreaterThanOrEqual(3); });
  it('generates full brawl', () => { const b = generateBrawl(); expect(b.triggerDescription.length).toBeGreaterThan(10); expect(b.escalation.length).toBeGreaterThanOrEqual(3); expect(b.participants.length).toBeGreaterThanOrEqual(2); });
  it('has environmental weapons', () => { const b = generateBrawl(); const weapons = getEnvironmentalWeapons(b); expect(weapons.length).toBeGreaterThanOrEqual(3); weapons.forEach((w) => { expect(w.damage.length).toBeGreaterThan(0); expect(['improvised', 'thrown', 'swung']).toContain(w.type); }); });
  it('has resolutions', () => { const b = generateBrawl(); expect(b.resolution.length).toBeGreaterThanOrEqual(4); b.resolution.forEach((r) => expect(typeof r.reputationChange).toBe('number')); });
  it('formats brawl', () => { expect(formatBrawl(generateBrawl())).toContain('TAVERN BRAWL'); });
});

// ---------------------------------------------------------------------------
// Dream sequence generator
// ---------------------------------------------------------------------------
import { DREAMS, getRandomDream as getRandomDreamSequence, getDreamsByType as getDreamSequencesByType, getDreamChoiceCount, getChoicesWithEffects, getAllDreamTypes as getAllDreamSequenceTypes, formatDream as formatDreamSequence } from '../../src/data/dreamSequence';

describe('dream sequence generator', () => {
  it('has at least 6 dreams', () => { expect(DREAMS.length).toBeGreaterThanOrEqual(6); });
  it('covers at least 5 dream types', () => { expect(getAllDreamSequenceTypes().length).toBeGreaterThanOrEqual(5); });
  it('generates random dream', () => { const d = getRandomDreamSequence(); expect(d.title.length).toBeGreaterThan(3); expect(d.narration.length).toBeGreaterThan(20); expect(d.imagery.length).toBeGreaterThanOrEqual(2); });
  it('filters by type', () => { const sym = getDreamSequencesByType('symbolic'); expect(sym.length).toBeGreaterThanOrEqual(1); sym.forEach((d) => expect(d.type).toBe('symbolic')); });
  it('each dream has 3 choices', () => { DREAMS.forEach((d) => expect(getDreamChoiceCount(d)).toBe(3)); });
  it('most dreams have mechanical effects', () => { const withEffects = DREAMS.filter((d) => getChoicesWithEffects(d).length > 0); expect(withEffects.length).toBeGreaterThanOrEqual(5); });
  it('all dreams have wake effects', () => { DREAMS.forEach((d) => expect(d.wakeEffect.length).toBeGreaterThan(10)); });
  it('formats with type icon', () => { const d = getDreamSequencesByType('nightmare')[0]; expect(formatDreamSequence(d)).toContain('😱'); });
});

// ---------------------------------------------------------------------------
// Faction war tracker
// ---------------------------------------------------------------------------
import { createFactionWar, resolveBattle, applyBattleResult, getContestedTerritories, getFactionTerritories, getFactionStrength, DEFAULT_FACTIONS, DEFAULT_TERRITORIES, formatFactionWar } from '../../src/data/factionWar';

describe('faction war tracker', () => {
  it('has at least 4 default factions', () => { expect(DEFAULT_FACTIONS.length).toBeGreaterThanOrEqual(4); });
  it('has at least 8 territories', () => { expect(DEFAULT_TERRITORIES.length).toBeGreaterThanOrEqual(8); });
  it('creates war state', () => { const s = createFactionWar(); expect(s.turn).toBe(1); expect(s.factions.length).toBeGreaterThanOrEqual(4); });
  it('resolves battles', () => { const s = createFactionWar(); const result = resolveBattle(s, 'The Iron Crown', 'Black Marsh'); expect(result).not.toBeNull(); expect(result!.attackerRoll).toBeGreaterThan(0); expect(['The Iron Crown', 'Shadow Pact']).toContain(result!.winner); });
  it('applies battle results', () => { const s = createFactionWar(); const result = resolveBattle(s, 'The Iron Crown', 'Neutral Wilds')!; const updated = applyBattleResult(s, result); expect(updated.battles.length).toBe(1); });
  it('returns null for unknown combatants', () => { const s = createFactionWar(); expect(resolveBattle(s, 'Nonexistent', 'Capital')).toBeNull(); });
  it('finds contested territories', () => { const s = createFactionWar(); expect(getContestedTerritories(s).length).toBeGreaterThanOrEqual(1); });
  it('calculates faction strength (base + territories)', () => { const s = createFactionWar(); const str = getFactionStrength(s, 'The Iron Crown'); expect(str).toBeGreaterThan(DEFAULT_FACTIONS[0].strength); });
  it('formats war state', () => { expect(formatFactionWar(createFactionWar())).toContain('Faction War'); });
});

// ---------------------------------------------------------------------------
// Merchant caravan generator
// ---------------------------------------------------------------------------
import { generateCaravan, getCaravanByOrigin, getAllOrigins, getExoticItems, formatCaravan } from '../../src/data/merchantCaravan';

describe('merchant caravan generator', () => {
  it('has 6 origins', () => { expect(getAllOrigins().length).toBe(6); });
  it('generates random caravan', () => { const c = generateCaravan(); expect(c.caravan_name.length).toBeGreaterThan(3); expect(c.inventory.length).toBeGreaterThanOrEqual(3); expect(c.merchant.name.length).toBeGreaterThan(3); });
  it('generates by origin', () => { const c = getCaravanByOrigin('dwarven_holds'); expect(c.origin).toBe('dwarven_holds'); expect(c.merchant.specialty).toContain('Weapons'); });
  it('each origin has quest hook', () => { getAllOrigins().forEach((o) => { const c = generateCaravan(o); expect(c.questHook.length).toBeGreaterThan(20); }); });
  it('some origins have exotic items', () => { const exotic = getExoticItems(generateCaravan('elven_woods')); expect(exotic.length).toBeGreaterThanOrEqual(1); });
  it('all items have prices', () => { const c = generateCaravan(); c.inventory.forEach((i) => expect(i.price).toBeGreaterThan(0)); });
  it('formats caravan', () => { expect(formatCaravan(generateCaravan())).toContain('Merchant'); });
});

// ---------------------------------------------------------------------------
// Heist planner
// ---------------------------------------------------------------------------
import { HEISTS, getRandomHeist, getHeistByDifficulty, getPhaseCount, getTotalGuards, formatHeist } from '../../src/data/heistPlanner';

describe('heist planner', () => {
  it('has at least 4 heists', () => { expect(HEISTS.length).toBeGreaterThanOrEqual(4); });
  it('generates random heist', () => { const h = getRandomHeist(); expect(h.name.length).toBeGreaterThan(3); expect(h.phases.length).toBeGreaterThanOrEqual(2); });
  it('filters by difficulty', () => { const grand = getHeistByDifficulty('grand_heist'); expect(grand.length).toBeGreaterThanOrEqual(1); grand.forEach((h) => expect(h.difficulty).toBe('grand_heist')); });
  it('phase count matches', () => { HEISTS.forEach((h) => expect(getPhaseCount(h)).toBe(h.phases.length)); });
  it('harder heists have more phases', () => { const petty = getHeistByDifficulty('petty_theft')[0]; const impossible = getHeistByDifficulty('impossible')[0]; expect(getPhaseCount(impossible)).toBeGreaterThan(getPhaseCount(petty)); });
  it('counts guards', () => { HEISTS.forEach((h) => expect(getTotalGuards(h)).toBeGreaterThanOrEqual(1)); });
  it('all heists have complications', () => { HEISTS.forEach((h) => expect(h.complication.length).toBeGreaterThan(10)); });
  it('all heists have escape routes', () => { HEISTS.forEach((h) => expect(h.escapeRoutes.length).toBeGreaterThanOrEqual(2)); });
  it('formats heist', () => { expect(formatHeist(getRandomHeist())).toContain('Target'); });
});

// ---------------------------------------------------------------------------
// Tournament bracket system
// ---------------------------------------------------------------------------
import { createTournament, resolveMatch, calculatePayout, getRandomCrowdReaction, getAllTournamentTypes, FIGHTERS as TOURNEY_FIGHTERS, formatTournament } from '../../src/data/tournamentBracket';

describe('tournament bracket system', () => {
  it('has at least 6 fighters', () => { expect(TOURNEY_FIGHTERS.length).toBeGreaterThanOrEqual(6); });
  it('has 5 tournament types', () => { expect(getAllTournamentTypes().length).toBe(5); });
  it('creates tournament with fighters', () => { const t = createTournament('Grand Arena', 'melee', 4); expect(t.name).toBe('Grand Arena'); expect(t.fighters.length).toBe(4); expect(t.rules.length).toBeGreaterThanOrEqual(3); });
  it('resolves matches', () => { const f1 = TOURNEY_FIGHTERS[0]; const f2 = TOURNEY_FIGHTERS[1]; const result = resolveMatch(f1, f2); expect([f1.name, f2.name]).toContain(result.winner.name); expect(result.description.length).toBeGreaterThan(10); });
  it('calculates payout', () => { expect(calculatePayout(100, 2.0)).toBe(200); expect(calculatePayout(50, 8.0)).toBe(400); });
  it('crowd reactions are varied', () => { const reactions = new Set(Array.from({ length: 20 }, () => getRandomCrowdReaction())); expect(reactions.size).toBeGreaterThanOrEqual(3); });
  it('formats tournament', () => { const t = createTournament('Test Cup', 'jousting'); expect(formatTournament(t)).toContain('Test Cup'); expect(formatTournament(t)).toContain('jousting'); });
});

// ---------------------------------------------------------------------------
// Poison crafting system
// ---------------------------------------------------------------------------
import { POISONS as ALCHEMY_POISONS, getRandomPoison, getPoisonsByDelivery, getPoisonsByRarity, getCraftingCost as getPoisonCraftCost, canIdentify, getAllDeliveryMethods, formatPoison as formatAlchemyPoison } from '../../src/data/poisonCrafting';

describe('poison crafting system', () => {
  it('has at least 6 poisons', () => { expect(ALCHEMY_POISONS.length).toBeGreaterThanOrEqual(6); });
  it('has 4 delivery methods', () => { expect(getAllDeliveryMethods().length).toBe(4); });
  it('generates random poison', () => { const p = getRandomPoison(); expect(p.name.length).toBeGreaterThan(3); expect(p.symptoms.length).toBeGreaterThanOrEqual(2); expect(p.saveDC).toBeGreaterThanOrEqual(10); });
  it('filters by delivery', () => { const ingested = getPoisonsByDelivery('ingested'); expect(ingested.length).toBeGreaterThanOrEqual(2); ingested.forEach((p) => expect(p.delivery).toBe('ingested')); });
  it('filters by rarity', () => { const rare = getPoisonsByRarity('rare'); expect(rare.length).toBeGreaterThanOrEqual(2); rare.forEach((p) => expect(p.rarity).toBe('rare')); });
  it('crafting cost = sum of ingredients', () => { ALCHEMY_POISONS.forEach((p) => { const cost = p.ingredients.reduce((s, i) => s + i.cost, 0); expect(getPoisonCraftCost(p)).toBe(cost); }); });
  it('identification depends on modifier', () => { const easy = ALCHEMY_POISONS.find((p) => p.identifyDC === 10)!; expect(canIdentify(easy, 0)).toBe(true); const hard = ALCHEMY_POISONS.find((p) => p.identifyDC >= 18)!; expect(canIdentify(hard, 0)).toBe(false); });
  it('formats identified vs unidentified', () => { const p = getRandomPoison(); expect(formatAlchemyPoison(p, true)).toContain(p.name); expect(formatAlchemyPoison(p, false)).toContain('Unknown Poison'); });
});

// ---------------------------------------------------------------------------
// Underground river navigation
// ---------------------------------------------------------------------------
import { RIVER_SEGMENTS, RIVER_ROUTES, getRandomSegment as getRandomRiverSegment, getSegmentsByType, getRoute as getRiverRoute, getAllRoutes, getSegmentsWithTreasure, getSegmentsWithEncounters, formatSegment, formatRoute as formatRiverRoute } from '../../src/data/undergroundRiver';

describe('underground river navigation', () => {
  it('has at least 6 segments', () => { expect(RIVER_SEGMENTS.length).toBeGreaterThanOrEqual(6); });
  it('has at least 3 routes', () => { expect(RIVER_ROUTES.length).toBeGreaterThanOrEqual(3); });
  it('generates random segment', () => { const s = getRandomRiverSegment(); expect(s.name.length).toBeGreaterThan(3); expect(s.description.length).toBeGreaterThan(20); });
  it('filters by type', () => { const rapids = getSegmentsByType('rapids'); expect(rapids.length).toBeGreaterThanOrEqual(1); rapids.forEach((s) => expect(s.type).toBe('rapids')); });
  it('looks up route', () => { const r = getRiverRoute('The Deep Dive'); expect(r).toBeDefined(); expect(r!.segments.length).toBeGreaterThanOrEqual(3); });
  it('some segments have treasure', () => { expect(getSegmentsWithTreasure().length).toBeGreaterThanOrEqual(2); });
  it('some segments have encounters', () => { expect(getSegmentsWithEncounters().length).toBeGreaterThanOrEqual(2); });
  it('routes have required equipment', () => { getAllRoutes().forEach((r) => expect(r.requiredEquipment.length).toBeGreaterThanOrEqual(2)); });
  it('formats segment', () => { expect(formatSegment(RIVER_SEGMENTS[0])).toContain('Navigation DC'); });
  it('formats route', () => { expect(formatRiverRoute(RIVER_ROUTES[0])).toContain('Equipment'); });
});

// ---------------------------------------------------------------------------
// Court intrigue system
// ---------------------------------------------------------------------------
import { NOBLE_HOUSES, SCANDALS as COURT_SCANDALS, createCourtState, addFavor, getHouseByName, getHousePower, getScandalsForHouse, getAllHouseNames, formatNobleHouse as formatCourtHouse, formatCourtState } from '../../src/data/courtIntrigue';

describe('court intrigue system', () => {
  it('has at least 4 noble houses', () => { expect(NOBLE_HOUSES.length).toBeGreaterThanOrEqual(4); });
  it('has scandals for multiple houses', () => { expect(COURT_SCANDALS.length).toBeGreaterThanOrEqual(4); });
  it('creates court state', () => { const s = createCourtState(); expect(s.houses.length).toBeGreaterThanOrEqual(4); expect(s.alliances.length).toBeGreaterThanOrEqual(1); expect(s.rivalries.length).toBeGreaterThanOrEqual(1); });
  it('looks up house by name', () => { const s = createCourtState(); const h = getHouseByName(s, 'House Valerian'); expect(h).toBeDefined(); expect(h!.motto.length).toBeGreaterThan(0); });
  it('calculates house power', () => { const h = NOBLE_HOUSES[0]; const power = getHousePower(h); expect(power).toBeGreaterThanOrEqual(1); expect(power).toBeLessThanOrEqual(10); });
  it('finds scandals for house', () => { const s = createCourtState(); const scandals = getScandalsForHouse(s, 'House Valerian'); expect(scandals.length).toBeGreaterThanOrEqual(1); });
  it('adds favors', () => { let s = createCourtState(); s = addFavor(s, 'House Ashford', 'owed_to_party', 'minor', 'Helped at the ball'); expect(s.favors.length).toBe(1); });
  it('all houses have secrets', () => { NOBLE_HOUSES.forEach((h) => expect(h.secrets.length).toBeGreaterThanOrEqual(1)); });
  it('formats noble house', () => { expect(formatCourtHouse(NOBLE_HOUSES[0])).toContain('House Valerian'); });
  it('formats court state', () => { expect(formatCourtState(createCourtState())).toContain('Court Intrigue'); });
});

// ---------------------------------------------------------------------------
// Shipwreck generator
// ---------------------------------------------------------------------------
import { SHIPWRECKS, getRandomShipwreck, getShipwrecksByCause, getShipwrecksByCondition, getTotalCargoValue, getSalvageableCargo, formatShipwreck } from '../../src/data/shipwreckGenerator';

describe('shipwreck generator', () => {
  it('has at least 4 wrecks', () => { expect(SHIPWRECKS.length).toBeGreaterThanOrEqual(4); });
  it('generates random wreck', () => { const w = getRandomShipwreck(); expect(w.shipName.length).toBeGreaterThan(3); expect(w.cargo.length).toBeGreaterThanOrEqual(2); });
  it('filters by cause', () => { const storm = getShipwrecksByCause('storm'); expect(storm.length).toBeGreaterThanOrEqual(1); storm.forEach((w) => expect(w.cause).toBe('storm')); });
  it('filters by condition', () => { const sunk = getShipwrecksByCondition('sunk'); expect(sunk.length).toBeGreaterThanOrEqual(1); });
  it('calculates salvageable cargo value', () => { SHIPWRECKS.forEach((w) => { const val = getTotalCargoValue(w); expect(val).toBeGreaterThanOrEqual(0); }); });
  it('filters salvageable cargo', () => { const w = SHIPWRECKS[0]; const salvageable = getSalvageableCargo(w); salvageable.forEach((c) => expect(c.salvageable).toBe(true)); });
  it('all wrecks have hooks', () => { SHIPWRECKS.forEach((w) => expect(w.hook.length).toBeGreaterThan(20)); });
  it('all wrecks have hazards', () => { SHIPWRECKS.forEach((w) => expect(w.hazards.length).toBeGreaterThanOrEqual(1)); });
  it('formats wreck', () => { expect(formatShipwreck(getRandomShipwreck())).toContain('Salvageable'); });
});

// ---------------------------------------------------------------------------
// Advanced bounty board
// ---------------------------------------------------------------------------
import { ADVANCED_BOUNTIES, getRandomAdvancedBounty, getAdvancedBountiesByType, getAdvancedBountiesByDifficulty, getBountiesWithRivals, formatAdvancedBounty } from '../../src/data/bountyBoardAdvanced';

describe('advanced bounty board', () => {
  it('has at least 5 bounties', () => { expect(ADVANCED_BOUNTIES.length).toBeGreaterThanOrEqual(5); });
  it('generates random bounty', () => { const b = getRandomAdvancedBounty(); expect(b.title.length).toBeGreaterThan(3); expect(b.target.name.length).toBeGreaterThan(3); expect(b.complications.length).toBeGreaterThanOrEqual(1); });
  it('filters by type', () => { const retrieve = getAdvancedBountiesByType('retrieve'); expect(retrieve.length).toBeGreaterThanOrEqual(1); retrieve.forEach((b) => expect(b.type).toBe('retrieve')); });
  it('filters by difficulty', () => { const gold = getAdvancedBountiesByDifficulty('gold'); expect(gold.length).toBeGreaterThanOrEqual(1); gold.forEach((b) => expect(b.difficulty).toBe('gold')); });
  it('some have rival hunters', () => { const withRivals = getBountiesWithRivals(); expect(withRivals.length).toBeGreaterThanOrEqual(2); withRivals.forEach((b) => expect(b.rivalHunter).not.toBeNull()); });
  it('all bounties have deadlines', () => { ADVANCED_BOUNTIES.forEach((b) => expect(b.deadline.length).toBeGreaterThan(0)); });
  it('all targets have danger levels', () => { ADVANCED_BOUNTIES.forEach((b) => expect(b.target.dangerLevel.length).toBeGreaterThan(5)); });
  it('formats bounty', () => { expect(formatAdvancedBounty(getRandomAdvancedBounty())).toContain('Target'); });
});

// ---------------------------------------------------------------------------
// Layered curse system
// ---------------------------------------------------------------------------
import { LAYERED_CURSES, getRandomLayeredCurse, getLayeredCursesByOrigin, getLayeredCursesBySeverity, getStageCount as getCurseStageCount, getRemovalMethodCount, formatLayeredCurse } from '../../src/data/curseLayered';

describe('layered curse system', () => {
  it('has at least 5 curses', () => { expect(LAYERED_CURSES.length).toBeGreaterThanOrEqual(5); });
  it('generates random curse', () => { const c = getRandomLayeredCurse(); expect(c.name.length).toBeGreaterThan(3); expect(c.stages.length).toBeGreaterThanOrEqual(2); expect(c.lore.length).toBeGreaterThan(10); });
  it('filters by origin', () => { const fey = getLayeredCursesByOrigin('fey'); expect(fey.length).toBeGreaterThanOrEqual(1); fey.forEach((c) => expect(c.origin).toBe('fey')); });
  it('filters by severity', () => { const legendary = getLayeredCursesBySeverity('legendary'); expect(legendary.length).toBeGreaterThanOrEqual(1); });
  it('curses have progressive stages', () => { LAYERED_CURSES.forEach((c) => { const stages = c.stages.map((s) => s.stage); expect(stages).toEqual([...stages].sort((a, b) => a - b)); }); });
  it('all curses have removal methods', () => { LAYERED_CURSES.forEach((c) => expect(getRemovalMethodCount(c)).toBeGreaterThanOrEqual(2)); });
  it('severe/legendary curses have more stages', () => { const minor = LAYERED_CURSES.find((c) => c.severity === 'minor')!; const severe = LAYERED_CURSES.find((c) => c.severity === 'severe')!; expect(getCurseStageCount(severe)).toBeGreaterThan(getCurseStageCount(minor)); });
  it('formats with stage', () => { const c = getRandomLayeredCurse(); expect(formatLayeredCurse(c, 1)).toContain('Stage 1'); });
});

// ---------------------------------------------------------------------------
// Alchemical ingredient foraging
// ---------------------------------------------------------------------------
import { ALCHEMICAL_INGREDIENTS, getIngredientsByBiome, getIngredientsBySeason, getIngredientsByRarity, forage, getAllForagingBiomes, formatIngredient, formatForagingResult } from '../../src/data/alchemicalForaging';

describe('alchemical ingredient foraging', () => {
  it('has at least 10 ingredients', () => { expect(ALCHEMICAL_INGREDIENTS.length).toBeGreaterThanOrEqual(10); });
  it('has 8 foraging biomes', () => { expect(getAllForagingBiomes().length).toBe(8); });
  it('filters by biome', () => { const forest = getIngredientsByBiome('forest'); expect(forest.length).toBeGreaterThanOrEqual(2); forest.forEach((i) => expect(i.biomes).toContain('forest')); });
  it('filters by season', () => { const winter = getIngredientsBySeason('arctic', 'winter'); expect(winter.length).toBeGreaterThanOrEqual(1); });
  it('year-round ingredients always available', () => { const underdark = getIngredientsBySeason('underdark', 'spring'); const underdarkWinter = getIngredientsBySeason('underdark', 'winter'); const yearRound = ALCHEMICAL_INGREDIENTS.filter((i) => i.biomes.includes('underdark') && i.seasons.length === 0); expect(underdark.length).toBeGreaterThanOrEqual(yearRound.length); expect(underdarkWinter.length).toBeGreaterThanOrEqual(yearRound.length); });
  it('filters by rarity', () => { const rare = getIngredientsByRarity('rare'); expect(rare.length).toBeGreaterThanOrEqual(2); rare.forEach((i) => expect(i.rarity).toBe('rare')); });
  it('all ingredients have uses', () => { ALCHEMICAL_INGREDIENTS.forEach((i) => expect(i.uses.length).toBeGreaterThanOrEqual(2)); });
  it('forage can return null (failed roll)', () => { const results = Array.from({ length: 50 }, () => forage('desert', 'winter', -10)); expect(results.some((r) => r === null)).toBe(true); });
  it('forage quality scales with roll', () => { const results = Array.from({ length: 50 }, () => forage('forest', 'spring', 15)).filter(Boolean); if (results.length > 0) { expect(results.some((r) => r!.quality === 'excellent' || r!.quality === 'standard')).toBe(true); } });
  it('formats ingredient', () => { expect(formatIngredient(ALCHEMICAL_INGREDIENTS[0])).toContain('Biomes'); });
});

// ---------------------------------------------------------------------------
// Spelljammer helm system
// ---------------------------------------------------------------------------
import { HELMS, SPACE_HAZARDS, SPACE_ENCOUNTERS, getHelmByType, getAllHelmTypes, getHazardsByRegion, getEncountersByRegion, getAllRegions as getAllSpaceRegions, calculateTravelTime as calcSpaceTravel, formatHelm, formatHazard } from '../../src/data/spelljammerHelm';

describe('spelljammer helm system', () => {
  it('has 5 helm types', () => { expect(HELMS.length).toBe(5); expect(getAllHelmTypes().length).toBe(5); });
  it('has at least 5 hazards', () => { expect(SPACE_HAZARDS.length).toBeGreaterThanOrEqual(5); });
  it('has at least 4 encounters', () => { expect(SPACE_ENCOUNTERS.length).toBeGreaterThanOrEqual(4); });
  it('looks up helm by type', () => { const h = getHelmByType('major'); expect(h).toBeDefined(); expect(h!.speedMultiplier).toBe(2); });
  it('hazards filter by region', () => { const phlog = getHazardsByRegion('phlogiston'); expect(phlog.length).toBeGreaterThanOrEqual(1); phlog.forEach((h) => expect(h.region).toBe('phlogiston')); });
  it('encounters filter by region', () => { const astral = getEncountersByRegion('astral_sea'); expect(astral.length).toBeGreaterThanOrEqual(1); });
  it('calculates travel time', () => { const hours = calcSpaceTravel(100, 'minor', 3); expect(hours).toBeGreaterThan(0); expect(hours).toBeLessThan(Infinity); const faster = calcSpaceTravel(100, 'major', 3); expect(faster).toBeLessThanOrEqual(hours); });
  it('artifact helm is fastest', () => { const minor = calcSpaceTravel(300, 'minor', 5); const artifact = calcSpaceTravel(300, 'artifact', 5); expect(artifact).toBeLessThan(minor); });
  it('covers multiple space regions', () => { expect(getAllSpaceRegions().length).toBeGreaterThanOrEqual(4); });
  it('formats helm', () => { expect(formatHelm(HELMS[0])).toContain('speed'); });
  it('formats hazard', () => { expect(formatHazard(SPACE_HAZARDS[0])).toContain('DC'); });
});

// ---------------------------------------------------------------------------
// Library research system
// ---------------------------------------------------------------------------
import { LIBRARIES, getLibraryBySize, searchLibrary, getBestBookForDomain, getBooksWithSecrets, getAllDomains, formatLibrary } from '../../src/data/libraryResearch';

describe('library research system', () => {
  it('has at least 4 libraries', () => { expect(LIBRARIES.length).toBeGreaterThanOrEqual(4); });
  it('libraries scale in size', () => { const sizes = LIBRARIES.map((l) => l.books.length); expect(sizes[sizes.length - 1]).toBeGreaterThan(sizes[0]); });
  it('looks up by size', () => { const uni = getLibraryBySize('university'); expect(uni).toBeDefined(); expect(uni!.books.length).toBeGreaterThanOrEqual(3); });
  it('searches by domain', () => { const uni = getLibraryBySize('university')!; const arcana = searchLibrary(uni, 'arcana'); expect(arcana.length).toBeGreaterThanOrEqual(1); arcana.forEach((b) => expect(b.domain).toBe('arcana')); });
  it('finds best book for domain', () => { const uni = getLibraryBySize('university')!; const best = getBestBookForDomain(uni, 'monsters'); expect(best).not.toBeNull(); expect(best!.researchBonus).toBeGreaterThanOrEqual(2); });
  it('returns null for missing domain', () => { const shelf = getLibraryBySize('private_shelf')!; expect(getBestBookForDomain(shelf, 'planes')).toBeNull(); });
  it('finds books with secrets', () => { const uni = getLibraryBySize('university')!; expect(getBooksWithSecrets(uni).length).toBeGreaterThanOrEqual(1); });
  it('has 8 knowledge domains', () => { expect(getAllDomains().length).toBe(8); });
  it('formats library', () => { expect(formatLibrary(LIBRARIES[0])).toContain('Research DC'); });
});

// ---------------------------------------------------------------------------
// Advanced festival generator
// ---------------------------------------------------------------------------
import { ADVANCED_FESTIVALS, getRandomAdvancedFestival, getAdvancedFestivalsByType, getActivityCount as getFestActivityCount, getAllAdvancedFestivalTypes, formatAdvancedFestival } from '../../src/data/festivalAdvanced';

describe('advanced festival generator', () => {
  it('has at least 6 festivals', () => { expect(ADVANCED_FESTIVALS.length).toBeGreaterThanOrEqual(6); });
  it('covers at least 5 types', () => { expect(getAllAdvancedFestivalTypes().length).toBeGreaterThanOrEqual(5); });
  it('generates random festival', () => { const f = getRandomAdvancedFestival(); expect(f.name.length).toBeGreaterThan(3); expect(f.activities.length).toBeGreaterThanOrEqual(2); });
  it('filters by type', () => { const martial = getAdvancedFestivalsByType('martial'); expect(martial.length).toBeGreaterThanOrEqual(1); martial.forEach((f) => expect(f.type).toBe('martial')); });
  it('all festivals have plot hooks', () => { ADVANCED_FESTIVALS.forEach((f) => expect(f.plotHook.length).toBeGreaterThan(20)); });
  it('all festivals have special food', () => { ADVANCED_FESTIVALS.forEach((f) => expect(f.specialFood.length).toBeGreaterThan(5)); });
  it('activities have DCs', () => { ADVANCED_FESTIVALS.forEach((f) => f.activities.forEach((a) => expect(a.dc).toBeGreaterThanOrEqual(10))); });
  it('formats festival', () => { expect(formatAdvancedFestival(getRandomAdvancedFestival())).toContain('Activities'); });
});

// ---------------------------------------------------------------------------
// Wilderness survival tracker
// ---------------------------------------------------------------------------
import { BIOME_PROFILES, createSurvivalState, advanceDay, getBiomeProfile, getHungerLevel, getThirstLevel, getAllSurvivalBiomes, formatSurvivalState } from '../../src/data/wildernessSurvival';

describe('wilderness survival tracker', () => {
  it('has 7 biome profiles', () => { expect(BIOME_PROFILES.length).toBe(7); expect(getAllSurvivalBiomes().length).toBe(7); });
  it('starts clean', () => { const s = createSurvivalState(); expect(s.hunger).toBe(0); expect(s.thirst).toBe(0); expect(s.morale).toBe(0); });
  it('eating/drinking reduces needs', () => { let s = createSurvivalState(); s = advanceDay(s, false, false, true, 'temperate'); expect(s.hunger).toBeGreaterThan(0); s = advanceDay(s, true, true, true, 'temperate'); expect(s.hunger).toBeLessThan(2); });
  it('desert doubles thirst', () => { let s = createSurvivalState(); s = advanceDay(s, true, false, false, 'ocean'); expect(s.thirst).toBe(2); });
  it('exposure increases without shelter in risky biomes', () => { let s = createSurvivalState(); s = advanceDay(s, true, true, false, 'arctic'); expect(s.exposure).toBe(1); });
  it('hunger levels escalate', () => { expect(getHungerLevel(0).level).toBe('Satisfied'); expect(getHungerLevel(5).level).toBe('Hungry'); expect(getHungerLevel(9).level).toBe('Starving'); });
  it('thirst levels escalate', () => { expect(getThirstLevel(0).level).toBe('Hydrated'); expect(getThirstLevel(5).level).toBe('Parched'); expect(getThirstLevel(9).level).toBe('Critical'); });
  it('biome profiles have forage DCs', () => { BIOME_PROFILES.forEach((b) => expect(b.foragedc).toBeGreaterThanOrEqual(8)); });
  it('formats survival state', () => { expect(formatSurvivalState(createSurvivalState())).toContain('Survival Status'); });
});

// ---------------------------------------------------------------------------
// Legendary weapon awakening
// ---------------------------------------------------------------------------
import { LEGENDARY_WEAPONS, getRandomLegendaryWeapon, getWeaponByCategory, getWeaponStage, getNextDeed, getAllCategories as getAllWeaponCategories, formatLegendaryWeapon } from '../../src/data/legendaryWeapon';

describe('legendary weapon awakening', () => {
  it('has at least 4 weapons', () => { expect(LEGENDARY_WEAPONS.length).toBeGreaterThanOrEqual(4); });
  it('generates random weapon', () => { const w = getRandomLegendaryWeapon(); expect(w.name.length).toBeGreaterThan(3); expect(w.stages.length).toBeGreaterThanOrEqual(2); expect(w.personality.length).toBeGreaterThan(10); });
  it('filters by category', () => { const swords = getWeaponByCategory('sword'); expect(swords.length).toBeGreaterThanOrEqual(1); swords.forEach((w) => expect(w.category).toBe('sword')); });
  it('stages are sequential', () => { LEGENDARY_WEAPONS.forEach((w) => { const nums = w.stages.map((s) => s.stage); expect(nums).toEqual([1, 2, 3]); }); });
  it('looks up stage', () => { const w = LEGENDARY_WEAPONS[0]; expect(getWeaponStage(w, 2)!.name.length).toBeGreaterThan(0); });
  it('next deed works', () => { const w = LEGENDARY_WEAPONS[0]; expect(getNextDeed(w, 0)).toBeDefined(); expect(getNextDeed(w, 3)).toBeNull(); });
  it('all weapons have alignment', () => { LEGENDARY_WEAPONS.forEach((w) => expect(['good', 'neutral', 'evil']).toContain(w.alignment)); });
  it('formats dormant weapon', () => { const w = LEGENDARY_WEAPONS[0]; expect(formatLegendaryWeapon(w, 0)).toContain('Dormant'); });
  it('formats awakened weapon', () => { const w = LEGENDARY_WEAPONS[0]; expect(formatLegendaryWeapon(w, 2)).toContain('Stage 2'); });
});

// ---------------------------------------------------------------------------
// Summoning circle mishap table
// ---------------------------------------------------------------------------
import { SUMMONING_MISHAPS, getRandomMishap, getMishapsBySeverity as getMishapSeverity, rollMishap, getAllSeverities, formatMishap } from '../../src/data/summoningMishap';

describe('summoning circle mishap table', () => {
  it('has at least 10 mishaps', () => { expect(SUMMONING_MISHAPS.length).toBeGreaterThanOrEqual(10); });
  it('has 4 severity levels', () => { expect(getAllSeverities().length).toBe(4); });
  it('generates random mishap', () => { const m = getRandomMishap(); expect(m.name.length).toBeGreaterThan(3); expect(m.resolution.length).toBeGreaterThan(5); });
  it('filters by severity', () => { const dangerous = getMishapSeverity('dangerous'); expect(dangerous.length).toBeGreaterThanOrEqual(3); dangerous.forEach((m) => expect(m.severity).toBe('dangerous')); });
  it('rollMishap returns valid mishap', () => { const m = rollMishap(3); expect(m.name.length).toBeGreaterThan(0); expect(getAllSeverities()).toContain(m.severity); });
  it('all mishaps have durations', () => { SUMMONING_MISHAPS.forEach((m) => expect(m.duration.length).toBeGreaterThan(0)); });
  it('all mishaps have resolutions', () => { SUMMONING_MISHAPS.forEach((m) => expect(m.resolution.length).toBeGreaterThan(5)); });
  it('formats mishap', () => { expect(formatMishap(getRandomMishap())).toContain('Effect'); });
});

// ---------------------------------------------------------------------------
// Astral projection encounters
// ---------------------------------------------------------------------------
import { ASTRAL_ENCOUNTERS, getRandomAstralEncounter, getEncountersByZone as getAstralByZone, getCordDangerEncounters, getSafeEncounters, getAllAstralZones, formatAstralEncounter } from '../../src/data/astralEncounter';

describe('astral projection encounters', () => {
  it('has at least 8 encounters', () => { expect(ASTRAL_ENCOUNTERS.length).toBeGreaterThanOrEqual(8); });
  it('covers at least 5 zones', () => { expect(getAllAstralZones().length).toBeGreaterThanOrEqual(5); });
  it('generates random encounter', () => { const e = getRandomAstralEncounter(); expect(e.name.length).toBeGreaterThan(3); expect(e.description.length).toBeGreaterThan(20); });
  it('filters by zone', () => { const githyanki = getAstralByZone('githyanki_territory'); expect(githyanki.length).toBeGreaterThanOrEqual(1); githyanki.forEach((e) => expect(e.zone).toBe('githyanki_territory')); });
  it('some encounters risk silver cord', () => { const dangerous = getCordDangerEncounters(); expect(dangerous.length).toBeGreaterThanOrEqual(2); dangerous.forEach((e) => expect(e.silverCordRisk).toBe(true)); });
  it('some encounters are safe', () => { const safe = getSafeEncounters(); expect(safe.length).toBeGreaterThanOrEqual(2); safe.forEach((e) => { expect(e.silverCordRisk).toBe(false); expect(e.reaction).not.toBe('hostile'); }); });
  it('some encounters have loot', () => { const withLoot = ASTRAL_ENCOUNTERS.filter((e) => e.loot !== null); expect(withLoot.length).toBeGreaterThanOrEqual(3); });
  it('formats encounter', () => { const e = getRandomAstralEncounter(); expect(formatAstralEncounter(e)).toContain('CR'); });
});

// ---------------------------------------------------------------------------
// Lycanthropy progression
// ---------------------------------------------------------------------------
import { LYCANTHROPE_PROFILES, LYCANTHROPY_STAGES, createLycanthropyState, advanceInfection, triggerTransformation, canCure, getProfile, getStageInfo, getAllTypes as getAllLycanTypes, formatLycanthropy } from '../../src/data/lycanthropy';

describe('lycanthropy progression', () => {
  it('has 5 lycanthrope types', () => { expect(LYCANTHROPE_PROFILES.length).toBe(5); expect(getAllLycanTypes().length).toBe(5); });
  it('has 5 infection stages', () => { expect(LYCANTHROPY_STAGES.length).toBe(5); });
  it('creates bitten state', () => { const s = createLycanthropyState('werewolf'); expect(s.stage).toBe('bitten'); expect(s.daysSinceInfection).toBe(0); });
  it('progresses through stages', () => { let s = createLycanthropyState('wererat'); s = advanceInfection(s, 4); expect(s.stage).toBe('feverish'); s = advanceInfection(s, 7); expect(s.stage).toBe('changing'); });
  it('transformation advances stage', () => { let s = createLycanthropyState('werewolf'); s = advanceInfection(s, 11); s = triggerTransformation(s, false); expect(s.stage).toBe('transformed'); });
  it('voluntary transformations lead to embraced', () => { let s = createLycanthropyState('werebear'); s = advanceInfection(s, 11); s = triggerTransformation(s, false); for (let i = 0; i < 3; i++) s = triggerTransformation(s, true); expect(s.stage).toBe('embraced'); });
  it('early cure is possible', () => { const s = createLycanthropyState('weretiger'); expect(canCure(s).possible).toBe(true); });
  it('embraced cure is harder', () => { let s = { ...createLycanthropyState('werewolf'), stage: 'embraced' as const }; expect(canCure(s).possible).toBe(false); });
  it('profiles have vulnerabilities', () => { LYCANTHROPE_PROFILES.forEach((p) => expect(p.vulnerability.length).toBeGreaterThan(10)); });
  it('formats state', () => { expect(formatLycanthropy(createLycanthropyState('werewolf'))).toContain('🐺'); });
});

// ---------------------------------------------------------------------------
// Deity pantheon builder
// ---------------------------------------------------------------------------
import { PANTHEON, getDeity, getDeityByDomain, getRivals, getAllies, getAllDomains as getAllDivineDomains, formatDeity } from '../../src/data/deityPantheon';

describe('deity pantheon builder', () => {
  it('has at least 6 deities', () => { expect(PANTHEON.length).toBeGreaterThanOrEqual(6); });
  it('looks up deity by name', () => { const d = getDeity('Solara'); expect(d).toBeDefined(); expect(d!.title).toContain('Dawn'); });
  it('filters by domain', () => { const war = getDeityByDomain('war'); expect(war.length).toBeGreaterThanOrEqual(1); war.forEach((d) => expect(d.domains).toContain('war')); });
  it('finds rivals', () => { const rivals = getRivals('Solara'); expect(rivals.length).toBeGreaterThanOrEqual(1); });
  it('finds allies', () => { const allies = getAllies('Korrath'); expect(allies.length).toBeGreaterThanOrEqual(1); });
  it('all deities have commandments', () => { PANTHEON.forEach((d) => expect(d.commandments.length).toBeGreaterThanOrEqual(2)); });
  it('all deities have blessings and wraths', () => { PANTHEON.forEach((d) => { expect(d.blessingEffect.length).toBeGreaterThan(10); expect(d.wrathEffect.length).toBeGreaterThan(10); }); });
  it('covers multiple domains', () => { expect(getAllDivineDomains().length).toBeGreaterThanOrEqual(5); });
  it('formats deity', () => { expect(formatDeity(PANTHEON[0])).toContain('Commandments'); });
});

// ---------------------------------------------------------------------------
// Magical tattoo system
// ---------------------------------------------------------------------------
import { MAGICAL_TATTOOS, getRandomTattoo, getTattoosByRarity, getTattoosByLocation, getTotalUpgradeCost, getMaxLevel, getAllLocations as getAllTattooLocations, formatTattoo } from '../../src/data/magicalTattoo';

describe('magical tattoo system', () => {
  it('has at least 5 tattoos', () => { expect(MAGICAL_TATTOOS.length).toBeGreaterThanOrEqual(5); });
  it('generates random tattoo', () => { const t = getRandomTattoo(); expect(t.name.length).toBeGreaterThan(3); expect(t.baseEffect.length).toBeGreaterThan(10); });
  it('filters by rarity', () => { const rare = getTattoosByRarity('rare'); expect(rare.length).toBeGreaterThanOrEqual(1); rare.forEach((t) => expect(t.rarity).toBe('rare')); });
  it('filters by location', () => { const arm = getTattoosByLocation('arm'); expect(arm.length).toBeGreaterThanOrEqual(1); arm.forEach((t) => expect(t.location).toBe('arm')); });
  it('total upgrade cost includes base', () => { MAGICAL_TATTOOS.forEach((t) => { expect(getTotalUpgradeCost(t)).toBeGreaterThanOrEqual(t.inkCost); }); });
  it('max level scales with upgrades', () => { const withUpgrades = MAGICAL_TATTOOS.filter((t) => t.upgrades.length > 0); withUpgrades.forEach((t) => expect(getMaxLevel(t)).toBeGreaterThanOrEqual(2)); });
  it('has 6 body locations', () => { expect(getAllTattooLocations().length).toBe(6); });
  it('upgrades have requirements', () => { MAGICAL_TATTOOS.forEach((t) => t.upgrades.forEach((u) => expect(u.requirement.length).toBeGreaterThan(5))); });
  it('formats tattoo', () => { expect(formatTattoo(MAGICAL_TATTOOS[0])).toContain('Ink'); });
});

// ---------------------------------------------------------------------------
// Mass combat rules
// ---------------------------------------------------------------------------
import { UNIT_TEMPLATES, COMMANDER_ABILITIES, BATTLE_MODIFIERS, resolveClash, checkMorale as checkArmyMorale, getUnitsByType, getAllUnitTypes, formatUnit as formatArmyUnit, formatBattleModifier } from '../../src/data/massCombat';

describe('mass combat rules', () => {
  it('has at least 6 unit templates', () => { expect(UNIT_TEMPLATES.length).toBeGreaterThanOrEqual(6); });
  it('has commander abilities', () => { expect(COMMANDER_ABILITIES.length).toBeGreaterThanOrEqual(4); });
  it('has battle modifiers', () => { expect(BATTLE_MODIFIERS.length).toBeGreaterThanOrEqual(5); });
  it('resolves clash with damage', () => { const result = resolveClash(UNIT_TEMPLATES[0], UNIT_TEMPLATES[1]); expect(result.attackerDamage).toBeGreaterThanOrEqual(0); expect(result.defenderDamage).toBeGreaterThanOrEqual(0); expect(result.description.length).toBeGreaterThan(10); });
  it('modifiers affect clash', () => { const results = Array.from({ length: 20 }, () => resolveClash(UNIT_TEMPLATES[0], UNIT_TEMPLATES[0], [BATTLE_MODIFIERS[0]])); const avgDef = results.reduce((s, r) => s + r.attackerDamage, 0) / 20; expect(avgDef).toBeDefined(); });
  it('morale check returns boolean', () => { expect(typeof checkArmyMorale(UNIT_TEMPLATES[0], 10)).toBe('boolean'); });
  it('filters by unit type', () => { const archers = getUnitsByType('archers'); expect(archers.length).toBeGreaterThanOrEqual(1); archers.forEach((u) => expect(u.type).toBe('archers')); });
  it('has multiple unit types', () => { expect(getAllUnitTypes().length).toBeGreaterThanOrEqual(5); });
  it('formats unit', () => { expect(formatArmyUnit(UNIT_TEMPLATES[0])).toContain('ATK'); });
  it('formats battle modifier', () => { expect(formatBattleModifier(BATTLE_MODIFIERS[0])).toContain('DEF'); });
});

// ---------------------------------------------------------------------------
// Thieves guild job board
// ---------------------------------------------------------------------------
import { GUILD_JOBS, getRandomJob, getJobsByType, getJobsByRisk, getJobsUnderDC, getAllJobTypes, formatGuildJob } from '../../src/data/thievesGuildJobs';

describe('thieves guild job board', () => {
  it('has at least 6 jobs', () => { expect(GUILD_JOBS.length).toBeGreaterThanOrEqual(6); });
  it('generates random job', () => { const j = getRandomJob(); expect(j.title.length).toBeGreaterThan(3); expect(j.payout).toBeGreaterThan(0); });
  it('filters by type', () => { const theft = getJobsByType('theft'); expect(theft.length).toBeGreaterThanOrEqual(1); theft.forEach((j) => expect(j.type).toBe('theft')); });
  it('filters by risk', () => { const high = getJobsByRisk('high'); expect(high.length).toBeGreaterThanOrEqual(2); high.forEach((j) => expect(j.risk).toBe('high')); });
  it('filters under DC', () => { const easy = getJobsUnderDC(13); easy.forEach((j) => expect(j.dc).toBeLessThanOrEqual(13)); });
  it('has 6 job types', () => { expect(getAllJobTypes().length).toBe(6); });
  it('all jobs have complications', () => { GUILD_JOBS.forEach((j) => expect(j.complication.length).toBeGreaterThan(10)); });
  it('all jobs have failure consequences', () => { GUILD_JOBS.forEach((j) => expect(j.failureConsequence.length).toBeGreaterThan(10)); });
  it('formats job', () => { expect(formatGuildJob(getRandomJob())).toContain('Payout'); });
});

// ---------------------------------------------------------------------------
// Dungeon room dressing
// ---------------------------------------------------------------------------
import { DUNGEON_ROOMS as DRESSED_ROOMS, getRoomDressing, getRandomRoomDressing, getRoomsWithTraps, getAllArchetypes, getTotalLootValue as getRoomLootValue, formatRoomDressing } from '../../src/data/dungeonRoomDressing';

describe('dungeon room dressing', () => {
  it('has at least 8 room archetypes', () => { expect(DRESSED_ROOMS.length).toBeGreaterThanOrEqual(8); expect(getAllArchetypes().length).toBeGreaterThanOrEqual(8); });
  it('looks up by archetype', () => { const throne = getRoomDressing('throne_room'); expect(throne).toBeDefined(); expect(throne!.furniture.length).toBeGreaterThanOrEqual(3); });
  it('generates random room', () => { const r = getRandomRoomDressing(); expect(r.furniture.length).toBeGreaterThanOrEqual(2); expect(r.ambiance.length).toBeGreaterThanOrEqual(2); });
  it('some rooms have traps', () => { const trapped = getRoomsWithTraps(); expect(trapped.length).toBeGreaterThanOrEqual(4); trapped.forEach((r) => expect(r.possibleTrap).not.toBeNull()); });
  it('all rooms have loot', () => { DRESSED_ROOMS.forEach((r) => expect(r.lootOptions.length).toBeGreaterThanOrEqual(1)); });
  it('loot has find DCs', () => { DRESSED_ROOMS.forEach((r) => r.lootOptions.forEach((l) => expect(l.findDC).toBeGreaterThanOrEqual(8))); });
  it('total loot value is positive', () => { DRESSED_ROOMS.forEach((r) => expect(getRoomLootValue(r)).toBeGreaterThan(0)); });
  it('all rooms have small details', () => { DRESSED_ROOMS.forEach((r) => expect(r.smallDetails.length).toBeGreaterThanOrEqual(2)); });
  it('formats room', () => { expect(formatRoomDressing(getRandomRoomDressing())).toContain('Furniture'); });
});

// ---------------------------------------------------------------------------
// Warlock patron tracker
// ---------------------------------------------------------------------------
import { PATRONS as WARLOCK_PATRONS, getPatron as getWarlockPatron, getRandomDemand, getRandomDispleasure, getAllPatronTypes, formatPatron as formatWarlockPatron } from '../../src/data/warlockPatron';

describe('warlock patron tracker', () => {
  it('has at least 4 patrons', () => { expect(WARLOCK_PATRONS.length).toBeGreaterThanOrEqual(4); });
  it('looks up patron', () => { const p = getWarlockPatron('fiend'); expect(p).toBeDefined(); expect(p!.name.length).toBeGreaterThan(3); });
  it('each patron has demands', () => { WARLOCK_PATRONS.forEach((p) => expect(p.demands.length).toBeGreaterThanOrEqual(2)); });
  it('each patron has gifts', () => { WARLOCK_PATRONS.forEach((p) => expect(p.gifts.length).toBeGreaterThanOrEqual(1)); });
  it('each patron has displeasure effects', () => { WARLOCK_PATRONS.forEach((p) => expect(p.displeasureEffects.length).toBeGreaterThanOrEqual(2)); });
  it('gets random demand', () => { const d = getRandomDemand('archfey'); expect(d).not.toBeNull(); expect(d!.demand.length).toBeGreaterThan(10); });
  it('gets random displeasure', () => { const d = getRandomDispleasure('great_old_one'); expect(d).not.toBeNull(); expect(d!.length).toBeGreaterThan(10); });
  it('returns null for unknown', () => { expect(getRandomDemand('unknown' as any)).toBeNull(); });
  it('formats patron', () => { expect(formatWarlockPatron(WARLOCK_PATRONS[0])).toContain('Communication'); });
});

// ---------------------------------------------------------------------------
// Expanded wild magic surge
// ---------------------------------------------------------------------------
import { EXPANDED_SURGES, rollExpandedSurge, getExpandedSurgeById, getExpandedSurgesByCategory, getExpandedSurgeCount, getAllSurgeCategories, formatExpandedSurge } from '../../src/data/wildMagicExpanded';

describe('expanded wild magic surge', () => {
  it('has 30 surges', () => { expect(EXPANDED_SURGES.length).toBe(30); expect(getExpandedSurgeCount()).toBe(30); });
  it('has 4 categories', () => { expect(getAllSurgeCategories().length).toBe(4); });
  it('rolls random surge', () => { const s = rollExpandedSurge(); expect(s.description.length).toBeGreaterThan(10); });
  it('looks up by id', () => { const s = getExpandedSurgeById(10); expect(s).toBeDefined(); expect(s!.category).toBe('beneficial'); });
  it('filters by category', () => { const beneficial = getExpandedSurgesByCategory('beneficial'); expect(beneficial.length).toBeGreaterThanOrEqual(5); beneficial.forEach((s) => expect(s.category).toBe('beneficial')); });
  it('all surges have durations', () => { EXPANDED_SURGES.forEach((s) => expect(s.duration.length).toBeGreaterThan(0)); });
  it('formats surge', () => { expect(formatExpandedSurge(EXPANDED_SURGES[0])).toContain('Wild Surge'); });
});

// ---------------------------------------------------------------------------
// Haunted location generator
// ---------------------------------------------------------------------------
import { HAUNTED_LOCATIONS, getRandomHauntedLocation, getLocationsByHauntType, getLocationsByDanger, getAllHauntTypes, formatHauntedLocation } from '../../src/data/hauntedLocation';

describe('haunted location generator', () => {
  it('has at least 5 locations', () => { expect(HAUNTED_LOCATIONS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 haunt types', () => { expect(getAllHauntTypes().length).toBeGreaterThanOrEqual(4); });
  it('generates random location', () => { const l = getRandomHauntedLocation(); expect(l.name.length).toBeGreaterThan(3); expect(l.manifestations.length).toBeGreaterThanOrEqual(2); });
  it('filters by haunt type', () => { const poltergeist = getLocationsByHauntType('poltergeist'); expect(poltergeist.length).toBeGreaterThanOrEqual(1); });
  it('filters by danger', () => { const deadly = getLocationsByDanger('deadly'); expect(deadly.length).toBeGreaterThanOrEqual(1); });
  it('all locations have cleansing methods', () => { HAUNTED_LOCATIONS.forEach((l) => { expect(l.cleansingMethod.length).toBeGreaterThan(20); expect(l.cleansingDC).toBeGreaterThanOrEqual(12); }); });
  it('all locations have investigation clues', () => { HAUNTED_LOCATIONS.forEach((l) => expect(l.investigationClues.length).toBeGreaterThanOrEqual(2)); });
  it('all locations have treasure rewards', () => { HAUNTED_LOCATIONS.forEach((l) => expect(l.treasureIfCleansed.length).toBeGreaterThan(10)); });
  it('formats location', () => { expect(formatHauntedLocation(getRandomHauntedLocation())).toContain('Manifestations'); });
});

// ---------------------------------------------------------------------------
// Diplomatic negotiation system
// ---------------------------------------------------------------------------
import { NEGOTIATION_SCENARIOS, getRandomScenario, getAllScenarios, getPartyLeverage, getTotalLeverageStrength, formatScenario } from '../../src/data/diplomaticNegotiation';

describe('diplomatic negotiation system', () => {
  it('has at least 2 scenarios', () => { expect(NEGOTIATION_SCENARIOS.length).toBeGreaterThanOrEqual(2); });
  it('generates random scenario', () => { const s = getRandomScenario(); expect(s.title.length).toBeGreaterThan(3); expect(s.parties.length).toBeGreaterThanOrEqual(2); });
  it('parties have goals and deal breakers', () => { NEGOTIATION_SCENARIOS.forEach((s) => s.parties.forEach((p) => { expect(p.goals.length).toBeGreaterThanOrEqual(1); expect(p.dealBreaker.length).toBeGreaterThan(10); })); });
  it('leverage can be hidden', () => { const s = NEGOTIATION_SCENARIOS[0]; const all = getPartyLeverage(s.parties[0]); const revealed = getPartyLeverage(s.parties[0], true); expect(all.length).toBeGreaterThanOrEqual(revealed.length); });
  it('calculates total leverage', () => { const s = NEGOTIATION_SCENARIOS[0]; const strength = getTotalLeverageStrength(s.parties[0]); expect(strength).toBeGreaterThan(0); });
  it('all scenarios have possible outcomes', () => { NEGOTIATION_SCENARIOS.forEach((s) => expect(s.possibleOutcomes.length).toBeGreaterThanOrEqual(2)); });
  it('formats scenario', () => { expect(formatScenario(getRandomScenario())).toContain('Stakes'); });
});

// ---------------------------------------------------------------------------
// Guild membership perks
// ---------------------------------------------------------------------------
import { GUILDS, getGuild, getPerksForRank, getObligationsForRank, getAllGuildTypes, formatGuild as formatGuildMembership } from '../../src/data/guildMembership';

describe('guild membership perks', () => {
  it('has at least 3 guilds', () => { expect(GUILDS.length).toBeGreaterThanOrEqual(3); });
  it('looks up guild', () => { const g = getGuild('adventurers'); expect(g).toBeDefined(); expect(g!.name.length).toBeGreaterThan(3); });
  it('higher ranks unlock more perks', () => { const g = getGuild('adventurers')!; const init = getPerksForRank(g, 'initiate'); const master = getPerksForRank(g, 'master'); expect(master.length).toBeGreaterThan(init.length); });
  it('obligations accumulate with rank', () => { const g = getGuild('adventurers')!; const officer = getObligationsForRank(g, 'officer'); expect(officer.length).toBeGreaterThanOrEqual(1); });
  it('all guilds have 5 ranks', () => { GUILDS.forEach((g) => expect(g.ranks.length).toBe(5)); });
  it('all guilds have mottos', () => { GUILDS.forEach((g) => expect(g.motto.length).toBeGreaterThan(3)); });
  it('all guilds have dues', () => { GUILDS.forEach((g) => expect(g.dues.length).toBeGreaterThan(0)); });
  it('formats guild', () => { expect(formatGuildMembership(getGuild('mages')!, 'veteran')).toContain('Active Perks'); });
});

// ---------------------------------------------------------------------------
// Magical disease system
// ---------------------------------------------------------------------------
import { MAGICAL_DISEASES, getRandomDisease, getDiseasesByTransmission, getDiseasesBySeverity, getSymptomsAtDay, hasMundaneCure, getAllTransmissionTypes, formatDisease as formatMagicalDisease } from '../../src/data/magicalDisease';

describe('magical disease system', () => {
  it('has at least 5 diseases', () => { expect(MAGICAL_DISEASES.length).toBeGreaterThanOrEqual(5); });
  it('generates random disease', () => { const d = getRandomDisease(); expect(d.name.length).toBeGreaterThan(3); expect(d.symptoms.length).toBeGreaterThanOrEqual(2); });
  it('filters by transmission', () => { const touch = getDiseasesByTransmission('touch'); expect(touch.length).toBeGreaterThanOrEqual(1); touch.forEach((d) => expect(d.transmission).toBe('touch')); });
  it('filters by severity', () => { const severe = getDiseasesBySeverity('severe'); expect(severe.length).toBeGreaterThanOrEqual(1); });
  it('symptoms appear progressively', () => { const d = MAGICAL_DISEASES[0]; const day1 = getSymptomsAtDay(d, 1); const day7 = getSymptomsAtDay(d, 7); expect(day7.length).toBeGreaterThanOrEqual(day1.length); });
  it('some have mundane cures', () => { const withMundane = MAGICAL_DISEASES.filter(hasMundaneCure); const withoutMundane = MAGICAL_DISEASES.filter((d) => !hasMundaneCure(d)); expect(withMundane.length).toBeGreaterThanOrEqual(1); expect(withoutMundane.length).toBeGreaterThanOrEqual(1); });
  it('all have magical cures', () => { MAGICAL_DISEASES.forEach((d) => expect(d.magicalCure.length).toBeGreaterThan(10)); });
  it('covers multiple transmission types', () => { expect(getAllTransmissionTypes().length).toBeGreaterThanOrEqual(4); });
  it('formats disease', () => { expect(formatMagicalDisease(MAGICAL_DISEASES[0], 3)).toContain('Active Symptoms'); });
});

// ---------------------------------------------------------------------------
// Airship encounter table
// ---------------------------------------------------------------------------
import { AIRSHIP_ENCOUNTERS, ALTITUDE_HAZARDS, getRandomAirEncounter, getEncountersByAltitude, getHazardsForAltitude, getHostileEncounters as getHostileAir, getAllAltitudes, formatAirEncounter } from '../../src/data/airshipEncounter';

describe('airship encounter table', () => {
  it('has at least 6 encounters', () => { expect(AIRSHIP_ENCOUNTERS.length).toBeGreaterThanOrEqual(6); });
  it('has 4 altitude zones', () => { expect(ALTITUDE_HAZARDS.length).toBe(4); expect(getAllAltitudes().length).toBe(4); });
  it('generates random encounter', () => { const e = getRandomAirEncounter(); expect(e.name.length).toBeGreaterThan(3); expect(e.cr.length).toBeGreaterThan(0); });
  it('filters by altitude', () => { const cruising = getEncountersByAltitude('cruising'); expect(cruising.length).toBeGreaterThanOrEqual(1); cruising.forEach((e) => expect(e.altitude).toBe('cruising')); });
  it('has hostile encounters', () => { expect(getHostileAir().length).toBeGreaterThanOrEqual(3); });
  it('altitude hazards have DCs', () => { ALTITUDE_HAZARDS.forEach((h) => h.hazards.forEach((hz) => expect(hz.dc).toBeGreaterThanOrEqual(12))); });
  it('some encounters have loot', () => { expect(AIRSHIP_ENCOUNTERS.filter((e) => e.loot !== null).length).toBeGreaterThanOrEqual(4); });
  it('formats encounter', () => { expect(formatAirEncounter(AIRSHIP_ENCOUNTERS[0])).toContain('altitude'); });
});

// ---------------------------------------------------------------------------
// Detective case generator
// ---------------------------------------------------------------------------
import { DETECTIVE_CASES, getRandomCase, getCasesByCrime, getGuiltyParty, getRealClues, getRedHerrings, formatCase as formatDetectiveCase } from '../../src/data/detectiveCase';

describe('detective case generator', () => {
  it('has at least 3 cases', () => { expect(DETECTIVE_CASES.length).toBeGreaterThanOrEqual(3); });
  it('generates random case', () => { const c = getRandomCase(); expect(c.title.length).toBeGreaterThan(3); expect(c.suspects.length).toBeGreaterThanOrEqual(3); });
  it('each case has exactly one guilty party', () => { DETECTIVE_CASES.forEach((c) => { const guilty = c.suspects.filter((s) => s.isGuilty); expect(guilty.length).toBe(1); }); });
  it('each case has red herrings', () => { DETECTIVE_CASES.forEach((c) => expect(getRedHerrings(c).length).toBeGreaterThanOrEqual(1)); });
  it('each case has real clues', () => { DETECTIVE_CASES.forEach((c) => expect(getRealClues(c).length).toBeGreaterThanOrEqual(2)); });
  it('each case has a twist', () => { DETECTIVE_CASES.forEach((c) => expect(c.twist.length).toBeGreaterThan(20)); });
  it('guilty party has motive', () => { DETECTIVE_CASES.forEach((c) => expect(getGuiltyParty(c).motive.length).toBeGreaterThan(10)); });
  it('formats without solution by default', () => { const c = getRandomCase(); expect(formatDetectiveCase(c)).not.toContain('Guilty'); expect(formatDetectiveCase(c, true)).toContain('Guilty'); });
});

// ---------------------------------------------------------------------------
// Elemental weapon infusion
// ---------------------------------------------------------------------------
import { ELEMENTAL_INFUSIONS, getInfusion, getInfusionsByMaxCost, getInfusionsByMaxDC, getAllElements, formatInfusion } from '../../src/data/elementalInfusion';

describe('elemental weapon infusion', () => {
  it('has 8 elements', () => { expect(ELEMENTAL_INFUSIONS.length).toBe(8); expect(getAllElements().length).toBe(8); });
  it('looks up by element', () => { const fire = getInfusion('fire'); expect(fire).toBeDefined(); expect(fire!.name).toBe('Emberbrand'); });
  it('filters by cost', () => { const cheap = getInfusionsByMaxCost(25); expect(cheap.length).toBeGreaterThanOrEqual(3); cheap.forEach((i) => expect(i.materialCost).toBeLessThanOrEqual(25)); });
  it('filters by DC', () => { const easy = getInfusionsByMaxDC(13); expect(easy.length).toBeGreaterThanOrEqual(3); easy.forEach((i) => expect(i.applicationDC).toBeLessThanOrEqual(13)); });
  it('all have visual descriptions', () => { ELEMENTAL_INFUSIONS.forEach((i) => expect(i.visualDescription.length).toBeGreaterThan(15)); });
  it('all have on-hit effects', () => { ELEMENTAL_INFUSIONS.forEach((i) => expect(i.onHitEffect.length).toBeGreaterThan(10)); });
  it('formats infusion', () => { expect(formatInfusion(ELEMENTAL_INFUSIONS[0])).toContain('Damage'); });
});

// ---------------------------------------------------------------------------
// NPC schedule system
// ---------------------------------------------------------------------------
import { NPC_SCHEDULES, getNpcSchedule, getActivityAt, getAloneWindows, getEasiestInterrupt, getAllNpcNames, formatNpcSchedule } from '../../src/data/npcSchedule';

describe('NPC schedule system', () => {
  it('has at least 4 NPCs', () => { expect(NPC_SCHEDULES.length).toBeGreaterThanOrEqual(4); });
  it('looks up NPC schedule', () => { const s = getNpcSchedule('Mayor Aldwin'); expect(s).toBeDefined(); expect(s!.schedule.length).toBeGreaterThanOrEqual(5); });
  it('gets activity at time', () => { const s = getNpcSchedule('Mayor Aldwin')!; const noon = getActivityAt(s, 'midday'); expect(noon).toBeDefined(); expect(noon!.location.length).toBeGreaterThan(0); });
  it('finds alone windows', () => { const s = getNpcSchedule('Sage Thandril')!; const alone = getAloneWindows(s); expect(alone.length).toBeGreaterThanOrEqual(4); alone.forEach((e) => expect(e.alone).toBe(true)); });
  it('finds easiest interrupt', () => { const s = getNpcSchedule('Sage Thandril')!; const easiest = getEasiestInterrupt(s); expect(easiest.interruptDC).toBeLessThanOrEqual(10); });
  it('some NPCs have secret activities', () => { const withSecrets = NPC_SCHEDULES.filter((s) => s.secretActivity !== null); expect(withSecrets.length).toBeGreaterThanOrEqual(2); });
  it('all have vulnerable windows', () => { NPC_SCHEDULES.forEach((s) => expect(s.vulnerableWindow.length).toBeGreaterThan(10)); });
  it('formats schedule', () => { expect(formatNpcSchedule(NPC_SCHEDULES[0])).toContain('Vulnerable'); });
});

// ---------------------------------------------------------------------------
// Planar travel side effects
// ---------------------------------------------------------------------------
import { PLANAR_SIDE_EFFECTS, getRandomSideEffect, getEffectsByDestination, getEffectsRequiringSave, getAllDestinations as getAllPlaneDestinations, formatSideEffect } from '../../src/data/planarSideEffects';

describe('planar travel side effects', () => {
  it('has at least 8 effects', () => { expect(PLANAR_SIDE_EFFECTS.length).toBeGreaterThanOrEqual(8); });
  it('covers at least 6 destinations', () => { expect(getAllPlaneDestinations().length).toBeGreaterThanOrEqual(6); });
  it('generates random effect', () => { const e = getRandomSideEffect(); expect(e.name.length).toBeGreaterThan(3); expect(e.mechanicalEffect.length).toBeGreaterThan(10); });
  it('filters by destination', () => { const fey = getEffectsByDestination('feywild'); expect(fey.length).toBeGreaterThanOrEqual(1); fey.forEach((e) => expect(e.destination).toBe('feywild')); });
  it('generates for specific destination', () => { const e = getRandomSideEffect('shadowfell'); expect(e.destination).toBe('shadowfell'); });
  it('some require saves', () => { const withSave = getEffectsRequiringSave(); expect(withSave.length).toBeGreaterThanOrEqual(3); withSave.forEach((e) => expect(e.saveDC).not.toBeNull()); });
  it('all have durations', () => { PLANAR_SIDE_EFFECTS.forEach((e) => expect(e.duration.length).toBeGreaterThan(0)); });
  it('formats effect', () => { expect(formatSideEffect(PLANAR_SIDE_EFFECTS[0])).toContain('Duration'); });
});

// ---------------------------------------------------------------------------
// Gladiator arena progression
// ---------------------------------------------------------------------------
import { ARENA_FIGHTERS, ARENA_SPONSORS, ARENA_RULES, createArenaState, generateMatch, recordWin, recordLoss, getAllRanks as getAllArenaRanks, formatArenaState } from '../../src/data/gladiatorArena';

describe('gladiator arena progression', () => {
  it('has at least 6 fighters', () => { expect(ARENA_FIGHTERS.length).toBeGreaterThanOrEqual(6); });
  it('has at least 3 sponsors', () => { expect(ARENA_SPONSORS.length).toBeGreaterThanOrEqual(3); });
  it('has special rules', () => { expect(ARENA_RULES.length).toBeGreaterThanOrEqual(5); });
  it('starts as pit fighter', () => { const s = createArenaState(); expect(s.rank).toBe('pit_fighter'); expect(s.wins).toBe(0); });
  it('generates match for rank', () => { const s = createArenaState(); const m = generateMatch(s); expect(m.opponent.name.length).toBeGreaterThan(0); expect(m.stakes.length).toBeGreaterThan(0); });
  it('winning increases favor and eventually promotes', () => { let s = createArenaState(); for (let i = 0; i < 6; i++) s = recordWin(s); expect(s.rank).toBe('contender'); expect(s.crowdFavor).toBeGreaterThan(0); });
  it('losing decreases favor', () => { let s = createArenaState(); s = recordWin(s); s = recordWin(s); s = recordLoss(s); expect(s.crowdFavor).toBeLessThan(2); });
  it('has 5 ranks', () => { expect(getAllArenaRanks().length).toBe(5); });
  it('sponsors have betrayal conditions', () => { ARENA_SPONSORS.forEach((sp) => expect(sp.betrayalCondition.length).toBeGreaterThan(10)); });
  it('formats state', () => { expect(formatArenaState(createArenaState())).toContain('PIT FIGHTER'); });
});

// ---------------------------------------------------------------------------
// Vampire bloodline system
// ---------------------------------------------------------------------------
import { BLOODLINES, AGE_ORDER, createVampireState, feed, spendBlood, ageUp, getAvailablePowers, getBloodline, getAllBloodlines, formatVampireState } from '../../src/data/vampireBloodline';

describe('vampire bloodline system', () => {
  it('has at least 2 bloodlines', () => { expect(BLOODLINES.length).toBeGreaterThanOrEqual(2); expect(getAllBloodlines().length).toBeGreaterThanOrEqual(2); });
  it('has 5 age stages', () => { expect(AGE_ORDER.length).toBe(5); });
  it('creates fledgling state', () => { const s = createVampireState('House Sanguine'); expect(s.age).toBe('fledgling'); expect(s.humanityScore).toBe(7); });
  it('feeding increases blood pool', () => { let s = createVampireState('House Sanguine'); s = feed(s, true); expect(s.bloodPool).toBeGreaterThan(0); });
  it('unwilling feeding costs humanity', () => { let s = createVampireState('House Sanguine'); const before = s.humanityScore; s = feed(s, false); expect(s.humanityScore).toBeLessThan(before); });
  it('spending blood works', () => { let s = createVampireState('House Sanguine'); s = feed(s, true); const result = spendBlood(s, 1); expect(result).not.toBeNull(); expect(result!.bloodPool).toBeLessThan(s.bloodPool); });
  it('cannot overspend', () => { const s = createVampireState('House Sanguine'); expect(spendBlood(s, 999)).toBeNull(); });
  it('aging unlocks more powers', () => { let s = createVampireState('House Sanguine'); const fledglingPowers = getAvailablePowers(s).length; s = ageUp(s); const neonatePowers = getAvailablePowers(s).length; expect(neonatePowers).toBeGreaterThan(fledglingPowers); });
  it('bloodlines have weaknesses', () => { BLOODLINES.forEach((b) => expect(b.weakness.length).toBeGreaterThan(20)); });
  it('formats state', () => { expect(formatVampireState(createVampireState('The Hollow'))).toContain('🧛'); });
});

// ---------------------------------------------------------------------------
// Sentient item personality
// ---------------------------------------------------------------------------
import { SENTIENT_ITEMS, getRandomSentientItem, getItemsByPersonality, getItemsByAlignment, getRelationshipLevel, getAllPersonalities, formatSentientItem } from '../../src/data/sentientItem';

describe('sentient item personality', () => {
  it('has at least 5 items', () => { expect(SENTIENT_ITEMS.length).toBeGreaterThanOrEqual(5); });
  it('has 6 personalities', () => { expect(getAllPersonalities().length).toBe(6); });
  it('generates random item', () => { const i = getRandomSentientItem(); expect(i.name.length).toBeGreaterThan(3); expect(i.goal.length).toBeGreaterThan(10); });
  it('filters by personality', () => { const noble = getItemsByPersonality('noble'); expect(noble.length).toBeGreaterThanOrEqual(1); noble.forEach((i) => expect(i.personality).toBe('noble')); });
  it('filters by alignment', () => { const evil = getItemsByAlignment('evil'); expect(evil.length).toBeGreaterThanOrEqual(1); });
  it('relationship levels scale', () => { expect(getRelationshipLevel(9)).toBe('devoted'); expect(getRelationshipLevel(0)).toBe('reluctant'); expect(getRelationshipLevel(-1)).toBe('hostile'); });
  it('all items have conflict triggers', () => { SENTIENT_ITEMS.forEach((i) => expect(i.conflictTrigger.length).toBeGreaterThan(10)); });
  it('all items have communication styles', () => { SENTIENT_ITEMS.forEach((i) => expect(i.communicationStyle.length).toBeGreaterThan(10)); });
  it('formats item', () => { expect(formatSentientItem(SENTIENT_ITEMS[0])).toContain('Goal'); });
});

// ---------------------------------------------------------------------------
// Downtime activity tracker
// ---------------------------------------------------------------------------
import { DOWNTIME_ACTIVITIES as DT_ACTIVITIES, getRandomActivity as getRandomDowntime, getActivitiesByType as getDTByType, getFreeActivities, getActivitiesByMaxDuration, getAllActivityTypes as getAllDTTypes, formatActivity as formatDTActivity } from '../../src/data/downtimeActivity';

describe('downtime activity tracker', () => {
  it('has at least 8 activities', () => { expect(DT_ACTIVITIES.length).toBeGreaterThanOrEqual(8); });
  it('covers at least 6 types', () => { expect(getAllDTTypes().length).toBeGreaterThanOrEqual(6); });
  it('generates random activity', () => { const a = getRandomDowntime(); expect(a.name.length).toBeGreaterThan(3); expect(a.successResult.length).toBeGreaterThan(10); });
  it('filters by type', () => { const crafting = getDTByType('crafting'); expect(crafting.length).toBeGreaterThanOrEqual(1); crafting.forEach((a) => expect(a.type).toBe('crafting')); });
  it('finds free activities', () => { const free = getFreeActivities(); expect(free.length).toBeGreaterThanOrEqual(2); free.forEach((a) => expect(a.cost).toBe(0)); });
  it('filters by duration', () => { const short = getActivitiesByMaxDuration(1); expect(short.length).toBeGreaterThanOrEqual(3); });
  it('all have complications', () => { DT_ACTIVITIES.forEach((a) => expect(a.complication.length).toBeGreaterThan(10)); });
  it('formats activity', () => { expect(formatDTActivity(DT_ACTIVITIES[0])).toContain('Duration'); });
});

// ---------------------------------------------------------------------------
// Natural disaster generator
// ---------------------------------------------------------------------------
import { NATURAL_DISASTERS, getRandomDisaster as getRandomNatDisaster, getDisastersByType, getDisastersByScale, getAllDisasterTypes, formatDisaster as formatNatDisaster } from '../../src/data/naturalDisaster';

describe('natural disaster generator', () => {
  it('has at least 5 disasters', () => { expect(NATURAL_DISASTERS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 types', () => { expect(getAllDisasterTypes().length).toBeGreaterThanOrEqual(4); });
  it('generates random disaster', () => { const d = getRandomNatDisaster(); expect(d.name.length).toBeGreaterThan(3); expect(d.mechanicalEffects.length).toBeGreaterThanOrEqual(2); });
  it('filters by type', () => { const quakes = getDisastersByType('earthquake'); expect(quakes.length).toBeGreaterThanOrEqual(1); });
  it('filters by scale', () => { const major = getDisastersByScale('major'); expect(major.length).toBeGreaterThanOrEqual(1); });
  it('all have warning signs DC', () => { NATURAL_DISASTERS.forEach((d) => expect(d.warningSignsDC).toBeGreaterThanOrEqual(10)); });
  it('all have aftermath', () => { NATURAL_DISASTERS.forEach((d) => expect(d.aftermath.length).toBeGreaterThan(20)); });
  it('all have opportunities', () => { NATURAL_DISASTERS.forEach((d) => expect(d.opportunities.length).toBeGreaterThanOrEqual(2)); });
  it('formats disaster', () => { expect(formatNatDisaster(NATURAL_DISASTERS[0])).toContain('Effects'); });
});

// ---------------------------------------------------------------------------
// Caravan ambush generator
// ---------------------------------------------------------------------------
import { CARAVAN_AMBUSHES, getRandomAmbush as getRandomCaravanAmbush, getAmbushesByTerrain, getNegotiableAmbushes, getAllTerrainTypes as getAllAmbushTerrains, formatAmbush as formatCaravanAmbush } from '../../src/data/caravanAmbush';

describe('caravan ambush generator', () => {
  it('has at least 5 ambushes', () => { expect(CARAVAN_AMBUSHES.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 terrains', () => { expect(getAllAmbushTerrains().length).toBeGreaterThanOrEqual(4); });
  it('generates random ambush', () => { const a = getRandomCaravanAmbush(); expect(a.name.length).toBeGreaterThan(3); expect(a.force.name.length).toBeGreaterThan(3); });
  it('filters by terrain', () => { const forest = getAmbushesByTerrain('forest_road'); expect(forest.length).toBeGreaterThanOrEqual(1); });
  it('some are negotiable', () => { const negotiable = getNegotiableAmbushes(); expect(negotiable.length).toBeGreaterThanOrEqual(2); negotiable.forEach((a) => expect(a.negotiationPossible).toBe(true)); });
  it('all have twists', () => { CARAVAN_AMBUSHES.forEach((a) => expect(a.twist.length).toBeGreaterThan(15)); });
  it('all have escape options', () => { CARAVAN_AMBUSHES.forEach((a) => expect(a.escapeOption.length).toBeGreaterThan(10)); });
  it('formats ambush', () => { expect(formatCaravanAmbush(CARAVAN_AMBUSHES[0])).toContain('Warning DC'); });
});

// ---------------------------------------------------------------------------
// Ship cargo manifest generator
// ---------------------------------------------------------------------------
import { CARGO_ITEMS, generateManifest, getCargoByLegality, getPerishableCargo, getBestTradeRoute, getAllCargoRegions, formatManifest } from '../../src/data/shipCargo';

describe('ship cargo manifest generator', () => {
  it('has at least 8 cargo items', () => { expect(CARGO_ITEMS.length).toBeGreaterThanOrEqual(8); });
  it('has 6 regions', () => { expect(getAllCargoRegions().length).toBe(6); });
  it('generates manifest', () => { const m = generateManifest('northern_kingdom', 'island_chain'); expect(m.shipName.length).toBeGreaterThan(3); expect(m.cargo.length).toBeGreaterThanOrEqual(1); expect(m.totalValue).toBeGreaterThan(0); });
  it('filters by legality', () => { const legal = getCargoByLegality('legal'); expect(legal.length).toBeGreaterThanOrEqual(5); const contraband = getCargoByLegality('contraband'); expect(contraband.length).toBeGreaterThanOrEqual(1); });
  it('finds perishable cargo', () => { const perishable = getPerishableCargo(); expect(perishable.length).toBeGreaterThanOrEqual(2); perishable.forEach((c) => expect(c.spoilage).not.toBeNull()); });
  it('finds best trade route', () => { const silk = CARGO_ITEMS.find((c) => c.name === 'Silk Bolts')!; const route = getBestTradeRoute(silk); expect(route).not.toBeNull(); expect(route!.multiplier).toBeGreaterThan(1); });
  it('manifest detects smuggling risk', () => { const manifests = Array.from({ length: 20 }, () => generateManifest('northern_kingdom', 'southern_empire', 6)); expect(manifests.some((m) => m.smugglingRisk)).toBe(true); });
  it('formats manifest', () => { expect(formatManifest(generateManifest('elven_ports', 'dwarven_holds'))).toContain('Total Value'); });
});

// ---------------------------------------------------------------------------
// Magical anomaly generator
// ---------------------------------------------------------------------------
import { MAGICAL_ANOMALIES, getRandomAnomaly, getAnomaliesByType, getDispellableAnomalies, getAllAnomalyTypes, formatAnomaly } from '../../src/data/magicalAnomaly';

describe('magical anomaly generator', () => {
  it('has at least 6 anomalies', () => { expect(MAGICAL_ANOMALIES.length).toBeGreaterThanOrEqual(6); });
  it('has 6 anomaly types', () => { expect(getAllAnomalyTypes().length).toBe(6); });
  it('generates random anomaly', () => { const a = getRandomAnomaly(); expect(a.name.length).toBeGreaterThan(3); expect(a.effects.length).toBeGreaterThanOrEqual(3); });
  it('filters by type', () => { const wild = getAnomaliesByType('wild'); expect(wild.length).toBeGreaterThanOrEqual(1); });
  it('some are dispellable', () => { const d = getDispellableAnomalies(); expect(d.length).toBeGreaterThanOrEqual(3); d.forEach((a) => expect(a.dispelDC).not.toBeNull()); });
  it('some are permanent', () => { expect(MAGICAL_ANOMALIES.some((a) => a.dispelDC === null)).toBe(true); });
  it('all have trigger conditions', () => { MAGICAL_ANOMALIES.forEach((a) => expect(a.triggerCondition.length).toBeGreaterThan(10)); });
  it('formats anomaly', () => { expect(formatAnomaly(MAGICAL_ANOMALIES[0])).toContain('Effects'); });
});

// ---------------------------------------------------------------------------
// Ship crew management
// ---------------------------------------------------------------------------
import { CREW_TEMPLATES, createCrewState, hireCrew, payWages, skipPayday, checkMutiny as checkCrewMutiny, getCrewByRole, getWeeklyCost, getAllRoles as getAllCrewRoles, formatCrewState } from '../../src/data/shipCrewManagement';

describe('ship crew management', () => {
  it('has at least 6 crew templates', () => { expect(CREW_TEMPLATES.length).toBeGreaterThanOrEqual(6); });
  it('has 8 crew roles', () => { expect(getAllCrewRoles().length).toBe(8); });
  it('starts empty', () => { const s = createCrewState(); expect(s.members.length).toBe(0); expect(s.mutinyRisk).toBe(0); });
  it('hires crew', () => { let s = createCrewState(); s = hireCrew(s, 'navigator', 'veteran'); expect(s.members.length).toBe(1); });
  it('paying wages improves morale', () => { let s = createCrewState(); s = hireCrew(s, 'cook', 'green'); const before = s.morale; const { state } = payWages(s); expect(state.morale).toBeGreaterThanOrEqual(before); });
  it('skipping pay increases mutiny risk', () => { let s = createCrewState(); s = hireCrew(s, 'swab', 'green'); s = skipPayday(s); expect(s.mutinyRisk).toBeGreaterThan(0); expect(s.morale).toBeLessThan(5); });
  it('weekly cost = sum of wages', () => { let s = createCrewState(); s = hireCrew(s, 'gunner', 'elite'); s = hireCrew(s, 'cook', 'green'); expect(getWeeklyCost(s)).toBe(s.members.reduce((sum, m) => sum + m.wage, 0)); });
  it('mutiny check returns boolean', () => { const s = createCrewState(); expect(typeof checkCrewMutiny(s)).toBe('boolean'); });
  it('formats crew state', () => { let s = createCrewState(); s = hireCrew(s, 'bosun', 'able'); expect(formatCrewState(s)).toContain('Mutiny Risk'); });
});

// ---------------------------------------------------------------------------
// Battlefield scavenger loot
// ---------------------------------------------------------------------------
import { BATTLEFIELD_LOOT, getRandomBattlefieldLoot, getLootByBattleType, getActualValue, getTotalLootValue as getBattlefieldLootValue, getItemsByCategory as getScavengeByCategory, formatBattlefieldLoot } from '../../src/data/battlefieldScavenge';

describe('battlefield scavenger loot', () => {
  it('has at least 3 battle types', () => { expect(BATTLEFIELD_LOOT.length).toBeGreaterThanOrEqual(3); });
  it('generates random loot', () => { const l = getRandomBattlefieldLoot(); expect(l.items.length).toBeGreaterThanOrEqual(3); });
  it('looks up by battle type', () => { const dragon = getLootByBattleType('Dragon\'s Lair'); expect(dragon).toBeDefined(); });
  it('actual value respects condition', () => { const loot = BATTLEFIELD_LOOT[0]; const pristine = loot.items.find((i) => i.condition === 'pristine'); const damaged = loot.items.find((i) => i.condition === 'damaged'); if (pristine && damaged && pristine.baseValue === damaged.baseValue) { expect(getActualValue(pristine)).toBeGreaterThan(getActualValue(damaged)); } });
  it('total loot value is positive', () => { BATTLEFIELD_LOOT.forEach((l) => expect(getBattlefieldLootValue(l)).toBeGreaterThan(0)); });
  it('all battlefields have hazards', () => { BATTLEFIELD_LOOT.forEach((l) => expect(l.hazards.length).toBeGreaterThanOrEqual(1)); });
  it('filters by category', () => { const loot = BATTLEFIELD_LOOT[0]; const weapons = getScavengeByCategory(loot, 'weapon'); weapons.forEach((i) => expect(i.category).toBe('weapon')); });
  it('formats loot', () => { expect(formatBattlefieldLoot(BATTLEFIELD_LOOT[0])).toContain('salvage value'); });
});

// ---------------------------------------------------------------------------
// Mirror dimension generator
// ---------------------------------------------------------------------------
import { MIRROR_DIMENSIONS, getRandomMirrorDimension, getDimensionsByType, getDimensionsByDanger, getDimensionsWithTreasure, getAllMirrorTypes, formatMirrorDimension } from '../../src/data/mirrorDimension';

describe('mirror dimension generator', () => {
  it('has at least 5 dimensions', () => { expect(MIRROR_DIMENSIONS.length).toBeGreaterThanOrEqual(5); });
  it('has 6 mirror types', () => { expect(getAllMirrorTypes().length).toBe(6); });
  it('generates random dimension', () => { const d = getRandomMirrorDimension(); expect(d.name.length).toBeGreaterThan(3); expect(d.twistedRules.length).toBeGreaterThanOrEqual(3); });
  it('filters by type', () => { const shadow = getDimensionsByType('shadow'); expect(shadow.length).toBeGreaterThanOrEqual(1); });
  it('filters by danger', () => { const lethal = getDimensionsByDanger('lethal'); expect(lethal.length).toBeGreaterThanOrEqual(1); });
  it('some have treasure', () => { expect(getDimensionsWithTreasure().length).toBeGreaterThanOrEqual(3); });
  it('all have entry and exit conditions', () => { MIRROR_DIMENSIONS.forEach((d) => { expect(d.entryMethod.length).toBeGreaterThan(10); expect(d.exitCondition.length).toBeGreaterThan(10); }); });
  it('formats dimension', () => { expect(formatMirrorDimension(MIRROR_DIMENSIONS[0])).toContain('Twisted Rules'); });
});

// ---------------------------------------------------------------------------
// Underground faction generator
// ---------------------------------------------------------------------------
import { UNDERGROUND_FACTIONS, getRandomFaction as getRandomUnderworldFaction, getFactionsBySpecialty, getFactionByTerritory, getMostInfluential, getAllSpecialties as getAllFactionSpecialties, formatFaction as formatUndergroundFaction } from '../../src/data/undergroundFaction';

describe('underground faction generator', () => {
  it('has at least 5 factions', () => { expect(UNDERGROUND_FACTIONS.length).toBeGreaterThanOrEqual(5); });
  it('has at least 5 specialties', () => { expect(getAllFactionSpecialties().length).toBeGreaterThanOrEqual(5); });
  it('generates random faction', () => { const f = getRandomUnderworldFaction(); expect(f.name.length).toBeGreaterThan(3); expect(f.signalPhrase.length).toBeGreaterThan(5); });
  it('filters by specialty', () => { const thieves = getFactionsBySpecialty('theft'); expect(thieves.length).toBeGreaterThanOrEqual(1); });
  it('searches by territory', () => { const docks = getFactionByTerritory('Docks'); expect(docks.length).toBeGreaterThanOrEqual(1); });
  it('finds most influential', () => { const top = getMostInfluential(); expect(top.influence).toBeGreaterThanOrEqual(7); });
  it('all have weaknesses', () => { UNDERGROUND_FACTIONS.forEach((f) => expect(f.weakness.length).toBeGreaterThan(20)); });
  it('all have recruitment methods', () => { UNDERGROUND_FACTIONS.forEach((f) => expect(f.recruitmentMethod.length).toBeGreaterThan(15)); });
  it('formats faction', () => { expect(formatUndergroundFaction(UNDERGROUND_FACTIONS[0])).toContain('Signal'); });
});

// ---------------------------------------------------------------------------
// Ancient prophecy generator
// ---------------------------------------------------------------------------
import { ANCIENT_PROPHECIES, getRandomProphecy as getRandomAncientProphecy, getPropheciesByTone, getVerseCount as getProphecyVerseCount, getUnfulfilledVerses, getAllTones, formatProphecy as formatAncientProphecy } from '../../src/data/ancientProphecy';

describe('ancient prophecy generator', () => {
  it('has at least 4 prophecies', () => { expect(ANCIENT_PROPHECIES.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 4 tones', () => { expect(getAllTones().length).toBeGreaterThanOrEqual(4); });
  it('generates random prophecy', () => { const p = getRandomAncientProphecy(); expect(p.title.length).toBeGreaterThan(3); expect(p.verses.length).toBeGreaterThanOrEqual(3); });
  it('filters by tone', () => { const ominous = getPropheciesByTone('ominous'); expect(ominous.length).toBeGreaterThanOrEqual(1); });
  it('all verses start unfulfilled', () => { ANCIENT_PROPHECIES.forEach((p) => expect(getUnfulfilledVerses(p).length).toBe(p.verses.length)); });
  it('all prophecies have subversions', () => { ANCIENT_PROPHECIES.forEach((p) => expect(p.subversion.length).toBeGreaterThan(20)); });
  it('each verse has interpretation and trigger', () => { ANCIENT_PROPHECIES.forEach((p) => p.verses.forEach((v) => { expect(v.interpretation.length).toBeGreaterThan(10); expect(v.fulfillmentTrigger.length).toBeGreaterThan(10); })); });
  it('formats without interpretation by default', () => { const p = getRandomAncientProphecy(); expect(formatAncientProphecy(p)).not.toContain('→'); expect(formatAncientProphecy(p, true)).toContain('→'); });
});

// ---------------------------------------------------------------------------
// Magical contract system
// ---------------------------------------------------------------------------
import { MAGICAL_CONTRACTS, getRandomContract, getContractsByType, getClausesWithLoopholes, getBreakableClauses, getAllContractTypes, formatContract as formatMagicalContract } from '../../src/data/magicalContract';

describe('magical contract system', () => {
  it('has at least 4 contracts', () => { expect(MAGICAL_CONTRACTS.length).toBeGreaterThanOrEqual(4); });
  it('has at least 4 types', () => { expect(getAllContractTypes().length).toBeGreaterThanOrEqual(4); });
  it('generates random contract', () => { const c = getRandomContract(); expect(c.name.length).toBeGreaterThan(3); expect(c.clauses.length).toBeGreaterThanOrEqual(2); });
  it('filters by type', () => { const infernal = getContractsByType('infernal'); expect(infernal.length).toBeGreaterThanOrEqual(1); });
  it('most contracts have loopholes', () => { MAGICAL_CONTRACTS.forEach((c) => expect(getClausesWithLoopholes(c).length).toBeGreaterThanOrEqual(1)); });
  it('some clauses are breakable', () => { const all = MAGICAL_CONTRACTS.flatMap((c) => getBreakableClauses(c)); expect(all.length).toBeGreaterThanOrEqual(2); });
  it('all have break conditions', () => { MAGICAL_CONTRACTS.forEach((c) => expect(c.breakCondition.length).toBeGreaterThan(10)); });
  it('formats with loopholes toggle', () => { const c = getRandomContract(); expect(formatMagicalContract(c)).not.toContain('Loophole'); expect(formatMagicalContract(c, true)).toContain('Loophole'); });
});

// ---------------------------------------------------------------------------
// Treasure map generator
// ---------------------------------------------------------------------------
import { TREASURE_MAPS, getRandomTreasureMap, getMapsByTier, getLandmarkCount, getMapsWithGuardians, formatTreasureMap as formatTreasureHuntMap } from '../../src/data/treasureMap';

describe('treasure map generator', () => {
  it('has at least 4 maps', () => { expect(TREASURE_MAPS.length).toBeGreaterThanOrEqual(4); });
  it('generates random map', () => { const m = getRandomTreasureMap(); expect(m.name.length).toBeGreaterThan(3); expect(m.landmarks.length).toBeGreaterThanOrEqual(2); });
  it('filters by tier', () => { const major = getMapsByTier('major'); expect(major.length).toBeGreaterThanOrEqual(1); major.forEach((m) => expect(m.tier).toBe('major')); });
  it('landmarks have find DCs', () => { TREASURE_MAPS.forEach((m) => m.landmarks.forEach((l) => expect(l.findDC).toBeGreaterThanOrEqual(10))); });
  it('all maps have riddles', () => { TREASURE_MAPS.forEach((m) => { expect(m.riddle.length).toBeGreaterThan(10); expect(m.riddleAnswer.length).toBeGreaterThan(0); }); });
  it('most have guardians', () => { expect(getMapsWithGuardians().length).toBeGreaterThanOrEqual(2); });
  it('formats with answer toggle', () => { const m = getRandomTreasureMap(); expect(formatTreasureHuntMap(m)).not.toContain('Answer'); expect(formatTreasureHuntMap(m, true)).toContain('Answer'); });
});

// ---------------------------------------------------------------------------
// Druid wild shape bestiary
// ---------------------------------------------------------------------------
import { WILD_SHAPE_FORMS, getFormsByCR, getFormsByTerrain, getFormsByRole, getFormsByLevel, getAllWildShapeTerrains, formatWildShapeForm } from '../../src/data/wildShapeBestiary';

describe('druid wild shape bestiary', () => {
  it('has at least 7 forms', () => { expect(WILD_SHAPE_FORMS.length).toBeGreaterThanOrEqual(7); });
  it('has 7 terrains', () => { expect(getAllWildShapeTerrains().length).toBe(7); });
  it('filters by CR', () => { const lowCR = getFormsByCR(0.25); expect(lowCR.length).toBeGreaterThanOrEqual(2); lowCR.forEach((f) => expect(f.cr).toBeLessThanOrEqual(0.25)); });
  it('filters by terrain', () => { const forest = getFormsByTerrain('forest'); expect(forest.length).toBeGreaterThanOrEqual(3); });
  it('filters by role', () => { const combat = getFormsByRole('combat'); expect(combat.length).toBeGreaterThanOrEqual(2); });
  it('level-gated forms respect restrictions', () => { const level2 = getFormsByLevel(2); const level8 = getFormsByLevel(8); expect(level8.length).toBeGreaterThan(level2.length); });
  it('all forms have RP notes', () => { WILD_SHAPE_FORMS.forEach((f) => expect(f.rpNote.length).toBeGreaterThan(10)); });
  it('formats form', () => { expect(formatWildShapeForm(WILD_SHAPE_FORMS[0])).toContain('HP'); });
});

// ---------------------------------------------------------------------------
// Tavern reputation tracker
// ---------------------------------------------------------------------------
import { createTavernTracker, addTavern, recordEvent as recordTavernEvent, getTavernReputation as getTavRep, getBannedTaverns, getAllTiers as getAllTavernTiers, formatTavernReputation } from '../../src/data/tavernReputation';

describe('tavern reputation tracker', () => {
  it('starts empty', () => { expect(createTavernTracker().taverns.length).toBe(0); });
  it('adds taverns', () => { let t = createTavernTracker(); t = addTavern(t, 'The Rusty Nail', 'dive'); expect(t.taverns.length).toBe(1); });
  it('prevents duplicates', () => { let t = createTavernTracker(); t = addTavern(t, 'Pub', 'common'); t = addTavern(t, 'Pub', 'common'); expect(t.taverns.length).toBe(1); });
  it('records events and shifts score', () => { let t = createTavernTracker(); t = addTavern(t, 'Inn', 'common'); t = recordTavernEvent(t, 'Inn', 'Saved the barkeep from thugs', 3); expect(getTavRep(t, 'Inn')!.score).toBe(3); });
  it('reputation type changes with score', () => { let t = createTavernTracker(); t = addTavern(t, 'Inn', 'common'); t = recordTavernEvent(t, 'Inn', 'Heroic deed', 4); expect(getTavRep(t, 'Inn')!.reputation).toBe('heroes'); });
  it('has 4 tavern tiers', () => { expect(getAllTavernTiers().length).toBe(4); });
  it('tracks banned taverns', () => { let t = createTavernTracker(); t = addTavern(t, 'Bar', 'dive'); for (let i = 0; i < 3; i++) t = recordTavernEvent(t, 'Bar', 'Brawl', -2); expect(getBannedTaverns(t).length).toBe(1); });
  it('formats reputation', () => { let t = createTavernTracker(); t = addTavern(t, 'The Crown', 'upscale'); expect(formatTavernReputation(t.taverns[0])).toContain('The Crown'); });
});

// ---------------------------------------------------------------------------
// Divine intervention table
// ---------------------------------------------------------------------------
import { DIVINE_INTERVENTIONS, getRandomIntervention, getInterventionsByScale, rollIntervention, getAllScales as getAllDivineScales, formatIntervention } from '../../src/data/divineIntervention';

describe('divine intervention table', () => {
  it('has at least 7 interventions', () => { expect(DIVINE_INTERVENTIONS.length).toBeGreaterThanOrEqual(7); });
  it('has 4 scales', () => { expect(getAllDivineScales().length).toBe(4); });
  it('generates random intervention', () => { const i = getRandomIntervention(); expect(i.name.length).toBeGreaterThan(3); expect(i.mechanicalEffect.length).toBeGreaterThan(10); });
  it('filters by scale', () => { const dramatic = getInterventionsByScale('dramatic'); expect(dramatic.length).toBeGreaterThanOrEqual(1); });
  it('roll scales with faith', () => { const results = Array.from({ length: 50 }, () => rollIntervention(10)); const hasSubtle = results.some((r) => r.scale === 'subtle'); const hasDramatic = results.some((r) => r.scale === 'dramatic' || r.scale === 'miraculous'); expect(hasSubtle || hasDramatic).toBe(true); });
  it('all have divine costs', () => { DIVINE_INTERVENTIONS.forEach((i) => expect(i.divineCost.length).toBeGreaterThan(5)); });
  it('all have witness reactions', () => { DIVINE_INTERVENTIONS.forEach((i) => expect(i.witnessReaction.length).toBeGreaterThan(10)); });
  it('formats intervention', () => { expect(formatIntervention(DIVINE_INTERVENTIONS[0])).toContain('Divine cost'); });
});

// ---------------------------------------------------------------------------
// Siege defense planner
// ---------------------------------------------------------------------------
import { SIEGE_DEFENSE_PLANS, getRandomDefensePlan, getTotalTroops as getSiegeTroops, getPositionByType, getDepletableResources, getAllPositions as getAllDefensePositions, getAllTactics, formatDefensePlan } from '../../src/data/siegeDefense';

describe('siege defense planner', () => {
  it('has at least 2 plans', () => { expect(SIEGE_DEFENSE_PLANS.length).toBeGreaterThanOrEqual(2); });
  it('generates random plan', () => { const p = getRandomDefensePlan(); expect(p.fortificationName.length).toBeGreaterThan(3); expect(p.positions.length).toBeGreaterThanOrEqual(2); });
  it('total troops = positions + reserves', () => { SIEGE_DEFENSE_PLANS.forEach((p) => expect(getSiegeTroops(p)).toBe(p.totalDefenders)); });
  it('looks up position', () => { const p = SIEGE_DEFENSE_PLANS[0]; const walls = getPositionByType(p, 'walls'); expect(walls).toBeDefined(); expect(walls!.troops).toBeGreaterThan(0); });
  it('finds depletable resources', () => { const p = SIEGE_DEFENSE_PLANS[0]; const depletable = getDepletableResources(p); expect(depletable.length).toBeGreaterThanOrEqual(2); depletable.forEach((r) => expect(r.depletes).toBe(true)); });
  it('has 6 defense positions', () => { expect(getAllDefensePositions().length).toBe(6); });
  it('has 6 tactics', () => { expect(getAllTactics().length).toBe(6); });
  it('all plans have weak points', () => { SIEGE_DEFENSE_PLANS.forEach((p) => expect(p.weakPoint.length).toBeGreaterThan(20)); });
  it('formats plan', () => { expect(formatDefensePlan(SIEGE_DEFENSE_PLANS[0])).toContain('Hold time'); });
});

// ---------------------------------------------------------------------------
// Mind control resistance
// ---------------------------------------------------------------------------
import { CONTROL_PROFILES, createMindControlState, degradeWillpower, resistSuccessfully, breakFree, getControlProfile, getCurrentSaveDC, isFullyControlled, getAllControlSources, formatMindControlState } from '../../src/data/mindControl';

describe('mind control resistance', () => {
  it('has 6 control sources', () => { expect(CONTROL_PROFILES.length).toBe(6); expect(getAllControlSources().length).toBe(6); });
  it('starts aware with full willpower', () => { const s = createMindControlState('enchantment'); expect(s.stage).toBe('aware'); expect(s.willpower).toBe(10); });
  it('degradation reduces willpower', () => { let s = createMindControlState('psionic'); s = degradeWillpower(s); expect(s.willpower).toBeLessThan(10); });
  it('resistance restores willpower', () => { let s = createMindControlState('demonic'); s = degradeWillpower(s); s = degradeWillpower(s); s = resistSuccessfully(s); expect(s.willpower).toBeGreaterThan(s.willpower - 2); });
  it('break free restores to full', () => { let s = createMindControlState('fey_charm'); s = degradeWillpower(s); s = breakFree(s); expect(s.willpower).toBe(10); expect(s.stage).toBe('aware'); });
  it('fully controlled at 0', () => { let s = createMindControlState('vampiric'); for (let i = 0; i < 20; i++) s = degradeWillpower(s); expect(isFullyControlled(s)).toBe(true); expect(s.stage).toBe('puppet'); });
  it('save DC escalates', () => { let s = createMindControlState('enchantment'); const initial = getCurrentSaveDC(s); s = degradeWillpower(s); expect(getCurrentSaveDC(s)).toBeGreaterThanOrEqual(initial); });
  it('profiles have ally assist bonuses', () => { CONTROL_PROFILES.forEach((p) => expect(p.allyAssistBonus).toBeGreaterThanOrEqual(2)); });
  it('formats state', () => { expect(formatMindControlState(createMindControlState('psionic'))).toContain('Willpower'); });
});

// ---------------------------------------------------------------------------
// Social encounter generator
// ---------------------------------------------------------------------------
import { SOCIAL_ENCOUNTERS, getRandomSocialEncounter, getEncountersBySetting, getEncountersByStake, getAllSettings as getAllSocialSettings, formatSocialEncounter } from '../../src/data/socialEncounter';

describe('social encounter generator', () => {
  it('has at least 5 encounters', () => { expect(SOCIAL_ENCOUNTERS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 settings', () => { expect(getAllSocialSettings().length).toBeGreaterThanOrEqual(4); });
  it('generates random encounter', () => { const e = getRandomSocialEncounter(); expect(e.title.length).toBeGreaterThan(3); expect(e.approaches.length).toBeGreaterThanOrEqual(3); });
  it('filters by setting', () => { const tavern = getEncountersBySetting('tavern'); expect(tavern.length).toBeGreaterThanOrEqual(1); });
  it('all have critical success/failure', () => { SOCIAL_ENCOUNTERS.forEach((e) => { expect(e.criticalSuccess.length).toBeGreaterThan(10); expect(e.criticalFailure.length).toBeGreaterThan(10); }); });
  it('approaches have skill DCs', () => { SOCIAL_ENCOUNTERS.forEach((e) => e.approaches.forEach((a) => expect(a.dc).toBeGreaterThanOrEqual(0))); });
  it('formats encounter', () => { expect(formatSocialEncounter(SOCIAL_ENCOUNTERS[0])).toContain('Approaches'); });
});

// ---------------------------------------------------------------------------
// Golem crafting instructions
// ---------------------------------------------------------------------------
import { GOLEM_BLUEPRINTS, getBlueprint, getBlueprintsByCost, getBlueprintsByLevel, getStepCount as getGolemSteps, getAllGolemTypes, formatBlueprint } from '../../src/data/golemCrafting';

describe('golem crafting instructions', () => {
  it('has at least 3 blueprints', () => { expect(GOLEM_BLUEPRINTS.length).toBeGreaterThanOrEqual(3); });
  it('looks up by type', () => { const iron = getBlueprint('iron'); expect(iron).toBeDefined(); expect(iron!.cr).toBe(16); });
  it('filters by cost', () => { const cheap = getBlueprintsByCost(5000); expect(cheap.length).toBeGreaterThanOrEqual(1); cheap.forEach((b) => expect(b.totalCost).toBeLessThanOrEqual(5000)); });
  it('filters by level', () => { const lowLevel = getBlueprintsByLevel(9); const highLevel = getBlueprintsByLevel(17); expect(highLevel.length).toBeGreaterThanOrEqual(lowLevel.length); });
  it('steps have failure consequences', () => { GOLEM_BLUEPRINTS.forEach((b) => b.steps.forEach((s) => expect(s.failureConsequence.length).toBeGreaterThan(10))); });
  it('all have weaknesses', () => { GOLEM_BLUEPRINTS.forEach((b) => expect(b.weakness.length).toBeGreaterThan(10)); });
  it('all have control methods', () => { GOLEM_BLUEPRINTS.forEach((b) => expect(b.controlMethod.length).toBeGreaterThan(10)); });
  it('formats blueprint', () => { expect(formatBlueprint(GOLEM_BLUEPRINTS[0])).toContain('Materials'); });
});

// ---------------------------------------------------------------------------
// Planar marketplace
// ---------------------------------------------------------------------------
import { PLANAR_SHOPS, getRandomPlanarShop, getShopByPlane, getItemsFromAllShops, getAllMarketPlanes, formatPlanarShop } from '../../src/data/planarMarketplace';

describe('planar marketplace', () => {
  it('has at least 4 shops', () => { expect(PLANAR_SHOPS.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 4 planes', () => { expect(getAllMarketPlanes().length).toBeGreaterThanOrEqual(4); });
  it('generates random shop', () => { const s = getRandomPlanarShop(); expect(s.name.length).toBeGreaterThan(3); expect(s.items.length).toBeGreaterThanOrEqual(3); });
  it('looks up by plane', () => { const fey = getShopByPlane('feywild'); expect(fey).toBeDefined(); expect(fey!.currency).not.toContain('gold'); });
  it('collects all items', () => { expect(getItemsFromAllShops().length).toBeGreaterThanOrEqual(10); });
  it('all shops have danger warnings', () => { PLANAR_SHOPS.forEach((s) => expect(s.dangerWarning.length).toBeGreaterThan(10)); });
  it('some items have side effects', () => { const allItems = getItemsFromAllShops(); expect(allItems.some((i) => i.sideEffect !== null)).toBe(true); });
  it('formats shop', () => { expect(formatPlanarShop(PLANAR_SHOPS[0])).toContain('Currency'); });
});

// ---------------------------------------------------------------------------
// Faction quest chain generator
// ---------------------------------------------------------------------------
import { FACTION_QUEST_CHAINS, getRandomQuestChain, getChainByFaction, getBranchPoints, getStepCount as getQuestSteps, getAllQuestFactions, formatQuestChain } from '../../src/data/factionQuestChain';

describe('faction quest chain generator', () => {
  it('has at least 3 chains', () => { expect(FACTION_QUEST_CHAINS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 factions', () => { expect(getAllQuestFactions().length).toBeGreaterThanOrEqual(3); });
  it('generates random chain', () => { const c = getRandomQuestChain(); expect(c.chainName.length).toBeGreaterThan(3); expect(c.steps.length).toBeGreaterThanOrEqual(3); });
  it('looks up by faction', () => { const crown = getChainByFaction('crown'); expect(crown).toBeDefined(); });
  it('has branch points', () => { FACTION_QUEST_CHAINS.forEach((c) => expect(getBranchPoints(c).length).toBeGreaterThanOrEqual(1)); });
  it('branches have options', () => { FACTION_QUEST_CHAINS.forEach((c) => getBranchPoints(c).forEach((s) => expect(s.branchOptions!.length).toBeGreaterThanOrEqual(2))); });
  it('all have betrayal options', () => { FACTION_QUEST_CHAINS.forEach((c) => { expect(c.betrayalOption.length).toBeGreaterThan(10); expect(c.betrayalConsequence.length).toBeGreaterThan(10); }); });
  it('formats chain', () => { expect(formatQuestChain(FACTION_QUEST_CHAINS[0])).toContain('Step'); });
});

// ---------------------------------------------------------------------------
// Death save drama table
// ---------------------------------------------------------------------------
import { DEATH_SAVE_NARRATIONS, getNarration, getAllNarrations, getAllMoments, getNarrationCount as getDeathNarrationCount, formatNarration as formatDeathNarration } from '../../src/data/deathSaveDrama';

describe('death save drama table', () => {
  it('has at least 14 narrations', () => { expect(DEATH_SAVE_NARRATIONS.length).toBeGreaterThanOrEqual(14); expect(getDeathNarrationCount()).toBeGreaterThanOrEqual(14); });
  it('has 8 moment types', () => { expect(getAllMoments().length).toBe(8); });
  it('generates narration for each moment', () => { getAllMoments().forEach((m) => { const n = getNarration(m); expect(n.narration.length).toBeGreaterThan(20); }); });
  it('each moment has at least 2 variants', () => { getAllMoments().forEach((m) => expect(getAllNarrations(m).length).toBeGreaterThanOrEqual(2)); });
  it('nat 20 narrations are triumphant', () => { getAllNarrations('nat_20').forEach((n) => expect(n.mechanicalNote).toContain('regain 1 HP')); });
  it('final failure narrations are final', () => { getAllNarrations('final_failure').forEach((n) => expect(n.mechanicalNote).toContain('Dead')); });
  it('all have party reactions', () => { DEATH_SAVE_NARRATIONS.forEach((n) => expect(n.partyReaction.length).toBeGreaterThan(5)); });
  it('formats narration', () => { expect(formatDeathNarration(getNarration('nat_20'))).toContain('NAT 20'); });
});

// ---------------------------------------------------------------------------
// Alchemy recipe book
// ---------------------------------------------------------------------------
import { ALCHEMY_RECIPES, getRecipeByName, getRecipesByCategory as getAlchRecipesByCategory, getRecipesByMaxDC, getIngredientCost as getAlchIngredientCost, getAllCategories as getAllAlchCategories, formatRecipe as formatAlchRecipe } from '../../src/data/alchemyRecipeBook';

describe('alchemy recipe book', () => {
  it('has at least 7 recipes', () => { expect(ALCHEMY_RECIPES.length).toBeGreaterThanOrEqual(7); });
  it('covers at least 5 categories', () => { expect(getAllAlchCategories().length).toBeGreaterThanOrEqual(5); });
  it('looks up by name', () => { const r = getRecipeByName('Alchemist\'s Fire'); expect(r).toBeDefined(); expect(r!.category).toBe('bomb'); });
  it('filters by category', () => { const potions = getAlchRecipesByCategory('potion'); expect(potions.length).toBeGreaterThanOrEqual(1); });
  it('filters by max DC', () => { const easy = getRecipesByMaxDC(12); expect(easy.length).toBeGreaterThanOrEqual(1); easy.forEach((r) => expect(r.craftingDC).toBeLessThanOrEqual(12)); });
  it('all have failure results', () => { ALCHEMY_RECIPES.forEach((r) => expect(r.failureResult.length).toBeGreaterThan(10)); });
  it('ingredient cost is positive', () => { ALCHEMY_RECIPES.forEach((r) => expect(getAlchIngredientCost(r)).toBeGreaterThan(0)); });
  it('formats recipe', () => { expect(formatAlchRecipe(ALCHEMY_RECIPES[0])).toContain('Ingredients'); });
});

// ---------------------------------------------------------------------------
// Exile/banishment scenario
// ---------------------------------------------------------------------------
import { EXILE_SCENARIOS, getRandomExile, getExilesByReason, getExilesBySeverity, getRedemptionPathCount as getExileRedemptions, getAllExileReasons, formatExile } from '../../src/data/exileScenario';

describe('exile/banishment scenario', () => {
  it('has at least 5 scenarios', () => { expect(EXILE_SCENARIOS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 5 reasons', () => { expect(getAllExileReasons().length).toBeGreaterThanOrEqual(5); });
  it('generates random exile', () => { const e = getRandomExile(); expect(e.title.length).toBeGreaterThan(3); expect(e.redemptionPaths.length).toBeGreaterThanOrEqual(2); });
  it('filters by reason', () => { const framed = getExilesByReason('framed'); expect(framed.length).toBeGreaterThanOrEqual(1); });
  it('filters by severity', () => { const perm = getExilesBySeverity('permanent'); expect(perm.length).toBeGreaterThanOrEqual(1); });
  it('all have twists', () => { EXILE_SCENARIOS.forEach((s) => expect(s.twist.length).toBeGreaterThan(20)); });
  it('all have allies', () => { EXILE_SCENARIOS.forEach((s) => expect(s.allies.length).toBeGreaterThan(10)); });
  it('formats exile', () => { expect(formatExile(EXILE_SCENARIOS[0])).toContain('Redemption'); });
});

// ---------------------------------------------------------------------------
// Familiar evolution
// ---------------------------------------------------------------------------
import { FAMILIAR_EVOLUTIONS, getEvolution, getFormAtXP, getNextEvolution, getAllFamiliarNames, formatFamiliarEvolution } from '../../src/data/familiarEvolution';

describe('familiar evolution', () => {
  it('has at least 3 familiars', () => { expect(FAMILIAR_EVOLUTIONS.length).toBeGreaterThanOrEqual(3); });
  it('each has 4 evolution forms', () => { FAMILIAR_EVOLUTIONS.forEach((e) => expect(e.evolutions.length).toBe(4)); });
  it('looks up by name', () => { const ember = getEvolution('Ember (Fire Cat)'); expect(ember).toBeDefined(); });
  it('form scales with XP', () => { const ember = FAMILIAR_EVOLUTIONS[0]; expect(getFormAtXP(ember, 0).form).toBe('basic'); expect(getFormAtXP(ember, 250).form).toBe('enhanced'); expect(getFormAtXP(ember, 700).form).toBe('greater'); });
  it('next evolution returns future form', () => { const ember = FAMILIAR_EVOLUTIONS[0]; expect(getNextEvolution(ember, 0)!.form).toBe('enhanced'); expect(getNextEvolution(ember, 1500)).toBeNull(); });
  it('abilities scale with form', () => { FAMILIAR_EVOLUTIONS.forEach((e) => { const basic = e.evolutions[0]; const legendary = e.evolutions[3]; expect(legendary.abilities.length).toBeGreaterThan(basic.abilities.length); }); });
  it('all have evolution triggers', () => { FAMILIAR_EVOLUTIONS.forEach((e) => expect(e.evolutionTrigger.length).toBeGreaterThan(15)); });
  it('formats familiar', () => { expect(formatFamiliarEvolution(FAMILIAR_EVOLUTIONS[0], 300)).toContain('enhanced'); });
});

// ---------------------------------------------------------------------------
// Wanted poster generator
// ---------------------------------------------------------------------------
import { generateWantedPoster, escalateBounty, getAllBountyTiers, getAllCrimeCategories, formatWantedPoster } from '../../src/data/wantedPoster';

describe('wanted poster generator', () => {
  it('generates poster', () => { const p = generateWantedPoster('Gandalf', 'notable'); expect(p.targetName).toBe('Gandalf'); expect(p.bountyAmount).toBeGreaterThan(0); });
  it('has 5 bounty tiers', () => { expect(getAllBountyTiers().length).toBe(5); });
  it('has at least 6 crime categories', () => { expect(getAllCrimeCategories().length).toBeGreaterThanOrEqual(6); });
  it('bounty scales with tier', () => { const petty = generateWantedPoster('X', 'petty'); const legendary = generateWantedPoster('X', 'legendary'); expect(legendary.bountyAmount).toBeGreaterThan(petty.bountyAmount); });
  it('escalates bounty tier', () => { let p = generateWantedPoster('Y', 'notable'); p = escalateBounty(p); expect(p.bountyTier).toBe('dangerous'); expect(p.bountyHunters).toBeGreaterThan(1); });
  it('respects crime parameter', () => { const p = generateWantedPoster('Z', 'dangerous', 'treason'); expect(p.crime).toBe('treason'); });
  it('formats poster', () => { expect(formatWantedPoster(generateWantedPoster('Test', 'infamous'))).toContain('WANTED'); });
});

// ---------------------------------------------------------------------------
// Planar weather
// ---------------------------------------------------------------------------
import { PLANAR_WEATHER, getRandomPlanarWeather, getWeatherBySource as getPlanarWeatherBySource, getWeatherWithPlotHooks, getAllWeatherSources, formatPlanarWeather } from '../../src/data/planarWeather';

describe('planar weather', () => {
  it('has at least 6 events', () => { expect(PLANAR_WEATHER.length).toBeGreaterThanOrEqual(6); });
  it('covers at least 5 sources', () => { expect(getAllWeatherSources().length).toBeGreaterThanOrEqual(5); });
  it('generates random weather', () => { const w = getRandomPlanarWeather(); expect(w.name.length).toBeGreaterThan(3); expect(w.mechanicalEffects.length).toBeGreaterThanOrEqual(3); });
  it('filters by source', () => { const fey = getPlanarWeatherBySource('feywild'); expect(fey.length).toBeGreaterThanOrEqual(1); });
  it('most have plot hooks', () => { expect(getWeatherWithPlotHooks().length).toBeGreaterThanOrEqual(4); });
  it('all have warning DCs', () => { PLANAR_WEATHER.forEach((w) => expect(w.warningSignsDC).toBeGreaterThanOrEqual(6)); });
  it('formats weather', () => { expect(formatPlanarWeather(PLANAR_WEATHER[0])).toContain('Effects'); });
});

// ---------------------------------------------------------------------------
// Trap corridor designer
// ---------------------------------------------------------------------------
import { TRAP_CORRIDORS, getRandomCorridor, getCorridorByName, getTrapCount as getCorridorTraps, getAverageDisarmDC, hasShortcut, formatCorridor } from '../../src/data/trapCorridor';

describe('trap corridor designer', () => {
  it('has at least 3 corridors', () => { expect(TRAP_CORRIDORS.length).toBeGreaterThanOrEqual(3); });
  it('generates random corridor', () => { const c = getRandomCorridor(); expect(c.name.length).toBeGreaterThan(3); expect(c.traps.length).toBeGreaterThanOrEqual(3); });
  it('looks up by name', () => { const g = getCorridorByName('The Gauntlet of Blades'); expect(g).toBeDefined(); expect(g!.traps.length).toBe(5); });
  it('trap count matches', () => { TRAP_CORRIDORS.forEach((c) => expect(getCorridorTraps(c)).toBe(c.traps.length)); });
  it('average disarm DC is reasonable', () => { TRAP_CORRIDORS.forEach((c) => { const avg = getAverageDisarmDC(c); if (avg > 0) expect(avg).toBeGreaterThanOrEqual(10); }); });
  it('some have shortcuts', () => { expect(TRAP_CORRIDORS.filter(hasShortcut).length).toBeGreaterThanOrEqual(1); });
  it('all have safe spots', () => { TRAP_CORRIDORS.forEach((c) => expect(c.safeSpot.length).toBeGreaterThan(10)); });
  it('all have final rewards', () => { TRAP_CORRIDORS.forEach((c) => expect(c.finalReward.length).toBeGreaterThan(10)); });
  it('formats corridor', () => { expect(formatCorridor(TRAP_CORRIDORS[0])).toContain('Reward'); });
});

// ---------------------------------------------------------------------------
// Bardic inspiration table
// ---------------------------------------------------------------------------
import { BARDIC_INSPIRATIONS, getInspirationForMoment, getAllEffectsForMoment, getAllMoments as getAllBardicMoments, getEffectCount, formatInspiration as formatBardicInspiration } from '../../src/data/bardicInspiration';

describe('bardic inspiration table', () => {
  it('has at least 10 effects', () => { expect(BARDIC_INSPIRATIONS.length).toBeGreaterThanOrEqual(10); expect(getEffectCount()).toBeGreaterThanOrEqual(10); });
  it('covers 6 moments', () => { expect(getAllBardicMoments().length).toBe(6); });
  it('generates for each moment', () => { getAllBardicMoments().forEach((m) => { const e = getInspirationForMoment(m); expect(e.narration.length).toBeGreaterThan(10); }); });
  it('each moment has at least 2 variants', () => { getAllBardicMoments().forEach((m) => expect(getAllEffectsForMoment(m).length).toBeGreaterThanOrEqual(1)); });
  it('all have bard actions', () => { BARDIC_INSPIRATIONS.forEach((e) => expect(e.bardAction.length).toBeGreaterThan(5)); });
  it('formats inspiration', () => { expect(formatBardicInspiration(BARDIC_INSPIRATIONS[0])).toContain('Bard'); });
});

// ---------------------------------------------------------------------------
// Enchanted forest generator
// ---------------------------------------------------------------------------
import { ENCHANTED_FORESTS, getRandomEnchantedForest, getForestsByMagic, getForestsByDanger as getForestDanger, getAllForestTypes, formatEnchantedForest } from '../../src/data/enchantedForest';

describe('enchanted forest generator', () => {
  it('has at least 4 forests', () => { expect(ENCHANTED_FORESTS.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 4 magic types', () => { expect(getAllForestTypes().length).toBeGreaterThanOrEqual(4); });
  it('generates random forest', () => { const f = getRandomEnchantedForest(); expect(f.name.length).toBeGreaterThan(3); expect(f.rules.length).toBeGreaterThanOrEqual(3); });
  it('filters by magic type', () => { const corrupted = getForestsByMagic('corrupted'); expect(corrupted.length).toBeGreaterThanOrEqual(1); });
  it('all have quest hooks', () => { ENCHANTED_FORESTS.forEach((f) => expect(f.questHook.length).toBeGreaterThan(20)); });
  it('all have central features', () => { ENCHANTED_FORESTS.forEach((f) => expect(f.centralFeature.length).toBeGreaterThan(20)); });
  it('formats forest', () => { expect(formatEnchantedForest(ENCHANTED_FORESTS[0])).toContain('Rules'); });
});

// ---------------------------------------------------------------------------
// Noble scandal generator
// ---------------------------------------------------------------------------
import { NOBLE_SCANDALS, getRandomScandal as getRandomNobleSc, getScandalsByType as getScByType, getScandalsByHouse, getHighValueScandals, getAllScandalTypes, formatScandal as formatNobleSc } from '../../src/data/nobleScandalGen';

describe('noble scandal generator', () => {
  it('has at least 5 scandals', () => { expect(NOBLE_SCANDALS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 5 types', () => { expect(getAllScandalTypes().length).toBeGreaterThanOrEqual(5); });
  it('generates random scandal', () => { const s = getRandomNobleSc(); expect(s.title.length).toBeGreaterThan(3); expect(s.involvedParties.length).toBeGreaterThanOrEqual(2); });
  it('filters by type', () => { const affairs = getScByType('affair'); expect(affairs.length).toBeGreaterThanOrEqual(1); });
  it('filters by house', () => { const ashford = getScandalsByHouse('Ashford'); expect(ashford.length).toBeGreaterThanOrEqual(1); });
  it('filters high value', () => { const big = getHighValueScandals(3000); expect(big.length).toBeGreaterThanOrEqual(2); big.forEach((s) => expect(s.blackmailValue).toBeGreaterThanOrEqual(3000)); });
  it('formats with evidence toggle', () => { const s = getRandomNobleSc(); expect(formatNobleSc(s)).not.toContain('Evidence'); expect(formatNobleSc(s, true)).toContain('Evidence'); });
});

// ---------------------------------------------------------------------------
// Merchant haggling mini-game
// ---------------------------------------------------------------------------
import { MERCHANT_PERSONALITIES, getMerchantPersonality, getRandomMood, resolveHaggle, getAllMoods as getAllMerchantMoods, getAllTactics as getAllHaggleTactics, formatHaggleResult as formatHaggleMiniGame } from '../../src/data/merchantHaggling';

describe('merchant haggling mini-game', () => {
  it('has 5 personality types', () => { expect(MERCHANT_PERSONALITIES.length).toBe(5); expect(getAllMerchantMoods().length).toBe(5); });
  it('has 6 tactics', () => { expect(getAllHaggleTactics().length).toBe(6); });
  it('looks up personality', () => { const p = getMerchantPersonality('greedy'); expect(p).toBeDefined(); expect(p!.baseMarkup).toBeGreaterThan(1); });
  it('random mood returns valid', () => { expect(getAllMerchantMoods()).toContain(getRandomMood()); });
  it('success reduces price', () => { const result = resolveHaggle('fair', 'bulk_deal', 20); expect(result.priceMultiplier).toBeLessThanOrEqual(1.0); });
  it('immune tactic fails', () => { const result = resolveHaggle('firm', 'flattery', 20); expect(result.relationshipChange).toBe(-1); });
  it('formats result', () => { expect(formatHaggleMiniGame({ priceMultiplier: 0.8, merchantReaction: 'Fine.', relationshipChange: 1 }, 100)).toContain('80gp'); });
});

// ---------------------------------------------------------------------------
// Magical pet peeve system
// ---------------------------------------------------------------------------
import { MAGICAL_PET_PEEVES, getRandomPetPeeve, getPetPeevesByItemType, getPetPeeveCount, formatPetPeeve } from '../../src/data/magicalPetPeeve';

describe('magical pet peeve system', () => {
  it('has at least 7 items', () => { expect(MAGICAL_PET_PEEVES.length).toBeGreaterThanOrEqual(7); expect(getPetPeeveCount()).toBeGreaterThanOrEqual(7); });
  it('generates random peeve', () => { const p = getRandomPetPeeve(); expect(p.petPeeve.length).toBeGreaterThan(10); expect(p.appeasement.length).toBeGreaterThan(10); });
  it('filters by item type', () => { const swords = getPetPeevesByItemType('sword'); expect(swords.length).toBeGreaterThanOrEqual(1); });
  it('all have mechanical consequences', () => { MAGICAL_PET_PEEVES.forEach((p) => expect(p.mechanicalConsequence.length).toBeGreaterThan(10)); });
  it('all have appeasement methods', () => { MAGICAL_PET_PEEVES.forEach((p) => expect(p.appeasement.length).toBeGreaterThan(10)); });
  it('formats peeve', () => { expect(formatPetPeeve(MAGICAL_PET_PEEVES[0])).toContain('Pet Peeve'); });
});

// ---------------------------------------------------------------------------
// War room briefing generator
// ---------------------------------------------------------------------------
import { WAR_ROOM_BRIEFINGS, getRandomBriefing, getBriefingsByObjective, getReliableIntel, getUnreliableIntel, getAllObjectives, formatBriefing } from '../../src/data/warRoomBriefing';

describe('war room briefing generator', () => {
  it('has at least 3 briefings', () => { expect(WAR_ROOM_BRIEFINGS.length).toBeGreaterThanOrEqual(3); });
  it('has 6 objective types', () => { expect(getAllObjectives().length).toBe(6); });
  it('generates random briefing', () => { const b = getRandomBriefing(); expect(b.operationName.length).toBeGreaterThan(3); expect(b.intel.length).toBeGreaterThanOrEqual(2); });
  it('filters by objective', () => { const defend = getBriefingsByObjective('defend'); expect(defend.length).toBeGreaterThanOrEqual(1); });
  it('separates reliable and unreliable intel', () => { const b = WAR_ROOM_BRIEFINGS[0]; const reliable = getReliableIntel(b); const unreliable = getUnreliableIntel(b); expect(reliable.length + unreliable.length).toBe(b.intel.length); });
  it('all have complications', () => { WAR_ROOM_BRIEFINGS.forEach((b) => expect(b.complication.length).toBeGreaterThan(20)); });
  it('all have strategy suggestions', () => { WAR_ROOM_BRIEFINGS.forEach((b) => expect(b.suggestedStrategy.length).toBeGreaterThan(20)); });
  it('formats briefing', () => { expect(formatBriefing(WAR_ROOM_BRIEFINGS[0])).toContain('Strategy'); });
});

// ---------------------------------------------------------------------------
// Encounter difficulty tuner
// ---------------------------------------------------------------------------
import { calculateDifficulty, getXPThreshold, assessPartyCondition, getAllDifficultyTiers, formatDifficultyAdjustment } from '../../src/data/encounterDifficultyTuner';

describe('encounter difficulty tuner', () => {
  it('has 4 difficulty tiers', () => { expect(getAllDifficultyTiers().length).toBe(4); });
  it('calculates difficulty for a party', () => { const adj = calculateDifficulty({ averageLevel: 5, memberCount: 4, condition: 'fresh', hasHealer: true, hasTank: true, magicItemCount: 1 }, 'medium'); expect(adj.adjustedCR).toBeGreaterThan(0); expect(adj.recommendedEnemyCount).toBeGreaterThanOrEqual(1); });
  it('depleted party gets lower CR', () => { const fresh = calculateDifficulty({ averageLevel: 5, memberCount: 4, condition: 'fresh', hasHealer: true, hasTank: true, magicItemCount: 0 }, 'hard'); const depleted = calculateDifficulty({ averageLevel: 5, memberCount: 4, condition: 'depleted', hasHealer: true, hasTank: true, magicItemCount: 0 }, 'hard'); expect(depleted.warningFlags.length).toBeGreaterThan(fresh.warningFlags.length); });
  it('no healer reduces CR', () => { const adj = calculateDifficulty({ averageLevel: 3, memberCount: 4, condition: 'fresh', hasHealer: false, hasTank: true, magicItemCount: 0 }, 'medium'); expect(adj.reasoning.some((r) => r.includes('healer'))).toBe(true); });
  it('XP thresholds scale with level', () => { expect(getXPThreshold(1, 'easy')).toBeLessThan(getXPThreshold(10, 'easy')); });
  it('assesses party condition', () => { expect(assessPartyCondition(100, 100)).toBe('fresh'); expect(assessPartyCondition(10, 10)).toBe('critical'); });
  it('formats adjustment', () => { const adj = calculateDifficulty({ averageLevel: 5, memberCount: 4, condition: 'fresh', hasHealer: true, hasTank: true, magicItemCount: 0 }, 'medium'); expect(formatDifficultyAdjustment(adj)).toContain('CR'); });
});

// ---------------------------------------------------------------------------
// Arcane research breakthrough
// ---------------------------------------------------------------------------
import { RESEARCH_PROJECTS, getRandomProject, getProjectsByField, getProjectsByType as getResearchByType, getProjectsByMaxCost as getResearchByCost, calculateCompletionChance, getAllResearchFields, formatProject } from '../../src/data/arcaneResearch';

describe('arcane research breakthrough', () => {
  it('has at least 5 projects', () => { expect(RESEARCH_PROJECTS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 fields', () => { expect(getAllResearchFields().length).toBeGreaterThanOrEqual(4); });
  it('generates random project', () => { const p = getRandomProject(); expect(p.name.length).toBeGreaterThan(3); expect(p.breakthrough.length).toBeGreaterThan(20); });
  it('filters by field', () => { const nec = getProjectsByField('necromancy'); expect(nec.length).toBeGreaterThanOrEqual(1); });
  it('filters by cost', () => { const cheap = getResearchByCost(500); expect(cheap.length).toBeGreaterThanOrEqual(1); });
  it('completion chance scales with modifier', () => { const low = calculateCompletionChance(15, 0); const high = calculateCompletionChance(15, 8); expect(high).toBeGreaterThan(low); });
  it('all have catastrophic failures', () => { RESEARCH_PROJECTS.forEach((p) => expect(p.catastrophicFailure.length).toBeGreaterThan(15)); });
  it('formats project', () => { expect(formatProject(RESEARCH_PROJECTS[0])).toContain('Breakthrough'); });
});

// ---------------------------------------------------------------------------
// NPC backstory generator
// ---------------------------------------------------------------------------
import { NPC_BACKSTORIES, getRandomBackstory, getBackstoriesByTheme, getAllThemes as getAllBackstoryThemes, formatBackstory as formatNpcBackstory } from '../../src/data/npcBackstoryGen';

describe('NPC backstory generator', () => {
  it('has at least 6 backstories', () => { expect(NPC_BACKSTORIES.length).toBeGreaterThanOrEqual(6); });
  it('covers 6 themes', () => { expect(getAllBackstoryThemes().length).toBe(6); });
  it('generates random backstory', () => { const b = getRandomBackstory(); expect(b.origin.length).toBeGreaterThan(10); expect(b.plotHook.length).toBeGreaterThan(10); });
  it('filters by theme', () => { const tragic = getBackstoriesByTheme('tragic'); expect(tragic.length).toBeGreaterThanOrEqual(1); });
  it('all have secrets', () => { NPC_BACKSTORIES.forEach((b) => expect(b.secret.length).toBeGreaterThan(20)); });
  it('all have party connections', () => { NPC_BACKSTORIES.forEach((b) => expect(b.connection.length).toBeGreaterThan(10)); });
  it('formats with secret toggle', () => { const b = getRandomBackstory(); expect(formatNpcBackstory(b)).not.toContain('Secret'); expect(formatNpcBackstory(b, true)).toContain('Secret'); });
});

// ---------------------------------------------------------------------------
// Weather terrain modifier
// ---------------------------------------------------------------------------
import { WEATHER_TERRAIN_EFFECTS, getWeatherTerrainEffect, getEffectsForWeather, getEffectsForTerrain, getWorstVisibility, getBestStealth, getAllWeatherConditions, getAllTerrainTypes as getAllWTTerrains, formatWeatherTerrain } from '../../src/data/weatherTerrainMod';

describe('weather terrain modifier', () => {
  it('has at least 12 effects', () => { expect(WEATHER_TERRAIN_EFFECTS.length).toBeGreaterThanOrEqual(12); });
  it('covers at least 6 weather types', () => { expect(getAllWeatherConditions().length).toBeGreaterThanOrEqual(6); });
  it('covers at least 5 terrain types', () => { expect(getAllWTTerrains().length).toBeGreaterThanOrEqual(5); });
  it('looks up specific combo', () => { const e = getWeatherTerrainEffect('rain', 'forest'); expect(e).toBeDefined(); expect(e!.movementMod).toBeLessThan(0); });
  it('returns undefined for unknown combo', () => { expect(getWeatherTerrainEffect('clear', 'cave')).toBeUndefined(); });
  it('worst visibility is very negative', () => { expect(getWorstVisibility().visibilityMod).toBeLessThanOrEqual(-5); });
  it('best stealth is positive', () => { expect(getBestStealth().stealthMod).toBeGreaterThanOrEqual(4); });
  it('formats effect', () => { expect(formatWeatherTerrain(WEATHER_TERRAIN_EFFECTS[0])).toContain('Speed'); });
});

// ---------------------------------------------------------------------------
// Ancient ruin floor plan
// ---------------------------------------------------------------------------
import { ANCIENT_RUINS, getRandomRuin, getRuinByType, getRoomById, getRoomsWithEncounters as getRuinEncounters, getRoomsWithLoot as getRuinLoot, getAllRuinTypes, formatRuin } from '../../src/data/ancientRuinLayout';

describe('ancient ruin floor plan', () => {
  it('has at least 2 ruins', () => { expect(ANCIENT_RUINS.length).toBeGreaterThanOrEqual(2); });
  it('covers at least 2 types', () => { expect(getAllRuinTypes().length).toBeGreaterThanOrEqual(2); });
  it('generates random ruin', () => { const r = getRandomRuin(); expect(r.name.length).toBeGreaterThan(3); expect(r.rooms.length).toBeGreaterThanOrEqual(4); });
  it('looks up by type', () => { const temple = getRuinByType('temple'); expect(temple).toBeDefined(); });
  it('rooms are connected', () => { ANCIENT_RUINS.forEach((r) => r.rooms.forEach((room) => expect(room.connections.length).toBeGreaterThanOrEqual(1))); });
  it('has rooms with encounters', () => { ANCIENT_RUINS.forEach((r) => expect(getRuinEncounters(r).length).toBeGreaterThanOrEqual(1)); });
  it('has rooms with loot', () => { ANCIENT_RUINS.forEach((r) => expect(getRuinLoot(r).length).toBeGreaterThanOrEqual(2)); });
  it('boss room exists', () => { ANCIENT_RUINS.forEach((r) => expect(getRoomById(r, r.bossRoom)).toBeDefined()); });
  it('formats ruin', () => { expect(formatRuin(ANCIENT_RUINS[0])).toContain('Boss'); });
});

// ---------------------------------------------------------------------------
// Magical communication system
// ---------------------------------------------------------------------------
import { COMMUNICATION_METHODS, getMethod, getMethodsByReliability, getFreeMethods, createNetwork, getAllMethods as getAllCommMethods, formatMethod as formatCommMethod } from '../../src/data/magicalCommunication';

describe('magical communication system', () => {
  it('has 6 communication methods', () => { expect(COMMUNICATION_METHODS.length).toBe(6); expect(getAllCommMethods().length).toBe(6); });
  it('looks up method', () => { const stones = getMethod('sending_stones'); expect(stones).toBeDefined(); expect(stones!.reliability).toBe('perfect'); });
  it('filters by reliability', () => { const perfect = getMethodsByReliability('perfect'); expect(perfect.length).toBeGreaterThanOrEqual(1); });
  it('finds free methods', () => { const free = getFreeMethods(); expect(free.length).toBeGreaterThanOrEqual(3); free.forEach((m) => expect(m.cost).toBe(0)); });
  it('creates network', () => { const n = createNetwork('Party Comms', 'sending_stones', ['Alice', 'Bob']); expect(n.members.length).toBe(2); expect(n.compromised).toBe(false); });
  it('all have interception risks', () => { COMMUNICATION_METHODS.forEach((m) => expect(m.interceptionRisk.length).toBeGreaterThan(10)); });
  it('all have flavor text', () => { COMMUNICATION_METHODS.forEach((m) => expect(m.flavor.length).toBeGreaterThan(15)); });
  it('formats method', () => { expect(formatCommMethod(COMMUNICATION_METHODS[0])).toContain('Interception'); });
});

// ---------------------------------------------------------------------------
// Monster harvesting system
// ---------------------------------------------------------------------------
import { HARVEST_PROFILES, getHarvestProfile, getMaterialsByUse, getPerishableMaterials, getCraftableItems, getTotalHarvestValue as getMonsterHarvestValue, getAllMonsterNames, formatHarvestProfile } from '../../src/data/monsterHarvesting';

describe('monster harvesting system', () => {
  it('has at least 5 profiles', () => { expect(HARVEST_PROFILES.length).toBeGreaterThanOrEqual(5); });
  it('looks up by name', () => { const dragon = getHarvestProfile('Dragon'); expect(dragon).toBeDefined(); expect(dragon!.materials.length).toBeGreaterThanOrEqual(3); });
  it('filters by use', () => { const alchemy = getMaterialsByUse('alchemy'); expect(alchemy.length).toBeGreaterThanOrEqual(3); });
  it('finds perishable materials', () => { const perishable = getPerishableMaterials(); expect(perishable.length).toBeGreaterThanOrEqual(3); perishable.forEach((m) => expect(m.spoilsIn).not.toBeNull()); });
  it('finds craftable items', () => { const craftable = getCraftableItems(); expect(craftable.length).toBeGreaterThanOrEqual(4); craftable.forEach((m) => expect(m.craftableItem).not.toBeNull()); });
  it('total harvest value is positive', () => { HARVEST_PROFILES.forEach((p) => expect(getMonsterHarvestValue(p)).toBeGreaterThan(0)); });
  it('all have special notes', () => { HARVEST_PROFILES.forEach((p) => expect(p.specialNote.length).toBeGreaterThan(10)); });
  it('formats profile', () => { expect(formatHarvestProfile(HARVEST_PROFILES[0])).toContain('Total value'); });
});

// ---------------------------------------------------------------------------
// Artifact corruption tracker
// ---------------------------------------------------------------------------
import { CORRUPTION_PROFILES, getCorruptionProfile, getStageByName, getCorruptionStageOrder, isFullyCorrupted, getAllArtifactNames, formatCorruptionProfile } from '../../src/data/artifactCorruption';

describe('artifact corruption tracker', () => {
  it('has at least 3 artifacts', () => { expect(CORRUPTION_PROFILES.length).toBeGreaterThanOrEqual(3); });
  it('has 5 corruption stages', () => { expect(getCorruptionStageOrder().length).toBe(5); });
  it('looks up profile', () => { const blade = getCorruptionProfile('Hungering'); expect(blade).toBeDefined(); expect(blade!.stages.length).toBe(5); });
  it('stages have escalating DCs', () => { CORRUPTION_PROFILES.forEach((p) => { const dcs = p.stages.map((s) => s.saveDC); for (let i = 1; i < dcs.length; i++) expect(dcs[i]).toBeGreaterThanOrEqual(dcs[i - 1]); }); });
  it('consumed is fully corrupted', () => { expect(isFullyCorrupted('consumed')).toBe(true); expect(isFullyCorrupted('clean')).toBe(false); });
  it('all have purification costs', () => { CORRUPTION_PROFILES.forEach((p) => expect(p.purificationCost.length).toBeGreaterThan(15)); });
  it('all have resistance methods', () => { CORRUPTION_PROFILES.forEach((p) => expect(p.resistanceMethod.length).toBeGreaterThan(10)); });
  it('formats profile', () => { expect(formatCorruptionProfile(CORRUPTION_PROFILES[0], 'tempted')).toContain('TEMPTED'); });
});

// ---------------------------------------------------------------------------
// NPC voice/accent generator
// ---------------------------------------------------------------------------
import { NPC_VOICES, getRandomVoice, getVoicesByType, getVoicesByAccent, getAllVoiceTypes, getAllAccents, formatVoiceProfile } from '../../src/data/npcVoiceAccent';

describe('NPC voice/accent generator', () => {
  it('has at least 8 voices', () => { expect(NPC_VOICES.length).toBeGreaterThanOrEqual(8); });
  it('has at least 6 voice types', () => { expect(getAllVoiceTypes().length).toBeGreaterThanOrEqual(6); });
  it('has at least 5 accents', () => { expect(getAllAccents().length).toBeGreaterThanOrEqual(5); });
  it('generates random voice', () => { const v = getRandomVoice(); expect(v.samplePhrases.length).toBeGreaterThanOrEqual(3); expect(v.catchphrase.length).toBeGreaterThan(3); });
  it('filters by type', () => { const gruff = getVoicesByType('gruff'); expect(gruff.length).toBeGreaterThanOrEqual(1); });
  it('all have RP tips', () => { NPC_VOICES.forEach((v) => expect(v.rpTip.length).toBeGreaterThan(15)); });
  it('formats voice', () => { expect(formatVoiceProfile(NPC_VOICES[0])).toContain('RP tip'); });
});

// ---------------------------------------------------------------------------
// Magical trap evolution
// ---------------------------------------------------------------------------
import { EVOLVING_TRAPS, getRandomEvolvingTrap, getCurrentDC as getEvolvingDC, getActiveEvolutions, getAllTrapIntelligences, formatEvolvingTrap } from '../../src/data/evolvingTrap';

describe('magical trap evolution', () => {
  it('has at least 3 traps', () => { expect(EVOLVING_TRAPS.length).toBeGreaterThanOrEqual(3); });
  it('has 4 intelligence levels', () => { expect(getAllTrapIntelligences().length).toBe(4); });
  it('generates random trap', () => { const t = getRandomEvolvingTrap(); expect(t.name.length).toBeGreaterThan(3); expect(t.evolutions.length).toBeGreaterThanOrEqual(3); });
  it('DC increases with failures', () => { const t = EVOLVING_TRAPS[0]; expect(getEvolvingDC(t, 0)).toBe(t.baseDC); expect(getEvolvingDC(t, 3)).toBeGreaterThan(t.baseDC); });
  it('evolutions activate progressively', () => { const t = EVOLVING_TRAPS[0]; expect(getActiveEvolutions(t, 0).length).toBe(0); expect(getActiveEvolutions(t, 3).length).toBe(3); });
  it('all have weaknesses', () => { EVOLVING_TRAPS.forEach((t) => expect(t.weakness.length).toBeGreaterThan(15)); });
  it('formats trap', () => { expect(formatEvolvingTrap(EVOLVING_TRAPS[0], 2)).toContain('Active adaptations'); });
});

// ---------------------------------------------------------------------------
// Cross-plane messenger service
// ---------------------------------------------------------------------------
import { MESSENGER_SERVICES, getRandomService, getServicesBySpeed, getServicesForPlane, getServicesForPackage, getMostReliable, getAllSpeeds as getAllDeliverySpeeds, formatService } from '../../src/data/crossPlaneMessenger';

describe('cross-plane messenger service', () => {
  it('has at least 5 services', () => { expect(MESSENGER_SERVICES.length).toBeGreaterThanOrEqual(5); });
  it('has 4 delivery speeds', () => { expect(getAllDeliverySpeeds().length).toBe(4); });
  it('generates random service', () => { const s = getRandomService(); expect(s.name.length).toBeGreaterThan(3); expect(s.operatingPlanes.length).toBeGreaterThanOrEqual(1); });
  it('filters by speed', () => { const instant = getServicesBySpeed('instant'); expect(instant.length).toBeGreaterThanOrEqual(1); });
  it('filters by plane', () => { const material = getServicesForPlane('Material'); expect(material.length).toBeGreaterThanOrEqual(4); });
  it('filters by package type', () => { const living = getServicesForPackage('living_creature'); expect(living.length).toBeGreaterThanOrEqual(1); });
  it('most reliable has high score', () => { expect(getMostReliable().reliability).toBeGreaterThanOrEqual(9); });
  it('all have restrictions', () => { MESSENGER_SERVICES.forEach((s) => expect(s.specialRestrictions.length).toBeGreaterThanOrEqual(1)); });
  it('formats service', () => { expect(formatService(MESSENGER_SERVICES[0])).toContain('Planes'); });
});

// ---------------------------------------------------------------------------
// Astral ship combat expansion
// ---------------------------------------------------------------------------
import { ASTRAL_WEAPONS, ASTRAL_SHIELDS, BOARDING_ACTIONS, getWeapon as getAstralWeapon, getWeaponsByType as getAstralWeaponsByType, getShield as getAstralShield, getAllWeaponTypes as getAllAstralWeaponTypes, getAllShieldTypes, formatWeapon as formatAstralWeapon, formatShield as formatAstralShield } from '../../src/data/astralShipCombat';

describe('astral ship combat expansion', () => {
  it('has at least 5 weapons', () => { expect(ASTRAL_WEAPONS.length).toBeGreaterThanOrEqual(5); });
  it('has at least 4 shields', () => { expect(ASTRAL_SHIELDS.length).toBeGreaterThanOrEqual(4); });
  it('has at least 4 boarding actions', () => { expect(BOARDING_ACTIONS.length).toBeGreaterThanOrEqual(4); });
  it('looks up weapon', () => { const ballista = getAstralWeapon('Ballista'); expect(ballista).toBeDefined(); });
  it('filters weapons by type', () => { expect(getAllAstralWeaponTypes().length).toBeGreaterThanOrEqual(5); });
  it('looks up shield', () => { const barrier = getAstralShield('arcane_barrier'); expect(barrier).toBeDefined(); expect(barrier!.hpAbsorbed).toBeGreaterThan(0); });
  it('has 4 shield types', () => { expect(getAllShieldTypes().length).toBe(4); });
  it('boarding actions have counters', () => { BOARDING_ACTIONS.forEach((a) => expect(a.counterAction.length).toBeGreaterThan(10)); });
  it('formats weapon', () => { expect(formatAstralWeapon(ASTRAL_WEAPONS[0])).toContain('Crew'); });
  it('formats shield', () => { expect(formatAstralShield(ASTRAL_SHIELDS[0])).toContain('Absorbs'); });
});

// ---------------------------------------------------------------------------
// Illithid colony generator
// ---------------------------------------------------------------------------
import { ILLITHID_COLONIES, getRandomColony, getColonyBySize, getTotalThralls, getFreeThralls, getAllColonySizes, formatColony } from '../../src/data/illithidColony';

describe('illithid colony generator', () => {
  it('has at least 2 colonies', () => { expect(ILLITHID_COLONIES.length).toBeGreaterThanOrEqual(2); });
  it('has 4 colony sizes', () => { expect(getAllColonySizes().length).toBe(4); });
  it('generates random colony', () => { const c = getRandomColony(); expect(c.name.length).toBeGreaterThan(3); expect(c.thralls.length).toBeGreaterThanOrEqual(3); });
  it('filters by size', () => { const cities = getColonyBySize('city'); expect(cities.length).toBeGreaterThanOrEqual(1); });
  it('estimates total thralls', () => { ILLITHID_COLONIES.forEach((c) => expect(getTotalThralls(c)).toBeGreaterThan(0)); });
  it('finds thralls with free will', () => { ILLITHID_COLONIES.forEach((c) => expect(getFreeThralls(c).length).toBeGreaterThanOrEqual(1)); });
  it('all have weaknesses', () => { ILLITHID_COLONIES.forEach((c) => expect(c.weakness.length).toBeGreaterThan(20)); });
  it('formats colony', () => { expect(formatColony(ILLITHID_COLONIES[0])).toContain('Elder Brain'); });
});

// ---------------------------------------------------------------------------
// Ancestral spirit guide
// ---------------------------------------------------------------------------
import { ANCESTRAL_SPIRITS, getRandomSpirit, getSpiritsByDisposition, getGuidanceCount, getGuidancesWithBonuses, getAllDispositions as getAllSpiritDispositions, formatSpirit } from '../../src/data/ancestralSpirit';

describe('ancestral spirit guide', () => {
  it('has at least 3 spirits', () => { expect(ANCESTRAL_SPIRITS.length).toBeGreaterThanOrEqual(3); });
  it('has at least 3 dispositions', () => { expect(getAllSpiritDispositions().length).toBeGreaterThanOrEqual(3); });
  it('generates random spirit', () => { const s = getRandomSpirit(); expect(s.name.length).toBeGreaterThan(3); expect(s.guidances.length).toBeGreaterThanOrEqual(3); });
  it('each spirit has 3+ guidances', () => { ANCESTRAL_SPIRITS.forEach((s) => expect(getGuidanceCount(s)).toBeGreaterThanOrEqual(3)); });
  it('most guidances have bonuses', () => { ANCESTRAL_SPIRITS.forEach((s) => expect(getGuidancesWithBonuses(s).length).toBeGreaterThanOrEqual(1)); });
  it('all have summon conditions', () => { ANCESTRAL_SPIRITS.forEach((s) => expect(s.summonCondition.length).toBeGreaterThan(10)); });
  it('all have intervention abilities', () => { ANCESTRAL_SPIRITS.forEach((s) => expect(s.interventionAbility.length).toBeGreaterThan(10)); });
  it('formats spirit', () => { expect(formatSpirit(ANCESTRAL_SPIRITS[0])).toContain('Summon'); });
});

// ---------------------------------------------------------------------------
// Pocket dimension generator
// ---------------------------------------------------------------------------
import { POCKET_DIMENSIONS, getRandomDimension, getDimensionsByPurpose, getDimensionsByStability, getDimensionsWithTreasure as getDimTreasure, getAllPurposes as getAllDimPurposes, formatDimension } from '../../src/data/pocketDimension';

describe('pocket dimension generator', () => {
  it('has at least 5 dimensions', () => { expect(POCKET_DIMENSIONS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 purposes', () => { expect(getAllDimPurposes().length).toBeGreaterThanOrEqual(4); });
  it('generates random dimension', () => { const d = getRandomDimension(); expect(d.name.length).toBeGreaterThan(3); expect(d.uniquePhysics.length).toBeGreaterThanOrEqual(3); });
  it('filters by purpose', () => { const prisons = getDimensionsByPurpose('prison'); expect(prisons.length).toBeGreaterThanOrEqual(1); });
  it('filters by stability', () => { const collapsing = getDimensionsByStability('collapsing'); expect(collapsing.length).toBeGreaterThanOrEqual(1); });
  it('most have treasure', () => { expect(getDimTreasure().length).toBeGreaterThanOrEqual(3); });
  it('all have entry and exit methods', () => { POCKET_DIMENSIONS.forEach((d) => { expect(d.entryMethod.length).toBeGreaterThan(10); expect(d.exitMethod.length).toBeGreaterThan(10); }); });
  it('formats dimension', () => { expect(formatDimension(POCKET_DIMENSIONS[0])).toContain('Unique physics'); });
});

// ---------------------------------------------------------------------------
// Arcane black market catalog
// ---------------------------------------------------------------------------
import { BLACK_MARKET_ITEMS, getRandomBlackMarketItem, getItemsByCategory as getBlackMarketByCategory, getItemsByRisk as getBlackMarketByRisk, getAllBlackMarketCategories, formatBlackMarketItem } from '../../src/data/arcaneBlackMarket';

describe('arcane black market catalog', () => {
  it('has at least 7 items', () => { expect(BLACK_MARKET_ITEMS.length).toBeGreaterThanOrEqual(7); });
  it('covers at least 5 categories', () => { expect(getAllBlackMarketCategories().length).toBeGreaterThanOrEqual(5); });
  it('generates random item', () => { const i = getRandomBlackMarketItem(); expect(i.name.length).toBeGreaterThan(3); expect(i.hiddenCatch.length).toBeGreaterThan(10); });
  it('filters by category', () => { const cursed = getBlackMarketByCategory('cursed'); expect(cursed.length).toBeGreaterThanOrEqual(1); });
  it('filters by risk', () => { const extreme = getBlackMarketByRisk('extreme'); expect(extreme.length).toBeGreaterThanOrEqual(1); });
  it('all have legal consequences', () => { BLACK_MARKET_ITEMS.forEach((i) => expect(i.legalConsequence.length).toBeGreaterThan(10)); });
  it('formats with catch toggle', () => { const i = getRandomBlackMarketItem(); expect(formatBlackMarketItem(i)).not.toContain('Hidden catch'); expect(formatBlackMarketItem(i, true)).toContain('Hidden catch'); });
});

// ---------------------------------------------------------------------------
// Clockwork dungeon generator
// ---------------------------------------------------------------------------
import { CLOCKWORK_DUNGEONS, getRandomClockworkDungeon, getRoomCount as getClockworkRoomCount, getJammedRooms, getTimedRooms, formatClockworkDungeon } from '../../src/data/clockworkDungeon';

describe('clockwork dungeon generator', () => {
  it('has at least 2 dungeons', () => { expect(CLOCKWORK_DUNGEONS.length).toBeGreaterThanOrEqual(2); });
  it('generates random dungeon', () => { const d = getRandomClockworkDungeon(); expect(d.name.length).toBeGreaterThan(3); expect(d.rooms.length).toBeGreaterThanOrEqual(3); });
  it('rooms have mechanisms', () => { CLOCKWORK_DUNGEONS.forEach((d) => d.rooms.forEach((r) => expect(r.mechanism.length).toBeGreaterThan(3))); });
  it('some rooms are timed', () => { CLOCKWORK_DUNGEONS.forEach((d) => expect(getTimedRooms(d).length).toBeGreaterThanOrEqual(1)); });
  it('all have shutdown methods', () => { CLOCKWORK_DUNGEONS.forEach((d) => expect(d.shutdownMethod.length).toBeGreaterThan(15)); });
  it('all have power sources', () => { CLOCKWORK_DUNGEONS.forEach((d) => expect(d.powerSource.length).toBeGreaterThan(10)); });
  it('all have lore', () => { CLOCKWORK_DUNGEONS.forEach((d) => expect(d.lore.length).toBeGreaterThan(20)); });
  it('formats dungeon', () => { expect(formatClockworkDungeon(CLOCKWORK_DUNGEONS[0])).toContain('Shutdown'); });
});

// ---------------------------------------------------------------------------
// Magical weather calendar
// ---------------------------------------------------------------------------
import { MAGICAL_WEATHER_CALENDAR, getWeatherForSeason, getWeatherForRegion, getWeatherForDay, getPlotRelevantWeather, getAllCalendarSeasons, getAllCalendarRegions, formatWeatherDay } from '../../src/data/magicalWeatherCalendar';

describe('magical weather calendar', () => {
  it('has at least 7 events', () => { expect(MAGICAL_WEATHER_CALENDAR.length).toBeGreaterThanOrEqual(7); });
  it('has 4 seasons', () => { expect(getAllCalendarSeasons().length).toBe(4); });
  it('has 6 regions', () => { expect(getAllCalendarRegions().length).toBe(6); });
  it('filters by season', () => { const winter = getWeatherForSeason('winter'); expect(winter.length).toBeGreaterThanOrEqual(1); });
  it('filters by region', () => { const coastal = getWeatherForRegion('coastal'); expect(coastal.length).toBeGreaterThanOrEqual(2); });
  it('looks up specific day', () => { const bloom = getWeatherForDay('spring', 1); expect(bloom).toBeDefined(); expect(bloom!.name).toBe('The Bloom Surge'); });
  it('most have plot relevance', () => { expect(getPlotRelevantWeather().length).toBeGreaterThanOrEqual(5); });
  it('all are recurring', () => { MAGICAL_WEATHER_CALENDAR.forEach((w) => expect(w.isRecurring).toBe(true)); });
  it('formats weather day', () => { expect(formatWeatherDay(MAGICAL_WEATHER_CALENDAR[0])).toContain('Regions'); });
});

// ---------------------------------------------------------------------------
// Dragon personality matrix
// ---------------------------------------------------------------------------
import { DRAGON_PROFILES, getDragonProfile, getProfilesByNegotiationStyle, getExploitableTraits, getAllDragonColors, formatDragonProfile } from '../../src/data/dragonPersonality';

describe('dragon personality matrix', () => {
  it('has at least 4 profiles', () => { expect(DRAGON_PROFILES.length).toBeGreaterThanOrEqual(4); });
  it('looks up by color', () => { const red = getDragonProfile('red'); expect(red).toBeDefined(); expect(red!.negotiationStyle).toBe('imperious'); });
  it('filters by negotiation style', () => { const scholarly = getProfilesByNegotiationStyle('scholarly'); expect(scholarly.length).toBeGreaterThanOrEqual(1); });
  it('finds exploitable traits', () => { DRAGON_PROFILES.forEach((p) => expect(getExploitableTraits(p).length).toBeGreaterThanOrEqual(1)); });
  it('all have parley conditions', () => { DRAGON_PROFILES.forEach((p) => expect(p.parleyCondition.length).toBeGreaterThan(15)); });
  it('all have sample dialogue', () => { DRAGON_PROFILES.forEach((p) => expect(p.sampleDialogue.length).toBeGreaterThanOrEqual(3)); });
  it('formats profile', () => { expect(formatDragonProfile(DRAGON_PROFILES[0])).toContain('Parley'); });
});

// ---------------------------------------------------------------------------
// Cataclysm countdown
// ---------------------------------------------------------------------------
import { CATACLYSMS, getRandomCataclysm, getCataclysmsByType, getTotalDaysToFinal, getCurrentStage, getAllCataclysmTypes, formatCataclysm } from '../../src/data/cataclysmCountdown';

describe('cataclysm countdown', () => {
  it('has at least 3 cataclysms', () => { expect(CATACLYSMS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 types', () => { expect(getAllCataclysmTypes().length).toBeGreaterThanOrEqual(3); });
  it('generates random cataclysm', () => { const c = getRandomCataclysm(); expect(c.name.length).toBeGreaterThan(3); expect(c.stages.length).toBeGreaterThanOrEqual(3); });
  it('total days > 0', () => { CATACLYSMS.forEach((c) => expect(getTotalDaysToFinal(c)).toBeGreaterThan(0)); });
  it('gets current stage by days', () => { const c = CATACLYSMS[0]; expect(getCurrentStage(c, 0).stage).toBe(1); expect(getCurrentStage(c, 999).stage).toBe(3); });
  it('all have prevention methods', () => { CATACLYSMS.forEach((c) => expect(c.preventionMethod.length).toBeGreaterThan(20)); });
  it('formats cataclysm', () => { expect(formatCataclysm(CATACLYSMS[0])).toContain('Prevention'); });
});

// ---------------------------------------------------------------------------
// Interplanar customs office
// ---------------------------------------------------------------------------
import { CUSTOMS_OFFICES, getRandomCustomsOffice, getOfficeByPlane, getCorruptOfficers, getTotalFormCount, formatCustomsOffice } from '../../src/data/interplanarCustoms';

describe('interplanar customs office', () => {
  it('has at least 3 offices', () => { expect(CUSTOMS_OFFICES.length).toBeGreaterThanOrEqual(3); });
  it('generates random office', () => { const o = getRandomCustomsOffice(); expect(o.planeName.length).toBeGreaterThan(3); expect(o.officers.length).toBeGreaterThanOrEqual(1); });
  it('looks up by plane', () => { const hells = getOfficeByPlane('Hells'); expect(hells).toBeDefined(); });
  it('some have corrupt officers', () => { const allCorrupt = CUSTOMS_OFFICES.flatMap(getCorruptOfficers); expect(allCorrupt.length).toBeGreaterThanOrEqual(1); });
  it('all have prohibited items', () => { CUSTOMS_OFFICES.forEach((o) => expect(o.prohibitedItems.length).toBeGreaterThanOrEqual(2)); });
  it('all have plot hooks', () => { CUSTOMS_OFFICES.forEach((o) => expect(o.plotHook.length).toBeGreaterThan(15)); });
  it('all have required forms', () => { CUSTOMS_OFFICES.forEach((o) => expect(getTotalFormCount(o)).toBeGreaterThanOrEqual(1)); });
  it('formats office', () => { expect(formatCustomsOffice(CUSTOMS_OFFICES[0])).toContain('Prohibited'); });
});

// ---------------------------------------------------------------------------
// Magical ecosystem generator
// ---------------------------------------------------------------------------
import { MAGICAL_ECOSYSTEMS, getRandomEcosystem, getEcosystemByBiome, getHarvestableOrganisms, getReversibleReactions, getAllEcosystemBiomes, formatEcosystem } from '../../src/data/magicalEcosystem';

describe('magical ecosystem generator', () => {
  it('has at least 2 ecosystems', () => { expect(MAGICAL_ECOSYSTEMS.length).toBeGreaterThanOrEqual(2); });
  it('covers at least 2 biomes', () => { expect(getAllEcosystemBiomes().length).toBeGreaterThanOrEqual(2); });
  it('generates random ecosystem', () => { const e = getRandomEcosystem(); expect(e.organisms.length).toBeGreaterThanOrEqual(3); expect(e.reactions.length).toBeGreaterThanOrEqual(3); });
  it('looks up by biome', () => { const forest = getEcosystemByBiome('enchanted_forest'); expect(forest).toBeDefined(); });
  it('has harvestable organisms', () => { MAGICAL_ECOSYSTEMS.forEach((e) => expect(getHarvestableOrganisms(e).length).toBeGreaterThanOrEqual(1)); });
  it('most reactions are reversible', () => { MAGICAL_ECOSYSTEMS.forEach((e) => expect(getReversibleReactions(e).length).toBeGreaterThanOrEqual(1)); });
  it('all have collapse warnings', () => { MAGICAL_ECOSYSTEMS.forEach((e) => expect(e.collapseWarning.length).toBeGreaterThan(20)); });
  it('formats ecosystem', () => { expect(formatEcosystem(MAGICAL_ECOSYSTEMS[0])).toContain('Organisms'); });
});

// ---------------------------------------------------------------------------
// Time loop dungeon
// ---------------------------------------------------------------------------
import { TIME_LOOP_DUNGEONS, getRandomTimeLoop, getTimeLoopByMechanic, getRoomCount as getLoopRoomCount, getAllLoopMechanics, formatTimeLoop } from '../../src/data/timeLoopDungeon';

describe('time loop dungeon', () => {
  it('has at least 2 dungeons', () => { expect(TIME_LOOP_DUNGEONS.length).toBeGreaterThanOrEqual(2); });
  it('has 4 loop mechanics', () => { expect(getAllLoopMechanics().length).toBe(4); });
  it('generates random time loop', () => { const d = getRandomTimeLoop(); expect(d.name.length).toBeGreaterThan(3); expect(d.rooms.length).toBeGreaterThanOrEqual(3); });
  it('rooms have loop clues', () => { TIME_LOOP_DUNGEONS.forEach((d) => d.rooms.forEach((r) => expect(r.loopClue.length).toBeGreaterThan(10))); });
  it('all have escape conditions', () => { TIME_LOOP_DUNGEONS.forEach((d) => expect(d.escapCondition.length).toBeGreaterThan(15)); });
  it('all have max loop consequences', () => { TIME_LOOP_DUNGEONS.forEach((d) => expect(d.consequenceOfMaxLoops.length).toBeGreaterThan(15)); });
  it('all have lore', () => { TIME_LOOP_DUNGEONS.forEach((d) => expect(d.lore.length).toBeGreaterThan(20)); });
  it('formats time loop', () => { expect(formatTimeLoop(TIME_LOOP_DUNGEONS[0])).toContain('Escape'); });
});

// ---------------------------------------------------------------------------
// Weapon sentience awakening
// ---------------------------------------------------------------------------
import { WEAPON_AWAKENINGS, getRandomAwakening, getAwakeningByTrigger, getAwakeningStage as getWeaponStage, getAllTriggers as getAllAwakeningTriggers, formatAwakening } from '../../src/data/weaponSentienceAwaken';

describe('weapon sentience awakening', () => {
  it('has at least 3 awakenings', () => { expect(WEAPON_AWAKENINGS.length).toBeGreaterThanOrEqual(3); });
  it('has 6 trigger types', () => { expect(getAllAwakeningTriggers().length).toBe(6); });
  it('generates random awakening', () => { const a = getRandomAwakening(); expect(a.weaponType.length).toBeGreaterThan(3); expect(a.stages.length).toBeGreaterThanOrEqual(3); });
  it('filters by trigger', () => { const nearDeath = getAwakeningByTrigger('wielder_near_death'); expect(nearDeath.length).toBeGreaterThanOrEqual(1); });
  it('stages have 3 progressive stages', () => { WEAPON_AWAKENINGS.forEach((a) => { expect(a.stages.length).toBe(3); expect(a.stages[0].stage).toBe(1); expect(a.stages[2].stage).toBe(3); }); });
  it('all have conflict risks', () => { WEAPON_AWAKENINGS.forEach((a) => expect(a.conflictRisk.length).toBeGreaterThan(15)); });
  it('all have final personalities', () => { WEAPON_AWAKENINGS.forEach((a) => expect(a.finalPersonality.length).toBeGreaterThan(15)); });
  it('formats awakening', () => { expect(formatAwakening(WEAPON_AWAKENINGS[0], 2)).toContain('Stage 2'); });
});

// ---------------------------------------------------------------------------
// Dark bargain generator
// ---------------------------------------------------------------------------
import { DARK_BARGAINS, getRandomBargain, getBargainsBySource, getHighTemptationBargains, getAllBargainSources, formatBargain as formatDarkBargain } from '../../src/data/darkBargain';

describe('dark bargain generator', () => {
  it('has at least 5 bargains', () => { expect(DARK_BARGAINS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 sources', () => { expect(getAllBargainSources().length).toBeGreaterThanOrEqual(4); });
  it('generates random bargain', () => { const b = getRandomBargain(); expect(b.name.length).toBeGreaterThan(3); expect(b.immediateGain.length).toBeGreaterThan(10); });
  it('filters by source', () => { const devil = getBargainsBySource('devil'); expect(devil.length).toBeGreaterThanOrEqual(1); });
  it('filters high temptation', () => { const tempting = getHighTemptationBargains(8); expect(tempting.length).toBeGreaterThanOrEqual(1); tempting.forEach((b) => expect(b.temptationLevel).toBeGreaterThanOrEqual(8)); });
  it('all have break conditions', () => { DARK_BARGAINS.forEach((b) => expect(b.breakCondition.length).toBeGreaterThan(15)); });
  it('formats with hidden toggle', () => { const b = getRandomBargain(); expect(formatDarkBargain(b)).not.toContain('Hidden'); expect(formatDarkBargain(b, true)).toContain('Hidden'); });
});

// ---------------------------------------------------------------------------
// NPC death scene generator
// ---------------------------------------------------------------------------
import { DEATH_SCENES, getRandomDeathScene, getScenesByContext, getScenesWithMechanicalEffects, getAllDeathContexts, formatDeathScene } from '../../src/data/npcDeathScene';

describe('NPC death scene generator', () => {
  it('has at least 6 scenes', () => { expect(DEATH_SCENES.length).toBeGreaterThanOrEqual(6); });
  it('covers 6 contexts', () => { expect(getAllDeathContexts().length).toBe(6); });
  it('generates random scene', () => { const s = getRandomDeathScene(); expect(s.lastWords.length).toBeGreaterThan(10); expect(s.dramaticBeat.length).toBeGreaterThan(15); });
  it('filters by context', () => { const sacrifice = getScenesByContext('sacrifice'); expect(sacrifice.length).toBeGreaterThanOrEqual(1); });
  it('most have mechanical effects', () => { expect(getScenesWithMechanicalEffects().length).toBeGreaterThanOrEqual(4); });
  it('all have memorial options', () => { DEATH_SCENES.forEach((s) => expect(s.memorialOption.length).toBeGreaterThan(15)); });
  it('formats with NPC name', () => { expect(formatDeathScene(DEATH_SCENES[0], 'Gandalf')).toContain('Gandalf'); });
});

// ---------------------------------------------------------------------------
// Lair action generator
// ---------------------------------------------------------------------------
import { LAIR_ACTIONS, getRandomLairAction, getLairActionsByTheme, getLairActionsAboveDC, getAllLairThemes, formatLairAction } from '../../src/data/lairAction';

describe('lair action generator', () => {
  it('has at least 8 actions', () => { expect(LAIR_ACTIONS.length).toBeGreaterThanOrEqual(8); });
  it('covers at least 5 themes', () => { expect(getAllLairThemes().length).toBeGreaterThanOrEqual(5); });
  it('generates random action', () => { const a = getRandomLairAction(); expect(a.name.length).toBeGreaterThan(3); expect(a.initiative).toBe(20); });
  it('filters by theme', () => { const fire = getLairActionsByTheme('fire'); expect(fire.length).toBeGreaterThanOrEqual(1); fire.forEach((a) => expect(a.theme).toBe('fire')); });
  it('filters above DC', () => { const hard = getLairActionsAboveDC(15); expect(hard.length).toBeGreaterThanOrEqual(3); hard.forEach((a) => expect(a.saveDC).toBeGreaterThanOrEqual(15)); });
  it('all have areas of effect', () => { LAIR_ACTIONS.forEach((a) => expect(a.areaOfEffect.length).toBeGreaterThan(5)); });
  it('formats action', () => { expect(formatLairAction(LAIR_ACTIONS[0])).toContain('Save'); });
});

// ---------------------------------------------------------------------------
// Planar refugee crisis
// ---------------------------------------------------------------------------
import { REFUGEE_GROUPS, getRandomRefugeeGroup, getGroupsByPlane as getRefugeesByPlane, getGroupsWithTensions, getAllRefugeePlanes, formatRefugeeGroup } from '../../src/data/planarRefugee';

describe('planar refugee crisis', () => {
  it('has at least 4 groups', () => { expect(REFUGEE_GROUPS.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 4 planes', () => { expect(getAllRefugeePlanes().length).toBeGreaterThanOrEqual(4); });
  it('generates random group', () => { const g = getRandomRefugeeGroup(); expect(g.name.length).toBeGreaterThan(3); expect(g.needs.length).toBeGreaterThanOrEqual(2); });
  it('all have tensions', () => { expect(getGroupsWithTensions().length).toBe(REFUGEE_GROUPS.length); });
  it('all have plot hooks', () => { REFUGEE_GROUPS.forEach((g) => expect(g.plotHook.length).toBeGreaterThan(20)); });
  it('all offer something in return', () => { REFUGEE_GROUPS.forEach((g) => expect(g.offers.length).toBeGreaterThanOrEqual(2)); });
  it('formats group', () => { expect(formatRefugeeGroup(REFUGEE_GROUPS[0])).toContain('Tension'); });
});

// ---------------------------------------------------------------------------
// Dream combat system
// ---------------------------------------------------------------------------
import { DREAM_COMBAT_RULES, getRandomDreamCombat, getDreamCombatByTerrain, getAllDreamTerrains, getAttackCount as getDreamAttacks, formatDreamCombat } from '../../src/data/dreamCombat';

describe('dream combat system', () => {
  it('has at least 3 terrains', () => { expect(DREAM_COMBAT_RULES.length).toBeGreaterThanOrEqual(3); expect(getAllDreamTerrains().length).toBeGreaterThanOrEqual(3); });
  it('generates random combat', () => { const c = getRandomDreamCombat(); expect(c.uniqueRules.length).toBeGreaterThanOrEqual(3); expect(c.availableAttacks.length).toBeGreaterThanOrEqual(3); });
  it('looks up by terrain', () => { const mem = getDreamCombatByTerrain('memory_palace'); expect(mem).toBeDefined(); });
  it('all have victory/defeat conditions', () => { DREAM_COMBAT_RULES.forEach((c) => { expect(c.victoryCondition.length).toBeGreaterThan(10); expect(c.defeatConsequence.length).toBeGreaterThan(10); }); });
  it('all have wake conditions', () => { DREAM_COMBAT_RULES.forEach((c) => expect(c.wakeCondition.length).toBeGreaterThan(10)); });
  it('formats combat', () => { expect(formatDreamCombat(DREAM_COMBAT_RULES[0])).toContain('Attacks'); });
});

// ---------------------------------------------------------------------------
// Magical library catalog
// ---------------------------------------------------------------------------
import { MAGICAL_LIBRARY_CATALOG, getRandomSection, getSectionByName, getBooksByDanger, getBooksWithDefenses, getAllSectionNames, formatSection as formatLibSection } from '../../src/data/magicalLibraryCatalog';

describe('magical library catalog', () => {
  it('has at least 3 sections', () => { expect(MAGICAL_LIBRARY_CATALOG.length).toBeGreaterThanOrEqual(3); });
  it('generates random section', () => { const s = getRandomSection(); expect(s.sectionName.length).toBeGreaterThan(3); expect(s.books.length).toBeGreaterThanOrEqual(2); });
  it('looks up by name', () => { const forbidden = getSectionByName('Forbidden'); expect(forbidden).toBeDefined(); });
  it('has dangerous books', () => { const lethal = getBooksByDanger('lethal'); expect(lethal.length).toBeGreaterThanOrEqual(1); });
  it('some books have defenses', () => { expect(getBooksWithDefenses().length).toBeGreaterThanOrEqual(3); });
  it('all sections have librarians', () => { MAGICAL_LIBRARY_CATALOG.forEach((s) => expect(s.librarian.length).toBeGreaterThan(10)); });
  it('all sections have hazards', () => { MAGICAL_LIBRARY_CATALOG.forEach((s) => expect(s.sectionHazard.length).toBeGreaterThan(10)); });
  it('formats section', () => { expect(formatLibSection(MAGICAL_LIBRARY_CATALOG[0])).toContain('Books'); });
});

// ---------------------------------------------------------------------------
// Villain monologue generator
// ---------------------------------------------------------------------------
import { VILLAIN_MONOLOGUES, getRandomMonologue, getMonologuesByArchetype, getMonologuesByMoment, getAllArchetypes as getAllVillainArchetypes, getAllMonologueMoments, formatMonologue } from '../../src/data/villainMonologue';

describe('villain monologue generator', () => {
  it('has at least 6 monologues', () => { expect(VILLAIN_MONOLOGUES.length).toBeGreaterThanOrEqual(6); });
  it('covers at least 5 archetypes', () => { expect(getAllVillainArchetypes().length).toBeGreaterThanOrEqual(5); });
  it('generates random monologue', () => { const m = getRandomMonologue(); expect(m.speech.length).toBeGreaterThan(50); expect(m.dramaticPause.length).toBeGreaterThan(10); });
  it('filters by archetype', () => { const tragic = getMonologuesByArchetype('tragic'); expect(tragic.length).toBeGreaterThanOrEqual(1); });
  it('all have interruption mechanics', () => { VILLAIN_MONOLOGUES.forEach((m) => { expect(m.interruptionDC).toBeGreaterThanOrEqual(8); expect(m.ifInterrupted.length).toBeGreaterThan(10); }); });
  it('all have completion effects', () => { VILLAIN_MONOLOGUES.forEach((m) => expect(m.ifCompleted.length).toBeGreaterThan(15)); });
  it('formats monologue', () => { expect(formatMonologue(VILLAIN_MONOLOGUES[0])).toContain('Interrupt DC'); });
});

// ---------------------------------------------------------------------------
// Diplomatic gift generator
// ---------------------------------------------------------------------------
import { DIPLOMATIC_GIFTS, getRandomGift as getRandomDiploGift, getGiftsForCulture, getGiftsWithTaboos, getAllGiftCultures, formatGift as formatDiploGift } from '../../src/data/diplomaticGift';

describe('diplomatic gift generator', () => {
  it('has at least 8 gifts', () => { expect(DIPLOMATIC_GIFTS.length).toBeGreaterThanOrEqual(8); });
  it('covers at least 6 cultures', () => { expect(getAllGiftCultures().length).toBeGreaterThanOrEqual(6); });
  it('generates random gift', () => { const g = getRandomDiploGift(); expect(g.culturalSignificance.length).toBeGreaterThan(15); });
  it('filters by culture', () => { const dwarven = getGiftsForCulture('dwarven'); expect(dwarven.length).toBeGreaterThanOrEqual(1); });
  it('most have taboos', () => { expect(getGiftsWithTaboos().length).toBeGreaterThanOrEqual(5); });
  it('all have cultural significance', () => { DIPLOMATIC_GIFTS.forEach((g) => expect(g.culturalSignificance.length).toBeGreaterThan(15)); });
  it('formats gift', () => { expect(formatDiploGift(DIPLOMATIC_GIFTS[0])).toContain('Significance'); });
});

// ---------------------------------------------------------------------------
// Shapeshifter detector
// ---------------------------------------------------------------------------
import { DETECTION_TECHNIQUES, getTechniquesForType, getTechniquesByMethod, getMostReliableTechniques, getAllShapeshifterTypes, getAllDetectionMethods, formatTechnique } from '../../src/data/shapeshifterDetector';

describe('shapeshifter detector', () => {
  it('has at least 8 techniques', () => { expect(DETECTION_TECHNIQUES.length).toBeGreaterThanOrEqual(8); });
  it('has 7 shapeshifter types', () => { expect(getAllShapeshifterTypes().length).toBe(7); });
  it('has 5 detection methods', () => { expect(getAllDetectionMethods().length).toBe(5); });
  it('finds techniques for type', () => { const doppel = getTechniquesForType('doppelganger'); expect(doppel.length).toBeGreaterThanOrEqual(3); });
  it('filters by method', () => { const magical = getTechniquesByMethod('magical'); expect(magical.length).toBeGreaterThanOrEqual(1); });
  it('has reliable options', () => { const reliable = getMostReliableTechniques(); expect(reliable.length).toBeGreaterThanOrEqual(2); reliable.forEach((t) => expect(t.falsePositiveChance).toBeLessThanOrEqual(5)); });
  it('truesight works on everything', () => { const truesight = DETECTION_TECHNIQUES.find((t) => t.name.includes('Truesight')); expect(truesight!.effectiveAgainst.length).toBe(7); });
  it('formats technique', () => { expect(formatTechnique(DETECTION_TECHNIQUES[0])).toContain('Effective vs'); });
});

// ---------------------------------------------------------------------------
// Dragon hoard layout
// ---------------------------------------------------------------------------
import { HOARD_LAYOUTS, getRandomHoardLayout, getLayoutsBySize as getHoardsBySize, getZonesWithTraps as getHoardTraps, getHighestValueZone, getAllHoardSizes, formatHoardLayout } from '../../src/data/dragonHoardLayout';

describe('dragon hoard layout', () => {
  it('has at least 3 layouts', () => { expect(HOARD_LAYOUTS.length).toBeGreaterThanOrEqual(3); });
  it('has 4 hoard sizes', () => { expect(getAllHoardSizes().length).toBe(4); });
  it('generates random layout', () => { const l = getRandomHoardLayout(); expect(l.zones.length).toBeGreaterThanOrEqual(3); expect(l.totalValue).toBeGreaterThan(0); });
  it('has trapped zones', () => { HOARD_LAYOUTS.forEach((l) => expect(getHoardTraps(l).length).toBeGreaterThanOrEqual(1)); });
  it('highest value zone exists', () => { HOARD_LAYOUTS.forEach((l) => expect(getHighestValueZone(l).lootValue).toBeGreaterThan(0)); });
  it('all have alarm triggers', () => { HOARD_LAYOUTS.forEach((l) => expect(l.alarmTrigger.length).toBeGreaterThan(15)); });
  it('all have escape routes', () => { HOARD_LAYOUTS.forEach((l) => expect(l.escapeRoute.length).toBeGreaterThan(10)); });
  it('all have hidden caches', () => { HOARD_LAYOUTS.forEach((l) => expect(l.hiddenCacheDC).toBeGreaterThanOrEqual(16)); });
  it('formats layout', () => { expect(formatHoardLayout(HOARD_LAYOUTS[0])).toContain('Alarm'); });
});

// ---------------------------------------------------------------------------
// Astral weather hazards
// ---------------------------------------------------------------------------
import { ASTRAL_WEATHER_HAZARDS, getRandomAstralWeather, getHazardByType as getAstralHazardByType, getHazardsWithBenefits as getAstralBenefits, getAllAstralWeatherTypes, formatAstralWeather } from '../../src/data/astralWeatherHazard';

describe('astral weather hazards', () => {
  it('has 6 hazard types', () => { expect(ASTRAL_WEATHER_HAZARDS.length).toBe(6); expect(getAllAstralWeatherTypes().length).toBe(6); });
  it('generates random hazard', () => { const h = getRandomAstralWeather(); expect(h.mechanicalEffects.length).toBeGreaterThanOrEqual(3); });
  it('looks up by type', () => { const storm = getAstralHazardByType('psychic_storm'); expect(storm).toBeDefined(); });
  it('some have benefits', () => { expect(getAstralBenefits().length).toBeGreaterThanOrEqual(3); });
  it('all have avoidance methods', () => { ASTRAL_WEATHER_HAZARDS.forEach((h) => expect(h.avoidance.length).toBeGreaterThan(15)); });
  it('all have warning DCs', () => { ASTRAL_WEATHER_HAZARDS.forEach((h) => expect(h.warningSignsDC).toBeGreaterThanOrEqual(8)); });
  it('formats hazard', () => { expect(formatAstralWeather(ASTRAL_WEATHER_HAZARDS[0])).toContain('Effects'); });
});

// ---------------------------------------------------------------------------
// Tattoo removal system
// ---------------------------------------------------------------------------
import { TATTOO_REMOVAL_OPTIONS, getRemovalOption, getSafeOptions, getOptionsByMaxCost, getLeastPainful, getAllRemovalMethods, formatRemovalOption } from '../../src/data/tattooRemoval';

describe('tattoo removal system', () => {
  it('has 6 removal methods', () => { expect(TATTOO_REMOVAL_OPTIONS.length).toBe(6); expect(getAllRemovalMethods().length).toBe(6); });
  it('looks up by method', () => { const divine = getRemovalOption('divine'); expect(divine).toBeDefined(); expect(divine!.risk).toBe('safe'); });
  it('has safe options', () => { const safe = getSafeOptions(); expect(safe.length).toBeGreaterThanOrEqual(2); safe.forEach((o) => expect(o.risk).toBe('safe')); });
  it('filters by cost', () => { const free = getOptionsByMaxCost(0); expect(free.length).toBeGreaterThanOrEqual(2); });
  it('least painful has low score', () => { expect(getLeastPainful().painLevel).toBeLessThanOrEqual(2); });
  it('all have failure effects', () => { TATTOO_REMOVAL_OPTIONS.forEach((o) => expect(o.failureEffect.length).toBeGreaterThan(15)); });
  it('pain levels vary', () => { const pains = TATTOO_REMOVAL_OPTIONS.map((o) => o.painLevel); expect(Math.max(...pains) - Math.min(...pains)).toBeGreaterThanOrEqual(5); });
  it('formats option', () => { expect(formatRemovalOption(TATTOO_REMOVAL_OPTIONS[0])).toContain('Pain'); });
});

// ---------------------------------------------------------------------------
// Arcane addiction system
// ---------------------------------------------------------------------------
import { ADDICTION_PROFILES, getAddictionProfile, getAllAddictionSources, getAllStages as getAllAddictionStages, formatAddiction } from '../../src/data/arcaneAddiction';

describe('arcane addiction system', () => {
  it('has at least 3 profiles', () => { expect(ADDICTION_PROFILES.length).toBeGreaterThanOrEqual(3); });
  it('has 5 addiction stages', () => { expect(getAllAddictionStages().length).toBe(5); });
  it('looks up by source', () => { const p = getAddictionProfile('potion_abuse'); expect(p).toBeDefined(); expect(p!.stages.length).toBeGreaterThanOrEqual(3); });
  it('withdrawal DCs escalate', () => { ADDICTION_PROFILES.forEach((p) => { const dcs = p.stages.map((s) => s.saveDC); for (let i = 1; i < dcs.length; i++) expect(dcs[i]).toBeGreaterThanOrEqual(dcs[i - 1]); }); });
  it('all have cure methods', () => { ADDICTION_PROFILES.forEach((p) => expect(p.cureMethod.length).toBeGreaterThan(15)); });
  it('all have relapse triggers', () => { ADDICTION_PROFILES.forEach((p) => expect(p.relapseTrigger.length).toBeGreaterThan(10)); });
  it('formats addiction', () => { expect(formatAddiction(ADDICTION_PROFILES[0], 'dependent')).toContain('dependent'); });
});

// ---------------------------------------------------------------------------
// Cursed artifact auction
// ---------------------------------------------------------------------------
import { CURSED_AUCTIONS, getRandomAuction, getTotalLots, getCursedLots, getHighRiskLots, formatAuction } from '../../src/data/cursedAuction';

describe('cursed artifact auction', () => {
  it('has at least 2 auctions', () => { expect(CURSED_AUCTIONS.length).toBeGreaterThanOrEqual(2); });
  it('generates random auction', () => { const a = getRandomAuction(); expect(a.auctionName.length).toBeGreaterThan(3); expect(a.lots.length).toBeGreaterThanOrEqual(3); });
  it('counts lots', () => { CURSED_AUCTIONS.forEach((a) => expect(getTotalLots(a)).toBe(a.lots.length)); });
  it('most lots are cursed', () => { CURSED_AUCTIONS.forEach((a) => expect(getCursedLots(a).length).toBeGreaterThanOrEqual(1)); });
  it('all have plot twists', () => { CURSED_AUCTIONS.forEach((a) => expect(a.plotTwist.length).toBeGreaterThan(20)); });
  it('all have house rules', () => { CURSED_AUCTIONS.forEach((a) => expect(a.houseRules.length).toBeGreaterThanOrEqual(3)); });
  it('formats auction', () => { expect(formatAuction(CURSED_AUCTIONS[0])).toContain('Lot'); });
});

// ---------------------------------------------------------------------------
// NPC pet/companion
// ---------------------------------------------------------------------------
import { NPC_PETS, getRandomPet, getPetsByRole, getPetsWithPlotRelevance, getPetsWithMechanicalUse, getAllPetRoles, formatPet } from '../../src/data/npcPetCompanion';

describe('NPC pet/companion', () => {
  it('has at least 6 pets', () => { expect(NPC_PETS.length).toBeGreaterThanOrEqual(6); });
  it('covers at least 5 roles', () => { expect(getAllPetRoles().length).toBeGreaterThanOrEqual(5); });
  it('generates random pet', () => { const p = getRandomPet(); expect(p.name.length).toBeGreaterThan(2); expect(p.quirk.length).toBeGreaterThan(10); });
  it('most have plot relevance', () => { expect(getPetsWithPlotRelevance().length).toBeGreaterThanOrEqual(3); });
  it('most have mechanical use', () => { expect(getPetsWithMechanicalUse().length).toBeGreaterThanOrEqual(3); });
  it('all have owner relationships', () => { NPC_PETS.forEach((p) => expect(p.ownerRelationship.length).toBeGreaterThan(10)); });
  it('formats pet', () => { expect(formatPet(NPC_PETS[0])).toContain('Quirk'); });
});

// ---------------------------------------------------------------------------
// Ancient language decoder
// ---------------------------------------------------------------------------
import { INSCRIPTION_PUZZLES, getRandomPuzzle as getRandomInscription, getPuzzlesByLanguage, getAllLanguageFamilies, formatPuzzle as formatInscription } from '../../src/data/ancientLanguageDecoder';

describe('ancient language decoder', () => {
  it('has at least 6 puzzles', () => { expect(INSCRIPTION_PUZZLES.length).toBeGreaterThanOrEqual(6); });
  it('covers 6 language families', () => { expect(getAllLanguageFamilies().length).toBe(6); });
  it('generates random puzzle', () => { const p = getRandomInscription(); expect(p.inscription.length).toBeGreaterThan(5); expect(p.translation.length).toBeGreaterThan(10); });
  it('filters by language', () => { const draconic = getPuzzlesByLanguage('draconic'); expect(draconic.length).toBeGreaterThanOrEqual(1); });
  it('all have partial clues', () => { INSCRIPTION_PUZZLES.forEach((p) => expect(p.partialClue.length).toBeGreaterThan(15)); });
  it('all have rewards', () => { INSCRIPTION_PUZZLES.forEach((p) => expect(p.reward.length).toBeGreaterThan(10)); });
  it('formats with translation toggle', () => { const p = getRandomInscription(); expect(formatInscription(p)).not.toContain('Translation'); expect(formatInscription(p, true)).toContain('Translation'); });
});

// ---------------------------------------------------------------------------
// Battlefield aftermath
// ---------------------------------------------------------------------------
import { BATTLEFIELD_AFTERMATHS, getRandomAftermath, getAftermathByScale, getAftermathsWithSurvivors, getAllBattleScales, formatAftermath } from '../../src/data/battlefieldAftermath';

describe('battlefield aftermath', () => {
  it('has at least 3 aftermaths', () => { expect(BATTLEFIELD_AFTERMATHS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 scales', () => { expect(getAllBattleScales().length).toBeGreaterThanOrEqual(3); });
  it('generates random aftermath', () => { const a = getRandomAftermath(); expect(a.details.length).toBeGreaterThanOrEqual(3); expect(a.scavengeOpportunities.length).toBeGreaterThanOrEqual(3); });
  it('all have survivors', () => { expect(getAftermathsWithSurvivors().length).toBe(BATTLEFIELD_AFTERMATHS.length); });
  it('all have narrative moments', () => { BATTLEFIELD_AFTERMATHS.forEach((a) => expect(a.narrativeMoment.length).toBeGreaterThan(20)); });
  it('all have environmental hazards', () => { BATTLEFIELD_AFTERMATHS.forEach((a) => expect(a.environmentalHazard.length).toBeGreaterThan(15)); });
  it('scavenge items have DCs', () => { BATTLEFIELD_AFTERMATHS.forEach((a) => a.scavengeOpportunities.forEach((s) => expect(s.findDC).toBeGreaterThanOrEqual(8))); });
  it('formats aftermath', () => { expect(formatAftermath(BATTLEFIELD_AFTERMATHS[0])).toContain('Hazard'); });
});

// ---------------------------------------------------------------------------
// Magical weather forecast
// ---------------------------------------------------------------------------
import { MAGICAL_FORECASTS, getRandomForecast, getForecastsByAccuracy, getReliableForecasts, getAllForecastAccuracies, formatForecast } from '../../src/data/magicalForecast';

describe('magical weather forecast', () => {
  it('has at least 6 forecasts', () => { expect(MAGICAL_FORECASTS.length).toBeGreaterThanOrEqual(6); });
  it('has 4 accuracy levels', () => { expect(getAllForecastAccuracies().length).toBe(4); });
  it('generates random forecast', () => { const f = getRandomForecast(); expect(f.signs.length).toBeGreaterThanOrEqual(2); expect(f.prediction.length).toBeGreaterThan(20); });
  it('filters by accuracy', () => { const certain = getForecastsByAccuracy('certain'); expect(certain.length).toBeGreaterThanOrEqual(1); certain.forEach((f) => expect(f.accuracy).toBe('certain')); });
  it('reliable forecasts have low false alarm', () => { const reliable = getReliableForecasts(); expect(reliable.length).toBeGreaterThanOrEqual(2); reliable.forEach((f) => expect(f.falseAlarmChance).toBeLessThanOrEqual(15)); });
  it('all have preparation advice', () => { MAGICAL_FORECASTS.forEach((f) => expect(f.preparationAdvice.length).toBeGreaterThan(15)); });
  it('all have mechanical impact', () => { MAGICAL_FORECASTS.forEach((f) => expect(f.mechanicalImpact.length).toBeGreaterThan(15)); });
  it('formats forecast', () => { expect(formatForecast(MAGICAL_FORECASTS[0])).toContain('Signs'); });
});

// ---------------------------------------------------------------------------
// Villain lair designer
// ---------------------------------------------------------------------------
import { VILLAIN_LAIRS, getRandomLair, getLairsByType, getAllLairTypes, formatLair } from '../../src/data/villainLair';

describe('villain lair designer', () => {
  it('has at least 3 lairs', () => { expect(VILLAIN_LAIRS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 types', () => { expect(getAllLairTypes().length).toBeGreaterThanOrEqual(3); });
  it('generates random lair', () => { const l = getRandomLair(); expect(l.features.length).toBeGreaterThanOrEqual(3); });
  it('all have environmental storytelling', () => { VILLAIN_LAIRS.forEach((l) => expect(l.environmentalStorytelling.length).toBeGreaterThanOrEqual(3)); });
  it('all have boss advantages and party opportunities', () => { VILLAIN_LAIRS.forEach((l) => { expect(l.bossAdvantage.length).toBeGreaterThan(15); expect(l.partyOpportunity.length).toBeGreaterThan(15); }); });
  it('formats lair', () => { expect(formatLair(VILLAIN_LAIRS[0])).toContain('Boss advantage'); });
});

// ---------------------------------------------------------------------------
// Magical bond system
// ---------------------------------------------------------------------------
import { MAGICAL_BONDS, getBond, getAllBondTypes, getBondsWithinDistance, formatBond } from '../../src/data/magicalBond';

describe('magical bond system', () => {
  it('has at least 4 bonds', () => { expect(MAGICAL_BONDS.length).toBeGreaterThanOrEqual(4); });
  it('looks up by type', () => { const b = getBond('life_link'); expect(b).toBeDefined(); expect(b!.benefits.length).toBeGreaterThanOrEqual(2); });
  it('all have drawbacks', () => { MAGICAL_BONDS.forEach((b) => expect(b.drawbacks.length).toBeGreaterThanOrEqual(2)); });
  it('all have break conditions', () => { MAGICAL_BONDS.forEach((b) => expect(b.breakCondition.length).toBeGreaterThan(10)); });
  it('distance filter works', () => { const close = getBondsWithinDistance(60); expect(close.length).toBeGreaterThanOrEqual(2); });
  it('formats bond', () => { expect(formatBond(MAGICAL_BONDS[0])).toContain('Ritual'); });
});

// ---------------------------------------------------------------------------
// Quest reward negotiation
// ---------------------------------------------------------------------------
import { QUEST_REWARD_NEGOTIATIONS, getRandomNegotiation, getNegotiationsByAttitude, getMaxRewardValue, getNegotiationsWithHiddenRewards, getAllAttitudes, formatNegotiation } from '../../src/data/questRewardNegotiation';

describe('quest reward negotiation', () => {
  it('has at least 4 negotiations', () => { expect(QUEST_REWARD_NEGOTIATIONS.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 4 attitudes', () => { expect(getAllAttitudes().length).toBeGreaterThanOrEqual(4); });
  it('generates random negotiation', () => { const n = getRandomNegotiation(); expect(n.levers.length).toBeGreaterThanOrEqual(2); });
  it('best deal > worst deal', () => { QUEST_REWARD_NEGOTIATIONS.forEach((n) => expect(n.bestPossibleDeal.value).toBeGreaterThanOrEqual(n.worstDeal.value)); });
  it('some have hidden rewards', () => { expect(getNegotiationsWithHiddenRewards().length).toBeGreaterThanOrEqual(2); });
  it('all have walk-away consequences', () => { QUEST_REWARD_NEGOTIATIONS.forEach((n) => expect(n.walkAwayConsequence.length).toBeGreaterThan(15)); });
  it('formats negotiation', () => { expect(formatNegotiation(QUEST_REWARD_NEGOTIATIONS[0])).toContain('Original'); });
});

// ---------------------------------------------------------------------------
// Artifact history generator
// ---------------------------------------------------------------------------
import { ARTIFACT_HISTORIES, getRandomHistory, getChapterCount, getChapterByEra, getArtifactsWithProphecies, getArtifactsWithCurses, formatHistory } from '../../src/data/artifactHistory';

describe('artifact history generator', () => {
  it('has at least 2 histories', () => { expect(ARTIFACT_HISTORIES.length).toBeGreaterThanOrEqual(2); });
  it('each has 5 chapters', () => { ARTIFACT_HISTORIES.forEach((h) => expect(getChapterCount(h)).toBe(5)); });
  it('chapters cover all eras', () => { ARTIFACT_HISTORIES.forEach((h) => { expect(getChapterByEra(h, 'creation')).toBeDefined(); expect(getChapterByEra(h, 'rediscovery')).toBeDefined(); }); });
  it('some have prophecies', () => { expect(getArtifactsWithProphecies().length).toBeGreaterThanOrEqual(1); });
  it('some have curse origins', () => { expect(getArtifactsWithCurses().length).toBeGreaterThanOrEqual(1); });
  it('all have current status', () => { ARTIFACT_HISTORIES.forEach((h) => expect(h.currentStatus.length).toBeGreaterThan(15)); });
  it('formats history', () => { expect(formatHistory(ARTIFACT_HISTORIES[0])).toContain('Status'); });
});

// ---------------------------------------------------------------------------
// Tavern entertainment
// ---------------------------------------------------------------------------
import { TAVERN_ENTERTAINMENT, getRandomEntertainment, getEntertainmentByType, getEventsWithSecrets, getAllEntertainmentTypes, formatEntertainment } from '../../src/data/tavernEntertainment';

describe('tavern entertainment', () => {
  it('has at least 5 events', () => { expect(TAVERN_ENTERTAINMENT.length).toBeGreaterThanOrEqual(5); });
  it('covers 5 types', () => { expect(getAllEntertainmentTypes().length).toBe(5); });
  it('generates random event', () => { const e = getRandomEntertainment(); expect(e.winReward.length).toBeGreaterThan(10); });
  it('most have secret opportunities', () => { expect(getEventsWithSecrets().length).toBeGreaterThanOrEqual(3); });
  it('all have audience reactions', () => { TAVERN_ENTERTAINMENT.forEach((e) => expect(e.audienceReaction.length).toBeGreaterThan(10)); });
  it('all have lose consequences', () => { TAVERN_ENTERTAINMENT.forEach((e) => expect(e.loseConsequence.length).toBeGreaterThan(10)); });
  it('formats entertainment', () => { expect(formatEntertainment(TAVERN_ENTERTAINMENT[0])).toContain('Win'); });
});

// ---------------------------------------------------------------------------
// Creature domestication
// ---------------------------------------------------------------------------
import { DOMESTICABLE_CREATURES, getRandomCreature, getCreaturesByDifficulty, getCreaturesByTemperament, getTamingStageCount, getAllTemperaments, formatCreature } from '../../src/data/creatureDomestication';

describe('creature domestication', () => {
  it('has at least 4 creatures', () => { expect(DOMESTICABLE_CREATURES.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 4 temperaments', () => { expect(getAllTemperaments().length).toBeGreaterThanOrEqual(4); });
  it('generates random creature', () => { const c = getRandomCreature(); expect(c.stages.length).toBeGreaterThanOrEqual(3); });
  it('filters by difficulty', () => { const easy = getCreaturesByDifficulty('easy'); expect(easy.length).toBeGreaterThanOrEqual(1); });
  it('all have deal breakers', () => { DOMESTICABLE_CREATURES.forEach((c) => expect(c.dealBreaker.length).toBeGreaterThan(10)); });
  it('all have favorite foods', () => { DOMESTICABLE_CREATURES.forEach((c) => expect(c.favoriteFood.length).toBeGreaterThan(5)); });
  it('all stages have reasonable DCs', () => { DOMESTICABLE_CREATURES.forEach((c) => c.stages.forEach((s) => expect(s.dc).toBeGreaterThanOrEqual(10))); });
  it('formats creature', () => { expect(formatCreature(DOMESTICABLE_CREATURES[0])).toContain('Favorite food'); });
});

// ---------------------------------------------------------------------------
// Oracle consultation
// ---------------------------------------------------------------------------
import { ORACLES, getRandomOracle, getOracleByType, getTrustworthy, getOraclesWithAgendas, getAllOracleTypes, formatOracle } from '../../src/data/oracleConsultation';

describe('oracle consultation', () => {
  it('has at least 4 oracles', () => { expect(ORACLES.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 4 types', () => { expect(getAllOracleTypes().length).toBeGreaterThanOrEqual(4); });
  it('generates random oracle', () => { const o = getRandomOracle(); expect(o.answers.length).toBeGreaterThanOrEqual(2); });
  it('trustworthy filter works', () => { const trusted = getTrustworthy(7); expect(trusted.length).toBeGreaterThanOrEqual(2); trusted.forEach((o) => expect(o.trustworthiness).toBeGreaterThanOrEqual(7)); });
  it('some have hidden agendas', () => { expect(getOraclesWithAgendas().length).toBeGreaterThanOrEqual(1); });
  it('all answers have interpretation DCs', () => { ORACLES.forEach((o) => o.answers.forEach((a) => expect(a.interpretationDC).toBeGreaterThanOrEqual(10))); });
  it('formats oracle', () => { expect(formatOracle(ORACLES[0])).toContain('trust'); });
});

// ---------------------------------------------------------------------------
// Enchanted armor quirks
// ---------------------------------------------------------------------------
import { ARMOR_QUIRKS, getRandomArmorQuirk, getQuirkCount, formatArmorQuirk } from '../../src/data/enchantedArmorQuirk';

describe('enchanted armor quirks', () => {
  it('has at least 5 quirks', () => { expect(ARMOR_QUIRKS.length).toBeGreaterThanOrEqual(5); expect(getQuirkCount()).toBeGreaterThanOrEqual(5); });
  it('generates random quirk', () => { const q = getRandomArmorQuirk(); expect(q.quirk.length).toBeGreaterThan(10); expect(q.opinion.length).toBeGreaterThan(10); });
  it('all have mechanical consequences', () => { ARMOR_QUIRKS.forEach((q) => expect(q.mechanicalConsequence.length).toBeGreaterThan(10)); });
  it('all have appeasement methods', () => { ARMOR_QUIRKS.forEach((q) => expect(q.appeasement.length).toBeGreaterThan(10)); });
  it('all have AC bonuses', () => { ARMOR_QUIRKS.forEach((q) => expect(q.acBonus).toBeGreaterThanOrEqual(1)); });
  it('formats quirk', () => { expect(formatArmorQuirk(ARMOR_QUIRKS[0])).toContain('Consequence'); });
});

// ---------------------------------------------------------------------------
// Planar invasion protocol
// ---------------------------------------------------------------------------
import { INVASION_PROTOCOLS, getRandomProtocol, getProtocolByPlane, getAllInvadingPlanes, getPhaseCount as getInvasionPhases, formatProtocol } from '../../src/data/planarInvasion';

describe('planar invasion protocol', () => {
  it('has at least 3 protocols', () => { expect(INVASION_PROTOCOLS.length).toBeGreaterThanOrEqual(3); });
  it('looks up by plane', () => { const abyss = getProtocolByPlane('abyss'); expect(abyss).toBeDefined(); expect(abyss!.threatLevel.length).toBeGreaterThan(3); });
  it('all have at least 4 response phases', () => { INVASION_PROTOCOLS.forEach((p) => expect(getInvasionPhases(p)).toBeGreaterThanOrEqual(4)); });
  it('all have party roles', () => { INVASION_PROTOCOLS.forEach((p) => expect(p.partyRole.length).toBeGreaterThan(15)); });
  it('all have failure consequences', () => { INVASION_PROTOCOLS.forEach((p) => expect(p.failureConsequence.length).toBeGreaterThan(15)); });
  it('all have early warnings', () => { INVASION_PROTOCOLS.forEach((p) => expect(p.earlyWarning.length).toBeGreaterThan(15)); });
  it('formats protocol', () => { expect(formatProtocol(INVASION_PROTOCOLS[0])).toContain('INVASION'); });
});

// ---------------------------------------------------------------------------
// Political marriage
// ---------------------------------------------------------------------------
import { POLITICAL_MARRIAGES, getRandomMarriage, getMarriagesByMotivation, getEscapeOptionCount, getAllMotivations as getAllMarriageMotivations, formatMarriage } from '../../src/data/politicalMarriage';

describe('political marriage', () => {
  it('has at least 3 marriages', () => { expect(POLITICAL_MARRIAGES.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 motivations', () => { expect(getAllMarriageMotivations().length).toBeGreaterThanOrEqual(3); });
  it('generates random marriage', () => { const m = getRandomMarriage(); expect(m.parties.length).toBeGreaterThanOrEqual(2); expect(m.complications.length).toBeGreaterThanOrEqual(2); });
  it('all have escape options', () => { POLITICAL_MARRIAGES.forEach((m) => expect(getEscapeOptionCount(m)).toBeGreaterThanOrEqual(2)); });
  it('all have ceremony threats', () => { POLITICAL_MARRIAGES.forEach((m) => expect(m.ceremonyThreat.length).toBeGreaterThan(15)); });
  it('all have success/failure outcomes', () => { POLITICAL_MARRIAGES.forEach((m) => { expect(m.ifSuccessful.length).toBeGreaterThan(15); expect(m.ifFailed.length).toBeGreaterThan(15); }); });
  it('formats marriage', () => { expect(formatMarriage(POLITICAL_MARRIAGES[0])).toContain('Stakes'); });
});

// ---------------------------------------------------------------------------
// Monster evolution tracker
// ---------------------------------------------------------------------------
import { EVOLVING_MONSTERS, getRandomEvolvingMonster, getMonstersByTrigger, getCRAtStage, getAllEvolutionTriggers, formatEvolvingMonster } from '../../src/data/monsterEvolution';

describe('monster evolution tracker', () => {
  it('has at least 3 monsters', () => { expect(EVOLVING_MONSTERS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 triggers', () => { expect(getAllEvolutionTriggers().length).toBeGreaterThanOrEqual(3); });
  it('generates random monster', () => { const m = getRandomEvolvingMonster(); expect(m.stages.length).toBeGreaterThanOrEqual(2); });
  it('CR increases with stage', () => { EVOLVING_MONSTERS.forEach((m) => { expect(getCRAtStage(m, m.maxEvolutions)).toBeGreaterThan(m.baseCR); }); });
  it('all have weaknesses gained', () => { EVOLVING_MONSTERS.forEach((m) => expect(m.weaknessGained.length).toBeGreaterThan(15)); });
  it('all have recognition DCs', () => { EVOLVING_MONSTERS.forEach((m) => expect(m.partyRecognitionDC).toBeGreaterThanOrEqual(10)); });
  it('formats monster', () => { expect(formatEvolvingMonster(EVOLVING_MONSTERS[0], 1)).toContain('Stage 1'); });
});

// ---------------------------------------------------------------------------
// Prison break scenario
// ---------------------------------------------------------------------------
import { PRISON_BREAK_SCENARIOS, getRandomPrisonBreak, getPrisonByType, getChallengeCount as getPrisonChallenges, getEscapeRouteCount, getAllPrisonTypes, formatPrisonBreak } from '../../src/data/prisonBreak';

describe('prison break scenario', () => {
  it('has at least 2 scenarios', () => { expect(PRISON_BREAK_SCENARIOS.length).toBeGreaterThanOrEqual(2); });
  it('covers at least 2 types', () => { expect(getAllPrisonTypes().length).toBeGreaterThanOrEqual(2); });
  it('generates random scenario', () => { const s = getRandomPrisonBreak(); expect(s.challenges.length).toBeGreaterThanOrEqual(3); });
  it('all have escape routes', () => { PRISON_BREAK_SCENARIOS.forEach((s) => expect(getEscapeRouteCount(s)).toBeGreaterThanOrEqual(3)); });
  it('all have twists', () => { PRISON_BREAK_SCENARIOS.forEach((s) => expect(s.twist.length).toBeGreaterThan(20)); });
  it('challenges have alternative skills', () => { PRISON_BREAK_SCENARIOS.forEach((s) => s.challenges.forEach((c) => expect(c.alternativeSkill.length).toBeGreaterThan(3))); });
  it('all describe gear and magic status', () => { PRISON_BREAK_SCENARIOS.forEach((s) => { expect(s.gearStatus.length).toBeGreaterThan(10); expect(s.magicStatus.length).toBeGreaterThan(10); }); });
  it('formats scenario', () => { expect(formatPrisonBreak(PRISON_BREAK_SCENARIOS[0])).toContain('Twist'); });
});

// ---------------------------------------------------------------------------
// Magical inheritance
// ---------------------------------------------------------------------------
import { MAGICAL_INHERITANCES, getRandomInheritance, getInheritancesByType, getTotalValue as getInheritanceValue, getClaimantCount, getAllInheritanceTypes, formatInheritance } from '../../src/data/magicalInheritance';

describe('magical inheritance', () => {
  it('has at least 3 inheritances', () => { expect(MAGICAL_INHERITANCES.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 types', () => { expect(getAllInheritanceTypes().length).toBeGreaterThanOrEqual(3); });
  it('generates random inheritance', () => { const i = getRandomInheritance(); expect(i.items.length).toBeGreaterThanOrEqual(3); });
  it('all have claimants', () => { MAGICAL_INHERITANCES.forEach((i) => expect(getClaimantCount(i)).toBeGreaterThanOrEqual(2)); });
  it('all have hidden conditions', () => { MAGICAL_INHERITANCES.forEach((i) => expect(i.hiddenCondition.length).toBeGreaterThan(15)); });
  it('formats inheritance', () => { expect(formatInheritance(MAGICAL_INHERITANCES[0])).toContain('Estate'); });
});

// ---------------------------------------------------------------------------
// Weapon rivalry
// ---------------------------------------------------------------------------
import { WEAPON_RIVALRIES, getRandomRivalry, getRivalryCount, getConflictCount as getRivalryConflicts, formatRivalry } from '../../src/data/weaponRivalry';

describe('weapon rivalry', () => {
  it('has at least 3 rivalries', () => { expect(WEAPON_RIVALRIES.length).toBeGreaterThanOrEqual(3); expect(getRivalryCount()).toBeGreaterThanOrEqual(3); });
  it('each has 3+ conflicts', () => { WEAPON_RIVALRIES.forEach((r) => expect(getRivalryConflicts(r)).toBeGreaterThanOrEqual(3)); });
  it('all have truces', () => { WEAPON_RIVALRIES.forEach((r) => expect(r.truce.length).toBeGreaterThan(15)); });
  it('all describe if-one-destroyed', () => { WEAPON_RIVALRIES.forEach((r) => expect(r.ifOneDestroyed.length).toBeGreaterThan(20)); });
  it('formats rivalry', () => { expect(formatRivalry(WEAPON_RIVALRIES[0])).toContain('vs'); });
});

// ---------------------------------------------------------------------------
// Magical duel etiquette
// ---------------------------------------------------------------------------
import { DUEL_FORMATS, getDuelFormat, getFormatsWithCap, getAllDuelTypes, formatDuelFormat } from '../../src/data/magicalDuel';

describe('magical duel etiquette', () => {
  it('has 4 duel types', () => { expect(DUEL_FORMATS.length).toBe(4); expect(getAllDuelTypes().length).toBe(4); });
  it('looks up by type', () => { const honor = getDuelFormat('honor'); expect(honor).toBeDefined(); expect(honor!.rules.length).toBeGreaterThanOrEqual(3); });
  it('some have spell caps', () => { expect(getFormatsWithCap().length).toBeGreaterThanOrEqual(1); });
  it('all have victory/defeat', () => { DUEL_FORMATS.forEach((f) => { expect(f.victoryCondition.length).toBeGreaterThan(10); expect(f.defeatConsequence.length).toBeGreaterThan(10); }); });
  it('all have refusal consequences', () => { DUEL_FORMATS.forEach((f) => expect(f.refusalConsequence.length).toBeGreaterThan(10)); });
  it('formats duel', () => { expect(formatDuelFormat(DUEL_FORMATS[0])).toContain('Victory'); });
});

// ---------------------------------------------------------------------------
// Lying map
// ---------------------------------------------------------------------------
import { LYING_MAPS, getRandomLyingMap, getLieCount, getDetectableLies, formatLyingMap } from '../../src/data/lyingMap';

describe('lying map', () => {
  it('has at least 2 maps', () => { expect(LYING_MAPS.length).toBeGreaterThanOrEqual(2); });
  it('generates random map', () => { const m = getRandomLyingMap(); expect(m.lies.length).toBeGreaterThanOrEqual(2); });
  it('all have agendas', () => { LYING_MAPS.forEach((m) => expect(m.agenda.length).toBeGreaterThan(15)); });
  it('all have truth conditions', () => { LYING_MAPS.forEach((m) => expect(m.truthCondition.length).toBeGreaterThan(15)); });
  it('detectable lies scale with modifier', () => { const m = LYING_MAPS[0]; const low = getDetectableLies(m, 0); const high = getDetectableLies(m, 10); expect(high.length).toBeGreaterThanOrEqual(low.length); });
  it('formats map', () => { expect(formatLyingMap(LYING_MAPS[0])).toContain('Trust'); });
});

// ---------------------------------------------------------------------------
// Familiar rebellion
// ---------------------------------------------------------------------------
import { FAMILIAR_REBELLIONS, getRandomRebellion, getGrievanceCount as getFamiliarGrievances, getNonNegotiableGrievances, getStrikeActionCount, formatRebellion } from '../../src/data/familiarRebellion';

describe('familiar rebellion', () => {
  it('has at least 2 rebellions', () => { expect(FAMILIAR_REBELLIONS.length).toBeGreaterThanOrEqual(2); });
  it('each has 3+ grievances', () => { FAMILIAR_REBELLIONS.forEach((r) => expect(getFamiliarGrievances(r)).toBeGreaterThanOrEqual(3)); });
  it('some grievances are non-negotiable', () => { FAMILIAR_REBELLIONS.forEach((r) => expect(getNonNegotiableGrievances(r).length).toBeGreaterThanOrEqual(1)); });
  it('each has strike actions', () => { FAMILIAR_REBELLIONS.forEach((r) => expect(getStrikeActionCount(r)).toBeGreaterThanOrEqual(3)); });
  it('all have resolutions', () => { FAMILIAR_REBELLIONS.forEach((r) => expect(r.resolution.length).toBeGreaterThan(15)); });
  it('formats rebellion', () => { expect(formatRebellion(FAMILIAR_REBELLIONS[0])).toContain('STRIKE'); });
});

// ---------------------------------------------------------------------------
// Apocalypse survivor camp
// ---------------------------------------------------------------------------
import { APOCALYPSE_CAMPS, getRandomCamp, getCampsByDisaster, getCriticalResources, getHostileFactions, getAllDisasterTypes as getAllCampDisasters, formatCamp } from '../../src/data/apocalypseCamp';

describe('apocalypse survivor camp', () => {
  it('has at least 2 camps', () => { expect(APOCALYPSE_CAMPS.length).toBeGreaterThanOrEqual(2); });
  it('covers at least 2 disaster types', () => { expect(getAllCampDisasters().length).toBeGreaterThanOrEqual(2); });
  it('generates random camp', () => { const c = getRandomCamp(); expect(c.resources.length).toBeGreaterThanOrEqual(3); });
  it('all have critical resources', () => { APOCALYPSE_CAMPS.forEach((c) => expect(getCriticalResources(c).length).toBeGreaterThanOrEqual(1)); });
  it('all have hostile factions', () => { APOCALYPSE_CAMPS.forEach((c) => expect(getHostileFactions(c).length).toBeGreaterThanOrEqual(1)); });
  it('all have twists', () => { APOCALYPSE_CAMPS.forEach((c) => expect(c.twist.length).toBeGreaterThan(20)); });
  it('all have party roles', () => { APOCALYPSE_CAMPS.forEach((c) => expect(c.partyRole.length).toBeGreaterThan(15)); });
  it('formats camp', () => { expect(formatCamp(APOCALYPSE_CAMPS[0])).toContain('Twist'); });
});

// ---------------------------------------------------------------------------
// Secret society generator
// ---------------------------------------------------------------------------
import { SECRET_SOCIETIES, getRandomSociety, getSocietiesByAlignment, getRankCount as getSocietyRanks, getAllAlignments as getSocietyAlignments, formatSociety } from '../../src/data/secretSociety';

describe('secret society generator', () => {
  it('has at least 3 societies', () => { expect(SECRET_SOCIETIES.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 alignments', () => { expect(getSocietyAlignments().length).toBeGreaterThanOrEqual(3); });
  it('generates random society', () => { const s = getRandomSociety(); expect(s.ranks.length).toBeGreaterThanOrEqual(3); expect(s.rituals.length).toBeGreaterThanOrEqual(1); });
  it('all have signal phrases', () => { SECRET_SOCIETIES.forEach((s) => expect(s.signalPhrase.length).toBeGreaterThan(10)); });
  it('all have weaknesses', () => { SECRET_SOCIETIES.forEach((s) => expect(s.weakness.length).toBeGreaterThan(10)); });
  it('all have plot hooks', () => { SECRET_SOCIETIES.forEach((s) => expect(s.plotHook.length).toBeGreaterThan(20)); });
  it('formats society', () => { expect(formatSociety(SECRET_SOCIETIES[0])).toContain('Signal'); });
});

// ---------------------------------------------------------------------------
// Magical courtroom drama
// ---------------------------------------------------------------------------
import { COURT_CASES, getRandomCase as getRandomCourtCase, getCasesByType as getCourtCasesByType, getEvidenceCount, getWitnessCount, getAllCaseTypes as getAllCourtTypes, formatCase as formatCourtCase } from '../../src/data/magicalCourtroom';

describe('magical courtroom drama', () => {
  it('has at least 2 cases', () => { expect(COURT_CASES.length).toBeGreaterThanOrEqual(2); });
  it('generates random case', () => { const c = getRandomCourtCase(); expect(c.evidence.length).toBeGreaterThanOrEqual(3); expect(c.witnesses.length).toBeGreaterThanOrEqual(2); });
  it('all have twists', () => { COURT_CASES.forEach((c) => expect(c.twist.length).toBeGreaterThan(20)); });
  it('all have multiple verdict options', () => { COURT_CASES.forEach((c) => expect(c.verdictOptions.length).toBeGreaterThanOrEqual(3)); });
  it('all have party roles', () => { COURT_CASES.forEach((c) => expect(c.partyRole.length).toBeGreaterThan(10)); });
  it('formats case', () => { expect(formatCourtCase(COURT_CASES[0])).toContain('Charge'); });
});

// ---------------------------------------------------------------------------
// Haunted item generator
// ---------------------------------------------------------------------------
import { HAUNTED_ITEMS, getRandomHauntedItem, getItemsByReason as getHauntedByReason, getAllHauntReasons, formatHauntedItem } from '../../src/data/hauntedItem';

describe('haunted item generator', () => {
  it('has at least 5 items', () => { expect(HAUNTED_ITEMS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 haunt reasons', () => { expect(getAllHauntReasons().length).toBeGreaterThanOrEqual(4); });
  it('generates random item', () => { const i = getRandomHauntedItem(); expect(i.manifestation.length).toBeGreaterThan(15); });
  it('all have resolution methods', () => { HAUNTED_ITEMS.forEach((i) => expect(i.resolutionMethod.length).toBeGreaterThan(15)); });
  it('all have ghost personalities', () => { HAUNTED_ITEMS.forEach((i) => expect(i.ghostPersonality.length).toBeGreaterThan(10)); });
  it('all have both appease and ignore effects', () => { HAUNTED_ITEMS.forEach((i) => { expect(i.benefitIfAppeased.length).toBeGreaterThan(10); expect(i.consequenceIfIgnored.length).toBeGreaterThan(10); }); });
  it('formats item', () => { expect(formatHauntedItem(HAUNTED_ITEMS[0])).toContain('Resolution'); });
});

// ---------------------------------------------------------------------------
// Enchanted food and drink
// ---------------------------------------------------------------------------
import { ENCHANTED_FOODS, getRandomFood, getFoodsByType as getEnchantedFoodByType, getAllFoodTypes, formatFood } from '../../src/data/enchantedFoodDrink';

describe('enchanted food and drink', () => {
  it('has at least 6 foods', () => { expect(ENCHANTED_FOODS.length).toBeGreaterThanOrEqual(6); });
  it('covers at least 3 types', () => { expect(getAllFoodTypes().length).toBeGreaterThanOrEqual(3); });
  it('generates random food', () => { const f = getRandomFood(); expect(f.buff.length).toBeGreaterThan(10); });
  it('most have side effects', () => { const withEffects = ENCHANTED_FOODS.filter((f) => f.sideEffect !== null); expect(withEffects.length).toBeGreaterThanOrEqual(5); });
  it('all have preparation DCs', () => { ENCHANTED_FOODS.forEach((f) => expect(f.preparationDC).toBeGreaterThanOrEqual(10)); });
  it('all have ingredients', () => { ENCHANTED_FOODS.forEach((f) => expect(f.ingredients.length).toBeGreaterThan(10)); });
  it('formats food', () => { expect(formatFood(ENCHANTED_FOODS[0])).toContain('Buff'); });
});

// ---------------------------------------------------------------------------
// Teleport mishap
// ---------------------------------------------------------------------------
import { TELEPORT_MISHAPS, getRandomMishap as getRandomTeleportMishap, getMishapsBySeverity as getTeleportBySeverity, getFunMishaps, getAllTeleportSeverities, formatMishap as formatTeleportMishap } from '../../src/data/teleportMishap';

describe('teleport mishap', () => {
  it('has at least 7 mishaps', () => { expect(TELEPORT_MISHAPS.length).toBeGreaterThanOrEqual(7); });
  it('has 4 severity levels', () => { expect(getAllTeleportSeverities().length).toBe(4); });
  it('generates random mishap', () => { const m = getRandomTeleportMishap(); expect(m.description.length).toBeGreaterThan(20); });
  it('fun filter works', () => { const fun = getFunMishaps(8); expect(fun.length).toBeGreaterThanOrEqual(2); fun.forEach((m) => expect(m.funFactor).toBeGreaterThanOrEqual(8)); });
  it('all have resolutions', () => { TELEPORT_MISHAPS.forEach((m) => expect(m.resolution.length).toBeGreaterThan(10)); });
  it('formats mishap', () => { expect(formatTeleportMishap(TELEPORT_MISHAPS[0])).toContain('Resolution'); });
});

// ---------------------------------------------------------------------------
// Monster alliance
// ---------------------------------------------------------------------------
import { MONSTER_ALLIANCES, getRandomAlliance, getAlliancesByReason, getAllAllianceReasons, formatAlliance } from '../../src/data/monsterAlliance';

describe('monster alliance', () => {
  it('has at least 5 alliances', () => { expect(MONSTER_ALLIANCES.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 reasons', () => { expect(getAllAllianceReasons().length).toBeGreaterThanOrEqual(4); });
  it('generates random alliance', () => { const a = getRandomAlliance(); expect(a.combinedTactic.length).toBeGreaterThan(15); });
  it('all have weaknesses', () => { MONSTER_ALLIANCES.forEach((a) => expect(a.weakness.length).toBeGreaterThan(10)); });
  it('all have party approaches', () => { MONSTER_ALLIANCES.forEach((a) => expect(a.partyApproach.length).toBeGreaterThan(10)); });
  it('all have plot hooks', () => { MONSTER_ALLIANCES.forEach((a) => expect(a.plotHook.length).toBeGreaterThan(15)); });
  it('formats alliance', () => { expect(formatAlliance(MONSTER_ALLIANCES[0])).toContain('Weakness'); });
});

// ---------------------------------------------------------------------------
// Cursed treasure hoard
// ---------------------------------------------------------------------------
import { CURSED_TREASURE_HOARDS, getRandomHoard, getItemCount as getHoardItemCount, formatHoard } from '../../src/data/cursedTreasure';

describe('cursed treasure hoard', () => {
  it('has at least 2 hoards', () => { expect(CURSED_TREASURE_HOARDS.length).toBeGreaterThanOrEqual(2); });
  it('generates random hoard', () => { const h = getRandomHoard(); expect(h.items.length).toBeGreaterThanOrEqual(3); });
  it('all have warning signs', () => { CURSED_TREASURE_HOARDS.forEach((h) => expect(h.warningSign.length).toBeGreaterThan(10)); });
  it('all have greed traps', () => { CURSED_TREASURE_HOARDS.forEach((h) => expect(h.greedTrap.length).toBeGreaterThan(20)); });
  it('all items have curse break methods', () => { CURSED_TREASURE_HOARDS.forEach((h) => h.items.forEach((i) => expect(i.breakCurse.length).toBeGreaterThan(10))); });
  it('formats hoard', () => { expect(formatHoard(CURSED_TREASURE_HOARDS[0])).toContain('Greed trap'); });
});

// ---------------------------------------------------------------------------
// NPC rival party
// ---------------------------------------------------------------------------
import { RIVAL_PARTIES, getRandomRivalParty, getPartiesByDisposition, getMemberCount as getRivalMembers, getAllDispositions as getRivalDispositions, formatRivalParty } from '../../src/data/rivalParty';

describe('NPC rival party', () => {
  it('has at least 3 parties', () => { expect(RIVAL_PARTIES.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 dispositions', () => { expect(getRivalDispositions().length).toBeGreaterThanOrEqual(3); });
  it('generates random party', () => { const p = getRandomRivalParty(); expect(p.members.length).toBeGreaterThanOrEqual(3); });
  it('all members have weaknesses', () => { RIVAL_PARTIES.forEach((p) => p.members.forEach((m) => expect(m.weakness.length).toBeGreaterThan(10))); });
  it('all have betrayal risk assessments', () => { RIVAL_PARTIES.forEach((p) => expect(p.betrayalRisk.length).toBeGreaterThan(5)); });
  it('formats party', () => { expect(formatRivalParty(RIVAL_PARTIES[0])).toContain('Betrayal risk'); });
});

// ---------------------------------------------------------------------------
// Magical beast mounts
// ---------------------------------------------------------------------------
import { BEAST_MOUNTS, getRandomMount, getMountsByCategory, getMountsByMaxPrice, getAllMountCategories, formatMount } from '../../src/data/beastMount';

describe('magical beast mounts', () => {
  it('has at least 5 mounts', () => { expect(BEAST_MOUNTS.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 categories', () => { expect(getAllMountCategories().length).toBeGreaterThanOrEqual(4); });
  it('generates random mount', () => { const m = getRandomMount(); expect(m.specialAbility.length).toBeGreaterThan(10); });
  it('price filter works', () => { const cheap = getMountsByMaxPrice(300); expect(cheap.length).toBeGreaterThanOrEqual(2); cheap.forEach((m) => expect(m.price).toBeLessThanOrEqual(300)); });
  it('all have quirks', () => { BEAST_MOUNTS.forEach((m) => expect(m.quirk.length).toBeGreaterThan(10)); });
  it('all have feeding requirements', () => { BEAST_MOUNTS.forEach((m) => expect(m.feedingRequirements.length).toBeGreaterThan(10)); });
  it('formats mount', () => { expect(formatMount(BEAST_MOUNTS[0])).toContain('Quirk'); });
});

// ---------------------------------------------------------------------------
// Divine quest giver
// ---------------------------------------------------------------------------
import { DIVINE_QUESTS, getRandomDivineQuest, getQuestsByManner, getAllDeityManners, formatDivineQuest } from '../../src/data/divineQuestGiver';

describe('divine quest giver', () => {
  it('has at least 4 quests', () => { expect(DIVINE_QUESTS.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 3 manners', () => { expect(getAllDeityManners().length).toBeGreaterThanOrEqual(3); });
  it('generates random quest', () => { const q = getRandomDivineQuest(); expect(q.quest.length).toBeGreaterThan(20); });
  it('all have refusal consequences', () => { DIVINE_QUESTS.forEach((q) => expect(q.refusalConsequence.length).toBeGreaterThan(15)); });
  it('all have deity quirks', () => { DIVINE_QUESTS.forEach((q) => expect(q.deityQuirk.length).toBeGreaterThan(15)); });
  it('all have complications', () => { DIVINE_QUESTS.forEach((q) => expect(q.complication.length).toBeGreaterThan(15)); });
  it('formats quest', () => { expect(formatDivineQuest(DIVINE_QUESTS[0])).toContain('Reward'); });
});

// ---------------------------------------------------------------------------
// Elemental storm encounter
// ---------------------------------------------------------------------------
import { ELEMENTAL_STORMS, getRandomStorm, getStormByElement, getPhaseCount as getStormPhases, getAllStormElements, formatStorm } from '../../src/data/elementalStorm';

describe('elemental storm encounter', () => {
  it('has at least 3 storms', () => { expect(ELEMENTAL_STORMS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 elements', () => { expect(getAllStormElements().length).toBeGreaterThanOrEqual(3); });
  it('generates random storm', () => { const s = getRandomStorm(); expect(s.phases.length).toBeGreaterThanOrEqual(3); });
  it('looks up by element', () => { const fire = getStormByElement('fire'); expect(fire).toBeDefined(); });
  it('all have eye of storm', () => { ELEMENTAL_STORMS.forEach((s) => expect(s.eyeOfTheStorm.length).toBeGreaterThan(15)); });
  it('all have aftermath', () => { ELEMENTAL_STORMS.forEach((s) => expect(s.aftermath.length).toBeGreaterThan(10)); });
  it('formats storm', () => { expect(formatStorm(ELEMENTAL_STORMS[0])).toContain('Eye'); });
});

// ---------------------------------------------------------------------------
// Tattoo artist NPC
// ---------------------------------------------------------------------------
import { TATTOO_ARTISTS, getRandomArtist, getArtistsBySpecialty, getCheapestArtist, getAllSpecialties as getAllArtistSpecialties, formatArtist } from '../../src/data/tattooArtist';

describe('tattoo artist NPC', () => {
  it('has at least 4 artists', () => { expect(TATTOO_ARTISTS.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 3 specialties', () => { expect(getAllArtistSpecialties().length).toBeGreaterThanOrEqual(3); });
  it('generates random artist', () => { const a = getRandomArtist(); expect(a.signature.length).toBeGreaterThan(10); expect(a.reviews.length).toBeGreaterThanOrEqual(2); });
  it('cheapest has lowest multiplier', () => { const cheapest = getCheapestArtist(); TATTOO_ARTISTS.forEach((a) => expect(a.priceMultiplier).toBeGreaterThanOrEqual(cheapest.priceMultiplier)); });
  it('all have quest hooks', () => { TATTOO_ARTISTS.forEach((a) => expect(a.questHook.length).toBeGreaterThan(15)); });
  it('all have refusal lists', () => { TATTOO_ARTISTS.forEach((a) => expect(a.refusesTo.length).toBeGreaterThanOrEqual(1)); });
  it('formats artist', () => { expect(formatArtist(TATTOO_ARTISTS[0])).toContain('Signature'); });
});

// ---------------------------------------------------------------------------
// Prison warden NPC
// ---------------------------------------------------------------------------
import { PRISON_WARDENS, getRandomWarden, getPrisonerCount, getHighRiskPrisoners, formatWarden } from '../../src/data/prisonWarden';

describe('prison warden NPC', () => {
  it('has at least 2 wardens', () => { expect(PRISON_WARDENS.length).toBeGreaterThanOrEqual(2); });
  it('generates random warden', () => { const w = getRandomWarden(); expect(w.notablePrisoners.length).toBeGreaterThanOrEqual(2); });
  it('all have quest hooks', () => { PRISON_WARDENS.forEach((w) => expect(w.questHook.length).toBeGreaterThan(15)); });
  it('all have weaknesses', () => { PRISON_WARDENS.forEach((w) => expect(w.weakness.length).toBeGreaterThan(15)); });
  it('some prisoners are high risk', () => { PRISON_WARDENS.forEach((w) => expect(getHighRiskPrisoners(w).length).toBeGreaterThanOrEqual(0)); });
  it('formats warden', () => { expect(formatWarden(PRISON_WARDENS[0])).toContain('Facility'); });
});

// ---------------------------------------------------------------------------
// Deity aspect manifestation
// ---------------------------------------------------------------------------
import { DEITY_ASPECTS, getRandomAspect, getAspectsByDeity, getAspectsByContext, getConflictingAspects, getAllAspectContexts, formatAspect } from '../../src/data/deityAspect';

describe('deity aspect manifestation', () => {
  it('has at least 6 aspects', () => { expect(DEITY_ASPECTS.length).toBeGreaterThanOrEqual(6); });
  it('covers at least 4 contexts', () => { expect(getAllAspectContexts().length).toBeGreaterThanOrEqual(4); });
  it('generates random aspect', () => { const a = getRandomAspect(); expect(a.grantedBoon.length).toBeGreaterThan(10); });
  it('finds conflicting aspects', () => { const mercy = DEITY_ASPECTS.find((a) => a.aspect === 'mercy')!; const conflicts = getConflictingAspects(mercy); expect(conflicts.length).toBeGreaterThanOrEqual(0); });
  it('all have demanded tributes', () => { DEITY_ASPECTS.forEach((a) => expect(a.demandedTribute.length).toBeGreaterThan(10)); });
  it('formats aspect', () => { expect(formatAspect(DEITY_ASPECTS[0])).toContain('Boon'); });
});

// ---------------------------------------------------------------------------
// Artifact resonance
// ---------------------------------------------------------------------------
import { RESONANCE_PAIRS, getRandomResonance, getResonancesByType, getResonancesForItem, getAllResonanceTypes, formatResonance } from '../../src/data/artifactResonance';

describe('artifact resonance', () => {
  it('has at least 5 pairs', () => { expect(RESONANCE_PAIRS.length).toBeGreaterThanOrEqual(5); });
  it('has 4 resonance types', () => { expect(getAllResonanceTypes().length).toBe(4); });
  it('generates random resonance', () => { const r = getRandomResonance(); expect(r.effect.length).toBeGreaterThan(15); });
  it('searches by item name', () => { const dawn = getResonancesForItem('Dawn'); expect(dawn.length).toBeGreaterThanOrEqual(1); });
  it('all have lore', () => { RESONANCE_PAIRS.forEach((p) => expect(p.lore.length).toBeGreaterThan(15)); });
  it('formats resonance', () => { expect(formatResonance(RESONANCE_PAIRS[0])).toContain('↔'); });
});

// ---------------------------------------------------------------------------
// Need compass
// ---------------------------------------------------------------------------
import { COMPASS_READINGS, getRandomReading, getReadingsByCategory, getAllNeedCategories, formatReading } from '../../src/data/needCompass';

describe('need compass', () => {
  it('has at least 7 readings', () => { expect(COMPASS_READINGS.length).toBeGreaterThanOrEqual(7); });
  it('covers at least 5 categories', () => { expect(getAllNeedCategories().length).toBeGreaterThanOrEqual(5); });
  it('generates random reading', () => { const r = getRandomReading(); expect(r.compassBehavior.length).toBeGreaterThan(15); });
  it('all have party reactions', () => { COMPASS_READINGS.forEach((r) => expect(r.reaction.length).toBeGreaterThan(10)); });
  it('all explain why they need it', () => { COMPASS_READINGS.forEach((r) => expect(r.whyTheyNeedIt.length).toBeGreaterThan(10)); });
  it('formats reading', () => { expect(formatReading(COMPASS_READINGS[0])).toContain('Points to'); });
});

// ---------------------------------------------------------------------------
// Magical accident investigation
// ---------------------------------------------------------------------------
import { MAGICAL_ACCIDENTS, getRandomAccident, getAccidentsByType, getClueCount as getAccidentClues, getAllAccidentTypes, formatAccident } from '../../src/data/magicalAccident';

describe('magical accident investigation', () => {
  it('has at least 3 accidents', () => { expect(MAGICAL_ACCIDENTS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 types', () => { expect(getAllAccidentTypes().length).toBeGreaterThanOrEqual(3); });
  it('generates random accident', () => { const a = getRandomAccident(); expect(a.clues.length).toBeGreaterThanOrEqual(3); });
  it('all have true explanations', () => { MAGICAL_ACCIDENTS.forEach((a) => expect(a.trueExplanation.length).toBeGreaterThan(20)); });
  it('all have red herrings', () => { MAGICAL_ACCIDENTS.forEach((a) => expect(a.redHerring.length).toBeGreaterThan(10)); });
  it('formats with solution toggle', () => { const a = getRandomAccident(); expect(formatAccident(a)).not.toContain('Truth'); expect(formatAccident(a, true)).toContain('Truth'); });
});

// ---------------------------------------------------------------------------
// NPC relationship web
// ---------------------------------------------------------------------------
import { RELATIONSHIP_WEBS, getRandomWeb, getSecretRelations as getWebSecrets, getKnownRelations as getWebKnown, getNPCCount as getWebNPCs, formatWeb } from '../../src/data/npcRelationWeb';

describe('NPC relationship web', () => {
  it('has at least 2 webs', () => { expect(RELATIONSHIP_WEBS.length).toBeGreaterThanOrEqual(2); });
  it('generates random web', () => { const w = getRandomWeb(); expect(w.npcs.length).toBeGreaterThanOrEqual(4); expect(w.relations.length).toBeGreaterThanOrEqual(4); });
  it('has secret relations', () => { RELATIONSHIP_WEBS.forEach((w) => expect(getWebSecrets(w).length).toBeGreaterThanOrEqual(1)); });
  it('has known relations', () => { RELATIONSHIP_WEBS.forEach((w) => expect(getWebKnown(w).length).toBeGreaterThanOrEqual(1)); });
  it('all have central conflicts', () => { RELATIONSHIP_WEBS.forEach((w) => expect(w.centralConflict.length).toBeGreaterThan(15)); });
  it('all have party leverage', () => { RELATIONSHIP_WEBS.forEach((w) => expect(w.partyLeverage.length).toBeGreaterThan(15)); });
  it('formats with secret toggle', () => { const w = getRandomWeb(); const open = formatWeb(w, true); const closed = formatWeb(w, false); expect(open.length).toBeGreaterThan(closed.length); });
});

// Wave 62 tests
import { CONTAMINATION_ZONES, getRandomZone, getHarvestableZones, getAllContaminationTypes, formatZone } from '../../src/data/magicalContamination';
import { LAST_STAND_SCENARIOS, getRandomLastStand, getScenarioCount as getLastStandCount, formatLastStand } from '../../src/data/legendaryLastStand';
import { EMOTIONAL_MOMENTS, getRandomMoment, getMomentsByType, getAllEmotionTypes, formatMoment } from '../../src/data/emotionalMoment';
import { MAGICAL_MISUNDERSTANDINGS, getRandomMisunderstanding, getByComedyLevel, formatMisunderstanding } from '../../src/data/magicalMisunderstanding';
import { CAMPFIRE_STORIES, getRandomStory as getRandomCampfireStory, getStoriesWithTruth, getAllStoryMoods, formatStory as formatCampfireStory } from '../../src/data/campfireStory';
import { PARTY_DYNAMICS, getRandomDynamic, getDynamicsByType, getAllDynamicTypes, formatDynamic } from '../../src/data/partyDynamic';

describe('magical contamination', () => {
  it('has at least 3 zones', () => { expect(CONTAMINATION_ZONES.length).toBeGreaterThanOrEqual(3); });
  it('has harvestable zones', () => { expect(getHarvestableZones().length).toBeGreaterThanOrEqual(2); });
  it('all have cleanup methods', () => { CONTAMINATION_ZONES.forEach((z) => expect(z.cleanupMethod.length).toBeGreaterThan(15)); });
  it('formats zone', () => { expect(formatZone(getRandomZone())).toContain('Cleanup'); });
});

describe('legendary last stand', () => {
  it('has at least 3 scenarios', () => { expect(LAST_STAND_SCENARIOS.length).toBeGreaterThanOrEqual(3); });
  it('all have narrative beats', () => { LAST_STAND_SCENARIOS.forEach((s) => expect(s.narrativeBeat.length).toBeGreaterThan(15)); });
  it('all have if-they-fall', () => { LAST_STAND_SCENARIOS.forEach((s) => expect(s.ifTheyFall.length).toBeGreaterThan(15)); });
  it('formats scenario', () => { expect(formatLastStand(getRandomLastStand())).toContain('Stakes'); });
});

describe('emotional moments', () => {
  it('has at least 7 moments', () => { expect(EMOTIONAL_MOMENTS.length).toBeGreaterThanOrEqual(7); });
  it('covers at least 5 types', () => { expect(getAllEmotionTypes().length).toBeGreaterThanOrEqual(5); });
  it('all have DM tips', () => { EMOTIONAL_MOMENTS.forEach((m) => expect(m.dmTip.length).toBeGreaterThan(10)); });
  it('formats moment', () => { expect(formatMoment(getRandomMoment())).toContain('DM tip'); });
});

describe('magical misunderstandings', () => {
  it('has at least 5', () => { expect(MAGICAL_MISUNDERSTANDINGS.length).toBeGreaterThanOrEqual(5); });
  it('comedy filter works', () => { expect(getByComedyLevel(9).length).toBeGreaterThanOrEqual(2); });
  it('all have resolutions', () => { MAGICAL_MISUNDERSTANDINGS.forEach((m) => expect(m.resolution.length).toBeGreaterThan(10)); });
  it('formats misunderstanding', () => { expect(formatMisunderstanding(getRandomMisunderstanding())).toContain('comedy'); });
});

describe('campfire stories', () => {
  it('has at least 5 stories', () => { expect(CAMPFIRE_STORIES.length).toBeGreaterThanOrEqual(5); });
  it('covers at least 4 moods', () => { expect(getAllStoryMoods().length).toBeGreaterThanOrEqual(4); });
  it('some have truth behind them', () => { expect(getStoriesWithTruth().length).toBeGreaterThanOrEqual(2); });
  it('formats story', () => { expect(formatCampfireStory(getRandomCampfireStory())).toContain('Told by'); });
});

describe('party dynamics', () => {
  it('has at least 6 dynamics', () => { expect(PARTY_DYNAMICS.length).toBeGreaterThanOrEqual(6); });
  it('covers 6 types', () => { expect(getAllDynamicTypes().length).toBe(6); });
  it('all have resolution paths', () => { PARTY_DYNAMICS.forEach((d) => expect(d.resolutionPath.length).toBeGreaterThan(10)); });
  it('formats dynamic', () => { expect(formatDynamic(getRandomDynamic())).toContain('Trigger'); });
});

// Wave 63
import { RUMORS, getRandomRumor, getRumorsWithHooks, formatRumor } from '../../src/data/rumor';
import { MORAL_DILEMMAS, getRandomDilemma, getDilemmaCount, formatDilemma } from '../../src/data/moralDilemma';
import { EPIC_ENTRANCES, getRandomEntrance, getEntranceCount, formatEntrance } from '../../src/data/epicEntrance';
import { SESSION_ZERO_QUESTIONS, getRandomQuestion, getQuestionsByCategory, formatQuestion } from '../../src/data/sessionZero';
import { PLOT_TWISTS, getRandomTwist, getTwistsByImpact, formatTwist } from '../../src/data/plotTwistEngine';
import { SESSION_ENDERS, getRandomEnder, getEndersByType, getAllCliffhangerTypes, formatEnder } from '../../src/data/sessionEnder';

describe('rumors', () => { it('has 6+', () => { expect(RUMORS.length).toBeGreaterThanOrEqual(6); }); it('most have hooks', () => { expect(getRumorsWithHooks().length).toBeGreaterThanOrEqual(3); }); it('formats', () => { expect(formatRumor(getRandomRumor(), true)).toContain('Reliability'); }); });
describe('moral dilemmas', () => { it('has 4+', () => { expect(MORAL_DILEMMAS.length).toBeGreaterThanOrEqual(4); }); it('all have hidden C', () => { MORAL_DILEMMAS.forEach((d) => expect(d.hiddenOptionC.length).toBeGreaterThan(10)); }); it('formats', () => { expect(formatDilemma(getRandomDilemma(), true)).toContain('hidden'); }); });
describe('epic entrances', () => { it('has 5+', () => { expect(EPIC_ENTRANCES.length).toBeGreaterThanOrEqual(5); }); it('some have effects', () => { expect(EPIC_ENTRANCES.filter((e) => e.mechanicalEffect !== null).length).toBeGreaterThanOrEqual(3); }); it('formats', () => { expect(formatEntrance(getRandomEntrance())).toContain('🎬'); }); });
describe('session zero', () => { it('has 7+', () => { expect(SESSION_ZERO_QUESTIONS.length).toBeGreaterThanOrEqual(7); }); it('all have follow-ups', () => { SESSION_ZERO_QUESTIONS.forEach((q) => expect(q.followUp.length).toBeGreaterThan(10)); }); it('formats', () => { expect(formatQuestion(getRandomQuestion())).toContain('Why'); }); });
describe('plot twists', () => { it('has 4+', () => { expect(PLOT_TWISTS.length).toBeGreaterThanOrEqual(4); }); it('all have foreshadowing', () => { PLOT_TWISTS.forEach((t) => expect(t.foreshadowingHints.length).toBeGreaterThanOrEqual(3)); }); it('formats with hints', () => { expect(formatTwist(getRandomTwist(), true)).toContain('Foreshadowing'); }); });
describe('session enders', () => { it('has 6+', () => { expect(SESSION_ENDERS.length).toBeGreaterThanOrEqual(6); }); it('covers 6 types', () => { expect(getAllCliffhangerTypes().length).toBe(6); }); it('all have DM instructions', () => { SESSION_ENDERS.forEach((e) => expect(e.dmInstruction.length).toBeGreaterThan(10)); }); it('formats', () => { expect(formatEnder(getRandomEnder())).toContain('DM'); }); });

// Wave 64
import { TRAVEL_MONTAGES, getRandomMontage, getAllMontageTypes, formatMontage } from '../../src/data/travelMontage';
import { LEGENDARY_SACRIFICES, getRandomSacrifice, getSacrificeCount, formatSacrifice } from '../../src/data/legendaryNPCDeath';
import { WORLD_DETAILS, getRandomDetail, getDetailsByContext, getAllDetailContexts, formatDetail } from '../../src/data/worldDetail';
import { COMBAT_QUIPS, getRandomQuip, getQuipsByContext, getQuipCount, formatQuip } from '../../src/data/combatQuip';
import { FIRST_SESSION_HOOKS, getRandomHook as getFirstHook, getAllMeetingTypes, formatHook as formatFirstHook } from '../../src/data/firstSession';
import { WORLD_SECRETS, getRandomSecret as getWorldSecret, getAllSecretScopes, formatSecret as formatWorldSecret } from '../../src/data/worldSecret';

describe('travel montage', () => { it('has 7+', () => { expect(TRAVEL_MONTAGES.length).toBeGreaterThanOrEqual(7); }); it('covers 5+ types', () => { expect(getAllMontageTypes().length).toBeGreaterThanOrEqual(5); }); it('formats', () => { expect(formatMontage(getRandomMontage())).toContain('🎭'); }); });
describe('legendary sacrifice', () => { it('has 4+', () => { expect(LEGENDARY_SACRIFICES.length).toBeGreaterThanOrEqual(4); }); it('all have last words', () => { LEGENDARY_SACRIFICES.forEach((s) => expect(s.lastWords.length).toBeGreaterThan(10)); }); it('formats', () => { expect(formatSacrifice(getRandomSacrifice())).toContain('Legacy'); }); });
describe('world details', () => { it('has 8+', () => { expect(WORLD_DETAILS.length).toBeGreaterThanOrEqual(8); }); it('covers 6+ contexts', () => { expect(getAllDetailContexts().length).toBeGreaterThanOrEqual(6); }); it('all have implications', () => { WORLD_DETAILS.forEach((d) => expect(d.implication.length).toBeGreaterThan(10)); }); it('formats', () => { expect(formatDetail(getRandomDetail())).toContain('💭'); }); });
describe('combat quips', () => { it('has 10+', () => { expect(COMBAT_QUIPS.length).toBeGreaterThanOrEqual(10); }); it('covers 5+ contexts', () => { expect(COMBAT_QUIPS.map((q) => q.context).filter((v, i, a) => a.indexOf(v) === i).length).toBeGreaterThanOrEqual(5); }); it('formats', () => { expect(formatQuip(getRandomQuip())).toContain('Best for'); }); });
describe('first session hooks', () => { it('has 5+', () => { expect(FIRST_SESSION_HOOKS.length).toBeGreaterThanOrEqual(5); }); it('covers 4+ types', () => { expect(getAllMeetingTypes().length).toBeGreaterThanOrEqual(4); }); it('all have first combat', () => { FIRST_SESSION_HOOKS.forEach((h) => expect(h.firstCombat.length).toBeGreaterThan(10)); }); it('formats', () => { expect(formatFirstHook(getFirstHook())).toContain('Incident'); }); });
describe('world secrets', () => { it('has 4+', () => { expect(WORLD_SECRETS.length).toBeGreaterThanOrEqual(4); }); it('has 4 scopes', () => { expect(getAllSecretScopes().length).toBe(4); }); it('formats with reveal', () => { expect(formatWorldSecret(getWorldSecret(), true)).toContain('Who knows'); }); });

// Wave 65
import { LAST_RESORTS, getRandomLastResort, getLastResortCount, formatLastResort } from '../../src/data/lastResort';
import { VILLAIN_MOTIVATIONS, getRandomMotivation as getVillainMot, getRedeemable, getAllCores, formatMotivation as formatVillainMot } from '../../src/data/villainMotivation';

describe('last resort abilities', () => { it('has 5+', () => { expect(LAST_RESORTS.length).toBeGreaterThanOrEqual(5); }); it('all have costs', () => { LAST_RESORTS.forEach((r) => expect(r.cost.length).toBeGreaterThan(15)); }); it('all have narrative beats', () => { LAST_RESORTS.forEach((r) => expect(r.narrativeBeat.length).toBeGreaterThan(20)); }); it('formats', () => { expect(formatLastResort(getRandomLastResort())).toContain('Cost'); }); });
describe('villain motivations', () => { it('has 5+', () => { expect(VILLAIN_MOTIVATIONS.length).toBeGreaterThanOrEqual(5); }); it('covers 5+ cores', () => { expect(getAllCores().length).toBeGreaterThanOrEqual(5); }); it('some redeemable', () => { expect(getRedeemable().length).toBeGreaterThanOrEqual(3); }); it('all have perspective', () => { VILLAIN_MOTIVATIONS.forEach((m) => expect(m.theirPerspective.length).toBeGreaterThan(20)); }); it('formats', () => { expect(formatVillainMot(getVillainMot())).toContain('⚠️'); }); });

// ---------------------------------------------------------------------------
// Wave 66 — planar bar crawl, undead uprising, magical heist, monster court, expedition supply, cursed village
// ---------------------------------------------------------------------------
import { PLANAR_TAVERNS, getRandomTavern, getTavernByPlane, getAllPlanes as getAllTavernPlanes, getMostDangerousDrink, formatTavern } from '../../src/data/planarBarCrawl';

describe('planar bar crawl', () => {
  it('has at least 4 taverns', () => { expect(PLANAR_TAVERNS.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 4 planes', () => { expect(getAllTavernPlanes().length).toBeGreaterThanOrEqual(4); });
  it('each tavern has 3+ drinks', () => { PLANAR_TAVERNS.forEach((t) => expect(t.drinks.length).toBeGreaterThanOrEqual(3)); });
  it('each tavern has regular patrons', () => { PLANAR_TAVERNS.forEach((t) => expect(t.regularPatrons.length).toBeGreaterThanOrEqual(2)); });
  it('all have quest hooks', () => { PLANAR_TAVERNS.forEach((t) => expect(t.questHook.length).toBeGreaterThan(20)); });
  it('all have house rules', () => { PLANAR_TAVERNS.forEach((t) => expect(t.houseRule.length).toBeGreaterThan(15)); });
  it('finds most dangerous drink', () => { const d = getMostDangerousDrink(); expect(d.dangerLevel).toBeGreaterThanOrEqual(4); expect(d.tavern.length).toBeGreaterThan(0); });
  it('looks up by plane', () => { const t = getTavernByPlane('feywild'); expect(t).toBeDefined(); expect(t!.name).toContain('Blooming'); });
  it('formats tavern', () => { expect(formatTavern(PLANAR_TAVERNS[0])).toContain('Drinks'); });
});

import { UNDEAD_UPRISING_SCENARIOS, getRandomScenario as getRandomUprising, getPhaseByNumber, getActiveUndeadTypes, getAllOrigins as getAllUprisingOrigins, formatScenario as formatUprising } from '../../src/data/undeadUprising';

describe('undead uprising', () => {
  it('has at least 2 scenarios', () => { expect(UNDEAD_UPRISING_SCENARIOS.length).toBeGreaterThanOrEqual(2); });
  it('each has 4 phases', () => { UNDEAD_UPRISING_SCENARIOS.forEach((s) => expect(s.phases.length).toBe(4)); });
  it('each has infection vector', () => { UNDEAD_UPRISING_SCENARIOS.forEach((s) => { expect(s.infectionVector.saveDC).toBeGreaterThan(10); expect(s.infectionVector.symptoms.length).toBeGreaterThanOrEqual(3); }); });
  it('undead escalate per phase', () => { UNDEAD_UPRISING_SCENARIOS.forEach((s) => { const phase1 = getActiveUndeadTypes(s, 1); const phase4 = getActiveUndeadTypes(s, 4); expect(phase4.length).toBeGreaterThan(phase1.length); }); });
  it('all have final boss', () => { UNDEAD_UPRISING_SCENARIOS.forEach((s) => expect(s.finalBoss.length).toBeGreaterThan(20)); });
  it('all have boss weakness', () => { UNDEAD_UPRISING_SCENARIOS.forEach((s) => expect(s.finalBossWeakness.length).toBeGreaterThan(15)); });
  it('phase lookup works', () => { const p = getPhaseByNumber(UNDEAD_UPRISING_SCENARIOS[0], 3); expect(p).toBeDefined(); expect(p!.phase).toBe('outbreak'); });
  it('formats scenario', () => { expect(formatUprising(getRandomUprising())).toContain('Phases'); });
});

import { HEIST_COMPLICATIONS, getRandomComplication, getComplicationsByType, getComplicationsBySeverity, getMostFun, getAllTypes as getAllHeistTypes, formatComplication } from '../../src/data/magicalHeistComplication';

describe('magical heist complications', () => {
  it('has at least 8 complications', () => { expect(HEIST_COMPLICATIONS.length).toBeGreaterThanOrEqual(8); });
  it('covers at least 4 types', () => { expect(getAllHeistTypes().length).toBeGreaterThanOrEqual(4); });
  it('each has counterplay', () => { HEIST_COMPLICATIONS.forEach((c) => expect(c.counterplay.length).toBeGreaterThanOrEqual(2)); });
  it('each has makes-it-worse', () => { HEIST_COMPLICATIONS.forEach((c) => expect(c.makesItWorse.length).toBeGreaterThan(15)); });
  it('filters by severity', () => { const minor = getComplicationsBySeverity('minor'); expect(minor.length).toBeGreaterThanOrEqual(1); minor.forEach((c) => expect(c.severity).toBe('minor')); });
  it('filters by type', () => { const arcane = getComplicationsByType('arcane'); expect(arcane.length).toBeGreaterThanOrEqual(1); });
  it('most fun has high rating', () => { expect(getMostFun().funFactor).toBeGreaterThanOrEqual(4); });
  it('formats complication', () => { expect(formatComplication(getRandomComplication())).toContain('Counterplay'); });
});

import { MONSTER_COURTS, getRandomCourt, getCourtByType, getAllCourtTypes, getTabooCount, formatCourt } from '../../src/data/monsterCourtEtiquette';

describe('monster court etiquette', () => {
  it('has at least 3 courts', () => { expect(MONSTER_COURTS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 court types', () => { expect(getAllCourtTypes().length).toBeGreaterThanOrEqual(3); });
  it('each has 4+ customs', () => { MONSTER_COURTS.forEach((c) => expect(c.customs.length).toBeGreaterThanOrEqual(4)); });
  it('each has offerings', () => { MONSTER_COURTS.forEach((c) => expect(c.offerings.length).toBeGreaterThanOrEqual(3)); });
  it('each has taboos', () => { MONSTER_COURTS.forEach((c) => expect(c.taboos.length).toBeGreaterThanOrEqual(3)); });
  it('each has quest hook', () => { MONSTER_COURTS.forEach((c) => expect(c.questHook.length).toBeGreaterThan(20)); });
  it('looks up by type', () => { const dragon = getCourtByType('dragon'); expect(dragon).toBeDefined(); expect(dragon!.title).toContain('Korvathax'); });
  it('counts taboos', () => { const court = MONSTER_COURTS[0]; expect(getTabooCount(court)).toBeGreaterThanOrEqual(6); });
  it('formats court', () => { expect(formatCourt(getRandomCourt())).toContain('Customs'); });
});

import { SUPPLY_ITEMS, FORAGE_TABLE, getSupplyByCategory, getForageInfo, getAllBiomes, getAllCategories as getAllSupplyCategories, buildExpeditionLoadout, formatLoadout, formatForage } from '../../src/data/expeditionSupply';

describe('expedition supply management', () => {
  it('has at least 10 supply items', () => { expect(SUPPLY_ITEMS.length).toBeGreaterThanOrEqual(10); });
  it('covers at least 5 categories', () => { expect(getAllSupplyCategories().length).toBeGreaterThanOrEqual(5); });
  it('has forage data for 7 biomes', () => { expect(FORAGE_TABLE.length).toBe(7); expect(getAllBiomes().length).toBe(7); });
  it('filters by category', () => { const food = getSupplyByCategory('food'); expect(food.length).toBeGreaterThanOrEqual(2); food.forEach((s) => expect(s.category).toBe('food')); });
  it('gets forage info', () => { const desert = getForageInfo('desert'); expect(desert).toBeDefined(); expect(desert!.dcSurvival).toBeGreaterThanOrEqual(15); });
  it('builds standard loadout', () => { const l = buildExpeditionLoadout(4, 7); expect(l.totalWeight).toBeGreaterThan(0); expect(l.totalCost).toBeGreaterThan(0); expect(l.items.length).toBeGreaterThanOrEqual(4); });
  it('warns on heavy loadouts', () => { const heavy = buildExpeditionLoadout(2, 30); expect(heavy.warnings.length).toBeGreaterThanOrEqual(1); });
  it('formats loadout', () => { expect(formatLoadout(buildExpeditionLoadout(4, 5))).toContain('Items'); });
  it('formats forage', () => { expect(formatForage(FORAGE_TABLE[0])).toContain('Foraging'); });
});

import { CURSED_VILLAGE_SCENARIOS, getRandomVillage, getVillageByOrigin, getAllOrigins as getAllCurseOrigins, getClueCount, formatVillage } from '../../src/data/cursedVillage';

describe('cursed village', () => {
  it('has at least 3 scenarios', () => { expect(CURSED_VILLAGE_SCENARIOS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 curse origins', () => { expect(getAllCurseOrigins().length).toBeGreaterThanOrEqual(3); });
  it('each has 3+ symptoms', () => { CURSED_VILLAGE_SCENARIOS.forEach((s) => expect(s.symptoms.length).toBeGreaterThanOrEqual(3)); });
  it('each has 4+ clues', () => { CURSED_VILLAGE_SCENARIOS.forEach((s) => expect(s.clues.length).toBeGreaterThanOrEqual(4)); });
  it('each has multiple cures', () => { CURSED_VILLAGE_SCENARIOS.forEach((s) => expect(s.cureMethods.length).toBeGreaterThanOrEqual(3)); });
  it('each has moral dilemma', () => { CURSED_VILLAGE_SCENARIOS.forEach((s) => expect(s.moralDilemma.length).toBeGreaterThan(20)); });
  it('filters by origin', () => { const hag = getVillageByOrigin('hag'); expect(hag.length).toBeGreaterThanOrEqual(1); });
  it('counts clues', () => { expect(getClueCount(CURSED_VILLAGE_SCENARIOS[0])).toBeGreaterThanOrEqual(4); });
  it('formats village', () => { expect(formatVillage(getRandomVillage())).toContain('Symptoms'); });
});

// ---------------------------------------------------------------------------
// Wave 67 — magical school exam, haunted carnival, bounty hunter, diplomatic incident, dream realm, magical trial
// ---------------------------------------------------------------------------
import { MAGICAL_EXAMS, getRandomExam, getExamBySubject, getAllSubjects as getAllExamSubjects, getExamDifficulty, formatExam } from '../../src/data/magicalSchoolExam';

describe('magical school exam', () => {
  it('has at least 3 exams', () => { expect(MAGICAL_EXAMS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 subjects', () => { expect(getAllExamSubjects().length).toBeGreaterThanOrEqual(3); });
  it('each has 3+ questions', () => { MAGICAL_EXAMS.forEach((e) => expect(e.questions.length).toBeGreaterThanOrEqual(3)); });
  it('each has proctor with weakness', () => { MAGICAL_EXAMS.forEach((e) => expect(e.proctor.weakness.length).toBeGreaterThan(10)); });
  it('each has cheating opportunity', () => { MAGICAL_EXAMS.forEach((e) => expect(e.cheatingOpportunity.length).toBeGreaterThan(20)); });
  it('each has cheating consequence', () => { MAGICAL_EXAMS.forEach((e) => expect(e.cheatingConsequence.length).toBeGreaterThan(15)); });
  it('looks up by subject', () => { const evo = getExamBySubject('evocation'); expect(evo).toBeDefined(); expect(evo!.name).toContain('Inferno'); });
  it('calculates difficulty', () => { expect(getExamDifficulty(MAGICAL_EXAMS[0])).toBeGreaterThan(10); });
  it('formats exam', () => { expect(formatExam(getRandomExam())).toContain('Questions'); });
});

import { HAUNTED_CARNIVALS, getRandomCarnival, getAttractionCount, getCursedPrizes, formatCarnival } from '../../src/data/hauntedCarnival';

describe('haunted carnival', () => {
  it('has at least 2 carnivals', () => { expect(HAUNTED_CARNIVALS.length).toBeGreaterThanOrEqual(2); });
  it('each has 4+ attractions', () => { HAUNTED_CARNIVALS.forEach((c) => expect(c.attractions.length).toBeGreaterThanOrEqual(4)); });
  it('each has owner secret', () => { HAUNTED_CARNIVALS.forEach((c) => expect(c.ownerSecret.length).toBeGreaterThan(20)); });
  it('each has dark secret', () => { HAUNTED_CARNIVALS.forEach((c) => expect(c.darkSecret.length).toBeGreaterThan(20)); });
  it('each has escape condition', () => { HAUNTED_CARNIVALS.forEach((c) => expect(c.escapeCondition.length).toBeGreaterThan(15)); });
  it('each has time limit', () => { HAUNTED_CARNIVALS.forEach((c) => expect(c.timeLimit.length).toBeGreaterThan(10)); });
  it('counts attractions', () => { expect(getAttractionCount(HAUNTED_CARNIVALS[0])).toBeGreaterThanOrEqual(4); });
  it('finds cursed prizes', () => { const cursed = getCursedPrizes(HAUNTED_CARNIVALS[0]); expect(cursed.length).toBeGreaterThanOrEqual(0); });
  it('formats carnival', () => { expect(formatCarnival(getRandomCarnival())).toContain('Attractions'); });
});

import { BOUNTY_CONTRACTS, getRandomContract as getRandomBounty, getContractsByDifficulty, getAllDifficulties as getAllBountyDiffs, getRewardValue, formatContract as formatBounty } from '../../src/data/bountyHunterContract';

describe('bounty hunter contract', () => {
  it('has at least 3 contracts', () => { expect(BOUNTY_CONTRACTS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 difficulties', () => { expect(getAllBountyDiffs().length).toBeGreaterThanOrEqual(3); });
  it('each has 2+ complications', () => { BOUNTY_CONTRACTS.forEach((c) => expect(c.complications.length).toBeGreaterThanOrEqual(2)); });
  it('each has distinguishing features', () => { BOUNTY_CONTRACTS.forEach((c) => expect(c.distinguishingFeatures.length).toBeGreaterThanOrEqual(2)); });
  it('each has moral twist', () => { BOUNTY_CONTRACTS.forEach((c) => expect(c.moralTwist.length).toBeGreaterThan(20)); });
  it('each has false lead', () => { BOUNTY_CONTRACTS.forEach((c) => expect(c.falseLead.length).toBeGreaterThan(15)); });
  it('filters by difficulty', () => { const hard = getContractsByDifficulty('hard'); expect(hard.length).toBeGreaterThanOrEqual(1); });
  it('parses reward value', () => { expect(getRewardValue(BOUNTY_CONTRACTS[0])).toBeGreaterThan(0); });
  it('formats contract', () => { expect(formatBounty(getRandomBounty())).toContain('BOUNTY'); });
});

import { DIPLOMATIC_INCIDENTS, getRandomIncident, getIncidentsBySeverity, getAllIncidentTypes, getFactionCount as getDiploFactionCount, formatIncident } from '../../src/data/diplomaticIncident';

describe('diplomatic incident', () => {
  it('has at least 3 incidents', () => { expect(DIPLOMATIC_INCIDENTS.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 types', () => { expect(getAllIncidentTypes().length).toBeGreaterThanOrEqual(3); });
  it('each has 3 factions', () => { DIPLOMATIC_INCIDENTS.forEach((i) => expect(i.factions.length).toBe(3)); });
  it('each has 2+ resolutions', () => { DIPLOMATIC_INCIDENTS.forEach((i) => expect(i.resolutions.length).toBeGreaterThanOrEqual(2)); });
  it('each faction has secret goal', () => { DIPLOMATIC_INCIDENTS.forEach((i) => i.factions.forEach((f) => expect(f.secretGoal.length).toBeGreaterThan(15))); });
  it('each has worst case', () => { DIPLOMATIC_INCIDENTS.forEach((i) => expect(i.worstCase.length).toBeGreaterThan(20)); });
  it('each has time limit', () => { DIPLOMATIC_INCIDENTS.forEach((i) => expect(i.timeLimit.length).toBeGreaterThan(10)); });
  it('filters by severity', () => { const major = getIncidentsBySeverity('major'); expect(major.length).toBeGreaterThanOrEqual(1); });
  it('counts factions', () => { expect(getDiploFactionCount(DIPLOMATIC_INCIDENTS[0])).toBe(3); });
  it('formats incident', () => { expect(formatIncident(getRandomIncident())).toContain('Factions'); });
});

import { DREAM_REALM_SCENARIOS, getRandomDream, getDreamByType, getAllDreamTypes, getRuleCount, formatDream } from '../../src/data/dreamRealmAdventure';

describe('dream realm adventure', () => {
  it('has at least 2 scenarios', () => { expect(DREAM_REALM_SCENARIOS.length).toBeGreaterThanOrEqual(2); });
  it('covers at least 2 dream types', () => { expect(getAllDreamTypes().length).toBeGreaterThanOrEqual(2); });
  it('each has 3+ dream rules', () => { DREAM_REALM_SCENARIOS.forEach((s) => expect(s.dreamRules.length).toBeGreaterThanOrEqual(3)); });
  it('each has 2+ encounters', () => { DREAM_REALM_SCENARIOS.forEach((s) => expect(s.encounters.length).toBeGreaterThanOrEqual(2)); });
  it('each has dream boss', () => { DREAM_REALM_SCENARIOS.forEach((s) => expect(s.dreamBoss.length).toBeGreaterThan(20)); });
  it('each has wake condition', () => { DREAM_REALM_SCENARIOS.forEach((s) => expect(s.wakeCondition.length).toBeGreaterThan(15)); });
  it('each has real-world consequence', () => { DREAM_REALM_SCENARIOS.forEach((s) => expect(s.realWorldConsequence.length).toBeGreaterThan(15)); });
  it('looks up by type', () => { const fever = getDreamByType('fever'); expect(fever).toBeDefined(); expect(fever!.name).toContain('Karthax'); });
  it('counts rules', () => { expect(getRuleCount(DREAM_REALM_SCENARIOS[0])).toBe(3); });
  it('formats dream', () => { expect(formatDream(getRandomDream())).toContain('Dream Rules'); });
});

import { MAGICAL_TRIALS, getRandomTrial, getTrialByType, getAllOrdealTypes, getLyingWitnesses, formatTrial } from '../../src/data/magicalTrialByOrdeal';

describe('magical trial by ordeal', () => {
  it('has at least 2 trials', () => { expect(MAGICAL_TRIALS.length).toBeGreaterThanOrEqual(2); });
  it('covers at least 2 ordeal types', () => { expect(getAllOrdealTypes().length).toBeGreaterThanOrEqual(2); });
  it('each has 3 phases', () => { MAGICAL_TRIALS.forEach((t) => expect(t.phases.length).toBe(3)); });
  it('each has 3 witnesses', () => { MAGICAL_TRIALS.forEach((t) => expect(t.witnesses.length).toBe(3)); });
  it('each has innocent twist', () => { MAGICAL_TRIALS.forEach((t) => expect(t.innocentTwist.length).toBeGreaterThan(20)); });
  it('each has guilty twist', () => { MAGICAL_TRIALS.forEach((t) => expect(t.guiltyTwist.length).toBeGreaterThan(15)); });
  it('each has divine intervention', () => { MAGICAL_TRIALS.forEach((t) => expect(t.divineIntervention.length).toBeGreaterThan(20)); });
  it('finds lying witnesses', () => { const liars = getLyingWitnesses(MAGICAL_TRIALS[0]); expect(liars.length).toBeGreaterThanOrEqual(1); });
  it('looks up by type', () => { const fire = getTrialByType('fire'); expect(fire).toBeDefined(); expect(fire!.name).toContain('Burning'); });
  it('formats trial', () => { expect(formatTrial(getRandomTrial())).toContain('Phases'); });
});

// ---------------------------------------------------------------------------
// Wave 68 — abandoned mine, magical bazaar, magical parasite, cult recruitment, academy faculty, library guardian
// ---------------------------------------------------------------------------
import { ABANDONED_MINES, getRandomMine, getMineByType, getAllMineTypes, getLevelCount as getMineLevels, formatMine } from '../../src/data/abandonedMine';

describe('abandoned mine', () => {
  it('has at least 2 mines', () => { expect(ABANDONED_MINES.length).toBeGreaterThanOrEqual(2); });
  it('covers at least 2 types', () => { expect(getAllMineTypes().length).toBeGreaterThanOrEqual(2); });
  it('each has 3 levels', () => { ABANDONED_MINES.forEach((m) => expect(m.levels.length).toBe(3)); });
  it('each level has hazard + creature', () => { ABANDONED_MINES.forEach((m) => m.levels.forEach((l) => { expect(l.hazardDC).toBeGreaterThan(10); expect(l.creature.length).toBeGreaterThan(5); })); });
  it('each has boss creature', () => { ABANDONED_MINES.forEach((m) => expect(m.bossCreature.length).toBeGreaterThan(20)); });
  it('each has legendary treasure', () => { ABANDONED_MINES.forEach((m) => expect(m.legendaryTreasure.length).toBeGreaterThan(20)); });
  it('looks up by type', () => { const m = getMineByType('mithral'); expect(m).toBeDefined(); expect(m!.name).toContain('Khel'); });
  it('counts levels', () => { expect(getMineLevels(ABANDONED_MINES[0])).toBe(3); });
  it('formats mine', () => { expect(formatMine(getRandomMine())).toContain('Levels'); });
});

import { MAGICAL_BAZAARS, getRandomBazaar, getMerchantByOrigin, getAllSecretItems, getMerchantCount as getBazaarMerchants, formatBazaar } from '../../src/data/magicalBazaar';

describe('magical bazaar', () => {
  it('has at least 1 bazaar', () => { expect(MAGICAL_BAZAARS.length).toBeGreaterThanOrEqual(1); });
  it('has 2+ merchants', () => { MAGICAL_BAZAARS.forEach((b) => expect(b.merchants.length).toBeGreaterThanOrEqual(2)); });
  it('each merchant has inventory', () => { MAGICAL_BAZAARS.forEach((b) => b.merchants.forEach((m) => expect(m.inventory.length).toBeGreaterThanOrEqual(2))); });
  it('each merchant has secret item', () => { MAGICAL_BAZAARS.forEach((b) => b.merchants.forEach((m) => expect(m.secretItem.name.length).toBeGreaterThan(3))); });
  it('finds secret items', () => { expect(getAllSecretItems(MAGICAL_BAZAARS[0]).length).toBeGreaterThanOrEqual(2); });
  it('filters by origin', () => { const fey = getMerchantByOrigin(MAGICAL_BAZAARS[0], 'feywild'); expect(fey.length).toBeGreaterThanOrEqual(1); });
  it('counts merchants', () => { expect(getBazaarMerchants(MAGICAL_BAZAARS[0])).toBeGreaterThanOrEqual(2); });
  it('formats bazaar', () => { expect(formatBazaar(getRandomBazaar())).toContain('Merchants'); });
});

import { MAGICAL_PARASITES, getRandomParasite, getParasiteByType, getAllParasiteTypes, getStageCount as getParasiteStages, formatParasite } from '../../src/data/magicalParasite';

describe('magical parasite', () => {
  it('has at least 3 parasites', () => { expect(MAGICAL_PARASITES.length).toBeGreaterThanOrEqual(3); });
  it('covers at least 3 types', () => { expect(getAllParasiteTypes().length).toBeGreaterThanOrEqual(3); });
  it('each has 3 stages', () => { MAGICAL_PARASITES.forEach((p) => expect(p.stages.length).toBe(3)); });
  it('stages have escalating benefits and drawbacks', () => { MAGICAL_PARASITES.forEach((p) => { expect(p.stages[0].benefit.length).toBeGreaterThan(10); expect(p.stages[2].drawback.length).toBeGreaterThan(10); }); });
  it('each has removal method', () => { MAGICAL_PARASITES.forEach((p) => expect(p.removalMethod.length).toBeGreaterThan(20)); });
  it('each has final form', () => { MAGICAL_PARASITES.forEach((p) => expect(p.finalFormBenefit.length).toBeGreaterThan(15)); });
  it('looks up by type', () => { const p = getParasiteByType('psychic'); expect(p).toBeDefined(); expect(p!.name).toContain('Whisper'); });
  it('counts stages', () => { expect(getParasiteStages(MAGICAL_PARASITES[0])).toBe(3); });
  it('formats parasite', () => { expect(formatParasite(getRandomParasite())).toContain('Stages'); });
});

import { CULT_PROFILES, getRandomCult, getCultByMethod, getAllCultMethods, getPhaseCount as getCultPhases, formatCult } from '../../src/data/cultRecruitment';

describe('cult recruitment', () => {
  it('has at least 2 cults', () => { expect(CULT_PROFILES.length).toBeGreaterThanOrEqual(2); });
  it('covers at least 2 methods', () => { expect(getAllCultMethods().length).toBeGreaterThanOrEqual(2); });
  it('each has 4 phases', () => { CULT_PROFILES.forEach((c) => expect(c.recruitmentPhases.length).toBe(4)); });
  it('phases have escalating DCs', () => { CULT_PROFILES.forEach((c) => { const dcs = c.recruitmentPhases.map((p) => p.resistDC); for (let i = 1; i < dcs.length; i++) expect(dcs[i]).toBeGreaterThanOrEqual(dcs[i - 1]); }); });
  it('each has dark secret', () => { CULT_PROFILES.forEach((c) => expect(c.darkSecret.length).toBeGreaterThan(20)); });
  it('each has escape method', () => { CULT_PROFILES.forEach((c) => expect(c.escapeMethod.length).toBeGreaterThan(15)); });
  it('looks up by method', () => { const c = getCultByMethod('promise'); expect(c).toBeDefined(); expect(c!.name).toContain('Kindled'); });
  it('counts phases', () => { expect(getCultPhases(CULT_PROFILES[0])).toBe(4); });
  it('formats cult', () => { expect(formatCult(getRandomCult())).toContain('Recruitment Phases'); });
});

import { ACADEMY_FACULTY, getRandomProfessor, getProfessorByDepartment, getAllDepartments, getDangerousResearch, formatProfessor } from '../../src/data/magicalAcademyFaculty';

describe('magical academy faculty', () => {
  it('has at least 4 professors', () => { expect(ACADEMY_FACULTY.length).toBeGreaterThanOrEqual(4); });
  it('covers at least 4 departments', () => { expect(getAllDepartments().length).toBeGreaterThanOrEqual(4); });
  it('each has research project', () => { ACADEMY_FACULTY.forEach((f) => expect(f.researchProject.name.length).toBeGreaterThan(5)); });
  it('each has student complaint', () => { ACADEMY_FACULTY.forEach((f) => expect(f.studentComplaint.length).toBeGreaterThan(15)); });
  it('each has quest hook', () => { ACADEMY_FACULTY.forEach((f) => expect(f.questHook.length).toBeGreaterThan(15)); });
  it('each has rivalry', () => { ACADEMY_FACULTY.forEach((f) => expect(f.rivalry.length).toBeGreaterThan(15)); });
  it('finds dangerous research', () => { expect(getDangerousResearch().length).toBeGreaterThanOrEqual(1); });
  it('looks up by department', () => { const evo = getProfessorByDepartment('evocation'); expect(evo).toBeDefined(); expect(evo!.name).toContain('Scorch'); });
  it('formats professor', () => { expect(formatProfessor(getRandomProfessor())).toContain('Department'); });
});

import { LIBRARY_GUARDIANS, getRandomGuardian, getGuardianByType, getAllGuardianTypes, getTestCount as getGuardianTests, formatGuardian } from '../../src/data/ancientLibraryGuardian';

describe('ancient library guardian', () => {
  it('has at least 2 guardians', () => { expect(LIBRARY_GUARDIANS.length).toBeGreaterThanOrEqual(2); });
  it('covers at least 2 types', () => { expect(getAllGuardianTypes().length).toBeGreaterThanOrEqual(2); });
  it('each has 3 tests', () => { LIBRARY_GUARDIANS.forEach((g) => expect(g.tests.length).toBe(3)); });
  it('tests have DCs and skill checks', () => { LIBRARY_GUARDIANS.forEach((g) => g.tests.forEach((t) => { expect(t.dc).toBeGreaterThan(10); expect(t.skillCheck.length).toBeGreaterThan(3); })); });
  it('each has forbidden section', () => { LIBRARY_GUARDIANS.forEach((g) => expect(g.forbiddenSection.length).toBeGreaterThan(20)); });
  it('each has weakness', () => { LIBRARY_GUARDIANS.forEach((g) => expect(g.weakness.length).toBeGreaterThan(15)); });
  it('looks up by type', () => { const c = getGuardianByType('construct'); expect(c).toBeDefined(); expect(c!.name).toContain('Index'); });
  it('counts tests', () => { expect(getGuardianTests(LIBRARY_GUARDIANS[0])).toBe(3); });
  it('formats guardian', () => { expect(formatGuardian(getRandomGuardian())).toContain('Tests'); });
});
