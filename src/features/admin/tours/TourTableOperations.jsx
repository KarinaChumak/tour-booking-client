import Filter from '../../../ui/Filter';
import SortBy from '../../../ui/SortBy';
import { styled } from '@mui/system';
const StyledDiv = styled('div')`
  display: flex;
  gap: 0.4rem;
`;

function TourOperations() {
  return (
    <StyledDiv>
      <Filter
        filteredField={'published'}
        options={[
          { value: 'all', label: 'All' },
          { value: 'published', label: 'Published' },
          { value: 'unpublished', label: 'Unpublished' },
        ]}
      ></Filter>
      <SortBy
        options={[
          {
            value: 'createdAt-asc',
            label: 'Sort by date (new first)',
          },
          {
            value: 'createdAt-desc',
            label: 'Sort by date (old first)',
          },
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          {
            value: 'numPeopleBooked-asc',
            label: 'Sort by number of people booked (low first)',
          },
          {
            value: 'numPeopleBooked-desc',
            label: 'Sort by number of people booked (high first)',
          },
        ]}
      ></SortBy>
    </StyledDiv>
  );
}

export default TourOperations;
