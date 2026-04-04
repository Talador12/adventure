// Elemental storm encounter — combat during magical storms with environmental hazards.

export type StormElement = 'fire' | 'ice' | 'lightning' | 'acid' | 'force' | 'necrotic';

export interface StormPhase { phase: number; name: string; environmentalEffect: string; combatModifier: string; duration: string; }

export interface ElementalStormEncounter {
  element: StormElement;
  name: string;
  description: string;
  phases: StormPhase[];
  enemiesEmpowered: string;
  partyAdaptation: string;
  eyeOfTheStorm: string;
  aftermath: string;
}

const STORMS: ElementalStormEncounter[] = [
  { element: 'lightning', name: 'The Wrath Above', description: 'A sentient thunderstorm that hunts spellcasters. It targets whoever cast the last spell.', phases: [
    { phase: 1, name: 'Gathering', environmentalEffect: 'Wind picks up. Ranged attacks at disadvantage beyond 30ft.', combatModifier: 'Lightning strikes: 5% per round, highest metal-wearing creature.', duration: '3 rounds' },
    { phase: 2, name: 'Fury', environmentalEffect: 'Torrential rain. Heavily obscured beyond 20ft. Fire spells extinguish.', combatModifier: 'Lightning targets last spellcaster: 4d6 lightning, DEX DC 15.', duration: '5 rounds' },
    { phase: 3, name: 'Crescendo', environmentalEffect: 'Wind becomes a gale. Small creatures: STR DC 13 or pushed 15ft.', combatModifier: 'Lightning every round at the last caster AND the highest point. 6d6 lightning.', duration: 'Until resolved' },
  ], enemiesEmpowered: 'Air and lightning elementals: +2 to hit, +1d6 lightning damage, resistance to all non-magical damage.', partyAdaptation: 'Stay low. Remove metal armor. Spread out. Don\'t cast spells (the storm HUNTS casters).', eyeOfTheStorm: 'A 20ft radius of perfect calm at the storm\'s center. Safe — but it moves 30ft per round.', aftermath: 'The ground is glass where lightning struck. Residual static: advantage on lightning spells for 24 hours.' },
  { element: 'fire', name: 'The Burning Sky', description: 'A firestorm from the Plane of Fire. Embers fall like rain. The air itself combusts.', phases: [
    { phase: 1, name: 'Ember Fall', environmentalEffect: 'Glowing embers descend. 1d4 fire per round to exposed creatures.', combatModifier: 'Fire creatures: +1d4 fire damage. Cold spells at disadvantage.', duration: '2 rounds' },
    { phase: 2, name: 'Conflagration', environmentalEffect: 'Air temperature: 150°F. CON DC 12 per round or 1 exhaustion. Wood ignites.', combatModifier: 'All fire damage +1d6. All cold damage -1d6.', duration: '4 rounds' },
    { phase: 3, name: 'Firestorm', environmentalEffect: 'Pillars of flame erupt randomly. 3 pillars per round, 10ft radius each, 4d6 fire.', combatModifier: 'Fire immunity for fire creatures. Fire absorption heals them.', duration: 'Until resolved' },
  ], enemiesEmpowered: 'Fire elementals, salamanders, magmin: regenerate 5 HP/round during the storm.', partyAdaptation: 'Fire resistance is essential. Create Water. Stay near water sources. Ice spells create temporary safe zones.', eyeOfTheStorm: 'A circle of ash where nothing burns. Cold — actually cold. The fire avoids this spot. Something is buried here.', aftermath: 'Scorched earth. Rare fire crystals form where the pillars struck (50gp each, 2d6 found).' },
  { element: 'necrotic', name: 'The Dead Wind', description: 'A storm of pure entropy. It doesn\'t bring rain — it brings decay. Flowers die. Bread molds. Wounds reopen.', phases: [
    { phase: 1, name: 'Withering', environmentalEffect: 'Plants within 100ft die. Food spoils. Healing spells heal half.', combatModifier: 'Undead gain +2 to all saves. Radiant damage reduced by half.', duration: '3 rounds' },
    { phase: 2, name: 'Entropy', environmentalEffect: 'Non-magical equipment degrades. -1 to weapon damage, -1 AC to armor per round.', combatModifier: 'Necrotic damage heals undead. Living creatures: max HP reduced by 1/round.', duration: '4 rounds' },
    { phase: 3, name: 'The Reaping', environmentalEffect: 'CON DC 14 per round or age 1d10 years. Everything crumbles.', combatModifier: 'Undead are at full power. Living creatures at disadvantage on all saves.', duration: 'Until resolved' },
  ], enemiesEmpowered: 'All undead: max HP doubled during the storm. Regeneration 10 HP/round.', partyAdaptation: 'Radiant damage still works (halved but still hurts). Consecrated ground slows the storm. Death Ward is essential.', eyeOfTheStorm: 'A single living flower in the center of the decay. It\'s the storm\'s anchor. Destroy it and the storm ends. Protect it and..?', aftermath: 'A dead zone. Nothing grows for 1d4 years. The ground itself is exhausted.' },
];

export function getRandomStorm(): ElementalStormEncounter {
  return STORMS[Math.floor(Math.random() * STORMS.length)];
}

export function getStormByElement(element: StormElement): ElementalStormEncounter | undefined {
  return STORMS.find((s) => s.element === element);
}

export function getPhaseCount(storm: ElementalStormEncounter): number {
  return storm.phases.length;
}

export function getAllStormElements(): StormElement[] {
  return [...new Set(STORMS.map((s) => s.element))];
}

export function formatStorm(storm: ElementalStormEncounter): string {
  const icon = { fire: '🔥', ice: '❄️', lightning: '⚡', acid: '🧪', force: '💥', necrotic: '💀' }[storm.element];
  const lines = [`${icon} **${storm.name}** *(${storm.element} storm)*`];
  lines.push(`  *${storm.description}*`);
  storm.phases.forEach((p) => lines.push(`  Phase ${p.phase}: **${p.name}** — ${p.environmentalEffect}`));
  lines.push(`  👁️ Eye: ${storm.eyeOfTheStorm}`);
  lines.push(`  🏕️ Aftermath: ${storm.aftermath}`);
  return lines.join('\n');
}

export { STORMS as ELEMENTAL_STORMS };
