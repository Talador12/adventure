import type { FullCampaign } from '../types';

export const thePartySwap: FullCampaign = {
  id: 'full-the-party-swap',
  type: 'full',
  title: 'The Party Swap',
  tagline: 'You wake up as each other. The fighter is in the wizard\'s body. Stats, abilities, everything swapped.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 9 },
  estimatedSessions: 10,
  settingSummary:
    'The party spent the night in a cursed inn. When they wake up, they are in each other\'s bodies. The fighter has the wizard\'s stats. The rogue has the cleric\'s spells. The wizard has the fighter\'s muscles and no idea what to do with them. The curse swaps them into a new combination every 24 hours. The dungeon they need to clear to break the curse is a gauntlet of challenges specifically designed to test class abilities - but nobody has their own class abilities anymore. Each session is a new body, a new set of tools, and a new set of problems.',
  hook: 'The fighter wakes up and reaches for their sword. Their arm is thin. Scholarly. They look in the mirror and see the wizard. Across the room, the wizard is flexing in the fighter\'s body with an expression of confused delight. The rogue is trying to cast a spell in the cleric\'s body and accidentally heals the bed. The innkeeper appears: "The curse of the Shuffled Souls. You will need to clear the Gauntlet of Aspect to break it. It is down the road. Good luck. Breakfast is complementary."',
  twist:
    'The inn is not cursed. The innkeeper IS the curse. He is a fey trickster who finds mortals endlessly boring in their own bodies and delightful in each other\'s. He has been doing this for centuries. The Gauntlet is real but it does not break the curse - it is entertainment. He watches through scrying mirrors and takes bets with other fey on which combination will fail hardest. The only way to actually break the curse is to clear the Gauntlet in EVERY combination, proving that the party is effective regardless of configuration.',
  climax:
    'The party reaches the final room of the Gauntlet and discovers the scrying setup. The fey trickster appears with a viewing audience of fey nobles, all eating popcorn. The final challenge is fighting the party\'s OWN original bodies, controlled by fey puppeteers, in whatever combination they are currently swapped into. If they win, they have proven adaptability beyond entertainment value. The fey gets bored and breaks the curse. If they lose, they swap one more time - into entirely random NPC bodies.',
  acts: [
    {
      title: 'Act 1: Who Am I Today?',
      summary:
        'The party adjusts to being in each other\'s bodies. The fighter cannot cast spells. The wizard cannot swing a sword without hurting themselves. Every simple task is relearned. The Gauntlet begins with challenges that expose just how bad they are at each other\'s jobs.',
      keyEvents: [
        'Morning panic: everyone discovers they are in the wrong body. The cleric screams in the rogue\'s tenor.',
        'Gauntlet Room 1: a lock that requires thief tools. The rogue\'s body is being piloted by the paladin. The paladin smashes the lock.',
        'Gauntlet Room 2: an arcane puzzle. The wizard\'s body is controlled by the fighter, who pokes it with a stick.',
        'First swap: 24 hours pass. New combination. Chaos multiplies.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: Adaptation',
      summary:
        'The party gets better at each other\'s roles. The fighter learns to appreciate spell preparation. The wizard discovers the joy of hitting things. Each swap brings new understanding. The Gauntlet\'s challenges escalate but the party adapts.',
      keyEvents: [
        'Breakthrough: the rogue (in the wizard\'s body) discovers creative uses for cantrips the wizard never tried.',
        'Combat evolution: the party develops combo strategies that work regardless of who is in which body.',
        'Emotional beats: being in someone else\'s body reveals things - the fighter\'s old injury, the cleric\'s chronic pain.',
        'Suspicion: the challenges feel designed for entertainment, not testing. Someone is watching.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Audience',
      summary:
        'The party discovers the scrying setup and the fey audience. The final challenge is fighting their own original bodies. The party must prove they are more than their class features - they are a team regardless of configuration.',
      keyEvents: [
        'The scrying room: mirrors showing every previous swap. A leaderboard. Betting slips.',
        'The trickster reveals himself: the innkeeper takes a bow. "You have been WONDERFUL entertainment."',
        'The final fight: the party\'s own bodies, controlled by fey, using their original abilities against them.',
        'Victory: the party wins in borrowed bodies. The fey is genuinely impressed. The curse breaks. Everyone is home.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Pucksworth (the Innkeeper)',
      role: 'fey trickster / curse source',
      personality:
        'An archfey who runs the cursed inn as a hobby. Finds mortals predictable in their own bodies and fascinating in each other\'s. Takes meticulous notes on party dynamics. "The fighter tried to cast Shield using the wizard\'s body. He punched himself in the face. I have never been more entertained."',
      secret: 'He has done this to 400 parties over 300 years. Only three have cleared the Gauntlet in every combination. He respects those three deeply and sends them holiday cards.',
    },
    {
      name: 'The Fey Audience',
      role: 'spectators / betting pool',
      personality:
        'A collection of fey nobles who gather to watch the swapped parties struggle. They have favorites. They take bets. They throw popcorn at the scrying mirrors when something funny happens. They are invested in this like a reality show.',
    },
    {
      name: 'Echo (a previous victim)',
      role: 'trapped soul / guide',
      personality:
        'A bard who was cursed by Pucksworth 50 years ago and never cleared the Gauntlet. She has been swapping between bodies for five decades and is now comfortable in any form. She helps the party adapt. "You get used to it. My original body was a half-elf. I have been a dwarf for three months. The beard is growing on me. Literally."',
    },
    {
      name: 'The Puppet Fighter',
      role: 'fey-controlled body / boss encounter',
      personality:
        'The party\'s own fighter body being piloted by a fey who is treating the fight like a sport. Taunts in the fighter\'s voice but with fey mannerisms. "Darling, YOUR body hits quite hard. I can see why you like this."',
    },
  ],
  keyLocations: [
    {
      name: 'The Shuffled Inn',
      description: 'A cozy roadside inn that looks perfectly normal except that every bed is enchanted. The innkeeper is too friendly. The breakfast is suspiciously good. The checkout process is impossible.',
      significance: 'Where the curse activates and where the party returns between Gauntlet attempts.',
    },
    {
      name: 'The Gauntlet of Aspect',
      description: 'A dungeon specifically designed to test class abilities: locked doors for rogues, arcane puzzles for wizards, heavy combat for fighters, divine challenges for clerics. Every challenge is built for a class the person currently in that body does not have.',
      significance: 'The main dungeon and the setting for most of the campaign\'s challenges.',
    },
    {
      name: 'The Viewing Gallery',
      description: 'A hidden chamber above the Gauntlet filled with scrying mirrors, comfortable seats, and a concession stand. Fey nobles watch the party struggle like a sporting event. There is a scoreboard.',
      significance: 'Where the truth is revealed and where the final confrontation with Pucksworth takes place.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'trapGenerator',
    'riddleGenerator',
    'dungeonDressing',
    'plotTwistEngine',
    'socialEncounter',
    'fantasyInsults',
    'environmentalHazard',
  ],
};
