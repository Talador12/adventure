import type { FullCampaign } from '../types';

export const gravityFlips: FullCampaign = {
  id: 'full-gravity-flips',
  type: 'full',
  title: 'Gravity Flips',
  tagline: 'Gravity reverses every hour. Soup is eaten upside down. The sky is optional.',
  tone: 'shenanigans',
  themes: ['comedy', 'exploration', 'survival'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 10,
  settingSummary:
    'In the Inverted Reaches, gravity reverses every hour on the hour. The civilizations here adapted centuries ago. Buildings have floors that are also ceilings. Everyone carries rope. Soup bowls have lids. Furniture is bolted down. Children play on both sides of a field simultaneously. It is normal here. The party arrives from the Stable Lands and their gravity does NOT flip with everyone else\'s. When the world goes up, they stay down. When everyone walks on the ceiling, the party is dangling from the floor. They are gravitationally incompatible with an entire civilization.',
  hook: 'The party crosses into the Inverted Reaches chasing a bounty. They notice everyone is carrying rope, all furniture is bolted down, and the architecture is symmetrical on both sides. Then the hour bell rings. Gravity flips. The entire population calmly walks up to the ceiling and continues their day. The party falls zero feet because they are already on the ground. But now they are the weird ones - standing on the "ceiling" while everyone else is "above" them on the "floor." Their bounty target waves down at them. "You are new here, huh?"',
  twist:
    'Gravity is not flipping. The Inverted Reaches are a pocket of reality that was installed upside down by a celestial architect who read the blueprints wrong. The "flip" is actually the rest of the world\'s gravity briefly normalizing before the pocket dimension reasserts itself. The party\'s gravity is "correct" - the entire civilization\'s is inverted. They have been living upside down for 800 years and it has worked fine so nobody questioned it.',
  climax:
    'The celestial architect returns to fix the mistake and "correct" gravity permanently - which would destroy the entire infrastructure of a civilization built for flipping. The party must either convince the architect to leave the error in place, find a way to give the party inverted gravity so they can stay, or redesign an entire civilization\'s architecture in 24 hours. The architect is very apologetic but also very insistent about building codes.',
  acts: [
    {
      title: 'Act 1: Adaptation Required',
      summary:
        'The party arrives in the Inverted Reaches and must learn to function in a world where gravity flips hourly and they are the only ones unaffected. Every simple task - eating, sleeping, combat, conversation - becomes a logistics puzzle when you and the person you are talking to are on different ceilings.',
      keyEvents: [
        'First flip: the party watches an entire city calmly transition to the ceiling. They remain, bewildered, on the floor.',
        'Dining: a restaurant that serves food on both sides. The party\'s meal does not flip with the plates.',
        'Combat: fighting enemies who are upside down relative to you. Arrow physics become a nightmare.',
        'A local offers to teach the party "flip etiquette." Lesson one: always check which floor someone is on before shaking hands. Spiral begins: each act introduces a new complication to the gravity system. Act 1: simple flips. Act 2: the party\'s bounty target exploits the timing. Act 3: the flips become unpredictable as the architect arrives.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: Living Upside Down',
      summary:
        'The party integrates (badly) into inverted society while investigating why their gravity is different. They discover the truth: the whole civilization is technically upside down. This revelation is either devastating or completely irrelevant depending on who you ask.',
      keyEvents: [
        'Investigation: an ancient library with books on both ceiling-floors reveals the dimensional error.',
        'The truth: the Inverted Reaches were built upside down. Nobody noticed for 800 years.',
        'Cultural crisis: half the population says "so what?" and the other half has an existential meltdown.',
        'The party\'s bounty target: impossible to chase when you are on the wrong ceiling every other hour.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Correction',
      summary:
        'The celestial architect arrives to fix the 800-year-old error. The party must mediate between a divine builder with blueprints and a civilization that does not want to be "corrected." Architecture has never been this political.',
      keyEvents: [
        'The architect appears: a massive celestial being with a hard hat and a level that is the size of a bridge.',
        '"I need to fix this." The civilization protests. Everything they built works for flipping gravity.',
        'The party negotiates: leave the error, adapt the party\'s gravity, or find a third option.',
        'Resolution: the architect stamps the pocket dimension as "intentional design variation" and leaves. Bureaucracy saves the day. Chaos callback: the party\'s bounty target, Bartos Ledger, is finally caught — not because gravity flipped, but because it did not. He walked into a wall expecting the ceiling. He was so used to escaping via gravity that normalcy trapped him.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Warden Orianna Topsdown',
      role: 'local authority / guide',
      personality:
        'The warden of the Inverted Reaches who has lived with flipping gravity her entire life. Utterly baffled by people who experience gravity in only one direction. "You just... fall the same way? All the time? That sounds boring and also terrifying."',
      secret: 'She has secretly suspected the gravity was wrong for decades but never said anything because the infrastructure works and she did not want to cause a panic.',
    },
    {
      name: 'Cosmeus the Celestial Architect',
      role: 'divine builder / well-meaning threat',
      personality:
        'A celestial being responsible for building pocket dimensions. Made an error 800 years ago, just noticed, and is horrified. Very professional, very apologetic, and very insistent that building codes exist for a reason. "I understand you have adapted. That does not change the fact that this violates Section 7.4 of the Planar Construction Code."',
    },
    {
      name: 'Flip (a child)',
      role: 'local kid / comic relief',
      personality:
        'A nine-year-old who thinks the party\'s single-direction gravity is the funniest thing she has ever seen. Follows them around laughing. "You just STAY there? On ONE floor? What do you even DO with the ceiling? Just LOOK at it?"',
    },
    {
      name: 'Bartos Ledger',
      role: 'bounty target / recurring nuisance',
      personality:
        'The party\'s original bounty target who uses the gravity flips to evade capture. Every time the party gets close, gravity flips and he walks away on the ceiling. He is not even fast. He just walks. "See you in an hour."',
    },
  ],
  keyLocations: [
    {
      name: 'Inverton (the Capital)',
      description: 'A city built symmetrically on both sides of every surface. Streets on the ground mirror streets on the ceiling. Half the population is always upside down relative to the other half. Market stalls are double-sided.',
      significance: 'The main setting and a demonstration of how an entire civilization adapted to flipping gravity.',
    },
    {
      name: 'The Bilateral Library',
      description: 'A library with shelves on the floor AND ceiling. Books are written to be read from both orientations. The librarian flips between floors to reshelve and does not consider this unusual.',
      significance: 'Where the party discovers the truth about the dimensional construction error.',
    },
    {
      name: 'The Anchor Point',
      description: 'The exact center of the pocket dimension where gravity is zero. Objects float here. The locals use it as a park. Children play in zero-G while their parents read books that hover at eye level.',
      significance: 'Where the celestial architect arrives and where the final negotiation takes place.',
    },
  ],
  dataSystems: [
    'environmentalHazard',
    'explorationHazard',
    'combatNarration',
    'socialEncounter',
    'plotTwistEngine',
    'trapGenerator',
    'riddleGenerator',
    'fantasyInsults',
  ],
};
