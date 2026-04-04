import type { OneShotCampaign } from '../types';

export const graveyardShift: OneShotCampaign = {
  id: 'oneshot-graveyard-shift',
  type: 'oneshot',
  title: 'Graveyard Shift',
  tagline: 'Night 1 on the job. The dead are restless. Your manager is worse.',
  tone: 'comedic',
  themes: ['comedy', 'horror', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 3,
  settingSummary:
    'The party has been hired as night-shift security at the Eternal Rest Cemetery. The pay is terrible, the training is nonexistent, and their manager — a necromancer who swears he\'s reformed — left a sticky note saying "Don\'t let anything out." Within the first hour, three graves open, a ghost demands to speak to a manager, and the party realizes the cemetery is built on a ley line nexus that makes the dead very, very chatty.',
  hook: 'First day on the job. The previous night crew quit (all of them, at once, mid-shift). The party gets a 5-minute orientation video (a crystal ball recording from the 1400s), a set of keys, and a pamphlet titled "So Your Workplace Has Undead."',
  twist:
    'The "reformed" necromancer manager has been running a side business: selling burial plots to living customers with the promise of "guaranteed afterlife amenities." The dead are rioting because the amenities (eternal rest, quiet neighbors, scenic views) were never delivered. It\'s a class-action haunting.',
  climax:
    'The undead file a formal complaint (via ghost lawyer) and threaten to march on the city. The party must mediate between the angry dead, the scam-artist manager, and the city officials who show up at dawn. Resolution: fix the amenities, refund the dead (how?), expose the scam, or help the dead unionize.',
  scenes: [
    {
      title: 'Scene 1: Orientation',
      summary:
        'First hour on the job. The party gets the worst training in history, explores the cemetery, and the first graves start popping open.',
      challenge: 'exploration',
      keyEvents: [
        'The orientation crystal ball — 600 years old, barely legible, deeply unhelpful',
        'Cemetery exploration — section A (quiet), section B (slightly vibrating), section C (screaming)',
        'First emergence: a ghost in a nightgown demands to see the manager about the noise',
        'Second emergence: a skeleton crawls out, looks around, says "This isn\'t what I paid for"',
      ],
    },
    {
      title: 'Scene 2: The Complaints Department',
      summary:
        'The dead are organizing. A ghost lawyer arrives. The party must manage a supernatural customer service crisis while keeping the undead inside the cemetery walls.',
      challenge: 'social',
      keyEvents: [
        'Ghost lawyer presents the complaint — itemized list of broken promises',
        'The cemetery amenities: "scenic views" (of a wall), "quiet neighbors" (next to a highway), "premium caskets" (painted pine)',
        'A zombie work crew shows up to fix things — they mean well but they\'re zombies',
        'The undead threaten to march on the city at dawn if demands aren\'t met',
      ],
    },
    {
      title: 'Scene 3: The Night Manager Returns',
      summary:
        'The necromancer manager shows up, the full scam is revealed, and the party must resolve the crisis before dawn brings the city guard.',
      challenge: 'social',
      keyEvents: [
        'The manager arrives — tries to charm his way out, fails spectacularly',
        'His books are examined — he\'s been collecting payment for 200 years of false promises',
        'Dawn approaches — city officials are coming, and 300 undead are ready to march',
        'Resolution: mediation, exposure, union formation, or one very apologetic necromancer',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Vance Hollowmore',
      role: 'manager / con artist',
      personality:
        'A necromancer who insists he\'s "in facilities management now." Sleazy, charming, genuinely believes he\'s done nothing wrong because "technically, they ARE resting eternally."',
      secret: 'He\'s spent all the funeral money on a timeshare in the Feywild.',
    },
    {
      name: 'Bartholomew Graves, Esq.',
      role: 'ghost lawyer',
      personality:
        'A ghost who was a lawyer in life and is somehow more annoying in death. Speaks entirely in legal jargon. Has been waiting 50 years to file this complaint.',
    },
    {
      name: 'Mildred',
      role: 'angry customer / unexpected ally',
      personality:
        'A ghost grandmother who is furious about the false advertising but also keeps trying to feed the party. "You look thin. Have some spectral pie. NOW SIT DOWN AND FIX THIS."',
    },
  ],
  keyLocations: [
    {
      name: 'Eternal Rest Cemetery',
      description:
        'A poorly maintained graveyard with sections A through F. Each section is increasingly chaotic. Section F is just a hole with a sign.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Security Booth',
      description:
        'A shack with a broken crystal ball, a logbook full of increasingly desperate entries from previous crews, and a mini fridge with suspicious contents.',
      significance: 'The party\'s base of operations.',
    },
    {
      name: 'The Manager\'s Office',
      description:
        'A hidden underground office with fraudulent paperwork, a Feywild timeshare brochure, and 200 years of creative accounting.',
      significance: 'Where the scam is exposed.',
    },
  ],
  dataSystems: [
    'hauntedLocation',
    'socialEncounter',
    'npcBackstoryGen',
    'questRewardNegotiation',
    'secretSociety',
    'nobleScandalGen',
  ],
};
