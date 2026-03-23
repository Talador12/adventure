// PerfDashboard — lightweight dev-mode performance overlay.
// Shows FPS, render count, memory usage, component tree size.
// Toggle via Ctrl+Shift+P or window.__PERF_DASHBOARD__.
import { useState, useEffect, useRef, useCallback } from 'react';

interface PerfStats {
  fps: number;
  memory: number | null; // MB, Chrome only
  renderCount: number;
  domNodes: number;
  canvasCount: number;
  wsConnections: number;
}

function measureDomStats(): { domNodes: number; canvasCount: number } {
  return {
    domNodes: document.querySelectorAll('*').length,
    canvasCount: document.querySelectorAll('canvas').length,
  };
}

function measureMemory(): number | null {
  const perf = performance as unknown as { memory?: { usedJSHeapSize: number } };
  if (perf.memory) return Math.round(perf.memory.usedJSHeapSize / 1048576);
  return null;
}

export default function PerfDashboard() {
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState<PerfStats>({
    fps: 0, memory: null, renderCount: 0, domNodes: 0, canvasCount: 0, wsConnections: 0,
  });
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const renderCountRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Keyboard toggle: Ctrl+Shift+P
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setVisible((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Expose toggle on window for console access
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__PERF_DASHBOARD__ = {
      show: () => setVisible(true),
      hide: () => setVisible(false),
      toggle: () => setVisible((v) => !v),
    };
  }, []);

  // FPS counter via rAF
  const tick = useCallback(() => {
    frameCountRef.current++;
    const now = performance.now();
    if (now - lastTimeRef.current >= 1000) {
      renderCountRef.current++;
      const dom = measureDomStats();
      setStats({
        fps: frameCountRef.current,
        memory: measureMemory(),
        renderCount: renderCountRef.current,
        domNodes: dom.domNodes,
        canvasCount: dom.canvasCount,
        wsConnections: (performance.getEntriesByType?.('resource') || []).filter(
          (e) => (e as PerformanceResourceTiming).initiatorType === 'websocket'
        ).length,
      });
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (visible) {
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }
  }, [visible, tick]);

  if (!visible) return null;

  const fpsColor = stats.fps >= 55 ? 'text-emerald-400' : stats.fps >= 30 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-slate-900/95 border border-slate-700 rounded-lg p-3 shadow-xl backdrop-blur-sm font-mono text-[10px] space-y-1 min-w-[180px]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">Perf Dashboard</span>
        <button onClick={() => setVisible(false)} className="text-slate-600 hover:text-slate-400 text-xs">&times;</button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-500">FPS</span>
        <span className={`font-bold ${fpsColor}`}>{stats.fps}</span>
      </div>
      {stats.memory !== null && (
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Memory</span>
          <span className={`font-bold ${stats.memory > 200 ? 'text-red-400' : stats.memory > 100 ? 'text-amber-400' : 'text-slate-300'}`}>{stats.memory} MB</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-slate-500">DOM Nodes</span>
        <span className={`font-bold ${stats.domNodes > 3000 ? 'text-amber-400' : 'text-slate-300'}`}>{stats.domNodes.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-500">Canvases</span>
        <span className="font-bold text-slate-300">{stats.canvasCount}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-500">Tick</span>
        <span className="font-bold text-slate-400">#{stats.renderCount}</span>
      </div>
      <div className="text-[8px] text-slate-700 pt-1 border-t border-slate-800">Ctrl+Shift+P to toggle</div>
    </div>
  );
}
