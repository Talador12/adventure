import type { OneShotCampaign } from '../types';

export const theGodsPlayPoker: OneShotCampaign = {
  id: 'oneshot-gods-play-poker',
  type: 'oneshot',
  title: 'The Gods Play Poker',
  tagline: 'The fate of the world depends on a bluff. Your bluff.',
  tone: 'comedic',
  themes: ['comedy', 'planar'],
  playerCount: { min: 3, max: 6 },
  level: 10,
  estimatedHours: 3,
  settingSummary:
    'The party is summoned to the divine plane to settle a dispute between gods — through a poker tournament. Each player represents a different deity at the table. The stakes are divine domains: whoever wins takes control of the losers\' spheres of influence for the next century. The cards are enchanted, the chips are souls, and the gods are cheating.',
  hook: 'The party is yanked out of their beds and dropped into golden chairs around a card table the size of a continent. A celestial dealer shuffles cards that show moving pictures. "Ladies, gentlemen, and miscellaneous: welcome to the Divine Invitational. Each of you has been selected to represent a god. The game is poker. The stakes are everything. The buffet is to your left."',
  twist:
    'The gods didn\'t bring the party here to play FOR them — they brought the party to play AGAINST them. The gods are tired of their eternal game and want mortals to beat them, proving that mortal ingenuity surpasses divine power. But they can\'t just lose on purpose (divine rules prevent it). They need the mortals to genuinely outplay them. Every god at the table is secretly rooting for the party while playing to win.',
  climax:
    'The final hand. The party\'s champion faces the god of luck (who literally controls probability). The only way to win is to bluff so well that even a god who knows all outcomes second-guesses themselves. If the party wins, they get to reassign divine domains for the century — with world-changing consequences.',
  scenes: [
    {
      title: 'Scene 1: The Table',
      summary:
        'Arrival at the divine poker table. The party meets the gods, learns the rules, and plays the first round. The cards are alive and the chips are fragments of reality.',
      challenge: 'social',
      keyEvents: [
        'Summoned to the divine plane — the table is set among the stars',
        'Meet the players: God of War (aggressive), Goddess of Love (reads tells), God of Luck (cheats legally)',
        'Round 1: tutorial round — learn the enchanted cards (they change suit if you\'re brave enough)',
        'The stakes explained: whoever wins controls the losers\' divine domains for a century',
      ],
    },
    {
      title: 'Scene 2: The Rounds',
      summary:
        'Multiple hands of divine poker. Each round involves not just card play but divine abilities: reading thoughts, manipulating luck, intimidation that shakes reality.',
      challenge: 'social',
      keyEvents: [
        'The God of War tries to intimidate — his bluffs literally shake the table',
        'The Goddess of Love reads everyone\'s emotions perfectly — lying to her requires extraordinary effort',
        'The God of Luck reshuffles the deck with a wink — caught cheating, but "it\'s not cheating if I\'m the god of luck"',
        'A god is eliminated — their reaction is surprisingly graceful (and reveals the twist)',
      ],
    },
    {
      title: 'Scene 3: The Final Hand',
      summary:
        'One-on-one against the God of Luck. Pure bluffing against a being who controls probability. The party must find a way to outplay the unplayable.',
      challenge: 'social',
      keyEvents: [
        'Final hand: the party\'s champion vs. the God of Luck',
        'The god knows every possible outcome — the cards WILL favor him',
        'The bluff: the party must convince a god that they have a hand they don\'t have',
        'The result — and what the party does with the power to reassign divine domains',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Korrath, God of War',
      role: 'divine poker player',
      personality:
        'Plays poker like he fights: aggressively, loudly, and by going all-in with terrifying confidence. His bluffs make the table literally shake. A surprisingly good sport about losing.',
    },
    {
      name: 'Aelindra, Goddess of Love',
      role: 'divine poker player',
      personality:
        'Reads emotions perfectly. Knows when you\'re bluffing because she can feel your heart rate change. Warm, amused, and absolutely ruthless at the table. "I can feel you sweating, dear."',
    },
    {
      name: 'Vex, God of Luck',
      role: 'final opponent',
      personality:
        'Controls probability itself. Every coin flip goes his way. Every card he draws is perfect. Wins not through skill but through literal divine intervention. He finds this boring. He WANTS someone to beat him.',
      secret: 'He\'s been trying to lose for millennia. He can\'t. His divine nature won\'t allow it. He needs someone to make him believe, even for a moment, that they might have a better hand.',
    },
  ],
  keyLocations: [
    {
      name: 'The Divine Table',
      description:
        'A poker table floating among the stars, sized for gods. The felt is woven from fate. The chips are fragments of reality. The dealer is an angel who\'s seen everything.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Buffet',
      description:
        'A divine buffet that serves any food ever imagined. Ambrosia, mortal comfort food, and a suspicious fruit labeled "DO NOT EAT." (Someone always eats it.)',
      significance: 'Between-round social interactions and information gathering.',
    },
    {
      name: 'The Observation Gallery',
      description:
        'Where eliminated gods and divine spectators watch the remaining players. The crowd cheers, boos, and places bets.',
      significance: 'Where the twist is revealed through overheard divine conversations.',
    },
  ],
  dataSystems: [
    'deityPantheon',
    'socialEncounter',
    'darkBargain',
    'diplomaticNegotiation',
    'questRewardNegotiation',
  ],
};
