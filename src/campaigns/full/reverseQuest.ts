import type { FullCampaign } from '../types';

export const reverseQuest: FullCampaign = {
  id: 'full-reverse-quest',
  type: 'full',
  title: 'Reverse Quest',
  tagline: 'You already won. Now undo all of it. The dragon wants its treasure back.',
  tone: 'shenanigans',
  themes: ['comedy', 'meta', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 10, end: 1 },
  estimatedSessions: 10,
  settingSummary:
    'The campaign opens at the end. The party is standing over the corpse of the Dread Wyrm Malachar, the princess is rescued, the treasure is looted, and the kingdom is cheering. Credits roll. Then a temporal bureaucrat from the Department of Continuity arrives with a clipboard and explains that the party skipped 90% of the required quest paperwork. Their victory is retroactively invalid. They must now undo everything - in reverse order - to restore the timeline. Un-kill the dragon. Un-loot the treasure. Un-rescue the princess. She does not want to go back.',
  hook: 'The party finishes the greatest quest of their lives. The DM describes the ending cinematic. Then a small, tired man in a gray robe appears, checks his clipboard, and says: "Quest Completion Form 7-B was never filed. Your adventure is void. Please return everything. Yes, including the princess. Yes, she has to go back in the tower. I do not make the rules."',
  twist:
    'The reason the paperwork was never filed is that the quest was never ISSUED. A rival adventuring party stole the party\'s quest assignment, failed it, and the original party accidentally completed someone else\'s quest through sheer coincidence. The timeline is not broken because they won - it is broken because they were never supposed to be there in the first place. They are temporal trespassers.',
  climax:
    'Having un-done everything, the party arrives at the very beginning - the tavern where they got the quest. They must now NOT take the quest. But the quest giver is very persuasive, the dragon is already burning villages, and the party knows exactly what happens. They must find a way to complete the quest legally this time, which means filing Form 7-B FIRST - a form so bureaucratically complex it is itself a dungeon.',
  acts: [
    {
      title: 'Act 1: The Un-Doing',
      summary:
        'The party must un-kill the dragon (it is very confused about being alive again), un-loot the treasure (the dragon wants it arranged EXACTLY as it was), and un-rescue the princess (she has built a life outside the tower and is furious). Each un-do is harder than the original quest.',
      keyEvents: [
        'The temporal bureaucrat explains the situation with a 47-page pamphlet. Spiral begins: each un-done achievement is harder than the original quest. Killing the dragon was one fight. Un-killing it is a three-session ordeal involving emotional labor.',
        'Un-killing the dragon: a resurrection ritual performed by heroes who originally killed it. The dragon wakes up mid-monologue.',
        'Un-looting: the dragon insists every coin be returned to its exact original position. It has a diagram.',
        'Un-rescuing the princess: she has a job, an apartment, and a cat. She is NOT going back.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Backward Journey',
      summary:
        'The party must retrace their steps in reverse. Un-clear the goblin camp, un-solve the riddle, un-cross the bridge. Every location they visit remembers them and is baffled by what they are doing. The party de-levels as they un-do their achievements.',
      keyEvents: [
        'The goblin camp must be un-cleared - the party has to PUT goblins BACK.',
        'The riddle sphinx wants its riddle back. It refuses to un-ask it without a receipt.',
        'The bridge troll demands the toll be un-paid. The party must take money FROM the troll.',
        'De-leveling: each un-done milestone costs the party a level. They feel their power draining.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 3: Form 7-B',
      summary:
        'The party reaches the beginning. To complete the quest legally, they must file Form 7-B with the Department of Continuity. The form requires signatures from 12 entities including the dragon, the princess, the goblin chief, and a notary public who died 200 years ago. Filing the form is the real final boss.',
      keyEvents: [
        'The tavern: the party must resist taking the quest while the DM narrates it enticingly.',
        'Form 7-B: a document so complex it folds into a fourth dimension. Requires a quill made from a phoenix feather dipped in bureaucratic ink.',
        'Signature collection: the dragon signs with its claw. The princess refuses to sign without legal representation.',
        'The form is filed. The timeline resets. The quest begins again — properly this time — in a 60-second montage. Chaos callback: the princess still has her accounting practice. She incorporated the tower into her business address. Some things stay changed.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Quillon Greymark',
      role: 'temporal bureaucrat / quest driver',
      personality:
        'A small, exhausted man from the Department of Continuity who has been fixing timeline violations for 300 years. He has seen everything. Nothing surprises him. He is immune to bribes, threats, and emotional appeals. "I understand this is inconvenient. Form 12-C is for complaints. I do not have Form 12-C."',
      secret: 'He is the last employee of the Department. Everyone else quit. He cannot quit because the paperwork for resignation requires a supervisor signature and his supervisor does not exist.',
    },
    {
      name: 'Malachar the Dread Wyrm',
      role: 'dragon / unwilling participant',
      personality:
        'An ancient red dragon who was killed, resurrected, and told to pretend none of it happened. Deeply confused and existentially shaken. "I was DEAD. I saw the other side. There was a waiting room. They had magazines from 200 years ago. I am not okay."',
    },
    {
      name: 'Princess Veldara',
      role: 'princess / immovable object',
      personality:
        'Rescued from a tower, she has since built a successful life as an accountant. She has a retirement plan, a book club, and absolutely no intention of going back to a tower. "I was kidnapped for 8 years. I have MOVED ON. File a motion with my attorney."',
    },
    {
      name: 'The Riddle Sphinx',
      role: 'obstacle / petty adversary',
      personality:
        'A sphinx who takes its riddles very seriously and is OUTRAGED that the party wants to return a solved riddle. "You cannot un-know an answer! That is not how knowledge works! I want to speak to your supervisor!"',
    },
  ],
  keyLocations: [
    {
      name: 'The Department of Continuity',
      description: 'A pocket dimension that exists between moments. It is an infinite gray office with fluorescent lighting, filing cabinets that stretch to the horizon, and a single overworked employee.',
      significance: 'Where quests are filed, validated, and - when necessary - voided.',
    },
    {
      name: 'Malachar\'s Hoard (Reassembled)',
      description: 'The dragon\'s treasure room, now with every coin painstakingly returned to its original position per the dragon\'s diagram. The dragon hovers anxiously correcting placement.',
      significance: 'The site of the un-looting and a lesson in dragon-level obsessive organization.',
    },
    {
      name: 'The Starting Tavern',
      description: 'The Rusted Flagon. Where it all began. Where it all begins again. The quest board still has the posting. The barkeep still serves the same stew. Time is a flat circle.',
      significance: 'The final location. Where the party must NOT take the quest, then file the form, then take it properly.',
    },
  ],
  dataSystems: [
    'plotTwistEngine',
    'socialEncounter',
    'combatNarration',
    'riddleGenerator',
    'fantasyInsults',
    'factionReputation',
    'dungeonDressing',
    'trapGenerator',
  ],
};
