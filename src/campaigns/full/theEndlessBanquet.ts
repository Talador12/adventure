import type { FullCampaign } from '../types';

export const theEndlessBanquet: FullCampaign = {
  id: 'full-the-endless-banquet',
  type: 'full',
  title: 'The Endless Banquet',
  tagline: 'The guests have not blinked in weeks. Their jaws still work. The host watches and does not eat.',
  tone: 'horror',
  themes: ['horror', 'dark_fantasy', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 11 },
  estimatedSessions: 14,
  settingSummary:
    'Lord Castagnier\'s banquet was supposed to last one evening. It has been three months. The grand hall of Chateau Castagnier is ablaze with candlelight, overflowing with food, and filled with guests who cannot stop eating. New courses appear every hour - roasted pheasant, honeyed figs, soups that steam with perfect temperature, wine that never runs dry. The food is the finest any of them have ever tasted. The guests are skeletal. They eat constantly and starve. Their bodies consume nothing. Their jaws work mechanically. Some have been eating so long they no longer blink. The music plays. The candles burn. The feast continues.',
  hook: 'A servant escaped. She stumbled into the nearest town, emaciated, babbling about the banquet that would not end. The local lord hires the party to investigate Chateau Castagnier. The servant says the food is wonderful. She says the guests are dying. She says Lord Castagnier sits at the head of the table and watches them eat and does not touch a bite himself. When asked why she escaped, she says she did not. The door just opened. Nobody else tried to leave. The food was too good.',
  twist:
    'The guests are dead. They died weeks ago. What remains are echoes - magical imprints of the guests, animated by the feast\'s enchantment, endlessly consuming to maintain the illusion that the banquet is still happening. The food is real and extraordinary. The guests are not. Lord Castagnier knows. He has been sitting at the head of a table of corpses for weeks, watching their echoes eat and laugh and toast, because the alternative is an empty room and the acknowledgment that his friends are gone. The feast enchantment feeds on his refusal to let go. As long as he watches, they eat. As long as they eat, they seem alive.',
  climax:
    'The party reaches Lord Castagnier at the head of the table. He is thin, awake, and sane. He knows the guests are dead. He knows the echoes are not real. He knows the feast is a monstrous puppet show. He cannot face the silence. The party can break the enchantment by force (the echoes collapse, the food rots, Castagnier is left in a room of bodies), convince Castagnier to let go (he must choose to stop watching, which means choosing to grieve), or find a way to put the dead to rest gently (a funeral within the feast, turning the endless banquet into a wake). Castagnier will resist. Not with violence, but with the desperate logic of a man who knows his friends are dead and cannot bear to see it confirmed.',
  acts: [
    {
      title: 'Act 1: The Invitation',
      summary:
        'The party enters Chateau Castagnier and finds the feast in full swing. The food is extraordinary. The guests are welcoming. The atmosphere is perfect. Something is wrong with the guests\' eyes. Something is wrong with how much they eat. Something is wrong with how thin they are.',
      keyEvents: [
        'The chateau doors open easily. Music, warmth, laughter. A steward offers the party seats at the table.',
        'The food: the best the party has ever tasted. A Wisdom save to not keep eating. It is genuinely difficult.',
        'A guest engages the party in conversation. She is charming. She smells faintly of lavender and decay. She also has not blinked in twenty minutes.',
        'Lord Castagnier at the head of the table: polite, pale, and the only person not eating.',
        'A guest drops a fork and does not pick it up. Her hand continues the motion of eating without it.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Menu',
      summary:
        'Investigation. The party discovers the food provides no nourishment. The guests are wasting away. Attempts to remove guests from the table fail - they return compulsively. Deeper investigation reveals the horror: the guests are already dead. The echoes are all that remain.',
      keyEvents: [
        'A healing spell on a guest reveals something impossible: no life force. The body is animate but not alive.',
        'The kitchen: endless, automated, producing food from nothing. The pantry is a conjuration engine.',
        'The party tries to pull a guest from the table. He screams, struggles, and sits back down. The echo must eat.',
        'A servant\'s quarters diary: "Day 47: they stopped breathing last week. They are still eating. My lord will not leave."',
        'Lord Castagnier, when confronted: "I know. Do you think I do not know? But look at them. They are still here."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Final Course',
      summary:
        'The party must end the feast. The enchantment feeds on Castagnier\'s grief. The echoes resist disruption. The food fights back. And somewhere in the beautiful, horrible spectacle, there is a man who would rather watch the dead eat than sit in an empty room.',
      keyEvents: [
        'The enchantment source: Castagnier\'s own unbroken grief, channeled through a ring his wife gave him. She is one of the echoes.',
        'A fight with the feast itself: animated silverware, aggressive courses, wine that attacks',
        'Castagnier\'s wife\'s echo approaches him. She does not speak. She never spoke. But her echo smiles at him.',
        'The party\'s choice: break by force, convince the lord, or transform the feast into a farewell',
        'The end: whatever form it takes, the candles go out. The music stops. The table is empty.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Lord Castagnier',
      role: 'tragic figure / obstacle',
      personality:
        'A nobleman who loved hosting. His parties were legendary - not for excess, but for warmth. He sits at the head of the table with his hands folded, watching the echoes eat. He has not touched food in weeks. His cheeks are hollow. He speaks in a quiet, measured voice that cracks only when someone suggests the guests might not be real. He is not a glutton. He is a man who cannot bear to clear the table because clearing the table means admitting the guests are gone.',
      secret: 'His wife Elara died first. She was the reason he threw parties. Without her, the table felt empty. He enchanted the feast to keep it full. He talks to her echo every night. She never answers, but she smiles, and that is enough. It is not enough.',
    },
    {
      name: 'Elara (Echo)',
      role: 'emotional weight',
      personality:
        'Lord Castagnier\'s wife. Her echo is the most complete - she almost seems alive. She eats, laughs, and occasionally looks at Castagnier with something that resembles recognition. Her hand sometimes reaches toward his plate, as if to offer him food. It is not recognition. It is a reflection of a habit from when she was alive. That makes it worse.',
    },
    {
      name: 'Marta',
      role: 'quest trigger / survivor',
      personality:
        'The servant who escaped. Practical, shaken, and carrying guilt for leaving. She wants the party to save the guests. She does not know there is nobody left to save.',
    },
    {
      name: 'The Steward (Echo)',
      role: 'obstacle / guide',
      personality:
        'An echo of the chateau\'s steward. He seats guests, pours wine, and maintains perfect service. He is the most functional echo and the most unsettling - a dead man performing hospitality with mechanical precision.',
    },
  ],
  keyLocations: [
    {
      name: 'Chateau Castagnier',
      description: 'A noble estate famous for its hospitality, now a tomb disguised as a dinner party. Candlelit, warm, beautiful, and full of dead people eating.',
      significance: 'The entire campaign. A haunted house where the ghost is grief and the manifestation is an eternal feast.',
    },
    {
      name: 'The Grand Hall',
      description: 'A banquet table that seats sixty. Every seat is full. Every plate is full. Every guest is empty.',
      significance: 'The visual horror. A feast that looks perfect until you notice nobody is breathing.',
    },
    {
      name: 'The Kitchen',
      description: 'An automated conjuration engine that produces endless food. The ovens burn without fuel. The knives cut without hands.',
      significance: 'The mechanism. Breaking the kitchen does not break the enchantment - it is fed by grief, not food.',
    },
  ],
  dataSystems: [
    'cursedItem',
    'trapMechanism',
    'socialEncounter',
    'moralDilemma',
    'dungeonRoom',
    'npcRelationshipWeb',
    'hauntedLocation',
  ],
};
