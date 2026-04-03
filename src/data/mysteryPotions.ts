// Random potion effect generator — mysterious unidentified potions.

export interface MysteryPotion {
  appearance: string;
  taste: string;
  effect: string;
  duration: string;
  isPositive: boolean;
}

const APPEARANCES = ['Bubbling crimson liquid', 'Swirling silver mist in a vial', 'Thick green sludge', 'Clear liquid with golden flecks', 'Oily black fluid', 'Sparkling blue liquid', 'Pale pink with tiny hearts floating in it', 'Murky brown with sediment', 'Luminous white that glows faintly', 'Viscous purple with smoke rising off it'];
const TASTES = ['Sweet like honey', 'Bitter and metallic', 'Sour enough to pucker', 'Tasteless like water', 'Spicy and warm', 'Salty with an aftertaste of ash', 'Fizzy and tingling', 'Earthy like mushrooms', 'Minty and cold', 'Sickeningly sweet'];
const EFFECTS: { effect: string; duration: string; positive: boolean }[] = [
  { effect: 'Heals 2d4+2 HP.', duration: 'Instant', positive: true },
  { effect: 'Grants darkvision 60ft.', duration: '1 hour', positive: true },
  { effect: 'Hair changes to a random color.', duration: '1d4 days', positive: true },
  { effect: 'Advantage on STR checks.', duration: '10 minutes', positive: true },
  { effect: 'Poisoned condition.', duration: '1 hour', positive: false },
  { effect: 'Grow 1d6 inches taller.', duration: 'Permanent', positive: true },
  { effect: 'Can only speak in rhymes.', duration: '1 hour', positive: false },
  { effect: 'Resistance to fire damage.', duration: '1 hour', positive: true },
  { effect: 'Uncontrollable hiccups (-2 Stealth).', duration: '10 minutes', positive: false },
  { effect: 'Gain telepathy 30ft.', duration: '10 minutes', positive: true },
  { effect: 'Skin turns translucent.', duration: '1 hour', positive: false },
  { effect: '+2 to all saving throws.', duration: '1 hour', positive: true },
  { effect: 'Shrink to half size.', duration: '10 minutes', positive: false },
  { effect: 'See invisible creatures.', duration: '10 minutes', positive: true },
  { effect: 'Fall asleep for 1d4 rounds.', duration: '1d4 rounds', positive: false },
  { effect: 'Speak and understand all languages.', duration: '1 hour', positive: true },
  { effect: 'Emit bright light 20ft from your body.', duration: '1 hour', positive: true },
  { effect: 'Gain 10 temporary HP.', duration: '1 hour', positive: true },
  { effect: 'Uncontrollable laughter for 1 round.', duration: '1 round', positive: false },
  { effect: 'Water breathing.', duration: '8 hours', positive: true },
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateMysteryPotion(): MysteryPotion {
  const e = pick(EFFECTS);
  return { appearance: pick(APPEARANCES), taste: pick(TASTES), effect: e.effect, duration: e.duration, isPositive: e.positive };
}

export function formatMysteryPotion(potion: MysteryPotion, identified: boolean = false): string {
  const lines = [`🧪 **Mystery Potion:**`];
  lines.push(`Appearance: *${potion.appearance}*`);
  lines.push(`Taste: *${potion.taste}*`);
  if (identified) { lines.push(`Effect: ${potion.isPositive ? '✅' : '⚠️'} ${potion.effect} (${potion.duration})`); }
  else { lines.push(`Effect: ??? (Drink to find out, or Arcana DC 15 to identify)`); }
  return lines.join('\n');
}
