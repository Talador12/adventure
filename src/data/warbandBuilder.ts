// Warband builder — persistent enemy factions with named leaders and rank structure.
// DM creates a warband; it persists across encounters with casualties tracked.

export type WarbandRank = 'leader' | 'lieutenant' | 'elite' | 'soldier' | 'minion';

export interface WarbandMember {
  id: string;
  name: string;
  rank: WarbandRank;
  hp: number;
  maxHp: number;
  ac: number;
  attackBonus: number;
  alive: boolean;
}

export interface Warband {
  id: string;
  name: string;
  faction: string;
  members: WarbandMember[];
  morale: number; // 0-100
  createdAt: number;
}

const RANK_CONFIG: Record<WarbandRank, { hpMult: number; acBonus: number; atkBonus: number }> = {
  leader: { hpMult: 3, acBonus: 4, atkBonus: 3 },
  lieutenant: { hpMult: 2, acBonus: 2, atkBonus: 2 },
  elite: { hpMult: 1.5, acBonus: 1, atkBonus: 1 },
  soldier: { hpMult: 1, acBonus: 0, atkBonus: 0 },
  minion: { hpMult: 0.3, acBonus: -1, atkBonus: -1 },
};

export function createWarband(name: string, faction: string, baseHp: number, baseAc: number, baseAtk: number, composition: Record<WarbandRank, { count: number; names?: string[] }>): Warband {
  const members: WarbandMember[] = [];
  for (const [rank, config] of Object.entries(composition)) {
    const r = rank as WarbandRank;
    const rc = RANK_CONFIG[r];
    for (let i = 0; i < config.count; i++) {
      const hp = Math.max(1, Math.round(baseHp * rc.hpMult));
      members.push({
        id: crypto.randomUUID(), name: config.names?.[i] || `${faction} ${r} ${i + 1}`,
        rank: r, hp, maxHp: hp, ac: baseAc + rc.acBonus, attackBonus: baseAtk + rc.atkBonus, alive: true,
      });
    }
  }
  return { id: crypto.randomUUID(), name, faction, members, morale: 100, createdAt: Date.now() };
}

export function getAliveCount(warband: Warband): number { return warband.members.filter((m) => m.alive).length; }
export function getTotalCount(warband: Warband): number { return warband.members.length; }
export function getLeader(warband: Warband): WarbandMember | undefined { return warband.members.find((m) => m.rank === 'leader' && m.alive); }

export function killMember(warband: Warband, memberId: string): Warband {
  const updated = { ...warband, members: warband.members.map((m) => m.id === memberId ? { ...m, alive: false, hp: 0 } : m) };
  const alive = getAliveCount(updated);
  const total = getTotalCount(updated);
  updated.morale = Math.round((alive / total) * 100);
  if (!getLeader(updated)) updated.morale = Math.max(0, updated.morale - 30); // leader dead = morale crash
  return updated;
}

export function formatWarband(wb: Warband): string {
  const alive = getAliveCount(wb);
  const total = getTotalCount(wb);
  const leader = getLeader(wb);
  const lines = [`⚔️ **${wb.name}** (${wb.faction}) — ${alive}/${total} alive, Morale: ${wb.morale}%`];
  if (leader) lines.push(`👑 Leader: **${leader.name}** (${leader.hp}/${leader.maxHp} HP, AC ${leader.ac})`);
  const ranks: WarbandRank[] = ['lieutenant', 'elite', 'soldier', 'minion'];
  for (const r of ranks) {
    const members = wb.members.filter((m) => m.rank === r);
    const aliveR = members.filter((m) => m.alive).length;
    if (members.length > 0) lines.push(`${r === 'lieutenant' ? '⭐' : r === 'elite' ? '🔷' : r === 'soldier' ? '🔹' : '◽'} ${r}: ${aliveR}/${members.length} alive`);
  }
  return lines.join('\n');
}
