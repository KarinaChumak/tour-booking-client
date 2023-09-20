import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';

function PasswordInput({
  registerObj,
  value,
  onChange,
  style = { width: '50%' },
  size = 'small',
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  let newProps = {};
  if (registerObj) newProps = registerObj;
  if (value || onChange) newProps = { value, onChange };

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <OutlinedInput
      {...newProps}
      style={style}
      disabled={disabled}
      size={size}
      id="outlined-adornment-password"
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    ></OutlinedInput>
  );
}

export default PasswordInput;
