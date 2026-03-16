// CampaignTimeline — auto-generated session history from combat logs, narration, milestones.
// Aggregates game events into a vertical timeline with icons, categories, and timestamps.
// Persisted per campaign in localStorage.
import { useState, useEffect, useMemo, useRef } from 'react';

export interface TimelineEvent {
  id: string;
  type: 'combat' | 'narration' | 'levelup' | 'quest' | 'death' | 'loot' | 'rest' | 'scene' | 'milestone';
  title: string;
  description: string;
  timestamp: number;
  icon: string;
  color: string;
}

interface CampaignTimelineProps {
  roomId: string;
  dmHistory: string[];
  combatLog: string[];
  inCombat: boolean;
  characters: { name: string; level: number; class: string; gold: number }[];
}

const STORAGE_KEY = (room: string) => `adventure:timeline:${room}`;
const MAX_EVENTS = 100;

// Icons and colors per event type
const EVENT_STYLE: Record<string, { icon: string; color: string; bg: string }> = {
  combat: { icon: '⚔️', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
  narration: { icon: '📜', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  levelup: { icon: '⬆️', color: 'text-yellow-300', bg: 'bg-yellow-500/10 border-yellow-500/30' },
  quest: { icon: '✅', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  death: { icon: '💀', color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/30' },
  loot: { icon: '💰', color: 'text-amber-300', bg: 'bg-amber-400/10 border-amber-400/30' },
  rest: { icon: '🏕️', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' },
  scene: { icon: '🗺️', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' },
  milestone: { icon: '🏆', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function loadTimeline(room: string): TimelineEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(room));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveTimeline(room: string, events: TimelineEvent[]) {
  try {
    localStorage.setItem(STORAGE_KEY(room), JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch { /* ok */ }
}

// Extract timeline events from DM history and combat log
function extractEvents(dmHistory: string[], combatLog: string[], existingIds: Set<string>): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const now = Date.now();

  // Parse DM history for narration events, scene changes, rests, deaths
  for (let i = 0; i < dmHistory.length; i++) {
    const entry = dmHistory[i];
    const entryId = `dm-${i}-${entry.slice(0, 20)}`;
    if (existingIds.has(entryId)) continue;

    // Scene-setting narration (first entry or long entries)
    if (i === 0) {
      events.push({
        id: entryId,
        type: 'narration',
        title: 'Adventure begins',
        description: entry.slice(0, 200) + (entry.length > 200 ? '...' : ''),
        timestamp: now - (dmHistory.length - i) * 60_000,
        icon: EVENT_STYLE.narration.icon,
        color: EVENT_STYLE.narration.color,
      });
      continue;
    }

    // Detect rest events
    if (/takes a (short|long) rest/i.test(entry) || /rest(s|ed|ing)/i.test(entry)) {
      events.push({
        id: entryId,
        type: 'rest',
        title: entry.includes('long') ? 'Long Rest' : 'Short Rest',
        description: entry.slice(0, 150),
        timestamp: now - (dmHistory.length - i) * 60_000,
        icon: EVENT_STYLE.rest.icon,
        color: EVENT_STYLE.rest.color,
      });
      continue;
    }

    // Detect deaths
    if (/has died|killing blow|falls!/i.test(entry)) {
      const nameMatch = entry.match(/^(.+?) (?:has died|falls!)/i);
      events.push({
        id: entryId,
        type: 'death',
        title: nameMatch ? `${nameMatch[1]} falls` : 'A combatant falls',
        description: entry.slice(0, 150),
        timestamp: now - (dmHistory.length - i) * 60_000,
        icon: EVENT_STYLE.death.icon,
        color: EVENT_STYLE.death.color,
      });
      continue;
    }

    // Detect loot
    if (/found|looted|received|gold|treasure/i.test(entry) && /\d+/.test(entry)) {
      events.push({
        id: entryId,
        type: 'loot',
        title: 'Treasure found',
        description: entry.slice(0, 150),
        timestamp: now - (dmHistory.length - i) * 60_000,
        icon: EVENT_STYLE.loot.icon,
        color: EVENT_STYLE.loot.color,
      });
      continue;
    }

    // Detect level-ups
    if (/level(ed)? up|reached level|now level/i.test(entry)) {
      events.push({
        id: entryId,
        type: 'levelup',
        title: 'Level up!',
        description: entry.slice(0, 150),
        timestamp: now - (dmHistory.length - i) * 60_000,
        icon: EVENT_STYLE.levelup.icon,
        color: EVENT_STYLE.levelup.color,
      });
      continue;
    }
  }

  // Parse combat log for combat events
  let combatStartIdx = -1;
  let combatKills = 0;
  for (let i = 0; i < combatLog.length; i++) {
    const entry = combatLog[i];

    // Detect combat start (initiative rolled)
    if (/initiative|combat begins|roll initiative/i.test(entry)) {
      combatStartIdx = i;
      combatKills = 0;
    }

    // Count kills
    if (/falls!|defeated|slain|killed/i.test(entry)) {
      combatKills++;
    }

    // Detect combat end
    if (/combat ends|victory|combat over|end combat/i.test(entry) && combatStartIdx >= 0) {
      const combatId = `combat-${combatStartIdx}`;
      if (!existingIds.has(combatId)) {
        events.push({
          id: combatId,
          type: 'combat',
          title: `Combat encounter${combatKills > 0 ? ` — ${combatKills} defeated` : ''}`,
          description: entry.slice(0, 150),
          timestamp: now - (combatLog.length - i) * 30_000,
          icon: EVENT_STYLE.combat.icon,
          color: EVENT_STYLE.combat.color,
        });
      }
      combatStartIdx = -1;
    }

    // Detect critical hits as milestones
    if (/CRITICAL/i.test(entry)) {
      const critId = `crit-${i}`;
      if (!existingIds.has(critId)) {
        const nameMatch = entry.match(/^(?:\(Attack \d+\) )?(?:CRITICAL! )?(.+?) strikes/i);
        events.push({
          id: critId,
          type: 'milestone',
          title: nameMatch ? `${nameMatch[1]} lands a critical hit!` : 'Critical hit!',
          description: entry.slice(0, 150),
          timestamp: now - (combatLog.length - i) * 30_000,
          icon: EVENT_STYLE.milestone.icon,
          color: EVENT_STYLE.milestone.color,
        });
      }
    }
  }

  return events;
}

export default function CampaignTimeline({ roomId, dmHistory, combatLog, inCombat, characters }: CampaignTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>(() => loadTimeline(roomId));
  const [filter, setFilter] = useState<string>('all');
  const lastDmLenRef = useRef(0);
  const lastCombatLenRef = useRef(0);

  // Extract new events when dmHistory or combatLog changes
  useEffect(() => {
    if (dmHistory.length === lastDmLenRef.current && combatLog.length === lastCombatLenRef.current) return;
    lastDmLenRef.current = dmHistory.length;
    lastCombatLenRef.current = combatLog.length;

    const existingIds = new Set(events.map((e) => e.id));
    const newEvents = extractEvents(dmHistory, combatLog, existingIds);
    if (newEvents.length > 0) {
      const merged = [...events, ...newEvents].sort((a, b) => a.timestamp - b.timestamp).slice(-MAX_EVENTS);
      setEvents(merged);
      saveTimeline(roomId, merged);
    }
  }, [dmHistory, combatLog, roomId]); // intentionally omit events to avoid loop

  // Track character levels for auto-generating level-up events
  const prevLevelsRef = useRef<Record<string, number>>({});
  useEffect(() => {
    for (const char of characters) {
      const prevLevel = prevLevelsRef.current[char.name];
      if (prevLevel && prevLevel < char.level) {
        const lvlEvent: TimelineEvent = {
          id: `levelup-${char.name}-${char.level}-${Date.now()}`,
          type: 'levelup',
          title: `${char.name} reaches level ${char.level}!`,
          description: `${char.name} the ${char.class} has grown stronger.`,
          timestamp: Date.now(),
          icon: EVENT_STYLE.levelup.icon,
          color: EVENT_STYLE.levelup.color,
        };
        setEvents((prev) => {
          const updated = [...prev, lvlEvent].slice(-MAX_EVENTS);
          saveTimeline(roomId, updated);
          return updated;
        });
      }
      prevLevelsRef.current[char.name] = char.level;
    }
  }, [characters, roomId]);

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return events;
    return events.filter((e) => e.type === filter);
  }, [events, filter]);

  const filters: { label: string; value: string }[] = [
    { label: 'All', value: 'all' },
    { label: '⚔️ Combat', value: 'combat' },
    { label: '📜 Story', value: 'narration' },
    { label: '⬆️ Levels', value: 'levelup' },
    { label: '💀 Deaths', value: 'death' },
    { label: '💰 Loot', value: 'loot' },
    { label: '🏆 Milestones', value: 'milestone' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700/50">
        <h3 className="text-sm font-semibold text-slate-200">
          Campaign Timeline
          {events.length > 0 && <span className="ml-1.5 text-xs text-slate-500">({events.length})</span>}
        </h3>
        {events.length > 0 && (
          <button
            onClick={() => { setEvents([]); saveTimeline(roomId, []); }}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-3 py-1.5 overflow-x-auto scrollbar-thin">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap transition-colors ${
              filter === f.value
                ? 'bg-[#F38020]/20 text-[#F38020] border border-[#F38020]/40'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No events yet</p>
            <p className="text-slate-600 text-xs mt-1">Events are recorded as you play</p>
          </div>
        ) : (
          [...filteredEvents].reverse().map((event, i) => {
            const style = EVENT_STYLE[event.type] || EVENT_STYLE.narration;
            return (
              <div key={event.id} className="flex gap-3 py-2 group">
                {/* Timeline line + dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border ${style.bg} shrink-0`}>
                    {event.icon}
                  </div>
                  {i < filteredEvents.length - 1 && (
                    <div className="w-px flex-1 bg-slate-700/40 min-h-4" />
                  )}
                </div>
                {/* Event content */}
                <div className="flex-1 min-w-0 pb-2">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm font-medium ${style.color}`}>{event.title}</span>
                    <span className="text-xs text-slate-600 shrink-0">{timeAgo(event.timestamp)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{event.description}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Live indicator */}
      {inCombat && (
        <div className="px-3 py-1.5 border-t border-red-500/20 bg-red-500/5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-red-400">Combat in progress — events recording live</span>
        </div>
      )}
    </div>
  );
}
