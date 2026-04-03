// Party watch scheduler — auto-assign watch shifts for long rests.

export interface WatchShift {
  characterId: string;
  characterName: string;
  startHour: number;
  endHour: number;
  durationHours: number;
}

export interface WatchSchedule {
  shifts: WatchShift[];
  restStartHour: number;
  restEndHour: number;
  totalWatchHours: number;
}

export function generateWatchSchedule(characters: { id: string; name: string; perceptionMod: number }[], startHour: number = 22): WatchSchedule {
  if (characters.length === 0) return { shifts: [], restStartHour: startHour, restEndHour: (startHour + 8) % 24, totalWatchHours: 8 };

  const endHour = (startHour + 8) % 24;
  const hoursPerWatch = Math.max(1, Math.ceil(8 / characters.length));
  // Sort by perception (best watchers get the dangerous midnight shift)
  const sorted = [...characters].sort((a, b) => b.perceptionMod - a.perceptionMod);

  const shifts: WatchShift[] = [];
  let currentHour = startHour;
  for (let i = 0; i < sorted.length; i++) {
    const duration = i === sorted.length - 1 ? 8 - hoursPerWatch * i : hoursPerWatch;
    shifts.push({
      characterId: sorted[i].id,
      characterName: sorted[i].name,
      startHour: currentHour % 24,
      endHour: (currentHour + duration) % 24,
      durationHours: duration,
    });
    currentHour += duration;
  }

  return { shifts, restStartHour: startHour, restEndHour: endHour, totalWatchHours: 8 };
}

export function formatWatchSchedule(schedule: WatchSchedule): string {
  if (schedule.shifts.length === 0) return '🌙 **Watch Schedule:** No one is on watch!';
  const lines = [`🌙 **Watch Schedule** (${schedule.restStartHour}:00 - ${schedule.restEndHour}:00):`];
  for (const s of schedule.shifts) {
    const padStart = String(s.startHour).padStart(2, '0');
    const padEnd = String(s.endHour).padStart(2, '0');
    lines.push(`  🔭 ${padStart}:00 - ${padEnd}:00 (${s.durationHours}h): **${s.characterName}**`);
  }
  return lines.join('\n');
}
