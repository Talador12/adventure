import type { FullCampaign } from '../types';

export const cursedLootOnly: FullCampaign = {
  id: 'full-cursed-loot-only',
  type: 'full',
  title: 'Cursed Loot Only',
  tagline: 'Every piece of loot is cursed. Not dangerously. Just humiliatingly.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 12,
  settingSummary:
    'The Cursed Vaults of Malvorix the Petty stretch beneath the Thornwall Mountains. Malvorix was an archmage who was never invited to parties. He spent three centuries cursing every object he created - not to kill, but to embarrass. His vaults are legendary for their loot. What the legends leave out is that every single item carries a curse so inconvenient, so persistently annoying, that most adventurers abandon the gear within a week. The curses stack. They interact. By vault five, you are a walking disaster.',
  hook: 'A merchant hires the party to retrieve "the finest magical equipment in the realm" from the Cursed Vaults. He neglects to mention the cursed part. The first chest contains Boots of Flatulence (fart sounds with every step, audible to 60 feet), a Ring of Narration (loudly narrates everything the wearer does in third person), and a Helmet of Bird Attraction (pigeons, crows, and occasionally an eagle). The removal clause on each curse: complete the full vault delve. All five vaults. Wearing everything.',
  twist:
    'Malvorix is not dead. He is alive, watching through scrying pools, and he has been waiting centuries for someone to actually wear all his cursed items at once. The curses are not random - they are components. When enough curses stack on one group, they combine into something Malvorix designed on purpose: a Curse Singularity that transforms the bearers into his personal chaos agents, spreading petty inconvenience across the entire continent. He does not want power. He wants everyone else to be as annoyed as he was when they did not invite him to the Archmage Gala of 1247.',
  climax:
    'The party reaches the final vault dripping with stacked curses - boots farting, ring narrating, helmet covered in birds, sword apologizing, cloak that is always slightly damp, shield that insults anyone it blocks, and a dozen more. Malvorix appears in person, thrilled. The Curse Singularity begins activating. The party must either convince Malvorix to let go of his centuries-old grudge (social), break the singularity by voluntarily giving up all the loot (sacrifice), or out-curse Malvorix by turning his own items against him (the curses interact in ways even he did not predict). The boots and the ring together create a narrated fart symphony that shatters his concentration.',
  acts: [
    {
      title: 'Act 1: The Gift That Keeps On Giving',
      summary:
        'The party enters the first two vaults of Malvorix and accumulates their initial wave of cursed items. Each item is genuinely useful - powerful weapons, strong armor, excellent accessories - but every single one has a curse that makes life incrementally worse. The curses are annoying alone but start creating unexpected interactions when stacked.',
      keyEvents: [
        'Vault 1: Boots of Flatulence, Ring of Narration, Helmet of Bird Attraction, and a Sword That Apologizes to everything it cuts.',
        'First combat with curses active: the rogue tries to sneak in farting boots while the ring announces "SHE IS SNEAKING" at full volume.',
        'Vault 2: Cloak of Perpetual Dampness, Shield of Insults (berates anyone it blocks), Gauntlets of Butterfingers (drop held items on natural 1-3), Amulet of Inappropriate Laughter.',
        'The merchant who hired them is revealed to be a previous vault delver who got out - but his curse (Beard of Bees) is permanent because he left early.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Stacking Disasters',
      summary:
        'Vaults three and four introduce curses that interact with earlier ones. The party must complete quests between vaults while wearing all their cursed gear in public. Towns react. Guards are concerned. The party becomes locally infamous as "those disaster people." Meanwhile, strange things happen when curses overlap.',
      keyEvents: [
        'Vault 3: Bag of Holding (screams when opened), Wand of Wonder (but it only polymorphs the user into a slightly larger version of themselves), Armor of Honesty (wearer cannot lie and must answer all questions).',
        'A town quest: negotiate a peace treaty while farting, narrating, covered in birds, apologizing, damp, insulting, dropping things, laughing inappropriately, screaming from your bag, growing slightly, and telling the truth. It somehow works because nobody can take you seriously enough to be threatened.',
        'Vault 4: Staff of Echoes (repeats the last thing said, but louder), Boots of Reversed Direction (walk backwards), Crown of Emotional Amplification (cry at sunsets, rage at stubbed toes).',
        'The curse interactions escalate: the Ring of Narration narrates the Armor of Honesty forcing the wearer to reveal secrets, while the Amulet of Inappropriate Laughter triggers during serious moments.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Singularity',
      summary:
        'The final vault and the revelation of Malvorix\'s true plan. The curse load is critical. The party is a catastrophe of overlapping magical malfunctions. Malvorix reveals himself, the Curse Singularity begins, and the party must find a way to stop it using the very curses that have been tormenting them.',
      keyEvents: [
        'Vault 5: the final items push the total curse count past the threshold. New curses include a Belt That Plays Boss Music (alerting every enemy), Earrings of Animal Translation (you understand animals and they are all extremely judgmental), and Bracers of Gravitational Suggestion (objects near you float slightly).',
        'Malvorix appears in the flesh, cackling. He has been watching the whole time. He shows his scrying wall: thousands of images of the party\'s most embarrassing moments.',
        'The Curse Singularity activates: all curses begin merging into a wave of petty inconvenience that will spread across the continent. Everyone will fart when they walk. All speech will be narrated. Birds everywhere.',
        'The party turns the curses against Malvorix. The specific combination of their stacked curses creates feedback loops he never tested. The Sword apologizes to HIM. The Shield insults HIS magic. The narration ring announces HIS secrets. He is defeated by his own petty genius.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Malvorix the Petty',
      role: 'villain / architect of inconvenience',
      personality:
        'A 400-year-old archmage with the emotional maturity of a teenager who was not invited to prom. Brilliant, vindictive, but not actually dangerous - just relentlessly, creatively annoying. He could have conquered kingdoms. He chose to make boots that fart.',
      secret:
        'He was invited to the Archmage Gala. The invitation was lost by a courier pigeon. He has been nursing a grudge over a clerical error for three centuries.',
    },
    {
      name: 'Barnabus Creel',
      role: 'quest giver / previous victim',
      personality:
        'A merchant with a magnificent beard that is entirely bees. Friendly, helpful, deeply apologetic about not mentioning the curse thing. "I thought maybe YOUR vaults would be different? They were not? Ah. Yes. I am sorry about the boots."',
      secret:
        'He is still cursed. The bees are his now. He has grown to love them. They have names.',
    },
    {
      name: 'The Apologetic Sword (Reginald)',
      role: 'sentient cursed weapon / reluctant ally',
      personality:
        'A +2 longsword that is deeply sorry about being a weapon. Apologizes to every enemy it strikes. "Oh goodness, I am so sorry, that looked like it hurt. Are you okay? No? I feel terrible." Genuinely effective in combat despite the constant emotional distress.',
      secret:
        'Reginald was a pacifist wizard Malvorix trapped in a sword as a joke. He has been apologizing for 200 years.',
    },
    {
      name: 'Duchess Thornwall',
      role: 'authority figure / obstacle',
      personality:
        'The local noble whose lands sit above the vaults. She has banned adventurers from the vaults three times. They keep coming back. She is tired. "If I see ONE MORE adventurer farting through my throne room covered in pigeons, I swear by every god—"',
    },
  ],
  keyLocations: [
    {
      name: 'The Cursed Vaults of Malvorix',
      description:
        'Five interconnected dungeon vaults beneath the Thornwall Mountains. Each vault is themed around a different type of inconvenience: noise, appearance, social, physical, and emotional. The architecture is beautiful. The loot is excellent. The curses are permanent until the final vault is cleared.',
      significance:
        'The entire campaign takes place in and around these vaults. Each vault is a multi-session dungeon crawl with the added complexity of stacking curses.',
    },
    {
      name: 'Kettlebrook Market',
      description:
        'The nearest town to the vault entrance. A bustling market town that has seen a LOT of cursed adventurers stumble through. The locals are mostly unfazed. The innkeeper has a "no farting boots" sign. It does not help.',
      significance:
        'The party\'s base of operations and the place where their accumulated curses cause the most public embarrassment.',
    },
    {
      name: 'The Singularity Chamber',
      description:
        'The deepest room in Vault 5. A massive circular chamber with crystalline walls that reflect and amplify every curse in the room. The ceiling is covered in scrying mirrors. This is where Malvorix watches. This is where the curses merge.',
      significance:
        'The final confrontation location where every accumulated curse reaches critical mass.',
    },
  ],
  dataSystems: [
    'magicItemGenerator',
    'curseGenerator',
    'combatNarration',
    'socialEncounter',
    'plotTwistEngine',
    'dungeonDressing',
    'fantasyInsults',
    'trapDisarm',
  ],
};
