import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useToast } from '../components/ui/toast';
import { Button } from '../components/ui/button';
import ChatPanel, { type ChatMessage, type SlashRollResult } from '../components/chat/ChatPanel';
import DiceRoller, { type DiceRollerHandle, type LocalRollResult } from '../components/dice/DiceRoller';
import BG3RollPopup from '../components/dice/BG3RollPopup';
import DoodlePad, { type DoodlePadHandle, type DoodleStroke } from '../components/lobby/DoodlePad';
import { useWebSocket, type WSMessage } from '../hooks/useWebSocket';
import { useGame, type DieType } from '../contexts/GameContext';
import { loadChatHistory, persistChatMessage } from '../lib/chatApi';
import type { RollPresentation } from '../types/roll';

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentPlayer, characters } = useGame();
  const room = roomId || 'default';
  const roomLink = `${window.location.origin}/lobby/${room}`;
  const wantsSpectate = searchParams.get('spectate') === '1';

  // Password gate — check if lobby requires a password before connecting
  const [passwordRequired, setPasswordRequired] = useState<boolean | null>(null); // null = loading
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [spectators, setSpectators] = useState<{ id: string; username: string; avatar?: string }[]>([]);
  const [isSpectating, setIsSpectating] = useState(false);
  const [dmSeatType, setDmSeatType] = useState<'human' | 'ai'>('human');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [oldestChatTs, setOldestChatTs] = useState<number | null>(null);
  const [canLoadOlderChat, setCanLoadOlderChat] = useState(true);
  const [loadingOlderChat, setLoadingOlderChat] = useState(false);
  const [wsPlayerId, setWsPlayerId] = useState<string | null>(null);
  const [mySeatId, setMySeatId] = useState<string | null>(null);
  const [isDM, setIsDM] = useState(false);
  const [dmPlayerId, setDmPlayerId] = useState<string | null>(null);
  const [campaignVisibility, setCampaignVisibility] = useState<'public' | 'private'>('private');
  const [campaignPassword, setCampaignPassword] = useState('');
  const diceRef = useRef<DiceRollerHandle>(null);
  const doodleRef = useRef<DoodlePadHandle>(null);
  const [drawingPlayer, setDrawingPlayer] = useState<string | null>(null);
  const drawingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map()); // playerId -> username
  const typingTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const [activeRollPopup, setActiveRollPopup] = useState<RollPresentation | null>(null);
  const [rollPopupVisible, setRollPopupVisible] = useState(false);
  const rollPopupHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [serverTimeOffsetMs, setServerTimeOffsetMs] = useState(0);
  const [clockRttMs, setClockRttMs] = useState<number | null>(null);
  const pendingRollMessagesRef = useRef<Map<string, ChatMessage>>(new Map());
  // Track optimistic message IDs so we can deduplicate server echoes
  const pendingChatIds = useRef<Set<string>>(new Set());

  const showRollPopup = useCallback((roll: RollPresentation) => {
    if (rollPopupHideRef.current) {
      clearTimeout(rollPopupHideRef.current);
      rollPopupHideRef.current = null;
    }
    setActiveRollPopup(roll);
    requestAnimationFrame(() => setRollPopupVisible(true));
  }, []);

  const hideRollPopup = useCallback(() => {
    setRollPopupVisible(false);
    if (rollPopupHideRef.current) clearTimeout(rollPopupHideRef.current);
    rollPopupHideRef.current = setTimeout(() => {
      setActiveRollPopup(null);
      rollPopupHideRef.current = null;
    }, 340);
  }, []);

  useEffect(() => {
    return () => {
      if (rollPopupHideRef.current) clearTimeout(rollPopupHideRef.current);
    };
  }, []);

  // Check if lobby requires a password on mount
  useEffect(() => {
    fetch(`/api/lobby/${encodeURIComponent(room)}/info`)
      .then((r) => (r.ok ? (r.json() as Promise<{ hasPassword?: boolean }>) : null))
      .then((data) => {
        const needs = !!(data?.hasPassword);
        setPasswordRequired(needs);
        if (!needs) setPasswordVerified(true); // no password = auto-verified
      })
      .catch(() => {
        setPasswordRequired(false);
        setPasswordVerified(true);
      });
  }, [room]);

  const handlePasswordSubmit = () => {
    setPasswordError('');
    fetch(`/api/lobby/${encodeURIComponent(room)}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput }),
    })
      .then((r) => r.json() as Promise<{ ok?: boolean; error?: string }>)
      .then((data) => {
        if (data.ok) {
          setPasswordVerified(true);
        } else {
          setPasswordError(data.error || 'Wrong password');
        }
      })
      .catch(() => setPasswordError('Could not verify — try again'));
  };

  // Load persistent chat history from D1 on mount (skip for temp users — no auth cookie)
  useEffect(() => {
    if (currentPlayer.id.startsWith('temp-')) return;
    loadChatHistory(room).then((history) => {
      if (history.length > 0) {
        setOldestChatTs(history[0].timestamp);
        setCanLoadOlderChat(history.length >= 100);
        setChatMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMsgs = history.filter((m) => !existingIds.has(m.id));
          return newMsgs.length > 0 ? [...newMsgs, ...prev] : prev;
        });
      } else {
        setCanLoadOlderChat(false);
      }
    });
  }, [room, currentPlayer.id]);

  const handleLoadOlderChat = useCallback(() => {
    if (loadingOlderChat || !canLoadOlderChat || !oldestChatTs) return;
    setLoadingOlderChat(true);
    loadChatHistory(room, 100, oldestChatTs).then((history) => {
      if (history.length === 0) {
        setCanLoadOlderChat(false);
        return;
      }
      setOldestChatTs(history[0].timestamp);
      setCanLoadOlderChat(history.length >= 100);
      setChatMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newMsgs = history.filter((m) => !existingIds.has(m.id));
        return newMsgs.length > 0 ? [...newMsgs, ...prev] : prev;
      });
    }).finally(() => setLoadingOlderChat(false));
  }, [loadingOlderChat, canLoadOlderChat, oldestChatTs, room]);

  // WebSocket message handler
  const handleWsMessage = useCallback(
    (msg: WSMessage) => {
      switch (msg.type) {
        case 'welcome':
          if (typeof msg.timestamp === 'number') {
            setServerTimeOffsetMs((msg.timestamp as number) - Date.now());
          }
          setWsPlayerId(msg.playerId as string);
          setPlayers(msg.players as LobbyPlayer[]);
          if (Array.isArray(msg.seats)) setSeats(msg.seats as Seat[]);
          if (Array.isArray(msg.spectators)) setSpectators(msg.spectators as { id: string; username: string; avatar?: string }[]);
          if (msg.dmSeatType) setDmSeatType(msg.dmSeatType as 'human' | 'ai');
          if (msg.seatId) setMySeatId(msg.seatId as string);
          setIsSpectating(!!(msg.isSpectating));
          setIsDM((msg.isDM as boolean) ?? false);
          if (msg.dmPlayerId) setDmPlayerId(msg.dmPlayerId as string);
          setChatMessages((prev) => {
            // Only show "Connected" once — skip if already shown in the last 10 seconds
            const recentConnect = prev.find((m) => m.type === 'system' && m.text === 'Connected to lobby' && Date.now() - m.timestamp < 10_000);
            if (recentConnect) return prev;
            return [...prev, { id: crypto.randomUUID(), type: 'system', username: 'System', text: 'Connected to lobby', timestamp: Date.now() }];
          });
          // Auto-join campaign party in D1 (fire-and-forget, skip for temp users)
          if (!currentPlayer.id.startsWith('temp-')) {
            fetch(`/api/party/${encodeURIComponent(room)}/join`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ role: msg.isDM ? 'dm' : 'player' }),
            }).catch(() => {});
          }
          // Replay doodle pad stroke history from server (late-join catch-up)
          if (Array.isArray(msg.strokeHistory) && msg.strokeHistory.length > 0) {
            // Small delay to ensure canvas is mounted and sized
            setTimeout(() => {
              doodleRef.current?.replayStrokes(msg.strokeHistory as DoodleStroke[]);
            }, 100);
          }
          // Late-join catch-up: if a roll is currently presenting, show it immediately.
          if (msg.activeRoll && typeof msg.activeRoll === 'object') {
            const active = msg.activeRoll as Record<string, unknown>;
            const rollId = (active.rollId as string) || crypto.randomUUID();
            const rollTotal = Number((active.total as number) ?? (active.value as number) ?? 0);
            const allRolls = (active.allRolls as number[] | undefined) || [rollTotal];
            const keptRolls = (active.keptRolls as number[] | undefined) || [rollTotal];
            pendingRollMessagesRef.current.set(rollId, {
              id: crypto.randomUUID(),
              type: 'roll',
              playerId: active.playerId as string,
              username: active.username as string,
              avatar: active.avatar as string | undefined,
              text: '',
              timestamp: (active.timestamp as number) || Date.now(),
              die: active.die as string,
              sides: active.sides as number,
              value: rollTotal,
              rollCount: active.count as number | undefined,
              allRolls,
              keptRolls,
              isCritical: active.isCritical as boolean,
              isFumble: active.isFumble as boolean,
              unitName: active.unitName as string | undefined,
              advMode: active.advMode as string | undefined,
            });
            showRollPopup({
              rollId,
              playerId: active.playerId as string,
              username: active.username as string,
              avatar: active.avatar as string | undefined,
              unitName: active.unitName as string | undefined,
              die: active.die as string,
              sides: active.sides as number,
              count: (active.count as number) || 1,
              allRolls,
              keptRolls,
              total: rollTotal,
              advMode: active.advMode as 'advantage' | 'disadvantage' | undefined,
              isCritical: active.isCritical as boolean,
              isFumble: active.isFumble as boolean,
              dc: active.dc as number | undefined,
              bonuses: active.bonuses as { label: string; value: number }[] | undefined,
              animationMs: active.animationMs as number | undefined,
              presentationMs: active.presentationMs as number | undefined,
              timestamp: (active.timestamp as number) || Date.now(),
            });
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
          if (Array.isArray(msg.spectators)) setSpectators(msg.spectators as { id: string; username: string; avatar?: string }[]);
          break;

        case 'spectate_confirmed':
          setIsSpectating(true);
          setMySeatId(null);
          toast('You are now spectating', 'info');
          break;

        case 'seat_claimed':
          setIsSpectating(false);
          setMySeatId(msg.seatId as string);
          toast('You joined a seat!', 'success');
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

        case 'whisper': {
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'whisper',
              playerId: msg.playerId as string,
              username: msg.username as string,
              avatar: msg.avatar as string | undefined,
              text: msg.message as string,
              timestamp: msg.timestamp as number,
              targetUsername: msg.targetUsername as string | undefined,
              targetPlayerId: msg.targetPlayerId as string | undefined,
            },
          ]);
          break;
        }

        case 'chat_reaction': {
          const reactMsgId = msg.messageId as string;
          const reactEmoji = msg.emoji as string;
          const reactPlayerId = msg.playerId as string;
          if (reactMsgId && reactEmoji && reactPlayerId) {
            setChatMessages((prev) => prev.map((m) => {
              if (m.id !== reactMsgId) return m;
              const reactions = { ...(m.reactions || {}) };
              const ids = reactions[reactEmoji] || [];
              if (ids.includes(reactPlayerId)) {
                reactions[reactEmoji] = ids.filter((id) => id !== reactPlayerId);
                if (reactions[reactEmoji].length === 0) delete reactions[reactEmoji];
              } else {
                reactions[reactEmoji] = [...ids, reactPlayerId];
              }
              return { ...m, reactions };
            }));
          }
          break;
        }

        case 'roll_result': {
          const rollId = (msg.rollId as string) || crypto.randomUUID();
          const lobbyRollTotal = (msg.total as number) ?? (msg.value as number) ?? 0;
          const allRolls = (msg.allRolls as number[] | undefined) || [lobbyRollTotal];
          const keptRolls = (msg.keptRolls as number[] | undefined) || [lobbyRollTotal];

          pendingRollMessagesRef.current.set(rollId, {
            id: crypto.randomUUID(),
            type: 'roll',
            playerId: msg.playerId as string,
            username: msg.username as string,
            avatar: msg.avatar as string | undefined,
            text: '',
            timestamp: msg.timestamp as number,
            die: msg.die as string,
            sides: msg.sides as number,
            value: lobbyRollTotal,
            rollCount: msg.count as number | undefined,
            allRolls,
            keptRolls,
            isCritical: msg.isCritical as boolean,
            isFumble: msg.isFumble as boolean,
            unitName: msg.unitName as string | undefined,
            advMode: msg.advMode as string | undefined,
          });
          showRollPopup({
            rollId,
            playerId: msg.playerId as string,
            username: msg.username as string,
            avatar: msg.avatar as string | undefined,
            unitName: msg.unitName as string | undefined,
            die: msg.die as string,
            sides: msg.sides as number,
            count: (msg.count as number) || 1,
            allRolls,
            keptRolls,
            total: lobbyRollTotal,
            advMode: msg.advMode as 'advantage' | 'disadvantage' | undefined,
            isCritical: msg.isCritical as boolean,
            isFumble: msg.isFumble as boolean,
            dc: msg.dc as number | undefined,
            bonuses: msg.bonuses as { label: string; value: number }[] | undefined,
            animationMs: msg.animationMs as number | undefined,
            presentationMs: msg.presentationMs as number | undefined,
            timestamp: (msg.timestamp as number) || Date.now(),
          });
          break;
        }

        case 'roll_vetoed': {
          const vetoRollId = msg.rollId as string;
          setActiveRollPopup((prev) => {
            if (!prev || prev.rollId !== vetoRollId) return prev;
            return { ...prev, vetoed: true, vetoedBy: (msg.vetoedBy as string) || 'DM' };
          });
          break;
        }

        case 'roll_cleared': {
          const clearedRollId = msg.rollId as string;
          const reason = msg.reason as string | undefined;
          const pending = pendingRollMessagesRef.current.get(clearedRollId);
          if (pending) {
            pendingRollMessagesRef.current.delete(clearedRollId);
            if (reason !== 'vetoed') {
              setChatMessages((prev) => [...prev, pending]);
              if (pending.playerId === wsPlayerId) {
                persistChatMessage(room, {
                  username: pending.username,
                  type: 'roll',
                  text: `rolled ${(pending.die as string)?.toUpperCase()} for ${pending.value ?? 0}`,
                  metadata: { die: pending.die, sides: pending.sides, value: pending.value, isCritical: pending.isCritical, isFumble: pending.isFumble, unitName: pending.unitName },
                });
              }
            } else {
              setChatMessages((prev) => [...prev, {
                id: crypto.randomUUID(),
                type: 'system',
                username: 'System',
                text: `${pending.unitName || pending.username}'s roll was vetoed by the DM`,
                timestamp: Date.now(),
              }]);
            }
          }
          hideRollPopup();
          break;
        }

        case 'roll_queued': {
          if (msg.playerId === wsPlayerId) {
            const position = Number(msg.position) || 1;
            toast(`Roll queued (${position} ahead)`, 'info');
          }
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

        case 'typing': {
          const typerId = msg.playerId as string;
          const typerName = msg.username as string;
          setTypingUsers((prev) => {
            const next = new Map(prev);
            next.set(typerId, typerName);
            return next;
          });
          // Clear after 3s of no typing messages from this player
          const existing = typingTimersRef.current.get(typerId);
          if (existing) clearTimeout(existing);
          typingTimersRef.current.set(typerId, setTimeout(() => {
            setTypingUsers((prev) => {
              const next = new Map(prev);
              next.delete(typerId);
              return next;
            });
            typingTimersRef.current.delete(typerId);
          }, 3000));
          break;
        }
      }
    },
    [wsPlayerId, showRollPopup, hideRollPopup, room, toast]
  );

  const { status, send } = useWebSocket({
    roomId: room,
    username: currentPlayer.username,
    avatar: currentPlayer.avatar,
    spectate: wantsSpectate,
    onMessage: handleWsMessage,
    onTimeSync: (offsetMs, rttMs) => {
      setServerTimeOffsetMs((prev) => Math.round(prev * 0.8 + offsetMs * 0.2));
      setClockRttMs(Math.round(rttMs));
    },
    enabled: passwordVerified, // don't connect until password is verified (or not needed)
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
    (die: DieType, sides: number, count: number, advMode: 'normal' | 'advantage' | 'disadvantage') => {
      send({ type: 'roll', die, sides, count, advMode });
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
          value: roll.total,
          rollCount: roll.count,
          allRolls: roll.allRolls,
          keptRolls: roll.keptRolls,
          isCritical: roll.isCritical,
          isFumble: roll.isFumble,
          unitName: roll.unitName,
          advMode: roll.advMode,
        },
      ]);
      // Persist local roll to D1
      persistChatMessage(room, {
        username: playerName,
        type: 'roll',
        text: `rolled ${roll.count > 1 ? roll.count : ''}${roll.die?.toUpperCase()} for ${roll.total}`,
        metadata: { die: roll.die, sides: roll.sides, value: roll.total, isCritical: roll.isCritical, isFumble: roll.isFumble, unitName: roll.unitName },
      });
    },
    [currentPlayer, room]
  );

  // Handle /roll slash command from chat
  const handleSlashRoll = useCallback(
    (result: SlashRollResult) => {
      const playerName = currentPlayer.username || funDefault();
      const isCrit = result.rolls.length === 1 && result.rolls[0] === 20;
      const isFumble = result.rolls.length === 1 && result.rolls[0] === 1;
      const rollText = result.kept
        ? `[${result.rolls.join(', ')}] keep ${result.kept.join(', ')}`
        : `[${result.rolls.join(', ')}]`;
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'roll',
          playerId: currentPlayer.id,
          username: playerName,
          text: `${result.notation}: ${rollText}${result.modifier ? ` ${result.modifier > 0 ? '+' : ''}${result.modifier}` : ''} = ${result.total}`,
          timestamp: Date.now(),
          die: result.notation,
          value: result.total,
          isCritical: isCrit,
          isFumble,
        },
      ]);
      persistChatMessage(room, {
        username: playerName,
        type: 'roll',
        text: `rolled ${result.notation} for ${result.total}`,
        metadata: { die: result.notation, value: result.total, isCritical: isCrit, isFumble },
      });
    },
    [currentPlayer, room]
  );

  // Handle dice macro execution — macro label + notation result posted to chat
  const handleMacroRoll = useCallback(
    (label: string, notation: string, rolls: number[], total: number, isCrit: boolean, isFumble: boolean) => {
      const playerName = currentPlayer.username || funDefault();
      const rollText = `[${rolls.join(', ')}]`;
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'roll',
          playerId: currentPlayer.id,
          username: playerName,
          text: `${label} (${notation}): ${rollText} = ${total}`,
          timestamp: Date.now(),
          die: notation,
          value: total,
          isCritical: isCrit,
          isFumble,
        },
      ]);
      persistChatMessage(room, {
        username: playerName,
        type: 'roll',
        text: `used ${label} (${notation}) for ${total}`,
        metadata: { die: notation, value: total, isCritical: isCrit, isFumble },
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
        const campaign = data?.campaigns?.find((c: Record<string, unknown>) => c.roomId === room);
        if (campaign) {
          setCampaignName((campaign as Record<string, unknown>).name as string || room);
          setCampaignDescription((campaign as Record<string, unknown>).description as string || '');
          if ((campaign as Record<string, unknown>).visibility === 'public') setCampaignVisibility('public');
        }
      })
      .catch(() => {});
  }, [room]);

  const saveCampaignSettings = useCallback(
    (name: string, description: string, visibility?: 'public' | 'private') => {
      const body: Record<string, string> = { name, description };
      if (visibility) body.visibility = visibility;
      fetch(`/api/campaigns/${encodeURIComponent(room)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      }).catch(() => {});
    },
    [room]
  );

  // Start game: store seat character assignment + AI seat data in sessionStorage for Game.tsx
  const handleStartGame = useCallback(() => {
    if (mySeatId) {
      const seat = seats.find((s) => s.id === mySeatId);
      if (seat?.characterId) {
        try { sessionStorage.setItem(`adventure:seatCharId:${room}`, seat.characterId); } catch { /* ok */ }
      }
    }
    // Store AI seat character IDs so Game.tsx can auto-play their turns
    const aiCharIds = seats
      .filter((s) => s.type === 'ai' && s.characterId)
      .map((s) => s.characterId!);
    try { sessionStorage.setItem(`adventure:aiCharIds:${room}`, JSON.stringify(aiCharIds)); } catch { /* ok */ }
    navigate(`/game/${room}`);
  }, [mySeatId, seats, room, navigate]);

  const statusColor = status === 'connected' ? 'bg-green-500' : status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500';

  // Compute ready-to-start: all occupied seats (human + AI) are ready
  const occupiedSeats = seats.filter((s) => s.type !== 'empty');
  const allReady = occupiedSeats.length > 0 && occupiedSeats.every((s) => s.ready);

  // My seat's ready state
  const mySeat = mySeatId ? seats.find((s) => s.id === mySeatId) : undefined;
  const myReady = mySeat?.ready ?? false;

  // Password gate — show prompt before lobby loads
  if (passwordRequired === null) {
    // Still checking
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3 animate-fade-in-up">
          <div className="w-6 h-6 border-2 border-[#F38020] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-500">Checking lobby...</span>
        </div>
      </div>
    );
  }
  if (passwordRequired && !passwordVerified) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 gap-5 page-enter">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm shadow-2xl max-w-sm w-full mx-4">
          <div className="w-12 h-12 rounded-full bg-[#F38020]/10 border border-[#F38020]/20 flex items-center justify-center text-xl">&#x1F512;</div>
          <div className="text-center space-y-1">
            <h2 className="text-lg font-bold text-white">Password Required</h2>
            <p className="text-xs text-slate-400">This lobby is password-protected.</p>
          </div>
          <div className="flex gap-2 items-center w-full">
            <input
              type="password"
              placeholder="Enter password"
              className="input-glow flex-1 px-4 py-2.5 border-2 border-slate-700/80 rounded-lg bg-slate-800/80 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-[#F38020] focus:border-[#F38020] transition-all outline-none text-sm"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              autoFocus
            />
            <Button variant="default" className="bg-gradient-to-r from-[#F38020] to-[#e06a10] hover:from-[#ff8c2e] hover:to-[#f38020] text-white font-semibold py-2.5 px-5 rounded-lg shadow hover:shadow-lg transition-all active:scale-[0.97]" onClick={handlePasswordSubmit}>
              Join
            </Button>
          </div>
          {passwordError && <p className="text-xs text-red-400 animate-fade-in-up">{passwordError}</p>}
          <button onClick={() => navigate('/')} className="text-xs text-slate-500 hover:text-slate-300 transition-colors mt-1">
            &larr; Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden page-enter">
      {/* Header */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 px-3 sm:px-6 py-2 sm:py-3 flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 shrink-0 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition-colors shrink-0 text-sm sm:text-base">
            &larr;
          </Button>
          {/* Campaign name — click to edit (DM only) */}
          {editingName ? (
            <input
              ref={nameInputRef}
              className="input-glow text-lg font-bold text-[#F38020] bg-slate-800 border border-[#F38020]/50 rounded-lg px-3 py-0.5 outline-none w-48 transition-all"
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
              className={`text-lg font-bold text-[#F38020] transition-colors ${isDM ? 'cursor-pointer hover:text-[#f9a05f]' : ''}`}
              onClick={() => { if (isDM) { setEditingName(true); setTimeout(() => nameInputRef.current?.select(), 0); } }}
              title={isDM ? 'Click to rename campaign' : campaignName}
            >
              {campaignName}
            </h1>
          )}
          <span className="text-[10px] font-mono bg-slate-800/80 px-2 py-1 rounded-md text-slate-500 border border-slate-700/50 hidden sm:inline">{room}</span>
          {isDM && (
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-[10px] px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 text-slate-400 hover:text-slate-200 transition-all"
              title="Campaign settings"
            >
              Settings
            </button>
          )}
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] transition-all ${
            status === 'connected' ? 'bg-emerald-900/30 text-emerald-400' : status === 'connecting' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
            <span className="font-medium">{status}</span>
          </div>
          {status === 'connected' && clockRttMs !== null && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700/60 bg-slate-800/60 text-slate-300">
              sync {serverTimeOffsetMs >= 0 ? '+' : ''}{serverTimeOffsetMs}ms | rtt {clockRttMs}ms
            </span>
          )}
          {isSpectating && (
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-sky-900/30 border border-sky-700/30 text-sky-400 font-semibold animate-fade-in-up">
              Spectating
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {allReady && (
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Ready
            </span>
          )}
          <button
            onClick={handleStartGame}
            className={`font-semibold py-2 px-6 rounded-lg shadow-lg text-sm transition-all active:scale-[0.97] ${
              allReady || isDM
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white hover:shadow-emerald-500/20 hover:shadow-xl'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
            disabled={!allReady && !isDM}
            title={allReady ? 'Everyone is ready!' : isDM ? 'DM override — start anyway' : 'Waiting for all players to ready up'}
          >
            Start Game &rarr;
          </button>
        </div>
      </header>

      {/* Campaign settings panel — collapsible, DM only */}
      {showSettings && isDM && (
        <div className="bg-slate-900/80 border-b border-slate-800/80 px-6 py-3 shrink-0 backdrop-blur-sm animate-slide-in">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Campaign Settings</h3>
              <button onClick={() => setShowSettings(false)} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Close</button>
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
            <div className="flex items-center gap-3">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider">Visibility</label>
              <button
                onClick={() => {
                  const next = campaignVisibility === 'private' ? 'public' : 'private';
                  setCampaignVisibility(next);
                  saveCampaignSettings(campaignName.trim() || room, campaignDescription, next);
                  toast(`Campaign is now ${next}`, 'info');
                }}
                className={`text-xs px-3 py-1 rounded border font-semibold transition-all ${
                  campaignVisibility === 'public'
                    ? 'bg-emerald-900/30 border-emerald-700/40 text-emerald-400 hover:bg-emerald-900/50'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {campaignVisibility === 'public' ? 'Public — listed in browser' : 'Private — invite only'}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider">Password</label>
              <input
                type="password"
                className="w-40 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 outline-none focus:border-[#F38020]/50 placeholder-slate-500"
                value={campaignPassword}
                onChange={(e) => setCampaignPassword(e.target.value)}
                placeholder="No password"
                maxLength={64}
              />
              <button
                onClick={() => {
                  fetch(`/api/campaigns/${encodeURIComponent(room)}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ password: campaignPassword }),
                  }).catch(() => {});
                  toast(campaignPassword ? 'Password set' : 'Password removed', 'info');
                }}
                className="text-xs px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 font-semibold transition-all"
              >
                {campaignPassword ? 'Set' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
        {/* Left side: seat roster + activity area (doodle/dice) */}
        <div className={`flex-1 flex flex-col overflow-hidden min-h-0 transition-opacity duration-200 ${rollPopupVisible ? 'opacity-45' : 'opacity-100'}`}>
          {/* Seat roster + invite bar */}
          <div className="bg-slate-900/40 border-b border-slate-800/60 px-4 py-3 shrink-0 backdrop-blur-sm">
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
                  {/* DM can switch to AI; when AI is DM, anyone can claim it back */}
                  {(isDM || dmSeatType === 'ai') && (
                    <button
                      onClick={() => send({ type: 'set_dm_type', dmSeatType: dmSeatType === 'human' ? 'ai' : 'human' })}
                      className="ml-1 px-1.5 py-0.5 rounded bg-slate-700/50 hover:bg-slate-600/50 text-[9px] text-slate-300 hover:text-white transition-colors"
                      title={dmSeatType === 'human' ? 'Switch to AI DM' : 'Claim DM — switch back to Human'}
                    >
                      {dmSeatType === 'human' ? '→ AI' : '→ Claim DM'}
                    </button>
                  )}
                </div>
              </div>
              <button onClick={copyLink} className="flex items-center gap-2 cursor-pointer group" title="Click to copy invite link">
                <span className="text-xs text-slate-600 hidden sm:inline">Invite:</span>
                <code className="text-[10px] bg-slate-800 px-2 py-1 rounded text-[#F38020] group-hover:text-[#f9a05f] transition-colors select-all truncate max-w-[120px] sm:max-w-none">{roomLink}</code>
                <span className="text-sm group-hover:scale-110 transition-transform shrink-0">&#x1F4CB;</span>
              </button>
            </div>

            {/* Seat grid */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 stagger-children">
              {seats.map((seat) => (
                <div
                  key={seat.id}
                  className={`seat-card flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border min-w-[130px] transition-all backdrop-blur-sm animate-card-reveal ${
                    seat.ready ? 'seat-ready' : ''
                  } ${
                    seat.type === 'human' && seat.playerId === wsPlayerId
                      ? 'border-[#F38020]/40 bg-[#F38020]/[0.08] shadow-lg shadow-orange-900/10'
                      : seat.type === 'ai'
                        ? 'border-violet-700/30 bg-violet-900/[0.08] shadow-lg shadow-violet-900/10'
                        : seat.type === 'human'
                          ? 'border-slate-700/50 bg-slate-800/40 shadow-md'
                          : 'border-slate-700/20 bg-slate-800/20 border-dashed'
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
                        className="ml-auto text-[9px] bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-slate-300 max-w-[100px]"
                      >
                        <option value="">Pick character...</option>
                        {characters.map((c) => (
                          <option key={c.id} value={c.id}>{c.name} (Lv{c.level})</option>
                        ))}
                      </select>
                    )}
                    {/* No characters — prompt to create one */}
                    {seat.type === 'human' && seat.playerId === wsPlayerId && characters.length === 0 && (
                      <button
                        onClick={() => navigate('/create')}
                        className="ml-auto text-[9px] px-2 py-1 rounded bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-700/30 text-emerald-400 font-semibold transition-all"
                      >
                        + Create Character
                      </button>
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

            {/* Spectator bar */}
            {(spectators.length > 0 || isSpectating) && (
              <div className="flex items-center gap-3 mt-2 pt-2 border-t border-slate-800/50">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider shrink-0">Spectating</span>
                <div className="flex -space-x-1.5 flex-1 min-w-0">
                  {spectators.slice(0, 8).map((s) =>
                    s.avatar ? (
                      <img key={s.id} src={s.avatar} alt={s.username} title={s.username} className="w-5 h-5 rounded-full border border-slate-900" />
                    ) : (
                      <div key={s.id} title={s.username} className="w-5 h-5 rounded-full bg-slate-700 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-400">
                        {s.username.charAt(0).toUpperCase()}
                      </div>
                    )
                  )}
                  {spectators.length > 8 && <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-900 flex items-center justify-center text-[7px] text-slate-400">+{spectators.length - 8}</div>}
                  {spectators.length === 0 && <span className="text-[10px] text-slate-600 italic">none</span>}
                </div>
                {/* Spectate / Join Seat toggle */}
                {!isDM && (
                  isSpectating ? (
                    <button
                      onClick={() => send({ type: 'claim_seat' })}
                      className="text-[10px] px-2.5 py-1 rounded bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-700/40 text-emerald-400 font-semibold transition-all shrink-0"
                      title="Join an empty seat"
                    >
                      Join a Seat
                    </button>
                  ) : mySeatId ? (
                    <button
                      onClick={() => send({ type: 'spectate' })}
                      className="text-[10px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 font-semibold transition-all shrink-0"
                      title="Leave your seat and spectate"
                    >
                      Spectate
                    </button>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Dice + Doodle Pad side by side */}
          <div className="flex-1 flex overflow-hidden min-h-0">
            {/* Dice roller — left (hidden on mobile, dice available via chat) */}
            <div className="hidden sm:flex relative w-64 shrink-0 border-r border-slate-800/60 p-4 flex-col items-center overflow-y-auto bg-slate-900/20">
              <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Dice</h3>
              <DiceRoller ref={diceRef} onLocalRoll={handleLocalRoll} onRollComplete={handleRollComplete} onMacroRoll={handleMacroRoll} useServerRolls={status === 'connected'} suppressServerSpin={status === 'connected'} compact />
              {rollPopupVisible && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/75 backdrop-blur-[1px] pointer-events-auto">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎲</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">Rolling...</div>
                  </div>
                </div>
              )}
            </div>
            {/* Doodle pad — fills remaining space, synced via WebSocket */}
            <div className="flex-1 overflow-hidden relative">
              <DoodlePad ref={doodleRef} onStroke={handleDoodleStroke} onClear={handleDoodleClear} />
              {drawingPlayer && (
                <div className="absolute bottom-2 left-3 px-2.5 py-1 bg-slate-800/90 border border-slate-700/50 rounded-lg text-[10px] text-slate-400 pointer-events-none backdrop-blur-sm animate-fade-in-up">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                  {drawingPlayer} is drawing...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar: chat — full width on mobile, fixed width on desktop */}
        <div className="w-full sm:w-80 border-t sm:border-t-0 sm:border-l border-slate-800/60 bg-slate-900/60 flex flex-col p-3 sm:p-4 shrink-0 overflow-hidden backdrop-blur-sm min-h-[200px] sm:min-h-0">
          <ChatPanel messages={chatMessages} onSend={handleChatSend} onSlashRoll={handleSlashRoll} onWhisper={(target, msg) => send({ type: 'whisper', targetUsername: target, message: msg })} onReaction={(messageId, emoji) => send({ type: 'chat_reaction', messageId, emoji })} onTyping={() => send({ type: 'typing' })} onLoadOlder={handleLoadOlderChat} canLoadOlder={canLoadOlderChat} loadingOlder={loadingOlderChat} typingUsers={Array.from(typingUsers.values())} currentPlayerId={wsPlayerId || undefined} />
        </div>
      </div>

      <BG3RollPopup
        roll={activeRollPopup}
        visible={rollPopupVisible}
        isDM={isDM}
        onVeto={(rollId) => send({ type: 'veto_roll', rollId })}
        serverTimeOffsetMs={serverTimeOffsetMs}
        syncRttMs={clockRttMs}
      />
    </div>
  );
}
