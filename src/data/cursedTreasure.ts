// Random cursed treasure hoard — treasure that fights back when you take it.

export type CurseActivation = 'on_touch' | 'on_removal' | 'delayed' | 'proximity' | 'greed_scaled';

export interface CursedTreasureItem { name: string; apparentValue: number; curseActivation: CurseActivation; curseEffect: string; saveDC: number; breakCurse: string; }

export interface CursedTreasureHoard {
  name: string;
  description: string;
  totalApparentValue: number;
  items: CursedTreasureItem[];
  hoardGuardian: string | null;
  environmentalCurse: string;
  warningSign: string;
  greedTrap: string;
}

const HOARDS: CursedTreasureHoard[] = [
  { name: 'The Miser\'s Legacy', description: 'A dead merchant\'s vault. Gold piled to the ceiling. The merchant loved gold more than life. Literally.', totalApparentValue: 5000, items: [
    { name: 'Gold coins (thousands)', apparentValue: 3000, curseActivation: 'greed_scaled', curseEffect: 'For every 100gp taken, the taker ages 1 year. Taking it all = 30 years of aging.', saveDC: 15, breakCurse: 'Return the gold. Every last coin. The aging reverses.' },
    { name: 'Jeweled crown', apparentValue: 1500, curseActivation: 'on_touch', curseEffect: 'The crown fuses to your head. You hear the miser\'s voice. He wants his gold back. WIS DC 14 or compelled to hoard.', saveDC: 14, breakCurse: 'Remove Curse (5th level). Or give away everything you own. The miser respects that.' },
    { name: 'Ledger of debts', apparentValue: 500, curseActivation: 'on_removal', curseEffect: 'Everyone the miser was owed money from is now owed by YOU. Collectors arrive in 1d4 days.', saveDC: 0, breakCurse: 'Pay the debts (5,000gp total). Or destroy the ledger (the ghosts of debtors are freed).' },
  ], hoardGuardian: 'The miser\'s ghost. Doesn\'t attack — just follows you, weeping, counting every coin you take.', environmentalCurse: 'The vault gets smaller the more gold you carry. At 1000gp+ the exit narrows to 2ft.', warningSign: 'An inscription: "ALL WHO ENTER LEAVE POORER THAN THEY ARRIVED."', greedTrap: 'A single perfect diamond sits on a pedestal. Taking it seals the vault for 24 hours. It\'s worth 10gp. The pedestal was the real treasure (it\'s a +2 shield).' },
  { name: 'The Dragon\'s Bitter End', description: 'A dead dragon\'s hoard. The dragon cursed it with its dying breath. If it can\'t have the gold, neither can you.', totalApparentValue: 15000, items: [
    { name: 'Melted gold mass', apparentValue: 5000, curseActivation: 'proximity', curseEffect: 'Gold within 30ft of the hoard slowly liquefies. Your gold. Your party\'s gold. All of it. 100gp/hour lost.', saveDC: 0, breakCurse: 'Dispel Magic (7th level) on the hoard. Or smelt and reforge all gold outside the 30ft zone.' },
    { name: 'Dragon scale armor (complete set)', apparentValue: 8000, curseActivation: 'delayed', curseEffect: 'Wearing it: AC 18 for 24 hours. Then: the armor constricts. 1d6 crushing per hour until removed (STR DC 16).', saveDC: 16, breakCurse: 'A smith who knows draconic can remove the curse by inscribing the dragon\'s true name into the scales.' },
    { name: 'Dragonfire gems (12)', apparentValue: 2000, curseActivation: 'on_touch', curseEffect: 'Each gem is warm. Holding one: CON DC 13 or 1d6 fire. They get hotter the more you carry. All 12 = 12d6 fire.', saveDC: 13, breakCurse: 'Submerge in ice water blessed by a frost cleric. The fire dies. The gems become safe (and still valuable).' },
  ], hoardGuardian: null, environmentalCurse: 'The cave heats up as gold is removed. 10°F per 1000gp. At 5000gp removed: everything is on fire.', warningSign: 'Claw marks spelling "MINE FOREVER" in the cave wall. In every language.', greedTrap: 'The biggest gem (1000gp) is the dragon\'s solidified heart. Taking it: the dragon reforms around it in 1d4 hours. Congratulations, you resurrected a dragon.' },
];

export function getRandomHoard(): CursedTreasureHoard {
  return HOARDS[Math.floor(Math.random() * HOARDS.length)];
}

export function getItemCount(hoard: CursedTreasureHoard): number {
  return hoard.items.length;
}

export function getItemsByActivation(hoard: CursedTreasureHoard, activation: CurseActivation): CursedTreasureItem[] {
  return hoard.items.filter((i) => i.curseActivation === activation);
}

export function formatHoard(hoard: CursedTreasureHoard): string {
  const lines = [`💰 **${hoard.name}** *(apparent value: ${hoard.totalApparentValue}gp)*`];
  lines.push(`  *${hoard.description}*`);
  lines.push(`  ⚠️ Warning: ${hoard.warningSign}`);
  hoard.items.forEach((i) => lines.push(`  💎 ${i.name} (${i.apparentValue}gp) — Curse: ${i.curseEffect.substring(0, 60)}...`));
  lines.push(`  🪤 Greed trap: ${hoard.greedTrap}`);
  return lines.join('\n');
}

export { HOARDS as CURSED_TREASURE_HOARDS };
