import { Avatar, IconButton, styled } from '@mui/material';
import { colors } from '../../theme';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../features/auth/useLogout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { useCurrentUser } from '../features/auth/useCurrentUser';
import { useNavigate } from 'react-router-dom';

const StyledHeader = styled('header')`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid ${colors.grey[200]};
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const StyledGroup = styled('div')`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
function AdminHeader() {
  const navigate = useNavigate();
  const { isLoading: loadingUser, user, errors } = useCurrentUser();
  const { logout, isLoading } = useLogout();

  return (
    <StyledHeader>
      <StyledGroup>
        <Avatar src={user?.photo}></Avatar>
        <p>{user?.name}</p>
      </StyledGroup>
      <StyledGroup>
        <IconButton
          aria-label="account"
          onClick={() => navigate('/account')}
          color="primary"
        >
          <PersonOutlineOutlinedIcon sx={{ fontSize: '1.6rem' }} />
        </IconButton>
        <IconButton
          aria-label="logout"
          onClick={logout}
          color="primary"
        >
          <LogoutIcon sx={{ fontSize: '1.4rem' }} />
        </IconButton>
      </StyledGroup>
    </StyledHeader>
  );
}

export default AdminHeader;
