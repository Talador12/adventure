import type { OneShotCampaign } from '../types';

export const theYeetSpell: OneShotCampaign = {
  id: 'oneshot-the-yeet-spell',
  type: 'oneshot',
  title: 'The Yeet Spell',
  tagline: 'The party has one spell: Yeet. It throws anything, anywhere, with zero control. That is their ONLY ability.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 2,
  settingSummary:
    'A wild magic surge has replaced every ability, spell, and skill the party has with a single spell: Yeet. Yeet launches any object (or person) the caster touches in a random direction with random force. That is it. No sword fighting - you Yeet the sword. No lockpicking - you Yeet the lock. No healing - you Yeet... something... at the wound? The party must clear a standard dungeon using only Yeet. Accuracy is not guaranteed. Distance is not guaranteed. Direction is determined by rolling a d8. Physics are optional. Everything is projectile-based now.',
  hook: 'The party enters a dungeon. The fighter draws their sword and swings at a goblin. Instead of a swing, the sword launches out of their hand, bounces off a wall, ricochets off the ceiling, and hits a different goblin in a room they have not entered yet. The wizard tries to cast Magic Missile. Three blobs of light launch in completely wrong directions. One hits the floor. One hits the wizard. One goes through a window that does not exist. A tooltip appears in the air: "All abilities have been replaced with YEET. Have fun." They will not have fun.',
  twist:
    'The wild magic surge was not random - it was deliberate. A trickster fey named Pucksworth has been watching the party for weeks and decided their combat style was "boring." He replaced everything with Yeet to make fights "more interesting." He is watching from an extradimensional pocket and commentating like a sports announcer. "BEAUTIFUL Yeet by the fighter! The goblin has achieved ORBIT! That is a new DISTANCE RECORD!" The party must find Pucksworth to reverse the spell. He is in the dungeon. He is also subject to Yeet. He did not think this through.',
  climax:
    'The party finds Pucksworth in the deepest room. He is stuck to the ceiling because he accidentally Yeeted himself and there is no gravity reversal in Yeet. He wants to undo the spell but his dispel was also replaced with Yeet. The solution: the party must Yeet Pucksworth at the wild magic crystal that is sustaining the effect. They get one shot. Direction is random (d8). Distance is random (d20 x 5 feet). They must position themselves so that ANY direction works. Or they can just keep Yeeting until they get lucky. The dungeon is destroyed in the process.',
  scenes: [
    {
      title: 'Scene 1: Yeet Training',
      summary:
        'The party discovers that Yeet is their only ability. Early encounters teach the mechanics: d8 for direction, d20 for force, anything can be Yeeted including themselves. The first few attempts are disasters. Slowly, strategies emerge.',
      challenge: 'combat',
      keyEvents: [
        'The fighter Yeets their sword at a goblin. It launches left, bounces off a wall, and hits a torch sconce. The room is now dark.',
        'The wizard Yeets a fireball (sort of). A ball of fire launches straight up, hits the ceiling, and rains embers. Not targeted. Not useful. Very dramatic.',
        'The cleric tries to heal by Yeeting a potion at the fighter. The potion flies past the fighter, through a door, and heals a skeleton in the next room. The skeleton is confused.',
        'A party member realizes they can Yeet THEMSELVES. The barbarian becomes a human projectile. Accuracy: terrible. Damage to the target: massive. Damage to the barbarian: also massive.',
      ],
    },
    {
      title: 'Scene 2: Applied Yeeting',
      summary:
        'The party develops Yeet strategies for dungeon challenges. Locked doors get Yeeted off their hinges. Traps get Yeeted into each other. Enemies get Yeeted into pits. The dungeon suffers structural damage.',
      challenge: 'puzzle',
      keyEvents: [
        'A locked door. The rogue Yeets the lock. The lock flies off. So does the door. So does part of the wall. "I just wanted to open it."',
        'A pit trap. The party Yeets a plank across it. The plank overshoots by 40 feet and is now in a different room.',
        'The party Yeets a goblin at another goblin. The second goblin is knocked into a third. Goblin bowling. The party has invented a sport.',
        'A room with an elaborate puzzle mechanism. The wizard Yeets a rock at it. The mechanism breaks. The door opens. "I solved the puzzle." "You DESTROYED the puzzle."',
      ],
    },
    {
      title: 'Scene 3: The Final Yeet',
      summary:
        'Pucksworth is found stuck to the ceiling. The wild magic crystal must be destroyed by Yeeting the fey at it. One shot. Random direction. The party must make ANY direction work.',
      challenge: 'exploration',
      keyEvents: [
        'Pucksworth waves from the ceiling. "Hello! I may have made an error in judgment. I too can only Yeet. I Yeeted MYSELF. I have been up here for SIX HOURS."',
        'The crystal is visible across the room. Pucksworth must be Yeeted into it. Direction: d8. Force: d20x5 feet. The odds of a direct hit are low.',
        'The party repositions: surrounding the crystal so that 6 of 8 directions result in a hit. They Yeet Pucksworth. The d8 is rolled.',
        'Regardless of direction, the Yeet chain bounces Pucksworth off walls, party members, and furniture until he hits the crystal. It was always going to work. Yeet finds a way. The crystal shatters. Abilities return. The dungeon is rubble.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Pucksworth the Trickster Fey',
      role: 'villain / commentator / victim of his own prank',
      personality:
        'A fey who thought replacing all abilities with Yeet would be "hilarious content." He was right - it IS hilarious. He just did not expect to also be subject to Yeet. He commentates from the ceiling like a sports announcer. "AND THE CLERIC YEETS THE HOLY SYMBOL! IT GOES... LEFT! INTO THE WALL! MAGNIFICENT!"',
      secret: 'He did this because he is bored. He is a powerful archfey who has been alive for 10,000 years and ran out of things to do.',
    },
    {
      name: 'The Goblin Bowling Pin',
      role: 'recurring enemy / projectile',
      personality:
        'A goblin who has been Yeeted so many times he no longer flinches. He just goes limp when he sees the party. "Not again. Just throw me. Get it over with." He has achieved inner peace through repeated Yeeting.',
    },
  ],
  keyLocations: [
    {
      name: 'The Yeet Dungeon',
      description:
        'A formerly normal dungeon that is being demolished room by room as the party Yeets through it. Walls have impact craters. Doors are missing. Furniture is embedded in ceilings. The structural integrity is questionable.',
      significance: 'The entire adventure. Each room is a new Yeet challenge.',
    },
    {
      name: 'The Crystal Chamber',
      description:
        'The deepest room containing the wild magic crystal maintaining the Yeet curse. Pucksworth is glued to the ceiling above it. The room is suspiciously round, making ricochet Yeets very effective.',
      significance: 'The final Yeet. One shot. Random direction. Maximum stakes.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'environmentalHazard',
    'magicalAnomaly',
    'fantasyInsults',
    'dungeonDressing',
  ],
};
