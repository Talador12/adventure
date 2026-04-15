import type { OneShotCampaign } from '../types';

export const theStoneChild: OneShotCampaign = {
  id: 'oneshot-stone-child',
  type: 'oneshot',
  title: 'The Stone Child',
  tagline: 'A child is turning to stone. The cure is in a monster\'s lair. The monster is a parent too.',
  tone: 'serious',
  themes: ['classic_fantasy', 'wilderness'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A child in a mountain village is slowly petrifying, her skin turning grey and rigid from her feet upward. A healer says the cure requires heartbloom moss, which grows only in the lair of a basilisk in the high peaks. The party sets out. What they find complicates everything.',
  hook: 'The child, Lira, is sitting in a chair with stone legs and stone hands. She smiles at the party. "My fingers stopped working yesterday. The healer says I have three days before it reaches my heart." Her mother has not slept in a week.',
  twist: 'The basilisk is female and is guarding a nest of eggs that are about to hatch. The heartbloom grows directly beneath the nest because the basilisk\'s body heat keeps it alive. Harvesting enough moss to save Lira will expose the eggs to cold and kill the unborn basilisks. The party must save one set of children at the expense of another, or find a third way.',
  climax: 'The party is in the lair with a dying child on a deadline and a mother basilisk who will fight to the death for her young. Every obvious solution requires someone to suffer. The party must find a way to save both, sacrifice one, or accept an imperfect answer.',
  scenes: [
    {
      title: 'Scene 1: The Mountain',
      summary: 'Climbing to the basilisk\'s lair through dangerous mountain terrain. Time pressure from the child\'s condition drives urgency.',
      challenge: 'exploration',
      keyEvents: [
        'The climb: steep trails, rockfalls, mountain predators displaced by the basilisk',
        'Signs of the basilisk: petrified animals along the trail, claw marks on rocks',
        'A hunter who knows the mountain warns: "She has been territorial lately. Nesting, I think."',
        'The lair entrance: a cave mouth wreathed in warm air, with heartbloom visible inside',
      ],
    },
    {
      title: 'Scene 2: The Lair',
      summary: 'Inside the lair. The heartbloom grows beneath the nest. The basilisk is not initially hostile. She is watchful. She is protecting eggs.',
      challenge: 'exploration',
      keyEvents: [
        'The lair: warm, humid, with bioluminescent moss and the strong scent of stone dust',
        'The nest: five eggs in a depression, warmed by the basilisk\'s body and geothermal heat',
        'The heartbloom: growing directly under the nest, requiring the nest to be moved to harvest',
        'The basilisk watches the party from across the cave. She does not attack first.',
      ],
    },
    {
      title: 'Scene 3: The Choice',
      summary: 'Harvesting the moss means moving the eggs. Moving the eggs may kill them. The basilisk will fight if her eggs are threatened. Time is running out.',
      challenge: 'social',
      keyEvents: [
        'Direct harvest: possible but requires displacing the eggs from their heat source',
        'The basilisk attacks only if the eggs are threatened, not if the party approaches slowly',
        'Creative solutions: warming the eggs artificially, transplanting moss, negotiating through druidic magic',
        'The clock: Lira has hours, not days. Whatever the party does, they must do it now',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Lira', role: 'the stakes', personality: 'Knocks on her own stone knee and giggles because it sounds funny. Draws pictures with her still-working fingers while the adults argue. Says things that destroy the room without knowing it. "If the monster has babies, maybe do not kill the monster. That would make more sad people."' },
    { name: 'Healer Voss', role: 'quest giver', personality: 'Dark circles under his eyes. Washes his hands constantly, a nervous habit. Speaks fast and then stops mid-sentence to think. "Heartbloom moss. That is the only thing left. I wish I could - look, it grows in a basilisk lair. I am not going to pretend that is fine. It is not fine."' },
    { name: 'The Basilisk', role: 'obstacle / mirror', personality: 'A mother protecting her young. Not evil, not sapient enough to negotiate with. She curls around her eggs the way Lira\'s mother curls around Lira\'s chair. She watches the party with one eye. She will die for those eggs. She is, in every way that matters, the same as the woman who has not slept in a week.' },
  ],
  keyLocations: [
    { name: 'The Mountain Village', description: 'A small community in the peaks where a child is slowly turning to stone.', significance: 'Where the quest begins and the emotional stakes are set.' },
    { name: 'The Basilisk\'s Lair', description: 'A warm cave in the high mountains where heartbloom grows beneath a nest of basilisk eggs.', significance: 'The location of both the cure and the moral dilemma.' },
    { name: 'The Nest', description: 'Five eggs in a heated depression, with heartbloom moss growing directly beneath them.', significance: 'The physical embodiment of the choice: one set of children or the other.' },
  ],
  dataSystems: ['monsterLore', 'environmentalHazard', 'socialEncounter', 'moralDilemma', 'combatNarration'],
};
