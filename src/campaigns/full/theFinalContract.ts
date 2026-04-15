import type { FullCampaign } from '../types';

export const theFinalContract: FullCampaign = {
  id: 'full-the-final-contract',
  type: 'full',
  title: 'The Final Contract',
  tagline: 'The world\'s greatest assassin wants to die. He cannot. He hired you to help him find out how.',
  tone: 'serious',
  themes: ['dark_fantasy', 'intrigue', 'war'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'The world knows Valen Corr as the most dangerous man alive. Three hundred confirmed kills across forty years. Kings, generals, crime lords, and one demigod. He is a legend told in whispers. What the world does not know is that Valen Corr has been cursed with immortality for the last 200 years. He cannot die. He cannot age. Every wound heals in seconds. Every poison fails. Every blade breaks. And he is tired. Bone tired. Two centuries tired. He does not want another contract. He wants the last one: his own death. He has hired the party — not to kill him (they cannot), but to help him find the one thing that can end the curse.',
  hook: 'A letter arrives at the party\'s door, sealed with black wax. Inside, a single page: "I am Valen Corr. I need to die. I will pay you everything I have earned in 200 years of killing, which is more gold than most kingdoms possess. Meet me at the Broken Crown Inn. Come armed. Not for me — for what is following me." The party arrives to find the most dangerous man in the world sitting at a table, petting a dog, and looking like he has not slept in a century.',
  twist:
    'The curse was placed by the mother of Valen\'s first victim — a young soldier he killed on contract when he was twenty years old. The mother was a powerful witch who wanted Valen to suffer for eternity. She bound his life force so that he could never die, never rest, and never forget. The curse sustains itself on his guilt. Finding the witch is the key — not to break the curse by force, but to ask forgiveness. She is 200 years old, kept alive by the same magic that fuels the curse. She is in a cottage at the edge of the world. She is just as tired of this as Valen is. She cast the curse in grief and has spent two centuries regretting it.',
  climax:
    'The party finds Mother Sera in her cottage. She is ancient, frail, and weeping. Valen walks in and she recognizes him immediately. Two hundred years of hatred, grief, and exhaustion are in that room. Valen does not ask for the curse to be broken. He asks for forgiveness. It is the one thing he never tried. Sera must decide: release the man who killed her son, or hold the curse until it consumes them both. If she forgives, the curse lifts and both of them age two centuries in an instant. They die together, at peace. If she refuses, the party must find another way — or accept that some wounds do not heal.',
  acts: [
    {
      title: 'Act 1: The Road Trip',
      summary:
        'The party travels with Valen, who is kind, tired, funny, and the most dangerous person within a hundred miles at any given moment. They search for clues about the curse while dealing with Valen\'s reputation — everyone recognizes him and most people are terrified.',
      keyEvents: [
        'The Broken Crown Inn: meeting Valen. He is petting a dog. He looks exhausted. The dog loves him.',
        'First demonstration of the curse: a bandit stabs Valen in the chest. He pulls the knife out, sighs, and hands it back.',
        'A town refuses them entry because Valen killed their lord thirty years ago. He does not remember. He has killed too many.',
        'Valen tells the story of his first kill while they camp. The party realizes the legendary assassin is haunted.',
        'A bounty hunter squad attacks. Valen defeats them without killing anyone. "I have killed enough."',
        'Research: an ancient library holds records of curse-breaking. The curse is bound to guilt, not magic.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Search',
      summary:
        'The trail leads to the curse\'s origin. The party learns about Valen\'s first victim, the mother who cursed him, and the nature of the binding. They must navigate dangerous territory while keeping Valen alive — which is easy because he cannot die, but protecting his spirit is the real challenge.',
      keyEvents: [
        'The first victim\'s hometown: a village that still remembers the boy who was killed. His name was Alder.',
        'Valen visits Alder\'s grave. He leaves flowers. He has been leaving flowers for 200 years. The groundskeeper knows him.',
        'The witch\'s trail: Sera was last seen decades ago at the edge of the Wastes. She is still alive. The curse sustains them both.',
        'A group of Valen\'s former victims\' families confronts the party. Not with swords - with grief.',
        'Valen offers to let the families hurt him. His body heals instantly. Their anger does not.',
        'Quiet moment: Valen and a party member sit on a hillside watching sunset. He says: "Three hundred names. I say them every morning. It takes eleven minutes. That is my prayer." If the party helped the families earlier, one of them left Valen a letter. He reads it by the fire and does not speak for an hour.',
        'The Wastes: a dead land at the edge of the world. Something lives at the center. Something old.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Cottage',
      summary:
        'The party reaches Sera\'s cottage. The final confrontation is not a fight. It is a conversation between two people who have been bound by grief for two centuries. The party witnesses either forgiveness or refusal, and the consequences of whichever comes.',
      keyEvents: [
        'The cottage at the edge of the Wastes: small, tidy, surrounded by dead gardens. Sera has been waiting.',
        'Sera sees Valen and her first words are: "You look the same. I hate that you look the same."',
        'The conversation: Valen apologizes. Not for mercy. Not for the curse. For killing Alder.',
        'Sera tells the story of her son. Who he was. What he wanted to be. What was taken.',
        'The choice: Sera forgives and the curse lifts — they both age 200 years in a breath. Or she refuses.',
        'The ending: if forgiveness, two old people at peace for the first time in centuries, dying in the same room. If refusal, the party watches Valen walk into the Wastes alone. He will walk forever.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Valen Corr',
      role: 'client / the world\'s greatest assassin',
      personality:
        'Kind. Genuinely kind. Two hundred years of killing taught him the value of everything he took. Pets every dog. Tips every server. Remembers the name of every person he killed - all three hundred. Tells terrible jokes that trail off when he remembers who taught him the punchline. Sleeps sitting up because the nightmares come faster lying down. Calls the party "kid" regardless of their age. The most dangerous man alive and all he wants is a good meal and a rest that lasts.',
      secret: 'He stopped taking contracts eighty years ago. Every reported "Valen Corr assassination" since then was someone else using his name. He let them. He does not care about his reputation. He cares about the dog at the inn that he has to abandon if this works.',
    },
    {
      name: 'Mother Sera',
      role: 'curse caster / grieving mother',
      personality:
        'She was a young mother when she cursed Valen. She is ancient now but the grief is fresh. She has hated him for so long that the hatred is all that kept her going. If she forgives him, she has no reason to live. Which is, she realizes, exactly the point.',
    },
    {
      name: 'The Groundskeeper',
      role: 'minor NPC / emotional anchor',
      personality:
        'Maintains the cemetery where Alder is buried. Has watched a mysterious man leave flowers on the same grave every year for as long as anyone can remember. "He never says a word. Just kneels and puts down flowers. Every year. Rain or shine. For longer than I have been alive."',
    },
  ],
  keyLocations: [
    {
      name: 'The Broken Crown Inn',
      description:
        'A roadside inn where Valen has a permanent room. The innkeeper knows him as "the quiet gentleman who tips well and scares away bandits." The dog is named Copper.',
      significance: 'Where the party meets Valen. Where the campaign begins. Where Copper waits.',
    },
    {
      name: 'Alder\'s Grave',
      description:
        'A simple headstone in a village cemetery. "Alder Sera, beloved son." The flowers on the grave are always fresh.',
      significance: 'Where Valen confronts what he did. The emotional center of the campaign.',
    },
    {
      name: 'The Cottage at the Edge',
      description:
        'A small cottage at the border of the Wastes. Inside, a woman who has been alive for 200 years on spite alone, waiting for either the apology or the death of the man she cursed.',
      significance: 'The final destination. Where the curse was cast and where it ends — one way or another.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'moralDilemma',
    'npcRelationshipWeb',
    'chaseSequence',
    'encounterWaves',
    'detectiveCase',
    'survivalForaging',
  ],
};
