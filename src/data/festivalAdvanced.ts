// Advanced festival/holiday generator — cultural celebrations with activities, plot hooks, and atmosphere.

export type FestivalType = 'religious' | 'harvest' | 'martial' | 'arcane' | 'seasonal' | 'memorial';

export interface FestivalActivity {
  name: string;
  skill: string;
  dc: number;
  prize: string;
  description: string;
}

export interface AdvancedFestival {
  name: string;
  type: FestivalType;
  duration: string;
  description: string;
  activities: FestivalActivity[];
  plotHook: string;
  atmosphere: string;
  specialFood: string;
}

const FESTIVALS: AdvancedFestival[] = [
  {
    name: 'The Feast of Burning Stars',
    type: 'seasonal',
    duration: '3 days (summer solstice)',
    description: 'Bonfires on every hilltop. Lanterns fill the sky. The longest day celebrated with excess.',
    activities: [
      { name: 'Fire Dancing', skill: 'Performance', dc: 13, prize: '25gp + fireflower garland', description: 'Dance through a ring of flames without getting singed.' },
      { name: 'Ale Drinking Contest', skill: 'Constitution', dc: 14, prize: '10gp + Festive Champion title', description: 'Last one standing wins.' },
      { name: 'Lantern Race', skill: 'Athletics', dc: 12, prize: '15gp + blessed lantern', description: 'Carry a lit lantern up the hill. First to the top wins.' },
    ],
    plotHook: 'A child goes missing during the fireworks. The bonfires mask something darker.',
    atmosphere: 'Joyful chaos. Music everywhere. Roasted meat and cinnamon.',
    specialFood: 'Starfire cakes — cinnamon pastries dusted with edible gold.',
  },
  {
    name: 'The Requiem of Fallen Heroes',
    type: 'memorial',
    duration: '1 day (autumn equinox)',
    description: 'A solemn day honoring the dead. The barrier between worlds thins.',
    activities: [
      { name: 'The Telling', skill: 'Performance', dc: 11, prize: 'Respect + hero\'s medal (10gp)', description: 'Tell the story of a fallen hero. Judged by tears.' },
      { name: 'Spirit\'s Vigil', skill: 'Wisdom', dc: 14, prize: 'Ghostly blessing (+1 WIS saves 24h)', description: 'Sit alone in the graveyard dusk to dawn. Don\'t flinch.' },
    ],
    plotHook: 'A ghost appears who isn\'t in any records. Searching for someone at the festival.',
    atmosphere: 'Quiet reverence. Candlelit processions. Even taverns are subdued.',
    specialFood: 'Mourner\'s bread — dark rye with dried fruit, shared in silence.',
  },
  {
    name: 'The Grand Bazaar of Wonders',
    type: 'arcane',
    duration: '5 days (when the comet passes)',
    description: 'Wizards, artificers, and merchants from across the planes. Occasional explosions.',
    activities: [
      { name: 'Spell Duel', skill: 'Arcana', dc: 15, prize: '50gp + rare spell scroll', description: 'Non-lethal magic contest. Style points matter.' },
      { name: 'Potion Tasting', skill: 'Constitution', dc: 13, prize: '3 random potions', description: 'Drink mystery potions and survive the effects.' },
      { name: 'Identify the Artifact', skill: 'Investigation', dc: 16, prize: 'The artifact itself (200gp)', description: 'Find the real artifact among fakes.' },
    ],
    plotHook: 'A vendor selling "harmless" trinkets is distributing cursed items intentionally.',
    atmosphere: 'Chaotic brilliance. Explosions are applauded. Reality bends at edges.',
    specialFood: 'Chromatic candy — changes flavor each bite. May cause synesthesia.',
  },
  {
    name: 'Harvest Home',
    type: 'harvest',
    duration: '2 days',
    description: 'Farming communities celebrate the end of harvest. Everyone eats too much.',
    activities: [
      { name: 'Pie Eating Contest', skill: 'Constitution', dc: 12, prize: '5gp + blue ribbon', description: 'Eat pies. More pies. Don\'t stop.' },
      { name: 'Scarecrow Building', skill: 'Sleight of Hand', dc: 11, prize: 'Charm of good harvest', description: 'Build the best scarecrow. Creativity counts.' },
      { name: 'Strongest Farmer', skill: 'Athletics', dc: 14, prize: '20gp + prize bull calf', description: 'Lift, carry, pull. Classic rural strength.' },
    ],
    plotHook: 'The harvest was TOO good this year. Unnaturally good. The druids are worried.',
    atmosphere: 'Warm, welcoming, slightly drunk. Children everywhere.',
    specialFood: 'Pumpkin ale and fresh-baked bread with honeycomb butter.',
  },
  {
    name: 'Tournament of the Iron Rose',
    type: 'martial',
    duration: '4 days',
    description: 'Knights and warriors compete for the Iron Rose — a trophy granting a royal favor.',
    activities: [
      { name: 'Melee Tournament', skill: 'Athletics', dc: 15, prize: 'Iron Rose + 500gp', description: 'Single combat elimination. Non-lethal. Mostly.' },
      { name: 'Archery Contest', skill: 'Dexterity', dc: 14, prize: '100gp + masterwork bow', description: 'Stationary, then moving, then blindfolded.' },
      { name: 'Joust', skill: 'Animal Handling', dc: 13, prize: '200gp + loser\'s horse', description: 'Three passes. Unhorsing wins instantly.' },
    ],
    plotHook: 'A competitor uses magic to cheat. Another wants help cheating better.',
    atmosphere: 'Loud, competitive, heavily armored. Betting is rampant.',
    specialFood: 'Roasted boar on a spit and mead by the barrel.',
  },
  {
    name: 'The Moonveil Blessing',
    type: 'religious',
    duration: '1 night (full moon)',
    description: 'The faithful gather under the full moon for the goddess\'s blessing.',
    activities: [
      { name: 'Moonlit Prayer', skill: 'Religion', dc: 12, prize: 'Blessed moonwater (Lesser Restoration)', description: 'Pray under open sky. The faithful receive a miracle.' },
      { name: 'Silver Offering', skill: 'Persuasion', dc: 13, prize: 'Advantage on next CHA check', description: 'Present a silver item and speak truth. The goddess judges.' },
    ],
    plotHook: 'The moon turns blood red mid-ceremony. The high priestess collapses.',
    atmosphere: 'Serene and sacred. White robes, silver jewelry, soft chanting.',
    specialFood: 'Moon cakes — white rice cakes with silver-dusted icing.',
  },
];

