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
  'makes contact. The unpleasant kind.',
  'lands exactly where it was not wanted.',
  'files a formal complaint. With a weapon.',
  'introduces their weapon to the target. They do not get along.',
  'does the one thing the target was hoping they would not do.',
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
  'attacks the concept of the enemy. The actual enemy is fine.',
  'misses by exactly enough to be embarrassing.',
  'hits the air so hard it apologizes.',
  'demonstrates what not to do in combat. Effectively.',
  'swings with confidence. The confidence was misplaced.',
];

const CRIT_FLAVOR = [
  'strikes with devastating force!',
  'finds the perfect weak point!',
  'delivers a blow they won\'t forget!',
  'hits with everything they\'ve got!',
  'lands a strike that echoes across the battlefield!',
  'rewrites the target\'s plans for the rest of the round!',
  'sends a clear message. The message is pain!',
  'turns "I have a plan" into "I had a plan."',
  'the dice said yes. Emphatically.',
];

const KILL_FLAVOR = [
  'That\'s the last of them.',
  'They won\'t be getting back up.',
  'Down for good.',
  'One less problem.',
  'The battlefield grows quieter.',
  'Career over. Immediately.',
  'Removed from the initiative order. Permanently.',
  'They have been unsubscribed from life.',
  'That was their last turn. In every sense.',
];

const FUMBLE_FLAVOR = [
  'That... was not the plan.',
  'An ambitious attempt that did not quite work out.',
  'The weapon had other ideas.',
  'Gravity wins this round.',
  'Technically a swing. Generously.',
  'Bold strategy. Did not pay off.',
  'The weapon is fine. The dignity is not.',
  'Everyone saw that. Everyone.',
  'Somewhere, a combat instructor just felt a disturbance.',
  'The enemy is confused. Not by tactics. By whatever that was.',
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function hitFlavor(): string { return pick(HIT_FLAVOR); }
export function missFlavor(): string { return pick(MISS_FLAVOR); }
export function critFlavor(): string { return pick(CRIT_FLAVOR); }
export function killFlavor(): string { return pick(KILL_FLAVOR); }
export function fumbleFlavor(): string { return pick(FUMBLE_FLAVOR); }
