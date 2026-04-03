// Magical tattoo removal system — consequences of removing enchanted inkwork.

export type RemovalMethod = 'dispel' | 'surgical' | 'alchemical' | 'divine' | 'overwrite' | 'willing_release';
export type RemovalRisk = 'safe' | 'painful' | 'dangerous' | 'catastrophic';

export interface TattooRemovalOption {
  method: RemovalMethod;
  name: string;
  risk: RemovalRisk;
  dc: number;
  cost: number;
  time: string;
  description: string;
  successEffect: string;
  failureEffect: string;
  sideEffect: string | null;
  painLevel: number; // 1-10
}

const OPTIONS: TattooRemovalOption[] = [
  { method: 'dispel', name: 'Dispel Magic Erasure', risk: 'painful', dc: 15, cost: 0, time: '1 action', description: 'Cast Dispel Magic directly on the tattoo. The magic resists.', successEffect: 'Tattoo fades over 24 hours. All magical properties lost permanently.', failureEffect: 'Tattoo flares. 3d6 force damage to the bearer. Tattoo becomes MORE powerful for 1d4 hours.', sideEffect: 'Scar remains where the tattoo was. Faint magical residue detectable for 1 month.', painLevel: 7 },
  { method: 'surgical', name: 'Fleshcraft Removal', risk: 'dangerous', dc: 16, cost: 200, time: '2 hours', description: 'A skilled flesh-shaper literally removes the layer of skin containing the tattoo.', successEffect: 'Complete removal. No magical residue. Clean skin.', failureEffect: '2d8 slashing damage + infection risk (CON DC 13 or diseased). Tattoo partially remains.', sideEffect: 'Permanent scar (-1 CHA until healed by Greater Restoration).', painLevel: 9 },
  { method: 'alchemical', name: 'Nullifying Salve', risk: 'painful', dc: 14, cost: 150, time: '8 hours', description: 'Apply a specially brewed paste that absorbs and neutralizes the enchantment over time.', successEffect: 'Tattoo dissolves painlessly over 8 hours. Magic stored in the salve (can be repurposed).', failureEffect: 'Salve reacts badly. Chemical burn: 2d6 acid damage. Tattoo unchanged.', sideEffect: 'Skin sensitivity for 1 week. Disadvantage on CON saves vs. environmental damage.', painLevel: 5 },
  { method: 'divine', name: 'Sacred Purification', risk: 'safe', dc: 13, cost: 500, time: '1 hour', description: 'A cleric or paladin channels divine energy to dissolve the enchantment with holy light.', successEffect: 'Tattoo dissolves in golden light. No pain. No scar. The divine energy cleanses completely.', failureEffect: 'The tattoo resists divine intervention. No damage, but the tattoo glows for 1d4 days (noticeable).', sideEffect: null, painLevel: 2 },
  { method: 'overwrite', name: 'Tattoo Override', risk: 'dangerous', dc: 17, cost: 300, time: '4 hours', description: 'A master tattooist inks a new enchantment OVER the old one, overwriting it. Like magic defrag.', successEffect: 'Old tattoo replaced with new one. Old powers gone, new powers active.', failureEffect: 'Both tattoos activate simultaneously. Conflicting magic: 4d6 force damage + wild magic surge.', sideEffect: 'The old tattoo\'s "ghost" occasionally flickers visible under the new one.', painLevel: 6 },
  { method: 'willing_release', name: 'Voluntary Unbinding', risk: 'safe', dc: 12, cost: 0, time: '10 minutes of meditation', description: 'The bearer willingly releases the enchantment. The magic returns to the weave.', successEffect: 'Tattoo fades gently. A feeling of loss, but also peace. No damage, no scar.', failureEffect: 'The bearer\'s subconscious doesn\'t want to let go. Must try again tomorrow.', sideEffect: 'Phantom sensation where the tattoo was. Occasionally itches when magic is nearby.', painLevel: 1 },
];

export function getRemovalOption(method: RemovalMethod): TattooRemovalOption | undefined {
  return OPTIONS.find((o) => o.method === method);
}

export function getSafeOptions(): TattooRemovalOption[] {
  return OPTIONS.filter((o) => o.risk === 'safe');
}

export function getOptionsByMaxCost(maxCost: number): TattooRemovalOption[] {
  return OPTIONS.filter((o) => o.cost <= maxCost);
}

export function getLeastPainful(): TattooRemovalOption {
  return OPTIONS.reduce((best, o) => (o.painLevel < best.painLevel ? o : best));
}

export function getAllRemovalMethods(): RemovalMethod[] {
  return OPTIONS.map((o) => o.method);
}

export function formatRemovalOption(option: TattooRemovalOption): string {
  const risk = { safe: '🟢', painful: '🟡', dangerous: '🟠', catastrophic: '🔴' }[option.risk];
  const pain = '🔥'.repeat(Math.ceil(option.painLevel / 2)) + '⚪'.repeat(5 - Math.ceil(option.painLevel / 2));
  const lines = [`${risk} **${option.name}** *(${option.method}, DC ${option.dc})*`];
  lines.push(`  *${option.description}*`);
  lines.push(`  Cost: ${option.cost > 0 ? option.cost + 'gp' : 'Free'} | Time: ${option.time} | Pain: ${pain}`);
  lines.push(`  ✅ Success: ${option.successEffect}`);
  lines.push(`  ❌ Failure: ${option.failureEffect}`);
  if (option.sideEffect) lines.push(`  ⚠️ Side effect: ${option.sideEffect}`);
  return lines.join('\n');
}

export { OPTIONS as TATTOO_REMOVAL_OPTIONS };
