// Random magical inheritance — what happens when a wizard dies and their stuff becomes your problem.

export type InheritanceType = 'will' | 'contested' | 'cursed' | 'sentient_estate' | 'debt';

export interface InheritanceItem { name: string; value: number; complication: string; }

export interface MagicalInheritance {
  deceasedName: string;
  type: InheritanceType;
  description: string;
  items: InheritanceItem[];
  legalComplications: string[];
  hiddenCondition: string;
  claimants: string[];
  plotHook: string;
}

const INHERITANCES: MagicalInheritance[] = [
  { deceasedName: 'Archmage Thistlewood', type: 'will', description: 'Left everything to "the bravest adventurer I never met." That\'s you, apparently.', items: [
    { name: 'Tower of Thistlewood', value: 10000, complication: 'The tower is alive. It has opinions about interior decorating.' },
    { name: 'Spellbook (300 years of research)', value: 5000, complication: '47 of the spells are booby-trapped. The archmage was paranoid.' },
    { name: 'A jar labeled "DO NOT OPEN"', value: 0, complication: 'It rattles. Something inside whispers your name. The label is serious.' },
  ], legalComplications: ['The Mages Guild claims academic ownership of the spellbook.', 'Property taxes are 17 years overdue.', 'A nephew claims the will is forged.'], hiddenCondition: 'The will activates a geas: you must complete the archmage\'s final unfinished research project within 1 year.', claimants: ['The Mages Guild', 'Nephew Percival', 'A demon the archmage owed a favor'], plotHook: 'The jar contains a pocket dimension. Inside is... another, smaller version of the archmage. Still alive. Very confused.' },
  { deceasedName: 'Lady Ironblood (vampire, staked)', type: 'cursed', description: 'You killed the vampire. Now her estate lawyer appeared from nowhere with paperwork.', items: [
    { name: 'Ironblood Manor', value: 8000, complication: 'The servants are all thralls. They\'re free now but have nowhere to go.' },
    { name: 'Blood Diamond Collection', value: 3000, complication: 'Each diamond contains a trapped soul. Selling them is morally questionable.' },
    { name: 'Coffin of Lady Ironblood', value: 0, complication: 'Destroying it fully kills the vampire. Keeping it means she can be resurrected.' },
  ], legalComplications: ['Vampire estate law is a REAL legal specialty. The lawyer is a vampire too.', 'Several of her "acquisitions" were stolen from living families who want them back.', 'The manor is built over a sealed evil temple.'], hiddenCondition: 'Anyone who sleeps in the manor for 3 consecutive nights begins having vampire dreams. WIS DC 14 or start craving blood.', claimants: ['The thralled servants (emancipated)', 'Families she stole from', 'Her vampire sire (who is very angry you killed his progeny)'], plotHook: 'One of the blood diamonds contains the soul of someone the party knows. They\'ve been missing for months.' },
  { deceasedName: 'Fizwick Gearsprocket (gnomish inventor)', type: 'debt', description: 'You are the beneficiary of Fizwick\'s estate. Unfortunately, the estate is deeply, hilariously in debt.', items: [
    { name: 'The Workshop', value: 2000, complication: 'Full of half-finished inventions. Some work. Some explode. All are fascinating.' },
    { name: 'Patent Portfolio', value: 500, complication: 'Several patents are for weapons currently in use by hostile nations.' },
    { name: 'A debt ledger', value: -5000, complication: 'Fizwick owed 5,000gp to 14 different people. They all want it. Now.' },
  ], legalComplications: ['Creditors arrive within 1d4 days.', 'One creditor is a dragon. A patient dragon. But still a dragon.', 'The patents are contested by a rival inventor who claims Fizwick stole them.'], hiddenCondition: 'Hidden in the workshop: a completed invention worth 20,000gp. But finding it requires solving a 5-part puzzle Fizwick left.', claimants: ['14 creditors', 'The rival inventor', 'Fizwick\'s cat (sentient, claims owner status)'], plotHook: 'The completed invention is a working teleportation device. Every faction in the region would kill for it. Several are trying.' },
];

export function getRandomInheritance(): MagicalInheritance {
  return INHERITANCES[Math.floor(Math.random() * INHERITANCES.length)];
}

export function getInheritancesByType(type: InheritanceType): MagicalInheritance[] {
  return INHERITANCES.filter((i) => i.type === type);
}

export function getTotalValue(inheritance: MagicalInheritance): number {
  return inheritance.items.reduce((sum, i) => sum + i.value, 0);
}

export function getClaimantCount(inheritance: MagicalInheritance): number {
  return inheritance.claimants.length;
}

export function getAllInheritanceTypes(): InheritanceType[] {
  return [...new Set(INHERITANCES.map((i) => i.type))];
}

export function formatInheritance(inheritance: MagicalInheritance): string {
  const lines = [`📜 **Estate of ${inheritance.deceasedName}** *(${inheritance.type})*`];
  lines.push(`  *${inheritance.description}*`);
  inheritance.items.forEach((i) => lines.push(`  💎 ${i.name} (${i.value}gp) — ${i.complication}`));
  lines.push(`  ⚖️ Claimants: ${inheritance.claimants.join(', ')}`);
  lines.push(`  🔒 Hidden: ${inheritance.hiddenCondition}`);
  return lines.join('\n');
}

export { INHERITANCES as MAGICAL_INHERITANCES };
