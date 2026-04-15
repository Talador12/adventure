import type { OneShotCampaign } from '../types';

export const thePolymorph: OneShotCampaign = {
  id: 'oneshot-the-polymorph',
  type: 'oneshot',
  title: 'The Polymorph',
  tagline: 'A wild magic surge turned the whole party into animals. The quest is a formal diplomatic dinner. Good luck.',
  tone: 'shenanigans',
  themes: ['comedy', 'social', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The Grand Diplomatic Banquet of the Five Kingdoms is tonight. The party was hired as security. A wild magic surge hit them twenty minutes before the event. The fighter is now a badger. The wizard is an owl. The rogue is a cat. The cleric is a very confused sheep. They are still the security detail. Nobody cancelled them. Their invitations still work. The hosts are expecting humanoids in formal attire and instead they are getting a petting zoo with swords.',
  hook: 'The party arrives at the banquet hall in animal form. The doorman looks at the invitation, looks at the badger holding it, looks at the invitation again, and says: "Table seven." They are expected to maintain security, identify a suspected assassin among the guests, and not eat from the floor. Two of these will be achieved.',
  twist: 'The assassin is ALSO polymorphed. They are the parrot on the ambassador\'s shoulder. The assassin has been polymorphed for weeks and has been gathering intelligence in plain sight. The party must identify which animal at the diplomatic dinner is secretly a hired killer while they themselves are animals trying to act like people.',
  climax: 'The assassin-parrot makes its move during dessert. The party must stop an assassination while being a badger, an owl, a cat, and a sheep. Combat in animal form on a formal dinner table. Dishes shatter. Wine spills. Diplomats scream. The badger body-slams the parrot into a tiramisu. International relations are somehow improved.',
  scenes: [
    {
      title: 'The Arrival',
      summary: 'The polymorphed party enters the banquet and must convince the hosts they are competent security despite being animals. Social checks at disadvantage.',
      challenge: 'social',
      keyEvents: [
        'The doorman seats them without comment. This is the classiest event in the realm. Nobody makes a scene.',
        'The fighter-badger tries to salute the host. It looks like an angry badger swiping at the air.',
        'The wizard-owl perches on a chandelier for surveillance. A waiter tries to shoo it with a broom.',
        'The cleric-sheep accidentally eats the centerpiece. It was expensive.',
      ],
    },
    {
      title: 'The Investigation',
      summary: 'The party must identify the assassin among the guests while navigating a formal dinner as animals. They overhear conversations, sniff out clues, and try not to be mistaken for entertainment.',
      challenge: 'exploration',
      keyEvents: [
        'The rogue-cat sneaks under tables to eavesdrop. Hears critical intel. Gets distracted by a dangling tablecloth.',
        'The owl spots the parrot whispering to no one. Suspicious. Also parrots do not normally whisper.',
        'A diplomat tries to pet the sheep. The sheep is the cleric. The cleric does not know how to react. Nobody does.',
        'The parrot is spotted studying the seating chart. Parrots do not need seating charts.',
      ],
    },
    {
      title: 'The Assassination Attempt',
      summary: 'The parrot makes its move during dessert. Animal-on-animal combat on a formal dinner table. Absolute chaos.',
      challenge: 'combat',
      keyEvents: [
        'The parrot drops from the ambassador\'s shoulder with a tiny poisoned blade. It is surprisingly well-armed for a parrot.',
        'The badger leaps onto the table and charges. Plates shatter. A soup tureen goes airborne.',
        'The owl dive-bombs the parrot. Aerial combat over a banquet table.',
        'The sheep tackles a diplomat out of the way. The diplomat is grateful but confused.',
        'The parrot is defeated. It poofs back into a half-elf with a dagger, face-down in tiramisu. The party poofs back to normal. The host: "Best security we have EVER had."',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Ambassador Venn', role: 'assassination target', personality: 'A dignified elven diplomat who has the patience of a saint. Treats the animal security detail with absolute professionalism. Does not question why a sheep is guarding him.' },
    { name: 'The Parrot (Silas Keen)', role: 'assassin / parrot', personality: 'A professional assassin who polymorphed himself into a parrot for deep cover. Has been on the ambassador\'s shoulder for three weeks. Is thoroughly sick of crackers. Professional to the end.' },
    { name: 'Headwaiter Corvis', role: 'ally / horrified professional', personality: 'The banquet headwaiter. His job is to ensure a flawless evening. An owl on the chandelier, a cat under the tables, and a badger at the salad bar are not part of the plan. Maintains composure through sheer willpower.' },
  ],
  keyLocations: [
    { name: 'The Grand Banquet Hall', description: 'Crystal chandeliers, silk tablecloths, seven-course meal. The fanciest room any of these animals have ever been in.', significance: 'The entire one-shot takes place here. Every social interaction, investigation, and the final combat.' },
    { name: 'The Kitchen', description: 'Chaos behind the scenes. Chefs, waiters, and now a sheep that wandered in. The rogue-cat finds it an excellent eavesdropping position.', significance: 'Secondary investigation area. The assassin\'s poison was prepared here.' },
  ],
  dataSystems: ['socialEncounter', 'combatNarration', 'npcDialogue'],
};
