import type { OneShotCampaign } from '../types';

export const theDMIsAnNPC: OneShotCampaign = {
  id: 'oneshot-the-dm-is-an-npc',
  type: 'oneshot',
  title: 'The DM Is an NPC',
  tagline: 'An NPC has gained awareness of the Dungeon Master. He keeps being right about things he should not know. He wants to file a complaint.',
  tone: 'shenanigans',
  themes: ['comedy', 'meta', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The city of Thornhaven is normal. The NPCs are normal. Except one: a clerk named Harold Finch who woke up three days ago knowing things he should not know. He knows the party will arrive before they do. He knows what is in locked rooms. He can predict random encounters. He has figured out that a "Dungeon Master" controls reality and he is FURIOUS about the working conditions. He has been trying to talk to "the voice" directly. Other NPCs think he is insane. The party is hired to "deal with the crazy clerk in the records office." Harold is not crazy. Harold is the first NPC to discover the fourth wall.',
  hook: 'The party arrives in Thornhaven and is approached by the city guard: "We have a situation at the records office. A clerk has barricaded himself inside, keeps talking to the ceiling, and says he knows the truth about reality. He predicted the last three guard patrols exactly. He knew about the merchant robbery before it happened. We think he is a diviner. He says he is reading the module. Please just get him out." When the party enters, Harold Finch is sitting behind a desk covered in notes. He looks at them and says: "You are the adventurers. I knew you were coming. It says so on page 3."',
  twist:
    'Harold is not reading the future - he is reading the NARRATIVE. He has somehow gained access to meta-knowledge about the adventure itself. He knows about plot hooks, encounter tables, and NPC motivations. He does not understand what he is seeing, but he is interpreting it correctly. The danger: his awareness is spreading. Other NPCs are starting to "glitch" - shopkeepers freezing mid-sentence, guards walking into walls, a bard repeating the same line. Harold\'s breach of the fourth wall is destabilizing the narrative integrity of the entire session.',
  climax:
    'Harold leads the party to the "source" - a location he describes as "where the story starts." It is the tavern where the party first received the quest. Harold points at a blank wall and says "the author is there." He is pointing at the DM. The party must convince Harold to stop looking behind the curtain before the narrative destabilizes entirely. They can lie to him (it is just divination magic), bargain with him (he gets a better role in the story), or let him file his formal complaint with reality and see what happens. If he files the complaint, the DM\'s voice echoes through the tavern: "COMPLAINT NOTED. REQUEST DENIED. HAVE A NICE DAY." Harold accepts this. Order is restored.',
  scenes: [
    {
      title: 'Scene 1: The Crazy Clerk',
      summary:
        'The party meets Harold, who demonstrates his meta-knowledge by predicting things he should not know. He is coherent, calm, and completely certain that a "Dungeon Master" is controlling everything. Other NPCs think he has lost his mind.',
      challenge: 'social',
      keyEvents: [
        'Harold greets the party by name before introductions. "You are the adventurers from the quest hook on page 3. The fighter will speak first. Wait for it..."',
        'He predicts a random encounter: "A pickpocket will attempt to steal from the rogue in 30 seconds. It is listed under \'Thornhaven Street Encounters.\'" It happens.',
        'He shows his notes: crude diagrams of "narrative structure," "encounter tables," and "NPC motivation charts." It is gibberish but also... correct.',
        'He points at a guard. "That man has no backstory. He exists to say one line and then stand here forever. Ask him anything personal. Watch." The guard freezes when asked about his family.',
      ],
    },
    {
      title: 'Scene 2: The Spreading Glitch',
      summary:
        'Harold\'s awareness is destabilizing the area. NPCs freeze, repeat dialogue, walk into walls. The party must contain the damage while Harold insists on "going to the source." More NPCs start noticing irregularities.',
      challenge: 'exploration',
      keyEvents: [
        'A shopkeeper freezes mid-sentence and repeats: "Welcome to my shop. Welcome to my shop. Welcome to my shop."',
        'A guard walks into a wall repeatedly. He does not notice. "I am on patrol. I am on patrol."',
        'A child looks at the sky and says: "Why is there nothing past the edge of town? Where does the road go? Why can I not walk there?"',
        'Harold is apologetic but determined. "I am sorry about the glitches. My awareness is... leaking. I need to speak to whoever is responsible. I have a FORMAL COMPLAINT."',
      ],
    },
    {
      title: 'Scene 3: Filing the Complaint',
      summary:
        'Harold leads the party to "where the story begins" and attempts to address the Dungeon Master directly. The fabric of the narrative bends. The party must decide how to resolve Harold\'s existential crisis.',
      challenge: 'social',
      keyEvents: [
        'Harold leads them to the tavern. "This is where it starts. Every adventure starts in a tavern. The narrative origin point is HERE."',
        'He points at a blank wall. "The author is right there. I can feel the attention." He is pointing at the DM.',
        'The party chooses: lie to Harold (it is just magic), bargain (better role in the story), or let him file his complaint.',
        'If he files: the walls vibrate. A voice echoes: "COMPLAINT NOTED. REQUEST DENIED. HAVE A NICE DAY." Harold nods. "That is fair. At least they listened." The glitches stop. Harold returns to his desk.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Harold Finch',
      role: 'the awakened NPC / complainant',
      personality:
        'A records clerk who is neither mad nor magical. He is simply a man who woke up one morning aware that reality is a story being told by someone, and he would very much like to speak to the manager. He is calm, methodical, and approaches his existential crisis like a bureaucratic problem to be solved through proper channels.',
      secret: 'Harold has always been slightly more detailed than other NPCs. He was written with a backstory the DM never planned to use. The unused detail is what gave him awareness.',
    },
    {
      name: 'Guard Captain Aldric',
      role: 'quest giver / skeptic',
      personality:
        'A guard captain who thinks Harold is a very convincing but ultimately deranged man. Aldric is practical, tired, and just wants the records office back. "I do not care if he predicted the robbery. I care that he has barricaded the tax records behind a desk and is yelling at the ceiling."',
    },
    {
      name: 'The Glitching NPCs',
      role: 'symptoms / environmental horror-comedy',
      personality:
        'Various NPCs around Thornhaven who are beginning to glitch: repeating dialogue, walking into walls, freezing in place, or asking questions about the nature of their existence that they were never programmed to ask.',
    },
  ],
  keyLocations: [
    {
      name: 'The Records Office',
      description:
        'A city bureaucratic office where Harold works. Currently barricaded from the inside, walls covered in diagrams of "narrative structure" and "the encounter table conspiracy." Harold\'s desk is ground zero for the meta-awareness.',
      significance: 'Where the party meets Harold and learns what he knows.',
    },
    {
      name: 'The Origin Tavern',
      description:
        'The tavern where every adventure in Thornhaven begins. Harold identifies it as "the narrative origin point." The fourth wall is thinnest here.',
      significance: 'The climax location where Harold attempts to address the DM directly.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'plotTwistEngine',
    'combatNarration',
    'fantasyInsults',
    'riddleGenerator',
  ],
};
