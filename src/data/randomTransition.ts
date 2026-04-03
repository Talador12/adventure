// Random scene transition — narrative bridges between scenes.
export const TRANSITIONS: string[] = [
  '"Hours pass. The sun moves across the sky. The world goes on."',
  '"The road stretches ahead. Miles blur together. Then—"',
  '"Night falls. Morning comes. You\'re still alive. That\'s something."',
  '"Three days later..."',
  '"Meanwhile, elsewhere in the city..."',
  '"The celebration ends. The hangovers begin. But there\'s work to do."',
  '"The door closes behind you. Ahead: the unknown."',
  '"Silence. Then the sound of hooves. Someone is coming."',
  '"You rest. You heal. You plan. And then you move."',
  '"The seasons don\'t wait for adventurers. Winter comes."',
  '"One week passes without incident. Which, in your experience, means something terrible is about to happen."',
  '"Dawn breaks on a world that doesn\'t know how close it came to ending."',
];
export function getRandomTransition(): string { return TRANSITIONS[Math.floor(Math.random() * TRANSITIONS.length)]; }
export function formatTransition(): string { return `🎬 *${getRandomTransition()}*`; }
