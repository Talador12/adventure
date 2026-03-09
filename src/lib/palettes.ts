// Race-specific appearance palettes — skin tones, hair colors, eye colors
// Each race gets 6 skin tones (base + shade), 8 hair colors, 6 eye colors
import type { Race } from '../contexts/GameContext';

export const SKIN_PALETTES: Record<Race, string[][]> = {
  Human:      [['#d4a574','#b8895c'], ['#f5d0b0','#dab890'], ['#c68c5c','#a87040'], ['#8b6040','#6b4830'], ['#e8c0a0','#d0a888'], ['#a07050','#805838']],
  Elf:        [['#f0dcc8','#dcc4a8'], ['#e8d4c0','#d0bca0'], ['#c8b8a0','#b0a088'], ['#f5e8d8','#e0d0b8'], ['#d8c4b0','#c0ac98'], ['#b0a898','#989080']],
  Dwarf:      [['#dba67a','#c08a5e'], ['#c8905a','#a87040'], ['#e8b890','#d0a070'], ['#a07848','#886030'], ['#f0c8a0','#d8b088'], ['#907050','#785838']],
  Halfling:   [['#e8c8a0','#d4b08a'], ['#f0d8b8','#dcc0a0'], ['#d0b088','#b89870'], ['#c0a078','#a88860'], ['#f5e0c8','#e0c8b0'], ['#b89068','#a07850']],
  Gnome:      [['#f0d8c0','#dcc0a0'], ['#e8d0b8','#d0b8a0'], ['#d8c0a8','#c0a890'], ['#f5e0d0','#e0c8b8'], ['#c8b098','#b09880'], ['#f8e8d8','#e8d0c0']],
  'Half-Orc': [['#7aaa6a','#5c8c4c'], ['#6a9a58','#4c7c38'], ['#8aba7a','#6c9c5c'], ['#5a8a48','#3c6c28'], ['#9aca8a','#7cac6c'], ['#4a7a38','#2c5c18']],
  Tiefling:   [['#c06070','#a04858'], ['#d07080','#b05868'], ['#a85060','#884048'], ['#e08898','#c06878'], ['#904050','#703038'], ['#b86878','#985060']],
  Dragonborn: [['#4a8ab0','#3a7090'], ['#6aaa60','#4a8a40'], ['#c06040','#a04828'], ['#8a6ab0','#6a4a90'], ['#b08a40','#906a28'], ['#40a0a0','#208080']],
};

export const HAIR_PALETTES: Record<Race, string[]> = {
  Human:      ['#3d2b1f', '#1a1a1a', '#8b6914', '#c06030', '#e0c080', '#b0b0b0', '#4a2020', '#2a1a30'],
  Elf:        ['#c0c8d8', '#f0e8d0', '#1a1a2e', '#e0d0a0', '#90a0b0', '#d0a880', '#a0b8c8', '#f8f0e0'],
  Dwarf:      ['#8b4513', '#3d2b1f', '#c06030', '#1a1a1a', '#b08040', '#d4a060', '#602010', '#4a3020'],
  Halfling:   ['#6b4423', '#3d2b1f', '#c06830', '#8b6914', '#1a1a1a', '#b09060', '#a05020', '#d0a870'],
  Gnome:      ['#ff6b6b', '#6b6bff', '#6bff6b', '#ff6bff', '#ffaa44', '#1a1a1a', '#44ddff', '#ff44aa'],
  'Half-Orc': ['#2d2d2d', '#1a1a1a', '#4a2020', '#3d2b1f', '#505050', '#602818', '#2a2a1a', '#383838'],
  Tiefling:   ['#1a1a2e', '#4a0020', '#f0f0f0', '#2e1a1a', '#6b2040', '#c0c0c0', '#1a0a20', '#3a1a30'],
  Dragonborn: ['#2a5a7a', '#1a3a5a', '#5a2a2a', '#3a2a5a', '#5a5a2a', '#2a5a5a', '#1a1a3a', '#4a4a4a'],
};

export const EYE_PALETTES: Record<Race, string[]> = {
  Human:      ['#5a8060', '#4a6080', '#8b6914', '#3a3a3a', '#6a4080', '#2a80a0'],
  Elf:        ['#7dd3fc', '#a78bfa', '#86efac', '#fbbf24', '#f9a8d4', '#e0e0f0'],
  Dwarf:      ['#e0a040', '#8b6914', '#6a8040', '#a06030', '#4a6070', '#c08040'],
  Halfling:   ['#7cb342', '#8b6914', '#4a6080', '#a06830', '#5a8060', '#c09040'],
  Gnome:      ['#c4b5fd', '#7dd3fc', '#fbbf24', '#86efac', '#f9a8d4', '#ff6b6b'],
  'Half-Orc': ['#ef4444', '#fbbf24', '#86efac', '#b91c1c', '#e0a040', '#6a9a58'],
  Tiefling:   ['#fbbf24', '#ef4444', '#a855f7', '#f97316', '#e0e0e0', '#ff6b6b'],
  Dragonborn: ['#fbbf24', '#ef4444', '#7dd3fc', '#86efac', '#a855f7', '#f97316'],
};
