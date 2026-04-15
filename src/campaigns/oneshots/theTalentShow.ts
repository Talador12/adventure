import type { OneShotCampaign } from '../types';

export const theTalentShow: OneShotCampaign = {
  id: 'oneshot-talent-show',
  type: 'oneshot',
  title: 'The Talent Show',
  tagline: 'You must perform. The rival act gets a standing ovation for mediocre juggling. Detect Magic says the audience is charmed.',
  tone: 'social',
  themes: ['social', 'comedy'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2,
  settingSummary:
    'The village of Bellhaven holds its annual talent show. The party must each perform an act. The audience is enthusiastic but judgmental. The rival act, the Silverton Players, have won five years running and are suspiciously polished.',
  hook: 'The party is signed up before they can object. "Everyone participates! It is tradition! What will you perform?" The crowd looks expectant. The Silverton Players smirk from the front row.',
  twist:
    'The Silverton Players are using a charm enchantment on the audience. Their talent is real but mediocre. The charm makes them seem brilliant. If the party discovers the enchantment, they can dispel it, but revealing it means ruining the act mid-performance in front of the whole village.',
  climax:
    'The final round. The party performs against the Silverton Players. The charm is active. The party must either win on pure merit (beating a magically enhanced performance), dispel the charm (risking public embarrassment for the Silvertons), or find a creative third option.',
  scenes: [
    {
      title: 'Scene 1: Sign-Up and Practice',
      summary: 'Each party member picks an act. Rehearsal is chaotic. The village coaches them aggressively.',
      challenge: 'social',
      keyEvents: [
        'Each player picks a talent: music, comedy, acrobatics, magic tricks, poetry, etc.',
        'Practice sessions: Performance, Acrobatics, or relevant skill checks.',
        'Village mentors volunteer. Their advice is well-meaning and contradictory.',
        'The Silverton Players practice in secret. A party member hears something odd.',
      ],
    },
    {
      title: 'Scene 2: The Preliminary Round',
      summary: 'Other acts perform. The party performs. Skill checks determine the audience reaction.',
      challenge: 'social',
      keyEvents: [
        'Other acts: a singing goat, a juggling wizard, a dramatic child reading poetry.',
        'The party performs. Skill checks plus creativity determine scoring.',
        'The Silverton Players perform. The audience is enraptured. Suspiciously so.',
        'A detect magic reveals enchantment magic emanating from the Silvertons\' props.',
      ],
    },
    {
      title: 'Scene 3: The Final Round',
      summary: 'The championship performance. The party vs. the Silvertons. Charm magic vs. genuine talent.',
      challenge: 'social',
      keyEvents: [
        'The Silvertons perform first. The audience is charmed. Standing ovation.',
        'The party must decide: dispel and expose, or beat the magic with heart.',
        'The party\'s final performance. Everything they have. The crowd wavers.',
        'Win or lose, the Silverton enchantment is eventually discovered. Justice comes in its own time.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Maestro Fenton',
      role: 'talent show host',
      personality: 'An enthusiastic bard who takes the talent show more seriously than anyone should. Dramatic introductions, tearful critiques, and standing ovations for mediocrity.',
    },
    {
      name: 'Lyra Silverton',
      role: 'rival act leader',
      personality: 'Talented but insecure. She started using the charm because she lost once and could not handle it. She knows it is wrong. She cannot stop.',
      secret: 'She is genuinely talented. The charm was never necessary. She just does not believe it.',
    },
  ],
  keyLocations: [
    {
      name: 'Bellhaven Stage',
      description: 'A wooden stage in the village square, decorated with bunting and surrounded by an audience that takes entertainment very seriously.',
      significance: 'Where dreams are made or broken. The spotlight is unforgiving.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker'],
};
