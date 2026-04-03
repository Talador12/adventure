// Skill contest resolver — opposed checks with advantage/disadvantage.

export interface ContestResult {
  initiatorName: string;
  responderName: string;
  initiatorSkill: string;
  responderSkill: string;
  initiatorRoll: number;
  responderRoll: number;
  initiatorTotal: number;
  responderTotal: number;
  winner: 'initiator' | 'responder' | 'tie';
  narration: string;
}

export function resolveContest(
  initiatorName: string, initiatorSkill: string, initiatorMod: number, initiatorAdvantage: boolean,
  responderName: string, responderSkill: string, responderMod: number, responderAdvantage: boolean,
): ContestResult {
  const roll = (adv: boolean) => {
    const r1 = Math.floor(Math.random() * 20) + 1;
    const r2 = Math.floor(Math.random() * 20) + 1;
    return adv ? Math.max(r1, r2) : r1;
  };
  const iRoll = roll(initiatorAdvantage);
  const rRoll = roll(responderAdvantage);
  const iTotal = iRoll + initiatorMod;
  const rTotal = rRoll + responderMod;
  const winner = iTotal > rTotal ? 'initiator' : rTotal > iTotal ? 'responder' : 'tie';
  const winnerName = winner === 'initiator' ? initiatorName : winner === 'responder' ? responderName : 'Neither';

  return {
    initiatorName, responderName, initiatorSkill, responderSkill,
    initiatorRoll: iRoll, responderRoll: rRoll, initiatorTotal: iTotal, responderTotal: rTotal,
    winner,
    narration: `⚔️ **Contest:** ${initiatorName} (${initiatorSkill}: ${iTotal}) vs ${responderName} (${responderSkill}: ${rTotal}) — **${winnerName} wins!**`,
  };
}

export function formatContestResult(result: ContestResult): string { return result.narration; }
