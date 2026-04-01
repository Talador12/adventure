// Enemy templates, encounter themes, and enemy generation.
// Extracted from GameContext.tsx for maintainability.

import type { EnemyTemplate, Unit } from '../types/game';

export const ENEMY_TEMPLATES: Record<string, EnemyTemplate[]> = {
  easy: [
    { names: ['Goblin', 'Kobold', 'Giant Rat', 'Skeleton'], cr: 0.25, hp: [7, 12], ac: 12, attackBonus: 3, damageDie: '1d6', damageBonus: 1, dexMod: 2, xpValue: 50, abilities: [], vulnerabilities: ['bludgeoning'] },
    { names: ['Zombie', 'Wolf', 'Bandit'], cr: 0.25, hp: [10, 16], ac: 11, attackBonus: 3, damageDie: '1d6', damageBonus: 1, dexMod: 0, xpValue: 50, abilities: [], immunities: ['poison'] },
    { names: ['Stirge', 'Crawling Claw', 'Twig Blight'], cr: 0.25, hp: [5, 9], ac: 13, attackBonus: 4, damageDie: '1d4', damageBonus: 2, dexMod: 3, xpValue: 50, abilities: [] },
    { names: ['Cultist', 'Tribal Warrior', 'Thug'], cr: 0.5, hp: [12, 18], ac: 12, attackBonus: 3, damageDie: '1d8', damageBonus: 1, dexMod: 1, xpValue: 100, abilities: [{ name: 'Pack Tactics', type: 'attack', damageDie: '1d8', attackBonus: 4, cooldown: 2, description: 'Coordinates with allies for a precise strike.' }] },
  ],
  medium: [
    { names: ['Orc', 'Gnoll', 'Bugbear', 'Hobgoblin'], cr: 1, hp: [15, 25], ac: 13, attackBonus: 5, damageDie: '1d10', damageBonus: 3, dexMod: 1, xpValue: 200, abilities: [{ name: 'Aggressive Charge', type: 'attack', damageDie: '2d6', attackBonus: 5, cooldown: 3, description: 'Rushes forward and strikes with extra force.' }] },
    { names: ['Dire Wolf', 'Ghoul', 'Shadow'], cr: 1, hp: [18, 28], ac: 14, attackBonus: 4, damageDie: '1d8', damageBonus: 2, dexMod: 2, xpValue: 200, abilities: [{ name: 'Paralyzing Touch', type: 'condition', condition: 'stunned', conditionDuration: 1, cooldown: 4, description: 'On hit, the target is stunned until the end of its next turn.' }] },
    { names: ['Fire Beetle', 'Giant Spider', 'Vine Blight'], cr: 1, hp: [14, 22], ac: 13, attackBonus: 4, damageDie: '1d8', damageBonus: 2, dexMod: 1, xpValue: 200, abilities: [{ name: 'Venomous Bite', type: 'condition', condition: 'poisoned', conditionDuration: 2, cooldown: 3, description: 'Injects venom that saps strength and focus.' }] },
    { names: ['Specter', 'Wight', 'Animated Armor'], cr: 1, hp: [20, 30], ac: 15, attackBonus: 4, damageDie: '1d8', damageBonus: 3, dexMod: 2, xpValue: 200, abilities: [{ name: 'Necrotic Touch', type: 'attack', damageDie: '2d6', attackBonus: 4, condition: 'hexed', conditionDuration: 1, cooldown: 3, description: 'Drains the warmth from living flesh.' }] },
  ],
  hard: [
    {
      names: ['Ogre', 'Minotaur', 'Owlbear', 'Troll'], cr: 2, hp: [30, 50], ac: 14,
      attackBonus: 6, damageDie: '2d8', damageBonus: 4, dexMod: 0, xpValue: 450, multiattack: 2,
      abilities: [
        { name: 'Crushing Blow', type: 'attack', damageDie: '3d8', attackBonus: 6, cooldown: 3, description: 'A devastating overhead strike.' },
        { name: 'Frightening Roar', type: 'condition', condition: 'frightened', conditionDuration: 2, cooldown: 5, description: 'A terrifying bellow that shakes your resolve.' },
      ],
    },
    { names: ['Wraith', 'Basilisk', 'Manticore'], cr: 3, hp: [35, 55], ac: 15, attackBonus: 6, damageDie: '2d6', damageBonus: 3, dexMod: 3, xpValue: 700, multiattack: 2, abilities: [{ name: 'Life Drain', type: 'attack', damageDie: '3d6', attackBonus: 6, condition: 'hexed', conditionDuration: 2, cooldown: 3, description: 'Drains life force, leaving the target weakened.' }] },
    {
      names: ['Hell Hound', 'Phase Spider', 'Displacer Beast'], cr: 3, hp: [32, 48], ac: 14,
      attackBonus: 5, damageDie: '2d6', damageBonus: 3, dexMod: 3, xpValue: 700,
      abilities: [
        { name: 'Fire Breath', type: 'aoe', damageDie: '3d6', cooldown: 4, description: 'Exhales a cone of searing flame.', isRanged: true, range: 6 },
        { name: 'Phase Shift', type: 'condition', condition: 'blessed', conditionDuration: 1, cooldown: 4, description: 'Blinks between planes, becoming harder to hit.' },
      ],
    },
    {
      names: ['Ettin', 'Flesh Golem', 'Gelatinous Cube'], cr: 2, hp: [40, 60], ac: 13,
      attackBonus: 7, damageDie: '2d10', damageBonus: 4, dexMod: -1, xpValue: 450,
      abilities: [
        { name: 'Double Strike', type: 'attack', damageDie: '2d10', attackBonus: 7, cooldown: 2, description: 'Two heads swing in unison — or the mass engulfs its prey.' },
        { name: 'Stunning Slam', type: 'condition', condition: 'stunned', conditionDuration: 1, cooldown: 4, description: 'A blow so heavy it rattles your skull.' },
      ],
    },
  ],
  deadly: [
    {
      names: ['Young Dragon', 'Beholder Zombie', 'Hydra', 'Lich Apprentice'], cr: 5, hp: [60, 90], ac: 17,
      attackBonus: 8, damageDie: '2d10', damageBonus: 5, dexMod: 2, xpValue: 1800, multiattack: 3,
      abilities: [
        { name: 'Breath Weapon', type: 'aoe', damageDie: '6d6', cooldown: 4, description: 'A torrent of elemental fury engulfs the area.', isRanged: true, range: 12 },
        { name: 'Multiattack', type: 'attack', damageDie: '2d8', attackBonus: 8, cooldown: 0, description: 'Strikes twice in rapid succession.' },
        { name: 'Terrifying Presence', type: 'condition', condition: 'frightened', conditionDuration: 3, cooldown: 6, description: 'An aura of dread forces a WIS save or be frightened.' },
      ],
    },
    {
      names: ['Mind Flayer', 'Vampire Spawn', 'Flameskull Trio'], cr: 4, hp: [50, 75], ac: 16,
      attackBonus: 7, damageDie: '2d8', damageBonus: 4, dexMod: 3, xpValue: 1100,
      abilities: [
        { name: 'Mind Blast', type: 'aoe', damageDie: '4d8', cooldown: 5, description: 'A cone of psychic energy stuns all who fail their save.', isRanged: true, range: 12 },
        { name: 'Psychic Grasp', type: 'condition', condition: 'stunned', conditionDuration: 1, cooldown: 3, description: 'Seizes the mind of a target, paralyzing them.' },
      ],
    },
    {
      names: ['Shambling Mound', 'Elemental', 'Chimera'], cr: 4, hp: [55, 80], ac: 15,
      attackBonus: 7, damageDie: '2d10', damageBonus: 4, dexMod: 1, xpValue: 1100,
      abilities: [
        { name: 'Engulf', type: 'attack', damageDie: '3d8', attackBonus: 7, condition: 'prone', conditionDuration: 1, cooldown: 3, description: 'Wraps around a target, crushing and smothering.' },
        { name: 'Lightning Absorption', type: 'heal', cooldown: 5, description: 'Absorbs elemental energy to regenerate.' },
      ],
    },
    {
      names: ['Death Knight', 'Oni', 'Night Hag'], cr: 5, hp: [65, 95], ac: 18,
      attackBonus: 9, damageDie: '2d10', damageBonus: 5, dexMod: 2, xpValue: 1800,
      abilities: [
        { name: 'Hellfire Orb', type: 'aoe', damageDie: '5d8', cooldown: 5, description: 'Hurls a sphere of searing hellfire that detonates on impact.', isRanged: true, range: 24 },
        { name: 'Soul Rend', type: 'attack', damageDie: '3d10', attackBonus: 9, condition: 'hexed', conditionDuration: 3, cooldown: 4, description: 'Tears at the soul, leaving the target cursed and weakened.' },
        { name: 'Dark Command', type: 'condition', condition: 'frightened', conditionDuration: 2, cooldown: 4, description: 'Issues a command laced with dark power. Obey or tremble.' },
      ],
    },
  ],
};

