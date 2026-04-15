import type { FullCampaign } from '../types';

export const theSiegeOfHeaven: FullCampaign = {
  id: 'full-the-siege-of-heaven',
  type: 'full',
  title: 'The Siege of Heaven',
  tagline: 'Heaven has fallen. Angels are refugees. The party takes it back.',
  tone: 'epic',
  themes: ['epic', 'planar', 'war'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 8, end: 20 },
  estimatedSessions: 22,
  settingSummary:
    'The celestial plane has been conquered. Angels flee to the material plane as refugees, stripped of their radiance, begging mortals for shelter. The nine heavens are occupied. Divine communication is severed. Devils have offered the displaced angels asylum in the Hells - at a price. The party must lead a coalition of mortal armies, refugee angels, and unlikely allies to retake literal heaven from an enemy powerful enough to overthrow the divine order. The greatest war in existence, and mortals are the last army standing.',
  hook: 'An angel crashes through the roof of a tavern. She is burned, wingless, and terrified. "Heaven has fallen. The gates are sealed. The Host is scattered. We need... we need mortals." She dies. Her body dissolves into light. In her hand: a map of the celestial plane with the occupied territories marked. Scrawled on the back: "They came from within."',
  twist:
    'Heaven was not invaded from outside. The celestial bureaucracy collapsed from within. A faction of angels - the Compassionate - rebelled against the celestial order after millennia of watching mortals suffer while being forbidden to intervene. They broke the hierarchy, seized the gates, and declared that heaven would no longer stand apart from mortal pain. The "invaders" are angels who chose empathy over obedience. They are not evil. They are heartbroken. And they are willing to hold heaven hostage until the system that demanded their indifference is dismantled.',
  climax:
    'The coalition reaches the gates of heaven. The Compassionate are waiting - not with weapons drawn but with an offer: reform the celestial order so angels can help mortals directly, and they will stand down. The celestial loyalists refuse any compromise. The party stands between two factions of angels - both with legitimate grievances - and must either broker a peace that rewrites the divine order, choose a side, or find a third path that satisfies justice without destroying heaven in the process.',
  acts: [
    {
      title: 'Act 1: The Fallen',
      summary: 'Angels as refugees. The mortal world reacts to heaven\'s fall. The party assembles a coalition from nations that barely trust each other.',
      keyEvents: [
        'Angel refugees appear across the material plane. Some are welcomed. Many are not.',
        'The devil\'s offer: asylum in exchange for service. Some angels accept. The moral fallout is immediate.',
        'Coalition building: convincing mortal armies to march on heaven. Most think it is insane.',
        'The loyalist angels in hiding reveal the truth: the invaders are not demons. They are angels.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The March',
      summary: 'The coalition crosses planes. Each layer of heaven is occupied and must be reclaimed. The party learns the Compassionate\'s true motivations.',
      keyEvents: [
        'Planar crossing: the coalition enters the celestial plane through a forgotten gate',
        'The first heaven: occupied by Compassionate angels who are healing mortal souls the old order forbade them from touching',
        'A Compassionate commander explains: "We watched a child die of plague. We could have cured her. The order forbade it. We are done watching."',
        'The middle heavens: escalating resistance, moral complexity, angels fighting angels',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: The Gates',
      summary: 'The final heaven. The Compassionate\'s leader. The negotiation or battle that determines what heaven becomes.',
      keyEvents: [
        'The ninth heaven: the throne room. The Compassionate leader sits on the celestial throne, not in triumph but in grief.',
        'The offer: reform the divine order. Let angels intervene. End the policy of divine indifference.',
        'The loyalists\' counter: without hierarchy, heaven collapses. Without rules, angels become tyrants of mercy.',
        'The party\'s judgment: broker the reform, side with tradition, or propose something neither side imagined',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Seraphiel the Compassionate',
      role: 'leader of the rebellion / sympathetic antagonist',
      personality: 'A seraph who served faithfully for ten thousand years before breaking. She does not enjoy what she has done. She considers it a moral necessity. "I held a dying child\'s hand and whispered that heaven loved her while doing nothing to save her. I will not do that again."',
    },
    {
      name: 'Archon Metatrus',
      role: 'celestial loyalist / traditionalist',
      personality: 'The highest-ranking angel still loyal to the old order. He believes the hierarchy exists for a reason: without rules, divine power corrupts. "Compassion without restraint is tyranny with a kind face. We have seen it before. They called it the Fall."',
    },
    {
      name: 'Asmodeus\'s Envoy',
      role: 'devil diplomat / opportunist',
      personality: 'A charming devil who sees the crisis as a recruitment opportunity. He offers angel refugees contracts with excellent terms and terrible fine print. "Heaven turned its back on you. Hell opens its doors. The paperwork is straightforward."',
      secret: 'He does not actually want the angels. He wants the war to continue as long as possible. Chaos in heaven strengthens Hell.',
    },
    {
      name: 'Marshal Kael',
      role: 'mortal coalition commander',
      personality: 'A human general chosen to lead the mortal forces. She has fought wars between nations. This is a war between planes. She is adapting with terrified competence. "I trained for sieges. Not sieges of heaven. Adjust accordingly."',
    },
  ],
  keyLocations: [
    { name: 'The Refugee Camps', description: 'Material plane camps where fallen angels shelter among mortals. A jarring sight: celestial beings queuing for bread.', significance: 'Where the coalition is formed and the stakes are made personal.' },
    { name: 'The Nine Heavens', description: 'The celestial plane\'s layered realms. Each heaven is a distinct domain, now occupied by the Compassionate and transformed to serve their vision.', significance: 'The campaign\'s primary theater of war.' },
    { name: 'The Throne of Light', description: 'The seat of divine authority in the highest heaven. Once a symbol of cosmic order. Now a contested chair.', significance: 'Where the final confrontation and negotiation take place.' },
  ],
  dataSystems: ['massCombat', 'siegeWarfare', 'cataclysmCountdown', 'factionWar', 'diplomaticNegotiation', 'encounterWaves', 'warRoomBriefing', 'legendaryWeapon'],
};
