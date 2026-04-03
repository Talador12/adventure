// Familiar manager — track familiar HP, abilities, and scout reports.

export type FamiliarForm = 'bat' | 'cat' | 'crab' | 'frog' | 'hawk' | 'lizard' | 'octopus' | 'owl' | 'snake' | 'spider' | 'weasel' | 'raven';

export interface FamiliarStats {
  form: FamiliarForm;
  name: string;
  hp: number;
  maxHp: number;
  ac: number;
  speed: string;
  senses: string;
  specialAbility: string;
}

export const FAMILIAR_FORMS: Record<FamiliarForm, Omit<FamiliarStats, 'name'>> = {
  bat: { form: 'bat', hp: 1, maxHp: 1, ac: 12, speed: '5ft, fly 30ft', senses: 'Blindsight 60ft', specialAbility: 'Echolocation — works in darkness' },
  cat: { form: 'cat', hp: 2, maxHp: 2, ac: 12, speed: '40ft, climb 30ft', senses: 'Darkvision 60ft', specialAbility: 'Keen Smell — advantage on Perception (smell)' },
  crab: { form: 'crab', hp: 2, maxHp: 2, ac: 11, speed: '20ft, swim 20ft', senses: 'Blindsight 30ft', specialAbility: 'Amphibious — breathes air and water' },
  frog: { form: 'frog', hp: 1, maxHp: 1, ac: 11, speed: '20ft, swim 20ft', senses: 'Darkvision 30ft', specialAbility: 'Amphibious + Standing Leap 10ft' },
  hawk: { form: 'hawk', hp: 1, maxHp: 1, ac: 13, speed: '10ft, fly 60ft', senses: 'Passive Perception 14', specialAbility: 'Keen Sight — advantage on Perception (sight)' },
  lizard: { form: 'lizard', hp: 2, maxHp: 2, ac: 10, speed: '20ft, climb 20ft', senses: 'Darkvision 30ft', specialAbility: 'Can squeeze through tiny spaces' },
  octopus: { form: 'octopus', hp: 3, maxHp: 3, ac: 12, speed: '5ft, swim 30ft', senses: 'Darkvision 30ft', specialAbility: 'Ink Cloud + Camouflage (advantage on Stealth)' },
  owl: { form: 'owl', hp: 1, maxHp: 1, ac: 11, speed: '5ft, fly 60ft', senses: 'Darkvision 120ft', specialAbility: 'Flyby — no opportunity attacks. Keen senses.' },
  snake: { form: 'snake', hp: 2, maxHp: 2, ac: 12, speed: '30ft, swim 30ft', senses: 'Blindsight 10ft', specialAbility: 'Bite with poison (DC 10 CON, 1d4 poison)' },
  spider: { form: 'spider', hp: 1, maxHp: 1, ac: 12, speed: '20ft, climb 20ft', senses: 'Darkvision 30ft', specialAbility: 'Web Sense + Web Walk (no web penalties)' },
  weasel: { form: 'weasel', hp: 1, maxHp: 1, ac: 13, speed: '30ft', senses: 'Passive Perception 13', specialAbility: 'Keen Hearing/Smell — advantage on Perception' },
  raven: { form: 'raven', hp: 1, maxHp: 1, ac: 12, speed: '10ft, fly 50ft', senses: 'Passive Perception 13', specialAbility: 'Mimicry — can repeat short phrases. Popular choice.' },
};

export interface FamiliarState {
  ownerId: string;
  familiar: FamiliarStats;
  dismissed: boolean;
  scoutReports: string[];
}

export function summonFamiliar(ownerId: string, form: FamiliarForm, name: string): FamiliarState {
  const stats = FAMILIAR_FORMS[form];
  return { ownerId, familiar: { ...stats, name }, dismissed: false, scoutReports: [] };
}

export function dismissFamiliar(state: FamiliarState): FamiliarState { return { ...state, dismissed: true }; }
export function resummonFamiliar(state: FamiliarState): FamiliarState { return { ...state, dismissed: false, familiar: { ...state.familiar, hp: state.familiar.maxHp } }; }

export function addScoutReport(state: FamiliarState, report: string): FamiliarState {
  return { ...state, scoutReports: [...state.scoutReports, report].slice(-10) };
}

export function formatFamiliarStatus(state: FamiliarState): string {
  if (state.dismissed) return `🐾 **${state.familiar.name}** (${state.familiar.form}): Dismissed to pocket dimension.`;
  const f = state.familiar;
  const lines = [`🐾 **${f.name}** (${f.form}) — HP: ${f.hp}/${f.maxHp} | AC: ${f.ac}`];
  lines.push(`Speed: ${f.speed} | Senses: ${f.senses}`);
  lines.push(`*${f.specialAbility}*`);
  if (state.scoutReports.length > 0) {
    lines.push(`Scout reports: ${state.scoutReports.slice(-3).join('; ')}`);
  }
  return lines.join('\n');
}

export function formatFamiliarOptions(): string {
  const lines = ['🐾 **Familiar Forms:**'];
  for (const [form, stats] of Object.entries(FAMILIAR_FORMS)) {
    lines.push(`• **${form}** — AC ${stats.ac}, ${stats.speed}, ${stats.senses}. *${stats.specialAbility}*`);
  }
  return lines.join('\n');
}
