import type { FullCampaign } from '../types';

export const theSpellplague: FullCampaign = {
  id: 'full-the-spellplague',
  type: 'full',
  title: 'The Spellplague',
  tagline: 'She held a god\'s power for sixty seconds. She has been silent for sixty days.',
  tone: 'horror',
  themes: ['dark_fantasy', 'horror', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The city of Ashenmere runs on magic the way other cities run on water. Enchanted streetlights. Spell-woven textiles. Arcane heating in every tenement. When magic is this available, it becomes a commodity - and then a vice. Spell-addiction has been a problem for decades: cantrip inhalers, enchantment patches, illusion dens where people live in someone else\'s memories. The authorities tolerate it. The economy depends on it. But now there is something new on the streets: Spark. One dose gives the user godlike power for sixty seconds - ninth-level casting, reality warping, genuine divine sensation. Then it burns out their ability to cast forever. One hit. Sixty seconds of omnipotence. A lifetime without magic in a city that runs on it.',
  hook: 'A Spark user walks into the Greymist Market and, for sixty seconds, reshapes three city blocks into a crystal garden of impossible beauty. Then she collapses, magic-dead, weeping. The crystal garden is permanent. Nobody can dispel it. It smells like lightning and grief. The Arcane Authority hires the party: "Find where Spark comes from. Find who makes it. Shut it down before someone uses their sixty seconds to level the city instead of beautifying it."',
  twist:
    'Spark is not manufactured. It is not alchemical, not arcane, not a potion. It is divine essence leaking from a cracked vessel. Centuries ago, the god Luminar - deity of inspiration and creative fire - died in Ashenmere. The priesthood sealed the divine remains in a vessel beneath the city. That vessel has cracked. Luminar\'s power is bleeding into the groundwater, concentrating in the aquifers, and bubbling up in the spell dens of the lower city. Every Spark user is not taking a drug - they are consuming a fragment of a dead god\'s final memories. The sixty seconds of godhood are Luminar\'s last moments, relived. Every user sees the same face. Every user weeps for a reason they cannot explain.',
  climax:
    'The vessel is failing. If it breaks completely, Luminar\'s unfiltered divine power floods Ashenmere - turning the entire city into a sixty-second god and then burning out every magic user within its walls. The party must reach the vessel beneath the city and make a choice: seal it permanently (cutting off the city\'s magic supply and condemning Ashenmere to mundanity), channel the power safely (requiring a willing vessel - someone who accepts godhood and its burden of experiencing Luminar\'s death forever), or let it break and evacuate as many people as possible.',
  acts: [
    {
      title: 'Act 1: The Streets',
      summary:
        'Street-level investigation. The party follows Spark from users to dealers to distributors, navigating spell dens, corporate alchemy labs, and a black market that answers to the dead. The wrongness starts small - a cantrip that flickers, a streetlight that hums in a frequency that hurts teeth.',
      keyEvents: [
        'The crystal garden incident: the party witnesses Spark firsthand. Beauty and horror in sixty seconds. The woman\'s eyes glow gold, then go dark. She touches her hands and whispers "I cannot feel it anymore."',
        'The spell dens: interviewing addicts. They scratch at their arms where the magic used to sit. Each one remembers their sixty seconds differently - but they all describe the same face. A face made of light, weeping.',
        'The dealer chain: a lich named Silivren runs the black market. He does not make Spark - he bottles it. His hands shake when he handles the vials. He has never used it himself. When asked why, he looks away.',
        'A Spark user goes wrong: sixty seconds of rage instead of beauty. Three blocks destroyed. The survivor sits in the rubble whispering "I am sorry" to someone who is not there.',
        'Quiet dread: the party caster feels their magic stutter. For one heartbeat, every spell in Ashenmere stops working. Then it comes back. Nobody official acknowledges it happened.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Source',
      summary:
        'Following the supply to its origin. The party discovers the cracked vessel, the dead god, and the truth that Spark is not a drug but a divine hemorrhage. The deeper they go beneath the city, the warmer the air gets, and the more their magic feels like it is being watched.',
      keyEvents: [
        'Silivren\'s confession: he found the source decades ago. He has been bottling it because "someone would have found it eventually." He will not look at the vials directly. His undead hands still shake. "You do not understand. I FELT something down there. A dead god is not supposed to feel."',
        'The descent: beneath Ashenmere, through ancient temple foundations. The walls sweat with luminescent moisture. Spell components in the party\'s packs begin to glow without activation.',
        'The vessel: cracked, leaking light that smells like every beautiful thing at once - wet paint, fresh bread, a lover\'s hair, childhood. Luminar\'s face is visible through the fractures. The expression is not pain. It is the moment before a final brushstroke.',
        'The memories: touching the vessel shows the party Luminar\'s death. The god did not die fighting. The god died creating - pouring everything into one last work of art that nobody would ever see. The sixty seconds of Spark ARE that final creation, fractured into doses.',
        'The moment of understanding: Spark addicts are not chasing power. They are experiencing a dead god\'s last act of creation. They weep because Luminar wept. They lose their magic because Luminar spent everything.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Vessel',
      summary:
        'The crack widens. The party must act before Ashenmere becomes a sixty-second god and a permanent ruin. The city above shakes. The lights flicker gold. People who have never touched Spark start hearing music that is not there.',
      keyEvents: [
        'The countdown: the vessel pulses. Spark floods the streets unbottled. Random citizens experience involuntary godhood. A baker reshapes his shop into a cathedral of bread. A child makes her drawing of a horse real. It is beautiful. It is terrifying. They lose their magic forever.',
        'Evacuation begins: the Arcane Authority panics. The party must organize the city\'s retreat while magic becomes increasingly unreliable.',
        'The choice: seal the vessel (the city loses its magic supply), find a new vessel (someone must accept a dead god\'s final moment on loop forever), or let the god die properly at last (the magic floods and fades, but Ashenmere survives changed)',
        'The aftermath: Ashenmere survives - changed. The party carries Luminar\'s last memory. Those who touched the vessel can still smell wet paint when they close their eyes.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Silivren',
      role: 'lich / black market king',
      personality:
        'An ancient elf who became undead to pursue infinite study. He bottles and sells Spark not for profit but for research. He is not evil - just profoundly indifferent to the damage his curiosity causes. He speaks in long, precise sentences and never uses contractions. His hands have not stopped shaking since he found the vessel. He claims it is a calibration issue with his phylactery. It is not.',
      secret: 'He has been trying to reassemble Luminar from the fragments. He has failed forty-seven times. Each failure destroyed a piece of the god he will never recover.',
    },
    {
      name: 'Inspector Maren Ashveil',
      role: 'arcane authority / employer',
      personality:
        'A human detective who investigates magical crime. Burned out, underfunded, and terrified of what Spark represents. She quit using cantrip inhalers three years ago. She still keeps one in her coat pocket. She touches it when she is stressed, which is always. Her reports are meticulous. Her hands are not.',
    },
    {
      name: 'Luminar (dead god)',
      role: 'the source / the tragedy',
      personality:
        'Present only as fragments: the light in the vessel, the memories in the Spark, the face behind closed eyes. Luminar was a god of creation and inspiration. The divine essence is not malicious. It is art without an artist - beauty without intent, leaking into a world that cannot contain it. Those who touch the vessel hear a single whispered phrase: "It is not finished."',
    },
    {
      name: 'Desta',
      role: 'Spark survivor / guide',
      personality:
        'A young tiefling artist who used Spark once. Her sixty seconds produced a mural that makes people weep. She cannot cast a cantrip anymore. She paints with mundane pigments now, and her hands move differently - slower, more deliberate, as if mourning the speed she lost. She does not regret it. "I held a god\'s paintbrush. Everything after is footnotes." She cries when she says it. She does not notice.',
    },
  ],
  keyLocations: [
    {
      name: 'Ashenmere',
      description: 'A city that runs on magic like others run on coal. Enchanted infrastructure, spell-woven industry, and an addiction crisis that glows in the dark. The streetlights have been flickering gold lately. Nobody wants to say why.',
      significance: 'The entire campaign setting. Every district reflects a different aspect of magical dependence.',
    },
    {
      name: 'The Undercity',
      description: 'Ancient temple foundations beneath modern Ashenmere. Spell dens, black market tunnels, and the sealed chamber where a dead god leaks through cracked stone. The deeper you go, the more the walls weep light.',
      significance: 'Where the investigation leads and where the truth is buried.',
    },
    {
      name: 'The Vessel',
      description: 'A sealed chamber deep beneath the city containing the remains of Luminar. The vessel is cracked. Light pours through the fractures in colors that do not exist in nature. The air tastes like inspiration. Standing near it makes you want to create something and weep that you cannot create enough.',
      significance: 'The campaign\'s final arena and the site of the ultimate choice.',
    },
  ],
  dataSystems: ['hauntedLocation', 'magicalAnomaly', 'socialEncounter', 'npcRelationshipWeb', 'npcLoyalty', 'randomNpcSecret2', 'curseLayered', 'wildMagicExpanded', 'dreamCombat'],
};
