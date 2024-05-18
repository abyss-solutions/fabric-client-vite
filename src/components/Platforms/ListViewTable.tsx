import React, { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import {
  ListViewTableProps,
  RegionDataProps,
  StructureDataProps,
} from "@/types";
import { unitSystem as unitSystemState } from "@/components/Analysis/state";
import { UnitSystemEnum } from "@/__generated__/hooks";

function StructureRow({
  structure,
  columns,
  handlePlatformChange,
  handleFetchStructureDecks,
  setExpandedRows,
  expandedRows,
  searchPlatform,
  structureDecksLoading,
}: StructureDataProps) {
  const { id, status, decks } = structure;

  const handleDropdownClick = (structureId: string) => {
    setExpandedRows((previousExpandedRows: { [key: string]: boolean }) => {
      return {
        [structureId]: !previousExpandedRows[structureId],
      };
    });
    handleFetchStructureDecks(structureId);
  };

  useEffect(() => {
    if (!searchPlatform) setExpandedRows({});
  }, [searchPlatform, setExpandedRows]);

  return (
    <>
      <TableRow
        sx={{ backgroundColor: expandedRows[id] ? "#F6F8FB" : "transparent" }}
      >
        <TableCell sx={{ width: "1px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleDropdownClick(id)}
          >
            {expandedRows[id] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        {columns.map((column) => {
          return (
            <>
              {column.key === "actions" && (
                <TableCell sx={{ width: "92px" }}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handlePlatformChange(id, status)}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </TableCell>
              )}
              {column.key !== "actions" && (
                <TableCell
                  sx={column.width ? { width: column.width } : {}}
                  key={`structure-row-${column.key}`}
                >
                  {(structure[column.key] || "N/A").toString()}
                </TableCell>
              )}
            </>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: 0 }} colSpan={columns.length + 1}>
          <Collapse in={expandedRows[id]} timeout="auto" unmountOnExit>
            <Table>
              <TableBody>
                {structureDecksLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  decks.map((deck) => (
                    <TableRow key={deck.id}>
                      <TableCell sx={{ py: 0, width: 0 }}>
                        <IconButton
                          disabled
                          aria-label="expand row"
                          size="small"
                        >
                          <KeyboardArrowDownIcon sx={{ color: "white" }} />
                        </IconButton>
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell
                          sx={{
                            ...(column.width && { width: column.width }),
                            paddingLeft:
                              column.key === "actions" ? "75px" : "17px",
                          }}
                          key={column.key}
                        >
                          {column.key === "actions"
                            ? ""
                            : deck[column.key] || "N/A"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function RegionRow({
  region,
  columns,
  handlePlatformChange,
  handleFetchStructureDecks,
  searchPlatform,
  structureDecksLoading,
}: RegionDataProps) {
  const [open, setOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow sx={{ backgroundColor: !open ? "#F6F8FB" : "transparent" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleToggle}
          >
            {!open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={`group-row-${column.key}`}
            sx={{ color: "#224063", fontWeight: 500 }}
          >
            {column.key === "actions"
              ? ""
              : (region[column.key] || "N/A").toString()}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={columns.length + 1}>
          <Collapse in={!open} timeout="auto" unmountOnExit>
            <Table>
              <TableBody>
                {region.structures?.map((structure) => (
                  <StructureRow
                    expandedRows={expandedRows}
                    setExpandedRows={setExpandedRows}
                    searchPlatform={searchPlatform}
                    key={structure.id}
                    structure={structure}
                    columns={columns}
                    handlePlatformChange={handlePlatformChange}
                    handleFetchStructureDecks={handleFetchStructureDecks}
                    structureDecksLoading={structureDecksLoading}
                  />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ListViewTable({
  regions,
  columns,
  handlePlatformChange,
  handleFetchStructureDecks,
  loading,
  searchPlatform,
  structureDecksLoading,
}: ListViewTableProps) {
  const unitSystem = useRecoilValue(unitSystemState);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedRegions = [...regions].sort((a, b) => {
    const aValue = a[sortBy]!;
    const bValue = b[sortBy]!;

    if (aValue === undefined || bValue === undefined) {
      return aValue === bValue ? 0 : aValue === undefined ? -1 : 1;
    }

    if (aValue === bValue) return 0;
    return sortDirection === "asc"
      ? aValue < bValue
        ? -1
        : 1
      : aValue > bValue
      ? -1
      : 1;
  });

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid>
      {!loading && sortedRegions.length === 0 ? (
        <Typography
          variant="body1"
          fontSize={26}
          my={10}
          fontWeight={600}
          sx={{ textAlign: "center" }}
        >
          No platforms found
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ borderBottom: "1px solid lightgray" }}>
                <TableCell sx={{ width: "35px" }} />
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      color: "#50739B",
                      fontWeight: 700,
                      ...(column.width ? { width: column?.width } : {}),
                      cursor: "pointer",
                    }}
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                  >
                    {column.key !== "actions" && column.key !== "name" ? (
                      <>
                        {column.columnName}
                        <Typography variant="caption" component="div">
                          {unitSystem === UnitSystemEnum.Imperial
                            ? "(sq ft)"
                            : "(sq m)"}
                        </Typography>
                      </>
                    ) : (
                      column.columnName
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRegions.map((region, index) => (
                <React.Fragment key={region.id}>
                  <RegionRow
                    region={region}
                    columns={columns}
                    handlePlatformChange={handlePlatformChange}
                    handleFetchStructureDecks={handleFetchStructureDecks}
                    searchPlatform={searchPlatform}
                    structureDecksLoading={structureDecksLoading}
                  />
                  {index !== sortedRegions.length - 1 && (
                    <tr style={{ height: 20 }} />
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
}
