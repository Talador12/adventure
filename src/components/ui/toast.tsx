import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  exiting?: boolean;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

// Individual toast with CSS animation
function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const styles: Record<ToastType, { bg: string; icon: string }> = {
    success: { bg: 'bg-green-600 border-green-500', icon: '\u2714' },
    error: { bg: 'bg-red-600 border-red-500', icon: '\u2716' },
    warning: { bg: 'bg-yellow-600 border-yellow-500 text-black', icon: '\u26A0' },
    info: { bg: 'bg-slate-700 border-slate-600', icon: '\u2139' },
  };

  const s = styles[t.type];

  return (
    <div ref={ref} onClick={() => onDismiss(t.id)} className={`flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-xl cursor-pointer text-sm font-medium border backdrop-blur-sm text-white transition-all duration-300 ${s.bg} ${t.exiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`} style={{ animation: t.exiting ? undefined : 'slideIn 0.25s ease-out' }}>
      <span className="text-base leading-none opacity-90">{s.icon}</span>
      {t.message}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    // Mark as exiting for animation, then remove
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 300);
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), 3500);
    },
    [dismiss]
  );

  // Inject keyframe animation once
  useEffect(() => {
    if (document.getElementById('toast-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'toast-keyframes';
    style.textContent = `@keyframes slideIn { from { opacity: 0; transform: translateX(2rem) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }`;
    document.head.appendChild(style);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-4 z-50 flex flex-col gap-2 max-w-[90vw] sm:max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
