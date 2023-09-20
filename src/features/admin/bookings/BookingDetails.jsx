import { Box } from '@mui/material';

import { useBooking } from './useBooking';
import { formatDate } from '../../../utils/helpers';
import TourCard from '../../tours/TourCard';
import { BookingDetailsColumn } from './BookingDetailsColumn';
import Loader from '../../../ui/Loader';
import { useDeleteBooking } from './useDeleteBooking';

function BookingDetails() {
  const { isLoading, error, booking } = useBooking();

  if (isLoading) return <Loader allScreen={false}></Loader>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '3rem',
        }}
      >
        <TourCard tour={booking?.tour} showActions={false}></TourCard>
        <BookingDetailsColumn
          booking={booking}
        ></BookingDetailsColumn>
      </Box>
    </Box>
  );
}

export default BookingDetails;
