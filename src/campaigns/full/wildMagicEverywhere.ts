import type { FullCampaign } from '../types';

export const wildMagicEverywhere: FullCampaign = {
  id: 'full-wild-magic-everywhere',
  type: 'full',
  title: 'Wild Magic Everywhere',
  tagline: 'Every spell triggers a wild magic surge. Every. Single. One. Cantrips turn people into potted plants.',
  tone: 'shenanigans',
  themes: ['comedy', 'classic_fantasy', 'survival'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 9 },
  estimatedSessions: 12,
  settingSummary:
    'The Wild Magic Zone used to be a small, contained area in the Briarwood Forest where reality was a bit loose. Wizards avoided it. Sorcerers loved it. Then it expanded. Rapidly. The entire Kingdom of Thervale is now a Wild Magic Zone. Every spell cast - EVERY spell, including cantrips - triggers a wild magic surge. Healing Word might heal you AND summon a unicorn. Fireball works but also makes it rain indoors for an hour. Prestidigitation turned the mayor into a potted plant last Tuesday and he is still photosynthesizing. Magic is essential to civilization. Magic is now completely unpredictable. Society is adapting.',
  hook: 'The party\'s wizard casts Light. The cantrip works. Also, their hair turns blue, gravity reverses for six seconds, and a disembodied voice announces the local weather in Celestial. The cleric casts Cure Wounds. The wound heals. Also, flowers grow from the healed skin and the patient can temporarily see the future. Every spell is a lottery. The party is hired by the Thervale Mages Council to find the edge of the Wild Magic Zone and figure out why it is expanding.',
  twist:
    'The zone is expanding because it is being PUSHED. A rival kingdom\'s archmage created a "Stable Magic Zone" - an anti-wild-magic field - around their own territory. The wild magic had to go somewhere. It is being displaced into Thervale like magical runoff. The rival kingdom has perfect, predictable magic. Thervale has chaos. And the displacement is accelerating.',
  climax:
    'The rival kingdom\'s Stable Zone and Thervale\'s Wild Zone collide at the border. The boundary between perfect order and total chaos creates a front of paradoxical magic where spells are simultaneously predictable and random. The party must either destroy the Stable Zone (giving BOTH kingdoms wild magic), absorb the Wild Zone (giving Thervale stable magic but nowhere for the wild magic to go), or merge them into a balanced zone where magic is mostly predictable with occasional bursts of whimsy. Every spell the party casts in the final battle triggers a surge.',
  acts: [
    {
      title: 'Act 1: Surge and Adapt',
      summary:
        'Every spell is a surprise. The party navigates a kingdom where magic is essential but unpredictable. Society has adapted in hilarious ways: anti-surge insurance, spell surge forecasts like weather reports, and support groups for people turned into plants.',
      keyEvents: [
        'First surge cascade: a simple combat encounter where every spell causes a chain reaction of surges.',
        'The Plant Support Group: former citizens who were polymorphed by surge effects. They have a newsletter.',
        'Surge forecasting: a gnome meteorologist predicts "high surge activity with a chance of temporal displacement."',
        'Investigation: the party maps the zone edge and discovers it is expanding in one direction.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Displacement',
      summary:
        'The party reaches the zone boundary and discovers the rival kingdom\'s Stable Zone. Magic there is perfect - boring, predictable, sterile. The archmage who created it considers wild magic a disease. The party realizes Thervale\'s chaos is the cost of someone else\'s order.',
      keyEvents: [
        'The border: one side is chaos, the other is silence. Crossing feels like switching off a fireworks display.',
        'The Stable Kingdom: magic works perfectly here. It is efficient. It is reliable. It is DEEPLY boring.',
        'The archmage confrontation: "Wild magic is a disease. I cured my kingdom. Yours is simply... downstream."',
        'The displacement theory confirmed: a magical engineer diagrams how stable magic PUSHES wild magic.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Collision',
      summary:
        'The two zones collide. The boundary between order and chaos produces paradox magic. The party fights through a warzone of simultaneous predictability and randomness to reach the epicenter and make their choice.',
      keyEvents: [
        'The collision front: spells work perfectly AND surge simultaneously. Fireballs that are also flowers.',
        'The archmage attacks: she will not allow her Stable Zone to be compromised.',
        'Surge crescendo: every spell cast by anyone produces a surge. The battlefield is beautiful insanity.',
        'The merge: the party combines the zones. Magic becomes mostly stable with occasional moments of wonder. The mayor un-plants.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Archmage Constance Stillwater',
      role: 'rival archmage / antagonist',
      personality:
        'A perfectionist wizard who considers wild magic an abomination. Created the Stable Zone to protect her kingdom at the cost of displacing chaos to others. Speaks in precise, measured sentences. Despises randomness. "Unpredictability is not whimsy. It is failure. My kingdom will not tolerate failure."',
      secret: 'She created the Stable Zone because she was once a Wild Magic Sorcerer who could not control her surges. She feared her own power. The entire Stable Zone is her coping mechanism.',
    },
    {
      name: 'Zephyr Sparks',
      role: 'surge forecaster / ally',
      personality:
        'A gnome who predicts wild magic surges like a weather forecaster. Chipper, excitable, and treats magical chaos with professional enthusiasm. "Today\'s surge forecast: heavy polymorph activity in the morning with a 60% chance of spontaneous levitation by noon. Carry weights."',
    },
    {
      name: 'Mayor Fernsworth (currently a fern)',
      role: 'mayor / potted plant',
      personality:
        'The mayor of Thervale\'s capital who was turned into a potted fern by a surge three weeks ago. Still governs via an interpreter who reads his leaf movements. Remarkably effective. "The mayor indicates - via a slight rustling of his fronds - that the infrastructure budget is approved."',
    },
    {
      name: 'Bramble (Wild Magic Elemental)',
      role: 'manifestation of chaos / wild card',
      personality:
        'A living embodiment of wild magic that coalesced from concentrated surge energy. Changes form, size, color, and species every few minutes. Cannot control what it does but is cheerful about it. "I just turned your boot into a frog! I did not mean to! Watch, I will fix it - oh, now it is TWO frogs."',
    },
  ],
  keyLocations: [
    {
      name: 'Thervale (the Wild Kingdom)',
      description: 'A kingdom where every spell triggers a surge. Buildings are designed to be surge-resistant. Insurance adjusters are the most powerful people in the economy. The sky changes color on Wednesdays.',
      significance: 'The primary setting and a demonstration of how society adapts to magical unpredictability.',
    },
    {
      name: 'The Stable Kingdom (Ordoria)',
      description: 'A kingdom where magic works perfectly every time. Clean, efficient, controlled, and soulless. The streets are orderly. The architecture is symmetrical. Nobody laughs.',
      significance: 'The foil to Thervale and the source of the displacement problem.',
    },
    {
      name: 'The Collision Front',
      description: 'The border where wild and stable magic collide. Reality here is paradoxical - fire that is also ice, gravity that is also buoyancy, time that goes both directions. It is the most dangerous and most beautiful place in the world.',
      significance: 'Where the final confrontation takes place and where the merge must happen.',
    },
  ],
  dataSystems: [
    'wildMagicSurge',
    'combatNarration',
    'environmentalHazard',
    'plotTwistEngine',
    'socialEncounter',
    'fantasyInsults',
    'trapGenerator',
    'riddleGenerator',
  ],
};
