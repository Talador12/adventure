import { useState, useEffect } from 'react';
import { useGame, type StatName, type Character, hasPendingASI, FEATS } from '../../contexts/GameContext';

interface LevelUpModalProps {
  character: Character;
  onClose: () => void;
  onMessage: (msg: string) => void;
  onCombatLog: (msg: string) => void;
}

export default function LevelUpModal({ character, onClose, onMessage, onCombatLog }: LevelUpModalProps) {
  const { applyASI, selectFeat, characters } = useGame();
  const [levelUpTab, setLevelUpTab] = useState<'asi' | 'feat'>('asi');
  const [asiMode, setAsiMode] = useState<'single' | 'split'>('single');
  const [asiStat1, setAsiStat1] = useState<StatName>('STR');
  const [asiStat2, setAsiStat2] = useState<StatName | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleApplyASI = () => {
    const result = applyASI(character.id, asiStat1, asiMode === 'split' ? asiStat2 || undefined : undefined);
    if (result.success) {
      onMessage(result.message);
      onCombatLog(result.message);
      const updated = characters.find((c) => c.id === character.id);
      if (!updated || !hasPendingASI(updated)) onClose();
    }
  };

  const handleSelectFeat = (featId: string) => {
    const result = selectFeat(character.id, featId);
    if (result.success) {
      onMessage(result.message);
      onCombatLog(result.message);
      const updated = characters.find((c) => c.id === character.id);
      if (!updated || !hasPendingASI(updated)) onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900 border border-amber-700/60 rounded-2xl shadow-2xl shadow-amber-900/30 w-[480px] max-w-[95vw] max-h-[90vh] overflow-y-auto animate-pop-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-amber-800/40 bg-gradient-to-r from-amber-900/30 to-yellow-900/20">
          <h2 className="text-lg font-bold text-amber-300">Level Up — Ability Score Improvement</h2>
          <p className="text-xs text-amber-400/70 mt-1">
            {character.name} reached level {character.level}! Choose an improvement.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800">
          <button onClick={() => setLevelUpTab('asi')} className={`flex-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${levelUpTab === 'asi' ? 'border-amber-500 text-amber-300' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
            Ability Scores
          </button>
          <button onClick={() => setLevelUpTab('feat')} className={`flex-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${levelUpTab === 'feat' ? 'border-purple-500 text-purple-300' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
            Feats
          </button>
        </div>

        <div className="p-6">
          {levelUpTab === 'asi' ? (
            <div>
              {/* ASI mode toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => { setAsiMode('single'); setAsiStat2(null); }}
                  className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${asiMode === 'single' ? 'bg-amber-900/40 border-amber-600/60 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-300'}`}
                >
                  +2 to one stat
                </button>
                <button onClick={() => setAsiMode('split')} className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${asiMode === 'split' ? 'bg-amber-900/40 border-amber-600/60 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-300'}`}>
                  +1 to two stats
                </button>
              </div>

              {/* Stat selection grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as StatName[]).map((stat) => {
                  const val = character.stats[stat];
                  const isMaxed = val >= 20;
                  const isSelected1 = asiStat1 === stat;
                  const isSelected2 = asiStat2 === stat;
                  const wouldExceed = asiMode === 'single' ? val + 2 > 20 : val + 1 > 20;
                  return (
                    <button
                      key={stat}
                      disabled={isMaxed}
                      onClick={() => {
                        if (asiMode === 'single') {
                          setAsiStat1(stat);
                          setAsiStat2(null);
                        } else {
                          if (!isSelected1 && !isSelected2) {
                            if (asiStat1 === stat) return;
                            if (!asiStat2) setAsiStat2(stat);
                            else setAsiStat1(stat);
                          } else if (isSelected1) {
                            setAsiStat1(asiStat2 || stat);
                            setAsiStat2(null);
                          } else {
                            setAsiStat2(null);
                          }
                        }
                      }}
                      className={`px-3 py-3 rounded-lg border text-center transition-all ${isMaxed ? 'opacity-30 cursor-not-allowed bg-slate-800 border-slate-700' : isSelected1 || isSelected2 ? 'bg-amber-900/50 border-amber-500/70 text-amber-200 ring-1 ring-amber-500/30' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'}`}
                    >
                      <div className="text-xs font-bold">{stat}</div>
                      <div className="text-lg font-bold">{val}</div>
                      <div className="text-[9px] text-slate-500">
                        {isMaxed ? 'MAX' : wouldExceed && asiMode === 'single' ? 'Cap 20' : isSelected1 && asiMode === 'single' ? `\u2192 ${Math.min(20, val + 2)}` : isSelected1 || isSelected2 ? `\u2192 ${Math.min(20, val + 1)}` : `mod ${val >= 10 ? '+' : ''}${Math.floor((val - 10) / 2)}`}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Confirm ASI */}
              <button
                disabled={asiMode === 'split' && (!asiStat2 || asiStat1 === asiStat2)}
                onClick={handleApplyASI}
                className="w-full py-2.5 bg-amber-700/60 hover:bg-amber-700/80 border border-amber-600/60 text-amber-200 text-sm font-bold rounded-xl transition-all disabled:opacity-30"
              >
                {asiMode === 'single' ? `Apply +2 ${asiStat1}` : asiStat2 ? `Apply +1 ${asiStat1}, +1 ${asiStat2}` : 'Select a second stat'}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-400 mb-3">Choose a feat instead of an ability score improvement:</p>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {FEATS.filter((f) => !(character.feats || []).includes(f.id)).map((feat) => (
                  <button
                    key={feat.id}
                    onClick={() => handleSelectFeat(feat.id)}
                    className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-purple-900/30 border border-slate-700 hover:border-purple-600/50 rounded-xl transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-purple-300">{feat.name}</span>
                      <div className="flex gap-1.5">
                        {feat.statBonuses && Object.entries(feat.statBonuses).map(([s, v]) => (
                          <span key={s} className="text-[9px] px-1.5 py-0.5 bg-amber-900/40 text-amber-300 rounded-full">+{v} {s}</span>
                        ))}
                        {feat.maxHpPerLevel && <span className="text-[9px] px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded-full">+{feat.maxHpPerLevel} HP/lv</span>}
                        {feat.damageBonus && <span className="text-[9px] px-1.5 py-0.5 bg-orange-900/40 text-orange-300 rounded-full">+{feat.damageBonus} dmg</span>}
                        {feat.initiativeBonus && <span className="text-[9px] px-1.5 py-0.5 bg-yellow-900/40 text-yellow-300 rounded-full">+{feat.initiativeBonus} init</span>}
                        {feat.attackBonus && <span className="text-[9px] px-1.5 py-0.5 bg-blue-900/40 text-blue-300 rounded-full">+{feat.attackBonus} atk</span>}
                        {feat.savingThrowBonus && <span className="text-[9px] px-1.5 py-0.5 bg-green-900/40 text-green-300 rounded-full">+{feat.savingThrowBonus} saves</span>}
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400">{feat.description}</p>
                  </button>
                ))}
                {FEATS.filter((f) => !(character.feats || []).includes(f.id)).length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-4">All feats already taken!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
