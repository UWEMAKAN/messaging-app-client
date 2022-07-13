import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AlertTitle, Typography, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Container, AppAlert, LoginForm } from '../../components';
import { UserAuthContext } from '../../services';

export const UserLoginPage = () => {
  const { login, isLoading, error, isError, userId } = useContext(UserAuthContext);
  const [loginError, setLoginError] = useState(isError);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  const handleClose = () => {
    setLoginError(false);
  };

  useEffect(() => {
    setLoginError(isError);
  }, [isError]);

  return (
    <Container>
      <AppAlert
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={loginError}
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
                  setLoginError(false);
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
        Login
      </Typography>
      <LoginForm path="/register" isLoading={isLoading} handleLogin={handleLogin} />
      {userId && <Navigate to="/chat" replace />}
    </Container>
  );
};
