// Arcane familiar evolution — familiars that gain new forms and abilities through XP.

export type FamiliarForm = 'basic' | 'enhanced' | 'greater' | 'legendary';

export interface FamiliarAbility { name: string; form: FamiliarForm; description: string; mechanicalEffect: string; }

export interface FamiliarEvolution {
  baseName: string;
  baseForm: string;
  evolutions: { form: FamiliarForm; name: string; appearance: string; hp: number; ac: number; abilities: FamiliarAbility[]; xpRequired: number }[];
  evolutionTrigger: string;
  personality: string;
}

const EVOLUTIONS: FamiliarEvolution[] = [
  { baseName: 'Ember (Fire Cat)', baseForm: 'A tiny orange tabby with unusually warm fur.', evolutions: [
    { form: 'basic', name: 'Ember', appearance: 'Orange tabby, warm to the touch.', hp: 4, ac: 12, abilities: [{ name: 'Warm Aura', form: 'basic', description: 'Radiates gentle warmth.', mechanicalEffect: 'Allies within 5ft can\'t be affected by natural cold.' }], xpRequired: 0 },
    { form: 'enhanced', name: 'Cinder', appearance: 'Fur flickers with actual flames at the tips.', hp: 8, ac: 13, abilities: [{ name: 'Fire Pounce', form: 'enhanced', description: 'Leaps and ignites.', mechanicalEffect: 'Attack: +4, 1d4+1 fire damage.' }, { name: 'Heat Metal', form: 'enhanced', description: 'Touch metal to warm it.', mechanicalEffect: 'Heat Metal on one object (1/day, 2nd level).' }], xpRequired: 200 },
    { form: 'greater', name: 'Inferno', appearance: 'A medium-sized fire cat wreathed in flames. Paw prints scorch the ground.', hp: 18, ac: 14, abilities: [{ name: 'Fireball Pounce', form: 'greater', description: 'Explosive landing.', mechanicalEffect: 'Attack: +6, 2d6 fire. On crit, 5ft burst for 1d6 fire.' }, { name: 'Fire Shield', form: 'greater', description: 'Wraps ally in protective flames.', mechanicalEffect: 'Fire Shield (warm) on one ally, 1/day.' }], xpRequired: 600 },
    { form: 'legendary', name: 'Phoenix Cat', appearance: 'Wings of flame. Eyes like small suns. Majestic and terrifying.', hp: 30, ac: 16, abilities: [{ name: 'Rebirth', form: 'legendary', description: 'Returns from death in flame.', mechanicalEffect: 'If killed, reborn from ashes in 24 hours at full HP. 1/week.' }, { name: 'Sunfire Breath', form: 'legendary', description: 'Miniature dragon breath.', mechanicalEffect: '15ft cone, 4d6 fire (DEX DC 14 half). 1/day.' }], xpRequired: 1500 },
  ], evolutionTrigger: 'Ember evolves when exposed to intense fire while at max XP for the current form.', personality: 'Playful, purrs loudly, chases fireflies. Gets grumpy when wet.' },
  { baseName: 'Shade (Shadow Raven)', baseForm: 'A raven with feathers that absorb light.', evolutions: [
    { form: 'basic', name: 'Shade', appearance: 'A dark raven. Feathers shimmer like oil.', hp: 4, ac: 13, abilities: [{ name: 'Mimicry', form: 'basic', description: 'Copies short phrases.', mechanicalEffect: 'Can mimic any voice heard in the last 24 hours. 10 words max.' }], xpRequired: 0 },
    { form: 'enhanced', name: 'Dusk', appearance: 'Feathers are pure black. Casts no shadow.', hp: 8, ac: 14, abilities: [{ name: 'Shadow Meld', form: 'enhanced', description: 'Dissolves into shadow.', mechanicalEffect: 'Invisible in dim light or darkness. Advantage on Stealth.' }, { name: 'Dark Whisper', form: 'enhanced', description: 'Telepathic relay.', mechanicalEffect: 'Telepathy 120ft with bonded master.' }], xpRequired: 200 },
    { form: 'greater', name: 'Nightwing', appearance: 'Wingspan of 4ft. Eyes are voids.', hp: 16, ac: 15, abilities: [{ name: 'Shadow Step', form: 'greater', description: 'Teleport between shadows.', mechanicalEffect: 'Misty Step (darkness only) at will.' }, { name: 'Fear Shriek', form: 'greater', description: 'Terrifying scream.', mechanicalEffect: '15ft cone, WIS DC 13 or frightened 1 round.' }], xpRequired: 600 },
    { form: 'legendary', name: 'Void Raven', appearance: 'A hole in reality shaped like a bird.', hp: 28, ac: 17, abilities: [{ name: 'Dimensional Rift', form: 'legendary', description: 'Tears a small hole in space.', mechanicalEffect: 'Creates a 5ft portal between two points within 120ft. 1/day. Lasts 1 round.' }, { name: 'Soul Sight', form: 'legendary', description: 'Sees the truth.', mechanicalEffect: 'Truesight 30ft. Can detect lies (Insight +10).' }], xpRequired: 1500 },
  ], evolutionTrigger: 'Shade evolves during a total eclipse or after witnessing a death at max XP.', personality: 'Curious, collects shiny objects, judges people silently. Dramatic entrances.' },
  { baseName: 'Moss (Plant Sprite)', baseForm: 'A tiny humanoid made of woven vines and leaves.', evolutions: [
    { form: 'basic', name: 'Moss', appearance: '6 inches tall, leafy, smells like spring.', hp: 3, ac: 11, abilities: [{ name: 'Druidcraft', form: 'basic', description: 'Minor nature magic.', mechanicalEffect: 'Druidcraft cantrip at will.' }], xpRequired: 0 },
    { form: 'enhanced', name: 'Briar', appearance: '1ft tall, thorny vines, small flowers bloom.', hp: 7, ac: 12, abilities: [{ name: 'Thorn Shot', form: 'enhanced', description: 'Launches thorns.', mechanicalEffect: 'Attack: +3, 1d4 piercing, 30ft range.' }, { name: 'Healing Pollen', form: 'enhanced', description: 'Releases healing spores.', mechanicalEffect: 'One creature within 5ft heals 1d4 HP. 2/day.' }], xpRequired: 200 },
    { form: 'greater', name: 'Thornheart', appearance: '2ft tall, bark armor, a crown of flowers.', hp: 14, ac: 14, abilities: [{ name: 'Entangle', form: 'greater', description: 'Vines erupt from the ground.', mechanicalEffect: 'Entangle (20ft radius) 1/day.' }, { name: 'Goodberry', form: 'greater', description: 'Grows magical berries.', mechanicalEffect: 'Produces 5 Goodberries per long rest.' }], xpRequired: 600 },
    { form: 'legendary', name: 'Worldroot Sprite', appearance: '3ft tall, ancient bark, galaxies in their eyes.', hp: 25, ac: 15, abilities: [{ name: 'Tree Stride', form: 'legendary', description: 'Walk between trees.', mechanicalEffect: 'Transport via Plants 1/day (within 1 mile).' }, { name: 'Nature\'s Wrath', form: 'legendary', description: 'The forest fights for you.', mechanicalEffect: 'Animate 1d4 trees within 60ft for 1 minute. 1/week.' }], xpRequired: 1500 },
  ], evolutionTrigger: 'Moss evolves when planted in magical soil during a solstice at max XP.', personality: 'Gentle, hums, naps in sunbeams, gets aggressive about littering.' },
];

