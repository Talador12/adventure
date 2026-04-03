// Random dramatic weather events — one-off events for narrative impact.

export interface WeatherEvent {
  name: string;
  description: string;
  mechanicalEffect: string;
  duration: string;
  severity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
}

const WEATHER_EVENTS: WeatherEvent[] = [
  { name: 'Eclipse', description: 'The sun is blotted out. Darkness falls at midday.', mechanicalEffect: 'Dim light everywhere for 1 hour. Undead embolden.', duration: '1 hour', severity: 'moderate' },
  { name: 'Meteor Shower', description: 'Streaks of fire rain from the sky.', mechanicalEffect: 'DEX DC 14 in open areas or 2d6 fire. Craters form.', duration: '10 minutes', severity: 'severe' },
  { name: 'Blood Rain', description: 'Red-tinted rain falls from crimson clouds.', mechanicalEffect: 'Necrotic damage to plants. Animals flee. -2 morale.', duration: '3 hours', severity: 'moderate' },
  { name: 'Earthquake', description: 'The ground shakes violently.', mechanicalEffect: 'DEX DC 12 or fall prone. Structures may collapse.', duration: '1 minute', severity: 'severe' },
  { name: 'Magical Aurora', description: 'Shimmering lights dance across the sky.', mechanicalEffect: '+2 to Arcana checks. Wild magic chance doubles.', duration: 'Until dawn', severity: 'minor' },
  { name: 'Hailstorm', description: 'Ice chunks the size of fists pummel the area.', mechanicalEffect: '1d4 bludgeoning per round in open areas.', duration: '20 minutes', severity: 'moderate' },
  { name: 'Fog of the Dead', description: 'Unnatural fog rolls in. Whispers echo from nowhere.', mechanicalEffect: 'Heavily obscured. WIS DC 12 or Frightened.', duration: '2 hours', severity: 'moderate' },
  { name: 'Tornado', description: 'A twisting column of wind tears across the landscape.', mechanicalEffect: 'STR DC 16 or thrown 30ft. Structures destroyed.', duration: '5 minutes', severity: 'catastrophic' },
  { name: 'Rainbow Bridge', description: 'A brilliant rainbow solidifies into a walkable bridge.', mechanicalEffect: 'Bridge spans 500ft. Disappears after 1 hour.', duration: '1 hour', severity: 'minor' },
  { name: 'Volcanic Ash Cloud', description: 'A distant eruption sends ash across the sky.', mechanicalEffect: 'Lightly obscured. CON DC 10 per hour or 1 exhaustion.', duration: '1d4 days', severity: 'severe' },
];

export function rollWeatherEvent(): WeatherEvent {
  return WEATHER_EVENTS[Math.floor(Math.random() * WEATHER_EVENTS.length)];
}

export function getEventsBySeverity(severity: WeatherEvent['severity']): WeatherEvent[] {
  return WEATHER_EVENTS.filter((e) => e.severity === severity);
}

export function formatWeatherEvent(event: WeatherEvent): string {
  const icon = event.severity === 'catastrophic' ? '🌪️' : event.severity === 'severe' ? '⛈️' : event.severity === 'moderate' ? '🌧️' : '🌈';
  return `${icon} **${event.name}** (${event.severity}, ${event.duration})\n*${event.description}*\nEffect: ${event.mechanicalEffect}`;
}
