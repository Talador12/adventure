// Text-to-speech for DM narration — uses the browser's SpeechSynthesis API.
// Zero dependencies. Works offline. Falls back silently if unavailable.

let speaking = false;
let enabled = false;
const npcVoiceCache = new Map<string, number>(); // NPC name → voice index for consistent voice per NPC

// Preferred voice — try to find a dramatic, clear English voice
function getVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  // Prefer: Google UK English, Daniel, Samantha, or any English voice
  const preferred = ['Google UK English Male', 'Daniel', 'Google UK English Female', 'Samantha', 'Alex'];
  for (const name of preferred) {
    const v = voices.find((v) => v.name.includes(name));
    if (v) return v;
  }
  return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
}

/** Enable/disable TTS narration. */
export function setTTSEnabled(on: boolean): void {
  enabled = on;
  if (!on) stop();
}

export function isTTSEnabled(): boolean { return enabled; }
export function isSpeaking(): boolean { return speaking; }

/** Speak text aloud. Queues if already speaking. */
export function speak(text: string, rate = 0.95, pitch = 0.9): void {
  if (!enabled || !text.trim() || typeof speechSynthesis === 'undefined') return;
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getVoice();
  if (voice) utterance.voice = voice;
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.onstart = () => { speaking = true; };
  utterance.onend = () => { speaking = false; };
  utterance.onerror = () => { speaking = false; };
  speechSynthesis.speak(utterance);
}

/** Speak as a named NPC — each NPC gets a consistent, unique voice. */
export function speakAsNPC(npcName: string, text: string): void {
  if (!enabled || !text.trim() || typeof speechSynthesis === 'undefined') return;
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
  if (voices.length === 0) { speak(text); return; }
  // Deterministic voice selection from NPC name hash
  if (!npcVoiceCache.has(npcName)) {
    let hash = 0;
    for (let i = 0; i < npcName.length; i++) hash = ((hash << 5) - hash + npcName.charCodeAt(i)) | 0;
    npcVoiceCache.set(npcName, Math.abs(hash) % voices.length);
  }
  const voiceIdx = npcVoiceCache.get(npcName)!;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices[voiceIdx];
  // Vary pitch/rate slightly per NPC for more distinction
  utterance.pitch = 0.7 + (voiceIdx % 5) * 0.15; // 0.7 - 1.3
  utterance.rate = 0.85 + (voiceIdx % 3) * 0.1;   // 0.85 - 1.05
  utterance.onstart = () => { speaking = true; };
  utterance.onend = () => { speaking = false; };
  utterance.onerror = () => { speaking = false; };
  speechSynthesis.speak(utterance);
}

/** Stop speaking immediately. */
export function stop(): void {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  speaking = false;
}
