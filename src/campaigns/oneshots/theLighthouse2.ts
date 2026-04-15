import type { OneShotCampaign } from '../types';

export const theLighthouse2: OneShotCampaign = {
  id: 'oneshot-lighthouse-keeper',
  type: 'oneshot',
  title: 'The Lighthouse Keeper',
  tagline: 'The lighthouse keeper has not come down in ten years. The light still burns. The supply notes are still in her handwriting.',
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
        'The ground floor: Morwen\'s coat hangs by the door, stiff with a decade of dust. The supply room beside it is spotless. Someone is cleaning one room and not the other',
        'The second floor: three different beds from three different centuries, all made. A lantern from 200 years ago sits next to a modern oil tin',
        'The walls: names carved by every keeper going back centuries. Run your fingers over them and the stone is warm beneath each name',
        'The air thickens with each floor. Not fog. Presence. Like a room full of people holding their breath',
      ],
    },
    {
      title: 'Scene 2: The Keeper\'s Room',
      summary: 'Finding Morwen\'s remains and understanding what happened. She died peacefully. The light did not go out.',
      challenge: 'exploration',
      keyEvents: [
        'Morwen: sitting in her chair, skeletal, facing the sea. A quill in her bone fingers. The ink is dry. The note is finished',
        'The note reads: "Three gallons lamp oil. Two pounds salt pork. Thank you." Written in steady handwriting. By a woman who was already dead',
        'Her logbook: ten years of entries after the last one in her living hand. The handwriting is hers. The hand was not',
        'The light room above: glass polished to perfection, oil fresh, the wick trimmed this morning. By no one',
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
    { name: 'Keeper Morwen (deceased)', role: 'the discovery', personality: 'Present only as bones and her final note. Her logbook entries are meticulous and dry: weather, oil levels, ship counts. The last entry in her living hand ends mid-word. The next entry, in the same handwriting, is complete.' },
    { name: 'The Keepers (collective ghost)', role: 'the mystery', personality: 'Not individuals. A chorus of duty. They do not speak in sentences. Fragments of logbook language overlap: "Light steady." "Glass cleaned." "Storm coming, double wick." They acknowledge the party the way a worker acknowledges someone passing their desk: a nod, then back to work.' },
    { name: 'Harbormaster Callen', role: 'quest giver', personality: 'Spits over the railing between sentences. Calls everyone "friend" regardless of whether he means it. "Look, friend, I do not believe in ghosts. But I believe in lamp oil. And someone is burning through three gallons a week up there. I want to know who."' },
  ],
  keyLocations: [
    { name: 'The Lighthouse', description: 'A coastal tower that has been perfectly maintained for a decade by a keeper who died 10 years ago.', significance: 'The entire adventure. Every floor tells a story.' },
    { name: 'The Keeper\'s Room', description: 'Where Morwen sits, skeletal, quill in hand, her final note completed by something else.', significance: 'The revelation that changes the party\'s understanding of what is happening.' },
    { name: 'The Light Room', description: 'The top of the lighthouse where the light burns and the ghosts of generations of keepers still work.', significance: 'Where the party sees the truth and makes their decision.' },
  ],
  dataSystems: ['hauntedLocation', 'npcDialogue', 'socialEncounter', 'explorationChallenge', 'moralDilemma'],
};
