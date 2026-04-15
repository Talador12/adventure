import type { FullCampaign } from '../types';

export const theWorstDungeon: FullCampaign = {
  id: 'full-the-worst-dungeon',
  type: 'full',
  title: 'The Worst Dungeon',
  tagline: 'We are in beta. Please rate your near-death experience on a scale of 1 to 5.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 7 },
  estimatedSessions: 10,
  settingSummary:
    'Snikkik the kobold has spent his entire life savings building a dungeon. Not to protect treasure or serve a dark lord - as a commercial venture. Adventurers pay an entry fee, clear the dungeon, keep whatever loot they find, and Snikkik makes money from the admission and concessions. Think of it as a theme park for people who like getting stabbed. The problem: the dungeon is not finished. The traps misfire, the monsters are undertrained, and the loot is mostly IOUs. Snikkik needs beta testers before opening day.',
  hook: 'The party answers a job posting nailed to a tavern board: "WANTED: Experienced Adventurers for Dungeon Quality Assurance. Pay: 50gp/day plus dental. Must sign liability waiver." They arrive to find a half-built dungeon, a frantic kobold with a clipboard, and a mission statement written in crayon. Snikkik needs honest feedback. Every room must be tested, rated, and survived. He takes notes on everything. "The lava pit is too hot? Noted. The mimic was too obvious? I will fix that. You lost an arm? Was it the left or right? I need specifics."',
  twist:
    'A rival dungeon operator - a beholder named Beauregard who runs a luxury dungeon across the valley - has been sabotaging Snikkik\'s construction. The traps that "misfire" were tampered with. The monsters that seem poorly trained were actually confused by contradictory orders from a mole in Snikkik\'s crew. Beauregard views Snikkik\'s budget dungeon as a threat to his premium brand. The beta test is not just quality assurance - it is a corporate espionage investigation.',
  climax:
    'Opening day arrives whether the dungeon is ready or not. Beauregard launches a hostile takeover: his minions flood Snikkik\'s dungeon during the grand opening, trying to cause a disaster that will shut it down permanently. The party must protect the paying customers, fix sabotaged traps on the fly, manage the untrained monsters, AND fight Beauregard\'s agents. Snikkik runs around with his clipboard, still taking notes. "Hostile corporate invasion! Unexpected! But the customer engagement metrics are excellent!"',
  acts: [
    {
      title: 'Act 1: Alpha Testing',
      summary:
        'The party enters the dungeon for the first time and discovers just how broken everything is. Rooms collapse. Traps trigger at the wrong time. A gelatinous cube gets stuck in a doorway. Snikkik takes meticulous notes on every failure.',
      keyEvents: [
        'Room 1: the pressure plate trap activates 30 seconds too late - after the party has already passed',
        'Room 2: the skeleton guards cannot find their weapons because someone mislabeled the armory',
        'Room 3: a pit trap with a sign that says "Pit Trap Here" because Snikkik forgot to remove the construction label',
        'First sabotage clue: a trap mechanism has been deliberately rewired',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: Bug Fixing',
      summary:
        'The party helps Snikkik fix the dungeon while investigating the sabotage. They train monsters, calibrate traps, and discover that Beauregard has a spy in the construction crew. The dungeon improves - but the sabotage escalates.',
      keyEvents: [
        'Training montage: teaching goblins to hide properly, coaching a mimic on acting skills',
        'The party discovers a hidden passage that was not on Snikkik\'s blueprints - someone added it',
        'Confrontation with the mole: a goblin named Splint who was bribed with a premium dungeon membership',
        'Beauregard sends a threatening letter on scented parchment: "Close your little project. Or I will close it for you."',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Grand Opening',
      summary:
        'Opening day. Real adventurers arrive as paying customers. Beauregard\'s forces attack. The party must run the dungeon as intended while repelling a corporate invasion and keeping the customers alive and entertained.',
      keyEvents: [
        'Customers arrive - they are excited, oblivious, and deeply annoying',
        'Beauregard\'s agents infiltrate disguised as customers and start breaking things',
        'The party fights in and around the dungeon, using the traps they helped build against the invaders',
        'Snikkik personally confronts Beauregard with a spreadsheet proving his dungeon is more cost-efficient',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Snikkik',
      role: 'quest giver / ally',
      personality:
        'A kobold with the soul of a startup founder. He has a clipboard, a five-year business plan, and absolutely no combat ability. He takes feedback extremely seriously. Cries when criticized, then immediately writes it down. "You are right. The poison was derivative. I will innovate. Thank you for your honesty. I am devastated."',
      secret: 'He built this dungeon to prove to his colony that kobolds can create, not just serve dragons. It is deeply personal.',
    },
    {
      name: 'Beauregard',
      role: 'villain',
      personality:
        'A beholder who runs the Beholder\'s Premium Dungeon Experience across the valley. He is pretentious, elitist, and treats adventuring as a luxury good. His dungeon has a dress code. "My dungeon is an EXPERIENCE. His is a dollar store haunted house. I will not have my brand diluted."',
    },
    {
      name: 'Splint',
      role: 'mole / redeemable antagonist',
      personality:
        'A goblin construction worker who was bribed by Beauregard with a free premium dungeon pass. Feels genuinely guilty about betraying Snikkik. Will switch sides if the party appeals to his loyalty.',
    },
    {
      name: 'Karen the Adventurer',
      role: 'comic relief',
      personality:
        'A human fighter who is the first paying customer on opening day. She wants to speak to the dungeon\'s manager about everything. The loot is insufficient. The monsters are not scary enough. She expected complementary healing potions. She will leave a review.',
    },
  ],
  keyLocations: [
    {
      name: 'Snikkik\'s Dungeon (The Budget Labyrinth)',
      description: 'A half-finished dungeon with construction scaffolding still visible in some rooms. Signs read "Pardon Our Dust" and "Coming Soon: Better Loot." The effort is genuine. The execution needs work.',
      significance: 'The entire campaign location. Evolves from broken to functional across the three acts.',
    },
    {
      name: 'Beauregard\'s Premium Dungeon Experience',
      description: 'A luxury dungeon with velvet ropes, ambient lighting, and monsters in formal wear. Entry fee: 500gp. Champagne service between encounters.',
      significance: 'The rival establishment. The party may infiltrate it for reconnaissance.',
    },
    {
      name: 'Snikkik\'s Office',
      description: 'A tiny room behind the dungeon entrance filled floor to ceiling with blueprints, business plans, and a motivational poster that says "Believe in Your Dungeon."',
      significance: 'Where Snikkik plans, worries, and the party reports their findings.',
    },
  ],
  dataSystems: [
    'trapDesigner',
    'dungeonRoomDressing',
    'combatNarration',
    'socialEncounter',
    'plotTwistEngine',
    'villainMonologue',
    'randomCombatTerrain',
    'encounterTableBuilder',
  ],
};
