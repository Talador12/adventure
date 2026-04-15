import type { FullCampaign } from '../types';

export const theQuietYear: FullCampaign = {
  id: 'full-quiet-year',
  type: 'full',
  title: 'The Quiet Year',
  tagline: 'The war is over. Now comes the hard part.',
  tone: 'social',
  themes: ['social', 'classic_fantasy', 'survival'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 1, end: 8 },
  estimatedSessions: 16,
  settingSummary:
    'Ashenwall. A village that used to have a name worth remembering. The war rolled through six months ago and left behind collapsed roofs, empty chairs at dinner tables, and a well that tastes like smoke. Forty-three people remain. They do not trust outsiders. They barely trust each other. The surrounding forest has gone wrong somehow - the animals are gone, the streams run cloudy, and there are noises at night that nobody talks about. The party arrives on foot, carrying nothing worth stealing.',
  hook: 'No one hired you. No quest board sent you here. You came because the road ended and there was nowhere else to go. The village elder, a woman named Maren who has not slept in days, looks at you and says: "If you are staying, you are working. We need the bridge fixed before the river rises." That is how it starts. Not with a prophecy. With a bridge.',
  twist:
    'The war that destroyed Ashenwall was not random. It was targeted. One of the party members - or someone they loved - gave the army the intelligence that led them here. The village was collateral damage in a plan that one of the players was connected to. Maren knows. She has known since the party arrived. She has been waiting to see what kind of people they are before she decides what to do about it.',
  climax:
    'The truth surfaces during the Midwinter Feast - the first celebration the village has held since the war. Someone has to answer for what happened. But by now the party has rebuilt homes, delivered a baby, buried the dead properly, and become part of this place. The village must decide: is what was done forgivable? The party must decide: do they accept judgment from people they have come to love?',
  acts: [
    {
      title: 'Act 1: Strangers',
      summary:
        'The party arrives in Ashenwall. Nobody wants them there. Trust is earned through labor - fixing the bridge, clearing rubble, hunting for food. Small kindnesses accumulate. A child starts following the party around. An old man shares his fire.',
      keyEvents: [
        'Arrival: Maren assigns them the bridge as a test of usefulness',
        'First conflict: a family refuses to share stored grain while others starve',
        'The well is contaminated - tracking the source leads to a mass grave from the war',
        'A child named Pip decides the party is trustworthy and becomes their shadow',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Neighbors',
      summary:
        'The party is accepted, tentatively. They help resolve disputes, plan for winter, and start to understand what this village lost. Not just buildings - people. Stories. The way things used to be. Something is also wrong in the forest, and it is getting closer.',
      keyEvents: [
        'Harvest crisis: the fields were salted during the war, requiring creative solutions',
        'A refugee family arrives - the village debates whether they can afford more mouths',
        'Forest sickness identified: a dying treant, poisoned by war magic, is corrupting the land',
        'Maren begins asking pointed questions about where the party was during the war',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Family',
      summary:
        'The village prepares for Midwinter. The party heals the forest, delivers a baby, and starts to feel like this is home. Then Maren reveals what she knows. The village gathers to decide what happens next. There is no combat. Just people in a room, deciding if forgiveness is possible.',
      keyEvents: [
        'Healing the treant: a ritual that requires the entire village working together',
        'The baby is born - first new life in Ashenwall since the war',
        'Midwinter Feast preparations - the village remembers how to celebrate',
        'Maren speaks the truth. The room goes silent. The party must answer.',
        'The village votes: stay or go. Forgiveness or exile.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Maren Ashwick',
      role: 'village elder',
      personality:
        'Exhaustion has worn her down to wire and bone. She does not waste words. She does not smile easily. But she stood in the road when the soldiers came and talked them out of burning the granary, so everyone listens when she speaks.',
      secret: 'She found a military dispatch in the rubble that names the intelligence source. She recognized the connection to the party immediately.',
    },
    {
      name: 'Pip',
      role: 'village child / emotional anchor',
      personality:
        'Eight years old. Lost both parents in the war. Does not cry about it - just goes quiet sometimes and stares at the place where his house used to be. Attaches to the party with the desperate grip of a kid who cannot lose anyone else.',
    },
    {
      name: 'Jorin Blackwell',
      role: 'town carpenter / skeptic',
      personality:
        'Does not trust the party and is loud about it. Drinks too much. Picks fights. But he is the only one who can fix a roof, so everyone tolerates him. His anger is grief wearing a mask.',
      secret: 'His wife survived the war but left afterward. She could not stand the silence where their neighbors used to be. He blames himself.',
    },
    {
      name: 'Elda Sunmeadow',
      role: 'healer / quiet observer',
      personality:
        'The village herbalist. Speaks to plants more than people. Treated the wounded after the attack without sleeping for four days. Has not been the same since. Her hands shake now, but her poultices still work.',
    },
  ],
  keyLocations: [
    {
      name: 'Ashenwall Village',
      description:
        'Forty-three souls in a valley that used to hold two hundred. Half the buildings are rubble. The market square has a scorch mark shaped like a person. Nobody walks through it.',
      significance: 'The entire campaign takes place here. The village is the story.',
    },
    {
      name: 'The Broken Bridge',
      description:
        'Stone and timber span across the River Cinder, shattered in the middle. Crossing means wading through freezing water. Fixing it is the first real thing the party does here.',
      significance: 'The first test of whether the party will invest in this place.',
    },
    {
      name: 'The Woundwood',
      description:
        'A forest that used to sing with birdsong. Now the trees weep sap the color of rust. At its heart, an ancient treant is dying from war magic lodged in its roots like shrapnel.',
      significance: 'The environmental threat that requires the whole village to heal.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationshipWeb',
    'factionReputation',
    'naturalDisaster',
    'diplomaticNegotiation',
    'partyMoraleTracker',
    'settlementEvent',
    'weatherHazard',
  ],
};
