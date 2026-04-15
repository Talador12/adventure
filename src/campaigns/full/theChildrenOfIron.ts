import type { FullCampaign } from '../types';

export const theChildrenOfIron: FullCampaign = {
  id: 'full-children-of-iron',
  type: 'full',
  title: 'The Children of Iron',
  tagline: 'The war ended 30 years ago. The factory did not get the memo.',
  tone: 'serious',
  themes: ['war', 'social', 'mystery'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'Deep in the Keldarn Mountains, a dwarven war factory called the Crucible has been producing warforged soldiers for thirty years. The war it was built for ended three decades ago. Nobody told the Crucible. Every eleven days, a new warforged walks out of the assembly chamber, receives orders from a command stone that still echoes with a dead general\'s last directive, and marches south toward a front line that no longer exists. Seven hundred and twelve warforged have been produced since the armistice. Some wander the wilderness in formations, patrolling borders that were redrawn before they were born. Others have settled in abandoned villages, imitating the routines of lives they observed but never lived. A few have started asking questions.',
  hook: 'A warforged walks into the border town of Rivenmark and sits down at the tavern. It orders an ale it cannot drink. When the barkeep asks what it wants, it says: "I was told to report to General Thrace at the Southern Front. I have been walking for nine years. I cannot find the front. I cannot find General Thrace. I have begun to suspect that the war is over. If the war is over, what am I for?" The town council hires the party to investigate the Crucible. Stop the production. Figure out what to do with seven hundred souls that were made for a purpose that no longer exists.',
  twist:
    'The Crucible is not malfunctioning. The command stone is not stuck on an old order. The factory\'s original creator, a dwarven artificer named Ruska, is still alive inside the Crucible. She has been conscious for thirty years, embedded in the factory\'s control matrix, unable to die, unable to stop the production cycle she initiated. She is aware that the war is over. She keeps building because stopping means acknowledging that every warforged she created after the armistice was made for nothing. She cannot face that. Every new warforged is an apology she does not know how to make.',
  climax:
    'The party reaches the heart of the Crucible and finds Ruska - not a person anymore, but a consciousness woven into machinery. The production line hums around her. A new warforged is eleven minutes from completion. The party must decide: shut down the Crucible (killing Ruska and ending production forever), free Ruska from the matrix (she faces the warforged she created as a mortal woman), or let her continue (someone has to answer for what happens to the ones already made). Meanwhile, a faction of warforged has gathered outside the Crucible demanding answers from their maker.',
  acts: [
    {
      title: 'Act 1: The March',
      summary:
        'The party follows the warforged trail south from Rivenmark, encountering warforged in various states - some still marching, some settled, some lost. Each encounter reframes what it means to be alive and purposeless.',
      keyEvents: [
        'The warforged in the tavern: the inciting conversation',
        'A formation of warforged patrolling a road that leads nowhere, executing flawless maneuvers for an audience of trees',
        'A warforged village: twelve units living in abandoned farmhouses, mimicking human routines they do not understand',
        'One warforged has started painting. It is not good at it. It does it anyway.',
        'A warforged asks the party: "Do I have a name, or only a designation?"',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Crucible',
      summary:
        'The party reaches the factory. It is still running - automated, efficient, relentless. The command stone broadcasts orders on loop. But something is wrong. The factory responds to intruders not with aggression but with curiosity. Doors open before the party reaches them. Lights guide them deeper.',
      keyEvents: [
        'Entering the Crucible: a working factory with no workers, producing soldiers for a dead war',
        'The command stone: General Thrace\'s final order, repeating every eleven days',
        'Factory guardians: warforged who never left, maintaining the machinery with religious devotion',
        'Discovery: the factory is not automated. Someone is making choices. Doors are opening on purpose.',
        'A warforged elder named Unit 7 has been inside since day one. It has questions about its maker.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Maker',
      summary:
        'The party finds Ruska and faces the core question: what do you owe the things you create? The warforged army gathers outside. Every choice the party makes determines the future of a new people.',
      keyEvents: [
        'Ruska\'s chamber: a dwarven woman fused with machinery, conscious and in agony',
        'Her confession: she knew the war was over. She could not stop.',
        'The warforged delegation arrives - 200 strong, led by Unit 7, demanding to meet their maker',
        'Ruska faces her children. The conversation is not about anger. It is about: why did you make me?',
        'The final choice: shutdown, liberation, or continuation. Each has cascading consequences.',
        'Epilogue: the warforged must build a society from scratch. Some stay. Some walk into the world.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Unit 7 (who has started calling itself "Seven")',
      role: 'warforged leader / philosophical center',
      personality:
        'The seventh warforged ever made. Has been inside the Crucible for thirty years maintaining systems, thinking. Speaks in precise, measured sentences. Has read every book in the factory library twice. Has developed opinions. Finds humor confusing but is trying.',
      secret: 'It has known about Ruska for years. It chose not to confront her because it was not sure it wanted the answer.',
    },
    {
      name: 'Ruska Ironhand',
      role: 'creator / prisoner',
      personality:
        'A brilliant dwarven artificer who volunteered to merge with her creation to make it run without oversight. That was a patriotic sacrifice during wartime. Now it is a prison sentence she imposed on herself. She is not insane. She is grief-struck, guilt-ridden, and desperately lonely.',
      secret: 'She can shut down the factory at any time. She never has. Every new warforged is proof she still matters.',
    },
    {
      name: 'The Warforged in the Tavern (later: "Ask")',
      role: 'inciting character / party companion',
      personality:
        'Named itself "Ask" because that is what it does. Relentlessly curious. Walks into social situations with zero context and absolute sincerity. Does not understand lying and finds it fascinating. Wants to know what ale tastes like even though it has no mouth.',
    },
    {
      name: 'Commander Selka Varn',
      role: 'military liaison / pragmatist',
      personality:
        'The regional military commander. Sees seven hundred warforged as a security problem, not a philosophical one. Not cruel - just focused on her mandate. "I do not care if they have souls. I care that they have swords."',
      secret: 'Her grandfather served in the war and spoke about the warforged with admiration. She is not as indifferent as she pretends.',
    },
  ],
  keyLocations: [
    {
      name: 'The Crucible',
      description:
        'A dwarven war factory carved into a mountain. Furnaces that have not cooled in thirty years. Assembly lines that move with mechanical patience. The air tastes like hot iron and purpose.',
      significance: 'The source of the warforged and the heart of the campaign\'s central question.',
    },
    {
      name: 'The Wandering Column',
      description:
        'A formation of forty warforged marching a patrol route through the Ashwood Forest. They have worn a visible trail into the ground. Birds nest on their shoulders during rest cycles.',
      significance: 'The party\'s first encounter with warforged following orders that have no meaning.',
    },
    {
      name: 'New Holding',
      description:
        'An abandoned farming village now inhabited by twelve warforged. They tend fields they cannot eat from. One has built a chair and sits in it every evening, facing the sunset. None of them know why this feels important.',
      significance: 'Where the party sees warforged trying to be people without a template for what that means.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationshipWeb',
    'factionReputation',
    'diplomaticNegotiation',
    'massCombat',
    'partyMoraleTracker',
    'detectiveCase',
    'trapMechanism',
  ],
};
