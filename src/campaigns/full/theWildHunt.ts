import type { FullCampaign } from '../types';

export const theWildHunt: FullCampaign = {
  id: 'full-wild-hunt',
  type: 'full',
  title: 'The Wild Hunt',
  tagline: 'They gave you a head start. They shouldn\'t have.',
  tone: 'survival',
  themes: ['wilderness', 'survival', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 12,
  settingSummary:
    'The Feywild\'s Wild Hunt rides every century — a fey lord and his spectral hounds chase mortal prey through enchanted forests where the rules of reality are suggestions. The party has been "honored" as this century\'s quarry. They have a three-day head start in a forest that rearranges itself, and the Hunt never fails to catch its prey. Until now.',
  hook: 'The party wakes in a moonlit clearing wearing antler crowns they can\'t remove. A voice announces they have been chosen for the Hunt and grants them three days\' grace. The forest around them is not the forest they entered. Something howls in the distance.',
  twist:
    'The Hunt is not meant to kill — it\'s meant to test. Every century, the Wild Hunt selects mortals with the potential to become archfey. Those who survive the full Hunt are offered a place in the fey court. Those who turn and fight earn the greatest honor. The catch: accepting means never returning to the mortal world.',
  climax:
    'The final night. The Huntmaster catches up. The party can flee (escape the Feywild but the Hunt continues next century), fight the Huntmaster (winning earns the right to challenge him for his title), or accept the fey bargain (become archfey, lose their mortal lives). Or find the secret fourth option — rewrite the rules of the Hunt itself.',
  acts: [
    {
      title: 'Act 1: The Head Start',
      summary:
        'Three days to prepare. The forest is alive, hostile, and rearranging. The party must find shelter, resources, and allies among the fey creatures who inhabit the woods — some of whom have their own reasons for helping or hindering the prey.',
      keyEvents: [
        'The antler crowns — cannot be removed, mark them as prey',
        'Day 1: the forest provides — food, water, shelter, all with a price',
        'Day 2: a pixie offers help in exchange for a memory',
        'Day 3: the horns sound — the Hunt begins',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Chase',
      summary:
        'The Hunt is on. The Huntmaster sends hounds, then hunters, then himself — each wave harder than the last. The party must use the forest\'s tricks against the Hunt while surviving fey encounters.',
      keyEvents: [
        'First hound pack — spectral wolves that track by emotion, not scent',
        'A fey safe haven — but the host demands entertainment (perform or perish)',
        'Hunter wave — elite fey riders who relish the sport',
        'The forest offers a shortcut — through the Nightmare Glade',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Reckoning',
      summary:
        'The party reaches the Heart of the Forest where the Hunt must end. The Huntmaster reveals the true purpose. Choices are made.',
      keyEvents: [
        'The Heart of the Forest — where time and space fold',
        'The Huntmaster arrives — not hostile, impressed',
        'The offer: join the fey court, fight for the title, or escape',
        'The secret option: the antler crowns have power — use them to rewrite the Hunt',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Lord Oberon the Undying',
      role: 'Huntmaster / eventual ally or enemy',
      personality:
        'Ancient, formal, genuinely respectful of worthy prey. He has done this for millennia and is, frankly, bored. Desperately wants the party to surprise him.',
      secret: 'He\'s been Huntmaster so long he\'s forgotten his mortal name. He wants someone to beat him so he can finally rest.',
    },
    {
      name: 'Briar',
      role: 'reluctant ally',
      personality:
        'A dryad who was prey in the last Hunt and survived by hiding for a century. She\'s still in the forest, terrified, angry, and extremely resourceful.',
      secret: 'She was offered the archfey bargain and refused out of fear. She regrets it every day.',
    },
    {
      name: 'Puck',
      role: 'trickster / unpredictable',
      personality:
        'A fey who bets on the Hunt\'s outcome. He\'s placed a large wager on the party surviving. He\'ll help — but only in ways that are entertaining.',
    },
  ],
  keyLocations: [
    {
      name: 'The Whispering Wood',
      description:
        'A vast fey forest where trees whisper secrets, paths rearrange, and time flows at different speeds in different clearings.',
      significance: 'The entire Hunt takes place in this forest.',
    },
    {
      name: 'The Nightmare Glade',
      description:
        'A corruption in the forest where fears manifest physically. Shortcut but psychologically devastating.',
      significance: 'Optional but dangerous shortcut.',
    },
    {
      name: 'The Heart of the Forest',
      description:
        'An ancient clearing where all paths converge. Time stands still. The oldest tree in the Feywild grows here.',
      significance: 'Where the Hunt must end — one way or another.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'enchantedForest',
    'chaseSequence',
    'weatherProgression',
    'darkBargain',
    'dreamSequence',
    'travelEncounters',
    'partyMoraleTracker',
    'encounterWaves',
  ],
};
