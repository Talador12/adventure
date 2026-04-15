import type { FullCampaign } from '../types';

export const theQuestGiversUnion: FullCampaign = {
  id: 'full-the-quest-givers-union',
  type: 'full',
  title: 'The Quest Givers Union',
  tagline: 'Quest givers have unionized. No quests until their demands are met. Adventurers have nothing to do.',
  tone: 'shenanigans',
  themes: ['comedy', 'political', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 10,
  settingSummary:
    'Quest givers have formed a union. The Guild of Quest Origination (GQO) represents every person, entity, and concept that has ever posted a job on a quest board or said "I need you to retrieve something from a dungeon." Their demands are reasonable: they want to stop standing in one spot for years waiting for adventurers, they want pensions, they want background checks on the adventurers they hire (too many quests end in arson), and they want residuals on repeat quests. Until demands are met, NO QUESTS. The economy collapses. Adventurers wander aimlessly. Monsters go unslain. The party must mediate between the quest givers and the Adventurers Guild before civilization unravels.',
  hook: 'The party arrives in town ready for work. The quest board is empty. The quest giver who usually stands by the fountain is not there. A sign reads: "ON STRIKE. GQO Local 47. No quests until contract negotiations conclude. Please direct complaints to management." The party finds the tavern full of unemployed adventurers nursing ales with thousand-yard stares. "What do we DO now?"',
  twist:
    'The strike is not just about working conditions. The real demand - buried in subsection 14.7 of the union contract - is that quest givers want the right to REFUSE quests they know will fail. For years, they have been forced by narrative convention to send adventurers into situations they knew were death traps. They have watched hundreds of groups die on quests they could have warned them about. The union is not about pensions. It is about guilt.',
  climax:
    'An actual crisis emerges - a dragon attacks, a lich rises, the standard apocalyptic fare - but no quest giver will issue the quest. The party must either resolve the strike to get the quest officially assigned, handle the crisis without a quest (which breaks every adventuring convention), or find a way to restructure the entire quest system so that quest givers have the agency to say no. The dragon is confused about why no one has been sent to fight it.',
  acts: [
    {
      title: 'Act 1: No Work Today',
      summary:
        'The strike begins. Adventurers have no direction. The economy stalls because monsters are not being cleared, treasures are not being retrieved, and princesses are not being rescued. The party encounters the absurd consequences of a world without quests.',
      keyEvents: [
        'Empty quest boards: adventurers milling around with nothing to do. Some take up hobbies.',
        'The monster backlog: unslain monsters pile up. A troll starts a book club because no one comes to fight it. Spiral begins: every session, the consequences of "no quests" compound. Session 1: inconvenience. Session 2: economic collapse. Session 3: monsters develop hobbies. Session 4: the monsters are better adjusted than the adventurers.',
        'Economic collapse: the potion industry crashes (no injuries means no sales).',
        'The party is asked to mediate because they are the only adventurers not panicking.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: Collective Bargaining',
      summary:
        'The party mediates between the GQO and the Adventurers Guild. Both sides are entrenched. The quest givers want dignity. The adventurers want work. The real issue - quest givers\' guilt over sending people to die - emerges during negotiations.',
      keyEvents: [
        'First negotiation session: the GQO presents 47 demands. The Guild rejects all of them.',
        'Side meetings: quest givers privately share stories of adventurers they sent to certain death.',
        'The real demand surfaces: subsection 14.7 - the right to refuse suicidal quests.',
        'Progress: both sides agree on pensions and background checks. The refusal clause is the sticking point.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Unassigned Crisis',
      summary:
        'A real threat emerges and no quest giver will assign it. The party must handle an apocalyptic scenario without official quest status. The resolution requires proving that the new system - where quest givers can warn and refuse - would have PREVENTED this crisis if it had been in place.',
      keyEvents: [
        'The dragon attacks: standard emergency. No quest is issued. The party is technically freelancing.',
        'The dragon is confused: "Where are the adventurers? I prepared a monologue."',
        'The party fights without a quest. No quest completion XP. No contractual loot. Just civic duty.',
        'The aftermath: the new contract is signed. Quest givers can refuse. The system is better. The dragon gets its monologue. Chaos callback: Barry the troll\'s book club survives the resolution. It becomes a permanent fixture. Adventurers and monsters attend together on Tuesdays. Barry is reading Sartre now.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Hilda Questwright',
      role: 'GQO union president',
      personality:
        'A retired quest giver who stood by a fountain for 30 years saying "Please, brave adventurers, my daughter is trapped in the caves." Her daughter was fine. She was reading a book in the caves. Hilda could never tell anyone. "I sent 200 groups into those caves. Forty did not come back. My daughter was on PAGE TWELVE of her novel."',
      secret: 'She organized the union after the 200th group she sent to unnecessary danger. The pension demands are a smokescreen for the guilt clause.',
    },
    {
      name: 'Guildmaster Dirk Goldenshield',
      role: 'adventurers guild leader / opposition',
      personality:
        'A retired adventurer who believes in the system: quest givers give quests, adventurers do quests. The idea that quest givers should have OPINIONS is anathema to him. "They POINT. We GO. That is how it has worked for a THOUSAND YEARS."',
    },
    {
      name: 'Gorrath the Waiting Dragon',
      role: 'dragon / impatient threat',
      personality:
        'A dragon who attacked a village expecting the standard response: adventurers arrive in 2-3 business days. No one came. He is confused, then insulted, then bored. He starts writing complaint letters. "I have been terrorizing this village for a WEEK. The service in this kingdom is APPALLING."',
    },
    {
      name: 'Barry the Troll',
      role: 'monster / strike beneficiary',
      personality:
        'A bridge troll who has not been fought in three weeks due to the strike. He started a book club. He is reading philosophy. He is having a personal renaissance. He does NOT want the strike to end. "For the first time in my life, no one is trying to kill me. I finished Nietzsche. I am a CHANGED troll."',
    },
  ],
  keyLocations: [
    {
      name: 'The Empty Quest Board',
      description: 'A large wooden board in the town square that is, for the first time in recorded history, completely empty. Adventurers gather around it and stare. Some weep.',
      significance: 'The most visible symbol of the strike and the starting point for the campaign.',
    },
    {
      name: 'GQO Local 47 Headquarters',
      description: 'A rented hall where quest givers hold meetings, share grievances, and practice saying "no" for the first time in their lives. There is a support group. There are snacks.',
      significance: 'Where the union operates from and where the party conducts negotiations.',
    },
    {
      name: 'Barry\'s Bridge (Book Club Venue)',
      description: 'A stone bridge where a troll used to demand tolls and fight adventurers. Now it has a reading nook, a small library, and a sign that says "Book Club Tuesdays. All welcome. No fighting."',
      significance: 'A demonstration of what happens when the adventuring system stops and everyone gets time to be a person.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'factionReputation',
    'politicalIntrigue',
    'plotTwistEngine',
    'combatNarration',
    'fantasyInsults',
    'villainMonologue',
    'riddleGenerator',
  ],
};
