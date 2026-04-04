import type { OneShotCampaign } from '../types';

export const theOracleIsDrunk: OneShotCampaign = {
  id: 'oneshot-oracle-drunk',
  type: 'oneshot',
  title: 'The Oracle Is Drunk',
  tagline: 'The prophecy was supposed to save the kingdom. The oracle was three ales deep.',
  tone: 'comedic',
  themes: ['comedy', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The kingdom\'s Oracle delivered a prophecy to save the realm from a dragon: "The hero with a heart of gold shall enter the cave of shadows, pull the Sword of Dawn from the stone, and strike the beast at twilight." The king sent his best knight. The knight is dead. Turns out the Oracle was drunk and the prophecy is garbage — wrong cave, wrong sword, wrong time. Now the dragon arrives tomorrow and the party must figure out the REAL way to stop it by reinterpreting a drunk oracle\'s ramblings.',
  hook: 'The Oracle, nursing a hangover: "I said WHAT? Cave of shadows? There\'s no cave of shadows. I might have said \'cave of shallow puddles.\' Or \'Dave\'s shadow.\' I was on my fourth ale. Look, the visions were real. My descriptions were... creative."',
  twist: 'The prophecy IS real — every word is accurate. The Oracle just used drunk logic. "Heart of gold" is literal (a golden heart-shaped locket). "Cave of shadows" is a puppeteer\'s workshop (shadow puppets). "Sword of Dawn" is a rooster named Dawn (you pull it from its roost). "Strike the beast at twilight" means perform a shadow puppet show for the dragon at sunset — it\'s a dragon who loves theater.',
  climax: 'The party must gather the prophesied items (through increasingly absurd interpretation), arrive at the dragon\'s lair at twilight, and perform a shadow puppet show that\'s good enough to calm a dragon. The dragon is a theater critic. It has opinions.',
  scenes: [
    {
      title: 'Scene 1: Reinterpreting the Prophecy',
      summary: 'The Oracle, hungover, tries to remember what she actually saw. The party must decipher drunk prophecy into actionable intel.',
      challenge: 'social',
      keyEvents: [
        'The Oracle\'s hangover: "The vision was clear. The words were... approximations."',
        'Parsing the prophecy line by line: what did she MEAN by each phrase?',
        'Multiple interpretations for each line — the party must choose',
        'The time pressure: the dragon arrives tomorrow at sundown',
      ],
    },
    {
      title: 'Scene 2: The Scavenger Hunt',
      summary: 'Gathering the prophesied items across the kingdom. Each item is mundane, absurd, and guarded by its own mini-challenge.',
      challenge: 'exploration',
      keyEvents: [
        'The golden locket: in a pawnshop, being haggled over by a very aggressive grandmother',
        'Dave\'s shadow puppet workshop: Dave is very protective of his art and demands a critique',
        'Dawn the rooster: in a henhouse, ill-tempered, and very fast',
        'Assembling the pieces: the party realizes the prophecy makes drunk sense',
      ],
    },
    {
      title: 'Scene 3: The Performance',
      summary: 'The dragon arrives. The party performs a shadow puppet show with a rooster, a locket, and whatever dignity they have left.',
      challenge: 'social',
      keyEvents: [
        'The dragon: massive, terrifying, and... settling into a comfortable viewing position?',
        'The shadow puppet show: the party must actually perform, and the dragon has standards',
        'Dragon critique: "The pacing in act two was weak. The rooster was a strong choice."',
        'Resolution: the dragon is entertained, the kingdom is saved, the Oracle swears off ale (she won\'t)',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Oracle Esmerelda', role: 'the drunk oracle', personality: 'A genuine oracle with a genuine drinking problem. Her visions are always accurate. Her vocabulary after ale is not. "I see the TRUTH. I describe it... loosely."' },
    { name: 'Dave', role: 'shadow puppet artist', personality: 'A passionate puppeteer who takes his art very seriously. "Shadow puppetry is the highest form of expression. Higher than painting. FIGHT ME."' },
    { name: 'Scorchthroat the Dragon', role: 'the dragon / theater critic', personality: 'A dragon who has been terrorizing the kingdom because nobody performs for her anymore. She doesn\'t want gold. She wants ENTERTAINMENT. "I\'ve burned three kingdoms for bad theater. Don\'t disappoint me."' },
  ],
  keyLocations: [
    { name: 'The Oracle\'s Temple', description: 'A sacred temple with incense, crystals, and an alarming number of empty ale bottles.', significance: 'Where the prophecy is reinterpreted.' },
    { name: 'Dave\'s Workshop', description: 'A tiny shop full of shadow puppets, screens, and one very intense artist.', significance: 'Where the "cave of shadows" turns out to be.' },
    { name: 'Scorchthroat\'s Lair', description: 'A mountain cave arranged like a theater — natural acoustics, a "stage" area, and scorch marks where previous performers disappointed.', significance: 'Where the final performance takes place.' },
  ],
  dataSystems: ['oracleConsultation', 'dragonPersonality', 'socialEncounter', 'merchantHaggling', 'riddleGenerator'],
};
