// Light source tracker — torch/lantern/spell duration tracking.

export type LightSourceType = 'torch' | 'lantern' | 'candle' | 'light_cantrip' | 'daylight' | 'continual_flame' | 'dancing_lights';

export interface LightSource {
  id: string;
  type: LightSourceType;
  name: string;
  brightRadius: number; // feet
  dimRadius: number;
  durationMinutes: number; // -1 = permanent
  remainingMinutes: number;
  carrierId: string;
}

export const LIGHT_SOURCE_CONFIG: Record<LightSourceType, { name: string; bright: number; dim: number; duration: number; cost: string }> = {
  torch: { name: 'Torch', bright: 20, dim: 40, duration: 60, cost: '1cp' },
  lantern: { name: 'Hooded Lantern', bright: 30, dim: 60, duration: 360, cost: '5gp (+ 1sp oil/6h)' },
  candle: { name: 'Candle', bright: 5, dim: 10, duration: 60, cost: '1cp' },
  light_cantrip: { name: 'Light (cantrip)', bright: 20, dim: 40, duration: 60, cost: 'Free' },
  daylight: { name: 'Daylight (3rd)', bright: 60, dim: 120, duration: 60, cost: '3rd-level slot' },
  continual_flame: { name: 'Continual Flame', bright: 20, dim: 40, duration: -1, cost: '50gp ruby dust' },
  dancing_lights: { name: 'Dancing Lights', bright: 0, dim: 10, duration: 1, cost: 'Concentration' },
};

export function createLightSource(type: LightSourceType, carrierId: string): LightSource {
  const config = LIGHT_SOURCE_CONFIG[type];
  return { id: crypto.randomUUID(), type, name: config.name, brightRadius: config.bright, dimRadius: config.dim, durationMinutes: config.duration, remainingMinutes: config.duration, carrierId };
}

export function advanceTime(sources: LightSource[], minutes: number): { sources: LightSource[]; expired: LightSource[] } {
  const expired: LightSource[] = [];
  const remaining = sources.map((s) => {
    if (s.durationMinutes < 0) return s; // permanent
    const newRemaining = s.remainingMinutes - minutes;
    if (newRemaining <= 0) { expired.push(s); return null; }
    return { ...s, remainingMinutes: newRemaining };
  }).filter((s): s is LightSource => s !== null);
  return { sources: remaining, expired };
}

export function getTotalLightRadius(sources: LightSource[]): { bright: number; dim: number } {
  let bright = 0, dim = 0;
  for (const s of sources) { bright = Math.max(bright, s.brightRadius); dim = Math.max(dim, s.dimRadius); }
  return { bright, dim };
}

export function formatLightSources(sources: LightSource[], characterNames: Record<string, string>): string {
  if (sources.length === 0) return '🔦 **Light:** Complete darkness!';
  const { bright, dim } = getTotalLightRadius(sources);
  const lines = [`🔦 **Light Sources** (Bright: ${bright}ft, Dim: ${dim}ft):`];
  for (const s of sources) {
    const carrier = characterNames[s.carrierId] || s.carrierId;
    const time = s.durationMinutes < 0 ? '∞' : `${s.remainingMinutes}min`;
    lines.push(`  💡 ${s.name} (${carrier}): ${s.brightRadius}ft bright, ${s.dimRadius}ft dim — ${time}`);
  }
  return lines.join('\n');
}
