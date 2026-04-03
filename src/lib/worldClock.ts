// Persistent world clock — track in-game days, weeks, months with event scheduling.
// Provides a calendar with named months and scheduled events.

export interface WorldDate {
  year: number;
  month: number; // 1-12
  day: number;   // 1-30
  hour: number;  // 0-23
}

export interface ScheduledEvent {
  id: string;
  name: string;
  date: WorldDate;
  description: string;
  recurring: boolean;
}

export interface WorldClockState {
  currentDate: WorldDate;
  events: ScheduledEvent[];
  monthNames: string[];
}

export const DEFAULT_MONTH_NAMES = ['Deepwinter', 'Claws of Cold', 'Claws of Sunsets', 'Claws of Storms', 'Melting', 'Time of Flowers', 'Summertide', 'Highsun', 'Fading', 'Leaffall', 'Rotting', 'Drawing Down'];

export function createWorldClock(year: number = 1490): WorldClockState {
  return { currentDate: { year, month: 1, day: 1, hour: 8 }, events: [], monthNames: [...DEFAULT_MONTH_NAMES] };
}

export function advanceTime(state: WorldClockState, hours: number): WorldClockState {
  let { year, month, day, hour } = state.currentDate;
  hour += hours;
  while (hour >= 24) { hour -= 24; day++; }
  while (hour < 0) { hour += 24; day--; }
  while (day > 30) { day -= 30; month++; }
  while (day < 1) { day += 30; month--; }
  while (month > 12) { month -= 12; year++; }
  while (month < 1) { month += 12; year--; }
  return { ...state, currentDate: { year, month, day, hour } };
}

export function advanceDays(state: WorldClockState, days: number): WorldClockState {
  return advanceTime(state, days * 24);
}

export function addEvent(state: WorldClockState, name: string, date: WorldDate, description: string, recurring: boolean = false): WorldClockState {
  return { ...state, events: [...state.events, { id: crypto.randomUUID(), name, date, description, recurring }] };
}

export function getUpcomingEvents(state: WorldClockState, withinDays: number = 30): ScheduledEvent[] {
  const { year, month, day } = state.currentDate;
  const currentTotalDays = year * 360 + (month - 1) * 30 + day;
  return state.events.filter((e) => {
    const eventDays = e.date.year * 360 + (e.date.month - 1) * 30 + e.date.day;
    const diff = eventDays - currentTotalDays;
    return diff >= 0 && diff <= withinDays;
  }).sort((a, b) => {
    const da = a.date.year * 360 + (a.date.month - 1) * 30 + a.date.day;
    const db = b.date.year * 360 + (b.date.month - 1) * 30 + b.date.day;
    return da - db;
  });
}

export function getTimeOfDayLabel(hour: number): string {
  if (hour >= 5 && hour < 7) return 'Dawn';
  if (hour >= 7 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 14) return 'Midday';
  if (hour >= 14 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 20) return 'Evening';
  if (hour >= 20 && hour < 23) return 'Night';
  return 'Midnight';
}

export function formatWorldDate(state: WorldClockState): string {
  const { year, month, day, hour } = state.currentDate;
  const monthName = state.monthNames[month - 1] || `Month ${month}`;
  const tod = getTimeOfDayLabel(hour);
  return `📅 **${day} ${monthName}, ${year}** — ${tod} (${String(hour).padStart(2, '0')}:00)`;
}

export function formatWorldClock(state: WorldClockState): string {
  const lines = [formatWorldDate(state)];
  const upcoming = getUpcomingEvents(state, 30);
  if (upcoming.length > 0) {
    lines.push('**Upcoming Events:**');
    for (const e of upcoming.slice(0, 5)) {
      const monthName = state.monthNames[e.date.month - 1] || `M${e.date.month}`;
      lines.push(`  • ${e.date.day} ${monthName}: ${e.name} — ${e.description}`);
    }
  }
  return lines.join('\n');
}
