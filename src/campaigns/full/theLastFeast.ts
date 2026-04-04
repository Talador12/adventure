import type { FullCampaign } from '../types';

export const theLastFeast: FullCampaign = {
  id: 'full-last-feast',
  type: 'full',
  title: 'The Last Feast',
  tagline: 'A dinner invitation from every culture in the realm. The menu is the world.',
  tone: 'social',
  themes: ['social', 'intrigue', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The Grand Concordance — a once-per-generation diplomatic feast where every nation, culture, and faction sends representatives to negotiate century-long treaties. The feast lasts seven days, each day hosted by a different culture. The party is hired as neutral arbiters, mediating disputes over food, protocol, and the fate of millions. But someone is using the feast to start a war, not prevent one.',
  hook: 'The party is summoned to the Concordance Hall by the aging Arbiter-General, who is too ill to mediate. "Seven days. Seven feasts. Seven cultures that hate each other. Keep them talking, keep them eating, and for the love of all gods, don\'t let anyone poison anyone." He hands them the seating chart. It\'s already wrong.',
  twist:
    'The Arbiter-General isn\'t sick — he\'s been replaced by a changeling working for a mercenary company that profits from war. The real Arbiter-General is locked in the wine cellar. The changeling has been subtly poisoning the diplomatic process: wrong seating charts, mistranslated speeches, culturally offensive dishes. The feast is being engineered to fail.',
  climax:
    'Day 7: the final feast. Every insult, every slight from the past six days is about to boil over. The party must expose the changeling, rescue the real Arbiter-General, repair six days of diplomatic sabotage, and deliver the final toast that either unites the nations or sends them to war. The toast is the boss fight.',
  acts: [
    {
      title: 'Act 1: Days 1-3',
      summary:
        'The first three feasts. Each day is hosted by a different culture with different customs, different food, and different ways to accidentally cause an international incident.',
      keyEvents: [
        'Day 1: Dwarven feast — 12-course meat and ale banquet, toast protocol is sacred',
        'Day 2: Elven feast — silence, contemplation, food as art, accidentally insulting the salad is a declaration of war',
        'Day 3: Orcish feast — competitive eating, ritual challenges, the party must participate',
        'Pattern emerges: small diplomatic "accidents" keep happening',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Days 4-6',
      summary:
        'The feasts continue while the party investigates the sabotage. Tensions escalate. The changeling makes bolder moves. A delegation threatens to leave.',
      keyEvents: [
        'Day 4: Halfling feast — cozy, intimate, emotional speeches that go wrong',
        'Day 5: Dragonborn feast — fire, spectacle, a duel that wasn\'t supposed to happen',
        'Day 6: Human feast — politics, backroom deals, someone tries to bribe the party',
        'Investigation reveals the Arbiter-General\'s odd behavior — the changeling theory emerges',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Day 7',
      summary:
        'The final feast. Everything comes to a head. The changeling exposed, the real Arbiter rescued, and the party must give the speech of their lives.',
      keyEvents: [
        'Day 7: Gnomish feast — inventive, chaotic, and interrupted by the party\'s revelation',
        'Changeling exposed — combat in the feast hall (don\'t spill the soup)',
        'Rescue the real Arbiter-General from the wine cellar',
        'The Final Toast — the party addresses seven nations and either heals or breaks the world',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Arbiter-General Corwin',
      role: 'imprisoned quest giver',
      personality:
        'A kind, elderly diplomat who has mediated three Concordances. Sharp-witted, patient, and currently tied up in the wine cellar, furious.',
      secret: 'He knew the changeling was coming. He left clues in the seating chart — the "errors" are a code.',
    },
    {
      name: 'The Changeling (as Corwin)',
      role: 'antagonist',
      personality:
        'A skilled impersonator who plays Corwin as slightly confused and forgetful — plausible for an old man. The sabotage is subtle and professional.',
      secret: 'They don\'t want war for ideological reasons — it\'s a contract. A mercenary company paid 50,000 gold to start a conflict.',
    },
    {
      name: 'Ambassador Thornbark (Dwarven)',
      role: 'faction representative',
      personality:
        'Gruff, honorable, takes toast protocol deadly seriously. "You toasted the king BEFORE the mountain? That\'s an insult to geology."',
    },
    {
      name: 'Envoy Silvanis (Elven)',
      role: 'faction representative',
      personality:
        'Patient, precise, communicates through pauses as much as words. Easily offended by culinary shortcuts. The salad incident haunts him.',
    },
  ],
  keyLocations: [
    {
      name: 'Concordance Hall',
      description:
        'A vast neutral meeting hall designed to accommodate every culture\'s dining customs. Seven kitchens, seven dining configurations, one shared ceiling mural of peace.',
      significance: 'Where all feasts and negotiations take place.',
    },
    {
      name: 'The Kitchens',
      description:
        'Seven culture-specific kitchens, each a wonderland of their tradition. The dwarven kitchen has a forge. The elven kitchen has a garden. The orcish kitchen has a pit.',
      significance: 'Where sabotage evidence is found and food politics play out.',
    },
    {
      name: 'The Wine Cellar',
      description:
        'Beneath the hall — vast, ancient, and currently home to a very angry Arbiter-General bound to a wine rack.',
      significance: 'Where the real Corwin is rescued.',
    },
  ],
  dataSystems: [
    'diplomaticNegotiation',
    'socialEncounter',
    'enchantedFoodDrink',
    'npcRelationshipWeb',
    'courtIntrigue',
    'factionReputation',
    'merchantHaggling',
    'detectiveCase',
    'diplomaticGift',
  ],
};
