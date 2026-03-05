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
const PING_INTERVAL = 25000; // 25s keepalive

export function useWebSocket({ roomId, username, onMessage, enabled = true }: UseWebSocketOptions): UseWebSocketReturn {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pingTimer = useRef<ReturnType<typeof setInterval>>(undefined);
  const reconnectAttempt = useRef(0);
  const intentionalClose = useRef(false);
  // Keep latest values in refs so connect() doesn't need them as deps
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;
  const usernameRef = useRef(username);
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

    // Build WebSocket URL — use the backend (wrangler) port in dev, same host in prod
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname;
    const port = import.meta.env.DEV ? '8787' : window.location.port;
    const wsUrl = `${protocol}//${host}${port ? ':' + port : ''}/api/ws?room=${encodeURIComponent(roomId)}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.addEventListener('open', () => {
      setStatus('connected');
      reconnectAttempt.current = 0;

      // Send join message with current username
      ws.send(JSON.stringify({ type: 'join', username: usernameRef.current }));

      // Start keepalive ping
      stopPing();
      pingTimer.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, PING_INTERVAL);
    });

    ws.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data) as WSMessage;
        // Silently consume pong responses
        if (data.type === 'pong') return;
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

  return { status, send, disconnect };
}
