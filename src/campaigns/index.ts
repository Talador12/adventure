// Campaign Starter Kit catalog — search, filter, browse
import type {
  CampaignStarterKit,
  CampaignFilter,
  FullCampaign,
  OneShotCampaign,
  CampaignTone,
  CampaignTheme,
} from './types';

// Full campaign imports
import { theShatteredCrown } from './full/theShatteredCrown';
import { theVillageThatForgot } from './full/theVillageThatForgot';
import { vaultOfTheDeadGod } from './full/vaultOfTheDeadGod';
import { theRecurringGoblin } from './full/theRecurringGoblin';
import { theLastLighthouse } from './full/theLastLighthouse';
import { bloodInTheWater } from './full/bloodInTheWater';
import { theClockworkConspiracy } from './full/theClockworkConspiracy';
import { theWildHunt } from './full/theWildHunt';
import { ashesOfTheOldEmpire } from './full/ashesOfTheOldEmpire';
import { theStarfallProphecy } from './full/theStarfallProphecy';
// Phase 2 full campaign imports
import { theDrowningWorld } from './full/theDrowningWorld';
import { theCollegeOfUnfinishedThings } from './full/theCollegeOfUnfinishedThings';
import { theUnderdarkExpress } from './full/theUnderdarkExpress';
import { theGodTournament } from './full/theGodTournament';
import { theHollowKing } from './full/theHollowKing';
import { theLastFeast } from './full/theLastFeast';
import { theGraveyardOfGods } from './full/theGraveyardOfGods';
import { theWarBeneath } from './full/theWarBeneath';
import { thePriceOfImmortality } from './full/thePriceOfImmortality';
import { theCaravanAtTheEndOfTheWorld } from './full/theCaravanAtTheEndOfTheWorld';
// Phase 3 full campaign imports
import { theInheritance } from './full/theInheritance';
import { theForgottenRoad } from './full/theForgottenRoad';
import { theSilverMask } from './full/theSilverMask';
import { theBeastmarket } from './full/theBeastmarket';
import { theThousandYearHeist } from './full/theThousandYearHeist';
import { theGodIsAChild } from './full/theGodIsAChild';
import { thePlagueOfDreams } from './full/thePlagueOfDreams';
import { theRevolutionWillBeNarrated } from './full/theRevolutionWillBeNarrated';
import { theDeadMansTournament } from './full/theDeadMansTournament';
import { theSongOfTheDeep } from './full/theSongOfTheDeep';
import { theArchivistsDilemma } from './full/theArchivistsDilemma';
import { theSummerCourt } from './full/theSummerCourt';
import { theTaxCollector } from './full/theTaxCollector';
import { theSiegeOfHope } from './full/theSiegeOfHope';
import { theMerchantPrinces } from './full/theMerchantPrinces';

// Phase 4 full campaign imports
import { theUnderdarkOlympics } from './full/theUnderdarkOlympics';
import { theEmptyThrone } from './full/theEmptyThrone';
import { thePrisonOfStars } from './full/thePrisonOfStars';
import { theWorldEater } from './full/theWorldEater';
import { theBlindCity } from './full/theBlindCity';
import { theFirstDungeon } from './full/theFirstDungeon';
import { theHarvestFestival } from './full/theHarvestFestival';
import { theGuildsWar } from './full/theGuildsWar';
import { theNameless } from './full/theNameless';
import { theCartographersGambit } from './full/theCartographersGambit';
import { theDiplomatsNightmare } from './full/theDiplomatsNightmare';
import { theLibraryOfBabel } from './full/theLibraryOfBabel';
import { theColosseumOfSouls } from './full/theColosseumOfSouls';
import { theGardenAtWorldsEnd } from './full/theGardenAtWorldsEnd';
import { thePlayersGuide } from './full/thePlayersGuide';

// Phase 5 full campaign imports
import { theObsidianArchive } from './full/theObsidianArchive';
import { theLastOrchard } from './full/theLastOrchard';
import { theGlassCipher } from './full/theGlassCipher';
import { theCrimsonCovenant } from './full/theCrimsonCovenant';
import { theSongsteelSaga } from './full/theSongsteelSaga';
import { theCircusOfNightmares } from './full/theCircusOfNightmares';
import { theCelestialAuction } from './full/theCelestialAuction';
import { theSunkenKingdom } from './full/theSunkenKingdom';
import { theGolemWars } from './full/theGolemWars';
import { thePactOfAshes } from './full/thePactOfAshes';
import { theChimeraSyndicate } from './full/theChimeraSyndicate';
import { theStarforged } from './full/theStarforged';
import { theChronomancersDilemma } from './full/theChronomancersDilemma';
import { theEclipseCourt } from './full/theEclipseCourt';
import { theCovenantOfBloodAndBone } from './full/theCovenantOfBloodAndBone';
import { theSanctumOfSorrows } from './full/theSanctumOfSorrows';
import { theTitanomachyReborn } from './full/theTitanomachyReborn';
import { theMourningMarches } from './full/theMourningMarches';
import { theWeaversOfFate } from './full/theWeaversOfFate';
import { theWardensOfAether } from './full/theWardensOfAether';
import { theHollowMountain } from './full/theHollowMountain';

// Phase 6 full campaign imports (emotional depth)
import { theQuietYear } from './full/theQuietYear';
import { theWeightOfCrowns } from './full/theWeightOfCrowns';
import { theRiverThatRemembers } from './full/theRiverThatRemembers';
import { whenTheMusicStopped } from './full/whenTheMusicStopped';
import { theChildrenOfIron } from './full/theChildrenOfIron';
import { aSinglePerfectDay } from './full/aSinglePerfectDay';

