import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled(Box)({
  width: '100%',
  height: 'calc(100vh / var(--zoom))',
  overflowY: 'auto',
});

export const PlatformsContainer = styled(Box)({
  width: '85%',
  color: '#435C7A',
  margin: '20px auto 50px auto',
});

export const PlatformTotalCount = styled(Typography)({
  backgroundColor: '#e5eef6',
  padding: '6px 11px',
  borderRadius: '8px',
});

export const PlatformCardContainer = styled(Box)({
  border: '1px solid #E7EEF6',
  borderRadius: '12px',
  padding: '16px',
  minHeight: 500,
  textAlign: 'center',
});

export const PlatformImg = styled('div')({
  width: '100%',
  minHeight: '250px',
  borderRadius: '10px',
  marginBottom: '14px',
  overflow: 'hidden',
});

export const PlaformCardBoxOverlay = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 0,
});
