// Golem crafting instructions — step-by-step construct creation with material requirements.

export type GolemType = 'flesh' | 'clay' | 'stone' | 'iron' | 'mithral';

export interface CraftingStep {
  step: number;
  name: string;
  skill: string;
  dc: number;
  time: string;
  description: string;
  failureConsequence: string;
}

export interface GolemBlueprint {
  type: GolemType;
  cr: number;
  hp: number;
  ac: number;
  materials: { name: string; cost: number; source: string }[];
  totalCost: number;
  craftingTime: string;
  minCasterLevel: number;
  steps: CraftingStep[];
  specialAbility: string;
  weakness: string;
  controlMethod: string;
}

const BLUEPRINTS: GolemBlueprint[] = [
  { type: 'flesh', cr: 5, hp: 93, ac: 9, materials: [{ name: 'Humanoid corpses (6+)', cost: 0, source: 'Graveyards, battlefields, or... volunteers.' }, { name: 'Alchemical preservatives', cost: 500, source: 'Alchemist supplier.' }, { name: 'Lightning conductor apparatus', cost: 1000, source: 'Gnomish artificer.' }], totalCost: 1500, craftingTime: '2 months', minCasterLevel: 9, steps: [
    { step: 1, name: 'Assemble the Body', skill: 'Medicine', dc: 14, time: '2 weeks', description: 'Stitch together the best parts from multiple corpses.', failureConsequence: 'Misaligned joints. Golem has -10 speed permanently.' },
    { step: 2, name: 'Preserve and Treat', skill: 'Arcana', dc: 13, time: '1 week', description: 'Infuse with alchemical preservatives to prevent decay.', failureConsequence: 'Body decays. Restart step 1 with fresh materials.' },
    { step: 3, name: 'The Lightning Ritual', skill: 'Arcana', dc: 16, time: '1 day', description: 'Channel lightning through the conductor to animate the construct.', failureConsequence: 'Explosion. 4d10 lightning damage to all within 20ft. Body destroyed.' },
    { step: 4, name: 'Bind the Will', skill: 'Arcana', dc: 14, time: '1 day', description: 'Inscribe the control sigil on the forehead.', failureConsequence: 'Golem is uncontrolled. It attacks the nearest living creature.' },
  ], specialAbility: 'Berserk: if reduced below half HP, WIS DC 10 each round or it attacks the nearest creature (including allies).', weakness: 'Fire damage prevents regeneration. Vulnerable to Turn Undead (counts as undead for this purpose).', controlMethod: 'Verbal commands from the creator. 60ft range. Obeys literally, not intelligently.' },
  { type: 'clay', cr: 9, hp: 133, ac: 14, materials: [{ name: 'Sacred clay (1 ton)', cost: 3000, source: 'Holy river bank or consecrated earth.' }, { name: 'Holy water (50 vials)', cost: 1250, source: 'Temple of any good deity.' }, { name: 'Divine scroll (Animate Objects)', cost: 500, source: 'Temple library or scripture dealer.' }], totalCost: 4750, craftingTime: '3 months', minCasterLevel: 11, steps: [
    { step: 1, name: 'Shape the Form', skill: 'Potter\'s Tools', dc: 15, time: '3 weeks', description: 'Sculpt the golem from sacred clay. Must be done in a consecrated space.', failureConsequence: 'Cracks form during drying. -20 HP permanently.' },
    { step: 2, name: 'Inscribe Holy Words', skill: 'Religion', dc: 16, time: '1 week', description: 'Carve divine scripture into every surface.', failureConsequence: 'Incorrect scripture. Golem has vulnerability to necrotic damage.' },
    { step: 3, name: 'The Awakening Prayer', skill: 'Religion', dc: 17, time: '3 days', description: 'Continuous prayer for 72 hours. No rest.', failureConsequence: '3 levels of exhaustion for the caster. Restart step 3.' },
  ], specialAbility: 'Acid Absorption: immune to acid; regains HP equal to acid damage. Haste ability (1/day, no concentration).', weakness: 'Berserk at low HP (same as flesh golem). Cursed wound: slashing damage reduces max HP.', controlMethod: 'Amulet of control worn by creator. 120ft range. Can be transferred.' },
  { type: 'iron', cr: 16, hp: 210, ac: 20, materials: [{ name: 'Adamantine-infused iron (2 tons)', cost: 25000, source: 'Dwarven deep mines or planar import.' }, { name: 'Fire elemental essence', cost: 5000, source: 'Bound fire elemental (CR 5+).' }, { name: 'Manual of Golems (Iron)', cost: 20000, source: 'Arcane auction, dragon hoard, or ancient library.' }], totalCost: 50000, craftingTime: '6 months', minCasterLevel: 17, steps: [
    { step: 1, name: 'Forge the Frame', skill: 'Smith\'s Tools', dc: 18, time: '2 months', description: 'Each piece must be forged separately in elemental fire.', failureConsequence: 'Weak joint. AC reduced by 2 permanently.' },
    { step: 2, name: 'Bind the Elemental', skill: 'Arcana', dc: 19, time: '1 week', description: 'Trap the fire elemental essence inside the frame. It will resist.', failureConsequence: 'Elemental escapes. Combat encounter (CR 5) + materials wasted.' },
    { step: 3, name: 'Activate the Manual', skill: 'Arcana', dc: 20, time: '1 day', description: 'Read the Manual of Golems. The manual is consumed.', failureConsequence: 'Manual destroyed without effect. 50,000gp wasted.' },
  ], specialAbility: 'Poison Breath (10ft cone, 10d8 poison, CON DC 19 half, recharge 6). Fire absorption. Magic weapon immunity (only +3 weapons or adamantine).', weakness: 'Vulnerable to rust effects. Slow (move 25ft). Cannot swim.', controlMethod: 'Direct verbal commands. No range limit. Obeys the last command until given a new one.' },
];

