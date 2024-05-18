import {
  Box,
  Stack,
  Typography,
  LinearProgress as MuiLinearProgress,
  SxProps,
  CircularProgress,
} from '@mui/material';
import { CardInsightTypeEnum } from '@/types';

type CorrodedAreaType = {
  percentage: number;
  label?: string;
  color?: string;
  sx?: SxProps;
  type?: string;
};

export const LinearProgress = ({
  percentage,
  label,
  color = 'primary',
  sx,
  type = CardInsightTypeEnum.CIRCULAR_PROGRESS,
}: CorrodedAreaType) => {
  return (
    <Box>
      {label && (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" fontSize="small">
            {label}
          </Typography>
          <Box display="flex" alignItems="center">
            {type === CardInsightTypeEnum.CIRCULAR_PROGRESS && (
              <CircularProgress
                size={24}
                sx={{
                  marginRight: '10px',
                  '& .MuiCircularProgress-circle': {
                    color: `${color ?? '#FF9395'}`,
                  },
                }}
                variant="determinate"
                value={Number(percentage) || 0}
              />
            )}
            <Typography variant="body2" fontWeight="bold">
              {percentage}%
            </Typography>
          </Box>
        </Stack>
      )}
      {type === CardInsightTypeEnum.LINEAR_PROGRESS && (
        <MuiLinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: '8px',
            borderRadius: '5px',
            backgroundColor: '#E7EEF6',
            '& .MuiLinearProgress-bar': {
              borderRadius: '5px',
              backgroundColor: color,
            },
            ...sx,
          }}
        />
      )}
    </Box>
  );
};
