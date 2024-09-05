import { PointOfInterestsTypeEnum } from "@/__generated__/hooks";
import { FeatureFlags } from "@/types";

const CUBE_PADDING_Y = 350;
const CUBE_PADDING_X = 820;
const DRAWER_WIDTH = 400;

export const DEFAULT_CUBE_POSITION: [number, number, number] = [
  CUBE_PADDING_X,
  CUBE_PADDING_Y,
  0,
];
export const DRAWER_EXPANDED_CUBE_POSITION: [number, number, number] = [
  CUBE_PADDING_X - DRAWER_WIDTH,
  CUBE_PADDING_Y,
  0,
];

export const POI_STATS_BAR_COLORS = {
  [PointOfInterestsTypeEnum.Blister]: "#66BB6A",
  [PointOfInterestsTypeEnum.Cups]: "#0288D1",
  [PointOfInterestsTypeEnum.Hotbolting]: "#B986F9",
  [PointOfInterestsTypeEnum.Other]: "#FFC107",
  [PointOfInterestsTypeEnum.PaintDamage]: "#8137A6",
};

export const FALLBACK_INSPECTION_IMAGE = "/assets/oil-rig-silhouette.jpg";
export const POI_IS_BLISTER_NAME = "blistermeasurementdisabled";

export const SERVICE_GROUPS_COLORS: string[] = [
  "#fcd980",
  "#6ad983",
  "#668ff7",
  "#b986f9",
  "#d5dce4",
];

export const MATERIAL_COLORS: string[] = [
  ...SERVICE_GROUPS_COLORS,
  "#ff9e6a",
  "#78d3a1",
  "#7a92f6",
  "#d88ff9",
  "#e4e1d7",
  "#f3ca75",
  "#6bd1e7",
  "#a890f3",
];

export const PIE_CHART_COLORS = [
  "#F44336",
  "#FF9100",
  "#FDD835",
  "#668FF7",
  "#8454EC",
  "#B2BDCB",
];

export const QUERY_DRAWER_WIDTH = 350;
// background color for the query drawer
export const QUERY_DRAWER_COLOR = "#F7F8FC";

export const TAGGING_GUIDE =
  "https://abyss-solutions.atlassian.net/wiki/spaces/PD/pages/2576024566/Fabric+tagging+guide";
export const USAGE_GUIDE = "https://fabricv2-documentation.scrollhelp.site/v2/";
export const REPORT_A_BUG =
  "https://abyss-solutions.atlassian.net/servicedesk/customer/portal/3/group/8/create/103";

// extra range added to visibility box to show all relevant sphericals
// for TLS scans points cropped at 7 meters, so [10,10,10] would be enough for TLS
export const SPHERICAL_IMAGE_VISIBILITY_RANGE = [1000, 1000, 1000] as [
  x: number,
  y: number,
  z: number
];

// allows to show deck levels upto 8 meter (z-axis) from assembly bbox
export const FLOOR_LEVELS_BBOX_PADDING = [1, 1, 8] as [
  x: number,
  y: number,
  z: number
];

export const EXTERNAL_ROLES: Array<FeatureFlags> = [
  "generic-engineer",
  "client",
];

// to be replaced by dynamic property in the database.
// This is a list of possible values for corrosion groupName on defect legend on structure
export const CORROSION_GROUPNAMES = ["CORROSION", "Substrate Condition"];

export const SystemTestStatusColor = {
  Poor: "#9F230D",
  Weak: "#9B661A",
  Good: "#357F70",
  "N/A": "#8A8A8A",
};
export const SystemTestStatusBgColor = {
  Poor: "#E9B1B1",
  Weak: "#E8D9B3",
  Good: "#C0E2CA",
  "N/A": "#CCCCCC",
};

// this is a constant limit to be made for the parts selection at the same time
// having this limit stops users from doing a bulk update for tags which caused issues
export const PARTS_SELECTION_LIMIT_FOR_TAGGING = 25;

export const UNCERTAIN_PROFILE_LABEL = "Uncertain profile";
export const UNCERTAIN_PROFILE_SHORT_LABEL = "Uncertain";

export const NOT_APPLICABLE_LABEL = "N/A";
