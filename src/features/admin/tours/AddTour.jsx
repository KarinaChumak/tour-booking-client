import { useState } from 'react';

import { Button } from '@mui/material';
import Modal from '../../../ui/CustomModal';
import CreateTourForm from './CreateTourForm';

function AddTour() {
  return (
    <Modal>
      <Modal.Open opens="tour-form">
        <Button
          variant="contained"
          disableElevation
          size="large"
          style={{ maxWidth: '200px' }}
        >
          Add new tour
        </Button>
      </Modal.Open>
      <Modal.Window name="tour-form" type={'big'}>
        <CreateTourForm></CreateTourForm>
      </Modal.Window>
    </Modal>
  );
}

export default AddTour;
