import type { FullCampaign } from '../types';

export const theApprenticesRevenge: FullCampaign = {
  id: 'full-the-apprentices-revenge',
  type: 'full',
  title: 'The Apprentice\'s Revenge',
  tagline: 'He left a manifesto. It is 47 pages long. Every grievance is valid.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 12,
  settingSummary:
    'The Tower of Archmage Vexillus has been the most prestigious magical institution in the realm for forty years. What nobody knew was that its success was built entirely on the labor of one apprentice: Pip. Pip fetched components. Pip cleaned the cauldron. Pip held still while Vexillus tested experimental spells on him. Pip wrote the papers Vexillus published under his own name. Pip has had enough. He has locked Vexillus in the tower, rigged every floor with traps that are humiliating rather than lethal, and published a 47-page manifesto detailing every abuse. The realm is divided. Half think Pip is a criminal. Half think he is a hero. Everyone agrees the manifesto is well-written.',
  hook: 'The party is hired by the Mages\' Guild to rescue Archmage Vexillus from his own tower. Pip has sealed every entrance with wards, trapped every hallway, and left notes in each room explaining exactly which abuse inspired each trap. The party must ascend the tower, navigate Pip\'s increasingly creative (and increasingly personal) defenses, and reach Vexillus at the top. The catch: the more they learn about what Vexillus did to Pip, the less they want to rescue him.',
  twist:
    'Vexillus is not trapped. He figured out how to escape on day one. He is CHOOSING to stay because Pip\'s manifesto went public and the court of public opinion has turned against him. The tower is the only place the angry mob outside cannot reach him. The party is not rescuing a prisoner - they are extracting a coward who is using his own "captivity" as a sympathy play.',
  climax:
    'The party reaches the top and discovers Vexillus lounging comfortably, fully capable of leaving. Meanwhile, Pip has been watching through scrying mirrors and is furious that his dramatic statement has been undermined. Pip arrives in person for a final confrontation - not a battle, but a tribunal. The party serves as the jury. Vexillus tries to charm his way out. Pip presents his evidence. The manifesto is read aloud. The party must render judgment on who was right, what happens to the tower, and whether Pip gets his name on the papers he wrote.',
  acts: [
    {
      title: 'Act 1: The Tower Ascent Begins',
      summary:
        'The party enters the trapped tower and begins climbing. Each floor is themed around a specific grievance from Pip\'s manifesto. The traps are clever, embarrassing, and increasingly sympathetic. Notes from Pip provide context.',
      keyEvents: [
        'Floor 1: "The Component Fetching" - the party must fetch increasingly ridiculous spell components from trapped alcoves. Running gag begins: each floor has a framed employee-of-the-month photo. It is always Vexillus. Pip\'s face is scratched out of every group photo.',
        'Floor 2: "The Cauldron" - a room that slowly fills with cleaning solution while the party scrubs actual cauldrons to unlock the exit',
        'Pip\'s notes are everywhere: "He made me do this for six hours every day. For twelve years."',
        'The party finds Pip\'s manifesto. Reading it is optional but changes the emotional context of every subsequent trap.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Grievances Escalate',
      summary:
        'The upper floors address more serious abuses: stolen credit, dangerous experimentation, emotional manipulation. The traps become less funny and more pointed. Pip is no longer playing for laughs. The party starts questioning who the real villain is.',
      keyEvents: [
        'Floor 5: "The Experiment" - the party must survive spells being cast on them randomly, mimicking what Pip endured',
        'Floor 7: "The Published Papers" - a library where every book is authored by Vexillus but written in Pip\'s handwriting',
        'The party encounters Pip via sending stone - he is articulate, angry, and completely reasonable',
        'Public opinion outside the tower shifts: pro-Pip protestors gather at the base',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Tribunal',
      summary:
        'The party reaches the top and finds Vexillus is free. Pip arrives. The confrontation is not combat but a trial where the party must judge. Both sides make their case. The resolution depends on how much the party learned on the way up.',
      keyEvents: [
        'Vexillus is discovered lounging in comfort with a full wine cellar and zero restraints',
        'Pip arrives through a hidden passage - he built this tower\'s traps, he knows every secret',
        'The tribunal: Vexillus deflects, minimizes, and charm-spells. Pip presents documented evidence.',
        'The verdict: the party decides Pip\'s fate, Vexillus\'s reputation, and who gets the tower',
        'Callback: the final employee-of-the-month frame on floor 10 is empty. If the party rules for Pip, his face appears in it. He pretends not to care. He absolutely cares.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Pip Underfoot',
      role: 'antagonist / sympathetic villain',
      personality:
        'A halfling apprentice who endured twelve years of abuse and channeled it into the most elaborate revenge in arcane history. He is not evil. He is not even angry in a violent way. He is meticulous, articulate, and devastatingly correct. "I am not asking for sympathy. I am presenting facts. Forty-seven pages of facts."',
      secret: 'He does not actually want Vexillus punished. He wants an apology. A real one. He has never gotten one.',
    },
    {
      name: 'Archmage Aldric Vexillus',
      role: 'quest target / antagonist',
      personality:
        'A human wizard who is brilliant, charismatic, and utterly incapable of accepting blame. He genuinely does not understand what he did wrong. He calls Pip "ungrateful" without irony. "I gave that boy a career! I let him LIVE in my tower! He should be thanking me!"',
    },
    {
      name: 'Magistrix Dune',
      role: 'quest giver',
      personality:
        'Head of the Mages\' Guild. She hired the party to rescue Vexillus but privately suspects Pip might have a point. She wants this resolved before it becomes a guild-wide scandal about how apprentices are treated.',
      secret: 'She was an apprentice under similar conditions. She never spoke up.',
    },
    {
      name: 'The Mob Outside',
      role: 'environmental pressure',
      personality:
        'A growing crowd at the tower\'s base, split between pro-Pip and pro-Vexillus factions. They shout through the walls. They have signs. Someone brought snacks. It is a whole thing.',
    },
  ],
  keyLocations: [
    {
      name: 'The Tower of Vexillus',
      description: 'A ten-story wizard\'s tower, now fully trapped by the apprentice who cleaned it for twelve years. Each floor is themed around a specific grievance. The architecture is elegant. The traps are petty.',
      significance: 'The primary dungeon. Each floor tells a story.',
    },
    {
      name: 'The Top Floor Study',
      description: 'Vexillus\'s personal study. Luxurious, well-stocked, and showing zero signs of distress. He has been quite comfortable this entire time.',
      significance: 'The reveal location and tribunal setting.',
    },
    {
      name: 'Pip\'s Hidden Workshop',
      description: 'A cramped room behind a false wall on the third floor where Pip actually did all his real work. It is tiny, uncomfortable, and covered in blueprints for the traps.',
      significance: 'Physical evidence of the working conditions Pip endured.',
    },
  ],
  dataSystems: [
    'trapDesigner',
    'dungeonRoomDressing',
    'combatNarration',
    'socialEncounter',
    'diplomaticNegotiation',
    'plotTwistEngine',
    'villainMonologue',
    'riddleGenerator',
  ],
};
