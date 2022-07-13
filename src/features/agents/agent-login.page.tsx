import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AlertTitle, Typography, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Container, AppAlert, LoginForm } from '../../components';
import { AgentAuthContext } from '../../services';

export const AgentLoginPage = () => {
  const { login, isLoading, error, isError, agentId } = useContext(AgentAuthContext);
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
        Agent Login
      </Typography>
      <LoginForm path="/agents/register" handleLogin={handleLogin} isLoading={isLoading} />
      {agentId && <Navigate to="/agents/chat" replace />}
    </Container>
  );
};
