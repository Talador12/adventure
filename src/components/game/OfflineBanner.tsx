// OfflineBanner — shows when WebSocket disconnects with auto-reconnect countdown.
// Non-intrusive top banner. Red when disconnected, amber when reconnecting.
// Countdown shows seconds until next reconnect attempt.
import { useState, useEffect, useRef } from 'react';
import type { ConnectionStatus } from '../../hooks/useWebSocket';

interface OfflineBannerProps {
  status: ConnectionStatus;
  reconnectAttempt: number;
}

const BASE_DELAY = 1000;
const MAX_DELAY = 10000;

export default function OfflineBanner({ status, reconnectAttempt }: OfflineBannerProps) {
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (status === 'disconnected' || status === 'error') {
      const delay = Math.min(BASE_DELAY * 2 ** reconnectAttempt, MAX_DELAY);
      const seconds = Math.ceil(delay / 1000);
      setCountdown(seconds);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else {
      setCountdown(0);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [status, reconnectAttempt]);

  if (status === 'connected') return null;

  const isError = status === 'error';
  const isConnecting = status === 'connecting';

  return (
    <div className={`w-full px-4 py-1.5 flex items-center justify-center gap-3 text-[11px] font-semibold transition-all ${
      isConnecting
        ? 'bg-amber-900/30 border-b border-amber-700/30 text-amber-300'
        : isError
          ? 'bg-red-900/30 border-b border-red-700/30 text-red-300'
          : 'bg-slate-800/50 border-b border-slate-700/30 text-slate-400'
    }`}>
      <div className={`w-2 h-2 rounded-full shrink-0 ${isConnecting ? 'bg-amber-400 animate-pulse' : isError ? 'bg-red-500' : 'bg-slate-500'}`} />
      <span>
        {isConnecting
          ? 'Reconnecting...'
          : isError
            ? 'Connection lost'
            : 'Offline'}
      </span>
      {countdown > 0 && !isConnecting && (
        <span className="text-slate-500">
          Retrying in {countdown}s
        </span>
      )}
      <span className="text-slate-600 text-[9px]">
        Single-player mode active — your dice still work
      </span>
    </div>
  );
}
