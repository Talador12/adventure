// ChatPanel — real-time chat with roll announcements and system messages.
import { useState, useRef, useEffect } from 'react';

export type ChatMessageType = 'chat' | 'roll' | 'system' | 'join' | 'leave' | 'dm' | 'whisper';

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
  // Whisper-specific fields
  targetUsername?: string; // who the whisper is addressed to
  targetPlayerId?: string;
}

// Parse /roll commands: /roll d20, /roll 2d6+3, /roll adv, /roll disadv, /roll 4d6kh3
export interface SlashRollResult {
  notation: string;
  rolls: number[];
  modifier: number;
  total: number;
  kept?: number[];      // for keep-highest/lowest
  advantage?: boolean;
  disadvantage?: boolean;
}

export function parseSlashRoll(input: string): SlashRollResult | null {
  const text = input.trim().toLowerCase();
  // /roll adv or /roll advantage
  if (text === 'adv' || text === 'advantage') {
    const r1 = Math.floor(Math.random() * 20) + 1;
    const r2 = Math.floor(Math.random() * 20) + 1;
    return { notation: '2d20kh1 (advantage)', rolls: [r1, r2], modifier: 0, total: Math.max(r1, r2), kept: [Math.max(r1, r2)], advantage: true };
  }
  // /roll disadv or /roll disadvantage
  if (text === 'disadv' || text === 'disadvantage') {
    const r1 = Math.floor(Math.random() * 20) + 1;
    const r2 = Math.floor(Math.random() * 20) + 1;
    return { notation: '2d20kl1 (disadvantage)', rolls: [r1, r2], modifier: 0, total: Math.min(r1, r2), kept: [Math.min(r1, r2)], disadvantage: true };
  }
  // Parse XdY+Z or XdYkhN or XdYklN
  const match = text.match(/^(\d*)d(\d+)(?:kh(\d+)|kl(\d+))?(?:\s*([+-])\s*(\d+))?$/);
  if (!match) return null;
  const count = parseInt(match[1] || '1', 10);
  const sides = parseInt(match[2], 10);
  const keepHigh = match[3] ? parseInt(match[3], 10) : null;
  const keepLow = match[4] ? parseInt(match[4], 10) : null;
  const modSign = match[5] === '-' ? -1 : 1;
  const modVal = match[6] ? parseInt(match[6], 10) * modSign : 0;
  if (count < 1 || count > 100 || sides < 1 || sides > 100) return null;

  const rolls: number[] = [];
  for (let i = 0; i < count; i++) rolls.push(Math.floor(Math.random() * sides) + 1);

  let kept: number[] | undefined;
  let sum: number;
  if (keepHigh) {
    kept = [...rolls].sort((a, b) => b - a).slice(0, keepHigh);
    sum = kept.reduce((a, b) => a + b, 0);
  } else if (keepLow) {
    kept = [...rolls].sort((a, b) => a - b).slice(0, keepLow);
    sum = kept.reduce((a, b) => a + b, 0);
  } else {
    sum = rolls.reduce((a, b) => a + b, 0);
  }

  const notation = `${count}d${sides}${keepHigh ? `kh${keepHigh}` : ''}${keepLow ? `kl${keepLow}` : ''}${modVal ? (modVal > 0 ? `+${modVal}` : `${modVal}`) : ''}`;
  return { notation, rolls, modifier: modVal, total: sum + modVal, kept };
}

interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  onSlashRoll?: (result: SlashRollResult) => void;
  onWhisper?: (targetUsername: string, message: string) => void;
  onTyping?: () => void;
  typingUsers?: string[]; // usernames of people currently typing
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

