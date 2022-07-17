import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AuthContainer, RegisterForm, ErrorAlert } from '../../components';
import { AgentAuthContext } from '../../services';
import { RegistrationData } from '../../services/auth/interfaces';

export const AgentRegistrationPage = () => {
  const { register, isLoading, error, agentId } = useContext(AgentAuthContext);

  const handleRegister = async (data: RegistrationData) => {
    await register(data);
  };

  return (
    <AuthContainer>
      <ErrorAlert errorMessage={error} />
      <Typography variant="h4" mb={2}>
        Agent Registration
      </Typography>
      <RegisterForm path="/agents/login" handleRegister={handleRegister} isLoading={isLoading} />
      {agentId && <Navigate to="/agents/chat" replace />}
    </AuthContainer>
  );
};
