import {
  Box,
  Chip,
  Grid,
  Typography,
  ButtonBase as RippleEffect,
} from "@mui/material";
import { ApolloError } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { LinearProgress } from "../shared/LinearProgress";
import { PlatformLoadingSkeleton } from "./Platform/PlatformLoadingSkeleton";
import { PlatformCard } from "./Platform";
import { CardInsightTypeEnum, PlatformsType } from "@/types";
import { convertMetresSqToFeetSqDisplay } from "@/utils/unitSystem";
import { unitSystem as unitSystemState } from "@/components/Analysis/state";
import { PlaformCardBoxOverlay } from "./styles";
import { StructureDeploymentLevel, StructureStatus, UnitSystemEnum } from "@/__generated__/hooks";

type PlatformProps = {
  loading: boolean;
  selectedPlatforms: PlatformsType;
  error: ApolloError | undefined;
  handlePlatformChange: (id: string, status: StructureStatus) => void;
};

export const GridView = ({
  loading,
  selectedPlatforms,
  error,
  handlePlatformChange,
}: PlatformProps) => {
  const unitSystem = useRecoilValue(unitSystemState);
  return (
    <Grid
      sx={{ my: 2 }}
      justifyContent="center"
      container
      spacing={3.5}
      data-testid="platforms"
    >
      {loading && <PlatformLoadingSkeleton />}
      {((!loading && selectedPlatforms.length === 0) || error) && (
        <Typography variant="body1" fontSize={26} my={10} fontWeight={600}>
          No platforms found
        </Typography>
      )}
      {!loading &&
        selectedPlatforms.length > 0 &&
        selectedPlatforms.map(
          ({
            name,
            status,
            coverImagePath,
            description,
            id,
            deploymentLevel,
            cardInsights,
          }) => (
            <Grid item lg={3} md={6} sm={6} xs={12} key={id}>
              <RippleEffect
                component="div"
                onClick={() => handlePlatformChange(id, status)}
                sx={{ borderRadius: "10px", display: "block" }}
              >
                <PlatformCard
                  name={name}
                  imageUrl={coverImagePath}
                  subHeading={description}
                >
                  {cardInsights?.map((item) => (
                    <>
                      {(item?.type === CardInsightTypeEnum.CIRCULAR_PROGRESS ||
                        item?.type === CardInsightTypeEnum.LINEAR_PROGRESS) && (
                        <LinearProgress
                          data-testid={`linear-progress-${id}`}
                          color={item?.color ?? "#FF9395"}
                          label={item?.name ?? "N/A"}
                          percentage={Number(item?.value) || 0}
                          type={item?.type}
                        />
                      )}
                      {item?.type === CardInsightTypeEnum.SIMPLE_TEXT && (
                        <PlaformCardBoxOverlay>
                          <Typography variant="body2" fontSize="small">
                            {item?.name}
                          </Typography>
                          <Box display="flex">
                            <Typography variant="body2" fontWeight="bold">
                              {item?.value}
                            </Typography>
                          </Box>
                        </PlaformCardBoxOverlay>
                      )}
                      {item?.type === CardInsightTypeEnum.UNIT_AREA && (
                        <PlaformCardBoxOverlay>
                          <Typography variant="body2" fontSize="small">
                            {item?.name}
                          </Typography>
                          <Box display="flex">
                            <Typography variant="body2" fontWeight="bold">
                              {unitSystem === UnitSystemEnum.Imperial &&
                              item?.value
                                ? `${convertMetresSqToFeetSqDisplay(
                                    Number(item.value)
                                  )} sq ft`
                                : item?.value
                                ? `${item.value} sq m`
                                : "N/A"}
                            </Typography>
                          </Box>
                        </PlaformCardBoxOverlay>
                      )}
                    </>
                  ))}
                  {deploymentLevel && (
                    <Chip
                      label={deploymentLevel?.replace(/_/g, " ") ?? "N/A"}
                      sx={{
                        background: `${
                          deploymentLevel ===
                          StructureDeploymentLevel.ComponentLevel
                            ? "#C1F4E8"
                            : "#E0E5FF"
                        }`,
                        color: `${
                          deploymentLevel ===
                          StructureDeploymentLevel.ComponentLevel
                            ? "#09695B"
                            : "#4030A3"
                        }`,
                        fontWeight: 500,
                        height: "23px",
                        width: "fit-content",
                        mt: "17px",
                        fontSize: "12px",
                      }}
                    />
                  )}
                </PlatformCard>
              </RippleEffect>
            </Grid>
          )
        )}
    </Grid>
  );
};
