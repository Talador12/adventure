// Random post-combat moment — what happens in the silence after the fight.
export interface PostCombatMoment { moment: string; type: 'emotional' | 'practical' | 'ominous' | 'humorous'; }
const MOMENTS: PostCombatMoment[] = [
  { moment: 'Someone realizes they\'re still gripping their weapon white-knuckled. They slowly let go.', type: 'emotional' },
  { moment: 'The adrenaline fades. Everything hurts. Someone sits down heavily.', type: 'emotional' },
  { moment: 'Time to loot the bodies. The pragmatism of adventuring.', type: 'practical' },
  { moment: 'A distant sound — was that a horn? Are there more coming?', type: 'ominous' },
  { moment: '"Is everyone alive? Count off." One... two... three... *long pause* ...four. "Thank the gods."', type: 'emotional' },
  { moment: 'Someone starts laughing. Then everyone is laughing. Then someone is crying. It\'s complicated.', type: 'humorous' },
  { moment: 'Among the fallen enemies, you find a letter. It\'s a love letter. The enemy was a person.', type: 'emotional' },
  { moment: '"We should go. Before someone comes to investigate the noise."', type: 'practical' },
  { moment: 'One of the enemies is still breathing. Barely. What do you do?', type: 'ominous' },
  { moment: '"That went better than expected." "Your expectations are terrifyingly low."', type: 'humorous' },
];
export function getRandomPostCombat(): PostCombatMoment { return MOMENTS[Math.floor(Math.random() * MOMENTS.length)]; }
export function formatPostCombat(m: PostCombatMoment): string { return `🕊️ **After the Fight** (${m.type}):\n*${m.moment}*`; }
