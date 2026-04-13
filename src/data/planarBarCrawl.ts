// Planar bar crawl — taverns across different planes with unique drinks, patrons, and dangers.

export type PlaneOrigin = 'material' | 'feywild' | 'shadowfell' | 'mechanus' | 'limbo' | 'nine_hells' | 'celestia' | 'astral';

export interface PlanarDrink {
  name: string;
  effect: string;
  saveDC: number;
  price: string; // may not be gold
  dangerLevel: number; // 1-5
}

export interface PlanarTavern {
  name: string;
  plane: PlaneOrigin;
  description: string;
  bartender: string;
  houseRule: string;
  drinks: PlanarDrink[];
  regularPatrons: string[];
  dangerousPatron: string;
  questHook: string;
}

const TAVERNS: PlanarTavern[] = [
  {
    name: 'The Blooming Goblet',
    plane: 'feywild',
    description: 'A tree that grew into the shape of a pub. The chairs are mushrooms. The floor is moss. Time passes differently here - you might leave 3 years later.',
    bartender: 'Pip, a pixie who stands on a stool on a stool on a stool. Very serious about cocktails. Will cry if you order ale.',
    houseRule: 'No iron. No lies. No saying "it was just a joke." Violators get turned into a decorative shrub for one hour.',
    drinks: [
      { name: 'Moonpetal Mead', effect: 'Advantage on Charisma checks for 1 hour, but you speak in rhyme', saveDC: 12, price: 'A secret you have never told anyone', dangerLevel: 2 },
      { name: 'Liquid Starlight', effect: 'See invisible creatures for 10 minutes, but your eyes glow bright silver', saveDC: 14, price: 'A childhood memory (you forget it)', dangerLevel: 3 },
      { name: 'The Giggle', effect: 'Uncontrollable laughter for 1 minute, then 1d4 temp HP', saveDC: 10, price: '1 gold and a compliment to the bartender', dangerLevel: 1 },
    ],
    regularPatrons: ['A satyr composing bad love poems to a dryad who is clearly not interested', 'Three sprites having a loud argument about whether mortals have souls or are just complicated furniture', 'An eladrin going through their seasonal change mid-drink, hair cycling through colors'],
    dangerousPatron: 'A redcap disguised as a gnome, nursing a drink and sizing up anyone wearing boots worth stealing.',
    questHook: 'Pip says the Blooming Goblet\'s heartwood is dying. Something in the Unseelie Court is poisoning the root system. If the tree dies, everyone inside gets ejected into random planes.',
  },
  {
    name: 'The Final Ledger',
    plane: 'nine_hells',
    description: 'A perfectly organized establishment in Dis. Leather booths, dim red lighting, contracts laminated on the tables. The drinks are excellent. The prices are worse.',
    bartender: 'Graznak, a bearded devil in a vest and bowtie. Impeccable service. Every transaction is a binding contract. Tips are non-refundable.',
    houseRule: 'All tabs must be settled before leaving. "Settled" can mean payment, trade, or indentured service. Read the fine print on the coasters.',
    drinks: [
      { name: 'Hellfire Whiskey', effect: 'Resistance to fire for 1 hour, but your breath deals 1 fire damage to anything within 5 ft when you speak', saveDC: 15, price: '50gp or 1 year off your lifespan (your choice)', dangerLevel: 4 },
      { name: 'Styx Water (purified)', effect: 'Forget the last 10 minutes. Sometimes useful.', saveDC: 16, price: '100gp', dangerLevel: 5 },
      { name: 'Devil\'s Advocate', effect: 'You can detect lies for 1 hour, but must speak the truth yourself', saveDC: 13, price: 'A favor, to be collected later', dangerLevel: 3 },
    ],
    regularPatrons: ['An imp taking meeting notes for a pit fiend who never shows up', 'A mortal lawyer reviewing a soul contract with a magnifying glass', 'Two chain devils comparing promotion portfolios'],
    dangerousPatron: 'An amnizu who lost a bet and is looking for someone to take their debt. Very persuasive. Very desperate.',
    questHook: 'Graznak wants out of his contract. He has been bartending for 4,000 years. He will give the party a powerful magic item if they can find a loophole in Asmodeus\'s standard employment agreement.',
  },
  {
    name: 'The Calculated Pour',
    plane: 'mechanus',
    description: 'A geometric pub where drinks are dispensed by clockwork arms at mathematically precise intervals. The coasters are gears. Happy hour is exactly 60 minutes.',
    bartender: 'Unit-7B (call it Seven), a modron who achieved sentience through exposure to alcohol fumes. Still processes drink orders as logic problems.',
    houseRule: 'No chaos. Drinks are served in order of arrival. Cutting in line results in ejection via spring-loaded floor panel. Appeals take 3-5 business days.',
    drinks: [
      { name: 'Precision Lager', effect: 'Advantage on Intelligence checks for 1 hour. Disadvantage on anything creative or spontaneous.', saveDC: 11, price: 'Exactly 2gp, 3sp, 7cp. Exact change required.', dangerLevel: 1 },
      { name: 'Probability Potion', effect: 'Your next attack roll or saving throw is replaced with exactly 10. No roll.', saveDC: 0, price: '15gp', dangerLevel: 2 },
      { name: 'Chaos Cocktail (illegal)', effect: 'Roll on the Wild Magic Surge table. Seven pretends not to see you order this.', saveDC: 15, price: '5gp, ordered by whispering', dangerLevel: 4 },
    ],
    regularPatrons: ['A pentadrone doing its taxes', 'A wizard who comes here to think because the predictability is soothing', 'A slaad in disguise, vibrating with discomfort but determined to understand "order"'],
    dangerousPatron: 'A rogue modron that has been hacking the clockwork drink dispensers to serve triple portions. It is building a following.',
    questHook: 'Seven has calculated that a gear in Mechanus\'s Great Machine is 0.003 degrees off alignment. In 47 days this will cause a cascade failure. Nobody believes a bartender modron.',
  },
  {
    name: 'The Hollow Draught',
    plane: 'shadowfell',
    description: 'A pub that exists in the shadow of every other pub simultaneously. The lighting is always wrong. The music is always one note off. The drinks taste like almost-joy.',
    bartender: 'Vesper, a shadar-kai who smiles too wide. Claims to have been happy once and is trying to remember what it felt like. Mixes drinks by feel.',
    houseRule: 'No bright lights. No loud laughter. No talking about the weather unless it is "bleak." Violators get 1 level of exhaustion from concentrated ennui.',
    drinks: [
      { name: 'Tears of the Raven Queen', effect: 'You can see into the Ethereal Plane for 10 minutes. You might not like what you see.', saveDC: 14, price: 'A tear, freely given', dangerLevel: 3 },
      { name: 'Liquid Nostalgia', effect: 'Relive your happiest memory for 1 minute. Take 1d6 psychic damage when it ends.', saveDC: 13, price: '30gp', dangerLevel: 3 },
      { name: 'The Void', effect: 'Darkvision 120ft for 8 hours. Your eyes turn completely black.', saveDC: 12, price: '20gp', dangerLevel: 2 },
    ],
    regularPatrons: ['A ghost who does not realize the pub is in the Shadowfell and keeps asking why everything is so gloomy', 'A sorrowsworn sitting alone, radiating despair, nursing the same drink for centuries', 'A shadow dragon in humanoid form, hiding from something bigger'],
    dangerousPatron: 'A nightwalker that manifests when too many living souls are in the pub at once. Vesper tracks the count on a chalkboard behind the bar.',
    questHook: 'Vesper says the Hollow Draught is fading. The shadow anchor is weakening. If it fails, everyone inside falls into the deep Shadowfell where even the dead fear to go.',
  },
];

