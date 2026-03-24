// SessionStreak — tracks consecutive sessions attended per campaign.
// Stored in localStorage. Shows a flame emoji streak counter.
// "You've been here for 7 sessions straight. The dedication is noted."
import { useState, useEffect } from 'react';

interface SessionStreakProps {
  roomId: string;
  playerName: string;
}

interface StreakData {
  count: number;
  lastSession: string; // ISO date
}

export default function SessionStreak({ roomId, playerName }: SessionStreakProps) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const key = `adventure:streak:${roomId}:${playerName}`;
    const today = new Date().toISOString().slice(0, 10);
    try {
      const raw = localStorage.getItem(key);
      const data: StreakData = raw ? JSON.parse(raw) : { count: 0, lastSession: '' };
      if (data.lastSession === today) {
        // Already counted today
        setStreak(data.count);
      } else {
        // New session
        const newCount = data.count + 1;
        localStorage.setItem(key, JSON.stringify({ count: newCount, lastSession: today }));
        setStreak(newCount);
      }
    } catch {
      setStreak(1);
    }
  }, [roomId, playerName]);

  if (streak <= 1) return null;

  const flames = streak >= 10 ? '🔥🔥🔥' : streak >= 5 ? '🔥🔥' : '🔥';

  return (
    <div className="flex items-center gap-1 text-[8px]" title={`${streak} consecutive sessions in this campaign`}>
      <span>{flames}</span>
      <span className="text-amber-400 font-bold">{streak}</span>
      <span className="text-slate-600">session streak</span>
    </div>
  );
}
