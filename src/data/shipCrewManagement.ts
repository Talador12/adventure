// Ship crew management — hiring, loyalty, mutiny risk, and crew skill checks.

export type CrewRole = 'captain' | 'first_mate' | 'navigator' | 'bosun' | 'cook' | 'surgeon' | 'gunner' | 'swab';
export type CrewQuality = 'green' | 'able' | 'veteran' | 'elite';

export interface CrewMember {
  name: string;
  role: CrewRole;
  quality: CrewQuality;
  loyalty: number; // 0-10
  skill: number; // modifier for role checks
  wage: number; // gold per week
  quirk: string;
}

export interface CrewState {
  members: CrewMember[];
  morale: number; // 0-10
  mutinyRisk: number; // 0-100%
  unpaidWeeks: number;
}

const CREW_TEMPLATES: Omit<CrewMember, 'name'>[] = [
  { role: 'navigator', quality: 'veteran', loyalty: 6, skill: 5, wage: 10, quirk: 'Talks to the stars. They might talk back.' },
  { role: 'bosun', quality: 'able', loyalty: 5, skill: 3, wage: 5, quirk: 'Former pirate. Denies it unconvincingly.' },
  { role: 'cook', quality: 'green', loyalty: 7, skill: 1, wage: 3, quirk: 'Everything tastes like fish. Even the bread.' },
  { role: 'surgeon', quality: 'veteran', loyalty: 4, skill: 5, wage: 12, quirk: 'Drinks before surgery. Claims it steadies the hands.' },
  { role: 'gunner', quality: 'elite', loyalty: 3, skill: 6, wage: 15, quirk: 'Names every cannonball. Mourns the ones fired.' },
  { role: 'swab', quality: 'green', loyalty: 8, skill: 0, wage: 1, quirk: 'Stowaway who was discovered and pressed into service.' },
  { role: 'first_mate', quality: 'able', loyalty: 6, skill: 4, wage: 8, quirk: 'Keeps a journal of every order given. For evidence.' },
  { role: 'navigator', quality: 'able', loyalty: 5, skill: 3, wage: 7, quirk: 'Claims to have a compass that points to what you want most. It just spins.' },
];

const NAMES: string[] = ['Barnacle Pete', 'Salt Mary', 'Copper Jim', 'One-Eye Nell', 'Tidewalker', 'Scupper', 'Reef', 'Hammock Jack', 'Storm Sara', 'Bilge'];

export function createCrewState(): CrewState {
  return { members: [], morale: 5, mutinyRisk: 0, unpaidWeeks: 0 };
}

export function hireCrew(state: CrewState, role: CrewRole, quality: CrewQuality): CrewState {
  const template = CREW_TEMPLATES.find((t) => t.role === role && t.quality === quality) || CREW_TEMPLATES.find((t) => t.role === role) || CREW_TEMPLATES[0];
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const member: CrewMember = { name, ...template, role, quality };
  return { ...state, members: [...state.members, member] };
}

export function payWages(state: CrewState): { state: CrewState; totalCost: number } {
  const totalCost = state.members.reduce((sum, m) => sum + m.wage, 0);
  return { state: { ...state, unpaidWeeks: 0, morale: Math.min(10, state.morale + 1), mutinyRisk: Math.max(0, state.mutinyRisk - 10) }, totalCost };
}

export function skipPayday(state: CrewState): CrewState {
  const unpaid = state.unpaidWeeks + 1;
  const moraleDrop = unpaid;
  const mutinyIncrease = unpaid * 15;
  return { ...state, unpaidWeeks: unpaid, morale: Math.max(0, state.morale - moraleDrop), mutinyRisk: Math.min(100, state.mutinyRisk + mutinyIncrease) };
}

export function checkMutiny(state: CrewState): boolean {
  return Math.random() * 100 < state.mutinyRisk;
}

export function getCrewByRole(state: CrewState, role: CrewRole): CrewMember[] {
  return state.members.filter((m) => m.role === role);
}

export function getWeeklyCost(state: CrewState): number {
  return state.members.reduce((sum, m) => sum + m.wage, 0);
}

export function getAllRoles(): CrewRole[] {
  return ['captain', 'first_mate', 'navigator', 'bosun', 'cook', 'surgeon', 'gunner', 'swab'];
}

export function formatCrewState(state: CrewState): string {
  const lines = [`⚓ **Ship Crew** (${state.members.length} members)`];
  lines.push(`  Morale: ${'⭐'.repeat(Math.ceil(state.morale / 2))}${'☆'.repeat(5 - Math.ceil(state.morale / 2))} | Mutiny Risk: ${state.mutinyRisk}%`);
  lines.push(`  Weekly Cost: ${getWeeklyCost(state)}gp | Unpaid: ${state.unpaidWeeks} weeks`);
  state.members.forEach((m) => lines.push(`  ${m.quality === 'elite' ? '⭐' : '👤'} ${m.name} (${m.role}, ${m.quality}) — Skill +${m.skill} | Loyalty ${m.loyalty}`));
  return lines.join('\n');
}

export { CREW_TEMPLATES, NAMES as CREW_NAMES };
