import { Box } from '@mui/material';
import BookingTable from '../../features/admin/bookings/BookingTable';
import { useBookings } from '../../features/admin/bookings/useBookings';
import BookingTableOperations from '../../features/admin/bookings/BookingTableOperations';
import BookingDetails from '../../features/admin/bookings/BookingDetails';

function AdminBookingDetails() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1.2rem'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <h1>Booking</h1>
      </Box>
      <BookingDetails></BookingDetails>
    </Box>
  );
}

export default AdminBookingDetails;
