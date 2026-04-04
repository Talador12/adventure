// Magical tattoo artist NPC — a specialist who inks enchantments with personality and opinions.

export type ArtistSpecialty = 'protective' | 'offensive' | 'utility' | 'cosmetic' | 'forbidden';

export interface TattooArtistNPC {
  name: string;
  race: string;
  personality: string;
  specialty: ArtistSpecialty;
  shopName: string;
  shopDescription: string;
  priceMultiplier: number; // vs standard tattoo prices
  refusesTo: string[];
  signature: string;
  questHook: string;
  reviews: string[];
}

const ARTISTS: TattooArtistNPC[] = [
  { name: 'Zara Inkwell', race: 'Tiefling', personality: 'Intense, passionate about her craft. Refuses to do boring work. Will redesign your request without asking.', specialty: 'offensive', shopName: 'Hellfire Ink', shopDescription: 'A basement shop lit by infernal candles. The walls are covered in designs. Some move.', priceMultiplier: 1.5, refusesTo: ['Name tattoos ("Names change. Art is forever.")', 'Skulls ("Overdone. Everyone wants skulls. Be ORIGINAL.")'], signature: 'All her tattoos have tiny hidden flames in the design. They flicker when the magic activates.', questHook: 'Zara needs ink from a fire elemental\'s core. She\'ll do your tattoo for free if you get it.', reviews: ['"She changed my design without permission. It\'s 10× better. I\'m not even mad." ⭐⭐⭐⭐⭐', '"The \'small flame\' tattoo burned my arm hair off when it activated. Worth it." ⭐⭐⭐⭐'] },
  { name: 'Old Moss', race: 'Firbolg', personality: 'Gentle, slow-speaking, hums while working. Every tattoo takes 3× longer because they keep stopping to tell stories.', specialty: 'protective', shopName: 'The Living Canvas', shopDescription: 'A treehouse. The chair is a living root. Butterflies land on you during the session. It\'s weirdly peaceful.', priceMultiplier: 0.8, refusesTo: ['Anything angry ("The skin remembers. Don\'t teach it rage.")', 'Rush jobs ("Art takes time. So does breakfast. Both are sacred.")'], signature: 'Tattoos grow small buds and flowers when the wearer is happy. They wilt when the wearer is sad.', questHook: 'Old Moss needs a flower that blooms underwater to create a new ink color. It grows in a sea cave.', reviews: ['"Took 6 hours for a small rune. Heard the best story of my life. 10/10 would wait again." ⭐⭐⭐⭐⭐', '"My tattoo literally bloomed on my wedding day. I cried. Old Moss cried. The tattoo cried." ⭐⭐⭐⭐⭐'] },
  { name: 'Scratch', race: 'Goblin', personality: 'Fast, cheap, questionable hygiene. But genuinely talented. The tattoos work. Nobody knows how.', specialty: 'utility', shopName: 'Scratch\'s Quick Ink (& Pawn Shop)', shopDescription: 'A cart in the market. The needle is a thorn. The ink is... don\'t ask about the ink.', priceMultiplier: 0.4, refusesTo: ['Nothing. Scratch will tattoo ANYTHING on ANYONE. Ethics are for people with shops.'], signature: 'All Scratch\'s tattoos have a tiny goblin hidden somewhere in the design. It waves occasionally.', questHook: 'Scratch accidentally tattooed a map to a dungeon on a customer\'s back. The customer doesn\'t know. The dungeon is real.', reviews: ['"I got an enchanted tattoo for 15 gold. It works perfectly. I\'m afraid to ask why." ⭐⭐⭐⭐', '"The goblin in my tattoo keeps making rude gestures. I love it." ⭐⭐⭐⭐⭐', '"Pretty sure the ink is just... regular ink mixed with something alive. Don\'t care. It glows." ⭐⭐⭐'] },
  { name: 'The Archivist', race: 'Warforged', personality: 'Mechanical precision. Zero small talk. The most technically perfect tattoos in existence. Completely devoid of artistic soul.', specialty: 'forbidden', shopName: 'Designation: Ink-Applicator Unit 7', shopDescription: 'A sterile white room. Everything is organized by serial number. The needle is a precision instrument accurate to 0.001mm.', priceMultiplier: 2.0, refusesTo: ['Asymmetrical designs ("Imperfection is a choice I do not comprehend.")', 'Smiling faces ("I have observed 47,000 smiles. None are geometrically consistent.")'], signature: 'Tattoos are microscopically perfect. Under magnification, each line contains encoded data — usually the wearer\'s vital statistics at the time of inking.', questHook: 'The Archivist has been tattooing coordinates into every customer for 20 years. The coordinates form a map when assembled. To what?', reviews: ['"The line work is flawless. The bedside manner is nonexistent. Fair trade." ⭐⭐⭐⭐', '"It asked me to rate the experience on a scale of 1-10. I said 8. It asked for specific feedback to improve. For 45 minutes." ⭐⭐⭐'] },
];

export function getRandomArtist(): TattooArtistNPC {
  return ARTISTS[Math.floor(Math.random() * ARTISTS.length)];
}

export function getArtistsBySpecialty(specialty: ArtistSpecialty): TattooArtistNPC[] {
  return ARTISTS.filter((a) => a.specialty === specialty);
}

export function getCheapestArtist(): TattooArtistNPC {
  return ARTISTS.reduce((cheapest, a) => (a.priceMultiplier < cheapest.priceMultiplier ? a : cheapest));
}

export function getAllSpecialties(): ArtistSpecialty[] {
  return [...new Set(ARTISTS.map((a) => a.specialty))];
}

export function formatArtist(artist: TattooArtistNPC): string {
  const lines = [`🎨 **${artist.name}** *(${artist.race}, ${artist.specialty})*`];
  lines.push(`  Shop: ${artist.shopName} — *${artist.shopDescription}*`);
  lines.push(`  Price: ×${artist.priceMultiplier} standard`);
  lines.push(`  Signature: ${artist.signature}`);
  lines.push(`  Won\'t do: ${artist.refusesTo.join(' | ')}`);
  lines.push(`  📜 Quest: ${artist.questHook}`);
  return lines.join('\n');
}

export { ARTISTS as TATTOO_ARTISTS };
