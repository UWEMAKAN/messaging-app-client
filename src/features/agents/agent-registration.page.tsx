import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, AlertTitle, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Container, AppAlert, RegisterForm } from '../../components';
import { AgentAuthContext } from '../../services';
import { RegistrationData } from '../../services/auth/interfaces';

export const AgentRegistrationPage = () => {
  const { register, isLoading, error, isError, agentId } = useContext(AgentAuthContext);
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
        Agent Registration
      </Typography>
      <RegisterForm path="/agents/login" handleRegister={handleRegister} isLoading={isLoading} />
      {agentId && <Navigate to="/agents/chat" replace />}
    </Container>
  );
};
