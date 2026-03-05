// ChatPanel — real-time chat with roll announcements and system messages.
import { useState, useRef, useEffect } from 'react';

export type ChatMessageType = 'chat' | 'roll' | 'system' | 'join' | 'leave' | 'dm';

export interface ChatMessage {
  id: string;
  type: ChatMessageType;
  playerId?: string;
  username: string;
  text: string;
  timestamp: number;
  // Roll-specific fields
  die?: string;
  value?: number;
  isCritical?: boolean;
  isFumble?: boolean;
  unitName?: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  currentPlayerId?: string;
}

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function DmMessage({ msg }: { msg: ChatMessage }) {
  return (
    <div className="rounded-xl px-4 py-3 border border-amber-600/30 bg-gradient-to-br from-amber-950/40 to-stone-900/60 shadow-md">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-amber-400 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline">
            <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5z" clipRule="evenodd" />
          </svg>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Dungeon Master</span>
        <span className="text-[9px] text-amber-700/60">{formatTime(msg.timestamp)}</span>
      </div>
      <p className="text-sm text-amber-100/90 leading-relaxed italic">{msg.text}</p>
    </div>
  );
}

function RollMessage({ msg }: { msg: ChatMessage }) {
  const isCrit = msg.isCritical;
  const isFumble = msg.isFumble;

  return (
    <div className={`rounded-lg px-3 py-2 text-xs border ${isCrit ? 'bg-yellow-500/10 border-yellow-500/30' : isFumble ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-800/60 border-slate-700/50'}`}>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-300">{msg.username}</span>
        <span className="text-slate-600">rolled</span>
        <span className={`font-bold text-lg ${isCrit ? 'text-yellow-400' : isFumble ? 'text-red-400' : 'text-white'}`}>{msg.value}</span>
        <span className="text-slate-500">({msg.die})</span>
        {msg.unitName && <span className="text-slate-600">for {msg.unitName}</span>}
      </div>
      {isCrit && <div className="text-yellow-400 font-bold text-[10px] uppercase tracking-wider mt-0.5">Critical Hit!</div>}
      {isFumble && <div className="text-red-400 font-bold text-[10px] uppercase tracking-wider mt-0.5">Critical Fail!</div>}
    </div>
  );
}

export default function ChatPanel({ messages, onSend, currentPlayerId }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 shrink-0">Chat</h2>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
        {messages.length === 0 && <div className="text-xs text-slate-600 text-center py-8">No messages yet. Say hello!</div>}

        {messages.map((msg) => {
          if (msg.type === 'dm') {
            return <DmMessage key={msg.id} msg={msg} />;
          }

          if (msg.type === 'roll') {
            return <RollMessage key={msg.id} msg={msg} />;
          }

          if (msg.type === 'system' || msg.type === 'join' || msg.type === 'leave') {
            return (
              <div key={msg.id} className="text-[11px] text-slate-600 text-center py-0.5 italic">
                {msg.text}
              </div>
            );
          }

          // Regular chat message
          const isMe = msg.playerId === currentPlayerId;
          return (
            <div key={msg.id} className={`flex flex-col gap-0.5 ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold ${isMe ? 'text-[#F38020]' : 'text-slate-400'}`}>{msg.username}</span>
                <span className="text-[9px] text-slate-600">{formatTime(msg.timestamp)}</span>
              </div>
              <div className={`px-3 py-1.5 rounded-xl text-xs max-w-[85%] ${isMe ? 'bg-[#F38020]/20 text-slate-100 rounded-br-sm' : 'bg-slate-800 text-slate-300 rounded-bl-sm'}`}>{msg.text}</div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="mt-3 shrink-0 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 placeholder-slate-600 focus:ring-1 focus:ring-[#F38020] focus:border-[#F38020] outline-none" onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
        <button onClick={handleSend} disabled={!input.trim()} className="px-3 py-2 bg-[#F38020] hover:bg-[#e06a10] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium rounded transition-colors">
          Send
        </button>
      </div>
    </div>
  );
}
