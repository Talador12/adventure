// Combat flavor text — short descriptions that add personality to hits and misses.
// Rotates randomly to keep things fresh. Specific enough to land, general enough to fit.

const HIT_FLAVOR = [
  'connects with a solid strike.',
  'finds an opening in the defense.',
  'lands a clean blow.',
  'drives the attack home.',
  'hits with practiced precision.',
  'catches them off-guard.',
  'slips past their guard.',
  'strikes true.',
];

const MISS_FLAVOR = [
  'swings wide.',
  'finds only air.',
  'is deflected at the last moment.',
  'glances off armor harmlessly.',
  'goes wide of the mark.',
  'is sidestepped.',
  'clangs off a raised shield.',
  'whiffs completely.',
];

const CRIT_FLAVOR = [
  'strikes with devastating force!',
  'finds the perfect weak point!',
  'delivers a blow they won\'t forget!',
  'hits with everything they\'ve got!',
  'lands a strike that echoes across the battlefield!',
];

const KILL_FLAVOR = [
  'That\'s the last of them.',
  'They won\'t be getting back up.',
  'Down for good.',
  'One less problem.',
  'The battlefield grows quieter.',
];

const FUMBLE_FLAVOR = [
  'That... was not the plan.',
  'An ambitious attempt that didn\'t quite work out.',
  'The weapon had other ideas.',
  'Gravity wins this round.',
  'Technically a swing. Generously.',
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function hitFlavor(): string { return pick(HIT_FLAVOR); }
export function missFlavor(): string { return pick(MISS_FLAVOR); }
export function critFlavor(): string { return pick(CRIT_FLAVOR); }
export function killFlavor(): string { return pick(KILL_FLAVOR); }
export function fumbleFlavor(): string { return pick(FUMBLE_FLAVOR); }
