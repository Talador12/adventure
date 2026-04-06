import type { OneShotCampaign } from '../types';

export const theRoast: OneShotCampaign = {
  id: 'oneshot-roast',
  type: 'oneshot',
  title: 'The Roast',
  tagline: 'The dragon demands entertainment. You chose "comedy roast." Bold move.',
  tone: 'comedic',
  themes: ['comedy', 'social'],
  playerCount: { min: 3, max: 6 },
  level: 6,
  estimatedHours: 3,
  settingSummary: 'A dragon is besieging a town. It will leave if entertained. The mayor, in a moment of desperate genius (or stupidity), challenged the dragon to attend a comedy roast — where the party will roast the dragon, and the dragon will roast the party. If the dragon laughs, it leaves. If it doesn\'t, it eats everyone.',
  hook: 'The mayor wipes sweat from his brow: "I panicked. The dragon said \'entertain me or I burn the town.\' I said \'comedy roast.\' The dragon said yes. You have two hours to write material. The dragon has acid breath AND a dry wit. Good luck."',
  twist: 'The dragon isn\'t actually threatening the town — it\'s auditioning material for the Annual Dragon Comedy Festival and needed a live audience. The "threat" was marketing. If the party\'s material is good enough, the dragon offers them a gig as its opening act.',
  climax: 'The roast. Each party member delivers jokes about the dragon. The dragon delivers jokes about the party. The crowd (the entire terrified town) must judge. If the laughs are real and the dragon is genuinely amused, everyone wins. If the jokes bomb, the dragon is "so embarrassed it might accidentally breathe fire."',
  scenes: [
    { title: 'Scene 1: Writing Material', summary: 'Two hours to research the dragon and write roast jokes. The party must learn about their target: name, hobbies, insecurities, past embarrassments.', challenge: 'social', keyEvents: ['Research: the dragon\'s name is Scorchwick, it collects porcelain, and it was once defeated by a farmer with a mirror', 'Writing material: each player must come up with actual jokes (the DM judges delivery)', 'The dragon sends a rider: "I hope your material is better than the last town. They were DREADFUL."', 'Stage fright: a party member panics — the others must coach them'] },
    { title: 'Scene 2: The Roast', summary: 'A stage, a crowd, and a dragon sitting in a chair that is way too small. The comedy begins.', challenge: 'social', keyEvents: ['The opening: the mayor introduces the party while visibly shaking', 'Each party member takes the stage — actual joke delivery (Charisma checks enhanced by material quality)', 'The dragon\'s response: it heckles back, and its comebacks are DEVASTATING', 'The crowd\'s reaction: terrified laughter that slowly becomes genuine'] },
    { title: 'Scene 3: The Dragon\'s Set', summary: 'The dragon takes the stage and roasts the party. It\'s been preparing for weeks. The material is uncomfortably accurate.', challenge: 'social', keyEvents: ['The dragon does 10 minutes of stand-up about each party member', 'It knows things it shouldn\'t — class-specific jokes, backstory references, personal insecurities', 'The crowd is laughing (with relief and genuine amusement)', 'The finale: the dragon reveals the truth — it needed an opening act, not a sacrifice'] },
  ],
  keyNPCs: [
    { name: 'Scorchwick the Terrible', role: 'dragon comedian', personality: 'A dragon who discovered comedy 50 years ago and has been workshopping material ever since. Terrifying presence. Impeccable timing. "I\'ve been doing open mic nights in caves for decades. This is my big break."' },
    { name: 'Mayor Tumblewick', role: 'quest giver / terrified', personality: 'A halfling mayor who said "comedy roast" while staring into a dragon\'s mouth and has been regretting it ever since. "I could have said \'leave\' or \'we surrender.\' But no. I said COMEDY ROAST."' },
    { name: 'Heckle (the dragon\'s hype man)', role: 'warm-up act', personality: 'A kobold who hypes the crowd before Scorchwick performs. Has a tiny microphone. Takes the job VERY seriously.' },
  ],
  keyLocations: [
    { name: 'The Town Square (Stage)', description: 'A hastily built stage in the town square. The "spotlight" is a torchbearer. The seating is "wherever you won\'t get stepped on by the dragon."', significance: 'Where the roast takes place.' },
    { name: 'Backstage (the tavern)', description: 'Where the party writes material, panics, and practices delivery. The barkeeper is supportive. "I\'ve seen worse open mic nights."', significance: 'Where preparation happens.' },
    { name: 'The Dragon\'s Chair', description: 'A reinforced chair (previously a wagon) where Scorchwick sits in the front row. It creaks ominously.', significance: 'Where the audience of one sits.' },
  ],
  dataSystems: ['dragonPersonality', 'socialEncounter', 'fantasyInsults', 'combatNarration', 'villainMonologue'],
};