export const ENCOUNTER_THEMES: { setting: string; twist: string }[] = [
  { setting: 'a narrow ravine choked with fog', twist: 'The ground is slick with ice — footing is treacherous' },
  { setting: 'the ruins of a collapsed watchtower', twist: 'Rubble shifts underfoot, and something glints in the debris' },
  { setting: 'a moonlit clearing in a dead forest', twist: 'The trees whisper warnings that only the druid can hear' },
  { setting: 'a flooded crypt reeking of decay', twist: 'The water hides something that moves beneath the surface' },
  { setting: 'a merchant caravan under siege', twist: 'The merchants are not what they seem' },
  { setting: 'an ancient stone bridge over a chasm', twist: 'The bridge groans — it will not hold forever' },
  { setting: 'a burning village, smoke blotting out the sky', twist: 'Survivors are trapped in the chapel' },
  { setting: 'a dark cavern lit by bioluminescent fungi', twist: 'The spores cause hallucinations if inhaled too deeply' },
  { setting: 'a crossroads shrine defiled by dark magic', twist: 'The shrine pulses with residual power that could be harnessed' },
  { setting: 'the deck of a wrecked ship half-buried in sand', twist: 'The cargo hold still has something alive in it' },
  { setting: 'an overgrown arena from a forgotten civilization', twist: 'Spectral crowds cheer from the crumbling stands' },
  { setting: 'a frozen lake with something moving beneath the ice', twist: 'Cracks spread with every heavy impact' },
];

