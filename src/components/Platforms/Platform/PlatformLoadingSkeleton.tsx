import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { PlatformCardContainer } from "../styles";

export const PlatformLoadingSkeleton = () => {
  return (
    <>
      {[...Array.from({ length: 8 }).keys()].map((index) => (
        <Grid item lg={3} md={6} sm={6} xs={12} key={index}>
          <PlatformCardContainer>
            <Stack spacing={2}>
              <Skeleton
                variant="rounded"
                sx={{ borderRadius: "10px", height: "260px" }}
              />
              <Skeleton variant="text" width="40%" sx={{ height: "30px" }} />
              <Box>
                <Skeleton />
                <Skeleton width="70%" />
              </Box>
              <Box>
                <Skeleton
                  width="30%"
                  sx={{ borderRadius: "16px", height: "35px" }}
                />
                <Skeleton width="50%" />
              </Box>
            </Stack>
          </PlatformCardContainer>
        </Grid>
      ))}
    </>
  );
};
