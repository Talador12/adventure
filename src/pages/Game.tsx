import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import InitiativeBar from '../components/combat/InitiativeBar';
import DiceRoller, { type DiceRollerHandle } from '../components/dice/DiceRoller';
import ChatPanel, { type ChatMessage } from '../components/chat/ChatPanel';
import { Button } from '../components/ui/button';
import { useGame, type Unit, type Player, type DieType, type Character } from '../contexts/GameContext';
import { useWebSocket, type WSMessage } from '../hooks/useWebSocket';

// Build the API base URL — hits wrangler on :8787 in dev, same origin in prod
function apiBase(): string {
  if (typeof window !== 'undefined' && (window.location.port === '5173' || import.meta.env.DEV)) {
    return `http://${window.location.hostname}:8787`;
  }
  return '';
}

export default function Game() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = roomId || 'default';
  const {
    setPlayers, setUnits, units, setCurrentPlayer, currentPlayer,
    rolls, selectedUnitId, characters,
  } = useGame();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [wsPlayerId, setWsPlayerId] = useState<string | null>(null);
  const diceRef = useRef<DiceRollerHandle>(null);
  const selectedUnit = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;

  // Game state
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [showCharacterPicker, setShowCharacterPicker] = useState(true);
  const [adventureStarted, setAdventureStarted] = useState(false);
  const [dmLoading, setDmLoading] = useState(false);
  const [encounterLoading, setEncounterLoading] = useState(false);
  const [dmHistory, setDmHistory] = useState<string[]>([]);
  const [actionInput, setActionInput] = useState('');

  // Initialize — no demo data, real data from character selection
  useEffect(() => {
    setCurrentPlayer({ id: currentPlayer.id, username: currentPlayer.username, controllerType: 'human' });
    setPlayers([
      { id: currentPlayer.id, username: currentPlayer.username, controllerType: 'human' },
      { id: 'ai-dm', username: 'Dungeon Master', controllerType: 'ai' },
    ]);
  }, [setCurrentPlayer, setPlayers, currentPlayer.id, currentPlayer.username]);

  // Show character picker if no character selected
  useEffect(() => {
    if (selectedCharacter) {
      setShowCharacterPicker(false);
    }
  }, [selectedCharacter]);

  // When a character is selected, create a unit for them
  const handleSelectCharacter = useCallback((char: Character) => {
    setSelectedCharacter(char);

    const unit: Unit = {
      id: `unit-${char.id}`,
      name: char.name,
      hp: char.hp,
      maxHp: char.maxHp,
      isCurrentTurn: false,
      type: 'player',
      playerId: currentPlayer.id,
      characterId: char.id,
    };
    setUnits([unit]);
    setShowCharacterPicker(false);
  }, [currentPlayer.id, setUnits]);

  // Add a DM narration to chat
  const addDmMessage = useCallback((text: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'dm',
        username: 'Dungeon Master',
        text,
        timestamp: Date.now(),
      },
    ]);
    setDmHistory((prev) => [...prev, text]);
  }, []);

  // Call the DM narration endpoint
  const callDmNarrate = useCallback(async (action?: string) => {
    if (!selectedCharacter) return;
    setDmLoading(true);
    try {
      const res = await fetch(`${apiBase()}/api/dm/narrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characters: [{
            name: selectedCharacter.name,
            race: selectedCharacter.race,
            class: selectedCharacter.class,
            level: selectedCharacter.level,
            hp: selectedCharacter.hp,
            maxHp: selectedCharacter.maxHp,
            ac: selectedCharacter.ac,
            stats: selectedCharacter.stats,
          }],
          context: adventureStarted ? 'The adventure is underway.' : '',
          action: action || '',
          history: dmHistory.slice(-10),
        }),
      });
      const data = await res.json() as { narration?: string; error?: string };
      if (data.narration) {
        addDmMessage(data.narration);
      } else {
        addDmMessage(data.error || 'The DM pauses, lost in thought...');
      }
    } catch {
      addDmMessage('*The DM\u2019s connection to the ethereal plane wavers...*');
    } finally {
      setDmLoading(false);
    }
  }, [selectedCharacter, adventureStarted, dmHistory, addDmMessage]);

  // Begin Adventure — first DM narration
  const handleBeginAdventure = useCallback(async () => {
    setAdventureStarted(true);
    await callDmNarrate('Set the scene for the beginning of a new adventure. The party gathers at a tavern.');
  }, [callDmNarrate]);

  // Player action — send to DM
  const handlePlayerAction = useCallback(async () => {
    const text = actionInput.trim();
    if (!text) return;
    setActionInput('');

    // Show the player's action in chat
    setChatMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'chat',
        playerId: currentPlayer.id,
        username: selectedCharacter?.name || currentPlayer.username,
        text: `*${text}*`,
        timestamp: Date.now(),
      },
    ]);

    await callDmNarrate(text);
  }, [actionInput, currentPlayer.id, currentPlayer.username, selectedCharacter, callDmNarrate]);

  // Generate encounter — spawn enemy units
  const handleGenerateEncounter = useCallback(async () => {
    if (!selectedCharacter) return;
    setEncounterLoading(true);
    try {
      const res = await fetch(`${apiBase()}/api/dm/encounter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partyLevel: selectedCharacter.level,
          partySize: 1,
          difficulty: 'medium',
          context: dmHistory.length > 0 ? dmHistory[dmHistory.length - 1] : 'a dark dungeon corridor',
        }),
      });
      const data = await res.json() as { enemies?: Array<{ name: string; hp: number; maxHp: number; ac: number }>; description?: string; error?: string };

      if (data.enemies && data.description) {
        // Add DM description
        addDmMessage(data.description);

        // Create enemy units
        const enemyUnits: Unit[] = data.enemies.map((e, i) => ({
          id: `enemy-${crypto.randomUUID().slice(0, 8)}-${i}`,
          name: e.name,
          hp: e.hp,
          maxHp: e.maxHp,
          isCurrentTurn: false,
          type: 'enemy' as const,
          playerId: 'ai-dm',
        }));

        // Add enemy units to existing units (keep player units)
        setUnits((prev: Unit[]) => [...prev.filter((u) => u.type === 'player'), ...enemyUnits]);
      } else {
        addDmMessage(data.error || 'The shadows stir, but nothing emerges...');
      }
    } catch {
      addDmMessage('*The encounter fades before it can materialize...*');
    } finally {
      setEncounterLoading(false);
    }
  }, [selectedCharacter, dmHistory, addDmMessage, setUnits]);

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
    username: selectedCharacter?.name || currentPlayer.username,
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

  // Character picker modal
  if (showCharacterPicker) {
    return (
      <div className="h-screen flex flex-col bg-slate-950 text-slate-100">
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center gap-4 shrink-0">
          <Button variant="ghost" onClick={() => navigate(`/lobby/${room}`)} className="text-slate-400 hover:text-white">
            &larr; Lobby
          </Button>
          <h1 className="text-lg font-bold text-[#F38020]">Choose Your Character</h1>
        </header>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full space-y-6">
            {characters.length === 0 ? (
              <div className="text-center space-y-4">
                <div className="text-6xl opacity-20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 mx-auto text-slate-600">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-400">No Characters Yet</h2>
                <p className="text-slate-500">Create a character before entering the game.</p>
                <Button onClick={() => navigate('/characters/new')} className="bg-[#F38020] hover:bg-[#e06a10] text-white px-6 py-3 text-lg font-bold rounded-xl">
                  Create Character
                </Button>
              </div>
            ) : (
              <>
                <p className="text-center text-slate-500">Select a character to enter the adventure</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {characters.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => handleSelectCharacter(char)}
                      className="flex items-center gap-4 p-4 rounded-xl border border-slate-700 bg-slate-900 hover:border-[#F38020] hover:bg-[#F38020]/5 transition-all text-left group"
                    >
                      {/* Portrait */}
                      {char.portrait ? (
                        <img src={char.portrait} alt={char.name} className="w-16 h-16 rounded-xl object-cover border border-slate-600 shrink-0" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-500 border border-slate-700 shrink-0">
                          {char.name.charAt(0)}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="text-lg font-bold text-white group-hover:text-[#F38020] transition-colors truncate">{char.name}</div>
                        <div className="text-sm text-slate-400">Level {char.level} {char.race} {char.class}</div>
                        <div className="flex gap-3 mt-1">
                          <span className="text-xs text-red-400">HP {char.hp}/{char.maxHp}</span>
                          <span className="text-xs text-sky-400">AC {char.ac}</span>
                        </div>
                      </div>

                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-600 group-hover:text-[#F38020] transition-colors shrink-0">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <button onClick={() => navigate('/characters/new')} className="text-sm text-slate-500 hover:text-[#F38020] transition-colors">
                    + Create New Character
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(`/lobby/${room}`)} className="text-slate-400 hover:text-white">
            &larr; Lobby
          </Button>
          <h1 className="text-lg font-bold text-[#F38020]">Adventure</h1>
          {selectedCharacter && (
            <span className="text-xs text-slate-400">
              Playing as <span className="text-white font-semibold">{selectedCharacter.name}</span>
            </span>
          )}
          {roomId && <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">Room: {roomId}</span>}
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${statusColor}`} />
            <span className="text-[10px] text-slate-500">{status}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCharacterPicker(true)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Switch Character
          </button>
          {rolls.length > 0 && (
            <span className="text-xs text-slate-500">
              {rolls.length} roll{rolls.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </header>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: initiative bar + game board / DM area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Initiative bar — only show when units exist */}
          {units.length > 0 && (
            <div className="bg-slate-900/50 border-b border-slate-800 shrink-0">
              <InitiativeBar entries={units} />
            </div>
          )}

          {/* Main content area */}
          <div className="flex-1 p-4 overflow-auto">
            {!adventureStarted ? (
              // Pre-adventure: Begin Adventure prompt
              <div className="rounded-xl border border-slate-800 bg-slate-900 flex flex-col items-center justify-center h-full gap-6 p-8">
                {selectedCharacter && (
                  <div className="flex items-center gap-4">
                    {selectedCharacter.portrait ? (
                      <img src={selectedCharacter.portrait} alt={selectedCharacter.name} className="w-20 h-20 rounded-xl object-cover border-2 border-amber-600/30" />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-slate-800 flex items-center justify-center text-3xl font-bold text-slate-500 border-2 border-slate-700">
                        {selectedCharacter.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-2xl font-bold text-white">{selectedCharacter.name}</div>
                      <div className="text-sm text-slate-400">Level {selectedCharacter.level} {selectedCharacter.race} {selectedCharacter.class}</div>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-red-400">HP {selectedCharacter.hp}/{selectedCharacter.maxHp}</span>
                        <span className="text-xs text-sky-400">AC {selectedCharacter.ac}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center space-y-2 max-w-md">
                  <h2 className="text-xl font-bold text-amber-400">Your Adventure Awaits</h2>
                  <p className="text-sm text-slate-500">
                    The AI Dungeon Master will set the scene and guide your journey. Make choices, explore, fight, and forge your legend.
                  </p>
                </div>

                <button
                  onClick={handleBeginAdventure}
                  disabled={dmLoading}
                  className="px-8 py-4 bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 disabled:opacity-40 text-white font-bold rounded-xl shadow-lg shadow-amber-900/30 transition-all active:scale-[0.98] text-lg flex items-center gap-2"
                >
                  {dmLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      The DM prepares...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5z" clipRule="evenodd" />
                      </svg>
                      Begin Adventure
                    </>
                  )}
                </button>
              </div>
            ) : (
              // Adventure in progress: DM tools + narration area
              <div className="rounded-xl border border-slate-800 bg-slate-900 flex flex-col h-full">
                {/* DM toolbar */}
                <div className="flex items-center gap-3 p-4 border-b border-slate-800">
                  <button
                    onClick={handleGenerateEncounter}
                    disabled={encounterLoading || dmLoading}
                    className="flex items-center gap-1.5 px-4 py-2 bg-red-900/40 hover:bg-red-900/60 border border-red-800/50 disabled:opacity-30 text-red-300 text-xs font-semibold rounded-lg transition-all"
                  >
                    {encounterLoading ? (
                      <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.723.723 0 01-.692 0l-.002-.001z" />
                      </svg>
                    )}
                    Generate Encounter
                  </button>

                  <div className="flex-1" />

                  <span className="text-[10px] text-slate-600">
                    {dmHistory.length} narration{dmHistory.length !== 1 ? 's' : ''} so far
                  </span>
                </div>

                {/* Narration display — shows recent DM messages prominently */}
                <div className="flex-1 p-6 overflow-auto space-y-4">
                  {dmHistory.length === 0 && (
                    <div className="text-center text-slate-600 py-12">
                      <p className="text-sm">The adventure unfolds here...</p>
                    </div>
                  )}

                  {dmHistory.map((text, i) => (
                    <div key={i} className="rounded-xl px-5 py-4 border border-amber-600/20 bg-gradient-to-br from-amber-950/30 to-stone-900/40">
                      <p className="text-amber-100/90 leading-relaxed italic">{text}</p>
                    </div>
                  ))}

                  {dmLoading && (
                    <div className="rounded-xl px-5 py-4 border border-amber-600/20 bg-gradient-to-br from-amber-950/30 to-stone-900/40 animate-pulse">
                      <div className="flex items-center gap-2 text-amber-500/60">
                        <div className="w-4 h-4 border-2 border-amber-500/60 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm italic">The Dungeon Master weaves the tale...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Player action input */}
                <div className="p-4 border-t border-slate-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={actionInput}
                      onChange={(e) => setActionInput(e.target.value)}
                      placeholder="What do you do? (e.g., 'I search the room for traps')"
                      className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600 outline-none transition-all"
                      onKeyDown={(e) => e.key === 'Enter' && handlePlayerAction()}
                      disabled={dmLoading}
                    />
                    <button
                      onClick={handlePlayerAction}
                      disabled={!actionInput.trim() || dmLoading}
                      className="px-5 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
                    >
                      Act
                    </button>
                  </div>
                </div>
              </div>
            )}
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
