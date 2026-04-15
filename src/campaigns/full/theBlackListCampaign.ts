import type { FullCampaign } from '../types';

export const theBlackListCampaign: FullCampaign = {
  id: 'full-the-black-list',
  type: 'full',
  title: 'The Black List',
  tagline: 'You saw the queen die. Now everyone you meet is deciding how much your silence is worth.',
  tone: 'political',
  themes: ['intrigue', 'political', 'urban'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 13 },
  estimatedSessions: 20,
  settingSummary:
    'The Kingdom of Ardenmere is a web of city-states connected by trade roads and mutual suspicion. Every city has its own guard, its own laws, its own price for looking the other way. The queen is dead. The Duke of Halmere sits the throne. Wanted posters bearing the party\'s faces appear in every tavern from the capital to the coast. The bounty is enough to retire on. Every smile could be a setup. Every ally is weighing whether friendship is worth more than gold.',
  hook: 'The party is in the wrong hallway at the wrong time. They see Duke Aldren Halmere drive a blade into Queen Sera\'s back in her private study. He sees them. Guards are called - but the Duke names the party as the assassins. By morning, the entire kingdom believes them guilty. Their faces are on every wall. The Duke\'s personal hunters, the Ashmarks, are already on their trail. The party has the truth, but truth without proof is just a story told by wanted criminals.',
  twist:
    'Duke Aldren killed the queen because he found her secret war plans. Sera was six weeks from launching an invasion of the Pale Reaches that would have dragged three kingdoms into a continental war and killed millions. Aldren murdered his queen to prevent a genocide. He is now ruling from the throne, dismantling her war apparatus piece by piece, while publicly mourning the woman he killed. He is not a villain. He made an impossible choice. If the party exposes him, the war faction retakes the throne and the invasion begins. If they stay silent, a murderer rules and justice dies. There is no clean answer.',
  climax:
    'The party has gathered enough evidence to prove everything - both the murder and the reason behind it. They stand before the Council of Lords in Ardenmere\'s great hall. The Duke is present. The war council is present. The party must choose what truth to tell. Expose the murder and watch the war hawks seize power. Reveal the war plans and watch the kingdom fracture in horror. Present both and let the council decide, knowing the council is compromised. Or destroy the evidence and walk away, letting history record a lie that saves millions. The Ashmarks are in the gallery. Whatever the party decides, they have about four minutes before someone tries to kill them.',
  acts: [
    {
      title: 'Act 1: The Accusation',
      summary:
        'The party witnesses the murder, is framed, and flees the capital. Every session is a new city, a new disguise, a new close call with bounty hunters. They begin gathering scraps of evidence while learning how deep the Duke\'s network reaches.',
      keyEvents: [
        'The murder: wrong hallway, wrong time, a queen dies and the party is named',
        'Flight from the capital: through the sewers, past three checkpoints, one party member nearly caught',
        'First bounty hunter encounter: a professional named Sable who is terrifyingly competent and disturbingly polite',
        'A sympathetic printer agrees to circulate the party\'s version of events. His shop burns down the next morning.',
        'The party reaches Dunwall and discovers the Duke has agents in every city. Their contact there is already dead.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Evidence',
      summary:
        'The party shifts from running to investigating. They need proof that the Duke killed the queen, which means infiltrating his inner circle, turning his people, and staying alive long enough to build a case. Each piece of evidence comes with a cost.',
      keyEvents: [
        'A former palace guard confirms the party\'s story but refuses to testify publicly - his family is in the capital',
        'The party intercepts an Ashmark courier carrying orders. The orders reference "the queen\'s contingency" - her war plans',
        'Infiltrating the Duke\'s war room in Halmere: disguises, forged papers, and a very tense dinner party',
        'Discovery of the queen\'s invasion plans. Troop movements, supply chains, projected casualties: two million dead in the first year.',
        'The moral fracture: the Duke is not what they expected. He is exhausted, grief-stricken, and desperately trying to prevent a war.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Reckoning',
      summary:
        'The party has the full picture: murder and motive. They must decide what to do with it. Every faction wants a different outcome. The Council of Lords convenes, and the party must make their case - or destroy it. The Ashmarks close in for the final time.',
      keyEvents: [
        'The war faction approaches the party: they want the Duke exposed so they can restart the invasion',
        'The Duke contacts the party directly. He does not deny anything. He asks them what they would have done.',
        'The Council of Lords session: the party presents their evidence, choosing what to reveal and what to hide',
        'The gallery erupts. Ashmarks move. The war faction draws steel. Whatever the party decided, this room is about to become a battlefield.',
        'Epilogue: the kingdom reshapes around whatever truth the party chose. Peace built on lies, or justice that costs millions.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Duke Aldren Halmere',
      role: 'antagonist / tragic figure',
      personality:
        'A man who made the worst decision of his life for the best possible reason. Carries himself with brittle composure. Does not sleep well. Drinks too much but never loses control. Treats the party with genuine respect when they finally meet, because he knows they carry a truth he cannot refute.',
      secret: 'He has a letter from the queen detailing the invasion, written in her own hand. He keeps it in his boot. He has never shown it to anyone because it would destroy her legacy.',
    },
    {
      name: 'Sable',
      role: 'bounty hunter / recurring threat',
      personality:
        'The best tracker in Ardenmere. Works alone, speaks little, never hurries. Finds people the way water finds cracks. Not cruel - just relentless. Considers the hunt a craft and takes professional pride in clean captures.',
      secret: 'She was hired by the war council, not the Duke. She does not know why they want the party alive instead of dead, and it is starting to bother her.',
    },
    {
      name: 'Maren Greaves',
      role: 'underground contact / information broker',
      personality:
        'Runs a network of informants out of a bookshop in Thornfield. Cheerful, fast-talking, never sits still. Trades in secrets the way merchants trade in silk. Genuinely likes the party, which makes her dangerous because she likes everyone until the price is right.',
      secret: 'She sold the party\'s location once already. She felt bad about it. Not bad enough to stop.',
    },
    {
      name: 'Lord Commander Voss',
      role: 'war faction leader / political antagonist',
      personality:
        'Believes the queen\'s invasion was righteous and necessary. Silver-haired, commanding presence, genuinely charismatic. He is not a warmonger - he truly believes the Pale Reaches are a threat and preemptive war saves more lives than it costs. He is wrong, but he is sincere.',
    },
  ],
  keyLocations: [
    {
      name: 'The Capital (Ardenmere)',
      description:
        'A sprawling city of white stone and political knives. Beautiful architecture hiding ugly bargains. The party sees it once at the start and once at the end. Both times they are running.',
      significance: 'Where the murder happens and where the truth is finally told. Bookends of the campaign.',
    },
    {
      name: 'Thornfield',
      description:
        'A trade city where information moves faster than cargo. Half the population is hiding from something. Good place to disappear. Better place to be found if someone is looking.',
      significance: 'The party\'s base of operations during Act 2, where most evidence gathering occurs.',
    },
    {
      name: 'The Ash Road',
      description:
        'The main highway between city-states, patrolled by Ashmarks and mercenary companies. Faster but exposed. The alternative is the trackless hill country, which is slower but invisible.',
      significance: 'Every journey between cities is a risk calculation: speed versus exposure.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationshipWeb',
    'factionReputation',
    'diplomaticNegotiation',
    'chaseSequence',
    'disguiseIdentity',
    'detectiveCase',
    'politicalIntrigue',
  ],
};