export function getEvolution(baseName: string): FamiliarEvolution | undefined {
  return EVOLUTIONS.find((e) => e.baseName === baseName);
}

export function getFormAtXP(evolution: FamiliarEvolution, xp: number): FamiliarEvolution['evolutions'][0] {
  const sorted = [...evolution.evolutions].sort((a, b) => b.xpRequired - a.xpRequired);
  return sorted.find((e) => xp >= e.xpRequired) ?? evolution.evolutions[0];
}

export function getNextEvolution(evolution: FamiliarEvolution, currentXP: number): FamiliarEvolution['evolutions'][0] | null {
  const next = evolution.evolutions.find((e) => e.xpRequired > currentXP);
  return next ?? null;
}

export function getAllFamiliarNames(): string[] {
  return EVOLUTIONS.map((e) => e.baseName);
}

export function formatFamiliarEvolution(evo: FamiliarEvolution, currentXP: number = 0): string {
  const current = getFormAtXP(evo, currentXP);
  const next = getNextEvolution(evo, currentXP);
  const lines = [`🐾 **${current.name}** *(${current.form} form)*`];
  lines.push(`  *${current.appearance}*`);
  lines.push(`  HP: ${current.hp} | AC: ${current.ac} | XP: ${currentXP}/${next?.xpRequired ?? 'MAX'}`);
  current.abilities.forEach((a) => lines.push(`  ⚙️ ${a.name}: ${a.mechanicalEffect}`));
  if (next) lines.push(`  ⬆️ Next: ${next.name} at ${next.xpRequired} XP — *${evo.evolutionTrigger}*`);
  return lines.join('\n');
}

export { EVOLUTIONS as FAMILIAR_EVOLUTIONS };
