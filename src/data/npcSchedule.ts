// NPC schedule system — daily routines for NPCs that create windows for interaction or ambush.

export type TimeOfDay = 'dawn' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night' | 'midnight';

export interface ScheduleEntry {
  time: TimeOfDay;
  activity: string;
  location: string;
  alone: boolean;
  interruptDC: number; // how hard it is to interrupt/intercept
}

export interface NpcSchedule {
  npcName: string;
  role: string;
  routineType: 'predictable' | 'varied' | 'erratic';
  schedule: ScheduleEntry[];
  secretActivity: { time: TimeOfDay; activity: string; discoveryDC: number } | null;
  vulnerableWindow: string;
}

const SCHEDULES: NpcSchedule[] = [
  { npcName: 'Mayor Aldwin', role: 'Town Mayor', routineType: 'predictable', schedule: [
    { time: 'dawn', activity: 'Morning prayers at the temple', location: 'Temple of Solara', alone: false, interruptDC: 14 },
    { time: 'morning', activity: 'Meets with advisors', location: 'Town Hall, council chamber', alone: false, interruptDC: 15 },
    { time: 'midday', activity: 'Lunch at the Golden Goblet', location: 'Golden Goblet tavern', alone: false, interruptDC: 11 },
    { time: 'afternoon', activity: 'Signs documents, hears petitions', location: 'Town Hall, office', alone: true, interruptDC: 12 },
    { time: 'evening', activity: 'Dinner with family', location: 'Mayor\'s residence', alone: false, interruptDC: 16 },
    { time: 'night', activity: 'Reading in study', location: 'Mayor\'s residence, study', alone: true, interruptDC: 10 },
  ], secretActivity: { time: 'midnight', activity: 'Meets with a spy in the wine cellar', discoveryDC: 16 }, vulnerableWindow: 'Afternoon office hours (alone, low interrupt DC). Or midnight secret meeting.' },
  { npcName: 'Guard Captain Elara', role: 'City Watch Captain', routineType: 'varied', schedule: [
    { time: 'dawn', activity: 'Morning drill with recruits', location: 'Training grounds', alone: false, interruptDC: 13 },
    { time: 'morning', activity: 'Patrol route A (market district)', location: 'Market district', alone: false, interruptDC: 14 },
    { time: 'midday', activity: 'Reports and paperwork', location: 'Guard barracks, office', alone: true, interruptDC: 11 },
    { time: 'afternoon', activity: 'Patrol route B (docks)', location: 'Docks', alone: false, interruptDC: 14 },
    { time: 'evening', activity: 'Off duty, frequents The Rusty Anchor', location: 'Rusty Anchor tavern', alone: true, interruptDC: 10 },
    { time: 'night', activity: 'Night patrol (every 3rd night)', location: 'City walls', alone: false, interruptDC: 15 },
  ], secretActivity: null, vulnerableWindow: 'Evening at the Rusty Anchor — alone, relaxed, lower guard.' },
  { npcName: 'Merchant Zahra', role: 'Spice Trader', routineType: 'predictable', schedule: [
    { time: 'dawn', activity: 'Inventory check at warehouse', location: 'Harbor warehouse 7', alone: true, interruptDC: 10 },
    { time: 'morning', activity: 'Opens shop for business', location: 'Zahra\'s Spice Emporium', alone: false, interruptDC: 12 },
    { time: 'midday', activity: 'Lunch break, counts money', location: 'Back room of the shop', alone: true, interruptDC: 11 },
    { time: 'afternoon', activity: 'Negotiates with ship captains', location: 'Harbor docks', alone: false, interruptDC: 13 },
    { time: 'evening', activity: 'Closes shop, walks home', location: 'Market to residential (public road)', alone: true, interruptDC: 10 },
    { time: 'night', activity: 'Home. Door is locked and trapped.', location: 'Residential quarter', alone: true, interruptDC: 15 },
  ], secretActivity: { time: 'midnight', activity: 'Smuggling operation at warehouse 7', discoveryDC: 14 }, vulnerableWindow: 'Dawn at the warehouse — alone, no witnesses. Or evening walk home.' },
  { npcName: 'Sage Thandril', role: 'Reclusive Scholar', routineType: 'erratic', schedule: [
    { time: 'dawn', activity: 'Still asleep (works late nights)', location: 'Tower, bedroom', alone: true, interruptDC: 8 },
    { time: 'morning', activity: 'Wakes, experiments in laboratory', location: 'Tower, lab', alone: true, interruptDC: 14 },
    { time: 'midday', activity: 'Forgets to eat (50% chance of leaving for food)', location: 'Tower or market', alone: true, interruptDC: 10 },
    { time: 'afternoon', activity: 'Library research, ignores visitors', location: 'Tower, library', alone: true, interruptDC: 16 },
    { time: 'evening', activity: 'Stargazing from rooftop', location: 'Tower, roof', alone: true, interruptDC: 11 },
    { time: 'night', activity: 'Deep research (do not disturb)', location: 'Tower, lab', alone: true, interruptDC: 18 },
  ], secretActivity: { time: 'midnight', activity: 'Communicates with an entity via crystal ball', discoveryDC: 17 }, vulnerableWindow: 'Dawn — still asleep, low interrupt DC. Or midday if they leave for food.' },
];

export function getNpcSchedule(name: string): NpcSchedule | undefined {
  return SCHEDULES.find((s) => s.npcName === name);
}

export function getActivityAt(schedule: NpcSchedule, time: TimeOfDay): ScheduleEntry | undefined {
  return schedule.schedule.find((e) => e.time === time);
}

export function getAloneWindows(schedule: NpcSchedule): ScheduleEntry[] {
  return schedule.schedule.filter((e) => e.alone);
}

export function getEasiestInterrupt(schedule: NpcSchedule): ScheduleEntry {
  return schedule.schedule.reduce((best, e) => (e.interruptDC < best.interruptDC ? e : best));
}

export function getAllNpcNames(): string[] {
  return SCHEDULES.map((s) => s.npcName);
}

export function formatNpcSchedule(schedule: NpcSchedule): string {
  const lines = [`📅 **${schedule.npcName}** *(${schedule.role}, ${schedule.routineType})*`];
  schedule.schedule.forEach((e) => {
    const icon = e.alone ? '👤' : '👥';
    lines.push(`  ${icon} ${e.time}: ${e.activity} @ ${e.location} (DC ${e.interruptDC})`);
  });
  lines.push(`  ⚡ Vulnerable: ${schedule.vulnerableWindow}`);
  return lines.join('\n');
}

export { SCHEDULES as NPC_SCHEDULES };
