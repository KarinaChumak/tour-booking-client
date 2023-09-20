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

function UserRow({ user }) {
  const { _id: id, name, photo, email, role, active } = user;

  // const { isEditing, mutateEdit } = useEditTour();
  const { isDeleting, mutateDelete } = useDeleteUser();
  // const { isCreating: isDuplicating, mutateCreate } = useCreateTour();

  // function handleDuplicate() {
  //   mutateCreate({
  //     name: `Copy of ${name}`,
  //     startLocation,
  //     description,
  //     duration,
  //     difficulty,
  //     maxGroupSize,
  //     price,
  //     program,
  //     summary,
  //     startDates,
  //     images,
  //     imageCover,
  //     guides,
  //   });
  // }

  // function handleChangePublished(editId, published) {
  //   mutateEdit({ newData: { published }, editId });
  // }

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
      <StyledCell>{user?.role}</StyledCell>
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
