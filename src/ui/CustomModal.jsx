// This code doesn't work with MUI select elements. Left for the reference

import { styled } from '@mui/system';
import { colors } from '../../theme';
import { Badge, Box, IconButton, Paper } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { createPortal } from 'react-dom';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import Modal from '@mui/material/Modal';

const StyledModal = styled(Box)(({ type = 'small' }) => ({
  position: 'fixed',
  top: `${type === 'small' ? '20%' : '50%'}`,
  left: '50%',
  maxHeight: '90vh',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '2rem 4rem',
  transition: 'all 0.5s',
  borderRadius: '20px',
  width: `${type === 'small' ? '50%' : '80%'}`,
  overflow: 'visible',
}));

const StyledIconButton = styled(IconButton)`
  position: fixed;
  top: 0;
  right: 0;
  transform: translate(75%, -75%);
`;

const StyledModalContent = styled('div')`
  max-height: calc(90vh - 2 * 2rem);
  overflow: scroll;
`;

// Compound component pattern
const ModalContext = createContext();

function CustomModal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // Cloning element (Button) to attach close handler
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name, type = 'big' }) {
  const { openName, close } = useContext(ModalContext);

  // Creating portal to prevent modals property overflow:hidden to be overwritten by parent component, if we ever use this component somewhere else.  It takes element out of the dom and positions it directly to document.body, leaving it in a Component tree on the same place.
  return (
    <Modal
      open={openName === name}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.102)',
            backdropFilter: 'blur(4px)',
          },
        },
      }}
    >
      <StyledModal type={type}>
        <StyledIconButton onClick={close}>
          <CloseRoundedIcon />
        </StyledIconButton>
        <StyledModalContent>
          {cloneElement(children, { onClose: close })}
        </StyledModalContent>
      </StyledModal>
    </Modal>
  );
}

CustomModal.Open = Open;
CustomModal.Window = Window;

export default CustomModal;
