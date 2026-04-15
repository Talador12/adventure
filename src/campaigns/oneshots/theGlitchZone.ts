import type { OneShotCampaign } from '../types';

export const theGlitchZone: OneShotCampaign = {
  id: 'oneshot-the-glitch-zone',
  type: 'oneshot',
  title: 'The Glitch Zone',
  tagline: 'Reality has video game bugs. NPCs T-pose. Textures are missing. The BBEG is exploiting a duplication glitch.',
  tone: 'shenanigans',
  themes: ['comedy', 'meta', 'exploration'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A region called the Shimmer Fields where reality runs on broken code. The cause: an ancient construct called the World Engine that renders reality locally has started degrading. Textures are missing - grey checkerboard patterns on walls and ground. NPCs T-pose when idle. Collision detection fails randomly - you can walk through walls but also fall through floors. Sound loops. The sky occasionally displays error text. A warlock named Korgath discovered the bugs and is exploiting a duplication glitch to clone gold, items, and eventually himself into an unstoppable army.',
  hook: 'The party crosses into the Shimmer Fields and immediately notices something wrong. A farmer is standing in a field, arms outstretched in a T-pose, completely motionless. A cow walks through a fence. The ground beneath a tree is a flat grey checkerboard. A bird flies into an invisible wall and bounces off. A sign reads "Welcome to Millhaven" but the text is rendering in the wrong font and overlapping itself. Something is deeply broken here, and someone is making it worse on purpose.',
  twist:
    'Korgath is not exploiting the bugs. He is CAUSING them. Every time he duplicates something, the World Engine loses more processing power trying to track the copies. He has duplicated so much gold that reality is running out of memory. If he duplicates himself, the Engine will crash entirely and this region of the world will derender permanently - everything and everyone in it will simply stop existing.',
  climax:
    'The party reaches Korgath\'s lair as he prepares to duplicate himself. The room is filled with thousands of gold coins, all identical, all slightly glitching. Korgath begins the duplication. The room starts derendering - walls flicker, floor tiles vanish, gravity stutters. The party must destroy the cloning apparatus while reality collapses around them. Floors disappear. Walls phase in and out. NPCs from the region clip through the walls, T-posing, as the Engine tries to load everything at once. Korgath\'s clone is half-rendered - one arm, no legs, floating. It is still dangerous.',
  scenes: [
    {
      title: 'Scene 1: Welcome to the Shimmer Fields',
      summary:
        'The party enters the glitched region. Reality bugs are everywhere: T-posing NPCs, missing textures, broken collision, looping sounds. A village needs help - their blacksmith has clipped through the floor and is stuck in the basement. Their mayor is frozen in an A-pose.',
      challenge: 'exploration',
      keyEvents: [
        'First encounter with broken reality: a farmer T-posing in a field, completely unresponsive. His cow walks through a solid fence.',
        'The blacksmith is waist-deep in the floor. Collision detection failed. He is fine but very annoyed.',
        'A child explains that "the shiny man" came through last week and things started breaking. Gold coins everywhere he went.',
        'The party discovers they can exploit the bugs too: walk through a glitched wall, pick up an object that is floating at the wrong height, use a broken physics zone to jump impossibly high.',
      ],
    },
    {
      title: 'Scene 2: Exploiting the Exploits',
      summary:
        'The party must cross a stretch of heavily glitched terrain to reach Korgath\'s hideout. The glitches are useful and dangerous in equal measure. Walking through walls works until a wall suddenly becomes solid again. Falling through the floor leads to an underworld of broken geometry.',
      challenge: 'puzzle',
      keyEvents: [
        'A bridge with no collision: the party walks onto it and falls through. The bridge looks real. It is not.',
        'A combat encounter with wolves that are sliding across the ground instead of running. Their pathfinding is broken. They slide in straight lines and bounce off walls.',
        'The party finds duplicated gold coins scattered everywhere. All identical. All from Korgath\'s glitch.',
        'A zone where gravity flickers: up, down, sideways, off entirely. The party must time their movement between gravity states.',
      ],
    },
    {
      title: 'Scene 3: The Duplication Chamber',
      summary:
        'Korgath\'s lair is a cave filled with glitched duplicates: thousands of identical coins, duplicated furniture, copies of the same sword stacked in impossible piles. Korgath is preparing his final duplication: himself.',
      challenge: 'social',
      keyEvents: [
        'Korgath greets the party surrounded by his duplicated hoard. He offers to duplicate anything they want. It is tempting.',
        'He explains his plan: clone himself, build an army of Korgaths, conquer the region. He does not know about the Engine crash.',
        'The party can try to warn him - he does not believe them until a wall behind him derendes into checkerboard grey.',
        'If they fail to convince him, he begins the duplication anyway. If they succeed, he panics because he has already started the process and does not know how to stop it.',
      ],
    },
    {
      title: 'Scene 4: Reality Crash',
      summary:
        'The duplication activates. Reality begins crashing. The party must destroy the apparatus while the room derenderes around them. Floors vanish. Walls clip. A half-rendered Korgath clone attacks. The World Engine screams.',
      challenge: 'combat',
      keyEvents: [
        'The clone machine activates. Korgath\'s copy begins forming: one arm, torso, no legs, floating two feet off the ground.',
        'The room starts derendering: floor tiles vanish revealing void beneath. Walls flicker between solid and ghost.',
        'The half-clone attacks with broken AI: it walks into walls, attacks the wrong direction, but hits HARD when it connects.',
        'The party destroys the apparatus. Reality stutters, freezes, then slowly rerenders. The checkerboard walls gain textures. The T-posing NPCs unfreeze. The clone dissolves into pixels.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Korgath the Glitch Warlock',
      role: 'villain / reality exploit abuser',
      personality:
        'A warlock who found reality\'s cheat codes and cannot stop using them. Not evil so much as catastrophically irresponsible. "Infinite gold? Why would I NOT duplicate it? What do you mean reality has a memory limit? That sounds like a design flaw."',
      secret: 'He genuinely does not understand the consequences. He thinks reality is more robust than it is.',
    },
    {
      name: 'Mayor Stiffarm',
      role: 'quest giver / frozen in A-pose',
      personality:
        'The mayor of Millhaven, frozen in an A-pose since Tuesday. He can still talk. He cannot move. He is managing the village crisis via shouted instructions from the town square. "I HAVE BEEN STANDING LIKE THIS FOR FOUR DAYS. MY SHOULDERS HURT. PLEASE FIX REALITY."',
    },
  ],
  keyLocations: [
    {
      name: 'Millhaven (Glitched)',
      description:
        'A quaint village running on broken reality. NPCs freeze in T-poses. Buildings have missing textures. Livestock phase through fences. It is deeply unsettling in a way nobody can articulate.',
      significance: 'Introduction to the glitch mechanics and the quest hook.',
    },
    {
      name: 'The Duplication Cave',
      description:
        'A cave filled with thousands of identical gold coins, duplicated furniture, and a crude arcane machine that interfaces with the World Engine. Everything in here is a copy of a copy of a copy.',
      significance: 'The final encounter location where reality crashes and must be saved.',
    },
  ],
  dataSystems: [
    'magicalAnomaly',
    'combatNarration',
    'puzzleLock',
    'environmentalHazard',
    'plotTwistEngine',
    'fantasyInsults',
  ],
};
