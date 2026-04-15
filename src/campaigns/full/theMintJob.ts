import type { FullCampaign } from '../types';

export const theMintJob: FullCampaign = {
  id: 'full-mint-job',
  type: 'full',
  title: 'The Mint Job',
  tagline: 'The royal mint is inside a sleeping dragon. The dragon runs the economy.',
  tone: 'heist',
  themes: ['heist', 'intrigue', 'comedy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 11 },
  estimatedSessions: 12,
  settingSummary:
    'The Kingdom of Verdane backs its currency with dragon scales. The royal mint operates inside the cavernous belly of Mount Auric, where the ancient gold dragon Aurixia has slept for three centuries. Mint workers tiptoe around her in shifts, collecting shed scales, pressing coins, and praying she does not roll over. The economy is literally built on top of a dragon. The party is hired to steal a master press plate that would let a crime syndicate counterfeit Verdane crowns.',
  hook: 'Guildmaster Torvin slides a blueprint across the table. It shows the mint\'s layout - tunnels, presses, guard rotations - all built around the sleeping form of a dragon the size of a cathedral. "The plate is in the master press, fifty feet from her left nostril. Do not wake her. Do not touch a scale. Do not breathe loudly. The mint workers do eight-hour shifts in felt-soled boots. You have one night."',
  twist:
    'Aurixia is not asleep. She has been awake for decades, watching. She runs the economy deliberately - controlling the money supply by how many scales she sheds. She lets the party in because the counterfeit operation Torvin represents is not her problem. Inflation is. A neighboring kingdom has been debasing their currency to destabilize Verdane, and it is working. She needs someone with hands small enough to fix it. The dragon offers a counter-heist: help her stabilize the currency and she will give Torvin a fake plate that will satisfy his bosses. Refuse, and she eats them.',
  climax:
    'The party must pull off two heists at once - delivering Torvin a convincing fake plate while secretly executing Aurixia\'s counter-operation against the foreign currency manipulators. This means infiltrating the neighboring kingdom\'s treasury, swapping their debased coin dies, and getting back before Torvin realizes the plate is worthless. The climax is a split-party operation where trust in each other is the only thing holding it together.',
  acts: [
    {
      title: 'Act 1: The Silent Heist',
      summary:
        'Planning and executing the original job. The party infiltrates the mint, navigates around the "sleeping" dragon, and learns the terrifying logistics of an economy built on monster biology. Everything is whispered.',
      keyEvents: [
        'Torvin\'s briefing: the mint layout, the dragon, the plate, the one-night window',
        'Casing the mint: meeting workers, learning shift patterns, the felt-shoe protocol',
        'The infiltration: silent movement past a dragon whose every breath is a windstorm',
        'Reaching the master press - and Aurixia opens one eye',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Dragon\'s Bargain',
      summary:
        'Aurixia reveals herself and the real economic crisis. She is not a monster sitting on gold - she is a central banker with scales. The party learns economics is more dangerous than dungeons and agrees to the counter-heist.',
      keyEvents: [
        'Aurixia speaks: she has been managing the economy for three centuries',
        'The inflation crisis explained: a foreign kingdom is flooding the market with debased coins',
        'Aurixia\'s offer: do her job, get a fake plate for Torvin, leave alive',
        'Preparing the counter-heist: infiltrating the neighboring kingdom\'s treasury',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Double Mint',
      summary:
        'Running both operations simultaneously. Deliver Torvin\'s fake. Infiltrate the foreign treasury. Swap the coin dies. Get out before either side catches on. The dragon watches from her mountain, amused.',
      keyEvents: [
        'Delivering the convincing fake plate to Torvin - he tests it, the party sweats',
        'Infiltrating the foreign treasury: guards, wards, a rival dragon rumor',
        'The coin die swap: replacing debased dies with properly valued ones mid-production',
        'The escape: both operations converge as Torvin discovers the fake and the foreign king discovers the swap',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Aurixia',
      role: 'dragon / secret ally',
      personality:
        'An ancient gold dragon who discovered that controlling a currency is more interesting than hoarding gold. Speaks with the calm authority of someone who has been right about economics for three hundred years. Dry humor. "Inflation is the real monster."',
      secret: 'She genuinely enjoys the mint workers and considers them her hoard. She protects people, not gold.',
    },
    {
      name: 'Guildmaster Torvin',
      role: 'quest giver / antagonist',
      personality:
        'A crime lord who runs the counterfeit operation. Charming, ruthless, treats the party as expendable tools. He does not know about the dragon being awake and would abandon the job instantly if he did.',
    },
    {
      name: 'Della (mint forewoman)',
      role: 'ally / comic relief',
      personality:
        'Twenty years working fifty feet from a dragon. Nothing scares her anymore. Speaks exclusively in whispers even outside the mint. "You get used to the snoring. You never get used to the gas."',
    },
    {
      name: 'King Aldric of Sorvaine',
      role: 'secondary antagonist',
      personality:
        'The foreign king behind the currency manipulation. Not a warrior - an economist. Wages war with exchange rates. Genuinely believes destabilizing Verdane is justified because their dragon-backed currency gives them unfair advantage.',
    },
  ],
  keyLocations: [
    {
      name: 'The Royal Mint (Mount Auric)',
      description: 'A vast cavern system where the dragon sleeps and the mint operates. Presses, furnaces, and vaults built around a living creature the size of a hill.',
      significance: 'The primary heist location. Silence is survival.',
    },
    {
      name: 'Aurixia\'s Eye',
      description: 'The inner chamber where the dragon\'s head rests. Workers call it the Eye because she seems to watch them even in sleep. They were right.',
      significance: 'Where the party meets the real power behind the economy.',
    },
    {
      name: 'The Sorvaine Treasury',
      description: 'A fortified building in a foreign capital. Heavily guarded, conventionally warded. Almost boring compared to working inside a dragon.',
      significance: 'The counter-heist target.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'trapDisarm',
    'puzzleLock',
    'merchantHaggling',
    'socialEncounter',
    'stealthEncounter',
    'encounterWaves',
    'countdownClock',
  ],
};
