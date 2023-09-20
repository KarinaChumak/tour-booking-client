import { Box, Button } from '@mui/material';
import Modal from '../../../ui/CustomModal';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import { useMoveBack } from '../../../hooks/useMoveBack';
import { useDeleteBooking } from './useDeleteBooking';

export function BookingDetailsActions({ bookingId }) {
  console.log(bookingId);
  const { isDeleting, mutateDelete } = useDeleteBooking();

  const moveBack = useMoveBack();
  return (
    <Box
      sx={{
        display: 'flex',
        alignSelf: 'end',
        gap: '1rem',
      }}
    >
      <Button
        variant="outlined"
        disableElevation
        size="large"
        style={{ width: '130px' }}
        onClick={moveBack}
      >
        Back
      </Button>

      <Modal>
        <Modal.Open opens="deleteBooking">
          <Button
            variant="contained"
            disableElevation
            size="large"
            style={{ maxWidth: '200px' }}
          >
            Delete booking
          </Button>
        </Modal.Open>
        <Modal.Window name="deleteBooking" type={'small'}>
          <ConfirmDelete
            entity={'booking'}
            onConfirm={() => mutateDelete(bookingId)}
          ></ConfirmDelete>
        </Modal.Window>
      </Modal>
    </Box>
  );
}
