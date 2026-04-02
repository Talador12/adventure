// Deity/patron system — divine/otherworldly relationships with boons and demands.
// Clerics, warlocks, and paladins gain benefits but must fulfill requirements.

export type PatronType = 'deity' | 'archfey' | 'fiend' | 'great_old_one' | 'celestial';

export interface Patron {
  id: string;
  name: string;
  type: PatronType;
  domain: string;
  emoji: string;
  description: string;
  boons: PatronBoon[];
  demands: string[];
  displeasurePenalties: string[];
}

export interface PatronBoon {
  name: string;
  description: string;
  mechanicalEffect: string;
}

export const PATRONS: Patron[] = [
  {
    id: 'bahamut', name: 'Bahamut', type: 'deity', domain: 'Justice, Protection', emoji: '🐉',
    description: 'The Platinum Dragon, god of justice and metallic dragons.',
    boons: [
      { name: 'Dragon\'s Courage', description: 'Fear cannot take hold.', mechanicalEffect: 'Advantage on saves vs Frightened' },
      { name: 'Platinum Shield', description: 'A shimmer of platinum light.', mechanicalEffect: '+1 AC for 1 hour (1/long rest)' },
    ],
    demands: ['Protect the innocent', 'Never flee from evil', 'Show mercy to the repentant'],
    displeasurePenalties: ['Healing spells heal 1 less per die', 'Channel Divinity fails on a 1-2'],
  },
  {
    id: 'lolth', name: 'Lolth', type: 'deity', domain: 'Darkness, Spiders, Chaos', emoji: '🕷️',
    description: 'The Spider Queen, goddess of drow and treachery.',
    boons: [
      { name: 'Web of Lies', description: 'Deception is your nature.', mechanicalEffect: 'Advantage on Deception checks' },
      { name: 'Spider Climb', description: 'Walk on walls for 10 minutes.', mechanicalEffect: 'Spider Climb (1/long rest)' },
    ],
    demands: ['Sow chaos among surface-dwellers', 'Eliminate rivals for power', 'Never show weakness'],
    displeasurePenalties: ['Disadvantage on saves vs poison', 'Spiders avoid you — no spider allies'],
  },
  {
    id: 'titania', name: 'Titania', type: 'archfey', domain: 'Summer, Growth, Beauty', emoji: '🌸',
    description: 'Queen of the Summer Court, patron of beauty and warmth.',
    boons: [
      { name: 'Summer\'s Warmth', description: 'Cold cannot harm you.', mechanicalEffect: 'Resistance to cold damage' },
      { name: 'Fey Charm', description: 'A touch of fey glamour.', mechanicalEffect: '+2 to Persuasion checks' },
    ],
    demands: ['Protect natural beauty', 'Never destroy a garden', 'Bring joy to the sorrowful'],
    displeasurePenalties: ['Flowers wilt in your presence', 'Fey creatures become hostile'],
  },
  {
    id: 'asmodeus', name: 'Asmodeus', type: 'fiend', domain: 'Tyranny, Contracts, Fire', emoji: '😈',
    description: 'Lord of the Nine Hells, the ultimate dealmaker.',
    boons: [
      { name: 'Hellfire', description: 'Your fire burns hotter.', mechanicalEffect: '+1d6 fire damage on spell attacks (1/short rest)' },
      { name: 'Silver Tongue', description: 'Every word carries weight.', mechanicalEffect: 'Advantage on Intimidation checks' },
    ],
    demands: ['Honor contracts to the letter', 'Acquire power over others', 'Never break your sworn word'],
    displeasurePenalties: ['Fire spells deal half damage', 'Devils refuse to answer your summons'],
  },
  {
    id: 'hadar', name: 'Hadar', type: 'great_old_one', domain: 'Hunger, Darkness, Stars', emoji: '🌑',
    description: 'The Dark Hunger, a dying star that consumes all light.',
    boons: [
      { name: 'Hungering Void', description: 'Darkness bends to your will.', mechanicalEffect: 'Darkvision 120ft, see in magical darkness' },
      { name: 'Whispers of the Void', description: 'Alien thoughts protect you.', mechanicalEffect: 'Advantage on saves vs psychic damage' },
    ],
    demands: ['Spread darkness (literally and figuratively)', 'Feed the hunger — destroy something beautiful', 'Never refuse forbidden knowledge'],
    displeasurePenalties: ['Nightmares prevent long rest benefits', 'Shadows attack you — 1d6 psychic per dawn'],
  },
  {
    id: 'unicorn', name: 'The Empyrean Steed', type: 'celestial', domain: 'Healing, Purity, Light', emoji: '🦄',
    description: 'A celestial unicorn of immense power, patron of healers.',
    boons: [
      { name: 'Pure Heart', description: 'Evil recoils from you.', mechanicalEffect: 'Undead have disadvantage on attacks vs you' },
      { name: 'Healing Touch', description: 'Your healing is empowered.', mechanicalEffect: '+2 HP per healing spell die' },
    ],
    demands: ['Heal the wounded', 'Purify corruption', 'Never raise the dead against their will'],
    displeasurePenalties: ['Healing spells heal minimum values', 'Undead are drawn to you'],
  },
];

export function getPatron(id: string): Patron | undefined { return PATRONS.find((p) => p.id === id); }
export function getPatronsByType(type: PatronType): Patron[] { return PATRONS.filter((p) => p.type === type); }

export function formatPatron(patron: Patron): string {
  const lines = [`${patron.emoji} **${patron.name}** (${patron.type.replace('_', ' ')} — ${patron.domain})`];
  lines.push(`*${patron.description}*`);
  lines.push('**Boons:**');
  for (const b of patron.boons) lines.push(`  • **${b.name}**: ${b.description} (${b.mechanicalEffect})`);
  lines.push(`**Demands:** ${patron.demands.join('; ')}`);
  lines.push(`**Displeasure:** ${patron.displeasurePenalties.join('; ')}`);
  return lines.join('\n');
}
