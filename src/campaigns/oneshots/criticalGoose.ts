import type { OneShotCampaign } from '../types';

export const criticalGoose: OneShotCampaign = {
  id: 'oneshot-critical-goose',
  type: 'oneshot',
  title: 'Critical Goose',
  tagline: 'A goose stole a magic artifact. The goose is CR 0. The goose is winning.',
  tone: 'shenanigans',
  themes: ['comedy', 'exploration'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 2,
  settingSummary:
    'The village of Pondmere is a quiet lakeside hamlet that exists in a state of perpetual goose-related crisis. Today a goose walked into the village temple, picked up the Amulet of Divine Radiance in its beak, and waddled out. The amulet is a major artifact worth more than the entire village. The goose does not care. It is a goose. The entire one-shot is level 5 adventurers trying and failing to catch a single goose that has no magical abilities, no special stats, and no reason to cooperate.',
  hook: 'The temple priest is hyperventilating. "A GOOSE. A GOOSE TOOK IT. IT JUST WALKED IN AND TOOK IT." The party arrives to find a trail of goose prints leading toward the lake. The goose is visible in the distance. It is looking at them. It honks once. It waddles slightly faster.',
  twist: 'The goose is not magical or special in any way. It is a normal goose. The problem is that every attempt to catch it fails because the party keeps overcomplicating things. Fireballs miss. Nets get tangled in trees. Hold Person does not work on geese. The goose is winning through pure indifference to their efforts. By scene three, the entire village is involved and it is chaos.',
  climax: 'The goose is on the lake. The amulet is in its beak. The party must somehow get the amulet without destroying it, drowning, or being honked at (the goose honks with supernatural volume when threatened - this is not magic, geese are just like that). The solution that actually works: bread. The goose drops the amulet for bread. Five levels of adventurer, and the answer was bread.',
  scenes: [
    {
      title: 'The Chase Begins',
      summary: 'The party spots the goose and attempts to catch it using their considerable adventuring skills. The goose is unimpressed. Spells miss. Grapples fail. The goose waddles at a leisurely pace and is somehow always just out of reach.',
      challenge: 'exploration',
      keyEvents: [
        'First attempt: the fighter lunges. The goose sidesteps. The fighter lands in mud.',
        'The wizard casts Hold Person. The DM reminds them a goose is not a person. The wizard knew that.',
        'The rogue tries stealth. Rolls a 23. The goose looks directly at them and honks.',
        'The goose waddles through the market, knocking over stalls. The party follows, causing more damage than the goose.',
      ],
    },
    {
      title: 'Escalation',
      summary: 'The party escalates their methods. Traps are set. Allies are recruited. The goose evades everything through a combination of being small, being fast, and being a goose.',
      challenge: 'puzzle',
      keyEvents: [
        'A net trap catches three villagers and a dog but not the goose',
        'The ranger\'s animal companion refuses to chase the goose. Even animals respect goose sovereignty.',
        'The party tries to surround the goose. It flies. They forgot geese can fly.',
        'The entire village is now chasing the goose. The goose leads them in a circle back to where they started.',
      ],
    },
    {
      title: 'The Lake Stand-off',
      summary: 'The goose swims to the center of the lake with the amulet. The party must figure out how to get it without sinking, blasting, or further embarrassing themselves. A child suggests bread.',
      challenge: 'social',
      keyEvents: [
        'The goose floats in the middle of the lake, amulet gleaming in its beak, looking smug',
        'The party tries increasingly desperate measures: a rowboat (capsizes), swimming (the goose swims faster), magic hand (the goose bites it)',
        'A village child tugs on the cleric\'s sleeve: "Have you tried bread?"',
        'The party throws bread. The goose drops the amulet, eats the bread, and waddles away. Quest complete. Dignity: zero.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Father Aldric', role: 'quest giver / panicking priest', personality: 'A man who was having a normal morning until a goose committed grand larceny in his temple. He is not handling it well. He keeps saying "it was just a GOOSE" like saying it enough times will make it make sense.' },
    { name: 'The Goose', role: 'antagonist / force of nature', personality: 'A goose. Not magical. Not cursed. Not a polymorphed wizard. Just a goose that saw something shiny and took it. Has no malice, no plan, and no respect for the established social order. Honks.' },
    { name: 'Mila', role: 'voice of reason / child', personality: 'A seven-year-old village girl who feeds the geese daily. She knows the goose. Its name is Gerald. Gerald likes bread. She has been trying to tell the adventurers this for an hour.' },
  ],
  keyLocations: [
    { name: 'Pondmere Village', description: 'A quiet lakeside hamlet with a temple, a market, and an unreasonable number of geese. The villagers are used to goose-related incidents.', significance: 'The chase ground. Every building and alley is a potential goose escape route.' },
    { name: 'Pondmere Lake', description: 'A clear, calm lake. Deep enough to swim, wide enough that a goose in the center is just out of reach. Bread crumbs float on the surface.', significance: 'The final arena. Where the goose makes its last stand and bread saves the day.' },
  ],
  dataSystems: ['chaseSequence', 'socialEncounter', 'combatNarration'],
};
