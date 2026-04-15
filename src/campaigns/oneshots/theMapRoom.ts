import type { OneShotCampaign } from '../types';

export const theMapRoom: OneShotCampaign = {
  id: 'oneshot-map-room',
  type: 'oneshot',
  title: 'The Map Room',
  tagline: 'Hundreds of maps of impossible places. One starts glowing. Outside the window, the forest is gone. A city of brass spires stands where trees were.',
  tone: 'exploration',
  themes: ['exploration', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'In a wizard\'s abandoned tower, the party discovers a circular room lined floor to ceiling with maps. None of them depict real places. The cartography is exquisite but the continents, cities, and oceans are all fictional. Then one map begins to glow, and outside the tower, the landscape starts changing to match it.',
  hook: 'The party shelters in the tower during a storm. The map room is warm and dry. At midnight, a map on the north wall pulses with golden light. Through the window, the forest outside is gone. In its place: rolling dunes and a city of brass spires, exactly as drawn on the glowing map.',
  twist: 'The maps are not fiction. They are blueprints. The wizard who made them was a world-builder who could manifest realities by drawing them. She disappeared because she walked into one of her own maps. The glowing map is her last creation, and it is pulling the real world into itself because she never finished it. The unfinished edges are consuming reality.',
  climax: 'The party must enter the manifesting map, find the wizard (trapped in her own creation for decades), and either help her finish the map (stabilizing the new reality) or destroy it (restoring the original landscape). Finishing it means the brass city becomes permanent and real.',
  scenes: [
    {
      title: 'Scene 1: The Room of Impossible Maps',
      summary: 'Discovering the map room, the glowing map, and the transformed landscape outside.',
      challenge: 'exploration',
      keyEvents: [
        'The map room: hundreds of maps, all depicting places that do not exist',
        'The glowing map: a desert with a city of brass spires, rendered in extraordinary detail',
        'The view outside: reality has changed to match the map, the forest is gone',
        'Walking outside: the manifested landscape is real, tangible, and expanding',
      ],
    },
    {
      title: 'Scene 2: The Brass City',
      summary: 'Exploring the manifested city. It is mostly complete but has unfinished edges where reality frays into blank white void.',
      challenge: 'exploration',
      keyEvents: [
        'The city: brass-domed buildings gleam under a painted sky. Every rivet, every window is rendered in loving detail on the south face. The north face of each building is blank white, flat as canvas, warm to the touch',
        'Unfinished zones: a cobblestone street that stops mid-brick at a wall of featureless white void. A market stall with fruit on the front shelf and nothing behind it, not even air',
        'The edges are growing: consuming the real landscape beyond the map\'s borders',
        'Signs of the wizard: half-drawn additions, notes in the margins of reality itself',
      ],
    },
    {
      title: 'Scene 3: The Cartographer',
      summary: 'Finding the wizard trapped at the center of her creation, trying to finish a map that keeps expanding beyond her control.',
      challenge: 'puzzle',
      keyEvents: [
        'The wizard: elderly, exhausted, drawing frantically on a massive canvas that is the city itself',
        'The problem: every detail she adds creates more edges that need finishing',
        'Help her finish: the party contributes ideas, stabilizing sections of the map',
        'Or destroy the anchor map in the tower: the city dissolves, the forest returns, the wizard is freed',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Cartographer Lune', role: 'trapped creator', personality: 'Ink-stained hands that shake from exhaustion. Hair white from decades of sleepless drawing. She sketches compulsively even while talking. "I just wanted to make something beautiful. Every detail I add creates ten more edges. It is eating the world and I cannot draw fast enough to finish it." She has not stopped working in thirty years.' },
    { name: 'The Brass Sentinel', role: 'guardian', personality: 'A construct that patrols the finished sections of the city. It was drawn by Lune as a protector. It follows its purpose with mechanical precision.' },
    { name: 'Arlan Dreft', role: 'quest giver', personality: 'A traveling merchant who noticed the landscape changed overnight and came to investigate. Practical, curious, and deeply concerned about his trade route vanishing.' },
  ],
  keyLocations: [
    { name: 'The Map Room', description: 'A circular chamber lined with maps of impossible places, one of which is manifesting into reality.', significance: 'The origin point and anchor for the manifested world.' },
    { name: 'The Brass City', description: 'A half-finished city of brass spires that is real, beautiful, and expanding uncontrollably.', significance: 'The exploration space where the party navigates finished and unfinished reality.' },
    { name: 'The Drawing Chamber', description: 'The center of the manifested city where Lune works, a canvas the size of a plaza.', significance: 'Where the party finds the wizard and resolves the crisis.' },
  ],
  dataSystems: ['planarTravel', 'puzzleLock', 'explorationChallenge', 'npcDialogue', 'magicItemGenerator'],
};
