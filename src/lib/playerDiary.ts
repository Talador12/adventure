// Player diary — auto-generates journal entries from session events.
// Each entry is written from the character's perspective based on
// combat log, DM narration, and key moments.

import type { Character } from '../types/game';

export interface DiaryEntry {
  characterId: string;
  characterName: string;
  date: string;          // in-game or real-world date
  content: string;
  mood: 'triumphant' | 'worried' | 'reflective' | 'excited' | 'somber';
}

// Generate a diary entry from session events
export function generateDiaryEntry(
  character: Character,
  sessionEvents: string[], // DM history messages
  combatLog: string[],
  dayNumber: number,
): DiaryEntry {
  const name = character.name;
  const cls = character.class;
  const hpPct = character.hp / character.maxHp;

  // Analyze events for the character
  const mentionedInCombat = combatLog.filter((l) => l.includes(name)).length;
  const kills = combatLog.filter((l) => l.includes(name) && l.includes('falls!')).length;
  const crits = combatLog.filter((l) => l.includes(name) && l.includes('CRITICAL')).length;
  const tookDamage = combatLog.some((l) => l.includes(name) && l.includes('takes'));

  // Determine mood
  let mood: DiaryEntry['mood'] = 'reflective';
  if (kills >= 2 || crits >= 1) mood = 'triumphant';
  else if (hpPct <= 0.3) mood = 'worried';
  else if (mentionedInCombat > 5) mood = 'excited';
  else if (character.hp <= 0) mood = 'somber';

  // Build diary entry based on class personality
  const classTraits: Record<string, string> = {
    Fighter: 'I cataloged my strikes today — every parry, every riposte.',
    Wizard: 'I must study what happened today. The arcane implications are fascinating.',
    Rogue: 'Another day, another close call. But the loot was worth the risk.',
    Cleric: 'I prayed for guidance tonight. My deity answered with silence — or perhaps that was the answer.',
    Ranger: 'The wilderness speaks to those who listen. Today it whispered of danger.',
    Paladin: 'My oath demands I reflect on whether I served justice today.',
    Bard: 'This will make a magnificent tale — once I embellish it properly.',
    Barbarian: 'BATTLE! That is all I need to say.',
    Sorcerer: 'The magic flows differently each day. Today it felt wild, untamed.',
    Warlock: 'My patron stirs. I wonder what price today\'s power will cost me.',
    Druid: 'The balance of nature was tested today. I must ensure it holds.',
    Monk: 'In stillness I find clarity. Today tested my discipline.',
  };

  const intro = classTraits[cls] || 'Another day in the adventuring life.';
  const combatLine = mentionedInCombat > 0
    ? kills > 0 ? `I felled ${kills} foe${kills > 1 ? 's' : ''} today.` : 'The fighting was fierce.'
    : 'We avoided combat — for now.';
  const healthLine = hpPct <= 0.3 ? 'My wounds need tending. I hope tomorrow brings rest.'
    : tookDamage ? 'A few bruises, but nothing a night\'s rest won\'t fix.'
    : 'I emerged unscathed — a rare blessing.';
  const critLine = crits > 0 ? ' One strike in particular felt guided by fate itself.' : '';

  const content = `Day ${dayNumber}.\n\n${intro}\n\n${combatLine}${critLine} ${healthLine}`;

  return {
    characterId: character.id,
    characterName: name,
    date: `Day ${dayNumber}`,
    content,
    mood,
  };
}

export function formatDiaryEntry(entry: DiaryEntry): string {
  const moodEmoji = { triumphant: '💪', worried: '😰', reflective: '🤔', excited: '⚡', somber: '😔' };
  return `📖 **${entry.characterName}'s Journal** — ${entry.date} ${moodEmoji[entry.mood]}\n\n${entry.content}`;
}
