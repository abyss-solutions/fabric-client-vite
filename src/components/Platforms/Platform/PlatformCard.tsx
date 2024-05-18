import React from "react";
import { Typography, Stack, Tooltip } from "@mui/material";
import { PlatformCardContainer, PlatformImg } from "../styles";
import { FALLBACK_INSPECTION_IMAGE } from "@/constants";
import { getCloudfrontUrl } from "@/utils/cloudfront";

type PlatformCardType = {
  name: string;
  imageUrl: string;
  subHeading: string;
  children?: React.ReactNode;
};

export const PlatformCard = ({
  name,
  imageUrl,
  subHeading,
  children,
}: PlatformCardType) => {
  return (
    <PlatformCardContainer>
      <PlatformImg>
        <img
          style={{ width: "100%" }}
          src={
            (imageUrl && getCloudfrontUrl(imageUrl)) ||
            FALLBACK_INSPECTION_IMAGE
          }
          alt={name}
          onError={(event) => {
            const reference = event.currentTarget;
            reference.src = FALLBACK_INSPECTION_IMAGE;
          }}
          crossOrigin="use-credentials"
        />
      </PlatformImg>
      <Stack>
        <Stack>
          <Tooltip title={<Typography fontSize={14}>{name}</Typography>}>
            <Typography
              fontSize={20}
              color="text.primary"
              fontWeight={500}
              lineHeight={1.3}
              marginBottom={2.5}
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textAlign: "left",
              }}
            >
              {name}
            </Typography>
          </Tooltip>
          {children || <></>}
        </Stack>
        <Typography
          variant="body2"
          fontSize={12}
          color="text.secondary"
          mt={1.2}
          textAlign="left"
        >
          {subHeading}
        </Typography>
      </Stack>
    </PlatformCardContainer>
  );
};
