// Combat narration templates — dramatic hit/miss/crit/fumble descriptions.
// Randomly selected to add flavor to combat without DM effort.

export type NarrationType = 'hit' | 'miss' | 'crit' | 'fumble' | 'kill' | 'heal';

export interface NarrationTemplate {
  type: NarrationType;
  templates: string[];
}

const TEMPLATES: Record<NarrationType, string[]> = {
  hit: [
    '{attacker} lands a solid blow on {target}!',
    '{attacker}\'s strike finds its mark, cutting into {target}.',
    'A swift attack from {attacker} connects with {target}!',
    '{attacker} slashes through {target}\'s defenses.',
    '{target} grunts in pain as {attacker}\'s weapon bites deep.',
    'Steel meets flesh as {attacker} scores a hit on {target}.',
    '{attacker} darts forward, striking {target} before they can react.',
    'With precision, {attacker} lands a punishing blow on {target}.',
  ],
  miss: [
    '{attacker}\'s attack goes wide, missing {target} entirely.',
    '{target} narrowly dodges {attacker}\'s strike.',
    '{attacker} swings but {target} deftly sidesteps.',
    'Sparks fly as {attacker}\'s weapon glances off {target}\'s armor.',
    '{target} blocks {attacker}\'s attack with a deft parry.',
    '{attacker} overextends, leaving their attack to find only air.',
    '{target} ducks under {attacker}\'s wild swing.',
    'The attack from {attacker} falls short of {target}.',
  ],
  crit: [
    '💥 DEVASTATING! {attacker} finds the perfect opening and strikes {target} with terrible force!',
    '⚡ {attacker} unleashes a masterful strike that cleaves through {target}\'s defenses!',
    '🔥 A perfect hit! {attacker}\'s weapon finds a vital point on {target}!',
    '💀 With surgical precision, {attacker} delivers a devastating blow to {target}!',
    '✨ Time seems to slow as {attacker}\'s attack lands with bone-crushing force on {target}!',
  ],
  fumble: [
    '😬 {attacker} stumbles, their attack going wildly off target!',
    '💫 {attacker}\'s weapon slips from their grip mid-swing!',
    '🤦 {attacker} trips over their own feet, exposing their flank!',
    '😰 {attacker}\'s overconfident swing leaves them off-balance and vulnerable!',
    '💥 {attacker} accidentally strikes the ground, jarring their arm painfully.',
  ],
  kill: [
    '💀 {target} collapses under {attacker}\'s final blow!',
    '⚔️ With a decisive strike, {attacker} fells {target}!',
    '🏆 {target} crumples to the ground, defeated by {attacker}.',
    '💥 {attacker} delivers the killing blow! {target} falls!',
    '🎯 {attacker}\'s attack proves fatal. {target} breathes their last.',
  ],
  heal: [
    '💚 Warm light flows from {attacker}\'s hands into {target}, mending wounds.',
    '✨ {attacker}\'s magic knits {target}\'s injuries back together.',
    '🌿 Divine energy surges through {target} as {attacker} channels healing.',
    '💫 {target} gasps as {attacker}\'s healing magic courses through them.',
    '❤️‍🩹 {attacker} presses a glowing hand to {target}, restoring vitality.',
  ],
};

export function getRandomNarration(type: NarrationType, attacker: string, target: string): string {
  const pool = TEMPLATES[type];
  const template = pool[Math.floor(Math.random() * pool.length)];
  return template.replace(/\{attacker\}/g, attacker).replace(/\{target\}/g, target);
}

export function getNarrationCount(type: NarrationType): number { return TEMPLATES[type].length; }

export function getAllTypes(): NarrationType[] { return ['hit', 'miss', 'crit', 'fumble', 'kill', 'heal']; }

export function formatNarrationPreview(): string {
  const types = getAllTypes();
  const lines = ['🎭 **Combat Narration Templates:**'];
  for (const t of types) {
    lines.push(`${t === 'crit' ? '⚡' : t === 'fumble' ? '😬' : t === 'kill' ? '💀' : t === 'heal' ? '💚' : t === 'hit' ? '⚔️' : '🛡️'} **${t}**: ${getNarrationCount(t)} templates`);
  }
  lines.push(`\nExample: "${getRandomNarration('crit', 'Thorin', 'Goblin')}"`);
  return lines.join('\n');
}
