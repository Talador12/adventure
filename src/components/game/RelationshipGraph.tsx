// Character relationship graph — party dynamics + NPC connections as a visual node graph.
// Canvas-rendered with draggable nodes and labeled edges.

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Character } from '../../contexts/GameContext';

export interface RelationshipEdge {
  from: string; // character/NPC name
  to: string;
  type: 'ally' | 'rival' | 'bond' | 'neutral' | 'enemy';
  label?: string;
}

interface GraphNode {
  id: string;
  name: string;
  type: 'player' | 'npc';
  x: number;
  y: number;
  color: string;
  portrait?: string;
}

interface Props {
  characters: Character[];
  npcNames?: string[];
  edges: RelationshipEdge[];
  onAddEdge?: (edge: RelationshipEdge) => void;
  onAddEdges?: (edges: RelationshipEdge[]) => void;
  onRemoveEdge?: (from: string, to: string) => void;
}

const EDGE_COLORS: Record<RelationshipEdge['type'], string> = {
  ally: '#22c55e',
  bond: '#3b82f6',
  neutral: '#64748b',
  rival: '#f59e0b',
  enemy: '#ef4444',
};

const NODE_RADIUS = 24;

export default function RelationshipGraph({ characters, npcNames = [], edges, onAddEdge, onAddEdges, onRemoveEdge }: Props) {
  const [suggesting, setSuggesting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Initialize nodes from characters + NPCs in a circle layout
  useEffect(() => {
    const allNames = [
      ...characters.map((c) => ({ id: c.id, name: c.name, type: 'player' as const, color: '#F38020', portrait: c.portrait })),
      ...npcNames.map((n) => ({ id: `npc-${n}`, name: n, type: 'npc' as const, color: '#8b5cf6', portrait: undefined })),
    ];
    const cx = 200;
    const cy = 150;
    const r = Math.min(120, 40 + allNames.length * 15);
    setNodes(allNames.map((n, i) => ({
      ...n,
      x: cx + r * Math.cos((i / allNames.length) * Math.PI * 2 - Math.PI / 2),
      y: cy + r * Math.sin((i / allNames.length) * Math.PI * 2 - Math.PI / 2),
    })));
  }, [characters.length, npcNames.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Draw the graph
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    for (const edge of edges) {
      const fromNode = nodes.find((n) => n.name === edge.from);
      const toNode = nodes.find((n) => n.name === edge.to);
      if (!fromNode || !toNode) continue;

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = EDGE_COLORS[edge.type];
      ctx.lineWidth = edge.type === 'bond' || edge.type === 'ally' ? 2.5 : 1.5;
      if (edge.type === 'rival' || edge.type === 'enemy') ctx.setLineDash([4, 4]);
      else ctx.setLineDash([]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Edge label at midpoint
      if (edge.label) {
        const mx = (fromNode.x + toNode.x) / 2;
        const my = (fromNode.y + toNode.y) / 2;
        ctx.font = '9px sans-serif';
        ctx.fillStyle = EDGE_COLORS[edge.type];
        ctx.textAlign = 'center';
        ctx.fillText(edge.label, mx, my - 4);
      }
    }

    // Draw nodes
    for (const node of nodes) {
      // Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = node.type === 'player' ? '#1e293b' : '#1a1625';
      ctx.fill();
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Initial letter
      ctx.fillStyle = node.color;
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.name.charAt(0).toUpperCase(), node.x, node.y);

      // Name below
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(node.name, node.x, node.y + NODE_RADIUS + 4);
    }
  }, [nodes, edges]);

  useEffect(() => { draw(); }, [draw]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    for (const node of nodes) {
      if (Math.sqrt((mx - node.x) ** 2 + (my - node.y) ** 2) < NODE_RADIUS) {
        setDragging(node.id);
        setDragOffset({ x: mx - node.x, y: my - node.y });
        return;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    setNodes((prev) => prev.map((n) => n.id === dragging ? { ...n, x: e.clientX - rect.left - dragOffset.x, y: e.clientY - rect.top - dragOffset.y } : n));
  };

  const handleMouseUp = () => setDragging(null);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Party Relationships</span>
        <div className="flex gap-2">
        {onAddEdges && characters.length >= 2 && (
          <button
            disabled={suggesting}
            onClick={async () => {
              setSuggesting(true);
              try {
                const res = await fetch('/api/dm/suggest-relationships', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ characters: characters.map((c) => ({ name: c.name, race: c.race, class: c.class, background: c.background, bonds: c.bonds, flaws: c.flaws, personalityTraits: c.personalityTraits, backstory: c.backstory })) }),
                });
                if (res.ok) {
                  const data = await res.json() as { suggestions?: RelationshipEdge[] };
                  if (data.suggestions?.length) onAddEdges(data.suggestions);
                }
              } catch { /* ok */ }
              setSuggesting(false);
            }}
            className="text-[8px] text-violet-400 hover:text-violet-300 font-semibold disabled:opacity-50"
          >
            {suggesting ? '...' : '✨ AI Suggest'}
          </button>
        )}
        {onAddEdge && (
          <button
            onClick={() => {
              const from = prompt('From (character name):');
              if (!from?.trim()) return;
              const to = prompt('To (character/NPC name):');
              if (!to?.trim()) return;
              const typeStr = prompt('Type (ally/rival/bond/neutral/enemy):', 'ally');
              const type = (['ally', 'rival', 'bond', 'neutral', 'enemy'].includes(typeStr || '') ? typeStr : 'neutral') as RelationshipEdge['type'];
              const label = prompt('Label (optional, e.g. "childhood friends"):') || undefined;
              onAddEdge({ from: from.trim(), to: to.trim(), type, label });
            }}
            className="text-[8px] text-teal-400 hover:text-teal-300 font-semibold"
          >
            + Connection
          </button>
        )}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="flex-1 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Edge legend */}
      <div className="flex items-center gap-3 px-3 py-1.5 border-t border-slate-800 text-[8px]">
        {Object.entries(EDGE_COLORS).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1">
            <span className="w-3 h-0.5 inline-block rounded" style={{ backgroundColor: color }} />
            <span className="text-slate-500 capitalize">{type}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
