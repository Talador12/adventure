import type { FullCampaign } from '../types';

export const theSaurianEmpire: FullCampaign = {
  id: 'full-the-saurian-empire',
  type: 'full',
  title: 'The Saurian Empire',
  tagline: 'You ride dinosaurs. They let you. There is a difference.',
  tone: 'epic',
  themes: ['classic_fantasy', 'war', 'exploration'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 20,
  settingSummary:
    'The Saurian Empire spans the continent of Pangara - a vast landmass of steaming jungles, volcanic highlands, and coastal savannas where every civilization rides a different dinosaur. The Crest Legions field Triceratops heavy cavalry in wedge formations. The Sky Wardens patrol on Quetzalcoatlus - forty-foot pterosaurs that cast shadows like clouds. Raptor scouts run the border in packs of six, their Deinonychus mounts bonded from hatching. Ankylosaurus siege engines batter walls. Parasaurolophus horn-callers relay messages across a hundred miles. The Empire has held for three centuries. Now it fractures. The Crest Legions accuse the Sky Wardens of hoarding highland territories. The Raptor clans demand autonomy. The Horn-callers refuse to carry messages for either side. Civil war is one insult away.',
  hook: 'The party are mid-rank riders in the Imperial Bonded Corps - each paired with their own dinosaur companion since adolescence. They are summoned to the capital, Saurheim, by the Empress: "The clans are splitting along mount-lines. Triceratops riders will not serve alongside Raptor riders. My Sky Wardens threaten to blockade the highlands. I need people who remember that the Empire is more than what you ride. Fix this or we all fall."',
  twist:
    'The dinosaurs are not animals. They are the original inhabitants of Pangara - an ancient civilization of saurian intelligence that existed millions of years before humanoids arrived. They chose to be ridden. They saw the small, clever newcomers and offered partnership: carry us, and we will protect you. But over centuries, "partnership" became "domestication." The dinosaurs remember. They have always remembered. The civil war is not between humanoid factions - it is being orchestrated by the dinosaurs themselves, who are tired of being treated as mounts instead of equals. The fracture is their ultimatum: recognize us, or we stop carrying you.',
  climax:
    'The dinosaurs speak. Not through magic or telepathy - they have always been able to speak. They chose not to, waiting for the right moment. A Triceratops matriarch addresses the Imperial Senate in a voice like grinding stone. She demands renegotiation of the partnership. The party must broker a new accord between humanoids and saurians - one that recognizes the dinosaurs as co-rulers, not mounts. The alternative is a continent where the cavalry bucks its riders.',
  acts: [
    {
      title: 'Act 1: The Fracture',
      summary: 'The Empire splits along mount-species lines. The party investigates the cause while riding between hostile factions on dinosaurs that are acting strangely cooperative.',
      keyEvents: [
        'The Crest Legion standoff: Triceratops cavalry blockades a mountain pass. The party must negotiate passage.',
        'Raptor clan ambush: Deinonychus scouts attack a supply convoy - but their riders seem confused, as if the raptors chose the target',
        'A Sky Warden defection: a Quetzalcoatlus rider lands in the capital and says her mount refused to fly. It just sat down.',
        'The party\'s own mounts begin behaving oddly: following commands, but slowly. Choosing their own paths.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Memory',
      summary: 'The party discovers ancient saurian ruins that predate humanoid habitation by millions of years. The dinosaurs are not animals. They never were.',
      keyEvents: [
        'The buried city: beneath the jungle, structures built for bodies much larger than humanoid. Doorways thirty feet tall.',
        'Saurian writing: pictograms that match marks the party\'s own mounts have been scratching in the dirt',
        'A dinosaur elder: the oldest Ankylosaurus in the Empire, covered in scars and lichen. It looks at the party and blinks with unmistakable recognition.',
        'The truth lands: reports flood in. Dinosaurs across the continent are refusing commands simultaneously.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Reckoning',
      summary: 'The dinosaurs speak. The party brokers a new accord or watches the Empire collapse under the weight of a wrong that is millions of years old.',
      keyEvents: [
        'The Triceratops matriarch speaks: addressing the Senate in a voice that shakes the chamber walls',
        'The demand: recognition as co-rulers. Shared governance. The end of "bonding" as ownership.',
        'Hardliner resistance: some humanoids refuse. Some dinosaurs refuse the compromise too.',
        'The new accord: whatever the party brokers, the Saurian Empire is reborn as something unprecedented.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Empress Valara Saurheim',
      role: 'empire ruler / desperate leader',
      personality: 'A rider of forty years who bonded with a Parasaurolophus named Clarion at age twelve. She loves the Empire and cannot imagine it differently. Learning the dinosaurs are people breaks something in her worldview that she must rebuild.',
    },
    {
      name: 'Grandmother Stone',
      role: 'Triceratops matriarch / saurian leader',
      personality: 'The oldest living Triceratops. Her frill is scarred from a hundred battles fought carrying riders she respected but who never asked her name. When she speaks, the ground vibrates. She is not angry. She is tired of waiting.',
    },
    {
      name: 'Vex',
      role: 'party member\'s dinosaur / voice of the mounts',
      personality: 'One of the party\'s own bonded dinosaurs - whichever species the player chose. Has been the party\'s loyal companion for years. Has also been listening, thinking, and deciding when to speak. The betrayal the rider feels is the point.',
    },
    {
      name: 'Commander Drask',
      role: 'Crest Legion hardliner / antagonist',
      personality: 'A decorated Triceratops cavalry officer who refuses to accept dinosaurs as people. Not because he is cruel, but because accepting it means everything he has done - every battle, every bond, every command - was built on a lie.',
    },
  ],
  keyLocations: [
    { name: 'Saurheim', description: 'The Imperial capital. A city built for both humanoids and dinosaurs: wide boulevards, high ceilings, stables the size of cathedrals. The Senate chamber seats a thousand.', significance: 'Political hub and the site of the final accord negotiation.' },
    { name: 'The Buried City', description: 'A saurian metropolis beneath the jungle canopy, millions of years old. Architecture for bodies thirty feet tall. Writing in pictograms that match modern dinosaur behavior.', significance: 'Where the party discovers the truth about saurian intelligence.' },
    { name: 'The Bone Plains', description: 'A vast savanna where dinosaur herds migrate. The largest gathering of saurian life on the continent. When the dinosaurs stop here, it is because they are deciding something.', significance: 'Where the dinosaurs gather to speak and where the accord must be ratified by both peoples.' },
  ],
  dataSystems: ['companionAnimal', 'socialEncounter', 'npcRelationshipWeb', 'npcLoyalty', 'randomPoliticalIntrigue', 'combatManeuvers', 'warRoomBriefing', 'diplomaticIncident', 'partyMoraleTracker'],
};
