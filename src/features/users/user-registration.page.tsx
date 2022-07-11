import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Button,
  Typography,
  CircularProgress,
  AlertTitle,
  Alert,
  IconButton,
  Link,
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import CloseIcon from '@mui/icons-material/Close';
import { ButtonContainer, Container, Form, TextInput, AppAlert } from '../../components';
import { UserAuthContext } from '../../services';

export const UserRegistrationPage = () => {
  const { register, isLoading, error, isError, userId } = useContext(UserAuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegError, setIsRegError] = useState(isError);

  const handleRegister = async () => {
    await register({ firstName, lastName, email, password });
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
      <Form>
        <TextInput
          variant="filled"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          type="text"
          label="First name"
        />
        <TextInput
          variant="filled"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          type="text"
          label="Last name"
        />
        <TextInput
          variant="filled"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          label="Email"
        />
        <TextInput
          variant="filled"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          label="Password"
        />
        <ButtonContainer>
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={handleRegister}
            style={{ width: '100%' }}
          >
            Register
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </ButtonContainer>
        <Link href="/login">Login</Link>
      </Form>
      {userId && <Navigate to="/chat" replace />}
    </Container>
  );
};
