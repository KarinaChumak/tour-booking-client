import { styled } from '@mui/system';
import { Button, Paper, TextField } from '@mui/material';
import { Box } from '@mui/material';

const StyledH1 = styled('h1')`
  text-align: left;
`;

const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: 1fr 2fr;
  place-items: start;
  row-gap: 15px;
`;

function Form({
  label,
  buttonLabel,
  buttonDisabled,
  onSubmit,
  children,
  onClose,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '10px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '20px',
        width: '100%',
      }}
    >
      <StyledH1>{label}</StyledH1>

      <StyledForm onSubmit={onSubmit}>
        {children}

        <Box
          sx={{ gridColumn: 2, width: '80%', marginTop: '30px' }}
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Button
            type="reset"
            variant="outlined"
            disableElevation
            size="large"
            style={{ width: '150px' }}
            onClick={() => onClose?.()}
            disabled={buttonDisabled}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            size="large"
            style={{ width: '150px' }}
            disabled={buttonDisabled}
          >
            {buttonLabel}
          </Button>
        </Box>
      </StyledForm>
    </Paper>
  );
}

export default Form;
