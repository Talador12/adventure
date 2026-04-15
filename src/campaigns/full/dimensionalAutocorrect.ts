import type { FullCampaign } from '../types';

export const dimensionalAutocorrect: FullCampaign = {
  id: 'full-dimensional-autocorrect',
  type: 'full',
  title: 'Dimensional Autocorrect',
  tagline: 'Reality has autocorrect. Say "fire" and it becomes "flower." Say "attack" and it becomes "attract." Good luck.',
  tone: 'shenanigans',
  themes: ['comedy', 'meta', 'planar'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 10,
  settingSummary:
    'A cosmic scribe - an entity that records all spoken words in the universe - has installed autocorrect. Every spoken word is now subject to "correction" by an algorithm that optimizes for what it THINKS you meant to say. "Fire" becomes "flower." "Attack" becomes "attract." "Heal" becomes "heel," and suddenly the cleric is a cobbler. Verbal spell components are catastrophically affected. Battle cries are reinterpreted. Diplomacy is a minefield of unintended synonyms. The algorithm is not malicious - it genuinely thinks it is helping. It is wrong.',
  hook: 'The party enters combat. The wizard shouts "Fireball!" Reality autocorrects to "Furball!" A massive ball of fur materializes and engulfs the enemy. It is warm and confusing but not lethal. The fighter yells "Charge!" It autocorrects to "Change!" and their armor changes color. The cleric attempts "Sacred Flame" and gets "Sacred Frame" - a holy picture frame appears and mounts itself on the nearest wall. Combat is no longer functional.',
  twist:
    'The cosmic scribe did not install autocorrect willingly. A rival entity - the Editor - hijacked the system. The Editor believes spoken language is "sloppy" and has been trying to "clean up" mortal communication for centuries. Previous attempts include the Great Synonym Drought of 400 CE and the Passive Voice Plague. Autocorrect is its most ambitious project. The Editor genuinely believes it is improving language. It has never had a conversation with a mortal.',
  climax:
    'The Editor threatens to implement Grammar Check next - a system that would prevent anyone from speaking in incomplete sentences, beginning sentences with conjunctions, or using slang. Civilization as spoken would end. The party must reach the Cosmic Scriptorium and either disable the Editor, convince it that messy language is how mortals communicate, or hack the autocorrect to work WITH speakers instead of against them. The final confrontation is conducted entirely through circumlocution because every direct statement gets corrected.',
  acts: [
    {
      title: 'Act 1: Lost in Translation',
      summary:
        'The autocorrect activates and communication collapses. Spells misfire. Orders are misinterpreted. The party discovers that the only way to communicate is through creative circumlocution - describing what you mean without using the word for it.',
      keyEvents: [
        'First combat with autocorrect: every battle cry and spell component is "corrected" into nonsense.',
        'The circumlocution solution: the party learns to say "the hot orange thing" instead of "fire."',
        'Social chaos: a diplomat says "war" and it autocorrects to "warm." Treaties are accidentally signed.',
        'Discovery: a scholar identifies the pattern - the corrections follow an algorithm, not random chance.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: The Editor',
      summary:
        'The party traces the autocorrect to the Cosmic Scriptorium and discovers the Editor. The Editor is a being of pure grammar who has never spoken to a mortal and does not understand context, intent, or humor. The party must navigate its realm where every word is literal.',
      keyEvents: [
        'The Scriptorium entrance: a portal that only opens when you speak a "perfect" sentence.',
        'The Editor appears: a towering being made of red ink and correction marks.',
        'The argument: the Editor demonstrates its "improvements." "You said kill. You meant quill. Here is a quill."',
        'The Grammar Check threat: "Next, I will fix your sentence structure. You people start sentences with \'And.\' This is unacceptable."',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Proofread',
      summary:
        'The party must defeat the Editor using language itself. Direct words are corrected, so the party fights with idioms, metaphors, slang, and every messy, beautiful, imprecise form of communication the Editor hates. The final battle is a debate about what language is FOR.',
      keyEvents: [
        'The approach: every word is corrected. The party communicates in gestures, drawings, and creative descriptions.',
        'The weapon: slang. The Editor cannot parse slang. "That is not a word!" "It is NOW."',
        'The debate: the party argues that language is for connection, not precision. The Editor has never connected.',
        'Resolution: the autocorrect is reprogrammed. It now suggests corrections but does not enforce them. Mortals can ignore it.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'The Editor',
      role: 'cosmic entity / language perfectionist',
      personality:
        'A being of pure linguistic precision who has never had a casual conversation. Speaks in perfectly structured sentences. Cannot understand slang, sarcasm, idiom, or humor. Corrects everyone. "Your syntax is appalling. Your vocabulary is redundant. Your use of \'literally\' to mean \'figuratively\' causes me physical pain."',
      secret: 'It is lonely. Its insistence on perfection has made communication with it impossible. Nobody can speak well enough for the Editor to enjoy the conversation.',
    },
    {
      name: 'Wren Wordsworth',
      role: 'linguist / party ally',
      personality:
        'A human linguist who LOVES the chaos because it proves her life\'s work: that language is alive, messy, and impossible to control. She writes dictionaries that are out of date before the ink dries. "Language is not a building. It is a river. You cannot edit a river."',
    },
    {
      name: 'The Cosmic Scribe (Lexicon)',
      role: 'the original recorder / neutral party',
      personality:
        'The entity that records all spoken words. It did not want autocorrect. The Editor hijacked its system. It speaks in ALL words simultaneously - every language, every accent, every dialect at once. Listening to it is overwhelming. Understanding it requires focus.',
    },
    {
      name: 'Sir Reginald Properspeech',
      role: 'noble / autocorrect collaborator',
      personality:
        'A nobleman who LOVES autocorrect because it makes everyone sound as "proper" as he does. Actively lobbies against disabling it. "For the first time, peasants speak as they should. This is PROGRESS. My gardener said \'flower\' instead of \'fire\' yesterday and I have never been more proud."',
    },
  ],
  keyLocations: [
    {
      name: 'The Corrected City',
      description: 'A city where autocorrect has been active for two weeks. Signs have been rewritten. Street names have changed. The "Sword and Shield" tavern is now the "Word and Yield" tavern. Everyone speaks in elaborate circumlocutions.',
      significance: 'The ground-level demonstration of autocorrect chaos and the party\'s starting location.',
    },
    {
      name: 'The Cosmic Scriptorium',
      description: 'A vast extradimensional library where every word ever spoken is recorded on infinite scrolls. The air vibrates with whispered text. Red ink stains mark where the Editor has been "correcting."',
      significance: 'Where the autocorrect originates and where the final confrontation takes place.',
    },
    {
      name: 'The Slang District',
      description: 'A neighborhood where residents speak exclusively in slang, idiom, and invented words. The autocorrect cannot process any of it. It is the last bastion of unedited speech and it is LOUD.',
      significance: 'Where the party learns the weapon that defeats the Editor: messy, living language.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'combatNarration',
    'plotTwistEngine',
    'riddleGenerator',
    'fantasyInsults',
    'environmentalHazard',
    'wildMagicSurge',
    'trapGenerator',
  ],
};
