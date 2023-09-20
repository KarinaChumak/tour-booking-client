import { styled } from '@mui/system';
import Filter from '../../../ui/Filter';
import SortBy from '../../../ui/SortBy';

const StyledDiv = styled('div')`
  display: flex;
  gap: 0.4rem;
`;

function UserTableOperations() {
  return (
    <StyledDiv>
      <Filter
        filteredField={'role'}
        options={[
          { value: 'all', label: 'All' },
          { value: 'admin', label: 'Admins' },
          { value: 'guide', label: 'Guides' },
          { value: 'user', label: 'Customers' },
        ]}
      ></Filter>
      <SortBy
        options={[
          {
            value: 'createdAt-desc',
            label: 'Sort by date (new first)',
          },
          {
            value: 'createdAt-asc',
            label: 'Sort by date (old first)',
          },
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
        ]}
      ></SortBy>
    </StyledDiv>
  );
}

export default UserTableOperations;
