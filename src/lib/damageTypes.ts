// Battle damage types — track piercing/slashing/bludgeoning/elemental.
// Resolves resistance, vulnerability, and immunity for each damage instance.

export type DamageType =
  | 'bludgeoning' | 'piercing' | 'slashing'
  | 'fire' | 'cold' | 'lightning' | 'thunder'
  | 'acid' | 'poison' | 'necrotic' | 'radiant'
  | 'force' | 'psychic';

export type DamageModifier = 'normal' | 'resistant' | 'vulnerable' | 'immune';

export interface DamageInstance {
  amount: number;
  type: DamageType;
  source: string; // weapon name or spell name
}

export interface DamageResolution {
  original: number;
  final: number;
  modifier: DamageModifier;
  type: DamageType;
  narration: string;
}

export const DAMAGE_TYPE_EMOJIS: Record<DamageType, string> = {
  bludgeoning: '🔨', piercing: '🏹', slashing: '⚔️',
  fire: '🔥', cold: '❄️', lightning: '⚡', thunder: '💥',
  acid: '🧪', poison: '☠️', necrotic: '💀', radiant: '✨',
  force: '💫', psychic: '🧠',
};

export const ALL_DAMAGE_TYPES: DamageType[] = [
  'bludgeoning', 'piercing', 'slashing',
  'fire', 'cold', 'lightning', 'thunder',
  'acid', 'poison', 'necrotic', 'radiant',
  'force', 'psychic',
];

export function getDamageModifier(
  damageType: DamageType,
  resistances: DamageType[],
  vulnerabilities: DamageType[],
  immunities: DamageType[],
): DamageModifier {
  if (immunities.includes(damageType)) return 'immune';
  if (resistances.includes(damageType)) return 'resistant';
  if (vulnerabilities.includes(damageType)) return 'vulnerable';
  return 'normal';
}

export function resolveDamage(
  amount: number,
  damageType: DamageType,
  resistances: DamageType[],
  vulnerabilities: DamageType[],
  immunities: DamageType[],
): DamageResolution {
  const modifier = getDamageModifier(damageType, resistances, vulnerabilities, immunities);
  const emoji = DAMAGE_TYPE_EMOJIS[damageType];

  let final: number;
  let narration: string;

  switch (modifier) {
    case 'immune':
      final = 0;
      narration = `${emoji} ${amount} ${damageType} → **IMMUNE** (0 damage)`;
      break;
    case 'resistant':
      final = Math.floor(amount / 2);
      narration = `${emoji} ${amount} ${damageType} → **RESISTED** (${final} damage)`;
      break;
    case 'vulnerable':
      final = amount * 2;
      narration = `${emoji} ${amount} ${damageType} → **VULNERABLE** (${final} damage!)`;
      break;
    default:
      final = amount;
      narration = `${emoji} ${amount} ${damageType} damage`;
  }

  return { original: amount, final, modifier, type: damageType, narration };
}

export function resolveMultipleDamage(
  instances: DamageInstance[],
  resistances: DamageType[],
  vulnerabilities: DamageType[],
  immunities: DamageType[],
): { resolutions: DamageResolution[]; totalDamage: number } {
  const resolutions = instances.map((d) =>
    resolveDamage(d.amount, d.type, resistances, vulnerabilities, immunities)
  );
  const totalDamage = resolutions.reduce((s, r) => s + r.final, 0);
  return { resolutions, totalDamage };
}

export function formatDamageBreakdown(resolutions: DamageResolution[]): string {
  if (resolutions.length === 0) return 'No damage.';
  const total = resolutions.reduce((s, r) => s + r.final, 0);
  const lines = resolutions.map((r) => r.narration);
  lines.push(`**Total: ${total} damage**`);
  return lines.join('\n');
}
