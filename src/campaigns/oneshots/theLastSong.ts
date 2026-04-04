import type { OneShotCampaign } from '../types';

export const theLastSong: OneShotCampaign = {
  id: 'oneshot-last-song',
  type: 'oneshot',
  title: 'The Last Song',
  tagline: 'A bard\'s final performance. The audience is one. The stage is the afterlife.',
  tone: 'serious',
  themes: ['classic_fantasy', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 7,
  estimatedHours: 3,
  settingSummary:
    'A legendary bard is dying. Her final wish: perform one last song in the Hall of Echoes — a mythical chamber in the afterlife where every song ever sung still resonates. The party must escort her spirit to the Hall, past guardians of the dead, through a landscape of memories, to the one place where a mortal voice can echo forever.',
  hook: 'The bard Lyanna, beloved by millions, lies on her deathbed. She has one request: "Take me to the Hall of Echoes. Not my body — my spirit. I have one more song. It\'s the most important one I\'ve ever written. Please."',
  twist: 'The song isn\'t for the audience. It\'s for her daughter, who died as a child decades ago and whose spirit waits in the Hall. The entire career — every song, every performance, every legendary concert — was Lyanna working toward one goal: becoming good enough to sing a song that reaches the dead. This is it.',
  climax: 'The party reaches the Hall of Echoes. Lyanna performs her final song — a lullaby for her daughter. The Hall amplifies it across the entire afterlife. Every spirit hears it. The daughter\'s ghost appears. The reunion is brief, beautiful, and final. Lyanna passes peacefully. The song echoes forever.',
  scenes: [
    {
      title: 'Scene 1: The Crossing',
      summary: 'Lyanna\'s spirit separated from her body. The party enters the threshold between life and death.',
      challenge: 'exploration',
      keyEvents: [
        'Lyanna\'s death: peaceful, prepared, and she immediately gets up as a spirit',
        'The threshold: a misty border where the living can walk among the dead',
        'The guardians: spirits who test travelers\' right to enter',
        'Lyanna is weak as a spirit — the party must protect her from fading',
      ],
    },
    {
      title: 'Scene 2: The Memory Road',
      summary: 'The path to the Hall passes through a landscape made of memories. Lyanna\'s memories manifest as encounters — moments from her life that the party must help her through.',
      challenge: 'social',
      keyEvents: [
        'A memory of her first performance: a tavern, a jeering crowd, the moment she almost quit',
        'A memory of her greatest concert: thousands cheering, but she\'s looking for one face in the crowd',
        'A memory of her daughter\'s death: the party must help her face it without breaking down',
        'The Hall appears on the horizon: a vast amphitheater of crystallized sound',
      ],
    },
    {
      title: 'Scene 3: The Last Song',
      summary: 'The Hall of Echoes. Every song ever sung resonates here. Lyanna performs her final work. It\'s a lullaby.',
      challenge: 'social',
      keyEvents: [
        'The Hall: every surface hums with ten thousand years of music',
        'Lyanna tunes her spectral instrument — the party stands guard against entities drawn by the music',
        'The song: a lullaby for a daughter who died forty years ago',
        'The daughter appears: a small ghost who\'s been waiting. "Mama?" — and the song becomes a duet',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Lyanna Songweaver', role: 'the bard / quest purpose', personality: 'A legendary bard who has performed for kings and commoners. At the end, the only audience that matters is one small ghost. She is tired, peaceful, and ready — but she needs to finish this first.' },
    { name: 'Melody (the daughter)', role: 'the destination', personality: 'A child\'s ghost who has been in the Hall of Echoes for forty years, listening to every song that echoes through. She recognized her mother\'s voice decades ago and has been waiting.' },
    { name: 'The Warden of Echoes', role: 'guardian / gatekeeper', personality: 'The spirit who maintains the Hall. Lets in only those whose music deserves to echo forever. Has heard every song. Lyanna\'s is different. "I have heard ten thousand years of music. I have never heard a mother sing for her dead child. You may enter."' },
  ],
  keyLocations: [
    { name: 'The Threshold', description: 'The border between life and death — a misty, quiet place where both sides are visible.', significance: 'Where the journey begins.' },
    { name: 'The Memory Road', description: 'A path through the afterlife made of Lyanna\'s memories — each one a scene the party walks through.', significance: 'The emotional journey.' },
    { name: 'The Hall of Echoes', description: 'A vast amphitheater where every song ever sung still resonates in the walls. The acoustics are perfect. The audience is eternity.', significance: 'Where the final song is performed.' },
  ],
  dataSystems: ['deathSaveDrama', 'dreamSequence', 'socialEncounter', 'ambientSounds', 'combatNarration'],
};
