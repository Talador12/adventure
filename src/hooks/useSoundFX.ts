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

// --- Ambient sound system ---
// Procedural ambient loops using Web Audio API oscillators and filtered noise.
// Each mood creates a layered soundscape that loops continuously.

export type AmbientMood = 'tavern' | 'dungeon' | 'forest' | 'combat' | 'mystery' | 'none';

interface AmbientLayer { nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[]; gains: GainNode[] }

let currentMood: AmbientMood = 'none';
let ambientLayers: AmbientLayer | null = null;
let ambientMasterGain: GainNode | null = null;
let ambientInterval: ReturnType<typeof setInterval> | null = null;

// Low-frequency rumble — cave/dungeon bass
function createDrone(ctx: AudioContext, freq: number, vol: number, type: OscillatorType = 'sine'): { osc: OscillatorNode; gain: GainNode } {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  osc.connect(gain);
  return { osc, gain };
}

// Filtered noise loop — wind, fire crackle, crowd murmur
function createFilteredNoise(ctx: AudioContext, lowFreq: number, highFreq: number, vol: number): { src: AudioBufferSourceNode; gain: GainNode } {
  const len = ctx.sampleRate * 4; // 4 second buffer, looped
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime((lowFreq + highFreq) / 2, ctx.currentTime);
  bandpass.Q.setValueAtTime(0.5, ctx.currentTime);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  src.connect(bandpass).connect(gain);
  return { src, gain };
}

// LFO modulation on a gain node — subtle volume wavering
function addLFO(ctx: AudioContext, targetGain: GainNode, rate: number, depth: number) {
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(rate, ctx.currentTime);
  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(depth, ctx.currentTime);
  lfo.connect(lfoGain).connect(targetGain.gain);
  lfo.start();
  return lfo;
}

function buildMoodLayers(ctx: AudioContext, mood: AmbientMood, master: GainNode): AmbientLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const gains: GainNode[] = [];
  const connect = (g: GainNode) => { g.connect(master); gains.push(g); };

  if (mood === 'tavern') {
    // Warm low hum (fireplace)
    const fire = createDrone(ctx, 80, 0.04, 'sawtooth');
    connect(fire.gain); fire.osc.start(); nodes.push(fire.osc);
    // Crowd murmur (filtered noise, mid-range)
    const crowd = createFilteredNoise(ctx, 200, 800, 0.03);
    connect(crowd.gain); crowd.src.start(); nodes.push(crowd.src);
    const lfo = addLFO(ctx, crowd.gain, 0.15, 0.01);
    nodes.push(lfo);
    // Gentle high shimmer (glasses clinking vibe)
    const shimmer = createDrone(ctx, 2400, 0.006, 'sine');
    connect(shimmer.gain); shimmer.osc.start(); nodes.push(shimmer.osc);
    const lfo2 = addLFO(ctx, shimmer.gain, 0.3, 0.003);
    nodes.push(lfo2);
  } else if (mood === 'dungeon') {
    // Deep bass drone
    const bass = createDrone(ctx, 40, 0.06, 'sine');
    connect(bass.gain); bass.osc.start(); nodes.push(bass.osc);
    const lfo = addLFO(ctx, bass.gain, 0.08, 0.02);
    nodes.push(lfo);
    // Dripping water (filtered high noise, very quiet)
    const drip = createFilteredNoise(ctx, 1000, 4000, 0.008);
    connect(drip.gain); drip.src.start(); nodes.push(drip.src);
    // Low rumble
    const rumble = createFilteredNoise(ctx, 20, 100, 0.03);
    connect(rumble.gain); rumble.src.start(); nodes.push(rumble.src);
  } else if (mood === 'forest') {
    // Wind (low filtered noise)
    const wind = createFilteredNoise(ctx, 100, 600, 0.025);
    connect(wind.gain); wind.src.start(); nodes.push(wind.src);
    const lfo = addLFO(ctx, wind.gain, 0.1, 0.01);
    nodes.push(lfo);
    // Bird-like high tones (very subtle)
    const bird = createDrone(ctx, 1800, 0.004, 'sine');
    connect(bird.gain); bird.osc.start(); nodes.push(bird.osc);
    bird.osc.frequency.setValueAtTime(1800, ctx.currentTime);
    const lfo2 = addLFO(ctx, bird.gain, 2.5, 0.003);
    nodes.push(lfo2);
    // Rustling leaves (high filtered noise)
    const leaves = createFilteredNoise(ctx, 2000, 6000, 0.006);
    connect(leaves.gain); leaves.src.start(); nodes.push(leaves.src);
  } else if (mood === 'combat') {
    // Intense low pulse
    const pulse = createDrone(ctx, 55, 0.07, 'sawtooth');
    connect(pulse.gain); pulse.osc.start(); nodes.push(pulse.osc);
    const lfo = addLFO(ctx, pulse.gain, 1.2, 0.03);
    nodes.push(lfo);
    // Mid-range tension
    const tension = createDrone(ctx, 220, 0.02, 'triangle');
    connect(tension.gain); tension.osc.start(); nodes.push(tension.osc);
    // Rumbling chaos noise
    const chaos = createFilteredNoise(ctx, 60, 300, 0.025);
    connect(chaos.gain); chaos.src.start(); nodes.push(chaos.src);
  } else if (mood === 'mystery') {
    // Eerie pad
    const pad = createDrone(ctx, 130, 0.03, 'sine');
    connect(pad.gain); pad.osc.start(); nodes.push(pad.osc);
    const lfo = addLFO(ctx, pad.gain, 0.05, 0.015);
    nodes.push(lfo);
    // Dissonant shimmer
    const shimmer = createDrone(ctx, 277, 0.015, 'sine');
    connect(shimmer.gain); shimmer.osc.start(); nodes.push(shimmer.osc);
    // Whispery high noise
    const whisper = createFilteredNoise(ctx, 3000, 8000, 0.005);
    connect(whisper.gain); whisper.src.start(); nodes.push(whisper.src);
    const lfo2 = addLFO(ctx, whisper.gain, 0.2, 0.003);
    nodes.push(lfo2);
  }

  return { nodes, gains };
}

