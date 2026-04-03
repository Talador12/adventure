// Elemental weapon infusion — temporary weapon enchantments with elemental damage and effects.

export type ElementType = 'fire' | 'ice' | 'lightning' | 'acid' | 'thunder' | 'radiant' | 'necrotic' | 'poison';

export interface ElementalInfusion {
  element: ElementType;
  name: string;
  bonusDamage: string;
  onHitEffect: string;
  duration: string;
  applicationDC: number;
  materialCost: number;
  visualDescription: string;
}

const INFUSIONS: ElementalInfusion[] = [
  { element: 'fire', name: 'Emberbrand', bonusDamage: '1d6 fire', onHitEffect: 'Target catches fire (1d4 fire/round, action to extinguish).', duration: '1 hour', applicationDC: 13, materialCost: 25, visualDescription: 'The blade glows cherry-red. Heat shimmers off the edge.' },
  { element: 'ice', name: 'Frostbite Edge', bonusDamage: '1d6 cold', onHitEffect: 'Target\'s speed reduced by 10ft until end of their next turn.', duration: '1 hour', applicationDC: 13, materialCost: 25, visualDescription: 'Frost crystals form along the blade. Your breath mists near it.' },
  { element: 'lightning', name: 'Stormstrike', bonusDamage: '1d6 lightning', onHitEffect: 'On crit, target is stunned until end of their next turn (CON DC 13).', duration: '1 hour', applicationDC: 14, materialCost: 35, visualDescription: 'Sparks arc between edge and crossguard. Hair stands on end.' },
  { element: 'acid', name: 'Corrosion', bonusDamage: '1d6 acid', onHitEffect: 'Target\'s AC reduced by 1 (cumulative, max -3) as armor dissolves.', duration: '1 hour', applicationDC: 14, materialCost: 30, visualDescription: 'The blade weeps green liquid. It hisses on contact with anything.' },
  { element: 'thunder', name: 'Thunderclap', bonusDamage: '1d4 thunder', onHitEffect: 'Each hit produces a 10ft thunderclap. Target pushed 5ft on hit.', duration: '1 hour', applicationDC: 13, materialCost: 20, visualDescription: 'The weapon hums with a deep vibration. Strikes produce sonic booms.' },
  { element: 'radiant', name: 'Dawntouch', bonusDamage: '1d6 radiant', onHitEffect: 'Undead and fiends take an additional 1d6 radiant. Sheds bright light 20ft.', duration: '1 hour', applicationDC: 15, materialCost: 50, visualDescription: 'Golden light radiates from the blade. Shadows flee from it.' },
  { element: 'necrotic', name: 'Grave Whisper', bonusDamage: '1d6 necrotic', onHitEffect: 'Heal HP equal to half the necrotic damage dealt.', duration: '1 hour', applicationDC: 15, materialCost: 50, visualDescription: 'The blade darkens to obsidian black. Veins of shadow pulse along it.' },
  { element: 'poison', name: 'Viper\'s Kiss', bonusDamage: '1d4 poison', onHitEffect: 'Target makes CON DC 12 or is poisoned for 1 minute.', duration: '1 hour', applicationDC: 12, materialCost: 15, visualDescription: 'A sickly green sheen coats the blade. It smells faintly of almonds.' },
];

export function getInfusion(element: ElementType): ElementalInfusion | undefined {
  return INFUSIONS.find((i) => i.element === element);
}

export function getInfusionsByMaxCost(maxCost: number): ElementalInfusion[] {
  return INFUSIONS.filter((i) => i.materialCost <= maxCost);
}

export function getInfusionsByMaxDC(maxDC: number): ElementalInfusion[] {
  return INFUSIONS.filter((i) => i.applicationDC <= maxDC);
}

export function getAllElements(): ElementType[] {
  return INFUSIONS.map((i) => i.element);
}

export function formatInfusion(infusion: ElementalInfusion): string {
  const icon = { fire: '🔥', ice: '❄️', lightning: '⚡', acid: '🧪', thunder: '💥', radiant: '✨', necrotic: '💀', poison: '🐍' }[infusion.element];
  const lines = [`${icon} **${infusion.name}** *(${infusion.element})*`];
  lines.push(`  *${infusion.visualDescription}*`);
  lines.push(`  Damage: +${infusion.bonusDamage} | Duration: ${infusion.duration}`);
  lines.push(`  On Hit: ${infusion.onHitEffect}`);
  lines.push(`  Apply: Arcana DC ${infusion.applicationDC} | Cost: ${infusion.materialCost}gp`);
  return lines.join('\n');
}

export { INFUSIONS as ELEMENTAL_INFUSIONS };
