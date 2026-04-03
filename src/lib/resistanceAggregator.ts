// Damage resistance aggregator — combine all sources of resistance/immunity.

import type { DamageType } from './damageTypes';

export interface ResistanceSource {
  source: string; // "Tiefling racial", "Bear Totem Rage", "Ring of Fire Resistance"
  resistances: DamageType[];
  immunities: DamageType[];
  vulnerabilities: DamageType[];
}

export interface AggregatedResistances {
  resistances: { type: DamageType; sources: string[] }[];
  immunities: { type: DamageType; sources: string[] }[];
  vulnerabilities: { type: DamageType; sources: string[] }[];
}

export function aggregateResistances(sources: ResistanceSource[]): AggregatedResistances {
  const res = new Map<DamageType, string[]>();
  const imm = new Map<DamageType, string[]>();
  const vul = new Map<DamageType, string[]>();

  for (const s of sources) {
    for (const r of s.resistances) { if (!res.has(r)) res.set(r, []); res.get(r)!.push(s.source); }
    for (const i of s.immunities) { if (!imm.has(i)) imm.set(i, []); imm.get(i)!.push(s.source); }
    for (const v of s.vulnerabilities) { if (!vul.has(v)) vul.set(v, []); vul.get(v)!.push(s.source); }
  }

  // Immunity overrides resistance (5e rule)
  for (const type of imm.keys()) res.delete(type);

  return {
    resistances: [...res.entries()].map(([type, sources]) => ({ type, sources })),
    immunities: [...imm.entries()].map(([type, sources]) => ({ type, sources })),
    vulnerabilities: [...vul.entries()].map(([type, sources]) => ({ type, sources })),
  };
}

export function formatAggregatedResistances(agg: AggregatedResistances, unitName: string): string {
  const lines = [`🛡️ **${unitName}'s Defenses:**`];
  if (agg.immunities.length > 0) lines.push(`**Immune:** ${agg.immunities.map((i) => `${i.type} (${i.sources.join(', ')})`).join('; ')}`);
  if (agg.resistances.length > 0) lines.push(`**Resistant:** ${agg.resistances.map((r) => `${r.type} (${r.sources.join(', ')})`).join('; ')}`);
  if (agg.vulnerabilities.length > 0) lines.push(`**Vulnerable:** ${agg.vulnerabilities.map((v) => `${v.type} (${v.sources.join(', ')})`).join('; ')}`);
  if (agg.immunities.length === 0 && agg.resistances.length === 0 && agg.vulnerabilities.length === 0) lines.push('No special damage modifiers.');
  return lines.join('\n');
}