export function randomEncounterTheme(): { setting: string; twist: string } {
  return ENCOUNTER_THEMES[Math.floor(Math.random() * ENCOUNTER_THEMES.length)];
}

// ── Biome-based random encounter tables ──

export type Biome = 'forest' | 'dungeon' | 'mountain' | 'swamp' | 'desert' | 'underdark' | 'coastal' | 'urban';

export const BIOME_LABELS: Record<Biome, { label: string; icon: string; color: string }> = {
  forest:   { label: 'Forest',    icon: '🌲', color: 'text-green-400' },
  dungeon:  { label: 'Dungeon',   icon: '🏰', color: 'text-slate-400' },
  mountain: { label: 'Mountain',  icon: '⛰️', color: 'text-stone-400' },
  swamp:    { label: 'Swamp',     icon: '🌿', color: 'text-emerald-500' },
  desert:   { label: 'Desert',    icon: '🏜️', color: 'text-amber-400' },
  underdark: { label: 'Underdark', icon: '🕳️', color: 'text-purple-400' },
  coastal:  { label: 'Coastal',   icon: '🌊', color: 'text-sky-400' },
  urban:    { label: 'Urban',     icon: '🏙️', color: 'text-orange-300' },
};

/** Each biome has weighted encounter entries with enemy names + flavor. */
export interface BiomeEncounter {
  enemies: string[];
  flavor: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  weight: number; // higher = more likely
}

