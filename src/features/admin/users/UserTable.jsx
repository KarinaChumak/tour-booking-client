import {
  Box,
  Button,
  Card,
  CardActionArea,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { colors } from '../../../../theme';
import useTours from '../../tours/useTours';
import UserRow from './UserRow';
import Loader from '../../../ui/Loader';
import { useSearchParams } from 'react-router-dom';
import { useUsers } from './useUsers';
import Pagination from '../../../ui/Pagination';

const headerStyle = {
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: colors.grey[700],
};

function UserTable() {
  const { isLoading, error, users, count } = useUsers();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Loader allScreen={false}></Loader>;

  // // 1) Filter (client-side)
  // const filterValue = searchParams.get('role') || 'all';

  // let filteredUsers;
  // if (filterValue === 'all') filteredUsers = users;
  // if (filterValue === 'guides') {
  //   filteredUsers = users.filter(
  //     (user) => user.role === 'guide' || user.role === 'lead-guide'
  //   );
  // }
  // if (filterValue === 'admins')
  //   filteredUsers = users.filter((user) => user.role === 'admin');

  // if (filterValue === 'users')
  //   filteredUsers = users.filter((user) => user.role === 'user');

  // // // 2) Sort (client-side)

  // const sortBy = searchParams.get('sortBy') || 'date-desc';
  // const [field, direction] = sortBy.split('-');
  // const modifier = direction === 'asc' ? 1 : -1;
  // const sortedUsers = filteredUsers.sort((a, b) =>
  //   a[field] > b[field] ? modifier : -modifier
  // );

  return (
    <TableContainer
      component={Card}
      elevation={0}
      sx={{
        border: `1px solid ${colors.grey[200]}`,
        borderRadius: '10px',
      }}
    >
      <Table color="primary">
        <TableHead>
          <TableRow>
            <TableCell sx={headerStyle}>Photo</TableCell>
            <TableCell sx={headerStyle}>Name</TableCell>
            <TableCell sx={headerStyle}>Email</TableCell>
            <TableCell sx={headerStyle}>Role</TableCell>
            <TableCell sx={headerStyle}>Phone number</TableCell>
            <TableCell sx={headerStyle}> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map?.((user) => (
            <UserRow key={user._id} user={user}></UserRow>
          ))}
        </TableBody>
      </Table>

      <Pagination resultsCount={count} />
    </TableContainer>
  );
}

export default UserTable;
