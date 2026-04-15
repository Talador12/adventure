import type { OneShotCampaign } from '../types';

export const totalPartyKillTeamBuilding: OneShotCampaign = {
  id: 'oneshot-total-party-kill-team-building',
  type: 'oneshot',
  title: 'Total Party Kill Team Building',
  tagline: 'Your guild was acquired by a conglomerate. The trust fall is off a cliff. HR is a beholder. Please fill out your form 27-B.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 2.5,
  settingSummary:
    'The Brave Companions adventuring guild has been acquired by Valor Enterprises, a multinational adventuring conglomerate that owns forty-seven guilds across the realm. As part of the "integration process," all employees (adventurers) are required to attend a mandatory team-building retreat at the Valor Corporate Campus — a dungeon repurposed as a conference center. The facilitator is Grixalor, a beholder who transitioned from dungeon boss to Human Resources Director after a workplace mediation seminar changed his life. The "team-building exercises" are lethal dungeon challenges with corporate branding.',
  hook: 'The party receives a memo (on company letterhead, delivered by a skeleton intern) informing them that attendance at the Quarterly Synergy Alignment Workshop is MANDATORY. Failure to attend will result in "performance review" (execution). The party arrives at the dungeon entrance to find a welcome desk, name tags, and a complimentary tote bag containing a health potion and a pamphlet titled "Dying Together: Building Trust Through Mortal Peril."',
  twist:
    'The team building actually works. By the end of the retreat, the party has survived enough mortal peril together that they are genuinely a better team. Their coordination improves. Their trust deepens. Their combat performance goes up measurably. Grixalor the beholder HR rep gets a performance bonus and a corner office. The corporate synergy was real all along. The party hates that it was real. They will never admit it worked.',
  climax:
    'The final exercise is the "360-Degree Feedback Session" — the party is surrounded by every monster they failed to fully defeat during the earlier exercises. The only way to survive is to use the teamwork skills they accidentally learned. The barbarian trusts the wizard to cover them. The rogue trusts the cleric to heal. They move as a unit for the first time. Grixalor watches through his scrying orb, weeping with all eleven eyes. "They are synergizing. They are FINALLY synergizing."',
  scenes: [
    {
      title: 'Scene 1: The Trust Fall',
      summary: 'The first team-building exercise. A cliff. One party member falls. Another must cast Feather Fall. Trust is measured in spell slots.',
      challenge: 'social',
      keyEvents: [
        'Registration: name tags, liability waivers, and a skeleton intern who whispers "run" as it hands over the tote bags',
        'Grixalor\'s opening speech: "Synergy is not just a word. It is a LIFESTYLE. Today, we die together — metaphorically! Probably."',
        'The trust fall: an actual cliff. "Fall backward. Your teammate will catch you. Probably. We have waivers."',
        'Someone fails to cast Feather Fall in time. The backup is a Bag of Holding at the bottom. It is not comfortable.',
      ],
    },
    {
      title: 'Scene 2: The Rope Course',
      summary: 'A bridge over a bottomless pit. The bridge has no rails. The "facilitator" (a trained minotaur in a polo shirt) cuts ropes at random to "test adaptability."',
      challenge: 'exploration',
      keyEvents: [
        'The rope bridge: swaying, fraying, and the minotaur facilitator is holding scissors',
        '"This exercise measures adaptability under stress. Also grip strength. Mostly grip strength."',
        'A rope snaps. A party member dangles. Another must decide: hold the rope or grab the treasure chest that just appeared.',
        'The minotaur gives feedback: "Good adaptability. Poor rope-to-hand synergy. We will work on that in Q3."',
      ],
    },
    {
      title: 'Scene 3: The Brainstorming Session',
      summary: 'The party enters a room with a whiteboard and markers. A "brainstorming session" begins. An actual brain storm materializes - psychic weather that deals damage if you stop thinking creatively.',
      challenge: 'puzzle',
      keyEvents: [
        'The room: corporate aesthetic, motivational posters ("THERE IS NO I IN PARTY BUT THERE IS A PAR AND THAT IS WHAT WE HOLD OURSELVES TO")',
        'Grixalor: "Now, let us brainstorm solutions for Q3 revenue—" the ceiling opens and psychic lightning rains down',
        'The brain storm: literal psychic weather. Standing still causes damage. Creative thought generates a protective aura.',
        'The whiteboard is magical: writing a good idea on it creates a temporary magical effect. Bad ideas summon more lightning.',
        'Solution: the party must brainstorm their way through a psychic storm by shouting increasingly creative (and desperate) ideas',
      ],
    },
    {
      title: 'Scene 4: 360-Degree Feedback',
      summary: 'The final exercise. Everything they fought before comes back. The only way to survive is to use the teamwork they accidentally learned. Grixalor watches and cries.',
      challenge: 'combat',
      keyEvents: [
        'Grixalor: "For our final exercise: a 360-degree performance review." Every door opens. Everything comes in.',
        'The minotaur facilitator is back. The brain storm is back. The bridge is rebuilding itself in the room.',
        'The party uses their accidental synergy: the fighter trusts the mage, the rogue trusts the cleric',
        'They win. They are a team. They HATE that they are a team. Grixalor sobs with joy from all eleven eyes.',
        'Certificates are distributed. "CERTIFIED SYNERGY PARTNER - Q3 2024." The party frames them ironically. Then unironically.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Grixalor', role: 'HR Director / beholder', personality: 'A beholder who discovered corporate culture at a seminar and never looked back (with any of his eleven eyes). Genuinely passionate about team dynamics. Uses all his eye rays for "motivational purposes." His antimagic cone is deployed during "no-phone zones." Sends follow-up emails after every exercise.' },
    { name: 'The Minotaur Facilitator (Brad)', role: 'exercise coordinator / menace', personality: 'A minotaur in a company polo shirt who takes the exercises extremely seriously. Carries a clipboard in one hand and a greataxe in the other. "This is not punishment. This is GROWTH." Has a degree in Organizational Behavior from a dungeon university.' },
    { name: 'The Skeleton Intern (Kevin)', role: 'support staff / comedic relief', personality: 'An undead intern who has been here for 200 years and still has not been promoted. Whispers warnings to the party. Hands out tote bags with the resignation of someone who has handed out a thousand tote bags. "This is fine. Everything is fine. I am already dead so this is actually fine."' },
  ],
  keyLocations: [
    { name: 'The Valor Corporate Campus', description: 'A dungeon repurposed as a conference center. Torches replaced with motivational posters. Trap rooms repurposed as "interactive learning environments." The cafeteria serves surprisingly good soup.', significance: 'The entire one-shot. Corporate dungeon. The most terrifying words in any language.' },
    { name: 'The Trust Fall Cliff', description: 'A cliff inside the dungeon with a 200-foot drop. A sign reads "TRUST YOUR TEAM" in Comic Sans.', significance: 'The first exercise. Where the party learns that trust is not optional.' },
    { name: 'The Brainstorming Chamber', description: 'A conference room with a magical whiteboard. The ceiling is open to a pocket dimension of psychic weather.', significance: 'Where creative thought is literally weaponized and bad ideas have consequences.' },
  ],
  dataSystems: ['encounterWaves', 'trapCorridor', 'socialEncounter', 'puzzleRoom'],
};
