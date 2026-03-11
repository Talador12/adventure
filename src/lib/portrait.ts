// SVG portrait system — composable vector art for race/class character portraits
// Pure functions, no React deps. Appearance-driven: every picker change updates in real-time.
import { DEFAULT_APPEARANCE, type Race, type CharacterClass, type Appearance, type HairStyle, type ScarType, type FaceMarkingType, type FacialHairType } from '../contexts/GameContext';
import { SKIN_PALETTES, HAIR_PALETTES, EYE_PALETTES } from './palettes';

// Shape definitions for the portrait builder
interface RaceDef {
  bg1: string; bg2: string; skin: string; skinShade: string; hair: string; eye: string;
  headRx: number; headRy: number; headCy: number; face: string;
}
interface ClassDef {
  outfit1: string; outfit2: string; accent: string; outfit: string; particles: string;
}

// Hair style SVG generators — positioned relative to the head
function buildHairSvg(style: HairStyle, color: string, headCy: number, headRx: number): string {
  const cx = 64, topY = headCy - 28;
  const lx = cx - headRx, rx = cx + headRx;
  switch (style) {
    case 'short':
      return `<path d="M${lx} ${headCy - 6}q0-14 ${headRx - 2}-${headRx + 4}c4 6 ${headRx * 2 - 8} 6 ${headRx * 2 - 4} 0q${headRx - 2} ${headRx - 10} ${headRx - 2} ${headRx + 4}" fill="${color}"/>` +
        `<path d="M${lx} ${headCy - 6}c2-1 5-2 8-1s5 2 8 1 5-2 8-1 5 1 8 2" fill="${color}" opacity=".6"/>`;
    case 'long':
      return `<path d="M${lx} ${headCy - 6}q0-16 ${headRx}-${headRx + 6}t${headRx} ${headRx + 6}" fill="${color}"/>` +
        `<path d="M${lx} ${headCy - 6}l-4 38" stroke="${color}" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="M${rx} ${headCy - 6}l4 38" stroke="${color}" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="M${lx - 2} ${headCy + 10}l-2 22" stroke="${color}" stroke-width="2.5" opacity=".5" stroke-linecap="round"/>` +
        `<path d="M${rx + 2} ${headCy + 10}l2 22" stroke="${color}" stroke-width="2.5" opacity=".5" stroke-linecap="round"/>`;
    case 'braided':
      return `<path d="M${lx} ${headCy - 6}q0-14 ${headRx}-${headRx + 4}t${headRx} ${headRx + 4}" fill="${color}"/>` +
        `<path d="M${cx} ${topY + 2}l-2 50" stroke="${color}" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M${cx} ${topY + 8}l1 8-2 8 1 8-2 8 1 8" stroke="${color}" stroke-width="1.5" opacity=".4" fill="none"/>` +
        `<circle cx="${cx}" cy="${headCy + 28}" r="2" fill="${color}" opacity=".6"/>`;
    case 'shaved':
      return `<path d="M${lx + 2} ${headCy - 4}q0-10 ${headRx - 2}-${headRx}t${headRx - 2} ${headRx}" fill="${color}" opacity=".35"/>`;
    case 'ponytail':
      return `<path d="M${lx} ${headCy - 6}q0-14 ${headRx}-${headRx + 4}t${headRx} ${headRx + 4}" fill="${color}"/>` +
        `<path d="M${cx + 2} ${topY + 4}q10 8 8 32" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
        `<circle cx="${cx + 4}" cy="${topY + 8}" r="2" fill="${color}" opacity=".7"/>`;
    case 'wild':
      return `<path d="M${lx - 4} ${headCy - 2}q-2-18 ${headRx + 4}-${headRx + 10}t${headRx + 4} ${headRx + 10}" fill="${color}"/>` +
        `<path d="M${lx - 6} ${headCy}l-4 10" stroke="${color}" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M${rx + 6} ${headCy}l4 10" stroke="${color}" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M${lx - 2} ${headCy - 4}l-6-4 2 6" fill="${color}" opacity=".6"/>` +
        `<path d="M${rx + 2} ${headCy - 4}l6-4-2 6" fill="${color}" opacity=".6"/>`;
  }
}

// Scar overlay SVG
function buildScarSvg(scar: ScarType): string {
  switch (scar) {
    case 'none': return '';
    case 'left-eye':
      return `<path d="M50 30l8 16" stroke="#c8a0a0" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>` +
        `<path d="M51 31l7 14" stroke="#e0c0c0" stroke-width=".5" opacity=".3"/>`;
    case 'right-cheek':
      return `<path d="M72 40l8 10" stroke="#c8a0a0" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>` +
        `<path d="M74 42l4 6" stroke="#c8a0a0" stroke-width=".8" opacity=".4" stroke-linecap="round"/>`;
    case 'forehead':
      return `<path d="M54 24l20 4" stroke="#c8a0a0" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>` +
        `<path d="M56 22l16 4" stroke="#e0c0c0" stroke-width=".5" opacity=".3"/>`;
  }
}

// Face marking (war paint, runes, tattoo)
function buildFaceMarkingSvg(marking: FaceMarkingType, accent: string): string {
  switch (marking) {
    case 'none': return '';
    case 'war-paint':
      return `<path d="M48 36l-6 4 6 4" stroke="${accent}" stroke-width="1.5" fill="none" opacity=".5"/>` +
        `<path d="M80 36l6 4-6 4" stroke="${accent}" stroke-width="1.5" fill="none" opacity=".5"/>` +
        `<path d="M56 46l8 4 8-4" stroke="${accent}" stroke-width="1" fill="none" opacity=".4"/>`;
    case 'arcane-runes':
      return `<circle cx="50" cy="34" r="2" stroke="${accent}" stroke-width=".6" fill="none" opacity=".4"/>` +
        `<circle cx="78" cy="34" r="2" stroke="${accent}" stroke-width=".6" fill="none" opacity=".4"/>` +
        `<path d="M58 26l6-2 6 2" stroke="${accent}" stroke-width=".6" fill="none" opacity=".35"/>` +
        `<path d="M62 24v-3" stroke="${accent}" stroke-width=".5" opacity=".3"/>` +
        `<path d="M66 24v-3" stroke="${accent}" stroke-width=".5" opacity=".3"/>`;
    case 'tribal-tattoo':
      return `<path d="M46 30q4 8 4 16" stroke="${accent}" stroke-width="1.2" fill="none" opacity=".45"/>` +
        `<path d="M48 32q2 6 2 12" stroke="${accent}" stroke-width=".6" fill="none" opacity=".3"/>` +
        `<path d="M82 30q-4 8-4 16" stroke="${accent}" stroke-width="1.2" fill="none" opacity=".45"/>` +
        `<path d="M80 32q-2 6-2 12" stroke="${accent}" stroke-width=".6" fill="none" opacity=".3"/>`;
  }
}

// Facial hair SVG
function buildFacialHairSvg(type: FacialHairType, color: string, headCy: number): string {
  const mouthY = headCy + 10, chinY = headCy + 16;
  switch (type) {
    case 'none': return '';
    case 'stubble':
      return `<rect x="52" y="${mouthY}" width="24" height="10" rx="4" fill="${color}" opacity=".15"/>`;
    case 'full-beard':
      return `<path d="M48 ${mouthY - 2}q4 2 8 4t8 2q4 0 8-2t8-4q-2 14-16 18t-16-18z" fill="${color}" opacity=".7"/>` +
        `<path d="M52 ${chinY}q12 8 24 0" stroke="${color}" stroke-width=".8" opacity=".4" fill="none"/>`;
    case 'goatee':
      return `<path d="M58 ${mouthY + 2}q6 4 12 0q-2 10-6 12t-6-12z" fill="${color}" opacity=".6"/>`;
    case 'mustache':
      return `<path d="M54 ${mouthY - 1}q4-3 10 0t10 0" stroke="${color}" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`;
  }
}

function buildRaceDefs(): Record<Race, RaceDef> {
  return {
    Human: { bg1: '#3d4f6a', bg2: '#1e2d42', skin: '#d4a574', skinShade: '#b8895c', hair: '#3d2b1f', eye: '#5a8060', headRx: 20, headRy: 23, headCy: 36,
      face: `<ellipse cx="64" cy="36" rx="20" ry="23" fill="#d4a574"/><ellipse cx="64" cy="36" rx="20" ry="23" fill="#b8895c" opacity=".15"/>` +
        `<path d="M44 28c0-14 9-22 20-22s20 8 20 22" fill="#3d2b1f"/><path d="M44 28c2-1 5-2 8-1s5 2 8 1 5-2 8-1 5 1 8 2" fill="#3d2b1f" opacity=".7"/>` +
        `<ellipse cx="56" cy="36" rx="3.5" ry="4" fill="white"/><ellipse cx="72" cy="36" rx="3.5" ry="4" fill="white"/>` +
        `<circle cx="56" cy="36.8" r="2" fill="#5a8060"/><circle cx="72" cy="36.8" r="2" fill="#5a8060"/>` +
        `<circle cx="57" cy="35.8" r=".7" fill="white"/><circle cx="73" cy="35.8" r=".7" fill="white"/>` +
        `<path d="M51 32.5q5-1.5 9 0" stroke="#3d2b1f" stroke-width=".7" fill="none"/>` +
        `<path d="M67 32.5q5-1.5 9 0" stroke="#3d2b1f" stroke-width=".7" fill="none"/>` +
        `<path d="M61 43q3 2 6 0" stroke="#b8895c" stroke-width="1.2" fill="none"/>` +
        `<path d="M58 47q6 3 12 0" stroke="#c4846a" stroke-width="1" fill="none"/>` },
    Elf: { bg1: '#1e3a5e', bg2: '#0e1e34', skin: '#f0dcc8', skinShade: '#dcc4a8', hair: '#c0c8d8', eye: '#7dd3fc', headRx: 17, headRy: 23, headCy: 38,
      face: `<ellipse cx="64" cy="38" rx="17" ry="23" fill="#f0dcc8"/><ellipse cx="64" cy="38" rx="17" ry="23" fill="#dcc4a8" opacity=".15"/>` +
        `<path d="M47 32q0-18 17-24t17 24" fill="#c0c8d8"/>` +
        `<path d="M47 32q-2 1-4 0l-12-9q7-2 16 9z" fill="#f0dcc8" stroke="#dcc4a8" stroke-width=".5"/>` +
        `<path d="M81 32q2 1 4 0l12-9q-7-2-16 9z" fill="#f0dcc8" stroke="#dcc4a8" stroke-width=".5"/>` +
        `<circle cx="31" cy="23.5" r=".8" fill="#7dd3fc" opacity=".5"/>` +
        `<circle cx="97" cy="23.5" r=".8" fill="#7dd3fc" opacity=".5"/>` +
        `<ellipse cx="57" cy="38" rx="3" ry="4" fill="white"/><ellipse cx="71" cy="38" rx="3" ry="4" fill="white"/>` +
        `<ellipse cx="57" cy="38.5" rx="1.8" ry="2.5" fill="#7dd3fc"/><ellipse cx="71" cy="38.5" rx="1.8" ry="2.5" fill="#7dd3fc"/>` +
        `<circle cx="57.6" cy="37.5" r=".6" fill="white"/><circle cx="71.6" cy="37.5" r=".6" fill="white"/>` +
        `<path d="M52 35q5-1 9 0" stroke="#dcc4a8" stroke-width=".6" fill="none"/>` +
        `<path d="M67 35q5-1 9 0" stroke="#dcc4a8" stroke-width=".6" fill="none"/>` +
        `<path d="M60 44q4 2 8 0" stroke="#dcc4a8" stroke-width="1" fill="none"/>` +
        `<path d="M58 48q6 3 12 0" stroke="#d4a89c" stroke-width=".8" fill="none"/>` +
        `<path d="M47 32l-5 28" stroke="#c0c8d8" stroke-width="2.5" fill="none" opacity=".5"/>` +
        `<path d="M81 32l5 28" stroke="#c0c8d8" stroke-width="2.5" fill="none" opacity=".5"/>` },
    Dwarf: { bg1: '#5c3a20', bg2: '#3b2010', skin: '#dba67a', skinShade: '#c08a5e', hair: '#8b4513', eye: '#e0a040', headRx: 22, headRy: 21, headCy: 36,
      face: `<ellipse cx="64" cy="36" rx="22" ry="21" fill="#dba67a"/><ellipse cx="64" cy="36" rx="22" ry="21" fill="#c08a5e" opacity=".15"/>` +
        `<path d="M42 30q0-12 10-15c4 5 16 5 24 0q10 3 10 15" fill="#8b4513"/>` +
        `<path d="M42 30l-3 3" stroke="#8b4513" stroke-width="2.5"/><path d="M86 30l3 3" stroke="#8b4513" stroke-width="2.5"/>` +
        `<ellipse cx="55" cy="34" rx="3.5" ry="3.5" fill="white"/><ellipse cx="73" cy="34" rx="3.5" ry="3.5" fill="white"/>` +
        `<circle cx="55" cy="34.5" r="2" fill="#e0a040"/><circle cx="73" cy="34.5" r="2" fill="#e0a040"/>` +
        `<circle cx="55.7" cy="33.5" r=".6" fill="white"/><circle cx="73.7" cy="33.5" r=".6" fill="white"/>` +
        `<path d="M50 31q5-1.5 9 0" stroke="#6b3410" stroke-width=".8" fill="none"/>` +
        `<path d="M69 31q5-1.5 9 0" stroke="#6b3410" stroke-width=".8" fill="none"/>` +
        `<path d="M61 41q3 1.5 6 0" stroke="#c08a5e" stroke-width="1.5" fill="none"/>` +
        `<path d="M46 44q6 2 10 5t8 5q4-3 8-5t10-5" fill="#8b4513"/>` +
        `<path d="M54 50q4 5 8 6t8-6" fill="#8b4513" opacity=".7"/>` +
        `<path d="M52 55q12 6 24 0" stroke="#6b3410" stroke-width=".8" fill="none"/>` },
    Halfling: { bg1: '#2e4e2e', bg2: '#1a301a', skin: '#e8c8a0', skinShade: '#d4b08a', hair: '#6b4423', eye: '#7cb342', headRx: 18, headRy: 20, headCy: 40,
      face: `<ellipse cx="64" cy="40" rx="18" ry="20" fill="#e8c8a0"/><ellipse cx="64" cy="40" rx="18" ry="20" fill="#d4b08a" opacity=".15"/>` +
        `<path d="M46 34q2-14 18-16t18 16" fill="#6b4423"/>` +
        `<path d="M46 34q-2 3-2 7" stroke="#6b4423" stroke-width="3.5" stroke-linecap="round"/>` +
        `<path d="M82 34q2 3 2 7" stroke="#6b4423" stroke-width="3.5" stroke-linecap="round"/>` +
        `<ellipse cx="57" cy="40" rx="3.5" ry="3.5" fill="white"/><ellipse cx="71" cy="40" rx="3.5" ry="3.5" fill="white"/>` +
        `<circle cx="57" cy="40.5" r="2" fill="#7cb342"/><circle cx="71" cy="40.5" r="2" fill="#7cb342"/>` +
        `<circle cx="57.6" cy="39.8" r=".6" fill="white"/><circle cx="71.6" cy="39.8" r=".6" fill="white"/>` +
        `<circle cx="52" cy="44" r="3.5" fill="#f0b8a0" opacity=".35"/><circle cx="76" cy="44" r="3.5" fill="#f0b8a0" opacity=".35"/>` +
        `<path d="M61 46q3 2 6 0" stroke="#d4b08a" stroke-width="1" fill="none"/>` +
        `<path d="M58 50q6 3 12 0" stroke="#c09878" stroke-width=".8" fill="none"/>` },
    Gnome: { bg1: '#4e2098', bg2: '#301268', skin: '#f0d8c0', skinShade: '#dcc0a0', hair: '#ff6b6b', eye: '#c4b5fd', headRx: 20, headRy: 23, headCy: 36,
      face: `<ellipse cx="64" cy="36" rx="20" ry="23" fill="#f0d8c0"/><ellipse cx="64" cy="36" rx="20" ry="23" fill="#dcc0a0" opacity=".15"/>` +
        `<path d="M44 28q4-16 20-18t20 18" fill="#ff6b6b"/>` +
        `<path d="M44 28l-7 12" stroke="#ff6b6b" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="M84 28l5-10 3 2" stroke="#ff6b6b" stroke-width="3.5" stroke-linecap="round"/>` +
        `<ellipse cx="55" cy="36" rx="5" ry="4.5" fill="white"/><ellipse cx="73" cy="36" rx="5" ry="4.5" fill="white"/>` +
        `<circle cx="55" cy="36.5" r="2.8" fill="#8b5cf6"/><circle cx="73" cy="36.5" r="2.8" fill="#8b5cf6"/>` +
        `<circle cx="55.8" cy="35.5" r=".9" fill="white"/><circle cx="73.8" cy="35.5" r=".9" fill="white"/>` +
        `<ellipse cx="64" cy="45" rx="4.5" ry="3.5" fill="#e8c0a8" opacity=".5"/>` +
        `<path d="M60 49q4 2.5 8 0" stroke="#dcc0a0" stroke-width="1.2" fill="none"/>` +
        `<path d="M56 53q8 4 16 0" stroke="#c09878" stroke-width="1" fill="none"/>` },
    'Half-Orc': { bg1: '#1e3e1e', bg2: '#102210', skin: '#7aaa6a', skinShade: '#5c8c4c', hair: '#2d2d2d', eye: '#ef4444', headRx: 23, headRy: 23, headCy: 34,
      face: `<ellipse cx="64" cy="34" rx="23" ry="23" fill="#7aaa6a"/><ellipse cx="64" cy="34" rx="23" ry="23" fill="#5c8c4c" opacity=".2"/>` +
        `<path d="M41 26q4-12 23-14t23 14" fill="#2d2d2d"/>` +
        `<path d="M41 26l-2 5" stroke="#2d2d2d" stroke-width="3.5"/><path d="M87 26l2 5" stroke="#2d2d2d" stroke-width="3.5"/>` +
        `<ellipse cx="53" cy="34" rx="4.5" ry="4" fill="white"/><ellipse cx="75" cy="34" rx="4.5" ry="4" fill="white"/>` +
        `<circle cx="53" cy="34.5" r="2.5" fill="#b91c1c"/><circle cx="75" cy="34.5" r="2.5" fill="#b91c1c"/>` +
        `<circle cx="53.8" cy="33.5" r=".7" fill="#ef4444" opacity=".6"/>` +
        `<circle cx="75.8" cy="33.5" r=".7" fill="#ef4444" opacity=".6"/>` +
        `<line x1="46" y1="30" x2="40" y2="26" stroke="#5c8c4c" stroke-width="1.8"/>` +
        `<line x1="82" y1="30" x2="88" y2="26" stroke="#5c8c4c" stroke-width="1.8"/>` +
        `<path d="M61 42q3 1.5 6 0" stroke="#5c8c4c" stroke-width="1.8" fill="none"/>` +
        `<path d="M56 48l3-4 1.5 .8" fill="#e8e8d0"/><path d="M72 48l-3-4-1.5 .8" fill="#e8e8d0"/>` +
        `<path d="M56 48q8 3 16 0" stroke="#4a7a3a" stroke-width="1.2" fill="none"/>` },
    Tiefling: { bg1: '#4e1020', bg2: '#2c0812', skin: '#c06070', skinShade: '#a04858', hair: '#1a1a2e', eye: '#fbbf24', headRx: 17, headRy: 23, headCy: 38,
      face: `<ellipse cx="64" cy="38" rx="17" ry="23" fill="#c06070"/><ellipse cx="64" cy="38" rx="17" ry="23" fill="#a04858" opacity=".15"/>` +
        `<path d="M47 32q2-14 17-18t17 18" fill="#1a1a2e"/>` +
        `<path d="M49 18q-5-14-2-7l7 10" fill="#6b2030" stroke="#5a1828" stroke-width=".4"/>` +
        `<path d="M79 18q5-14 2-7l-7 10" fill="#6b2030" stroke="#5a1828" stroke-width=".4"/>` +
        `<ellipse cx="57" cy="38" rx="3" ry="4" fill="#fbbf24"/><ellipse cx="71" cy="38" rx="3" ry="4" fill="#fbbf24"/>` +
        `<ellipse cx="57" cy="38.5" rx="1.2" ry="2.5" fill="#1a1a2e"/><ellipse cx="71" cy="38.5" rx="1.2" ry="2.5" fill="#1a1a2e"/>` +
        `<circle cx="57.5" cy="37.2" r=".4" fill="#fbbf24"/><circle cx="71.5" cy="37.2" r=".4" fill="#fbbf24"/>` +
        `<path d="M52 34q5-1 9 0" stroke="#a04858" stroke-width=".6" fill="none"/>` +
        `<path d="M67 34q5-1 9 0" stroke="#a04858" stroke-width=".6" fill="none"/>` +
        `<path d="M61 46q3 2 6 0" stroke="#a04858" stroke-width="1" fill="none"/>` +
        `<path d="M58 50q6 2.5 12 0" stroke="#8a3848" stroke-width=".8" fill="none"/>` +
        `<path d="M47 32l-9 30" stroke="#1a1a2e" stroke-width="2" fill="none" opacity=".5"/>` +
        `<path d="M81 32l9 30" stroke="#1a1a2e" stroke-width="2" fill="none" opacity=".5"/>` },
    Dragonborn: { bg1: '#1e3050', bg2: '#101c32', skin: '#4a8ab0', skinShade: '#3a7090', hair: '#2a5a7a', eye: '#fbbf24', headRx: 22, headRy: 23, headCy: 36,
      face: `<ellipse cx="64" cy="36" rx="22" ry="23" fill="#4a8ab0"/><ellipse cx="64" cy="36" rx="22" ry="23" fill="#3a7090" opacity=".2"/>` +
        `<path d="M42 26q4-10 22-12t22 12" fill="#2a5a7a"/>` +
        `<path d="M42 26l-5-7-2 3 7 4z" fill="#3a7090"/><path d="M86 26l5-7 2 3-7 4z" fill="#3a7090"/>` +
        `<path d="M48 20l-3-8 1.5 0 5 8z" fill="#4a8ab0" opacity=".6"/>` +
        `<path d="M80 20l3-8-1.5 0-5 8z" fill="#4a8ab0" opacity=".6"/>` +
        `<ellipse cx="54" cy="34" rx="4.5" ry="3.5" fill="#fbbf24"/><ellipse cx="74" cy="34" rx="4.5" ry="3.5" fill="#fbbf24"/>` +
        `<ellipse cx="54" cy="34.5" rx="1.5" ry="2.2" fill="#1a1a1a"/><ellipse cx="74" cy="34.5" rx="1.5" ry="2.2" fill="#1a1a1a"/>` +
        `<path d="M57 44l7 3 7-3" stroke="#3a7090" stroke-width="1.8" fill="none"/>` +
        `<path d="M58 42q6 1.5 12 0" stroke="#2a5a7a" stroke-width=".8" fill="none"/>` +
        `<path d="M48 34l-5 1.5" stroke="#5a9ac0" stroke-width=".6" opacity=".4"/>` +
        `<path d="M80 34l5 1.5" stroke="#5a9ac0" stroke-width=".6" opacity=".4"/>` +
        `<path d="M46 40l-3 3" stroke="#5a9ac0" stroke-width=".5" opacity=".3"/>` +
        `<path d="M82 40l3 3" stroke="#5a9ac0" stroke-width=".5" opacity=".3"/>` },
  };
}

function buildClassDefs(): Record<CharacterClass, ClassDef> {
  return {
    Fighter: { outfit1: '#6b7280', outfit2: '#4b5563', accent: '#94a3b8',
      outfit: `<rect x="36" y="60" width="56" height="40" rx="5" fill="#6b7280"/><path d="M36 60l28 10 28-10" fill="#4b5563"/>` +
        `<path d="M64 60v10" stroke="#94a3b8" stroke-width="1.5"/>` +
        `<rect x="30" y="62" width="6" height="20" rx="2" fill="#78716c"/>` +
        `<rect x="92" y="62" width="6" height="20" rx="2" fill="#78716c"/>` +
        `<path d="M26 58l-4 22 3 1 4-20z" fill="#94a3b8" opacity=".7"/>` +
        `<path d="M22 80l-2-28" stroke="#b0b8c4" stroke-width="1.5"/>`,
      particles: `<circle cx="20" cy="15" r="1" fill="#e2e8f0" opacity=".3"/><circle cx="108" cy="20" r=".8" fill="#e2e8f0" opacity=".25"/>` },
    Wizard: { outfit1: '#3b2e8a', outfit2: '#2a1e6a', accent: '#a78bfa',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#3b2e8a"/><path d="M38 60l26 10 26-10" fill="#2a1e6a"/>` +
        `<path d="M64 60v14" stroke="#a78bfa" stroke-width="1" opacity=".6"/>` +
        `<circle cx="64" cy="60" r="2.5" fill="#a78bfa" opacity=".5"/>` +
        `<path d="M42 58l-6 16-4 0 2-18z" fill="#3b2e8a"/>` +
        `<path d="M86 58l6 16 4 0-2-18z" fill="#3b2e8a"/>` +
        `<path d="M96 50l0-24 2-6-5 4 3 26z" fill="#6b5420" opacity=".6"/>` +
        `<circle cx="98" cy="20" r="3" fill="#a78bfa" opacity=".5"/>` +
        `<circle cx="98" cy="20" r="1.5" fill="#ddd6fe" opacity=".7"/>`,
      particles: `<circle cx="14" cy="12" r="1.2" fill="#c4b5fd" opacity=".4"/><circle cx="100" cy="10" r="1" fill="#ddd6fe" opacity=".35"/><circle cx="24" cy="80" r=".8" fill="#a78bfa" opacity=".25"/><circle cx="110" cy="40" r=".7" fill="#c4b5fd" opacity=".3"/>` },
    Rogue: { outfit1: '#374151', outfit2: '#1f2937', accent: '#6ee7b7',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="4" fill="#374151"/><path d="M38 60l26 10 26-10" fill="#1f2937"/>` +
        `<path d="M54 60q10 6 20 0" stroke="#6ee7b7" stroke-width=".6" fill="none" opacity=".4"/>` +
        `<path d="M44 58l-4 8 2 2 4-8z" fill="#4b5563"/>` +
        `<path d="M84 58l4 8-2 2-4-8z" fill="#4b5563"/>` +
        `<path d="M96 56l2 20" stroke="#9ca3af" stroke-width="1"/>` +
        `<path d="M95.5 54l1-3 1.5 0 .5 4z" fill="#6b7280"/>` +
        `<path d="M58 60l6-2 6 2" stroke="#374151" stroke-width="1.5" fill="none"/>`,
      particles: `<circle cx="18" cy="25" r=".7" fill="#6ee7b7" opacity=".2"/><circle cx="112" cy="50" r=".6" fill="#6ee7b7" opacity=".15"/>` },
    Cleric: { outfit1: '#f5f0e0', outfit2: '#d4c8a8', accent: '#fbbf24',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#f5f0e0"/><path d="M38 60l26 10 26-10" fill="#d4c8a8"/>` +
        `<rect x="62" y="62" width="4" height="12" rx="1" fill="#fbbf24" opacity=".6"/>` +
        `<rect x="59" y="66" width="10" height="3" rx="1" fill="#fbbf24" opacity=".6"/>` +
        `<path d="M34 60l-2 14 4 2 2-14z" fill="#d4c8a8"/>` +
        `<circle cx="64" cy="60" r="2" fill="#fbbf24" opacity=".5"/>`,
      particles: `<circle cx="20" cy="14" r="1.5" fill="#fef3c7" opacity=".35"/><circle cx="108" cy="18" r="1.2" fill="#fde68a" opacity=".3"/><circle cx="14" cy="50" r="1" fill="#fef3c7" opacity=".2"/><circle cx="114" cy="60" r=".8" fill="#fde68a" opacity=".2"/>` },
    Ranger: { outfit1: '#2d5a2d', outfit2: '#1a3a1a', accent: '#86efac',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="4" fill="#2d5a2d"/><path d="M38 60l26 10 26-10" fill="#1a3a1a"/>` +
        `<path d="M42 58l-6 20" stroke="#4a7a4a" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M86 58l6 20" stroke="#4a7a4a" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M56 58l8 4 8-4" stroke="#86efac" stroke-width=".6" fill="none" opacity=".4"/>` +
        `<path d="M98 42l-2 30" stroke="#8b6914" stroke-width="1.5"/>` +
        `<path d="M96 42q-4 14 0 30" stroke="#8b6914" stroke-width=".8" fill="none"/>`,
      particles: `<circle cx="16" cy="18" r=".8" fill="#86efac" opacity=".2"/><circle cx="110" cy="14" r=".6" fill="#bbf7d0" opacity=".2"/>` },
    Paladin: { outfit1: '#c0a050', outfit2: '#9a7a30', accent: '#fef3c7',
      outfit: `<rect x="34" y="60" width="60" height="40" rx="5" fill="#c0a050"/><path d="M34 60l30 10 30-10" fill="#9a7a30"/>` +
        `<path d="M64 60v10" stroke="#fef3c7" stroke-width="1.5" opacity=".5"/>` +
        `<rect x="28" y="60" width="7" height="22" rx="3" fill="#b8960a"/>` +
        `<rect x="93" y="60" width="7" height="22" rx="3" fill="#b8960a"/>` +
        `<path d="M24 54l-3 24 2 1 4-22z" fill="#d4c0a0"/>` +
        `<circle cx="64" cy="60" r="3" fill="#fbbf24" opacity=".4"/>` +
        `<path d="M62 58l2-2 2 2" stroke="#fef3c7" stroke-width=".8" fill="none"/>`,
      particles: `<circle cx="18" cy="12" r="1.3" fill="#fef3c7" opacity=".3"/><circle cx="106" cy="16" r="1" fill="#fde68a" opacity=".3"/><circle cx="12" cy="60" r=".8" fill="#fef3c7" opacity=".2"/>` },
    Barbarian: { outfit1: '#7c5030', outfit2: '#5a3820', accent: '#ef4444',
      outfit: `<rect x="32" y="60" width="64" height="40" rx="5" fill="#7c5030"/><path d="M32 60l32 10 32-10" fill="#5a3820"/>` +
        `<path d="M52 58l12 6 12-6" stroke="#ef4444" stroke-width=".8" fill="none" opacity=".5"/>` +
        `<rect x="26" y="58" width="8" height="24" rx="3" fill="#5a3820"/>` +
        `<rect x="94" y="58" width="8" height="24" rx="3" fill="#5a3820"/>` +
        `<path d="M26 62l-2 2M28 66l-3 2M26 70l-2 3" stroke="#7c5030" stroke-width=".8"/>` +
        `<path d="M22 48l-6 28 3 2 8-26z" fill="#9ca3af"/>` +
        `<path d="M16 48l-4 4 6 0z" fill="#b0b8c4"/>`,
      particles: `<circle cx="18" cy="20" r="1" fill="#fca5a5" opacity=".25"/><circle cx="110" cy="24" r=".8" fill="#ef4444" opacity=".2"/>` },
    Bard: { outfit1: '#7c3aed', outfit2: '#5b21b6', accent: '#f9a8d4',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#7c3aed"/><path d="M38 60l26 10 26-10" fill="#5b21b6"/>` +
        `<path d="M54 60q10 8 20 0" stroke="#f9a8d4" stroke-width=".8" fill="none" opacity=".5"/>` +
        `<path d="M42 58l-4 14" stroke="#7c3aed" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M86 58l4 14" stroke="#7c3aed" stroke-width="3" stroke-linecap="round"/>` +
        `<ellipse cx="100" cy="64" rx="5" ry="8" fill="#8b6914" opacity=".6"/>` +
        `<path d="M100 56v-12" stroke="#8b6914" stroke-width="1.2"/>` +
        `<circle cx="100" cy="64" r="1.5" fill="#1a1a1a" opacity=".3"/>`,
      particles: `<circle cx="16" cy="16" r="1" fill="#f9a8d4" opacity=".3"/><circle cx="108" cy="12" r="1.2" fill="#e9d5ff" opacity=".35"/><circle cx="22" cy="70" r=".7" fill="#f9a8d4" opacity=".2"/><circle cx="106" cy="80" r=".6" fill="#c4b5fd" opacity=".2"/>` },
    Sorcerer: { outfit1: '#991b1b', outfit2: '#7f1d1d', accent: '#fb923c',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#991b1b"/><path d="M38 60l26 10 26-10" fill="#7f1d1d"/>` +
        `<path d="M64 60v12" stroke="#fb923c" stroke-width="1" opacity=".5"/>` +
        `<circle cx="64" cy="60" r="2.5" fill="#fb923c" opacity=".5"/>` +
        `<path d="M40 58l-6 18 3 2 5-16z" fill="#991b1b"/>` +
        `<path d="M88 58l6 18-3 2-5-16z" fill="#991b1b"/>`,
      particles: `<circle cx="14" cy="14" r="1.5" fill="#fb923c" opacity=".35"/><circle cx="110" cy="18" r="1.2" fill="#fdba74" opacity=".3"/><circle cx="20" cy="45" r="1" fill="#fca5a5" opacity=".25"/><circle cx="106" cy="50" r=".8" fill="#fb923c" opacity=".2"/><circle cx="64" cy="8" r="1" fill="#fdba74" opacity=".3"/>` },
    Warlock: { outfit1: '#1e1b4b', outfit2: '#0f0a2e', accent: '#a855f7',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#1e1b4b"/><path d="M38 60l26 10 26-10" fill="#0f0a2e"/>` +
        `<path d="M64 62v10" stroke="#a855f7" stroke-width="1" opacity=".4"/>` +
        `<circle cx="64" cy="60" r="2" fill="#a855f7" opacity=".4"/>` +
        `<path d="M62 58l2-3 2 3" fill="#a855f7" opacity=".3"/>` +
        `<path d="M40 58l-6 20" stroke="#1e1b4b" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M88 58l6 20" stroke="#1e1b4b" stroke-width="3" stroke-linecap="round"/>`,
      particles: `<circle cx="16" cy="12" r="1.3" fill="#a855f7" opacity=".3"/><circle cx="108" cy="16" r="1" fill="#c084fc" opacity=".3"/><circle cx="20" cy="60" r=".8" fill="#a855f7" opacity=".2"/><circle cx="110" cy="70" r=".7" fill="#c084fc" opacity=".2"/><circle cx="64" cy="6" r="1.5" fill="#a855f7" opacity=".25"/>` },
    Druid: { outfit1: '#365314', outfit2: '#1a2e0a', accent: '#84cc16',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#365314"/><path d="M38 60l26 10 26-10" fill="#1a2e0a"/>` +
        `<path d="M58 60q6 4 12 0" stroke="#84cc16" stroke-width=".8" fill="none" opacity=".4"/>` +
        `<path d="M64 62l-3 8 3 2 3-2z" fill="#84cc16" opacity=".3"/>` +
        `<path d="M40 58l-6 20" stroke="#365314" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M88 58l6 20" stroke="#365314" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M98 44l0 28" stroke="#6b4423" stroke-width="2"/>` +
        `<circle cx="98" cy="42" r="3" fill="#84cc16" opacity=".35"/>`,
      particles: `<circle cx="16" cy="20" r="1" fill="#bef264" opacity=".25"/><circle cx="108" cy="14" r="1.2" fill="#84cc16" opacity=".3"/><circle cx="22" cy="75" r=".7" fill="#bef264" opacity=".2"/>` },
    Monk: { outfit1: '#92400e', outfit2: '#78350f', accent: '#fbbf24',
      outfit: `<rect x="40" y="60" width="48" height="40" rx="4" fill="#92400e"/><path d="M40 60l24 10 24-10" fill="#78350f"/>` +
        `<path d="M52 60l12 8 12-8" stroke="#fbbf24" stroke-width=".8" fill="none" opacity=".4"/>` +
        `<path d="M50 60l-8 16" stroke="#92400e" stroke-width="2.5" stroke-linecap="round"/>` +
        `<path d="M78 60l8 16" stroke="#92400e" stroke-width="2.5" stroke-linecap="round"/>` +
        `<circle cx="64" cy="60" r="1.5" fill="#fbbf24" opacity=".4"/>`,
      particles: `<circle cx="18" cy="16" r=".8" fill="#fef3c7" opacity=".2"/><circle cx="110" cy="20" r=".7" fill="#fbbf24" opacity=".2"/>` },
  };
}

