import type { OneShotCampaign } from '../types';

export const theCustomerIsAlwaysWrong: OneShotCampaign = {
  id: 'oneshot-the-customer-is-always-wrong',
  type: 'oneshot',
  title: 'The Customer Is Always Wrong',
  tagline: 'You run a magic item shop. Every customer is worse than the last. The lich wants a refund.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 3,
  settingSummary:
    'Wanda\'s Wondrous Wares is the only magic item shop in Thornfield, and today is the annual Adventurer\'s Market - the busiest day of the year. The regular staff called in sick (all of them, simultaneously, which is suspicious). The party has been hired as emergency retail workers. They must handle customers, process transactions, manage inventory, and maintain their sanity. The customers are the worst people alive. And some of the worst people dead.',
  hook: 'The party arrives for their first day of work. The shop opens in ten minutes. There is no training. The inventory system is a pile of index cards held together with a rubber band. The first customer is already banging on the door. He is a barbarian. He wants a "smart sword." He does not mean an intelligent weapon. He means a sword that will correct his grammar.',
  twist:
    'The staff did not call in sick. They were enchanted to stay home by a rival shop owner who is trying to sabotage Wanda\'s reputation on the busiest day of the year. The increasingly bizarre customers are not random - several are plants sent to cause chaos. The lich returning the phylactery, the dragon wanting a refund - they were hired. The party must figure out which customers are real and which are saboteurs before the shop\'s reputation is destroyed.',
  climax:
    'The rival shop owner arrives in person disguised as a health inspector, threatening to shut down Wanda\'s for "code violations." The party must expose the sabotage, rally the genuine customers (who have had a surprisingly good experience thanks to the party), and defend the shop\'s reputation. The lich, it turns out, genuinely just wanted a refund. He stays to help.',
  scenes: [
    {
      title: 'Scene 1: The Morning Rush',
      summary:
        'The shop opens and the customers flood in. The party must handle three simultaneous service disasters with no training, no backup, and no idea where anything is.',
      challenge: 'social',
      keyEvents: [
        'The barbarian wants a "smart sword" - it corrects his grammar mid-combat and he loves it',
        'A warlock\'s patron is ghosting him and he wants a communication device to reach the patron directly',
        'A bard needs legal representation because his Vicious Mockery is too accurate and someone is suing',
        'The inventory system collapses - an entire shelf of potions tips over and the effects mix',
      ],
    },
    {
      title: 'Scene 2: The Difficult Returns',
      summary:
        'The afternoon brings returns and complaints. A lich wants to return a phylactery. A dragon wants a refund on a fireproof cloak. A sorcerer who turned himself inside out needs warranty service. The party handles it while spotting the sabotage pattern.',
      challenge: 'puzzle',
      keyEvents: [
        'The lich returns a phylactery: "It does not spark joy. I want store credit."',
        'A dragon in humanoid form wants a refund on a fireproof cloak he tested by setting it on fire',
        'A sorcerer who is currently inside-out needs the warranty honored on a polymorph scroll',
        'Pattern emerges: several customers are making identical complaints using the same phrasing',
      ],
    },
    {
      title: 'Scene 3: The Inspection',
      summary:
        'The rival arrives as a fake health inspector. The party must expose the sabotage, defend the shop, and turn the genuine customers into allies.',
      challenge: 'social',
      keyEvents: [
        'The "inspector" finds planted violations - cursed items mixed into regular stock',
        'The party pieces together the sabotage and confronts the rival',
        'Genuine customers rally behind the party - the barbarian offers to "inspect" the inspector',
        'The lich helps by authenticating the planted cursed items as recent forgeries',
      ],
    },
    {
      title: 'Scene 4: Closing Time',
      summary:
        'The day ends. The rival is exposed. The shop is saved. Wanda returns and is either horrified or impressed by how the party handled things.',
      challenge: 'social',
      keyEvents: [
        'The rival is escorted out by the barbarian and his new grammar-correcting sword',
        'Wanda arrives, surveys the chaos, and declares it the best sales day in the shop\'s history',
        'The lich becomes a regular customer. He tips.',
        'The party is offered permanent positions. They decline. Firmly.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Wanda Brightforge',
      role: 'boss / quest giver',
      personality:
        'Owner of the shop. A gnome artificer who has seen everything and is surprised by nothing. Returns at the end. "You gave the lich store credit? Bold choice. I respect it."',
    },
    {
      name: 'Krag the Literate',
      role: 'customer / ally',
      personality:
        'A barbarian who wanted a smart sword and got one. The sword corrects his grammar constantly and he finds it genuinely helpful. He is improving. "Krag USED to smash. Now Krag smashes with proper conjugation."',
    },
    {
      name: 'Lichworth P. Bones',
      role: 'customer / surprise ally',
      personality:
        'A lich who is genuinely returning a phylactery because it does not match his decor. He is polite, patient, and unexpectedly helpful when the sabotage is exposed. "I am undead, not unreasonable."',
    },
  ],
  keyLocations: [
    {
      name: 'Wanda\'s Wondrous Wares',
      description: 'A cramped magic item shop stuffed floor to ceiling with inventory. The organization system makes sense to exactly one person, and she is not here today.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Back Room',
      description: 'Storage, break room, and the only place to hide from customers. Contains the enchanted employee absence notes - the first clue to the sabotage.',
      significance: 'Where the party discovers the staff were enchanted and the sabotage evidence.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'merchantHaggling',
    'magicItemGenerator',
    'randomNpcOffer',
    'plotTwistEngine',
  ],
};
