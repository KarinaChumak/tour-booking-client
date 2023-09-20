import { MenuItem, Select, TextField } from '@mui/material';

function DifficultyInput({ disabled, field }) {
  return (
    <Select
      disabled={disabled}
      id="input-tour-difficulty"
      size="small"
      defaultValue={field.value}
      onChange={field.onChange}
      sx={{
        width: '50%',
        maxHeight: '50px',
        textAlign: 'left',
      }}
    >
      <MenuItem value={'easy'}>easy</MenuItem>
      <MenuItem value={'medium'}>medium</MenuItem>
      <MenuItem value={'difficult'}>difficult</MenuItem>
    </Select>
  );
}

export default DifficultyInput;