// Phase 7 full campaign imports (comedy spectrum)
import { thePungeon } from './full/thePungeon';
import { bureaucracyAndDragons } from './full/bureaucracyAndDragons';
import { theRoastOfTheArchlich } from './full/theRoastOfTheArchlich';
import { theWrongQuestionnaire } from './full/theWrongQuestionnaire';
import { criticalMassEffect } from './full/criticalMassEffect';
import { theTavernAtTheEndOfTheUniverse } from './full/theTavernAtTheEndOfTheUniverse';
import { theMinMaxKing } from './full/theMinMaxKing';
import { theFlatEarthConspiracy } from './full/theFlatEarthConspiracy';

// Phase 7 full campaign imports (hunted/pursuit)
import { neverLookBack } from './full/neverLookBack';
import { theBlackListCampaign } from './full/theBlackListCampaign';
import { theHoundOfEveryRoad } from './full/theHoundOfEveryRoad';
import { theSmilingShadow } from './full/theSmilingShadow';

// Phase 8 full campaign imports (heist)
import { theVaultOfSouls } from './full/theVaultOfSouls';
import { theArtOfWar } from './full/theArtOfWar';
import { theMintJob } from './full/theMintJob';
import { theLongCon } from './full/theLongCon';
import { breakingAndEnchanting } from './full/breakingAndEnchanting';
import { theMuseumOfImpossibleThings } from './full/theMuseumOfImpossibleThings';

// Phase 8 full campaign imports (political)
import { thePeoplesCrown } from './full/thePeoplesCrown';
import { theLastApothecary } from './full/theLastApothecary';
import { theWallAndTheWild } from './full/theWallAndTheWild';
import { theBookBurners } from './full/theBookBurners';
import { theStrikeBeneath } from './full/theStrikeBeneath';
import { theCouncilOfWhispers } from './full/theCouncilOfWhispers';

// Phase 8 full campaign imports (social)
import { theMatchmaker } from './full/theMatchmaker';
import { theNewNeighbors } from './full/theNewNeighbors';
import { thePlayTheThingIs } from './full/thePlayTheThingIs';
import { theLostLanguage } from './full/theLostLanguage';
import { theGathering } from './full/theGathering';
import { theFuneralGames } from './full/theFuneralGames';

// Phase 8 full campaign imports (survival)
import { theLastWinter } from './full/theLastWinter';
import { afterTheFlood } from './full/afterTheFlood';
import { theAshlands } from './full/theAshlands';
import { belowTheIce } from './full/belowTheIce';
import { theDeadCalm } from './full/theDeadCalm';
import { theCaravan } from './full/theCaravan';

// Phase 8 full campaign imports (epic)
import { theForgottenPantheon } from './full/theForgottenPantheon';
import { theSiegeOfHeaven } from './full/theSiegeOfHeaven';
import { theWorldForge } from './full/theWorldForge';
import { theCrownOfStars } from './full/theCrownOfStars';
import { theLastAlliance } from './full/theLastAlliance';

// Phase 8 full campaign imports (exploration)
import { theEdgeOfTheMap } from './full/theEdgeOfTheMap';
import { theDepthsBelowDepths } from './full/theDepthsBelowDepths';
import { theSkyAboveTheSky } from './full/theSkyAboveTheSky';
import { theRiverWithoutEnd } from './full/theRiverWithoutEnd';
import { theCartographersCurse } from './full/theCartographersCurse';

// Phase 8 full campaign imports (mystery)
import { theClockTowerMurders } from './full/theClockTowerMurders';
import { theInheritanceOfLies } from './full/theInheritanceOfLies';
import { theMissingDay } from './full/theMissingDay';
import { thePoisonersGarden } from './full/thePoisonersGarden';

// Phase 8 full campaign imports (horror)
import { theThinPlaces } from './full/theThinPlaces';
import { whatLivesBeneath } from './full/whatLivesBeneath';
import { theSmileDisease } from './full/theSmileDisease';
import { theArchive } from './full/theArchive';

// Phase 8 full campaign imports (serious)
import { theOathbreaker } from './full/theOathbreaker';
import { theReturningSoldier } from './full/theReturningSoldier';
import { thePriceOfMagic } from './full/thePriceOfMagic';
import { theBridgeBuilder } from './full/theBridgeBuilder';

// Phase 9 full campaign imports (therapy, cozy, satire, genre-bending)
import { theGoodHarvest } from './full/theGoodHarvest';
import { theLastHerd } from './full/theLastHerd';
import { theLittleBakery } from './full/theLittleBakery';
import { theElementalAccord } from './full/theElementalAccord';
import { theIronDeep } from './full/theIronDeep';
import { theNeonAbyss } from './full/theNeonAbyss';
import { theScaleOfThings } from './full/theScaleOfThings';

// Phase 10 full campaign imports (genre expansion)
import { theLastLongship } from './full/theLastLongship';
import { ragnarokTuesday } from './full/ragnarokTuesday';
import { theStarwrightGuild } from './full/theStarwrightGuild';
import { theBoneAge } from './full/theBoneAge';
import { theClockworkAge } from './full/theClockworkAge';
import { theFrozenThrone } from './full/theFrozenThrone';
import { theSpellplague } from './full/theSpellplague';
import { beforeTheFirst } from './full/beforeTheFirst';
import { theSaurianEmpire } from './full/theSaurianEmpire';
import { theWorldBelow } from './full/theWorldBelow';
import { theLastDragonRider } from './full/theLastDragonRider';
import { theAtomicGarden } from './full/theAtomicGarden';

