// Random magical accident investigation — CSI but for spell mishaps and alchemical explosions.

export type AccidentType = 'spell_mishap' | 'potion_explosion' | 'enchantment_failure' | 'summoning_gone_wrong' | 'wild_magic_event';

export interface AccidentClue { clue: string; findDC: number; skill: string; revealedInfo: string; }

export interface MagicalAccident {
  title: string;
  type: AccidentType;
  scene: string;
  victim: string;
  clues: AccidentClue[];
  trueExplanation: string;
  redHerring: string;
  investigationDC: number;
  consequence: string;
}

const ACCIDENTS: MagicalAccident[] = [
  { title: 'The Baker\'s Explosion', type: 'potion_explosion', scene: 'A bakery with no roof. The walls are standing. The roof is not. Everything is covered in purple goo.', victim: 'Baker Hilda (alive, purple, furious). And her cat (alive, purple, indifferent).', clues: [
    { clue: 'Purple residue on the ceiling beams', findDC: 10, skill: 'Arcana', revealedInfo: 'This is Elixir of Enlargement. Someone put it in the bread yeast.' },
    { clue: 'A delivery receipt from "Definitely Not Suspicious Alchemy"', findDC: 12, skill: 'Investigation', revealedInfo: 'The yeast was special-ordered. By someone who is NOT the baker.' },
    { clue: 'Neighbor saw a gnome running away 10 minutes before', findDC: 14, skill: 'Persuasion', revealedInfo: 'The gnome had a grudge. Hilda refused to bake his wedding cake. Twice.' },
  ], trueExplanation: 'A gnome alchemist replaced the baker\'s yeast with concentrated Elixir of Enlargement as revenge. The bread expanded 500× and launched the roof.', redHerring: 'The cat has traces of wild magic on its whiskers. It\'s unrelated — the cat is just weird.', investigationDC: 13, consequence: 'Hilda wants justice AND her roof back. The gnome is hiding in a mushroom cellar.' },
  { title: 'The Silent Classroom', type: 'spell_mishap', scene: 'A wizarding school classroom. Everything is frozen mid-action. Students, quills, even dust particles — all stopped.', victim: '12 students and Professor Quill (all alive, all frozen in time).', clues: [
    { clue: 'The professor\'s wand is cracked', findDC: 11, skill: 'Arcana', revealedInfo: 'The wand misfired during a demonstration of Slow. But this is WAY beyond Slow.' },
    { clue: 'A student\'s notes read: "What happens if you cast Slow backward?"', findDC: 13, skill: 'Investigation', revealedInfo: 'A student asked a dangerous question. The professor tried to answer it. Practically.' },
    { clue: 'The clock on the wall shows the correct time. Inside the frozen zone.', findDC: 15, skill: 'Perception', revealedInfo: 'Time isn\'t stopped. It\'s moving at 1/1,000,000 normal speed. They\'ll thaw in approximately 11 years.' },
  ], trueExplanation: 'Professor Quill attempted to demonstrate the theoretical inverse of Slow ("Haste in reverse, you see..."). They created a localized time dilation field. Oops.', redHerring: 'One student\'s familiar (a toad) is outside the zone, watching. It blinks. It knows something. It\'s a toad.', investigationDC: 14, consequence: 'The students\' parents want them unfrozen NOW. Dispel Magic (9th level) or a creative time solution. The university is panicking.' },
  { title: 'The Vanishing Village', type: 'summoning_gone_wrong', scene: 'A village exists on maps. The road leads to it. But where the village should be: a perfect circle of empty grass.', victim: 'The entire village of Millbrook (47 people, 12 buildings, 1 very confused cow that was outside the circle).', clues: [
    { clue: 'A summoning circle burned into the grass at the exact center', findDC: 12, skill: 'Arcana', revealedInfo: 'Someone tried to summon something FROM the village. But the circle was backward — it SENT the village instead.' },
    { clue: 'The cow has a note tied to its collar', findDC: 8, skill: 'Perception', revealedInfo: '"HELP. WE ARE IN THE FEYWILD. THE MUSHROOMS ARE VERY LARGE. — Mayor Bramblewood"' },
    { clue: 'A spellbook in the grass, open to a bookmarked page', findDC: 11, skill: 'Investigation', revealedInfo: 'The village wizard was trying to summon a fey healer for a sick child. She drew the circle wrong.' },
  ], trueExplanation: 'The village wizard tried to summon a fey creature but reversed the summoning circle. Instead of bringing the fey HERE, it sent the VILLAGE THERE. Millbrook is now in the Feywild.', redHerring: 'Strange mushroom spores at the edge of the circle. They\'re from the Feywild — confirmation, not cause.', investigationDC: 12, consequence: 'The village needs retrieval. They\'re alive but time moves differently in the Feywild. Every hour here = 1 day there. Hurry.' },
];

export function getRandomAccident(): MagicalAccident {
  return ACCIDENTS[Math.floor(Math.random() * ACCIDENTS.length)];
}

export function getAccidentsByType(type: AccidentType): MagicalAccident[] {
  return ACCIDENTS.filter((a) => a.type === type);
}

export function getClueCount(accident: MagicalAccident): number {
  return accident.clues.length;
}

export function getAllAccidentTypes(): AccidentType[] {
  return [...new Set(ACCIDENTS.map((a) => a.type))];
}

export function formatAccident(accident: MagicalAccident, showSolution: boolean = false): string {
  const icon = { spell_mishap: '🔮', potion_explosion: '💥', enchantment_failure: '⚡', summoning_gone_wrong: '🌀', wild_magic_event: '🌈' }[accident.type];
  const lines = [`${icon} **${accident.title}** *(${accident.type.replace(/_/g, ' ')})*`];
  lines.push(`  Scene: ${accident.scene}`);
  lines.push(`  Victim: ${accident.victim}`);
  lines.push(`  Clues: ${accident.clues.length} | Investigation DC: ${accident.investigationDC}`);
  if (showSolution) { lines.push(`  🔍 Truth: ${accident.trueExplanation}`); lines.push(`  🐟 Red herring: ${accident.redHerring}`); }
  return lines.join('\n');
}

export { ACCIDENTS as MAGICAL_ACCIDENTS };
