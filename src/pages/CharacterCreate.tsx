import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/toast';
import { useGame, STAT_NAMES, RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, HAIR_STYLES, SCAR_TYPES, FACE_MARKING_TYPES, FACIAL_HAIR_TYPES, DEFAULT_APPEARANCE, type Stats, type Race, type CharacterClass, type StatName, type Background, type Alignment, type Appearance, type HairStyle, type ScarType, type FaceMarkingType, type FacialHairType } from '../contexts/GameContext';

// Local interfaces for the SVG portrait builder data
interface RaceDef {
  bg1: string; bg2: string; skin: string; skinShade: string; hair: string; eye: string;
  headRx: number; headRy: number; headCy: number; face: string;
}
interface ClassDef {
  outfit1: string; outfit2: string; accent: string; outfit: string; particles: string;
}

// Random fantasy name generator — syllable tables by race flavor
const NAME_PREFIXES: Record<string, string[]> = {
  Human: ['Al', 'Bran', 'Cor', 'Dar', 'El', 'Fen', 'Gar', 'Hal', 'Ira', 'Jor', 'Kal', 'Lor', 'Mar', 'Nor', 'Os', 'Per', 'Ren', 'Sar', 'Tor', 'Val'],
  Elf: ['Ael', 'Cael', 'Eil', 'Fael', 'Gal', 'Ith', 'Lir', 'Nae', 'Quel', 'Syl', 'Thi', 'Vael', 'Aer', 'Cel', 'Nym', 'Rin', 'Zan', 'Mith', 'Ara', 'Eld'],
  Dwarf: ['Bal', 'Brom', 'Dor', 'Gim', 'Grun', 'Hjal', 'Krag', 'Mur', 'Nor', 'Rud', 'Skar', 'Thor', 'Thur', 'Ulf', 'Vor', 'Dur', 'Bor', 'Kol', 'Grim', 'Tor'],
  Halfling: ['Bil', 'Cor', 'Dil', 'Fin', 'Gar', 'Hal', 'Jas', 'Kel', 'Lav', 'Mer', 'Ned', 'Pip', 'Ros', 'Sam', 'Tob', 'Wil', 'Bam', 'Cal', 'Jol', 'Per'],
  Gnome: ['Bim', 'Cli', 'Dib', 'Fiz', 'Glib', 'Jim', 'Nim', 'Pip', 'Qui', 'Rik', 'Tik', 'Wiz', 'Zap', 'Boo', 'Cog', 'Nix', 'Tig', 'Dax', 'Flo', 'Jib'],
  'Half-Orc': ['Brak', 'Drog', 'Gash', 'Grul', 'Hak', 'Korg', 'Mog', 'Nar', 'Org', 'Rek', 'Shak', 'Thar', 'Ug', 'Vok', 'Zug', 'Gor', 'Kra', 'Rok', 'Bur', 'Grom'],
  Tiefling: ['Azar', 'Bel', 'Cri', 'Dam', 'Ekr', 'Kal', 'Lev', 'Mord', 'Ner', 'Ori', 'Raz', 'Sar', 'Val', 'Zar', 'Mal', 'Xar', 'Ven', 'Phe', 'Ira', 'Cael'],
  Dragonborn: ['Arj', 'Bala', 'Dra', 'Ghe', 'Kriv', 'Mehe', 'Nar', 'Pan', 'Rath', 'Sha', 'Tor', 'Vu', 'Bhar', 'Dorn', 'Kava', 'Rho', 'Sora', 'Taz', 'Yor', 'Zel'],
};
const NAME_SUFFIXES: Record<string, string[]> = {
  Human: ['ric', 'dan', 'wen', 'don', 'mund', 'bert', 'gar', 'win', 'ton', 'ley', 'mir', 'ius', 'an', 'ard', 'ell', 'yn', 'or', 'as', 'eth', 'in'],
  Elf: ['anor', 'iel', 'ion', 'ith', 'ael', 'wen', 'ris', 'las', 'nor', 'thil', 'dor', 'rin', 'wyn', 'alis', 'iel', 'ara', 'eni', 'oth', 'iel', 'ari'],
  Dwarf: ['in', 'im', 'ur', 'ok', 'ak', 'din', 'gar', 'rik', 'mund', 'grim', 'ren', 'bor', 'dak', 'rok', 'rim', 'dum', 'mak', 'rak', 'lin', 'dur'],
  Halfling: ['bo', 'by', 'ric', 'wen', 'kins', 'ly', 'per', 'ton', 'ber', 'ric', 'do', 'tas', 'win', 'ble', 'nie', 'ory', 'mund', 'ard', 'in', 'ell'],
  Gnome: ['ble', 'kin', 'wick', 'ber', 'nob', 'rig', 'ton', 'sprocket', 'giz', 'pop', 'wink', 'mop', 'tock', 'dle', 'nip', 'ble', 'doo', 'fiz', 'snip', 'wit'],
  'Half-Orc': ['uk', 'ash', 'gor', 'dak', 'rak', 'tuk', 'mash', 'nar', 'gul', 'rok', 'bash', 'dag', 'tar', 'ug', 'mok', 'ruk', 'og', 'nak', 'duk', 'mak'],
  Tiefling: ['ius', 'os', 'iel', 'ith', 'eon', 'ais', 'akos', 'ius', 'ra', 'nis', 'xis', 'ros', 'ael', 'ion', 'eth', 'orn', 'ius', 'ath', 'iel', 'yx'],
  Dragonborn: ['ash', 'aar', 'ax', 'esh', 'ox', 'han', 'dar', 'sar', 'jit', 'zan', 'nor', 'thas', 'gar', 'kai', 'dak', 'ros', 'mar', 'ven', 'kas', 'lor'],
};

function randomFantasyName(race: string): string {
  const prefixes = NAME_PREFIXES[race] || NAME_PREFIXES.Human;
  const suffixes = NAME_SUFFIXES[race] || NAME_SUFFIXES.Human;
  const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
  return pre + suf;
}

