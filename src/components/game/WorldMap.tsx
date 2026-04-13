// WorldMap - canvas-based hex grid overland map with pan/zoom, terrain rendering,
// fog of war, click selection, and quest pin overlay.
// Each hex represents ~6 miles. Party token shows current position.

import { useRef, useEffect, useState, useCallback, type WheelEvent as ReactWheelEvent, type MouseEvent as ReactMouseEvent } from 'react';
import { type WorldMapData, type WorldHex, type OverlandTerrain, OVERLAND_TERRAIN_CONFIG, generateWorldMap } from '../../lib/worldMapGen';

// Hex geometry - flat-top hexagons
const HEX_RADIUS = 28;
const HEX_WIDTH = HEX_RADIUS * Math.sqrt(3);
const HEX_HEIGHT = HEX_RADIUS * 2;

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3.0;

// Convert hex grid col/row to pixel center (flat-top, offset coordinates)
function hexToPixel(col: number, row: number): { x: number; y: number } {
  const x = HEX_WIDTH * col + (row % 2 === 1 ? HEX_WIDTH / 2 : 0) + HEX_WIDTH / 2;
  const y = HEX_RADIUS * 1.5 * row + HEX_RADIUS;
  return { x, y };
}

// Convert pixel position to hex col/row (inverse of hexToPixel)
function pixelToHex(px: number, py: number): { col: number; row: number } {
  const row = Math.round((py - HEX_RADIUS) / (HEX_RADIUS * 1.5));
  const offset = row % 2 === 1 ? HEX_WIDTH / 2 : 0;
  const col = Math.round((px - HEX_WIDTH / 2 - offset) / HEX_WIDTH);
  return { col: Math.max(0, col), row: Math.max(0, row) };
}

// Draw a flat-top hexagon path on canvas
function drawHex(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number = HEX_RADIUS) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = cx + radius * Math.cos(angle);
    const py = cy + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

