import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ProgramInput from '../tours/ProgramInput';
import { useBookings } from './useBookings';
import { colors } from '../../../../theme';
import BookingRow from './BookingRow';
import Loader from '../../../ui/Loader';
import Pagination from '../../../ui/Pagination';
import { useSearchParams } from 'react-router-dom';

const headerStyle = {
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: colors.grey[700],
};

function BookingTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get('user');

  const { isLoading, error, bookings, count } = useBookings();

  let filteredBookings = bookings;
  if (user)
    filteredBookings = bookings?.filter(
      (booking) =>
        booking?.user?.name
          ?.toLowerCase()
          ?.includes(user?.toLowerCase()) ||
        booking?.user?.email
          ?.toLowerCase()
          ?.includes(user?.toLowerCase())
    );

  if (isLoading) return <Loader allScreen={false}></Loader>;

  return (
    <TableContainer
      component={Card}
      elevation={0}
      sx={{
        border: `1px solid ${colors.grey[200]}`,
        borderRadius: '10px',
      }}
    >
      <Table color="primary">
        <TableHead>
          <TableRow>
            <TableCell sx={headerStyle}>Tour</TableCell>
            <TableCell sx={headerStyle}>User</TableCell>
            <TableCell sx={headerStyle}>Status</TableCell>
            <TableCell sx={headerStyle}>Price</TableCell>
            <TableCell sx={headerStyle}> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBookings?.map?.((booking) => (
            <BookingRow
              key={booking._id}
              booking={booking}
            ></BookingRow>
          ))}
        </TableBody>
      </Table>

      <Pagination resultsCount={count} />
    </TableContainer>
  );
}

export default BookingTable;
