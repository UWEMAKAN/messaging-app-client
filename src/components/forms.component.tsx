import { Button, CircularProgress, Link } from '@mui/material';
import { useState } from 'react';
import { ButtonContainer, Form, TextInput } from './component.styles';

interface LoginProps {
  isLoading: boolean;
  handleLogin: Function;
  path: string;
}

export const LoginForm = ({ isLoading, handleLogin, path }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleButtonClick = async () => {
    await handleLogin(email, password);
  };

  return (
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
      <Link href={path}>Register</Link>
    </Form>
  );
};

interface RegisterProps {
  isLoading: boolean;
  handleRegister: Function;
  path: string;
}

export const RegisterForm = ({ isLoading, handleRegister, path }: RegisterProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleButtonClick = async () => {
    await handleRegister({ firstName, lastName, email, password });
  };

  return (
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
          onClick={handleButtonClick}
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
      <Link href={path}>Login</Link>
    </Form>
  );
};
