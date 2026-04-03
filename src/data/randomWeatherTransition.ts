// Random weather transition — dramatic narration when weather changes.
export function narrateWeatherChange(from: string, to: string): string {
  const transitions: Record<string, Record<string, string>> = {
    none: { rain: 'Dark clouds gather overhead. The first drops begin to fall.', fog: 'A thick mist creeps in from the lowlands, swallowing visibility.', snow: 'The temperature plummets. White flakes begin to drift from a leaden sky.', sandstorm: 'The wind picks up sharply. Sand stings exposed skin.' },
    rain: { none: 'The rain tapers off. Puddles glisten as the clouds part.', fog: 'The rain fades into a heavy, clinging fog.', snow: 'The rain turns to sleet, then to thick, wet snow.', storm: 'Thunder rumbles. The rain intensifies into a full storm.' },
    fog: { none: 'The fog burns off as the sun breaks through.', rain: 'The mist thickens and becomes a steady drizzle.' },
    snow: { none: 'The snowfall stops. Silence hangs over the white landscape.', rain: 'The snow turns to cold rain as temperatures rise slightly.' },
  };
  const specific = transitions[from]?.[to];
  if (specific) return `🌤️ *${specific}*`;
  return `🌤️ *The weather shifts from ${from || 'clear'} to ${to}.*`;
}
export function getWeatherMoodEffect(weather: string): string {
  const moods: Record<string, string> = { none: 'Spirits are high under clear skies.', rain: 'The persistent rain dampens spirits. Disadvantage on morale-related checks.', fog: 'The fog is disorienting. -2 to navigation checks.', snow: 'The cold saps energy. Short rests take an extra 30 minutes.', sandstorm: 'Visibility is near zero. Navigation impossible without magic.' };
  return moods[weather] || 'The weather has no special effect.';
}
