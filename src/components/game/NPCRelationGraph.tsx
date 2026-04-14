// NPCRelationGraph — interactive force-directed graph of NPC relationships.
// Click nodes for details, dashed lines for secret connections (DM only).
import { useState, useRef, useEffect, useCallback } from 'react';
import type { RelationshipWeb, NPCNode, RelationEdge } from '../../data/npcRelationWeb';

interface GraphNode extends NPCNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface NPCRelationGraphProps {
  web: RelationshipWeb;
  showSecrets: boolean;
  onClose: () => void;
}

const RELATION_COLORS: Record<string, string> = {
  ally: '#22c55e', enemy: '#ef4444', rival: '#f59e0b', lover: '#ec4899',
  mentor: '#3b82f6', debtor: '#a855f7', family: '#14b8a6', secret: '#6b7280',
};

const RELATION_ICONS: Record<string, string> = {
  ally: '🤝', enemy: '⚔️', rival: '⚡', lover: '💕',
  mentor: '📚', debtor: '💰', family: '👪', secret: '🔒',
};

export default function NPCRelationGraph({ web, showSecrets, onClose }: NPCRelationGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const animRef = useRef<number>(0);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<RelationEdge | null>(null);
  const dragRef = useRef<{ idx: number; offsetX: number; offsetY: number } | null>(null);

  // Initialize node positions in a circle
  useEffect(() => {
    const cx = 250;
    const cy = 200;
    const radius = 120;
    nodesRef.current = web.npcs.map((npc, i) => {
      const angle = (i / web.npcs.length) * Math.PI * 2 - Math.PI / 2;
      return {
        ...npc,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      };
    });
    setSelectedNode(null);
    setSelectedEdge(null);
  }, [web]);

  // Force simulation + render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const nodes = nodesRef.current;
    const edges = showSecrets ? web.relations : web.relations.filter((e) => e.known);

    const tick = () => {
      // Forces
      for (let i = 0; i < nodes.length; i++) {
        // Center gravity
        nodes[i].vx += (W / 2 - nodes[i].x) * 0.002;
        nodes[i].vy += (H / 2 - nodes[i].y) * 0.002;

        // Repulsion between all nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const force = 3000 / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          nodes[i].vx -= fx;
          nodes[i].vy -= fy;
          nodes[j].vx += fx;
          nodes[j].vy += fy;
        }
      }

      // Edge spring forces
      for (const edge of edges) {
        const a = nodes.find((n) => n.name === edge.from);
        const b = nodes.find((n) => n.name === edge.to);
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const force = (dist - 150) * 0.01;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      // Apply velocity with damping
      for (const node of nodes) {
        if (dragRef.current && nodes[dragRef.current.idx] === node) continue;
        node.vx *= 0.85;
        node.vy *= 0.85;
        node.x += node.vx;
        node.y += node.vy;
        node.x = Math.max(30, Math.min(W - 30, node.x));
        node.y = Math.max(30, Math.min(H - 30, node.y));
      }

      // Draw
      ctx.clearRect(0, 0, W, H);

      // Edges
      for (const edge of edges) {
        const a = nodes.find((n) => n.name === edge.from);
        const b = nodes.find((n) => n.name === edge.to);
        if (!a || !b) continue;

        ctx.beginPath();
        ctx.strokeStyle = RELATION_COLORS[edge.type] || '#555';
        ctx.lineWidth = selectedEdge === edge ? 3 : 1.5;
        if (!edge.known) {
          ctx.setLineDash([6, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Edge label at midpoint
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        ctx.font = '10px monospace';
        ctx.fillStyle = RELATION_COLORS[edge.type] || '#888';
        ctx.textAlign = 'center';
        ctx.fillText(edge.type + (edge.known ? '' : ' 🔒'), mx, my - 4);
      }

      // Nodes
      for (const node of nodes) {
        const isSelected = selectedNode === node.name;
        const radius = isSelected ? 22 : 18;

        // Glow for selected
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(243, 128, 32, 0.2)';
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        const loyaltyColor = node.loyalty >= 7 ? '#22c55e' : node.loyalty >= 4 ? '#f59e0b' : '#ef4444';
        ctx.fillStyle = isSelected ? '#F38020' : loyaltyColor;
        ctx.fill();
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Name
        ctx.font = 'bold 9px sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Abbreviate to first name
        const shortName = node.name.split(' ')[0];
        ctx.fillText(shortName, node.x, node.y);

        // Role below
        ctx.font = '8px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(node.role, node.x, node.y + radius + 10);
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [web, showSecrets, selectedNode, selectedEdge]);

  // Mouse interaction
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Check nodes
    for (const node of nodesRef.current) {
      const dx = mx - node.x;
      const dy = my - node.y;
      if (dx * dx + dy * dy < 22 * 22) {
        setSelectedNode(selectedNode === node.name ? null : node.name);
        setSelectedEdge(null);
        return;
      }
    }

    // Check edges (click near midpoint)
    const edges = showSecrets ? web.relations : web.relations.filter((e) => e.known);
    for (const edge of edges) {
      const a = nodesRef.current.find((n) => n.name === edge.from);
      const b = nodesRef.current.find((n) => n.name === edge.to);
      if (!a || !b) continue;
      const emx = (a.x + b.x) / 2;
      const emy = (a.y + b.y) / 2;
      const dx = mx - emx;
      const dy = my - emy;
      if (dx * dx + dy * dy < 20 * 20) {
        setSelectedEdge(selectedEdge === edge ? null : edge);
        setSelectedNode(null);
        return;
      }
    }

    setSelectedNode(null);
    setSelectedEdge(null);
  }, [web, showSecrets, selectedNode, selectedEdge]);

  // Drag nodes
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    for (let i = 0; i < nodesRef.current.length; i++) {
      const node = nodesRef.current[i];
      const dx = mx - node.x;
      const dy = my - node.y;
      if (dx * dx + dy * dy < 22 * 22) {
        dragRef.current = { idx: i, offsetX: dx, offsetY: dy };
        return;
      }
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const node = nodesRef.current[dragRef.current.idx];
    node.x = e.clientX - rect.left - dragRef.current.offsetX;
    node.y = e.clientY - rect.top - dragRef.current.offsetY;
    node.vx = 0;
    node.vy = 0;
  }, []);

  const handleMouseUp = useCallback(() => { dragRef.current = null; }, []);

  const selectedNPC = selectedNode ? web.npcs.find((n) => n.name === selectedNode) : null;
  const relatedEdges = selectedNode
    ? web.relations.filter((e) => (e.from === selectedNode || e.to === selectedNode) && (showSecrets || e.known))
    : [];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700">
        <span className="text-xs font-bold text-[#F38020]">🕸️ {web.name}</span>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-xs">Close</button>
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full cursor-grab active:cursor-grabbing bg-slate-950"
        style={{ maxHeight: 400 }}
      />

      {/* Detail panel */}
      <div className="flex-1 overflow-y-auto px-3 py-2 border-t border-slate-700 text-[10px]">
        {selectedNPC && (
          <div className="space-y-1">
            <div className="font-bold text-[#F38020]">{selectedNPC.name} - {selectedNPC.role}</div>
            <div className="text-slate-400">Loyalty: {selectedNPC.loyalty}/10</div>
            {relatedEdges.length > 0 && (
              <div className="mt-1 space-y-0.5">
                {relatedEdges.map((e, i) => (
                  <div key={i} className="text-slate-300">
                    {RELATION_ICONS[e.type]} {e.from === selectedNode ? e.to : e.from}: {e.description}
                    {!e.known && <span className="text-red-400 ml-1">(secret)</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {selectedEdge && (
          <div className="space-y-1">
            <div className="font-bold" style={{ color: RELATION_COLORS[selectedEdge.type] }}>
              {RELATION_ICONS[selectedEdge.type]} {selectedEdge.from} → {selectedEdge.to} ({selectedEdge.type})
            </div>
            <div className="text-slate-300">{selectedEdge.description}</div>
            {!selectedEdge.known && <div className="text-red-400">Secret relationship - players do not know</div>}
          </div>
        )}
        {!selectedNPC && !selectedEdge && (
          <div className="text-slate-500 text-center py-2">
            Click a node or edge for details. Drag nodes to rearrange.
            <div className="mt-1">{web.centralConflict}</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="px-3 py-1.5 border-t border-slate-700 flex flex-wrap gap-2 text-[8px]">
        {Object.entries(RELATION_COLORS).map(([type, color]) => (
          <span key={type} style={{ color }} className="flex items-center gap-0.5">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            {type}
          </span>
        ))}
        <span className="text-slate-500 ml-auto">Dashed = secret</span>
      </div>
    </div>
  );
}
