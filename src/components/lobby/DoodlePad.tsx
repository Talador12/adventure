// DoodlePad — simple canvas drawing pad for lobby waiting room.
// Paint-like: pick colors, brush size, eraser, clear. Pure canvas, no deps.
import { useRef, useState, useEffect, useCallback } from 'react';

const COLORS = ['#F38020', '#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#ec4899', '#facc15', '#ffffff', '#94a3b8'];
const BRUSH_SIZES = [2, 4, 8, 14];

export default function DoodlePad() {
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

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!drawing || !lastPos.current) return;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      const pos = getPos(e);

      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = isEraser ? '#0f172a' : color; // eraser = bg color
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      lastPos.current = pos;
    },
    [drawing, color, brushSize, isEraser, getPos]
  );

  const stopDraw = useCallback(() => {
    setDrawing(false);
    lastPos.current = null;
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

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
}
