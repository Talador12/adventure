// EncounterBuilder — interactive encounter design tool combining terrain, weather, monsters, lair actions, and difficulty.
import { useState, useCallback } from 'react';

interface BuiltEncounter {
  terrain: string;
  weather: string;
  difficulty: string;
  weatherTerrainEffect: string;
  ecology: string;
  lairAction: string;
  difficultyInfo: string;
  summary: string;
}

interface EncounterBuilderProps {
  onAddDmMessage: (text: string) => void;
  onClose: () => void;
}

const TERRAIN_OPTIONS = ['open', 'forest', 'hills', 'swamp', 'urban', 'cave', 'mountain'] as const;
const WEATHER_OPTIONS = ['clear', 'rain', 'snow', 'fog', 'wind', 'heat', 'storm'] as const;
const DIFFICULTY_OPTIONS = ['easy', 'medium', 'hard', 'deadly'] as const;
const BIOME_MAP: Record<string, string> = {
  open: 'plains', forest: 'forest', hills: 'mountain', swamp: 'swamp',
  urban: 'plains', cave: 'underdark', mountain: 'mountain',
};
const LAIR_THEMES = ['fire', 'ice', 'undead', 'swamp', 'arcane', 'dragon', 'aberrant'] as const;

export default function EncounterBuilder({ onAddDmMessage, onClose }: EncounterBuilderProps) {
  const [terrain, setTerrain] = useState<string>('forest');
  const [weather, setWeather] = useState<string>('clear');
  const [difficulty, setDifficulty] = useState<string>('medium');
  const [lairTheme, setLairTheme] = useState<string>('none');
  const [partyLevel, setPartyLevel] = useState(5);
  const [partySize, setPartySize] = useState(4);
  const [building, setBuilding] = useState(false);
  const [result, setResult] = useState<BuiltEncounter | null>(null);

  const buildEncounter = useCallback(async () => {
    setBuilding(true);
    try {
      const [
        { getWeatherTerrainEffect, formatWeatherTerrain },
        { getEcologyByBiome, formatEcologyEntry },
        { calculateDifficulty, formatDifficultyAdjustment },
        { getLairActionsByTheme, formatLairAction },
        { getTerrainAdvantage, formatTerrainAdvantage },
      ] = await Promise.all([
        import('../../data/weatherTerrainMod'),
        import('../../data/monsterEcology'),
        import('../../data/encounterDifficultyTuner'),
        import('../../data/lairAction'),
        import('../../data/terrainAdvantage'),
      ]);

      // Weather + terrain combo effect
      const wtEffect = getWeatherTerrainEffect(weather as never, terrain as never);
      const weatherTerrainText = wtEffect ? formatWeatherTerrain(wtEffect) : `${weather} in ${terrain} - no special modifiers`;

      // Monster ecology for this biome
      const biome = BIOME_MAP[terrain] || 'plains';
      const ecology = getEcologyByBiome(biome as never);
      const randomMonster = ecology.length > 0
        ? ecology[Math.floor(Math.random() * ecology.length)]
        : null;
      const ecologyText = randomMonster ? formatEcologyEntry(randomMonster) : 'No specific ecology data for this biome';

      // Difficulty calculation
      const diffInfo = calculateDifficulty(
        { averageLevel: partyLevel, partySize, condition: 'fresh' as never, shortRestsAvailable: 1, hpPercent: 100, spellSlotsPercent: 100 },
        difficulty as never,
      );
      const diffText = formatDifficultyAdjustment(diffInfo);

      // Lair action (if boss encounter)
      let lairText = 'No lair actions (standard encounter)';
      if (lairTheme !== 'none') {
        const lairActions = getLairActionsByTheme(lairTheme as never);
        if (lairActions.length > 0) {
          const action = lairActions[Math.floor(Math.random() * lairActions.length)];
          lairText = formatLairAction(action);
        }
      }

      // Terrain advantage
      const terrainAdv = getTerrainAdvantage(terrain);
      const terrainText = terrainAdv ? formatTerrainAdvantage(terrainAdv) : '';

      // Build summary
      const lines = [
        `# Encounter: ${difficulty.toUpperCase()} - ${terrain} / ${weather}`,
        `Party: ${partySize} x Level ${partyLevel}`,
        '',
        '## Environment',
        weatherTerrainText,
        terrainText ? `\n## Terrain Advantages\n${terrainText}` : '',
        '',
        '## Monster',
        ecologyText,
        '',
        '## Difficulty',
        diffText,
        lairTheme !== 'none' ? `\n## Lair Action\n${lairText}` : '',
      ].filter(Boolean);

      const built: BuiltEncounter = {
        terrain,
        weather,
        difficulty,
        weatherTerrainEffect: weatherTerrainText,
        ecology: ecologyText,
        lairAction: lairText,
        difficultyInfo: diffText,
        summary: lines.join('\n'),
      };

      setResult(built);
    } catch (err) {
      console.error('Encounter build failed:', err);
    } finally {
      setBuilding(false);
    }
  }, [terrain, weather, difficulty, lairTheme, partyLevel, partySize]);

  const sendToChat = () => {
    if (result) {
      onAddDmMessage(result.summary);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700">
        <span className="text-xs font-bold text-[#F38020]">Encounter Builder</span>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-xs">Close</button>
      </div>

      {/* Controls */}
      <div className="px-3 py-2 space-y-2 border-b border-slate-700">
        <div className="grid grid-cols-2 gap-2">
          {/* Terrain */}
          <div>
            <label className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Terrain</label>
            <select value={terrain} onChange={(e) => setTerrain(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-slate-200 focus:border-[#F38020] focus:outline-none">
              {TERRAIN_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Weather */}
          <div>
            <label className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Weather</label>
            <select value={weather} onChange={(e) => setWeather(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-slate-200 focus:border-[#F38020] focus:outline-none">
              {WEATHER_OPTIONS.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-slate-200 focus:border-[#F38020] focus:outline-none">
              {DIFFICULTY_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Lair Theme */}
          <div>
            <label className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Lair Theme</label>
            <select value={lairTheme} onChange={(e) => setLairTheme(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-slate-200 focus:border-[#F38020] focus:outline-none">
              <option value="none">None (standard)</option>
              {LAIR_THEMES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Party Level */}
          <div>
            <label className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Party Level</label>
            <input type="number" value={partyLevel} min={1} max={20}
              onChange={(e) => setPartyLevel(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
              className="w-full bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-slate-200 focus:border-[#F38020] focus:outline-none" />
          </div>

          {/* Party Size */}
          <div>
            <label className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Party Size</label>
            <input type="number" value={partySize} min={1} max={8}
              onChange={(e) => setPartySize(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
              className="w-full bg-slate-800 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-slate-200 focus:border-[#F38020] focus:outline-none" />
          </div>
        </div>

        <button
          onClick={buildEncounter}
          disabled={building}
          className="w-full py-1.5 rounded bg-[#F38020] text-white text-[11px] font-bold hover:bg-[#e0701a] disabled:opacity-50 transition-all"
        >
          {building ? 'Building...' : 'Build Encounter'}
        </button>
      </div>

      {/* Result */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {result ? (
          <div className="space-y-2">
            <div className="text-[10px] whitespace-pre-wrap font-mono bg-slate-800/50 rounded p-2 border border-slate-700 leading-relaxed">
              {result.summary}
            </div>
            <button
              onClick={sendToChat}
              className="w-full py-1 rounded bg-emerald-900/30 border border-emerald-600/30 text-emerald-400 text-[10px] font-semibold hover:bg-emerald-800/40 transition-all"
            >
              Send to DM Chat
            </button>
          </div>
        ) : (
          <p className="text-center text-[10px] text-slate-600 py-8">
            Select terrain, weather, difficulty, and lair theme, then click Build.
          </p>
        )}
      </div>
    </div>
  );
}