// Phase 10 full campaign imports (reality-breaking)
import { theGiantsPerspective } from './full/theGiantsPerspective';
import { theIncredibleShrinkingParty } from './full/theIncredibleShrinkingParty';
import { benjaminDungeon } from './full/benjaminDungeon';
import { theInfiniteGrowth } from './full/theInfiniteGrowth';
import { gravityOptional } from './full/gravityOptional';
import { theMirrorWar } from './full/theMirrorWar';
import { theWorldIsACreature } from './full/theWorldIsACreature';
import { theBodyPolitic } from './full/theBodyPolitic';
import { theDreamOfDreams } from './full/theDreamOfDreams';
import { theLanguageVirus } from './full/theLanguageVirus';
import { theColorless } from './full/theColorless';
import { immortalityForBeginners } from './full/immortalityForBeginners';
import { theWorldForgotMagic } from './full/theWorldForgotMagic';
import { insideOut } from './full/insideOut';
import { theLastNumber } from './full/theLastNumber';

// Phase 11 full campaign imports (sin-themed)
import { theGoldenMile } from './full/theGoldenMile';
import { theBottomlessPurse } from './full/theBottomlessPurse';
import { theUndefeatedChampion } from './full/theUndefeatedChampion';
import { theTowerThatTouchedTheSky } from './full/theTowerThatTouchedTheSky';
import { theRedYear } from './full/theRedYear';
import { thePatientMan } from './full/thePatientMan';
import { theKingdomThatSlept } from './full/theKingdomThatSlept';
import { theLastDayOfSummer } from './full/theLastDayOfSummer';
import { theShadowsWeBecame } from './full/theShadowsWeBecame';
import { theNeighborsFence } from './full/theNeighborsFence';
import { theEndlessBanquet } from './full/theEndlessBanquet';
import { theCityThatAteItself } from './full/theCityThatAteItself';
import { theCollectorOfBeautifulThings } from './full/theCollectorOfBeautifulThings';
import { theObsidianHeart } from './full/theObsidianHeart';

// Phase 12 full campaign imports (ninja, pirate, assassin, battle royale, thieves)
import { theIllusionWar } from './full/theIllusionWar';
import { theThousandMasks } from './full/theThousandMasks';
import { shadowsOfTheFallenLeaf } from './full/shadowsOfTheFallenLeaf';
import { theBlackTide } from './full/theBlackTide';
import { thePirateParliament } from './full/thePirateParliament';
import { theLastOneStanding } from './full/theLastOneStanding';
import { theGuildBeneath } from './full/theGuildBeneath';
import { honourAmongThieves } from './full/honourAmongThieves';
import { theQuietProfession } from './full/theQuietProfession';
import { theFinalContract } from './full/theFinalContract';
import { theBladeWhispers } from './full/theBladeWhispers';

// One-shot imports
import { familiarStrike } from './oneshots/familiarStrike';
import { theGreatCheeseHeist } from './oneshots/theGreatCheeseHeist';
import { thePoisonedPatron } from './oneshots/thePoisonedPatron';
import { dinnerWithALich } from './oneshots/dinnerWithALich';
import { raftColony } from './oneshots/raftColony';
import { theTrialOfEchoes } from './oneshots/theTrialOfEchoes';
import { graveyardShift } from './oneshots/graveyardShift';
import { theDragonsDentist } from './oneshots/theDragonsDentist';
import { theInfiniteInn } from './oneshots/theInfiniteInn';
import { courtOfTheFeyQueen } from './oneshots/courtOfTheFeyQueen';
// Phase 2 one-shot imports
import { theWeaponSpeaks } from './oneshots/theWeaponSpeaks';
import { theLastBarInTheUnderdark } from './oneshots/theLastBarInTheUnderdark';
import { theMimicShip } from './oneshots/theMimicShip';
import { theJobInterview } from './oneshots/theJobInterview';
import { theWeddingCrasher } from './oneshots/theWeddingCrasher';
import { theLastDefenders } from './oneshots/theLastDefenders';
import { theBrewmastersTrial } from './oneshots/theBrewmastersTrial';
import { theSilentVillage } from './oneshots/theSilentVillage';
import { theGodsPlayPoker } from './oneshots/theGodsPlayPoker';
import { theDungeonHasWiFi } from './oneshots/theDungeonHasWiFi';
import { theMapThatLied } from './oneshots/theMapThatLied';
import { theArenasChampion } from './oneshots/theArenasChampion';
// Phase 3 one-shot imports
import { theMuseumHeist } from './oneshots/theMuseumHeist';
import { theBabysittingQuest } from './oneshots/theBabysittingQuest';
import { theIslandOfMisfitMonsters } from './oneshots/theIslandOfMisfitMonsters';
import { theGhostShip } from './oneshots/theGhostShip';
import { theOracleIsDrunk } from './oneshots/theOracleIsDrunk';
import { theOldFolksHome } from './oneshots/theOldFolksHome';
import { theTimeLoop } from './oneshots/theTimeLoop';
import { thePetitionOfMonsters } from './oneshots/thePetitionOfMonsters';
import { theMountainGod } from './oneshots/theMountainGod';
import { thePotluckOfDoom } from './oneshots/thePotluckOfDoom';
import { theLibraryAfterDark } from './oneshots/theLibraryAfterDark';
import { theCouncilOfVillains } from './oneshots/theCouncilOfVillains';
import { theAnchorFalls } from './oneshots/theAnchorFalls';
import { theLastSong } from './oneshots/theLastSong';
import { theTaxDungeon } from './oneshots/theTaxDungeon';

