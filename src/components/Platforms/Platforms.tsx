import React, { useCallback, useEffect, useMemo, useState } from "react";
import { matchSorter } from "match-sorter";
import {
  CalendarViewMonth,
  ReorderRounded,
  Search,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Stack,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Alert,
  Autocomplete,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  Button,
  IconButton,
  ListItemText,
} from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  PlatformsContainer,
  MainContainer,
  PlatformTotalCount,
} from "./styles";
import { useFeatureFlag, useHavePermission, useRouter } from "@/hooks";
import {
  StructureStatus,
  useAllRegionsForListingQuery,
  useAllStructuresByRegionForListingQuery,
  useStructureDecksWithDefectsForListingLazyQuery,
  UnitSystemEnum,
  useGetAllStructuresForListingQuery,
} from "@/__generated__/hooks";
import * as state from "@/state";
import { getStructureRedirectPath } from "@/utils/structureRedirectPath";
import { Snackbar } from "../shared/Snackbar";
import { GenericModal } from "../shared/GenericModal";
import ListViewTable from "./ListViewTable";
import { Permissions, PlatformColumn, PlatformsType } from "@/types";
import { GridView } from "./GridView";
import { convertMetresSqToFeetSqDisplay } from "@/utils/unitSystem";
import * as analysisState from "@/components/Analysis/state";

type DefectAreaType = {
  key: string;
  area: number;
}[];

const calculateAllDefects = (
  defectArea: DefectAreaType,
  unitSystem: UnitSystemEnum
) => {
  const convertArea =
    unitSystem === UnitSystemEnum.Imperial
      ? convertMetresSqToFeetSqDisplay
      : (area: number) => (Number.isInteger(area) ? area : area.toFixed(2));

  return Object.fromEntries(
    defectArea.map(({ key, area }) => [key, convertArea(area)])
  );
};