export function getBlueprint(type: GolemType): GolemBlueprint | undefined {
  return BLUEPRINTS.find((b) => b.type === type);
}

export function getBlueprintsByCost(maxCost: number): GolemBlueprint[] {
  return BLUEPRINTS.filter((b) => b.totalCost <= maxCost);
}

export function getBlueprintsByLevel(casterLevel: number): GolemBlueprint[] {
  return BLUEPRINTS.filter((b) => b.minCasterLevel <= casterLevel);
}

export function getStepCount(blueprint: GolemBlueprint): number {
  return blueprint.steps.length;
}

export function getAllGolemTypes(): GolemType[] {
  return BLUEPRINTS.map((b) => b.type);
}

export function formatBlueprint(blueprint: GolemBlueprint): string {
  const icon = { flesh: '🧟', clay: '🏺', stone: '🗿', iron: '🤖', mithral: '✨' }[blueprint.type];
  const lines = [`${icon} **${blueprint.type.charAt(0).toUpperCase() + blueprint.type.slice(1)} Golem** *(CR ${blueprint.cr})*`];
  lines.push(`  HP: ${blueprint.hp} | AC: ${blueprint.ac} | Cost: ${blueprint.totalCost.toLocaleString()}gp | Time: ${blueprint.craftingTime}`);
  lines.push(`  Min caster level: ${blueprint.minCasterLevel}`);
  lines.push('  **Materials:**');
  blueprint.materials.forEach((m) => lines.push(`    📦 ${m.name} (${m.cost > 0 ? m.cost + 'gp' : 'free'}) — ${m.source}`));
  lines.push(`  ⚙️ Special: ${blueprint.specialAbility}`);
  lines.push(`  ⚡ Weakness: ${blueprint.weakness}`);
  return lines.join('\n');
}

export { BLUEPRINTS as GOLEM_BLUEPRINTS };
