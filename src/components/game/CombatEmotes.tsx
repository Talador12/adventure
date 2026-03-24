// CombatEmotes — quick reaction emotes during combat.
// Players can react to rolls and actions with a tap. Broadcasts to all via game_event.
// The table's body language, digitized.
import { useState, useRef } from 'react';

const EMOTES = [
  { id: 'cheer', label: 'Nice!', icon: '🎉' },
  { id: 'gasp', label: 'No...', icon: '😱' },
  { id: 'laugh', label: 'Ha!', icon: '😂' },
  { id: 'salute', label: 'GG', icon: '⚔️' },
  { id: 'think', label: 'Hmm', icon: '🤔' },
  { id: 'skull', label: 'RIP', icon: '💀' },
];

interface EmoteDisplay {
  id: string;
  icon: string;
  sender: string;
}

interface CombatEmotesProps {
  onSend: (emoteId: string) => void;
  incoming: EmoteDisplay | null;
}

export function useCombatEmotes(broadcastGameEvent: (event: string, data: Record<string, unknown>) => void, playerName: string) {
  const [incoming, setIncoming] = useState<EmoteDisplay | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const send = (emoteId: string) => {
    const emote = EMOTES.find((e) => e.id === emoteId);
    if (!emote) return;
    broadcastGameEvent('combat_emote', { emoteId, icon: emote.icon, sender: playerName });
    // Show own emote too
    setIncoming({ id: crypto.randomUUID().slice(0, 6), icon: emote.icon, sender: playerName });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIncoming(null), 2000);
  };

  const receive = (icon: string, sender: string) => {
    setIncoming({ id: crypto.randomUUID().slice(0, 6), icon, sender });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIncoming(null), 2000);
  };

  return { incoming, send, receive };
}

export default function CombatEmotes({ onSend, incoming }: CombatEmotesProps) {
  return (
    <div className="relative">
      <div className="flex gap-1">
        {EMOTES.map((e) => (
          <button
            key={e.id}
            onClick={() => onSend(e.id)}
            className="w-7 h-7 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-slate-600 flex items-center justify-center text-sm transition-all active:scale-90"
            title={e.label}
          >
            {e.icon}
          </button>
        ))}
      </div>
      {incoming && (
        <div key={incoming.id} className="absolute -top-10 left-1/2 -translate-x-1/2 animate-pop-in pointer-events-none">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800/90 border border-slate-700 shadow-lg">
            <span className="text-lg">{incoming.icon}</span>
            <span className="text-[8px] text-slate-400">{incoming.sender}</span>
          </div>
        </div>
      )}
    </div>
  );
}
