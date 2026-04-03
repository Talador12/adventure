// Random NPC voice/accent generator — speech patterns for roleplay.

export interface NpcVoice {
  accent: string;
  speechPattern: string;
  catchphrase: string;
  mannerism: string;
  vocabulary: 'simple' | 'normal' | 'flowery' | 'archaic';
}

const ACCENTS = ['Gruff dwarven (Scottish-like)', 'Lilting elven (soft, melodic)', 'Clipped military', 'Thick rural farmer', 'Refined noble (posh)', 'Gravelly underworld', 'Booming and theatrical', 'Quiet and whispery', 'Fast-talking merchant', 'Slow and deliberate sage', 'Cheerful halfling (Irish-like)', 'Harsh orcish (guttural)', 'Nervous stutter', 'Deadpan monotone'];
const SPEECH_PATTERNS = ['Speaks in questions', 'Always uses "we" instead of "I"', 'Ends sentences with a proverb', 'Constantly interrupts themselves', 'Speaks overly formally to everyone', 'Uses way too many metaphors', 'Repeats the last few words of what others say', 'Always whispers the important part', 'Narrates their own actions in third person', 'Pauses dramatically mid-sentence', 'Laughs nervously after every statement', 'Speaks only in short, clipped sentences'];
const CATCHPHRASES = ['"Mark my words..."', '"As my grandmother used to say..."', '"Between you and me..."', '"Now listen here..."', '"By the gods!"', '"Interesting, most interesting..."', '"You didn\'t hear this from me, but..."', '"That reminds me of a story..."', '"In my experience..."', '"Well I never!"', '"Truth be told..."', '"Far be it from me to say, but..."'];
const MANNERISMS = ['Strokes beard/chin while talking', 'Leans in uncomfortably close', 'Gestures wildly with hands', 'Avoids eye contact', 'Pokes the listener\'s shoulder', 'Counts on their fingers constantly', 'Winks conspiratorially', 'Taps the table/counter rhythmically', 'Looks around nervously between sentences', 'Adjusts clothing or hat repeatedly'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateNpcVoice(): NpcVoice {
  return {
    accent: pick(ACCENTS), speechPattern: pick(SPEECH_PATTERNS),
    catchphrase: pick(CATCHPHRASES), mannerism: pick(MANNERISMS),
    vocabulary: pick(['simple', 'normal', 'flowery', 'archaic']),
  };
}

export function formatNpcVoice(voice: NpcVoice): string {
  const lines = ['🎭 **NPC Voice Guide:**'];
  lines.push(`🗣️ Accent: ${voice.accent}`);
  lines.push(`💬 Speech: ${voice.speechPattern}`);
  lines.push(`📢 Catchphrase: ${voice.catchphrase}`);
  lines.push(`🤚 Mannerism: ${voice.mannerism}`);
  lines.push(`📖 Vocabulary: ${voice.vocabulary}`);
  return lines.join('\n');
}
