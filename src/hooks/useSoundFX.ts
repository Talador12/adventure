// useSoundFX — lightweight sound effects using Web Audio API. Zero dependencies.
// Synthesizes dice rolls, combat hits, magic, and ambient sounds procedurally.

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

// Short noise burst — used for dice impacts
function noise(ctx: AudioContext, duration: number, gain: number): { node: AudioBufferSourceNode; gainNode: GainNode } {
  const len = ctx.sampleRate * duration;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  src.connect(g);
  return { node: src, gainNode: g };
}

// Dice roll sound — rattling clicks then a final thud
export function playDiceRoll() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Series of short clicks (dice bouncing)
  for (let i = 0; i < 6; i++) {
    const t = now + i * 0.06 + Math.random() * 0.02;
    const { node, gainNode } = noise(ctx, 0.03, 0.15 - i * 0.02);
    gainNode.connect(ctx.destination);
    node.start(t);
    node.stop(t + 0.03);
  }

  // Final landing thud — low frequency
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, now + 0.4);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.5);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.3, now + 0.4);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
  osc.connect(g).connect(ctx.destination);
  osc.start(now + 0.4);
  osc.stop(now + 0.55);
}

// Critical hit — triumphant rising tone
export function playCritical() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Rising major chord arpeggio
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    const t = now + i * 0.08;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.2, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  });
}

// Fumble — sad descending tone
export function playFumble() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.5);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.15, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  osc.connect(g).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.5);
}

// Combat hit — sharp attack sound
export function playCombatHit() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Impact noise
  const { node, gainNode } = noise(ctx, 0.08, 0.4);
  gainNode.connect(ctx.destination);
  node.start(now);
  node.stop(now + 0.08);

  // Metallic ring
  const osc = ctx.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.12, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  osc.connect(g).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

// Combat miss — whoosh
export function playCombatMiss() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const { node, gainNode } = noise(ctx, 0.2, 0.15);
  // Bandpass filter for whoosh effect
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2000, now);
  filter.frequency.exponentialRampToValueAtTime(500, now + 0.2);
  filter.Q.value = 2;
  gainNode.connect(filter).connect(ctx.destination);
  node.start(now);
  node.stop(now + 0.2);
}

// Enemy death — deep thud with reverb-like decay
export function playEnemyDeath() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Low thud
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(80, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.35, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
  osc.connect(g).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.6);

  // Noise scatter
  const { node, gainNode } = noise(ctx, 0.3, 0.2);
  gainNode.connect(ctx.destination);
  node.start(now);
  node.stop(now + 0.3);
}

// Magic spell — ethereal shimmer
export function playMagicSpell() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Shimmering harmonics
  [440, 554.37, 659.25].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    // Vibrato
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 6 + i * 2;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 8;
    lfo.connect(lfoGain).connect(osc.frequency);
    lfo.start(now);
    lfo.stop(now + 0.6);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.1, now + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.connect(g).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  });
}

// Turn change — gentle notification chime
export function playTurnChange() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  [784, 988].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    const t = now + i * 0.12;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.15, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.3);
  });
}

// Player join — warm welcome tone
export function playPlayerJoin() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.linearRampToValueAtTime(880, now + 0.15);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.1, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.connect(g).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);
}

// Encounter start — dramatic tension
export function playEncounterStart() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Low rumble
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = 55;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(0.2, now + 0.3);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
  osc.connect(g).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.8);

  // Stinger chord
  [330, 415, 494].forEach((freq) => {
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = freq;
    const og = ctx.createGain();
    og.gain.setValueAtTime(0, now + 0.3);
    og.gain.linearRampToValueAtTime(0.1, now + 0.35);
    og.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    o.connect(og).connect(ctx.destination);
    o.start(now + 0.3);
    o.stop(now + 0.8);
  });
}

// Level up — triumphant fanfare
export function playLevelUp() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Rising fanfare: C major triad then octave
  [261.63, 329.63, 392, 523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    const t = now + i * 0.1;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.5);
  });
}

// Healing — warm rising shimmer
export function playHealing() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  [392, 493.88, 587.33].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 0.5, now + i * 0.08);
    osc.frequency.linearRampToValueAtTime(freq, now + i * 0.08 + 0.3);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now + i * 0.08);
    g.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
    osc.connect(g).connect(ctx.destination);
    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.4);
  });
}

// Loot drop — metallic jingle
export function playLootDrop() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  [1200, 1500, 1800, 2100].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    const t = now + i * 0.06;
    g.gain.setValueAtTime(0.06, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  });
}

// Volume control — global mute state
let muted = false;
const originalDestGetter = Object.getOwnPropertyDescriptor(AudioContext.prototype, 'destination');

export function isMuted(): boolean {
  return muted;
}

export function setMuted(m: boolean) {
  muted = m;
  if (audioCtx) {
    // Mute by suspending the context, unmute by resuming
    if (m) audioCtx.suspend();
    else audioCtx.resume();
  }
}

export function toggleMute(): boolean {
  setMuted(!muted);
  return muted;
}
