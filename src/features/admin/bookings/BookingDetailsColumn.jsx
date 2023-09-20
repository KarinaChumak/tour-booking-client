import { Box } from '@mui/material';
import { BookingUserInfo } from './BookingUserInfo';
import { BookingDetailsActions } from './BookingDetailsActions';
import { BookingDetailsPaymentInfo } from './BookingDetailsPaymentInfo';

export function BookingDetailsColumn({ booking }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        width: '100%',
      }}
    >
      <BookingUserInfo user={booking?.user}></BookingUserInfo>
      <BookingDetailsPaymentInfo
        booking={booking}
      ></BookingDetailsPaymentInfo>
      <BookingDetailsActions
        bookingId={booking._id}
      ></BookingDetailsActions>
    </Box>
  );
}
