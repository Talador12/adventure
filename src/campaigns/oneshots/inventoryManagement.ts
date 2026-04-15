import type { OneShotCampaign } from '../types';

export const inventoryManagement: OneShotCampaign = {
  id: 'oneshot-inventory-management',
  type: 'oneshot',
  title: 'Inventory Management',
  tagline: 'Your bag of holding exploded. Every item is in a dungeon. Every item is being USED by a monster.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The party\'s bag of holding ruptured in a dungeon, scattering their entire inventory across twelve rooms. Every monster in the dungeon has found something. The goblin chief is using the fighter\'s greatsword as a walking stick. A dragon wyrmling is bathing in the party\'s healing potions. An owlbear is wearing the wizard\'s hat and appears to be casting - badly. The party must diplomatically, violently, or creatively reclaim their own equipment from monsters who have grown attached.',
  hook: 'A pop, a flash, and suddenly the party is standing in their underwear in a dungeon corridor surrounded by a cloud of loose items, scrolls, coins, and one very confused chicken (the ranger\'s emergency protein). Everything scatters into the dungeon. From the next room: "Ooh, shiny stick! Mine now!" The reclamation begins.',
  twist: 'The monsters have formed an economy around the stolen items. The goblins trade healing potions as currency. The owlbear has established a "wizard school" where it teaches young owlbears to wear the hat and screech at things. The dragon considers the potions his personal spa. Taking items back disrupts a functioning society. The party is not recovering loot - they are collapsing an economy.',
  climax: 'The final room: the dungeon boss has the bag of holding itself and has figured out how to put things IN it. He has been collecting items from all the other monsters. He has also put two goblins in the bag and they are yelling from inside. The party must defeat the boss, recover the bag, and decide whether to crash the monster economy or negotiate a trade deal.',
  scenes: [
    {
      title: 'Taking Stock',
      summary: 'The party discovers their items scattered across the dungeon and encounters the first monster using their gear. Negotiation, theft, or combat - the approach is set here.',
      challenge: 'social',
      keyEvents: [
        'The inventory scatter: a mental list of everything they lost. Weapons, armor, potions, spell components, 47 gold pieces, and a chicken.',
        'Room one: a goblin using the fighter\'s greatsword as a walking stick. He is very old. He really needs that walking stick.',
        'The moral question: take the sword from an elderly goblin who needs it more? Or find another way?',
        'First successful recovery (or first failed negotiation) sets the tone for every room after.',
      ],
    },
    {
      title: 'The Monster Economy',
      summary: 'The party discovers the monsters have built a society around their stolen items. Trade routes, currency, services. Disrupting any part threatens the whole system.',
      challenge: 'puzzle',
      keyEvents: [
        'The goblin market: healing potions are currency. One potion buys a week of mushroom rations. The economy is THRIVING.',
        'The owlbear wizard school: an owlbear in the wizard\'s hat teaches young owlbears to screech at rocks. It believes it is casting Fireball.',
        'The dragon spa: the wyrmling bathes in healing potions. It is the most relaxed dragon anyone has ever seen. It does not want to give them back.',
        'The party realizes taking everything back will crash the dungeon economy. The goblins will starve. The owlbears will riot.',
      ],
    },
    {
      title: 'The Bag Boss',
      summary: 'The dungeon boss has the bag of holding and has been hoarding items. The party must get it back while dealing with the consequences of their item reclamation.',
      challenge: 'combat',
      keyEvents: [
        'The boss: a bugbear who figured out the bag of holding and now considers himself a merchant king',
        'Two goblins are inside the bag, yelling. They went in voluntarily. "The rent is free in here!"',
        'Combat with a boss who keeps pulling random party items out of the bag and using them wrong',
        'Resolution: recover the bag, negotiate a trade deal with the monster economy, or let the monsters keep some items for peace.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elder Grik', role: 'first obstacle / guilt trip', personality: 'An elderly goblin who found the greatsword and uses it as a cane. Has a bad hip. Walks slowly. Makes eye contact that says "you would take a cane from an old goblin?" Maximum guilt.' },
    { name: 'Hootsworth the Owlbear', role: 'obstacle / educator', personality: 'An owlbear wearing a wizard hat who runs a "school" for young owlbears. Cannot actually cast spells. Believes with absolute conviction that screeching at rocks is Prestidigitation.' },
    { name: 'Gratch the Bag Boss', role: 'villain / entrepreneur', personality: 'A bugbear who figured out the bag of holding in ten minutes and built a monopoly in an hour. Smart, ruthless, and wearing three of the party\'s cloaks simultaneously.' },
  ],
  keyLocations: [
    { name: 'The Scattered Dungeon', description: 'A twelve-room dungeon where every room contains at least one party item being used by a monster for an unintended purpose.', significance: 'Each room is a negotiation, heist, or fight to reclaim a specific item.' },
    { name: 'The Goblin Market', description: 'A natural cavern converted into a bustling market where healing potions are currency and the party\'s rope is a clothesline.', significance: 'The heart of the monster economy. Where the party realizes this is more complicated than "take stuff back."' },
    { name: 'The Bag Boss\'s Vault', description: 'The final chamber. The bugbear sits on a throne of stolen cloaks, the bag of holding on his lap, two goblins yelling from inside.', significance: 'The climax. Recovery or negotiation. The bag and the remaining items.' },
  ],
  dataSystems: ['socialEncounter', 'combatNarration', 'npcDialogue', 'dungeonRoom'],
};
