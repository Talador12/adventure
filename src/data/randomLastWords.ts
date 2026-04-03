// Random last words generator — dramatic dying words for NPCs.
export interface LastWords { words: string; tone: 'dramatic' | 'cryptic' | 'peaceful' | 'desperate' | 'comedic'; revealsInfo: boolean; }
const LAST_WORDS: LastWords[] = [
  { words: '"The key... is hidden... in the..." *dies*', tone: 'desperate', revealsInfo: true },
  { words: '"I forgive you."', tone: 'peaceful', revealsInfo: false },
  { words: '"You fool. You have no idea what you\'ve just unleashed."', tone: 'dramatic', revealsInfo: true },
  { words: '"Tell my family... I love them."', tone: 'peaceful', revealsInfo: false },
  { words: '"The master will avenge me. You\'re all already dead."', tone: 'dramatic', revealsInfo: true },
  { words: '"Was that... supposed to hurt?" *dies with a smirk*', tone: 'comedic', revealsInfo: false },
  { words: '"Three... there are three... remember... three..."', tone: 'cryptic', revealsInfo: true },
  { words: '"I should have... stayed home today."', tone: 'comedic', revealsInfo: false },
  { words: '"The darkness... it\'s beautiful..."', tone: 'cryptic', revealsInfo: false },
  { words: '"Not like this. Not like this..."', tone: 'desperate', revealsInfo: false },
  { words: '"Check my left boot. You\'ll understand everything."', tone: 'desperate', revealsInfo: true },
  { words: '"Finally... free..."', tone: 'peaceful', revealsInfo: false },
  { words: '"The real threat isn\'t here. It\'s in *whispers a location*."', tone: 'cryptic', revealsInfo: true },
  { words: '"Wait... I had a coupon for this..."', tone: 'comedic', revealsInfo: false },
];
export function getRandomLastWords(): LastWords { return LAST_WORDS[Math.floor(Math.random() * LAST_WORDS.length)]; }
export function getLastWordsByTone(tone: LastWords['tone']): LastWords[] { return LAST_WORDS.filter((l) => l.tone === tone); }
export function formatLastWords(lw: LastWords, npcName: string): string { const icon = lw.tone === 'dramatic' ? '🎭' : lw.tone === 'cryptic' ? '🔮' : lw.tone === 'peaceful' ? '🕊️' : lw.tone === 'desperate' ? '😰' : '😅'; return `${icon} **${npcName}'s Last Words:**\n*${lw.words}*${lw.revealsInfo ? '\n📌 *This may contain a clue.*' : ''}`; }
