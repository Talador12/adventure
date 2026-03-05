import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback, useRef } from 'react';
import { useToast } from '../components/ui/toast';
import { Button } from '../components/ui/button';
import ChatPanel, { type ChatMessage } from '../components/chat/ChatPanel';
import DiceRoller, { type DiceRollerHandle, type RemoteRoll } from '../components/dice/DiceRoller';
import DoodlePad from '../components/lobby/DoodlePad';
import { useWebSocket, type WSMessage } from '../hooks/useWebSocket';
import { useGame, type DieType } from '../contexts/GameContext';

interface LobbyPlayer {
  id: string;
  username: string;
  avatar?: string;
  joinedAt: number;
}

type LobbyTab = 'doodle' | 'dice';

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
  const [activeTab, setActiveTab] = useState<LobbyTab>('dice');
  const diceRef = useRef<DiceRollerHandle>(null);

  // WebSocket message handler
  const handleWsMessage = useCallback((msg: WSMessage) => {
    switch (msg.type) {
      case 'welcome':
        setWsPlayerId(msg.playerId as string);
        setPlayers(msg.players as LobbyPlayer[]);
        setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'system', username: 'System', text: 'Connected to lobby', timestamp: Date.now() }]);
        break;

      case 'player_joined':
        setPlayers(msg.players as LobbyPlayer[]);
        setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'join', username: msg.username as string, text: `${msg.username} joined the lobby`, timestamp: msg.timestamp as number }]);
        break;

      case 'player_left':
        setPlayers(msg.players as LobbyPlayer[]);
        setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'leave', username: msg.username as string, text: `${msg.username} left the lobby`, timestamp: msg.timestamp as number }]);
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
        // Show roll in chat
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
    }
  }, []);

  const { status, send } = useWebSocket({
    roomId: room,
    username: currentPlayer.username,
    onMessage: handleWsMessage,
  });

  const handleChatSend = useCallback(
    (text: string) => {
      send({ type: 'chat', message: text });
    },
    [send]
  );

  const handleLocalRoll = useCallback(
    (die: DieType, sides: number) => {
      send({ type: 'roll', die, sides: sides });
    },
    [send]
  );

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
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">Invite:</span>
                <code className="text-[10px] bg-slate-800 px-2 py-1 rounded text-[#F38020] select-all truncate max-w-[200px]">{roomLink}</code>
                <button onClick={copyLink} className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 transition-colors">
                  Copy
                </button>
              </div>
            </div>
            {players.length === 0 ? (
              <div className="text-xs text-slate-600">Waiting for players to connect...</div>
            ) : (
              <div className="flex gap-3 overflow-x-auto">
                {players.map((p) => (
                  <div key={p.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${p.id === wsPlayerId ? 'border-[#F38020]/50 bg-[#F38020]/10' : 'border-slate-700 bg-slate-800/50'}`}>
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">{p.username.charAt(0).toUpperCase()}</div>
                    <span className="font-medium text-slate-200">{p.username}</span>
                    {p.id === wsPlayerId && <span className="text-[9px] text-[#F38020]">(you)</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-slate-800 shrink-0">
            <button onClick={() => setActiveTab('dice')} className={`px-4 py-2 text-xs font-semibold transition-colors ${activeTab === 'dice' ? 'text-[#F38020] border-b-2 border-[#F38020]' : 'text-slate-500 hover:text-slate-300'}`}>
              Dice
            </button>
            <button onClick={() => setActiveTab('doodle')} className={`px-4 py-2 text-xs font-semibold transition-colors ${activeTab === 'doodle' ? 'text-[#F38020] border-b-2 border-[#F38020]' : 'text-slate-500 hover:text-slate-300'}`}>
              Doodle Pad
            </button>
          </div>

          {/* Activity area */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'dice' && (
              <div className="p-6 max-w-sm mx-auto">
                <DiceRoller ref={diceRef} onLocalRoll={handleLocalRoll} useServerRolls={status === 'connected'} compact />
              </div>
            )}
            {activeTab === 'doodle' && <DoodlePad />}
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
