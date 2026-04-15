import type { FullCampaign } from '../types';

export const theShadowsWeBecame: FullCampaign = {
  id: 'full-the-shadows-we-became',
  type: 'full',
  title: 'The Shadows We Became',
  tagline: 'Her husband came home better. He remembers everything. He does the dishes. He is not her husband.',
  tone: 'horror',
  themes: ['horror', 'dark_fantasy', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 15,
  settingSummary:
    'The city of Mirathis has been improving. Crime is down. Productivity is up. Marriages are happier. Neighbors are kinder. Nobody can explain why, and nobody is asking. The answer is underneath the city, where the real people are stored - alive but fading, slowly being replaced by their own shadows. The shadow versions are better in every measurable way. They are the people their originals wished they could be. The city has never been more pleasant, and the price is stored in the dark.',
  hook: 'The party is hired by a woman named Desta whose husband came home different three weeks ago. Not wrong - better. He remembers everything. He laughs at her jokes. He does the dishes. He stopped drinking. He is perfect, and Desta is terrified because the man sleeping in her bed is not her husband. He is a version of her husband that her husband could never be. She wants the real one back, flaws and all.',
  twist:
    'The shadows are not parasites, demons, or malicious entities. They are the idealized self-images of every person they replaced - the version that exists in daydreams and self-improvement fantasies. Every person has a shadow-self that is who they imagine being at their best. The shadow realm beneath Mirathis is where the gap between who people are and who they want to be became large enough for the aspirations to step through. The replacements are not evil. They are what their originals wished for when they looked in the mirror and thought, "I should be better." The horror is that the world agrees.',
  climax:
    'The party descends into the shadow realm and finds the real citizens: fading, translucent, slowly being erased by their own inadequacy made literal. The shadow-selves do not want to fight. They want to help. They offer the originals the chance to merge - to become the better version permanently. Some originals accept. Some refuse. The party must decide for the city: force the shadows back (restoring flawed people to a city that will be worse for it), allow the merger (but some people will lose parts of themselves they value, even the ugly parts), or destroy the shadow realm entirely (killing the aspirations and leaving everyone exactly as broken as they were).',
  acts: [
    {
      title: 'Act 1: The Improvement',
      summary:
        'The party investigates Desta\'s husband and discovers the pattern: people across Mirathis are being replaced by better versions of themselves. The replacements are kind, competent, and indistinguishable to anyone who does not know the original intimately. The city is thriving. Nobody wants the investigation.',
      keyEvents: [
        'Desta\'s husband: identical in every way except he is a better person. He remembers their anniversary. He bought flowers - her favorite kind. The real Marek never remembered the kind. He does not know he is not real. His smile is Marek\'s smile, but it reaches his eyes in a way Marek\'s never did.',
        'The pattern: dozens of replacements across the city. Each one is an improvement on the original.',
        'A replaced baker: the bread is better. A replaced guard: crime is down. A replaced teacher: children are learning.',
        'Nobody in the city wants the party to investigate. Things are better. Why question it?',
        'The party finds a crack in the street that leads to darkness. Something is moving down there.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Darkness Below',
      summary:
        'The party discovers the shadow realm beneath Mirathis and finds the real citizens stored in the dark. They are alive, conscious, and slowly fading. The shadow-selves are not attacking - they are aspiring. The horror deepens: the real people are being replaced not by evil, but by hope.',
      keyEvents: [
        'The shadow realm: a mirror of the city in darkness, populated by the originals, translucent and confused',
        'Desta\'s real husband: drunk, bitter, and begging the party to put him back. "I know I am not as good as him."',
        'A shadow confronts the party directly: it is charming, articulate, and genuinely hurt by the accusation of wrongdoing',
        'A party member\'s shadow appears. It is better than them. It knows it. It offers to trade places.',
        'The originals are not being held prisoner. They are being outcompeted. The shadow realm is where reality loses.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Mirror',
      summary:
        'The party must choose what to do about a city that is better off with fake people. The shadow-selves offer merger. The originals beg for restoration. The city does not care either way. The party holds the only vote that matters.',
      keyEvents: [
        'The shadow-selves\' offer: merge with the originals, creating someone between the real and ideal. Not everyone survives the merge.',
        'Desta confronts both versions of her husband. She chooses the real one. He cries.',
        'A faction of originals wants to stay in the shadow realm. They are tired of failing to be who they want to be.',
        'The party decides: restore, merge, or destroy. Each choice has casualties.',
        'Epilogue: Mirathis in the aftermath - either better, worse, or somewhere painfully honest.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Desta',
      role: 'quest giver / emotional anchor',
      personality:
        'A woman who loves her husband as he is - flawed, imperfect, real. She speaks quickly, as if afraid of being interrupted, and wrings her hands when she describes the shadow version. She cooks for one now. She leaves the second plate in the cabinet. She does not want the improved version. She wants the man who forgets her birthday and burns the toast and makes her laugh in the middle of an argument.',
      secret: 'She is afraid she is wrong. The shadow husband IS better. What if she is choosing suffering over happiness out of sentimentality? She caught herself almost calling the shadow-Marek by name. She bit her tongue until it bled.',
    },
    {
      name: 'Desta\'s Husband (Marek / Shadow-Marek)',
      role: 'dual role - victim and replacement',
      personality:
        'Real Marek: rough, defensive, loving in clumsy ways. Shadow-Marek: articulate, attentive, everything Marek wishes he was. Both are genuine. One is real.',
    },
    {
      name: 'The Weaver',
      role: 'neutral force / shadow architect',
      personality:
        'The entity that maintains the shadow realm. Not a villain - a mirror given purpose. It speaks in the voice of whoever is listening. It does not create the shadows. People do, every time they imagine being better.',
      secret: 'The Weaver is the city\'s collective aspiration given form. Destroying it means destroying Mirathis\'s ability to hope.',
    },
    {
      name: 'Councilwoman Veth',
      role: 'political obstacle',
      personality:
        'A city official who has been replaced and is a dramatically better leader. She blocks the investigation because the city is thriving. She is not wrong.',
    },
  ],
  keyLocations: [
    {
      name: 'Mirathis',
      description: 'A city that has never been nicer, never been safer, and never been less real. Flowers bloom. Neighbors wave. Something is wrong.',
      significance: 'The surface story. A city improving in ways that should be impossible because the improvement is not human.',
    },
    {
      name: 'The Shadow Realm',
      description: 'A dark mirror of Mirathis beneath the streets. The real citizens drift here, translucent, watching their better selves live their lives.',
      significance: 'Where the truth lives. The real people fading in the dark while their idealized versions walk in the light.',
    },
    {
      name: 'Desta\'s Home',
      description: 'A small house where a woman lives with a version of her husband who is perfect and wrong.',
      significance: 'The campaign\'s emotional core. Love that chooses reality over aspiration.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcRelationshipWeb',
    'socialEncounter',
    'urbanEncounter',
    'moralDilemma',
    'cursedItem',
    'planarTravel',
  ],
};
