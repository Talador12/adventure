import type { OneShotCampaign } from '../types';

export const theHuntedCamp: OneShotCampaign = {
  id: 'oneshot-hunted-camp',
  type: 'oneshot',
  title: 'The Hunted Camp',
  tagline: 'Something circles your camp every night. Tonight is night three. It is closer.',
  tone: 'survival',
  themes: ['survival', 'horror', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'Three nights in the Duskwood. Something stalks the party\'s camp. Night one: distant sounds. Night two: tracks around the tents. Night three: it is close enough to breathe on the canvas. The party must survive until dawn, hunt it, or flee into woods it knows better than they do.',
  hook: 'Night one you heard it. Night two you saw its tracks: enormous, clawed, circling the camp in a perfect spiral. Tonight you found fur on your tent and claw marks on the trees at eye level. Whatever it is, it has been watching. Tonight, it stops watching.',
  twist:
    'The creature is a displaced displacer beast that was driven from its territory by a forest fire. It is not hunting the party - it is trying to claim their campsite as its new lair. It sees the party as intruders, not prey. It can be driven off, but not easily, and killing it is harder than expected because it has young hidden nearby.',
  climax:
    'The beast attacks the camp. Mid-fight, the party hears mewling from the treeline: cubs. The mother is protecting territory for her young. Kill her and the cubs die. Drive her off and she returns. Find her a new territory, or relocate the camp.',
  scenes: [
    {
      title: 'Scene 1: Night Falls',
      summary: 'Preparations for night three. The party sets traps, takes watches, and plans for the inevitable.',
      challenge: 'exploration',
      keyEvents: [
        'Evidence from night one and two: tracks, claw marks, fur samples.',
        'Identification: the tracks match no common predator. Something rare and dangerous.',
        'Preparation: traps around the perimeter, watches assigned, weapons ready.',
        'Dusk. The forest goes silent. Nothing sings. Nothing moves. It is out there.',
      ],
    },
    {
      title: 'Scene 2: The Stalking',
      summary: 'The creature circles closer. It tests defenses. It is smarter than an animal.',
      challenge: 'combat',
      keyEvents: [
        'A shape between the trees. The ranger looses an arrow. It passes through empty air. The shape was ten feet to the left. Displacement magic. Natural, not arcane.',
        'SNAP. A trap triggers on the east perimeter. The party rushes over. The trap held a stick. Not a limb. A stick, placed there. It was testing their response time.',
        'While the party investigates the eastern trap, a tent on the west side splits open in a single clean slash. Bedrolls shredded. Nobody was inside. A message.',
        'A roar from every direction at once. The trees shake. Something has decided the reconnaissance is over.',
      ],
    },
    {
      title: 'Scene 3: The Mother',
      summary: 'Full attack. Then the cubs cry out. The party must decide what to do with a mother fighting for her family.',
      challenge: 'social',
      keyEvents: [
        'The displacer beast attacks. Deadly, fast, and hard to pin down.',
        'Mid-fight: mewling from the bushes. Two cubs, barely old enough to walk.',
        'The mother is injured. She retreats to her cubs. She snarls but does not attack.',
        'A ranger or druid can communicate: she needs territory. The campsite is all she found.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Duskwood Mother',
      role: 'displacer beast / sympathetic antagonist',
      personality: 'Seven feet at the shoulder, six tentacles, and eyes that track the party with unsettling intelligence. She tested the snares on night two. She slashed the tent on night three to show she could have done worse. Every action says the same thing: leave. This is mine now. When her cubs cry, her aggression doubles. When the party backs away from the cubs, she stops attacking. She is having a conversation. It just does not use words.',
    },
  ],
  keyLocations: [
    {
      name: 'The Campsite',
      description: 'A forest clearing with tents, a fire ring, and increasingly disturbing evidence of nocturnal visitors.',
      significance: 'The contested ground. The party\'s shelter and the beast\'s target.',
    },
    {
      name: 'The Duskwood',
      description: 'Dense, old-growth forest. Dark even at noon. At night, the canopy blocks the stars entirely.',
      significance: 'The creature\'s domain. Fighting in the woods gives it every advantage.',
    },
  ],
  dataSystems: ['survivalTracker', 'combatNarration', 'environmentalHazard', 'trapDesigner'],
};
