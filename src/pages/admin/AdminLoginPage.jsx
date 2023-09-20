import { Box, Typography } from '@mui/material';
import LoginForm from '../../features/auth/LoginForm';
import Logo from '../../ui/Logo';
import { colors } from '../../../theme';

function AdminLoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: colors.grey[100],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <Logo></Logo>
        <Typography
          variant="h3"
          style={{ color: colors.grey[500], fontWeight: 700 }}
        >
          Log in to your account
        </Typography>
        <LoginForm></LoginForm>
      </Box>
    </Box>
  );
}

export default AdminLoginPage;
