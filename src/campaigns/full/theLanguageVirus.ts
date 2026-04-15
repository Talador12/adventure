import type { FullCampaign } from '../types';

export const theLanguageVirus: FullCampaign = {
  id: 'full-the-language-virus',
  type: 'full',
  title: 'The Language Virus',
  tagline: 'A mother said "I could eat you up" and her jaw unhinged.',
  tone: 'horror',
  themes: ['horror', 'urban', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 13 },
  estimatedSessions: 15,
  settingSummary:
    'Words are becoming literal. A magical virus is infecting language itself, stripping away the metaphorical layer that separates intention from effect. "I am starving" causes actual starvation. "It is raining cats and dogs" creates a horrifying weather event. "My heart is broken" is cardiac arrest. The party must investigate the source while communicating without idioms, metaphors, or exaggeration - or suffer the consequences. The campaign forces creative roleplaying: gestures, drawings, music, precise literal speech. Every conversation is a minefield.',
  hook:
    'A bard in a tavern sings "this song will blow you away." A gust of wind launches the entire audience through the walls. A merchant says "these prices are criminal" and is arrested on the spot. A mother tells her child "I could eat you up" and her jaw unhinges. The party witnesses three incidents in one hour. Nobody understands what is happening. Then a party member says "I am dying to find out" and takes 4d6 necrotic damage.',
  twist:
    'The virus is not new. Language USED to be literal. In the deep past, words were power - saying "fire" created fire, saying "die" killed. An ancient enchantment called the Veil of Metaphor was cast over all language to make words safe, separating intention from effect. The Veil is wearing off. Not because of a villain - because the enchantment was never permanent. The original casters wrote warnings: "The Veil will fade. When it does, teach them to speak carefully. Or teach them silence."',
  climax:
    'The party must either recast the Veil (requiring a ritual so complex it needs perfect literal speech - one metaphor during the casting and it fails catastrophically) or teach the world to speak literally (an impossible cultural shift but a permanent solution). The final encounter is not a fight but a speech - the most important words anyone has ever said, where every syllable must be precisely true.',
  acts: [
    {
      title: 'Act 1: Say What You Mean',
      summary:
        'The virus spreads through the city. Common phrases become dangerous. The party investigates while learning to communicate without metaphor. Social encounters become linguistic puzzles. Combat changes: battle cries have real effects. "You are dead" is a save-or-die.',
      keyEvents: [
        'The tavern incident: "this song will blow you away" launches the audience through walls',
        'A party member takes necrotic damage from a casual idiom. The rules are clear: speak literally or suffer.',
        'Investigation: the virus spreads through conversation. Anyone who hears an infected phrase becomes a carrier.',
        'The Silent Quarter: a neighborhood that stopped talking entirely. They communicate through hand signals and drawings.',
        'A battle where the enemy shouts "Die!" and it functions as Power Word Kill. The party must fight without speaking.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Archaeology of Words',
      summary:
        'The party discovers the ancient history of literal language and the Veil of Metaphor. They find the original casting site, the warnings left behind, and the uncomfortable truth that the Veil was always temporary. The virus is not an infection - it is entropy.',
      keyEvents: [
        'Finding the Etymon Archive: a library where every word is catalogued with its original literal power',
        'Discovery: the word "fire" in ancient script still generates heat. Words have always been dangerous.',
        'The Veil of Metaphor: an enchantment cast 10,000 years ago by the Speakers Circle to make language safe for ordinary people',
        'The warnings: "We bought you time. Ten thousand years. Use them to learn precision. We fear you will not."',
        'A demonstration of weaponized literalism: a warlord has figured out that "his army is unstoppable" makes them literally invincible',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Last Word',
      summary:
        'The Veil collapses entirely. Every word spoken anywhere has literal power. Civilization teeters on the edge. The party must recast the Veil (risky, temporary) or find a permanent solution (teach the world literal speech - a generational project). The final ritual is a speech where one wrong word ends everything.',
      keyEvents: [
        'Global collapse: news travels by spoken word. Every messenger who says "catastrophic" makes it worse.',
        'The recasting ritual: found in the Etymon Archive. Requires absolute literal precision for thirty minutes of continuous speech.',
        'Practice attempts: the party rehearses. Someone says "piece of cake" and a pastry appears. Back to rehearsal.',
        'The warlord assault: the weaponized literalist attacks during the ritual, using words as weapons',
        'The speech: the final ritual. Every word must be precisely, literally true. No metaphors. No idioms. No exaggeration. Just truth.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Archivist Senna Quill',
      role: 'guide / linguist',
      personality:
        'Keeper of the Etymon Archive. Has spoken only in precise, literal language her entire life - not because of the virus, but because she always knew words were dangerous. She pauses before every sentence. She counts syllables on her fingers. She corrects the party\'s speech mid-conversation with the intensity of someone defusing a bomb. Pedantic, careful, and deeply vindicated. "I have been telling people to say what they mean for forty years. Now they have to."',
    },
    {
      name: 'Warlord Thessa Ironvow',
      role: 'antagonist / weaponizer',
      personality:
        'A military commander who immediately saw literal language as a weapon. She speaks in clipped, measured phrases - never more than six words at a time. Her soldiers chant "we are invincible" before battle and it works. She does not want the Veil restored. She is not insane - she is strategic.',
      secret: 'She is terrified. One of her soldiers said "I wish I were dead" in a moment of despair. It worked. She now gags her troops before bed. She cannot control this and she knows it.',
    },
    {
      name: 'The Silent Monk',
      role: 'ally / alternate solution',
      personality:
        'A monk from an ancient order that took vows of silence centuries ago - not for spiritual reasons, but because they remembered a time before the Veil. They communicate through a sign language that has no metaphors. Every gesture is precise, literal, unburdened. They are the calmest person the party has met since the virus began. They have been preparing for this day. They are not surprised.',
    },
    {
      name: 'Bard Colvin Merriweather',
      role: 'tragic figure / cautionary tale',
      personality:
        'The bard from the opening tavern scene. His song launched people through walls. He has not spoken since. He communicates through written notes, carefully edited - every note is covered in crossed-out words, each deletion a potential catastrophe avoided. He carries a quill and parchment at all times. His hands shake when he writes. He mouths words silently before committing them to paper. He is terrified of his own voice.',
    },
  ],
  keyLocations: [
    {
      name: 'The Silent Quarter',
      description: 'A neighborhood that collectively stopped speaking. Communication is through hand signals, drawings on chalkboards, and elaborate pantomime. The quietest, safest place in the city.',
      significance: 'Act 1 sanctuary. Proof that silence is a viable (if limiting) solution.',
    },
    {
      name: 'The Etymon Archive',
      description: 'An ancient library where every word in every language is catalogued alongside its original literal power. The shelves hum. Some books are chained shut because their titles are dangerous.',
      significance: 'Where the history is revealed and the recasting ritual is found.',
    },
    {
      name: 'The Speaking Circle',
      description: 'The original casting site of the Veil of Metaphor. A stone amphitheater where the acoustics are perfect and every word resonates. Where the Veil was cast and where it must be recast.',
      significance: 'The final location. Where the ritual speech happens.',
    },
  ],
  dataSystems: ['combatNarration', 'riddleGenerator', 'fantasyInsults', 'plotTwistEngine', 'urbanEncounter'],
};
