// SessionPrepWizard — guided workflow that uses data systems to prep an entire session.
// Steps: Setting -> Weather -> Encounter -> NPCs -> Plot Twist -> Session Plan output.
import { useState, useCallback } from 'react';

type WizardStep = 'setting' | 'weather' | 'encounter' | 'npcs' | 'twist' | 'review';

interface SessionPlan {
  setting: string;
  weather: string;
  encounter: string;
  npcs: string;
  twist: string;
}

interface SessionPrepWizardProps {
  onAddDmMessage: (text: string) => void;
  onClose: () => void;
}

const STEPS: { key: WizardStep; label: string; icon: string }[] = [
  { key: 'setting', label: 'Setting', icon: '🌍' },
  { key: 'weather', label: 'Weather', icon: '⛅' },
  { key: 'encounter', label: 'Encounter', icon: '⚔️' },
  { key: 'npcs', label: 'NPCs', icon: '👤' },
  { key: 'twist', label: 'Plot Twist', icon: '🔀' },
  { key: 'review', label: 'Review', icon: '📋' },
];

const SETTING_OPTIONS = [
  { id: 'forest', label: 'Dense Forest', biome: 'forest' },
  { id: 'mountain', label: 'Mountain Pass', biome: 'mountain' },
  { id: 'swamp', label: 'Murky Swamp', biome: 'swamp' },
  { id: 'urban', label: 'City Streets', biome: 'plains' },
  { id: 'underdark', label: 'Underdark Caverns', biome: 'underdark' },
  { id: 'coast', label: 'Coastal Cliffs', biome: 'coast' },
  { id: 'desert', label: 'Scorching Desert', biome: 'desert' },
  { id: 'arctic', label: 'Frozen Wastes', biome: 'arctic' },
];

