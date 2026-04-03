// Magical bond system — shared HP or abilities between bonded party members.

export type BondType = 'life_link' | 'soul_bond' | 'battle_sync' | 'empathic_link' | 'power_share';

export interface BondBenefit { name: string; effect: string; }
export interface BondDrawback { name: string; effect: string; }

export interface MagicalBond {
  type: BondType;
  name: string;
  description: string;
  formationRitual: string;
  benefits: BondBenefit[];
  drawbacks: BondDrawback[];
  breakCondition: string;
  breakConsequence: string;
  maxDistance: string;
}

const BONDS: MagicalBond[] = [
  { type: 'life_link', name: 'The Shared Pulse', description: 'Two creatures share a single HP pool. What hurts one, hurts both. What heals one, heals both.', formationRitual: 'Both cut their palms, clasp hands, and speak the Oath of Shared Fate. 1 hour, Religion DC 14.', benefits: [
    { name: 'Shared HP Pool', effect: 'Combined max HP. Both draw from the same pool. Effectively doubles survivability.' },
    { name: 'Death Anchor', effect: 'Neither can die while the other lives. At 0 HP, the bond partner sustains them (1 HP per round from the partner\'s pool).' },
  ], drawbacks: [
    { name: 'Shared Pain', effect: 'All damage is felt by both. If one takes 20 fire damage, both feel burning.' },
    { name: 'Halved when separated', effect: 'Beyond max distance, each has their original HP minus 25%.' },
  ], breakCondition: 'Mutual agreement, or one partner betraying the other\'s trust.', breakConsequence: 'Both partners take 4d6 psychic damage. The emotional loss feels like a limb being removed.', maxDistance: '1 mile' },
  { type: 'battle_sync', name: 'The War Dance', description: 'Two warriors move as one. Their attacks synchronize. Their defense overlaps.', formationRitual: 'Spar for 8 consecutive hours without rest. Both must land a critical hit on each other.', benefits: [
    { name: 'Synchronized Strikes', effect: 'When one hits, the partner can use their reaction to make an attack against the same target.' },
    { name: 'Shared Initiative', effect: 'Both use the higher initiative roll. Act on the same turn (choose order).' },
  ], drawbacks: [
    { name: 'Shared Conditions', effect: 'If one is stunned/frightened/charmed, the other is too (same save DC to resist).' },
    { name: 'Tunnel Vision', effect: 'Disadvantage on Perception during combat (too focused on the partner\'s movements).' },
  ], breakCondition: 'Not fighting alongside each other for 30 consecutive days.', breakConsequence: 'The rhythm breaks. Both have disadvantage on attacks for 1 week (muscle memory conflicts).', maxDistance: '60 feet' },
  { type: 'empathic_link', name: 'The Open Heart', description: 'Two creatures share emotions. Every joy, every fear, every secret feeling — the other knows.', formationRitual: 'Share your deepest secret with each other under a full moon. Both must be sincere (Insight DC 15 confirms).', benefits: [
    { name: 'Emotional Radar', effect: 'Always know the partner\'s emotional state. Advantage on Insight checks involving the partner.' },
    { name: 'Emotional Healing', effect: 'Can remove Frightened or Charmed from partner by spending their action to "send" courage/clarity.' },
  ], drawbacks: [
    { name: 'Emotional Bleed', effect: 'Strong negative emotions transfer. If one panics, the other feels anxiety (WIS DC 11 or frightened for 1 round).' },
    { name: 'No Secrets', effect: 'Cannot lie to or hide emotions from the partner. Deception between them is impossible.' },
  ], breakCondition: 'One partner deliberately causes the other emotional pain.', breakConsequence: 'Emotional whiplash. Both are Stunned for 1 round, then have disadvantage on WIS saves for 1 week.', maxDistance: '10 miles' },
  { type: 'power_share', name: 'The Arcane Bridge', description: 'Two spellcasters link their magical reserves. Spell slots are shared.', formationRitual: 'Simultaneously cast the same spell at each other. Both must be willing. Arcana DC 15.', benefits: [
    { name: 'Shared Spell Slots', effect: 'Either partner can use the other\'s unspent spell slots. Effectively doubles total slots.' },
    { name: 'Spell Relay', effect: 'Cast a touch spell through the partner (they become the point of origin). Range = bond distance.' },
  ], drawbacks: [
    { name: 'Shared Exhaustion', effect: 'When one runs out of personal slots, they gain 1 level of exhaustion.' },
    { name: 'Concentration Conflict', effect: 'Both cannot maintain concentration spells simultaneously. One overrides the other.' },
  ], breakCondition: 'Either partner casts a spell that directly harms the other.', breakConsequence: 'All remaining spell slots from both partners are immediately expended. Arcane backlash: 2d6 force damage each.', maxDistance: '500 feet' },
];

export function getBond(type: BondType): MagicalBond | undefined {
  return BONDS.find((b) => b.type === type);
}

export function getAllBondTypes(): BondType[] {
  return BONDS.map((b) => b.type);
}

export function getBondsWithinDistance(distance: number): MagicalBond[] {
  const parse = (s: string) => { const m = s.match(/(\d+)/); return m ? parseInt(m[1]) : Infinity; };
  return BONDS.filter((b) => parse(b.maxDistance) >= distance);
}

export function formatBond(bond: MagicalBond): string {
  const icon = { life_link: '❤️', soul_bond: '💫', battle_sync: '⚔️', empathic_link: '💭', power_share: '🔮' }[bond.type];
  const lines = [`${icon} **${bond.name}** *(${bond.type.replace(/_/g, ' ')})*`];
  lines.push(`  *${bond.description}*`);
  lines.push(`  Ritual: ${bond.formationRitual}`);
  lines.push(`  Range: ${bond.maxDistance}`);
  bond.benefits.forEach((b) => lines.push(`  ✅ ${b.name}: ${b.effect}`));
  bond.drawbacks.forEach((d) => lines.push(`  ⚠️ ${d.name}: ${d.effect}`));
  lines.push(`  💔 Break: ${bond.breakCondition} → ${bond.breakConsequence}`);
  return lines.join('\n');
}

export { BONDS as MAGICAL_BONDS };
