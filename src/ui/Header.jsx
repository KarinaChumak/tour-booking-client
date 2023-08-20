import { useContext } from 'react';
import { Box, Icon, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import styled from 'styled-components';
import { colors } from '../../theme';

const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.4rem 0.6rem;
  border: 1px solid transparent;

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    border: 1px solid white;
    border-radius: 20px;
  }
`;

// &:link,
// &:visited {
//   color: #fff;
//   font-size: 1.6rem;
//   font-weight: 500;
//   padding: 1.2rem 2.4rem;
//   transition: all 0.3s;
// }
function Header() {
  return (
    <Box display={'flex'} justifyContent={'space-between'} p={4}>
      <StyledLink to="/overview">Home</StyledLink>
      <StyledLink to="/about">About us</StyledLink>
      <StyledLink to="/pricing">Pricing</StyledLink>
      <IconButton color="white">
        <PersonIcon></PersonIcon>
      </IconButton>
    </Box>
  );
}

export default Header;
