// Epic entrance generator — dramatic ways for NPCs or villains to arrive.
export interface EpicEntrance { name: string; who: string; description: string; audienceReaction: string; mechanicalEffect: string | null; }
const ENTRANCES: EpicEntrance[] = [
  { name: 'The Skyfall', who: 'A dragon', description: 'A shadow passes over the sun. The temperature drops. Then the ground shakes. A dragon lands on the town hall, crushing the bell tower. It folds its wings. "You called?"', audienceReaction: 'Silence. Then screaming. Then silence again when the dragon looks annoyed.', mechanicalEffect: 'All creatures within 60ft: WIS DC 13 or Frightened for 1 round.' },
  { name: 'The Slow Clap', who: 'The villain', description: 'From the shadows at the back of the room: *clap... clap... clap.* "Impressive. Truly. You almost made this difficult."', audienceReaction: 'Everyone turns. The villain has been watching. For how long?', mechanicalEffect: 'The villain had Readied actions. They get a surprise round.' },
  { name: 'The Doors Kick', who: 'The ally arriving just in time', description: 'The door EXPLODES inward. Silhouette in the dust. Backlit by fire. A voice: "Sorry I\'m late. Traffic."', audienceReaction: 'The party\'s morale rockets. The enemies hesitate. One of them swears.', mechanicalEffect: 'All allies gain +2 to their next attack roll (momentum shift).' },
  { name: 'The Quiet One', who: 'The most dangerous person in the room', description: 'They were already sitting there. At the bar. Drinking. They\'ve been here the whole time. They set down their glass. "So. You\'re the ones everyone\'s been talking about."', audienceReaction: 'Realization hits like cold water. How did nobody notice?', mechanicalEffect: null },
  { name: 'The Musical Number', who: 'A bard villain', description: 'Music starts from nowhere. A spotlight appears (magical). The villain descends a staircase that didn\'t exist 5 seconds ago, singing. The song is about how they\'re going to kill you. It has choreography.', audienceReaction: 'Confusion. Concern. Grudging admiration. "Is this... a musical?"', mechanicalEffect: 'CHA DC 14 or compelled to watch the performance for 1 round (charmed). It IS a good song.' },
];
export function getRandomEntrance(): EpicEntrance { return ENTRANCES[Math.floor(Math.random() * ENTRANCES.length)]; }
export function getEntranceCount(): number { return ENTRANCES.length; }
export function getEntrancesWithEffects(): EpicEntrance[] { return ENTRANCES.filter((e) => e.mechanicalEffect !== null); }
export function formatEntrance(e: EpicEntrance): string {
  const lines = [`🎬 **${e.name}** — ${e.who}`, `  *${e.description}*`, `  👥 ${e.audienceReaction}`];
  if (e.mechanicalEffect) lines.push(`  ⚙️ ${e.mechanicalEffect}`); return lines.join('\n');
}
export { ENTRANCES as EPIC_ENTRANCES };
