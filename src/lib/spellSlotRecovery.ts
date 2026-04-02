// Spell slot recovery variants — different resting rules for spell casters.
// Standard 5e, Arcane Recovery, Natural Recovery, and Gritty Realism.

export type RestVariant = 'standard' | 'arcane_recovery' | 'natural_recovery' | 'gritty_realism';

export interface RestVariantConfig {
  variant: RestVariant;
  name: string;
  emoji: string;
  shortRestDuration: string;
  longRestDuration: string;
  shortRestRecovery: string;
  longRestRecovery: string;
  description: string;
}

export const REST_VARIANTS: RestVariantConfig[] = [
  {
    variant: 'standard', name: 'Standard (PHB)', emoji: '📖',
    shortRestDuration: '1 hour', longRestDuration: '8 hours',
    shortRestRecovery: 'Hit dice only. Warlock pact slots recover.',
    longRestRecovery: 'All spell slots, all HP, half hit dice.',
    description: 'Standard 5e resting rules. Most common at tables.',
  },
  {
    variant: 'arcane_recovery', name: 'Arcane Recovery', emoji: '✨',
    shortRestDuration: '1 hour', longRestDuration: '8 hours',
    shortRestRecovery: 'Wizard: recover spell slots (total levels ≤ half wizard level, rounded up). No 6th+ slots.',
    longRestRecovery: 'All spell slots, all HP, half hit dice.',
    description: 'Wizard-specific feature. Other casters use standard rules.',
  },
  {
    variant: 'natural_recovery', name: 'Natural Recovery (Druid)', emoji: '🌿',
    shortRestDuration: '1 hour', longRestDuration: '8 hours',
    shortRestRecovery: 'Druid: recover spell slots (total levels ≤ half druid level, rounded up). No 6th+ slots.',
    longRestRecovery: 'All spell slots, all HP, half hit dice.',
    description: 'Druid equivalent of Arcane Recovery. Uses during short rest.',
  },
  {
    variant: 'gritty_realism', name: 'Gritty Realism', emoji: '💀',
    shortRestDuration: '8 hours (overnight)', longRestDuration: '7 days (full week)',
    shortRestRecovery: 'Hit dice only. Warlock pact slots recover. No other spell slots.',
    longRestRecovery: 'All spell slots, all HP, half hit dice. Requires 7 days of light activity.',
    description: 'Resource-scarce variant. Forces careful spell management. Great for exploration-heavy campaigns.',
  },
];

export function getRestVariant(variant: RestVariant): RestVariantConfig {
  return REST_VARIANTS.find((r) => r.variant === variant) || REST_VARIANTS[0];
}

export function calculateArcaneRecovery(wizardLevel: number): { maxTotalLevels: number; maxSlotLevel: number } {
  return { maxTotalLevels: Math.ceil(wizardLevel / 2), maxSlotLevel: 5 };
}

export function calculateRecoveredSlots(
  maxTotalLevels: number,
  maxSlotLevel: number,
  requestedSlots: { level: number; count: number }[],
): { recovered: { level: number; count: number }[]; totalLevels: number; valid: boolean } {
  let totalLevels = 0;
  const recovered: { level: number; count: number }[] = [];
  for (const req of requestedSlots) {
    if (req.level > maxSlotLevel) continue;
    const levelsUsed = req.level * req.count;
    if (totalLevels + levelsUsed > maxTotalLevels) continue;
    totalLevels += levelsUsed;
    recovered.push(req);
  }
  return { recovered, totalLevels, valid: totalLevels <= maxTotalLevels };
}

export function formatRestVariant(variant: RestVariant): string {
  const config = getRestVariant(variant);
  const lines = [`${config.emoji} **${config.name}**`];
  lines.push(`*${config.description}*`);
  lines.push(`Short Rest: ${config.shortRestDuration} — ${config.shortRestRecovery}`);
  lines.push(`Long Rest: ${config.longRestDuration} — ${config.longRestRecovery}`);
  return lines.join('\n');
}
