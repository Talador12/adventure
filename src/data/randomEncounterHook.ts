// Random encounter hook — one-liner scene starters for the DM.
export const ENCOUNTER_HOOKS: string[] = [
  'A wounded messenger collapses at the party\'s feet, gasping a single word before passing out.',
  'The road ahead is blocked by an overturned wagon. Cries for help come from underneath.',
  'A child runs up and presses a sealed note into a party member\'s hand, then disappears.',
  'Smoke rises from the treeline ahead. It smells wrong — chemical, not wood.',
  'A merchant offers the party a sealed box and 50gp to deliver it. "Don\'t open it."',
  'The ground shakes. Birds scatter from the trees in every direction at once.',
  'A funeral procession blocks the road. The mourners are armed to the teeth.',
  'Someone has carved the party\'s names into a tree along the path. The carvings are fresh.',
  'A bridge troll demands not gold, but a story. A *true* story.',
  'Rain begins to fall — but only on one member of the party.',
  'A door appears in the middle of a field. It\'s standing alone, frame and all.',
  'The innkeeper refuses to serve the party. "We don\'t serve *their kind* here." Glances at someone.',
  'A raven lands on the nearest shoulder and speaks: "They know you\'re coming."',
  'The party finds their own wanted posters nailed to a tree.',
  'A knight in rusted armor kneels in the road, sword planted, weeping silently.',
];
export function getRandomHook(): string { return ENCOUNTER_HOOKS[Math.floor(Math.random() * ENCOUNTER_HOOKS.length)]; }
export function getMultipleHooks(count: number = 3): string[] { return [...ENCOUNTER_HOOKS].sort(() => Math.random() - 0.5).slice(0, count); }
export function formatEncounterHooks(count: number = 3): string { return `📣 **Scene Starters:**\n${getMultipleHooks(count).map((h, i) => `${i + 1}. *${h}*`).join('\n')}`; }
