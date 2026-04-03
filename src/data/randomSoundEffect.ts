// Random sound effect descriptions — what the party hears.
export interface SoundEffect { sound: string; source: string; distance: 'nearby' | 'distant' | 'overhead' | 'underground' | 'all_around'; ominous: boolean; }
const SOUNDS: SoundEffect[] = [
  { sound: 'A low, rhythmic thumping — like a heartbeat.', source: 'Unknown', distance: 'underground', ominous: true },
  { sound: 'Metal scraping against stone.', source: 'Could be a blade being sharpened.', distance: 'nearby', ominous: true },
  { sound: 'Laughter — but it sounds wrong. Too many voices at once.', source: 'Echoing from ahead.', distance: 'distant', ominous: true },
  { sound: 'Dripping water, steady and rhythmic.', source: 'The ceiling above.', distance: 'overhead', ominous: false },
  { sound: 'A single note of a flute, then silence.', source: 'Direction unclear.', distance: 'all_around', ominous: false },
  { sound: 'The creak of a door opening slowly. No one is there.', source: 'Behind the party.', distance: 'nearby', ominous: true },
  { sound: 'Chittering and skittering — many small creatures moving.', source: 'Inside the walls.', distance: 'all_around', ominous: true },
  { sound: 'A bell tolls once. There is no bell.', source: 'Unknown.', distance: 'all_around', ominous: true },
  { sound: 'Someone humming a familiar tune. No one in the party is humming.', source: 'Just ahead.', distance: 'nearby', ominous: true },
  { sound: 'The crack of a branch. Then another. Footsteps.', source: 'The treeline to the left.', distance: 'nearby', ominous: true },
  { sound: 'Birdsong. Normal, cheerful birdsong.', source: 'The forest.', distance: 'all_around', ominous: false },
  { sound: 'A deep sigh, as if the building itself is exhaling.', source: 'The walls.', distance: 'all_around', ominous: true },
];
export function getRandomSound(): SoundEffect { return SOUNDS[Math.floor(Math.random() * SOUNDS.length)]; }
export function formatSoundEffect(s: SoundEffect): string { const icon = s.ominous ? '👂⚠️' : '👂'; return `${icon} **You hear:**\n*${s.sound}*\nSource: ${s.source} (${s.distance})`; }
