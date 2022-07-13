import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, AlertTitle, Alert, IconButton } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import CloseIcon from '@mui/icons-material/Close';
import { Container, AppAlert, RegisterForm } from '../../components';
import { UserAuthContext } from '../../services';
import { RegistrationData } from '../../services/auth/interfaces';

export const UserRegistrationPage = () => {
  const { register, isLoading, error, isError, userId } = useContext(UserAuthContext);
  const [isRegError, setIsRegError] = useState(isError);

  const handleRegister = async (data: RegistrationData) => {
    await register(data);
  };

  const handleClose = () => {
    setIsRegError(false);
  };

  useEffect(() => {
    setIsRegError(isError);
  }, [isError]);

  return (
    <Container>
      <AppAlert
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isRegError}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        {isError ? (
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsRegError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        ) : (
          <div />
        )}
      </AppAlert>
      <Typography variant="h2" mb={2}>
        Register
      </Typography>
      <RegisterForm isLoading={isLoading} handleRegister={handleRegister} path="/login" />
      {userId && <Navigate to="/chat" replace />}
    </Container>
  );
};
