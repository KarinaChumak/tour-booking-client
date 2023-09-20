import {
  Button,
  ButtonGroup,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../../theme';
import { useSearchParams } from 'react-router-dom';

function SortBy({ options, width = '300px' }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(value) {
    searchParams.set('sortBy', value);
    if (searchParams.get('page')) searchParams.set('page', 1);

    setSearchParams(searchParams);
  }
  return (
    <Select
      size="small"
      defaultValue={options[0].value}
      sx={{
        // maxHeight: '50px',
        textAlign: 'left',
        fontSize: '0.8rem',
        width,
        backgroundColor: '#fff',
      }}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options?.map?.((option, i) => (
        <MenuItem
          key={i}
          value={option.value}
          sx={{ fontSize: '0.7rem' }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SortBy;
