import { Button, ButtonGroup, capitalize } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../../theme';
import { useSearchParams } from 'react-router-dom';

const StyledButton = styled(Button)(({ active }) => ({
  textTransform: 'capitalize',
  fontSize: '0.8rem',
  backgroundColor: `${active ? colors.green[800] : 'inherit'}`,
  transition: 'all 0.3s',
  color: `${active ? colors.white[100] : 'inherit'}`,
  '&:disabled': {
    color: '#fff',
  },
}));

function Filter({ filteredField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get(filteredField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filteredField, value);
    if (searchParams.get('page')) searchParams.set('page', 1);

    setSearchParams(searchParams);
  }
  return (
    <ButtonGroup
      variant="text"
      aria-label="outlined button group"
      style={{
        border: `1px solid ${colors.grey[200]}`,
        padding: '5px',
        backgroundColor: '#fff',
      }}
    >
      {options.map((option, i) => (
        <StyledButton
          key={i}
          active={currentFilter === option?.value || false}
          disabled={currentFilter === option?.value || false}
          onClick={() => handleClick(option?.value)}
          style={{
            padding: '5px 15px',
          }}
        >
          {option.label}
        </StyledButton>
      ))}
    </ButtonGroup>
  );
}

export default Filter;
