import type { FullCampaign } from '../types';

export const thePlayTheThingIs: FullCampaign = {
  id: 'full-the-play-the-thing-is',
  type: 'full',
  title: 'The Play the Thing Is',
  tagline: 'A theater troupe spreading revolution. The tyrant loves the show.',
  tone: 'social',
  themes: ['social', 'intrigue', 'political'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 2, end: 8 },
  estimatedSessions: 15,
  settingSummary:
    'The Crimson Curtain is a traveling theater troupe that performs anti-tyranny plays across the provinces of Archon Draven\'s empire. What the audience does not know: the performances contain coded messages coordinating a resistance network. What the troupe does not know: the performances are real D&D encounters played as "theater." The monsters in the play are real monsters, the swordfights are real swordfights, and the audience thinks the special effects are incredible. The party joins as new performers and must keep the show going, the codes hidden, and the revolution alive.',
  hook: 'The party is recruited by Sable, the troupe\'s director, after they survive a bar fight with unusual competence. "You fight like actors. Or you act like fighters. Either way, I need you." The first show is in three days. The town\'s resistance cell needs to know the location of a prison camp. The information is encoded in the third act. Learn your lines.',
  twist:
    'Archon Draven has been in the audience for months, traveling incognito. He loves the show. He has been personally funding the troupe through intermediaries, believing the anti-tyranny plays are fictional satire - a safety valve that lets the population vent frustration harmlessly. He has no idea the plays are coordination tools for an actual revolution. When he discovers the truth, it is not anger. It is betrayal. He genuinely loved the art.',
  climax:
    'The final performance: a play called "The Fall of the Archon" performed in the capital, in front of the largest audience in the empire\'s history. Draven is there, and this time he knows the truth. The coded messages in this play will trigger the revolution. Draven could stop it by revealing the code - or he could let the performance continue because the art matters more than his throne. The party must perform the most important show of their lives while managing a tyrant who is having an existential crisis in the front row.',
  acts: [
    {
      title: 'Act 1: The New Players',
      summary: 'Join the troupe, learn the codes, and perform the first shows. Each town is a new audience and a new resistance contact.',
      keyEvents: [
        'Recruitment and the first rehearsal - learning that the "stage combat" is real combat',
        'First performance: coded message delivered, resistance contact made, audience cheers',
        'Quiet moment: after the first show, the troupe eats together backstage. Sable raises a cup. "To the words we cannot say in daylight." Pip does not understand but cheers loudest.',
        'A close call: an imperial censor attends a show and finds nothing suspicious',
        'The troupe\'s internal dynamics: rivalries, romances, and one member who might be a spy',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Tour',
      summary: 'The troupe gains fame. Bigger towns, bigger audiences, bigger risks. The resistance network grows and the empire takes notice.',
      keyEvents: [
        'A performance goes wrong: a real monster in the show nearly kills an actor, the audience thinks it is brilliant',
        'The troupe discovers their anonymous patron is incredibly generous - suspiciously so',
        'The moment of cost: a resistance cell is compromised after a show. People the party met are arrested. If the party identified the spy early, the damage is contained. If not, the cell is destroyed and the party hears the names read at a public execution.',
        'Quiet moment: Sable writes a new scene for the next performance. It is about the people who were arrested. She disguises it as fiction. The audience weeps. They do not know it is real. Sable does, and she cannot stop her hands from shaking during the performance.',
        'An imperial spy infiltrates the troupe. The party must identify them without breaking character.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Final Curtain',
      summary: 'The capital performance. Draven in the audience. The revolution in the script. The most important show ever staged.',
      keyEvents: [
        'The revelation: Draven is their patron. He has been watching and funding them for months.',
        'Draven confronts Sable backstage: "I loved your art. Was any of it real?" Sable\'s answer depends on what the party has taught her about truth. If they encouraged honesty, she says: "All of it. Every word."',
        'The final performance must go on. The codes will trigger the revolution. Draven is watching.',
        'Quiet moment: mid-performance, Draven laughs at a joke that is about him. The audience does not know. He does. For one moment, the tyrant and the revolutionary are sharing the same truth.',
        'The choice: Draven can stop the show or let the art speak. If Sable told him the truth backstage, he hesitates. If she lied, he acts.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Sable',
      role: 'troupe director / resistance leader',
      personality: 'A passionate artist who believes stories change the world. She directs the troupe and the revolution with equal intensity. "Every tyrant falls. The only question is whether we write the story or they do."',
      secret: 'She was once a member of Draven\'s court. She left when she saw what he was becoming. She still respects the man he used to be.',
    },
    {
      name: 'Archon Draven',
      role: 'the tyrant / the patron / the audience',
      personality: 'A complex villain who genuinely loves art and genuinely crushes dissent. He does not see the contradiction. He funds the troupe because the plays make him feel something his throne never did.',
      secret: 'He knows his empire is crumbling. The plays give him hope that something beautiful can survive after he falls.',
    },
    {
      name: 'Pip',
      role: 'stage manager / comic relief',
      personality: 'A halfling who manages props, costumes, and crises with equal panic. Does not know about the resistance codes. Thinks the troupe is just really committed to realism.',
    },
  ],
  keyLocations: [
    {
      name: 'The Crimson Stage',
      description:
        'The troupe\'s traveling wagon-stage. Folds out into a full theater. Conceals weapons, code books, and resistance documents in secret compartments. Pip has decorated it with ribbons. Sable has hidden messages in the paint.',
      significance: 'Home base, performance venue, and the revolution\'s mobile headquarters.',
    },
    {
      name: 'The Provincial Towns',
      description:
        'A circuit of towns across the empire, each with a resistance cell, a performance venue, and imperial eyes watching. Each town remembers the troupe. By Act 2, fans follow them between cities.',
      significance: 'Each town is a self-contained social encounter.',
    },
    {
      name: 'The Grand Amphitheater',
      description:
        'The capital\'s largest performance space. Seats ten thousand. The site of the final show. Draven\'s private box overlooks the stage. The acoustics carry a whisper to the back row.',
      significance: 'Where the revolution is won or lost, through art.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationshipWeb',
    'courtIntrigue',
    'diplomaticNegotiation',
    'rumorMill',
    'backstoryComplication',
    'encounterWaves',
    'factionWar',
  ],
};
