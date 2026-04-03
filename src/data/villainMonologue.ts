// Random villain monologue generator — dramatic speeches with interruption mechanics.

export type VillainArchetype = 'mastermind' | 'zealot' | 'tragic' | 'petty' | 'eldritch' | 'tyrant';
export type MonologueMoment = 'reveal' | 'pre_battle' | 'mid_battle' | 'victory' | 'defeat';

export interface VillainMonologue {
  archetype: VillainArchetype;
  moment: MonologueMoment;
  speech: string;
  interruptionDC: number; // how hard it is to shut them up
  ifInterrupted: string;
  ifCompleted: string;
  dramaticPause: string; // the moment they pause for effect
}

const MONOLOGUES: VillainMonologue[] = [
  { archetype: 'mastermind', moment: 'reveal', speech: '"You think you\'ve been clever, don\'t you? Solving my puzzles, unraveling my plans. But every step you took... I placed the stones. Every door you opened... I left the key. You didn\'t find me. I SUMMONED you."', interruptionDC: 14, ifInterrupted: '"Rude. I was getting to the good part." Attacks with advantage (genuinely annoyed).', ifCompleted: 'The party realizes one of their "successes" was actually part of the villain\'s plan all along. Morale check.', dramaticPause: 'After "I SUMMONED you" — turns slowly, cape swirling, to face the party directly.' },
  { archetype: 'zealot', moment: 'pre_battle', speech: '"You call me a monster? I am the CURE. This world is diseased — rotting from within. Every life I take is a mercy. Every city I burn is a cleansing fire. When the ashes settle, only the worthy will remain. And you... are not worthy."', interruptionDC: 12, ifInterrupted: '"You prove my point. You cannot even LISTEN." Begins combat with a spell targeting the interrupter.', ifCompleted: 'WIS DC 13 for all party members or doubt creeps in. The zealot\'s logic is warped but internally consistent.', dramaticPause: 'Before "And you..." — raises hand, divine light flickering around clenched fist.' },
  { archetype: 'tragic', moment: 'defeat', speech: '"*coughing* You think... this changes anything? I was the wall between you and what\'s coming. I held the door. For YEARS I held the door. And you... you just killed the only person who knew how to lock it again."', interruptionDC: 10, ifInterrupted: '"Fine. Die ignorant." Gives no further information. The party misses critical plot info.', ifCompleted: 'The villain reveals what they were protecting the world from. It\'s still coming. The party just lost their best defense.', dramaticPause: 'After "held the door" — a single tear. Not for themselves. For what comes next.' },
  { archetype: 'petty', moment: 'mid_battle', speech: '"Do you know what started all this? A PROMOTION. Gerald got the promotion. I was MORE qualified. I had SENIORITY. So yes, I summoned a demon. And yes, Gerald is a toad now. And FRANKLY I\'d do it again."', interruptionDC: 8, ifInterrupted: '"LET ME FINISH! This is the only time I get to explain!" Loses concentration on their active spell.', ifCompleted: 'The party struggles not to laugh. The villain is genuinely pathetic. Advantage on Persuasion to convince them to surrender.', dramaticPause: 'After "Gerald is a toad now" — gestures at a terrified toad in a tiny business suit in the corner.' },
  { archetype: 'eldritch', moment: 'reveal', speech: '"Language is insufficient. Your minds are... small. What I serve does not have a name. It has a SHAPE. And you have been standing inside it since you entered this building. Every step you\'ve taken draws the shape closer to completion. Thank you."', interruptionDC: 16, ifInterrupted: '"*the villain\'s mouth continues moving. No sound comes out. The walls pulse.*" The monologue was never about you hearing it. It was a ritual.', ifCompleted: 'The building IS the ritual circle. Initiative. The floor begins to glow.', dramaticPause: 'Before "Thank you" — every light source dims. The temperature drops 10 degrees. Something SHIFTS behind the walls.' },
  { archetype: 'tyrant', moment: 'victory', speech: '"Look at your precious heroes. Broken. Bleeding. This is what happens when you challenge the natural order. I am not evil — I am INEVITABLE. The strong rule. The weak serve. That is the way of things. Now... kneel."', interruptionDC: 15, ifInterrupted: '"*backhands the interrupter* I said KNEEL." Attack of opportunity, automatic hit.', ifCompleted: 'CHA DC 14 or the party feels genuinely defeated. The tyrant\'s confidence is infectious. Kneeling is optional but the urge is real.', dramaticPause: 'Before "Now... kneel" — extends hand downward, slowly. Every guard in the room draws their weapon.' },
];

export function getRandomMonologue(): VillainMonologue {
  return MONOLOGUES[Math.floor(Math.random() * MONOLOGUES.length)];
}

export function getMonologuesByArchetype(archetype: VillainArchetype): VillainMonologue[] {
  return MONOLOGUES.filter((m) => m.archetype === archetype);
}

export function getMonologuesByMoment(moment: MonologueMoment): VillainMonologue[] {
  return MONOLOGUES.filter((m) => m.moment === moment);
}

export function getAllArchetypes(): VillainArchetype[] {
  return [...new Set(MONOLOGUES.map((m) => m.archetype))];
}

export function getAllMonologueMoments(): MonologueMoment[] {
  return [...new Set(MONOLOGUES.map((m) => m.moment))];
}

export function formatMonologue(monologue: VillainMonologue): string {
  const icon = { mastermind: '🧠', zealot: '🔥', tragic: '😢', petty: '😤', eldritch: '🌀', tyrant: '👑' }[monologue.archetype];
  const lines = [`${icon} **${monologue.archetype.toUpperCase()} — ${monologue.moment.replace(/_/g, ' ')}** (Interrupt DC ${monologue.interruptionDC})`];
  lines.push(`  💬 *${monologue.speech}*`);
  lines.push(`  🎭 Pause: ${monologue.dramaticPause}`);
  lines.push(`  ❌ If interrupted: ${monologue.ifInterrupted}`);
  lines.push(`  ✅ If completed: ${monologue.ifCompleted}`);
  return lines.join('\n');
}

export { MONOLOGUES as VILLAIN_MONOLOGUES };
