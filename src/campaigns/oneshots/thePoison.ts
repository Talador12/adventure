import type { OneShotCampaign } from '../types';

export const thePoison: OneShotCampaign = {
  id: 'oneshot-poison',
  type: 'oneshot',
  title: 'The Poison',
  tagline: 'You are all poisoned. The antidote is in a dungeon. Every fight costs strength you cannot afford.',
  tone: 'survival',
  themes: ['survival', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The party wakes poisoned. A slow-acting venom that weakens over hours, not minutes. The only known antidote grows in a cave system half a day\'s travel away. Every exertion accelerates the poison. Combat, running, even heavy spellcasting drains them faster.',
  hook: 'Breakfast tasted fine. An hour later, the first party member collapses. Then the second. A healer examines them: "Shadowbloom toxin. You have maybe eight hours. The antidote is a mushroom that only grows in the Thorndeep Caves. And the walk alone will cost you two hours you do not have."',
  twist:
    'The party was poisoned by their employer, who needs them to retrieve something from the caves but cannot risk them refusing. The antidote mushroom is real, but so is the artifact their employer planted the job to get. He is waiting at the cave entrance to collect.',
  climax:
    'The party finds the mushroom and the artifact. Their employer arrives with hired muscle, offering the antidote (which he also carries) in exchange for the artifact. The party is weakened. Fighting is possible but costly. The poison clock is ticking.',
  scenes: [
    {
      title: 'Scene 1: The Clock Starts',
      summary: 'Discovery of the poisoning. The race to the caves begins. Every choice matters because everything has a cost.',
      challenge: 'exploration',
      keyEvents: [
        'The first sign: a sword feels heavier than it should. Then the edges of vision blur. Then the shaking starts. Ability scores drop by 1 every hour. At zero in any score, the heart stops.',
        'The caves are four hours on foot. Running halves it but doubles the poison\'s speed. The math is cruel either way.',
        'A herbalist provides a temporary suppressant. Buys one hour but uses their last supplies.',
        'The road to the caves is not empty. Bandits. Wildlife. Each encounter is a gamble.',
      ],
    },
    {
      title: 'Scene 2: The Thorndeep Caves',
      summary: 'The cave system. The mushroom grows deep. Monsters guard the path. Every fight drains the party further.',
      challenge: 'combat',
      keyEvents: [
        'The cave entrance. Dark, wet, and deep. The mushroom grows at the lowest level.',
        'Giant spiders. Fighting them costs strength. Sneaking past costs time.',
        'A flooded chamber. Swimming accelerates the poison significantly.',
        'The mushroom grove. Beautiful. Guarded by a territorial cave bear.',
      ],
    },
    {
      title: 'Scene 3: The Employer',
      summary: 'Emerging from the caves with the antidote to find their poisoner waiting. Negotiate from a position of extreme weakness.',
      challenge: 'social',
      keyEvents: [
        'The employer waits at the entrance with five armed guards and the real antidote.',
        'His offer: the artifact for the cure. He apologizes. Business is business.',
        'The party has the mushroom antidote but needs time to prepare it. He has it ready.',
        'Fight weakened, hand over the artifact, stall while preparing their own cure, or bluff.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Selwyn Marr',
      role: 'employer / poisoner',
      personality: 'Cannot look the party in the eye. Keeps straightening his coat, adjusting his collar. "I know what this looks like. I know what I did. My daughter is dying of the same poison - natural exposure. Every mercenary company I hired refused that cave. I am not a good man. But she is a good child and she does not deserve to die because her father could not find braver people to ask nicely."',
      secret: 'His daughter is dying of the same poison. Natural exposure. He needs the artifact, a purification stone, to cure her permanently.',
    },
    {
      name: 'Healer Tannis',
      role: 'herbalist / ally',
      personality: 'Elderly, blunt, and angry about the poisoning. Provides what help she can and makes the party promise to come back alive so she can bill them.',
    },
  ],
  keyLocations: [
    {
      name: 'Thorndeep Caves',
      description: 'A deep cave system known for rare fungi. Wet, dark, and home to things that prefer it that way.',
      significance: 'Where the cure is. Every step inside costs something.',
    },
    {
      name: 'The Cave Entrance',
      description: 'A rocky clearing where the employer waits with his hired muscle and a vial of prepared antidote.',
      significance: 'The final negotiation. Strength vs. leverage.',
    },
  ],
  dataSystems: ['survivalTracker', 'combatNarration', 'trapCorridor', 'npcGenerator'],
};
