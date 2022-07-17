/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { IconButton, Alert, AlertTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { AppAlert } from '.';

interface Props {
  errorMessage: string;
}

export const ErrorAlert = ({ errorMessage }: Props) => {
  const [error, setError] = useState(errorMessage);

  const handleClose = () => {
    setError('');
  };

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  return (
    <AppAlert
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!error}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      {error ? (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => handleClose()}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      ) : (
        <div />
      )}
    </AppAlert>
  );
};
