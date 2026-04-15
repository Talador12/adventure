import type { OneShotCampaign } from '../types';

export const npcOfTheYear: OneShotCampaign = {
  id: 'oneshot-npc-of-the-year',
  type: 'oneshot',
  title: 'NPC of the Year',
  tagline: 'You ARE the NPCs. A party of AI adventurers just walked in. Survive their terrible decisions.',
  tone: 'shenanigans',
  themes: ['comedy', 'social', 'meta'],
  playerCount: { min: 4, max: 6 },
  level: 3,
  estimatedHours: 3,
  settingSummary:
    'The town of Cresthollow is perfectly normal. The players are its residents: the shopkeeper, the guard captain, the tavern owner, the quest board manager. Today, a party of adventurers arrives. These adventurers are controlled by the DM and they are the worst. They steal everything not nailed down. They attack quest givers mid-sentence. They seduce the furniture. The players must keep their town intact while these maniacs rampage through it following quest hooks that lead nowhere because nobody designed this town for THESE people.',
  hook: 'Each player picks an NPC role: shopkeeper, guard, barkeep, quest giver, healer, or mayor. They have built their lives here. It is a good life. Then the adventuring party walks through the gate and immediately the rogue starts stealing apples from a cart. It is going to be a long day.',
  twist: 'The adventurers are on a genuine quest to stop a demon invasion that arrives at sundown. They are terrible at communication but they are not wrong. The NPCs must figure out the actual threat from the adventurers\' chaotic behavior and prepare the town for an attack, all while the adventurers keep making everything worse by "helping."',
  climax: 'The demon invasion begins. The NPCs and the adventurers must work together. The adventurers fight the demons with reckless abandon. The NPCs coordinate the defense using their knowledge of the town. It is the worst team-up in military history and it barely works. The adventurers take all the credit.',
  scenes: [
    {
      title: 'A Normal Day',
      summary: 'The players establish their NPC lives. The shopkeeper opens shop. The guard does rounds. The barkeep pours drinks. Then the adventuring party arrives and everything goes sideways in five minutes.',
      challenge: 'social',
      keyEvents: [
        'Each player describes their morning routine. It is peaceful. It is the last peace they will know today.',
        'The adventurers enter town. The barbarian immediately punches a signpost "to see if it is a mimic."',
        'The rogue attempts to pickpocket the guard. In front of the guard. While making eye contact.',
        'The wizard asks the shopkeeper for "your most forbidden tome." The shopkeeper sells candles.',
      ],
    },
    {
      title: 'Managing Chaos',
      summary: 'The adventurers follow quest hooks and leave destruction in their wake. The NPCs must contain the damage while piecing together that these idiots might be onto something real.',
      challenge: 'puzzle',
      keyEvents: [
        'The adventurers accept three contradictory quests simultaneously and try to do all of them at once',
        'The barbarian "clears" the tavern of enemies. There were no enemies. There were customers.',
        'The cleric tries to heal a statue. The bard seduces a door. The rogue steals his own quest reward.',
        'Buried in the chaos: the adventurers mention a "demon gate" and "sundown." The NPCs start connecting dots.',
      ],
    },
    {
      title: 'The Actual Threat',
      summary: 'Demons attack at sundown. The NPCs rally the town. The adventurers rally themselves. Together they must defend Cresthollow in the most disorganized battle ever fought.',
      challenge: 'combat',
      keyEvents: [
        'The sky cracks open. Demons pour in. The adventurers: "SEE? WE TOLD YOU."',
        'The barkeep turns the tavern into a fortress. The shopkeeper weaponizes inventory. The guard organizes a militia.',
        'The adventurers fight with zero coordination and maximum violence. It is horrifying and effective.',
        'Victory. The town survives. The adventurers loot the demon corpses and leave without saying thank you. Classic.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Adventuring Party', role: 'chaotic force / allies eventually', personality: 'A barbarian who punches first, a rogue who steals reflexively, a wizard who asks inappropriate questions, a bard who flirts with inanimate objects, and a cleric who heals things that are not injured. They are heroes. Technically.' },
    { name: 'Mayor Aldith', role: 'player character / authority', personality: 'The mayor of Cresthollow. Has dealt with adventurers before. Has a drawer full of damage claims. Today is the worst one yet.' },
  ],
  keyLocations: [
    { name: 'Cresthollow', description: 'A mid-sized town with a market, tavern, temple, barracks, and town hall. Perfectly normal until adventurers show up.', significance: 'The entire setting. Every location is a potential disaster zone when adventurers interact with it.' },
    { name: 'The Rusty Nail Tavern', description: 'The town tavern. Good ale, warm fire, and a barbarian-shaped hole in the wall as of ten minutes ago.', significance: 'Social hub. Where the adventurers cause the most civilian damage and where the barkeep makes their last stand.' },
  ],
  dataSystems: ['socialEncounter', 'encounterWaves', 'npcDialogue', 'combatNarration'],
};
