import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AuthContainer, LoginForm, ErrorAlert } from '../../components';
import { UserAuthContext } from '../../services';

export const UserLoginPage = () => {
  const { login, isLoading, error, userId } = useContext(UserAuthContext);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  return (
    <AuthContainer>
      <ErrorAlert errorMessage={error} />
      <Typography variant="h4" mb={2}>
        Login
      </Typography>
      <LoginForm path="/register" isLoading={isLoading} handleLogin={handleLogin} />
      {userId && <Navigate to="/chat" replace />}
    </AuthContainer>
  );
};
