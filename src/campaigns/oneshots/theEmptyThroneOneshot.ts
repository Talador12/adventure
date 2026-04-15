import type { OneShotCampaign } from '../types';

export const theEmptyThroneOneshot: OneShotCampaign = {
  id: 'oneshot-empty-throne',
  type: 'oneshot',
  title: 'The Empty Throne',
  tagline: 'The king nailed a letter to the throne room door that says "I am done." Three factions are mobilizing. You have twelve hours.',
  tone: 'political',
  themes: ['political', 'intrigue', 'war'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'King Aldric walked away from the throne this morning. No heir, no succession plan, just a letter nailed to the throne room door that says "I am done." Three factions are already mobilizing: the Merchant Council wants an elected leader, the Noble Houses want bloodline succession, and the People\'s Assembly wants to abolish the monarchy entirely. The party has been asked by the departing king to moderate the emergency summit.',
  hook: 'King Aldric hands the party a seal of authority: "I have failed this kingdom for thirty years. I will not choose my replacement - that is the people\'s right. But these three factions will tear the city apart by nightfall if someone does not hold them together. You have twelve hours. Make them talk."',
  twist: 'King Aldric did not abdicate from guilt. He abdicated because he discovered the Noble Houses have been slowly poisoning the water supply of the lower districts to keep the population "manageable." He could not stop it from the throne - too many nobles in his court. He is counting on the chaos of succession to break the nobles\' grip.',
  climax: 'The summit reaches a breaking point when the party reveals the poisoning. The Noble Houses deny it. The People\'s Assembly calls for blood. The Merchant Council tries to broker a deal. The party must forge a new government from the wreckage - and decide what justice looks like for the poisoners.',
  scenes: [
    {
      title: 'Scene 1: The Three Factions',
      summary: 'Meeting each faction, understanding their positions, and discovering that this is not just about politics - something deeper is wrong.',
      challenge: 'social',
      keyEvents: [
        'The Merchant Council: pragmatic, wants stability for trade, willing to compromise',
        'The Noble Houses: defensive, invoking tradition, suspiciously eager to control the water ministry',
        'The People\'s Assembly: angry, organized, have been documenting mysterious illnesses in the lower districts',
        'The clue: illness maps overlap perfectly with noble-controlled water sources',
      ],
    },
    {
      title: 'Scene 2: The Evidence',
      summary: 'The party investigates the water supply while keeping the summit from collapsing. A race against time and political pressure.',
      challenge: 'exploration',
      keyEvents: [
        'The water ministry records: altered, but a clerk kept personal copies',
        'The alchemist: hired by the nobles, now terrified and willing to talk if protected',
        'Noble House guards attempt to intercept the party - a tense confrontation',
        'The proof: vials of tainted water, the alchemist\'s testimony, the clerk\'s records',
      ],
    },
    {
      title: 'Scene 3: The Summit',
      summary: 'The final negotiation. Three factions, one revelation, and a kingdom to rebuild.',
      challenge: 'social',
      keyEvents: [
        'Presenting the evidence: the Noble Houses split - some horrified, some defiant',
        'The People\'s Assembly demands immediate arrests and abolition of noble privilege',
        'The Merchant Council tries to minimize damage to avoid economic panic',
        'The party must shape the new government: how much justice, how much compromise',
      ],
    },
  ],
  keyNPCs: [
    { name: 'King Aldric', role: 'departing monarch', personality: 'Speaks in the past tense about everything, including himself. "The king would have done nothing. I am no longer the king." Smiles at inappropriate moments because he has been waiting thirty years to stop pretending.' },
    { name: 'Guildmaster Hessa', role: 'Merchant Council leader', personality: 'Assigns a gold value to every proposal. "What does justice cost? Because stability costs twelve thousand gold a quarter and we cannot afford both." Taps her fingers when anyone speaks too long about morality.' },
    { name: 'Lady Korrath', role: 'Noble Houses leader', personality: 'Speaks only in the third person plural: "The Houses believe," "The nobility requires." Never says "I." Flinches when someone mentions the lower districts by name.', secret: 'Her own daughter is sick from the tainted water. She has been in denial.' },
    { name: 'Ren of Millhaven', role: 'People\'s Assembly leader', personality: 'Quotes law at nobles who think she cannot read. Interrupts to correct legal terminology. Speaks fast, cites page numbers from memory. Her anger is precise, not reckless - until someone dismisses her people as "the lower districts."' },
  ],
  keyLocations: [
    { name: 'The Throne Room', description: 'An empty throne with a letter nailed to the door. Three faction banners hang on the walls. A round table has been set up in the center.', significance: 'Where the summit takes place and the new government is formed.' },
    { name: 'The Water Ministry', description: 'A damp, poorly lit building full of pipes, ledgers, and nervous clerks.', significance: 'Where the evidence of poisoning is found.' },
    { name: 'The Lower Districts', description: 'Crowded streets where people have been getting sick for months. Boarded-up wells. Children with grey skin.', significance: 'The human cost of the nobles\' crime.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
