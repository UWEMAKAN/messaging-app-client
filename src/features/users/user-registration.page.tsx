import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AuthContainer, RegisterForm, ErrorAlert } from '../../components';
import { UserAuthContext } from '../../services';
import { RegistrationData } from '../../services/auth/interfaces';

export const UserRegistrationPage = () => {
  const { register, isLoading, error, userId } = useContext(UserAuthContext);

  const handleRegister = async (data: RegistrationData) => {
    await register(data);
  };

  return (
    <AuthContainer>
      <ErrorAlert errorMessage={error} />
      <Typography variant="h4" mb={2}>
        Register
      </Typography>
      <RegisterForm isLoading={isLoading} handleRegister={handleRegister} path="/login" />
      {userId && <Navigate to="/chat" replace />}
    </AuthContainer>
  );
};
