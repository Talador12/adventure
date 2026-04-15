import type { FullCampaign } from '../types';

export const theDeadMansTournament: FullCampaign = {
  id: 'full-dead-mans-tournament',
  type: 'full',
  title: 'The Dead Man\'s Tournament',
  tagline: 'The fighters are dead. The audience is alive. The prize is a second chance.',
  tone: 'serious',
  themes: ['dark_fantasy', 'war', 'classic_fantasy'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 5, end: 13 },
  estimatedSessions: 16,
  settingSummary:
    'In the land of the dead, the Raven Queen holds a tournament every century: fallen warriors fight for the chance to return to life. The party is dead (killed in a shared event) and must compete. But the tournament isn\'t just combat — it\'s a trial of who deserves to live. Rounds test valor, sacrifice, wisdom, and mercy. The dead are many. Only one team returns.',
  hook: 'The party dies — simultaneously, dramatically, protecting a village from a catastrophe they can\'t survive. They wake in a grey field. A raven lands on a bone arch. "Welcome to the Crucible. The Raven Queen offers one team a return to life. Prove you deserve it."',
  twist:
    'The party wasn\'t killed by accident — they were assassinated by a rival who entered the tournament to win resurrection for someone else. The catastrophe was engineered. The party\'s killer is in the tournament bracket. Justice and resurrection are on the same path.',
  climax:
    'The final round: the party faces their killer\'s team. The Raven Queen adds a condition: the winning team can resurrect anyone they choose, not just themselves. The killer wants to resurrect a lost love. The party wants to live. The Raven Queen watches to see what choice they make when winning means taking a second life from someone who loved.',
  acts: [
    {
      title: 'Act 1: Death',
      summary:
        'The party dies, arrives in the afterlife, enters the tournament, and discovers the rules. They meet other dead competitors — heroes, villains, and everything between.',
      keyEvents: [
        'The death: heroic, unavoidable, and felt',
        'The grey field: the afterlife\'s staging ground',
        'Tournament registration: 8 teams of the recently dead',
        'Round 1: The Trial of Valor — straightforward combat against worthy opponents',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Crucible',
      summary:
        'Rounds 2-4, each testing a different virtue. Between rounds, the party learns about their competitors, discovers they were murdered, and identifies their killer in the bracket.',
      keyEvents: [
        'Round 2: Trial of Sacrifice - each team member must give up something real. Not hit points. A memory. A skill. A relationship.',
        'Quiet moment: between rounds, Sergeant Voss shares a flask of something that tastes like regret. "Best drink in the afterlife. Tastes like everything you miss."',
        'Round 3: Trial of Wisdom - a puzzle that requires understanding death, not fearing it',
        'Round 4: Trial of Mercy — the opponent begs for their life (test of character)',
        'Discovery: the catastrophe that killed the party was engineered by another competitor',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Final Round',
      summary:
        'The party faces their killer. The Raven Queen reveals the full stakes. Victory means a terrible choice.',
      keyEvents: [
        'The killer confronted: their reason is sympathetic — resurrection for a dead child',
        'The final fight: skill and emotion intertwined',
        'The Raven Queen\'s condition: the winner can resurrect anyone, not just themselves',
        'The choice: live, give life to the killer\'s loved one, or ask the Raven Queen for a third option',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'The Raven Queen',
      role: 'tournament master / judge',
      personality:
        'Ancient, impassive, and deeply interested in mortal choices. Speaks without moving her lips. Her voice comes from the air itself. She holds the tournament not for entertainment but to understand why mortals cling to life so fiercely. "You have had your life. Why do you want it again? What makes it worth repeating?"',
    },
    {
      name: 'Kael Ashbringer',
      role: 'rival / sympathetic antagonist',
      personality:
        'The party\'s killer — a paladin who lost his daughter. He engineered the party\'s death because he needed them in the tournament (they were the only team he thought he could beat in the final). He\'s not evil. He\'s desperate and grieving.',
      secret: 'He hates himself for what he did. If the party offers mercy, he breaks.',
    },
    {
      name: 'Sergeant Voss (Team Iron)',
      role: 'friendly rival',
      personality:
        'Leader of another tournament team — a squad of soldiers killed in the same war. Honorable, straightforward, and the party\'s natural allies between rounds.',
    },
    {
      name: 'The Herald',
      role: 'tournament announcer',
      personality:
        'A skeletal figure who announces each round with theatrical gravitas. Takes the job very seriously. "ROUND FOUR: THE TRIAL OF MERCY. No killing this time. That\'s the point."',
    },
  ],
  keyLocations: [
    {
      name: 'The Grey Field',
      description: 'The afterlife\'s staging ground — a vast, colorless plain where the dead gather. No sun, no stars, just grey light.',
      significance: 'Where the party arrives and socializes between rounds.',
    },
    {
      name: 'The Crucible Arena',
      description: 'The tournament grounds — a colosseum that reshapes for each trial. Built from bone and shadow.',
      significance: 'Where the trials take place.',
    },
    {
      name: 'The Raven\'s Throne',
      description: 'A towering obsidian chair where the Raven Queen watches. Approaching it is forbidden. Being summoned to it is either an honor or a sentence.',
      significance: 'Where the final choice is presented.',
    },
  ],
  dataSystems: [
    'tournamentBracket',
    'gladiatorArena',
    'skillChallenge',
    'combatNarration',
    'deathSaveDrama',
    'socialEncounter',
    'darkBargain',
    'encounterWaves',
    'partyMoraleTracker',
  ],
};
