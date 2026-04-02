// Random NPC generator — instant NPC with name, personality, secret, and plot hook.
// One click = a fully fleshed-out NPC ready to drop into any scene.

export interface GeneratedNpc {
  name: string;
  race: string;
  gender: string;
  occupation: string;
  personality: string;
  appearance: string;
  quirk: string;
  secret: string;
  plotHook: string;
  disposition: number; // -2 to 2
}

const FIRST_NAMES = {
  male: ['Aldric', 'Brom', 'Corwin', 'Doran', 'Elric', 'Fenris', 'Gareth', 'Harlan', 'Idris', 'Jareth', 'Kael', 'Lucan', 'Magnus', 'Nolan', 'Orion', 'Piers', 'Quinn', 'Rowan', 'Silas', 'Theron'],
  female: ['Aria', 'Brynn', 'Celeste', 'Dahlia', 'Elara', 'Freya', 'Gwen', 'Helena', 'Iris', 'Jaya', 'Kira', 'Luna', 'Mira', 'Nyx', 'Opal', 'Petra', 'Rhea', 'Sable', 'Thea', 'Vesper'],
};
const SURNAMES = ['Ashford', 'Blackwood', 'Brightwater', 'Copperfield', 'Darkholme', 'Elderwood', 'Fairweather', 'Goldleaf', 'Hawthorne', 'Ironforge', 'Kettleburn', 'Longstrider', 'Moonwhisper', 'Nightingale', 'Oakenshield', 'Proudfoot', 'Ravenscar', 'Silverhand', 'Thornwall', 'Windermere'];

const RACES = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Half-Elf', 'Half-Orc', 'Gnome', 'Tiefling'];
const OCCUPATIONS = ['Blacksmith', 'Innkeeper', 'Merchant', 'Scholar', 'Farmer', 'Guard', 'Healer', 'Thief', 'Priest', 'Hunter', 'Bard', 'Sailor', 'Noble', 'Beggar', 'Cook', 'Stable Hand', 'Librarian', 'Alchemist', 'Cartographer', 'Jeweler'];

const PERSONALITIES = [
  'Warm and welcoming, always smiling',
  'Gruff and suspicious of strangers',
  'Nervous and twitchy, constantly looking over their shoulder',
  'Boisterous and loud, loves telling stories',
  'Quiet and observant, rarely speaks unless spoken to',
  'Sarcastically witty with a dry sense of humor',
  'Overly formal and polite to a fault',
  'Cheerful but clearly hiding sadness',
  'Arrogant and condescending toward adventurers',
  'Friendly but scatterbrained, forgets names',
  'Deeply religious, quotes scripture frequently',
  'Pragmatic and business-minded, everything has a price',
];

const APPEARANCES = [
  'A prominent scar across the left cheek',
  'Unusually tall with stooped shoulders',
  'Missing two fingers on the right hand',
  'Bright, mismatched eyes — one blue, one brown',
  'Impeccably dressed despite modest means',
  'Weather-beaten face with deep laugh lines',
  'Shaved head covered in intricate tattoos',
  'Walks with a noticeable limp',
  'Always wears a faded red scarf',
  'Remarkably young-looking for their apparent wisdom',
];

const QUIRKS = [
  'Constantly fidgets with a coin between their fingers',
  'Hums an unfamiliar tune under their breath',
  'Refers to everyone as "friend" regardless of relationship',
  'Cannot resist a good pun, no matter how terrible',
  'Always carries a small, worn book they won\'t let anyone read',
  'Speaks in third person when nervous',
  'Collects unusual rocks and shows them to everyone',
  'Insists on shaking hands with the left hand only',
];

const SECRETS = [
  'Is actually a former adventurer who retired after losing their party',
  'Secretly works for the local thieves\' guild as an informant',
  'Is hiding a family member who is wanted by the crown',
  'Has been cursed and slowly transforming under the full moon',
  'Possesses a map to a dangerous dungeon they\'re too afraid to explore',
  'Is the last survivor of a destroyed village and seeks revenge',
  'Owes a massive debt to a powerful crime lord',
  'Witnessed a murder and is being hunted for what they know',
  'Is actually nobility in disguise, hiding from an arranged marriage',
  'Has made a pact with a minor devil and regrets it deeply',
];

const PLOT_HOOKS = [
  'Asks the party to deliver a sealed letter to someone in the next town',
  'Mentions a strange sound coming from the abandoned mine at night',
  'Offers a reward for finding their missing child who wandered into the forest',
  'Warns the party about a new gang of bandits on the road ahead',
  'Needs an escort to a dangerous location to retrieve a family heirloom',
  'Knows the location of a hidden entrance to the local dungeon',
  'Has information about one of the party member\'s backstories',
  'Begs the party to break a curse that has afflicted the town well',
  'Offers to trade a magical trinket for help with a personal problem',
  'Claims to have seen a dragon flying over the mountains recently',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomNpc(): GeneratedNpc {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstName = pick(FIRST_NAMES[gender]);
  const surname = pick(SURNAMES);

  return {
    name: `${firstName} ${surname}`,
    race: pick(RACES),
    gender: gender === 'male' ? 'Male' : 'Female',
    occupation: pick(OCCUPATIONS),
    personality: pick(PERSONALITIES),
    appearance: pick(APPEARANCES),
    quirk: pick(QUIRKS),
    secret: pick(SECRETS),
    plotHook: pick(PLOT_HOOKS),
    disposition: Math.floor(Math.random() * 5) - 2, // -2 to 2
  };
}

export function formatGeneratedNpc(npc: GeneratedNpc): string {
  const dispLabel = npc.disposition >= 2 ? 'Friendly' : npc.disposition >= 1 ? 'Warm' : npc.disposition === 0 ? 'Neutral' : npc.disposition >= -1 ? 'Wary' : 'Hostile';
  const lines = [`👤 **${npc.name}** — ${npc.race} ${npc.gender}, ${npc.occupation} (${dispLabel})`];
  lines.push(`*${npc.appearance}*`);
  lines.push(`Personality: ${npc.personality}`);
  lines.push(`Quirk: ${npc.quirk}`);
  lines.push(`🤫 Secret: ${npc.secret}`);
  lines.push(`🎣 Plot hook: ${npc.plotHook}`);
  return lines.join('\n');
}
