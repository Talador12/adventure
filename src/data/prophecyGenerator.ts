// Random prophecy generator — cryptic prophecies for quest hooks.

export interface Prophecy { text: string; interpretation: string; relatedTo: 'quest' | 'character' | 'world' | 'combat'; }

const TEMPLATES = [
  { template: 'When the {adjective} {noun} meets the {adjective2} {noun2}, the {event} shall begin.', relatedTo: 'quest' as const },
  { template: 'Beware the one who {action} in {place}. They hold the key to {consequence}.', relatedTo: 'character' as const },
  { template: 'Three {noun}s will {verb} before the {time}. Only then can {outcome}.', relatedTo: 'world' as const },
  { template: 'The {adjective} shall fall, and from their {noun} rises {outcome}.', relatedTo: 'combat' as const },
  { template: 'Seek the {noun} where {condition}. There lies the answer to {question}.', relatedTo: 'quest' as const },
];
const ADJECTIVES = ['crimson', 'silent', 'forgotten', 'burning', 'sleeping', 'shattered', 'golden', 'cursed'];
const NOUNS = ['crown', 'blade', 'eye', 'stone', 'flame', 'shadow', 'star', 'key', 'child', 'throne'];
const ACTIONS = ['walks alone', 'speaks in riddles', 'wears two faces', 'carries the mark', 'remembers the old ways'];
const PLACES = ['the land of the dead', 'the shadow between worlds', 'the deepest dungeon', 'the highest tower', 'a forgotten tomb'];
const EVENTS = ['reckoning', 'awakening', 'unraveling', 'convergence', 'transformation'];
const OUTCOMES = ['the seal will break', 'the ancient evil returns', 'salvation may yet be found', 'the bloodline will be restored', 'darkness will consume all'];
const INTERPRETATIONS = ['This likely refers to an upcoming confrontation.', 'This could be about one of the party members.', 'The location mentioned may be nearby.', 'This seems to foretell a major world event.', 'Multiple interpretations are possible — intentionally vague.'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateProphecy(): Prophecy {
  const tmpl = pick(TEMPLATES);
  const text = tmpl.template
    .replace('{adjective}', pick(ADJECTIVES)).replace('{adjective2}', pick(ADJECTIVES))
    .replace('{noun}', pick(NOUNS)).replace('{noun2}', pick(NOUNS))
    .replace('{action}', pick(ACTIONS)).replace('{place}', pick(PLACES))
    .replace('{event}', pick(EVENTS)).replace('{consequence}', pick(OUTCOMES))
    .replace('{outcome}', pick(OUTCOMES)).replace('{verb}', pick(ACTIONS))
    .replace('{time}', pick(['next full moon', 'winter solstice', 'third dawn', 'final battle']))
    .replace('{condition}', pick(['the rivers run red', 'shadows grow long', 'the earth trembles', 'stars align']))
    .replace('{question}', pick(['the lost king\'s fate', 'the true enemy', 'how to break the curse']));
  return { text: `"${text}"`, interpretation: pick(INTERPRETATIONS), relatedTo: tmpl.relatedTo };
}

export function formatProphecy(prophecy: Prophecy): string {
  return `🔮 **Prophecy:**\n*${prophecy.text}*\n\n💭 DM Note: ${prophecy.interpretation} (${prophecy.relatedTo})`;
}
