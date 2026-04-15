import type { OneShotCampaign } from '../types';

export const theLivingVault: OneShotCampaign = {
  id: 'oneshot-living-vault',
  type: 'oneshot',
  title: 'The Living Vault',
  tagline: 'Nobody has ever broken into the Obsidian Vault. Nobody has ever broken out, either. The vault is a mimic. The whole vault.',
  tone: 'heist',
  themes: ['heist', 'horror', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  level: 6,
  estimatedHours: 3,
  settingSummary:
    'The Obsidian Vault beneath the Merchant Guild is legendary: impossible to crack, no known break-ins in a century. The party learns the terrible reason why - the vault is a colossal mimic. The door, the walls, the floor, the shelves - all one creature. Previous thieves did not fail to escape. They were eaten. The party must enter the creature, steal the target item, and escape before the mimic realizes they are inside it.',
  hook: 'The fence shows the party a map drawn by the only survivor of a previous attempt, found gibbering in the sewers: "The vault is alive. The walls are its skin. The door is its mouth. The treasure inside is its lure. Previous teams went in and never came back because the vault ATE them. You need to go in, take the Merchant Seal, and get out before it swallows."',
  twist: 'The mimic is not hostile by nature. It is a captive. The Merchant Guild discovered it decades ago and imprisoned it, using its stomach as their vault. The treasure inside is bait the Guild placed to attract thieves - which the mimic then feeds on. The mimic is hungry, miserable, and will let the party leave if they promise to free it.',
  climax: 'Inside the mimic. The walls are closing in - it is waking up. The party finds the Merchant Seal AND a chain embedded in the mimic\'s flesh that anchors it to the building\'s foundation. They can grab the seal and run (the mimic digests them if they are too slow), or break the chain (freeing the mimic, which tears through the Guild Hall as it escapes). Either way, they are inside a creature that is becoming aware of them.',
  scenes: [
    {
      title: 'Scene 1: The Approach',
      summary: 'Entering the Guild Hall basement and discovering the truth about the vault. The previous break-in team left... evidence.',
      challenge: 'exploration',
      keyEvents: [
        'The basement: standard security bypassed, the vault door ahead - massive, ornate, slightly warm',
        'The evidence: bones. Half-dissolved equipment. A journal ending mid-sentence: "The walls are mo-"',
        'Detection: the vault radiates transmutation magic - the entire structure is one living thing',
        'The plan: enter slowly, do not touch the walls, find the target, and exit before it responds',
      ],
    },
    {
      title: 'Scene 2: Inside',
      summary: 'Walking through the interior of a living creature. The shelves are teeth. The floor is a tongue. The treasure is bait.',
      challenge: 'puzzle',
      keyEvents: [
        'The interior: looks like a vault but the stone is warm and slightly damp - it is flesh disguised as stone',
        'The treasure: gold, gems, artifacts - all sticky, coated in adhesive to trap hands',
        'The Merchant Seal: deeper inside, on a pedestal that is actually a cluster of teeth',
        'The chain: a massive iron chain driven through the mimic\'s body, anchoring it to the foundation',
      ],
    },
    {
      title: 'Scene 3: The Awakening',
      summary: 'The mimic wakes up. The walls close. The party must escape or negotiate with a very large, very hungry creature.',
      challenge: 'combat',
      keyEvents: [
        'The awakening: the walls ripple, the floor undulates, the door begins to close - it is a mouth',
        'Communication: the mimic can speak through vibrations - "You are not food. You are inside me. Help."',
        'The choice: take the seal and run (the mimic tries to digest them) or break the chain (chaos)',
        'The escape: through the closing mouth, past the acid, and out before the vault seals forever',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Mimic', role: 'the vault / captive', personality: 'Communicates through vibrations in the walls - low rumbles for "no," rapid pulses for "danger," a sound like a heartbeat for "please." Has been chained in a basement for sixty years. When it realizes the party can hear it, the vibrations become frantic, then stop, then resume slowly, carefully, like someone learning to speak after decades of silence.' },
    { name: 'The Fence', role: 'quest giver', personality: 'Drinks while briefing the party. Keeps refilling the glass. When asked what happened to the last team, he stares at the table for three seconds, then changes the subject. "The vault is well-defended. Standard locks, standard traps. Nothing you cannot handle." He is lying about everything except the locks.' },
    { name: 'Guild Master Crest', role: 'absent antagonist', personality: 'His name is on the Guild Hall plaque. His portrait shows him standing next to the vault door with one hand on it, smiling. He feeds the vault thieves the way a farmer feeds livestock - on schedule, without sentiment.' },
  ],
  keyLocations: [
    { name: 'The Guild Hall Basement', description: 'A stone basement with standard locks leading to the vault door. The bones of previous thieves litter the floor before the entrance.', significance: 'The approach and the first warning.' },
    { name: 'Inside the Mimic', description: 'A space that looks like a stone vault but is warm, damp, and alive. Shelves are teeth. The floor is a tongue. Treasure is bait coated in adhesive.', significance: 'The heist location and the creature itself.' },
    { name: 'The Chain Anchor', description: 'A massive iron chain driven through the mimic\'s body and bolted to the building foundation. Breaking it frees the creature.', significance: 'The moral choice and the path to an alternative ending.' },
  ],
  dataSystems: ['heistPlanner', 'encounterWaves', 'combatNarration', 'trapDisarm'],
};
