import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledDiv = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledButtons = styled('div')`
  display: flex;
  justify-content: end;
  gap: 2rem;
`;

function ConfirmPublish({ onConfirm, onClose }) {
  function handleClick() {
    onConfirm();
    onClose();
  }
  return (
    <StyledDiv>
      <h3>Are you sure you want to publish this tour?</h3>

      <p>
        After this action tour will become available on the website
        and users will be able to book it
      </p>

      <StyledButtons>
        <Button variant="outlined" color="text" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleClick}
          color="primary"
        >
          Publish
        </Button>
      </StyledButtons>
    </StyledDiv>
  );
}

export default ConfirmPublish;
