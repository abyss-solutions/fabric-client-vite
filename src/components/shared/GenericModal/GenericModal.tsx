import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import { GenericModalProps } from '@/types';
import { rootStyles, paperStyles, headerStyles, closeIconStyles } from './styles';

export const GenericModal = ({
  open,
  handleClose,
  children,
  title,
  description,
  sx,
  crossIconStyle,
  headerStyleProp,
  backgroundPaperStyle = {},
}: GenericModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        ...rootStyles,
        ...sx,
      }}
    >
      <Paper sx={{ ...paperStyles, ...backgroundPaperStyle }}>
        <Box sx={{ ...headerStyles, ...headerStyleProp }}>
          <Box>
            <Typography variant="h5">{title}</Typography>
            {description && (
              <Typography variant="body1" fontSize={14} mt={1} sx={{ color: 'info.main' }}>
                {description}
              </Typography>
            )}
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ ...closeIconStyles, ...crossIconStyle }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: '100%',
          }}
        >
          {children}
        </Box>
      </Paper>
    </Modal>
  );
};