// Phase 4 one-shot imports
import { thePiratesCourt } from './oneshots/thePiratesCourt';
import { theExitInterview } from './oneshots/theExitInterview';
import { theStormChasers } from './oneshots/theStormChasers';
import { theSoupKitchen } from './oneshots/theSoupKitchen';
import { theDungeonReview } from './oneshots/theDungeonReview';
import { theWizardsMistake } from './oneshots/theWizardsMistake';
import { theDeadParty } from './oneshots/theDeadParty';
import { theWrongDungeon } from './oneshots/theWrongDungeon';
import { theHauntedShip } from './oneshots/theHauntedShip';
import { theRoast } from './oneshots/theRoast';
import { theFloodgates } from './oneshots/theFloodgates';
import { theTrainJob } from './oneshots/theTrainJob';
import { theWildernessSchool } from './oneshots/theWildernessSchool';
import { theMaskedBall } from './oneshots/theMaskedBall';
import { theSunkenTemple } from './oneshots/theSunkenTemple';
import { theInvisibleWar } from './oneshots/theInvisibleWar';
import { theCursedWedding } from './oneshots/theCursedWedding';
import { theReturnPolicy } from './oneshots/theReturnPolicy';
import { theKrakenWakes } from './oneshots/theKrakenWakes';

// Phase 9 one-shot imports (therapy, satire)
import { theGroupSession } from './oneshots/theGroupSession';
import { theHealingWord } from './oneshots/theHealingWord';
import { theBabyOilDungeon } from './oneshots/theBabyOilDungeon';

// Phase 12 one-shot imports (creature, battle royale, meme, pirate)
import { theGhostFlotilla } from './oneshots/theGhostFlotilla';
import { eightLeggedFreaks } from './oneshots/eightLeggedFreaks';
import { spiderVsOctopus } from './oneshots/spiderVsOctopus';
import { theAwakening } from './oneshots/theAwakening';
import { royaleWithCheese } from './oneshots/royaleWithCheese';
import { theFloorIsLava } from './oneshots/theFloorIsLava';
import { leeroyJenkinsMemorial } from './oneshots/leeroyJenkinsMemorial';
import { totalPartyKillTeamBuilding } from './oneshots/totalPartyKillTeamBuilding';
import { standingHereIRealize } from './oneshots/standingHereIRealize';

// Phase 13 one-shot imports (political)
import { theVoteThief } from './oneshots/theVoteThief';
import { theEmptyThroneOneshot } from './oneshots/theEmptyThroneOneshot';
import { thePeoplesVoice } from './oneshots/thePeoplesVoice';
import { theRefugeeCamp } from './oneshots/theRefugeeCamp';
import { thePriceOfBread } from './oneshots/thePriceOfBread';
import { theWhistleblower } from './oneshots/theWhistleblower';
import { theClosedMine } from './oneshots/theClosedMine';
import { theCensorBoard } from './oneshots/theCensorBoard';
import { theTeachersStand } from './oneshots/theTeachersStand';
import { theWaterRights } from './oneshots/theWaterRights';
import { thePrisonReform } from './oneshots/thePrisonReform';
import { theEvictionNotice } from './oneshots/theEvictionNotice';
import { theTaxRevolt } from './oneshots/theTaxRevolt';
import { theTruthCommission } from './oneshots/theTruthCommission';
import { theUnionVote } from './oneshots/theUnionVote';
import { thePublicDefender } from './oneshots/thePublicDefender';
import { theCouncilSeat } from './oneshots/theCouncilSeat';
import { theFreePress } from './oneshots/theFreePress';
import { theAmnesty } from './oneshots/theAmnesty';
import { theSpeakersCorner } from './oneshots/theSpeakersCorner';

// Phase 13 one-shot imports (heist)
import { theClockworkVault } from './oneshots/theClockworkVault';
import { theInvisibleGallery } from './oneshots/theInvisibleGallery';
import { theDragonsEgg } from './oneshots/theDragonsEgg';
import { theWeddingRing } from './oneshots/theWeddingRing';
import { thePrisonBreak } from './oneshots/thePrisonBreak';
import { theRecipeBook } from './oneshots/theRecipeBook';
import { theForgery } from './oneshots/theForgery';
import { theAuctionHouse } from './oneshots/theAuctionHouse';
import { theSmugglersMoon } from './oneshots/theSmugglersMoon';
import { theVaultOfMemories } from './oneshots/theVaultOfMemories';
import { theTrainHeist } from './oneshots/theTrainHeist';
import { theDoubleBluff } from './oneshots/theDoubleBluff';
import { thePoisonCabinet } from './oneshots/thePoisonCabinet';
import { theLivingVault } from './oneshots/theLivingVault';
import { theGraveyardShift2 } from './oneshots/theGraveyardShift2';
import { theLastBid } from './oneshots/theLastBid';
import { theSwitcheroo } from './oneshots/theSwitcheroo';
import { thePaperTrail } from './oneshots/thePaperTrail';

// Phase 13 one-shot imports (epic)
import { theGodfall } from './oneshots/theGodfall';
import { theWorldsEdge } from './oneshots/theWorldsEdge';
import { theDragonMoot } from './oneshots/theDragonMoot';
import { theChainBreaker } from './oneshots/theChainBreaker';
import { theSunStealer } from './oneshots/theSunStealer';
import { theLastPrayer } from './oneshots/theLastPrayer';
import { theStarFall } from './oneshots/theStarFall';
import { theOathOfTitans } from './oneshots/theOathOfTitans';
import { theDoorAtTheEnd } from './oneshots/theDoorAtTheEnd';
import { theLastSunrise } from './oneshots/theLastSunrise';
import { theDivineAudit } from './oneshots/theDivineAudit';
import { theWorldTreeOneshot } from './oneshots/theWorldTree';
import { theCosmicReset } from './oneshots/theCosmicReset';
import { theKingOfNothing } from './oneshots/theKingOfNothing';
import { theFinalWord } from './oneshots/theFinalWord';
import { theHarvestOfWorlds } from './oneshots/theHarvestOfWorlds';
import { theBirthOfAGod } from './oneshots/theBirthOfAGod';
import { thePactEternal } from './oneshots/thePactEternal';