export const Platforms = () => {
  const [selectedContinent, setSelectedContinent] = useState("global");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformsType>([]);
  const [searchPlatform, setSearchPlatform] = useState<string>("");
  const [snackbarMessage, setSnackbarMessage] = useRecoilState(
    state.snackbarMessage
  );
  const [regionId, setRegionId] = useState<string | undefined>("");
  const [isTableSettingsOpen, setIsTableSettingsOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [activeColumns, setActiveColumns] = useState<string[]>([]);
  const readStructureListView = useHavePermission(
    Permissions.READ_STRUCTURE_LIST_VIEW
  );
  const unitSystem = useRecoilValue(analysisState.unitSystem);
  const router = useRouter();

  const isBetaUser = useFeatureFlag("beta-user");
  const setSelectedStructureId = useSetRecoilState(state.selectedStructureId);
  const { loading, error, data } = useGetAllStructuresForListingQuery({
    variables: {
      input: {
        regionId,
      },
    },
  });

  const { data: regionsData } = useAllRegionsForListingQuery({});

  const { data: allStructuresByRegion, loading: regionLoading } =
    useAllStructuresByRegionForListingQuery({
      fetchPolicy: "cache-first",
      skip: !readStructureListView || isGridView,
    });

  const [
    fetchStructureDecks,
    { data: structureDecks, loading: structureDecksLoading },
  ] = useStructureDecksWithDefectsForListingLazyQuery({
    fetchPolicy: "cache-first",
  });

  const getStructureDecksData = useMemo(() => {
    return structureDecks?.decksWithDefects;
  }, [structureDecks?.decksWithDefects]);

  const { listViewData, listViewHeaders } = useMemo(() => {
    return {
      listViewData: allStructuresByRegion?.allStructuresByRegion ?? [],
      listViewHeaders: allStructuresByRegion?.allDefects ?? [],
    };
  }, [allStructuresByRegion]);

  const allRegions = useMemo(() => {
    return regionsData?.allRegions;
  }, [regionsData?.allRegions]);

  const allPlatforms = useMemo(() => {
    const platforms = data?.allStructures ?? [];
    setSelectedPlatforms(platforms);
    return platforms;
  }, [data]);

  const handlePlatformChange = useCallback(
    (id: string, status: StructureStatus) => {
      setSelectedStructureId(id);
      const pathname = getStructureRedirectPath({ id, status }, isBetaUser);
      router.push({
        pathname,
        query: { inspection: id },
      });
    },
    [isBetaUser, router, setSelectedStructureId]
  );

  const handleFetchStructureDecks = (id: string) => {
    setSelectedStructureId(id);
    fetchStructureDecks({
      variables: {
        structureId: id,
      },
    });
  };

  const toggleView = () => {
    setIsGridView((previousState) => !previousState);
  };

  const toggleTableSettingsOpen = useCallback(
    (status: boolean) => () => {
      setIsTableSettingsOpen(status);
    },
    []
  );

  const columns: PlatformColumn[] = useMemo(() => {
    const columnsFields = [
      {
        key: "name",
        columnName: "PLATFORMS",
        visibility: true,
        width: "300px",
      },
    ];

    const columnsFieldsWithDefects = (listViewHeaders || []).map((column) => ({
      key: column.key,
      columnName: column.name.toUpperCase(),
      visibility: true,
      width: "200px",
    }));

    const allColumns = [
      ...columnsFields,
      ...columnsFieldsWithDefects,
      {
        key: "actions",
        columnName: "ACTIONS",
        visibility: true,
        width: "80px",
      },
    ];
    return allColumns;
  }, [listViewHeaders]);

  useEffect(() => {
    setActiveColumns([...columns.slice(0, 6).map((col) => col.key), "actions"]);
  }, [columns]);

  const handleActiveColumnsUpdate = useCallback(
    (fieldId: string) => () => {
      if (fieldId === "actions") {
        setActiveColumns((previousActiveColumns) =>
          previousActiveColumns.includes("actions")
            ? previousActiveColumns
            : [...previousActiveColumns, "actions"]
        );
      } else {
        setActiveColumns((previousActiveColumns) =>
          previousActiveColumns.includes(fieldId)
            ? previousActiveColumns.filter((col) => col !== fieldId)
            : [...previousActiveColumns, fieldId]
        );
      }
    },
    [setActiveColumns]
  );

  const updatedColumns = useMemo(() => {
    return columns.filter((column) => activeColumns.includes(column.key));
  }, [columns, activeColumns]);

  const rows = useMemo(() => {
    return listViewData.map((region) => ({
      id: region.id,
      name: region.name,
      ...calculateAllDefects(region.defectArea, unitSystem),
      structures: region.structures.map((structure) => {
        const decks = getStructureDecksData?.map((deck) => ({
          id: deck.id,
          name: deck.name,
          ...calculateAllDefects(deck.defectArea, unitSystem),
        }));
        return {
          id: structure.id,
          name: structure.name,
          status: structure.status,
          ...calculateAllDefects(structure.defectArea, unitSystem),
          decks: decks || [],
        };
      }),
    }));
  }, [getStructureDecksData, listViewData, unitSystem]);

  const handleChangeContinent = (event: SelectChangeEvent) => {
    const continent = event.target.value;
    setSearchPlatform("");
    setSelectedContinent(continent);
    const id = allRegions?.find(
      (region) => region.name.toLowerCase() === continent
    )?.id;
    setRegionId(id);
    setSelectedPlatforms(
      continent === "global"
        ? allPlatforms
        : allPlatforms.filter((platform) =>
            platform.name.toLowerCase().includes(continent.toLowerCase())
          )
    );
  };

  const [filteredListViewData, setFilteredListViewData] = useState(rows);

  useEffect(() => {
    if (!searchPlatform) setFilteredListViewData(rows);

    const filteredRows = rows.reduce((accumulator, region) => {
      const filteredStructures = region.structures.filter((structure) =>
        structure.name.toLowerCase().includes(searchPlatform.toLowerCase())
      );
      if (filteredStructures.length > 0) {
        accumulator.push({
          ...region,
          structures: filteredStructures,
        });
      }
      return accumulator;
    }, [] as typeof rows);

    setFilteredListViewData(filteredRows);
  }, [rows, searchPlatform]);

  const handleSearchPlatform = (searchTerm: string) => {
    setSearchPlatform(searchTerm);

    const filteredGridPlatforms = allPlatforms.filter(
      (platform) => matchSorter([platform.name], searchTerm).length > 0
    );

    setSelectedPlatforms(filteredGridPlatforms);
  };

  const closeSnack = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarMessage({ shouldShow: false, content: undefined });
  };
  const { shouldShow, content } = snackbarMessage;

  useEffect(() => {
    if (error) {
      setSnackbarMessage({
        shouldShow: true,
        content: <Alert severity="error">{error.message}</Alert>,
      });
    }
  }, [error, setSnackbarMessage]);

  return (
    <MainContainer>
      <PlatformsContainer>
        <Stack sx={{ py: 5 }}>
          <Typography
            color="text.primary"
            component="h1"
            fontSize={32}
            fontWeight={700}
          >
            Welcome to Abyss Fabric
          </Typography>
          <Typography variant="body1" fontSize={16}>
            Please select a platform to continue
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          flex={1}
          spacing={3}
          alignItems="center"
          mt={2}
        >
          {isGridView && (
            <Box sx={{ minWidth: { xs: "100%", lg: "195px" } }}>
              <FormControl fullWidth>
                <Select
                  inputProps={{ sx: { pt: "10px", pb: "7px" } }}
                  value={selectedContinent}
                  onChange={handleChangeContinent}
                  data-testid="select-continent-dropdown"
                >
                  <MenuItem value="global">Global</MenuItem>
                  {allRegions?.map((region) => (
                    <MenuItem key={region.id} value={region.name.toLowerCase()}>
                      {region.name.charAt(0).toUpperCase() +
                        region.name.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          <Box flex={1} sx={{ width: "100%" }}>
            <Autocomplete
              options={[...new Set(allPlatforms.map((item) => item.name))]}
              onInputChange={(event, newValue) =>
                handleSearchPlatform(newValue || "")
              }
              freeSolo
              forcePopupIcon
              clearOnEscape
              filterOptions={(options, { inputValue }) =>
                matchSorter(options, inputValue)
              }
              renderInput={(parameters) => (
                <TextField
                  {...parameters}
                  data-testid="search-platform-input"
                  sx={{
                    width: { xs: "100%", lg: "640px" },
                  }}
                  size="small"
                  value={searchPlatform}
                  placeholder="Search a platform"
                  variant="outlined"
                  InputProps={{
                    ...parameters.InputProps,
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginLeft: "8px" }}
                      >
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            data-testid="platforms-count"
          >
            {isGridView && (
              <>
                <Typography fontSize={14}>Platforms found</Typography>
                <PlatformTotalCount fontSize={16} fontWeight={700}>
                  {selectedPlatforms.length}
                </PlatformTotalCount>
              </>
            )}
            {readStructureListView && (
              <>
                <Button
                  onClick={toggleView}
                  disabled={!isGridView}
                  sx={{
                    backgroundColor: isGridView ? "transparent" : "#E7EEF6",
                  }}
                >
                  <ReorderRounded
                    sx={{
                      color: isGridView ? "#7E9BBC" : "#224063",
                      pointerEvents: isGridView ? "auto" : "none",
                      opacity: isGridView ? 0.5 : 1,
                      fontSize: 20,
                    }}
                  />
                  <Typography
                    sx={{
                      p: 1,
                      color: isGridView ? "#7E9BBC" : "#224063",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    List
                  </Typography>
                </Button>
                <Button
                  onClick={toggleView}
                  disabled={isGridView}
                  sx={{
                    backgroundColor: isGridView ? "#E7EEF6" : "transparent",
                  }}
                >
                  <CalendarViewMonth
                    sx={{
                      color: isGridView ? "#224063" : "#7E9BBC",
                      pointerEvents: isGridView ? "none" : "auto",
                      opacity: isGridView ? 1 : 0.5,
                      fontSize: 20,
                    }}
                  />
                  <Typography
                    sx={{
                      p: 1,
                      color: isGridView ? "#224063" : "#7E9BBC",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    Grid
                  </Typography>
                </Button>
              </>
            )}
            {!isGridView && readStructureListView && (
              <IconButton onClick={toggleTableSettingsOpen(true)}>
                <Settings sx={{ color: "#7E9BBC" }} />
              </IconButton>
            )}
          </Stack>
        </Stack>

        {isGridView ? (
          <GridView
            loading={loading}
            selectedPlatforms={selectedPlatforms}
            error={error}
            handlePlatformChange={handlePlatformChange}
          />
        ) : (
          <>
            <Box>
              <Stack sx={{ mt: 5 }}>
                <ListViewTable
                  regions={filteredListViewData}
                  columns={updatedColumns}
                  handlePlatformChange={handlePlatformChange}
                  handleFetchStructureDecks={handleFetchStructureDecks}
                  loading={regionLoading}
                  searchPlatform={searchPlatform}
                  structureDecksLoading={structureDecksLoading}
                />
              </Stack>
            </Box>
            <GenericModal
              open={isTableSettingsOpen}
              handleClose={toggleTableSettingsOpen(false)}
              title="Enable / Disable the columns"
              headerStyleProp={{ mx: "2%" }}
              sx={{ maxWidth: 600 }}
            >
              <Box width="100%" sx={{ px: 2 }}>
                <List sx={{ display: "flex", flexWrap: "wrap" }} dense>
                  {columns.map((field) => (
                    <ListItem key={field.key} sx={{ width: "unset" }}>
                      <ListItemIcon sx={{ minWidth: "auto" }}>
                        <Checkbox
                          edge="start"
                          tabIndex={-1}
                          disableRipple
                          checked={activeColumns.includes(field.key)}
                          onClick={handleActiveColumnsUpdate(field.key)}
                        />
                      </ListItemIcon>
                      <ListItemText primary={field.columnName} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </GenericModal>
          </>
        )}
      </PlatformsContainer>
      <Snackbar open={shouldShow} onClose={closeSnack}>
        {content}
      </Snackbar>
    </MainContainer>
  );
};
