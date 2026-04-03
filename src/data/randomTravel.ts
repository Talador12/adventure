// Random travel event — things that happen on the road between locations.
export interface TravelMoment { description: string; type: 'scenic' | 'ominous' | 'practical' | 'humorous' | 'mysterious'; interaction: string | null; }
const MOMENTS: TravelMoment[] = [
  { description: 'The sunset paints the sky in impossible colors. Everyone feels a moment of peace.', type: 'scenic', interaction: null },
  { description: 'You pass a gibbet at a crossroads. The cage is empty but the lock is new.', type: 'ominous', interaction: 'Investigation DC 12 reveals fresh scratches inside the cage.' },
  { description: 'A milestone marker has been defaced. The distance has been changed.', type: 'mysterious', interaction: 'Survival DC 11 to determine the correct distance.' },
  { description: 'One of the party\'s pack animals refuses to cross a particular stretch of road.', type: 'ominous', interaction: 'Animal Handling DC 13 or go around (adds 1 hour).' },
  { description: 'You find a perfectly good pair of boots in the middle of the road. No one in sight.', type: 'mysterious', interaction: 'The boots are slightly warm inside. Someone left recently.' },
  { description: 'A butterfly follows one party member for an hour. It\'s oddly comforting.', type: 'scenic', interaction: null },
  { description: 'Two farmers argue loudly about whose sheep crossed whose fence first.', type: 'humorous', interaction: 'Persuasion DC 8 to mediate. Reward: cheese.' },
  { description: 'Rain turns the road to mud. Progress slows dramatically.', type: 'practical', interaction: 'Speed halved for 2 hours. Survival DC 12 to find firmer ground.' },
  { description: 'You hear singing from a hill — but see no one.', type: 'mysterious', interaction: 'Perception DC 15 spots a hidden cave entrance.' },
  { description: 'A traveling peddler offers to trade. Their wares are surprisingly good.', type: 'practical', interaction: 'Standard prices, but 1d4 uncommon items available.' },
];
export function getRandomTravelMoment(): TravelMoment { return MOMENTS[Math.floor(Math.random() * MOMENTS.length)]; }
export function formatTravelMoment(m: TravelMoment): string { const icon = m.type === 'scenic' ? '🌅' : m.type === 'ominous' ? '⚠️' : m.type === 'practical' ? '🛤️' : m.type === 'humorous' ? '😄' : '❓'; return `${icon} **On the Road** (${m.type}):\n*${m.description}*${m.interaction ? `\n🎲 ${m.interaction}` : ''}`; }
