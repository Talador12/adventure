// Random curse generator — minor curses for items and locations.

export interface GeneratedCurse {
  name: string;
  description: string;
  mechanicalEffect: string;
  trigger: string;
  removable: string;
  severity: 'minor' | 'moderate' | 'major';
}

const CURSES: GeneratedCurse[] = [
  { name: 'Curse of Clumsiness', description: 'You trip over nothing constantly.', mechanicalEffect: 'Disadvantage on DEX saves.', trigger: 'Touching the cursed item.', removable: 'Remove Curse or 24 hours.', severity: 'minor' },
  { name: 'Curse of Babbling', description: 'You speak in a random language each sentence.', mechanicalEffect: 'CHA checks auto-fail with non-speakers.', trigger: 'Reading the cursed text.', removable: 'Remove Curse.', severity: 'minor' },
  { name: 'Jinx of Bad Luck', description: 'Things just... go wrong.', mechanicalEffect: 'Nat 1 range becomes 1-2.', trigger: 'Opening the cursed container.', removable: 'Remove Curse or perform a good deed.', severity: 'moderate' },
  { name: 'Curse of Hunger', description: 'No matter how much you eat, you\'re ravenous.', mechanicalEffect: 'Must eat 3× normal rations or gain exhaustion.', trigger: 'Eating cursed food.', removable: 'Greater Restoration.', severity: 'moderate' },
  { name: 'Curse of Attraction', description: 'Monsters are drawn to you.', mechanicalEffect: 'Random encounter chance doubles.', trigger: 'Wearing the cursed jewelry.', removable: 'Remove Curse (DC 15 check).', severity: 'moderate' },
  { name: 'Haunted Dreams', description: 'Nightmares plague every rest.', mechanicalEffect: 'Long rests only recover half hit dice.', trigger: 'Entering the cursed location.', removable: 'Destroy the source or Remove Curse.', severity: 'minor' },
  { name: 'Curse of Truthfulness', description: 'You cannot tell a lie.', mechanicalEffect: 'Deception checks auto-fail. Zone of Truth permanent.', trigger: 'Swearing the cursed oath.', removable: 'Break the oath or Remove Curse.', severity: 'minor' },
  { name: 'Mark of the Beast', description: 'Animals flee from you in terror.', mechanicalEffect: 'Animal Handling auto-fail. Mounts refuse you.', trigger: 'Killing a sacred animal.', removable: 'Atonement at a druid grove.', severity: 'moderate' },
  { name: 'Shadow Curse', description: 'Your shadow acts independently.', mechanicalEffect: '-2 Stealth. Shadow occasionally reveals your hiding spot.', trigger: 'Standing in cursed moonlight.', removable: 'Daylight spell or Remove Curse.', severity: 'minor' },
  { name: 'Curse of Aging', description: 'You age 1d10 years each dawn.', mechanicalEffect: 'Cumulative aging. At 80+ years: -1 STR/DEX/CON.', trigger: 'Opening the cursed sarcophagus.', removable: 'Greater Restoration reverses all aging.', severity: 'major' },
];

export function generateCurse(): GeneratedCurse { return CURSES[Math.floor(Math.random() * CURSES.length)]; }
export function getCursesBySeverity(severity: GeneratedCurse['severity']): GeneratedCurse[] { return CURSES.filter((c) => c.severity === severity); }

export function formatCurse(curse: GeneratedCurse): string {
  const icon = curse.severity === 'major' ? '💀' : curse.severity === 'moderate' ? '⚠️' : '😈';
  const lines = [`${icon} **${curse.name}** (${curse.severity})`];
  lines.push(`*${curse.description}*`);
  lines.push(`Effect: ${curse.mechanicalEffect}`);
  lines.push(`Trigger: ${curse.trigger}`);
  lines.push(`Removal: ${curse.removable}`);
  return lines.join('\n');
}
