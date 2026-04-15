import type { FullCampaign } from '../types';

export const insideOut: FullCampaign = {
  id: 'full-inside-out',
  type: 'full',
  title: 'Inside Out',
  tagline: 'You tried to save a child from falling into the sky. Everyone else saw you drag her off solid ground.',
  tone: 'horror',
  themes: ['horror', 'planar', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 15,
  settingSummary:
    'The world has turned inside out. The sky is below your feet. The ground is above your head. Gravity still pulls "down" but down is now the sky. Buildings hang from the ceiling of the world. Rain falls upward. The sun orbits below, shining up through an abyss where the ground should be. Navigation is a nightmare. Your brain cannot adjust. The vertigo never stops. Climbing a staircase means descending into the sky. Entering a building means stepping onto its roof. Every instinct you have is wrong. The horror is not a monster. It is the constant, nauseating wrongness of a world that will not orient correctly.',
  hook:
    'The party wakes up and the sky is below them. They are lying on what was the ceiling of their inn. The furniture hangs "above" them, bolted to the floor that is now overhead. Outside, the city hangs upside down from a stone sky. Below their feet is an infinite blue void where the ground should be. Falling means falling UP into the stone, or DOWN into the sky. People are panicking. Gravity still works but everything is inverted. A child falls off a bridge and plummets into the open sky below, screaming, until they are gone.',
  twist:
    'The world did not flip. The party did. A curse called the Inversion was placed on them specifically, flipping their perception of reality 180 degrees. They have been walking on ceilings, climbing through windows, falling upward, and terrifying normal people who see adventurers crawling on surfaces like insects. Every person who "fell into the sky" in the party perception actually fell normally - the party just saw it inverted. The horror deepens: everything they thought was a cosmic catastrophe was them, cursed, stumbling through a normal world upside-down.',
  climax:
    'The cure requires accepting that their perception is wrong. Not intellectually - they figure that out in Act 2. Emotionally. The curse feeds on certainty: the more they trust their senses, the stronger it gets. Breaking it means deliberately walking off what they perceive as a cliff (actually the ground), trusting that the world is right and they are wrong. Jumping into the void. Every instinct screaming not to. The final act is about trust - trusting the world, their allies, and their own ability to let go of what their eyes tell them.',
  acts: [
    {
      title: 'Act 1: The Inverted World',
      summary:
        'The party experiences the world as inverted. Sky below, ground above. They navigate an "upside-down" city, try to help people they think are falling into the sky, and search for the cause. The horror is environmental: constant vertigo, impossible architecture, and the terror of looking down and seeing open sky.',
      keyEvents: [
        'Waking on the "ceiling." The sky stretches below their feet. The stone ceiling looms above. Furniture hangs overhead.',
        'A child falls off a bridge into the open sky below. The party tries to save them. From everyone else perspective, the party lunges at a child on solid ground.',
        'Navigating the inverted city: every staircase goes the wrong direction. Doors open onto rooftops. The party enters buildings through chimneys.',
        'A helpful NPC approaches: from the party view, she is walking on the ceiling above them. She looks down (up?) and says: "Are you alright? You are on the ceiling."',
        'The first hint: a mirror. The party sees themselves in a mirror and their reflections are standing normally. They are upside down.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Truth Hurts',
      summary:
        'The party discovers the Inversion curse and realizes THEY are wrong, not the world. But knowing it intellectually does not fix the perception. They still see everything inverted. They must function in a world their senses lie about while tracking the curse source and finding a way to break it.',
      keyEvents: [
        'Confirmation: a sage diagnoses the Inversion. "The world is fine. Your perception is rotated 180 degrees. You are standing on the ceiling right now."',
        'Trying to function: the party knows up is down but their body does not. Walking on the "ground" (actually the ceiling to everyone else) while knowing it is wrong.',
        'Finding the curse origin: a temple of a trickster god where the party stepped on a "perception trap" they did not notice',
        'The curse mechanics: it feeds on sensory trust. The more they believe their eyes, the stronger the inversion. Closing their eyes actually helps.',
        'A blindfolded section: the party navigates by touch and sound. For the first time, the vertigo stops. The world feels right when they cannot see it.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Leap of Faith',
      summary:
        'The cure is known: the party must reject their own perception completely and trust the world. This means walking off what they see as a cliff into open sky, trusting that it is actually solid ground. The trickster god watches, amused. The emotional climax is not a fight. It is trust.',
      keyEvents: [
        'The trickster god Vexmire manifests: "The cure is simple. Walk off the edge. Trust the ground you cannot see. Or stay inverted forever."',
        'Preparation: the party ties ropes, makes plans, argues about whether this is a trick within a trick',
        'A party member who has been blind since birth (or blinded in Act 2) walks to the edge and steps off without hesitation. They land on solid ground.',
        'One by one: each party member must walk off their perceived cliff. Some run. Some crawl. One is pushed by a friend. Each landing shatters the curse.',
        'The world rights itself. The sky is above. The ground is below. For the first time in weeks, down is down. The relief is physical.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Vexmire the Inverted',
      role: 'trickster god / curse source',
      personality:
        'A trickster deity who cursed the party not out of malice but curiosity. They wanted to see how mortals handle having their reality flipped. Amused, philosophical, and genuinely interested in the result. "Perception IS reality for you creatures. I wanted to know what happens when reality is wrong."',
      secret: 'They cast the curse because they are studying mortal trust. Gods perceive reality directly. Mortals perceive through senses. Vexmire finds that fascinating and terrifying.',
    },
    {
      name: 'Sage Miriel Kast',
      role: 'diagnostician / ally',
      personality:
        'A perception scholar who has studied the Inversion curse in texts but never seen it in person. She speaks rapidly, excitedly, taking notes while the party describes their symptoms. She tilts her head upward when addressing them because to her, they are on the ceiling. She has to constantly remind the party: "I am standing on the floor. YOU are on the ceiling. Please stop trying to rescue me." She is clinically fascinated and genuinely helpful, and that combination is maddening.',
    },
    {
      name: 'Brother Felt',
      role: 'blind guide / key to the cure',
      personality:
        'A monk who was born blind. The Inversion does not affect him because he never relied on sight. He walks confidently where the party crawls. He navigates by touch and sound and does not understand the vertigo. He reaches for the party\'s hands without hesitation. His calm is the most disorienting thing in a disorienting world. "The world feels the same as always to me. Perhaps it is your eyes that are the problem."',
    },
    {
      name: 'Marta Voss',
      role: 'collateral damage / emotional weight',
      personality:
        'A woman the party "rescued" from falling in Act 1 - actually, they grabbed a woman standing on solid ground and dragged her onto the ceiling. She has a broken arm from their help. She flinches when the party approaches. She cannot understand why they did it. She represents the harm the party has accidentally caused by trusting their broken senses, and she is afraid of them in a way that is entirely justified.',
    },
  ],
  keyLocations: [
    {
      name: 'The Inverted City',
      description: 'A normal city seen upside-down. Buildings hang from a stone sky. Streets are ceilings. The open void of the sky stretches below like an abyss. Nauseating, disorienting, and relentless.',
      significance: 'The primary setting. Where every scene is a navigation puzzle and a trust exercise.',
    },
    {
      name: 'The Temple of Vexmire',
      description: 'A temple to the trickster god built with deliberately confusing architecture - Escher staircases, doors that open onto walls, rooms with gravity that changes per corner. Even non-cursed people get lost.',
      significance: 'Where the curse originated and where the cure is revealed.',
    },
    {
      name: 'The Edge',
      description: 'A cliff overlooking what the party perceives as infinite sky below - actually solid ground. The final test. The place where they must step off and trust.',
      significance: 'The climax location. Where the leap of faith happens.',
    },
  ],
  dataSystems: ['environmentalHazard', 'puzzleRoom', 'combatNarration', 'planarAnomaly', 'emotionalBeat'],
};
