import type { OneShotCampaign } from '../types';

export const theLootGoblin: OneShotCampaign = {
  id: 'oneshot-the-loot-goblin',
  type: 'oneshot',
  title: 'The Loot Goblin',
  tagline: 'One goblin. Every legendary item in existence. 47 rings. It waddles because of the armor. It has no idea how any of it works.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'exploration'],
  playerCount: { min: 3, max: 5 },
  level: 6,
  estimatedHours: 2.5,
  settingSummary:
    'A single goblin named Glint has accumulated the greatest hoard of legendary items ever assembled by a living creature. Nobody knows how. Glint wears the Armor of Invulnerability (backwards), carries the Vorpal Sword (by the blade), has 47 rings on fingers, toes, ears, and teeth, and waddles because the combined weight of artifacts exceeds his body weight three times over. He found them. In a pile. In a ditch. He does not understand any of them. The party has been hired to recover these items before Glint accidentally ends the world by pulling the wrong ring.',
  hook: 'A frantic archmage bursts into the tavern: "A GOBLIN HAS THE ORB OF ANNIHILATION. And the Staff of Power. And the Deck of Many Things. And he is using the Deck as PLAYING CARDS with other goblins. You have to stop him before he draws from it and kills us all." The party sets out. They find Glint in a cave. He is wearing a crown sideways and using a Flame Tongue sword to roast a rat for dinner.',
  twist: 'Glint cannot be killed while wearing the items. The Armor of Invulnerability (even backwards) makes him near-impossible to damage. The Ring of Regeneration heals what gets through. The Cloak of Displacement means half the attacks miss. The goblin is accidentally the most durable creature alive. The party cannot take the items by force. They must outsmart, trick, or befriend a goblin who does not want to give up his "shiny collection."',
  climax: 'Glint, feeling threatened, accidentally activates the Staff of Power\'s retributive strike while trying to use it as a walking stick. The party has six seconds to convince him to stop, take the staff, or survive the explosion. The solution that works: offer him something shinier. A gold coin. He drops a Staff of Power for a gold coin. Because goblins.',
  scenes: [
    {
      title: 'The Approach',
      summary: 'The party locates Glint and assesses the situation. He is in a cave, surrounded by legendary items, using most of them wrong. He is also surrounded by other goblins who worship him as a god.',
      challenge: 'exploration',
      keyEvents: [
        'The cave entrance: goblin guards wearing +3 shields as hats. They do not know they are magical.',
        'Glint sits on a throne made of stacked Immovable Rods (all activated, surprisingly stable)',
        'A goblin child is playing with the Deck of Many Things. He draws a card. A small demon appears. The demon is confused.',
        'Glint greets the party cheerfully: "You want see shinies? Glint has BEST shinies!" He shows them the Vorpal Sword. By spinning it by the blade.',
      ],
    },
    {
      title: 'The Recovery Attempts',
      summary: 'The party tries to get the items back. Combat fails (invulnerable goblin). Stealth fails (47 rings jingle). Diplomacy is complicated by the fact that Glint LOVES his shinies.',
      challenge: 'social',
      keyEvents: [
        'Combat attempt: the fighter swings. The armor absorbs it. Glint does not even notice. "Ooh, you play fight? Glint play too!" He swings the Vorpal Sword. The wall behind the fighter is now in two pieces.',
        'Stealth attempt: the rogue reaches for a ring. 46 other rings jingle. Glint wakes up. "Friend wants ring? No. Glint\'s ring."',
        'Diplomacy attempt: "What would you trade for these items?" Glint thinks. "Glint wants... BIGGER shinies."',
        'The wizard identifies the items one by one. Each identification makes him more horrified. "He is wearing the Robe of the Archmagi as a SCARF."',
      ],
    },
    {
      title: 'The Accidental Apocalypse',
      summary: 'Glint accidentally activates the Staff of Power. The party must disarm the situation before a retributive strike levels the mountain.',
      challenge: 'puzzle',
      keyEvents: [
        'Glint leans on the Staff of Power. It hums. He leans harder. It glows. "Stick is warm! Glint like warm stick!"',
        'The wizard recognizes the retributive strike charging sequence. Six seconds. "EVERYONE STOP. DO NOT STARTLE THE GOBLIN."',
        'The party must calmly convince Glint to put down the glowing death staff. Glint does not understand the problem.',
        'A gold coin. Someone holds up a single gold coin. Glint\'s eyes go wide. He drops the staff. He takes the coin. "SHINIER THAN STICK!" The day is saved by one gold piece.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Glint', role: 'antagonist / innocent', personality: 'A goblin who found a pile of legendary items in a ditch and put all of them on. Loves shinies. Does not understand magic, weapons, or the concept of "world-ending artifacts." Would trade a Staff of Power for a gold coin because gold is shinier.' },
    { name: 'Archmage Voss', role: 'quest giver / panicking', personality: 'A powerful wizard who tracked the missing items to a goblin cave and immediately hired adventurers because "I am not going in there. He has the Deck of Many Things and he thinks it is a CARD GAME."' },
  ],
  keyLocations: [
    { name: 'Glint\'s Cave', description: 'A goblin cave decorated with legendary artifacts used as furniture, toys, and kitchen utensils. The most powerful collection of items in the world, arranged by a goblin with no sense of value.', significance: 'The entire setting. Every item is a potential disaster and every interaction is a negotiation.' },
    { name: 'The Throne of Immovable Rods', description: 'Glint\'s throne: six Immovable Rods stacked and activated. Surprisingly comfortable. Worth more than most kingdoms.', significance: 'Glint\'s seat of power. Literally immovable.' },
  ],
  dataSystems: ['socialEncounter', 'combatNarration', 'npcDialogue'],
};
