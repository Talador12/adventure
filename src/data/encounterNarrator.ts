// Random encounter narrator — dramatic opening text for combat start.

export interface EncounterOpening { text: string; mood: 'tense' | 'surprise' | 'dramatic' | 'horror' | 'action'; }

const OPENINGS: Record<string, EncounterOpening[]> = {
  ambush: [
    { text: 'Without warning, shapes emerge from the shadows! Roll for initiative!', mood: 'surprise' },
    { text: 'A twig snaps. Then another. You\'re surrounded. Steel flashes in the darkness.', mood: 'tense' },
    { text: 'The attack comes from above! Enemies drop from the branches overhead!', mood: 'action' },
  ],
  monster: [
    { text: 'A thunderous roar shakes the ground beneath your feet. Something massive approaches.', mood: 'dramatic' },
    { text: 'The creature emerges slowly, its eyes fixed on the party. It\'s been waiting for this.', mood: 'horror' },
    { text: 'The beast lunges without hesitation, jaws wide, claws extended. Fight or die!', mood: 'action' },
  ],
  undead: [
    { text: 'The dead do not rest here. Bones rattle as skeletal hands claw at the earth.', mood: 'horror' },
    { text: 'A cold wind carries the stench of decay. The shambling figures advance.', mood: 'tense' },
    { text: 'Eyes glow in the darkness — red, unblinking, hungry.', mood: 'horror' },
  ],
  rival: [
    { text: '"We meet again," says a familiar voice. Steel is drawn before the words fade.', mood: 'dramatic' },
    { text: 'Your rivals stand across the clearing, weapons ready. There will be no more talking.', mood: 'tense' },
  ],
  generic: [
    { text: 'Combat erupts! Roll for initiative!', mood: 'action' },
    { text: 'The peace shatters. Weapons are drawn on all sides.', mood: 'action' },
    { text: 'The situation escalates beyond words. Only steel will settle this now.', mood: 'dramatic' },
    { text: 'In an instant, everything changes. The fight is on.', mood: 'action' },
  ],
};

export type EncounterTheme = keyof typeof OPENINGS;

export function getEncounterOpening(theme: EncounterTheme = 'generic'): EncounterOpening {
  const pool = OPENINGS[theme] || OPENINGS.generic;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getAllThemes(): EncounterTheme[] { return Object.keys(OPENINGS) as EncounterTheme[]; }

export function formatEncounterOpening(theme: EncounterTheme = 'generic'): string {
  const opening = getEncounterOpening(theme);
  const moodEmoji = opening.mood === 'horror' ? '💀' : opening.mood === 'surprise' ? '⚡' : opening.mood === 'dramatic' ? '🎭' : opening.mood === 'tense' ? '😰' : '⚔️';
  return `${moodEmoji} *${opening.text}*`;
}
