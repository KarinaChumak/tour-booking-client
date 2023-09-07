import { Box, Button, Input } from '@mui/material';
import TourTable from '../../features/admin/tours/TourTable';
import { useState } from 'react';
import CreateTourForm from '../../features/admin/tours/CreateTourForm';

function AdminTours() {
  const [showForm, setShowForm] = useState(true);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1.2rem'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <h1>All tours</h1>
        <h3>Filters for tours</h3>
      </Box>

      <TourTable></TourTable>
      <Button
        variant="contained"
        disableElevation
        size="large"
        onClick={() => setShowForm((show) => !show)}
        style={{ maxWidth: '200px' }}
      >
        Add new tour
      </Button>

      {showForm && <CreateTourForm></CreateTourForm>}
    </Box>
  );
}

export default AdminTours;
