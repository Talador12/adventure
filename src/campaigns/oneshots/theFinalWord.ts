import type { OneShotCampaign } from '../types';

export const theFinalWord: OneShotCampaign = {
  id: 'oneshot-final-word',
  type: 'oneshot',
  title: 'The Final Word',
  tagline: 'A word that ends all magic forever. Someone has learned it. They are about to speak.',
  tone: 'epic',
  themes: ['epic', 'intrigue', 'dark_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 9,
  estimatedHours: 3,
  settingSummary:
    'The Word of Unmaking. If spoken, it permanently severs the connection between the mortal world and the Weave - the source of all magic. No more spells. No more enchantments. No more healing magic. No more dragons. A scholar named Elara has deciphered the Word from an ancient text and intends to speak it at the equinox. She believes magic has done more harm than good. The party must stop her or let the world change forever.',
  hook: 'A terrified archmage arrives: "Elara found the Word. The Word of Unmaking. If she speaks it at the equinox - which is tomorrow - magic ends. Not for a year. Not for a generation. Forever. Everything built on magic falls. Including me. Including healing. Including you, if any of you are casters."',
  twist: 'Elara is not wrong about magic\'s cost. She was a healer who discovered that every healing spell draws life force from somewhere else. Every resurrection takes years from someone across the world. Magic is not free energy - it is a transfer system, and the people paying the cost are the poorest and most vulnerable. She wants to end magic because magic is built on exploitation nobody sees.',
  climax: 'The equinox. Elara stands at the Speaking Stone, the Word on her lips. The party arrives. She presents her evidence: the transfer ledger showing who pays for magic. The party must decide: silence her (preserving magic and its hidden cost), let her speak (ending magic and its benefits), or find a way to reform the Weave itself.',
  scenes: [
    {
      title: 'Scene 1: The Warning',
      summary: 'Learning about the Word, Elara\'s plan, and the race to find her before the equinox.',
      challenge: 'exploration',
      keyEvents: [
        'The Word: ancient, forbidden, spoken once before in a forgotten age that plunged the world into darkness',
        'Elara\'s trail: she has been visiting communities harmed by magic\'s hidden cost - fishing villages where people age prematurely',
        'The evidence: each village confirms Elara\'s claim - their life force is being drained by distant spells',
        'The Speaking Stone: an amplification point where the Word will reach the entire Weave',
      ],
    },
    {
      title: 'Scene 2: The Truth',
      summary: 'Following Elara\'s research. Discovering she is right about magic\'s cost. The moral ground shifts.',
      challenge: 'social',
      keyEvents: [
        'The fishing village: a thirty-year-old woman with white hair and arthritic hands. She has never cast a spell in her life. Something is taking years from her.',
        'The ledger: Elara\'s research showing the flow of life force from periphery to center - exploitation at cosmic scale',
        'The counter-argument: magic also heals, protects, and enables civilization - ending it causes its own suffering',
        'The question: is a system built on hidden exploitation worth preserving if it can be reformed?',
      ],
    },
    {
      title: 'Scene 3: The Speaking Stone',
      summary: 'The equinox. Elara. The Word. The choice.',
      challenge: 'social',
      keyEvents: [
        'Elara at the stone: calm, resolved, the Word ready on her tongue',
        'Her argument: "Magic is slavery with invisible chains. I am cutting them."',
        'The party\'s response: silence her (violence), persuade her (logic/empathy), or propose reform',
        'The moment: the Word is spoken or it is not - and the world changes either way',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elara Voss', role: 'the speaker', personality: 'A former healer who discovered magic\'s hidden cost when she traced the life force she was channeling to dying farmers in distant villages. Not angry - sad. "I became a healer to stop suffering. I was causing it."' },
    { name: 'Archmage Theron', role: 'quest giver', personality: 'An archmage who benefits from the current system and does not want it to end. His motives are mixed: he genuinely believes magic is necessary AND he does not want to lose his power.' },
    { name: 'The Weave Keeper', role: 'cosmic neutral', personality: 'An entity woven from threads of raw magic, shifting between forms mid-sentence. Speaks in facts with no opinion attached. "The transfer system is exploitative. Also functional. Both statements are true. I do not resolve contradictions. I am a filing system."' },
  ],
  keyLocations: [
    { name: 'The Drained Villages', description: 'Coastal communities where people age prematurely. The invisible cost of magic made visible in grey hair and tired bones.', significance: 'Where Elara\'s evidence is confirmed firsthand.' },
    { name: 'The Speaking Stone', description: 'An ancient amplification point on a hilltop. Whatever is spoken here reaches the entire Weave. At equinox, the connection is strongest.', significance: 'Where the Word would be spoken and magic would end.' },
    { name: 'The Weave Nexus', description: 'A shimmering intersection of magical ley lines visible only to those who know where to look. The flow of life force is visible here.', significance: 'Where the exploitation system is physically observable.' },
  ],
  dataSystems: ['socialEncounter', 'encounterWaves', 'npcBackstoryGen'],
};
