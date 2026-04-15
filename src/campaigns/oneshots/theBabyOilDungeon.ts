import type { OneShotCampaign } from '../types';

export const theBabyOilDungeon: OneShotCampaign = {
  id: 'oneshot-baby-oil-dungeon',
  type: 'oneshot',
  title: 'The Baby Oil Dungeon',
  tagline: 'Everything is slippery. EVERYTHING.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'Lord Oleaginous, a grotesque minor noble with delusions of grandeur, has built an underground "spa" beneath his estate. In reality it is a dungeon dedicated to his obsession: achieving immortality by bathing in enchanted baby oil. Every surface is coated. Every guard is oiled. The floors are a liability. The entire complex smells like lavender and coconut and poor life decisions. The party has been captured and must escape through the most lubricated dungeon in recorded history.',
  hook:
    'The party wakes up in a marble cell. Their weapons are gone. Their armor is gone. They are wearing complimentary bathrobes. A sign on the wall reads: "Welcome to the Oleaginous Spa Experience. Your involuntary relaxation begins now." Through the door they can hear someone yelling: "MORE OIL! THE IMMORTALITY BATH DEMANDS MORE OIL!"',
  twist:
    'The "enchanted baby oil" is just regular oil. Lord Oleaginous\'s personal alchemist, a goblin named Drizzle, has been scamming him for six years. She buys bulk olive oil from a merchant, adds lavender, and charges him 500 gold per barrel for "Essence of Eternal Youth." She has made an absolute fortune. The enchantment is not real. The immortality is not real. The tiny speedos on the ogre guards are, unfortunately, very real.',
  climax:
    'The party reaches the Immortality Bath - a massive gold tub where Lord Oleaginous floats in oil, surrounded by yes-men telling him he looks younger. Drizzle is watching from the corner, barely containing laughter. The party can fight their way out, expose the scam, or (the funniest option) convince Lord Oleaginous that the oil IS working and he should stay in the tub forever while they leave with his treasury.',
  scenes: [
    {
      title: 'The Moisturizing Chamber',
      summary:
        'The party escapes their cell and enters the first room: a chamber where pressurized oil sprays from the walls. The floor is a skating rink. Two oiled-up ogres in tiny speedos guard the door. Movement requires Dexterity saves. Dignity requires nothing because it is already gone.',
      challenge: 'combat',
      keyEvents: [
        'Dexterity saves to move without falling - failure means sliding into walls, guards, or each other',
        'The ogre guards are impossible to grapple because they are oiled head to toe',
        'Someone discovers the oil is flammable (this changes the tactical calculus significantly)',
        'A sign on the wall reads: "Exfoliation Station Ahead. Please Moisturize First."',
      ],
    },
    {
      title: 'The Exfoliation Pit',
      summary:
        'A room filled with sand and pumice stones on a rotating floor. It is an obstacle course designed for "skin renewal" but functions as a meat grinder. The party must cross while the floor spins, sand blasts from vents, and a cheerful magical voice says: "You are doing GREAT. Your skin will thank you."',
      challenge: 'puzzle',
      keyEvents: [
        'Navigating the rotating floor while being sandblasted requires creative problem-solving',
        'Finding Drizzle\'s supply closet - stacked floor to ceiling with barrels labeled "DEFINITELY ENCHANTED" in suspiciously fresh ink',
        'A captured merchant in the corner who has been here for a week and has "incredibly smooth skin, honestly"',
        'The party finds a map of the dungeon drawn on a bathrobe in lip liner by a previous captive',
      ],
    },
    {
      title: 'The Hot Oil Wrestling Arena',
      summary:
        'Mandatory. Lord Oleaginous watches from a balcony. Two champions must wrestle in a pit of warm oil for "the honor of the spa." The crowd is oiled nobles who cheer like it is the Colosseum. Refusing is not an option. Winning earns passage to the final room.',
      challenge: 'combat',
      keyEvents: [
        'Lord Oleaginous announces: "WELCOME TO THE ARENA. OIL YOURSELVES OR BE OILED."',
        'Wrestling in oil: Athletics checks at disadvantage, grappling is nearly impossible, spectators throw more oil',
        'The opposing wrestlers are an oiled-up owlbear and a very confused gelatinous cube that keeps absorbing the oil',
        'Victory (or hilarious defeat) grants passage to the Immortality Bath chamber',
      ],
    },
    {
      title: 'The Immortality Bath',
      summary:
        'The final room. Lord Oleaginous floats in a massive gold bathtub. His yes-men clap. Drizzle tries not to laugh. The party must escape, fight, or con their way to freedom through the most pathetic villain reveal in dungeon history.',
      challenge: 'social',
      keyEvents: [
        'Lord Oleaginous rises from the tub: "BEHOLD! I AM ETERNAL!" He is a pudgy man in his 50s. He looks exactly his age.',
        'Drizzle, if confronted, breaks immediately: "It is OLIVE OIL. I buy it from a guy named DEREK."',
        'The party can expose the scam, fight the oiled guards, or gaslight Lord Oleaginous into staying in the tub while they rob him',
        'Escape through the front door - which is, of course, oiled and requires one final Dexterity save',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Lord Oleaginous',
      role: 'villain / pathetic',
      personality:
        'A delusional minor noble who believes baby oil is the key to immortality. Surrounded by sycophants. Wears a gold bathrobe and nothing else. Speaks exclusively in declarations. "I AM SMOOTHER THAN TIME ITSELF." He is not.',
      secret: 'Deep down, he knows the oil is not working. He has spent his entire fortune on this. He cannot admit it was for nothing.',
    },
    {
      name: 'Drizzle',
      role: 'scam artist / goblin alchemist',
      personality:
        'The goblin "alchemist" who has been selling regular olive oil as enchanted baby oil for six years. She has made more money than most archmages. Zero guilt. "He WANTED to believe. I just provided the product."',
    },
    {
      name: 'Brug and Slab',
      role: 'oiled ogre guards',
      personality:
        'Two ogres who guard the spa. They hate the speedos. They hate the oil. They hate this job. But the pay is good and the cafeteria has a salad bar. "We do not talk about the speedos."',
    },
  ],
  keyLocations: [
    {
      name: 'The Moisturizing Chamber',
      description:
        'A marble room with pressurized oil jets and a floor so slippery that standing is an achievement. Smells aggressively of coconut.',
      significance: 'First obstacle. Establishes that yes, everything really is this slippery.',
    },
    {
      name: 'The Hot Oil Wrestling Arena',
      description:
        'A colosseum-style pit filled with warm oil. Bleachers for oiled nobles. A scoreboard. A concession stand selling more oil.',
      significance: 'The mandatory spectacle. Lord Oleaginous watches from his balcony.',
    },
    {
      name: 'The Immortality Bath',
      description:
        'A cavernous chamber with a gold bathtub the size of a swimming pool. Oil cascades from the ceiling like a waterfall. It is deeply, profoundly absurd.',
      significance: 'The climax. Where Lord Oleaginous is confronted and the scam is revealed.',
    },
  ],
  dataSystems: ['socialEncounter', 'fantasyInsults', 'trapGenerator', 'combatNarration', 'dungeonRoom'],
};
