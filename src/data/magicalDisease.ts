// Magical disease system — arcane plagues with symptoms, transmission, and magical cures.

export type DiseaseTransmission = 'touch' | 'airborne' | 'ingested' | 'magical' | 'curse' | 'bite';
export type DiseaseSeverity = 'mild' | 'moderate' | 'severe' | 'terminal';

export interface DiseaseSymptom {
  day: number; // when it appears
  description: string;
  mechanicalEffect: string;
}

export interface MagicalDisease {
  name: string;
  transmission: DiseaseTransmission;
  severity: DiseaseSeverity;
  incubation: string;
  saveDC: number;
  saveType: 'CON' | 'WIS' | 'CHA';
  symptoms: DiseaseSymptom[];
  mundaneTreatment: string | null;
  magicalCure: string;
  lore: string;
}

const DISEASES: MagicalDisease[] = [
  { name: 'Arcane Flux', transmission: 'magical', severity: 'moderate', incubation: '1d4 days', saveDC: 13, saveType: 'CON', symptoms: [
    { day: 1, description: 'Sparks fly from your fingertips involuntarily.', mechanicalEffect: 'Cantrips misfire 25% of the time (wrong target).' },
    { day: 3, description: 'Spells become unreliable. Random surges.', mechanicalEffect: 'Roll on wild magic table for every spell cast.' },
    { day: 7, description: 'Magic pours from you uncontrollably.', mechanicalEffect: 'Random cantrip fires every hour. Cannot take long rests (magical disruption).' },
  ], mundaneTreatment: null, magicalCure: 'Dispel Magic (4th level+) on the afflicted, or 3 consecutive successful CON saves (DC 13) during long rests.', lore: 'Caught by exposure to raw magical energy. Common near leyline junctions and failed enchantments.' },
  { name: 'Shadowpox', transmission: 'touch', severity: 'mild', incubation: '2d4 hours', saveDC: 12, saveType: 'CON', symptoms: [
    { day: 1, description: 'Dark spots appear on the skin. They move slightly.', mechanicalEffect: '-1 CHA. Disadvantage on Persuasion with those who notice.' },
    { day: 3, description: 'Shadows seem darker around you.', mechanicalEffect: 'Darkvision 30ft (if you didn\'t have it). Sunlight sensitivity (disadvantage on attacks/Perception in bright light).' },
  ], mundaneTreatment: 'Exposure to direct sunlight for 8 continuous hours.', magicalCure: 'Lesser Restoration or Daylight spell cast directly on the afflicted.', lore: 'Transmitted by shadow creatures. The spots are tiny pieces of the Shadowfell trying to anchor to the Material Plane.' },
  { name: 'Crystalmind', transmission: 'airborne', severity: 'severe', incubation: '1 day', saveDC: 15, saveType: 'WIS', symptoms: [
    { day: 1, description: 'Thoughts become rigid. Hard to change plans.', mechanicalEffect: 'Disadvantage on Insight and Perception. -2 Initiative.' },
    { day: 3, description: 'Memories crystallize. Can\'t form new short-term memories.', mechanicalEffect: 'Forget events more than 1 hour old. Can\'t learn new information.' },
    { day: 7, description: 'The mind becomes fully crystallized.', mechanicalEffect: 'Intelligence reduced to 1. The body acts on the last repeating thought.' },
  ], mundaneTreatment: null, magicalCure: 'Greater Restoration, or psychic surgery (INT DC 16, requires telepathy).', lore: 'Released from shattered psionic crystals. The disease tries to turn the host into a new crystal lattice for psionic energy.' },
  { name: 'Fey Wilt', transmission: 'curse', severity: 'moderate', incubation: 'Instant', saveDC: 14, saveType: 'CHA', symptoms: [
    { day: 1, description: 'Flowers wilt when you touch them. Plants shrink away.', mechanicalEffect: 'Druidic magic has disadvantage. Nature checks fail automatically.' },
    { day: 3, description: 'Your skin takes on a grey, bark-like texture.', mechanicalEffect: '+1 AC (natural armor) but -2 DEX. Speed reduced by 5ft.' },
    { day: 7, description: 'You begin rooting. Feet stick to soil.', mechanicalEffect: 'Speed halved on natural ground. Cannot dash on soil or grass.' },
  ], mundaneTreatment: 'A fey creature must willingly kiss you (Persuasion DC 16 with a fey).', magicalCure: 'Remove Curse (3rd level+), or be watered by a treant (they find this hilarious).', lore: 'A curse placed by offended dryads. The afflicted slowly becomes a tree. There\'s an entire grove of former adventurers.' },
  { name: 'Spectral Bleed', transmission: 'bite', severity: 'severe', incubation: '1d6 hours', saveDC: 15, saveType: 'CON', symptoms: [
    { day: 1, description: 'You become slightly translucent. People do double-takes.', mechanicalEffect: 'Resistance to bludgeoning/slashing (partially phased). But 1d4 necrotic damage each dawn.' },
    { day: 3, description: 'Incorporeal episodes. You phase through objects involuntarily.', mechanicalEffect: '10% chance per hour of phasing through floor/walls (falling or stuck). Can\'t hold objects during episodes.' },
    { day: 7, description: 'You\'re barely material. A ghost, but alive.', mechanicalEffect: 'Immune to non-magical physical damage. But ALL damage you deal is halved. Necrotic dawn damage increases to 2d6.' },
  ], mundaneTreatment: null, magicalCure: 'Greater Restoration + a vial of ectoplasm applied to the heart. Or willingly cross into the Ethereal Plane and return.', lore: 'Transmitted by spectral undead bites. The disease pulls you toward the Ethereal Plane — inch by inch, day by day.' },
];

export function getRandomDisease(): MagicalDisease {
  return DISEASES[Math.floor(Math.random() * DISEASES.length)];
}

export function getDiseasesByTransmission(transmission: DiseaseTransmission): MagicalDisease[] {
  return DISEASES.filter((d) => d.transmission === transmission);
}

export function getDiseasesBySeverity(severity: DiseaseSeverity): MagicalDisease[] {
  return DISEASES.filter((d) => d.severity === severity);
}

export function getSymptomsAtDay(disease: MagicalDisease, day: number): DiseaseSymptom[] {
  return disease.symptoms.filter((s) => s.day <= day);
}

export function hasMundaneCure(disease: MagicalDisease): boolean {
  return disease.mundaneTreatment !== null;
}

export function getAllTransmissionTypes(): DiseaseTransmission[] {
  return [...new Set(DISEASES.map((d) => d.transmission))];
}

export function formatDisease(disease: MagicalDisease, currentDay: number = 0): string {
  const icon = { touch: '✋', airborne: '💨', ingested: '🍷', magical: '✨', curse: '🔮', bite: '🦷' }[disease.transmission];
  const sev = { mild: '🟢', moderate: '🟡', severe: '🟠', terminal: '🔴' }[disease.severity];
  const lines = [`${icon} ${sev} **${disease.name}** *(${disease.transmission}, ${disease.severity})*`];
  lines.push(`  Save: ${disease.saveType} DC ${disease.saveDC} | Incubation: ${disease.incubation}`);
  const active = getSymptomsAtDay(disease, currentDay);
  if (active.length > 0) { lines.push('  **Active Symptoms:**'); active.forEach((s) => lines.push(`    Day ${s.day}: ${s.mechanicalEffect}`)); }
  lines.push(`  💊 Cure: ${disease.magicalCure}`);
  if (disease.mundaneTreatment) lines.push(`  🌿 Mundane: ${disease.mundaneTreatment}`);
  return lines.join('\n');
}

export { DISEASES as MAGICAL_DISEASES };
