import type { OneShotCampaign } from '../types';

export const theReturnDesk: OneShotCampaign = {
  id: 'oneshot-the-return-desk',
  type: 'oneshot',
  title: 'The Return Desk',
  tagline: 'Boots of Speed: returned. Reason: "I overshot my house by 40 miles."',
  tone: 'comedic',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Emporium of Arcane Goods has the most generous return policy in the realm: any item, any reason, within 90 days. This was a marketing decision by the owner who assumed nobody would actually return magic items. He was wrong. The return desk handles hundreds of items per day, each with a more absurd reason than the last. The party has been assigned to the return desk for one shift. Every return must be inspected, verified, and processed. Some of the items do not want to be returned.',
  hook: 'The first customer walks up with Boots of Speed. "I want to return these." Why? "I overshot my house by 40 miles. My wife thought I left her. I have been walking back for a week." The second customer has a Ring of Invisibility. "My spouse thinks I am having an affair." The third has a Bag of Holding. "It ate my lunch and will not give it back. I can hear it chewing." Each return is a comedy vignette. Then someone returns a cursed item and things go sideways.',
  twist:
    'One of the returned items - a seemingly mundane music box - is not actually a product the Emporium sells. It was planted by a thief who is using the return desk as a dead drop. The music box contains a map to a vault beneath the Emporium. The thief will return at closing time to "pick up their return." Every subsequent return after the music box has been subtly off - items that do not match the Emporium\'s inventory. The party is processing stolen goods into the system without knowing it.',
  climax:
    'The thief arrives at closing time and tries to collect the music box plus every "returned" item they planted. The party must stop the heist in progress while the returned items cause chaos - the Boots of Speed run laps around the store, the Bag of Holding spits out everything it has eaten (including the lunch), and the Ring of Invisibility makes the thief flicker in and out of sight. The final fight happens in a store full of malfunctioning magic items.',
  scenes: [
    {
      title: 'Scene 1: The Returns Begin',
      summary:
        'The shift starts. A parade of customers with increasingly absurd returns. The party processes them while learning the system. The music box comes in mid-rush and seems unremarkable.',
      challenge: 'social',
      keyEvents: [
        'Boots of Speed return: customer overshot by 40 miles. Processing: verify enchantment, issue refund.',
        'Ring of Invisibility: spouse thinks affair. The ring turns invisible too. Finding it is a challenge.',
        'Bag of Holding: ate a man\'s lunch. The Bag growls when approached. It must be emptied first.',
        'The music box: a quiet return among the chaos. Nothing seems wrong. That is the point.',
      ],
    },
    {
      title: 'Scene 2: Something Does Not Add Up',
      summary:
        'More returns come in. Some do not match the Emporium\'s inventory. The party investigates while still processing the queue.',
      challenge: 'puzzle',
      keyEvents: [
        'A "Cloak of Elvenkind" return - but the Emporium does not sell this brand. The serial number is wrong.',
        'A wand return with no receipt and a customer who does not know what the wand does',
        'The party cross-references the inventory log - six items today have no purchase records',
        'The music box plays a tune at midnight that sounds like a vault combination',
      ],
    },
    {
      title: 'Scene 3: Closing Time',
      summary:
        'The thief arrives. The heist is exposed. The returned items cause havoc during the confrontation.',
      challenge: 'combat',
      keyEvents: [
        'The thief walks in at closing: "I am here to pick up my returns." All six of them.',
        'The party confronts them. The thief triggers the planted items as distractions.',
        'Chaos: Boots of Speed running circles, the Bag of Holding vomiting, the Ring flickering',
        'The party subdues the thief using the very items that were returned against them',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Manager Dolworth',
      role: 'boss / quest giver',
      personality:
        'The return desk manager who is one bad return away from a breakdown. He implemented the generous return policy. He regrets it daily. "When I said \'any item, any reason,\' I did not mean a sentient sword that is suing us for abandonment."',
    },
    {
      name: 'Silka Duskmantle',
      role: 'villain / thief',
      personality:
        'A half-elf rogue who devised the dead drop scheme. She is clever, calm, and has been planting items for weeks. She genuinely did not expect anyone to notice. "Your inventory system is terrible. I was doing you a favor by testing it."',
    },
    {
      name: 'Horace (Boots of Speed customer)',
      role: 'recurring customer / comic relief',
      personality:
        'A human ranger who keeps returning because he forgot things. He comes back three times during the shift. Each time he has overshot the store. "I passed it again. I was going too fast. I hate these boots. I love these boots. I am confused."',
    },
  ],
  keyLocations: [
    {
      name: 'The Emporium of Arcane Goods',
      description: 'A sprawling magic item department store. The return desk is in the back, surrounded by shelves of re-stocked items and a growing pile of "problem returns" that nobody wants to touch.',
      significance: 'The entire one-shot setting.',
    },
    {
      name: 'The Return Processing Room',
      description: 'A back room where returned items are inspected and de-cursed before being re-shelved. Currently contains six items that should not exist in the Emporium\'s inventory.',
      significance: 'Where the evidence of the planted items is discovered.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'magicItemGenerator',
    'curseGenerator',
    'merchantHaggling',
    'plotTwistEngine',
  ],
};
