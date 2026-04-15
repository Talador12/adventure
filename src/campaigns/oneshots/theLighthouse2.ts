import type { OneShotCampaign } from '../types';

export const theLighthouse2: OneShotCampaign = {
  id: 'oneshot-lighthouse-keeper',
  type: 'oneshot',
  title: 'The Lighthouse Keeper',
  tagline: 'A lighthouse keeper has not come down in 10 years. Something happened up there.',
  tone: 'serious',
  themes: ['mystery', 'nautical'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'A coastal lighthouse has been operational for 10 years without its keeper ever descending. Supplies are sent up by rope and pulley. Notes come down requesting food and oil. The handwriting matches. But nobody has seen or spoken to Keeper Morwen in a decade. The town is worried. The party climbs up.',
  hook: 'The harbormaster shows the party the rope system. A basket goes up with supplies every week. A note comes down every week. "Same handwriting. Same requests. But she has not come down in 10 years. Not once. The light works. The ships are safe. But something is wrong up there."',
  twist: 'Morwen died 10 years ago. A ghost of the lighthouse itself, an echo of every keeper who served there, has been maintaining the light using her handwriting and habits. The lighthouse is haunted not by a malicious spirit but by the accumulated devotion of generations of keepers who refused to let the light go out, even in death.',
  climax: 'The party must decide what to do: let the ghost keep the light (it is doing a good job), find a new keeper (disrupting the echo), or find a way to honor the dead keepers and transition to a living one.',
  scenes: [
    {
      title: 'Scene 1: The Climb',
      summary: 'Ascending the lighthouse. Each floor shows a different era of the lighthouse\'s history, maintained by hands that no longer exist.',
      challenge: 'exploration',
      keyEvents: [
        'The ground floor: Morwen\'s belongings, 10 years of dust on personal items, supply room clean',
        'The second floor: sleeping quarters from multiple eras layered on top of each other',
        'The walls: names carved by every keeper, going back centuries, including Morwen\'s',
        'Each floor is warmer and the air feels thicker, like the presence of many people in one space',
      ],
    },
    {
      title: 'Scene 2: The Keeper\'s Room',
      summary: 'Finding Morwen\'s remains and understanding what happened. She died peacefully. The light did not go out.',
      challenge: 'exploration',
      keyEvents: [
        'Morwen: sitting in her chair, skeletal, facing the window, a quill in her hand',
        'She died of natural causes, 10 years ago, writing a supply request',
        'The request was finished and sent down. In her handwriting. After her death',
        'The light room above: immaculately maintained, oil fresh, glass polished',
      ],
    },
    {
      title: 'Scene 3: The Keepers',
      summary: 'At the top, the truth. The ghosts of every keeper are present, maintaining the light as they always have.',
      challenge: 'social',
      keyEvents: [
        'The light room: faint figures moving around the mechanism, polishing, adjusting, tending',
        'They are not hostile. They barely notice the party. They are doing their job',
        'Communication: fragmented, echoes of duty. "The light must not go out."',
        'The party decides: honor them and find a successor, let them continue, or release them',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Keeper Morwen (deceased)', role: 'the discovery', personality: 'Present only as remains and her final unfinished note. By all accounts, a dedicated keeper who loved her work and her solitude. She died as she lived: at her post.' },
    { name: 'The Keepers (collective ghost)', role: 'the mystery', personality: 'Not individuals but an echo of devotion. Every keeper who served this lighthouse left a piece of themselves in it. Together, they are a presence that maintains the light through sheer accumulated purpose.' },
    { name: 'Harbormaster Callen', role: 'quest giver', personality: 'A practical sailor who does not believe in ghosts but cannot explain 10 years of perfect lighthouse operation by a woman who might not be alive. "I do not care if it is a ghost. I care if the light stays on."' },
  ],
  keyLocations: [
    { name: 'The Lighthouse', description: 'A coastal tower that has been perfectly maintained for a decade by a keeper who died 10 years ago.', significance: 'The entire adventure. Every floor tells a story.' },
    { name: 'The Keeper\'s Room', description: 'Where Morwen sits, skeletal, quill in hand, her final note completed by something else.', significance: 'The revelation that changes the party\'s understanding of what is happening.' },
    { name: 'The Light Room', description: 'The top of the lighthouse where the light burns and the ghosts of generations of keepers still work.', significance: 'Where the party sees the truth and makes their decision.' },
  ],
  dataSystems: ['hauntedLocation', 'npcDialogue', 'socialEncounter', 'explorationChallenge', 'moralDilemma'],
};
