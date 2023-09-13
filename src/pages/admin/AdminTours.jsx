import { Box, Button, Input } from '@mui/material';
import TourTable from '../../features/admin/tours/TourTable';
import { useState } from 'react';
import CreateTourForm from '../../features/admin/tours/CreateTourForm';
import AddTour from '../../features/admin/tours/AddTour';

function AdminTours() {
  const [showForm, setShowForm] = useState(true);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1.2rem'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <h1>All tours</h1>
        <h3>Filters for tours</h3>
      </Box>

      <TourTable></TourTable>
      <AddTour></AddTour>
    </Box>
  );
}

export default AdminTours;
