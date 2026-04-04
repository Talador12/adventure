// Combat quip generator — one-liners for mid-fight banter.
export type QuipContext = 'crit' | 'miss' | 'kill' | 'heal' | 'save' | 'taunt' | 'entrance';
export interface CombatQuip { context: QuipContext; quip: string; bestFor: string; }
const QUIPS: CombatQuip[] = [
  { context: 'crit', quip: '"I\'d apologize, but I don\'t think you\'ll be around to hear it."', bestFor: 'Rogue' },
  { context: 'crit', quip: '"That? That was for my FRIEND." *gestures at downed ally*', bestFor: 'Any melee' },
  { context: 'miss', quip: '"I meant to do that. It was a warning shot. To the wall."', bestFor: 'Ranger/Archer' },
  { context: 'miss', quip: '"The NEXT one won\'t miss. Probably."', bestFor: 'Anyone' },
  { context: 'kill', quip: '"And THAT\'S why you don\'t skip leg day."', bestFor: 'Fighter/Barbarian' },
  { context: 'kill', quip: '*sheathes sword without looking at the body* "Who\'s next?"', bestFor: 'Cool characters' },
  { context: 'heal', quip: '"Hold still. This is going to hurt me more than — actually no, it\'s going to hurt you."', bestFor: 'Cleric' },
  { context: 'heal', quip: '"You\'re not allowed to die. I haven\'t finished being mad at you."', bestFor: 'Any healer with RP' },
  { context: 'save', quip: '"Did anyone else feel that? No? Just me being INCREDIBLE? Cool."', bestFor: 'Bard/Sorcerer' },
  { context: 'taunt', quip: '"I\'ve fought scarier things in my breakfast cereal."', bestFor: 'Halfling/Gnome' },
  { context: 'taunt', quip: '"Is that your best? Because I was about to ask if we could start."', bestFor: 'Barbarian' },
  { context: 'entrance', quip: '"Sorry I\'m late. I was busy being dramatic in the hallway."', bestFor: 'Bard' },
  { context: 'entrance', quip: '*kicks open door* "Nobody panic. I\'m here now."', bestFor: 'Paladin/Fighter' },
  { context: 'kill', quip: '"Rest in peace. Or don\'t. I\'m not your cleric."', bestFor: 'Warlock' },
];
export function getRandomQuip(): CombatQuip { return QUIPS[Math.floor(Math.random() * QUIPS.length)]; }
export function getQuipsByContext(c: QuipContext): CombatQuip[] { return QUIPS.filter((q) => q.context === c); }
export function getAllQuipContexts(): QuipContext[] { return [...new Set(QUIPS.map((q) => q.context))]; }
export function getQuipCount(): number { return QUIPS.length; }
export function formatQuip(q: CombatQuip): string { return `⚔️ *(${q.context})* ${q.quip}\n  Best for: ${q.bestFor}`; }
export { QUIPS as COMBAT_QUIPS };
