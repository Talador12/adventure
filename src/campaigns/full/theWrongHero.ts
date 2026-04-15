import type { FullCampaign } from '../types';

export const theWrongHero: FullCampaign = {
  id: 'full-the-wrong-hero',
  type: 'full',
  title: 'The Wrong Hero',
  tagline: 'The prophecy is clear. The Chosen One is a goat. Not a metaphorical goat. A literal goat named Gerald.',
  tone: 'comedic',
  themes: ['comedy', 'classic_fantasy', 'epic'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The Dark Lord Malachar has risen. The ancient prophecy speaks of a Chosen One who will defeat him: "Born under a blood moon, marked with a star upon the brow, untouched by darkness, who shall walk the path of the righteous and strike the final blow." Scholars have studied this for decades. Every detail matches exactly one being in the entire realm: a goat named Gerald, who lives on a farm outside of Millbrook. He has a white star on his forehead. He was born during the blood moon of 1487. He has never committed a single evil act (he is a goat). The prophecy is unambiguous. Gerald is the Chosen One. Gerald does not care. Gerald eats tin cans.',
  hook: 'The Council of Sages officially identifies Gerald as the prophesied Chosen One and hires the party to escort him to the Dark Lord\'s fortress. Gerald must be delivered alive, unharmed, and in one piece. The party expects this to be simple. Gerald immediately eats the quest scroll, headbutts the party\'s strongest member, and wanders off a cliff. He survives. He always survives. He is the Chosen One.',
  twist:
    'Gerald is not a goat. He is a polymorphed archmage who cast a permanent self-transformation spell centuries ago to escape his responsibilities. He CHOSE to be a goat because goats do not have to attend council meetings, file reports, or save the world. The prophecy found him anyway. Deep inside his goat brain, the archmage is aware of everything - he is just very committed to being a goat. The party catches glimpses: Gerald dodges a fireball with suspiciously precise timing. Gerald bleats a pattern that sounds like a counterspell. Gerald stares at a magical ward and it opens.',
  climax:
    'The party arrives at the Dark Lord\'s fortress with Gerald. Malachar is confused. His army is confused. Everyone is confused. Gerald eats the Dark Lord\'s battle plans. Malachar attacks Gerald directly - and Gerald, backed into a corner, instinctively drops the polymorph for three seconds. A flash of arcane power obliterates the Dark Lord\'s defenses. Then Gerald is a goat again, chewing on a tapestry. The party must make the final assault while Gerald alternates between being a goat and accidentally being the most powerful mage alive. The Dark Lord falls. Gerald eats the victory banner.',
  acts: [
    {
      title: 'Act 1: Goat Acquisition',
      summary:
        'The party receives the quest, collects Gerald from his farm, and begins the escort. Gerald is uncooperative in every possible way. He eats important things. He wanders into danger. He headbutts allies. And yet, improbably, he survives everything.',
      keyEvents: [
        'The Council of Sages presents the prophecy. The party stares at the goat. The goat stares back.',
        'Collecting Gerald from the farm - his owner does not believe the prophecy and haggles over the price',
        'Gerald eats the map. The backup map. And the compass.',
        'First ambush by the Dark Lord\'s scouts - Gerald accidentally saves the party by headbutting an assassin off a bridge',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Long Road with Gerald',
      summary:
        'The escort continues across dangerous territory. Gerald becomes an unlikely folk hero as word spreads. The Dark Lord sends increasingly powerful agents. Gerald defeats them all through what appears to be dumb luck but is suspiciously competent.',
      keyEvents: [
        'Gerald eats a scroll of Fireball. Nothing happens. Then he belches fire at exactly the right moment.',
        'A town worships Gerald as a god. Gerald eats their sacred shrine. They worship harder.',
        'The Dark Lord sends his lieutenant - Gerald stares at him and the lieutenant\'s armor rusts off',
        'The party catches Gerald alone at night, standing on his hind legs, reading a spellbook. He sees them and goes back to eating grass.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Goat at the Gates',
      summary:
        'The party reaches the Dark Lord\'s fortress. Gerald is somehow still alive and still a goat. The final assault is a mix of genuine heroism from the party and impossible coincidences from Gerald, culminating in a three-second flash of who Gerald really is.',
      keyEvents: [
        'The fortress gates: Gerald headbutts them and they shatter (he hit the structural weak point)',
        'The Dark Lord confronts Gerald. Gerald eats his battle plans. Malachar screams.',
        'Gerald drops polymorph for three seconds - a blast of arcane power destroys the dark army\'s command structure',
        'Gerald is a goat again. He chews on the Dark Lord\'s fallen crown. The war is over.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Gerald',
      role: 'the Chosen One',
      personality:
        'A goat. He eats things. He headbutts things. He stares at things. He has a white star on his forehead and absolutely no interest in saving the world. And yet.',
      secret: 'He is Archmage Meridius, who polymorphed himself permanently 300 years ago to avoid responsibility. The archmage is still in there. He is just VERY committed to being a goat.',
    },
    {
      name: 'Dark Lord Malachar',
      role: 'villain',
      personality:
        'A supremely powerful dark lord who takes himself very seriously. His reaction to learning the Chosen One is a goat is a slow descent from dismissal to rage to existential crisis. "A GOAT? The prophecy chose a GOAT over me? I have an army! I have a fortress! I have a DRAMATIC MONOLOGUE!"',
    },
    {
      name: 'Sage Windhollow',
      role: 'quest giver',
      personality:
        'The elf who identified Gerald through decades of research. She is absolutely certain. She has charts. She has star maps. She has a 300-page thesis. She is also deeply embarrassed. "I dedicated my life to finding the Chosen One. I did not expect... this."',
    },
    {
      name: 'Farmer Ogden',
      role: 'comic relief',
      personality:
        'Gerald\'s owner. A practical man who does not care about prophecies. He wants compensation for his goat. "That goat produces two pints of milk a day. Are your sages going to make up the difference? No? Then he stays."',
    },
  ],
  keyLocations: [
    {
      name: 'Ogden\'s Farm',
      description: 'A modest goat farm outside Millbrook. Gerald\'s pen has been unconsciously warded against dark magic. The fence posts are arranged in a perfect arcane circle. Farmer Ogden thinks he is just good at fencing.',
      significance: 'Where Gerald is found and the quest begins.',
    },
    {
      name: 'The Pilgrim Road',
      description: 'The main road to the Dark Lord\'s fortress. As word of Gerald spreads, shrines to the "Chosen Goat" appear along the road. Some are sincere. Some are sarcastic. Gerald eats all of them.',
      significance: 'The journey setting for Act 2.',
    },
    {
      name: 'The Fortress of Malachar',
      description: 'A massive black fortress surrounded by dark army camps. Intimidating, foreboding, and absolutely not designed to be breached by a goat. And yet.',
      significance: 'The final dungeon and climactic location.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'encounterTableBuilder',
    'villainMonologue',
    'plotTwistEngine',
    'randomCombatEnd',
    'questGenerator',
    'chaseObstacles',
    'prophecyFulfillment',
  ],
};
