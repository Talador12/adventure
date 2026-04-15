import type { FullCampaign } from '../types';

export const shadowsOfTheFallenLeaf: FullCampaign = {
  id: 'full-shadows-of-the-fallen-leaf',
  type: 'full',
  title: 'Shadows of the Fallen Leaf',
  tagline: 'The war is over. You are a farmer now. Your hands remember how to kill, and someone is making sure you do not forget.',
  tone: 'serious',
  themes: ['dark_fantasy', 'war', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 18,
  settingSummary:
    'The Great Shadow War ended three years ago. The assassin clans officially disbanded. Treaties were signed. Weapons were buried. The party are former shadow warriors who have tried to build normal lives — a farmer, a baker, a schoolteacher, a carpenter. They were the best at what they did, and what they did was terrible. Now they wake up early, tend their fields, and pretend the nightmares are not getting worse. But old skills do not rust. Old enemies do not forget. And someone is killing former agents with a technique that was supposed to have been destroyed with the war.',
  hook: 'A letter arrives for one party member. Inside is a single fallen leaf — the old signal for "you are compromised." The letter has no sender. That night, the party hears that Kenta Sho, their former squad commander, was found dead. His body showed signs of the Void Step technique — a forbidden art that erases the victim from causality itself. Void Step was destroyed after the war. Every practitioner was accounted for. Except the technique also erases itself from the caster\'s memory, which means the killer does not know they know it.',
  twist:
    'The party themselves used Void Step during the war. It was their squad\'s secret weapon — the reason they survived missions nobody else could. But the technique erases itself from the caster\'s memory after use. The party has no recollection of ever learning or using it. Someone is killing everyone who knew Void Step existed, and the party is on the list not because they witnessed it — but because they WERE it. Their former handler, Magistrate Okubo, ordered the technique\'s development, deployed the party as its delivery system, and is now eliminating all evidence. The party is the evidence.',
  climax:
    'The party confronts Magistrate Okubo in the ruins of the old shadow academy. Okubo reveals everything: the technique, the deployments, the memory erasure. He offers a deal — let him finish the cleanup, and the world never knows what happened during the war. The alternative is the truth: the party\'s "heroic" war record is built on a forbidden art that unmade people from existence. Families of the vanished will learn their loved ones did not die — they were erased. The party must choose between their reputation, the truth, and whether Okubo deserves to die for ordering what they willingly carried out.',
  acts: [
    {
      title: 'Act 1: The Quiet Life',
      summary:
        'The party lives their civilian lives until the fallen leaf signal pulls them back. Former agents are dying. Old contacts are disappearing. The party investigates while trying to maintain their cover as ordinary citizens.',
      keyEvents: [
        'The fallen leaf arrives. Kenta Sho is dead. The nightmares intensify.',
        'The party reunites for the first time in three years. Everyone has changed. Nobody has healed.',
        'Investigating Kenta\'s death: his body shows burns that match no known technique',
        'A second agent dies — this one in a locked room with no entry point. Void Step signature.',
        'The party\'s civilian lives start unraveling: a neighbor finds a hidden weapon, a student asks about the scars',
        'An old enemy surfaces: Hanzo, a rival clan operative who should have been executed after the war',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Bourne Protocol',
      summary:
        'The party goes underground, using their old skills to track the killer. They discover the Void Step connection and begin recovering fragments of their own erased memories. Each fragment is more horrifying than the last.',
      keyEvents: [
        'A former intelligence officer reveals classified files: the party\'s squad was designated "Project Fallen Leaf"',
        'Memory fragments surface during combat — flashbacks to missions the party does not remember running',
        'The party finds a safehouse with their own handwriting on the walls: operational plans they never made',
        'Hanzo reveals he was not their enemy during the war. He was their partner. They erased him from their memory.',
        'A trap: someone is following their investigation, always one step behind, cleaning up what they uncover',
        'The trail leads to Magistrate Okubo — the party\'s former handler, now a respected peacetime official',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Reckoning',
      summary:
        'The full truth surfaces. The party confronts what they were and what was done to their minds. Okubo\'s cleanup operation accelerates. The final confrontation takes place in the ruins of the academy where it all began.',
      keyEvents: [
        'Okubo sends a kill team. The party fights people trained exactly like them — because they were trained together.',
        'The party fully recovers their memories through a ritual. They remember everything. It is not a relief.',
        'Families of the vanished are found: people who lost loved ones to a technique that leaves no body and no grave',
        'The ruins of the Shadow Academy: where Void Step was developed, tested, and deployed. The party\'s training ground.',
        'Okubo\'s offer: silence for peace. Truth for chaos. The party decides what the war really meant.',
        'Epilogue: the party returns to their civilian lives, or does not. Some wounds close. Some were never wounds — they were choices.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Magistrate Okubo',
      role: 'former handler / antagonist',
      personality:
        'Soft-spoken, methodical, genuinely believes he is protecting the peace. He ordered terrible things during the war and sleeps fine because the alternative was worse. Treats the party like wayward children — with affection, condescension, and a willingness to put them down if necessary.',
      secret: 'He used Void Step on himself to erase the guilt. He literally cannot feel remorse for what he did. He chose not to.',
    },
    {
      name: 'Hanzo',
      role: 'former rival / erased ally',
      personality:
        'Bitter, haunted, and furious. He fought alongside the party during the war and they erased him from their memories afterward to protect operational security. He remembers everything. They remember nothing. Imagine being forgotten by the people you would have died for.',
      secret: 'He has been protecting the party from Okubo\'s kill teams for months. They do not know because they do not remember he exists.',
    },
    {
      name: 'Yui',
      role: 'civilian / the life left behind',
      personality:
        'One party member\'s spouse or close friend. Kind, patient, and increasingly aware that the person they love is not who they claimed to be. Does not push. Just watches the scars and the nightmares and waits.',
    },
  ],
  keyLocations: [
    {
      name: 'Ashenvale Village',
      description:
        'A quiet farming village where three former shadow warriors live unremarkable lives. Orchards, a schoolhouse, a bakery. Peaceful in a way that feels fragile.',
      significance: 'The civilian life the party built. What they stand to lose if they are pulled back into the shadows.',
    },
    {
      name: 'The Shadow Academy (Ruins)',
      description:
        'A burned-out compound in a mountain valley. Training rooms, meditation chambers, and a sealed vault where Void Step was developed. The walls still have knife marks from sparring sessions.',
      significance: 'Where the party was trained, where Void Step was born, and where the final confrontation takes place.',
    },
    {
      name: 'The Memory Garden',
      description:
        'A hidden grove where the shadow clans planted a tree for every operative lost during the war. Some trees have no names. Those are the Void Step victims.',
      significance: 'The emotional heart of the campaign. Where the party learns the full human cost of what they did.',
    },
  ],
  dataSystems: [
    'chaseSequence',
    'detectiveCase',
    'npcRelationshipWeb',
    'factionReputation',
    'moralDilemma',
    'trapCorridor',
    'encounterWaves',
    'socialEncounter',
  ],
};
