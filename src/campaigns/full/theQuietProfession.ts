import type { FullCampaign } from '../types';

export const theQuietProfession: FullCampaign = {
  id: 'full-the-quiet-profession',
  type: 'full',
  title: 'The Quiet Profession',
  tagline: 'You kill people for money. But first, you have to make sure they deserve it. The paperwork is surprisingly thorough.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 11 },
  estimatedSessions: 16,
  settingSummary:
    'The city of Greymarsh is a sprawling port where fog is a permanent resident and everyone has something to hide. The Quiet Profession is an assassins\' guild that operates like a detective agency: every contract requires verification before execution. The guild\'s motto is "We do not take lives. We render verdicts." Clients submit a name and a grievance. The guild investigates. If the target is guilty, the contract proceeds. If not, the client is warned once. The guild occupies the moral no-man\'s-land between justice and murder, and the party lives on that line every day.',
  hook: 'A contract arrives: kill Alderman Royce Thane, accused of orchestrating the burning of a tenement that killed thirty people to clear land for a warehouse. The client is a survivor. The payment is everything she has. The party must investigate: did Thane do it? The evidence says yes. The Alderman says no. Someone is lying. The contract hangs on the truth, and the truth in Greymarsh is never simple.',
  twist:
    'The guild\'s verification process — the entire moral framework that justifies their existence — was designed by a paladin named Sister Constance who infiltrated the guild fifty years ago. She came to destroy it from within. She could not. So she reformed it instead. She wrote the Code of Verification, established the investigation protocols, and trained the first generation of guild investigators. She died in the guild, respected, and nobody ever knew she was sent to dismantle it. The guild does not know their conscience was planted by their enemy. The question is: does it matter? The Code works. People who deserve to die are verified. People who do not are spared. Justice happens, even if its origin is a lie.',
  climax:
    'The party discovers Sister Constance\'s journal in the guild\'s archives, revealing the truth. Simultaneously, a contract arrives from the Church of Tyr: eliminate the Quiet Profession. The church considers the guild an abomination — assassins pretending to be judges. The party must defend the guild, expose the guild\'s true history, or acknowledge that a paladin\'s infiltration created something that works better than the justice system it was meant to protect. The final contract is the hardest: the church has hired them to kill themselves. Do they take the contract? Can they verify the grievance?',
  acts: [
    {
      title: 'Act 1: The Verification',
      summary:
        'The party runs contracts. Each session is a new case: investigate the target, determine guilt, execute or refuse. The cases start simple and become morally ambiguous. The party learns the guild\'s methods and begins to question where investigation ends and judgment begins.',
      keyEvents: [
        'The Thane contract: investigate the tenement fire. Evidence points to Thane. But evidence can be manufactured.',
        'A contract on a baker. The client says she poisoned his mother. Investigation reveals the mother was dying and asked for mercy.',
        'A contract on a guard captain who takes bribes. The bribes fund an orphanage. The captain is corrupt and kind.',
        'The guild refuses a contract: the target is innocent. The client does not take it well.',
        'A fellow guild member takes a contract the party refused. The target dies. Was the verification wrong?',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Archive',
      summary:
        'The party digs deeper into the guild\'s history. Older contracts reveal patterns: impossible verifications, targets who were clearly innocent, a period fifty years ago when the guild transformed overnight. Sister Constance\'s fingerprints are everywhere.',
      keyEvents: [
        'A cold case: a contract from thirty years ago where the verification was wrong. The target was innocent. Someone covered it up.',
        'The archive: dusty records in the guild\'s basement. The party finds Constance\'s early reforms — meticulously documented.',
        'A contract on a politician forces the party to investigate City Hall. The corruption goes deeper than any individual target.',
        'A rival guild operates without verification. Bodies pile up. The party sees what their guild prevents.',
        'Constance\'s journal is found behind a false wall. Written in a paladin\'s hand. "If I cannot destroy this guild, I will make it righteous."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Final Contract',
      summary:
        'The church\'s contract arrives. The guild is the target. The party must decide: defend a guild built on a lie, expose the truth and risk the guild\'s collapse, or accept that the lie produced something real.',
      keyEvents: [
        'The Church of Tyr contracts the guild to destroy itself. The verification process applies to all contracts. Even this one.',
        'The party must investigate the guild\'s own crimes. Every death, every contract, every verdict.',
        'Guild members learn the truth about Constance. The guild fractures: some feel betrayed, some feel validated.',
        'The church sends paladins. The party must negotiate, fight, or present the evidence that the guild works.',
        'The final verdict: the party delivers their investigation. The guild lives or dies on the truth of its own record.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Arbiter',
      role: 'guild master / moral authority',
      personality:
        'The guild\'s leader, who takes the title "Arbiter" because "guild master" sounds criminal. Speaks softly, decides firmly, and carries the weight of every contract the guild has ever taken. Does not know about Constance. Believes the Code is the guild\'s own invention.',
      secret: 'She has refused more contracts than she has accepted. Her rejection rate is 60%. She has never told the guild this because it would undermine confidence.',
    },
    {
      name: 'Sister Constance (deceased)',
      role: 'ghost / founder\'s ghost',
      personality:
        'A paladin who infiltrated an assassins\' guild and accidentally made it ethical. Her journal reveals a woman of absolute conviction who slowly realized that the guild she was sent to destroy was more effective at delivering justice than the church that sent her. She died at peace with the contradiction.',
    },
    {
      name: 'Father Aldric',
      role: 'church antagonist / righteous enemy',
      personality:
        'A priest of Tyr who considers the guild an insult to divine justice. He is not wrong — assassins should not be judges. But he is also not right, because the legal system he defends has failed Greymarsh for decades. His conviction is admirable. His blindness is dangerous.',
    },
    {
      name: 'Ink',
      role: 'guild investigator / partner',
      personality:
        'The party\'s partner on verifications. A former detective who was fired from the city watch for refusing to falsify evidence. Joined the guild because at least here, the investigation matters. Dry humor, sharp eyes, drinks too much coffee.',
    },
  ],
  keyLocations: [
    {
      name: 'Greymarsh',
      description:
        'A fog-choked port city where corruption is the infrastructure and everyone has a secret. The kind of city where it rains on sunny days and the sun never quite reaches the streets.',
      significance: 'The entire campaign\'s setting. Every target, every investigation, every moral compromise happens in this city.',
    },
    {
      name: 'The Quiet House',
      description:
        'The guild\'s headquarters, disguised as a law office. The irony is not lost on anyone. The archive in the basement holds every contract and every verification.',
      significance: 'Home base. Where contracts are received, investigations are planned, and verdicts are delivered.',
    },
    {
      name: 'The Archive',
      description:
        'The basement of the Quiet House, floor to ceiling with case files. Fifty years of verifications, contracts, and Constance\'s hidden reforms. Smells like old paper and difficult truths.',
      significance: 'Where the guild\'s history — and its secret — is stored. Finding Constance\'s journal changes everything.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'socialEncounter',
    'npcRelationshipWeb',
    'moralDilemma',
    'factionReputation',
    'disguiseIdentity',
    'politicalIntrigue',
    'trapCorridor',
  ],
};
