import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  AlertTitle,
  Button,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Form, TextInput, ButtonContainer, AppAlert } from '../../components';
import { UserAuthContext } from '../../services';

export const UserLoginPage = () => {
  const { login, isLoading, error, isError, userId } = useContext(UserAuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(isError);

  const handleButtonClick = async () => {
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
      <Form>
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
            onClick={handleButtonClick}
            style={{ width: '100%' }}
          >
            Login
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
        <Link href="/register">Register</Link>
        {userId && <Navigate to="/chat" replace />}
      </Form>
    </Container>
  );
};
