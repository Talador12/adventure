import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import InitiativeBar from '../components/combat/InitiativeBar';
import DiceRoller, { type DiceRollerHandle } from '../components/dice/DiceRoller';
import ChatPanel, { type ChatMessage } from '../components/chat/ChatPanel';
import { Button } from '../components/ui/button';
import { useGame, type Unit, type Player, type DieType } from '../contexts/GameContext';
import { useWebSocket, type WSMessage } from '../hooks/useWebSocket';

// Demo data — will be replaced by Durable Object state via WebSocket
const DEMO_PLAYERS: Player[] = [
  { id: 'player-1', username: 'You', controllerType: 'human' },
  { id: 'player-2', username: 'Liraen', controllerType: 'human' },
  { id: 'ai-dm', username: 'DM (AI)', controllerType: 'ai' },
];

const DEMO_UNITS: Unit[] = [
  { id: 'unit-1', name: 'Warrior', hp: 42, maxHp: 50, isCurrentTurn: true, type: 'player', playerId: 'player-1' },
  { id: 'unit-2', name: 'Mage', hp: 30, maxHp: 30, isCurrentTurn: false, type: 'player', playerId: 'player-2' },
  { id: 'unit-3', name: 'Rogue', hp: 12, maxHp: 40, isCurrentTurn: false, type: 'player', playerId: 'player-1' },
  { id: 'unit-4', name: 'Goblin', hp: 8, maxHp: 15, isCurrentTurn: false, type: 'enemy', playerId: 'ai-dm' },
  { id: 'unit-5', name: 'Goblin Chief', hp: 28, maxHp: 35, isCurrentTurn: false, type: 'enemy', playerId: 'ai-dm' },
];

export default function Game() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = roomId || 'default';
  const { setPlayers, setUnits, units, setCurrentPlayer, currentPlayer, rolls, selectedUnitId } = useGame();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [wsPlayerId, setWsPlayerId] = useState<string | null>(null);
  const diceRef = useRef<DiceRollerHandle>(null);
  const selectedUnit = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;

  // Initialize demo data on mount
  useEffect(() => {
    setCurrentPlayer(DEMO_PLAYERS[0]);
    setPlayers(DEMO_PLAYERS);
    setUnits(DEMO_UNITS);
  }, [setCurrentPlayer, setPlayers, setUnits]);

  // Handle incoming WebSocket messages
  const handleWsMessage = useCallback((msg: WSMessage) => {
    switch (msg.type) {
      case 'welcome':
        setWsPlayerId(msg.playerId as string);
        break;

      case 'chat':
        setChatMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: 'chat',
            playerId: msg.playerId as string,
            username: msg.username as string,
            text: msg.message as string,
            timestamp: msg.timestamp as number,
          },
        ]);
        break;

      case 'roll_result': {
        // Show in chat
        setChatMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: 'roll',
            playerId: msg.playerId as string,
            username: msg.username as string,
            text: '',
            timestamp: msg.timestamp as number,
            die: msg.die as string,
            value: msg.value as number,
            isCritical: msg.isCritical as boolean,
            isFumble: msg.isFumble as boolean,
            unitName: msg.unitName as string | undefined,
          },
        ]);
        // Play animation for all players
        diceRef.current?.playRemoteRoll({
          die: msg.die as DieType,
          sides: msg.sides as number,
          value: msg.value as number,
          playerName: msg.username as string,
          unitName: msg.unitName as string | undefined,
        });
        break;
      }

      case 'player_joined':
        setChatMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: 'join',
            username: msg.username as string,
            text: `${msg.username} joined the game`,
            timestamp: msg.timestamp as number,
          },
        ]);
        break;

      case 'player_left':
        setChatMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: 'leave',
            username: msg.username as string,
            text: `${msg.username} left the game`,
            timestamp: msg.timestamp as number,
          },
        ]);
        break;
    }
  }, []);

  const { status, send } = useWebSocket({
    roomId: room,
    username: currentPlayer.username,
    onMessage: handleWsMessage,
  });

  const handleChatSend = useCallback((text: string) => send({ type: 'chat', message: text }), [send]);

  const handleLocalRoll = useCallback(
    (die: DieType, sides: number) => {
      send({
        type: 'roll',
        die,
        sides,
        unitId: selectedUnitId || undefined,
        unitName: selectedUnit?.name || undefined,
      });
    },
    [send, selectedUnitId, selectedUnit]
  );

  const statusColor = status === 'connected' ? 'bg-green-500' : status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500';

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(`/lobby/${room}`)} className="text-slate-400 hover:text-white">
            &larr; Lobby
          </Button>
          <h1 className="text-lg font-bold text-[#F38020]">Game</h1>
          {roomId && <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">Room: {roomId}</span>}
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${statusColor}`} />
            <span className="text-[10px] text-slate-500">{status}</span>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          {rolls.length > 0 && (
            <span>
              {rolls.length} roll{rolls.length !== 1 ? 's' : ''} this session
            </span>
          )}
        </div>
      </header>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: initiative bar + game board */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-slate-900/50 border-b border-slate-800 shrink-0">
            <InitiativeBar entries={units} />
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <div className="rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center h-full">
              <div className="text-center text-slate-600 space-y-2">
                <p className="text-lg">Game board coming soon...</p>
                <p className="text-sm">Maps, tokens, fog of war, and more</p>
                <p className="text-xs text-slate-700 mt-4">Click a unit in the initiative bar to associate your dice rolls</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar: dice + chat */}
        <div className="w-80 border-l border-slate-800 bg-slate-900 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800 overflow-y-auto">
            <DiceRoller ref={diceRef} onLocalRoll={handleLocalRoll} useServerRolls={status === 'connected'} />
          </div>
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            <ChatPanel messages={chatMessages} onSend={handleChatSend} currentPlayerId={wsPlayerId || currentPlayer.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
