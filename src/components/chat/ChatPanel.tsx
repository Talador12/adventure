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
  avatar?: string; // Discord avatar URL
  // Roll-specific fields
  die?: string;
  sides?: number;
  value?: number;
  isCritical?: boolean;
  isFumble?: boolean;
  unitName?: string;
  characterName?: string; // In-game character name (distinct from player username)
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
  const isNpc = msg.username !== 'Dungeon Master';
  return (
    <div className={`rounded-xl px-4 py-3 border shadow-md ${isNpc ? 'border-purple-600/30 bg-gradient-to-br from-purple-950/40 to-slate-900/60' : 'border-amber-600/30 bg-gradient-to-br from-amber-950/40 to-stone-900/60'}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`text-xs ${isNpc ? 'text-purple-400' : 'text-amber-400'}`}>
          {isNpc ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline"><path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 3.976 1 5.365v2.171c0 1.388.993 2.61 2.43 2.841A41.587 41.587 0 0010 11c2.233 0 4.412-.187 6.57-.623C18.007 10.146 19 8.924 19 7.536V5.365c0-1.389-.993-2.61-2.43-2.841A41.587 41.587 0 0010 2zM1 13.694v-1.358C2.32 13.107 4.106 13.5 6 13.695v.705A4.5 4.5 0 011.5 18H1v-4.306zM14 14.4v-.705c1.894-.196 3.68-.588 5-1.36v1.359L19 18h-.5A4.5 4.5 0 0114 14.4z" clipRule="evenodd" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline"><path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5z" clipRule="evenodd" /></svg>
          )}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isNpc ? 'text-purple-400' : 'text-amber-500'}`}>{msg.username}</span>
        <span className={`text-[9px] ${isNpc ? 'text-purple-700/60' : 'text-amber-700/60'}`}>{formatTime(msg.timestamp)}</span>
      </div>
      <p className={`text-sm leading-relaxed ${isNpc ? 'text-purple-100/90' : 'text-amber-100/90 italic'}`}>{msg.text}</p>
    </div>
  );
}

function RollMessage({ msg }: { msg: ChatMessage }) {
  const isCrit = msg.isCritical;
  const isFumble = msg.isFumble;
  const displayName = msg.characterName || msg.unitName || msg.username;
  const showPlayer = msg.characterName && msg.username && msg.characterName !== msg.username;

  return (
    <div className={`rounded-lg px-3 py-2.5 text-xs border ${
      isCrit
        ? 'bg-gradient-to-r from-yellow-500/15 to-amber-500/10 border-yellow-500/40 shadow-sm shadow-yellow-500/10'
        : isFumble
          ? 'bg-gradient-to-r from-red-500/15 to-red-900/10 border-red-500/40 shadow-sm shadow-red-500/10'
          : 'bg-slate-800/60 border-slate-700/50'
    }`}>
      {/* Attribution line */}
      <div className="flex items-center gap-1 mb-1">
        <span className={`font-bold ${isCrit ? 'text-yellow-300' : isFumble ? 'text-red-300' : 'text-amber-200'}`}>{displayName}</span>
        {showPlayer && <span className="text-slate-500 text-[10px]">[{msg.username}]</span>}
      </div>
      {/* Roll result */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500">rolled</span>
        <span className={`font-mono font-bold px-1.5 py-0.5 rounded ${
          isCrit ? 'text-yellow-300 bg-yellow-500/20' : isFumble ? 'text-red-300 bg-red-500/20' : 'text-white bg-slate-700/50'
        }`}>{msg.die?.toUpperCase()}</span>
        <span className="text-slate-500">for</span>
        <span className={`font-black text-lg ${isCrit ? 'text-yellow-400' : isFumble ? 'text-red-400' : 'text-white'}`}>{msg.value}</span>
      </div>
      {/* Crit/fumble flair */}
      {isCrit && (
        <div className="mt-1 text-yellow-400 font-black text-[11px] uppercase tracking-widest" style={{ textShadow: '0 0 8px rgba(250,204,21,0.4)' }}>
          CRITICAL HIT!
        </div>
      )}
      {isFumble && (
        <div className="mt-1 text-red-400 font-black text-[11px] uppercase tracking-widest" style={{ textShadow: '0 0 8px rgba(239,68,68,0.4)' }}>
          CRITICAL FAIL!
        </div>
      )}
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
            <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              {msg.avatar ? (
                <img src={msg.avatar} alt="" className="w-6 h-6 rounded-full shrink-0 mt-0.5" />
              ) : (
                <div className={`w-6 h-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-[9px] font-bold ${isMe ? 'bg-[#F38020]/30 text-[#F38020]' : 'bg-slate-700 text-slate-400'}`}>
                  {msg.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={`flex flex-col gap-0.5 ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-semibold ${isMe ? 'text-[#F38020]' : 'text-slate-400'}`}>{msg.username}</span>
                  <span className="text-[9px] text-slate-600">{formatTime(msg.timestamp)}</span>
                </div>
                <div className={`px-3 py-1.5 rounded-xl text-xs max-w-[85%] ${isMe ? 'bg-[#F38020]/20 text-slate-100 rounded-br-sm' : 'bg-slate-800 text-slate-300 rounded-bl-sm'}`}>{msg.text}</div>
              </div>
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
