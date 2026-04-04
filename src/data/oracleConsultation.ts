// Random oracle consultation — cryptic answers to player questions with interpretation DCs.

export type OracleType = 'blind_seer' | 'bone_reader' | 'star_gazer' | 'spirit_medium' | 'card_reader' | 'dream_weaver';

export interface OracleAnswer { crypticResponse: string; trueInterpretation: string; interpretationDC: number; misleadingInterpretation: string; }

export interface OracleConsultation {
  oracleType: OracleType;
  name: string;
  setting: string;
  consultationCost: string;
  answers: OracleAnswer[];
  quirk: string;
  trustworthiness: number; // 1-10
  hiddenAgenda: string | null;
}

const ORACLES: OracleConsultation[] = [
  { oracleType: 'blind_seer', name: 'The Eyeless Mother', setting: 'A cave behind a waterfall. Candles that burn without melting.', consultationCost: 'A secret you\'ve never told anyone.', answers: [
    { crypticResponse: '"The path forks where the crow sits. Choose the branch that bleeds."', trueInterpretation: 'At the next crossroads, take the path marked with red berries (bloodberries). It\'s the safe route.', interpretationDC: 14, misleadingInterpretation: 'Something will bleed at the crossroads — prepare for combat.' },
    { crypticResponse: '"Three keys. Three doors. The fourth key is your own hand."', trueInterpretation: 'The dungeon has 3 locked doors. The final door opens with a handprint (no key needed).', interpretationDC: 13, misleadingInterpretation: 'You need to find 4 keys somewhere in the dungeon.' },
    { crypticResponse: '"Trust the one who lies. Doubt the one who doesn\'t."', trueInterpretation: 'The NPC who seems dishonest is actually protecting you. The "honest" one is the betrayer.', interpretationDC: 16, misleadingInterpretation: 'Everyone is lying. Trust no one.' },
  ], quirk: 'Laughs at inappropriate moments. Cries during happy predictions. Her emotions are inverted.', trustworthiness: 8, hiddenAgenda: null },
  { oracleType: 'card_reader', name: 'Zephyr the Magnificent', setting: 'A purple tent in the market. Smells of incense and mild fraud.', consultationCost: '10gp (negotiable to 5gp with Persuasion DC 11).', answers: [
    { crypticResponse: '"The Tower card. Destruction. But also: rebuilding. Something old must fall."', trueInterpretation: 'A structure (literal or political) will collapse. The party can\'t prevent it but can shape what replaces it.', interpretationDC: 12, misleadingInterpretation: 'A tower will literally fall on you. Avoid tall buildings.' },
    { crypticResponse: '"The Lovers. Reversed. A choice between duty and desire."', trueInterpretation: 'A party member will face a personal dilemma that conflicts with the quest.', interpretationDC: 11, misleadingInterpretation: 'Romance subplot incoming. Brush your hair.' },
  ], quirk: 'Shuffles cards constantly. Even during conversation. Even while eating.', trustworthiness: 5, hiddenAgenda: 'Works for the thieves guild as an information broker. Sells your questions to interested parties.' },
  { oracleType: 'spirit_medium', name: 'Whisper Jack', setting: 'A séance room above a funeral parlor. The dead are close here.', consultationCost: 'A personal item belonging to the dead person you wish to contact.', answers: [
    { crypticResponse: '*speaks in the dead person\'s voice* "I forgive you. Now forgive yourself."', trueInterpretation: 'The dead person harbors no grudge. The guilt is self-inflicted and can be released.', interpretationDC: 10, misleadingInterpretation: 'The dead person needs something done before they can rest.' },
    { crypticResponse: '*the candles go out* "...they\'re standing right behind you." *long pause* "Just kidding. But seriously, don\'t go north."', trueInterpretation: 'The northern route is genuinely dangerous. The dead person is trying to help with dark humor.', interpretationDC: 12, misleadingInterpretation: 'Something is haunting you. It came from the north.' },
  ], quirk: 'The dead speak THROUGH him. His face contorts to match theirs. It\'s deeply unsettling.', trustworthiness: 7, hiddenAgenda: null },
  { oracleType: 'star_gazer', name: 'Professor Astrid Nighthollow', setting: 'An observatory tower. Brass telescopes pointed at stars that aren\'t on any chart.', consultationCost: 'A star map or astronomical observation you\'ve made personally.', answers: [
    { crypticResponse: '"Mars is in retrograde with the Seventh House. Which means absolutely nothing, but the REAL alignment happens Tuesday."', trueInterpretation: 'Something significant happens in 3 days (Tuesday). The stars confirm it. Prepare.', interpretationDC: 13, misleadingInterpretation: 'Astrology is fake and this was a waste of money.' },
    { crypticResponse: '"The constellation of the Sword is rising. War is coming. But the Shield constellation follows. So does peace."', trueInterpretation: 'A conflict will occur but will be resolved. The party\'s actions determine how quickly.', interpretationDC: 14, misleadingInterpretation: 'A literal sword and shield are important artifacts to find.' },
  ], quirk: 'Speaks in hypotheticals. "IF the stars are correct..." "ASSUMING the universe isn\'t lying..."', trustworthiness: 9, hiddenAgenda: null },
];

export function getRandomOracle(): OracleConsultation {
  return ORACLES[Math.floor(Math.random() * ORACLES.length)];
}

export function getOracleByType(type: OracleType): OracleConsultation | undefined {
  return ORACLES.find((o) => o.oracleType === type);
}

export function getTrustworthy(minTrust: number): OracleConsultation[] {
  return ORACLES.filter((o) => o.trustworthiness >= minTrust);
}

export function getOraclesWithAgendas(): OracleConsultation[] {
  return ORACLES.filter((o) => o.hiddenAgenda !== null);
}

export function getAllOracleTypes(): OracleType[] {
  return [...new Set(ORACLES.map((o) => o.oracleType))];
}

export function formatOracle(oracle: OracleConsultation): string {
  const icon = { blind_seer: '👁️', bone_reader: '🦴', star_gazer: '⭐', spirit_medium: '👻', card_reader: '🃏', dream_weaver: '💤' }[oracle.oracleType];
  const lines = [`${icon} **${oracle.name}** *(${oracle.oracleType.replace(/_/g, ' ')}, trust ${oracle.trustworthiness}/10)*`];
  lines.push(`  Setting: ${oracle.setting}`);
  lines.push(`  Cost: ${oracle.consultationCost}`);
  lines.push(`  Quirk: ${oracle.quirk}`);
  lines.push(`  Answers: ${oracle.answers.length} prepared responses`);
  return lines.join('\n');
}

export { ORACLES };
