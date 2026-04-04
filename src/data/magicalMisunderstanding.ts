// Random magical misunderstanding — comedy encounters from miscommunication and magical confusion.

export interface MagicalMisunderstanding {
  title: string; setup: string; misunderstanding: string; escalation: string;
  resolution: string; comedyLevel: number;
}

const MISUNDERSTANDINGS: MagicalMisunderstanding[] = [
  { title: 'The Polymorph Prank', setup: 'A wizard polymorphed a noble into a frog as a joke. The noble\'s guards think the party did it.', misunderstanding: 'The frog is trying to tell the guards the party is innocent. The guards don\'t speak frog. The frog is getting increasingly agitated.', escalation: 'The guards draw swords. The frog hops onto the party leader\'s head. This looks VERY suspicious.', resolution: 'The wizard confesses (Persuasion DC 12). Or the polymorph wears off mid-combat. The noble appears, naked, on someone\'s shoulders.', comedyLevel: 9 },
  { title: 'The Sending Spell Pocket Dial', setup: 'Someone accidentally triggered a Sending Stone while arguing about bathroom habits. The message went to the king.', misunderstanding: 'The king thinks "we need to find a bush IMMEDIATELY" is a coded threat. Assassins are dispatched.', escalation: 'Royal assassins arrive looking for "the bush conspirators." The party has no idea why they\'re being hunted.', resolution: 'Show the king the Sending Stone logs. He laughs. The assassins don\'t. The court bard writes a song about it. It becomes popular.', comedyLevel: 8 },
  { title: 'The Animate Object Incident', setup: 'A wizard animated a broom to sweep the tavern. The broom got ambitious. It\'s sweeping the entire town.', misunderstanding: 'The townsfolk think the broom is a new monster. They\'ve formed a militia. The broom is VERY efficient.', escalation: 'The broom recruits other brooms. An army of cleaning implements marches through the streets. They are VERY thorough.', resolution: 'Dispel Magic on the original broom. Or: let them finish. The town has never been this clean.', comedyLevel: 10 },
  { title: 'The Familiar Mix-Up', setup: 'Two wizards in the same inn summoned familiars simultaneously. The familiars got swapped.', misunderstanding: 'One wizard has a cat that breathes fire (the other wizard\'s pyromancy familiar). The other has a cat that turns invisible when startled (the first wizard\'s spy familiar). Neither knows.', escalation: 'The fire cat sets the curtains ablaze. The invisible cat disappears during a staff meeting. Accusations fly.', resolution: 'Bring both wizards together. The familiars recognize each other and swap back. They\'re not sorry.', comedyLevel: 7 },
  { title: 'The Zone of Truth Dinner Party', setup: 'Someone cast Zone of Truth over the entire banquet hall. Nobody noticed until the wine started flowing.', misunderstanding: 'Every guest is now compulsively honest. The duchess just told the baron what she really thinks of his hair. The ambassador admitted the trade deal is a scam.', escalation: 'Diplomatic incident. Three nobles challenge each other to duels. The chef admits the "truffle oil" is walnut oil.', resolution: 'The spell wears off. Everyone pretends it didn\'t happen. The walnut oil revelation causes a REAL scandal.', comedyLevel: 9 },
];

export function getRandomMisunderstanding(): MagicalMisunderstanding { return MISUNDERSTANDINGS[Math.floor(Math.random() * MISUNDERSTANDINGS.length)]; }
export function getByComedyLevel(min: number): MagicalMisunderstanding[] { return MISUNDERSTANDINGS.filter((m) => m.comedyLevel >= min); }
export function getMisunderstandingCount(): number { return MISUNDERSTANDINGS.length; }
export function formatMisunderstanding(m: MagicalMisunderstanding): string {
  const lines = [`😂 **${m.title}** *(comedy ${m.comedyLevel}/10)*`]; lines.push(`  Setup: ${m.setup}`);
  lines.push(`  🤷 Misunderstanding: ${m.misunderstanding}`); lines.push(`  📈 Escalation: ${m.escalation}`);
  lines.push(`  ✅ Resolution: ${m.resolution}`); return lines.join('\n');
}
export { MISUNDERSTANDINGS as MAGICAL_MISUNDERSTANDINGS };
