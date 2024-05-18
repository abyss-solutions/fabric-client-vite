import MuiSnackbar from '@mui/material/Snackbar';
import { ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode | undefined;
};

export const Snackbar = ({ open, onClose, children }: Props) => {
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ top: '84px !important' }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <div>{children}</div>
    </MuiSnackbar>
  );
};
