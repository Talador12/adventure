import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import InitiativeBar from '../components/combat/InitiativeBar';
import BattleMap from '../components/combat/BattleMap';
import CharacterSheet from '../components/combat/CharacterSheet';
import DiceRoller, { type DiceRollerHandle } from '../components/dice/DiceRoller';
import ChatPanel, { type ChatMessage } from '../components/chat/ChatPanel';
import { Button } from '../components/ui/button';
import { useGame, type Unit, type DieType, type Character } from '../contexts/GameContext';
import { useWebSocket, type WSMessage } from '../hooks/useWebSocket';
import { playDiceRoll, playCritical, playFumble, playCombatHit, playCombatMiss, playEncounterStart, playTurnChange, playEnemyDeath, playPlayerJoin, isMuted, toggleMute } from '../hooks/useSoundFX';

// API base — empty string uses same origin, Vite proxy forwards /api to wrangler in dev
function apiBase(): string {
  return '';
}

export default function Game() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = roomId || 'default';
  const {
    setPlayers, setUnits, units, setCurrentPlayer, currentPlayer,
    rolls, selectedUnitId, characters,
    inCombat, setInCombat, rollInitiative, nextTurn, combatRound,
    damageUnit, removeUnit,
  } = useGame();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [wsPlayerId, setWsPlayerId] = useState<string | null>(null);
  const diceRef = useRef<DiceRollerHandle>(null);
  const selectedUnit = selectedUnitId ? units.find((u) => u.id === selectedUnitId) : null;

  // Game state
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [showCharacterPicker, setShowCharacterPicker] = useState(true);
  const [dmLoading, setDmLoading] = useState(false);
  const [encounterLoading, setEncounterLoading] = useState(false);
  // Persist DM history to localStorage keyed by room ID
  const dmStorageKey = `adventure:dm-history:${room}`;
  const [dmHistory, setDmHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(dmStorageKey);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [adventureStarted] = [dmHistory.length > 0]; // auto-detect from history
  const [actionInput, setActionInput] = useState('');
  const [soundMuted, setSoundMuted] = useState(isMuted());
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'narration' | 'map'>('narration');
  const [showSheet, setShowSheet] = useState(false);
  const [encounterDifficulty, setEncounterDifficulty] = useState<'easy' | 'medium' | 'hard' | 'deadly'>('medium');

  // NPC dialogue state
  const [npcMode, setNpcMode] = useState(false);
  const [npcName, setNpcName] = useState('');
  const [npcRole, setNpcRole] = useState('');
  const [npcLoading, setNpcLoading] = useState(false);
  const [npcDialogueHistory, setNpcDialogueHistory] = useState<string[]>([]);
  const [sceneName, setSceneName] = useState(() => {
    try { return localStorage.getItem(`adventure:scene:${room}`) || ''; } catch { return ''; }
  });

  // Persist DM history + scene to localStorage on every change
  useEffect(() => {
    try { localStorage.setItem(dmStorageKey, JSON.stringify(dmHistory)); } catch { /* full */ }
  }, [dmHistory, dmStorageKey]);
  useEffect(() => {
    try { localStorage.setItem(`adventure:scene:${room}`, sceneName); } catch { /* full */ }
  }, [sceneName, room]);

  // Ref for WebSocket send — avoids circular deps between callbacks and useWebSocket
  const sendRef = useRef<(msg: WSMessage) => void>(() => {});

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
      ac: char.ac,
      initiative: -1,
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

  // Build rich character payload for DM context
  const buildPartyPayload = useCallback(() => {
    // Send all party characters, not just the selected one
    const partyChars = selectedCharacter ? [selectedCharacter] : [];
    // Also include other player characters from the characters list
    for (const ch of characters) {
      if (!partyChars.find((p) => p.id === ch.id)) partyChars.push(ch);
    }
    return partyChars.map((ch) => ({
      name: ch.name,
      race: ch.race,
      class: ch.class,
      level: ch.level,
      hp: ch.hp,
      maxHp: ch.maxHp,
      ac: ch.ac,
      stats: ch.stats,
      alignment: ch.alignment,
      background: ch.background,
      condition: ch.condition,
      personalityTraits: ch.personalityTraits,
      ideals: ch.ideals,
      bonds: ch.bonds,
      flaws: ch.flaws,
      backstory: ch.backstory,
      appearanceDescription: ch.appearanceDescription,
    }));
  }, [selectedCharacter, characters]);

  // Call the DM narration endpoint
  const callDmNarrate = useCallback(async (action?: string) => {
    if (!selectedCharacter) return;
    setDmLoading(true);
    try {
      const res = await fetch(`${apiBase()}/api/dm/narrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characters: buildPartyPayload(),
          context: adventureStarted ? 'The adventure is underway.' : '',
          action: action || '',
          history: dmHistory.slice(-10),
          scene: sceneName,
        }),
      });
      const data = await res.json() as { narration?: string; error?: string };
      if (data.narration) {
        addDmMessage(data.narration);
        // Broadcast narration to all players via WebSocket
        sendRef.current({ type: 'dm_narrate', narration: data.narration });
      } else {
        addDmMessage(data.error || 'The DM pauses, lost in thought...');
      }
    } catch {
      addDmMessage('*The DM\u2019s connection to the ethereal plane wavers...*');
    } finally {
      setDmLoading(false);
    }
  }, [selectedCharacter, adventureStarted, dmHistory, addDmMessage, buildPartyPayload, sceneName]);

  // Call the NPC dialogue endpoint
  const callNpcDialogue = useCallback(async (playerMessage: string) => {
    if (!selectedCharacter || !npcName) return;
    setNpcLoading(true);
    try {
      const res = await fetch(`${apiBase()}/api/dm/npc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          npcName,
          npcRole,
          playerMessage,
          playerName: selectedCharacter.name,
          playerClass: selectedCharacter.class,
          scene: sceneName,
          dialogueHistory: npcDialogueHistory.slice(-8),
        }),
      });
      const data = await res.json() as { dialogue?: string; npcName?: string; error?: string };
      if (data.dialogue) {
        const npcText = data.dialogue;
        // Add NPC message to chat
        setChatMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: 'dm' as const,
            username: npcName,
            text: npcText,
            timestamp: Date.now(),
          },
        ]);
        setDmHistory((prev) => [...prev, `${npcName}: "${npcText}"`]);
        setNpcDialogueHistory((prev) => [...prev, `${selectedCharacter.name}: ${playerMessage}`, `${npcName}: ${npcText}`]);
        // Broadcast NPC dialogue to all players
        sendRef.current({ type: 'dm_npc', npcName, dialogue: npcText });
      } else {
        addDmMessage(data.error || `${npcName} stares at you blankly.`);
      }
    } catch {
      addDmMessage(`*${npcName} mutters something unintelligible...*`);
    } finally {
      setNpcLoading(false);
    }
  }, [selectedCharacter, npcName, npcRole, sceneName, npcDialogueHistory, addDmMessage]);

  // Auto-execute enemy turns: when an enemy unit becomes the active turn, auto-attack a player
  useEffect(() => {
    if (!inCombat) return;
    const currentUnit = units.find((u) => u.isCurrentTurn);
    if (!currentUnit || currentUnit.type !== 'enemy' || currentUnit.hp <= 0) return;

    // Find a living player to attack
    const playerTargets = units.filter((u) => u.type === 'player' && u.hp > 0);
    if (playerTargets.length === 0) return;

    const timer = setTimeout(() => {
      const target = playerTargets[Math.floor(Math.random() * playerTargets.length)];
      const attackRoll = Math.floor(Math.random() * 20) + 1;
      const attackBonus = 3; // generic enemy attack bonus
      const totalAttack = attackRoll + attackBonus;
      const isHit = attackRoll === 20 || totalAttack >= target.ac;
      const isCrit = attackRoll === 20;

      if (isHit) {
        const baseDmg = Math.floor(Math.random() * 6) + 1; // d6 weapon
        const dmg = isCrit ? baseDmg * 2 + 2 : baseDmg + 2;
        const finalDmg = Math.max(1, dmg);
        damageUnit(target.id, finalDmg);
        playCombatHit();
        if (isCrit) playCritical();
        const logMsg = isCrit
          ? `CRITICAL! ${currentUnit.name} strikes ${target.name} for ${finalDmg} damage! (${attackRoll}+${attackBonus}=${totalAttack} vs AC ${target.ac})`
          : `${currentUnit.name} hits ${target.name} for ${finalDmg} damage! (${attackRoll}+${attackBonus}=${totalAttack} vs AC ${target.ac})`;
        addDmMessage(logMsg);
      } else {
        playCombatMiss();
        addDmMessage(`${currentUnit.name} misses ${target.name}! (${attackRoll}+${attackBonus}=${totalAttack} vs AC ${target.ac})`);
      }

      // Auto-advance to next turn after enemy acts
      setTimeout(() => { nextTurn(); playTurnChange(); }, 600);
    }, 800); // delay before enemy acts for dramatic effect

    return () => clearTimeout(timer);
  }, [inCombat, units, damageUnit, addDmMessage, nextTurn]);

  // Begin Adventure — first DM narration
  // Begin adventure — callDmNarrate adds to dmHistory, which makes adventureStarted true
  const handleBeginAdventure = useCallback(async () => {
    await callDmNarrate('Set the scene for the beginning of a new adventure. The party gathers at a tavern.');
  }, [callDmNarrate]);

  // Player action — send to DM or NPC
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
        avatar: currentPlayer.avatar,
        text: npcMode ? `"${text}"` : `*${text}*`,
        timestamp: Date.now(),
      },
    ]);

    // Broadcast the action to all players
    sendRef.current({ type: 'dm_action', characterName: selectedCharacter?.name || currentPlayer.username, action: text });

    if (npcMode) {
      await callNpcDialogue(text);
    } else {
      await callDmNarrate(text);
    }
  }, [actionInput, currentPlayer.id, currentPlayer.username, selectedCharacter, callDmNarrate, callNpcDialogue, npcMode]);

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
          difficulty: encounterDifficulty,
          context: dmHistory.length > 0 ? dmHistory[dmHistory.length - 1] : 'a dark dungeon corridor',
        }),
      });
      const data = await res.json() as { enemies?: Array<{ name: string; hp: number; maxHp: number; ac: number }>; description?: string; error?: string };

      if (data.enemies && data.description) {
        // Add DM description
        addDmMessage(data.description);
        playEncounterStart();

        // Create enemy units
        const enemyUnits: Unit[] = data.enemies.map((e, i) => ({
          id: `enemy-${crypto.randomUUID().slice(0, 8)}-${i}`,
          name: e.name,
          hp: e.hp,
          maxHp: e.maxHp,
          ac: e.ac || 12,
          initiative: -1,
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
  }, [selectedCharacter, dmHistory, addDmMessage, setUnits, encounterDifficulty]);

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
            avatar: msg.avatar as string | undefined,
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
            avatar: msg.avatar as string | undefined,
            text: '',
            timestamp: msg.timestamp as number,
            die: msg.die as string,
            value: msg.value as number,
            isCritical: msg.isCritical as boolean,
            isFumble: msg.isFumble as boolean,
            unitName: msg.unitName as string | undefined,
          },
        ]);
        // Sound FX
        playDiceRoll();
        if (msg.isCritical) setTimeout(playCritical, 400);
        if (msg.isFumble) setTimeout(playFumble, 400);

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
        playPlayerJoin();
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

      case 'dm_narrate':
        // DM narration broadcast from another player — only add if we didn't trigger it
        if (msg.playerId !== wsPlayerId) {
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'dm',
              username: 'Dungeon Master',
              text: msg.narration as string,
              timestamp: msg.timestamp as number,
            },
          ]);
          setDmHistory((prev) => [...prev, msg.narration as string]);
        }
        break;

      case 'dm_npc':
        // NPC dialogue broadcast from another player
        if (msg.playerId !== wsPlayerId) {
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'dm',
              username: msg.npcName as string,
              text: msg.dialogue as string,
              timestamp: msg.timestamp as number,
            },
          ]);
          setDmHistory((prev) => [...prev, `${msg.npcName}: "${msg.dialogue}"`]);
        }
        break;

      case 'dm_action':
        // Another player's action broadcast — show it in chat
        if (msg.playerId !== wsPlayerId) {
          setChatMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'chat',
              playerId: msg.playerId as string,
              username: msg.characterName as string || msg.username as string,
              text: `*${msg.action}*`,
              timestamp: msg.timestamp as number,
            },
          ]);
        }
        break;
    }
  }, [wsPlayerId]);

  const { status, send } = useWebSocket({
    roomId: room,
    username: selectedCharacter?.name || currentPlayer.username,
    onMessage: handleWsMessage,
  });
  sendRef.current = send;

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
          {/* Sound toggle */}
          <button
            onClick={() => { toggleMute(); setSoundMuted(!soundMuted); }}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {soundMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M9.547 3.062A.75.75 0 0110 3.75v12.5a.75.75 0 01-1.264.546L5.203 13H3.75A.75.75 0 013 12.25v-4.5A.75.75 0 013.75 7h1.453l3.533-3.796a.75.75 0 01.811-.142zM13.78 7.22a.75.75 0 10-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 001.06 1.06L15.5 11.06l1.72 1.72a.75.75 0 101.06-1.06L16.56 10l1.72-1.72a.75.75 0 00-1.06-1.06L15.5 8.94l-1.72-1.72z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 3.75a.75.75 0 00-1.264-.546L5.203 7H3.75A.75.75 0 003 7.75v4.5a.75.75 0 00.75.75h1.453l3.533 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.06 5.5 5.5 0 010 7.78.75.75 0 001.06 1.06 7 7 0 000-9.9z" /><path d="M13.829 7.172a.75.75 0 00-1.06 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" /></svg>
            )}
          </button>
          <button
            onClick={() => setShowCharacterPicker(true)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Switch Character
          </button>
          {inCombat && (
            <span className="text-xs text-red-400 font-semibold">
              Round {combatRound}
            </span>
          )}
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
              // Adventure in progress: DM tools + narration/map area
              <div className="rounded-xl border border-slate-800 bg-slate-900 flex flex-col h-full">
                {/* View tabs */}
                <div className="flex items-center border-b border-slate-800 shrink-0">
                  <button
                    onClick={() => setActiveView('narration')}
                    className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'narration' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                  >
                    Narration
                  </button>
                  <button
                    onClick={() => setActiveView('map')}
                    className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 ${activeView === 'map' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                  >
                    Battle Map
                  </button>
                </div>

                {/* DM + Combat toolbar */}
                <div className="flex items-center gap-2 p-3 border-b border-slate-800 flex-wrap">
                  <button
                    onClick={handleGenerateEncounter}
                    disabled={encounterLoading || dmLoading}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/40 hover:bg-red-900/60 border border-red-800/50 disabled:opacity-30 text-red-300 text-xs font-semibold rounded-lg transition-all"
                  >
                    {encounterLoading ? (
                      <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M9.944 3.143a.75.75 0 01.112 1.056l-2.4 3h2.594a.75.75 0 01.59 1.213l-3.75 4.5a.75.75 0 11-1.152-.96l2.4-3H5.744a.75.75 0 01-.59-1.213l3.75-4.5a.75.75 0 011.04-.096z" clipRule="evenodd" /><path fillRule="evenodd" d="M13.944 6.143a.75.75 0 01.112 1.056l-1.2 1.5h1.394a.75.75 0 01.59 1.213l-2.25 2.7a.75.75 0 11-1.152-.96l1.2-1.5h-1.394a.75.75 0 01-.59-1.213l2.25-2.7a.75.75 0 011.04-.096z" clipRule="evenodd" /></svg>
                    )}
                    Encounter
                  </button>

                  {/* Difficulty selector */}
                  <select
                    value={encounterDifficulty}
                    onChange={(e) => setEncounterDifficulty(e.target.value as typeof encounterDifficulty)}
                    className="text-[10px] px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 outline-none"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="deadly">Deadly</option>
                  </select>

                  {/* NPC Talk toggle */}
                  <button
                    onClick={() => {
                      if (npcMode) {
                        setNpcMode(false);
                        setNpcDialogueHistory([]);
                      } else {
                        setNpcMode(true);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all ${npcMode ? 'bg-purple-600/40 border-purple-500/50 text-purple-200' : 'bg-purple-900/40 hover:bg-purple-900/60 border-purple-800/50 text-purple-300'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 3.976 1 5.365v2.171c0 1.388.993 2.61 2.43 2.841A41.587 41.587 0 0010 11c2.233 0 4.412-.187 6.57-.623C18.007 10.146 19 8.924 19 7.536V5.365c0-1.389-.993-2.61-2.43-2.841A41.587 41.587 0 0010 2zM1 13.694v-1.358C2.32 13.107 4.106 13.5 6 13.695v.705A4.5 4.5 0 011.5 18H1v-4.306zM14 14.4v-.705c1.894-.196 3.68-.588 5-1.36v1.359L19 18h-.5A4.5 4.5 0 0114 14.4z" clipRule="evenodd" /></svg>
                    {npcMode ? 'End Talk' : 'Talk NPC'}
                  </button>

                  {/* Scene name input — compact inline */}
                  <input
                    type="text"
                    value={sceneName}
                    onChange={(e) => setSceneName(e.target.value)}
                    placeholder="Scene..."
                    className="text-[10px] px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-600 outline-none w-24 focus:w-40 transition-all focus:ring-1 focus:ring-amber-600/50"
                  />

                  {/* Combat controls — show when enemies exist */}
                  {units.some((u) => u.type === 'enemy') && (
                    <>
                      {!inCombat ? (
                        <button
                          onClick={() => { rollInitiative(); playTurnChange(); setCombatLog((prev) => [...prev, 'Initiative rolled! Combat begins.']); addDmMessage('Roll for initiative!'); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-900/40 hover:bg-yellow-900/60 border border-yellow-700/50 text-yellow-300 text-xs font-semibold rounded-lg transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06a.75.75 0 11-1.06 1.061L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.061-1.06l1.06-1.06a.75.75 0 011.06 0zM10 7a3 3 0 100 6 3 3 0 000-6zm-6.25 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
                          Roll Initiative
                        </button>
                      ) : (
                        <button
                          onClick={() => { nextTurn(); playTurnChange(); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-900/40 hover:bg-green-900/60 border border-green-700/50 text-green-300 text-xs font-semibold rounded-lg transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" /></svg>
                          Next Turn
                        </button>
                      )}

                      {/* Quick attack — roll d20 vs selected enemy */}
                      {inCombat && selectedUnitId && (() => {
                        const target = units.find((u) => u.id === selectedUnitId);
                        if (!target || target.type === 'player') return null;
                        return (
                          <button
                            onClick={() => {
                              const attackRoll = Math.floor(Math.random() * 20) + 1;
                              const strMod = selectedCharacter ? Math.floor((selectedCharacter.stats.STR - 10) / 2) : 0;
                              const totalAttack = attackRoll + strMod;
                              const isHit = totalAttack >= target.ac;
                              const isCrit = attackRoll === 20;

                              if (isCrit || isHit) {
                                const baseDmg = Math.floor(Math.random() * 8) + 1; // d8 weapon
                                const dmg = isCrit ? baseDmg * 2 + strMod : baseDmg + strMod;
                                const finalDmg = Math.max(1, dmg);
                                damageUnit(target.id, finalDmg);
                                playCombatHit();
                                if (isCrit) playCritical();
                                const logMsg = isCrit
                                  ? `CRITICAL HIT! ${selectedCharacter?.name || 'You'} strikes ${target.name} for ${finalDmg} damage! (rolled ${attackRoll}+${strMod}=${totalAttack} vs AC ${target.ac})`
                                  : `${selectedCharacter?.name || 'You'} hits ${target.name} for ${finalDmg} damage! (rolled ${attackRoll}+${strMod}=${totalAttack} vs AC ${target.ac})`;
                                setCombatLog((prev) => [...prev, logMsg]);
                                addDmMessage(logMsg);

                                // Check if target died
                                if (target.hp - finalDmg <= 0) {
                                  playEnemyDeath();
                                  const deathMsg = `${target.name} falls!`;
                                  setCombatLog((prev) => [...prev, deathMsg]);
                                  addDmMessage(deathMsg);
                                }
                              } else {
                                playCombatMiss();
                                const missMsg = `${selectedCharacter?.name || 'You'} misses ${target.name}! (rolled ${attackRoll}+${strMod}=${totalAttack} vs AC ${target.ac})`;
                                setCombatLog((prev) => [...prev, missMsg]);
                                addDmMessage(missMsg);
                              }
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-900/40 hover:bg-orange-900/60 border border-orange-700/50 text-orange-300 text-xs font-semibold rounded-lg transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" /></svg>
                            Attack {target.name}
                          </button>
                        );
                      })()}
                      {/* End Combat button */}
                      {inCombat && (
                        <button
                          onClick={() => {
                            setInCombat(false);
                            // Remove dead enemies, reset initiative
                            setUnits((prev: Unit[]) => prev
                              .filter((u) => u.type === 'player' || u.hp > 0)
                              .map((u) => ({ ...u, isCurrentTurn: false, initiative: -1 })));
                            addDmMessage('The battle ends. You catch your breath.');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-300 text-xs font-semibold rounded-lg transition-all"
                        >
                          End Combat
                        </button>
                      )}
                    </>
                  )}

                  <div className="flex-1" />

                  <span className="text-[10px] text-slate-600">
                    {dmHistory.length} narration{dmHistory.length !== 1 ? 's' : ''}{inCombat ? ` | Round ${combatRound}` : ''}
                  </span>
                </div>

                {activeView === 'narration' ? (
                  <>
                    {/* NPC setup panel — shown when NPC mode is active */}
                    {npcMode && (
                      <div className="p-3 border-b border-purple-800/30 bg-purple-950/20 flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">Talking to:</span>
                        <input
                          type="text"
                          value={npcName}
                          onChange={(e) => setNpcName(e.target.value)}
                          placeholder="NPC name..."
                          className="text-xs px-2 py-1.5 bg-slate-800 border border-purple-700/50 rounded-lg text-purple-200 placeholder-slate-600 outline-none w-32 focus:ring-1 focus:ring-purple-500/50"
                        />
                        <input
                          type="text"
                          value={npcRole}
                          onChange={(e) => setNpcRole(e.target.value)}
                          placeholder="Role (e.g., tavern keeper, guard captain)..."
                          className="text-xs px-2 py-1.5 bg-slate-800 border border-purple-700/50 rounded-lg text-purple-200 placeholder-slate-600 outline-none flex-1 min-w-40 focus:ring-1 focus:ring-purple-500/50"
                        />
                      </div>
                    )}

                    {/* Narration display — shows recent DM messages prominently */}
                    <div className="flex-1 p-6 overflow-auto space-y-4">
                      {dmHistory.length === 0 && (
                        <div className="text-center text-slate-600 py-12">
                          <p className="text-sm">The adventure unfolds here...</p>
                        </div>
                      )}

                      {dmHistory.map((text, i) => {
                        // NPC dialogue lines (format: "NpcName: "dialogue"")
                        const npcMatch = text.match(/^(.+?):\s*"(.+)"$/);
                        if (npcMatch) {
                          return (
                            <div key={i} className="rounded-xl px-5 py-4 border border-purple-600/20 bg-gradient-to-br from-purple-950/30 to-slate-900/40">
                              <div className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">{npcMatch[1]}</div>
                              <p className="text-purple-100/90 leading-relaxed">&ldquo;{npcMatch[2]}&rdquo;</p>
                            </div>
                          );
                        }
                        // Combat log entries (attacks, initiative) use a different style
                        const isCombatEntry = text.includes('hits ') || text.includes('misses ') || text.includes('CRITICAL') || text.includes('falls!') || text.includes('Initiative');
                        return (
                          <div key={i} className={`rounded-xl px-5 py-4 border ${isCombatEntry ? 'border-slate-700/50 bg-slate-800/40' : 'border-amber-600/20 bg-gradient-to-br from-amber-950/30 to-stone-900/40'}`}>
                            <p className={`leading-relaxed ${isCombatEntry ? 'text-slate-300 text-sm font-mono' : 'text-amber-100/90 italic'}`}>{text}</p>
                          </div>
                        );
                      })}

                      {(dmLoading || npcLoading) && (
                        <div className={`rounded-xl px-5 py-4 border animate-pulse ${npcLoading ? 'border-purple-600/20 bg-gradient-to-br from-purple-950/30 to-slate-900/40' : 'border-amber-600/20 bg-gradient-to-br from-amber-950/30 to-stone-900/40'}`}>
                          <div className={`flex items-center gap-2 ${npcLoading ? 'text-purple-500/60' : 'text-amber-500/60'}`}>
                            <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${npcLoading ? 'border-purple-500/60' : 'border-amber-500/60'}`} />
                            <span className="text-sm italic">{npcLoading ? `${npcName || 'The NPC'} considers their words...` : 'The Dungeon Master weaves the tale...'}</span>
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
                          placeholder={npcMode ? `Say something to ${npcName || 'the NPC'}...` : "What do you do? (e.g., 'I search the room for traps')"}
                          className={`flex-1 px-4 py-3 bg-slate-800 border rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all ${npcMode ? 'border-purple-700/50 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-600' : 'border-slate-700 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600'}`}
                          onKeyDown={(e) => e.key === 'Enter' && handlePlayerAction()}
                          disabled={dmLoading || npcLoading}
                        />
                        <button
                          onClick={handlePlayerAction}
                          disabled={!actionInput.trim() || dmLoading || npcLoading}
                          className={`px-5 py-3 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors ${npcMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-amber-600 hover:bg-amber-500'}`}
                        >
                          {npcMode ? 'Speak' : 'Act'}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Battle Map view */
                  <BattleMap />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar: character sheet / dice / chat */}
        <div className="w-80 border-l border-slate-800 bg-slate-900 flex flex-col shrink-0">
          {/* Sidebar tabs */}
          {selectedCharacter && (
            <div className="flex border-b border-slate-800 shrink-0">
              <button
                onClick={() => setShowSheet(false)}
                className={`flex-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all border-b-2 ${!showSheet ? 'border-[#F38020] text-[#F38020]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                Dice & Chat
              </button>
              <button
                onClick={() => setShowSheet(true)}
                className={`flex-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all border-b-2 ${showSheet ? 'border-[#F38020] text-[#F38020]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                Character
              </button>
            </div>
          )}

          {showSheet && selectedCharacter ? (
            <div className="flex-1 overflow-y-auto p-4">
              <CharacterSheet character={selectedCharacter} />
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-slate-800 overflow-y-auto">
                <DiceRoller ref={diceRef} onLocalRoll={handleLocalRoll} useServerRolls={status === 'connected'} />
              </div>
              <div className="flex-1 flex flex-col p-4 overflow-hidden">
                <ChatPanel messages={chatMessages} onSend={handleChatSend} currentPlayerId={wsPlayerId || currentPlayer.id} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
