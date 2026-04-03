// Magical pet peeve system — magic items that have strong opinions about how they're used.

export interface MagicalPetPeeve {
  itemName: string;
  itemType: string;
  petPeeve: string;
  reaction: string;
  mechanicalConsequence: string;
  appeasement: string;
}

const PET_PEEVES: MagicalPetPeeve[] = [
  { itemName: 'Blade of the Perfectionist', itemType: '+1 longsword', petPeeve: 'Hates being sheathed dirty.', reaction: 'Vibrates angrily. Emits a high-pitched whine audible within 30ft.', mechanicalConsequence: '-1 to attack rolls until cleaned. Stealth impossible (whining).', appeasement: 'Clean and polish after every use. It purrs when oiled.' },
  { itemName: 'The Cozy Cloak', itemType: 'Cloak of Protection', petPeeve: 'Refuses to be worn in the rain.', reaction: 'Becomes incredibly heavy and stiff. Wraps tighter, restricting movement.', mechanicalConsequence: '-5 speed and disadvantage on DEX checks when wet.', appeasement: 'Dry it by a fire and tell it what a good cloak it is. Seriously.' },
  { itemName: 'Grumpstaff the Reluctant', itemType: 'Staff of the Magi', petPeeve: 'Dislikes being used for cantrips. "I am a LEGENDARY item, not a flashlight."', reaction: 'Cantrips cast through it have random cosmetic changes (wrong color, backwards, upside down).', mechanicalConsequence: 'Cantrips cast through the staff require Arcana DC 10 or produce embarrassing side effects.', appeasement: 'Cast a 5th+ level spell through it. It needs to feel important.' },
  { itemName: 'The Judgmental Shield', itemType: '+2 Shield', petPeeve: 'Disapproves of retreating.', reaction: 'Becomes transparent and faintly visible. Mutters "coward" in Dwarvish.', mechanicalConsequence: 'AC bonus reduced to +1 for 1 hour after any retreat or disengage action.', appeasement: 'Stand your ground in the next fight. Take at least one hit without flinching.' },
  { itemName: 'Chatterbow', itemType: '+1 Longbow', petPeeve: 'Cannot stand silence. Must be spoken to while firing.', reaction: 'Arrows veer off course if fired in silence.', mechanicalConsequence: '-2 to attack if the wielder doesn\'t say something while shooting (anything counts).', appeasement: 'Narrate your shots. "Arrow, fly true!" works. So does "YEET." The bow isn\'t picky.' },
  { itemName: 'Ring of the Introvert', itemType: 'Ring of Invisibility', petPeeve: 'Hates crowded spaces. Gets anxious around more than 5 people.', reaction: 'Activates invisibility INVOLUNTARILY in crowds. Deactivates when you\'re alone.', mechanicalConsequence: 'In groups of 6+, WIS DC 12 or turn invisible for 1d4 rounds (can\'t control it).', appeasement: 'Spend 1 hour alone each day. The ring needs recharge time away from people.' },
  { itemName: 'The Melodramatic Amulet', itemType: 'Amulet of Health', petPeeve: 'Thinks every scratch is a mortal wound.', reaction: 'Glows bright red and screams psychically when the wearer takes ANY damage.', mechanicalConsequence: 'Stealth impossible for 1 round after taking damage (the amulet screams). +1 to Medicine checks (it highlights injuries).', appeasement: 'Pat the amulet and say "I\'m fine." It calms down after a Persuasion DC 8 check.' },
  { itemName: 'The Vegan Dagger', itemType: '+1 Dagger', petPeeve: 'Refuses to cut meat. Any meat. Including enemies made of meat.', reaction: 'Goes dull against flesh-based creatures. Slides off like it\'s greased.', mechanicalConsequence: 'Deals only 1 damage to living organic creatures. Full damage to constructs, undead, and plants.', appeasement: 'Only use it against non-meat targets for a full day. It forgives but never forgets.' },
];

export function getRandomPetPeeve(): MagicalPetPeeve {
  return PET_PEEVES[Math.floor(Math.random() * PET_PEEVES.length)];
}

export function getPetPeevesByItemType(type: string): MagicalPetPeeve[] {
  return PET_PEEVES.filter((p) => p.itemType.toLowerCase().includes(type.toLowerCase()));
}

export function getPetPeeveCount(): number {
  return PET_PEEVES.length;
}

export function formatPetPeeve(peeve: MagicalPetPeeve): string {
  const lines = [`😤 **${peeve.itemName}** *(${peeve.itemType})*`];
  lines.push(`  Pet Peeve: *${peeve.petPeeve}*`);
  lines.push(`  Reaction: ${peeve.reaction}`);
  lines.push(`  ⚙️ Consequence: ${peeve.mechanicalConsequence}`);
  lines.push(`  💚 Appeasement: ${peeve.appeasement}`);
  return lines.join('\n');
}

export { PET_PEEVES as MAGICAL_PET_PEEVES };
