import type { OneShotCampaign } from '../types';

export const theHelpDesk: OneShotCampaign = {
  id: 'oneshot-the-help-desk',
  type: 'oneshot',
  title: 'The Help Desk',
  tagline: 'Have you tried turning your soul off and on again?',
  tone: 'comedic',
  themes: ['comedy', 'urban', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Arcane Assistance Hotline operates out of a wizard\'s tower in downtown Waterdeep. When spells go wrong, magical accidents happen, or enchantments behave unexpectedly, people call the Hotline. The party has been hired as temp workers for the busiest shift of the year: the day after the annual Mage\'s Festival, when every amateur caster in the city tried something they should not have. The sending stones will not stop ringing.',
  hook: 'The party arrives for the night shift. The previous team left in tears. The call queue has 47 active cases. The first caller is a sorcerer who accidentally turned himself inside out. He is very polite about it. He would just like to be the right way around again, please, if it is not too much trouble. His organs are cold.',
  twist:
    'One of the callers - a seemingly mundane case about a flickering light enchantment - is actually a trapped archmage who has been polymorphed into a sending stone by a rival. Every call the party takes is unknowingly routed through him. He has been trying to communicate his situation through the static between calls. The flickering lights are his SOS.',
  climax:
    'The party realizes the sending stone network itself is the trapped archmage. They must solve his case while still handling the queue (the callers do not stop). The final challenge: a ritual to free the archmage that requires information from three different callers who all think they are calling about unrelated problems. The party must connect the dots across multiple active calls simultaneously.',
  scenes: [
    {
      title: 'Scene 1: The Queue',
      summary:
        'The shift begins. Calls come in rapid succession. The party must triage and solve magical emergencies with limited resources and no training manual.',
      challenge: 'puzzle',
      keyEvents: [
        'Call 1: sorcerer turned inside out. Solution requires talking him through a reversal cantrip. He does not have hands.',
        'Call 2: warlock whose patron is ghosting him. The patron answers mid-call. It is awkward.',
        'Call 3: bard with legal problems because his Vicious Mockery is factually accurate and people are suing',
        'Strange static between calls - a voice whispers "help me" but nobody takes it seriously',
      ],
    },
    {
      title: 'Scene 2: Escalations',
      summary:
        'The calls get weirder. A wizard\'s familiar has unionized. A necromancer\'s undead are filing workplace complaints. The static gets louder. Something is very wrong with the sending stone network.',
      challenge: 'social',
      keyEvents: [
        'Call: a wizard\'s cat familiar has organized the other familiars into a collective. They have demands.',
        'Call: a cleric accidentally blessed an entire lake and now the fish are sentient and angry',
        'The sending stones start glitching - calls cross, information bleeds between conversations',
        'The flickering light case: the party notices the pattern is Morse code for "I AM TRAPPED"',
      ],
    },
    {
      title: 'Scene 3: The Emergency Patch',
      summary:
        'The party discovers the trapped archmage and must free him using information scattered across multiple active calls. All while the queue keeps growing.',
      challenge: 'puzzle',
      keyEvents: [
        'Realization: the sending stone network IS the archmage, polymorphed by a rival',
        'Three callers hold pieces of the solution without knowing it - the party must connect them',
        'The freed archmage erupts from the sending stone in a shower of magical static',
        'The queue clears itself when the archmage stabilizes the network. All pending calls resolve instantly.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Thurston (the inside-out sorcerer)',
      role: 'caller / comic relief',
      personality:
        'Extremely polite despite being inside out. Apologizes constantly. "I am so sorry to bother you. I know this is unusual. It is just that I can see my own spleen and it is distracting."',
    },
    {
      name: 'Gelvaris (the trapped archmage)',
      role: 'hidden quest target',
      personality:
        'An archmage trapped as a sending stone for six months. He is sane but extremely frustrated. He has been listening to every call for half a year. He knows everyone\'s problems. "I have heard every magical complaint in this city. I know things about people. Terrible things."',
      secret: 'He was trapped by his own apprentice, who stole his tower and his identity.',
    },
    {
      name: 'Bernice',
      role: 'supervisor',
      personality:
        'The Hotline supervisor. A tiefling who has worked here for twenty years and is immune to surprise. She drinks tea through every crisis. "Inside out? That is a Tuesday. Call me when someone inverts gravity."',
    },
  ],
  keyLocations: [
    {
      name: 'The Arcane Assistance Hotline Office',
      description: 'A cramped room in a wizard\'s tower filled with sending stones, reference manuals, and the lingering despair of previous shifts. The coffee pot is enchanted to never run out. The coffee is still terrible.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Sending Stone Array',
      description: 'A wall of linked sending stones that routes calls to operators. It hums, crackles, and occasionally whispers. That last part is new.',
      significance: 'Contains the trapped archmage and is the central puzzle.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'magicalAccident',
    'riddleGenerator',
    'randomNpcOffer',
    'plotTwistEngine',
  ],
};
