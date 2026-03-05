// useWebSocket — reconnecting WebSocket hook for Lobby Durable Object communication.
// Handles connection lifecycle, auto-reconnect with backoff, and typed message dispatch.
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
  onMessage?: (msg: WSMessage) => void;
  enabled?: boolean; // default true, set false to defer connection
}

interface UseWebSocketReturn {
  status: ConnectionStatus;
  send: (msg: WSMessage) => void;
  disconnect: () => void;
}

const MAX_RECONNECT_DELAY = 10000;
const BASE_RECONNECT_DELAY = 1000;

export function useWebSocket({ roomId, username, onMessage, enabled = true }: UseWebSocketOptions): UseWebSocketReturn {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reconnectAttempt = useRef(0);
  const intentionalClose = useRef(false);
  // Keep the latest onMessage in a ref so we don't reconnect when it changes
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) {
      return;
    }

    setStatus('connecting');
    intentionalClose.current = false;

    // Build WebSocket URL — use the backend (wrangler) port in dev, same host in prod
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // In dev, Vite proxies /api to :8787, but WebSocket needs direct connection
    const host = window.location.hostname;
    const port = import.meta.env.DEV ? '8787' : window.location.port;
    const wsUrl = `${protocol}//${host}${port ? ':' + port : ''}/api/ws?room=${encodeURIComponent(roomId)}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.addEventListener('open', () => {
      setStatus('connected');
      reconnectAttempt.current = 0;

      // Send join message immediately
      ws.send(JSON.stringify({ type: 'join', username }));
    });

    ws.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data) as WSMessage;
        onMessageRef.current?.(data);
      } catch {
        // ignore malformed messages
      }
    });

    ws.addEventListener('close', () => {
      wsRef.current = null;
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
  }, [roomId, username]);

  const send = useCallback((msg: WSMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const disconnect = useCallback(() => {
    intentionalClose.current = true;
    clearTimeout(reconnectTimer.current);
    wsRef.current?.close();
    wsRef.current = null;
    setStatus('disconnected');
  }, []);

  // Connect on mount / roomId change, disconnect on unmount
  useEffect(() => {
    if (!enabled || !roomId) return;
    connect();
    return () => {
      intentionalClose.current = true;
      clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [roomId, enabled, connect]);

  return { status, send, disconnect };
}
