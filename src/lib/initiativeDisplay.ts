// Combat initiative card display — formatted initiative order summary.

export interface InitiativeCard {
  name: string;
  initiative: number;
  hp: number;
  maxHp: number;
  ac: number;
  type: 'player' | 'enemy' | 'npc';
  conditions: string[];
  isCurrentTurn: boolean;
}

export function buildInitiativeCards(units: { name: string; initiative: number; hp: number; maxHp: number; ac: number; type: string; conditions?: { type: string }[]; isCurrentTurn?: boolean }[]): InitiativeCard[] {
  return units
    .map((u) => ({
      name: u.name, initiative: u.initiative, hp: u.hp, maxHp: u.maxHp, ac: u.ac,
      type: u.type as InitiativeCard['type'],
      conditions: u.conditions?.map((c) => c.type) || [],
      isCurrentTurn: u.isCurrentTurn || false,
    }))
    .sort((a, b) => b.initiative - a.initiative);
}

export function formatInitiativeCards(cards: InitiativeCard[]): string {
  if (cards.length === 0) return '📋 No units in initiative.';
  const lines = ['📋 **Initiative Order:**'];
  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    const hpPct = c.maxHp > 0 ? Math.round((c.hp / c.maxHp) * 100) : 0;
    const hpEmoji = c.hp <= 0 ? '💀' : hpPct > 50 ? '🟢' : hpPct > 25 ? '🟡' : '🔴';
    const typeEmoji = c.type === 'player' ? '🧙' : c.type === 'enemy' ? '👹' : '👤';
    const turn = c.isCurrentTurn ? '▶ ' : `${i + 1}. `;
    const condStr = c.conditions.length > 0 ? ` [${c.conditions.join(', ')}]` : '';
    lines.push(`${turn}${typeEmoji} **${c.name}** (Init ${c.initiative}) — ${hpEmoji} ${c.hp}/${c.maxHp} HP, AC ${c.ac}${condStr}`);
  }
  return lines.join('\n');
}

export function getNextInInitiative(cards: InitiativeCard[]): InitiativeCard | null {
  const currentIdx = cards.findIndex((c) => c.isCurrentTurn);
  if (currentIdx === -1) return cards[0] || null;
  const nextIdx = (currentIdx + 1) % cards.length;
  return cards[nextIdx] || null;
}
