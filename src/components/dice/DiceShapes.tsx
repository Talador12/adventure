// SVG dice shapes — each die type gets a unique polygon outline that matches its geometry.
// These are designed to look good at 120x120 and animate with CSS transforms.

interface DiceShapeProps {
  className?: string;
  size?: number;
}

// d4: Tetrahedron — equilateral triangle
export function D4Shape({ className = '', size = 120 }: DiceShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 10,110 110,110" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      {/* Inner triangle lines for 3D effect */}
      <line x1="60" y1="10" x2="60" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="110" x2="85" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="110" y1="110" x2="35" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// d6: Cube — isometric cube view
export function D6Shape({ className = '', size = 120 }: DiceShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top face */}
      <polygon points="60,15 105,38 60,61 15,38" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      {/* Left face */}
      <polygon points="15,38 60,61 60,108 15,85" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" opacity="0.7" />
      {/* Right face */}
      <polygon points="105,38 60,61 60,108 105,85" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" opacity="0.5" />
    </svg>
  );
}

// d8: Octahedron — diamond shape with center line
export function D8Shape({ className = '', size = 120 }: DiceShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main diamond */}
      <polygon points="60,8 112,60 60,112 8,60" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      {/* Horizontal center line */}
      <line x1="8" y1="60" x2="112" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {/* Diagonal facets */}
      <line x1="60" y1="8" x2="36" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="60" y1="8" x2="84" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="60" y1="112" x2="36" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="60" y1="112" x2="84" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// d10: Pentagonal trapezohedron — kite/pointed shape
export function D10Shape({ className = '', size = 120 }: DiceShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer pointed shape */}
      <polygon points="60,6 100,35 108,75 60,114 12,75 20,35" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      {/* Inner facet lines */}
      <line x1="60" y1="6" x2="60" y2="114" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="35" x2="108" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <line x1="100" y1="35" x2="12" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

// d12: Dodecahedron — pentagon shape
export function D12Shape({ className = '', size = 120 }: DiceShapeProps) {
  // Regular pentagon points
  const cx = 60,
    cy = 60,
    r = 52;
  const pts = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');

  // Inner pentagon (rotated 36deg)
  const ri = 32;
  const innerPts = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90 + 36) * (Math.PI / 180);
    return `${cx + ri * Math.cos(angle)},${cy + ri * Math.sin(angle)}`;
  }).join(' ');

  // Lines connecting outer to inner
  const outerCoords = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const innerCoords = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90 + 36) * (Math.PI / 180);
    return { x: cx + ri * Math.cos(angle), y: cy + ri * Math.sin(angle) };
  });

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points={pts} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <polygon points={innerPts} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.4" />
      {outerCoords.map((oc, i) => (
        <line key={i} x1={oc.x} y1={oc.y} x2={innerCoords[i].x} y2={innerCoords[i].y} stroke="currentColor" strokeWidth="1" opacity="0.3" />
      ))}
    </svg>
  );
}

// d20: Icosahedron — hexagonal outline with triangular facets
export function D20Shape({ className = '', size = 120 }: DiceShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer hexagon-like shape */}
      <polygon points="60,5 105,25 110,70 75,112 45,112 10,70 15,25" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      {/* Inner triangular facets */}
      <line x1="60" y1="5" x2="45" y2="112" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="60" y1="5" x2="75" y2="112" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="15" y1="25" x2="110" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="105" y1="25" x2="10" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="10" y1="70" x2="75" y2="112" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="110" y1="70" x2="45" y2="112" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      {/* Center point connections */}
      <line x1="60" y1="5" x2="10" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="60" y1="5" x2="110" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    </svg>
  );
}

// Map die type to its shape component
export const DICE_SHAPE_MAP: Record<string, React.FC<DiceShapeProps>> = {
  d4: D4Shape,
  d6: D6Shape,
  d8: D8Shape,
  d10: D10Shape,
  d12: D12Shape,
  d20: D20Shape,
};
