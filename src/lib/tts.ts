// Text-to-speech for DM narration — uses the browser's SpeechSynthesis API.
// Zero dependencies. Works offline. Falls back silently if unavailable.

let speaking = false;
let enabled = false;

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

/** Stop speaking immediately. */
export function stop(): void {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  speaking = false;
}
