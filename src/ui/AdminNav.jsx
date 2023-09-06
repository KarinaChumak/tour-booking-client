import { Stack, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { colors } from '../../theme';

import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';

const StyledLink = styled(NavLink)`
  &:link,
  &:visited {
    padding: 0.6rem;
    padding-left: 1.6rem;
    display: flex;
    align-items: center;

    border-radius: 10px;
    gap: 0.4rem;
    font-size: 1rem;
    text-decoration: none;
    color: ${colors.grey[700]};
    font-weight: 500;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    background-color: ${colors.grey[200]};
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: ${colors.grey[400]};
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: ${colors.green[600]};
  }
`;

const Menu = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
`;

function AdminNav() {
  return (
    <Menu>
      <StyledLink to="/dashboard">
        <AssessmentOutlinedIcon></AssessmentOutlinedIcon>
        <span>Dashboard</span>
      </StyledLink>

      <StyledLink to="/bookings">
        <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>
        <span>Bookings</span>
      </StyledLink>

      <StyledLink to="/tours">
        <LandscapeOutlinedIcon></LandscapeOutlinedIcon>
        <span>Tours</span>
      </StyledLink>

      <StyledLink to="/users">
        <PeopleOutlineOutlinedIcon></PeopleOutlineOutlinedIcon>
        <span>Users</span>
      </StyledLink>
    </Menu>
  );
}

export default AdminNav;
