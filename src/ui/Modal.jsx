import { styled } from '@mui/system';
import { colors } from '../../theme';
import { Badge, Box, IconButton, Paper } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const StyledModal = styled('div')`
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 90vh;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 2rem 4rem;
  transition: all 0.5s;
  border-radius: 20px;
  width: 80%;
  overflow: visible;
`;
const Overlay = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.102);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;
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

function Modal({ onClose, children }) {
  return (
    <Overlay>
      <StyledModal>
        <StyledIconButton onClick={onClose}>
          <CloseRoundedIcon />
        </StyledIconButton>

        <StyledModalContent>{children}</StyledModalContent>
      </StyledModal>
    </Overlay>
  );
}

export default Modal;
