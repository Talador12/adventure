import type { OneShotCampaign } from '../types';

export const eightLeggedFreaks: OneShotCampaign = {
  id: 'oneshot-eight-legged-freaks',
  type: 'oneshot',
  title: 'Eight-Legged Freaks',
  tagline: 'You are a spider. The tavern is your kingdom. The cat is a kaiju. The health inspector must be stopped at all costs.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'survival'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 3,
  settingSummary:
    'The Drunken Flagon is the finest tavern in the realm — if you are a spider. The rafters are a highway system. The cobwebs in the corners are rent-controlled apartments. The bartender, Big Greg, is a benevolent god who drops crumbs and never looks up. The mice are a rival civilization occupying the walls. The cat, Mr. Whiskers, is a natural disaster that patrols the lower levels with the indifference of a passing hurricane. And the adventurers who drink below? Unpredictable kaiju who slam their fists on tables and cause web-quakes. Life is good. Until the health inspector arrives.',
  hook: 'A creature the size of a mountain (a human in a coat) walks in and starts LOOKING AT THE COBWEBS. Looking at them with INTENT. He has a clipboard. He is writing things down. Big Greg is sweating. The spiders convene an emergency council in the northeast rafter junction. This is not a drill. The Infestation Eradication Protocol has been invoked. Save the tavern. Save the webs. Save the species.',
  twist:
    'The health inspector is an awakened rat in a trenchcoat standing on two other rats. He is not here for health and safety. He is here to clear the spiders so the mice can expand their territory into the rafters. The clipboard is fake. The badge is stolen. This is a hostile takeover disguised as municipal bureaucracy.',
  climax:
    'The trenchcoat falls open during the confrontation, revealing three rats in a stack. Big Greg screams. The adventurers below flip a table. Mr. Whiskers wakes up. Total chaos. The spiders must rally every ally in the tavern — the friendly cockroach union, the neutral centipede mercenaries, and Big Greg himself — to repel the rat invasion while avoiding Mr. Whiskers, who does not discriminate between factions and will eat anything smaller than his head.',
  scenes: [
    {
      title: 'Scene 1: The Inspection',
      summary: 'The health inspector arrives and begins cataloging "infestations." The spider council convenes. The party must gather intelligence on this threat without being seen.',
      challenge: 'exploration',
      keyEvents: [
        'Emergency rafter council: "Fellow arachnids, we face an existential threat to our way of life"',
        'Recon mission: crawl along the ceiling to observe the inspector. He is suspiciously interested in the walls.',
        'The inspector\'s coat moves wrong. Something is underneath it that has more legs than a human should.',
        'Big Greg offers the inspector a drink. The inspector\'s hand comes out of the wrong sleeve.',
      ],
    },
    {
      title: 'Scene 2: The Intelligence War',
      summary: 'The party infiltrates the mouse territory in the walls to learn the truth. Everything is at mouse scale: tiny furniture, tiny maps, tiny propaganda posters about spider oppression.',
      challenge: 'social',
      keyEvents: [
        'Wall infiltration: squeezing through cracks into the mouse district. They have a government.',
        'Discovery: war room with maps of the rafters marked "Phase 2: Expansion"',
        'Interrogation of a captured mouse scout. He cracks immediately because spiders are terrifying.',
        'The truth revealed: the inspector is three rats. The mice hired mercenaries. This is a coup.',
      ],
    },
    {
      title: 'Scene 3: The Battle of the Drunken Flagon',
      summary: 'All-out war between the spider confederacy and the rat-mouse alliance. The tavern is the battlefield. The patrons are environmental hazards. Mr. Whiskers is the meteor.',
      challenge: 'combat',
      keyEvents: [
        'The trenchcoat opens: three rats tumble out. Big Greg drops a plate.',
        'The mouse army pours from the walls. The cockroach union honorably joins the spider side.',
        'Web catapults launch sticky ordinance from the rafters. The rats deploy cheese-based chemical warfare.',
        'Mr. Whiskers enters the fray — a kaiju-scale natural disaster that eats combatants from both sides indiscriminately',
        'Victory condition: survive the cat, defeat the rats, and convince Big Greg the tavern is fine actually',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elder Spinneret', role: 'spider council leader / quest giver', personality: 'An ancient orb weaver the size of a coin who speaks with the gravity of a king. Every decision is a constitutional crisis. Every web is sacred architecture. Melodramatic about everything but genuinely cares about her people.' },
    { name: 'Big Greg', role: 'god / bartender', personality: 'A large, sweaty human who has no idea his tavern has a functioning multi-species government in the walls. Drops crumbs like divine blessings. The spiders worship him. He would scream if he knew.' },
    { name: 'Mr. Whiskers', role: 'environmental hazard / kaiju', personality: 'A fat orange cat who exists in a permanent state of sleepy hostility. Does not take sides. Does not show mercy. Occasionally bats a combatant across the room for entertainment. Cannot be reasoned with.' },
    { name: 'Inspector Ratsworth', role: 'antagonist / three rats', personality: 'Three rats in a trenchcoat attempting to impersonate a human bureaucrat. The top rat does the talking. The middle rat does the walking. The bottom rat is having a panic attack.' },
  ],
  keyLocations: [
    { name: 'The Rafters', description: 'A highway of beams and cobwebs. The spider civilization\'s homeland. Traffic flows in organized lanes. There are neighborhoods.', significance: 'The spider territory under threat. Home base and defensive position.' },
    { name: 'The Walls', description: 'Mouse territory. Tunnels, chambers, and a surprisingly organized municipal government with tiny desks.', significance: 'Enemy headquarters. Where the invasion was planned.' },
    { name: 'The Main Floor', description: 'A terrifying expanse of stomping boots, sloshing drinks, and Mr. Whiskers. The no-man\'s-land between civilizations.', significance: 'The battlefield. A death zone for anything smaller than a fist.' },
  ],
  dataSystems: ['encounterWaves', 'trapCorridor', 'chaseSequence', 'socialEncounter'],
};
