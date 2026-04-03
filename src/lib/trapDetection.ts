// Trap detection helper — passive/active checks against trap DCs.

export interface TrapCheckResult {
  characterName: string;
  passivePerception: number;
  trapDetectionDC: number;
  detected: boolean;
  method: 'passive' | 'active';
  activeRoll?: number;
  narration: string;
}

export function checkTrapPassive(characterName: string, passivePerception: number, trapDC: number): TrapCheckResult {
  const detected = passivePerception >= trapDC;
  return {
    characterName, passivePerception, trapDetectionDC: trapDC, detected, method: 'passive',
    narration: detected
      ? `👁️ **${characterName}** notices something odd! (Passive ${passivePerception} ≥ DC ${trapDC})`
      : `${characterName} doesn't notice anything. (Passive ${passivePerception} < DC ${trapDC})`,
  };
}

export function checkTrapActive(characterName: string, perceptionMod: number, trapDC: number, advantage: boolean = false): TrapCheckResult {
  const r1 = Math.floor(Math.random() * 20) + 1;
  const r2 = Math.floor(Math.random() * 20) + 1;
  const roll = advantage ? Math.max(r1, r2) : r1;
  const total = roll + perceptionMod;
  const detected = total >= trapDC;
  return {
    characterName, passivePerception: 10 + perceptionMod, trapDetectionDC: trapDC, detected, method: 'active',
    activeRoll: total,
    narration: detected
      ? `🔍 **${characterName}** finds a trap! (Rolled ${total} ≥ DC ${trapDC})`
      : `🔍 **${characterName}** searches but finds nothing. (Rolled ${total} < DC ${trapDC})`,
  };
}

export function checkPartyPassive(party: { name: string; passivePerception: number }[], trapDC: number): { detected: boolean; detectedBy: string[]; narration: string } {
  const detectedBy: string[] = [];
  for (const p of party) { if (p.passivePerception >= trapDC) detectedBy.push(p.name); }
  return {
    detected: detectedBy.length > 0,
    detectedBy,
    narration: detectedBy.length > 0
      ? `👁️ **${detectedBy.join(', ')}** notice${detectedBy.length === 1 ? 's' : ''} something suspicious! (DC ${trapDC})`
      : `No one notices the trap. (DC ${trapDC} vs party passives)`,
  };
}
