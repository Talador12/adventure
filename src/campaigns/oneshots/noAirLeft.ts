import type { OneShotCampaign } from '../types';

export const noAirLeft: OneShotCampaign = {
  id: 'oneshot-no-air-left',
  type: 'oneshot',
  title: 'No Air Left',
  tagline: 'Underwater. The breathing spell is failing. The exit is blocked. You have thirty minutes.',
  tone: 'survival',
  themes: ['survival', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 2.5,
  settingSummary:
    'The party entered a submerged ruin using Water Breathing enchantments. The enchantments are flickering. The entrance collapsed behind them. They are deep underwater with failing magic and thirty minutes of air. The only way out is forward.',
  hook: 'The first bubble escapes your lips. Then another. The enchantment flickers like a dying candle. The mage who cast it goes pale: "It should not be failing. Something down here is eating the magic. We need to leave. Now." The entrance is rubble.',
  twist:
    'The ruin is alive. It is a massive mimic colony that mimics architecture. The entire temple is one organism, and it eats magic. The enchantments are failing because the building is digesting them. The "exit" keeps moving because the walls rearrange.',
  climax:
    'The party finds the true exit: the mimic colony\'s mouth. They must trigger it to open by offering it enough magic to "eat" (burning spell slots, magic items) while holding their breath. Feed the building or become part of it.',
  scenes: [
    {
      title: 'Scene 1: The Failure',
      summary: 'The enchantments fail. The entrance is blocked. The party assesses their air supply and plans a forward escape.',
      challenge: 'exploration',
      keyEvents: [
        'The enchantment stutters like a guttering candle. The party\'s lungs tighten for half a second. It comes back. For now. Ilris estimates thirty minutes before total failure.',
        'The entrance is gone. Not collapsed - fused. The stone looks like it grew shut, like a wound healing. No seams. No rubble. Just wall where door used to be.',
        'Three corridors. The map says the left one leads to an air pocket. The map is seventy years old and drawn by someone who never came back.',
        'A party member touches the wall. It is warm. Not stone-warm. Body-warm. And for one instant, they swear it pulsed.',
      ],
    },
    {
      title: 'Scene 2: The Living Ruin',
      summary: 'The temple shifts. Corridors move. The party realizes the structure itself is the threat.',
      challenge: 'puzzle',
      keyEvents: [
        'A corridor the party mapped is now different. The walls moved.',
        'A magic item dims and dies. The walls pulse afterward, like digestion.',
        'The mimic nature reveals itself: a wall opens a mouth. Teeth of coral.',
        'Air pockets exist in chambers the mimic uses as stomachs. Breathing there buys time but costs proximity to danger.',
      ],
    },
    {
      title: 'Scene 3: Feeding the Beast',
      summary: 'The exit is the mouth. Feed it magic to open it. Every spell slot and magic item is currency for survival.',
      challenge: 'puzzle',
      keyEvents: [
        'The "exit" is an enormous sphincter of living stone. It responds to magic.',
        'Feed it: spell slots, scrolls, enchanted weapons. Each offering opens it wider.',
        'The colony tries to close around the party. Speed and sacrifice.',
        'The final offering opens the mouth. The party swims through into open water. Daylight above.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Mage Ilris',
      role: 'caster / liability',
      personality: 'Grips her staff like a lifeline. Her Water Breathing was supposed to last six hours. It has been forty minutes. She keeps casting Detect Magic and flinching at the results. "Something is eating my spells. Not dispelling - eating. The walls are metabolizing my magic. That is not a thing. That should not be a thing."',
    },
    {
      name: 'The Colony',
      role: 'environment / antagonist',
      personality: 'Not intelligent in a speaking way. Reacts to stimuli. Eats magic. Rearranges itself to trap prey. Patient and enormous.',
    },
  ],
  keyLocations: [
    {
      name: 'The Sunken Temple',
      description: 'What appears to be a drowned temple. In reality, a massive mimic colony shaped like architecture. Everything is alive.',
      significance: 'The entire adventure. The dungeon IS the monster.',
    },
    {
      name: 'The Mouth',
      description: 'The colony\'s primary feeding orifice, disguised as a grand archway. It opens for magic and closes on flesh.',
      significance: 'The only exit. The final puzzle.',
    },
  ],
  dataSystems: ['survivalTracker', 'puzzleLock', 'trapCorridor', 'combatNarration'],
};