// Phase 13 one-shot imports (survival, social, mystery, exploration, serious, horror)
import { driftwood } from './oneshots/driftwood';
import { frozenSolid } from './oneshots/frozenSolid';
import { gravityWell } from './oneshots/gravityWell';
import { noAirLeft } from './oneshots/noAirLeft';
import { risingWaters } from './oneshots/risingWaters';
import { sandstorm } from './oneshots/sandstorm';
import { theApology } from './oneshots/theApology';
import { theAvalanche } from './oneshots/theAvalanche';
import { theBigGame } from './oneshots/theBigGame';
import { theBlazeRunner } from './oneshots/theBlazeRunner';
import { theBlindDate } from './oneshots/theBlindDate';
import { theBookClub } from './oneshots/theBookClub';
import { theBottomOfTheWell } from './oneshots/theBottomOfTheWell';
import { theBrokenClock } from './oneshots/theBrokenClock';
import { theChildsQuestion } from './oneshots/theChildsQuestion';
import { theCollapsingDungeon } from './oneshots/theCollapsingDungeon';
import { theCollection } from './oneshots/theCollection';
import { theCursedPortrait } from './oneshots/theCursedPortrait';
import { theDeadMansChess } from './oneshots/theDeadMansChess';
import { theDisappearingVillage } from './oneshots/theDisappearingVillage';
import { theDogKnows } from './oneshots/theDogKnows';
import { theEcho } from './oneshots/theEcho';
import { theEmptyChair } from './oneshots/theEmptyChair';
import { theEndlessStaircase } from './oneshots/theEndlessStaircase';
import { theFamiliarFace } from './oneshots/theFamiliarFace';
import { theFamine } from './oneshots/theFamine';
import { theFirstDescent } from './oneshots/theFirstDescent';
import { theForgiveness } from './oneshots/theForgiveness';
import { theForgottenFloor } from './oneshots/theForgottenFloor';
import { theForgottenWitness } from './oneshots/theForgottenWitness';
import { theFuneral } from './oneshots/theFuneral';
import { theGarden } from './oneshots/theGarden';
import { theGardenBehindTheWall } from './oneshots/theGardenBehindTheWall';
import { theGhostAccusation } from './oneshots/theGhostAccusation';
import { theGoodbye } from './oneshots/theGoodbye';
import { theHandprint } from './oneshots/theHandprint';
import { theHouseRemembered } from './oneshots/theHouseRemembered';
import { theHuntedCamp } from './oneshots/theHuntedCamp';
import { theIdenticalTwins } from './oneshots/theIdenticalTwins';
import { theImpossibleTheft } from './oneshots/theImpossibleTheft';
import { theInheritance2 } from './oneshots/theInheritance2';
import { theIslandThatMoved } from './oneshots/theIslandThatMoved';
import { theKnock } from './oneshots/theKnock';
import { theLastConfession } from './oneshots/theLastConfession';
import { theLastDance } from './oneshots/theLastDance';
import { theLastGuest } from './oneshots/theLastGuest';
import { theLastLetter } from './oneshots/theLastLetter';
import { theLastLifeboat } from './oneshots/theLastLifeboat';
import { theLastMarch } from './oneshots/theLastMarch';
import { theLighthouse } from './oneshots/theLighthouse';
import { theLighthouse2 } from './oneshots/theLighthouse2';
import { theListeners } from './oneshots/theListeners';
import { theLockedRoom } from './oneshots/theLockedRoom';
import { theLullaby } from './oneshots/theLullaby';
import { theMapOfScars } from './oneshots/theMapOfScars';
import { theMapRoom } from './oneshots/theMapRoom';
import { theMarketDay } from './oneshots/theMarketDay';
import { theMatchmakerOneShot } from './oneshots/theMatchmakerOneShot';
import { theMissingHour } from './oneshots/theMissingHour';
import { theNeighborhoodWatch } from './oneshots/theNeighborhoodWatch';
import { theNorthernLights } from './oneshots/theNorthernLights';
import { theOldFriends } from './oneshots/theOldFriends';
import { theOldRoad } from './oneshots/theOldRoad';
import { theOldSword } from './oneshots/theOldSword';
import { theOtherDoor } from './oneshots/theOtherDoor';
import { thePenPal } from './oneshots/thePenPal';
import { thePerfectAlibi } from './oneshots/thePerfectAlibi';
import { thePoison } from './oneshots/thePoison';
import { thePotluck } from './oneshots/thePotluck';
import { thePromise } from './oneshots/thePromise';
import { theQuarantine } from './oneshots/theQuarantine';
import { theQuiltOfNames } from './oneshots/theQuiltOfNames';
import { theReplacementChild } from './oneshots/theReplacementChild';
import { theReunion } from './oneshots/theReunion';
import { theRoomBeyond } from './oneshots/theRoomBeyond';
import { theShadowThatStayed } from './oneshots/theShadowThatStayed';
import { theShipInTheDesert } from './oneshots/theShipInTheDesert';
import { theSilentWitness } from './oneshots/theSilentWitness';
import { theSmile } from './oneshots/theSmile';
import { theSoundBelow } from './oneshots/theSoundBelow';
import { theStoneChild } from './oneshots/theStoneChild';
import { theTalentShow } from './oneshots/theTalentShow';
import { theTunnelUnderTown } from './oneshots/theTunnelUnderTown';
import { theUnreadLetter } from './oneshots/theUnreadLetter';
import { theUnsent } from './oneshots/theUnsent';
import { theVeteran } from './oneshots/theVeteran';
import { theWatchman } from './oneshots/theWatchman';
import { theWelcomeCommittee } from './oneshots/theWelcomeCommittee';
import { theWordless } from './oneshots/theWordless';
import { theWorldInABottle } from './oneshots/theWorldInABottle';
import { theWrongBody } from './oneshots/theWrongBody';
import { trappedBeneath } from './oneshots/trappedBeneath';
import { underSiege } from './oneshots/underSiege';

