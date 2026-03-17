// DowntimeActivities — between-adventure activities: crafting, research, carousing, gambling.
// Each activity takes time, costs gold, and has random outcomes based on ability checks.
// D&D 5e Xanathar's Guide inspired. Shown in DMSidebar when out of combat.
import { useState, useCallback } from 'react';

interface DowntimeProps {
  characterName: string;
  characterClass: string;
  characterLevel: number;
  gold: number;
  stats: Record<string, number>;
  onGoldChange: (delta: number) => void;
  onResult: (message: string) => void;
  onXP?: (xp: number) => void;
}

interface ActivityDef {
  id: string;
  name: string;
  icon: string;
  description: string;
  cost: number;        // gold cost
  stat: string;        // ability check stat
  dc: number;          // difficulty class
  color: string;
  outcomes: { success: string; failure: string; crit: string };
  rewards: { success: { gold?: number; xp?: number }; crit: { gold?: number; xp?: number } };
}

const ACTIVITIES: ActivityDef[] = [
  {
    id: 'craft', name: 'Crafting', icon: '🔨', description: 'Spend time crafting an item, potion, or tool.',
    cost: 25, stat: 'INT', dc: 12, color: 'text-sky-400',
    outcomes: {
      success: '{name} successfully crafts a fine piece of work — gaining {gold}g from selling the surplus.',
      failure: '{name} bungles the crafting and wastes materials. The gold is lost.',
      crit: '{name} produces a masterwork! The quality is exceptional — earning {gold}g and valuable experience.',
    },
    rewards: { success: { gold: 50 }, crit: { gold: 100, xp: 25 } },
  },
  {
    id: 'research', name: 'Research', icon: '📚', description: 'Study ancient texts, maps, or lore for knowledge.',
    cost: 10, stat: 'INT', dc: 13, color: 'text-indigo-400',
    outcomes: {
      success: '{name} uncovers a useful piece of lore — gaining insight and {xp} XP.',
      failure: '{name} finds nothing of value in the dusty tomes. Time wasted.',
      crit: '{name} discovers a rare scholarly breakthrough — a secret passage, a hidden weakness, or a forgotten spell! {xp} XP gained.',
    },
    rewards: { success: { xp: 30 }, crit: { xp: 75 } },
  },
  {
    id: 'carouse', name: 'Carousing', icon: '🍺', description: 'Hit the tavern, make friends, and gather rumors.',
    cost: 20, stat: 'CHA', dc: 11, color: 'text-amber-400',
    outcomes: {
      success: '{name} has a fantastic night out — makes a useful contact and earns {gold}g from a friendly wager.',
      failure: '{name} overindulges and wakes up in a ditch. The gold is gone and so is dignity.',
      crit: '{name} becomes the life of the party! A noble patron is impressed — {gold}g gift and {xp} XP from the connections made.',
    },
    rewards: { success: { gold: 30 }, crit: { gold: 75, xp: 20 } },
  },
  {
    id: 'gamble', name: 'Gambling', icon: '🎲', description: 'Risk gold at the gambling den. High risk, high reward.',
    cost: 50, stat: 'WIS', dc: 14, color: 'text-red-400',
    outcomes: {
      success: '{name} reads the table perfectly — walks away with {gold}g in winnings!',
      failure: '{name} loses it all to a sly halfling with loaded dice. The house always wins.',
      crit: '{name} cleans out the entire table! {gold}g won in a legendary streak. Songs will be sung.',
    },
    rewards: { success: { gold: 100 }, crit: { gold: 250 } },
  },
  {
    id: 'train', name: 'Training', icon: '⚔️', description: 'Spar with a master to sharpen combat skills.',
    cost: 30, stat: 'STR', dc: 13, color: 'text-red-400',
    outcomes: {
      success: '{name} completes a grueling training session — {xp} XP earned from the drills.',
      failure: '{name} gets knocked around by the instructor. A humbling experience.',
      crit: '{name} impresses the master with natural talent! {xp} XP and a new technique learned.',
    },
    rewards: { success: { xp: 40 }, crit: { xp: 80 } },
  },
  {
    id: 'pray', name: 'Meditation', icon: '🙏', description: 'Commune with your deity or meditate for inner peace.',
    cost: 0, stat: 'WIS', dc: 10, color: 'text-purple-400',
    outcomes: {
      success: '{name} finds inner peace — {xp} XP from spiritual growth.',
      failure: '{name} is too distracted. The mind wanders.',
      crit: '{name} receives a vision from the divine! {xp} XP and a sense of purpose renewed.',
    },
    rewards: { success: { xp: 20 }, crit: { xp: 50 } },
  },
];