export default function SessionPrepWizard({ onAddDmMessage, onClose }: SessionPrepWizardProps) {
  const [step, setStep] = useState<WizardStep>('setting');
  const [plan, setPlan] = useState<SessionPlan>({ setting: '', weather: '', encounter: '', npcs: '', twist: '' });
  const [loading, setLoading] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState('forest');

  const stepIdx = STEPS.findIndex((s) => s.key === step);

  const goNext = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].key);
  };

  const goBack = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx > 0) setStep(STEPS[idx - 1].key);
  };

  const generateWeather = useCallback(async () => {
    setLoading(true);
    try {
      const { rollWeatherEvent, formatWeatherEvent } = await import('../../data/weatherEvents');
      const event = rollWeatherEvent();
      const text = formatWeatherEvent(event);
      setPlan((p) => ({ ...p, weather: text }));
    } catch { setPlan((p) => ({ ...p, weather: 'Clear skies, mild temperature.' })); }
    finally { setLoading(false); }
  }, []);

  const generateEncounter = useCallback(async () => {
    setLoading(true);
    try {
      const biome = SETTING_OPTIONS.find((s) => s.id === selectedSetting)?.biome || 'forest';
      const { getEcologyByBiome, formatEcologyEntry } = await import('../../data/monsterEcology');
      const ecology = getEcologyByBiome(biome as never);
      if (ecology.length > 0) {
        const monster = ecology[Math.floor(Math.random() * ecology.length)];
        setPlan((p) => ({ ...p, encounter: formatEcologyEntry(monster) }));
      } else {
        setPlan((p) => ({ ...p, encounter: 'A band of goblins blocking the path.' }));
      }
    } catch { setPlan((p) => ({ ...p, encounter: 'A mysterious figure challenges the party.' })); }
    finally { setLoading(false); }
  }, [selectedSetting]);

  const generateNPCs = useCallback(async () => {
    setLoading(true);
    try {
      const [
        { getRandomVoice, formatVoiceProfile },
        { generateNpcBackstory, formatBackstory },
      ] = await Promise.all([
        import('../../data/npcVoiceGenerator'),
        import('../../data/npcBackstoryGen'),
      ]);
      const voice = formatVoiceProfile(getRandomVoice());
      const backstory = formatBackstory(generateNpcBackstory());
      setPlan((p) => ({ ...p, npcs: `**NPC Voice:**\n${voice}\n\n**NPC Backstory:**\n${backstory}` }));
    } catch { setPlan((p) => ({ ...p, npcs: 'A grizzled tavern keeper with a secret past.' })); }
    finally { setLoading(false); }
  }, []);

  const generateTwist = useCallback(async () => {
    setLoading(true);
    try {
      const { getRandomPlotTwist, formatPlotTwist } = await import('../../data/plotTwistEngine');
      const twist = getRandomPlotTwist();
      setPlan((p) => ({ ...p, twist: formatPlotTwist(twist) }));
    } catch { setPlan((p) => ({ ...p, twist: 'The quest giver is actually the villain.' })); }
    finally { setLoading(false); }
  }, []);

  const sendPlanToChat = () => {
    const settingLabel = SETTING_OPTIONS.find((s) => s.id === selectedSetting)?.label || selectedSetting;
    const lines = [
      '# Session Prep Plan',
      '',
      `## Setting: ${settingLabel}`,
      plan.setting || `The party travels through ${settingLabel.toLowerCase()}.`,
      '',
      '## Weather',
      plan.weather || 'Not generated yet.',
      '',
      '## Encounter',
      plan.encounter || 'Not generated yet.',
      '',
      '## Key NPCs',
      plan.npcs || 'Not generated yet.',
      '',
      '## Plot Twist',
      plan.twist || 'Not generated yet.',
    ];
    onAddDmMessage(lines.join('\n'));
  };

  const btnClass = 'w-full py-1.5 rounded text-[10px] font-semibold transition-all';
  const primaryBtn = `${btnClass} bg-[#F38020] text-white hover:bg-[#e0701a] disabled:opacity-50`;
  const secondaryBtn = `${btnClass} bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700`;

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700">
        <span className="text-xs font-bold text-[#F38020]">Session Prep Wizard</span>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-xs">Close</button>
      </div>

      {/* Step indicators */}
      <div className="flex border-b border-slate-700">
        {STEPS.map((s, i) => (
          <button key={s.key} onClick={() => setStep(s.key)}
            className={`flex-1 py-1.5 text-[9px] font-semibold transition-all ${
              i === stepIdx ? 'bg-slate-800 text-[#F38020] border-b-2 border-[#F38020]'
              : i < stepIdx ? 'text-emerald-400'
              : 'text-slate-600'
            }`}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {step === 'setting' && (
          <>
            <p className="text-[10px] text-slate-400">Choose the session setting:</p>
            <div className="grid grid-cols-2 gap-1.5">
              {SETTING_OPTIONS.map((s) => (
                <button key={s.id} onClick={() => { setSelectedSetting(s.id); setPlan((p) => ({ ...p, setting: s.label })); }}
                  className={`p-2 rounded border text-left text-[10px] transition-all ${
                    selectedSetting === s.id
                      ? 'bg-[#F38020]/15 border-[#F38020]/50 text-[#F38020]'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                  }`}>
                  {s.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'weather' && (
          <>
            <p className="text-[10px] text-slate-400">Generate weather for the session:</p>
            <button onClick={generateWeather} disabled={loading} className={primaryBtn}>
              {loading ? 'Rolling...' : '🎲 Generate Weather'}
            </button>
            {plan.weather && (
              <div className="text-[10px] whitespace-pre-wrap bg-slate-800/50 rounded p-2 border border-slate-700">
                {plan.weather}
              </div>
            )}
          </>
        )}

        {step === 'encounter' && (
          <>
            <p className="text-[10px] text-slate-400">Generate an encounter for {SETTING_OPTIONS.find((s) => s.id === selectedSetting)?.label}:</p>
            <button onClick={generateEncounter} disabled={loading} className={primaryBtn}>
              {loading ? 'Building...' : '🎲 Generate Encounter'}
            </button>
            {plan.encounter && (
              <div className="text-[10px] whitespace-pre-wrap bg-slate-800/50 rounded p-2 border border-slate-700">
                {plan.encounter}
              </div>
            )}
          </>
        )}

        {step === 'npcs' && (
          <>
            <p className="text-[10px] text-slate-400">Generate NPCs with voice and backstory:</p>
            <button onClick={generateNPCs} disabled={loading} className={primaryBtn}>
              {loading ? 'Creating...' : '🎲 Generate NPCs'}
            </button>
            {plan.npcs && (
              <div className="text-[10px] whitespace-pre-wrap bg-slate-800/50 rounded p-2 border border-slate-700">
                {plan.npcs}
              </div>
            )}
          </>
        )}

        {step === 'twist' && (
          <>
            <p className="text-[10px] text-slate-400">Add a plot twist to the session:</p>
            <button onClick={generateTwist} disabled={loading} className={primaryBtn}>
              {loading ? 'Twisting...' : '🎲 Generate Plot Twist'}
            </button>
            {plan.twist && (
              <div className="text-[10px] whitespace-pre-wrap bg-slate-800/50 rounded p-2 border border-slate-700">
                {plan.twist}
              </div>
            )}
          </>
        )}

        {step === 'review' && (
          <>
            <p className="text-[10px] text-slate-400 mb-1">Your session plan:</p>
            <div className="text-[10px] space-y-2">
              {[
                { label: 'Setting', val: plan.setting || SETTING_OPTIONS.find((s) => s.id === selectedSetting)?.label },
                { label: 'Weather', val: plan.weather },
                { label: 'Encounter', val: plan.encounter },
                { label: 'NPCs', val: plan.npcs },
                { label: 'Plot Twist', val: plan.twist },
              ].map((section) => (
                <div key={section.label}>
                  <div className="font-bold text-[#F38020]">{section.label}</div>
                  <div className="text-slate-300 whitespace-pre-wrap">{section.val || <span className="text-slate-600 italic">Not generated</span>}</div>
                </div>
              ))}
            </div>
            <button onClick={sendPlanToChat}
              className={`${btnClass} mt-2 bg-emerald-900/30 border border-emerald-600/30 text-emerald-400 hover:bg-emerald-800/40`}>
              📋 Send Plan to DM Chat
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-2 px-3 py-2 border-t border-slate-700">
        <button onClick={goBack} disabled={stepIdx === 0}
          className={`flex-1 ${secondaryBtn} disabled:opacity-30`}>
          Back
        </button>
        <button onClick={goNext} disabled={stepIdx === STEPS.length - 1}
          className={`flex-1 ${primaryBtn}`}>
          Next
        </button>
      </div>
    </div>
  );
}
