import type { OneShotCampaign } from '../types';

export const theFloodgates: OneShotCampaign = {
  id: 'oneshot-floodgates',
  type: 'oneshot',
  title: 'The Floodgates',
  tagline: 'The dam is cracking. The village is below. You have 6 hours.',
  tone: 'survival',
  themes: ['survival', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 4,
  settingSummary: 'A dam above a valley village is cracking. The party discovers it on a morning hike. The village has 200 people who don\'t know. The dam will fail in 6 hours. No time for reinforcements. The party must organize an evacuation, attempt repairs, and make impossible choices about who and what to save.',
  hook: 'The party sees water seeping through cracks in the ancient dam above the valley. A quick assessment: the dam will fail within 6 hours. Below: a village of 200 people going about their morning. No one else knows.',
  twist: 'The dam isn\'t failing naturally. A druid upstream is deliberately weakening it to restore the river\'s natural flow — a dam that was built by exploiting the land. The druid doesn\'t know the village exists (it was built after they went into seclusion). When they learn, they\'re horrified but conflicted: the dam IS destroying the ecosystem. The party must balance ecological justice with 200 lives.',
  climax: 'Final hour. The dam is minutes from failing. The village is half-evacuated. The druid can either stop the erosion (saving the village but keeping the dam) or complete it (restoring the river but flooding what remains). The party must convince the druid, manage the evacuation, and make the impossible call.',
  scenes: [
    { title: 'Scene 1: Discovery and Warning', summary: 'Finding the cracks, racing to warn the village, and organizing chaos. The village mayor doesn\'t believe them at first.', challenge: 'social', keyEvents: ['The cracks: water seeping, stone groaning — obvious to anyone with eyes', 'Running to the village: the party must convince the mayor in under 10 minutes', 'The mayor\'s denial: "That dam has held for 80 years!" — persuasion check', 'Alarm raised: panic, arguments, and the party must take charge'] },
    { title: 'Scene 2: Evacuation and Repair', summary: 'Splitting between evacuating villagers and attempting to shore up the dam. Every choice is time: save more people or buy more time.', challenge: 'exploration', keyEvents: ['Evacuation: 200 people, limited carts, elderly who can\'t walk fast, children who wander', 'Repair attempt: the dam is ancient stone — patching buys hours, not days', 'Discovery: the erosion is deliberate — druid magic, not natural decay', 'Finding the druid: upstream, in a grove, genuinely unaware of the village'] },
    { title: 'Scene 3: The Choice', summary: 'The druid, the dam, and 200 people. Something has to give.', challenge: 'social', keyEvents: ['The druid confronted: "The river is dying. The dam is a crime against nature."', 'The counter: "200 people will die if you finish what you started."', 'The choice: dam or river, village or ecosystem, or a creative third option', 'The final minutes: whatever the choice, the dam\'s fate is sealed'] },
  ],
  keyNPCs: [
    { name: 'Mayor Aldric', role: 'village leader / denial', personality: 'A stubborn mayor who built his life in this valley. Denial isn\'t cowardice — it\'s love. He can\'t imagine losing the village. When he finally accepts, he\'s the most effective evacuator.' },
    { name: 'Druid Ashwood', role: 'antagonist / sympathetic', personality: 'A druid who has watched the river ecosystem die for 20 years because of the dam. Not evil — principled. When they learn about the village: "I didn\'t know. I swear I didn\'t know. But the river is still dying."' },
    { name: 'Mila (elderly villager)', role: 'human stakes', personality: 'A 90-year-old woman who refuses to leave her home. "I was born in that house. I\'ll die in that house." The party must carry her, convince her, or respect her choice.' },
  ],
  keyLocations: [
    { name: 'The Dam', description: 'An 80-year-old stone dam holding back a mountain lake. Cracks spider-web across its face. Water seeps.', significance: 'The ticking clock.' },
    { name: 'The Village', description: 'A farming community of 200 in the valley below. Unaware, going about their morning. About to become a lake bed.', significance: 'The stakes.' },
    { name: 'The High Ground', description: 'A ridge above the valley where evacuees must reach. Far enough, high enough, safe enough — if they get there in time.', significance: 'The destination.' },
  ],
  dataSystems: ['naturalDisaster', 'wildernessSurvival', 'cataclysmCountdown', 'socialEncounter', 'partyMoraleTracker', 'encounterWaves'],
};
