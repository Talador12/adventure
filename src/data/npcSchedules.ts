// Dynamic NPC schedules — NPCs move between locations based on time of day.
// DM assigns a schedule; the system suggests location based on current hour.

export interface ScheduleEntry {
  startHour: number; // 0-23
  endHour: number;   // 0-23, wraps around midnight
  location: string;
  activity: string;
}

export interface NpcSchedule {
  npcId: string;
  npcName: string;
  schedule: ScheduleEntry[];
  defaultLocation: string;
}

export const SCHEDULE_TEMPLATES: Record<string, ScheduleEntry[]> = {
  innkeeper: [
    { startHour: 6, endHour: 9, location: 'Kitchen', activity: 'Preparing breakfast' },
    { startHour: 9, endHour: 14, location: 'Common Room', activity: 'Serving patrons' },
    { startHour: 14, endHour: 16, location: 'Cellar', activity: 'Checking supplies' },
    { startHour: 16, endHour: 23, location: 'Common Room', activity: 'Serving evening crowd' },
    { startHour: 23, endHour: 6, location: 'Private Quarters', activity: 'Sleeping' },
  ],
  merchant: [
    { startHour: 7, endHour: 9, location: 'Warehouse', activity: 'Checking inventory' },
    { startHour: 9, endHour: 18, location: 'Shop Front', activity: 'Open for business' },
    { startHour: 18, endHour: 20, location: 'Tavern', activity: 'Dinner and gossip' },
    { startHour: 20, endHour: 7, location: 'Home', activity: 'Resting' },
  ],
  guard: [
    { startHour: 6, endHour: 14, location: 'Gate', activity: 'Day watch' },
    { startHour: 14, endHour: 16, location: 'Barracks', activity: 'Shift change' },
    { startHour: 16, endHour: 22, location: 'Patrol Route', activity: 'Evening patrol' },
    { startHour: 22, endHour: 6, location: 'Barracks', activity: 'Off duty' },
  ],
  priest: [
    { startHour: 5, endHour: 7, location: 'Temple', activity: 'Dawn prayer' },
    { startHour: 7, endHour: 12, location: 'Temple', activity: 'Ministering to visitors' },
    { startHour: 12, endHour: 14, location: 'Garden', activity: 'Meditation and lunch' },
    { startHour: 14, endHour: 18, location: 'Hospital', activity: 'Healing the sick' },
    { startHour: 18, endHour: 20, location: 'Temple', activity: 'Evening service' },
    { startHour: 20, endHour: 5, location: 'Clergy Quarters', activity: 'Sleeping' },
  ],
  thief: [
    { startHour: 10, endHour: 14, location: 'Safe House', activity: 'Sleeping late' },
    { startHour: 14, endHour: 18, location: 'Market', activity: 'Scouting marks' },
    { startHour: 18, endHour: 22, location: 'Tavern', activity: 'Gathering information' },
    { startHour: 22, endHour: 4, location: 'Streets', activity: 'Working the night' },
    { startHour: 4, endHour: 10, location: 'Safe House', activity: 'Counting haul, sleeping' },
  ],
};

function isInTimeRange(hour: number, start: number, end: number): boolean {
  if (start <= end) return hour >= start && hour < end;
  // Wraps around midnight (e.g., 23 to 6)
  return hour >= start || hour < end;
}

export function getCurrentLocation(schedule: NpcSchedule, hour: number): { location: string; activity: string } {
  for (const entry of schedule.schedule) {
    if (isInTimeRange(hour, entry.startHour, entry.endHour)) {
      return { location: entry.location, activity: entry.activity };
    }
  }
  return { location: schedule.defaultLocation, activity: 'Unknown' };
}

export function getScheduleTemplate(role: string): ScheduleEntry[] {
  const key = role.toLowerCase();
  for (const [templateKey, schedule] of Object.entries(SCHEDULE_TEMPLATES)) {
    if (key.includes(templateKey)) return [...schedule];
  }
  // Default generic schedule
  return [
    { startHour: 7, endHour: 18, location: 'Workplace', activity: 'Working' },
    { startHour: 18, endHour: 22, location: 'Tavern', activity: 'Relaxing' },
    { startHour: 22, endHour: 7, location: 'Home', activity: 'Sleeping' },
  ];
}

export function formatSchedule(schedule: NpcSchedule, currentHour: number): string {
  const current = getCurrentLocation(schedule, currentHour);
  const lines = [`📍 **${schedule.npcName}** is at **${current.location}** (${current.activity})`];
  lines.push('Schedule:');
  for (const e of schedule.schedule) {
    const active = isInTimeRange(currentHour, e.startHour, e.endHour);
    lines.push(`${active ? '▶' : '  '} ${String(e.startHour).padStart(2, '0')}:00-${String(e.endHour).padStart(2, '0')}:00 — ${e.location} (${e.activity})`);
  }
  return lines.join('\n');
}
