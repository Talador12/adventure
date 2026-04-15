import type { OneShotCampaign } from '../types';

export const standingHereIRealize: OneShotCampaign = {
  id: 'oneshot-standing-here-i-realize',
  type: 'oneshot',
  title: 'Standing Here, I Realize',
  tagline: 'Every NPC speaks in memes. The quest board says "one does not simply walk into Mordor." The map is just "here be dragons" everywhere.',
  tone: 'comedic',
  themes: ['comedy', 'war', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The world of Memethica was created by a bored god named Sh1tp0st the Eternal, who communicates exclusively through reference humor and built the entire plane of existence from recycled meme templates. The tavern signs are all "you shall not pass" over the bathroom doors. The economy runs on upvotes. The map literally just says "here be dragons" on every region because the cartographer gave up. The laws of physics are suggestions and the fourth wall is a load-bearing structure that the party is about to lean on very hard.',
  hook: 'The party walks into a tavern. The bartender says: "It is dangerous to go alone. Take this." He hands them a sword. The sword is rusty, dull, and has "FIRST!" carved into the blade. The quest board behind him has one listing: "One does not simply walk into Mordor. But we need someone to try. Reward: doge. Much gold. Very treasure. Wow." A bard in the corner plays a lute and sings nothing but Rickroll lyrics. The party has entered Memethica. There is no exit until the joke is done.',
  twist:
    'The world IS a meme. Sh1tp0st the Eternal created Memethica as a cosmic shitpost — a world built from reference humor to see if anyone would notice it was not real. The party can see the seams: NPCs repeat catchphrases on loops, the landscape tiles if you walk far enough, and the sky occasionally displays a loading icon. Breaking the fourth wall is not metaphorical — it is the actual mechanic for escaping. The party must become aware they are in a game within a game, and then convince the god that the joke has gone far enough.',
  climax:
    'The BBEG stands on a cliff and delivers a monologue composed entirely of villain memes: "I am inevitable." "You underestimate my power." "I have the high ground." The party realizes that the only way to defeat a meme villain is with a better meme. The final battle is not combat — it is a meme-off. Whoever delivers the most devastating reference wins. The god watches from the sky, represented by a giant floating "thinking" emoji. If the party wins, the world dissolves into pixels and they wake up in a real tavern, holding the same rusty sword, which now has "GG" carved into it.',
  scenes: [
    {
      title: 'Scene 1: The Tavern of Recycled Tropes',
      summary: 'The party enters Memethica and immediately encounters a world where every NPC is a walking reference. The quest is accepted. The confusion begins.',
      challenge: 'social',
      keyEvents: [
        'The bartender: "It is dangerous to go alone. Take this." Hands them a sword. If asked why: "I used to be an adventurer like you. Then I took an arrow to the knee."',
        'The quest board: "One does not simply..." "I can has treasure?" "Nobody expects the Spanish Inquisition" (this one is a trap)',
        'A guard stops them at the door: "Stop right there, criminal scum! Nobody breaks the law on MY watch!" They have broken no laws.',
        'The bard: plays Rickroll on a lute. Refuses to play anything else. "Never gonna give you up" is the only song in his repertoire.',
      ],
    },
    {
      title: 'Scene 2: The Overworld',
      summary: 'The party travels through a landscape made of meme templates. The terrain repeats. The NPCs are on loops. The fourth wall develops visible cracks.',
      challenge: 'exploration',
      keyEvents: [
        'The map: every region labeled "here be dragons." The cartographer is a shiba inu in a hat. "Such map. Very lost. Wow."',
        'A fork in the road. Both paths lead to the same place. A sign says "Why not both?"',
        'The landscape tiles: if you walk far enough east, you end up west. The world is a flat loop. The Flat Earth Conspiracy was right here.',
        'The sky glitches: a loading icon appears for three seconds. An NPC says "do not worry about that."',
        'A merchant sells items: "I will give you one for 500 gold or two for 1000 gold. It is a DEAL."',
      ],
    },
    {
      title: 'Scene 3: The Final Boss - A Meme-Off',
      summary: 'The BBEG delivers a villain monologue made of memes. The party must defeat him with better references. The fourth wall shatters. The god watches.',
      challenge: 'social',
      keyEvents: [
        'The BBEG appears: "Standing here, I realize you were just like me, trying to make history."',
        'His monologue: "I am inevitable." "You underestimate my power." "I have the high ground." All of them. Back to back.',
        'The meme-off begins: the party must deliver references that overpower the BBEG\'s. Creativity is rewarded.',
        'The fourth wall literally cracks. The party can see through it. There is a table on the other side. With dice on it.',
        'Sh1tp0st the Eternal (giant thinking emoji) descends: "Okay that was pretty good. You win. GG no re."',
        'The world dissolves into pixels. The party wakes up in a real tavern. The rusty sword now says "GG."',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Bartender', role: 'quest giver / reference machine', personality: 'Every sentence is a gaming or movie reference. He does not know he is doing it. If confronted: "I do not understand the question, and I will not respond to it." (Which is also a reference.)' },
    { name: 'Sh1tp0st the Eternal', role: 'god / cosmic shitposter', personality: 'A deity who created an entire plane of existence as a joke and is now watching to see if anyone gets it. Appears as a giant floating emoji that changes based on mood. Communicates through meme references and occasionally breaks the fourth wall to address the DM directly.' },
    { name: 'The BBEG (Lord Darkhelm McEdgelord)', role: 'final boss / meme villain', personality: 'A villain whose entire personality is composed of villain cliches and meme quotes. He is not aware he is a collection of references. He thinks he is terrifying. He is correct, but for the wrong reasons.' },
    { name: 'The Shiba Cartographer', role: 'map vendor / good boy', personality: 'A sentient shiba inu in a hat who draws maps. All maps say "here be dragons." He does not know what a dragon is. "Such mystery. Very cartography. Wow."' },
  ],
  keyLocations: [
    { name: 'The Tavern of Recycled Tropes', description: 'A tavern where every decoration, menu item, and piece of furniture is a reference to another fantasy property. The bathroom door says "YOU SHALL NOT PASS." The specials board says "I am Groot" with no further context.', significance: 'Where the one-shot begins. The party\'s first encounter with Memethica.' },
    { name: 'The Overworld', description: 'A tiled landscape that repeats every few miles. NPCs loop through scripted dialogues. The sky occasionally shows a loading bar. It is a video game world that forgot it was not real.', significance: 'The journey between the tavern and the BBEG. Where the fourth wall starts cracking.' },
    { name: 'The Edge of the Map', description: 'Where the world ends. Literally. The terrain stops and there is a void. A sign says "Under Construction" and below it, in smaller text, "lol jk."', significance: 'Where the final boss waits. Where the fourth wall is thinnest. Where the meme-off happens.' },
  ],
  dataSystems: ['socialEncounter', 'encounterWaves', 'puzzleRoom'],
};
