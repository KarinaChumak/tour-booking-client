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

function ConfirmDelete({ entity, onConfirm, onClose }) {
  return (
    <StyledDiv>
      <h3>{`Delete ${entity}`}</h3>
      <p>{`Are you sure you want to delete this ${entity}?`}</p>
      <StyledButtons>
        <Button variant="outlined" color="text" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={onConfirm}
          color="error"
        >
          Delete
        </Button>
      </StyledButtons>
    </StyledDiv>
  );
}

export default ConfirmDelete;
