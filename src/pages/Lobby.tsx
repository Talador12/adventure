import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';
import { useToast } from '../components/ui/toast';
import { Button } from '../components/ui/button';
import ChatPanel, { type ChatMessage } from '../components/chat/ChatPanel';
import DiceRoller, { type DiceRollerHandle, type LocalRollResult } from '../components/dice/DiceRoller';
import DoodlePad, { type DoodlePadHandle, type DoodleStroke } from '../components/lobby/DoodlePad';
import { useWebSocket, type WSMessage } from '../hooks/useWebSocket';
import { useGame, type DieType } from '../contexts/GameContext';

interface LobbyPlayer {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: number;
  isDM?: boolean;
}

export default function Lobby() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentPlayer } = useGame();
  const room = roomId || 'default';
  const roomLink = `${window.location.origin}/lobby/${room}`;

  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [wsPlayerId, setWsPlayerId] = useState<string | null>(null);
  const [isDM, setIsDM] = useState(false);
  const [dmPlayerId, setDmPlayerId] = useState<string | null>(null);
  const diceRef = useRef<DiceRollerHandle>(null);
  const doodleRef = useRef<DoodlePadHandle>(null);
  const [drawingPlayer, setDrawingPlayer] = useState<string | null>(null);
  const drawingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track optimistic message IDs so we can deduplicate server echoes
  const pendingChatIds = useRef<Set<string>>(new Set());

  // WebSocket message handler
  const handleWsMessage = useCallback((msg: WSMessage) => {
    switch (msg.type) {
      case 'welcome':
        setWsPlayerId(msg.playerId as string);
        setPlayers(msg.players as LobbyPlayer[]);
        setIsDM(msg.isDM as boolean ?? false);
        if (msg.dmPlayerId) setDmPlayerId(msg.dmPlayerId as string);
        setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'system', username: 'System', text: 'Connected to lobby', timestamp: Date.now() }]);
        // Replay doodle pad stroke history from server (late-join catch-up)
        if (Array.isArray(msg.strokeHistory) && msg.strokeHistory.length > 0) {
          // Small delay to ensure canvas is mounted and sized
          setTimeout(() => {
            doodleRef.current?.replayStrokes(msg.strokeHistory as DoodleStroke[]);
          }, 100);
        }
        break;

      case 'player_joined':
        setPlayers(msg.players as LobbyPlayer[]);
        setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'join', username: msg.username as string, text: `${msg.username} joined the lobby`, timestamp: msg.timestamp as number }]);
        break;

      case 'player_reconnected':
        setPlayers(msg.players as LobbyPlayer[]);
        setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'join', username: msg.username as string, text: `${msg.username} reconnected`, timestamp: msg.timestamp as number }]);
        break;

      case 'player_left':
        setPlayers(msg.players as LobbyPlayer[]);
        setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'leave', username: msg.username as string, text: `${msg.username} left the lobby`, timestamp: msg.timestamp as number }]);
        break;

      case 'dm_changed':
        setDmPlayerId(msg.dmPlayerId as string);
        setIsDM(msg.dmPlayerId === wsPlayerId);
        setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'system', username: 'System', text: `${msg.dmUsername} is now the DM`, timestamp: msg.timestamp as number }]);
        break;

      case 'chat': {
        const incomingPlayerId = msg.playerId as string;
        // If this is the server echo of our own optimistic message, skip it
        if (incomingPlayerId === wsPlayerId) {
          // Check if we have a pending optimistic message with the same text
          const msgText = msg.message as string;
          const matchKey = `${incomingPlayerId}:${msgText}`;
          if (pendingChatIds.current.has(matchKey)) {
            pendingChatIds.current.delete(matchKey);
            return; // deduplicated — already shown optimistically
          }
        }
        setChatMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: 'chat',
            playerId: incomingPlayerId,
            username: msg.username as string,
            avatar: msg.avatar as string | undefined,
            text: msg.message as string,
            timestamp: msg.timestamp as number,
          },
        ]);
        break;
      }

      case 'roll_result': {
        // Show roll in chat
        setChatMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: 'roll',
            playerId: msg.playerId as string,
            username: msg.username as string,
            avatar: msg.avatar as string | undefined,
            text: '',
            timestamp: msg.timestamp as number,
            die: msg.die as string,
            sides: msg.sides as number,
            value: msg.value as number,
            isCritical: msg.isCritical as boolean,
            isFumble: msg.isFumble as boolean,
            unitName: msg.unitName as string | undefined,
          },
        ]);
        // Play dice animation for everyone
        diceRef.current?.playRemoteRoll({
          die: msg.die as DieType,
          sides: msg.sides as number,
          value: msg.value as number,
          playerName: msg.username as string,
          unitName: msg.unitName as string | undefined,
        });
        break;
      }

      case 'draw':
        // Remote doodle stroke from another player
        doodleRef.current?.drawRemote({
          x1: msg.x1 as number, y1: msg.y1 as number,
          x2: msg.x2 as number, y2: msg.y2 as number,
          color: msg.color as string, width: msg.width as number,
        });
        // Show "X is drawing..." indicator (debounced — clears after 1s of no strokes)
        if (msg.username) {
          setDrawingPlayer(msg.username as string);
          if (drawingTimerRef.current) clearTimeout(drawingTimerRef.current);
          drawingTimerRef.current = setTimeout(() => setDrawingPlayer(null), 1000);
        }
        break;

      case 'clear_canvas':
        doodleRef.current?.clearRemote();
        break;
    }
  }, [wsPlayerId]);

  const { status, send } = useWebSocket({
    roomId: room,
    username: currentPlayer.username,
    avatar: currentPlayer.avatar,
    onMessage: handleWsMessage,
  });

  const handleChatSend = useCallback(
    (text: string) => {
      // Optimistic local display: show immediately regardless of WS state
      const playerId = wsPlayerId || currentPlayer.id;
      const dedupKey = `${playerId}:${text}`;
      pendingChatIds.current.add(dedupKey);
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'chat',
          playerId,
          username: currentPlayer.username,
          avatar: currentPlayer.avatar,
          text,
          timestamp: Date.now(),
        },
      ]);
      // Send to server (if connected, it'll broadcast to others + echo back, which we deduplicate)
      send({ type: 'chat', message: text });
      // Clean up stale dedup keys after 5s (in case server never echoes)
      setTimeout(() => pendingChatIds.current.delete(dedupKey), 5000);
    },
    [send, wsPlayerId, currentPlayer.id, currentPlayer.username]
  );

  const handleLocalRoll = useCallback(
    (die: DieType, sides: number) => {
      send({ type: 'roll', die, sides: sides });
    },
    [send]
  );

  // Fun default names for lobby (no character selected yet)
  const LOBBY_DEFAULTS = ['A Curious Onlooker', 'Someone at the Bar', 'The Innkeeper\'s Cat', 'A Dice-Obsessed Patron', 'Definitely Not a Mimic'];
  const funDefault = () => LOBBY_DEFAULTS[Math.floor(Math.random() * LOBBY_DEFAULTS.length)];

  // Handle local (offline) roll — add to chat history even without WebSocket
  const handleRollComplete = useCallback(
    (roll: LocalRollResult) => {
      const playerName = currentPlayer.username || funDefault();
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'roll',
          playerId: currentPlayer.id,
          username: playerName,
          text: '',
          timestamp: Date.now(),
          die: roll.die,
          sides: roll.sides,
          value: roll.value,
          isCritical: roll.isCritical,
          isFumble: roll.isFumble,
          unitName: roll.unitName,
        },
      ]);
    },
    [currentPlayer]
  );

  const handleDoodleStroke = useCallback(
    (stroke: DoodleStroke) => {
      send({ type: 'draw', ...stroke });
    },
    [send]
  );

  const handleDoodleClear = useCallback(() => {
    send({ type: 'clear_canvas' });
  }, [send]);

  const copyLink = () => {
    navigator.clipboard.writeText(roomLink).then(() => toast('Link copied!', 'success'));
  };

  const statusColor = status === 'connected' ? 'bg-green-500' : status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500';

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-slate-400 hover:text-white">
            &larr; Home
          </Button>
          <h1 className="text-lg font-bold text-[#F38020]">Lobby</h1>
          <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">Room: {room}</span>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${statusColor}`} />
            <span className="text-[10px] text-slate-500">{status}</span>
          </div>
        </div>
        <Button variant="ghost" onClick={() => navigate(`/game/${room}`)} className="text-[#F38020] hover:text-white">
          Start Game &rarr;
        </Button>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left side: player list + activity area (doodle/dice) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Player list bar */}
          <div className="bg-slate-900/50 border-b border-slate-800 px-4 py-3 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Players ({players.length})</h2>
              <button onClick={copyLink} className="flex items-center gap-2 cursor-pointer group" title="Click to copy invite link">
                <span className="text-xs text-slate-600">Invite:</span>
                <code className="text-[10px] bg-slate-800 px-2 py-1 rounded text-[#F38020] group-hover:text-[#f9a05f] transition-colors select-all">{roomLink}</code>
                <span className="text-sm group-hover:scale-110 transition-transform">&#x1F4CB;</span>
              </button>
            </div>
            {players.length === 0 ? (
              <div className="text-xs text-slate-600">Waiting for players to connect...</div>
            ) : (
              <div className="flex gap-3 overflow-x-auto">
                {players.map((p) => (
                  <div key={p.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${p.id === wsPlayerId ? 'border-[#F38020]/50 bg-[#F38020]/10' : 'border-slate-700 bg-slate-800/50'}`}>
                    {p.avatar ? (
                      <img src={p.avatar} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">{p.username.charAt(0).toUpperCase()}</div>
                    )}
                    <span className="font-medium text-slate-200">{p.username}</span>
                    {p.isDM && <span className="text-[9px] text-amber-400 font-bold">DM</span>}
                    {p.id === wsPlayerId && <span className="text-[9px] text-[#F38020]">(you)</span>}
                    {/* Transfer DM button — shown to current DM on non-DM players */}
                    {isDM && !p.isDM && p.id !== wsPlayerId && (
                      <button
                        onClick={() => send({ type: 'transfer_dm', targetPlayerId: p.id })}
                        className="text-[8px] px-1.5 py-0.5 rounded bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/40 text-amber-400 font-semibold transition-all ml-1"
                        title={`Make ${p.username} the DM`}
                      >
                        Make DM
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dice + Doodle Pad side by side */}
          <div className="flex-1 flex overflow-hidden">
            {/* Dice roller — left */}
            <div className="w-64 shrink-0 border-r border-slate-800 p-4 flex flex-col items-center overflow-y-auto">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Dice</h3>
              <DiceRoller ref={diceRef} onLocalRoll={handleLocalRoll} onRollComplete={handleRollComplete} useServerRolls={status === 'connected'} compact />
            </div>
            {/* Doodle pad — fills remaining space, synced via WebSocket */}
            <div className="flex-1 overflow-hidden relative">
              <DoodlePad ref={doodleRef} onStroke={handleDoodleStroke} onClear={handleDoodleClear} />
              {drawingPlayer && (
                <div className="absolute bottom-2 left-3 px-2 py-1 bg-slate-800/80 border border-slate-700/50 rounded-lg text-[10px] text-slate-400 pointer-events-none animate-pulse">
                  {drawingPlayer} is drawing...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar: chat */}
        <div className="w-80 border-l border-slate-800 bg-slate-900 flex flex-col p-4 shrink-0 overflow-hidden">
          <ChatPanel messages={chatMessages} onSend={handleChatSend} currentPlayerId={wsPlayerId || undefined} />
        </div>
      </div>
    </div>
  );
}
