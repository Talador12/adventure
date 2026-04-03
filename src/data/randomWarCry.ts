// Random war cry generator — battle shouts for NPCs, enemies, and PCs.
export const WAR_CRIES: string[] = [
  '"For honor and glory!"', '"No mercy!"', '"CHARGE!"', '"Hold the line!"',
  '"You shall not pass!"', '"Today we feast in the halls of our ancestors!"',
  '"Blood and thunder!"', '"For the horde!"', '"Death before dishonor!"',
  '"Remember the fallen!"', '"Break their ranks!"', '"To arms! To arms!"',
  '"They will remember this day!"', '"Sound the horn! We ride to war!"',
  '"The only good enemy is a dead enemy!"', '"Stand firm! They cannot break us!"',
];
export function getRandomWarCry(): string { return WAR_CRIES[Math.floor(Math.random() * WAR_CRIES.length)]; }
export function formatWarCry(characterName: string = 'Enemy'): string { return `⚔️ **${characterName} shouts:** *${getRandomWarCry()}*`; }
