import type { FullCampaign } from '../types';

export const theWrongCampaign: FullCampaign = {
  id: 'full-the-wrong-campaign',
  type: 'full',
  title: 'The Wrong Campaign',
  tagline: 'You signed up for "Curse of the Dark Lord." You got "Brenda\'s Bridal Shower." Brenda IS the Dark Lord.',
  tone: 'shenanigans',
  themes: ['comedy', 'meta', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The Planar DM Exchange - a cosmic entity that assigns quests to adventuring parties across the multiverse - has made a clerical error. Campaign Assignment #4,771 ("Curse of the Dark Lord Varenthos: A Tale of Blood and Shadow") was swapped with Campaign Assignment #4,772 ("Brenda\'s Bridal Shower Planning Committee: A Celebration of Love and Hors d\'oeuvres"). The party showed up armored and armed for a dark fantasy epic. They are now responsible for catering, venue selection, seating charts, and a bachelorette party for Brenda Thornwick - a halfling baker whose wedding is in six weeks. But Dark Lord elements keep bleeding through. The ice sculpture is a lich. The venue is a dungeon. The groom is suspiciously undead.',
  hook: 'The party gathers at the Adventurers Guild for their campaign briefing. The quest giver reads from the wrong scroll. "Your mission: coordinate centerpieces for 200 guests, source a band that does NOT play funeral dirges, and ensure the mother of the bride does not sit near the groom\'s family." The party objects. The quest giver checks his notes. "This is binding. You signed the contract. Page 47, subsection C: all assigned campaigns are final."',
  twist:
    'Brenda IS the Dark Lord Varenthos. She retired 50 years ago, changed her name, took up baking, and fell in love. The campaign bleed-through is not a glitch - it is her old life refusing to stay buried. The lich ice sculpture is her former lieutenant who wants her back. The dungeon venue is her old fortress that followed her. The groom knows. He does not care. The mother of the bride does NOT know and must never find out.',
  climax:
    'Brenda\'s past crashes the wedding. Her former generals, the undead army she abandoned, and a demon prince she jilted all show up uninvited. The party must simultaneously fight off an invasion of evil AND keep the wedding on track. The ceremony must happen before sunset or the binding contract dissolves and both campaigns collapse. The final battle is fought between courses at the reception.',
  acts: [
    {
      title: 'Act 1: The Planning Committee',
      summary:
        'The party is forced into wedding planning. Venue scouting reveals dungeons. Catering tastings involve suspiciously sentient food. The florist is a druid hiding war crimes. Every mundane task has a sinister undertone that the party cannot quite explain.',
      keyEvents: [
        'The briefing: armored adventurers given a seating chart and a color palette. Spiral begins: the Dark Lord bleed-through escalates each session. Session 1: the venue is suspicious. Session 2: shadow assassins crash the fitting. Session 3: the undead army arrives at the reception. The wedding planning escalates in parallel.',
        'Venue scouting: the "charming rustic estate" is clearly a converted evil fortress.',
        'The cake tasting: one cake whispers. The baker insists this is normal. It is not.',
        'The band audition: every band plays ominous music. The party hires the least threatening one.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Something Borrowed, Something Dread',
      summary:
        'Dark Lord elements escalate. The dress fitting is attacked by shadow assassins. The bachelorette party is crashed by a lich. Brenda handles it all with suspicious competence. The party starts piecing together that Brenda is not who she claims to be.',
      keyEvents: [
        'The dress fitting: shadow assassins attack. Brenda dispatches them with a rolling pin. "Wasps," she says.',
        'The lich: Brenda\'s former lieutenant crashes the bachelorette party demanding she return.',
        'Investigation: the party finds Brenda\'s old fortress, complete with throne room, in her basement.',
        'Brenda\'s confession: she IS Varenthos. She is retired. She just wants to get married. Please.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Wedding of the Dark Lord',
      summary:
        'The wedding day. Everything must go perfectly despite an undead army at the gates, a jilted demon prince in the parking lot, and a mother-in-law who cannot find out her daughter conquered three kingdoms in a previous life. The party fights between courses.',
      keyEvents: [
        'The ceremony begins. A demon prince objects. The party handles it "quietly."',
        'The undead army arrives during appetizers. The party fights them behind the venue.',
        'The lich makes a last appeal during the father-daughter dance. Brenda banishes him.',
        'The bouquet toss: it is a weapon. Old habits. The wedding is saved. Brenda cries. She means it. Chaos callback: Morvaine the lich catches the bouquet. He was not invited to the wedding but he was invited to the toss. Brenda sent a separate card. He starts ugly-crying. A lich ugly-crying is something nobody needed to see.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Brenda Thornwick (The Dark Lord Varenthos)',
      role: 'bride / retired dark lord',
      personality:
        'A cheerful halfling baker who makes extraordinary scones and previously commanded an army of the damned. She retired because she was tired. She fell in love because she wanted to. She will end anyone who threatens her wedding with the same efficiency she once ended kingdoms. "The buttercream frosting is non-negotiable. Also if that lich shows up again I will unmake him."',
      secret: 'She still has all her powers. She just does not use them. The baking is how she channels the dark energy now. Her scones are supernaturally good because they are infused with residual necromantic magic.',
    },
    {
      name: 'Gerald Thornwick-to-be',
      role: 'groom / mortal man',
      personality:
        'A completely ordinary human carpenter who knows his fiancee used to be a dark lord and does not care even slightly. "She makes me happy. She makes great scones. The skeleton army in the basement keeps the house safe. I do not see the problem."',
    },
    {
      name: 'Morvaine the Deathless',
      role: 'lich / uninvited guest',
      personality:
        'Brenda\'s former lieutenant who has spent 50 years searching for her. He is not evil anymore - he is just lost without his purpose. He shows up at the wedding not to attack but because he was not invited and his feelings are hurt. "You did not even send a card, my liege."',
    },
    {
      name: 'Doris Honeycutt (Mother of the Bride)',
      role: 'mother-in-law / ticking time bomb',
      personality:
        'Brenda\'s adoptive mother who thinks Brenda is a simple baker. Must NEVER learn the truth. Has opinions about everything. The centerpieces are wrong. The napkin folds are wrong. The fact that there are skeletons in the garden is - actually she has not noticed those yet. "Brenda dear, is that a PHYLACTERY on the mantle? It clashes with the drapes."',
    },
  ],
  keyLocations: [
    {
      name: 'Brenda\'s Bakery and Secret Fortress',
      description: 'A quaint halfling bakery above ground. Below: five levels of dark fortress including a throne room, an armory, and a portal to the Shadowfell that Brenda uses as a wine cellar.',
      significance: 'The dual nature of Brenda\'s life made physical. The party discovers the fortress during wedding prep.',
    },
    {
      name: 'The Venue (Thornfield Estate)',
      description: 'A converted evil fortress with surprisingly good natural lighting. The murder holes have been planted with flowers. The moat has koi fish. The torture chamber is now a coat check.',
      significance: 'Where the wedding happens and where the final battle takes place between courses.',
    },
    {
      name: 'The Planar DM Exchange',
      description: 'A cosmic office where campaign assignments are filed. Infinite desks, infinite paperwork, one very stressed celestial intern who mixed up the forms.',
      significance: 'The reason everything went wrong and the one place that could theoretically reassign the party - if they could find the right form.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'combatNarration',
    'plotTwistEngine',
    'fantasyInsults',
    'villainMonologue',
    'factionReputation',
    'environmentalHazard',
    'trapGenerator',
  ],
};