export const FULL_CAMPAIGNS: FullCampaign[] = [
  theShatteredCrown,
  theVillageThatForgot,
  vaultOfTheDeadGod,
  theRecurringGoblin,
  theLastLighthouse,
  bloodInTheWater,
  theClockworkConspiracy,
  theWildHunt,
  ashesOfTheOldEmpire,
  theStarfallProphecy,
  // Phase 2
  theDrowningWorld,
  theCollegeOfUnfinishedThings,
  theUnderdarkExpress,
  theGodTournament,
  theHollowKing,
  theLastFeast,
  theGraveyardOfGods,
  theWarBeneath,
  thePriceOfImmortality,
  theCaravanAtTheEndOfTheWorld,
  // Phase 3
  theInheritance,
  theForgottenRoad,
  theSilverMask,
  theBeastmarket,
  theThousandYearHeist,
  theGodIsAChild,
  thePlagueOfDreams,
  theRevolutionWillBeNarrated,
  theDeadMansTournament,
  theSongOfTheDeep,
  theArchivistsDilemma,
  theSummerCourt,
  theTaxCollector,
  theSiegeOfHope,
  theMerchantPrinces,
  // Phase 4
  theUnderdarkOlympics,
  theEmptyThrone,
  thePrisonOfStars,
  theWorldEater,
  theBlindCity,
  theFirstDungeon,
  theHarvestFestival,
  theGuildsWar,
  theNameless,
  theCartographersGambit,
  theDiplomatsNightmare,
  theLibraryOfBabel,
  theColosseumOfSouls,
  theGardenAtWorldsEnd,
  thePlayersGuide,
  // Phase 5 (new campaigns)
  theObsidianArchive,
  theLastOrchard,
  theGlassCipher,
  theCrimsonCovenant,
  theSongsteelSaga,
  theCircusOfNightmares,
  theCelestialAuction,
  theSunkenKingdom,
  theGolemWars,
  thePactOfAshes,
  theChimeraSyndicate,
  theStarforged,
  theChronomancersDilemma,
  theEclipseCourt,
  theCovenantOfBloodAndBone,
  theSanctumOfSorrows,
  theTitanomachyReborn,
  theMourningMarches,
  theWeaversOfFate,
  theWardensOfAether,
  theHollowMountain,
  // Phase 6 (emotional depth)
  theQuietYear,
  theWeightOfCrowns,
  theRiverThatRemembers,
  whenTheMusicStopped,
  theChildrenOfIron,
  aSinglePerfectDay,
  // Phase 7 (comedy spectrum)
  thePungeon,
  bureaucracyAndDragons,
  theRoastOfTheArchlich,
  theWrongQuestionnaire,
  criticalMassEffect,
  theTavernAtTheEndOfTheUniverse,
  theMinMaxKing,
  theFlatEarthConspiracy,
  // Phase 7 (hunted/pursuit)
  neverLookBack,
  theBlackListCampaign,
  theHoundOfEveryRoad,
  theSmilingShadow,
  // Phase 8 (heist)
  theVaultOfSouls,
  theArtOfWar,
  theMintJob,
  theLongCon,
  breakingAndEnchanting,
  theMuseumOfImpossibleThings,
  // Phase 8 (political)
  thePeoplesCrown,
  theLastApothecary,
  theWallAndTheWild,
  theBookBurners,
  theStrikeBeneath,
  theCouncilOfWhispers,
  // Phase 8 (social)
  theMatchmaker,
  theNewNeighbors,
  thePlayTheThingIs,
  theLostLanguage,
  theGathering,
  theFuneralGames,
  // Phase 8 (survival)
  theLastWinter,
  afterTheFlood,
  theAshlands,
  belowTheIce,
  theDeadCalm,
  theCaravan,
  // Phase 8 (epic)
  theForgottenPantheon,
  theSiegeOfHeaven,
  theWorldForge,
  theCrownOfStars,
  theLastAlliance,
  // Phase 8 (exploration)
  theEdgeOfTheMap,
  theDepthsBelowDepths,
  theSkyAboveTheSky,
  theRiverWithoutEnd,
  theCartographersCurse,
  // Phase 8 (mystery)
  theClockTowerMurders,
  theInheritanceOfLies,
  theMissingDay,
  thePoisonersGarden,
  // Phase 8 (horror)
  theThinPlaces,
  whatLivesBeneath,
  theSmileDisease,
  theArchive,
  // Phase 8 (serious)
  theOathbreaker,
  theReturningSoldier,
  thePriceOfMagic,
  theBridgeBuilder,
  // Phase 9 (therapy, cozy, satire, genre-bending)
  theGoodHarvest,
  theLastHerd,
  theLittleBakery,
  theElementalAccord,
  theIronDeep,
  theNeonAbyss,
  theScaleOfThings,
  // Phase 10 (genre expansion)
  theLastLongship,
  ragnarokTuesday,
  theStarwrightGuild,
  theBoneAge,
  theClockworkAge,
  theFrozenThrone,
  theSpellplague,
  beforeTheFirst,
  theSaurianEmpire,
  theWorldBelow,
  theLastDragonRider,
  theAtomicGarden,
  // Phase 10 (reality-breaking)
  theGiantsPerspective,
  theIncredibleShrinkingParty,
  benjaminDungeon,
  theInfiniteGrowth,
  gravityOptional,
  theMirrorWar,
  theWorldIsACreature,
  theBodyPolitic,
  theDreamOfDreams,
  theLanguageVirus,
  theColorless,
  immortalityForBeginners,
  theWorldForgotMagic,
  insideOut,
  theLastNumber,
  // Phase 11 (sin-themed)
  theGoldenMile,
  theBottomlessPurse,
  theUndefeatedChampion,
  theTowerThatTouchedTheSky,
  theRedYear,
  thePatientMan,
  theKingdomThatSlept,
  theLastDayOfSummer,
  theShadowsWeBecame,
  theNeighborsFence,
  theEndlessBanquet,
  theCityThatAteItself,
  theCollectorOfBeautifulThings,
  theObsidianHeart,
  // Phase 12 (ninja, pirate, assassin, battle royale, thieves)
  theIllusionWar,
  theThousandMasks,
  shadowsOfTheFallenLeaf,
  theBlackTide,
  thePirateParliament,
  theLastOneStanding,
  theGuildBeneath,
  honourAmongThieves,
  theQuietProfession,
  theFinalContract,
  theBladeWhispers,
];

