// Astral weather hazard table — environmental dangers in the space between planes.

export type AstralWeatherType = 'psychic_storm' | 'color_cascade' | 'temporal_eddy' | 'gravity_wave' | 'void_pocket' | 'memory_rain';

export interface AstralWeatherHazard {
  type: AstralWeatherType;
  name: string;
  description: string;
  warningSignsDC: number;
  mechanicalEffects: string[];
  duration: string;
  avoidance: string;
  benefit: string | null; // some hazards have hidden upsides
}

const HAZARDS: AstralWeatherHazard[] = [
  { type: 'psychic_storm', name: 'Thought Hurricane', description: 'A vortex of raw psychic energy. Thoughts from a million minds scream through the void.', warningSignsDC: 13, mechanicalEffects: ['INT DC 14 each round or 3d6 psychic damage.', 'Telepathy range increased to 1 mile (the storm amplifies psionic signals).', 'Concentration impossible for non-psionic creatures.', 'Psionics: +1d6 to all psychic damage dealt.'], duration: '1d4 hours', avoidance: 'Shelter behind a large object (asteroid, dead god). The storm flows around mass.', benefit: 'Psionics within the storm are supercharged. Risk vs reward.' },
  { type: 'color_cascade', name: 'The Prismatic Flood', description: 'A wave of pure color sweeps through the astral sea. Each color carries a different magical effect.', warningSignsDC: 10, mechanicalEffects: ['Red band: 4d6 fire damage (DEX save).', 'Blue band: 4d6 cold + speed halved (CON save).', 'Green band: 4d6 poison (CON save).', 'Violet band: teleported 1d100 miles in random direction (CHA save).', 'Random band each round until the cascade passes.'], duration: '1d6 rounds', avoidance: 'Cast Prismatic Wall in reverse to cancel the cascade. Or just survive.', benefit: 'Golden band (rare, 10% chance): heals 4d6 and removes one condition.' },
  { type: 'temporal_eddy', name: 'Time Whirlpool', description: 'Time swirls in a visible spiral. Past and future overlap. You can see yesterday and tomorrow simultaneously.', warningSignsDC: 14, mechanicalEffects: ['Everyone rolls initiative twice and uses the worse result.', '50% chance each round that your action happens BEFORE you choose it (DM acts for you based on your stated intention).', 'Aging: 1d10 years forward or backward (50/50 each creature).', 'Spells cast in the eddy may target their PAST selves.'], duration: '2d4 rounds', avoidance: 'Hold perfectly still. The eddy passes around stationary objects.', benefit: 'A clear view of 1d4 rounds into the future. Can be used strategically if you survive the disorientation.' },
  { type: 'gravity_wave', name: 'The Crush', description: 'A ripple of intensified gravity rolls through astral space. Everything gets heavier. Much heavier.', warningSignsDC: 12, mechanicalEffects: ['Gravity increases 5× for duration.', 'Movement speed halved. Flying creatures must STR DC 14 each round or crash.', 'Carrying capacity reduced to 1/5. Drop heavy items or be crushed.', '1d6 bludgeoning per round from gravity pressure.'], duration: '1d4 minutes', avoidance: 'Reduce personal mass: Gaseous Form or Etherealness negates.', benefit: null },
  { type: 'void_pocket', name: 'The Nothing', description: 'A sphere of absolute nothing. Not empty — NOTHING. No light, no sound, no magic, no thought.', warningSignsDC: 16, mechanicalEffects: ['Inside the pocket: all senses cease. Blind, deaf, no tremorsense, no telepathy.', 'Magic does not function. Items deactivate.', 'No damage dealt or taken — nothing happens. You simply... are.', 'WIS DC 15 each minute or panic (random direction movement at full speed).'], duration: '1d10 minutes', avoidance: 'The pocket is visible as a sphere of perfect blackness. Simply go around it.', benefit: 'Perfect rest. One minute inside the pocket counts as a short rest (if you don\'t panic).' },
  { type: 'memory_rain', name: 'Recollection Shower', description: 'Crystallized memories fall like rain. Each drop is a fragment of someone\'s life.', warningSignsDC: 8, mechanicalEffects: ['Each round: experience a random creature\'s memory (WIS DC 11 or lose your action, overwhelmed).', 'Memories can be collected (Investigation DC 13). Each is worth 10-50gp to sages.', 'Occasionally contains useful information (5% chance of relevant lore per round).', 'Extended exposure: WIS DC 14 or gain a false memory you believe is your own.'], duration: '1d8 hours', avoidance: 'Cover your head. Any hat or helmet reduces the DC by 3.', benefit: 'A treasure trove of information if you can sort through the noise.' },
];

export function getRandomAstralWeather(): AstralWeatherHazard {
  return HAZARDS[Math.floor(Math.random() * HAZARDS.length)];
}

export function getHazardByType(type: AstralWeatherType): AstralWeatherHazard | undefined {
  return HAZARDS.find((h) => h.type === type);
}

export function getHazardsWithBenefits(): AstralWeatherHazard[] {
  return HAZARDS.filter((h) => h.benefit !== null);
}

export function getAllAstralWeatherTypes(): AstralWeatherType[] {
  return HAZARDS.map((h) => h.type);
}

export function formatAstralWeather(hazard: AstralWeatherHazard): string {
  const icon = { psychic_storm: '🧠', color_cascade: '🌈', temporal_eddy: '⏳', gravity_wave: '⬇️', void_pocket: '⚫', memory_rain: '💧' }[hazard.type];
  const lines = [`${icon} **${hazard.name}** *(Warning DC ${hazard.warningSignsDC})*`];
  lines.push(`  *${hazard.description}*`);
  lines.push('  **Effects:**');
  hazard.mechanicalEffects.forEach((e) => lines.push(`    ⚡ ${e}`));
  lines.push(`  Duration: ${hazard.duration} | Avoid: ${hazard.avoidance}`);
  if (hazard.benefit) lines.push(`  ✨ Benefit: ${hazard.benefit}`);
  return lines.join('\n');
}

export { HAZARDS as ASTRAL_WEATHER_HAZARDS };
