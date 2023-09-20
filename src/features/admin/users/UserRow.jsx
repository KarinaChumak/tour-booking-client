import { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Chip,
  TableCell,
  TableRow,
  styled,
} from '@mui/material';
import { colors } from '../../../../theme';

import Modal from '../../../ui/CustomModal';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import ConfirmPublish from '../../../ui/ConfirmPublish';
import UserControlMenu from './UserControlMenu';

import { useDeleteUser } from './useDeleteUser';
import CreateUserForm from './CreateUserForm';

const StyledCell = (props) => (
  <TableCell sx={{ color: colors.grey[700] }}>
    {props.children}
  </TableCell>
);

const roleColors = {
  user: { color: colors.yellow[100], label: 'User' },
  'lead-guide': { color: colors.green[100], label: 'Lead guide' },
  guide: { color: colors.lightGreen[200], label: 'Guide' },
  admin: { color: colors.green[200], label: 'Admin' },
};
function UserRow({ user }) {
  const { _id: id, name, photo, email, role, active } = user;

  const { isDeleting, mutateDelete } = useDeleteUser();

  return (
    <TableRow
      sx={{
        color: colors.green[400],
      }}
    >
      <StyledCell>
        <Avatar src={user?.photo}></Avatar>
      </StyledCell>
      <StyledCell>{user?.name}</StyledCell>
      <StyledCell>{user?.email}</StyledCell>
      <StyledCell>
        <Chip
          label={roleColors[user?.role]?.label}
          style={{
            backgroundColor: roleColors[user?.role]?.color,
            padding: '1rem 3px',
          }}
        ></Chip>
      </StyledCell>
      <StyledCell>{user?.phone}</StyledCell>
      <StyledCell>
        <Modal>
          <UserControlMenu></UserControlMenu>

          <Modal.Window name="deleteUser" type={'small'}>
            <ConfirmDelete
              entity={'user'}
              onConfirm={() => mutateDelete(id)}
            ></ConfirmDelete>
          </Modal.Window>

          <Modal.Window name="editUser">
            <CreateUserForm userToEdit={user} />
          </Modal.Window>
        </Modal>
      </StyledCell>
    </TableRow>
  );
}

export default UserRow;
