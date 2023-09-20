import { useState } from 'react';

import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { styled } from '@mui/system';

import Modal from '../../../ui/CustomModal';
import ControlMenu from '../../../ui/ControlMenu';

const StyledMenuItemContent = styled('div')`
  display: flex;
  width: 100%;
  padding: 8px 14px;
`;
function UserControlMenu({ published, onDuplicate, onUnpublish }) {
  return (
    <ControlMenu>
      <MenuItem style={{ padding: 0 }}>
        <Modal.Open opens="editUser">
          <StyledMenuItemContent>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </StyledMenuItemContent>
        </Modal.Open>
      </MenuItem>
      <MenuItem style={{ padding: 0 }}>
        <Modal.Open opens="deleteUser">
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

export default UserControlMenu;
