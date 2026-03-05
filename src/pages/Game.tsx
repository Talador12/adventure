import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import InitiativeBar from '../components/combat/InitiativeBar';
import DiceRoller from '../components/dice/DiceRoller';
import { Button } from '../components/ui/button';
import { useGame, type Unit, type Player } from '../contexts/GameContext';

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
  const { setPlayers, setUnits, units, setCurrentPlayer, rolls } = useGame();

  // Initialize demo data on mount
  useEffect(() => {
    setCurrentPlayer(DEMO_PLAYERS[0]);
    setPlayers(DEMO_PLAYERS);
    setUnits(DEMO_UNITS);
  }, [setCurrentPlayer, setPlayers, setUnits]);

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(`/lobby/${roomId || ''}`)} className="text-slate-400 hover:text-white">
            &larr; Lobby
          </Button>
          <h1 className="text-lg font-bold text-[#F38020]">Game</h1>
          {roomId && <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">Room: {roomId}</span>}
        </div>
        <div className="text-xs text-slate-500">
          {rolls.length > 0 && (
            <span>
              {rolls.length} roll{rolls.length !== 1 ? 's' : ''} this session
            </span>
          )}
        </div>
      </header>

      {/* Everything below header: sidebar spans full height, left side has initiative + board */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: initiative bar + game board */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Initiative tracker — click a unit to associate dice rolls */}
          <div className="bg-slate-900/50 border-b border-slate-800 shrink-0">
            <InitiativeBar entries={units} />
          </div>

          {/* Game board fills remaining space */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center h-full">
              <div className="text-center text-slate-600 space-y-2">
                <p className="text-lg">Game board coming soon...</p>
                <p className="text-sm">Maps, tokens, fog of war, and more</p>
                <p className="text-xs text-slate-700 mt-4">Click a unit in the initiative bar to associate your dice rolls with them</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar: full height, dice on top, chat fills the rest */}
        <div className="w-80 border-l border-slate-800 bg-slate-900 flex flex-col shrink-0">
          {/* Dice roller */}
          <div className="p-4 border-b border-slate-800 overflow-y-auto">
            <DiceRoller />
          </div>

          {/* Chat fills remaining sidebar space */}
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 shrink-0">Chat</h2>
            <div className="flex-1 overflow-y-auto text-sm text-slate-600 flex items-center justify-center">WebSocket chat coming soon...</div>
            <div className="mt-3 shrink-0">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 placeholder-slate-600 focus:ring-1 focus:ring-[#F38020] focus:border-[#F38020] outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
