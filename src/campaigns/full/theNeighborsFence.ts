import type { FullCampaign } from '../types';

export const theNeighborsFence: FullCampaign = {
  id: 'full-the-neighbors-fence',
  type: 'full',
  title: 'The Neighbor\'s Fence',
  tagline: 'His fence is on fire. Her mailbox is a portal to hell. The HOA has had enough.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 9 },
  estimatedSessions: 12,
  settingSummary:
    'Willowbrook Lane is a quiet residential street in the city of Tambril. It was quiet, anyway, until wizards Aldric Greenmantle and Pethra Ironveil moved in across from each other forty years ago. What began as a disagreement over a property line has escalated into an arcane arms race that has turned one city block into a magical superfund site. Aldric\'s fence is a wall of elemental fire. Pethra\'s mailbox is a functioning portal to the Abyss (she gets her mail from a very confused imp). His lawn gnomes are real gnomes - bound, enslaved, and filing formal complaints with the city. Her rose garden grows teeth. The block association has sent twelve mediators. None returned unchanged.',
  hook: 'The Tambril Municipal Board of Arcane Compliance hires the party as the thirteenth mediation team. The previous twelve either fled, were polymorphed, or switched careers entirely. The pay is excellent. The hazard bonus is larger. The briefing includes a map of known magical hazards on the block, a liability waiver seven pages long, and a note from Mediator #8 that just says "DO NOT TOUCH THE BIRDBATH." The party must get both wizards to disarm their enchantments, resolve the property dispute, and restore the block to livability. The block association president is a very tired halfling named Mrs. Kettleburn who has not slept in three years.',
  twist:
    'Aldric and Pethra are in love. They have been in love for forty years. Neither will admit it. The escalating magical one-upmanship is not hostility - it is the most elaborate, dangerous, and property-value-destroying courtship ritual in the history of arcane romance. Every enchantment is a love letter. The wall of fire appeared after Pethra complimented Aldric\'s cooking. The Abyssal mailbox appeared after Aldric called her garden "adequate." The party is not mediating a feud. They are chaperoning a date between two emotionally stunted wizards who express affection through competitive property destruction.',
  climax:
    'The party, having figured out the truth, must get these two stubborn, brilliant, terrified-of-vulnerability wizards to admit their feelings before the magical buildup reaches critical mass and flattens the neighborhood. The options: arrange a dinner that forces them into proximity without enchantments (social), trick them into cooperating on a shared magical project (heist-adjacent), or just lock them in a room and let Mrs. Kettleburn yell at them until they confess (surprisingly effective). The block association wants peace. The gnomes want freedom. The imp wants a raise. Love finds a way, probably through a wall of fire.',
  acts: [
    {
      title: 'Act 1: Damage Assessment',
      summary:
        'The party surveys the disaster zone that is Willowbrook Lane. They meet both wizards, survive the enchantments, free some gnomes, and begin to realize the "feud" has a weird energy. Aldric insults Pethra\'s tower and then asks the party, casually, if she mentioned him.',
      keyEvents: [
        'The briefing: Mrs. Kettleburn\'s thousand-yard stare, the seven-page waiver, and the map of known hazards',
        'Aldric\'s property: fire fence, enslaved gnomes, a greenhouse that grows only things Pethra once mentioned liking. Running gag begins: Gerald the gnome files a new formal grievance every time the party visits. The stack of grievances becomes a physical hazard by Act 3.',
        'Pethra\'s property: Abyssal mailbox, tooth roses, a tower one foot taller than Aldric\'s with a window aimed at his kitchen',
        'The gnomes file a formal grievance with the party. They have a union rep. His name is Gerald.',
        'First mediation attempt: both wizards attend. Both insult each other. Both ask the party afterward what the other said about them.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Pattern',
      summary:
        'The party investigates the history of the feud and discovers it is actually a courtship. Every escalation maps to a compliment, a gesture, or a moment of vulnerability. The party must navigate the enchantments (which are getting worse) while figuring out how to make two brilliant idiots admit they like each other.',
      keyEvents: [
        'The timeline: Aldric built the fire fence the day after Pethra brought him soup when he was sick',
        'Pethra opened the Abyssal portal after Aldric anonymously donated to her research fund. It was not anonymous.',
        'The gnomes confirm it: "He talks about her constantly. It is insufferable. Please free us."',
        'A new escalation: Aldric enchants his chimney to write her name in smoke. Then panics and changes it to a rude word.',
        'Mrs. Kettleburn, when told they are in love: "Oh, I KNOW. Everyone knows. THEY do not know. Fix it."',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Intervention',
      summary:
        'The magical buildup is reaching critical mass. If both wizards cast one more competitive enchantment, the block detonates. The party must orchestrate the world\'s most high-stakes confession before the neighborhood becomes a crater. The gnomes help. The imp helps. Mrs. Kettleburn brings a rolling pin.',
      keyEvents: [
        'The arcane compliance board issues an ultimatum: disenchant in 48 hours or face planar exile',
        'The party\'s plan: dinner, neutral ground, no wands. Getting both wizards to agree is harder than any dungeon.',
        'The dinner: awkward, tense, and interrupted by Gerald the gnome delivering a speech about emotional honesty',
        'Aldric casts one more enchantment - not competitive, but protective. A ward around Pethra\'s tower. She notices.',
        'The confession, the kiss, and the immediate explosive unraveling of forty years of spiteful enchantments (the party should run). Callback: Gerald files his final grievance — "Resolved: All Outstanding Complaints." He gets the afternoon off. He does not know what to do with it.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Aldric Greenmantle',
      role: 'wizard / hopeless romantic / fire hazard',
      personality:
        'A pompous, insecure, brilliant transmutation wizard who expresses every emotion through property enchantment. Terrible at feelings. Excellent at fire. His gnomes despise him. His cooking is actually wonderful.',
      secret: 'He has written forty years of unsent love letters to Pethra. They are in a fireproof box under his bed. The box is enchanted to resist his own attempts to burn them.',
    },
    {
      name: 'Pethra Ironveil',
      role: 'wizard / hopeless romantic / Abyssal menace',
      personality:
        'A sharp, proud, brilliant conjuration wizard who would rather open a portal to hell than admit she has a crush. Her tower faces his kitchen because she likes watching him cook. She will deny this under oath.',
      secret: 'She opened the Abyssal mailbox because she ran out of normal ways to escalate. The imp (Skrix) has become her confidant. He knows everything.',
    },
    {
      name: 'Mrs. Kettleburn',
      role: 'quest giver / block association president / force of nature',
      personality:
        'A halfling who has lived on Willowbrook Lane for fifty years and has endured forty of those years watching two wizards flirt via municipal code violations. She is DONE. Her patience ended a decade ago. She operates on pure exasperation now.',
    },
    {
      name: 'Gerald',
      role: 'gnome union representative / comic relief',
      personality:
        'A lawn gnome who was real before Aldric enchanted him into servitude. He has organized the other gnomes into a labor union. He files grievances daily. He is four inches tall and has the energy of a trial lawyer.',
    },
    {
      name: 'Skrix',
      role: 'imp / mail carrier / couples therapist',
      personality:
        'An imp who was accidentally summoned through Pethra\'s mailbox and now delivers her mail. He has heard everything. He ships Aldric and Pethra aggressively. He considers himself their relationship counselor.',
    },
  ],
  keyLocations: [
    {
      name: 'Willowbrook Lane',
      description: 'A residential street that looks like a wizard\'s duel frozen in suburban amber. Fire fences, tooth gardens, portal mailboxes, and one very tired block association.',
      significance: 'The entire campaign. Every enchantment is a clue to the real story underneath.',
    },
    {
      name: 'Aldric\'s House',
      description: 'A cottage fortified with elemental wards, enslaved gnomes, and a kitchen that smells incredible. The fire fence keeps people out. The cooking draws them in.',
      significance: 'One half of the battlefield. Also where the best meals in the city are prepared for an audience of one.',
    },
    {
      name: 'Pethra\'s Tower',
      description: 'A tower exactly one foot taller than Aldric\'s, with windows that happen to face his kitchen. The Abyssal mailbox is in front. The tooth roses are a deterrent. The imp is a feature.',
      significance: 'The other half. Every enchantment in this building is a response to something Aldric did, which was a response to something Pethra did, ad infinitum.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'trapMechanism',
    'npcRelationshipWeb',
    'urbanEncounter',
    'tavernEvent',
    'diplomaticNegotiation',
  ],
};
