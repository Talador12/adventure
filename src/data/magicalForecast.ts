// Magical weather forecast — predicting upcoming magical events based on signs.

export type ForecastAccuracy = 'certain' | 'likely' | 'possible' | 'uncertain';
export type ForecastTimeframe = 'hours' | 'days' | 'weeks' | 'season';

export interface MagicalForecast {
  eventName: string;
  signs: string[];
  prediction: string;
  accuracy: ForecastAccuracy;
  timeframe: ForecastTimeframe;
  preparationAdvice: string;
  divinationDC: number;
  mechanicalImpact: string;
  falseAlarmChance: number; // 0-100%
}

const FORECASTS: MagicalForecast[] = [
  { eventName: 'Leyline Surge', signs: ['Birds flying in spirals.', 'Compass needles spinning.', 'Cantrips producing double effects.'], prediction: 'A leyline intersection is about to pulse. All magic amplified for 1d4 hours.', accuracy: 'likely', timeframe: 'hours', preparationAdvice: 'Stock up on spell components. Move sensitive magical items to shielded containers.', divinationDC: 12, mechanicalImpact: 'All spell save DCs +2. All healing doubled. Wild magic surges on nat 1-3.', falseAlarmChance: 15 },
  { eventName: 'Fey Crossing', signs: ['Mushroom circles appearing overnight.', 'Children hearing music from the forest.', 'Flowers blooming out of season.'], prediction: 'The boundary between Material and Feywild will thin. Expect visitors.', accuracy: 'certain', timeframe: 'days', preparationAdvice: 'Remove iron from display. Prepare gifts. Do NOT eat anything a stranger offers.', divinationDC: 10, mechanicalImpact: 'Fey creatures can cross freely for 24 hours. Charm effects +2 DC. Time distortions possible.', falseAlarmChance: 5 },
  { eventName: 'Dead Wind', signs: ['Animals refusing to face north.', 'Candle flames burning blue.', 'A taste of copper in the air.'], prediction: 'Necrotic energy wave approaching from the Shadowfell. Undead activity will spike.', accuracy: 'likely', timeframe: 'days', preparationAdvice: 'Consecrate burial grounds. Stock holy water. Warn clerics.', divinationDC: 13, mechanicalImpact: 'Undead gain +2 HP per HD. Resurrection spells have 10% failure rate. Necromancy spells empowered.', falseAlarmChance: 20 },
  { eventName: 'Arcane Eclipse', signs: ['Stars visible during daytime.', 'Spell components glowing unprompted.', 'Familiar bonds feel "stretched."'], prediction: 'The weave of magic will thin for several hours. Spellcasting becomes unreliable.', accuracy: 'possible', timeframe: 'hours', preparationAdvice: 'Avoid complex spells. Rely on mundane solutions. Dismiss summoned creatures.', divinationDC: 15, mechanicalImpact: '25% spell failure chance. Concentration auto-fails on natural 1-5. Magic items flicker.', falseAlarmChance: 30 },
  { eventName: 'Convergence Bloom', signs: ['Multiple planar portals detected.', 'Elementals appearing spontaneously.', 'The sky changes color every hour.'], prediction: 'A rare multi-planar alignment. All planes are closer than usual.', accuracy: 'certain', timeframe: 'weeks', preparationAdvice: 'Prepare for interplanar visitors (friendly and hostile). Divination spells are extremely powerful today.', divinationDC: 14, mechanicalImpact: 'Plane Shift requires no material component. Divination spells see across planes. Portals open randomly.', falseAlarmChance: 5 },
  { eventName: 'Silence of the Weave', signs: ['No signs. That\'s the sign. Everything is too quiet.', 'Detect Magic returns nothing — even on known magical items.', 'Druids report the forest "stopped listening."'], prediction: 'Total magical suppression approaching. An antimagic event of unprecedented scale.', accuracy: 'uncertain', timeframe: 'season', preparationAdvice: 'Stockpile potions NOW. Train in mundane combat. Prepare non-magical contingencies for everything.', divinationDC: 18, mechanicalImpact: 'If real: all magic ceases for 1d4 days. If false alarm: nothing happens but everyone panicked for nothing.', falseAlarmChance: 50 },
];

export function getRandomForecast(): MagicalForecast {
  return FORECASTS[Math.floor(Math.random() * FORECASTS.length)];
}

export function getForecastsByAccuracy(accuracy: ForecastAccuracy): MagicalForecast[] {
  return FORECASTS.filter((f) => f.accuracy === accuracy);
}

export function getForecastsByTimeframe(timeframe: ForecastTimeframe): MagicalForecast[] {
  return FORECASTS.filter((f) => f.timeframe === timeframe);
}

export function getReliableForecasts(): MagicalForecast[] {
  return FORECASTS.filter((f) => f.falseAlarmChance <= 15);
}

export function getAllForecastAccuracies(): ForecastAccuracy[] {
  return ['certain', 'likely', 'possible', 'uncertain'];
}

export function formatForecast(forecast: MagicalForecast): string {
  const acc = { certain: '🟢', likely: '🟡', possible: '🟠', uncertain: '🔴' }[forecast.accuracy];
  const lines = [`${acc} **${forecast.eventName}** *(${forecast.accuracy}, ${forecast.timeframe}, Divination DC ${forecast.divinationDC})*`];
  lines.push(`  *${forecast.prediction}*`);
  lines.push('  Signs:');
  forecast.signs.forEach((s) => lines.push(`    👁️ ${s}`));
  lines.push(`  📋 Prep: ${forecast.preparationAdvice}`);
  lines.push(`  ⚙️ Impact: ${forecast.mechanicalImpact}`);
  lines.push(`  ❓ False alarm: ${forecast.falseAlarmChance}%`);
  return lines.join('\n');
}

export { FORECASTS as MAGICAL_FORECASTS };
