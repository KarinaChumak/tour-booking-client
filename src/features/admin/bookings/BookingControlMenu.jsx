import { useState } from 'react';

import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { styled } from '@mui/system';

import Modal from '../../../ui/CustomModal';
import ControlMenu from '../../../ui/ControlMenu';
import { useNavigate } from 'react-router-dom';

const StyledMenuItemContent = styled('div')`
  display: flex;
  width: 100%;
  padding: 8px 14px;
`;
function BookingControlMenu({ bookingId }) {
  const navigate = useNavigate();

  return (
    <ControlMenu>
      <MenuItem
        style={{ padding: 0 }}
        onClick={() => navigate(`/bookings/${bookingId}`)}
      >
        <StyledMenuItemContent>
          <ListItemIcon>
            <RemoveRedEyeOutlinedIcon />
          </ListItemIcon>
          <ListItemText>See details</ListItemText>
        </StyledMenuItemContent>
      </MenuItem>
      <MenuItem style={{ padding: 0 }}>
        <Modal.Open opens="deleteBooking">
          <StyledMenuItemContent>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </StyledMenuItemContent>
        </Modal.Open>
      </MenuItem>
    </ControlMenu>
  );
}

export default BookingControlMenu;
