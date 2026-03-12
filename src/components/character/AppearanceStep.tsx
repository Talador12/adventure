// AppearanceStep — extracted from CharacterCreate.tsx step 1 (Appearance).
// Handles portrait preview, skin/hair/eye pickers, facial features,
// and portrait source tabs (Default / AI Generate / Upload).

import { useState } from 'react';
import { HAIR_STYLES, SCAR_TYPES, FACE_MARKING_TYPES, FACIAL_HAIR_TYPES, type Race, type CharacterClass, type Appearance, type HairStyle, type ScarType, type FaceMarkingType, type FacialHairType } from '../../contexts/GameContext';
import { SKIN_PALETTES, HAIR_PALETTES, EYE_PALETTES } from '../../lib/palettes';

// Art styles for AI portrait generation
const PORTRAIT_STYLES = [
  { id: 'classic-fantasy', label: 'Classic Fantasy', desc: 'Detailed oil painting, medieval fantasy illustration' },
  { id: 'watercolor', label: 'Watercolor', desc: 'Soft watercolor painting with gentle washes and flowing lines' },
  { id: 'anime-fantasy', label: 'Anime Fantasy', desc: 'Anime-inspired fantasy art with vibrant colors and expressive features' },
  { id: 'dark-gothic', label: 'Dark Gothic', desc: 'Dark, moody gothic illustration with heavy shadows and dramatic contrast' },
  { id: 'storybook', label: 'Storybook', desc: 'Whimsical hand-drawn storybook illustration with warm, soft lighting' },
  { id: 'cel-shaded', label: 'Cel-Shaded', desc: 'Bold cel-shaded art with clean lines and flat vibrant colors' },
  { id: 'realistic', label: 'Realistic', desc: 'Photorealistic digital portrait with cinematic lighting' },
  { id: 'painterly', label: 'Painterly', desc: 'Loose impressionist brushwork, rich textures, dramatic palette knife strokes' },
] as const;

type PortraitStyle = (typeof PORTRAIT_STYLES)[number]['id'];
type PortraitMode = 'default' | 'ai' | 'upload';

export { type PortraitStyle, type PortraitMode, PORTRAIT_STYLES };

export interface AppearanceStepProps {
  race: Race;
  charClass: CharacterClass;
  appearance: Appearance;
  portrait: string | null;
  portraitSource: 'ai' | 'upload' | null;
  illustratedPortrait: string;
  defaultPortraitSvg: string;
  generatingPortrait: boolean;
  uploadingPortrait: boolean;
  describingImage: boolean;
  aiDescription: string | null;
  analyzeUpload: boolean;
  onAppearanceChange: <K extends keyof Appearance>(key: K, value: Appearance[K]) => void;
  onPortraitClear: () => void;
  onGeneratePortrait: (style: PortraitStyle) => void;
  onUploadPortrait: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyzeUploadChange: (v: boolean) => void;
}