export const ONESHOT_CAMPAIGNS: OneShotCampaign[] = [
  familiarStrike,
  theGreatCheeseHeist,
  thePoisonedPatron,
  dinnerWithALich,
  raftColony,
  theTrialOfEchoes,
  graveyardShift,
  theDragonsDentist,
  theInfiniteInn,
  courtOfTheFeyQueen,
  // Phase 2
  theWeaponSpeaks,
  theLastBarInTheUnderdark,
  theMimicShip,
  theJobInterview,
  theWeddingCrasher,
  theLastDefenders,
  theBrewmastersTrial,
  theSilentVillage,
  theGodsPlayPoker,
  theDungeonHasWiFi,
  theMapThatLied,
  theArenasChampion,
  // Phase 3 one-shots
  theMuseumHeist,
  theBabysittingQuest,
  theIslandOfMisfitMonsters,
  theGhostShip,
  theOracleIsDrunk,
  theOldFolksHome,
  theTimeLoop,
  thePetitionOfMonsters,
  theMountainGod,
  thePotluckOfDoom,
  theLibraryAfterDark,
  theCouncilOfVillains,
  theAnchorFalls,
  theLastSong,
  theTaxDungeon,
  // Phase 4
  thePiratesCourt,
  theExitInterview,
  theStormChasers,
  theSoupKitchen,
  theDungeonReview,
  theWizardsMistake,
  theDeadParty,
  theWrongDungeon,
  theHauntedShip,
  theRoast,
  theFloodgates,
  theTrainJob,
  theWildernessSchool,
  theMaskedBall,
  theSunkenTemple,
  theInvisibleWar,
  theCursedWedding,
  theReturnPolicy,
  theKrakenWakes,
  // Phase 9 (therapy, satire)
  theGroupSession,
  theHealingWord,
  theBabyOilDungeon,
  // Phase 12 (creature, battle royale, meme, pirate)
  theGhostFlotilla,
  eightLeggedFreaks,
  spiderVsOctopus,
  theAwakening,
  royaleWithCheese,
  theFloorIsLava,
  leeroyJenkinsMemorial,
  totalPartyKillTeamBuilding,
  standingHereIRealize,
  // Phase 13 (survival, social, mystery, exploration, serious, horror)
  driftwood,
  frozenSolid,
  gravityWell,
  noAirLeft,
  risingWaters,
  sandstorm,
  theApology,
  theAvalanche,
  theBigGame,
  theBlazeRunner,
  theBlindDate,
  theBookClub,
  theBottomOfTheWell,
  theBrokenClock,
  theChildsQuestion,
  theCollapsingDungeon,
  theCollection,
  theCursedPortrait,
  theDeadMansChess,
  theDisappearingVillage,
  theDogKnows,
  theEcho,
  theEmptyChair,
  theEndlessStaircase,
  theFamiliarFace,
  theFamine,
  theFirstDescent,
  theForgiveness,
  theForgottenFloor,
  theForgottenWitness,
  theFuneral,
  theGarden,
  theGardenBehindTheWall,
  theGhostAccusation,
  theGoodbye,
  theHandprint,
  theHouseRemembered,
  theHuntedCamp,
  theIdenticalTwins,
  theImpossibleTheft,
  theInheritance2,
  theIslandThatMoved,
  theKnock,
  theLastConfession,
  theLastDance,
  theLastGuest,
  theLastLetter,
  theLastLifeboat,
  theLastMarch,
  theLighthouse,
  theLighthouse2,
  theListeners,
  theLockedRoom,
  theLullaby,
  theMapOfScars,
  theMapRoom,
  theMarketDay,
  theMatchmakerOneShot,
  theMissingHour,
  theNeighborhoodWatch,
  theNorthernLights,
  theOldFriends,
  theOldRoad,
  theOldSword,
  theOtherDoor,
  thePenPal,
  thePerfectAlibi,
  thePoison,
  thePotluck,
  thePromise,
  theQuarantine,
  theQuiltOfNames,
  theReplacementChild,
  theReunion,
  theRoomBeyond,
  theShadowThatStayed,
  theShipInTheDesert,
  theSilentWitness,
  theSmile,
  theSoundBelow,
  theStoneChild,
  theTalentShow,
  theTunnelUnderTown,
  theUnreadLetter,
  theUnsent,
  theVeteran,
  theWatchman,
  theWelcomeCommittee,
  theWordless,
  theWorldInABottle,
  theWrongBody,
  trappedBeneath,
  underSiege,
  // Phase 13 (political)
  theVoteThief,
  theEmptyThroneOneshot,
  thePeoplesVoice,
  theRefugeeCamp,
  thePriceOfBread,
  theWhistleblower,
  theClosedMine,
  theCensorBoard,
  theTeachersStand,
  theWaterRights,
  thePrisonReform,
  theEvictionNotice,
  theTaxRevolt,
  theTruthCommission,
  theUnionVote,
  thePublicDefender,
  theCouncilSeat,
  theFreePress,
  theAmnesty,
  theSpeakersCorner,
  // Phase 13 (heist)
  theClockworkVault,
  theInvisibleGallery,
  theDragonsEgg,
  theWeddingRing,
  thePrisonBreak,
  theRecipeBook,
  theForgery,
  theAuctionHouse,
  theSmugglersMoon,
  theVaultOfMemories,
  theTrainHeist,
  theDoubleBluff,
  thePoisonCabinet,
  theLivingVault,
  theGraveyardShift2,
  theLastBid,
  theSwitcheroo,
  thePaperTrail,
  // Phase 13 (epic)
  theGodfall,
  theWorldsEdge,
  theDragonMoot,
  theChainBreaker,
  theSunStealer,
  theLastPrayer,
  theStarFall,
  theOathOfTitans,
  theDoorAtTheEnd,
  theLastSunrise,
  theDivineAudit,
  theWorldTreeOneshot,
  theCosmicReset,
  theKingOfNothing,
  theFinalWord,
  theHarvestOfWorlds,
  theBirthOfAGod,
  thePactEternal,
];

