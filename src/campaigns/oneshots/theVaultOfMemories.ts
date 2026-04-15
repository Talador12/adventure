import type { OneShotCampaign } from '../types';

export const theVaultOfMemories: OneShotCampaign = {
  id: 'oneshot-vault-of-memories',
  type: 'oneshot',
  title: 'The Vault of Memories',
  tagline: 'Steal a memory from a mind palace. The target is asleep. The vault is their dreamscape.',
  tone: 'heist',
  themes: ['heist', 'planar', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'Merchant Prince Aldric holds a secret in his mind - a banking code that unlocks a fortune stolen from the people. A dream-walker can send the party into Aldric\'s sleeping mind. The "vault" is his dreamscape: a surreal mindscape where memories are objects, fears are guardians, and the subconscious fights intruders. The party must navigate the dream, find the memory, and extract it before Aldric wakes.',
  hook: 'The dream-walker lights incense over Aldric\'s sleeping body: "His mind is a fortress. Memories are stored as objects in rooms that shift based on his emotions. The banking code is in his deepest memory vault - protected by his fears, his guilt, and his subconscious will. You have until he wakes. If you die in the dream, you wake up. If HE wakes up while you are inside, you do not."',
  twist: 'Aldric\'s deepest memory is not the banking code. It is the memory of why he stole the money in the first place - to pay a ransom for his kidnapped child, who was never returned. The banking code is buried under layers of grief. The "vault" is his child\'s room, preserved in perfect detail. The party must take the code from the room of a dead child.',
  climax: 'The deepest layer. Aldric\'s subconscious manifests as a guardian - a version of himself that knows intruders are present. The dream-Aldric does not fight with weapons. He fights with guilt: "Why are you here? Have I not suffered enough?" The party must bypass the guardian, take the code, and escape as the dream collapses around them.',
  scenes: [
    {
      title: 'Scene 1: The Surface',
      summary: 'Entering Aldric\'s dream. The outer layers are mundane memories - a city of his experiences.',
      challenge: 'exploration',
      keyEvents: [
        'The dream city: a surreal version of Aldric\'s life - his office, his home, his favorite tavern',
        'Memory objects: physical items that represent memories - touching them plays the scene',
        'The subconscious: dream-people who react to intruders with confusion, then hostility',
        'Navigation: finding the path deeper - through the memory of his greatest shame',
      ],
    },
    {
      title: 'Scene 2: The Depths',
      summary: 'Descending through layers of memory. Each layer is protected by a fear manifested as a guardian.',
      challenge: 'puzzle',
      keyEvents: [
        'Layer 2: Aldric\'s fear of poverty - a crumbling version of his childhood home, guarded by hunger',
        'Layer 3: Aldric\'s fear of failure - a courtroom where he is always found guilty',
        'The pattern: each fear must be acknowledged, not fought, to pass through',
        'Layer 4: the approach to the deepest vault - a hallway of doors, only one leads deeper',
      ],
    },
    {
      title: 'Scene 3: The Child\'s Room',
      summary: 'The deepest memory. The code. The guardian. The dream collapsing.',
      challenge: 'social',
      keyEvents: [
        'The room: a child\'s bedroom, perfectly preserved, toys on the floor, a music box playing',
        'The code: written on a drawing pinned to the wall - in a child\'s handwriting',
        'The guardian: dream-Aldric, weeping, asking why the party is disturbing his child\'s room',
        'The collapse: Aldric stirs in the real world - the dream fractures - the party runs for the exit',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Dream-Walker Nysa', role: 'quest giver / anchor', personality: 'A half-elf psion who can project people into dreams. Maintains the connection from outside. If her concentration breaks, the party is trapped.' },
    { name: 'Merchant Prince Aldric', role: 'the dreamer', personality: 'A wealthy man who stole from the public treasury. In waking life, cold and calculating. In dreams, a grieving father who never recovered from losing his child.' },
    { name: 'Dream-Aldric', role: 'guardian', personality: 'Aldric\'s subconscious defender. Not a monster - a manifestation of guilt and grief. He cannot be defeated by force. Only empathy can move him aside.' },
  ],
  keyLocations: [
    { name: 'The Dream City', description: 'A surreal version of Aldric\'s waking life. Buildings shift, streets loop, and memories walk like people.', significance: 'The outer layer of the dreamscape.' },
    { name: 'The Fear Layers', description: 'Descending levels of Aldric\'s psyche. Each one is a fear made physical - poverty, failure, loss.', significance: 'The obstacles between the surface and the vault.' },
    { name: 'The Child\'s Room', description: 'A small bedroom frozen in time. Toys, drawings, a music box. The banking code is here. So is Aldric\'s deepest grief.', significance: 'The vault. The target. The moral weight of the heist.' },
  ],
  dataSystems: ['heistPlanner', 'socialEncounter', 'trapDisarm', 'npcBackstoryGen'],
};
