// Poison crafting and identification — alchemical poison system with symptoms, DCs, and antidotes.

export type PoisonDelivery = 'ingested' | 'injury' | 'inhaled' | 'contact';
export type PoisonRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface Poison {
  name: string;
  delivery: PoisonDelivery;
  rarity: PoisonRarity;
  saveDC: number;
  saveType: 'CON' | 'WIS' | 'DEX';
  onsetTime: string;
  symptoms: string[];
  effect: string;
  duration: string;
  antidote: string;
  craftingDC: number;
  ingredients: { name: string; cost: number }[];
  identifyDC: number; // Medicine/Nature check to identify
}

const POISONS: Poison[] = [
  {
    name: 'Pale Toadstool Extract',
    delivery: 'ingested',
    rarity: 'common',
    saveDC: 11,
    saveType: 'CON',
    onsetTime: '10 minutes',
    symptoms: ['Nausea', 'Stomach cramps', 'Pale complexion'],
    effect: 'Poisoned condition for 24 hours. 1d4 poison damage at dawn.',
    duration: '24 hours',
    antidote: 'Charcoal paste (1gp) or Lesser Restoration.',
    craftingDC: 12,
    ingredients: [{ name: 'Pale Toadstool', cost: 5 }, { name: 'Distilled Water', cost: 1 }],
    identifyDC: 10,
  },
  {
    name: 'Serpent Venom',
    delivery: 'injury',
    rarity: 'uncommon',
    saveDC: 13,
    saveType: 'CON',
    onsetTime: 'Immediate',
    symptoms: ['Burning at wound site', 'Swelling', 'Dizziness'],
    effect: '3d6 poison damage on failed save, half on success.',
    duration: 'Instant',
    antidote: 'Antitoxin (50gp) within 1 minute.',
    craftingDC: 14,
    ingredients: [{ name: 'Snake Venom Gland', cost: 25 }, { name: 'Alchemist Catalyst', cost: 10 }],
    identifyDC: 12,
  },
  {
    name: 'Dreamdust',
    delivery: 'inhaled',
    rarity: 'uncommon',
    saveDC: 13,
    saveType: 'WIS',
    onsetTime: '1 round',
    symptoms: ['Drowsiness', 'Vivid hallucinations', 'Slurred speech'],
    effect: 'Unconscious for 1 hour. Vivid prophetic dreams (DM provides cryptic vision).',
    duration: '1 hour',
    antidote: 'Strong smelling salts (5gp) or a slap (1 damage wakes).',
    craftingDC: 14,
    ingredients: [{ name: 'Moonpetal', cost: 15 }, { name: 'Powdered Silver', cost: 10 }],
    identifyDC: 13,
  },
  {
    name: 'Basilisk Oil',
    delivery: 'contact',
    rarity: 'rare',
    saveDC: 15,
    saveType: 'CON',
    onsetTime: '1 round',
    symptoms: ['Skin hardening', 'Joint stiffness', 'Grey discoloration'],
    effect: 'Restrained (1 round), then Petrified on second failed save.',
    duration: 'Until Greater Restoration or antidote',
    antidote: 'Basilisk blood (150gp) applied within 1 minute.',
    craftingDC: 18,
    ingredients: [{ name: 'Basilisk Eye', cost: 100 }, { name: 'ite Oil', cost: 30 }],
    identifyDC: 16,
  },
  {
    name: 'Assassin\'s Blood',
    delivery: 'ingested',
    rarity: 'rare',
    saveDC: 15,
    saveType: 'CON',
    onsetTime: '1 minute',
    symptoms: ['Metallic taste', 'Cold sweats', 'Rapid heartbeat'],
    effect: '6d6 poison damage on fail, half on success. Poisoned for 24 hours on fail.',
    duration: '24 hours (poisoned condition)',
    antidote: 'Healer\'s Kit + Medicine DC 15 within 10 minutes, or Greater Restoration.',
    craftingDC: 17,
    ingredients: [{ name: 'Deathcap Mushroom', cost: 50 }, { name: 'Hemlock Extract', cost: 30 }, { name: 'Binding Agent', cost: 10 }],
    identifyDC: 15,
  },
  {
    name: 'Wyvern Poison',
    delivery: 'injury',
    rarity: 'rare',
    saveDC: 15,
    saveType: 'CON',
    onsetTime: 'Immediate',
    symptoms: ['Intense pain', 'Convulsions', 'Foaming'],
    effect: '7d6 poison damage on fail, half on success.',
    duration: 'Instant',
    antidote: 'Antitoxin (50gp) + Medicine DC 14.',
    craftingDC: 17,
    ingredients: [{ name: 'Wyvern Stinger', cost: 100 }, { name: 'Preserving Salt', cost: 5 }],
    identifyDC: 14,
  },
  {
    name: 'Midnight Tears',
    delivery: 'ingested',
    rarity: 'legendary',
    saveDC: 17,
    saveType: 'CON',
    onsetTime: 'Midnight (delayed)',
    symptoms: ['None until midnight', 'Then: agony, internal bleeding, blackened veins'],
    effect: '9d6 poison damage at midnight. No symptoms before that.',
    duration: 'Instant (at midnight)',
    antidote: 'Only if identified before midnight. Purify Food and Drink before consumption.',
    craftingDC: 20,
    ingredients: [{ name: 'Nightshade Essence', cost: 200 }, { name: 'Phase Spider Ichor', cost: 150 }, { name: 'Moonstone Dust', cost: 100 }],
    identifyDC: 18,
  },
  {
    name: 'Truth Serum',
    delivery: 'ingested',
    rarity: 'uncommon',
    saveDC: 14,
    saveType: 'WIS',
    onsetTime: '5 minutes',
    symptoms: ['Relaxation', 'Unfocused gaze', 'Inappropriate honesty'],
    effect: 'Cannot deliberately lie for 1 hour. Advantage on Insight checks vs target.',
    duration: '1 hour',
    antidote: 'Strong will (WIS DC 14 each question) or Protection from Evil/Good.',
    craftingDC: 15,
    ingredients: [{ name: 'Zone of Truth component (lead)', cost: 10 }, { name: 'Alcohol (strong)', cost: 5 }, { name: 'Fey Pollen', cost: 25 }],
    identifyDC: 13,
  },
];

