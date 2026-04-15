import type { OneShotCampaign } from '../types';

export const theWordless: OneShotCampaign = {
  id: 'oneshot-wordless',
  type: 'oneshot',
  title: 'The Wordless',
  tagline: 'A village where nobody speaks. Not mute. They choose silence. What scared them into it?',
  tone: 'horror',
  themes: ['horror', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The party arrives at a village where no one speaks. Not a word. Communication is through gestures, written notes, and expressive silence. The villagers are not mute. They are terrified of making sound. The party must figure out why through non-verbal communication and discover what scared an entire community into silence.',
  hook: 'The party calls out a greeting. Every person in the village square flinches and looks at them with wide eyes. An elder rushes forward, puts a finger to her lips, and holds up a slate: "DO NOT SPEAK. IT LISTENS."',
  twist: 'A creature called a Word Eater lives in the forest near the village. It is attracted to spoken language, not sound in general. Animals can make noise. Rain falls. Wind blows. But the moment a word is spoken, the creature comes for the speaker. It consumed three villagers before they understood the rule. Now the village survives in silence.',
  climax: 'The party must either kill the Word Eater (difficult, since coordinating a fight without speaking is nearly impossible), lure it away, or discover what summoned it and reverse it. A bitter scholar summoned it to "silence" a rival and lost control.',
  scenes: [
    {
      title: 'Scene 1: The Silent Village',
      summary: 'Arriving and learning the rules. The party must communicate without speaking and understand the danger through gestures and written notes.',
      challenge: 'social',
      keyEvents: [
        'The greeting flinch: the village reacts to spoken words with visible terror',
        'The elder\'s slate: "It listens for words. Not noise. Words. If you speak, it comes."',
        'The party must switch to non-verbal communication immediately',
        'A child accidentally whispers and the village collectively holds its breath until nothing comes',
      ],
    },
    {
      title: 'Scene 2: The Investigation',
      summary: 'Learning about the Word Eater through written testimony and pantomime. Finding the scholar who summoned it.',
      challenge: 'exploration',
      keyEvents: [
        'Written accounts of the first attacks: three villagers consumed mid-sentence',
        'The creature: described in drawings as a thing of shadow that enters through the mouth',
        'The scholar: living in a warded cottage, the only person who still speaks, behind silencing wards',
        'The truth: she summoned it to silence a rival. The rival is dead. The creature stayed',
      ],
    },
    {
      title: 'Scene 3: The Hunt',
      summary: 'Fighting or banishing the Word Eater without speaking. Coordinating combat through gestures, signals, and trust.',
      challenge: 'combat',
      keyEvents: [
        'The lure: someone must speak to draw the creature out. The risk is real',
        'Combat without verbal communication: no verbal spell components, no battle cries, no coordination',
        'The Word Eater: a shadow that lunges toward any spoken word, consuming the speaker',
        'Banishment: the scholar has the counter-ritual but must speak it, making herself the bait',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elder Moss', role: 'guide', personality: 'The village elder who imposed the silence rule and has not spoken in six months. Communicates through expressive writing and gestures. Every word she writes is precise because words are now the most dangerous things in her world.' },
    { name: 'Scholar Irith', role: 'the cause', personality: 'The bitter academic who summoned the Word Eater and hides behind silencing wards while the village suffers in silence. She knows the banishment but it requires her to speak aloud, making herself the target.' },
    { name: 'The Word Eater', role: 'antagonist', personality: 'A predatory entity from the Far Realm that feeds on language. It does not eat sound. It eats meaning. A scream is safe. A word is fatal. It cannot be reasoned with because it consumes the words before they finish.' },
  ],
  keyLocations: [
    { name: 'The Silent Village', description: 'A functioning community where no one has spoken a word in six months. Signs replace speech. Life continues in eerie quiet.', significance: 'The setting. The silence is oppressive and the party must operate within it.' },
    { name: 'Irith\'s Cottage', description: 'A warded house where the scholar who caused this lives, speaking freely behind magical silence barriers.', significance: 'Where the truth is learned and the banishment method is found.' },
    { name: 'The Clearing', description: 'A forest clearing where the Word Eater was summoned and where the banishment must be performed.', significance: 'The climax location. Someone must speak here, knowing what comes.' },
  ],
  dataSystems: ['monsterLore', 'combatNarration', 'socialEncounter', 'puzzleLock', 'environmentalHazard'],
};
