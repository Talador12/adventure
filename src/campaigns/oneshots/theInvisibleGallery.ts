import type { OneShotCampaign } from '../types';

export const theInvisibleGallery: OneShotCampaign = {
  id: 'oneshot-invisible-gallery',
  type: 'oneshot',
  title: 'The Invisible Gallery',
  tagline: 'Steal a painting from a gallery where the art is invisible. Only the curator can see it. Good luck.',
  tone: 'heist',
  themes: ['heist', 'mystery', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The Gallery of Unseen Masterworks displays art that is invisible to everyone except Curator Veil, who enchanted the entire collection. Patrons pay to have Veil describe what they are "seeing." The party must steal a specific painting - "The Last Dawn" - from a gallery where they cannot see the target, the walls are trapped, and the curator knows every piece by feel.',
  hook: 'The client slides a blank canvas across the table: "This is worth fifty thousand gold. You cannot see it because you have not been attuned. It is currently hanging in the Invisible Gallery, third room, east wall - allegedly. Your job: steal it, bring it to me, and I will pay you more gold than you can see."',
  twist: 'The Gallery is not enchanted. Curator Veil is running the most elaborate con in art history. The paintings are genuinely blank canvases. There IS no "Last Dawn." The client who hired the party is a rival con artist who figured out Veil\'s scam and wants to steal the "most valuable" blank canvas to expose the fraud. The party is stealing nothing from a museum of nothing.',
  climax: 'The party reaches the east wall of the third room. There is nothing there. The realization hits. The party must decide: play along and deliver a blank canvas (getting paid), expose the con to the public (justice), or blackmail Curator Veil (profit). Meanwhile, Veil\'s security is very real.',
  scenes: [
    {
      title: 'Scene 1: Casing the Gallery',
      summary: 'Visiting the gallery as patrons. Listening to Veil describe masterpieces they cannot see. Planning the heist around invisible targets.',
      challenge: 'exploration',
      keyEvents: [
        'The tour: Veil describes each invisible painting with passionate detail - compelling performance',
        'The security: very visible - pressure plates, alarm wards, guards who patrol by touch',
        'The layout: rooms, walls, frames - everything is labeled but the art itself is absent',
        'The puzzle: how do you steal something you cannot see, from a wall you cannot touch?',
      ],
    },
    {
      title: 'Scene 2: The Heist',
      summary: 'Breaking in at night. Navigating trapped rooms by memory and touch. Reaching the target wall.',
      challenge: 'puzzle',
      keyEvents: [
        'Entry: the gallery has no windows - only one door, trapped in three different ways',
        'Navigation: the pressure plates activate differently at night - the party maps them in darkness',
        'The third room: east wall, a frame, and... nothing',
        'The revelation: true seeing, detect magic, touch - there is nothing here. There never was.',
      ],
    },
    {
      title: 'Scene 3: The Con',
      summary: 'The truth is out. Now what? The party has options, none of them simple.',
      challenge: 'social',
      keyEvents: [
        'Confronting Veil: she is in the gallery, expecting this moment - she has been found out before',
        'Veil\'s offer: "Take any canvas. Tell your client it is real. You still get paid. Everyone wins."',
        'The client\'s motive: she wants to expose Veil publicly at an art auction - maximum humiliation',
        'The choice: deliver the con, expose the con, or con the con artist',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Curator Veil', role: 'con artist', personality: 'A changeling who has been running the invisible gallery scam for five years. Charming, theatrical, and genuinely talented at description. "Art is about what you feel, not what you see. I just removed the middleman."' },
    { name: 'Lady Prism', role: 'client / rival con artist', personality: 'A wealthy socialite who figured out Veil\'s scam and wants to expose it for personal glory. She is not interested in justice - she is interested in being the person who revealed the fraud.', secret: 'She bought three "invisible paintings" before she realized. This is revenge.' },
  ],
  keyLocations: [
    { name: 'The Gallery of Unseen Masterworks', description: 'A windowless building with ornate frames on every wall holding blank canvases. Guards, traps, and climate control protect nothing. Beautifully lit nothing.', significance: 'The heist location and the crime scene of the con.' },
    { name: 'The Third Room, East Wall', description: 'An ornate gold frame. Pressure plates on the floor. An alarm ward on the wall. Inside the frame: absolutely nothing.', significance: 'The target that does not exist.' },
    { name: 'Veil\'s Office', description: 'The curator\'s private office behind the gallery. Contains real art supplies, fake provenance documents, and a ledger of every "sale."', significance: 'The proof of the con.' },
  ],
  dataSystems: ['heistPlanner', 'trapDisarm', 'socialEncounter'],
};
