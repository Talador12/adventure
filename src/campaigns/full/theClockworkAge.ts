import type { FullCampaign } from '../types';

export const theClockworkAge: FullCampaign = {
  id: 'full-the-clockwork-age',
  type: 'full',
  title: 'The Clockwork Age',
  tagline: 'The machines are not the enemy. The people who own them are.',
  tone: 'political',
  themes: ['urban', 'intrigue', 'political'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 16,
  settingSummary:
    'The city of Ironhaven changed in a single generation. Gnomish engineer Tilda Gearwright invented the pressure engine - a steam-powered mechanism that replaced a hundred workers with one machine. Factories replaced workshops. Smoke replaced sky. A new class of factory owners grew rich while the artisans who built their machines lost everything. Children work the looms. The river runs black. The Artisan Quarter is a slum. The Factory District never sleeps. And the Parliament of Gears - a government that gives votes to property owners - has just passed a law making it illegal to destroy a machine. Not illegal to starve a worker. Illegal to break a machine.',
  hook: 'The party arrives in Ironhaven as the Weavers Guild calls a general strike. The factories lock their doors. The workers gather in Tinker Square. The city watch loads crossbows with iron bolts. A halfling union organizer named Pip stands on a crate and shouts: "They replaced our hands with gears. They can replace our voices too - unless we make them listen." The first bolt flies. The party is in the middle.',
  twist:
    'Tilda Gearwright, the gnome who invented the pressure engine, is alive and horrified by what her invention became. She has been secretly funding the resistance for years - paying for legal aid, smuggling food to striking families, and designing machines that require skilled operators instead of replacing them. She does not want to destroy the industrial age. She wants to fix it. The factory owners know someone is funding the resistance. They are closing in on Tilda. The party must protect her while she builds something that could change everything: a machine that belongs to the workers who run it.',
  climax:
    'Tilda unveils the cooperative engine - a machine that can only be operated by a trained collective, not owned by an individual. It produces more than the factory engines. The factory owners try to destroy it. The workers try to defend it. The Parliament of Gears must choose: ban the cooperative engine to protect the owners, or legalize it and reshape the economy. The party\'s alliances, evidence, and choices throughout the campaign determine which way the vote falls.',
  acts: [
    {
      title: 'Act 1: The Strike',
      summary: 'The general strike and its immediate fallout. The party navigates between workers, owners, and a city watch that serves whoever pays them.',
      keyEvents: [
        'The Tinker Square rally: the party witnesses the first violence and must choose sides or try to mediate',
        'The lockout: factories close. Workers have no income. The Artisan Quarter faces starvation.',
        'Sabotage: someone destroys a factory. The owners blame the union. The union says it was a provocation.',
        'A child worker escapes a locked factory and tells the party what happens inside',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Underground',
      summary: 'The party discovers the resistance network and meets its secret funder. They must protect Tilda while gathering evidence of factory abuses and building political alliances.',
      keyEvents: [
        'The resistance hideout: beneath the old Tinkers Market. Funded by an anonymous benefactor.',
        'Meeting Tilda: she reveals herself. She wants to fix the system, not burn it down.',
        'The factory investigation: breaking into the Ironworks to document conditions and gather evidence',
        'The owners strike back: hired thugs, bought politicians, and a mercenary company on retainer',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Cooperative Engine',
      summary: 'Building, defending, and proving the cooperative engine. The final battle is political as much as physical - winning the Parliamentary vote while keeping Tilda alive.',
      keyEvents: [
        'The build: Tilda and the party construct the cooperative engine in secret. The workers learn to operate it.',
        'The demonstration: the engine runs. It works. The owners are terrified.',
        'The vote: Parliament of Gears debates the engine. The party presents evidence, calls witnesses, makes deals.',
        'The resolution: the vote falls. Ironhaven changes - or does not. The party\'s choices echo.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Tilda Gearwright',
      role: 'inventor / secret benefactor',
      personality: 'A gnome in her seventies who never intended her engine to enslave anyone. She speaks in engineering metaphors, works twenty hours a day, and carries guilt like a load-bearing wall. "I built a tool. They built a cage."',
      secret: 'She has a terminal illness from years of working with toxic alchemical compounds. She wants the cooperative engine finished before she dies.',
    },
    {
      name: 'Pip Copperkettle',
      role: 'union organizer / firebrand',
      personality: 'A halfling with a voice that carries three blocks and a conviction that carries further. Former factory worker. Lost two fingers to a loom. Charismatic, impatient, and willing to burn bridges she is still standing on.',
    },
    {
      name: 'Alderman Voss',
      role: 'factory owner / political villain',
      personality: 'A human industrialist who genuinely believes progress requires sacrifice - other people\'s sacrifice. Polite, articulate, and completely sincere when he says the poor should be grateful for the opportunity to work.',
    },
    {
      name: 'Inspector Brasswick',
      role: 'city watch captain / conflicted enforcer',
      personality: 'A dwarf who enforces the law as written, even when the law is wrong. He knows the factories are abusive. His orders say protect them anyway. He is one bad day from switching sides.',
    },
  ],
  keyLocations: [
    { name: 'Ironhaven', description: 'A city choking on its own success. Smoke-belching factories alongside crumbling artisan quarters. The river is black. The sky is gray. The money flows uphill.', significance: 'The entire campaign takes place within the city. Every district is a faction.' },
    { name: 'The Artisan Quarter', description: 'Once the heart of Ironhaven\'s craft economy. Now a slum. Abandoned workshops converted to tenements. The resistance operates from the old Tinkers Market beneath the streets.', significance: 'Home of the workers, the resistance, and the party\'s moral center.' },
    { name: 'The Parliament of Gears', description: 'Ironhaven\'s governing body. Votes weighted by property ownership. The chamber is decorated with clockwork - beautiful, precise, and designed to serve the people who built it.', significance: 'Where the final vote happens. The campaign\'s political battlefield.' },
  ],
  dataSystems: ['socialEncounter', 'npcRelationshipWeb', 'npcLoyalty', 'randomPoliticalIntrigue', 'dialogueTrees', 'heistPlanner', 'partyMoraleTracker', 'randomNpcSecret2'],
};
