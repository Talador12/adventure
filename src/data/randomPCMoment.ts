// Random PC spotlight moment — give a specific character a narrative beat.
export interface PCMoment { prompt: string; trigger: string; reward: string; type: 'backstory' | 'skill' | 'moral' | 'social' | 'combat'; }
const MOMENTS: PCMoment[] = [
  { prompt: 'An NPC recognizes this character from their backstory. They have unfinished business.', trigger: 'Entering a new town.', reward: 'Backstory progression + possible ally.', type: 'backstory' },
  { prompt: 'Only this character can solve the current problem — their unique skill set is exactly what\'s needed.', trigger: 'A skill check only they\'re proficient in.', reward: 'Party appreciation + confidence boost.', type: 'skill' },
  { prompt: 'This character must make a choice that defines who they are. No right answer.', trigger: 'A moral dilemma tailored to their alignment.', reward: 'Character growth + potential alignment shift.', type: 'moral' },
  { prompt: 'Someone from this character\'s past needs help. Only they can decide how to respond.', trigger: 'A letter, a visitor, or a chance encounter.', reward: 'Emotional depth + narrative hook.', type: 'social' },
  { prompt: 'This character lands the killing blow on a personal nemesis or significant enemy.', trigger: 'When the enemy drops below 10 HP.', reward: 'Dramatic moment + possible loot.', type: 'combat' },
  { prompt: 'This character discovers something about themselves they didn\'t know — a hidden talent, a memory, a connection.', trigger: 'Touching a magical object or entering a significant location.', reward: 'New ability, knowledge, or quest hook.', type: 'backstory' },
];
export function getRandomPCMoment(): PCMoment { return MOMENTS[Math.floor(Math.random() * MOMENTS.length)]; }
export function formatPCMoment(m: PCMoment, characterName: string = 'This character'): string { return `⭐ **Spotlight: ${characterName}** (${m.type}):\n${m.prompt}\n⚡ Trigger: ${m.trigger}\n🎁 Reward: ${m.reward}`; }