export const ALL_CAMPAIGNS: CampaignStarterKit[] = [
  ...FULL_CAMPAIGNS,
  ...ONESHOT_CAMPAIGNS,
];

// Lookup by ID
export function getCampaignById(
  id: string,
): CampaignStarterKit | undefined {
  return ALL_CAMPAIGNS.find((c) => c.id === id);
}

// Get a random campaign of a given type
export function getRandomCampaign(
  type?: 'full' | 'oneshot',
): CampaignStarterKit {
  const pool = type === 'full'
    ? FULL_CAMPAIGNS
    : type === 'oneshot'
      ? ONESHOT_CAMPAIGNS
      : ALL_CAMPAIGNS;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Filter campaigns
export function filterCampaigns(
  filter: CampaignFilter,
): CampaignStarterKit[] {
  let results = [...ALL_CAMPAIGNS];

  if (filter.type) {
    results = results.filter((c) => c.type === filter.type);
  }

  if (filter.tone) {
    results = results.filter((c) => c.tone === filter.tone);
  }

  if (filter.theme) {
    results = results.filter((c) => c.themes.includes(filter.theme!));
  }

  if (filter.playerCount !== undefined) {
    results = results.filter(
      (c) =>
        filter.playerCount! >= c.playerCount.min &&
        filter.playerCount! <= c.playerCount.max,
    );
  }

  if (filter.levelRange) {
    results = results.filter((c) => {
      if (c.type === 'full') {
        return (
          c.levelRange.end >= filter.levelRange!.min &&
          c.levelRange.start <= filter.levelRange!.max
        );
      } else {
        return (
          c.level >= filter.levelRange!.min &&
          c.level <= filter.levelRange!.max
        );
      }
    });
  }

  if (filter.searchTerm) {
    const term = filter.searchTerm.toLowerCase();
    results = results.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.tagline.toLowerCase().includes(term) ||
        c.settingSummary.toLowerCase().includes(term) ||
        c.hook.toLowerCase().includes(term) ||
        c.keyNPCs.some(
          (npc) =>
            npc.name.toLowerCase().includes(term) ||
            npc.role.toLowerCase().includes(term),
        ) ||
        c.keyLocations.some(
          (loc) =>
            loc.name.toLowerCase().includes(term) ||
            loc.description.toLowerCase().includes(term),
        ),
    );
  }

  return results;
}

// Get all unique tones in the catalog
export function getAvailableTones(): CampaignTone[] {
  return [...new Set(ALL_CAMPAIGNS.map((c) => c.tone))];
}

// Get all unique themes in the catalog
export function getAvailableThemes(): CampaignTheme[] {
  return [...new Set(ALL_CAMPAIGNS.flatMap((c) => c.themes))];
}

// Get campaigns grouped by tone
export function getCampaignsByTone(): Record<
  string,
  CampaignStarterKit[]
> {
  const grouped: Record<string, CampaignStarterKit[]> = {};
  for (const c of ALL_CAMPAIGNS) {
    if (!grouped[c.tone]) grouped[c.tone] = [];
    grouped[c.tone].push(c);
  }
  return grouped;
}

// Get campaigns grouped by theme
export function getCampaignsByTheme(): Record<
  string,
  CampaignStarterKit[]
> {
  const grouped: Record<string, CampaignStarterKit[]> = {};
  for (const c of ALL_CAMPAIGNS) {
    for (const theme of c.themes) {
      if (!grouped[theme]) grouped[theme] = [];
      grouped[theme].push(c);
    }
  }
  return grouped;
}

// Re-export types
export type {
  CampaignStarterKit,
  FullCampaign,
  OneShotCampaign,
  CampaignNPC,
  CampaignLocation,
  CampaignAct,
  CampaignScene,
  CampaignFilter,
  CampaignTone,
  CampaignTheme,
  CampaignType,
} from './types';

export { formatCampaignSummary, formatCampaignCard } from './types';
