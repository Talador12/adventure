import type { FullCampaign } from '../types';

export const ragnarokTuesday: FullCampaign = {
  id: 'full-ragnarok-tuesday',
  type: 'full',
  title: 'Ragnarok Tuesday',
  tagline: 'The apocalypse happened. It was underwhelming. Now someone has to clean up.',
  tone: 'comedic',
  themes: ['comedy', 'war', 'epic'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 8 },
  estimatedSessions: 14,
  settingSummary:
    'Ragnarok was supposed to be the end of everything. The great wolf would devour the sun. The serpent would poison the sea. The gods would die in glorious combat. Instead, due to a clerical error in the divine scheduling office, the apocalypse was localized to one village: Midfjord, population 340. The sun is fine. The sea is fine. Midfjord is not fine. A dead Fenrir wolf the size of a cathedral is blocking the main trade road. Odin\'s two ravens will not stop arguing about whose fault this was. A Valkyrie showed up for the wrong battle and is refusing to leave without a soul. And a frost giant is sitting in the town square, deeply confused about why he is still alive.',
  hook: 'The party arrives in Midfjord to find the aftermath of the world\'s most disappointing apocalypse. The village elder hires them: "We need the wolf moved, the ravens silenced, the Valkyrie given someone to collect, and the frost giant - I do not know, make him tea? He seems sad. Also, the divine scheduling office sent a raven saying they will reschedule Ragnarok for next month. We would like to file a complaint."',
  twist:
    'The clerical error was not an error. A minor bureaucratic deity named Ledger, god of records and filing, deliberately localized Ragnarok to Midfjord to prove a point: the gods have become so lazy and disorganized that the end of the world can be misfiled and nobody notices for a week. Ledger wants the party to take the complaint all the way to Asgard - not to cancel Ragnarok, but to force the gods to actually prepare for it properly. The real campaign is a divine audit.',
  climax:
    'The party reaches the divine scheduling office in Asgard and presents the complaint. The gods are forced into a formal review of Ragnarok preparedness. It goes terribly. Thor lost his hammer again. The world serpent filed for early retirement. The Valkyries unionized. The party must either fix the divine bureaucracy so Ragnarok can happen properly, or convince everyone that maybe the apocalypse should just be cancelled and everyone should go to lunch.',
  acts: [
    {
      title: 'Act 1: The Aftermath',
      summary: 'Cleaning up Midfjord. Each problem is its own comedic encounter: the wolf, the ravens, the Valkyrie, the frost giant. Every solution creates two new problems.',
      keyEvents: [
        'The wolf: too big to move, too dead to negotiate with. Someone suggests eating it. The wolf is cursed.',
        'The ravens Huginn and Muninn: arguing about whose memory of the schedule is correct. They will not shut up.',
        'Valkyrie Brynhild: contractually obligated to collect a fallen warrior. No one died heroically enough to qualify.',
        'Thrym the frost giant: just sitting there. He prepared a death poem and everything. He wants a do-over.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Filing the Complaint',
      summary: 'The journey to Asgard via the Bifrost. Except the Bifrost has a waiting list. The party must find alternative divine transit while dodging rescheduled apocalyptic events.',
      keyEvents: [
        'The Bifrost ticket office: a six-month wait. The party needs to find another way up.',
        'The World Tree: climbable, but every branch is a different realm and the squirrel Ratatoskr is a terrible guide',
        'Rescheduled apocalypse events keep happening in random locations: a small flood here, localized fire there',
        'Ledger makes contact: reveals the error was deliberate and gives them the formal complaint paperwork',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Divine Audit',
      summary: 'In Asgard, the party presents the complaint and triggers a full audit of Ragnarok preparedness. Every god is worse at their job than expected.',
      keyEvents: [
        'The hearing: the party presents the complaint. The gods are offended. Odin calls for order. His ravens are still arguing.',
        'The audit: Thor lost Mjolnir in a bet. Freya pawned her necklace. The einherjar are on strike.',
        'The vote: cancel Ragnarok, reschedule properly, or declare Midfjord the official test site',
        'Resolution: the party brokers a divine compromise. Midfjord gets reparations. Ragnarok is postponed indefinitely.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Ledger',
      role: 'bureaucratic deity / secret quest giver',
      personality: 'A small, fussy god who keeps immaculate records and is furious that no one else does. Wears spectacles. Carries a quill that never runs dry. Has been filing complaints about divine negligence for centuries. This is the first time anyone listened.',
    },
    {
      name: 'Brynhild',
      role: 'stranded Valkyrie / reluctant ally',
      personality: 'A by-the-book warrior angel stuck in Midfjord because her paperwork says she has to collect a hero. She is bored, annoyed, and increasingly willing to lower her standards for what counts as "heroic."',
    },
    {
      name: 'Thrym',
      role: 'confused frost giant / gentle soul',
      personality: 'Twenty feet tall, surprisingly soft-spoken. He spent fifty years preparing for Ragnarok - composing his death poem, sharpening his axe, making peace with his ancestors. Now he has nothing to do. He is having an existential crisis in the town square.',
    },
    {
      name: 'Elder Magna',
      role: 'village leader / exasperated employer',
      personality: 'An unflappable grandmother who has survived three dragon attacks, two plagues, and a tax audit. The localized apocalypse is just Tuesday to her. "Fix it. I do not care how. Send me the bill."',
    },
  ],
  keyLocations: [
    { name: 'Midfjord', description: 'A mid-sized fishing village with a dead cosmic wolf on the main road, a frost giant in the square, and ravens screaming on every rooftop.', significance: 'Ground zero of the worst apocalypse ever. Home base for Act 1.' },
    { name: 'The World Tree (Yggdrasil)', description: 'The cosmic ash tree connecting the nine realms. Each branch is a different world. The squirrel running up and down the trunk is unhelpful.', significance: 'The transit system to Asgard when the Bifrost is booked solid.' },
    { name: 'The Divine Scheduling Office', description: 'A vast celestial filing room in Asgard. Every cosmic event is logged here. The backlog is centuries deep and the filing system is a disaster.', significance: 'Where the complaint is filed and the audit takes place. The campaign\'s final arena.' },
  ],
  dataSystems: ['socialEncounter', 'npcRelationshipWeb', 'fantasyInsults', 'dialogueTrees', 'randomNpcGenerator', 'voiceLines', 'travelMontage', 'diplomaticIncident'],
};
