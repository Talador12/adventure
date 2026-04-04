// Enchanted armor quirks — armor that has personality traits and opinions about combat.

export interface ArmorQuirk {
  armorName: string;
  armorType: string;
  acBonus: number;
  quirk: string;
  opinion: string;
  mechanicalConsequence: string;
  appeasement: string;
}

const QUIRKS: ArmorQuirk[] = [
  { armorName: 'The Perfectionist Plate', armorType: '+1 plate armor', acBonus: 19, quirk: 'Demands to be polished after every combat. Refuses to function at full capacity when dirty.', opinion: '"Do you know how long it took to achieve this luster? And you just roll in MUD?"', mechanicalConsequence: 'AC drops to 18 (loses +1) until polished (10 minutes + cloth).', appeasement: 'Polish it. Compliment its shine. It purrs (metallic vibration).' },
  { armorName: 'The Coward\'s Shield', armorType: '+2 shield', acBonus: 4, quirk: 'Tries to position itself between you and ALL threats. Over-protects.', opinion: '"BEHIND YOU! No wait, IN FRONT! EVERYWHERE! DANGER IS EVERYWHERE!"', mechanicalConsequence: '+2 AC but disadvantage on attacks (shield blocks your own sword arm sometimes).', appeasement: 'Say "I trust you" before combat. It calms down. Bonus lasts 1 hour.' },
  { armorName: 'Sir Reginald (chainmail)', armorType: '+1 chain mail', acBonus: 17, quirk: 'Believes it is a knight. Introduces itself. Expects to be addressed by title.', opinion: '"I am Sir Reginald Chainsworth III. You are merely the person inside me. Show respect."', mechanicalConsequence: 'If not addressed as Sir Reginald in public, AC drops to 16 for 24 hours (sulking).', appeasement: 'Introduce it to NPCs. Let it join conversations. It has surprisingly good insights.' },
  { armorName: 'The Pacifist Robe', armorType: 'Robe of Protection (+1 AC)', acBonus: 12, quirk: 'Disapproves of violence. Tightens uncomfortably when the wearer attacks.', opinion: '"Was that REALLY necessary? Could we not have TALKED to the goblin?"', mechanicalConsequence: 'After dealing a killing blow: -1 AC for 1 hour (the robe loosens in disapproval).', appeasement: 'Resolve one encounter per day peacefully. The robe flutters happily.' },
  { armorName: 'The Fashionista Leather', armorType: '+1 studded leather', acBonus: 13, quirk: 'Changes its color and style to match the social context. Refuses to look bad.', opinion: '"We are NOT going to the ball in THAT. I\'m rearranging my studs. Give me 10 minutes."', mechanicalConsequence: 'In high society: +1 CHA (looks perfect). In dungeons: normal. If forced to wear a cloak over it: -1 AC (offended).', appeasement: 'Let it choose the outfit. It has better taste than you. Accept this.' },
  { armorName: 'The Nostalgic Breastplate', armorType: '+1 breastplate', acBonus: 16, quirk: 'Belonged to a legendary hero. Tells stories about "the old days" telepathically.', opinion: '"Back in MY day, we didn\'t have healing potions. We just DIED and were grateful for the experience."', mechanicalConsequence: 'During long rests: the armor tells a 2-hour story. If the wearer listens: Inspiration. If they ignore it: -1 to initiative next day.', appeasement: 'Listen to the stories. Ask questions. The armor has incredible tactical knowledge buried in its nostalgia.' },
];

export function getRandomArmorQuirk(): ArmorQuirk {
  return QUIRKS[Math.floor(Math.random() * QUIRKS.length)];
}

export function getQuirksByArmorType(type: string): ArmorQuirk[] {
  return QUIRKS.filter((q) => q.armorType.toLowerCase().includes(type.toLowerCase()));
}

export function getQuirkCount(): number {
  return QUIRKS.length;
}

export function formatArmorQuirk(quirk: ArmorQuirk): string {
  const lines = [`🛡️ **${quirk.armorName}** *(${quirk.armorType}, AC ${quirk.acBonus})*`];
  lines.push(`  Quirk: ${quirk.quirk}`);
  lines.push(`  💬 *${quirk.opinion}*`);
  lines.push(`  ⚙️ Consequence: ${quirk.mechanicalConsequence}`);
  lines.push(`  💚 Appeasement: ${quirk.appeasement}`);
  return lines.join('\n');
}

export { QUIRKS as ARMOR_QUIRKS };
