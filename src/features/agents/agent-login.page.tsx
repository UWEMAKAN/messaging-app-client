import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AuthContainer, LoginForm, ErrorAlert } from '../../components';
import { AgentAuthContext } from '../../services';

export const AgentLoginPage = () => {
  const { login, isLoading, error, agentId } = useContext(AgentAuthContext);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  return (
    <AuthContainer>
      <ErrorAlert errorMessage={error} />
      <Typography variant="h4" mb={2}>
        Agent Login
      </Typography>
      <LoginForm path="/agents/register" handleLogin={handleLogin} isLoading={isLoading} />
      {agentId && <Navigate to="/agents/chat" replace />}
    </AuthContainer>
  );
};
