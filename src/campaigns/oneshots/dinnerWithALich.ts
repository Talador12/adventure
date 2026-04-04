import type { OneShotCampaign } from '../types';

export const dinnerWithALich: OneShotCampaign = {
  id: 'oneshot-dinner-with-a-lich',
  type: 'oneshot',
  title: 'Dinner with a Lich',
  tagline: 'He just wants company. The food is incredible. Nobody mention the phylactery.',
  tone: 'comedic',
  themes: ['comedy', 'horror', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 7,
  estimatedHours: 3,
  settingSummary:
    'The party receives an engraved dinner invitation from Archlich Mortimer Dreadhollow III. Not a threat — an actual dinner invitation. He\'s been undead for 400 years and desperately lonely. His tower is immaculate, the food is prepared by skeletal chefs (and it\'s genuinely good), and he just wants to have a nice evening. But his social skills died with his body, his "pets" are a dracolich and an army of specters, and he keeps accidentally terrifying his guests.',
  hook: 'The invitation arrives by spectral courier: "Dear Adventurers, you are cordially invited to dinner at Dreadhollow Tower this evening at sundown. RSVP unnecessary; I already know you\'ll come. Dress code: smart casual. Weapons optional. — Mortimer." A spectral carriage arrives at exactly sundown.',
  twist:
    'Mortimer\'s phylactery is cracking. He has about a week before it shatters and he dies permanently. He didn\'t invite the party for dinner — he invited them because he needs help fixing it, but he\'s too proud (and too socially awkward) to ask directly. The dinner is him working up the courage.',
  climax:
    'Mortimer finally admits he needs help. The phylactery can be fixed by a living soul willingly donating a fragment of their life force (1d4 years — not harmful, just... shorter). The party must decide: help the lonely lich live, let him die with dignity, or try to find another way in a frantic midnight quest to the Negative Energy Plane.',
  scenes: [
    {
      title: 'Scene 1: Arrival at Dreadhollow Tower',
      summary:
        'The spectral carriage arrives. The tower is surprisingly tasteful. Mortimer greets them at the door wearing a party hat. His skeletal butler takes their coats. This is very weird.',
      challenge: 'social',
      keyEvents: [
        'The spectral carriage ride — through a haunted forest that\'s actually quite scenic',
        'Mortimer\'s greeting — enthusiastic, clumsy, accidentally casts Chill Touch while trying to shake hands',
        'Tour of the tower — a museum of 400 years of lonely hobbies (he paints, poorly)',
        'The "pets" — a dracolich sleeping by the fire, spectral cats everywhere',
      ],
    },
    {
      title: 'Scene 2: Dinner is Served',
      summary:
        'A five-course meal prepared by undead chefs who were award-winning in life. The food is exceptional. The conversation is... Mortimer hasn\'t talked to living people in a century.',
      challenge: 'social',
      keyEvents: [
        'Course 1: Soup that subtly detects alignment (changes color) — Mortimer\'s icebreaker',
        'Course 2-3: Genuinely delicious food, increasingly honest conversation',
        'Mortimer tells his story — became a lich to finish his research, then just... stayed',
        'Something cracks in the basement. Mortimer flinches. He changes the subject.',
      ],
    },
    {
      title: 'Scene 3: The Ask',
      summary:
        'After dessert, Mortimer can\'t hide it anymore. The phylactery crack is visible, energy leaking. He asks for help — and the party must choose.',
      challenge: 'social',
      keyEvents: [
        'Mortimer shows the cracking phylactery — his fear is palpable and genuine',
        'He explains the options: life force donation, midnight quest, or acceptance',
        'If combat: the tower\'s defenses activate if anyone threatens the phylactery',
        'Resolution: save Mortimer, let him pass, or find a creative third way',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Archlich Mortimer Dreadhollow III',
      role: 'host / sympathetic figure',
      personality:
        'An incredibly powerful undead wizard who is also profoundly lonely, socially awkward, and desperately wants people to like him. Apologizes constantly. His intimidation is all accidental.',
      secret: 'He became a lich to cure his dying wife. She died anyway. He stayed undead because he didn\'t know how to stop.',
    },
    {
      name: 'Bones',
      role: 'skeletal butler',
      personality:
        'A skeleton in a tuxedo who communicates through precise gestures. Disapproves of everything but serves flawlessly. The only being Mortimer considers a friend.',
    },
    {
      name: 'Tiny',
      role: 'pet dracolich',
      personality:
        'A dracolich the size of a Great Dane who acts exactly like a dog. Fetches bones. Wants belly rubs (the belly is ribcage). Named "Tiny" ironically when it was full-sized.',
    },
  ],
  keyLocations: [
    {
      name: 'Dreadhollow Tower',
      description:
        'A lich\'s tower that\'s been redecorated for company. Candles, tablecloths, and a "Welcome Friends" banner that\'s slightly crooked.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Dining Room',
      description:
        'A formal dining room set for the first time in decades. The chandelier is made of frozen spells. The centerpiece is a still-life painting Mortimer did himself.',
      significance: 'Where the relationship-building happens.',
    },
    {
      name: 'The Phylactery Chamber',
      description:
        'A heavily warded basement room where Mortimer\'s phylactery sits in a crystal case. Cracks spider-web across its surface.',
      significance: 'Where the final decision is made.',
    },
  ],
  dataSystems: [
    'darkBargain',
    'enchantedFoodDrink',
    'npcBackstoryGen',
    'socialEncounter',
    'tavernEntertainment',
  ],
};
