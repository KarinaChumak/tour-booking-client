import {
  Button,
  CircularProgress,
  InputLabel,
  Paper,
  TextField,
} from '@mui/material';
import { colors } from '../../../theme';
import { styled } from '@mui/system';
import { useState } from 'react';
import PasswordInput from '../../ui/PasswordInput';
import useLogin from './useLogin';

const InputGroup = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 5px;
`;

function LoginForm() {
  const [email, setEmail] = useState('testuser@example.com');
  const [password, setPassword] = useState('12345678');
  const { login, isLoading } = useLogin();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <Paper
      sx={{
        padding: '2rem',
        width: '30rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        height: '20rem',
        border: `1px solid ${colors.grey[200]}`,
        backgroundColor: '#fff',
      }}
      elevation={0}
    >
      <InputGroup>
        <InputLabel
          style={{
            fontWeight: 600,
            marginLeft: '15px',
            color: colors.grey[600],
          }}
        >
          Email
        </InputLabel>
        <TextField
          size="medium"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
      </InputGroup>
      <InputGroup>
        <InputLabel
          style={{
            fontWeight: 600,
            marginLeft: '15px',
            color: colors.grey[600],
          }}
        >
          Password
        </InputLabel>
        {/* <TextField size="medium"></TextField> */}
        <PasswordInput
          disabled={isLoading}
          value={password}
          onChange={(e) => {
            setPassword(e?.target?.value || '');
          }}
          style={{ width: '100%' }}
          size="normal"
        ></PasswordInput>
      </InputGroup>
      <Button
        disabled={isLoading}
        variant="contained"
        disableElevation
        size="large"
        style={{ fontSize: '1rem', fontWeight: 700 }}
        onClick={(e) => handleLogin(e)}
      >
        {isLoading ? (
          <CircularProgress size={'1.8rem'}></CircularProgress>
        ) : (
          'Log in'
        )}
      </Button>
    </Paper>
  );
}

export default LoginForm;
