// Magical duel etiquette — formal arcane combat with rules, seconds, and consequences.

export type DuelType = 'honor' | 'academic' | 'blood' | 'arcane_trial';

export interface DuelRule { rule: string; penalty: string; }

export interface MagicalDuelFormat {
  type: DuelType;
  name: string;
  description: string;
  rules: DuelRule[];
  secondsRequired: boolean;
  spellLevelCap: number | null;
  victoryCondition: string;
  defeatConsequence: string;
  refusalConsequence: string;
  spectatorEffect: string;
}

const FORMATS: MagicalDuelFormat[] = [
  { type: 'honor', name: 'The Gentleman\'s Exchange', description: 'A formal duel between two mages. Proper etiquette. Proper bowing. Proper fireballs.', rules: [
    { rule: 'Both duelists bow before beginning.', penalty: 'Attacking before the bow: disadvantage on all spells for the first round.' },
    { rule: 'No summoned creatures or allies may interfere.', penalty: 'Interference disqualifies the summoner. Automatic loss.' },
    { rule: 'First to yield or drop to 0 HP loses. Killing is discouraged.', penalty: 'Killing your opponent: you win the duel but face murder charges.' },
  ], secondsRequired: true, spellLevelCap: null, victoryCondition: 'Opponent yields, drops to 0 HP, or is incapacitated.', defeatConsequence: 'Loss of face. -2 to CHA checks with anyone who witnessed it for 1 month.', refusalConsequence: 'Branded a coward. -2 CHA permanently in this social circle until you accept a future challenge.', spectatorEffect: 'The crowd gasps at impressive spells. Nat 20s get standing ovations.' },
  { type: 'academic', name: 'The Thesis Defense', description: 'An arcane university tradition. Prove your magical theory through combat application.', rules: [
    { rule: 'Only spells from your declared school of magic.', penalty: 'Using an off-school spell: forfeit the round.' },
    { rule: 'Style points matter. The audience votes on creativity.', penalty: 'Using the same spell twice: -1 to audience score each repetition.' },
    { rule: 'Non-lethal damage only.', penalty: 'Lethal force: expulsion from the university.' },
  ], secondsRequired: false, spellLevelCap: 3, victoryCondition: 'Higher audience score after 5 rounds. Judged on creativity, power, and defense.', defeatConsequence: 'Your thesis is rejected. Must resubmit next semester. Embarrassing but not fatal.', refusalConsequence: 'Automatic failure of the course. Can retake next year.', spectatorEffect: 'Faculty judges take notes. Students cheer favorites. Betting is technically prohibited (everyone bets).' },
  { type: 'blood', name: 'The Crimson Circle', description: 'An illegal underground magical duel. No rules except: one enters, one leaves.', rules: [
    { rule: 'There are no rules.', penalty: 'N/A — anything goes.' },
    { rule: 'The circle is warded. No one enters or leaves until it\'s over.', penalty: 'Attempting to escape: the ward deals 6d6 force damage.' },
    { rule: 'The crowd bets. The house takes 20%.', penalty: 'Refusing to fight after entering: the crowd becomes hostile.' },
  ], secondsRequired: false, spellLevelCap: null, victoryCondition: 'Opponent is dead or unconscious. No mercy rule.', defeatConsequence: 'Death. Or permanent disfigurement. Or both.', refusalConsequence: 'Loss of all bet money. The underground circuit brands you unreliable. No more invitations.', spectatorEffect: 'Blood-hungry crowd. They throw things. Sometimes helpful (potions). Sometimes harmful (daggers).' },
  { type: 'arcane_trial', name: 'The Arbiter\'s Verdict', description: 'A legal proceeding where guilt is determined through magical combat. The gods judge the victor righteous.', rules: [
    { rule: 'Both parties swear an oath of truth. Perjury is magically enforced.', penalty: 'Lying under oath: struck by divine lightning (4d6 radiant). Automatic loss.' },
    { rule: 'The accused fights the accuser (or their champion).', penalty: 'Using a champion costs 500gp and public respect.' },
    { rule: 'The trial ends when one party can no longer fight.', penalty: 'Fleeing = admission of guilt.' },
  ], secondsRequired: true, spellLevelCap: 5, victoryCondition: 'Defeat your opponent. Divine magic ensures the "righteous" party has advantage on one save per round.', defeatConsequence: 'Legally guilty. Sentenced as the crime demands. No appeal.', refusalConsequence: 'Automatic guilty verdict. Maximum sentence.', spectatorEffect: 'The crowd is solemn. This is justice, not entertainment. But people still pick sides.' },
];

export function getDuelFormat(type: DuelType): MagicalDuelFormat | undefined {
  return FORMATS.find((f) => f.type === type);
}

export function getFormatsWithCap(): MagicalDuelFormat[] {
  return FORMATS.filter((f) => f.spellLevelCap !== null);
}

export function getAllDuelTypes(): DuelType[] {
  return FORMATS.map((f) => f.type);
}

export function formatDuelFormat(format: MagicalDuelFormat): string {
  const icon = { honor: '🎩', academic: '🎓', blood: '🩸', arcane_trial: '⚖️' }[format.type];
  const lines = [`${icon} **${format.name}** *(${format.type.replace(/_/g, ' ')})*`];
  lines.push(`  *${format.description}*`);
  format.rules.forEach((r) => lines.push(`  📜 ${r.rule} — Penalty: ${r.penalty}`));
  lines.push(`  🏆 Victory: ${format.victoryCondition}`);
  lines.push(`  💀 Defeat: ${format.defeatConsequence}`);
  return lines.join('\n');
}

export { FORMATS as DUEL_FORMATS };