export function getRandomTavern(): PlanarTavern {
  return TAVERNS[Math.floor(Math.random() * TAVERNS.length)];
}

export function getTavernByPlane(plane: PlaneOrigin): PlanarTavern | undefined {
  return TAVERNS.find((t) => t.plane === plane);
}

export function getAllPlanes(): PlaneOrigin[] {
  return [...new Set(TAVERNS.map((t) => t.plane))];
}

export function getMostDangerousDrink(): PlanarDrink & { tavern: string } {
  let worst: PlanarDrink | null = null;
  let worstTavern = '';
  for (const t of TAVERNS) {
    for (const d of t.drinks) {
      if (!worst || d.dangerLevel > worst.dangerLevel) {
        worst = d;
        worstTavern = t.name;
      }
    }
  }
  return { ...worst!, tavern: worstTavern };
}

export function formatTavern(tavern: PlanarTavern): string {
  const lines = [`🍺 **${tavern.name}** *(${tavern.plane})*`];
  lines.push(`  ${tavern.description}`);
  lines.push(`  Bartender: ${tavern.bartender}`);
  lines.push(`  House Rule: ${tavern.houseRule}`);
  lines.push('  **Drinks:**');
  for (const d of tavern.drinks) {
    lines.push(`    - ${d.name} (DC ${d.saveDC}, danger ${d.dangerLevel}/5): ${d.effect} — Price: ${d.price}`);
  }
  lines.push('  **Regulars:**');
  for (const p of tavern.regularPatrons) {
    lines.push(`    - ${p}`);
  }
  lines.push(`  ⚠️ Watch out for: ${tavern.dangerousPatron}`);
  lines.push(`  📜 Quest: ${tavern.questHook}`);
  return lines.join('\n');
}

export { TAVERNS as PLANAR_TAVERNS };
