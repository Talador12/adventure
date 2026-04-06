import type { OneShotCampaign } from '../types';

export const theWrongDungeon: OneShotCampaign = {
  id: 'oneshot-wrong-dungeon',
  type: 'oneshot',
  title: 'The Wrong Dungeon',
  tagline: 'You went into the wrong cave. This is someone else\'s adventure.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary: 'The party was hired to clear Goblin Cave #7. They went into Goblin Cave #8 instead. Cave #8 is the BBEG\'s lair — a level 15 dungeon. The monsters are confused. The traps are overkill. The treasure is absurdly overpowered. And somewhere behind them, the level 15 party that was SUPPOSED to clear this dungeon is dealing with the goblins and they are NOT happy.',
  hook: 'The map said "third cave on the left." There were FOUR caves. The party chose wrong. The first room has a lich\'s phylactery display case, a warning sign in Abyssal, and a very confused hell hound who clearly wasn\'t expecting visitors this weak.',
  twist: 'The BBEG isn\'t home — he\'s at a villain conference. His automated defenses are set to "maximum" because he thought the level 15 party was coming. The party accidentally has a window to clear the dungeon that was meant for heroes twice their level, IF they\'re creative enough.',
  climax: 'The BBEG returns from his conference early. The party has looted half his lair. The level 15 party arrives at the entrance, furious. The party must escape between a BBEG coming in the front and angry heroes blocking the exit.',
  scenes: [
    { title: 'Scene 1: Wrong Turn', summary: 'The party realizes they\'re in the wrong dungeon when the first trap is a disintegration beam and the first "goblin" is an Erinyes.', challenge: 'exploration', keyEvents: ['The entrance looks similar to Cave #7 (rock walls, torches) — then the torches are hellfire', 'First trap: way overkill for the party\'s level — survival through luck and creativity', 'First enemy: confused that the invaders are so... small', 'Found the map: "YOU ARE IN THE WRONG CAVE" drawn in terrified goblin scrawl'] },
    { title: 'Scene 2: While the Cat\'s Away', summary: 'The BBEG is out. The party loots a dungeon meant for heroes twice their level. Everything is too powerful for them but they take it anyway.', challenge: 'exploration', keyEvents: ['Treasure room: magic items they can\'t attune to, gold they can\'t carry, a wand labeled "DO NOT TOUCH"', 'Someone touches the wand — wild magic explosion (beneficial, somehow)', 'A minion tries to raise the alarm — the party must stop it', 'The real treasure: the BBEG\'s grocery list, embarrassing diary, and one genuinely useful item'] },
    { title: 'Scene 3: Escape', summary: 'The BBEG comes home. The level 15 party blocks the exit. The party must escape with whatever they\'ve grabbed.', challenge: 'combat', keyEvents: ['The BBEG teleports in: "WHO ARE YOU AND WHY IS MY DIARY OPEN?"', 'The level 15 party at the entrance: "THAT\'S OUR DUNGEON!"', 'Escape: through a window, a portal, or the most creative route possible', 'The aftermath: the party has loot from a dungeon ten levels above them and NO ONE believes their story'] },
  ],
  keyNPCs: [
    { name: 'The BBEG (Lord Shadowmere)', role: 'accidentally encountered villain', personality: 'A perfectly menacing dark lord who is FURIOUS about the security breach. "I was gone for THREE HOURS."' },
    { name: 'Captain Steelblade', role: 'the level 15 party leader', personality: 'Leader of the party that was supposed to clear this dungeon. Competent, angry, and embarrassed that a bunch of level 5s beat them to it.' },
    { name: 'Kevin (hell hound)', role: 'confused guard dog', personality: 'A hell hound who expected legendary warriors and got... these. Keeps looking behind the party for the real threat.' },
  ],
  keyLocations: [
    { name: 'Goblin Cave #8 (Lord Shadowmere\'s Lair)', description: 'A high-level dungeon that looks like a goblin cave from the outside. Inside: trapped hallways, imprisoned demons, and a very nice sitting room.', significance: 'The entire one-shot takes place here.' },
    { name: 'The Trophy Room', description: 'Where Shadowmere keeps trophies from defeated heroes. The party\'s gear would barely make it onto the bottom shelf.', significance: 'Where the loot (and the embarrassing diary) is found.' },
    { name: 'The Exit', description: 'The cave entrance, now blocked by a very angry level 15 party.', significance: 'The escape challenge.' },
  ],
  dataSystems: ['dungeonRoomTemplates', 'trapDisarm', 'combatNarration', 'fantasyInsults', 'encounterWaves'],
};