// Main compositor: layers background + particles + face + hair + overlays + outfit into 128x100 SVG
export function buildRacePortraitSvg(race: Race, charClass: CharacterClass, appearance: Appearance = DEFAULT_APPEARANCE): string {
  const raceDefs = buildRaceDefs();
  const classDefs = buildClassDefs();
  const r = raceDefs[race];
  const c = classDefs[charClass];

  // Resolve appearance colors from palettes
  const skinPalette = SKIN_PALETTES[race][Math.min(appearance.skinTone, SKIN_PALETTES[race].length - 1)];
  const skin = skinPalette[0], skinShade = skinPalette[1];
  const hairColor = HAIR_PALETTES[race][Math.min(appearance.hairColor, HAIR_PALETTES[race].length - 1)];
  const eyeColor = EYE_PALETTES[race][Math.min(appearance.eyeColor, EYE_PALETTES[race].length - 1)];

  // Build face with customized colors — replace default colors in the face SVG
  let face = r.face
    .replace(new RegExp(r.skin, 'g'), skin)
    .replace(new RegExp(r.skinShade, 'g'), skinShade)
    .replace(new RegExp(r.eye, 'g'), eyeColor);

  // Replace default hair with custom hair style + color
  const defaultHair = r.hair;
  face = face.replace(new RegExp(`fill="${defaultHair}"`, 'g'), `fill="${hairColor}"`);
  face = face.replace(new RegExp(`stroke="${defaultHair}"`, 'g'), `stroke="${hairColor}"`);

  // Add custom hair style (replaces default, rendered over the face)
  const hairSvg = buildHairSvg(appearance.hairStyle, hairColor, r.headCy, r.headRx);

  // Add scar, face marking, facial hair overlays
  const scarSvg = buildScarSvg(appearance.scar);
  const markingSvg = buildFaceMarkingSvg(appearance.faceMarking, c.accent);
  const facialHairSvg = buildFacialHairSvg(appearance.facialHair, hairColor, r.headCy);

  // Unique gradient ID to avoid SVG collisions when multiple portraits render
  const gid = `bg-${race}-${charClass}`.replace(/[^a-zA-Z0-9-]/g, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 100">` +
    `<defs><radialGradient id="${gid}"><stop offset="0%" stop-color="${r.bg1}"/><stop offset="100%" stop-color="${r.bg2}"/></radialGradient></defs>` +
    `<rect width="128" height="100" rx="12" fill="url(#${gid})"/>` +
    c.particles +
    face +
    hairSvg +
    scarSvg +
    markingSvg +
    facialHairSvg +
    c.outfit +
    `</svg>`;
}
