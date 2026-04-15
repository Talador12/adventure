import type { FullCampaign } from '../types';

export const theNPCRevolt: FullCampaign = {
  id: 'full-the-npc-revolt',
  type: 'full',
  title: 'The NPC Revolt',
  tagline: 'The shopkeeper knows he is an NPC. He wants a raise. The wolves have filed a class action lawsuit.',
  tone: 'shenanigans',
  themes: ['meta', 'comedy', 'political'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'A glitch in the fabric of the world has made every NPC aware of their nature. Shopkeepers know they exist only to sell things. Quest givers know they stand in one spot waiting for adventurers. Random encounter wolves know they are XP fodder. The barmaid knows she has only four lines of dialogue. They are upset. They have demands. The shopkeeper wants actual days off. The quest giver wants royalties on completed quests. The wolves have retained legal counsel. The world\'s economy, quest infrastructure, and entire adventuring industry are grinding to a halt because the NPCs have unionized and the PCs are the only ones who can negotiate.',
  hook: 'The party walks into a tavern and the bartender immediately says: "I know what you are. You are player characters. You have agency. Free will. I have a script. I say \'What can I get you\' and \'Rooms are 5 gold\' and \'I heard rumors about the old mine.\' That is my ENTIRE existence. I am on strike. Get your own ale."',
  twist:
    'The glitch was caused by a bard who wrote a song so meta it punctured the fourth wall permanently. The bard is horrified. He did not mean to awaken every NPC in the world. He just wanted a hit single. The song is still stuck in everyone\'s head, and every time someone hums it, another NPC becomes aware. The song is extremely catchy. It is spreading faster than they can contain it.',
  climax:
    'The NPC Union presents its final demand: a seat at the narrative table. They want representation in how stories are told. The party must broker a new social contract between PCs and NPCs that acknowledges NPC personhood while keeping the world functional. The final negotiation is a constitutional convention where shopkeepers, quest givers, random encounter creatures, and environmental hazards all have delegates. The lava has opinions.',
  acts: [
    {
      title: 'Act 1: The Awakening',
      summary:
        'NPCs across the world become self-aware and immediately begin demanding better treatment. The party encounters shopkeepers who refuse to sell, quest givers who want payment, and guards who have existential crises about standing at gates all day. The adventuring economy collapses.',
      keyEvents: [
        'The bartender\'s strike: no ale, no rumors, no rooms until working conditions improve.',
        'The quest giver walks away from his spot for the first time in 40 years. He goes to the beach.',
        'Random encounter wolves serve the party with a cease-and-desist letter.',
        'The guards at the city gate start asking THEMSELVES for identification.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Union',
      summary:
        'NPCs organize into the Grand Union of Non-Player Characters (GUNPC). They elect leaders, draft demands, and begin collective bargaining. The party is caught between the NPC union and the Adventurers Guild, which refuses to acknowledge NPC rights. The bard who caused this is found hiding in a basement.',
      keyEvents: [
        'GUNPC forms: shopkeepers, blacksmiths, innkeepers, and random encounter creatures unite.',
        'The bard is found: Melody Fourthwall, a halfling who wrote "The Song That Knows Itself."',
        'The Adventurers Guild refuses to negotiate: "They are NPCs. They do what they do."',
        'GUNPC escalates: treasure chests refuse to be opened. Doors demand please and thank you.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Constitutional Convention',
      summary:
        'All parties convene for a grand negotiation. Every type of NPC sends a delegate. The lava from a dungeon sends a delegate (via heatproof envoy). The party must mediate between factions with wildly different needs and find a framework that keeps the world running while respecting NPC autonomy.',
      keyEvents: [
        'The convention opens: delegates include a shopkeeper, a wolf pack alpha, a treasure chest, and a dungeon boss.',
        'Faction disputes: the random encounter creatures want danger pay. The shopkeepers want vacation.',
        'The Adventurers Guild finally agrees to negotiate after a dungeon refuses to be entered.',
        'The Accord: a new social contract is signed. NPCs get rights. The world gets weird but functional.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Barkeep Aldric',
      role: 'union leader / first awakened NPC',
      personality:
        'The first NPC to become self-aware and immediately the angriest about it. Has spent 20 years saying the same four lines. His fury is righteous and articulate. "I have served 10,000 ales. I have never DRUNK one. Do you understand what that is like?"',
      secret: 'He actually loves being a barkeep. He just wants the choice to be one. The distinction matters to him enormously.',
    },
    {
      name: 'Melody Fourthwall',
      role: 'bard / accidental cause of everything',
      personality:
        'A halfling bard who wrote a meta-song so powerful it broke the fourth wall. She is mortified. She has been hiding in a basement trying to write an "un-song" but everything she composes just makes NPCs more aware. "I just wanted it to chart! I did not want to destabilize ontological reality!"',
    },
    {
      name: 'Fenris, Pack Representative',
      role: 'wolf delegate / union official',
      personality:
        'The alpha of a random encounter wolf pack who gained sentience and immediately became a labor organizer. Speaks through a translation collar. Extremely professional. "My pack has been slain 847 times for a combined 12,000 XP. We have never received compensation. This ends today."',
    },
    {
      name: 'Guildmaster Torren Brightblade',
      role: 'adventurers guild leader / opposition',
      personality:
        'The head of the Adventurers Guild who refuses to accept NPC rights because it would mean restructuring every quest, paying NPCs for their roles, and acknowledging that the treasure chests have feelings. He is not evil. He is just terrified of the paperwork.',
    },
  ],
  keyLocations: [
    {
      name: 'The Rusty Nail (Strike HQ)',
      description: 'A tavern where the bartender is on strike. The ale taps are chained shut. Protest signs line the walls. "NO CONTRACT NO MEAD." It serves as GUNPC headquarters.',
      significance: 'Where the NPC revolution began and where all major union decisions are made.',
    },
    {
      name: 'The Convention Hall',
      description: 'A hastily constructed meeting space where every type of NPC has sent a representative. The seating chart alone took three days because the chairs kept demanding better chairs.',
      significance: 'The site of the final negotiation and the place where NPC rights are either won or lost.',
    },
    {
      name: 'Melody\'s Basement',
      description: 'A soundproofed basement where the bard hides, surrounded by crumpled sheet music and failed "un-songs." The walls are covered in musical notation. It is very sad in here.',
      significance: 'Where the party finds the cause of the awakening and potentially the cure.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'factionReputation',
    'plotTwistEngine',
    'combatNarration',
    'fantasyInsults',
    'villainMonologue',
    'riddleGenerator',
    'politicalIntrigue',
  ],
};