export default function ChatPanel({ messages, onSend, onSlashRoll, onWhisper, onTyping, typingUsers, currentPlayerId }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [newMsgCount, setNewMsgCount] = useState(0);
  const typingThrottleRef = useRef<number>(0);

  // Track scroll position to decide auto-scroll behavior
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 40;
    setIsAtBottom(atBottom);
    if (atBottom) setNewMsgCount(0);
  };

  // Auto-scroll only if user is already at bottom
  useEffect(() => {
    if (isAtBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else {
      setNewMsgCount((n) => n + 1);
    }
  }, [messages.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setNewMsgCount(0);
      setIsAtBottom(true);
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    // Slash commands
    if (text.startsWith('/roll ') || text === '/roll') {
      const arg = text.slice(6).trim();
      if (!arg) {
        // bare /roll = d20
        const result = parseSlashRoll('d20');
        if (result) onSlashRoll?.(result);
      } else {
        const result = parseSlashRoll(arg);
        if (result) {
          onSlashRoll?.(result);
        } else {
          onSend(`[Invalid roll: ${arg}]`);
        }
      }
      setInput('');
      return;
    }
    if (text.startsWith('/me ')) {
      onSend(`*${text.slice(4)}*`);
      setInput('');
      return;
    }
    // Whisper: /whisper @username message OR /w @username message
    const whisperMatch = text.match(/^\/(?:whisper|w)\s+@(\S+)\s+(.+)$/);
    if (whisperMatch && onWhisper) {
      onWhisper(whisperMatch[1], whisperMatch[2]);
      setInput('');
      return;
    }
    onSend(text);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 shrink-0">Chat</h2>

      {/* Messages */}
      <div className="flex-1 relative min-h-0">
        <div ref={scrollRef} onScroll={handleScroll} className="absolute inset-0 overflow-y-auto space-y-1 pr-1">
          {messages.length === 0 && <div className="text-xs text-slate-600 text-center py-8">No messages yet. Say hello!</div>}

          {messages.map((msg, idx) => {
            if (msg.type === 'dm') {
              return <DmMessage key={msg.id} msg={msg} />;
            }

            if (msg.type === 'roll') {
              return <RollMessage key={msg.id} msg={msg} />;
            }

            if (msg.type === 'whisper') {
              const isSender = msg.playerId === currentPlayerId;
              return (
                <div key={msg.id} className="rounded-lg px-3 py-2 border border-pink-700/30 bg-pink-950/20 text-xs">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-bold text-pink-400 uppercase tracking-wider">Whisper</span>
                    <span className="text-pink-300 font-semibold text-[10px]">
                      {isSender ? `To ${msg.targetUsername}` : `From ${msg.username}`}
                    </span>
                    <span className="text-[9px] text-pink-700/60 ml-auto">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className="text-pink-200/90 text-xs">{msg.text}</p>
                </div>
              );
            }

            if (msg.type === 'system' || msg.type === 'join' || msg.type === 'leave') {
              return (
                <div key={msg.id} className="text-[11px] text-slate-600 text-center py-0.5 italic">
                  {msg.text}
                </div>
              );
            }

            // Message grouping — skip avatar/name if same sender as previous chat message
            const prev = idx > 0 ? messages[idx - 1] : null;
            const isGrouped = prev && prev.type === 'chat' && prev.playerId === msg.playerId && (msg.timestamp - prev.timestamp < 60000);
            const isMe = msg.playerId === currentPlayerId;

            if (isGrouped) {
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${isMe ? 'mr-8' : 'ml-8'}`}>
                    <div className={`px-3 py-1 rounded-xl text-xs max-w-[85%] ${isMe ? 'bg-[#F38020]/20 text-slate-100 rounded-br-sm' : 'bg-slate-800 text-slate-300 rounded-bl-sm'}`}>{msg.text}</div>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''} ${isGrouped ? '' : 'mt-1'}`}>
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

        {/* Scroll-to-bottom indicator */}
        {!isAtBottom && newMsgCount > 0 && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#F38020] text-white text-[10px] font-semibold rounded-full shadow-lg hover:bg-[#e06a10] transition-colors z-10 animate-fade-in-up"
          >
            {newMsgCount} new message{newMsgCount > 1 ? 's' : ''} ↓
          </button>
        )}
      </div>

      {/* Typing indicator */}
      {typingUsers && typingUsers.length > 0 && (
        <div className="mt-1 shrink-0 text-[10px] text-slate-500 italic h-4 truncate">
          {typingUsers.length === 1
            ? `${typingUsers[0]} is typing...`
            : typingUsers.length === 2
              ? `${typingUsers[0]} and ${typingUsers[1]} are typing...`
              : `${typingUsers[0]} and ${typingUsers.length - 1} others are typing...`}
        </div>
      )}

      {/* Input */}
      <div className="mt-3 shrink-0 flex gap-2">
        <input type="text" value={input} onChange={(e) => {
          setInput(e.target.value);
          // Throttled typing indicator — max once per 2s
          if (onTyping && e.target.value.trim() && Date.now() - typingThrottleRef.current > 2000) {
            typingThrottleRef.current = Date.now();
            onTyping();
          }
        }} placeholder="Type a message... (/roll, /me, /w @name)" className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 placeholder-slate-600 focus:ring-1 focus:ring-[#F38020] focus:border-[#F38020] outline-none" onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
        <button onClick={handleSend} disabled={!input.trim()} className="px-3 py-2 bg-[#F38020] hover:bg-[#e06a10] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium rounded transition-colors">
          Send
        </button>
      </div>
    </div>
  );
}
