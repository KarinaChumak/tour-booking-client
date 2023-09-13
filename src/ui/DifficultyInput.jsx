import { MenuItem, TextField } from '@mui/material';

function DifficultyInput({ disabled, registerObj }) {
  return (
    <TextField
      select
      disabled={disabled}
      id="input-tour-difficulty"
      {...registerObj}
      size="small"
      defaultValue={'easy'}
      sx={{
        width: '50%',
        maxHeight: '50px',
        textAlign: 'left',
      }}
    >
      <MenuItem value={'easy'}>easy</MenuItem>
      <MenuItem value={'medium'}>medium</MenuItem>
      <MenuItem value={'difficult'}>difficult</MenuItem>
    </TextField>
  );
}

export default DifficultyInput;
