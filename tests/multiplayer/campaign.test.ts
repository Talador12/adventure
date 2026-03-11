// Multiplayer campaign tests - 3-player WebSocket session via Miniflare's Lobby DO
// Tests the full player lifecycle, message relay, server-authoritative dice, and broadcast patterns
import { describe, it, expect, beforeEach } from 'vitest';
import { env } from 'cloudflare:test';

// Helper: connect a player to the Lobby DO and return the client WebSocket
async function connectPlayer(roomId: string): Promise<WebSocket> {
  const id = env.LOBBY.idFromName(roomId);
  const stub = env.LOBBY.get(id);
  const resp = await stub.fetch('http://fake/ws', {
    headers: { Upgrade: 'websocket' },
  });
  const ws = resp.webSocket!;
  ws.accept();
  return ws;
}

// Helper: send a JSON message
function send(ws: WebSocket, msg: Record<string, unknown>) {
  ws.send(JSON.stringify(msg));
}

// Helper: wait for a single message of a specific type
function waitForMessage(
  ws: WebSocket,
  type: string,
  timeoutMs = 2000,
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timeout waiting for ${type}`)), timeoutMs);
    const handler = (event: MessageEvent) => {
      const data = JSON.parse(event.data as string);
      if (data.type === type) {
        clearTimeout(timer);
        ws.removeEventListener('message', handler);
        resolve(data);
      }
    };
    ws.addEventListener('message', handler);
  });
}

// Helper: close a WebSocket and wait for the close event to fully propagate.
// This prevents the Miniflare isolated storage frame error that occurs when the
// DO's close handler fires after the test suite's storage frame has already popped.
function closeAndWait(ws: WebSocket, timeoutMs = 2000): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, timeoutMs);
    ws.addEventListener('close', () => {
      clearTimeout(timer);
      resolve();
    });
    ws.close();
  });
}

// ---------------------------------------------------------------------------
// Multi-member campaign
// ---------------------------------------------------------------------------
describe('multiplayer campaign - 3-player party', () => {
  const ROOM = 'test-campaign-' + Date.now();

  // The party:
  // Player 1: Aric the Brave (Fighter) - arrives first
  // Player 2: Lyra Starweaver (Wizard) - arrives second
  // Player 3: Thorne Ironheart (Cleric) - arrives last

  it('full campaign session lifecycle', async () => {
    // --- Player 1 joins ---
    const ws1 = await connectPlayer(ROOM);
    const welcome1Promise = waitForMessage(ws1, 'welcome');
    send(ws1, { type: 'join', username: 'Aric the Brave', avatar: 'fighter.png' });
    const welcome1 = await welcome1Promise;

    expect(welcome1.type).toBe('welcome');
    expect(welcome1.playerId).toBeTruthy();
    expect((welcome1.players as unknown[]).length).toBe(1);
    const player1Id = welcome1.playerId as string;

    // --- Player 2 joins ---
    const ws2 = await connectPlayer(ROOM);

    // Player 1 should receive player_joined for player 2
    const p1SeesJoin2 = waitForMessage(ws1, 'player_joined');

    const welcome2Promise = waitForMessage(ws2, 'welcome');
    send(ws2, { type: 'join', username: 'Lyra Starweaver' });
    const welcome2 = await welcome2Promise;

    expect((welcome2.players as unknown[]).length).toBe(2);
    const player2Id = welcome2.playerId as string;

    const join2Msg = await p1SeesJoin2;
    expect(join2Msg.username).toBe('Lyra Starweaver');
    expect((join2Msg.players as unknown[]).length).toBe(2);

    // --- Player 3 joins ---
    const ws3 = await connectPlayer(ROOM);
    const welcome3Promise = waitForMessage(ws3, 'welcome');
    send(ws3, { type: 'join', username: 'Thorne Ironheart' });
    const welcome3 = await welcome3Promise;

    expect((welcome3.players as unknown[]).length).toBe(3);
    const player3Id = welcome3.playerId as string;

    // All three player IDs should be unique
    expect(new Set([player1Id, player2Id, player3Id]).size).toBe(3);

    // --- Chat: Player 1 speaks, everyone hears ---
    const p2Chat = waitForMessage(ws2, 'chat');
    const p3Chat = waitForMessage(ws3, 'chat');

    send(ws1, { type: 'chat', message: 'Hail, adventurers! Shall we enter the dungeon?' });

    const chat2 = await p2Chat;
    const chat3 = await p3Chat;
    expect(chat2.username).toBe('Aric the Brave');
    expect(chat2.message).toBe('Hail, adventurers! Shall we enter the dungeon?');
    expect(chat3.message).toBe('Hail, adventurers! Shall we enter the dungeon?');

    // --- Dice: Player 2 rolls, server generates the value ---
    const p1Roll = waitForMessage(ws1, 'roll_result');
    const p2Roll = waitForMessage(ws2, 'roll_result');
    const p3Roll = waitForMessage(ws3, 'roll_result');

    send(ws2, { type: 'roll', die: 'd20', sides: 20, unitId: 'lyra-1', unitName: 'Lyra' });

    const roll1 = await p1Roll;
    const roll2 = await p2Roll;
    const roll3 = await p3Roll;

    // All three see the same roll result (server-authoritative)
    expect(roll1.value).toBe(roll2.value);
    expect(roll2.value).toBe(roll3.value);
    expect(roll1.die).toBe('d20');
    expect(roll1.sides).toBe(20);
    expect(roll1.username).toBe('Lyra Starweaver');
    expect(roll1.unitName).toBe('Lyra');
    expect(typeof roll1.value).toBe('number');
    expect(roll1.value as number).toBeGreaterThanOrEqual(1);
    expect(roll1.value as number).toBeLessThanOrEqual(20);

    // Crit/fumble flags are consistent
    expect(roll1.isCritical).toBe(roll1.value === 20);
    expect(roll1.isFumble).toBe(roll1.value === 1);

    // --- DM Narration: Player 1 narrates, everyone hears ---
    const p2Narrate = waitForMessage(ws2, 'dm_narrate');
    const p3Narrate = waitForMessage(ws3, 'dm_narrate');

    send(ws1, { type: 'dm_narrate', narration: 'The dungeon door creaks open...' });

    const narr2 = await p2Narrate;
    const narr3 = await p3Narrate;
    expect(narr2.narration).toBe('The dungeon door creaks open...');
    expect(narr3.narration).toBe('The dungeon door creaks open...');
    expect(narr2.username).toBe('Aric the Brave');

    // --- NPC Dialogue: Player 1 triggers NPC, everyone hears ---
    const p2Npc = waitForMessage(ws2, 'dm_npc');
    const p3Npc = waitForMessage(ws3, 'dm_npc');

    send(ws1, { type: 'dm_npc', npcName: 'Bartender Grim', dialogue: 'Ye look like trouble. What do ye want?' });

    const npc2 = await p2Npc;
    const npc3 = await p3Npc;
    expect(npc2.npcName).toBe('Bartender Grim');
    expect(npc3.dialogue).toBe('Ye look like trouble. What do ye want?');

    // --- Player Action: DM (Player 1) describes Thorne's action, everyone hears ---
    // Only the DM can send dm_action messages (Phase 8.3 auth)
    const p2Action = waitForMessage(ws2, 'dm_action');
    const p3Action = waitForMessage(ws3, 'dm_action');

    send(ws1, { type: 'dm_action', characterName: 'Thorne', action: 'casts Healing Word on Aric' });

    const action2 = await p2Action;
    const action3 = await p3Action;
    expect(action2.characterName).toBe('Thorne');
    expect(action3.action).toBe('casts Healing Word on Aric');

    // --- Draw: Player 2 draws, only others see it (not sender) ---
    const p1Draw = waitForMessage(ws1, 'draw');
    const p3Draw = waitForMessage(ws3, 'draw');

    send(ws2, { type: 'draw', x1: 10, y1: 20, x2: 30, y2: 40, color: '#ff0000', width: 3 });

    const draw1 = await p1Draw;
    const draw3 = await p3Draw;
    expect(draw1.x1).toBe(10);
    expect(draw3.color).toBe('#ff0000');

    // --- Player 2 disconnects ---
    const p1Left = waitForMessage(ws1, 'player_left');
    const p3Left = waitForMessage(ws3, 'player_left');

    ws2.close();

    const left1 = await p1Left;
    const left3 = await p3Left;
    expect(left1.username).toBe('Lyra Starweaver');
    expect((left1.players as unknown[]).length).toBe(2);
    expect((left3.players as unknown[]).length).toBe(2);

    // --- Chat still works with 2 players ---
    const p3Chat2 = waitForMessage(ws3, 'chat');
    send(ws1, { type: 'chat', message: 'Lyra has fallen! We press on.' });
    const chat3b = await p3Chat2;
    expect(chat3b.message).toBe('Lyra has fallen! We press on.');

    // Cleanup: close remaining sockets and wait for DO close handlers to finish.
    // This prevents the Miniflare isolated storage frame pop error.
    await Promise.all([closeAndWait(ws1), closeAndWait(ws3)]);
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe('multiplayer edge cases', () => {
  it('empty chat messages are silently dropped', async () => {
    const ws = await connectPlayer('edge-empty-chat-' + Date.now());
    send(ws, { type: 'join', username: 'Test' });
    await waitForMessage(ws, 'welcome');

    // Send empty message - should NOT produce a chat broadcast
    send(ws, { type: 'chat', message: '   ' });

    // Send a valid message to confirm the socket is still working
    const chatPromise = waitForMessage(ws, 'chat');
    send(ws, { type: 'chat', message: 'hello' });
    const msg = await chatPromise;
    expect(msg.message).toBe('hello');
    await closeAndWait(ws);
  });

  it('dice sides are clamped to 2-100, falsy defaults to d20', async () => {
    const ws = await connectPlayer('edge-dice-clamp-' + Date.now());
    send(ws, { type: 'join', username: 'Roller' });
    await waitForMessage(ws, 'welcome');

    // sides=0 is falsy -> defaults to 20 (d20), then clamped to [2,100]
    const rollPromise = waitForMessage(ws, 'roll_result');
    send(ws, { type: 'roll', sides: 0 });
    const roll = await rollPromise;
    expect(roll.sides).toBe(20); // Number(0) || 20 = 20
    expect(roll.value as number).toBeGreaterThanOrEqual(1);
    expect(roll.value as number).toBeLessThanOrEqual(20);

    // sides=1 is truthy -> clamps to min 2
    const rollPromise1b = waitForMessage(ws, 'roll_result');
    send(ws, { type: 'roll', sides: 1 });
    const roll1b = await rollPromise1b;
    expect(roll1b.sides).toBe(2);

    // sides=999 -> clamps to max 100
    const rollPromise2 = waitForMessage(ws, 'roll_result');
    send(ws, { type: 'roll', sides: 999 });
    const roll2 = await rollPromise2;
    expect(roll2.sides).toBe(100);

    await closeAndWait(ws);
  });

  it('unknown message type returns error to sender', async () => {
    const ws = await connectPlayer('edge-unknown-' + Date.now());
    send(ws, { type: 'join', username: 'Test' });
    await waitForMessage(ws, 'welcome');

    const errPromise = waitForMessage(ws, 'error');
    send(ws, { type: 'totally_bogus_type' });
    const err = await errPromise;
    expect(err.message).toContain('Unknown message type');
    await closeAndWait(ws);
  });

  it('ping responds with pong', async () => {
    const ws = await connectPlayer('edge-ping-' + Date.now());
    send(ws, { type: 'join', username: 'Pinger' });
    await waitForMessage(ws, 'welcome');

    const pongPromise = waitForMessage(ws, 'pong');
    send(ws, { type: 'ping' });
    const pong = await pongPromise;
    expect(pong.type).toBe('pong');
    expect(pong.timestamp).toBeTruthy();
    await closeAndWait(ws);
  });

  it('REST /players endpoint returns player list', async () => {
    const room = 'edge-rest-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'RestTest' });
    await waitForMessage(ws, 'welcome');

    // Hit the REST endpoint
    const id = env.LOBBY.idFromName(room);
    const stub = env.LOBBY.get(id);
    const resp = await stub.fetch('http://fake/players');
    const data = (await resp.json()) as { players: unknown[] };

    expect(data.players.length).toBe(1);
    expect((data.players[0] as Record<string, string>).username).toBe('RestTest');
    await closeAndWait(ws);
  });
});

// ---------------------------------------------------------------------------
// Phase 8: Session robustness
// ---------------------------------------------------------------------------
describe('Phase 8 — session robustness', () => {
  it('first joiner becomes DM, welcome includes isDM + dmPlayerId', async () => {
    const room = 'p8-dm-assign-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'DungeonMaster' });
    const welcome1 = await waitForMessage(ws1, 'welcome');

    expect(welcome1.isDM).toBe(true);
    expect(welcome1.dmPlayerId).toBe(welcome1.playerId);

    // Second player is NOT DM
    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Player2' });
    const welcome2 = await waitForMessage(ws2, 'welcome');

    expect(welcome2.isDM).toBe(false);
    expect(welcome2.dmPlayerId).toBe(welcome1.playerId);

    // Player list reflects DM status
    const players = welcome2.players as Array<Record<string, unknown>>;
    const dm = players.find((p) => p.isDM === true);
    expect(dm).toBeTruthy();
    expect(dm!.username).toBe('DungeonMaster');

    await Promise.all([closeAndWait(ws1), closeAndWait(ws2)]);
  });

  it('DM-only messages are rejected from non-DM players', async () => {
    const room = 'p8-dm-auth-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'TheDM' });
    await waitForMessage(ws1, 'welcome');

    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Player' });
    await waitForMessage(ws2, 'welcome');

    // Player tries to send dm_narrate — should get error
    const errPromise = waitForMessage(ws2, 'error');
    send(ws2, { type: 'dm_narrate', narration: 'I am not the DM!' });
    const err = await errPromise;
    expect(err.message).toContain('Only the DM');

    // DM can send dm_narrate — player receives it
    const narratePromise = waitForMessage(ws2, 'dm_narrate');
    send(ws1, { type: 'dm_narrate', narration: 'A dragon appears!' });
    const narrate = await narratePromise;
    expect(narrate.narration).toBe('A dragon appears!');

    await Promise.all([closeAndWait(ws1), closeAndWait(ws2)]);
  });

  it('DM transfer works and updates all clients', async () => {
    const room = 'p8-dm-transfer-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'OriginalDM' });
    const welcome1 = await waitForMessage(ws1, 'welcome');
    const dm1Id = welcome1.playerId as string;

    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'NewDM' });
    const welcome2 = await waitForMessage(ws2, 'welcome');
    const p2Id = welcome2.playerId as string;

    // Non-DM cannot transfer
    const errPromise = waitForMessage(ws2, 'error');
    send(ws2, { type: 'transfer_dm', targetPlayerId: dm1Id });
    const err = await errPromise;
    expect(err.message).toContain('Only the DM');

    // DM transfers to player 2
    const changed1 = waitForMessage(ws1, 'dm_changed');
    const changed2 = waitForMessage(ws2, 'dm_changed');
    send(ws1, { type: 'transfer_dm', targetPlayerId: p2Id });

    const c1 = await changed1;
    const c2 = await changed2;
    expect(c1.dmPlayerId).toBe(p2Id);
    expect(c2.dmUsername).toBe('NewDM');

    // Now player 2 can send DM messages
    const narratePromise = waitForMessage(ws1, 'dm_narrate');
    send(ws2, { type: 'dm_narrate', narration: 'New DM narrates!' });
    const narrate = await narratePromise;
    expect(narrate.narration).toBe('New DM narrates!');

    // And player 1 can no longer send DM messages
    const err2Promise = waitForMessage(ws1, 'error');
    send(ws1, { type: 'dm_narrate', narration: 'I lost DM powers' });
    const err2 = await err2Promise;
    expect(err2.message).toContain('Only the DM');

    await Promise.all([closeAndWait(ws1), closeAndWait(ws2)]);
  });

  it('DM reassigns to oldest player when DM disconnects', async () => {
    const room = 'p8-dm-reassign-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'OriginalDM' });
    await waitForMessage(ws1, 'welcome');

    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Survivor' });
    await waitForMessage(ws2, 'welcome');

    // DM disconnects — player 2 should receive dm_changed
    const changedPromise = waitForMessage(ws2, 'dm_changed');
    await closeAndWait(ws1);

    const changed = await changedPromise;
    expect(changed.dmUsername).toBe('Survivor');

    // Survivor can now send DM messages
    const ws3 = await connectPlayer(room);
    send(ws3, { type: 'join', username: 'LateJoiner' });
    const welcome3 = await waitForMessage(ws3, 'welcome');
    expect(welcome3.isDM).toBe(false);

    const narratePromise = waitForMessage(ws3, 'dm_narrate');
    send(ws2, { type: 'dm_narrate', narration: 'Survivor takes over!' });
    const narrate = await narratePromise;
    expect(narrate.narration).toBe('Survivor takes over!');

    await Promise.all([closeAndWait(ws2), closeAndWait(ws3)]);
  });

  it('reconnecting with stable playerId reuses identity', async () => {
    const room = 'p8-reconnect-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'Stable' });
    const welcome1 = await waitForMessage(ws1, 'welcome');
    const stableId = welcome1.playerId as string;

    // Add a second player to observe reconnect events
    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Observer' });
    await waitForMessage(ws2, 'welcome');

    // Player 1 disconnects
    const leftPromise = waitForMessage(ws2, 'player_left');
    await closeAndWait(ws1);
    await leftPromise;

    // Player 1 reconnects with same playerId
    const reconnectPromise = waitForMessage(ws2, 'player_reconnected');
    const ws1b = await connectPlayer(room);
    send(ws1b, { type: 'join', username: 'Stable', playerId: stableId });
    const welcome1b = await waitForMessage(ws1b, 'welcome');

    // Same ID returned
    expect(welcome1b.playerId).toBe(stableId);

    // Observer sees player_reconnected, not player_joined
    const reconnect = await reconnectPromise;
    expect(reconnect.type).toBe('player_reconnected');
    expect(reconnect.username).toBe('Stable');

    await Promise.all([closeAndWait(ws1b), closeAndWait(ws2)]);
  });

  it('game_event rate limiting rejects excess events', async () => {
    const room = 'p8-rate-limit-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'Spammer' });
    await waitForMessage(ws, 'welcome');

    // Add a second player to receive relayed game_events
    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Receiver' });
    await waitForMessage(ws2, 'welcome');

    // Blast 15 game_events rapidly — first 10 should go through, rest get rate limited
    for (let i = 0; i < 15; i++) {
      send(ws, { type: 'game_event', event: 'test_sync', data: { i } });
    }

    // Wait a bit for all messages to process
    const errPromise = waitForMessage(ws, 'error');
    const err = await errPromise;
    expect(err.message).toContain('Rate limit');

    await Promise.all([closeAndWait(ws), closeAndWait(ws2)]);
  });
});

// ---------------------------------------------------------------------------
// Seat model — 0-to-N player configuration
// ---------------------------------------------------------------------------
describe('Seat model — party configuration', () => {
  it('welcome includes seats array with default 4 empty seats', async () => {
    const room = 'seats-default-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'Host' });
    const welcome = await waitForMessage(ws, 'welcome');

    expect(welcome.seats).toBeTruthy();
    const seats = welcome.seats as Array<Record<string, unknown>>;
    expect(seats.length).toBe(4);

    // First player auto-claims seat-0
    const mySeat = seats.find((s) => s.playerId === (welcome.playerId as string));
    expect(mySeat).toBeTruthy();
    expect(mySeat!.type).toBe('human');
    expect(mySeat!.username).toBe('Host');
    expect(mySeat!.ready).toBe(false);

    // Remaining seats are empty
    const emptySeats = seats.filter((s) => s.type === 'empty');
    expect(emptySeats.length).toBe(3);

    expect(welcome.seatId).toBe(mySeat!.id);
    expect(welcome.dmSeatType).toBe('human');

    await closeAndWait(ws);
  });

  it('second player claims next empty seat', async () => {
    const room = 'seats-claim-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'Player1' });
    const w1 = await waitForMessage(ws1, 'welcome');

    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Player2' });
    const w2 = await waitForMessage(ws2, 'welcome');

    const seats = w2.seats as Array<Record<string, unknown>>;
    const humanSeats = seats.filter((s) => s.type === 'human');
    expect(humanSeats.length).toBe(2);
    expect(humanSeats[0].username).toBe('Player1');
    expect(humanSeats[1].username).toBe('Player2');

    // Each player got a different seat
    expect(w1.seatId).not.toBe(w2.seatId);

    await Promise.all([closeAndWait(ws1), closeAndWait(ws2)]);
  });

  it('ready toggle works and broadcasts seats_updated', async () => {
    const room = 'seats-ready-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'ReadyPlayer' });
    await waitForMessage(ws1, 'welcome');

    // Toggle ready on
    const updatedPromise = waitForMessage(ws1, 'seats_updated');
    send(ws1, { type: 'ready' });
    const updated = await updatedPromise;

    const seats = updated.seats as Array<Record<string, unknown>>;
    const mySeat = seats.find((s) => s.type === 'human');
    expect(mySeat!.ready).toBe(true);

    // Toggle ready off
    const updated2Promise = waitForMessage(ws1, 'seats_updated');
    send(ws1, { type: 'ready' });
    const updated2 = await updated2Promise;
    const seats2 = updated2.seats as Array<Record<string, unknown>>;
    const mySeat2 = seats2.find((s) => s.type === 'human');
    expect(mySeat2!.ready).toBe(false);

    await closeAndWait(ws1);
  });

  it('select_character updates seat and broadcasts', async () => {
    const room = 'seats-char-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'CharPicker' });
    await waitForMessage(ws, 'welcome');

    const updatedPromise = waitForMessage(ws, 'seats_updated');
    send(ws, { type: 'select_character', characterId: 'char-123', characterName: 'Aric the Brave' });
    const updated = await updatedPromise;

    const seats = updated.seats as Array<Record<string, unknown>>;
    const mySeat = seats.find((s) => s.type === 'human');
    expect(mySeat!.characterId).toBe('char-123');
    expect(mySeat!.characterName).toBe('Aric the Brave');

    await closeAndWait(ws);
  });

  it('DM can set seat type to AI and back to empty', async () => {
    const room = 'seats-ai-toggle-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'TheDM' });
    const welcome = await waitForMessage(ws, 'welcome');

    // DM sets seat-1 to AI
    const seats0 = welcome.seats as Array<Record<string, unknown>>;
    const emptySeat = seats0.find((s) => s.type === 'empty');
    expect(emptySeat).toBeTruthy();

    const updatedPromise = waitForMessage(ws, 'seats_updated');
    send(ws, { type: 'set_seat_type', seatId: emptySeat!.id, seatType: 'ai' });
    const updated = await updatedPromise;

    const seats1 = updated.seats as Array<Record<string, unknown>>;
    const aiSeat = seats1.find((s) => s.id === emptySeat!.id);
    expect(aiSeat!.type).toBe('ai');
    expect(aiSeat!.username).toBe('AI Player');
    expect(aiSeat!.ready).toBe(true); // AI seats auto-ready

    // Set it back to empty
    const updated2Promise = waitForMessage(ws, 'seats_updated');
    send(ws, { type: 'set_seat_type', seatId: emptySeat!.id, seatType: 'empty' });
    const updated2 = await updated2Promise;

    const seats2 = updated2.seats as Array<Record<string, unknown>>;
    const emptied = seats2.find((s) => s.id === emptySeat!.id);
    expect(emptied!.type).toBe('empty');
    expect(emptied!.ready).toBe(false);

    await closeAndWait(ws);
  });

  it('non-DM cannot change seat types', async () => {
    const room = 'seats-auth-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'DM' });
    await waitForMessage(ws1, 'welcome');

    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Player' });
    const w2 = await waitForMessage(ws2, 'welcome');
    const seats = w2.seats as Array<Record<string, unknown>>;
    const emptySeat = seats.find((s) => s.type === 'empty');

    // Non-DM tries to set seat type — should get error
    const errPromise = waitForMessage(ws2, 'error');
    send(ws2, { type: 'set_seat_type', seatId: emptySeat!.id, seatType: 'ai' });
    const err = await errPromise;
    expect(err.message).toContain('Only the DM');

    await Promise.all([closeAndWait(ws1), closeAndWait(ws2)]);
  });

  it('DM can add and remove seats', async () => {
    const room = 'seats-add-remove-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'DM' });
    const welcome = await waitForMessage(ws, 'welcome');
    const initialCount = (welcome.seats as unknown[]).length;
    expect(initialCount).toBe(4);

    // Add a seat
    const addedPromise = waitForMessage(ws, 'seats_updated');
    send(ws, { type: 'add_seat' });
    const added = await addedPromise;
    expect((added.seats as unknown[]).length).toBe(5);

    // Remove the last seat
    const removedPromise = waitForMessage(ws, 'seats_updated');
    send(ws, { type: 'remove_seat' });
    const removed = await removedPromise;
    expect((removed.seats as unknown[]).length).toBe(4);

    await closeAndWait(ws);
  });

  it('seat reverts to empty when player disconnects', async () => {
    const room = 'seats-disconnect-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'Stayer' });
    await waitForMessage(ws1, 'welcome');

    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Leaver' });
    await waitForMessage(ws2, 'welcome');

    // Leaver disconnects — their seat should revert to empty
    const leftPromise = waitForMessage(ws1, 'player_left');
    await closeAndWait(ws2);
    const left = await leftPromise;

    const seats = left.seats as Array<Record<string, unknown>>;
    const humanSeats = seats.filter((s) => s.type === 'human');
    const emptySeats = seats.filter((s) => s.type === 'empty');
    expect(humanSeats.length).toBe(1); // only Stayer
    expect(emptySeats.length).toBe(3); // Leaver's seat reverted

    await closeAndWait(ws1);
  });

  it('DM can toggle DM seat between human and AI', async () => {
    const room = 'seats-dm-type-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'TheDM' });
    const welcome = await waitForMessage(ws, 'welcome');
    expect(welcome.dmSeatType).toBe('human');

    // Switch to AI DM
    const changedPromise = waitForMessage(ws, 'dm_type_changed');
    send(ws, { type: 'set_dm_type', dmSeatType: 'ai' });
    const changed = await changedPromise;
    expect(changed.dmSeatType).toBe('ai');
    expect(changed.dmPlayerId).toBeNull();

    // Switch back to human DM
    const changed2Promise = waitForMessage(ws, 'dm_type_changed');
    send(ws, { type: 'set_dm_type', dmSeatType: 'human' });
    const changed2 = await changed2Promise;
    expect(changed2.dmSeatType).toBe('human');
    expect(changed2.dmPlayerId).toBeTruthy();

    await closeAndWait(ws);
  });

  it('DM can kick a player from their seat', async () => {
    const room = 'seats-kick-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'DM' });
    await waitForMessage(ws1, 'welcome');

    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Kicked' });
    const w2 = await waitForMessage(ws2, 'welcome');
    const kickedId = w2.playerId as string;

    // Kick player 2
    const kickedPromise = waitForMessage(ws2, 'kicked');
    const kickBroadcast = waitForMessage(ws1, 'player_kicked');
    send(ws1, { type: 'kick_player', playerId: kickedId });

    const kicked = await kickedPromise;
    expect(kicked.message).toContain('kicked');

    const broadcast = await kickBroadcast;
    expect(broadcast.username).toBe('Kicked');
    const seats = broadcast.seats as Array<Record<string, unknown>>;
    const humanSeats = seats.filter((s) => s.type === 'human');
    expect(humanSeats.length).toBe(1); // only DM's seat remains

    await closeAndWait(ws1);
    // ws2 was already closed by the kick
  });

  it('REST /players endpoint includes seats and dmSeatType', async () => {
    const room = 'seats-rest-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'RestTest' });
    await waitForMessage(ws, 'welcome');

    const id = env.LOBBY.idFromName(room);
    const stub = env.LOBBY.get(id);
    const resp = await stub.fetch('http://fake/players');
    const data = (await resp.json()) as { players: unknown[]; seats: unknown[]; dmSeatType: string };

    expect(data.seats.length).toBe(4);
    expect(data.dmSeatType).toBe('human');
    expect(data.players.length).toBe(1);

    await closeAndWait(ws);
  });
});

// --- Spectator mode tests ---
describe('Spectator mode', () => {
  it('player joining with spectate=true gets isSpectating and no seat', async () => {
    const room = 'spectate-join-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'Watcher', spectate: true });
    const welcome = await waitForMessage(ws, 'welcome');

    expect(welcome.isSpectating).toBe(true);
    expect(welcome.seatId).toBeUndefined();
    expect(Array.isArray(welcome.spectators)).toBe(true);
    const specs = welcome.spectators as Array<{ id: string; username: string }>;
    expect(specs.some((s) => s.username === 'Watcher')).toBe(true);

    await closeAndWait(ws);
  });

  it('seated player can switch to spectator and back', async () => {
    const room = 'spectate-toggle-' + Date.now();
    const ws1 = await connectPlayer(room);
    send(ws1, { type: 'join', username: 'DM' });
    const w1 = await waitForMessage(ws1, 'welcome');
    expect(w1.seatId).toBeTruthy();

    const ws2 = await connectPlayer(room);
    send(ws2, { type: 'join', username: 'Player2' });
    await waitForMessage(ws2, 'welcome');
    // Consume the player_joined on ws1
    await waitForMessage(ws1, 'player_joined');

    // Player2 switches to spectate
    const seatsUpdate = waitForMessage(ws1, 'seats_updated');
    send(ws2, { type: 'spectate' });
    const confirmed = await waitForMessage(ws2, 'spectate_confirmed');
    expect(confirmed.type).toBe('spectate_confirmed');

    const updated = await seatsUpdate;
    const spectators = updated.spectators as Array<{ username: string }>;
    expect(spectators.some((s) => s.username === 'Player2')).toBe(true);

    // Player2 claims a seat back
    const seatsUpdate2 = waitForMessage(ws1, 'seats_updated');
    send(ws2, { type: 'claim_seat' });
    const claimed = await waitForMessage(ws2, 'seat_claimed');
    expect(claimed.seatId).toBeTruthy();

    const updated2 = await seatsUpdate2;
    const specs2 = updated2.spectators as Array<{ username: string }>;
    expect(specs2.some((s) => s.username === 'Player2')).toBe(false);

    await closeAndWait(ws2);
    await closeAndWait(ws1);
  });

  it('DM cannot switch to spectator', async () => {
    const room = 'spectate-dm-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'DM' });
    const welcome = await waitForMessage(ws, 'welcome');
    expect(welcome.isDM).toBe(true);

    send(ws, { type: 'spectate' });
    const err = await waitForMessage(ws, 'error');
    expect(err.message).toContain('DM cannot spectate');

    await closeAndWait(ws);
  });

  it('spectators appear in REST /players endpoint', async () => {
    const room = 'spectate-rest-' + Date.now();
    const ws = await connectPlayer(room);
    send(ws, { type: 'join', username: 'Viewer', spectate: true });
    await waitForMessage(ws, 'welcome');

    const id = env.LOBBY.idFromName(room);
    const stub = env.LOBBY.get(id);
    const resp = await stub.fetch('http://fake/players');
    const data = (await resp.json()) as { spectators: Array<{ username: string }> };
    expect(data.spectators.some((s) => s.username === 'Viewer')).toBe(true);

    await closeAndWait(ws);
  });
});