function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

export default function DowntimeActivities({ characterName, characterClass, characterLevel, gold, stats, onGoldChange, onResult, onXP }: DowntimeProps) {
  const [lastResult, setLastResult] = useState<{ activity: string; outcome: string; success: boolean; roll: number } | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const performActivity = useCallback((activity: ActivityDef) => {
    if (cooldown) return;
    if (gold < activity.cost) {
      onResult(`Not enough gold! ${activity.name} costs ${activity.cost}g.`);
      return;
    }

    setCooldown(true);
    setTimeout(() => setCooldown(false), 2000);

    // Deduct cost
    if (activity.cost > 0) onGoldChange(-activity.cost);

    // Roll ability check
    const roll = rollD20();
    const statMod = Math.floor(((stats[activity.stat] || 10) - 10) / 2);
    const profBonus = Math.ceil(characterLevel / 4) + 1;
    const total = roll + statMod + profBonus;
    const isCrit = roll === 20;
    const isSuccess = isCrit || total >= activity.dc;

    let outcome: string;
    if (isCrit) {
      const rewards = activity.rewards.crit;
      outcome = activity.outcomes.crit
        .replace('{name}', characterName)
        .replace('{gold}', String(rewards.gold || 0))
        .replace('{xp}', String(rewards.xp || 0));
      if (rewards.gold) onGoldChange(rewards.gold);
      if (rewards.xp) onXP?.(rewards.xp);
    } else if (isSuccess) {
      const rewards = activity.rewards.success;
      outcome = activity.outcomes.success
        .replace('{name}', characterName)
        .replace('{gold}', String(rewards.gold || 0))
        .replace('{xp}', String(rewards.xp || 0));
      if (rewards.gold) onGoldChange(rewards.gold);
      if (rewards.xp) onXP?.(rewards.xp);
    } else {
      outcome = activity.outcomes.failure.replace('{name}', characterName);
    }

    const rollStr = `(${activity.stat} check: ${roll}+${statMod + profBonus}=${total} vs DC ${activity.dc})`;
    const fullResult = `${outcome} ${rollStr}`;
    setLastResult({ activity: activity.name, outcome: fullResult, success: isSuccess, roll });
    onResult(fullResult);
  }, [gold, stats, characterName, characterLevel, onGoldChange, onResult, onXP, cooldown]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Downtime Activities</h4>
        <span className="text-[10px] text-yellow-500 font-mono">{gold}g</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {ACTIVITIES.map((act) => {
          const statMod = Math.floor(((stats[act.stat] || 10) - 10) / 2);
          const canAfford = gold >= act.cost;
          return (
            <button
              key={act.id}
              onClick={() => performActivity(act)}
              disabled={!canAfford || cooldown}
              className={`text-left p-2.5 rounded-lg border transition-all ${
                canAfford && !cooldown
                  ? 'border-slate-700 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
                  : 'border-slate-800 bg-slate-900/40 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm">{act.icon}</span>
                <span className={`text-[10px] font-semibold ${act.color}`}>{act.name}</span>
              </div>
              <p className="text-[9px] text-slate-500 leading-tight mb-1">{act.description}</p>
              <div className="flex items-center gap-2 text-[9px]">
                {act.cost > 0 && <span className="text-yellow-600">{act.cost}g</span>}
                <span className="text-slate-600">{act.stat} DC {act.dc}</span>
                <span className="text-slate-600">{statMod >= 0 ? '+' : ''}{statMod}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Last result */}
      {lastResult && (
        <div className={`p-2.5 rounded-lg border text-xs ${
          lastResult.success
            ? 'border-emerald-600/30 bg-emerald-950/20 text-emerald-200'
            : 'border-red-600/30 bg-red-950/20 text-red-200'
        }`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-wider">{lastResult.activity}</span>
            <span className={`text-[9px] font-bold ${lastResult.roll === 20 ? 'text-yellow-400' : lastResult.success ? 'text-emerald-400' : 'text-red-400'}`}>
              {lastResult.roll === 20 ? 'CRITICAL SUCCESS!' : lastResult.success ? 'SUCCESS' : 'FAILURE'}
            </span>
          </div>
          <p className="text-[10px] leading-relaxed">{lastResult.outcome}</p>
        </div>
      )}
    </div>
  );
}
