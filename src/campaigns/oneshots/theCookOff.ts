import type { OneShotCampaign } from '../types';

export const theCookOff: OneShotCampaign = {
  id: 'oneshot-the-cook-off',
  type: 'oneshot',
  title: 'The Cook-Off',
  tagline: 'The ingredients are alive. The judges are blind. The kitchen equipment has opinions.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The Biannual Inter-Species Culinary Championship pits adventurers against monsters in a cooking competition. It was created as a peace-building exercise. It has not built peace. It has built rivalries, grudges, and one truly legendary souffle. The party represents the adventurers\' team. Their opponents are a team of monsters: an orc sous chef, a gelatinous cube (specialized in gelatin desserts, obviously), a fire elemental (grill master), and a mind flayer (whose "brain food" has won three years running). The kitchen equipment is sentient and will critique your technique. The ingredients are alive and must be convinced to be cooked.',
  hook: 'The party enters the competition kitchen. Their station is equipped with sentient pots and pans that have opinions about everything. The mystery ingredient is revealed: live Displacer Beast flank. It keeps displacing away from the cutting board. The judges are blindfolded (one is a beholder - he was already using a blindfold for fairness since his anti-magic eye would ruin the enchanted dishes). The rules: three courses in three hours. Sabotage is technically against the rules but historically unenforced. The monster team is already cheating.',
  twist:
    'The competition is rigged. The organizer, a neutral party merchant named Vellara, has bet everything on the monster team winning. She has been feeding the monsters the party\'s recipes, swapping their ingredients, and bribing one of the judges. The sentient kitchen equipment knows - the pots have been trying to warn the party with increasingly aggressive clanging. "I TOLD you the broth tasted wrong! I was SCREAMING! I am a pot! Screaming is all I can do!"',
  climax:
    'The final course. The party is behind after the sabotage. They must improvise a dish using whatever is left in their station while exposing the rigging. The sentient cutting board testifies against Vellara (it saw everything). The gelatinous cube on the monster team defects - it wanted a fair win. The final dish is judged. The beholder removes his blindfold and uses his anti-magic eye to reveal the truth about the rigged scores. The party wins on merit. The orc demands a rematch. The fire elemental sets the trophy on fire out of principle.',
  scenes: [
    {
      title: 'Scene 1: Mise en Place',
      summary:
        'The teams set up. The mystery ingredient is revealed. The party must wrangle living ingredients and sentient equipment while scoping out the competition.',
      challenge: 'exploration',
      keyEvents: [
        'Mystery ingredient: live Displacer Beast flank that keeps displacing off the cutting board',
        'The sentient equipment introduces itself: a critical pot, an anxious whisk, and a nihilistic cutting board',
        'The monster team is intimidatingly competent - the fire elemental sears meat by touching it',
        'First sabotage: the party\'s salt has been swapped with sugar. The pot noticed. The pot is furious.',
      ],
    },
    {
      title: 'Scene 2: The Main Course',
      summary:
        'Cooking intensifies. Sabotage escalates. The party must cook, defend their station, and figure out who is rigging the competition.',
      challenge: 'puzzle',
      keyEvents: [
        'The gelatinous cube makes a perfect aspic. The party needs to match it.',
        'Sabotage: an ingredient swap mid-cook. The party\'s truffle oil is replaced with troll oil.',
        'The cutting board reveals what it saw: Vellara visited the monster station before the competition',
        'The mind flayer\'s brain food is genuinely brilliant. The party has to innovate, not imitate.',
      ],
    },
    {
      title: 'Scene 3: Dessert and the Truth',
      summary:
        'Final course. The party exposes the rigging, rallies their kitchen equipment, and improvises a winning dish from whatever the saboteur did not ruin.',
      challenge: 'social',
      keyEvents: [
        'The party improvises: the ingredients they have left are unconventional but the pot has an idea',
        'The cutting board testifies: "I have been screaming about this for two hours. Nobody listens to cutting boards."',
        'The beholder judge removes his blindfold - his anti-magic eye reveals enchanted score cards',
        'The gelatinous cube defects: "I wanted to win because I am the best. Not because someone cheated for me."',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Chef Gorthak',
      role: 'rival / worthy opponent',
      personality:
        'An orc head chef who takes cooking as seriously as combat. He is furious about the rigging because it cheapens his skill. "I do not need HELP to beat you. My braised basilisk speaks for itself."',
    },
    {
      name: 'Vellara Coinsworth',
      role: 'villain / organizer',
      personality:
        'The competition organizer who bet her entire fortune on the monster team. She is smooth, charming, and has been rigging competitions for years. When exposed, she tries to bribe the judges in real time.',
    },
    {
      name: 'Potsworth (the sentient pot)',
      role: 'ally / comic relief',
      personality:
        'A sentient copper pot with the personality of a screaming food critic. He knows the sabotage is happening and has been trying to communicate through increasingly violent boiling. "I am a POT. I have no MOUTH. I was BOILING IN MORSE CODE and you just turned down the heat!"',
    },
  ],
  keyLocations: [
    {
      name: 'The Competition Kitchen',
      description: 'A massive open kitchen divided into two stations with a judges\' table at the center. Every surface gleams. Every utensil has feelings.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Pantry',
      description: 'A shared ingredient storage room where both teams can forage. The ingredients are alive, opinionated, and some of them do not want to be eaten.',
      significance: 'Where the sabotage evidence can be found and where emergency substitutions happen.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'combatNarration',
    'randomCombatTerrain',
    'plotTwistEngine',
    'merchantHaggling',
  ],
};
