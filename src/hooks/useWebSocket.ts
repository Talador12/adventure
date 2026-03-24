// useWebSocket — reconnecting WebSocket hook for Lobby Durable Object communication.
// Handles connection lifecycle, auto-reconnect with backoff, keepalive ping, and typed message dispatch.
/// <reference types="vite/client" />
import { useEffect, useRef, useState, useCallback } from 'react';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface WSMessage {
  type: string;
  [key: string]: unknown;
}

interface UseWebSocketOptions {
  roomId: string;
  username: string;
  avatar?: string;
  spectate?: boolean; // join as spectator (no seat)
  onMessage?: (msg: WSMessage) => void;
  onTimeSync?: (offsetMs: number, rttMs: number) => void;
  enabled?: boolean; // default true, set false to defer connection
}

interface UseWebSocketReturn {
  status: ConnectionStatus;
  send: (msg: WSMessage) => void;
  disconnect: () => void;
  reconnectAttemptCount: number;
}

const MAX_RECONNECT_DELAY = 10000;
const BASE_RECONNECT_DELAY = 1000;
const PING_INTERVAL = 25000; // 25s keepalive

// Session storage key for stable player ID across reconnects
const PLAYER_ID_KEY = 'adventure:playerId';

export function useWebSocket({ roomId, username, avatar, spectate, onMessage, onTimeSync, enabled = true }: UseWebSocketOptions): UseWebSocketReturn {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pingTimer = useRef<ReturnType<typeof setInterval>>(undefined);
  const reconnectAttempt = useRef(0);
  const intentionalClose = useRef(false);
  // Stable player ID — persisted to sessionStorage so reconnects reuse the same ID
  const playerIdRef = useRef<string | null>(
    (() => { try { return sessionStorage.getItem(`${PLAYER_ID_KEY}:${roomId}`); } catch { return null; } })()
  );
  // Offline message queue — buffered sends when socket is not OPEN (Phase 8.5)
  const messageQueue = useRef<WSMessage[]>([]);
  // Keep latest values in refs so connect() doesn't need them as deps
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;
  const onTimeSyncRef = useRef(onTimeSync);
  onTimeSyncRef.current = onTimeSync;
  const usernameRef = useRef(username);
  const avatarRef = useRef(avatar);
  avatarRef.current = avatar;
  usernameRef.current = username;

  const stopPing = useCallback(() => {
    if (pingTimer.current) {
      clearInterval(pingTimer.current);
      pingTimer.current = undefined;
    }
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) {
      return;
    }

    setStatus('connecting');
    intentionalClose.current = false;

    // Build WebSocket URL — always use same origin so Vite proxy (dev) or prod routing handles it
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname;
    const port = window.location.port;
    const wsUrl = `${protocol}//${host}${port ? ':' + port : ''}/api/ws?room=${encodeURIComponent(roomId)}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.addEventListener('open', () => {
      setStatus('connected');
      reconnectAttempt.current = 0;

      // Send join message with current username + avatar + stable playerId (for reconnect)
      const joinMsg: Record<string, unknown> = {
        type: 'join',
        username: usernameRef.current,
        avatar: avatarRef.current,
      };
      if (playerIdRef.current) joinMsg.playerId = playerIdRef.current;
      if (spectate) joinMsg.spectate = true;
      ws.send(JSON.stringify(joinMsg));

      // Flush offline message queue (Phase 8.5)
      while (messageQueue.current.length > 0) {
        const queued = messageQueue.current.shift()!;
        ws.send(JSON.stringify(queued));
      }

      // Start keepalive ping
      stopPing();
      pingTimer.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping', clientTs: Date.now() }));
        }
      }, PING_INTERVAL);

      // Initial clock sync sample immediately after connect.
      ws.send(JSON.stringify({ type: 'ping', clientTs: Date.now() }));
    });

    ws.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data) as WSMessage;
        // Consume pong responses and update server clock offset estimate.
        if (data.type === 'pong') {
          if (typeof data.timestamp === 'number') {
            const recvTs = Date.now();
            const sentTs = typeof data.clientTs === 'number' ? (data.clientTs as number) : recvTs;
            const rttMs = Math.max(0, recvTs - sentTs);
            const midpointTs = sentTs + rttMs / 2;
            const offsetMs = (data.timestamp as number) - midpointTs;
            onTimeSyncRef.current?.(offsetMs, rttMs);
            // Report RTT back to server for per-player latency visibility
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'report_rtt', rttMs }));
            }
          }
          return;
        }
        // Capture stable playerId from welcome (Phase 8.1)
        if (data.type === 'welcome' && typeof data.playerId === 'string') {
          playerIdRef.current = data.playerId;
          try { sessionStorage.setItem(`${PLAYER_ID_KEY}:${roomId}`, data.playerId); } catch { /* quota */ }
        }
        onMessageRef.current?.(data);
      } catch {
        // ignore malformed messages
      }
    });

    ws.addEventListener('close', () => {
      wsRef.current = null;
      stopPing();
      if (intentionalClose.current) {
        setStatus('disconnected');
        return;
      }
      setStatus('disconnected');
      // Reconnect with exponential backoff
      const delay = Math.min(BASE_RECONNECT_DELAY * 2 ** reconnectAttempt.current, MAX_RECONNECT_DELAY);
      reconnectAttempt.current++;
      reconnectTimer.current = setTimeout(connect, delay);
    });

    ws.addEventListener('error', () => {
      setStatus('error');
      ws.close();
    });
  }, [roomId, stopPing]); // username removed — read from ref instead

  const send = useCallback((msg: WSMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      // Phase 8.5: Queue message for delivery on reconnect (cap at 100 to prevent memory leak)
      if (messageQueue.current.length < 100) {
        messageQueue.current.push(msg);
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    intentionalClose.current = true;
    clearTimeout(reconnectTimer.current);
    stopPing();
    wsRef.current?.close();
    wsRef.current = null;
    setStatus('disconnected');
  }, [stopPing]);

  // Connect on mount / roomId change, disconnect on unmount
  useEffect(() => {
    if (!enabled || !roomId) return;
    connect();
    return () => {
      intentionalClose.current = true;
      clearTimeout(reconnectTimer.current);
      stopPing();
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [roomId, enabled, connect, stopPing]);

  return { status, send, disconnect, reconnectAttemptCount: reconnectAttempt.current };
}
