import { styled } from '@mui/material';
import { colors } from '../../theme';

const StyledHeader = styled('header')`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid ${colors.grey[200]};
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function AdminHeader() {
  return <StyledHeader>this is admin header</StyledHeader>;
}

export default AdminHeader;