// Tavern-style mini portrait for race/class selection cards — renders a small SVG inline
function buildMiniPortraitDataUrl(race: Race, charClass: CharacterClass): string {
  const svg = buildRacePortraitSvg(race, charClass, DEFAULT_APPEARANCE);
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Studio Ghibli-inspired race+class portraits — composable SVG vector art, no external deps
// Race defines: head shape, skin tones, hair colors, eye colors, racial features
// Class defines: outfit/armor, weapon/accessory, magical effects
// Appearance customization: skin tone, hair color/style, eye color, scars, tattoos, facial hair
// All driven by the Appearance state — every picker change updates the portrait in real-time

// Race-specific palettes — each race gets 6 skin tones, 8 hair colors, 6 eye colors
const SKIN_PALETTES: Record<Race, string[][]> = {
  Human:      [['#d4a574','#b8895c'], ['#f5d0b0','#dab890'], ['#c68c5c','#a87040'], ['#8b6040','#6b4830'], ['#e8c0a0','#d0a888'], ['#a07050','#805838']],
  Elf:        [['#f0dcc8','#dcc4a8'], ['#e8d4c0','#d0bca0'], ['#c8b8a0','#b0a088'], ['#f5e8d8','#e0d0b8'], ['#d8c4b0','#c0ac98'], ['#b0a898','#989080']],
  Dwarf:      [['#dba67a','#c08a5e'], ['#c8905a','#a87040'], ['#e8b890','#d0a070'], ['#a07848','#886030'], ['#f0c8a0','#d8b088'], ['#907050','#785838']],
  Halfling:   [['#e8c8a0','#d4b08a'], ['#f0d8b8','#dcc0a0'], ['#d0b088','#b89870'], ['#c0a078','#a88860'], ['#f5e0c8','#e0c8b0'], ['#b89068','#a07850']],
  Gnome:      [['#f0d8c0','#dcc0a0'], ['#e8d0b8','#d0b8a0'], ['#d8c0a8','#c0a890'], ['#f5e0d0','#e0c8b8'], ['#c8b098','#b09880'], ['#f8e8d8','#e8d0c0']],
  'Half-Orc': [['#7aaa6a','#5c8c4c'], ['#6a9a58','#4c7c38'], ['#8aba7a','#6c9c5c'], ['#5a8a48','#3c6c28'], ['#9aca8a','#7cac6c'], ['#4a7a38','#2c5c18']],
  Tiefling:   [['#c06070','#a04858'], ['#d07080','#b05868'], ['#a85060','#884048'], ['#e08898','#c06878'], ['#904050','#703038'], ['#b86878','#985060']],
  Dragonborn: [['#4a8ab0','#3a7090'], ['#6aaa60','#4a8a40'], ['#c06040','#a04828'], ['#8a6ab0','#6a4a90'], ['#b08a40','#906a28'], ['#40a0a0','#208080']],
};

const HAIR_PALETTES: Record<Race, string[]> = {
  Human:      ['#3d2b1f', '#1a1a1a', '#8b6914', '#c06030', '#e0c080', '#b0b0b0', '#4a2020', '#2a1a30'],
  Elf:        ['#c0c8d8', '#f0e8d0', '#1a1a2e', '#e0d0a0', '#90a0b0', '#d0a880', '#a0b8c8', '#f8f0e0'],
  Dwarf:      ['#8b4513', '#3d2b1f', '#c06030', '#1a1a1a', '#b08040', '#d4a060', '#602010', '#4a3020'],
  Halfling:   ['#6b4423', '#3d2b1f', '#c06830', '#8b6914', '#1a1a1a', '#b09060', '#a05020', '#d0a870'],
  Gnome:      ['#ff6b6b', '#6b6bff', '#6bff6b', '#ff6bff', '#ffaa44', '#1a1a1a', '#44ddff', '#ff44aa'],
  'Half-Orc': ['#2d2d2d', '#1a1a1a', '#4a2020', '#3d2b1f', '#505050', '#602818', '#2a2a1a', '#383838'],
  Tiefling:   ['#1a1a2e', '#4a0020', '#f0f0f0', '#2e1a1a', '#6b2040', '#c0c0c0', '#1a0a20', '#3a1a30'],
  Dragonborn: ['#2a5a7a', '#1a3a5a', '#5a2a2a', '#3a2a5a', '#5a5a2a', '#2a5a5a', '#1a1a3a', '#4a4a4a'],
};

const EYE_PALETTES: Record<Race, string[]> = {
  Human:      ['#5a8060', '#4a6080', '#8b6914', '#3a3a3a', '#6a4080', '#2a80a0'],
  Elf:        ['#7dd3fc', '#a78bfa', '#86efac', '#fbbf24', '#f9a8d4', '#e0e0f0'],
  Dwarf:      ['#e0a040', '#8b6914', '#6a8040', '#a06030', '#4a6070', '#c08040'],
  Halfling:   ['#7cb342', '#8b6914', '#4a6080', '#a06830', '#5a8060', '#c09040'],
  Gnome:      ['#c4b5fd', '#7dd3fc', '#fbbf24', '#86efac', '#f9a8d4', '#ff6b6b'],
  'Half-Orc': ['#ef4444', '#fbbf24', '#86efac', '#b91c1c', '#e0a040', '#6a9a58'],
  Tiefling:   ['#fbbf24', '#ef4444', '#a855f7', '#f97316', '#e0e0e0', '#ff6b6b'],
  Dragonborn: ['#fbbf24', '#ef4444', '#7dd3fc', '#86efac', '#a855f7', '#f97316'],
};

// Background flavor text for the creation screen
const BACKGROUND_INFO: Record<Background, { skills: string; feature: string; flavor: string }> = {
  Acolyte:        { skills: 'Insight, Religion', feature: 'Shelter of the Faithful', flavor: 'You spent your life in service to a temple.' },
  Charlatan:      { skills: 'Deception, Sleight of Hand', feature: 'False Identity', flavor: 'You have always had a way with people.' },
  Criminal:       { skills: 'Deception, Stealth', feature: 'Criminal Contact', flavor: 'You have a reliable contact in the criminal underworld.' },
  Entertainer:    { skills: 'Acrobatics, Performance', feature: 'By Popular Demand', flavor: 'You thrive in front of an audience.' },
  'Folk Hero':    { skills: 'Animal Handling, Survival', feature: 'Rustic Hospitality', flavor: 'You came from humble beginnings.' },
  'Guild Artisan': { skills: 'Insight, Persuasion', feature: 'Guild Membership', flavor: 'You are a member of an artisan guild.' },
  Hermit:         { skills: 'Medicine, Religion', feature: 'Discovery', flavor: 'You lived in seclusion for an extended period.' },
  Noble:          { skills: 'History, Persuasion', feature: 'Position of Privilege', flavor: 'You were born into wealth and power.' },
  Outlander:      { skills: 'Athletics, Survival', feature: 'Wanderer', flavor: 'You grew up in the wilds, far from civilization.' },
  Sage:           { skills: 'Arcana, History', feature: 'Researcher', flavor: 'You spent years learning the lore of the multiverse.' },
  Sailor:         { skills: 'Athletics, Perception', feature: 'Ship\'s Passage', flavor: 'You sailed on a seagoing vessel for years.' },
  Soldier:        { skills: 'Athletics, Intimidation', feature: 'Military Rank', flavor: 'War has been your life for as long as you remember.' },
  Urchin:         { skills: 'Sleight of Hand, Stealth', feature: 'City Secrets', flavor: 'You grew up on the streets alone.' },
};

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
        `<rect x="30" y="62" width="6" height="20" rx="2" fill="#78716c"/>` + // left pauldron
        `<rect x="92" y="62" width="6" height="20" rx="2" fill="#78716c"/>` + // right pauldron
        `<path d="M26 58l-4 22 3 1 4-20z" fill="#94a3b8" opacity=".7"/>` + // sword hilt left
        `<path d="M22 80l-2-28" stroke="#b0b8c4" stroke-width="1.5"/>`, // blade
      particles: `<circle cx="20" cy="15" r="1" fill="#e2e8f0" opacity=".3"/><circle cx="108" cy="20" r=".8" fill="#e2e8f0" opacity=".25"/>` },
    Wizard: { outfit1: '#3b2e8a', outfit2: '#2a1e6a', accent: '#a78bfa',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#3b2e8a"/><path d="M38 60l26 10 26-10" fill="#2a1e6a"/>` +
        `<path d="M64 60v14" stroke="#a78bfa" stroke-width="1" opacity=".6"/>` +
        `<circle cx="64" cy="60" r="2.5" fill="#a78bfa" opacity=".5"/>` + // collar gem
        `<path d="M42 58l-6 16-4 0 2-18z" fill="#3b2e8a"/>` + // left robe drape
        `<path d="M86 58l6 16 4 0-2-18z" fill="#3b2e8a"/>` + // right robe drape
        `<path d="M96 50l0-24 2-6-5 4 3 26z" fill="#6b5420" opacity=".6"/>` + // staff
        `<circle cx="98" cy="20" r="3" fill="#a78bfa" opacity=".5"/>` + // staff orb
        `<circle cx="98" cy="20" r="1.5" fill="#ddd6fe" opacity=".7"/>`, // orb glow
      particles: `<circle cx="14" cy="12" r="1.2" fill="#c4b5fd" opacity=".4"/><circle cx="100" cy="10" r="1" fill="#ddd6fe" opacity=".35"/><circle cx="24" cy="80" r=".8" fill="#a78bfa" opacity=".25"/><circle cx="110" cy="40" r=".7" fill="#c4b5fd" opacity=".3"/>` },
    Rogue: { outfit1: '#374151', outfit2: '#1f2937', accent: '#6ee7b7',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="4" fill="#374151"/><path d="M38 60l26 10 26-10" fill="#1f2937"/>` +
        `<path d="M54 60q10 6 20 0" stroke="#6ee7b7" stroke-width=".6" fill="none" opacity=".4"/>` +
        `<path d="M44 58l-4 8 2 2 4-8z" fill="#4b5563"/>` + // left shoulder guard
        `<path d="M84 58l4 8-2 2-4-8z" fill="#4b5563"/>` + // right shoulder guard
        `<path d="M96 56l2 20" stroke="#9ca3af" stroke-width="1"/>` + // dagger blade
        `<path d="M95.5 54l1-3 1.5 0 .5 4z" fill="#6b7280"/>` + // dagger hilt
        `<path d="M58 60l6-2 6 2" stroke="#374151" stroke-width="1.5" fill="none"/>`, // hood V
      particles: `<circle cx="18" cy="25" r=".7" fill="#6ee7b7" opacity=".2"/><circle cx="112" cy="50" r=".6" fill="#6ee7b7" opacity=".15"/>` },
    Cleric: { outfit1: '#f5f0e0', outfit2: '#d4c8a8', accent: '#fbbf24',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#f5f0e0"/><path d="M38 60l26 10 26-10" fill="#d4c8a8"/>` +
        `<rect x="62" y="62" width="4" height="12" rx="1" fill="#fbbf24" opacity=".6"/>` + // cross vertical
        `<rect x="59" y="66" width="10" height="3" rx="1" fill="#fbbf24" opacity=".6"/>` + // cross horizontal
        `<path d="M34 60l-2 14 4 2 2-14z" fill="#d4c8a8"/>` + // left shoulder
        `<circle cx="64" cy="60" r="2" fill="#fbbf24" opacity=".5"/>`, // collar medallion
      particles: `<circle cx="20" cy="14" r="1.5" fill="#fef3c7" opacity=".35"/><circle cx="108" cy="18" r="1.2" fill="#fde68a" opacity=".3"/><circle cx="14" cy="50" r="1" fill="#fef3c7" opacity=".2"/><circle cx="114" cy="60" r=".8" fill="#fde68a" opacity=".2"/>` },
    Ranger: { outfit1: '#2d5a2d', outfit2: '#1a3a1a', accent: '#86efac',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="4" fill="#2d5a2d"/><path d="M38 60l26 10 26-10" fill="#1a3a1a"/>` +
        `<path d="M42 58l-6 20" stroke="#4a7a4a" stroke-width="3" stroke-linecap="round"/>` + // left cloak edge
        `<path d="M86 58l6 20" stroke="#4a7a4a" stroke-width="3" stroke-linecap="round"/>` + // right cloak edge
        `<path d="M56 58l8 4 8-4" stroke="#86efac" stroke-width=".6" fill="none" opacity=".4"/>` + // collar V
        `<path d="M98 42l-2 30" stroke="#8b6914" stroke-width="1.5"/>` + // bow stave
        `<path d="M96 42q-4 14 0 30" stroke="#8b6914" stroke-width=".8" fill="none"/>`, // bow curve
      particles: `<circle cx="16" cy="18" r=".8" fill="#86efac" opacity=".2"/><circle cx="110" cy="14" r=".6" fill="#bbf7d0" opacity=".2"/>` },
    Paladin: { outfit1: '#c0a050', outfit2: '#9a7a30', accent: '#fef3c7',
      outfit: `<rect x="34" y="60" width="60" height="40" rx="5" fill="#c0a050"/><path d="M34 60l30 10 30-10" fill="#9a7a30"/>` +
        `<path d="M64 60v10" stroke="#fef3c7" stroke-width="1.5" opacity=".5"/>` +
        `<rect x="28" y="60" width="7" height="22" rx="3" fill="#b8960a"/>` + // left pauldron
        `<rect x="93" y="60" width="7" height="22" rx="3" fill="#b8960a"/>` + // right pauldron
        `<path d="M24 54l-3 24 2 1 4-22z" fill="#d4c0a0"/>` + // sword
        `<circle cx="64" cy="60" r="3" fill="#fbbf24" opacity=".4"/>` + // chest emblem
        `<path d="M62 58l2-2 2 2" stroke="#fef3c7" stroke-width=".8" fill="none"/>`, // emblem detail
      particles: `<circle cx="18" cy="12" r="1.3" fill="#fef3c7" opacity=".3"/><circle cx="106" cy="16" r="1" fill="#fde68a" opacity=".3"/><circle cx="12" cy="60" r=".8" fill="#fef3c7" opacity=".2"/>` },
    Barbarian: { outfit1: '#7c5030', outfit2: '#5a3820', accent: '#ef4444',
      outfit: `<rect x="32" y="60" width="64" height="40" rx="5" fill="#7c5030"/><path d="M32 60l32 10 32-10" fill="#5a3820"/>` +
        `<path d="M52 58l12 6 12-6" stroke="#ef4444" stroke-width=".8" fill="none" opacity=".5"/>` + // war paint V
        `<rect x="26" y="58" width="8" height="24" rx="3" fill="#5a3820"/>` + // left fur pauldron
        `<rect x="94" y="58" width="8" height="24" rx="3" fill="#5a3820"/>` + // right fur pauldron
        `<path d="M26 62l-2 2M28 66l-3 2M26 70l-2 3" stroke="#7c5030" stroke-width=".8"/>` + // fur texture
        `<path d="M22 48l-6 28 3 2 8-26z" fill="#9ca3af"/>` + // greataxe handle
        `<path d="M16 48l-4 4 6 0z" fill="#b0b8c4"/>`, // axe head
      particles: `<circle cx="18" cy="20" r="1" fill="#fca5a5" opacity=".25"/><circle cx="110" cy="24" r=".8" fill="#ef4444" opacity=".2"/>` },
    Bard: { outfit1: '#7c3aed', outfit2: '#5b21b6', accent: '#f9a8d4',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#7c3aed"/><path d="M38 60l26 10 26-10" fill="#5b21b6"/>` +
        `<path d="M54 60q10 8 20 0" stroke="#f9a8d4" stroke-width=".8" fill="none" opacity=".5"/>` + // decorative neckline
        `<path d="M42 58l-4 14" stroke="#7c3aed" stroke-width="3" stroke-linecap="round"/>` + // cape drape left
        `<path d="M86 58l4 14" stroke="#7c3aed" stroke-width="3" stroke-linecap="round"/>` + // cape drape right
        `<ellipse cx="100" cy="64" rx="5" ry="8" fill="#8b6914" opacity=".6"/>` + // lute body
        `<path d="M100 56v-12" stroke="#8b6914" stroke-width="1.2"/>` + // lute neck
        `<circle cx="100" cy="64" r="1.5" fill="#1a1a1a" opacity=".3"/>`, // sound hole
      particles: `<circle cx="16" cy="16" r="1" fill="#f9a8d4" opacity=".3"/><circle cx="108" cy="12" r="1.2" fill="#e9d5ff" opacity=".35"/><circle cx="22" cy="70" r=".7" fill="#f9a8d4" opacity=".2"/><circle cx="106" cy="80" r=".6" fill="#c4b5fd" opacity=".2"/>` },
    Sorcerer: { outfit1: '#991b1b', outfit2: '#7f1d1d', accent: '#fb923c',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#991b1b"/><path d="M38 60l26 10 26-10" fill="#7f1d1d"/>` +
        `<path d="M64 60v12" stroke="#fb923c" stroke-width="1" opacity=".5"/>` +
        `<circle cx="64" cy="60" r="2.5" fill="#fb923c" opacity=".5"/>` + // chest gem
        `<path d="M40 58l-6 18 3 2 5-16z" fill="#991b1b"/>` + // robe drape left
        `<path d="M88 58l6 18-3 2-5-16z" fill="#991b1b"/>`, // robe drape right
      particles: `<circle cx="14" cy="14" r="1.5" fill="#fb923c" opacity=".35"/><circle cx="110" cy="18" r="1.2" fill="#fdba74" opacity=".3"/><circle cx="20" cy="45" r="1" fill="#fca5a5" opacity=".25"/><circle cx="106" cy="50" r=".8" fill="#fb923c" opacity=".2"/><circle cx="64" cy="8" r="1" fill="#fdba74" opacity=".3"/>` },
    Warlock: { outfit1: '#1e1b4b', outfit2: '#0f0a2e', accent: '#a855f7',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#1e1b4b"/><path d="M38 60l26 10 26-10" fill="#0f0a2e"/>` +
        `<path d="M64 62v10" stroke="#a855f7" stroke-width="1" opacity=".4"/>` +
        `<circle cx="64" cy="60" r="2" fill="#a855f7" opacity=".4"/>` + // pact symbol
        `<path d="M62 58l2-3 2 3" fill="#a855f7" opacity=".3"/>` + // collar sigil
        `<path d="M40 58l-6 20" stroke="#1e1b4b" stroke-width="3" stroke-linecap="round"/>` + // cloak edge
        `<path d="M88 58l6 20" stroke="#1e1b4b" stroke-width="3" stroke-linecap="round"/>`, // cloak edge
      particles: `<circle cx="16" cy="12" r="1.3" fill="#a855f7" opacity=".3"/><circle cx="108" cy="16" r="1" fill="#c084fc" opacity=".3"/><circle cx="20" cy="60" r=".8" fill="#a855f7" opacity=".2"/><circle cx="110" cy="70" r=".7" fill="#c084fc" opacity=".2"/><circle cx="64" cy="6" r="1.5" fill="#a855f7" opacity=".25"/>` },
    Druid: { outfit1: '#365314', outfit2: '#1a2e0a', accent: '#84cc16',
      outfit: `<rect x="38" y="60" width="52" height="40" rx="5" fill="#365314"/><path d="M38 60l26 10 26-10" fill="#1a2e0a"/>` +
        `<path d="M58 60q6 4 12 0" stroke="#84cc16" stroke-width=".8" fill="none" opacity=".4"/>` + // leaf collar
        `<path d="M64 62l-3 8 3 2 3-2z" fill="#84cc16" opacity=".3"/>` + // leaf pendant
        `<path d="M40 58l-6 20" stroke="#365314" stroke-width="3" stroke-linecap="round"/>` + // robe drape
        `<path d="M88 58l6 20" stroke="#365314" stroke-width="3" stroke-linecap="round"/>` + // robe drape
        `<path d="M98 44l0 28" stroke="#6b4423" stroke-width="2"/>` + // wooden staff
        `<circle cx="98" cy="42" r="3" fill="#84cc16" opacity=".35"/>`, // staff leaf orb
      particles: `<circle cx="16" cy="20" r="1" fill="#bef264" opacity=".25"/><circle cx="108" cy="14" r="1.2" fill="#84cc16" opacity=".3"/><circle cx="22" cy="75" r=".7" fill="#bef264" opacity=".2"/>` },
    Monk: { outfit1: '#92400e', outfit2: '#78350f', accent: '#fbbf24',
      outfit: `<rect x="40" y="60" width="48" height="40" rx="4" fill="#92400e"/><path d="M40 60l24 10 24-10" fill="#78350f"/>` +
        `<path d="M52 60l12 8 12-8" stroke="#fbbf24" stroke-width=".8" fill="none" opacity=".4"/>` + // robe wrap
        `<path d="M50 60l-8 16" stroke="#92400e" stroke-width="2.5" stroke-linecap="round"/>` + // left wrap
        `<path d="M78 60l8 16" stroke="#92400e" stroke-width="2.5" stroke-linecap="round"/>` + // right wrap
        `<circle cx="64" cy="60" r="1.5" fill="#fbbf24" opacity=".4"/>`, // sash knot
      particles: `<circle cx="18" cy="16" r=".8" fill="#fef3c7" opacity=".2"/><circle cx="110" cy="20" r=".7" fill="#fbbf24" opacity=".2"/>` },
  };
}