export const BIOME_ENCOUNTERS: Record<Biome, BiomeEncounter[]> = {
  forest: [
    { enemies: ['Wolf', 'Dire Wolf'], flavor: 'A howl pierces the canopy. Predators circle through the underbrush.', difficulty: 'easy', weight: 3 },
    { enemies: ['Goblin', 'Goblin', 'Goblin'], flavor: 'Goblin raiders spring from behind fallen logs, crude weapons raised.', difficulty: 'easy', weight: 3 },
    { enemies: ['Twig Blight', 'Vine Blight'], flavor: 'The trees themselves lurch to life, bark splitting to reveal thorny maws.', difficulty: 'medium', weight: 2 },
    { enemies: ['Bugbear', 'Hobgoblin'], flavor: 'An ambush from the tree line — they were waiting for you.', difficulty: 'medium', weight: 2 },
    { enemies: ['Owlbear'], flavor: 'A terrible screech-hoot shakes the air. Something massive crashes through the brush.', difficulty: 'hard', weight: 1 },
    { enemies: ['Young Dragon'], flavor: 'A shadow passes overhead, then the treeline erupts in flame.', difficulty: 'deadly', weight: 1 },
  ],
  dungeon: [
    { enemies: ['Skeleton', 'Skeleton', 'Zombie'], flavor: 'The dead rise from alcoves, eye sockets glowing with cold blue light.', difficulty: 'easy', weight: 3 },
    { enemies: ['Giant Rat', 'Giant Rat', 'Giant Rat'], flavor: 'Scratching echoes in the dark. Dozens of red eyes catch your torchlight.', difficulty: 'easy', weight: 2 },
    { enemies: ['Ghoul', 'Shadow'], flavor: 'The torches flicker. Something between the shadows hungers for the living.', difficulty: 'medium', weight: 2 },
    { enemies: ['Animated Armor', 'Animated Armor'], flavor: 'The suits of armor flanking the corridor animate with a grinding screech.', difficulty: 'medium', weight: 2 },
    { enemies: ['Minotaur'], flavor: 'A bellowing roar from deeper in the labyrinth. Hooves pound stone.', difficulty: 'hard', weight: 1 },
    { enemies: ['Lich Apprentice'], flavor: 'Arcane sigils flare on the walls. The temperature drops to freezing.', difficulty: 'deadly', weight: 1 },
  ],
  mountain: [
    { enemies: ['Kobold', 'Kobold', 'Kobold'], flavor: 'Small figures scramble across the rocks above, dropping stones and shrieking.', difficulty: 'easy', weight: 3 },
    { enemies: ['Orc', 'Orc'], flavor: 'War cries echo off the cliff face. A raiding party blocks the pass.', difficulty: 'medium', weight: 3 },
    { enemies: ['Manticore'], flavor: 'A barbed tail whips overhead. Something with too many teeth circles the peak.', difficulty: 'hard', weight: 2 },
    { enemies: ['Basilisk'], flavor: 'You notice the statues along the path look... too lifelike.', difficulty: 'hard', weight: 1 },
    { enemies: ['Chimera'], flavor: 'Three heads — lion, goat, dragon — turn toward you as one.', difficulty: 'deadly', weight: 1 },
  ],
  swamp: [
    { enemies: ['Stirge', 'Stirge', 'Stirge'], flavor: 'A cloud of bloodsuckers rises from the stagnant water.', difficulty: 'easy', weight: 3 },
    { enemies: ['Zombie', 'Zombie', 'Crawling Claw'], flavor: 'Something rises from the bog. It used to be human.', difficulty: 'easy', weight: 2 },
    { enemies: ['Giant Spider', 'Giant Spider'], flavor: 'Webs stretch between the dead trees. Something skitters above.', difficulty: 'medium', weight: 2 },
    { enemies: ['Shambling Mound'], flavor: 'The vegetation itself rises — a massive heap of rotting vines and fury.', difficulty: 'hard', weight: 1 },
    { enemies: ['Night Hag'], flavor: 'An eerie cackle carries across the mist. The air tastes of nightmares.', difficulty: 'deadly', weight: 1 },
  ],
  desert: [
    { enemies: ['Bandit', 'Bandit', 'Thug'], flavor: 'Desert raiders emerge from behind sand dunes, scarves across their faces.', difficulty: 'easy', weight: 3 },
    { enemies: ['Giant Spider'], flavor: 'The sand erupts. A burrowing predator lunges from below.', difficulty: 'medium', weight: 2 },
    { enemies: ['Gnoll', 'Gnoll'], flavor: 'Hyena-like laughter carries on the wind. A war band approaches.', difficulty: 'medium', weight: 2 },
    { enemies: ['Elemental'], flavor: 'A whirlwind of sand coalesces into a towering, furious form.', difficulty: 'hard', weight: 1 },
    { enemies: ['Young Dragon'], flavor: 'A brass blur descends from the blinding sun, landing in an explosion of sand.', difficulty: 'deadly', weight: 1 },
  ],
  underdark: [
    { enemies: ['Kobold', 'Kobold'], flavor: 'Traps click. Small shapes dart between the stalagmites.', difficulty: 'easy', weight: 2 },
    { enemies: ['Specter', 'Wight'], flavor: 'Cold emanates from the walls. Something that was once buried here stirs.', difficulty: 'medium', weight: 3 },
    { enemies: ['Phase Spider'], flavor: 'It blinks in and out of visibility, appearing closer each time.', difficulty: 'hard', weight: 2 },
    { enemies: ['Displacer Beast'], flavor: 'You see it three feet to the left of where it actually is. By the time you realize, it strikes.', difficulty: 'hard', weight: 1 },
    { enemies: ['Mind Flayer'], flavor: 'A psychic pressure builds behind your eyes. Something ancient and alien probes your thoughts.', difficulty: 'deadly', weight: 1 },
  ],
  coastal: [
    { enemies: ['Bandit', 'Bandit'], flavor: 'Pirates emerge from the sea cave, cutlasses drawn.', difficulty: 'easy', weight: 3 },
    { enemies: ['Ghoul', 'Zombie'], flavor: 'The tide washes in waterlogged corpses that begin to twitch.', difficulty: 'medium', weight: 2 },
    { enemies: ['Wraith'], flavor: 'A spectral ship appears on the horizon. Something boards yours.', difficulty: 'hard', weight: 1 },
    { enemies: ['Hydra'], flavor: 'The sea churns. Multiple serpentine heads break the surface.', difficulty: 'deadly', weight: 1 },
  ],
  urban: [
    { enemies: ['Thug', 'Thug', 'Bandit'], flavor: 'Footsteps behind you. The alley narrows. This was planned.', difficulty: 'easy', weight: 3 },
    { enemies: ['Cultist', 'Cultist', 'Cultist'], flavor: 'Robed figures step from the shadows, chanting in a tongue that hurts to hear.', difficulty: 'medium', weight: 2 },
    { enemies: ['Vampire Spawn'], flavor: 'The charming stranger\'s smile reveals too many teeth.', difficulty: 'hard', weight: 1 },
    { enemies: ['Oni'], flavor: 'The magistrate\'s form ripples and shifts, revealing a towering fiend.', difficulty: 'deadly', weight: 1 },
  ],
};

