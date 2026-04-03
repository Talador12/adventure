// NPC voice/accent generator — speech patterns for DM roleplay.

export type VoiceType = 'gruff' | 'silky' | 'nervous' | 'booming' | 'whispery' | 'sing_song' | 'monotone' | 'aristocratic';
export type AccentRegion = 'northern' | 'eastern' | 'dwarven' | 'elvish' | 'halfling' | 'orcish' | 'infernal' | 'common';

export interface NpcVoiceProfile {
  voiceType: VoiceType;
  accent: AccentRegion;
  speechPattern: string;
  samplePhrases: string[];
  rpTip: string;
  catchphrase: string;
}

const VOICES: NpcVoiceProfile[] = [
  { voiceType: 'gruff', accent: 'dwarven', speechPattern: 'Short sentences. Ends statements with a grunt. Swears by stone and steel.', samplePhrases: ['"Stone and steel, that\'s a bad idea."', '"Hmph. Fine. But I\'m not happy about it."', '"Ye want my help? Then ye\'ll do it MY way."'], rpTip: 'Lower your voice. Speak from the chest. Pause before agreeing to anything.', catchphrase: '"By my beard..."' },
  { voiceType: 'silky', accent: 'elvish', speechPattern: 'Flowing sentences. Never rushes. Uses metaphor instead of direct language.', samplePhrases: ['"The stars weep for those who walk without purpose."', '"How... interesting. And how very mortal of you."', '"Time is a river. I have learned to swim."'], rpTip: 'Slow down. Elongate vowels. Sound mildly amused by everything.', catchphrase: '"In the fullness of time..."' },
  { voiceType: 'nervous', accent: 'halfling', speechPattern: 'Fast, stumbling over words. Laughs when scared. Apologizes constantly.', samplePhrases: ['"Oh! Oh dear. That\'s — that\'s not good, is it? Sorry."', '"I mean, I COULD help, but — well — ha ha — maybe someone braver?"', '"Sorry! Sorry. Was that important? I\'m so sorry."'], rpTip: 'Speed up. Let words trip over each other. Look around like something might attack.', catchphrase: '"Sorry! I mean — not sorry, just — sorry."' },
  { voiceType: 'booming', accent: 'orcish', speechPattern: 'Loud. Every sentence is a declaration. Grammar is optional. Enthusiasm is mandatory.', samplePhrases: ['"WE FIGHT! OR WE EAT! SAME THING TO ME!"', '"SMALL FRIEND! YOU MAKE GOOD POINT! WITH YOUR FACE!"', '"I AM NOT LOST! THE MOUNTAIN MOVED!"'], rpTip: 'Volume up. Simple sentences. Emphasize every other word. Point at things.', catchphrase: '"GROKK APPROVES!"' },
  { voiceType: 'whispery', accent: 'infernal', speechPattern: 'Barely audible. Forces others to lean in. Treats every sentence like a secret.', samplePhrases: ['"Come closer. I would not want... others... to hear."', '"The price is reasonable. Your soul is negotiable."', '"Shhh. The walls have ears. Literally. I put them there."'], rpTip: 'Almost inaudible. Lean forward. Long pauses. Smile at inappropriate moments.', catchphrase: '"Between you and me..."' },
  { voiceType: 'sing_song', accent: 'halfling', speechPattern: 'Musical cadence. Rhymes accidentally. Hums between sentences.', samplePhrases: ['"A fine day for a walk and a talk and perhaps a nice warm scone!"', '"Oh, trouble! How delightful! I mean — how terrible. Terribly delightful."', '"*humming* Hmm? Oh yes, the dragon. Right. *continues humming*"'], rpTip: 'Vary pitch constantly. End sentences on a high note. Tap rhythms.', catchphrase: '"Oh, what fun!"' },
  { voiceType: 'monotone', accent: 'common', speechPattern: 'Completely flat delivery. No emotion. Facts only. Uncomfortable pauses.', samplePhrases: ['"The dragon has arrived. We should probably leave. Or not. It matters little."', '"I have feelings about this. Specifically: none."', '"Your odds of survival are approximately 23 percent. I rounded up."'], rpTip: 'Zero inflection. Stare slightly past the player. Report facts like weather.', catchphrase: '"Noted."' },
  { voiceType: 'aristocratic', accent: 'eastern', speechPattern: 'Elaborate vocabulary. Never uses one word when twelve will do. Condescending.', samplePhrases: ['"I find your proposal... quaint. In the manner of a child\'s first drawing."', '"One does not simply ASK for an audience. One earns it."', '"The wine is adequate. Which is to say, disappointing."'], rpTip: 'Nose slightly up. Speak slowly as if choosing each word carefully. Sigh before answering.', catchphrase: '"How... provincial."' },
];

export function getRandomVoice(): NpcVoiceProfile {
  return VOICES[Math.floor(Math.random() * VOICES.length)];
}

export function getVoicesByType(type: VoiceType): NpcVoiceProfile[] {
  return VOICES.filter((v) => v.voiceType === type);
}

export function getVoicesByAccent(accent: AccentRegion): NpcVoiceProfile[] {
  return VOICES.filter((v) => v.accent === accent);
}

export function getAllVoiceTypes(): VoiceType[] {
  return [...new Set(VOICES.map((v) => v.voiceType))];
}

export function getAllAccents(): AccentRegion[] {
  return [...new Set(VOICES.map((v) => v.accent))];
}

export function formatVoiceProfile(voice: NpcVoiceProfile): string {
  const lines = [`🎭 **${voice.voiceType}** voice + **${voice.accent}** accent`];
  lines.push(`  Pattern: ${voice.speechPattern}`);
  lines.push(`  Catchphrase: ${voice.catchphrase}`);
  lines.push('  Sample lines:');
  voice.samplePhrases.forEach((p) => lines.push(`    💬 ${p}`));
  lines.push(`  🎯 RP tip: ${voice.rpTip}`);
  return lines.join('\n');
}

export { VOICES as NPC_VOICES };
