import { Box } from '@mui/material';
import UserTable from '../../features/admin/users/UserTable';
import UserTableOperations from '../../features/admin/users/UserTableOperations';
import AddUser from '../../features/admin/users/AddUser';

function AdminUsers() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1.2rem'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <h1>All users</h1>

        <UserTableOperations />
      </Box>
      <UserTable></UserTable>
      <AddUser></AddUser>
    </Box>
  );
}

export default AdminUsers;
