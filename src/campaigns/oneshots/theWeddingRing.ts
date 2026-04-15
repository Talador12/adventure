import type { OneShotCampaign } from '../types';

export const theWeddingRing: OneShotCampaign = {
  id: 'oneshot-wedding-ring',
  type: 'oneshot',
  title: 'The Wedding Ring',
  tagline: 'Steal a cursed ring off a bride\'s finger. During the ceremony. Without anyone noticing.',
  tone: 'heist',
  themes: ['heist', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'Lady Ashara is marrying Lord Venn at the grandest wedding of the season. Her engagement ring is cursed - a soul-trap that will activate when the wedding vows are spoken. A desperate warlock needs the ring removed before the ceremony concludes or Lady Ashara\'s soul is forfeit. The party must attend the wedding, get the ring off her finger, and replace it with an identical fake - all without disrupting the ceremony.',
  hook: 'The warlock is panicking: "That ring is a soul-trap. When she says \'I do,\' it activates and her soul belongs to whatever demon Lord Venn sold it to. He does not know - he inherited the ring. She does not know - she thinks it is a family heirloom. I have a replica. Swap them. Do NOT stop the wedding - Ashara wants to marry Venn. Just get that ring off her finger."',
  twist: 'Lord Venn knows exactly what the ring does. He is not an innocent inheritor - he made the deal. His family is bankrupt and the demon offered wealth in exchange for a soul delivered via marriage. Venn loves Ashara, but he loves his family\'s legacy more. He will fight to keep the ring on her finger if the party is discovered.',
  climax: 'The vows begin. The ring is still on Ashara\'s finger. The party has one final chance: during the ring exchange, when Venn removes the engagement ring to place the wedding band. That three-second window is the swap. Miss it and Ashara says "I do" wearing a soul-trap.',
  scenes: [
    {
      title: 'Scene 1: The Reception',
      summary: 'Arriving at the wedding as guests, staff, or entertainment. Casing the venue and getting close to the bride.',
      challenge: 'social',
      keyEvents: [
        'Cover identities: guests need invitations, caterers need uniforms, musicians need instruments',
        'The venue: a grand estate with a chapel, gardens, and two hundred guests',
        'Getting close to Ashara: she is surrounded by bridesmaids, family, and well-wishers',
        'Studying the ring: visible on her left hand, glowing faintly to detect magic - definitely cursed',
      ],
    },
    {
      title: 'Scene 2: The Ceremony Begins',
      summary: 'The wedding starts. The party must execute the swap while seated among guests, with all eyes on the bride.',
      challenge: 'puzzle',
      keyEvents: [
        'The processional: Ashara walks in, the ring catches the light, the party spots their window',
        'Distractions: creating a reason for the party to approach the altar without raising alarm',
        'The first attempt: something goes wrong - a bridesmaid notices, a guard shifts, Venn glances over',
        'Plan B: the party adapts mid-ceremony as the officiant reaches the vows',
      ],
    },
    {
      title: 'Scene 3: The Exchange',
      summary: 'The ring exchange. Three seconds. One chance. Then the vows, and it is over.',
      challenge: 'social',
      keyEvents: [
        'Venn removes the engagement ring to place the wedding band - the three-second window',
        'The swap: sleight of hand, mage hand, distraction, or pure audacity',
        'If Venn notices: he grabs the ring back and the party must act fast - publicly or secretly',
        'The "I do": Ashara speaks, the fake ring does nothing, and a soul is saved without the bride ever knowing',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Lady Ashara', role: 'unwitting victim', personality: 'Laughs easily. Touches people\'s arms when she talks to them. Keeps adjusting the ring because it never quite fits right - it was not made for her. Tells the party she is the happiest she has ever been. She means it. That is what makes this hard.' },
    { name: 'Lord Venn', role: 'hidden antagonist', personality: 'Cannot stop looking at the ring. His wedding toast is beautiful and his hand trembles when he raises the glass. Stands too close to Ashara, like proximity is an apology. When the party gets near the ring, he positions himself between them and her hand - subtle, deliberate, desperate.', secret: 'He considered telling her a dozen times. He never did.' },
    { name: 'Warlock Emris', role: 'quest giver', personality: 'Paces while he briefs the party. Cannot attend the wedding because the demon would sense him, which means he is trusting strangers with the life of a woman he clearly cares about. Hands them the replica ring and holds onto it one second too long before letting go.' },
  ],
  keyLocations: [
    { name: 'Ashara Estate Chapel', description: 'A beautiful white stone chapel filled with flowers, candles, and two hundred guests in their finest. The altar is visible from every seat.', significance: 'Where the ceremony and the swap happen.' },
    { name: 'The Garden Reception', description: 'Manicured grounds with fountains and tents. Where guests mingle before the ceremony and the party establishes their cover.', significance: 'The staging area for the heist.' },
    { name: 'The Bridal Suite', description: 'Where Ashara prepares. If the party can get in before the ceremony, the swap is easier - but the bridesmaids guard it fiercely.', significance: 'The ideal swap location if accessible.' },
  ],
  dataSystems: ['heistPlanner', 'socialEncounter', 'npcBackstoryGen'],
};