// Draw terrain pattern overlays for visual variety
function drawTerrainDetails(ctx: CanvasRenderingContext2D, cx: number, cy: number, terrain: OverlandTerrain, radius: number) {
  const r = radius * 0.5;
  ctx.save();

  switch (terrain) {
    case 'forest':
    case 'dense_forest': {
      // Tree symbols
      const count = terrain === 'dense_forest' ? 4 : 2;
      ctx.fillStyle = terrain === 'dense_forest' ? 'rgba(0,40,0,0.5)' : 'rgba(0,60,0,0.4)';
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i + 0.3;
        const tx = cx + r * 0.5 * Math.cos(angle);
        const ty = cy + r * 0.5 * Math.sin(angle);
        // Tiny triangle tree
        ctx.beginPath();
        ctx.moveTo(tx, ty - 5);
        ctx.lineTo(tx - 3, ty + 3);
        ctx.lineTo(tx + 3, ty + 3);
        ctx.closePath();
        ctx.fill();
      }
      break;
    }
    case 'mountains': {
      // Mountain peaks
      ctx.strokeStyle = 'rgba(200,200,200,0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy + 5);
      ctx.lineTo(cx - 3, cy - 7);
      ctx.lineTo(cx + 2, cy + 5);
      ctx.moveTo(cx + 1, cy + 5);
      ctx.lineTo(cx + 6, cy - 5);
      ctx.lineTo(cx + 11, cy + 5);
      ctx.stroke();
      // Snow cap
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath();
      ctx.moveTo(cx - 3, cy - 7);
      ctx.lineTo(cx - 1, cy - 3);
      ctx.lineTo(cx + 1, cy - 3);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'hills': {
      // Rounded bumps
      ctx.strokeStyle = 'rgba(100,80,40,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx - 5, cy + 2, 6, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 5, cy, 5, Math.PI, 0);
      ctx.stroke();
      break;
    }
    case 'swamp': {
      // Wavy water lines
      ctx.strokeStyle = 'rgba(60,100,60,0.4)';
      ctx.lineWidth = 1;
      for (let i = -1; i <= 1; i++) {
        const yy = cy + i * 6;
        ctx.beginPath();
        ctx.moveTo(cx - 8, yy);
        ctx.quadraticCurveTo(cx - 3, yy - 3, cx, yy);
        ctx.quadraticCurveTo(cx + 3, yy + 3, cx + 8, yy);
        ctx.stroke();
      }
      break;
    }
    case 'desert': {
      // Sand dune lines
      ctx.strokeStyle = 'rgba(180,150,80,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0.3, Math.PI - 0.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 3, cy + 4, 5, 0.3, Math.PI - 0.3);
      ctx.stroke();
      break;
    }
    case 'ocean':
    case 'lake': {
      // Wave marks
      ctx.strokeStyle = terrain === 'ocean' ? 'rgba(100,160,220,0.25)' : 'rgba(80,140,200,0.3)';
      ctx.lineWidth = 1;
      for (let i = -1; i <= 1; i++) {
        const yy = cy + i * 7;
        ctx.beginPath();
        ctx.moveTo(cx - 7, yy);
        ctx.quadraticCurveTo(cx - 2, yy - 2, cx, yy);
        ctx.quadraticCurveTo(cx + 2, yy + 2, cx + 7, yy);
        ctx.stroke();
      }
      break;
    }
    case 'road': {
      // Dashed line
      ctx.strokeStyle = 'rgba(120,100,70,0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy);
      ctx.lineTo(cx + 8, cy);
      ctx.stroke();
      ctx.setLineDash([]);
      break;
    }
    case 'village': {
      // Small house
      ctx.fillStyle = 'rgba(140,100,60,0.6)';
      ctx.fillRect(cx - 4, cy - 2, 8, 6);
      ctx.fillStyle = 'rgba(160,80,40,0.6)';
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy - 2);
      ctx.lineTo(cx, cy - 7);
      ctx.lineTo(cx + 5, cy - 2);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'city': {
      // Tower silhouettes
      ctx.fillStyle = 'rgba(100,80,60,0.6)';
      ctx.fillRect(cx - 6, cy - 4, 4, 8);
      ctx.fillRect(cx + 2, cy - 6, 4, 10);
      ctx.fillRect(cx - 2, cy - 2, 4, 6);
      // Flags
      ctx.fillStyle = 'rgba(200,50,50,0.5)';
      ctx.fillRect(cx + 6, cy - 8, 4, 3);
      break;
    }
    case 'ruins': {
      // Broken columns
      ctx.fillStyle = 'rgba(100,90,80,0.5)';
      ctx.fillRect(cx - 6, cy - 3, 2, 7);
      ctx.fillRect(cx + 4, cy - 5, 2, 9);
      ctx.fillRect(cx - 1, cy - 1, 2, 5);
      // Rubble dots
      ctx.fillStyle = 'rgba(80,70,60,0.4)';
      ctx.beginPath();
      ctx.arc(cx - 3, cy + 4, 1.5, 0, Math.PI * 2);
      ctx.arc(cx + 2, cy + 5, 1, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'cave': {
      // Dark opening
      ctx.fillStyle = 'rgba(20,15,10,0.6)';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(80,70,60,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      break;
    }
    case 'castle': {
      // Fortress shape
      ctx.fillStyle = 'rgba(80,65,50,0.6)';
      ctx.fillRect(cx - 7, cy - 3, 14, 8);
      // Battlements
      for (let i = -6; i <= 6; i += 4) {
        ctx.fillRect(cx + i - 1, cy - 6, 2, 3);
      }
      // Gate
      ctx.fillStyle = 'rgba(40,30,20,0.6)';
      ctx.beginPath();
      ctx.arc(cx, cy + 1, 3, Math.PI, 0);
      ctx.fillRect(cx - 3, cy + 1, 6, 4);
      ctx.fill();
      break;
    }
    case 'tundra': {
      // Snowflake dots
      ctx.fillStyle = 'rgba(200,220,240,0.3)';
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 / 3) * i;
        ctx.beginPath();
        ctx.arc(cx + 5 * Math.cos(angle), cy + 5 * Math.sin(angle), 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    default:
      break;
  }

  ctx.restore();
}

interface WorldMapProps {
  mapData?: WorldMapData | null;
  onMapGenerate?: (data: WorldMapData) => void;
  onHexClick?: (hex: WorldHex) => void;
  onHexDiscover?: (col: number, row: number) => void;
  partyPosition?: { col: number; row: number };
  onPartyMove?: (col: number, row: number) => void;
  isDM?: boolean;
}

export default function WorldMap({
  mapData: externalMapData,
  onMapGenerate,
  onHexClick,
  onHexDiscover,
  partyPosition,
  onPartyMove,
  isDM = false,
}: WorldMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Internal map state (generates if no external data)
  const [internalMapData, setInternalMapData] = useState<WorldMapData | null>(null);
  const mapData = externalMapData ?? internalMapData;

  // Pan/zoom state
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const panOffsetStartRef = useRef({ x: 0, y: 0 });

  // Selection state
  const [selectedHex, setSelectedHex] = useState<WorldHex | null>(null);
  const [hoveredHex, setHoveredHex] = useState<{ col: number; row: number } | null>(null);

  // Internal party position when parent does not control it
  const [internalPartyPos, setInternalPartyPos] = useState<{ col: number; row: number } | null>(null);
  const effectivePartyPos = partyPosition ?? internalPartyPos;

  // Map generation controls
  const [seedInput, setSeedInput] = useState('');
  const [mapName, setMapName] = useState('The Realm');
  const [mapWidth, setMapWidth] = useState(30);
  const [mapHeight, setMapHeight] = useState(20);
  const [showControls, setShowControls] = useState(false);
  const [showFog, setShowFog] = useState(true);

  // Generate initial map
  useEffect(() => {
    if (externalMapData || internalMapData) return;
    const data = generateWorldMap(30, 20);
    setInternalMapData(data);
    onMapGenerate?.(data);
    // Place party at center
    const centerCol = Math.floor(data.width / 2);
    const centerRow = Math.floor(data.height / 2);
    setInternalPartyPos({ col: centerCol, row: centerRow });
    // Center the view on the party
    const { x: cx, y: cy } = hexToPixel(centerCol, centerRow);
    const container = containerRef.current;
    if (container) {
      setPanOffset({
        x: container.clientWidth / 2 - cx,
        y: container.clientHeight / 2 - cy,
      });
    }
  }, [externalMapData, internalMapData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Convert screen coordinates to hex grid coordinates
  const screenToHex = useCallback((screenX: number, screenY: number): { col: number; row: number } => {
    const container = containerRef.current;
    if (!container) return { col: 0, row: 0 };
    const rect = container.getBoundingClientRect();
    const canvasX = (screenX - rect.left - panOffset.x) / zoom;
    const canvasY = (screenY - rect.top - panOffset.y) / zoom;
    return pixelToHex(canvasX, canvasY);
  }, [zoom, panOffset]);

  // Mouse wheel zoom (centered on cursor)
  const handleWheel = useCallback((e: ReactWheelEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * zoomFactor));
    const scale = newZoom / zoom;

    setPanOffset({
      x: mouseX - scale * (mouseX - panOffset.x),
      y: mouseY - scale * (mouseY - panOffset.y),
    });
    setZoom(newZoom);
  }, [zoom, panOffset]);

  // Mouse down - start pan or select
  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
    // Right click or middle click = pan
    if (e.button === 1 || e.button === 2) {
      e.preventDefault();
      setIsPanning(true);
      panStartRef.current = { x: e.clientX, y: e.clientY };
      panOffsetStartRef.current = { ...panOffset };
      return;
    }
    // Left click with space held = pan
    // Otherwise, record start for potential click vs drag detection
    panStartRef.current = { x: e.clientX, y: e.clientY };
    panOffsetStartRef.current = { ...panOffset };
  }, [panOffset]);

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    if (!mapData) return;

    // Update hovered hex
    const { col, row } = screenToHex(e.clientX, e.clientY);
    if (col >= 0 && col < mapData.width && row >= 0 && row < mapData.height) {
      setHoveredHex({ col, row });
    } else {
      setHoveredHex(null);
    }

    // Pan if dragging
    if (isPanning || (e.buttons === 1 && (e.ctrlKey || e.metaKey || e.shiftKey))) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPanOffset({
        x: panOffsetStartRef.current.x + dx,
        y: panOffsetStartRef.current.y + dy,
      });
      if (!isPanning && Math.abs(dx) + Math.abs(dy) > 4) {
        setIsPanning(true);
      }
      return;
    }

    // Left button held without modifier = also pan
    if (e.buttons === 1) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) {
        setIsPanning(true);
        setPanOffset({
          x: panOffsetStartRef.current.x + dx,
          y: panOffsetStartRef.current.y + dy,
        });
      }
    }
  }, [isPanning, mapData, screenToHex]);

  const handleMouseUp = useCallback((e: ReactMouseEvent) => {
    if (!mapData) return;

    // If we were panning, just stop panning
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    // Click (not a drag) - select hex
    const dx = Math.abs(e.clientX - panStartRef.current.x);
    const dy = Math.abs(e.clientY - panStartRef.current.y);
    if (dx + dy < 5) {
      const { col, row } = screenToHex(e.clientX, e.clientY);
      if (col >= 0 && col < mapData.width && row >= 0 && row < mapData.height) {
        const hex = mapData.hexes[row]?.[col];
        if (hex) {
          // Only allow interaction with discovered hexes (or if DM)
          if (hex.discovered || isDM || !showFog) {
            setSelectedHex(hex);
            onHexClick?.(hex);
          }
        }
      }
    }
    setIsPanning(false);
  }, [isPanning, mapData, screenToHex, onHexClick, isDM, showFog]);

  // Double click to move party
  const handleDoubleClick = useCallback((e: ReactMouseEvent) => {
    if (!mapData) return;
    const { col, row } = screenToHex(e.clientX, e.clientY);
    if (col >= 0 && col < mapData.width && row >= 0 && row < mapData.height) {
      const hex = mapData.hexes[row]?.[col];
      if (!hex) return;
      // Cannot move to impassable terrain
      const config = OVERLAND_TERRAIN_CONFIG[hex.terrain];
      if (!isFinite(config.travelCost)) return;
      if (!hex.discovered && showFog && !isDM) return;

      // Move party
      if (onPartyMove) {
        onPartyMove(col, row);
      } else {
        setInternalPartyPos({ col, row });
      }

      // Discover surrounding hexes (3 hex radius)
      if (mapData) {
        for (let r = 0; r < mapData.height; r++) {
          for (let c = 0; c < mapData.width; c++) {
            const dist = Math.sqrt((c - col) ** 2 + (r - row) ** 2);
            if (dist <= 3 && !mapData.hexes[r][c].discovered) {
              mapData.hexes[r][c].discovered = true;
              onHexDiscover?.(c, r);
            }
          }
        }
      }
    }
  }, [mapData, screenToHex, onPartyMove, onHexDiscover, isDM, showFog]);

  // Prevent context menu on right click
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  // Generate new map
  const handleGenerate = useCallback(() => {
    const seed = seedInput ? parseInt(seedInput, 10) || undefined : undefined;
    const data = generateWorldMap(mapWidth, mapHeight, seed, mapName);
    setInternalMapData(data);
    onMapGenerate?.(data);
    setSelectedHex(null);
    const centerCol = Math.floor(data.width / 2);
    const centerRow = Math.floor(data.height / 2);
    setInternalPartyPos({ col: centerCol, row: centerRow });
    const { x: cx, y: cy } = hexToPixel(centerCol, centerRow);
    const container = containerRef.current;
    if (container) {
      setPanOffset({
        x: container.clientWidth / 2 - cx,
        y: container.clientHeight / 2 - cy,
      });
    }
    setZoom(1);
  }, [seedInput, mapWidth, mapHeight, mapName, onMapGenerate]);

  // Center view on party
  const handleCenterOnParty = useCallback(() => {
    if (!effectivePartyPos) return;
    const { x: cx, y: cy } = hexToPixel(effectivePartyPos.col, effectivePartyPos.row);
    const container = containerRef.current;
    if (container) {
      setPanOffset({
        x: container.clientWidth / 2 - cx * zoom,
        y: container.clientHeight / 2 - cy * zoom,
      });
    }
  }, [effectivePartyPos, zoom]);

  // Canvas draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !mapData) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Clear
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, cw, ch);

    // Apply zoom + pan transform
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    ctx.scale(zoom, zoom);

    // Draw hexes
    for (let r = 0; r < mapData.height; r++) {
      for (let c = 0; c < mapData.width; c++) {
        const hex = mapData.hexes[r][c];
        const { x, y } = hexToPixel(c, r);

        // Frustum cull - skip hexes outside visible area
        const screenX = x * zoom + panOffset.x;
        const screenY = y * zoom + panOffset.y;
        if (screenX < -HEX_WIDTH * zoom || screenX > cw + HEX_WIDTH * zoom ||
            screenY < -HEX_HEIGHT * zoom || screenY > ch + HEX_HEIGHT * zoom) {
          continue;
        }

        const config = OVERLAND_TERRAIN_CONFIG[hex.terrain];
        const isDiscovered = hex.discovered || isDM || !showFog;
        const isHovered = hoveredHex?.col === c && hoveredHex?.row === r;
        const isSelected = selectedHex?.col === c && selectedHex?.row === r;
        const isParty = effectivePartyPos?.col === c && effectivePartyPos?.row === r;

        // Draw hex fill
        drawHex(ctx, x, y);

        if (!isDiscovered) {
          // Fog of war - dark hex
          ctx.fillStyle = '#0a0e17';
          ctx.fill();
          ctx.strokeStyle = '#1a1e27';
          ctx.lineWidth = 0.5;
          ctx.stroke();
          continue;
        }

        // Terrain color with slight elevation shading
        const shade = 0.85 + hex.elevation * 0.3;
        ctx.fillStyle = config.fill;
        ctx.fill();

        // Elevation gradient overlay
        if (hex.elevation > 0.6) {
          ctx.fillStyle = `rgba(255,255,255,${(hex.elevation - 0.6) * 0.15})`;
          drawHex(ctx, x, y);
          ctx.fill();
        } else if (hex.elevation < 0.35 && hex.terrain !== 'ocean') {
          ctx.fillStyle = `rgba(0,0,0,${(0.35 - hex.elevation) * 0.2})`;
          drawHex(ctx, x, y);
          ctx.fill();
        }

        // Terrain detail drawings
        drawTerrainDetails(ctx, x, y, hex.terrain, HEX_RADIUS);

        // Hex border
        drawHex(ctx, x, y);
        ctx.strokeStyle = isSelected ? '#F38020' : isHovered ? 'rgba(255,255,255,0.4)' : config.stroke;
        ctx.lineWidth = isSelected ? 2.5 : isHovered ? 1.5 : 0.8;
        ctx.stroke();

        // Selection highlight
        if (isSelected) {
          drawHex(ctx, x, y);
          ctx.fillStyle = 'rgba(243,128,32,0.15)';
          ctx.fill();
        }

        // Hover highlight
        if (isHovered && !isSelected) {
          drawHex(ctx, x, y);
          ctx.fillStyle = 'rgba(255,255,255,0.08)';
          ctx.fill();
        }

        // Location name label (for POIs)
        if (hex.name && zoom > 0.6) {
          ctx.font = `bold ${Math.max(8, 10 / Math.max(zoom, 0.8))}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.strokeStyle = 'rgba(0,0,0,0.7)';
          ctx.lineWidth = 2.5;
          ctx.strokeText(hex.name, x, y + HEX_RADIUS * 0.55);
          ctx.fillText(hex.name, x, y + HEX_RADIUS * 0.55);
        }
      }
    }

    // Draw party token
    if (effectivePartyPos) {
      const { x: px, y: py } = hexToPixel(effectivePartyPos.col, effectivePartyPos.row);
      // Glow
      const gradient = ctx.createRadialGradient(px, py, 2, px, py, 14);
      gradient.addColorStop(0, 'rgba(243,128,32,0.6)');
      gradient.addColorStop(1, 'rgba(243,128,32,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.fill();
      // Token circle
      ctx.beginPath();
      ctx.arc(px, py, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#F38020';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Party icon (compass star)
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('P', px, py);
    }

    // Grid coordinate labels (at low zoom only, for orientation)
    if (zoom > 0.8) {
      ctx.font = '7px monospace';
      ctx.fillStyle = 'rgba(148,163,184,0.2)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let r = 0; r < mapData.height; r += 5) {
        for (let c = 0; c < mapData.width; c += 5) {
          const { x, y } = hexToPixel(c, r);
          ctx.fillText(`${c},${r}`, x, y - HEX_RADIUS * 0.8);
        }
      }
    }

    ctx.restore();

    // HUD: map name
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(mapData.name, 12, 12);

    // HUD: zoom level
    ctx.font = '10px monospace';
    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(zoom * 100)}%`, cw - 12, 12);

    // HUD: compass rose
    const compassX = cw - 30;
    const compassY = 50;
    ctx.save();
    ctx.fillStyle = 'rgba(148,163,184,0.3)';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', compassX, compassY - 12);
    ctx.fillText('S', compassX, compassY + 12);
    ctx.fillText('W', compassX - 12, compassY);
    ctx.fillText('E', compassX + 12, compassY);
    ctx.fillStyle = 'rgba(243,128,32,0.4)';
    ctx.beginPath();
    ctx.moveTo(compassX, compassY - 6);
    ctx.lineTo(compassX + 4, compassY + 2);
    ctx.lineTo(compassX, compassY);
    ctx.lineTo(compassX - 4, compassY + 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, [mapData, zoom, panOffset, hoveredHex, selectedHex, effectivePartyPos, isDM, showFog]);

  // Redraw on state changes
  useEffect(() => {
    draw();
  }, [draw]);

  // Redraw on resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => draw());
    observer.observe(container);
    return () => observer.disconnect();
  }, [draw]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedHex(null);
      }
      // Arrow keys to pan
      const panStep = 50;
      if (e.key === 'ArrowLeft') setPanOffset((p) => ({ ...p, x: p.x + panStep }));
      if (e.key === 'ArrowRight') setPanOffset((p) => ({ ...p, x: p.x - panStep }));
      if (e.key === 'ArrowUp') setPanOffset((p) => ({ ...p, y: p.y + panStep }));
      if (e.key === 'ArrowDown') setPanOffset((p) => ({ ...p, y: p.y - panStep }));
      // +/- to zoom
      if (e.key === '=' || e.key === '+') setZoom((z) => Math.min(MAX_ZOOM, z * 1.15));
      if (e.key === '-') setZoom((z) => Math.max(MIN_ZOOM, z / 1.15));
      // C to center on party
      if (e.key === 'c' || e.key === 'C') handleCenterOnParty();
      // F to toggle fog
      if (e.key === 'f' || e.key === 'F') setShowFog((f) => !f);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleCenterOnParty]);

  const hoveredHexData = mapData && hoveredHex ? mapData.hexes[hoveredHex.row]?.[hoveredHex.col] : null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-slate-800 shrink-0 bg-slate-900/50">
        <button
          onClick={handleCenterOnParty}
          className="text-[9px] px-2 py-1 rounded bg-[#F38020]/20 text-[#F38020] hover:bg-[#F38020]/30 font-semibold"
          title="Center on party (C)"
        >
          Center
        </button>
        <button
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z * 1.3))}
          className="text-[9px] px-1.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
        >
          +
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z / 1.3))}
          className="text-[9px] px-1.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
        >
          -
        </button>
        <div className="w-px h-4 bg-slate-700" />
        <button
          onClick={() => setShowFog((f) => !f)}
          className={`text-[9px] px-2 py-1 rounded font-semibold ${showFog ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-amber-900/30 text-amber-400'}`}
          title="Toggle fog of war (F)"
        >
          {showFog ? 'Fog On' : 'Fog Off'}
        </button>
        <button
          onClick={() => setShowControls((s) => !s)}
          className={`text-[9px] px-2 py-1 rounded font-semibold ${showControls ? 'bg-amber-900/30 text-amber-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Generate
        </button>

        {/* Hovered hex info */}
        {hoveredHexData && (hoveredHexData.discovered || isDM || !showFog) && (
          <div className="ml-auto flex items-center gap-1.5 text-[9px] text-slate-400">
            <span>{OVERLAND_TERRAIN_CONFIG[hoveredHexData.terrain].emoji}</span>
            <span className="text-slate-300">{OVERLAND_TERRAIN_CONFIG[hoveredHexData.terrain].label}</span>
            <span className="text-slate-600">({hoveredHex?.col},{hoveredHex?.row})</span>
            {hoveredHexData.name && <span className="text-amber-400 font-semibold">{hoveredHexData.name}</span>}
          </div>
        )}
      </div>

      {/* Map generation panel */}
      {showControls && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800 bg-slate-900/80 shrink-0 flex-wrap">
          <input
            type="text"
            value={mapName}
            onChange={(e) => setMapName(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[10px] text-slate-200 w-28"
            placeholder="Map name"
          />
          <label className="text-[9px] text-slate-500">
            W
            <input
              type="number"
              value={mapWidth}
              onChange={(e) => setMapWidth(Math.max(10, Math.min(60, parseInt(e.target.value) || 30)))}
              className="bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-slate-200 w-12 ml-1"
            />
          </label>
          <label className="text-[9px] text-slate-500">
            H
            <input
              type="number"
              value={mapHeight}
              onChange={(e) => setMapHeight(Math.max(10, Math.min(40, parseInt(e.target.value) || 20)))}
              className="bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-slate-200 w-12 ml-1"
            />
          </label>
          <input
            type="text"
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[10px] text-slate-200 w-24"
            placeholder="Seed (opt)"
          />
          <button
            onClick={handleGenerate}
            className="text-[9px] px-3 py-1 rounded bg-[#F38020] text-white hover:bg-[#ff8c2e] font-semibold"
          >
            Generate
          </button>
          {mapData && (
            <span className="text-[8px] text-slate-600 ml-1">Seed: {mapData.seed}</span>
          )}
        </div>
      )}

      {/* Canvas + detail panel layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Canvas */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onContextMenu={handleContextMenu}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* Keyboard hint overlay */}
          <div className="absolute bottom-2 left-2 text-[8px] text-slate-600 pointer-events-none">
            Scroll to zoom | Drag to pan | Click to select | Double-click to move party | C = center | F = fog | Esc = deselect
          </div>
        </div>

        {/* Selection detail panel */}
        {selectedHex && (
          <div className="w-56 border-l border-slate-800 bg-slate-900/95 p-3 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">{OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].emoji}</span>
              <button
                onClick={() => setSelectedHex(null)}
                className="text-slate-500 hover:text-slate-300 text-xs"
              >
                x
              </button>
            </div>

            <h3 className="text-sm font-bold text-white">
              {selectedHex.name || OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].label}
            </h3>

            {selectedHex.name && (
              <div className="text-[9px] text-slate-400 mt-0.5">
                {OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].label}
              </div>
            )}

            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              {OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].description}
            </p>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-slate-500">Coordinates</span>
                <span className="text-slate-300 font-mono">{selectedHex.col},{selectedHex.row}</span>
              </div>
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-slate-500">Travel Cost</span>
                <span className={`font-semibold ${
                  OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].travelCost <= 1 ? 'text-emerald-400' :
                  OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].travelCost <= 1.5 ? 'text-amber-400' :
                  isFinite(OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].travelCost) ? 'text-red-400' : 'text-slate-600'
                }`}>
                  {isFinite(OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].travelCost)
                    ? `${OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].travelCost}x`
                    : 'Impassable'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-slate-500">Elevation</span>
                <span className="text-slate-300">{Math.round(selectedHex.elevation * 100)}%</span>
              </div>
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-slate-500">Moisture</span>
                <span className="text-slate-300">{Math.round(selectedHex.moisture * 100)}%</span>
              </div>
            </div>

            {/* Distance from party */}
            {effectivePartyPos && (
              <div className="mt-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-slate-500">Distance</span>
                  <span className="text-[#F38020] font-semibold">
                    {Math.round(Math.sqrt(
                      (selectedHex.col - effectivePartyPos.col) ** 2 +
                      (selectedHex.row - effectivePartyPos.row) ** 2,
                    ))} hexes (~{Math.round(Math.sqrt(
                      (selectedHex.col - effectivePartyPos.col) ** 2 +
                      (selectedHex.row - effectivePartyPos.row) ** 2,
                    ) * 6)} mi)
                  </span>
                </div>
              </div>
            )}

            {/* DM notes area */}
            {isDM && (
              <div className="mt-3 pt-2 border-t border-slate-800">
                <label className="text-[9px] text-slate-500 font-semibold uppercase">DM Notes</label>
                <textarea
                  className="w-full mt-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[10px] text-slate-200 resize-none h-16"
                  placeholder="Notes about this hex..."
                  value={selectedHex.notes || ''}
                  onChange={(e) => {
                    if (mapData) {
                      mapData.hexes[selectedHex.row][selectedHex.col].notes = e.target.value;
                      setSelectedHex({ ...selectedHex, notes: e.target.value });
                    }
                  }}
                />
              </div>
            )}

            {/* Move party button */}
            {effectivePartyPos && (effectivePartyPos.col !== selectedHex.col || effectivePartyPos.row !== selectedHex.row) && isFinite(OVERLAND_TERRAIN_CONFIG[selectedHex.terrain].travelCost) && (
              <button
                onClick={() => {
                  if (onPartyMove) {
                    onPartyMove(selectedHex.col, selectedHex.row);
                  } else {
                    setInternalPartyPos({ col: selectedHex.col, row: selectedHex.row });
                  }
                  // Discover around new position
                  if (mapData) {
                    for (let r = 0; r < mapData.height; r++) {
                      for (let c = 0; c < mapData.width; c++) {
                        const dist = Math.sqrt((c - selectedHex.col) ** 2 + (r - selectedHex.row) ** 2);
                        if (dist <= 3 && !mapData.hexes[r][c].discovered) {
                          mapData.hexes[r][c].discovered = true;
                          onHexDiscover?.(c, r);
                        }
                      }
                    }
                  }
                }}
                className="w-full mt-3 text-[10px] px-3 py-1.5 rounded bg-[#F38020]/20 text-[#F38020] hover:bg-[#F38020]/30 font-semibold transition-colors"
              >
                Move Party Here
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
