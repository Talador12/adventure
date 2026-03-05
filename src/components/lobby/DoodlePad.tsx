// DoodlePad — simple canvas drawing pad for lobby waiting room.
// Paint-like: pick colors, brush size, eraser, clear. Syncs strokes via WebSocket.
import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';

const COLORS = ['#F38020', '#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#ec4899', '#facc15', '#ffffff', '#94a3b8'];
const BRUSH_SIZES = [2, 4, 8, 14];
const BG_COLOR = '#020617'; // slate-950

export interface DoodleStroke {
  x1: number; y1: number; x2: number; y2: number;
  color: string; width: number;
}

interface DoodlePadProps {
  onStroke?: (stroke: DoodleStroke) => void;
  onClear?: () => void;
}

export interface DoodlePadHandle {
  drawRemote: (stroke: DoodleStroke) => void;
  clearRemote: () => void;
}

const DoodlePad = forwardRef<DoodlePadHandle, DoodlePadProps>(function DoodlePad({ onStroke, onClear }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#F38020');
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas to fill container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      // Save existing drawing
      const ctx = canvas.getContext('2d')!;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      // Restore drawing
      ctx.putImageData(imageData, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const startDraw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setDrawing(true);
      lastPos.current = getPos(e);
    },
    [getPos]
  );

  // Draw a line segment on canvas (used for both local and remote strokes)
  const drawSegment = useCallback((x1: number, y1: number, x2: number, y2: number, strokeColor: string, width: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }, []);

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!drawing || !lastPos.current) return;
      const pos = getPos(e);
      const strokeColor = isEraser ? BG_COLOR : color;

      drawSegment(lastPos.current.x, lastPos.current.y, pos.x, pos.y, strokeColor, brushSize);

      // Send stroke to WebSocket for other players
      onStroke?.({
        x1: lastPos.current.x, y1: lastPos.current.y,
        x2: pos.x, y2: pos.y,
        color: strokeColor, width: brushSize,
      });

      lastPos.current = pos;
    },
    [drawing, color, brushSize, isEraser, getPos, drawSegment, onStroke]
  );

  // Imperative: draw a remote stroke from another player
  const drawRemote = useCallback((stroke: DoodleStroke) => {
    drawSegment(stroke.x1, stroke.y1, stroke.x2, stroke.y2, stroke.color, stroke.width);
  }, [drawSegment]);

  // Imperative: clear canvas from remote signal
  const clearRemote = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const stopDraw = useCallback(() => {
    setDrawing(false);
    lastPos.current = null;
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onClear?.(); // notify WebSocket
  }, [onClear]);

  // Expose imperative methods for parent to call on remote WebSocket events
  useImperativeHandle(ref, () => ({ drawRemote, clearRemote }), [drawRemote, clearRemote]);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-800 shrink-0 flex-wrap">
        {/* Colors */}
        <div className="flex gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setIsEraser(false);
              }}
              className={`w-5 h-5 rounded-full border-2 transition-all ${color === c && !isEraser ? 'border-white scale-125' : 'border-slate-700 hover:border-slate-500'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-700" />

        {/* Brush sizes */}
        <div className="flex gap-1 items-center">
          {BRUSH_SIZES.map((s) => (
            <button key={s} onClick={() => setBrushSize(s)} className={`flex items-center justify-center w-6 h-6 rounded transition-colors ${brushSize === s ? 'bg-slate-700' : 'hover:bg-slate-800'}`}>
              <div className="rounded-full bg-slate-300" style={{ width: Math.min(s, 12), height: Math.min(s, 12) }} />
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-slate-700" />

        {/* Eraser */}
        <button onClick={() => setIsEraser(!isEraser)} className={`text-xs px-2 py-1 rounded transition-colors ${isEraser ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          Eraser
        </button>

        {/* Clear */}
        <button onClick={clearCanvas} className="text-xs px-2 py-1 rounded text-red-400 hover:bg-red-500/10 transition-colors">
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative bg-slate-950 overflow-hidden cursor-crosshair">
        <canvas ref={canvasRef} onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw} className="absolute inset-0" />
      </div>
    </div>
  );
});

export default DoodlePad;
