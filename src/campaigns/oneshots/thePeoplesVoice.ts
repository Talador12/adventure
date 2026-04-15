import type { OneShotCampaign } from '../types';

export const thePeoplesVoice: OneShotCampaign = {
  id: 'oneshot-peoples-voice',
  type: 'oneshot',
  title: 'The People\'s Voice',
  tagline: 'A banned protest song. A public festival. One performance to change everything.',
  tone: 'political',
  themes: ['political', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The bard Lysara wrote a song called "The People\'s Voice" that names the city\'s corrupt tax collector by name. The song has been banned. Lysara has been arrested. The Harvest Festival is tomorrow - the one day the entire city gathers in the square. The party must learn the song, avoid the city guard, and perform it in front of everyone.',
  hook: 'Lysara\'s apprentice finds the party: "They took her last night. The song is all that is left. If someone performs it at the festival, the whole city hears the truth. If nobody does, they win. Here are the lyrics. Please."',
  twist: 'The tax collector already knows the party plans to perform the song. He has not tried to stop them. Instead, he has arranged for a counter-performance - a famous bard who will sing a version of the song that changes the lyrics to praise the government. If the party does not notice, the crowd hears propaganda instead of protest.',
  climax: 'Both performances are about to happen simultaneously. The party must either sabotage the counter-performance, outperform the famous bard, or find a way to get Lysara herself on stage - which means breaking her out of jail in the next thirty minutes.',
  scenes: [
    {
      title: 'Scene 1: Learning the Song',
      summary: 'The party must learn the banned song, find instruments, and plan how to get on the festival stage without being arrested.',
      challenge: 'social',
      keyEvents: [
        'The lyrics: powerful, specific, names names - this is why it was banned',
        'Finding musicians: underground artists who know the tune but are afraid to play it',
        'The festival stage: controlled by the city, performers need permits they will not get',
        'Alternative venues: the fountain, the bell tower, the merchant stalls - anywhere with acoustics',
      ],
    },
    {
      title: 'Scene 2: The Festival',
      summary: 'Navigating the crowded festival while avoiding guards and discovering the counter-performance plot.',
      challenge: 'exploration',
      keyEvents: [
        'City guards are everywhere, checking performer permits and confiscating instruments',
        'A friendly merchant hides the party\'s instruments in his stall',
        'Discovery: a famous bard is rehearsing a suspiciously similar song backstage',
        'The choice: deal with the counter-bard, break Lysara out of jail, or just go for it',
      ],
    },
    {
      title: 'Scene 3: The Performance',
      summary: 'The moment of truth. The party performs, the crowd listens, and the consequences begin.',
      challenge: 'social',
      keyEvents: [
        'The performance: skill checks, crowd reaction, guards closing in',
        'If the counter-bard performs first, the party must win the crowd back',
        'The crowd\'s reaction: silence, then singing along - the song belongs to everyone now',
        'The aftermath: the guards cannot arrest the entire city square',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Lysara Thornwick', role: 'imprisoned bard', personality: 'Hums the banned song through her cell bars. Speaks in rhythm, like every sentence is a lyric waiting for a melody. "They can jail the singer. They cannot jail the song." Tiny, fierce, three feet tall and louder than the guards.' },
    { name: 'Tax Collector Brenn', role: 'antagonist', personality: 'Laughs too loudly at things that are not funny. Sweats when anyone mentions music. His counter-performance plan reveals a man who thinks in systems, not emotions - and is terrified of a halfling with a lute.' },
    { name: 'Maestro Silvanus', role: 'counter-bard', personality: 'Speaks about himself in the third person. "Silvanus does not perform propaganda. Silvanus performs ART." Genuinely offended when he learns the truth about the sanitized lyrics. His ego is the party\'s best weapon.' },
  ],
  keyLocations: [
    { name: 'The Festival Square', description: 'The heart of the city during Harvest Festival. Stalls, stages, thousands of people, and guards at every corner.', significance: 'Where the performance must happen.' },
    { name: 'The City Jail', description: 'A squat stone building two blocks from the square. Lysara is in a cell on the second floor.', significance: 'Where Lysara is held - a potential jailbreak target.' },
    { name: 'The Underground Tavern', description: 'A basement bar where banned musicians still play. The walls are covered in protest art.', significance: 'Where the party learns the song and recruits allies.' },
  ],
  dataSystems: ['socialEncounter', 'chaseSequence', 'npcBackstoryGen'],
};
