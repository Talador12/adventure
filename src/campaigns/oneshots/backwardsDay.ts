import type { OneShotCampaign } from '../types';

export const backwardsDay: OneShotCampaign = {
  id: 'oneshot-backwards-day',
  type: 'oneshot',
  title: 'Backwards Day',
  tagline: 'Everything happens in reverse. The party starts at the dungeon exit having "already" completed it. Time to un-loot, un-kill, and un-open everything.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'A chronomancer\'s experiment has reversed time in a localized area around the Dungeon of Temporal Reversal. The party experiences the dungeon backwards: they start at the exit, covered in treasure, wounds, and victory. They must work backwards through every room - un-looting chests, un-killing monsters (awkward apologies), un-opening doors, and un-entering the dungeon. The plot only makes sense when read backwards. Conversations happen in reverse order. The "boss fight" was the first thing they did (now the last thing to undo). The dungeon entrance is the final destination.',
  hook: 'The party wakes up standing at a dungeon exit. They are covered in soot, blood (not theirs), gold coins, and victory sweat. A dead dragon is behind them. They have no memory of how they got here. Time lurches and they are pulled BACKWARDS into the dungeon. Coins fly from their pockets back into chests. Doors close behind them. A dead goblin stands up, looks confused, and walks backwards to its patrol post. The party must undo everything they apparently already did. They are un-adventuring.',
  twist:
    'The chronomancer who caused this is at the dungeon entrance - the party\'s FINAL destination. She reversed time because the party\'s original dungeon run accidentally destroyed her laboratory on the first floor. She wants them to un-do the damage. The twist: the party does not know what they originally did. Each un-done room reveals more of what happened, and some of it is embarrassing. They apparently set a room on fire. On purpose. For fun. The chronomancer is furious about this specifically.',
  climax:
    'The party reaches the dungeon entrance (their final room). The chronomancer stands in her demolished laboratory. Time is still running backwards. To fully undo everything, the party must un-enter the dungeon: walk backwards out the front door and close it behind them. But the chronomancer demands they also un-do the fire they set in Room 7. They must go back FORWARD to Room 7, un-set the fire (which they do not know how to un-do because they do not remember setting it), and then return to the entrance. The fire was apparently caused by the wizard sneezing during a spell. The wizard must un-sneeze. This is harder than it sounds.',
  scenes: [
    {
      title: 'Scene 1: Starting at the End',
      summary:
        'The party stands at the dungeon exit with no memory. A dead dragon behind them. Time reverses and they begin moving backwards through the dungeon, experiencing the aftermath of an adventure they do not remember.',
      challenge: 'exploration',
      keyEvents: [
        'The party examines themselves: bruises, treasure, a broken weapon, a note that says "DO NOT OPEN THE BLUE CHEST." They opened the blue chest.',
        'Time lurches backwards. Coins fly from pockets into chests. Doors close. A dead goblin stands up and walks to its post.',
        'Un-looting: the party must place treasure back exactly where they found it. Their hands fight them - the gold WANTS to go back into the chest.',
        'They discover a scorched room (Room 7). A note in the wizard\'s handwriting: "Sorry about the fire. It was an accident. Mostly." The chronomancer\'s angry writing on the wall: "IT WAS NOT AN ACCIDENT. I SAW YOU LAUGH."',
      ],
    },
    {
      title: 'Scene 2: The Un-Dungeon',
      summary:
        'The party un-clears rooms. Un-killing monsters is socially awkward: the monsters stand up and the party must apologize. Un-solving puzzles means re-locking doors and resetting traps. The dungeon reconstructs around them.',
      challenge: 'social',
      keyEvents: [
        'Un-killing a goblin: the goblin stands up, confused. The party must explain they are sorry for killing it. The goblin does not remember dying. "What do you mean you killed me? I feel fine."',
        'Un-solving a puzzle: the party must re-scramble a tile puzzle they apparently solved. They do not know the scrambled state. They guess. Badly.',
        'Un-opening a trapped chest: the party must re-arm the trap, put the treasure back, and close the lid without triggering the trap they already disarmed.',
        'A room where they apparently befriended an ogre. The ogre is crying because the party is leaving. "But you said we were FRIENDS. We had a MOMENT."',
      ],
    },
    {
      title: 'Scene 3: The Un-Boss and the Fire',
      summary:
        'The party reaches the first room (their last un-do). The chronomancer demands they un-do the fire in Room 7. The wizard must un-sneeze. Time gets weird as forward and backward collide.',
      challenge: 'puzzle',
      keyEvents: [
        'The chronomancer: "You BURNED my laboratory. Room 7. I watched you LAUGH. Un-do it or time stays broken."',
        'The party must return to Room 7 going forward while time runs backward. This creates paradoxes: they meet their past selves going the other direction.',
        'The fire was caused by the wizard sneezing during a fire spell. Un-doing it requires the wizard to un-sneeze: inhale the sneeze. This requires a Constitution check (DC 15) while casting a fire spell backwards.',
        'The wizard un-sneezes. The fire un-burns. The chronomancer nods. Time resumes normally. The party is standing at the dungeon entrance having un-completed the dungeon. They have no treasure. They have no XP. They have a very confusing story.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Chronomancer Evelyn Rewind',
      role: 'time reverser / angry victim',
      personality:
        'A chronomancer whose laboratory was destroyed by the party\'s original dungeon run. She reversed time to make them un-do the damage. She is not evil - she is ANGRY. Specifically about Room 7. "You sneezed. SNEEZED. And burned down three centuries of temporal research. A SNEEZE."',
      secret: 'She could have fixed the laboratory herself with time magic. She reversed everything specifically to make the party suffer the inconvenience of un-doing their mess.',
    },
    {
      name: 'The Un-Dead Goblin',
      role: 'un-killed monster / confused citizen',
      personality:
        'A goblin who was killed by the party and then un-killed by the time reversal. He has no memory of dying but the party keeps apologizing to him. He is very confused. "You keep saying sorry. For WHAT? I had a nice nap. Why are you crying?"',
    },
    {
      name: 'Gruumsh the Ogre',
      role: 'former friend / emotional weight',
      personality:
        'An ogre the party apparently befriended during their original run. He remembers the friendship. The party does not. He is heartbroken that they are leaving. "You said I was your BEST friend. You drew a picture of us. LOOK." The picture is terrible. It is also touching.',
    },
  ],
  keyLocations: [
    {
      name: 'The Dungeon of Temporal Reversal',
      description:
        'A standard dungeon experienced in reverse. Rooms show the aftermath of a completed adventure: dead monsters, looted chests, solved puzzles, one very burned room. Time flows backwards, reconstructing everything the party originally destroyed.',
      significance: 'The entire adventure, experienced from end to beginning.',
    },
    {
      name: 'Room 7 (The Burned Laboratory)',
      description:
        'Chronomancer Evelyn\'s laboratory, destroyed by a sneeze-induced fire during the party\'s original run. Charred bookshelves, melted timepieces, and a very angry note on the surviving wall.',
      significance: 'The source of the time reversal and the final puzzle the party must un-do.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'puzzleLock',
    'socialEncounter',
    'plotTwistEngine',
    'fantasyInsults',
    'dungeonDressing',
  ],
};
