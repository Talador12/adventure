import type { OneShotCampaign } from '../types';

export const theLoadingScreen: OneShotCampaign = {
  id: 'oneshot-the-loading-screen',
  type: 'oneshot',
  title: 'The Loading Screen',
  tagline: 'Reality freezes between rooms. The party is stuck in a void for 30 seconds. Sometimes the wrong room loads.',
  tone: 'shenanigans',
  themes: ['comedy', 'meta', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Fragmented Dungeon is a pocket dimension with rendering issues. Between every room, reality goes blank: white void, no floor, floating. A loading bar appears in the air. The next room renders in pieces - walls first, then floor, then furniture, then monsters (who appear mid-animation, frozen, then suddenly animate). Sometimes the wrong room loads and has to unload and reload. The party can see their destination buffering and must wait, floating in nothing, while reality gets its act together.',
  hook: 'The party steps through the dungeon entrance and the world goes white. They float in nothing. A translucent bar fills slowly in the air above them. 30 seconds of void. Then the first room loads: walls materialize, floor solidifies under their feet, a goblin appears mid-step and suddenly animates. "Loading complete," says a disembodied voice. The goblin screams.',
  twist: 'The loading screens are not just transitions - they are a hackable space. During the void, the party can move around. If they position themselves in the right spot during loading, they load INTO advantageous positions: behind enemies, on top of treasure, inside locked rooms. The loading screen is a tactical tool. Someone figures this out in scene two and the dungeon becomes a speedrun with spawn manipulation.',
  climax: 'The final room glitches. It loads, unloads, loads a different room, unloads that, and cycles through every room in the dungeon in rapid succession. The party must fight the boss while the room keeps changing around them. The walls shift. The floor swaps. Gravity reorients as different rooms load. The boss is also confused. Nobody knows what room they are in anymore.',
  scenes: [
    {
      title: 'The First Load',
      summary: 'The party experiences the loading mechanic for the first time. Confusion, floating, and a growing understanding that this dungeon runs on broken code.',
      challenge: 'exploration',
      keyEvents: [
        'First load: 30 seconds of white void. The party panics. The barbarian tries to swim through nothing.',
        'Room renders: walls first (floating walls in a void), then floor (sudden gravity), then goblins (frozen mid-pose, then animate).',
        'A chest loads inside a wall. Clipping error. The chest is half-visible. The loot is technically accessible if you reach through the wall.',
        'Second transition: the loading bar gets stuck at 87%. Thirty more seconds of void. The bard starts composing a loading screen song.',
      ],
    },
    {
      title: 'Loading Screen Exploits',
      summary: 'The party discovers they can move during loading. Spawn manipulation becomes a tactical advantage. The dungeon was not designed for this.',
      challenge: 'puzzle',
      keyEvents: [
        'During loading, the rogue moves to where the treasure chest will materialize. She loads INSIDE the chest. Free loot, no traps.',
        'The fighter positions himself behind where the enemies will spawn. They load facing away from him. Free surprise round.',
        'Wrong room loads: a boss room loads instead of a hallway. The boss appears, confused. The room unloads. The boss vanishes mid-swing.',
        'The party starts speed-running: optimal positioning during each load screen, minimal time in each room, maximum exploitation.',
      ],
    },
    {
      title: 'The Render Crash',
      summary: 'The final room cycles through every room in the dungeon. The boss fight happens in shifting, unstable reality.',
      challenge: 'combat',
      keyEvents: [
        'The boss room loads. Then it unloads. The goblin room loads. Then the treasure room. The dungeon is cycling through every room at random.',
        'Combat in shifting terrain: one round on stone floor, next round on a bridge over lava, next round in the void during a loading error',
        'The boss keeps loading and unloading. It attacks, freezes mid-swing, vanishes, reappears behind the party, finishes the swing.',
        'The fix: the party finds the dungeon\'s "core process" (a glowing crystal) and reboots it. The dungeon reloads fresh. The boss stays loaded. One clean fight. Victory.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The System Voice', role: 'narrator / operating system', personality: 'A calm, pleasant voice that announces loading status. "Room 4 loaded successfully. One rendering error detected. The chair is inside the wall. This is a known issue."' },
    { name: 'The Glitch Goblin', role: 'ally / exploit guide', personality: 'A goblin that was duplicated by a loading error. There are now seven of him. They all share one consciousness. "We know the loading patterns. Stand HERE during the next load. Trust us. All seven of us."' },
  ],
  keyLocations: [
    { name: 'The Loading Void', description: 'A white, featureless space between rooms. No floor. No walls. Just floating and a progress bar.', significance: 'The transition space. Where tactical positioning and exploit discovery happen.' },
    { name: 'The Fragmented Dungeon', description: 'A dungeon that renders room by room with loading screens, glitches, and occasional wrong-room loads.', significance: 'The setting. Every room transition is a mechanic.' },
  ],
  dataSystems: ['dungeonRoom', 'combatNarration', 'trapGenerator'],
};
