import type { OneShotCampaign } from '../types';

export const theDatingGame: OneShotCampaign = {
  id: 'oneshot-the-dating-game',
  type: 'oneshot',
  title: 'The Dating Game',
  tagline: 'Contestant 2 is a gelatinous cube who "just wants to absorb someone special."',
  tone: 'comedic',
  themes: ['comedy', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Love is in the air. And also acid, because Contestant 2 is a gelatinous cube. "Monster Meets Match" is the realm\'s most popular magical dating show, broadcast via scrying mirrors to taverns across the continent. The format: three monster contestants compete for a date with an adventurer, answering questions from behind a magical screen. The party hosts the show tonight - some as the production crew, some as the adventurer dates, some as backup when things inevitably go wrong. The audience is live. The ratings are huge. The liability waivers are extensive.',
  hook: 'The original host called in sick (a bard who was too honest about a contestant\'s appearance and is now a newt). The party is drafted from the studio audience. Contestant 1 is a very polite mimic who has been practicing small talk. Contestant 2 is a gelatinous cube who communicates through vibrations translated by a gnomish device. Contestant 3 is three kobolds in a trenchcoat who are absolutely convinced nobody can tell. The adventurer date for tonight? One of the party members. The rest run the show.',
  twist:
    'Contestant 3 - the three kobolds in a trenchcoat - are not actually trying to date anyone. They are fans of the show who entered the contest to meet the other monsters. They have been watching Monster Meets Match for years and consider the gelatinous cube their hero. Their "date persona" is falling apart not because they are bad at it, but because they keep breaking character to ask for autographs. Meanwhile, Contestant 1 (the mimic) is genuinely looking for love and is devastatingly sincere. The gelatinous cube has been on the show six times and has never been chosen. This is its last attempt.',
  climax:
    'The final question round. Contestant 1 gives a heartfelt answer about loneliness that silences the audience. Contestant 2 vibrates the most beautiful poem anyone has ever felt (the translation device barely keeps up). The kobolds drop the trenchcoat and just ask for a group photo. The adventurer must choose. The audience votes. The scrying mirrors across the realm are tuned in. Whatever happens, the party must manage the live reaction: the losing contestants, the winning couple\'s first date (which happens on-stage), and the kobolds who are now running around the studio collecting memorabilia.',
  scenes: [
    {
      title: 'Scene 1: Pre-Show',
      summary:
        'The party is drafted into running the show. They meet the contestants backstage, learn the format, and deal with pre-show disasters.',
      challenge: 'social',
      keyEvents: [
        'The mimic is nervous. It keeps accidentally turning into the furniture backstage.',
        'The gelatinous cube arrives via cart. It is wearing a bow tie (attached with a pin that is slowly being dissolved).',
        'The kobolds rehearse their "tall person" act. The bottom kobold is having second thoughts.',
        'The scrying mirrors activate. They are live. The entire realm is watching. No pressure.',
      ],
    },
    {
      title: 'Scene 2: The Show',
      summary:
        'The dating game plays out. Questions are asked. Answers range from charming to horrifying. The party must keep the show on the rails while managing backstage drama.',
      challenge: 'social',
      keyEvents: [
        'Question: "What is your idea of a perfect date?" Mimic: "Being near someone without them screaming."',
        'The gelatinous cube answers with a vibration-poem about finding your other half. The translator cries.',
        'The kobolds\' trenchcoat fails mid-answer. The bottom kobold falls out. They pretend nothing happened.',
        'An audience member recognizes the mimic as the barstool that ate his drink last week. Security is called.',
      ],
    },
    {
      title: 'Scene 3: The Big Choice',
      summary:
        'The final round. The screen drops. The adventurer sees the contestants for the first time. The reaction, the choice, and the aftermath all happen live.',
      challenge: 'social',
      keyEvents: [
        'The screen drops. The adventurer sees a mimic, a cube, and a pile of kobolds.',
        'The mimic reverts to its natural form - strange, alien, and looking at the adventurer with genuine hope',
        'The gelatinous cube quivers. This is its seventh time on the show. It has never been chosen.',
        'The choice is made. The audience reacts. The kobolds ask everyone for autographs regardless of outcome.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Chester (Contestant 1)',
      role: 'contestant / emotional center',
      personality:
        'A mimic who learned to talk by absorbing a dictionary. He is painfully earnest about wanting connection. He has practiced saying "How was your day?" over 3,000 times. When nervous, he turns into a chair. "I know what I am. I know I am a mimic. I just... I want someone to sit with me because they want to. Not because they think I am a chair."',
    },
    {
      name: 'Gloop (Contestant 2)',
      role: 'contestant / fan favorite',
      personality:
        'A gelatinous cube who communicates through vibrations. The translation device renders its words as surprisingly poetic. Has been on the show six times. Fan mail fills an entire warehouse. Has never been chosen. "I contain multitudes. Literally. I have absorbed several dictionaries."',
    },
    {
      name: 'Skrix, Bonk, and Nib (Contestant 3)',
      role: 'contestants / comic relief',
      personality:
        'Three kobolds in a trenchcoat. Skrix (top) does the talking. Bonk (middle) handles the arms. Nib (bottom) handles the legs and is having the worst time. They are not here for romance. They are here because they are superfans.',
    },
  ],
  keyLocations: [
    {
      name: 'The Monster Meets Match Studio',
      description: 'A converted theater with a stage, a magical screen, three contestant booths, and a live audience of 200. Scrying mirrors broadcast to the realm.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'Backstage',
      description: 'A cramped area where contestants prepare. The mimic keeps turning into props. The gelatinous cube takes up most of the space. The kobolds are trying on different trenchcoats.',
      significance: 'Where pre-show drama and secret planning happen.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'randomNpcRelationship',
    'partyDynamic',
    'plotTwistEngine',
  ],
};