/** Roll a biome-based random encounter. Returns enemy names, flavor text, and difficulty.
 *  Uses weighted random selection — common encounters happen more often. */
export function rollBiomeEncounter(biome: Biome): BiomeEncounter {
  const table = BIOME_ENCOUNTERS[biome];
  const totalWeight = table.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const entry of table) {
    roll -= entry.weight;
    if (roll <= 0) return entry;
  }
  return table[table.length - 1]; // fallback
}

/** Check for random encounter (d20 roll vs DC). Returns encounter or null.
 *  Default DC 15 = 30% encounter chance. Lower DC = more encounters. */
export function checkRandomEncounter(biome: Biome, dc = 15): { encounter: BiomeEncounter; roll: number } | null {
  const roll = Math.floor(Math.random() * 20) + 1;
  if (roll >= dc) return { encounter: rollBiomeEncounter(biome), roll };
  return null;
}

export function generateEnemies(difficulty: string, partyLevel: number, count?: number): Unit[] {
  const templates = ENEMY_TEMPLATES[difficulty] || ENEMY_TEMPLATES.medium;
  const template = templates[Math.floor(Math.random() * templates.length)];
  const enemyCount = count || (difficulty === 'easy' ? 2 + Math.floor(Math.random() * 2) : difficulty === 'deadly' ? 1 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 3));
  const levelScale = 1 + (partyLevel - 1) * 0.15;

  return Array.from({ length: enemyCount }, (_, i) => {
    const name = template.names[Math.floor(Math.random() * template.names.length)];
    const baseHp = template.hp[0] + Math.floor(Math.random() * (template.hp[1] - template.hp[0] + 1));
    const scaledHp = Math.round(baseHp * levelScale);
    return {
      id: `enemy-${crypto.randomUUID().slice(0, 8)}-${i}`,
      name: enemyCount > 1 && template.names.length <= enemyCount ? `${name} ${String.fromCharCode(65 + i)}` : name,
      hp: scaledHp, maxHp: scaledHp, ac: template.ac, initiative: -1, isCurrentTurn: false,
      type: 'enemy' as const, playerId: 'ai-dm',
      attackBonus: template.attackBonus, damageDie: template.damageDie, damageBonus: template.damageBonus,
      dexMod: template.dexMod, abilities: template.abilities.map((a) => ({ ...a })),
      abilityCooldowns: {}, conditions: [], speed: 6, movementUsed: 0,
      reactionUsed: false, bonusActionUsed: false, disengaged: false, cr: template.cr, xpValue: template.xpValue,
      multiattack: template.multiattack, resistances: template.resistances, vulnerabilities: template.vulnerabilities, immunities: template.immunities,
    } satisfies Unit;
  });
}
