import SortBy from '../../../ui/SortBy';
import { styled } from '@mui/system';
import BookingFilters from '../../../ui/BookingFilters';

const StyledDiv = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

function BookingOperations() {
  return (
    <StyledDiv>
      <BookingFilters></BookingFilters>
      <SortBy
        width="180px"
        options={[
          {
            value: 'createdAt-asc',
            label: 'Sort by date (new first)',
          },
          {
            value: 'createdAt-desc',
            label: 'Sort by date (old first)',
          },
        ]}
      ></SortBy>
    </StyledDiv>
  );
}

export default BookingOperations;
