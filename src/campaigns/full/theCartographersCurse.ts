import type { FullCampaign } from '../types';

export const theCartographersCurse: FullCampaign = {
  id: 'full-cartographers-curse',
  type: 'full',
  title: 'The Cartographer\'s Curse',
  tagline: 'Every map they draw becomes real. Every mistake becomes an obstacle.',
  tone: 'exploration',
  themes: ['exploration', 'classic_fantasy', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 18,
  settingSummary:
    'The Ashlands — a vast wasteland where nothing grows, nothing lives, and the ground is covered in gray dust. Centuries ago it was a thriving civilization. Now it is blank, erased from history and geography alike. The party discovers they have the power to reshape it: any map they draw of the Ashlands becomes real. Sketch a river, water flows. Draw a forest, trees grow. But every error in the map — a misplaced mountain, an accidental chasm — becomes a real and permanent obstacle.',
  hook: 'The party shelters in a ruined waystation at the edge of the Ashlands. One of them idly sketches a map on old parchment they found in the rubble. By morning, the terrain outside matches their sketch exactly — including a bridge they drew that now spans a canyon that did not exist yesterday. The parchment is warm to the touch. There is more of it in the waystation. A lot more.',
  twist:
    'The party is not creating reality. They are remembering it. The Ashlands were once the nation of Verath, a thriving civilization deliberately erased by a cabal of wizards who wanted to erase a prophecy rooted in Verathi culture. The cartographer\'s parchment is a Verathi artifact designed to restore what was taken. Every "new" feature the party draws is something that was there before. The mountains, rivers, and cities already existed — the party is just bringing them back.',
  climax:
    'The cabal that erased Verath still exists, and they are coming to stop the restoration. The party must complete the map of Verath — restoring an entire civilization from memory — while the cabal tries to erase the Ashlands again, permanently this time. The final confrontation happens on a map: the party draws the last piece of Verath while the cabal tries to draw the void back over it. Whoever finishes their map first wins.',
  acts: [
    {
      title: 'Act 1: The Parchment',
      summary:
        'The party discovers their map-making power and begins experimenting in the Ashlands. Small sketches reshape terrain. They learn the rules: what they draw appears, mistakes are permanent, and the parchment has a will of its own.',
      keyEvents: [
        'The accidental bridge: the first map-drawn feature appears overnight',
        'Experimentation: drawing a well produces water, drawing a wall produces stone',
        'First mistake: a carelessly drawn cliff face creates a real, dangerous obstacle',
        'The parchment glows when they draw near certain locations — it wants specific things restored',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: Verath Remembered',
      summary:
        'As the party maps more of the Ashlands, the restored features reveal a civilization that was erased on purpose. Ruins reappear with people\'s belongings still inside. Libraries resurface with books mid-sentence. Someone erased an entire nation and its history.',
      keyEvents: [
        'A restored village emerges from the dust — empty homes set for dinner, centuries old',
        'Library restoration: books that describe Verath\'s culture, history, and the prophecy',
        'Contact with Verathi remnants — descendants who survived the erasure in scattered camps',
        'The cabal\'s agents appear: scholars who insist the Ashlands must remain blank',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Map War',
      summary:
        'The cabal moves to erase the Ashlands permanently. The party must complete the restoration map while defending against erasure magic. The final battle is fought with pens as much as swords.',
      keyEvents: [
        'The cabal reveals itself: five wizards who erased Verath to prevent a prophecy',
        'The prophecy: a Verathi hero would end the age of wizards — the cabal chose genocide over risk',
        'Map versus void: the party draws restoration while the cabal draws erasure',
        'The last stroke: completing the map restores Verath and its people, or the cabal wins and the Ashlands become truly empty forever',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'The Parchment',
      role: 'artifact / guide',
      personality:
        'Not sentient exactly, but responsive. It warms when the party draws something that was real. It resists when they try to create something that never existed. It is a memory, not a tool.',
    },
    {
      name: 'Sera Voss',
      role: 'Verathi descendant',
      personality:
        'Stands with her chin raised and fists clenched, as if daring the dust to take her too. Speaks the old Verathi words for landmarks the party restores — naming them before they fully appear. Angry in a way that has been distilled by generations into something pure and directed. "You are not creating our world. You are giving it back. Every line you draw is a debt being repaid. Draw faster."',
    },
    {
      name: 'Archon Malthus',
      role: 'cabal leader',
      personality:
        'The oldest member of the cabal that erased Verath. He is 400 years old, kept alive by the same magic that maintains the erasure. He genuinely believes he saved the world by erasing Verath. He is not entirely wrong — the prophecy was real.',
      secret: 'The prophecy said a Verathi hero would "end the age of wizards." He interpreted this as destruction. It actually meant the democratization of magic.',
    },
  ],
  keyLocations: [
    {
      name: 'The Ashlands',
      description: 'A vast gray wasteland — flat, featureless, covered in fine dust. Once the nation of Verath. Now blank.',
      significance: 'The entire campaign takes place here, watching it transform.',
    },
    {
      name: 'The Waystation',
      description: 'A ruined building at the Ashlands\' edge where the party finds the parchment. One of the few structures that survived the erasure.',
      significance: 'Where the power is discovered and the campaign begins.',
    },
    {
      name: 'The Capital Footprint',
      description: 'A vast circular depression in the dust where Verath\'s capital once stood. Drawing it back is the final act of restoration.',
      significance: 'The climax location — where the map war is fought.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'ancientRuins',
    'magicalAnomaly',
    'encounterWaves',
    'secretSociety',
    'ancientProphecy',
    'cataclysmCountdown',
    'politicalEvent',
  ],
};
