import type { FullCampaign } from '../types';

export const theSpellThatWouldNotEnd: FullCampaign = {
  id: 'full-the-spell-that-would-not-end',
  type: 'full',
  title: 'The Spell That Would Not End',
  tagline: 'A wizard cast Prestidigitation three months ago. It has not stopped. An entire district smells like lavender.',
  tone: 'shenanigans',
  themes: ['comedy', 'urban', 'mystery'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 2, end: 6 },
  estimatedSessions: 10,
  settingSummary:
    'Three months ago, a wizard named Aldwin Wobblethwait cast Prestidigitation to clean a wine stain from his robe. The cantrip worked. Then it kept working. Then it spread. An area of three blocks around his apartment is now perpetually clean, smells aggressively of lavender, and produces small harmless fireworks at random intervals. Every surface sparkles. Dust does not exist. Stains evaporate. The area of effect grows by roughly one block per week. The city of Ashwick is divided: half the population loves it (property values in the Sparkle Zone are skyrocketing) and half is terrified (magic should not DO this). Aldwin is missing. He fled when the spell kept growing. He is hiding in the sewers, which are - for the first time in history - clean.',
  hook: 'The party is hired by the Ashwick Mages Guild to find Aldwin and end the spell before it reaches critical infrastructure. The city\'s alchemy district is in the path of the Sparkle Zone. If Prestidigitation cleans the reagents, the entire potion economy collapses. Also, the lavender smell has become so intense near ground zero that people are hallucinating pleasant memories.',
  twist:
    'Aldwin did not make a mistake. His Prestidigitation accidentally resonated with a dormant ley line running under Ashwick. The cantrip is now drawing power from the ley line, which is why it will not stop. But here is the problem: the ley line has been dormant for 1,000 years because it was CAPPED by an ancient ward. Aldwin\'s spell is eroding the ward. Beneath the clean streets and lavender air, something sealed under the ley line is waking up. The ward was not keeping magic out. It was keeping something IN.',
  climax:
    'The ley line cap breaks and the entity beneath - an ancient primordial of filth and decay called the Grimwallow - begins to rise. The irony is perfect: a spell of cleanliness has awakened the embodiment of uncleanliness. The party must either help Aldwin reverse-engineer his own Prestidigitation to reseal the ley line (using the cleaning spell as the new ward), destroy the Grimwallow, or convince the entity that the world above is already clean and not worth corrupting.',
  acts: [
    {
      title: 'Act 1: The Sparkle Zone',
      summary:
        'The party investigates the ever-expanding area of effect. The Sparkle Zone is absurdly pleasant. Everyone is clean. The air is fragrant. Property values are insane. But the spell keeps growing, and Aldwin is nowhere to be found. The party tracks him through a city where dirt does not exist.',
      keyEvents: [
        'Entering the Sparkle Zone: the party\'s armor polishes itself. Mud falls off boots. It is unsettling. Spiral begins: each session, the Sparkle Zone intensifies. Session 1: things are clean. Session 2: things are aggressively clean. Session 3: the concept of dirt is being erased from memory within the zone.',
        'Investigation: Aldwin\'s apartment is ground zero. It is so clean it hurts to look at.',
        'The trail: Aldwin fled to the sewers. The sewers are clean. This is deeply wrong.',
        'The alchemy district sounds the alarm: the Sparkle Zone is two days from reaching their reagents.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: Finding Aldwin',
      summary:
        'The party finds Aldwin in the pristine sewers. He is terrified and has no idea how to stop the spell. Investigation reveals the ley line connection and the ancient ward. The party realizes the spell is not just annoying - it is eroding something that was sealed for a reason.',
      keyEvents: [
        'Aldwin found: hiding in a sewer junction that sparkles like a palace. He has been eating clean rats.',
        'The ley line discovery: a magical survey reveals Prestidigitation hooked into ancient infrastructure.',
        'The ward: an ancient seal beneath the city, designed to keep something imprisoned. It is cracking.',
        'First tremor: the Grimwallow stirs. A patch of the Sparkle Zone suddenly becomes filthy. The smell is indescribable.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Clean Versus Unclean',
      summary:
        'The Grimwallow begins breaking free. Waves of filth and decay emanate from the ley line breach. The Sparkle Zone fights back - Aldwin\'s Prestidigitation versus an ancient primordial of grime. The party must tip the balance.',
      keyEvents: [
        'The Grimwallow manifests: a writhing mass of ancient filth, mold, and entropy.',
        'Ashwick splits: the Sparkle Zone and the Filth Zone advance toward each other like weather fronts.',
        'Aldwin\'s gambit: he attempts to weaponize his own Prestidigitation as a sealing spell.',
        'The final clean: the party helps Aldwin cast the largest Prestidigitation in history to reseal the ley line. The lavender is overwhelming. Chaos callback: Jasper Gleam the real estate agent immediately begins marketing "Vintage Sparkle Zone Properties" at a premium. The man is incapable of not capitalizing. Aldwin\'s robe, for the record, is finally clean.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Aldwin Wobblethwait',
      role: 'wizard / accidental catastrophe',
      personality:
        'A mousy, anxious wizard whose greatest achievement in life is a cantrip that will not stop. He is terrified of his own spell. He has been hiding in clean sewers eating clean rats and crying. "I just wanted to clean my robe. ONE STAIN. This is disproportionate."',
      secret: 'He is actually an incredibly talented wizard who never believed in himself. The reason Prestidigitation resonated with the ley line is that Aldwin has more raw magical talent than anyone in Ashwick. He has no idea.',
    },
    {
      name: 'Guildmaster Sable Inkworth',
      role: 'mages guild leader / employer',
      personality:
        'The head of the Ashwick Mages Guild who is publicly concerned about the spell but privately furious that a cantrip is outperforming every spell her guild has ever cast. "A CANTRIP. A zero-level, first-day-of-class CANTRIP is doing this. I have a doctorate."',
    },
    {
      name: 'The Grimwallow',
      role: 'primordial of filth / ancient threat',
      personality:
        'An ancient entity of decay, grime, and entropy that was sealed beneath Ashwick a thousand years ago. It is not evil in the traditional sense - it is the natural force of things falling apart. It is confused about the lavender. "What is this smell. Why is everything CLEAN. Who has done this to my domain."',
    },
    {
      name: 'Jasper Gleam',
      role: 'Sparkle Zone real estate agent / chaos profiteer',
      personality:
        'An entrepreneur who has been selling property in the Sparkle Zone at outrageous markups. Does not want the spell to end. "Self-cleaning floors! Perpetual fragrance! Do you know what people pay for this in the Feywild? I am sitting on a GOLDMINE of hygiene."',
    },
  ],
  keyLocations: [
    {
      name: 'The Sparkle Zone',
      description: 'A growing area of Ashwick that is perpetually, aggressively clean. Surfaces gleam. The air smells like lavender. Small fireworks pop randomly. Dirt cannot exist here. It is beautiful and deeply unnatural.',
      significance: 'The visible effect of the spell and the party\'s main area of investigation.',
    },
    {
      name: 'The Pristine Sewers',
      description: 'The sewers beneath the Sparkle Zone are the cleanest underground tunnels in history. The water is clear. The rats are groomed. Aldwin lives here now.',
      significance: 'Where Aldwin is hiding and where the ley line breach is most accessible.',
    },
    {
      name: 'The Ley Line Breach',
      description: 'A crack in the ancient ward deep beneath Ashwick where magical energy bleeds upward. The air here oscillates between aggressively clean and aggressively filthy depending on whether Prestidigitation or the Grimwallow is winning.',
      significance: 'The source of the problem and the site of the final confrontation.',
    },
  ],
  dataSystems: [
    'environmentalHazard',
    'combatNarration',
    'plotTwistEngine',
    'socialEncounter',
    'riddleGenerator',
    'wildMagicSurge',
    'fantasyInsults',
    'dungeonDressing',
  ],
};
