import { useState } from 'react';

import { Button } from '@mui/material';
import Modal from '../../../ui/CustomModal';
import CreateUserForm from './CreateUserForm';

function AddUser() {
  return (
    <Modal>
      <Modal.Open opens="user-form">
        <Button
          variant="contained"
          disableElevation
          size="large"
          style={{ maxWidth: '200px' }}
        >
          Add new user
        </Button>
      </Modal.Open>
      <Modal.Window name="user-form" type={'big'}>
        <CreateUserForm></CreateUserForm>
      </Modal.Window>
    </Modal>
  );
}

export default AddUser;
