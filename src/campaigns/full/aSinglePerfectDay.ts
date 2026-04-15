import type { FullCampaign } from '../types';

export const aSinglePerfectDay: FullCampaign = {
  id: 'full-single-perfect-day',
  type: 'full',
  title: 'A Single Perfect Day',
  tagline: 'You have lived this day before. You will live it again. You cannot save everyone.',
  tone: 'serious',
  themes: ['mystery', 'social', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The village of Lannick has 217 people. At sundown, it will be destroyed by a magical catastrophe - a ley line rupture that tears reality apart for six seconds. The party wakes up on the morning of this day, every day, remembering everything. The villagers remember nothing. Every loop resets at midnight. The party can save people by moving them, warning them, changing the sequence of events. But every change has consequences. Save the schoolchildren by evacuating early and the blacksmith stays at his forge instead of leaving for lunch - and dies. Convince the mayor to sound the alarm and half the town panics into the flooding river. There are 217 lives. There is not enough time in one day to save them all.',
  hook: 'You wake up in the Lannick inn. Sunlight through the window. A rooster crows. A woman downstairs is singing while she cooks breakfast. It is a good morning. You do not yet know it is the last morning this village will ever have. By sundown, 163 people will be dead. By midnight, you will wake up in the same bed, hearing the same rooster, smelling the same breakfast. The woman will be singing again. She was one of the 163.',
  twist:
    'The ley line rupture is not natural. It was caused by a wizard named Orin who died in the blast - a resident of Lannick who was trying to save his daughter. His daughter, Mila, has a degenerative magical illness. Orin spent years studying ley lines for a cure. On this day, he attempted to tap the ley line directly. The rupture killed him and 162 others. The time loop is not a curse or a puzzle to solve. It is Orin\'s final spell - his last act of magic, cast in the instant of his death, desperately trying to give someone enough attempts to save Mila and prevent his mistake. The loop breaks when the party saves Mila without the ley line tap.',
  climax:
    'The final loop. The party knows every person\'s schedule, every consequence, every tradeoff. They have accepted that some people will die no matter what. They save Mila by finding an alternative cure in the village healer\'s notes that Orin overlooked in his desperation. They redirect Orin before he reaches the ley line. The day plays out. Sundown comes. The ley line does not rupture. But the party remembers every version - every person they saved and every person they watched die in loops where they made different choices. The village celebrates a beautiful sunset. The party knows what almost happened.',
  acts: [
    {
      title: 'Act 1: The First Days',
      summary:
        'Loops 1 through 5. The party experiences the catastrophe, realizes they are looping, and begins mapping the village - who is where, when, and what happens when they change things. Early wins and devastating unintended consequences.',
      keyEvents: [
        'Loop 1: the day plays out normally. The party experiences the catastrophe. 163 dead. Reset.',
        'Loop 2: the party warns people. Mass panic. Different people die. Total dead: 141.',
        'Loop 3: targeted evacuations. Save the school but the market collapses differently. Dead: 97.',
        'Loop 4: the party starts mapping cause and effect. Every action has a chain reaction.',
        'Loop 5: the party saves the most people yet (dead: 54) but loses someone they had saved in every previous loop. The emotional cost hits.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Pattern',
      summary:
        'Loops 6 through 15. The party refines their approach, discovers the cause of the rupture, and finds Orin. They learn about Mila\'s illness. They realize the loop itself is a message. The emotional toll of remembering every version accumulates.',
      keyEvents: [
        'Discovering Orin\'s workshop and his ley line research',
        'Meeting Mila: a bright, funny kid who does not know today might be her last either way',
        'The party confronts Orin. He will not listen - he is desperate and certain.',
        'A loop where the party saves 200 people but Orin dies. The loop continues. Saving him matters.',
        'The healer\'s notes found in a locked drawer: a slower cure Orin dismissed as insufficient',
        'The party realizes: save Mila another way, and Orin never touches the ley line',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Last Morning',
      summary:
        'The final loop. The party executes their best plan with full knowledge. Not everyone can be saved, but Mila can be cured, Orin can be stopped, and the village can survive. The day ends. The sun sets. There is no explosion. The loop breaks. The party remembers everything.',
      keyEvents: [
        'Dawn: the party wakes up knowing this is the last loop',
        'Cure Mila using the healer\'s method - it is slow, it requires ingredients scattered across the village',
        'Show Orin the cure working. Watch the desperation leave his face.',
        'The day plays out. Small kindnesses to people the party has come to know across dozens of loops.',
        'Sundown: no rupture. The village watches a beautiful sunset. The party watches 217 people live.',
        'The inn woman sings her breakfast song the next morning. The party hears it for the last time. It sounds different when you know what it costs.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Orin Thatch',
      role: 'unwitting cause / desperate father',
      personality:
        'A quiet man. Bad at small talk. Good at magic. Loves his daughter with a ferocity that blinds him. He has not slept properly in months. He is not a villain. He is a father who ran out of time and made the worst possible choice out of the best possible motivation.',
      secret: 'He knows the ley line tap is dangerous. He calculated a 30% chance of catastrophic failure. He decided those odds were acceptable. He was wrong.',
    },
    {
      name: 'Mila Thatch',
      role: 'the key / emotional anchor',
      personality:
        'Twelve years old. Knows she is sick. Does not know her father\'s plan. Spends her days drawing maps of places she wants to visit. Sharp, dry sense of humor. Makes fun of her father\'s cooking. She is easy to love, and the party will have dozens of loops to do so.',
    },
    {
      name: 'Hesta',
      role: 'innkeeper / the singing woman',
      personality:
        'Runs the Lannick inn. Sings while she cooks. Knows every person in the village by name. The party hears her voice every morning when the loop resets. She becomes the sound of a second chance.',
    },
    {
      name: 'Tam Briar',
      role: 'village healer',
      personality:
        'Old. Forgetful. Brilliant in ways she does not advertise. Her notes on Mila\'s condition contain a viable cure that Orin dismissed because it takes weeks, not hours. She does not know her work could save the village.',
      secret: 'She diagnosed Mila two years ago and told Orin there was no fast cure. She has felt guilty ever since, wondering if she pushed him toward desperation.',
    },
  ],
  keyLocations: [
    {
      name: 'Lannick Village',
      description:
        'A village of 217 people that the party will come to know by name, by habit, by schedule. The baker opens at dawn. The schoolbell rings at eight. The fisherman argues with his wife at noon. Every detail matters because any detail might save a life.',
      significance: 'The entire campaign. Every building, every path, every person is a variable.',
    },
    {
      name: 'Orin\'s Workshop',
      description:
        'A cluttered basement beneath a modest house. Ley line diagrams on the walls. A cot where he clearly sleeps most nights. A drawing by Mila pinned above the desk. The calculations are correct. The risk assessment is circled in red.',
      significance: 'Where the party discovers the cause of the catastrophe and the motivation behind it.',
    },
    {
      name: 'The Ley Line Nexus',
      description:
        'A clearing south of the village where three ley lines converge beneath the soil. The grass grows greener here. Animals avoid it. At 6:47 PM, if Orin activates his device, the ground splits open for six seconds and 163 people die.',
      significance: 'The epicenter. Where the catastrophe happens or does not.',
    },
  ],
  dataSystems: [
    'cataclysmCountdown',
    'detectiveCase',
    'npcRelationshipWeb',
    'socialEncounter',
    'partyMoraleTracker',
    'settlementEvent',
    'ritualCasting',
    'naturalDisaster',
  ],
};
