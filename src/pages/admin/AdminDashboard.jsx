import { Box } from '@mui/material';
import BookingTable from '../../features/admin/bookings/BookingTable';
import { useBookings } from '../../features/admin/bookings/useBookings';
import BookingTableOperations from '../../features/admin/bookings/BookingTableOperations';

import DashboardFilter from '../../features/admin/dashboard/DashboardFilter';
import Dashboard from '../../features/admin/dashboard/Dashboard';

function AdminDashboard() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1.2rem'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <h1>Dashboard</h1>
        <DashboardFilter></DashboardFilter>
      </Box>
      <Dashboard></Dashboard>
    </Box>
  );
}

export default AdminDashboard;
