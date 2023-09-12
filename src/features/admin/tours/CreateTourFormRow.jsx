import { styled } from '@mui/system';
import { colors } from '../../../../theme';
import {
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';

const StyledInputLabel = styled(InputLabel)`
  padding-left: 10px;
  font-size: 1rem;
  color: ${colors.grey[800]};
`;

const StyledInputDiv = styled('div')`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
`;

const StyledError = styled('p')`
  background-color: ${colors.red[100]};
  color: ${colors.red[600]};
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
`;
function CreateTourFormRow({
  name,
  label,
  required,
  errors,
  children,
}) {
  return (
    <>
      <StyledInputLabel htmlFor={`input-tour-${name}`}>
        {label}
        {required && <sup>*</sup>}
      </StyledInputLabel>
      <StyledInputDiv>
        {children}
        {errors[name]?.message && (
          <StyledError>{errors[name]?.message}</StyledError>
        )}
      </StyledInputDiv>
      <Divider
        light
        sx={{
          gridColumn: '1 / 3',
          width: '100%',
        }}
      />
    </>
  );
}

export default CreateTourFormRow;
