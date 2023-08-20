import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function SearchBar() {
  return (
    <Box
      bgcolor={'white.main'}
      p={'0.4rem'}
      display={'flex'}
      gap={'0.2rem'}
      alignItems={'center'}
      borderRadius={'30px'}
      width={'100%'}
    >
      <FormControl fullWidth>
        <InputLabel id="tour-label">Select tour</InputLabel>
        <Select labelId="tour-label" label="Select tour">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty </MenuItem>
        </Select>
      </FormControl>
      <DatePicker
        slotProps={{ textField: { fullWidth: true } }}
        localeText={{ start: 'Check-in', end: 'Check-out' }}
      />
      <FormControl fullWidth>
        <InputLabel id="people-label">Number of people</InputLabel>
        <Select labelId="people-label" label="Number of people">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <Button
        style={{
          maxWidth: '120px',
          maxHeight: '50px',
          minWidth: '120px',
          minHeight: '50px',
        }}
        color="primary"
        variant="contained"
      >
        Find my tour
      </Button>
    </Box>
  );
}

export default SearchBar;