export function setAmbientMood(mood: AmbientMood) {
  if (mood === currentMood) return;
  stopAmbient();
  currentMood = mood;
  if (mood === 'none' || muted) return;

  const ctx = getCtx();
  ambientMasterGain = ctx.createGain();
  ambientMasterGain.gain.setValueAtTime(0, ctx.currentTime);
  ambientMasterGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 2); // 2s fade in
  ambientMasterGain.connect(ctx.destination);
  ambientLayers = buildMoodLayers(ctx, mood, ambientMasterGain);
}

export function stopAmbient() {
  if (ambientLayers) {
    const ctx = audioCtx;
    if (ctx && ambientMasterGain) {
      // Fade out over 1 second
      const now = ctx.currentTime;
      ambientMasterGain.gain.cancelScheduledValues(now);
      ambientMasterGain.gain.setValueAtTime(ambientMasterGain.gain.value, now);
      ambientMasterGain.gain.linearRampToValueAtTime(0, now + 1);
      // Stop all nodes after fade
      setTimeout(() => {
        ambientLayers?.nodes.forEach((n) => { try { if ('stop' in n) (n as OscillatorNode).stop(); } catch {} });
        ambientLayers = null;
        ambientMasterGain?.disconnect();
        ambientMasterGain = null;
      }, 1100);
    } else {
      ambientLayers.nodes.forEach((n) => { try { if ('stop' in n) (n as OscillatorNode).stop(); } catch {} });
      ambientLayers = null;
    }
  }
  if (ambientInterval) { clearInterval(ambientInterval); ambientInterval = null; }
  currentMood = 'none';
}

export function getAmbientMood(): AmbientMood {
  return currentMood;
}

export const AMBIENT_MOODS: { id: AmbientMood; label: string; description: string }[] = [
  { id: 'none', label: 'Off', description: 'No ambient sound' },
  { id: 'tavern', label: 'Tavern', description: 'Warm fireplace, crowd murmur' },
  { id: 'dungeon', label: 'Dungeon', description: 'Deep rumble, dripping water' },
  { id: 'forest', label: 'Forest', description: 'Wind, rustling leaves, birds' },
  { id: 'combat', label: 'Combat', description: 'Intense pulse, tension' },
  { id: 'mystery', label: 'Mystery', description: 'Eerie pads, whispers' },
];
