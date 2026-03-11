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