export default function AppearanceStep({
  race, charClass, appearance, portrait, portraitSource,
  illustratedPortrait, defaultPortraitSvg,
  generatingPortrait, uploadingPortrait, describingImage, aiDescription, analyzeUpload,
  onAppearanceChange, onPortraitClear, onGeneratePortrait, onUploadPortrait, onAnalyzeUploadChange,
}: AppearanceStepProps) {
  const [portraitMode, setPortraitMode] = useState<PortraitMode>(portraitSource === 'ai' ? 'ai' : portraitSource === 'upload' ? 'upload' : 'default');
  const [portraitStyle, setPortraitStyle] = useState<PortraitStyle>('classic-fantasy');

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="space-y-3">
        <label className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Appearance</label>
        <div className="grid grid-cols-[200px_1fr] gap-6">
          {/* Large live portrait */}
          <div className="space-y-2">
            <div className="relative">
              <img
                src={portrait || illustratedPortrait}
                alt={`${race} ${charClass} portrait`}
                className="w-[200px] h-[156px] rounded-xl border-2 border-amber-900/40 object-cover bg-[#1e160e]"
                onError={(e) => { (e.target as HTMLImageElement).src = defaultPortraitSvg; }}
              />
              {(generatingPortrait || uploadingPortrait) && (
                <div className="absolute inset-0 rounded-xl bg-slate-950/80 flex items-center justify-center">
                  <div className={`w-10 h-10 border-2 ${uploadingPortrait ? 'border-sky-400' : 'border-[#F38020]'} border-t-transparent rounded-full animate-spin`} />
                </div>
              )}
            </div>
            <p className="text-[10px] text-amber-800/50 text-center">
              {portrait ? (portraitSource === 'ai' ? 'AI portrait' : 'Uploaded') : `${charClass} portrait`}
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
                    onClick={() => onAppearanceChange('skinTone', i)}
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
                    onClick={() => onAppearanceChange('hairColor', i)}
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
                    onClick={() => onAppearanceChange('eyeColor', i)}
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
                    onClick={() => onAppearanceChange('hairStyle', style)}
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
                      onClick={() => onAppearanceChange('scar', s)}
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
                      onClick={() => onAppearanceChange('faceMarking', m)}
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
                      onClick={() => onAppearanceChange('facialHair', f)}
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

        {/* Portrait source tabs */}
        <div className="rounded-xl border border-amber-900/30 bg-[#1e160e]/60 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-amber-900/25">
            {([
              { mode: 'default' as PortraitMode, label: 'Default Portrait', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              )},
              { mode: 'ai' as PortraitMode, label: 'AI Generate', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14H8a4 4 0 0 0-4 4v4h16v-4a4 4 0 0 0-4-4z"/><circle cx="9" cy="6" r="0.5" fill="currentColor"/><circle cx="15" cy="6" r="0.5" fill="currentColor"/></svg>
              )},
              { mode: 'upload' as PortraitMode, label: 'Upload Image', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              )},
            ]).map(({ mode, label, icon }) => (
              <button
                key={mode}
                onClick={() => setPortraitMode(mode)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-all ${
                  portraitMode === mode
                    ? 'bg-[#F38020]/10 text-[#F38020] border-b-2 border-[#F38020]'
                    : 'text-amber-600/50 hover:text-amber-400/70 hover:bg-amber-900/10'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-4">
            {/* Default portrait tab */}
            {portraitMode === 'default' && (
              <div className="space-y-2">
                <p className="text-xs text-amber-600/50">
                  Using your race, class, and appearance selections to render a live SVG portrait. This updates automatically as you customize.
                </p>
                {portrait && (
                  <button
                    onClick={onPortraitClear}
                    className="text-xs text-amber-600/50 hover:text-amber-400 transition-colors"
                  >
                    Clear AI/uploaded portrait and use default
                  </button>
                )}
              </div>
            )}

            {/* AI Generate tab */}
            {portraitMode === 'ai' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-amber-600/60 font-medium">Art Style</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {PORTRAIT_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setPortraitStyle(style.id)}
                        className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all border ${
                          portraitStyle === style.id
                            ? 'border-[#F38020] bg-[#F38020]/15 text-[#F38020]'
                            : 'border-amber-900/30 bg-[#2a1f14] text-amber-200/60 hover:border-amber-800/50'
                        }`}
                        title={style.desc}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-amber-800/40">
                    {PORTRAIT_STYLES.find(s => s.id === portraitStyle)?.desc}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onGeneratePortrait(portraitStyle)}
                    disabled={generatingPortrait}
                    className="text-xs bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5"
                  >
                    {generatingPortrait ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : portrait && portraitSource === 'ai' ? 'Regenerate' : 'Generate Portrait'}
                  </button>
                  <p className="text-[10px] text-amber-800/40">
                    Uses Workers AI (FLUX) with your character details + selected art style
                  </p>
                </div>
              </div>
            )}

            {/* Upload tab */}
            {portraitMode === 'upload' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className={`text-xs bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${uploadingPortrait ? 'opacity-40 cursor-not-allowed' : ''}`}>
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
                        Choose Image
                      </>
                    )}
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onUploadPortrait} disabled={uploadingPortrait} className="hidden" />
                  </label>
                  <span className="text-[10px] text-amber-800/40">PNG, JPEG, or WebP (max 1.5MB)</span>
                </div>
                {/* AI analysis checkbox */}
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={analyzeUpload}
                    onChange={(e) => onAnalyzeUploadChange(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-amber-900/40 bg-[#1e160e] text-[#F38020] focus:ring-[#F38020] focus:ring-offset-0 accent-[#F38020] cursor-pointer"
                  />
                  <span className="text-xs text-amber-400/70 group-hover:text-amber-300/80 transition-colors select-none">
                    AI appearance analysis
                  </span>
                  <span className="text-[10px] text-amber-800/40">-- adds a physical description to your character sheet</span>
                </label>
                {/* AI description of uploaded image */}
                {portrait && portraitSource === 'upload' && analyzeUpload && (
                  <div className="rounded-lg border border-amber-900/25 bg-[#2a1f14]/60 p-3 space-y-1.5">
                    {describingImage ? (
                      <div className="flex items-center gap-2 text-xs text-amber-600/50">
                        <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        AI is analyzing your image...
                      </div>
                    ) : aiDescription ? (
                      <>
                        <div className="text-[10px] text-amber-500/60 font-medium uppercase tracking-wider">Appearance Summary</div>
                        <p className="text-xs text-amber-200/70 leading-relaxed">{aiDescription}</p>
                        <p className="text-[10px] text-amber-800/40">This description will be saved to your character sheet.</p>
                      </>
                    ) : (
                      <p className="text-[10px] text-amber-700/40">AI unavailable -- your image will be used without a description.</p>
                    )}
                  </div>
                )}
                {portrait && portraitSource === 'upload' && !analyzeUpload && (
                  <p className="text-[10px] text-amber-800/40">Raw upload -- no AI analysis. Image only.</p>
                )}
                {portrait && portraitSource === 'upload' && (
                  <p className="text-[10px] text-amber-800/40">Uploaded images are AES-256-GCM encrypted at rest.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
