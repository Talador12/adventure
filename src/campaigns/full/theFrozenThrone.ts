import type { FullCampaign } from '../types';

export const theFrozenThrone: FullCampaign = {
  id: 'full-the-frozen-throne',
  type: 'full',
  title: 'The Frozen Throne',
  tagline: 'The clans were united by marriage. Someone is killing the spouses. Winter is the suspect.',
  tone: 'epic',
  themes: ['war', 'classic_fantasy', 'wilderness'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 18,
  settingSummary:
    'The Frostmarch stretches a thousand miles across the northern wastes - tundra, boreal forest, frozen lakes, and mountains that scrape the aurora. For centuries, five clans warred over hunting grounds, river passages, and old grudges. Then Jarl Astrid Ironbraid did what no one had done: she united them. Not through conquest, but through marriage. She married into the Elk Clan herself, wed her children to the Bear and Wolf Clans, and brokered matches between the Raven and Stag. Five clans, bound by blood and vow. The Frostmarch has known peace for twelve years. Now someone is murdering the spouses. One by one, the marriages that hold the alliance together are being severed. And winter is coming early this year. Earlier than anyone remembers.',
  hook: 'The Jarl\'s second-born, Sven Elkbraid, is found frozen solid in his own hall - killed by cold so intense it shattered the hearthstones. His Bear Clan wife survived only because she was away hunting. The Jarl summons the party: "Someone is trying to undo everything I built. Find them before the clans start blaming each other. You have until the next spouse dies."',
  twist:
    'The assassin is not a person. It is the winter itself. The Frostmarch is alive - not sentient like a person, but aware like a wolf is aware. It has a will, expressed through cold, through storms, through the slow grinding of glaciers. For centuries, the warring clans kept the north wild. No roads lasted. No cities grew. The land was untamed. Astrid\'s alliance threatens that. A united north means farms, roads, walls - the taming of the Frostmarch. The land is defending itself the only way it knows: by killing the bonds that hold the alliance together. The cold that killed Sven was not a spell. It was the land saying no.',
  climax:
    'The final winter storm descends - a blizzard of supernatural intensity that isolates every clan from every other. The party must reach the Heart of Winter, a frozen lake at the center of the Frostmarch where the land\'s will is strongest, and negotiate. Not fight - negotiate. The Frostmarch cannot be killed. It can only be convinced. The party must find a way to unite the clans without taming the wild - a compromise between civilization and wilderness that satisfies both Astrid and the land itself.',
  acts: [
    {
      title: 'Act 1: Blood on Snow',
      summary: 'The murders begin. The party investigates while navigating clan politics, blood feuds, and an honor system that makes every question an insult.',
      keyEvents: [
        'Sven\'s death: cold that should not exist. No magic detected. The hearthstones are shattered.',
        'Clan suspicion: the Bear Clan blames the Wolf. The Wolf Clan blames the Raven. Old grudges surface.',
        'An honor duel: a clan warrior challenges the party. Refusing is worse than losing.',
        'The second murder: another spouse found frozen. The pattern becomes clear - the cold is targeting the marriages.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Living Cold',
      summary: 'The party realizes the killer is not human. The winter deepens unnaturally. The clans begin to fracture as fear replaces trust.',
      keyEvents: [
        'A druid reveals the truth: the land has a will. The cold is not weather - it is intent.',
        'Winter accelerates: rivers freeze in hours. Herds disappear. The clans cannot feed themselves apart.',
        'Astrid\'s gambit: she calls a gathering of all five clans at Frostveil, risking everything on unity',
        'An attack on the gathering: a blizzard so targeted it only hits the feast hall. The land is escalating.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Heart of Winter',
      summary: 'The journey to the frozen lake where the land\'s will is strongest. A negotiation with something that thinks in glaciers and speaks in storms.',
      keyEvents: [
        'The trek: through the worst blizzard in living memory. Survival is not guaranteed.',
        'The Heart: a frozen lake that pulses with cold light. The land speaks through ice and wind.',
        'The negotiation: the party must propose a compromise. Roads that follow the land\'s contours. Cities that leave the wild wild.',
        'The new pact: the clans remain united, but the Frostmarch remains untamed. Both sides lose something. Both sides survive.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Jarl Astrid Ironbraid',
      role: 'alliance architect / leader',
      personality: 'A woman who ended a thousand years of war with patience and dowries instead of swords. Silver-haired, steel-voiced. She will not let her life\'s work die. "I did not bleed for peace to watch it freeze."',
    },
    {
      name: 'Hild Ravencloak',
      role: 'clan druid / truth-speaker',
      personality: 'A Raven Clan elder who speaks to the land the old way. She felt the Frostmarch\'s anger before anyone died. No one listened. She is tired of not being listened to.',
      secret: 'She can communicate with the Heart of Winter. She has been begging it to stop. It will not.',
    },
    {
      name: 'Bjorn Bearsson',
      role: 'Bear Clan chief / hothead',
      personality: 'A massive warrior who solves problems with his axe and asks questions after the bleeding stops. His wife survived the second murder attempt. He wants blood, and ice does not bleed.',
    },
    {
      name: 'The Frostmarch',
      role: 'the land itself / antagonist',
      personality: 'Not evil. Not even cruel. Just ancient and unwilling to be tamed. It thinks in centuries. It speaks in weather. It has watched civilizations try to conquer the north before. They all failed. It intends to maintain that record.',
    },
  ],
  keyLocations: [
    { name: 'Frostveil', description: 'The Jarl\'s seat. A great hall built where the five clan territories meet. Warm, crowded, and politically volatile.', significance: 'The political hub where clan tensions play out and alliances are tested.' },
    { name: 'The Frostmarch', description: 'A thousand miles of tundra, boreal forest, frozen rivers, and mountains. Beautiful, hostile, and aware.', significance: 'Both setting and antagonist. The land is the campaign\'s central conflict.' },
    { name: 'The Heart of Winter', description: 'A frozen lake at the center of the Frostmarch. The ice is translucent and pulses with cold light. The wind here speaks in words.', significance: 'The site of the final negotiation. Where the land\'s will is strongest.' },
  ],
  dataSystems: ['wildernessSurvival', 'socialEncounter', 'npcRelationshipWeb', 'npcLoyalty', 'randomPoliticalIntrigue', 'naturalDisaster', 'weatherEncounterInteraction', 'combatManeuvers', 'partyMoraleTracker'],
};
