import { Paper } from '@mui/material';
import ProgramInput from '../tours/ProgramInput';

function BookingTable() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '10px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '20px',
        width: '100%',
      }}
    ></Paper>
  );
}

export default BookingTable;
