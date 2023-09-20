import { Box } from '@mui/material';
import UpdateUserDataForm from '../../features/auth/UpdateUserDataForm';
import UpdatePasswordForm from '../../features/auth/UpdatePasswordForm';

function AdminAccount() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <h1>Update your account</h1>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'1rem'}
        textAlign={'left'}
      >
        <h2>Update user data</h2>
        <UpdateUserDataForm></UpdateUserDataForm>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'1rem'}
        textAlign={'left'}
      >
        <h2>Update password</h2>

        <UpdatePasswordForm></UpdatePasswordForm>
      </Box>
    </Box>
  );
}

export default AdminAccount;
