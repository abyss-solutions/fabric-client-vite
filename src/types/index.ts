import {
  GetAllStructuresForListingQuery,
  StructureStatus,
} from "@/__generated__/hooks";
import { SxProps } from "@mui/material";
import { ReactNode } from "react";

export type FeatureFlags =
  | "admin"
  | "beta-user"
  | "asset-tagging-user"
  | "ait-engineer"
  | "dev"
  | "generic-engineer"
  | "client"
  | "api-inspector"
  | "alpha-user";

export type PlatformsType = GetAllStructuresForListingQuery["allStructures"];

export enum CardInsightTypeEnum {
  LINEAR_PROGRESS = "linearProgress",
  CIRCULAR_PROGRESS = "circularProgress",
  SIMPLE_TEXT = "simpleText",
  UNIT_AREA = "unitArea",
}

export type PlatformColumn = {
  key: string;
  columnName: string;
  visibility: boolean;
  width: string;
};

export type PlatformProps = {
  columns: PlatformColumn[];
  handlePlatformChange: (id: string, status: StructureStatus) => void;
  handleFetchStructureDecks: (id: string) => void;
  searchPlatform: string;
  structureDecksLoading: boolean;
};

type RegionData = {
  id: string;
  name: string;
  structures: StructureData[];
  [key: string]: number | string | null | undefined | StructureData[];
};

type DeckData = {
  id: string;
  name: string;
  [key: string]: number | string | null | undefined;
};

type StructureData = {
  id: string;
  name: string;
  status: StructureStatus;
  decks: DeckData[];
  [key: string]: number | string | null | undefined | DeckData[];
};

export type StructureDataProps = {
  structure: StructureData;
  setExpandedRows: React.Dispatch<React.SetStateAction<object>>;
  expandedRows: { [key: string]: boolean };
} & PlatformProps;

export type RegionDataProps = {
  region: RegionData;
} & PlatformProps;

export type ListViewTableProps = {
  regions: RegionData[];
  loading: boolean;
} & PlatformProps;

export enum Permissions {
  EXPORT_ASSET = "export:asset",
  UPDATE_ASSET = "update:asset",
  READ_DEFECTS = "read:defects",
  MANAGE_PAINT_REGIONS = "manage:paint_regions",
  MANAGE_USERS = "manage:users",
  MANAGE_BETA_FEATURES = "manage:beta_features",
  CREATE_CUPS_POI = "create:cups_poi",
  CREATE_HOTBOLTING_POI = "create:hotbolting_poi",
  CREATE_BLISTER_POI = "create:blister_poi",
  CREATE_PAINT_DAMAGE_POI = "create:paint_damage_poi",
  UPDATE_CUPS_POI = "update:cups_poi",
  UPDATE_HOTBOLTING_POI = "update:hotbolting_poi",
  UPDATE_BLISTER_POI = "update:blister_poi",
  UPDATE_PAINT_DAMAGE_POI = "update:paint_damage_poi",
  READ_STRUCTURE_LIST_VIEW = "read:structure_list_view",
}

export type GenericModalProps = {
  open: boolean;
  handleClose: () => void;
  children?: ReactNode;
  title?: string;
  description?: string;
  sx?: SxProps | undefined;
  crossIconStyle?: SxProps | undefined;
  headerStyleProp?: SxProps | undefined;
  backgroundPaperStyle?: SxProps | undefined;
};

export type SnackbarMessage = {
  shouldShow: boolean;
  content?: React.ReactElement;
};
