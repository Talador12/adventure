import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useToast } from '../components/ui/toast';
import { Button } from '../components/ui/button';
import ChatPanel, { type ChatMessage } from '../components/chat/ChatPanel';
import DiceRoller, { type DiceRollerHandle, type LocalRollResult } from '../components/dice/DiceRoller';
import DoodlePad, { type DoodlePadHandle, type DoodleStroke } from '../components/lobby/DoodlePad';
import { useWebSocket, type WSMessage } from '../hooks/useWebSocket';
import { useGame, type DieType } from '../contexts/GameContext';
import { loadChatHistory, persistChatMessage } from '../lib/chatApi';

interface LobbyPlayer {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: number;
  isDM?: boolean;
  seatId?: string;
  ready?: boolean;
  characterId?: string;
  characterName?: string;
}

type SeatType = 'human' | 'ai' | 'empty';

interface Seat {
  id: string;
  type: SeatType;
  playerId?: string;
  username?: string;
  avatar?: string;
  characterId?: string;
  characterName?: string;
  ready: boolean;
}

export default function Lobby() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentPlayer, characters } = useGame();
  const room = roomId || 'default';
  const roomLink = `${window.location.origin}/lobby/${room}`;

  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [dmSeatType, setDmSeatType] = useState<'human' | 'ai'>('human');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [wsPlayerId, setWsPlayerId] = useState<string | null>(null);
  const [mySeatId, setMySeatId] = useState<string | null>(null);
  const [isDM, setIsDM] = useState(false);
  const [dmPlayerId, setDmPlayerId] = useState<string | null>(null);
  const diceRef = useRef<DiceRollerHandle>(null);
  const doodleRef = useRef<DoodlePadHandle>(null);
  const [drawingPlayer, setDrawingPlayer] = useState<string | null>(null);
  const drawingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track optimistic message IDs so we can deduplicate server echoes
  const pendingChatIds = useRef<Set<string>>(new Set());

  // Load persistent chat history from D1 on mount
  useEffect(() => {
    loadChatHistory(room).then((history) => {
      if (history.length > 0) {
        setChatMessages((prev) => {
          // Deduplicate: only add messages not already in state (by id)
          const existingIds = new Set(prev.map((m) => m.id));
          const newMsgs = history.filter((m) => !existingIds.has(m.id));
          return newMsgs.length > 0 ? [...newMsgs, ...prev] : prev;
        });
      }
    });
  }, [room]);

  // WebSocket message handler
  const handleWsMessage = useCallback(
    (msg: WSMessage) => {
      switch (msg.type) {
        case 'welcome':
          setWsPlayerId(msg.playerId as string);
          setPlayers(msg.players as LobbyPlayer[]);
          if (Array.isArray(msg.seats)) setSeats(msg.seats as Seat[]);
          if (msg.dmSeatType) setDmSeatType(msg.dmSeatType as 'human' | 'ai');
          if (msg.seatId) setMySeatId(msg.seatId as string);
          setIsDM((msg.isDM as boolean) ?? false);
          if (msg.dmPlayerId) setDmPlayerId(msg.dmPlayerId as string);
          setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'system', username: 'System', text: 'Connected to lobby', timestamp: Date.now() }]);
          // Auto-join campaign party in D1 (fire-and-forget)
          fetch(`/api/party/${encodeURIComponent(room)}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ role: msg.isDM ? 'dm' : 'player' }),
          }).catch(() => {});
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
          if (Array.isArray(msg.seats)) setSeats(msg.seats as Seat[]);
          setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'join', username: msg.username as string, text: `${msg.username} joined the lobby`, timestamp: msg.timestamp as number }]);
          break;

        case 'player_reconnected':
          setPlayers(msg.players as LobbyPlayer[]);
          if (Array.isArray(msg.seats)) setSeats(msg.seats as Seat[]);
          setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'join', username: msg.username as string, text: `${msg.username} reconnected`, timestamp: msg.timestamp as number }]);
          break;

        case 'player_left':
          setPlayers(msg.players as LobbyPlayer[]);
          if (Array.isArray(msg.seats)) setSeats(msg.seats as Seat[]);
          setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'leave', username: msg.username as string, text: `${msg.username} left the lobby`, timestamp: msg.timestamp as number }]);
          break;

        case 'dm_changed':
          setDmPlayerId(msg.dmPlayerId as string);
          setIsDM(msg.dmPlayerId === wsPlayerId);
          setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'system', username: 'System', text: `${msg.dmUsername} is now the DM`, timestamp: msg.timestamp as number }]);
          break;

        case 'seats_updated':
          if (Array.isArray(msg.seats)) setSeats(msg.seats as Seat[]);
          break;

        case 'dm_type_changed':
          if (msg.dmSeatType) setDmSeatType(msg.dmSeatType as 'human' | 'ai');
          setDmPlayerId((msg.dmPlayerId as string) || null);
          setIsDM(!!msg.dmPlayerId && msg.dmPlayerId === wsPlayerId);
          break;

        case 'kicked':
          toast('You have been kicked by the DM', 'warning');
          navigate('/');
          break;

        case 'player_kicked':
          setPlayers(msg.players as LobbyPlayer[]);
          if (Array.isArray(msg.seats)) setSeats(msg.seats as Seat[]);
          setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'leave', username: msg.username as string, text: `${msg.username} was kicked by the DM`, timestamp: msg.timestamp as number }]);
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
          // Persist roll to D1 — only the roller persists
          if (msg.playerId === wsPlayerId) {
            persistChatMessage(room, {
              username: msg.username as string,
              type: 'roll',
              text: `rolled ${(msg.die as string)?.toUpperCase()} for ${msg.value}`,
              metadata: { die: msg.die, sides: msg.sides, value: msg.value, isCritical: msg.isCritical, isFumble: msg.isFumble, unitName: msg.unitName },
            });
          }
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
            x1: msg.x1 as number,
            y1: msg.y1 as number,
            x2: msg.x2 as number,
            y2: msg.y2 as number,
            color: msg.color as string,
            width: msg.width as number,
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
    },
    [wsPlayerId]
  );

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
      // Persist to D1 (fire-and-forget)
      persistChatMessage(room, { username: currentPlayer.username, type: 'chat', text, avatarUrl: currentPlayer.avatar });
      // Clean up stale dedup keys after 5s (in case server never echoes)
      setTimeout(() => pendingChatIds.current.delete(dedupKey), 5000);
    },
    [send, wsPlayerId, currentPlayer.id, currentPlayer.username, currentPlayer.avatar, room]
  );

  const handleLocalRoll = useCallback(
    (die: DieType, sides: number) => {
      send({ type: 'roll', die, sides: sides });
    },
    [send]
  );

  // Fun default names for lobby (no character selected yet)
  const LOBBY_DEFAULTS = ['A Curious Onlooker', 'Someone at the Bar', "The Innkeeper's Cat", 'A Dice-Obsessed Patron', 'Definitely Not a Mimic'];
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
      // Persist local roll to D1
      persistChatMessage(room, {
        username: playerName,
        type: 'roll',
        text: `rolled ${roll.die?.toUpperCase()} for ${roll.value}`,
        metadata: { die: roll.die, sides: roll.sides, value: roll.value, isCritical: roll.isCritical, isFumble: roll.isFumble, unitName: roll.unitName },
      });
    },
    [currentPlayer, room]
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

  // Campaign settings state
  const [campaignName, setCampaignName] = useState(room);
  const [campaignDescription, setCampaignDescription] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Load campaign metadata on mount
  useEffect(() => {
    fetch('/api/campaigns', { credentials: 'include' })
      .then((r) => (r.ok ? (r.json() as Promise<{ campaigns?: Array<{ roomId: string; name: string; description?: string }> }>) : null))
      .then((data) => {
        const campaign = data?.campaigns?.find((c) => c.roomId === room);
        if (campaign) {
          setCampaignName(campaign.name || room);
          setCampaignDescription(campaign.description || '');
        }
      })
      .catch(() => {});
  }, [room]);

  const saveCampaignSettings = useCallback(
    (name: string, description: string) => {
      fetch(`/api/campaigns/${encodeURIComponent(room)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, description }),
      }).catch(() => {});
    },
    [room]
  );

  // Start game: store seat character assignment in sessionStorage for Game.tsx to pick up
  const handleStartGame = useCallback(() => {
    if (mySeatId) {
      const seat = seats.find((s) => s.id === mySeatId);
      if (seat?.characterId) {
        try { sessionStorage.setItem(`adventure:seatCharId:${room}`, seat.characterId); } catch { /* ok */ }
      }
    }
    navigate(`/game/${room}`);
  }, [mySeatId, seats, room, navigate]);

  const statusColor = status === 'connected' ? 'bg-green-500' : status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500';

  // Compute ready-to-start: all occupied seats (human + AI) are ready
  const occupiedSeats = seats.filter((s) => s.type !== 'empty');
  const allReady = occupiedSeats.length > 0 && occupiedSeats.every((s) => s.ready);

  // My seat's ready state
  const mySeat = mySeatId ? seats.find((s) => s.id === mySeatId) : undefined;
  const myReady = mySeat?.ready ?? false;

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-slate-400 hover:text-white">
            &larr; Home
          </Button>
          {/* Campaign name — click to edit (DM only) */}
          {editingName ? (
            <input
              ref={nameInputRef}
              className="text-lg font-bold text-[#F38020] bg-slate-800 border border-[#F38020]/50 rounded px-2 py-0.5 outline-none w-48"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              onBlur={() => {
                setEditingName(false);
                if (campaignName.trim()) saveCampaignSettings(campaignName.trim(), campaignDescription);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditingName(false);
                  if (campaignName.trim()) saveCampaignSettings(campaignName.trim(), campaignDescription);
                }
                if (e.key === 'Escape') setEditingName(false);
              }}
              autoFocus
            />
          ) : (
            <h1
              className={`text-lg font-bold text-[#F38020] ${isDM ? 'cursor-pointer hover:text-[#f9a05f]' : ''}`}
              onClick={() => { if (isDM) { setEditingName(true); setTimeout(() => nameInputRef.current?.select(), 0); } }}
              title={isDM ? 'Click to rename campaign' : campaignName}
            >
              {campaignName}
            </h1>
          )}
          <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">Room: {room}</span>
          {isDM && (
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
              title="Campaign settings"
            >
              Settings
            </button>
          )}
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${statusColor}`} />
            <span className="text-[10px] text-slate-500">{status}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {allReady && <span className="text-[10px] text-emerald-400 font-semibold animate-pulse">All Ready</span>}
          <Button
            variant="default"
            onClick={handleStartGame}
            className={`font-semibold py-2 px-5 rounded-lg shadow transition-all active:scale-[0.98] ${
              allReady || isDM
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
            disabled={!allReady && !isDM}
            title={allReady ? 'Everyone is ready!' : isDM ? 'DM override — start anyway' : 'Waiting for all players to ready up'}
          >
            Start Game &rarr;
          </Button>
        </div>
      </header>

      {/* Campaign settings panel — collapsible, DM only */}
      {showSettings && isDM && (
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 shrink-0">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Campaign Settings</h3>
              <button onClick={() => setShowSettings(false)} className="text-xs text-slate-500 hover:text-slate-300">Close</button>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">Name</label>
                <input
                  className="w-full mt-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 outline-none focus:border-[#F38020]/50"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  onBlur={() => { if (campaignName.trim()) saveCampaignSettings(campaignName.trim(), campaignDescription); }}
                  maxLength={100}
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">Description</label>
                <input
                  className="w-full mt-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 outline-none focus:border-[#F38020]/50"
                  value={campaignDescription}
                  onChange={(e) => setCampaignDescription(e.target.value)}
                  onBlur={() => saveCampaignSettings(campaignName.trim() || room, campaignDescription)}
                  placeholder="Optional campaign description..."
                  maxLength={500}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider">Invite Link</label>
              <code className="text-[11px] bg-slate-800 px-3 py-1 rounded text-[#F38020] select-all flex-1">{roomLink}</code>
              <button onClick={copyLink} className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded border border-slate-700">Copy</button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left side: seat roster + activity area (doodle/dice) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Seat roster + invite bar */}
          <div className="bg-slate-900/50 border-b border-slate-800 px-4 py-3 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Party</h2>
                {/* DM seat badge */}
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-semibold border ${
                  dmSeatType === 'ai'
                    ? 'bg-violet-900/30 border-violet-700/40 text-violet-400'
                    : 'bg-amber-900/30 border-amber-700/40 text-amber-400'
                }`}>
                  <span>{dmSeatType === 'ai' ? '🤖' : '👑'}</span>
                  <span>DM: {dmSeatType === 'ai' ? 'AI' : players.find((p) => p.id === dmPlayerId)?.username || 'Waiting...'}</span>
                  {isDM && (
                    <button
                      onClick={() => send({ type: 'set_dm_type', dmSeatType: dmSeatType === 'human' ? 'ai' : 'human' })}
                      className="ml-1 px-1 py-0.5 rounded bg-slate-700/50 hover:bg-slate-600/50 text-[9px] text-slate-300"
                      title={dmSeatType === 'human' ? 'Switch to AI DM' : 'Switch to Human DM'}
                    >
                      {dmSeatType === 'human' ? '→ AI' : '→ Human'}
                    </button>
                  )}
                </div>
              </div>
              <button onClick={copyLink} className="flex items-center gap-2 cursor-pointer group" title="Click to copy invite link">
                <span className="text-xs text-slate-600">Invite:</span>
                <code className="text-[10px] bg-slate-800 px-2 py-1 rounded text-[#F38020] group-hover:text-[#f9a05f] transition-colors select-all">{roomLink}</code>
                <span className="text-sm group-hover:scale-110 transition-transform">&#x1F4CB;</span>
              </button>
            </div>

            {/* Seat grid */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {seats.map((seat) => (
                <div
                  key={seat.id}
                  className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg border min-w-[120px] transition-all ${
                    seat.type === 'human' && seat.playerId === wsPlayerId
                      ? 'border-[#F38020]/50 bg-[#F38020]/10'
                      : seat.type === 'ai'
                        ? 'border-violet-700/40 bg-violet-900/10'
                        : seat.type === 'human'
                          ? 'border-slate-700 bg-slate-800/50'
                          : 'border-slate-700/30 bg-slate-800/20 border-dashed'
                  }`}
                >
                  {/* Seat header: avatar + name */}
                  <div className="flex items-center gap-2 w-full">
                    {seat.type === 'human' && seat.avatar ? (
                      <img src={seat.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                    ) : seat.type === 'human' && seat.username ? (
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                        {seat.username.charAt(0).toUpperCase()}
                      </div>
                    ) : seat.type === 'ai' ? (
                      <div className="w-7 h-7 rounded-full bg-violet-800/50 flex items-center justify-center text-sm">🤖</div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-dashed border-slate-600 flex items-center justify-center text-[10px] text-slate-600">?</div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-slate-200 truncate">
                        {seat.type === 'human' ? seat.username || 'Joining...' : seat.type === 'ai' ? 'AI Player' : 'Empty Seat'}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {seat.characterName || (seat.type !== 'empty' ? 'No character' : 'Open')}
                      </div>
                    </div>
                  </div>

                  {/* Seat controls */}
                  <div className="flex items-center gap-1 w-full">
                    {/* Ready indicator */}
                    {seat.type !== 'empty' && (
                      <div className={`flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                        seat.ready ? 'text-emerald-400 bg-emerald-900/30' : 'text-slate-500 bg-slate-800/50'
                      }`}>
                        {seat.ready ? '✓ Ready' : '○ Not ready'}
                      </div>
                    )}

                    {/* Ready toggle — only for your own seat */}
                    {seat.type === 'human' && seat.playerId === wsPlayerId && (
                      <button
                        onClick={() => send({ type: 'ready' })}
                        className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-semibold transition-all ${
                          myReady
                            ? 'bg-emerald-600/30 hover:bg-red-900/30 text-emerald-400 hover:text-red-400 border border-emerald-700/40 hover:border-red-700/40'
                            : 'bg-slate-700/50 hover:bg-emerald-900/30 text-slate-400 hover:text-emerald-400 border border-slate-600/40 hover:border-emerald-700/40'
                        }`}
                      >
                        {myReady ? 'Unready' : 'Ready'}
                      </button>
                    )}

                    {/* Character select — only for your own seat */}
                    {seat.type === 'human' && seat.playerId === wsPlayerId && characters.length > 0 && (
                      <select
                        value={seat.characterId || ''}
                        onChange={(e) => {
                          const char = characters.find((c) => c.id === e.target.value);
                          send({ type: 'select_character', characterId: char?.id, characterName: char?.name });
                        }}
                        className="ml-auto text-[9px] bg-slate-800 border border-slate-700 rounded px-1 py-0.5 text-slate-300 max-w-[80px]"
                      >
                        <option value="">Character...</option>
                        {characters.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    )}

                    {/* DM controls: change seat type */}
                    {isDM && seat.type === 'empty' && (
                      <button
                        onClick={() => send({ type: 'set_seat_type', seatId: seat.id, seatType: 'ai' })}
                        className="ml-auto text-[8px] px-1.5 py-0.5 rounded bg-violet-900/30 hover:bg-violet-900/50 border border-violet-700/30 text-violet-400 font-semibold transition-all"
                        title="Fill with AI player"
                      >
                        + AI
                      </button>
                    )}
                    {isDM && seat.type === 'ai' && (
                      <button
                        onClick={() => send({ type: 'set_seat_type', seatId: seat.id, seatType: 'empty' })}
                        className="ml-auto text-[8px] px-1.5 py-0.5 rounded bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 text-slate-400 font-semibold transition-all"
                        title="Remove AI player"
                      >
                        Remove
                      </button>
                    )}

                    {/* DM: transfer DM / kick — on other human players */}
                    {isDM && seat.type === 'human' && seat.playerId && seat.playerId !== wsPlayerId && (
                      <>
                        <button
                          onClick={() => send({ type: 'transfer_dm', targetPlayerId: seat.playerId })}
                          className="text-[8px] px-1.5 py-0.5 rounded bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/40 text-amber-400 font-semibold transition-all"
                          title={`Make ${seat.username} the DM`}
                        >
                          Make DM
                        </button>
                        <button
                          onClick={() => send({ type: 'kick_player', playerId: seat.playerId })}
                          className="text-[8px] px-1.5 py-0.5 rounded bg-red-900/30 hover:bg-red-900/50 border border-red-700/30 text-red-400 font-semibold transition-all"
                          title={`Kick ${seat.username}`}
                        >
                          Kick
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* DM: add/remove seat buttons */}
              {isDM && (
                <div className="flex flex-col gap-1 justify-center shrink-0">
                  <button
                    onClick={() => send({ type: 'add_seat' })}
                    className="text-[10px] px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
                    title="Add a seat"
                  >
                    + Seat
                  </button>
                  {seats.length > 1 && (
                    <button
                      onClick={() => {
                        // Remove last non-occupied seat
                        const lastEmpty = [...seats].reverse().find((s) => s.type !== 'human' || !s.playerId);
                        if (lastEmpty) send({ type: 'remove_seat', seatId: lastEmpty.id });
                      }}
                      className="text-[10px] px-2 py-1.5 rounded bg-slate-800 hover:bg-red-900/30 border border-slate-700 text-slate-500 hover:text-red-400 transition-all"
                      title="Remove a seat"
                    >
                      - Seat
                    </button>
                  )}
                </div>
              )}
            </div>
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
              {drawingPlayer && <div className="absolute bottom-2 left-3 px-2 py-1 bg-slate-800/80 border border-slate-700/50 rounded-lg text-[10px] text-slate-400 pointer-events-none animate-pulse">{drawingPlayer} is drawing...</div>}
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
