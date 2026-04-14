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
