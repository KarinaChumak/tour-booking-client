import {
  Box,
  Button,
  ButtonGroup,
  FilledInput,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../../theme';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import { useUniqueBookingTours } from '../features/admin/bookings/useBookings';

function BookingFilters({ width = '200px' }) {
  const { isLoading, error, tours } = useUniqueBookingTours();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(key, value) {
    searchParams.set(key, value);
    if (searchParams.get('page')) searchParams.set('page', 1);

    setSearchParams(searchParams);
  }

  return (
    <>
      <TextField
        variant="outlined"
        id="input-tour-name"
        size="small"
        sx={{ width: '70%' }}
        InputProps={{ sx: { backgroundColor: '#fff' } }}
        placeholder="Start typing user name/email"
        onChange={(e) => handleChange('user', e.target.value)}
      ></TextField>

      <Select
        size="small"
        defaultValue={'all'}
        sx={{
          maxHeight: '50px',
          textAlign: 'left',
          fontSize: '0.8rem',
          width,
          backgroundColor: '#fff',
        }}
        onChange={(e) => handleChange('tour', e.target.value)}
      >
        <MenuItem value={'all'} sx={{ fontSize: '0.7rem' }}>
          All tours
        </MenuItem>
        {tours?.map?.((option, i) => (
          <MenuItem
            key={i}
            value={option?.id}
            sx={{ fontSize: '0.7rem' }}
          >
            {`${option?.name}– ${formatDate(
              option?.startDates?.[0]
            )}`}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default BookingFilters;
