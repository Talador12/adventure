import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/toast';
import { useGame, STAT_NAMES, RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, HAIR_STYLES, SCAR_TYPES, FACE_MARKING_TYPES, FACIAL_HAIR_TYPES, DEFAULT_APPEARANCE, type Stats, type Race, type CharacterClass, type StatName, type Background, type Alignment, type Appearance, type HairStyle, type ScarType, type FaceMarkingType, type FacialHairType } from '../contexts/GameContext';
import { SKIN_PALETTES, HAIR_PALETTES, EYE_PALETTES } from '../lib/palettes';
import { randomFantasyName } from '../lib/names';
import { buildRacePortraitSvg, buildMiniPortraitDataUrl } from '../lib/portrait';
import { EXPORT_FORMATS, runExport, type ExportFormat } from '../lib/export';



// Art styles for AI portrait generation — fantasy themes, no copyrighted names
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
  const { id: editId } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addCharacter, updateCharacter, characters, currentPlayer } = useGame();
  const editingCharacter = editId ? characters.find((c) => c.id === editId) : null;
  const isEditMode = Boolean(editingCharacter);

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
  const [backstory, setBackstory] = useState('');
  const [generatingBackstory, setGeneratingBackstory] = useState(false);
  const [statRolls, setStatRolls] = useState<Record<StatName, StatRoll | null>>(
    Object.fromEntries(STAT_NAMES.map((s) => [s, null])) as Record<StatName, StatRoll | null>
  );
  const [rollingAll, setRollingAll] = useState(false);
  const [portrait, setPortrait] = useState<string | null>(null); // data URL from AI or null for default
  const [generatingPortrait, setGeneratingPortrait] = useState(false);
  const [uploadingPortrait, setUploadingPortrait] = useState(false);
  const [portraitSource, setPortraitSource] = useState<'ai' | 'upload' | null>(null); // track where portrait came from
  const [portraitMode, setPortraitMode] = useState<PortraitMode>('default');
  const [portraitStyle, setPortraitStyle] = useState<PortraitStyle>('classic-fantasy');
  const [aiDescription, setAiDescription] = useState<string | null>(null); // AI-inferred description of uploaded image
  const [describingImage, setDescribingImage] = useState(false);
  const [analyzeUpload, setAnalyzeUpload] = useState(true); // checkbox: send upload to AI for appearance summary

  // AI full build state
  const [generatingCharacter, setGeneratingCharacter] = useState(false);
  const [campaignContext, setCampaignContext] = useState('');
  const [pendingStatPriority, setPendingStatPriority] = useState<StatName[] | null>(null);
  const [generatingPersonality, setGeneratingPersonality] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportStatus, setExportStatus] = useState<{ message: string; success: boolean } | null>(null);

  // Name translation state
  const [translating, setTranslating] = useState(false);
  const [translation, setTranslation] = useState<{ translated: string; language: string; flag: string; original: string } | null>(null);

  // Edit mode — load existing character into form fields
  const [editLoaded, setEditLoaded] = useState(false);
  useEffect(() => {
    if (!editingCharacter || editLoaded) return;
    setName(editingCharacter.name);
    setRace(editingCharacter.race);
    setCharClass(editingCharacter.class);
    setBackground(editingCharacter.background);
    setAlignment(editingCharacter.alignment);
    setAppearance(editingCharacter.appearance);
    setPersonalityTraits(editingCharacter.personalityTraits);
    setIdeals(editingCharacter.ideals);
    setBonds(editingCharacter.bonds);
    setFlaws(editingCharacter.flaws);
    setBackstory(editingCharacter.backstory);
    if (editingCharacter.portrait) {
      setPortrait(editingCharacter.portrait);
      setPortraitMode('upload'); // show the existing portrait in upload tab
      setPortraitSource('upload');
    }
    if (editingCharacter.appearanceDescription) {
      setAiDescription(editingCharacter.appearanceDescription);
    }
    // Reconstruct stat rolls from existing stats (show as already rolled)
    const rolls: Record<StatName, StatRoll | null> = {} as Record<StatName, StatRoll | null>;
    for (const stat of STAT_NAMES) {
      const base = editingCharacter.stats[stat] - (RACE_BONUSES[editingCharacter.race][stat] || 0);
      rolls[stat] = { rolls: [base, 0, 0, 0], dropped: 0, total: base, animating: false };
    }
    setStatRolls(rolls);
    setEditLoaded(true);
  }, [editingCharacter, editLoaded]);

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
          style: portraitStyle,
          appearance,
        }),
      });
      const data = await res.json() as { portrait?: string; error?: string };
      if (data.portrait) {
        setPortrait(data.portrait);
        setPortraitSource('ai');
        setPortraitMode('ai');
        toast('Portrait generated!', 'success');
      } else {
        toast(data.error || 'Failed to generate portrait', 'warning');
      }
    } catch {
      toast('Portrait generation failed — server may be unavailable', 'warning');
    } finally {
      setGeneratingPortrait(false);
    }
  }, [name, race, charClass, portraitStyle, appearance, toast]);

  // Ask AI to describe an uploaded image — infer physical traits
  const describeUploadedImage = useCallback(async (dataUrl: string) => {
    setDescribingImage(true);
    try {
      const res = await fetch('/api/portrait/describe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl, race, class: charClass }),
      });
      const data = await res.json() as { description?: string; error?: string };
      if (data.description) {
        setAiDescription(data.description);
        toast('AI analyzed your portrait!', 'success');
      }
    } catch {
      // Non-blocking — image still works without AI description
    } finally {
      setDescribingImage(false);
    }
  }, [race, charClass, toast]);

  // Upload a custom portrait — read file, send to server for encrypted KV storage, then AI describe
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
          setPortrait(dataUrl);
          setPortraitSource('upload');
          setPortraitMode('upload');
          toast('Portrait uploaded and encrypted!', 'success');
        } else {
          setPortrait(dataUrl);
          setPortraitSource('upload');
          setPortraitMode('upload');
          toast('Portrait set locally (server storage unavailable)', 'info');
        }
      } catch {
        setPortrait(dataUrl);
        setPortraitSource('upload');
        setPortraitMode('upload');
        toast('Portrait set locally (server unavailable)', 'info');
      } finally {
        setUploadingPortrait(false);
      }
      // Fire off AI description in parallel (non-blocking) if checkbox is on
      if (analyzeUpload) {
        describeUploadedImage(dataUrl);
      }
    };
    reader.onerror = () => {
      toast('Failed to read image file', 'warning');
      setUploadingPortrait(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [toast, describeUploadedImage, analyzeUpload]);

  const generateBackstory = useCallback(async () => {
    setGeneratingBackstory(true);
    try {
      const res = await fetch('/api/backstory/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'a nameless wanderer',
          race,
          class: charClass,
          background,
          alignment,
          stats: getFinalStats() || {},
          personalityTraits,
          ideals,
          bonds,
          flaws,
        }),
      });
      const data = await res.json() as { backstory?: string; error?: string };
      if (data.backstory) {
        setBackstory(data.backstory);
        toast('Backstory generated!', 'success');
      } else {
        toast(data.error || 'Failed to generate backstory', 'warning');
      }
    } catch {
      toast('Backstory generation failed — server may be unavailable', 'warning');
    } finally {
      setGeneratingBackstory(false);
    }
  }, [name, race, charClass, background, alignment, personalityTraits, ideals, bonds, flaws, toast]);

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

  // Smart stat allocation — after AI build rolls stats, assign them by priority
  useEffect(() => {
    if (!pendingStatPriority) return;
    const allDone = STAT_NAMES.every((s) => statRolls[s] && !statRolls[s]!.animating);
    if (!allDone || rollingAll) return;

    // Collect rolled totals, sort descending (best rolls first)
    const rolled = STAT_NAMES.map((s) => ({ stat: s, roll: statRolls[s]! }));
    const sortedRolls = [...rolled].sort((a, b) => b.roll.total - a.roll.total);

    // Assign best roll to highest priority stat
    const newRolls = { ...statRolls };
    pendingStatPriority.forEach((priorityStat, i) => {
      if (sortedRolls[i]) {
        newRolls[priorityStat] = sortedRolls[i].roll;
      }
    });
    setStatRolls(newRolls as Record<StatName, StatRoll | null>);
    setPendingStatPriority(null);
  }, [statRolls, rollingAll, pendingStatPriority]);

  // AI full character generation
  const generateFullCharacter = useCallback(async () => {
    setGeneratingCharacter(true);
    try {
      const res = await fetch('/api/character/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign: campaignContext || undefined }),
      });
      const data = await res.json() as Record<string, unknown>;
      if (data.error) {
        toast(String(data.error), 'warning');
        return;
      }

      // Set all fields from AI response
      if (data.name) setName(String(data.name));
      if (data.race && RACES.includes(data.race as Race)) setRace(data.race as Race);
      if (data.class && CLASSES.includes(data.class as CharacterClass)) setCharClass(data.class as CharacterClass);
      if (data.background && BACKGROUNDS.includes(data.background as Background)) setBackground(data.background as Background);
      if (data.alignment && ALIGNMENTS.includes(data.alignment as Alignment)) setAlignment(data.alignment as Alignment);
      if (data.personalityTraits) setPersonalityTraits(String(data.personalityTraits));
      if (data.ideals) setIdeals(String(data.ideals));
      if (data.bonds) setBonds(String(data.bonds));
      if (data.flaws) setFlaws(String(data.flaws));
      if (data.backstory) setBackstory(String(data.backstory));
      setTranslation(null);

      // Apply appearance suggestions
      const app = data.appearance as Record<string, string> | undefined;
      if (app) {
        setAppearance(prev => ({
          ...prev,
          ...(app.hairStyle && HAIR_STYLES.includes(app.hairStyle as HairStyle) ? { hairStyle: app.hairStyle as HairStyle } : {}),
          ...(app.scar && SCAR_TYPES.includes(app.scar as ScarType) ? { scar: app.scar as ScarType } : {}),
          ...(app.faceMarking && FACE_MARKING_TYPES.includes(app.faceMarking as FaceMarkingType) ? { faceMarking: app.faceMarking as FaceMarkingType } : {}),
          ...(app.facialHair && FACIAL_HAIR_TYPES.includes(app.facialHair as FacialHairType) ? { facialHair: app.facialHair as FacialHairType } : {}),
        }));
      }

      // Roll stats, then smart-allocate by priority after rolling finishes
      const priority = data.statPriority as string[] | undefined;
      if (priority && priority.length === 6 && priority.every(s => STAT_NAMES.includes(s as StatName))) {
        setPendingStatPriority(priority as StatName[]);
      }
      rollAllStats();

      const concept = data.concept ? ` — ${data.concept}` : '';
      toast(`Character generated!${concept}`, 'success');
    } catch {
      toast('Character generation failed — server may be unavailable', 'warning');
    } finally {
      setGeneratingCharacter(false);
    }
  }, [campaignContext, rollAllStats, toast]);

  // AI personality generation (traits + ideals + bonds + flaws together)
  const generatePersonality = useCallback(async () => {
    setGeneratingPersonality(true);
    try {
      const res = await fetch('/api/character/suggest-personality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'an adventurer',
          race,
          class: charClass,
          background,
          alignment,
          backstory,
        }),
      });
      const data = await res.json() as Record<string, unknown>;
      if (data.error) {
        toast(String(data.error), 'warning');
        return;
      }
      if (data.personalityTraits) setPersonalityTraits(String(data.personalityTraits));
      if (data.ideals) setIdeals(String(data.ideals));
      if (data.bonds) setBonds(String(data.bonds));
      if (data.flaws) setFlaws(String(data.flaws));
      toast('Personality generated!', 'success');
    } catch {
      toast('Personality generation failed — server may be unavailable', 'warning');
    } finally {
      setGeneratingPersonality(false);
    }
  }, [name, race, charClass, background, alignment, backstory, toast]);

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

  // Build a Character object from current form state (for export preview)
  const buildPreviewCharacter = useCallback(() => {
    if (!finalStats) return null;
    const hitDie = CLASS_HIT_DIE[charClass];
    const conMod = Math.floor((finalStats.CON - 10) / 2);
    const maxHp = hitDie + conMod;
    return {
      id: 'preview',
      name: name.trim() || 'Unnamed Hero',
      race,
      class: charClass,
      level: 1,
      xp: 0,
      stats: finalStats,
      hp: maxHp,
      maxHp,
      ac: 10 + Math.floor((finalStats.DEX - 10) / 2),
      deathSaves: { successes: 0, failures: 0 },
      condition: 'normal' as const,
      portrait: portrait || undefined,
      appearance,
      background,
      alignment,
      personalityTraits,
      ideals,
      bonds,
      flaws,
      backstory,
      appearanceDescription: (analyzeUpload && aiDescription) || undefined,
      playerId: currentPlayer.id,
      gold: 15,
      inventory: [],
      equipment: { weapon: null, armor: null, shield: null, ring: null },
      spellSlotsUsed: {},
      createdAt: Date.now(),
    };
  }, [finalStats, charClass, name, race, portrait, appearance, background, alignment, personalityTraits, ideals, bonds, flaws, backstory, analyzeUpload, aiDescription, currentPlayer.id]);

  const handleExport = useCallback(async (format: ExportFormat) => {
    const char = buildPreviewCharacter();
    if (!char) return;
    setExportStatus(null);
    const result = await runExport(format.id, char);
    setExportStatus(result);
    if (result.success) {
      setTimeout(() => setExportStatus(null), 3000);
    }
  }, [buildPreviewCharacter]);

  const handleSave = () => {
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

    if (isEditMode && editingCharacter) {
      // Edit mode — preserve id, level, xp, gold, deathSaves, condition, createdAt
      updateCharacter(editingCharacter.id, {
        name: name.trim(),
        race,
        class: charClass,
        stats: finalStats,
        hp: Math.min(editingCharacter.hp, maxHp), // don't exceed new max
        maxHp,
        ac: 10 + Math.floor((finalStats.DEX - 10) / 2),
        portrait: portrait || undefined,
        appearance,
        background,
        alignment,
        personalityTraits,
        ideals,
        bonds,
        flaws,
        backstory,
        appearanceDescription: (analyzeUpload && aiDescription) || undefined,
      });
      toast(`${name.trim()} updated!`, 'success');
    } else {
      // Create mode
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
        ac: 10 + Math.floor((finalStats.DEX - 10) / 2),
        deathSaves: { successes: 0, failures: 0 },
        condition: 'normal' as const,
        portrait: portrait || undefined,
        appearance,
        background,
        alignment,
        personalityTraits,
        ideals,
        bonds,
        flaws,
        backstory,
        appearanceDescription: (analyzeUpload && aiDescription) || undefined,
        playerId: currentPlayer.id,
        gold: 15,
        inventory: [],
        equipment: { weapon: null, armor: null, shield: null, ring: null },
        spellSlotsUsed: {},
        createdAt: Date.now(),
      };
      addCharacter(character);
      toast(`${character.name} the ${race} ${charClass} is ready!`, 'success');
    }
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
          <h1 className="text-lg font-bold text-[#F38020]">{isEditMode ? `Edit ${editingCharacter?.name || 'Character'}` : 'Create Character'}</h1>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto p-6 space-y-8">
        {/* AI Build — generate entire character */}
        <div className="rounded-xl border border-purple-500/20 bg-purple-950/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-purple-300">AI Build Character</h2>
              <p className="text-[11px] text-purple-400/50 mt-0.5">Generate an entire character with creative race/class combos, stats, personality, and backstory</p>
            </div>
            <button
              onClick={generateFullCharacter}
              disabled={generatingCharacter}
              className="text-sm bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 shrink-0"
            >
              {generatingCharacter ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Building...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 3v4m0 14v-4m9-5h-4M7 12H3m15.364-6.364l-2.828 2.828M9.464 14.536l-2.828 2.828m12.728 0l-2.828-2.828M9.464 9.464L6.636 6.636"/></svg>
                  Roll Character
                </>
              )}
            </button>
          </div>
          {/* Campaign context — optional, collapses */}
          <details className="group">
            <summary className="text-[11px] text-purple-400/40 cursor-pointer hover:text-purple-400/60 transition-colors select-none">
              Campaign context (optional — helps AI tailor the character)
            </summary>
            <textarea
              value={campaignContext}
              onChange={(e) => setCampaignContext(e.target.value)}
              placeholder="e.g. Curse of Strahd gothic horror campaign, party needs a healer, set in a dark Victorian-inspired land of Barovia..."
              rows={2}
              className="w-full mt-2 bg-purple-950/30 border border-purple-500/15 rounded-lg px-3 py-2 text-xs text-purple-200/70 placeholder:text-purple-400/25 focus:border-purple-500/30 focus:outline-none resize-y"
            />
          </details>
        </div>

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
                      onClick={() => { setPortrait(null); setPortraitSource(null); }}
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
                      onClick={generatePortrait}
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
                      <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleUploadPortrait} disabled={uploadingPortrait} className="hidden" />
                    </label>
                    <span className="text-[10px] text-amber-800/40">PNG, JPEG, or WebP (max 1.5MB)</span>
                  </div>
                  {/* AI analysis checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={analyzeUpload}
                      onChange={(e) => setAnalyzeUpload(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-amber-900/40 bg-[#1e160e] text-[#F38020] focus:ring-[#F38020] focus:ring-offset-0 accent-[#F38020] cursor-pointer"
                    />
                    <span className="text-xs text-amber-400/70 group-hover:text-amber-300/80 transition-colors select-none">
                      AI appearance analysis
                    </span>
                    <span className="text-[10px] text-amber-800/40">— adds a physical description to your character sheet</span>
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
                        <p className="text-[10px] text-amber-700/40">AI unavailable — your image will be used without a description.</p>
                      )}
                    </div>
                  )}
                  {portrait && portraitSource === 'upload' && !analyzeUpload && (
                    <p className="text-[10px] text-amber-800/40">Raw upload — no AI analysis. Image only.</p>
                  )}
                  {portrait && portraitSource === 'upload' && (
                    <p className="text-[10px] text-amber-800/40">Uploaded images are AES-256-GCM encrypted at rest.</p>
                  )}
                </div>
              )}
            </div>
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

          {/* Starting Alignment */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Starting Alignment</label>
            <p className="text-[10px] text-amber-700/40 -mt-1">Your character's moral compass at creation — alignment can shift through play.</p>
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
          </div>
        </div>

        {/* Personality & Backstory — full width, proper sizing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-amber-500/70 uppercase tracking-wider">Personality & Backstory</label>
            <button
              onClick={generatePersonality}
              disabled={generatingPersonality}
              className="text-[11px] bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5"
            >
              {generatingPersonality ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Rolling...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M12 3v4m0 14v-4m9-5h-4M7 12H3m15.364-6.364l-2.828 2.828M9.464 14.536l-2.828 2.828m12.728 0l-2.828-2.828M9.464 9.464L6.636 6.636"/></svg>
                  {personalityTraits || ideals || bonds || flaws ? 'Reroll Personality' : 'Roll with AI'}
                </>
              )}
            </button>
          </div>

          {/* Personality Traits */}
          <div className="space-y-1.5">
            <label className="text-xs text-amber-600/60 font-medium">Personality Traits</label>
            <textarea
              value={personalityTraits}
              onChange={(e) => setPersonalityTraits(e.target.value)}
              placeholder="I idolize a particular hero and constantly refer to their deeds. I misquote wise sayings to fit any situation. Nothing can shake my optimistic attitude..."
              rows={3}
              className="w-full bg-[#1e160e] border border-amber-900/30 rounded-lg px-4 py-3 text-sm text-amber-100/80 placeholder:text-amber-900/40 focus:border-[#F38020] focus:outline-none resize-y transition-colors duration-200"
            />
          </div>

          {/* Ideals / Bonds / Flaws — 3-column but full page width */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-amber-600/60 font-medium">Ideals</label>
              <textarea
                value={ideals}
                onChange={(e) => setIdeals(e.target.value)}
                placeholder="Greater good. Beauty. Logic. Freedom. Tradition. Charity. Honor above all else..."
                rows={3}
                className="w-full bg-[#1e160e] border border-amber-900/30 rounded-lg px-3 py-2.5 text-sm text-amber-100/80 placeholder:text-amber-900/40 focus:border-[#F38020] focus:outline-none resize-y min-h-[80px] transition-colors duration-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-amber-600/60 font-medium">Bonds</label>
              <textarea
                value={bonds}
                onChange={(e) => setBonds(e.target.value)}
                placeholder="I protect those who cannot protect themselves. I owe my life to the priest who took me in. My family's honor must be restored..."
                rows={3}
                className="w-full bg-[#1e160e] border border-amber-900/30 rounded-lg px-3 py-2.5 text-sm text-amber-100/80 placeholder:text-amber-900/40 focus:border-[#F38020] focus:outline-none resize-y min-h-[80px] transition-colors duration-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-amber-600/60 font-medium">Flaws</label>
              <textarea
                value={flaws}
                onChange={(e) => setFlaws(e.target.value)}
                placeholder="I have trouble trusting my allies. I am slow to forgive. A scandal from my past haunts me to this day..."
                rows={3}
                className="w-full bg-[#1e160e] border border-amber-900/30 rounded-lg px-3 py-2.5 text-sm text-amber-100/80 placeholder:text-amber-900/40 focus:border-[#F38020] focus:outline-none resize-y min-h-[80px] transition-colors duration-200"
              />
            </div>
          </div>

          {/* Backstory — the novel goes here */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-amber-600/60 font-medium">Backstory</label>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-amber-800/40">{backstory.length > 0 ? `${backstory.length} chars` : 'optional'}</span>
                <button
                  onClick={generateBackstory}
                  disabled={generatingBackstory}
                  className="text-[11px] bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white px-3 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1.5"
                >
                  {generatingBackstory ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Writing...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/>
                      </svg>
                      {backstory ? 'Rewrite with AI' : 'Generate with AI'}
                    </>
                  )}
                </button>
              </div>
            </div>
            <textarea
              value={backstory}
              onChange={(e) => setBackstory(e.target.value)}
              placeholder="Write your own origin story, or hit 'Generate with AI' to have one written for you based on your character's race, class, background, stats, and personality. The AI writes unique, non-generic backstories with named characters, unresolved mysteries, and hooks your DM can build on."
              rows={8}
              className="w-full bg-[#1e160e] border border-amber-900/30 rounded-xl px-4 py-3 text-sm text-amber-100/80 placeholder:text-amber-900/40 focus:border-[#F38020] focus:outline-none resize-y min-h-[160px] transition-colors duration-200 leading-relaxed"
            />
            <p className="text-[10px] text-amber-800/40">
              Write as much or as little as you want. AI backstories use your character's details to create something specific — not cookie-cutter. You can edit after generating. Your backstory helps the DM weave your history into the campaign.
            </p>
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
            onClick={handleSave}
            disabled={!name.trim() || !finalStats}
            className="mt-6 w-full py-3 bg-[#F38020] hover:bg-[#e06a10] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] text-lg"
          >
            {isEditMode ? 'Save Changes' : 'Create Character'}
          </button>

          {/* Export button */}
          <button
            onClick={() => setShowExportModal(true)}
            disabled={!finalStats}
            className="mt-2 w-full py-2 bg-transparent border border-amber-900/40 hover:border-amber-700/60 hover:bg-amber-900/10 disabled:opacity-30 disabled:cursor-not-allowed text-amber-400/70 hover:text-amber-300 text-sm rounded-xl transition-all"
          >
            Export Character Sheet
          </button>
        </div>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowExportModal(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg rounded-2xl border border-amber-900/40 bg-[#1e160e] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-amber-900/30 px-6 py-4">
              <h3 className="text-lg font-semibold text-amber-100">Export Character</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-amber-700/50 hover:text-amber-400 transition-colors text-xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Format list */}
            <div className="px-6 py-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {EXPORT_FORMATS.map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => handleExport(fmt)}
                  disabled={!fmt.available}
                  className={`w-full text-left rounded-xl border p-3 transition-all ${
                    fmt.available
                      ? 'border-amber-900/30 hover:border-[#F38020]/50 hover:bg-amber-900/10 cursor-pointer'
                      : 'border-amber-900/15 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-amber-100">{fmt.label}</span>
                    <span className="text-[10px] uppercase tracking-wider text-amber-700/50">
                      {fmt.method === 'download' ? 'Download' : fmt.method === 'clipboard' ? 'Clipboard' : 'Preview'}
                      {fmt.ext && ` (${fmt.ext})`}
                    </span>
                  </div>
                  <div className="text-xs text-amber-400/50 mt-0.5">{fmt.desc}</div>
                  {fmt.systemNote && (
                    <div className="text-[10px] text-amber-700/40 mt-1 italic">{fmt.systemNote}</div>
                  )}
                </button>
              ))}
            </div>

            {/* Status bar */}
            {exportStatus && (
              <div className={`mx-6 mb-4 px-3 py-2 rounded-lg text-xs ${
                exportStatus.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
              }`}>
                {exportStatus.message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
