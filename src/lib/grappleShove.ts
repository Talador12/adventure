// Grapple/shove resolver — contested Athletics check with size modifiers.

export type CreatureSize = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
export type GrappleAction = 'grapple' | 'shove_prone' | 'shove_away';

const SIZE_ORDER: CreatureSize[] = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];

export interface GrappleResult {
  action: GrappleAction;
  attackerName: string;
  defenderName: string;
  attackerRoll: number;
  defenderRoll: number;
  success: boolean;
  sizeBlocked: boolean;
  narration: string;
}

export function canGrapple(attackerSize: CreatureSize, defenderSize: CreatureSize): boolean {
  const atkIdx = SIZE_ORDER.indexOf(attackerSize);
  const defIdx = SIZE_ORDER.indexOf(defenderSize);
  return defIdx <= atkIdx + 1; // can only grapple creatures one size larger or smaller
}

export function resolveGrapple(
  action: GrappleAction,
  attackerName: string, attackerAthMod: number, attackerSize: CreatureSize,
  defenderName: string, defenderAthMod: number, defenderAcrMod: number, defenderSize: CreatureSize,
  defenderUsesAcrobatics: boolean = false,
): GrappleResult {
  if (!canGrapple(attackerSize, defenderSize)) {
    return { action, attackerName, defenderName, attackerRoll: 0, defenderRoll: 0, success: false, sizeBlocked: true, narration: `❌ ${attackerName} can't ${action} ${defenderName} — too large (${defenderSize} vs ${attackerSize}).` };
  }

  const attackerRoll = Math.floor(Math.random() * 20) + 1 + attackerAthMod;
  const defMod = defenderUsesAcrobatics ? defenderAcrMod : defenderAthMod;
  const defenderRoll = Math.floor(Math.random() * 20) + 1 + defMod;
  const success = attackerRoll >= defenderRoll;

  const actionText = action === 'grapple' ? 'grapples' : action === 'shove_prone' ? 'shoves prone' : 'shoves away';
  const effect = action === 'grapple' ? 'Target is grappled (speed 0).' : action === 'shove_prone' ? 'Target is prone.' : 'Target is pushed 5ft away.';

  const narration = success
    ? `✅ ${attackerName} ${actionText} ${defenderName}! (${attackerRoll} vs ${defenderRoll}) ${effect}`
    : `❌ ${defenderName} resists ${attackerName}'s ${action}! (${defenderRoll} vs ${attackerRoll})`;

  return { action, attackerName, defenderName, attackerRoll, defenderRoll, success, sizeBlocked: false, narration };
}

export function formatGrappleResult(result: GrappleResult): string { return result.narration; }

export function getEscapeDC(grappleAthletics: number): string {
  return `Escape: Athletics or Acrobatics vs grappler's Athletics (${grappleAthletics})`;
}
