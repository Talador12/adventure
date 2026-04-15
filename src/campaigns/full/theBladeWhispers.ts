import type { FullCampaign } from '../types';

export const theBladeWhispers: FullCampaign = {
  id: 'full-the-blade-whispers',
  type: 'full',
  title: 'The Blade Whispers',
  tagline: 'Three hundred souls in the steel. The loudest is a child. She does not understand why she is here.',
  tone: 'horror',
  themes: ['horror', 'dark_fantasy', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 6, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'The dagger called Requiem was forged 300 years ago by an artificer named Elias Mourne, who lost his daughter to an assassin\'s blade. Grief-mad, he built a weapon that would ensure no death was ever forgotten. Every life Requiem takes is absorbed into the blade — consciousness, memories, personality, all of it. The victim lives on inside the steel, aware and unable to leave. Three hundred souls inhabit Requiem now. Some are angry. Some are at peace. Some are desperate to communicate. And one — the most recent — is screaming a warning that the party cannot quite hear.',
  hook: 'The party finds Requiem in a dead man\'s hand at the bottom of a ravine. The moment someone touches it, they hear whispers — dozens of voices, overlapping, urgent. One voice is louder than the rest: "He is coming back. He always comes back. Do not let him take me again." The dead man is Calder Voss, the last person to wield Requiem. He has been dead for three days. His body shows no wound except the dagger in his hand, which he drove into his own heart.',
  twist:
    'The blade is not cursed. It is a memorial. Elias Mourne built it to ensure no death is forgotten — not as punishment, but as remembrance. The original design was compassionate: the absorbed souls were meant to rest in peaceful awareness, their names and stories preserved forever. But 300 years and 300 violent deaths have corrupted the memorial. The accumulated grief, rage, and terror of three centuries of murder victims has driven the blade insane. Requiem is not evil. Requiem is in pain. The whispers are not threats — they are a collective cry for help from souls who were supposed to rest but cannot.',
  climax:
    'The party confronts the assassin Calder Voss\'s predecessor — a woman named the Whisper, who has used Requiem for decades and treats the souls inside as tools. She wants the blade back. The souls inside want her dead. The party must decide: destroy Requiem (freeing 300 souls but erasing their memories permanently), purify it (restoring the memorial but keeping the souls trapped), or give the souls a voice (letting them decide their own fate, which means 300 personalities negotiating in one blade). The Whisper attacks regardless. The blade\'s souls fight on whichever side the party chooses.',
  acts: [
    {
      title: 'Act 1: The Voices',
      summary:
        'The party finds Requiem and begins hearing the whispers. They track the dagger\'s history while the voices grow louder and more distinct. Some souls are helpful. Some are hostile. One is trying to warn them about something specific.',
      keyEvents: [
        'Finding Requiem: Calder\'s body at the bottom of the ravine. The dagger in his heart. The crows will not land near it. The first whispers begin as a hum, like distant conversation through a wall, growing louder as the party approaches.',
        'The voices differentiate: a soldier who died in battle, a thief who died mid-heist, a child who should not be there',
        'Research into the dagger: old records, an artificer\'s journal, a name — Elias Mourne',
        'A soul provides useful intelligence: the location of a hidden cache, a secret passage, a warning about a trap',
        'A hostile soul tries to control the wielder during combat. The dagger fights its own user.',
        'The warning voice clarifies: "The Whisper is looking for me. She will kill anyone holding the blade to get it back."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Memorial',
      summary:
        'The party learns the dagger\'s true nature and tracks down Elias Mourne\'s workshop. They discover the original design was compassionate, not cruel. But 300 years of violent death have corrupted it. Meanwhile, the Whisper closes in.',
      keyEvents: [
        'Elias Mourne\'s workshop: hidden, preserved, and containing the artificer\'s original blueprints',
        'The design: a memorial blade meant to hold souls in peaceful rest. Grief made beautiful. Corrupted by violence.',
        'The child\'s soul: the youngest victim. She does not understand why she is here. She wants her mother.',
        'A soul riot: the hostile voices overwhelm the peaceful ones. The blade becomes dangerous to hold.',
        'The Whisper sends agents: professionals who want the blade and do not care about the souls inside',
        'The party learns the Whisper\'s identity: Calder\'s mentor, the previous wielder, who used the souls as a spy network',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Choice',
      summary:
        'The Whisper confronts the party. The souls demand a voice. The party must decide Requiem\'s fate: destruction, purification, or autonomy. Three hundred souls hang in the balance.',
      keyEvents: [
        'The Whisper arrives: a woman who has wielded Requiem for thirty years and views the souls as property',
        'She offers a trade: the blade for the party\'s lives. She is reasonable. She is also entirely willing to kill them.',
        'The souls revolt: three hundred voices screaming at once. The blade becomes impossible to wield without choosing a side.',
        'The party\'s choice: destroy (freedom but erasure), purify (peace but imprisonment), or empower (autonomy but chaos)',
        'The final battle: the Whisper against the party, with Requiem\'s souls fighting for whoever earned their trust',
        'The aftermath: 300 souls find their resolution. The child\'s soul is the last to speak.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'The Whisper (Maren Ashveil)',
      role: 'antagonist / previous wielder',
      personality:
        'An assassin who views Requiem as a tool, not a memorial. She speaks in a flat, professional tone - the voice of someone who has been compartmentalizing for thirty years. She refers to the souls by number, not name. She does not fidget, does not pace, does not waste movement. But she will not touch the blade with bare hands. She wears gloves. Always. She does not consider the souls people. She considers them resources. This is what makes her a monster and she does not see it.',
      secret: 'She is afraid of the blade. She drove Calder to suicide by telling him the truth about the souls. She wants Requiem back not for the power but because she fears what happens if the souls find someone who will listen to them. The gloves are because she can feel them through the steel. She could always feel them.',
    },
    {
      name: 'Elias Mourne (soul within the blade)',
      role: 'creator / trapped within his creation',
      personality:
        'The artificer who built Requiem. He tested it on himself — drove the blade into his own hand and transferred his consciousness in. He has been inside for 300 years, watching every death, unable to stop the corruption. His voice is the quietest but the most important.',
      secret: 'He knows how to destroy, purify, or free the blade. He has been trying to tell someone for three centuries.',
    },
    {
      name: 'Lira (child soul)',
      role: 'emotional core / the youngest victim',
      personality:
        'A seven-year-old girl who was collateral damage in an assassination gone wrong. She does not understand death or the blade. She thinks she is dreaming. She wants her mother. She is the reason the party will care about 300 strangers trapped in steel.',
    },
    {
      name: 'Calder Voss (deceased)',
      role: 'previous wielder / cautionary tale',
      personality:
        'Found dead with Requiem in his heart. He was a good man who took the blade to destroy it and could not. The voices drove him to despair. His journal, found on his body, says: "I hear them all. I cannot help them. I cannot silence them. I can only join them. Tell someone. Tell anyone."',
    },
  ],
  keyLocations: [
    {
      name: 'The Ravine',
      description:
        'Where Calder died. A rocky gorge with a body at the bottom and a dagger that whispers. The crows will not land near it.',
      significance: 'Where the campaign begins. Where the party picks up the blade and the burden.',
    },
    {
      name: 'Mourne\'s Workshop',
      description:
        'A hidden artificer\'s laboratory in a mountain cave. Blueprints on the walls. Tools on the bench. A portrait of a girl on the wall — Elias\'s daughter, who inspired the blade\'s creation.',
      significance: 'Where the truth about Requiem is revealed. The original compassionate design versus its corrupted reality.',
    },
    {
      name: 'The Chamber of Echoes',
      description:
        'A natural cavern where sound reverberates endlessly. Holding Requiem here amplifies the souls\' voices to full volume. Three hundred people speaking at once in a room that never lets sound die.',
      significance: 'Where the party can finally hear every soul clearly. Where the choice is made.',
    },
  ],
  dataSystems: [
    'hauntedLocation',
    'detectiveCase',
    'npcRelationshipWeb',
    'moralDilemma',
    'encounterWaves',
    'trapCorridor',
    'socialEncounter',
  ],
};