export function getRandomAdvancedFestival(): AdvancedFestival {
  return FESTIVALS[Math.floor(Math.random() * FESTIVALS.length)];
}

export function getAdvancedFestivalsByType(type: FestivalType): AdvancedFestival[] {
  return FESTIVALS.filter((f) => f.type === type);
}

export function getActivityCount(festival: AdvancedFestival): number {
  return festival.activities.length;
}

export function getAllAdvancedFestivalTypes(): FestivalType[] {
  return [...new Set(FESTIVALS.map((f) => f.type))];
}

export function formatAdvancedFestival(festival: AdvancedFestival): string {
  const icon = { religious: '🙏', harvest: '🌾', martial: '⚔️', arcane: '✨', seasonal: '🔥', memorial: '🕯️' }[festival.type];
  const lines = [`${icon} **${festival.name}** *(${festival.type}, ${festival.duration})*`];
  lines.push(`  *${festival.description}*`);
  lines.push(`  Atmosphere: ${festival.atmosphere}`);
  lines.push(`  🍽️ Food: ${festival.specialFood}`);
  lines.push('  **Activities:**');
  festival.activities.forEach((a) => lines.push(`    🎯 ${a.name} (${a.skill} DC ${a.dc}) — Prize: ${a.prize}`));
  lines.push(`  📜 Plot Hook: ${festival.plotHook}`);
  return lines.join('\n');
}

export { FESTIVALS as ADVANCED_FESTIVALS };