function buildRacePortraitSvg(race: Race, charClass: CharacterClass, appearance: Appearance = DEFAULT_APPEARANCE): string {
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
  // Strip the original hair paths (they contain the default hair color)
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
    c.particles +    // atmosphere behind character
    face +           // race head, eyes, features (with custom skin/eye colors)
    hairSvg +        // custom hair style + color
    scarSvg +        // scar overlay
    markingSvg +     // face markings (war paint / runes / tattoo)
    facialHairSvg +  // facial hair
    c.outfit +       // class outfit, weapon, accessories
    `</svg>`;
}

// 4d6 drop lowest — the classic D&D stat generation method
function roll4d6DropLowest(): { rolls: number[]; dropped: number; total: number } {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  const dropped = rolls[0];
  const kept = rolls.slice(1);
  return { rolls, dropped, total: kept.reduce((a, b) => a + b, 0) };
}

function statModifier(value: number): string {
  const mod = Math.floor((value - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// Base HP by class (d10 for martial, d8 for hybrid, d6 for casters)
const CLASS_HIT_DIE: Record<CharacterClass, number> = {
  Fighter: 10,
  Barbarian: 12,
  Paladin: 10,
  Ranger: 10,
  Rogue: 8,
  Monk: 8,
  Cleric: 8,
  Bard: 8,
  Druid: 8,
  Warlock: 8,
  Wizard: 6,
  Sorcerer: 6,
};

// Race stat bonuses (simplified — main stat +2)
const RACE_BONUSES: Record<Race, Partial<Stats>> = {
  Human: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
  Elf: { DEX: 2 },
  Dwarf: { CON: 2 },
  Halfling: { DEX: 2 },
  Gnome: { INT: 2 },
  'Half-Orc': { STR: 2 },
  Tiefling: { CHA: 2 },
  Dragonborn: { STR: 2 },
};

interface StatRoll {
  rolls: number[];
  dropped: number;
  total: number;
  animating: boolean;
}

export default function CharacterCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addCharacter, currentPlayer } = useGame();

  const [name, setName] = useState('');
  const [race, setRace] = useState<Race>('Human');
  const [charClass, setCharClass] = useState<CharacterClass>('Fighter');
  const [background, setBackground] = useState<Background>('Folk Hero');
  const [alignment, setAlignment] = useState<Alignment>('True Neutral');
  const [appearance, setAppearance] = useState<Appearance>({ ...DEFAULT_APPEARANCE });
  const [personalityTraits, setPersonalityTraits] = useState('');
  const [ideals, setIdeals] = useState('');
  const [bonds, setBonds] = useState('');
  const [flaws, setFlaws] = useState('');
  const [statRolls, setStatRolls] = useState<Record<StatName, StatRoll | null>>(
    Object.fromEntries(STAT_NAMES.map((s) => [s, null])) as Record<StatName, StatRoll | null>
  );
  const [rollingAll, setRollingAll] = useState(false);
  const [portrait, setPortrait] = useState<string | null>(null); // data URL from AI or null for default
  const [generatingPortrait, setGeneratingPortrait] = useState(false);
  const [uploadingPortrait, setUploadingPortrait] = useState(false);
  const [portraitSource, setPortraitSource] = useState<'ai' | 'upload' | null>(null); // track where portrait came from

  // Name translation state
  const [translating, setTranslating] = useState(false);
  const [translation, setTranslation] = useState<{ translated: string; language: string; flag: string; original: string } | null>(null);

  // Stat swap state — click one stat, then another, to swap their rolled values
  const [swapSource, setSwapSource] = useState<StatName | null>(null);

  // Appearance updater helper
  const updateAppearance = useCallback(<K extends keyof Appearance>(key: K, value: Appearance[K]) => {
    setAppearance(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleRandomName = useCallback(() => {
    const generated = randomFantasyName(race);
    setName(generated);
    setTranslation(null); // clear any previous translation
  }, [race]);

  const handleTranslateName = useCallback(async () => {
    const currentName = name.trim();
    if (!currentName) {
      toast('Enter a name first!', 'warning');
      return;
    }
    setTranslating(true);
    try {
      const res = await fetch('/api/name/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentName }),
      });
      const data = await res.json() as { translated?: string; language?: string; flag?: string; original?: string; error?: string };
      if (data.translated) {
        setName(data.translated);
        setTranslation({ translated: data.translated, language: data.language!, flag: data.flag!, original: data.original! });
        toast(`${data.flag} ${data.original} → ${data.translated} (${data.language})`, 'success');
      } else {
        toast(data.error || 'Translation failed', 'warning');
      }
    } catch {
      toast('Translation failed — server may be unavailable', 'warning');
    } finally {
      setTranslating(false);
    }
  }, [name, toast]);

  // Stat swap: click a rolled stat to select it, click another to swap
  const handleStatClick = useCallback((stat: StatName) => {
    const anyAnimating = STAT_NAMES.some((s) => statRolls[s]?.animating);
    if (anyAnimating || rollingAll) return;
    // Only allow swap if this stat has been rolled
    if (!statRolls[stat]) return;

    if (!swapSource) {
      setSwapSource(stat);
      return;
    }
    if (swapSource === stat) {
      setSwapSource(null); // deselect
      return;
    }
    // Swap the two rolls
    setStatRolls((prev) => ({
      ...prev,
      [swapSource]: prev[stat],
      [stat]: prev[swapSource],
    }));
    setSwapSource(null);
    toast(`Swapped ${swapSource} and ${stat}`, 'success');
  }, [swapSource, statRolls, rollingAll, toast]);

  // Build the default SVG portrait as a data URL ��� original copyrightless vector art
  // Reacts to both race AND class for class-specific outfits/weapons
  const defaultPortraitSvg = useMemo(() => {
    const svg = buildRacePortraitSvg(race, charClass, appearance);
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }, [race, charClass, appearance]);

  const generatePortrait = useCallback(async () => {
    const stats = getFinalStats();
    setGeneratingPortrait(true);
    try {
      const res = await fetch('/api/portrait/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Adventurer',
          race,
          class: charClass,
          level: 1,
          stats: stats || {},
        }),
      });
      const data = await res.json() as { portrait?: string; error?: string };
      if (data.portrait) {
        setPortrait(data.portrait);
        setPortraitSource('ai');
        toast('Portrait generated!', 'success');
      } else {
        toast(data.error || 'Failed to generate portrait', 'warning');
      }
    } catch {
      toast('Portrait generation failed — server may be unavailable', 'warning');
    } finally {
      setGeneratingPortrait(false);
    }
  }, [name, race, charClass, toast]);

  // Upload a custom portrait — read file, send to server for encrypted KV storage
  const handleUploadPortrait = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast('Please select an image file', 'warning');
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      toast('Image too large (max 1.5MB)', 'warning');
      return;
    }

    setUploadingPortrait(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      try {
        const res = await fetch('/api/portrait/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: dataUrl }),
        });
        const data = await res.json() as { portraitId?: string; url?: string; error?: string };
        if (data.portraitId) {
          setPortrait(dataUrl); // use the data URL directly for instant preview
          setPortraitSource('upload');
          toast('Portrait uploaded and encrypted!', 'success');
        } else {
          // Fallback: use locally if server storage fails (e.g. no KV in dev)
          setPortrait(dataUrl);
          setPortraitSource('upload');
          toast('Portrait set locally (server storage unavailable)', 'info');
        }
      } catch {
        // Still use locally even if server fails
        setPortrait(dataUrl);
        setPortraitSource('upload');
        toast('Portrait set locally (server unavailable)', 'info');
      } finally {
        setUploadingPortrait(false);
      }
    };
    reader.onerror = () => {
      toast('Failed to read image file', 'warning');
      setUploadingPortrait(false);
    };
    reader.readAsDataURL(file);
    // Reset the input so the same file can be re-selected
    e.target.value = '';
  }, [toast]);

  const rollStat = useCallback((stat: StatName) => {
    // Start animation
    setStatRolls((prev) => ({ ...prev, [stat]: { rolls: [0, 0, 0, 0], dropped: 0, total: 0, animating: true } }));

    // Cycle random numbers for visual effect
    let ticks = 0;
    const interval = setInterval(() => {
      setStatRolls((prev) => ({
        ...prev,
        [stat]: {
          rolls: Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1),
          dropped: 0,
          total: 0,
          animating: true,
        },
      }));
      ticks++;
      if (ticks >= 8) {
        clearInterval(interval);
        const result = roll4d6DropLowest();
        setStatRolls((prev) => ({ ...prev, [stat]: { ...result, animating: false } }));
      }
    }, 80);
  }, []);

  const rollAllStats = useCallback(() => {
    setRollingAll(true);
    // Roll each stat with a stagger
    STAT_NAMES.forEach((stat, i) => {
      setTimeout(() => {
        rollStat(stat);
        if (i === STAT_NAMES.length - 1) {
          setTimeout(() => setRollingAll(false), 800);
        }
      }, i * 200);
    });
  }, [rollStat]);

  // Compute final stats with race bonuses
  const getFinalStats = (): Stats | null => {
    const hasAll = STAT_NAMES.every((s) => statRolls[s] && !statRolls[s]!.animating);
    if (!hasAll) return null;
    const bonuses = RACE_BONUSES[race];
    return Object.fromEntries(
      STAT_NAMES.map((s) => [s, statRolls[s]!.total + (bonuses[s] || 0)])
    ) as Stats;
  };

  const finalStats = getFinalStats();

  const handleCreate = () => {
    if (!name.trim()) {
      toast('Give your character a name!', 'warning');
      return;
    }
    if (!finalStats) {
      toast('Roll all stats first!', 'warning');
      return;
    }

    const hitDie = CLASS_HIT_DIE[charClass];
    const conMod = Math.floor((finalStats.CON - 10) / 2);
    const maxHp = hitDie + conMod; // Level 1 HP = max hit die + CON mod

    const character = {
      id: crypto.randomUUID(),
      name: name.trim(),
      race,
      class: charClass,
      level: 1,
      xp: 0,
      stats: finalStats,
      hp: maxHp,
      maxHp,
      ac: 10 + Math.floor((finalStats.DEX - 10) / 2), // base AC = 10 + DEX mod
      deathSaves: { successes: 0, failures: 0 },
      condition: 'normal' as const,
      portrait: portrait || undefined, // AI-generated portrait or undefined for default
      appearance,
      background,
      alignment,
      personalityTraits,
      ideals,
      bonds,
      flaws,
      playerId: currentPlayer.id,
      gold: 15, // starting gold
      createdAt: Date.now(),
    };

    addCharacter(character);
    toast(`${character.name} the ${race} ${charClass} is ready!`, 'success');
    navigate('/');
  };

  // Memoize mini portraits for race cards (one per race, using Fighter as default class)
  const raceMiniPortraits = useMemo(() => {
    return Object.fromEntries(RACES.map((r) => [r, buildMiniPortraitDataUrl(r, 'Fighter')])) as Record<Race, string>;
  }, []);

  // Memoize mini portraits for class cards (one per class, using current race)
  const classMiniPortraits = useMemo(() => {
    return Object.fromEntries(CLASSES.map((c) => [c, buildMiniPortraitDataUrl(race, c)])) as Record<CharacterClass, string>;
  }, [race]);

  return (
    <div className="min-h-screen text-slate-100" style={{
      background: 'linear-gradient(180deg, #2a1f14 0%, #1e160e 40%, #14100a 100%)',
    }}>
      {/* Tavern wood grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(139,90,43,0.3) 40px, rgba(139,90,43,0.3) 41px)`,
      }} />

      {/* Header — warm tones */}
      <header className="relative bg-[#1e160e]/90 border-b border-amber-900/30 px-6 py-3 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-amber-700 hover:text-amber-400">
            &larr; Home
          </Button>
          <h1 className="text-lg font-bold text-[#F38020]">Create Character</h1>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto p-6 space-y-8">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setTranslation(null); }}
              placeholder="Enter character name..."
              className="flex-1 px-4 py-3 bg-[#1e160e] border border-amber-900/30 rounded-xl text-lg text-amber-100 placeholder-amber-900/40 focus:ring-2 focus:ring-[#F38020] focus:border-[#F38020] outline-none transition-all"
              maxLength={30}
            />
            <button
              onClick={handleRandomName}
              title="Random fantasy name"
              className="px-3 py-3 bg-[#2a1f14] hover:bg-[#382a1c] border border-amber-900/30 rounded-xl text-amber-700 hover:text-[#F38020] transition-all shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <circle cx="8" cy="8" r="1.5" fill="currentColor" /><circle cx="16" cy="8" r="1.5" fill="currentColor" />
                <circle cx="8" cy="16" r="1.5" fill="currentColor" /><circle cx="16" cy="16" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </button>
            <button
              onClick={handleTranslateName}
              disabled={translating || !name.trim()}
              title="Translate name to a random language"
              className="px-3 py-3 bg-[#2a1f14] hover:bg-[#382a1c] border border-amber-900/30 rounded-xl text-amber-700 hover:text-sky-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
            >
              {translating ? (
                <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              )}
            </button>
          </div>
          {/* Translation badge */}
          {translation && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs">
              <span className="text-lg leading-none">{translation.flag}</span>
              <span className="text-sky-400 font-medium">{translation.language}</span>
              <span className="text-amber-700">from "{translation.original}"</span>
              <button
                onClick={() => { setName(translation.original); setTranslation(null); }}
                className="ml-auto text-amber-700 hover:text-amber-400 transition-colors"
                title="Revert to original name"
              >
                undo
              </button>
            </div>
          )}
        </div>

        {/* Race + Class side by side — tavern card grid */}
        <div className="grid grid-cols-[1fr_1fr] gap-8">
          {/* Race */}
          <div className="space-y-3">
            <h2 className="text-xl font-black uppercase tracking-wider text-amber-200/80" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>Race</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {RACES.map((r) => {
                const bonus = RACE_BONUSES[r];
                const bonusStr = Object.entries(bonus)
                  .map(([k, v]) => `${k} +${v}`)
                  .join(', ');
                const isSelected = race === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRace(r)}
                    className={`group relative flex items-center gap-2 rounded-xl text-left transition-all border overflow-hidden ${
                      isSelected
                        ? 'border-[#F38020] bg-amber-900/40 shadow-lg shadow-amber-900/20 ring-1 ring-[#F38020]/40'
                        : 'border-amber-900/25 bg-[#2a1f14]/80 hover:border-amber-800/50 hover:bg-[#322418]/80'
                    }`}
                    style={{ minHeight: '64px' }}
                  >
                    {/* Text */}
                    <div className="flex-1 pl-3 py-2 min-w-0">
                      <div className={`text-sm font-bold leading-tight ${isSelected ? 'text-[#F38020]' : 'text-amber-100/90'}`}>{r}</div>
                      <div className={`text-[10px] mt-0.5 leading-tight ${isSelected ? 'text-amber-400/70' : 'text-amber-600/60'}`}>{bonusStr}</div>
                    </div>
                    {/* Portrait */}
                    <div className="w-14 h-full shrink-0 relative">
                      <img
                        src={raceMiniPortraits[r]}
                        alt={r}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        style={{ borderRadius: '0 0.65rem 0.65rem 0' }}
                      />
                      {/* Fade edge into card bg */}
                      <div className="absolute inset-0" style={{
                        background: `linear-gradient(90deg, ${isSelected ? 'rgba(42,31,20,0.85)' : 'rgba(42,31,20,0.7)'} 0%, transparent 50%)`,
                        borderRadius: '0 0.65rem 0.65rem 0',
                      }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Class */}
          <div className="space-y-3">
            <h2 className="text-xl font-black uppercase tracking-wider text-amber-200/80" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>Class</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {CLASSES.map((c) => {
                const isSelected = charClass === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCharClass(c)}
                    className={`group relative flex items-center gap-2 rounded-xl text-left transition-all border overflow-hidden ${
                      isSelected
                        ? 'border-[#F38020] bg-amber-900/40 shadow-lg shadow-amber-900/20 ring-1 ring-[#F38020]/40'
                        : 'border-amber-900/25 bg-[#2a1f14]/80 hover:border-amber-800/50 hover:bg-[#322418]/80'
                    }`}
                    style={{ minHeight: '64px' }}
                  >
                    {/* Text */}
                    <div className="flex-1 pl-3 py-2 min-w-0">
                      <div className={`text-sm font-bold leading-tight ${isSelected ? 'text-[#F38020]' : 'text-amber-100/90'}`}>{c}</div>
                      <div className={`text-[10px] mt-0.5 leading-tight ${isSelected ? 'text-amber-400/70' : 'text-amber-600/60'}`}>d{CLASS_HIT_DIE[c]} HP</div>
                    </div>
                    {/* Portrait */}
                    <div className="w-14 h-full shrink-0 relative">
                      <img
                        src={classMiniPortraits[c]}
                        alt={c}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        style={{ borderRadius: '0 0.65rem 0.65rem 0' }}
                      />
                      <div className="absolute inset-0" style={{
                        background: `linear-gradient(90deg, ${isSelected ? 'rgba(42,31,20,0.85)' : 'rgba(42,31,20,0.7)'} 0%, transparent 50%)`,
                        borderRadius: '0 0.65rem 0.65rem 0',
                      }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Appearance Customization — BG3-style with live portrait preview */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Appearance</label>
          <div className="grid grid-cols-[200px_1fr] gap-6">
            {/* Large live portrait */}
            <div className="space-y-2">
              <div className="relative">
                <img
                  src={portrait || defaultPortraitSvg}
                  alt={`${race} ${charClass} portrait`}
                  className="w-[200px] h-[156px] rounded-xl border-2 border-amber-900/40 object-cover bg-[#1e160e]"
                />
                {(generatingPortrait || uploadingPortrait) && (
                  <div className="absolute inset-0 rounded-xl bg-slate-950/80 flex items-center justify-center">
                    <div className={`w-10 h-10 border-2 ${uploadingPortrait ? 'border-sky-400' : 'border-[#F38020]'} border-t-transparent rounded-full animate-spin`} />
                  </div>
                )}
              </div>
              <p className="text-[10px] text-amber-800/50 text-center">
                {portrait ? (portraitSource === 'ai' ? 'AI portrait' : 'Uploaded') : 'Live SVG preview'}
              </p>
            </div>

            {/* Appearance pickers */}
            <div className="space-y-4">
              {/* Skin Tone */}
              <div className="space-y-1.5">
                <label className="text-xs text-amber-600/60 font-medium">Skin Tone</label>
                <div className="flex gap-2">
                  {SKIN_PALETTES[race].map((palette, i) => (
                    <button
                      key={i}
                      onClick={() => updateAppearance('skinTone', i)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        appearance.skinTone === i ? 'border-[#F38020] scale-110 shadow-lg shadow-[#F38020]/20' : 'border-amber-900/30 hover:border-amber-700/50'
                      }`}
                      style={{ background: `radial-gradient(circle at 35% 35%, ${palette[0]}, ${palette[1]})` }}
                      title={`Skin tone ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div className="space-y-1.5">
                <label className="text-xs text-amber-600/60 font-medium">Hair Color</label>
                <div className="flex gap-2 flex-wrap">
                  {HAIR_PALETTES[race].map((color, i) => (
                    <button
                      key={i}
                      onClick={() => updateAppearance('hairColor', i)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        appearance.hairColor === i ? 'border-[#F38020] scale-110 shadow-lg shadow-[#F38020]/20' : 'border-amber-900/30 hover:border-amber-700/50'
                      }`}
                      style={{ backgroundColor: color }}
                      title={`Hair color ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Eye Color */}
              <div className="space-y-1.5">
                <label className="text-xs text-amber-600/60 font-medium">Eye Color</label>
                <div className="flex gap-2">
                  {EYE_PALETTES[race].map((color, i) => (
                    <button
                      key={i}
                      onClick={() => updateAppearance('eyeColor', i)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        appearance.eyeColor === i ? 'border-[#F38020] scale-110 shadow-lg shadow-[#F38020]/20' : 'border-amber-900/30 hover:border-amber-700/50'
                      }`}
                      style={{ backgroundColor: color }}
                      title={`Eye color ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Hair Style */}
              <div className="space-y-1.5">
                <label className="text-xs text-amber-600/60 font-medium">Hair Style</label>
                <div className="flex gap-1.5 flex-wrap">
                  {HAIR_STYLES.map((style) => (
                    <button
                      key={style}
                      onClick={() => updateAppearance('hairStyle', style)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border capitalize ${
                        appearance.hairStyle === style
                          ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                          : 'border-amber-900/30 bg-[#1e160e] text-amber-600/60 hover:border-amber-800/50'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Facial Features row */}
              <div className="grid grid-cols-3 gap-3">
                {/* Scars */}
                <div className="space-y-1.5">
                  <label className="text-xs text-amber-600/60 font-medium">Scar</label>
                  <div className="flex flex-col gap-1">
                    {SCAR_TYPES.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateAppearance('scar', s)}
                        className={`px-2 py-1 rounded text-[10px] font-medium transition-all border capitalize ${
                          appearance.scar === s
                            ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                            : 'border-amber-900/30 bg-[#1e160e] text-amber-600/60 hover:border-amber-800/50'
                        }`}
                      >
                        {s === 'none' ? 'None' : s.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Face Markings */}
                <div className="space-y-1.5">
                  <label className="text-xs text-amber-600/60 font-medium">Markings</label>
                  <div className="flex flex-col gap-1">
                    {FACE_MARKING_TYPES.map((m) => (
                      <button
                        key={m}
                        onClick={() => updateAppearance('faceMarking', m)}
                        className={`px-2 py-1 rounded text-[10px] font-medium transition-all border capitalize ${
                          appearance.faceMarking === m
                            ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                            : 'border-amber-900/30 bg-[#1e160e] text-amber-600/60 hover:border-amber-800/50'
                        }`}
                      >
                        {m === 'none' ? 'None' : m.replace(/-/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Facial Hair */}
                <div className="space-y-1.5">
                  <label className="text-xs text-amber-600/60 font-medium">Facial Hair</label>
                  <div className="flex flex-col gap-1">
                    {FACIAL_HAIR_TYPES.map((f) => (
                      <button
                        key={f}
                        onClick={() => updateAppearance('facialHair', f)}
                        className={`px-2 py-1 rounded text-[10px] font-medium transition-all border capitalize ${
                          appearance.facialHair === f
                            ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                            : 'border-amber-900/30 bg-[#1e160e] text-amber-600/60 hover:border-amber-800/50'
                        }`}
                      >
                        {f === 'none' ? 'None' : f.replace(/-/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portrait source controls (compact, under the main portrait area) */}
          <div className="flex gap-2 items-center">
            <button
              onClick={generatePortrait}
              disabled={generatingPortrait || uploadingPortrait}
              className="text-xs bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
            >
              {generatingPortrait ? 'Generating...' : 'AI Portrait'}
            </button>
            <label className={`text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${uploadingPortrait ? 'opacity-40 cursor-not-allowed' : ''}`}>
              {uploadingPortrait ? 'Uploading...' : 'Upload'}
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleUploadPortrait} disabled={uploadingPortrait} className="hidden" />
            </label>
            {portrait && (
              <button onClick={() => { setPortrait(null); setPortraitSource(null); }} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                Clear
              </button>
            )}
            <span className="text-[10px] text-amber-800/50 ml-auto">
              {portraitSource === 'upload' ? 'AES-256-GCM encrypted at rest' : portrait ? 'Workers AI (FLUX)' : 'SVG — updates live'}
            </span>
          </div>
        </div>

        {/* Background + Alignment */}
        <div className="grid grid-cols-2 gap-6">
          {/* Background */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Background</label>
            <div className="grid grid-cols-2 gap-1.5 max-h-[260px] overflow-y-auto pr-1">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setBackground(bg)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all border ${
                    background === bg
                      ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                      : 'border-amber-900/30 bg-[#1e160e] text-amber-200/70 hover:border-amber-800/50'
                  }`}
                >
                  <div>{bg}</div>
                  <div className="text-[9px] text-amber-700/50 mt-0.5">{BACKGROUND_INFO[bg].skills}</div>
                </button>
              ))}
            </div>
            {/* Selected background details */}
            <div className="rounded-lg border border-amber-900/25 bg-[#1e160e]/80 p-3">
              <div className="text-xs text-amber-300/60 italic">{BACKGROUND_INFO[background].flavor}</div>
              <div className="text-[10px] text-amber-700/50 mt-1.5">
                <span className="text-amber-400/60 font-medium">Feature:</span> {BACKGROUND_INFO[background].feature}
              </div>
              <div className="text-[10px] text-amber-700/50">
                <span className="text-amber-400/60 font-medium">Skills:</span> {BACKGROUND_INFO[background].skills}
              </div>
            </div>
          </div>

          {/* Alignment */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Alignment</label>
            <div className="grid grid-cols-3 gap-1.5">
              {ALIGNMENTS.map((a) => {
                const [law, moral] = [a.split(' ')[0], a.split(' ').slice(-1)[0]];
                const morColor = moral === 'Good' ? 'text-green-400' : moral === 'Evil' ? 'text-red-400' : 'text-amber-400/60';
                return (
                  <button
                    key={a}
                    onClick={() => setAlignment(a)}
                    className={`px-2 py-2.5 rounded-lg text-xs font-medium text-center transition-all border ${
                      alignment === a
                        ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                        : 'border-amber-900/30 bg-[#1e160e] text-amber-200/70 hover:border-amber-800/50'
                    }`}
                  >
                    <div className={alignment === a ? '' : morColor}>{law}</div>
                    <div className="text-[10px] text-amber-700/50">{moral}</div>
                  </button>
                );
              })}
            </div>

            {/* Personality / Ideals / Bonds / Flaws — freeform text */}
            <div className="space-y-2 mt-3">
              <label className="text-xs text-amber-600/60 font-medium">Personality Traits</label>
              <textarea
                value={personalityTraits}
                onChange={(e) => setPersonalityTraits(e.target.value)}
                placeholder="I idolize a particular hero and constantly refer to their deeds..."
                rows={2}
                className="w-full bg-[#1e160e] border border-amber-900/30 rounded-lg px-3 py-2 text-xs text-amber-100/80 placeholder:text-amber-900/40 focus:border-[#F38020] focus:outline-none resize-none"
              />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-amber-600/60 font-medium">Ideals</label>
                  <textarea
                    value={ideals}
                    onChange={(e) => setIdeals(e.target.value)}
                    placeholder="Greater good..."
                    rows={2}
                    className="w-full bg-[#1e160e] border border-amber-900/30 rounded-lg px-2 py-1.5 text-[10px] text-amber-100/80 placeholder:text-amber-900/40 focus:border-[#F38020] focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-amber-600/60 font-medium">Bonds</label>
                  <textarea
                    value={bonds}
                    onChange={(e) => setBonds(e.target.value)}
                    placeholder="I protect those who cannot protect themselves..."
                    rows={2}
                    className="w-full bg-[#1e160e] border border-amber-900/30 rounded-lg px-2 py-1.5 text-[10px] text-amber-100/80 placeholder:text-amber-900/40 focus:border-[#F38020] focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-amber-600/60 font-medium">Flaws</label>
                  <textarea
                    value={flaws}
                    onChange={(e) => setFlaws(e.target.value)}
                    placeholder="I have trouble trusting my allies..."
                    rows={2}
                    className="w-full bg-[#1e160e] border border-amber-900/30 rounded-lg px-2 py-1.5 text-[10px] text-amber-100/80 placeholder:text-amber-900/40 focus:border-[#F38020] focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats — 4d6 drop lowest */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Ability Scores</label>
              {swapSource && (
                <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium animate-pulse">
                  Select another stat to swap with {swapSource}
                </span>
              )}
            </div>
            <button
              onClick={rollAllStats}
              disabled={rollingAll}
              className="text-xs bg-[#F38020] hover:bg-[#e06a10] disabled:opacity-40 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
            >
              Roll All (4d6 drop lowest)
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {STAT_NAMES.map((stat) => {
              const roll = statRolls[stat];
              const bonus = RACE_BONUSES[race][stat] || 0;
              const finalVal = roll && !roll.animating ? roll.total + bonus : null;
              const isSwapSource = swapSource === stat;
              const isSwapTarget = swapSource && swapSource !== stat && roll && !roll.animating;

              return (
                <div
                  key={stat}
                  onClick={() => handleStatClick(stat)}
                  className={`rounded-xl border p-4 text-center transition-all ${
                    isSwapSource
                      ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/50 cursor-pointer'
                      : isSwapTarget
                        ? 'border-amber-400/40 bg-[#1e160e] hover:bg-amber-500/5 cursor-pointer'
                        : roll?.animating
                          ? 'border-[#F38020]/50 bg-[#F38020]/5'
                          : roll
                            ? 'border-amber-900/30 bg-[#1e160e] hover:border-amber-800/50 cursor-pointer'
                            : 'border-amber-900/20 bg-[#1e160e]/50'
                  }`}
                >
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isSwapSource ? 'text-amber-400' : 'text-amber-600/50'}`}>{stat}</div>

                  {/* Swap arrows indicator */}
                  {isSwapSource && (
                    <div className="text-[9px] text-amber-400/70 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 inline">
                        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </div>
                  )}

                  {/* Final score */}
                  <div className={`text-3xl font-black tabular-nums mb-1 ${isSwapSource ? 'text-amber-300' : roll?.animating ? 'text-[#F38020] animate-pulse' : finalVal ? 'text-amber-100' : 'text-amber-900/30'}`}>
                    {roll?.animating ? roll.rolls.slice(1).reduce((a, b) => a + b, 0) || '?' : finalVal ?? '--'}
                  </div>

                  {/* Modifier */}
                  {finalVal && (
                    <div className={`text-sm font-bold ${finalVal >= 14 ? 'text-green-400' : finalVal <= 8 ? 'text-red-400' : 'text-amber-400/60'}`}>
                      {statModifier(finalVal)}
                    </div>
                  )}

                  {/* Dice breakdown */}
                  {roll && !roll.animating && (
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {roll.rolls.map((d, i) => (
                        <span
                          key={i}
                          className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold ${
                            d === roll.dropped ? 'bg-red-500/20 text-red-400 line-through' : 'bg-amber-900/20 text-amber-200/70'
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                      {bonus > 0 && (
                        <span className="text-[10px] text-green-400 ml-1">+{bonus}</span>
                      )}
                    </div>
                  )}

                  {/* Roll button for individual stat */}
                  {(!roll || !roll.animating) && (
                    <button
                      onClick={(e) => { e.stopPropagation(); rollStat(stat); setSwapSource(null); }}
                      disabled={rollingAll}
                      className="mt-2 text-[10px] text-amber-700/50 hover:text-[#F38020] transition-colors disabled:opacity-30"
                    >
                      {roll ? 'Reroll' : 'Roll'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {/* Swap hint — only show after all stats are rolled */}
          {finalStats && !swapSource && (
            <p className="text-[10px] text-amber-800/40 text-center">Click a stat to select it, then click another to swap their values</p>
          )}
        </div>

        {/* Portrait */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Portrait</label>
          <div className="flex items-start gap-6">
            {/* Portrait image */}
            <div className="relative group shrink-0">
              <img
                src={portrait || defaultPortraitSvg}
                alt={`${race} ${charClass} portrait`}
                className="w-32 h-32 rounded-xl border-2 border-amber-900/40 object-cover bg-[#1e160e]"
              />
              {(generatingPortrait || uploadingPortrait) && (
                <div className="absolute inset-0 rounded-xl bg-slate-950/80 flex items-center justify-center">
                  <div className={`w-8 h-8 border-2 ${uploadingPortrait ? 'border-sky-400' : 'border-[#F38020]'} border-t-transparent rounded-full animate-spin`} />
                </div>
              )}
            </div>
            {/* Portrait controls */}
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-xs text-amber-700/50">
                {portrait && portraitSource === 'ai' && 'AI-generated portrait. You can regenerate, upload your own, or clear it.'}
                {portrait && portraitSource === 'upload' && 'Custom uploaded portrait (encrypted server-side). You can replace it or clear it.'}
                {!portrait && 'Using default race portrait. Generate an AI portrait, or upload your own image.'}
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={generatePortrait}
                  disabled={generatingPortrait || uploadingPortrait}
                  className="text-xs bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white px-3 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5"
                >
                  {generatingPortrait ? 'Generating...' : portrait && portraitSource === 'ai' ? 'Regenerate AI' : 'Generate AI Portrait'}
                </button>
                <label className={`text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${uploadingPortrait ? 'opacity-40 cursor-not-allowed' : ''}`}>
                  {uploadingPortrait ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      Upload Image
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleUploadPortrait}
                    disabled={uploadingPortrait}
                    className="hidden"
                  />
                </label>
              </div>
              {portrait && (
                <button
                  onClick={() => { setPortrait(null); setPortraitSource(null); }}
                  className="text-xs text-amber-700/50 hover:text-amber-400 transition-colors w-fit"
                >
                  Clear &amp; use default
                </button>
              )}
              <p className="text-[10px] text-amber-800/40 mt-1">
                {portraitSource === 'upload' ? 'Uploaded images are AES-256-GCM encrypted at rest in server storage.' : 'AI uses Workers AI (FLUX). Uploaded images are encrypted server-side.'}
              </p>
            </div>
          </div>
        </div>

        {/* Preview + Create */}
        <div className="rounded-xl border border-amber-900/30 bg-[#1e160e]/90 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Character Preview</h2>
          </div>
          <div className="flex items-start gap-6">
            {/* Portrait thumbnail */}
            <img
              src={portrait || defaultPortraitSvg}
              alt="Portrait"
              className="w-20 h-20 rounded-xl object-cover bg-[#2a1f14] shrink-0 border border-amber-900/30"
            />
            <div className="flex-1 space-y-1">
              <div className="text-xl font-bold text-amber-100">{name || 'Unnamed Hero'}</div>
              <div className="text-sm text-amber-400/60">
                Level 1 {race} {charClass}
              </div>
              {finalStats && (
                <div className="flex gap-3 mt-2">
                  <span className="text-xs text-red-400">HP {CLASS_HIT_DIE[charClass] + Math.floor((finalStats.CON - 10) / 2)}</span>
                  <span className="text-xs text-sky-400">AC {10 + Math.floor((finalStats.DEX - 10) / 2)}</span>
                  <span className="text-xs text-amber-700/50">Hit Die d{CLASS_HIT_DIE[charClass]}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={!name.trim() || !finalStats}
            className="mt-6 w-full py-3 bg-[#F38020] hover:bg-[#e06a10] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] text-lg"
          >
            Create Character
          </button>
        </div>
      </main>
    </div>
  );
}
