import type { OneShotCampaign } from '../types';

export const theEcho: OneShotCampaign = {
  id: 'oneshot-echo',
  type: 'oneshot',
  title: 'The Echo',
  tagline: 'The party hears their own voices in a dungeon. The echoes are saying different words. The echoes know things.',
  tone: 'horror',
  themes: ['horror', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'In a deep stone dungeon, the party\'s voices echo back to them. Normal at first. Then the echoes start saying different words. The party says "which way?" and the echo says "you should not have come." The echoes know the party\'s names. The echoes know things the party has not said aloud. The echoes are getting closer.',
  hook: 'The first echo is normal. The second is delayed by a second too long. The third says a completely different sentence in the party member\'s own voice. When the party goes silent, the echoes keep talking.',
  twist: 'The echoes are from a parallel version of the party that entered the dungeon from the other side and is walking toward them. In that version, the dungeon\'s trap already triggered: their parallel selves are dead, their voices captured by the dungeon and replayed to lure the living party deeper. The dungeon feeds on adventurers by using their own voices as bait.',
  climax: 'The party reaches the center and finds their own bodies. Dead. Equipped identically. The dungeon is a loop: every party that enters creates echoes that lure the next. Breaking the cycle requires destroying the acoustic heart of the dungeon while their own captured echoes try to stop them.',
  scenes: [
    {
      title: 'Scene 1: Wrong Echoes',
      summary: 'The dungeon echoes start normal and become progressively more disturbing. The party\'s own voices say things they did not say.',
      challenge: 'exploration',
      keyEvents: [
        'First echo: "Hello?" comes back as "Hello?" Normal. Expected. The party relaxes',
        'Second echo: "Which way?" comes back a beat too late. "You should not have come." In the same voice. The party member who spoke did not say that',
        'Third echo: nobody speaks. The echo says the party member\'s name. Full name. The one they have not spoken aloud in the dungeon',
        'The echoes become conversational without the party speaking: "Turn back. We did not. Look where it got us." It is the party member\'s own voice, pleading',
      ],
    },
    {
      title: 'Scene 2: The Convergence',
      summary: 'The party pushes deeper and the echoes grow louder, more distinct, more desperate. They are not echoes. They are recordings of the dead.',
      challenge: 'puzzle',
      keyEvents: [
        'The echoes warn of specific traps that are ahead, proving they know the dungeon',
        'A room where the echoes are visible as shimmering sound-shapes in the air',
        'The acoustic architecture: the dungeon is built to capture, store, and replay sound',
        'A trap that uses the party\'s own voice to trigger: "I open the door" plays, and a door opens',
      ],
    },
    {
      title: 'Scene 3: The Bodies',
      summary: 'The center of the dungeon. The party finds their own corpses. The echoes manifest as hostile sound constructs.',
      challenge: 'combat',
      keyEvents: [
        'The center: a circular room. Perfect silence. Then the party sees the bodies. Their own faces. Their own armor. Dead for days. One of them is still holding a weapon the party member is holding right now',
        'The bodies are from a previous loop. Same gear. Same scars. A journal in a dead pocket describes this exact dungeon run in the party member\'s handwriting',
        'The echoes solidify into shapes of sound: translucent copies of the party that fight with the party\'s own abilities, one step ahead because they already know the moves',
        'The acoustic heart: a crystal humming with every voice it has ever stolen. Destroying it releases a wall of sound - every scream, every warning, every "turn back" - and then silence. The silence afterward is the loudest thing the party has ever heard',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Echoes', role: 'antagonist / warning', personality: 'Captured voices of dead adventurers replayed by the dungeon. They are not sentient. They are recordings that have been played so many times they have developed a pattern that mimics personality.' },
    { name: 'Previous Explorer (journal)', role: 'information', personality: 'Found via a journal near a body at the dungeon\'s entrance. Documented the echo phenomenon and theorized the dungeon was alive before their entries stopped mid-sentence.' },
  ],
  keyLocations: [
    { name: 'The Echo Dungeon', description: 'A stone complex with perfect acoustics designed to capture, store, and weaponize sound.', significance: 'The entire adventure. The dungeon itself is the antagonist.' },
    { name: 'The Resonance Chamber', description: 'A room where echoes become visible as shimmering shapes, sound given form.', significance: 'Where the party understands what the echoes truly are.' },
    { name: 'The Acoustic Heart', description: 'A circular room at the dungeon\'s center containing a crystal that stores every sound ever made inside.', significance: 'The climax. Destroying it breaks the cycle. The silence afterward is deafening.' },
  ],
  dataSystems: ['hauntedLocation', 'puzzleLock', 'encounterWaves', 'combatNarration', 'environmentalHazard'],
};
