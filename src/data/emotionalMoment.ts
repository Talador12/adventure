// Random emotional moment generator — narrative beats that make players feel things.

export type EmotionType = 'joy' | 'grief' | 'hope' | 'fear' | 'wonder' | 'rage' | 'tenderness';

export interface EmotionalMoment {
  type: EmotionType; title: string; setup: string; delivery: string; mechanicalTrigger: string | null; dmTip: string;
}

const MOMENTS: EmotionalMoment[] = [
  { type: 'joy', title: 'The Letter from Home', setup: 'After a long quest, a courier finds the party. They have a letter. It\'s from someone the party helped 10 sessions ago.', delivery: '"Dear heroes, I wanted you to know: because of what you did, my daughter is alive. She took her first steps yesterday. She\'ll never know your names, but I will tell her every night that good people exist. Thank you."', mechanicalTrigger: 'All party members gain Inspiration.', dmTip: 'Read this letter aloud. Slowly. Let the silence after it land.' },
  { type: 'grief', title: 'The Empty Chair', setup: 'The party returns to a tavern they frequented. Their usual table is set. One extra chair — for the NPC (or PC) who didn\'t make it back.', delivery: 'The barkeep sets down a mug at the empty seat. "On the house. For them." Nobody ordered it. The barkeep remembers.', mechanicalTrigger: null, dmTip: 'Don\'t explain it. Let the players figure out who the chair is for. The realization is the moment.' },
  { type: 'hope', title: 'The Seedling', setup: 'In the ruins of a city the party couldn\'t save, a single green shoot pushes through the ash.', delivery: 'It shouldn\'t be growing here. There\'s no water, no soil worth the name. But life doesn\'t ask permission. It just grows.', mechanicalTrigger: 'A druid in the party senses it: this plant is the beginning of a new forest. In 100 years, this ruin will be a garden.', dmTip: 'This moment is about what comes AFTER the tragedy. The party failed. But failure isn\'t the end of the story.' },
  { type: 'wonder', title: 'The First Time They See It', setup: 'The party crests a hill, rounds a corner, or clears the treeline. And they see something impossible.', delivery: 'A city floating in the sky, anchored by chains of light. A dragon the size of a mountain, sleeping peacefully. An ocean of stars beneath their feet. Something that makes the world feel bigger.', mechanicalTrigger: null, dmTip: 'Describe it in sensory detail. What they hear. What they smell. How the light falls. Don\'t rush. Let them LOOK.' },
  { type: 'tenderness', title: 'The Monster\'s Child', setup: 'The party defeats a fearsome creature. As it falls, a small sound comes from behind it. A cub. An egg. A nest.', delivery: 'The creature wasn\'t attacking them. It was defending this. The cub approaches the body, nudges it, and makes a sound that doesn\'t need translation.', mechanicalTrigger: 'Moral choice: the cub/egg imprints on whoever approaches first. New companion — or find it a home.', dmTip: 'This recontextualizes the fight. The monster was never the villain. The party has to sit with that.' },
  { type: 'rage', title: 'The Broken Promise', setup: 'An NPC the party trusted reveals they\'ve been working against them. Not for evil — for a reason that makes terrible sense.', delivery: '"I\'m sorry. I am. But you wouldn\'t understand. I had to choose between saving you and saving everyone. I chose everyone. That\'s what heroes do. Even the ones nobody thanks."', mechanicalTrigger: 'The betrayer offers no fight. They stand there. What the party does next defines their alignment.', dmTip: 'The betrayer should be RIGHT. Not morally, but logically. Make the players angry AND conflicted.' },
  { type: 'fear', title: 'The Silence Before', setup: 'The party is about to face the final boss. They\'re standing outside the door. Nobody opens it.', delivery: 'For one moment, nobody is a hero. They\'re just people. Scared people. Looking at each other and wondering if this is the last time.', mechanicalTrigger: 'Each player who shares what their character is thinking/feeling gains Inspiration. Vulnerability is strength.', dmTip: 'Don\'t rush to combat. This pause is WHERE the heroism lives. Let them be afraid. Then let them open the door anyway.' },
];

export function getRandomMoment(): EmotionalMoment { return MOMENTS[Math.floor(Math.random() * MOMENTS.length)]; }
export function getMomentsByType(type: EmotionType): EmotionalMoment[] { return MOMENTS.filter((m) => m.type === type); }
export function getAllEmotionTypes(): EmotionType[] { return [...new Set(MOMENTS.map((m) => m.type))]; }
export function getMomentsWithMechanics(): EmotionalMoment[] { return MOMENTS.filter((m) => m.mechanicalTrigger !== null); }
export function formatMoment(m: EmotionalMoment): string {
  const icon = { joy: '😊', grief: '😢', hope: '🌱', fear: '😰', wonder: '✨', rage: '😡', tenderness: '💛' }[m.type];
  const lines = [`${icon} **${m.title}** *(${m.type})*`]; lines.push(`  Setup: ${m.setup}`);
  lines.push(`  💬 *${m.delivery}*`); lines.push(`  🎯 DM tip: ${m.dmTip}`);
  if (m.mechanicalTrigger) lines.push(`  ⚙️ ${m.mechanicalTrigger}`); return lines.join('\n');
}
export { MOMENTS as EMOTIONAL_MOMENTS };
