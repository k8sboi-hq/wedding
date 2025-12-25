export type PartyFilter = '1' | '2' | null;

export interface CelebrationVisibility {
  showFirstParty: boolean;
  showSecondParty: boolean;
  showMainWedding: boolean;
}

/**
 * Parse and validate the party query parameter
 * @param param - The party query parameter value
 * @returns '1', '2', or null for invalid/missing values
 */
export function parsePartyParam(param: string | null | undefined): PartyFilter {
  if (param === '1' || param === '2') {
    return param;
  }
  return null;
}

/**
 * Determine which celebrations to show based on party filter
 * @param partyFilter - The parsed party filter value
 * @returns Object with visibility flags for each celebration
 */
export function getCelebrations(partyFilter: PartyFilter): CelebrationVisibility {
  if (partyFilter === '1') {
    return {
      showFirstParty: true,
      showSecondParty: false,
      showMainWedding: true,
    };
  }

  if (partyFilter === '2') {
    return {
      showFirstParty: false,
      showSecondParty: true,
      showMainWedding: true,
    };
  }

  // Default: show all celebrations
  return {
    showFirstParty: true,
    showSecondParty: true,
    showMainWedding: true,
  };
}
