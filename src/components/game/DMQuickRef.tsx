// DMQuickRef — compact D&D 5e quick-reference panel for DMs.
// Common DCs, action types, condition effects at a glance.

import { useState } from 'react';

const SECTIONS = [
  {
    title: 'Difficulty Classes',
    rows: [
      ['Very Easy', '5'], ['Easy', '10'], ['Medium', '15'],
      ['Hard', '20'], ['Very Hard', '25'], ['Nearly Impossible', '30'],
    ],
  },
  {
    title: 'Actions in Combat',
    rows: [
      ['Attack', 'Melee or ranged attack roll'],
      ['Cast a Spell', 'Verbal/somatic/material, may use slot'],
      ['Dash', 'Double movement this turn'],
      ['Disengage', 'Movement doesn\'t provoke OA'],
      ['Dodge', '+2 AC, attacks have disadvantage'],
      ['Help', 'Give ally advantage on next check/attack'],
      ['Hide', 'Stealth check, unseen until you attack'],
      ['Ready', 'Hold action for a trigger (uses reaction)'],
      ['Use an Object', 'Interact with item, drink potion'],
    ],
  },
  {
    title: 'Cover',
    rows: [
      ['Half Cover', '+2 AC, +2 DEX saves'],
      ['Three-Quarters', '+5 AC, +5 DEX saves'],
      ['Total Cover', 'Can\'t be targeted directly'],
    ],
  },
  {
    title: 'Conditions Quick Ref',
    rows: [
      ['Blinded', 'Adv against, disadv on attacks'],
      ['Frightened', 'Disadv on checks/attacks near source'],
      ['Grappled', 'Speed 0'],
      ['Paralyzed', 'Auto-fail STR/DEX, crits within 5ft'],
      ['Poisoned', 'Disadv on attacks and checks'],
      ['Prone', 'Melee adv, ranged disadv against'],
      ['Stunned', 'Can\'t act, auto-fail STR/DEX'],
    ],
  },
  {
    title: 'Damage Types',
    rows: [
      ['Physical', 'Bludgeoning, Piercing, Slashing'],
      ['Elemental', 'Fire, Cold, Lightning, Acid, Thunder'],
      ['Magical', 'Force, Necrotic, Radiant, Psychic, Poison'],
    ],
  },
];

export default function DMQuickRef() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setVisible((v) => !v)}
        className="text-[9px] px-2 py-1 rounded bg-slate-800/60 border border-slate-700/40 text-slate-500 hover:text-[#F38020] font-semibold transition-all"
        title="DM Quick Reference — common DCs, actions, conditions"
      >
        Quick Ref
      </button>
      {visible && (
        <div className="fixed inset-0 z-[9997] flex items-center justify-center bg-black/50" onClick={() => setVisible(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#F38020]">DM Quick Reference</h3>
              <button onClick={() => setVisible(false)} className="text-slate-500 hover:text-slate-300 text-lg">&times;</button>
            </div>
            <div className="space-y-4">
              {SECTIONS.map((section) => (
                <div key={section.title}>
                  <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-1">{section.title}</h4>
                  <div className="space-y-0.5">
                    {section.rows.map(([label, value]) => (
                      <div key={label} className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-semibold text-slate-300 shrink-0">{label}</span>
                        <span className="text-[10px] text-slate-500 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
