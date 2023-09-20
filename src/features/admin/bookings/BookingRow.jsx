import {
  Box,
  Chip,
  TableCell,
  TableRow,
  Typography,
  colors,
} from '@mui/material';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import BookingControlMenu from './BookingControlMenu';
import Modal from '../../../ui/CustomModal';
import { useDeleteBooking } from './useDeleteBooking';

const StyledCell = (props) => (
  <TableCell sx={{ color: colors.grey[700] }}>
    {props.children}
  </TableCell>
);

function TwolinerInfo({ header, paragraph }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography style={{ fontWeight: 700 }}>{header}</Typography>
      <Typography>{paragraph}</Typography>
    </Box>
  );
}

function BookingRow({ booking }) {
  const { isDeleting, mutateDelete } = useDeleteBooking();

  return (
    <TableRow
      sx={{
        color: colors.green[400],
      }}
    >
      <StyledCell>
        <TwolinerInfo
          header={booking?.tour?.name}
          paragraph={formatDate(booking?.tour?.startDates?.at(0))}
        ></TwolinerInfo>
      </StyledCell>

      <StyledCell>
        <TwolinerInfo
          header={booking?.user?.name}
          paragraph={booking?.user?.email}
        ></TwolinerInfo>
      </StyledCell>
      <StyledCell>
        <Chip
          sx={{ padding: '15px', fontSize: '0.8rem' }}
          label={booking?.paid ? 'Paid' : 'Unpaid'}
          color={booking?.paid ? 'primary' : 'secondary'}
        ></Chip>
      </StyledCell>

      <StyledCell>{formatCurrency(booking?.price)}</StyledCell>
      <StyledCell>
        <Modal>
          <BookingControlMenu
            bookingId={booking._id}
          ></BookingControlMenu>
          <Modal.Window name="deleteBooking" type={'small'}>
            <ConfirmDelete
              entity={'booking'}
              // onConfirm={() => mutateDelete(id)}
              onConfirm={() => {
                mutateDelete(booking?._id);
              }}
            ></ConfirmDelete>
          </Modal.Window>
        </Modal>
      </StyledCell>
    </TableRow>
  );
}

export default BookingRow;
