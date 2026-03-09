import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/toast';
import { useGame, STAT_NAMES, RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, HAIR_STYLES, SCAR_TYPES, FACE_MARKING_TYPES, FACIAL_HAIR_TYPES, DEFAULT_APPEARANCE, type Stats, type Race, type CharacterClass, type StatName, type Background, type Alignment, type Appearance, type HairStyle, type ScarType, type FaceMarkingType, type FacialHairType } from '../contexts/GameContext';
import { SKIN_PALETTES, HAIR_PALETTES, EYE_PALETTES } from '../lib/palettes';
import { randomFantasyName } from '../lib/names';
import { buildRacePortraitSvg, buildMiniPortraitDataUrl } from '../lib/portrait';



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
