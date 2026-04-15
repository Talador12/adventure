import type { OneShotCampaign } from '../types';

export const theSmile: OneShotCampaign = {
  id: 'oneshot-smile',
  type: 'oneshot',
  title: 'The Smile',
  tagline: 'An NPC smiles at the party. The same smile. Every NPC. The exact same smile. It is spreading.',
  tone: 'horror',
  themes: ['horror', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The party arrives in a prosperous market town. Everything is normal except for one thing: every person they interact with smiles at them with the exact same smile. Not similar. Identical. The same angle, the same width, the same dead warmth. The butcher, the innkeeper, the children. The same smile. And people the party talks to who were not smiling before start smiling after.',
  hook: 'The gate guard smiles. The innkeeper smiles. A child in the street smiles. The party realizes on the third or fourth interaction: it is the same expression on every face. Exactly the same. Muscles, teeth, eye crinkle. Copy-pasted across every person in town.',
  twist: 'The smile is a parasite. A psychic entity that feeds on facial expressions, consuming genuine emotion and replacing it with a copy of itself. It arrived with a traveling merchant a week ago. Everyone who sees the smile feels compelled to mirror it, and once they do, their genuine expressions are consumed. The town is not happy. The town is hollow. The smile is all that is left.',
  climax: 'The party must find the source: the original host whose smile was copied. The merchant is in the inn, smiling endlessly, unable to stop. Destroying the parasite means experiencing it directly and resisting the urge to smile back.',
  scenes: [
    {
      title: 'Scene 1: The Town of Smiles',
      summary: 'Arriving and experiencing the wrongness. Everyone smiles. Everything feels pleasant and deeply, profoundly wrong.',
      challenge: 'exploration',
      keyEvents: [
        'Every NPC smiles identically. The party notices after 2-3 interactions',
        'People who were not smiling begin smiling after the party speaks to them',
        'A dog growls at the smiling people but is calm around the party',
        'A child tries to frown and cannot. They tug at their own face, confused and scared',
      ],
    },
    {
      title: 'Scene 2: The Spread',
      summary: 'Investigating the smile\'s origin while it actively spreads. Looking at the smile too long creates an urge to mirror it.',
      challenge: 'puzzle',
      keyEvents: [
        'The compulsion: party members must make Wisdom saves when engaging smiling NPCs',
        'Tracking the spread: the smile appeared a week ago, starting at the inn',
        'The merchant: arrived 8 days ago, has been in the common room smiling ever since',
        'Behind the smile: people are screaming inside. A Detect Thoughts reveals trapped minds',
      ],
    },
    {
      title: 'Scene 3: The Source',
      summary: 'Confronting the parasitic entity through the merchant host. The party must resist the smile to destroy it.',
      challenge: 'combat',
      keyEvents: [
        'The merchant: a husk animated by the parasite, smiling wider than a human face should',
        'The parasite manifests when threatened: a shimmering, featureless face in the air',
        'Fighting it: the entity attacks through eye contact, forcing smiles and draining emotion',
        'Destroying it: the smiles crack and fall away like masks, revealing terrified, grateful faces',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Merchant (host)', role: 'vessel / threat', personality: 'The original host of the smile parasite. The person inside is gone, consumed first. The body sits at the inn, smiling endlessly, a puppet with nothing behind the expression.' },
    { name: 'Lira (the child)', role: 'the first warning', personality: 'A child who was infected but is young enough to know something is wrong. She tugs at her own smile, trying to make it stop. "My face is stuck. My face is stuck and it is not my smile."' },
    { name: 'Apothecary Venn', role: 'ally', personality: 'The town apothecary who has been wearing a cloth over their face for days. "I noticed on the second day. I have not looked anyone in the eyes since. I can hear my own urge to smile and it is not mine."' },
  ],
  keyLocations: [
    { name: 'The Market Town', description: 'A prosperous, pleasant town where every resident wears the exact same smile.', significance: 'The setting. The wrongness is everywhere and inescapable.' },
    { name: 'The Common Room', description: 'The inn\'s main room where the merchant sits, smiling, the epicenter of the infection.', significance: 'Where the source is found and the climax plays out.' },
    { name: 'The Apothecary', description: 'The only place in town where someone is not smiling, because they covered their face in time.', significance: 'The party\'s safe harbor and source of information.' },
  ],
  dataSystems: ['hauntedLocation', 'socialEncounter', 'environmentalHazard', 'combatNarration', 'monsterLore'],
};
