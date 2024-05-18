import { StructureStatus } from "@/__generated__/hooks";

export const shouldRedirectToWfmPage = (
  status: StructureStatus,
  isBetaUser: boolean
): boolean => {
  // If deployment is of type ...
  // Labelling: redirect to WFM tasks page
  // Analysis: redirect to WFM tasks page
  // Tagging: redirect to WFM tasks page only if user is beta user

  switch (status) {
    case StructureStatus.Labelling:
      return true;
    case StructureStatus.Analysis:
      return false;
    case StructureStatus.Tagging:
      return isBetaUser;
    default:
      return false;
  }
};

export const getStructureRedirectPath = (
  { id, status }: { id: string; status: StructureStatus },
  isBetaUser: boolean
) => {
  // wfm === Work Flow Management
  const wfmPageName = "tasks";

  // Default to analysis/inspectionId/insights
  const analysisPageName = "insights";

  const shouldRedirect = shouldRedirectToWfmPage(status, isBetaUser);

  let pathname = shouldRedirect
    ? `/inspection/${id}/${wfmPageName}`
    : `/inspection/${id}`;

  if (status === StructureStatus.Analysis) {
    pathname = `/analysis/${id}/${analysisPageName}`;
  }
  return pathname;
};
