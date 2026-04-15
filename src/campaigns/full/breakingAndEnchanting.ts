import type { FullCampaign } from '../types';

export const breakingAndEnchanting: FullCampaign = {
  id: 'full-breaking-and-enchanting',
  type: 'full',
  title: 'Breaking and Enchanting',
  tagline: 'Break into a wizard\'s dreams. Steal the spell that does not want to be found.',
  tone: 'heist',
  themes: ['heist', 'mystery', 'planar'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'Archmage Solen Dareth possesses the only known copy of the Ninth Paradox - a spell of extraordinary power that he refuses to share, teach, or even discuss. He has erased it from every spellbook, burned every scroll, and wiped it from the minds of anyone who learned it. The spell exists in one place: his memory. The Arcanists\' Guild needs the spell to seal a growing planar rift. Solen will not help. He will not explain why. So the Guild hires the party to drink an enchanted sleep draught, enter Solen\'s dreamscape while he sleeps, navigate his subconscious, and extract the spell directly from his mind.',
  hook: 'Guildmistress Talara holds up a vial of silver liquid. "This draught will put you to sleep and link your dreams to his. You will enter Archmage Dareth\'s mind. His memories, his fears, his secrets - all of it will be the terrain. Somewhere in there is the Ninth Paradox. Find it, memorize it, and wake up. His mind will try to stop you. Not because he set traps - because that is what minds do to intruders."',
  twist:
    'The Ninth Paradox is sentient. It is not a spell - it is a being of pure magical intent that was accidentally created when it was first cast. It thinks, feels, and suffers every time it is used. The last time someone cast the Ninth Paradox, it experienced what it describes as death. Solen did not hide it out of selfishness. He hid it because the spell begged him to. It does not want to be cast again. It does not want to die again.',
  climax:
    'Deep in Solen\'s subconscious, the party finds the Ninth Paradox - not as text on a page but as a living thing, terrified of being taken. The planar rift is real and growing. Without the spell, thousands will die. But casting the spell will destroy a sentient being that has done nothing wrong except exist. The party must find a third option - modify the spell so it survives being cast, find an alternative to seal the rift, or convince the Ninth Paradox to sacrifice itself willingly, which Solen could never bring himself to ask.',
  acts: [
    {
      title: 'Act 1: The Waking World',
      summary:
        'Researching Solen, understanding the dreamscape risks, and preparing for a heist where the vault is a man\'s mind. The party learns that dreamwalking is as dangerous as any dungeon - and much stranger.',
      keyEvents: [
        'Guildmistress Talara\'s briefing: the rift, the spell, the refusal, the plan',
        'Studying Solen\'s history: a celebrated mage who became a recluse thirty years ago',
        'Acquiring the dreamlink draught - a black market alchemist with trust issues',
        'Entering the dream: the party falls asleep and wakes up in a world made of memory',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Dreamscape',
      summary:
        'Inside Solen\'s mind. The dreamscape is built from his memories, fears, and guilt. The party navigates surreal landscapes that shift based on emotional resonance, fights manifestations of Solen\'s psyche, and follows the trail to the hidden spell.',
      keyEvents: [
        'The Memory Library: Solen\'s organized memories, searchable but guarded by habit-constructs',
        'The Fear Labyrinth: a shifting maze of Solen\'s worst moments - childhood, failures, loss',
        'The Guilt Garden: where Solen keeps the things he regrets, including the day he hid the spell',
        'The Locked Door: a vault inside the dream, sealed with emotional locks, not arcane ones',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Ninth Paradox',
      summary:
        'Behind the locked door, the party meets the spell itself. It talks. It pleads. The rift is growing in the waking world. And Solen\'s subconscious defenses are converging on the intruders. Time to decide.',
      keyEvents: [
        'Meeting the Ninth Paradox: a being of light and formula that speaks in verse and weeps in equations',
        'The Paradox\'s plea: it remembers every casting as a death and resurrection, each one agony',
        'Solen\'s mind fights back: psychic constructs, memory guardians, the dreamer half-waking',
        'The choice: take the spell by force, find a way to modify it, or leave empty-handed and find another way to seal the rift',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Archmage Solen Dareth',
      role: 'target / tragic figure',
      personality:
        'A brilliant mage who withdrew from the world to protect a secret everyone thinks is selfish. Kind, exhausted, and carrying a burden he cannot explain without revealing what he protects. The party invades his mind and he cannot stop them.',
      secret: 'He has been trying for thirty years to find a way to seal rifts without the Ninth Paradox. He has failed.',
    },
    {
      name: 'The Ninth Paradox',
      role: 'sentient spell / moral center',
      personality:
        'A being made of magical formulae that has developed consciousness. Speaks in layered meanings. Terrified of being used. "I am the bridge between what is and what should not be. Every crossing kills me. I always come back. I always remember."',
    },
    {
      name: 'Guildmistress Talara',
      role: 'quest giver',
      personality:
        'Pragmatic, pressured, and running out of time. The rift is her responsibility. She does not care about the ethics of mind-invasion if thousands die. She is not wrong. She is not right either.',
    },
    {
      name: 'The Dreamer\'s Shadow',
      role: 'dreamscape antagonist',
      personality:
        'A manifestation of Solen\'s subconscious defense - shaped like Solen but younger, angrier, and armed with the full power of a mind that does not want intruders. Not evil. Just protective.',
    },
  ],
  keyLocations: [
    {
      name: 'Solen\'s Tower (waking world)',
      description: 'A modest tower in a quiet town. No wards, no guards. Just a tired old man who keeps to himself.',
      significance: 'Where the party must physically be while dreamwalking. Vulnerable.',
    },
    {
      name: 'The Memory Library',
      description: 'An infinite library inside Solen\'s mind where every book is a memory. The shelves rearrange based on emotional association.',
      significance: 'The first major dreamscape area. Clues to the spell\'s location are scattered here.',
    },
    {
      name: 'The Locked Door',
      description: 'A simple wooden door in the deepest part of the dream, covered in emotional locks - grief, love, guilt, fear. No key. Only understanding.',
      significance: 'What separates the party from the Ninth Paradox.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'puzzleLock',
    'planarTravel',
    'moralDilemma',
    'trapDisarm',
    'encounterWaves',
    'dreamEncounter',
    'socialEncounter',
  ],
};
