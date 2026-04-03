// Surprise round detector — stealth vs perception to determine surprise at combat start.
// Compares each side's stealth rolls against the other side's passive perception.

export interface SurpriseUnit {
  id: string;
  name: string;
  isPlayer: boolean;
  stealthMod: number;
  passivePerception: number;
}

export interface SurpriseResult {
  surprisedUnits: string[]; // unit IDs that are surprised
  stealthRolls: { unitId: string; name: string; roll: number; total: number }[];
  narration: string;
  anyonesSurprised: boolean;
}

export function rollSurprise(
  ambushers: SurpriseUnit[],
  targets: SurpriseUnit[],
  advantage: boolean = false,
): SurpriseResult {
  const stealthRolls: SurpriseResult['stealthRolls'] = [];
  const surprised: string[] = [];

  // Each ambusher rolls stealth
  for (const a of ambushers) {
    let roll = Math.floor(Math.random() * 20) + 1;
    if (advantage) roll = Math.max(roll, Math.floor(Math.random() * 20) + 1);
    stealthRolls.push({ unitId: a.id, name: a.name, roll, total: roll + a.stealthMod });
  }

  // Lowest stealth among ambushers determines if each target is surprised
  const lowestStealth = Math.min(...stealthRolls.map((r) => r.total));

  for (const t of targets) {
    if (lowestStealth > t.passivePerception) {
      surprised.push(t.id);
    }
  }

  // Build narration
  const surprisedNames = surprised.map((id) => targets.find((t) => t.id === id)?.name || id);
  let narration: string;
  if (surprised.length === targets.length) {
    narration = `💥 **Total surprise!** All targets are caught off guard! (Stealth ${lowestStealth} vs all perceptions)`;
  } else if (surprised.length > 0) {
    narration = `⚡ **Partial surprise!** ${surprisedNames.join(', ')} ${surprised.length === 1 ? 'is' : 'are'} surprised! (Stealth ${lowestStealth})`;
  } else {
    narration = `👀 **No surprise.** The targets spotted the ambush. (Stealth ${lowestStealth} vs passive perceptions)`;
  }

  return { surprisedUnits: surprised, stealthRolls, narration, anyonesSurprised: surprised.length > 0 };
}

export function calculatePassivePerception(wisdomMod: number, proficient: boolean, proficiencyBonus: number): number {
  return 10 + wisdomMod + (proficient ? proficiencyBonus : 0);
}

export function formatSurpriseResult(result: SurpriseResult): string {
  const lines = [result.narration];
  if (result.stealthRolls.length > 0) {
    lines.push('Stealth rolls: ' + result.stealthRolls.map((r) => `${r.name}: ${r.total} (${r.roll}+${r.total - r.roll})`).join(', '));
  }
  if (result.surprisedUnits.length > 0) {
    lines.push(`Surprised units skip their first turn. They can\'t take reactions until their turn ends.`);
  }
  return lines.join('\n');
}
