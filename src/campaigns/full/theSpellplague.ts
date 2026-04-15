import type { FullCampaign } from '../types';

export const theSpellplague: FullCampaign = {
  id: 'full-the-spellplague',
  type: 'full',
  title: 'The Spellplague',
  tagline: 'Magic is cheap. Addiction is cheaper. Godhood lasts sixty seconds and costs everything.',
  tone: 'horror',
  themes: ['dark_fantasy', 'horror', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The city of Ashenmere runs on magic the way other cities run on water. Enchanted streetlights. Spell-woven textiles. Arcane heating in every tenement. When magic is this available, it becomes a commodity - and then a vice. Spell-addiction has been a problem for decades: cantrip inhalers, enchantment patches, illusion dens where people live in someone else\'s memories. The authorities tolerate it. The economy depends on it. But now there is something new on the streets: Spark. One dose gives the user godlike power for sixty seconds - ninth-level casting, reality warping, genuine divine sensation. Then it burns out their ability to cast forever. One hit. Sixty seconds of omnipotence. A lifetime without magic in a city that runs on it.',
  hook: 'A Spark user walks into the Greymist Market and, for sixty seconds, reshapes three city blocks into a crystal garden of impossible beauty. Then she collapses, magic-dead, weeping. The crystal garden is permanent. The Arcane Authority hires the party: "Find where Spark comes from. Find who makes it. Shut it down before someone uses their sixty seconds to level the city instead of beautifying it."',
  twist:
    'Spark is not manufactured. It is not alchemical, not arcane, not a potion. It is divine essence leaking from a cracked vessel. Centuries ago, the god Luminar - deity of inspiration and creative fire - died in Ashenmere. The priesthood sealed the divine remains in a vessel beneath the city. That vessel has cracked. Luminar\'s power is bleeding into the groundwater, concentrating in the aquifers, and bubbling up in the spell dens of the lower city. Every Spark user is not taking a drug - they are consuming a fragment of a dead god\'s memories. The sixty seconds of godhood are Luminar\'s final moments, relived.',
  climax:
    'The vessel is failing. If it breaks completely, Luminar\'s unfiltered divine power floods Ashenmere - turning the entire city into a sixty-second god and then burning out every magic user within its walls. The party must reach the vessel beneath the city and make a choice: seal it permanently (cutting off the city\'s magic supply), channel the power safely (requiring a willing vessel - someone who accepts godhood and its burden), or let it break and evacuate as many people as possible.',
  acts: [
    {
      title: 'Act 1: The Streets',
      summary: 'Street-level investigation. The party follows Spark from users to dealers to distributors, navigating spell dens, corporate alchemy labs, and a black market that answers to the dead.',
      keyEvents: [
        'The crystal garden incident: the party witnesses Spark firsthand. Beauty and horror in sixty seconds.',
        'The spell dens: interviewing addicts. Each one remembers their sixty seconds differently - but they all describe the same face.',
        'The dealer chain: a lich named Silivren runs the black market. He does not make Spark - he bottles it.',
        'A Spark user goes wrong: sixty seconds of rage instead of beauty. Three blocks destroyed.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Source',
      summary: 'Following the supply to its origin. The party discovers the cracked vessel, the dead god, and the truth that Spark is not a drug but a divine hemorrhage.',
      keyEvents: [
        'Silivren\'s confession: he found the source decades ago. He has been bottling it because "someone would have found it eventually."',
        'The descent: beneath Ashenmere, through ancient temple foundations, to the sealed vessel',
        'The vessel: cracked, leaking light that smells like every beautiful thing at once. Luminar\'s face visible through the fractures.',
        'The memories: touching the vessel shows the party Luminar\'s death. The god did not die fighting. The god died creating.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Vessel',
      summary: 'The crack widens. The party must act before Ashenmere becomes a sixty-second god and a permanent ruin.',
      keyEvents: [
        'The countdown: the vessel pulses. Spark floods the streets unbottled. Random citizens experience godhood.',
        'Evacuation begins: the Arcane Authority panics. The party must organize the city\'s retreat.',
        'The choice: seal the vessel, find a new vessel, or let the god die properly at last',
        'The aftermath: Ashenmere survives - changed. The party carries Luminar\'s last memory.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Silivren',
      role: 'lich / black market king',
      personality: 'An ancient elf who became undead to pursue infinite study. He bottles and sells Spark not for profit but for research. He wants to understand divine essence. He is not evil - just profoundly indifferent to the damage his curiosity causes.',
      secret: 'He has been trying to reassemble Luminar from the fragments. He has failed forty-seven times.',
    },
    {
      name: 'Inspector Maren Ashveil',
      role: 'arcane authority / employer',
      personality: 'A human detective who investigates magical crime. Burned out, underfunded, and terrified of what Spark represents. She quit using cantrip inhalers three years ago. She understands addiction.',
    },
    {
      name: 'Luminar (dead god)',
      role: 'the source / the tragedy',
      personality: 'Present only as fragments: the light in the vessel, the memories in the Spark, the face behind closed eyes. Luminar was a god of creation and inspiration. The divine essence is not malicious. It is art without an artist - beauty without intent, leaking into a world that cannot contain it.',
    },
    {
      name: 'Desta',
      role: 'Spark survivor / guide',
      personality: 'A young tiefling artist who used Spark once. Her sixty seconds produced a mural that makes people weep. She cannot cast a cantrip anymore. She does not regret it. "I held a god\'s paintbrush. Everything after is footnotes."',
    },
  ],
  keyLocations: [
    { name: 'Ashenmere', description: 'A city that runs on magic like others run on coal. Enchanted infrastructure, spell-woven industry, and an addiction crisis that glows in the dark.', significance: 'The entire campaign setting. Every district reflects a different aspect of magical dependence.' },
    { name: 'The Undercity', description: 'Ancient temple foundations beneath modern Ashenmere. Spell dens, black market tunnels, and the sealed chamber where a dead god leaks through cracked stone.', significance: 'Where the investigation leads and where the truth is buried.' },
    { name: 'The Vessel', description: 'A sealed chamber deep beneath the city containing the remains of Luminar. The vessel is cracked. Light pours through the fractures. The air tastes like inspiration.', significance: 'The campaign\'s final arena and the site of the ultimate choice.' },
  ],
  dataSystems: ['hauntedLocation', 'magicalAnomaly', 'socialEncounter', 'npcRelationshipWeb', 'npcLoyalty', 'randomNpcSecret2', 'curseLayered', 'wildMagicExpanded', 'dreamCombat'],
};
