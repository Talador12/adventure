import type { FullCampaign } from '../types';

export const thePrisonOfStars: FullCampaign = {
  id: 'full-prison-of-stars',
  type: 'full',
  title: 'The Prison of Stars',
  tagline: 'The most secure prison in existence holds one inmate. She says she\'s innocent. The prison agrees.',
  tone: 'mystery',
  themes: ['planar', 'mystery', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 6, end: 14 },
  estimatedSessions: 16,
  settingSummary:
    'Celestia — the prison dimension built by the gods to hold the most dangerous being in existence. One inmate. A thousand guardians. The party is hired as independent investigators because the inmate has filed an appeal, and divine law requires mortal review. The catch: the inmate might actually be innocent, the prison itself is showing signs of sentience, and someone on the outside is trying to make sure the review fails.',
  hook: 'A celestial courier delivers a subpoena: "By order of the Divine Court of Appeals, you are appointed as Mortal Reviewers for Case #1: The Imprisonment of Aethon. Report to the Prison of Stars within 48 hours. Bring comfortable shoes. The corridors are infinite."',
  twist:
    'Aethon — the inmate — was framed by one of the gods who built the prison. She was a mortal hero who discovered that this god had committed a divine crime (killing another deity and absorbing their power). The god imprisoned her in Celestia and erased the evidence. The prison knows — it has been keeping the evidence safe for ten thousand years, waiting for mortal reviewers who could see it.',
  climax:
    'The party presents evidence of the divine frame-up. The guilty god sends agents to destroy the prison rather than be exposed. The party must defend the Prison of Stars, protect Aethon, and ensure the evidence reaches the Divine Court — while fighting inside a sentient prison that is helping them by rearranging its own corridors.',
  acts: [
    {
      title: 'Act 1: The Review',
      summary: 'Arriving at the Prison of Stars, meeting the guardians, and beginning the investigation. The prison is vast, bizarre, and built by gods who value security over comfort.',
      keyEvents: [
        'Arrival via celestial gate — stepping onto a bridge of compressed starlight that stretches between constellations. The prison hangs in void, beautiful and terrible.',
        'Meeting Aethon: she sits cross-legged in her cell, ten thousand years of philosophical graffiti covering the walls. "You are late. But I have learned patience."',
        'The guardians: one construct recites the charges in a monotone that has not varied in ten millennia. The charges reference crimes but never specify what they were.',
        'First evidence review: the trial transcript is three pages long. For a being accused of threatening divine order, the paperwork is suspiciously thin.',
        'Quiet moment: the party stands on the prison observation deck. The stars are closer here. Aethon joins them, silent, looking at a sky she has not seen in ten thousand years.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Evidence',
      summary: 'Deep investigation. The prison itself begins to help — corridors lead to hidden evidence rooms, walls display ancient records, and a guardian breaks protocol to speak privately.',
      keyEvents: [
        'The prison shifts: a corridor that was a dead end yesterday now extends into a sealed archive. The walls are warm — the prison is helping.',
        'The archive: a ledger recording Aethon\'s "crime" in two versions. One says "treason against divine order." The other, in different ink, says "witness to divine crime." Someone amended the record.',
        'A guardian breaks protocol. It stops mid-patrol, turns to the party, and says in a voice that shakes: "I have waited ten thousand years for someone to ask the right question. Ask me why the god of justice has no record of the trial."',
        'External interference: a celestial messenger arrives with forged orders to terminate the review. The seal is almost perfect — but Aethon recognizes the divine signature as belonging to the god who imprisoned her.',
        'Quiet moment: the guardian who broke protocol sits with the party in the archive. It has never sat before. "I was not designed for doubt. It is... uncomfortable."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Defense',
      summary: 'The guilty god acts. Agents assault the prison. The party must defend it, protect Aethon, and transmit the evidence.',
      keyEvents: [
        'Divine agents breach the outer walls — angels whose halos have turned black, weeping as they fight because they know their orders are unjust but cannot disobey',
        'The prison fights back: corridors rearrange into a maze that only the party can navigate. Dead ends form behind pursuers. The prison is choosing a side.',
        'Act 1 callback: the guardian who broke protocol in Act 2 stands in a doorway, blocking three corrupted angels. "Protocol says I defend the prison. The prison says defend the truth."',
        'The evidence must reach the Divine Court: a scroll of starlight that burns to hold, carried through corridors of collapsing architecture while the prison buys time',
        'Aethon is freed. She stands in the doorway of her cell for a long moment. Then she steps into starlight. She does not cry. She breathes.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Aethon',
      role: 'inmate / wrongly imprisoned hero',
      personality: 'Sits perfectly still when thinking, moves with deliberate economy when acting. Ten thousand years have burned away everything that is not essential. Speaks in short, precise sentences. Laughs rarely but genuinely. Taps her finger on surfaces when impatient — the only sign she gives. "I forgave them after the first thousand years. Then I got angry again for the next nine thousand."',
      secret: 'She has been slowly communicating with the prison itself through patterns tapped on the walls. They are allies. She has named every corridor.',
    },
    {
      name: 'Warden-Construct Alpha',
      role: 'prison guardian / rule-bound ally',
      personality: 'Speaks in a resonant monotone that develops inflection as it begins to doubt. Stands at precise 90-degree angles. When conflicted, its head tilts — the first non-protocol movement in its existence. "Protocol is the voice of justice. If justice is corrupted, protocol must be... reinterpreted." The pause before "reinterpreted" lasts three full seconds.',
    },
    {
      name: 'The Guilty God (Nexar)',
      role: 'true antagonist / absent',
      personality: 'A god of justice who committed the ultimate injustice. Never appears directly — acts through corrupted agents and bureaucratic interference. His influence is felt in forged documents, reassigned guardians, and the slow corruption of celestial institutions.',
    },
    {
      name: 'Scribe Velan',
      role: 'Divine Court clerk / reluctant witness',
      personality: 'A celestial bureaucrat assigned to observe the review. Takes obsessive notes on a scroll that never runs out. Adjusts his spectacles constantly. Initially obstructive — citing procedural rules to slow the investigation. Gradually horrified by what the evidence reveals. "This is... irregular. I need to file a form. There is no form for this."',
      secret: 'He found a discrepancy in Nexar\'s records decades ago and buried it because he was afraid. The party\'s investigation is the second chance he never asked for.',
    },
  ],
  keyLocations: [
    {
      name: 'The Prison of Stars',
      description: 'A dimension-sized prison floating between stars. Corridors of polished celestial stone that hum with contained divinity. Light comes from everywhere and nowhere. Exactly one cell.',
      significance: 'The primary setting. The prison itself becomes an ally over the course of the campaign.',
    },
    {
      name: 'The Sealed Archive',
      description: 'A room the prison built itself to hide the real evidence. Walls of compressed light displaying records in divine script. Only appears when mortal reviewers are present.',
      significance: 'Where the truth is found. The prison has been waiting ten thousand years to show someone this room.',
    },
    {
      name: 'The Cell',
      description: 'A comfortable room where Aethon has spent ten millennia. Every surface is covered in philosophical writings — arguments with herself across centuries. A small window shows the stars. She has named every one.',
      significance: 'Where the party meets the inmate. The writings on the walls are the most complete philosophical text in existence.',
    },
  ],
  dataSystems: ['detectiveCase', 'pocketDimension', 'magicalCourtroom', 'puzzleLock', 'encounterWaves', 'deityPantheon', 'darkBargain', 'ancientProphecy', 'clockworkDungeon'],
};
