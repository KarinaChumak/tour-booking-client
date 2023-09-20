import { Box } from '@mui/material';
import BookingTable from '../../features/admin/bookings/BookingTable';
import { useBookings } from '../../features/admin/bookings/useBookings';
import BookingTableOperations from '../../features/admin/bookings/BookingTableOperations';

function AdminBookings() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1.2rem'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <h1>All bookings</h1>
        <BookingTableOperations></BookingTableOperations>
      </Box>
      <BookingTable></BookingTable>
      {/* <AddUser></AddUser> */}
    </Box>
  );
}

export default AdminBookings;
