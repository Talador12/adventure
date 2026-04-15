import type { OneShotCampaign } from '../types';

export const theLastBraincell: OneShotCampaign = {
  id: 'oneshot-the-last-braincell',
  type: 'oneshot',
  title: 'The Last Braincell',
  tagline: 'One brain cell. Shared between the whole party. Only one person can think at a time.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'A cursed helmet found in the Dungeon of Dimwitted Devising links the party into a shared consciousness - but with a catch. Only one brain cell exists between all of them. Whoever holds the brain cell can think, plan, and act normally. Everyone else stands slack-jawed, drooling slightly, incapable of strategy. The brain cell passes to a new person each round. The dungeon was designed by a mind flayer with a sense of humor and must be completed before the curse becomes permanent.',
  hook: 'The party finds a glowing helmet in a chest. The fighter puts it on. Suddenly everyone shares a single thought: "Why did I put this on?" The thought came from the fighter. Now the rogue is staring at a wall. The wizard forgot what spells are. The cleric is trying to eat their holy symbol. Only the fighter can think. Next round, the brain cell moves to the wizard. The fighter immediately walks into a wall.',
  twist:
    'The mind flayer who created the helmet is still connected to it. He has been listening to the single brain cell this entire time and is deeply disappointed. "I gave you ONE thought at a time and you are STILL making bad decisions? I expected focus. I got chaos." He appears for the final fight, angry and confused about how the party survived this long.',
  climax:
    'The mind flayer confronts the party in the final chamber. He tries to extract the brain cell entirely, but the party has been passing it so rapidly between each other that it has developed a kind of momentum. The brain cell ricochets between party members faster and faster until everyone has it simultaneously for one glorious round of perfect coordination - just long enough to defeat the mind flayer. Then it snaps back to one at a time.',
  scenes: [
    {
      title: 'Scene 1: The Helmet',
      summary:
        'The party finds and activates the cursed helmet. They learn the rules: one brain cell, one thinker per round, everyone else is temporarily a vacant husk. A simple combat encounter tests the mechanic - fighting goblins when only one person can strategize at a time.',
      challenge: 'combat',
      keyEvents: [
        'The helmet activates and the shared consciousness begins. Immediate confusion.',
        'First brain cell transfer: the thinker changes and the previous one goes blank mid-sentence.',
        'Goblin ambush: the party must fight with one strategist and everyone else on autopilot.',
        'The non-thinking members can still act but only do the LAST thing they were told. "Hit things" becomes their entire personality.',
      ],
    },
    {
      title: 'Scene 2: The Puzzle Corridor',
      summary:
        'A hallway of puzzles that require different skills - arcana checks, lockpicking, athletic challenges. The brain cell holder must match the puzzle, but the brain cell does not care about convenience. The wizard gets the brain cell during the athletics puzzle. The barbarian gets it during the arcana puzzle.',
      challenge: 'puzzle',
      keyEvents: [
        'An arcana puzzle arrives when the fighter has the brain cell. The fighter stares at runes and guesses. Badly.',
        'The rogue gets the brain cell during a diplomacy challenge with a door guardian. The rogue tries to pickpocket the door.',
        'A timed puzzle where the brain cell switches DURING the solve. The new thinker has no idea what the previous one was doing.',
        'The party discovers they can shout instructions to the current thinker, but the non-thinkers interpret them very literally.',
      ],
    },
    {
      title: 'Scene 3: The Mind Flayer\'s Gallery',
      summary:
        'The party enters a room of illusions and traps designed to confuse a single mind. Mirror mazes, false floors, invisible walls. Having only one thinker is both a curse and an advantage - illusions that target "the group" only affect the one person thinking.',
      challenge: 'exploration',
      keyEvents: [
        'Mirror maze: the thinker navigates while leading a conga line of blank-faced allies.',
        'An illusion trap triggers but only the brain cell holder can perceive it. Everyone else walks through unaffected because they are too vacant to be fooled.',
        'The party discovers writing on the wall from previous victims: "day 3 with brain cell. have forgotten what thinking feels like. it was greg\'s turn for 6 hours."',
        'A trap that requires simultaneous action from multiple people, but only one can think. The solution: give everyone simple physical instructions before the brain cell switches.',
      ],
    },
    {
      title: 'Scene 4: The Mind Flayer',
      summary:
        'The mind flayer creator appears, annoyed. He expected his experiment to produce a focused group mind. Instead he got a rotating disaster. The final fight requires rapid brain cell passing to build enough mental momentum to break the curse.',
      challenge: 'combat',
      keyEvents: [
        'The mind flayer appears: "347 subjects. You are the WORST. How are you alive? HOW?"',
        'He tries to extract the brain cell. The party must keep passing it to prevent him from grabbing it.',
        'The brain cell accelerates: switching every few seconds instead of every round. Brief flashes of genius followed by instant vacancy.',
        'Critical moment: the brain cell hits everyone at once. One perfect round. The party acts in flawless coordination and defeats the mind flayer. Then it goes back to one at a time.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Quallex the Mind Flayer',
      role: 'dungeon creator / final boss',
      personality:
        'An academic mind flayer who created the brain cell helmet as an experiment in shared consciousness. He expected transcendence. He got a group of people taking turns being the only functional adult. He is professionally offended.',
      secret:
        'He created the helmet because HE wanted to share a brain with someone. Mind flayers are lonely. This was his attempt at connection. It went badly.',
    },
    {
      name: 'Greg (Previous Victim)',
      role: 'ghost / warning / comic relief',
      personality:
        'The ghost of a previous adventurer who died in the dungeon. He haunts the corridors but the brain cell curse affected him permanently - he can only think every other minute. In between, he stares at walls. His graffiti warnings on the walls trail off mid-sentence.',
    },
  ],
  keyLocations: [
    {
      name: 'The Dungeon of Dimwitted Devising',
      description:
        'A dungeon designed to test a hive mind. Every puzzle requires intelligence the party collectively does not have access to at any given moment. The architecture is clean and logical, which makes the party\'s chaotic stumbling through it even more conspicuous.',
      significance: 'The entire one-shot takes place here. Every room tests the brain cell mechanic in a new way.',
    },
    {
      name: 'The Resonance Chamber',
      description:
        'The final room. Crystalline walls that amplify psychic energy. When the brain cell passes here, it echoes. The mind flayer uses this room to harvest brain cells from subjects. The resonance is what allows the brain cell to briefly split and hit everyone at once.',
      significance: 'The final fight location where the brain cell mechanic reaches its climax.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'puzzleLock',
    'trapDisarm',
    'fantasyInsults',
    'dungeonDressing',
  ],
};
