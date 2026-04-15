import type { OneShotCampaign } from '../types';

export const theClassReunion: OneShotCampaign = {
  id: 'oneshot-the-class-reunion',
  type: 'oneshot',
  title: 'The Class Reunion',
  tagline: 'The fighter is a king. The wizard invented a spell. The rogue does not want to talk about it.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'Thornwall Academy for Adventuring Arts is hosting its 20-year reunion. The party attended this school. They have not seen their classmates since graduation. Everyone has changed. Some became legendary heroes. Some became notorious villains. Some opened taverns. One became a goat farmer and is the happiest person in the room. The venue is the academy\'s Grand Hall, which has been decorated with banners reading "20 YEARS - WHERE HAS THE XP GONE?" There is a buffet. The punch is enchanted. Specifically, someone has spiked it with a potion of truth serum. Secrets will come out tonight.',
  hook: 'The party arrives at the reunion. Name tags are distributed (enchanted to show your current class, level, and most embarrassing school memory). Old classmates descend: the fighter who became King of Ardenvale, the wizard who invented Bigby\'s Slightly Smaller Hand, the bard who became famous for all the wrong reasons, and the rogue who will NOT talk about what she has been doing. The punch is flowing. The truth serum is working. Old rivalries are resurfacing. And the prom king is acting... off.',
  twist:
    'The prom king, Theron Brightblade - the most popular student in the school\'s history, valedictorian, winner of every award - has been a doppelganger the entire time. Not just tonight. The ENTIRE TIME. The real Theron Brightblade was replaced on the first day of school, twenty-four years ago. The doppelganger attended the academy, graduated top of the class, and has been living Theron\'s life ever since. Nobody noticed. The truth serum is about to expose this. The doppelganger is panicking.',
  climax:
    'The truth serum hits the doppelganger during the awards ceremony. He begins shifting between faces mid-speech. The room erupts. Twenty years of friendships, rivalries, and memories are suddenly in question. Was any of it real? The party must calm the crowd, confront the doppelganger, and decide what to do. The doppelganger is terrified - not because he is evil, but because this IS his life. He went to school here. He made these friends. He just... was not born with this face. The resolution is more emotional than anyone expected at what was supposed to be a fun reunion.',
  scenes: [
    {
      title: 'Scene 1: Arrivals and Awkward Small Talk',
      summary:
        'The party arrives, reconnects with classmates, and navigates the social minefield of a reunion where everyone has had very different levels of success.',
      challenge: 'social',
      keyEvents: [
        'Name tag enchantments activate: everyone can see everyone\'s level and worst school memory',
        'The King of Ardenvale arrives with a security detail. He still calls everyone by their school nicknames.',
        'The rogue refuses to say what she does. Her name tag flickers between three different classes.',
        'First truth serum hit: someone admits they cheated on the final exam. The professor is in attendance.',
      ],
    },
    {
      title: 'Scene 2: The Punch Hits',
      summary:
        'The truth serum takes full effect. Secrets pour out. Old grudges resurface. The party navigates confessions, revelations, and the slowly unraveling prom king.',
      challenge: 'social',
      keyEvents: [
        'The wizard admits Bigby\'s Slightly Smaller Hand was an accident - she was trying to cast Mage Hand',
        'A classmate confesses to stealing the school mascot (a trained owlbear). It has been living in his basement.',
        'The prom king\'s speech becomes erratic - his face flickers for half a second. Only the party notices.',
        'Old rivalries explode: the fighter and the paladin argue about who saved whom during the field trip to the Underdark',
      ],
    },
    {
      title: 'Scene 3: The Unmasking',
      summary:
        'The truth serum forces the doppelganger\'s reveal. The party must manage the fallout, protect the doppelganger from the mob, and help everyone reckon with twenty years of unknowing deception.',
      challenge: 'combat',
      keyEvents: [
        'The doppelganger shifts mid-awards speech. The room goes silent.',
        'Panic: some classmates attack. Some defend him. The rogue pulls two knives. The goat farmer pulls everyone behind a table.',
        'The party must de-escalate: the doppelganger is not evil, he is scared. He just wanted to belong.',
        'Resolution: the class votes on whether Theron stays. The truth serum ensures every vote is honest.',
      ],
    },
    {
      title: 'Scene 4: Last Call',
      summary:
        'The dust settles. The reunion continues. Some relationships are mended. Some are broken. The after-party is quieter but more honest than the event itself.',
      challenge: 'social',
      keyEvents: [
        'The class photo: the doppelganger is invited. He cries. He has never been in a photo as himself.',
        'The rogue finally admits what she does: she is a librarian. She was embarrassed about not adventuring.',
        'The goat farmer offers everyone jobs. Nobody takes him up on it. They should.',
        'The party leaves with yearbooks, memories, and the knowledge that people are complicated',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Theron Brightblade (the doppelganger)',
      role: 'twist subject / emotional center',
      personality:
        'Has been living as Theron for twenty-four years. He is charming, beloved, and terrified of being discovered. He is not the real Theron. But the life he has lived IS real. The friendships are real. The memories are real. "I did not replace him to be evil. I replaced him because nobody had ever been nice to me before. And then you all were. And I could not stop."',
      secret: 'The real Theron is alive. He left voluntarily. He hated the pressure of being perfect and paid the doppelganger to take his place.',
    },
    {
      name: 'King Roderick the Bold',
      role: 'classmate / scene stealer',
      personality:
        'The fighter who became a king. Still acts exactly like he did in school: loud, competitive, and incapable of losing gracefully at party games. His guards are embarrassed for him. "I conquered THREE kingdoms. Do I get the alumni achievement award or not?"',
    },
    {
      name: 'Whisper (the rogue)',
      role: 'classmate / red herring',
      personality:
        'Everyone assumes she is an assassin or spy because she will not discuss her career. She is a librarian at a small-town archive. She is deeply happy and deeply embarrassed about not having a dramatic life. "I catalog scrolls. It is fulfilling. Please stop asking."',
    },
    {
      name: 'Professor Dawnmantle',
      role: 'authority figure',
      personality:
        'The party\'s old professor. Still teaches at the academy. Still assigns homework at the reunion. "Your 20-year project was due today. I hope you brought it. I am not joking. This counts toward your final grade."',
    },
  ],
  keyLocations: [
    {
      name: 'Thornwall Academy Grand Hall',
      description: 'The academy\'s main hall, decorated with "20 YEARS" banners, enchanted floating candles, and a buffet table that is slowly being demolished by the barbarian alumni.',
      significance: 'The primary venue for the entire one-shot.',
    },
    {
      name: 'The Courtyard',
      description: 'The academy courtyard where students used to practice combat. Now it has a memorial wall for fallen classmates and a keg.',
      significance: 'Where private conversations and confrontations happen away from the crowd.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationWeb',
    'plotTwistEngine',
    'randomNpcRelationship',
    'combatNarration',
    'partyDynamic',
  ],
};
