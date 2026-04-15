import type { OneShotCampaign } from '../types';

export const theBigGame: OneShotCampaign = {
  id: 'oneshot-big-game',
  type: 'oneshot',
  title: 'The Big Game',
  tagline: 'The whole team has food poisoning. The championship is at noon. The children are already painting your names on banners.',
  tone: 'social',
  themes: ['social', 'comedy'],
  playerCount: { min: 4, max: 6 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Millbrook and Thornvale have played the annual Dragonball championship for a century. Thornvale has won the last thirty years straight. Millbrook\'s team got food poisoning. The party is the replacement team. The entire village\'s morale rides on this game.',
  hook: 'The village elder grabs the party at dawn: "Our team ate bad clams. All of them. The game is at noon. You are athletes, yes? Please say yes. The children are already painting banners."',
  twist:
    'Thornvale has been winning because their star player is a polymorphed hill giant. He is genuinely nice and does not realize it is cheating. He thinks he is just naturally talented. His team knows and has been hiding it for years.',
  climax:
    'The final round. The score is tied. The party spots the giant\'s true nature mid-play. Expose him and win by default (crushing the giant\'s feelings and ruining a thirty-year friendship), or beat him fair and square despite the disadvantage.',
  scenes: [
    {
      title: 'Scene 1: Training Montage',
      summary: 'The party learns the rules of Dragonball, practices, and rallies the village.',
      challenge: 'social',
      keyEvents: [
        'Dragonball rules: a mix of rugby, dodgeball, and mild violence. Three rounds.',
        'Training: Athletics, Acrobatics, and teamwork checks. The party is terrible.',
        'The village watches. Children cheer. The pressure is enormous.',
        'Scouting Thornvale: their star player, "Big Berrick," is suspiciously large.',
      ],
    },
    {
      title: 'Scene 2: The Game',
      summary: 'Two rounds of chaotic, skill-check-based sport. The party plays their hearts out.',
      challenge: 'social',
      keyEvents: [
        'Round 1: Thornvale scores three times. Big Berrick plows through two party members like they are made of paper. The crowd groans.',
        'Halftime: Coach Millicent delivers a speech that makes grown warriors weep. "Thirty years I have waited. You will not give me thirty-one."',
        'Round 2: The party runs a play using Berrick\'s overconfidence. They score. The crowd erupts so loud the birds scatter.',
        'A collision with Berrick: the party member bounces off him like hitting stone. His skin rippled. Something is very wrong.',
      ],
    },
    {
      title: 'Scene 3: The Final Round',
      summary: 'Tied game. The party discovers the truth about Berrick. Win honorably or expose the cheat.',
      challenge: 'social',
      keyEvents: [
        'The party realizes Berrick is polymorphed. Detect Magic confirms it.',
        'Expose him: automatic win, but Berrick is devastated. He thought he was just good.',
        'Beat him fairly: harder, but the victory means everything.',
        'The crowd, the stakes, the final play. The village holds its breath.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Big Berrick',
      role: 'rival player / polymorphed giant',
      personality: 'Friendly, sportsmanlike, and heartbreakingly sincere. He loves the game. He has no idea he is cheating. He thinks all his trophies are earned.',
      secret: 'A witch polymorphed him as a baby. He has lived his entire life as a human. The truth would destroy his identity.',
    },
    {
      name: 'Coach Millicent',
      role: 'Millbrook coach',
      personality: 'A fiery halfling woman who has endured thirty years of losses. She will accept nothing less than absolute effort. Her halftime speeches could rally an army.',
    },
  ],
  keyLocations: [
    {
      name: 'The Championship Field',
      description: 'A grassy field between the two villages, ringed by spectators, banners, and a worrying amount of emotional investment.',
      significance: 'Where glory or humiliation happens. The whole village is watching.',
    },
  ],
  dataSystems: ['moraleTracker', 'npcGenerator', 'combatNarration'],
};