export function getRandomPoison(): Poison {
  return POISONS[Math.floor(Math.random() * POISONS.length)];
}

export function getPoisonsByDelivery(delivery: PoisonDelivery): Poison[] {
  return POISONS.filter((p) => p.delivery === delivery);
}

export function getPoisonsByRarity(rarity: PoisonRarity): Poison[] {
  return POISONS.filter((p) => p.rarity === rarity);
}

export function getCraftingCost(poison: Poison): number {
  return poison.ingredients.reduce((sum, i) => sum + i.cost, 0);
}

export function canIdentify(poison: Poison, medicineModifier: number): boolean {
  // Can identify if d20 + mod >= DC (average roll of 10.5)
  return (10 + medicineModifier) >= poison.identifyDC;
}

export function getAllDeliveryMethods(): PoisonDelivery[] {
  return ['ingested', 'injury', 'inhaled', 'contact'];
}

export function formatPoison(poison: Poison, identified: boolean = true): string {
  if (!identified) return `❓ **Unknown Poison** (${poison.delivery}) — Medicine/Nature DC ${poison.identifyDC} to identify.`;
  const icon = { ingested: '🍷', injury: '🗡️', inhaled: '💨', contact: '✋' }[poison.delivery];
  const rarIcon = { common: '⚪', uncommon: '🟢', rare: '🔵', legendary: '🟣' }[poison.rarity];
  const lines = [`${icon} **${poison.name}** ${rarIcon} *(${poison.rarity}, ${poison.delivery})*`];
  lines.push(`  Save: ${poison.saveType} DC ${poison.saveDC} | Onset: ${poison.onsetTime} | Duration: ${poison.duration}`);
  lines.push(`  Symptoms: ${poison.symptoms.join(', ')}`);
  lines.push(`  Effect: ${poison.effect}`);
  lines.push(`  💊 Antidote: ${poison.antidote}`);
  lines.push(`  🔬 Craft DC: ${poison.craftingDC} | Cost: ${getCraftingCost(poison)}gp`);
  return lines.join('\n');
}

export { POISONS };
