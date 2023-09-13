import { useState } from 'react';

import { Button } from '@mui/material';
import Modal from '../../../ui/Modal';
import CreateTourForm from './CreateTourForm';

function AddTour() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div>
      <Button
        variant="contained"
        disableElevation
        size="large"
        onClick={() => setShowForm((show) => !show)}
        style={{ maxWidth: '200px' }}
      >
        Add new tour
      </Button>
      {/* {showForm && <CreateTourForm></CreateTourForm>} */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CreateTourForm onClose={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddTour;
