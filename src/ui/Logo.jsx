import { colors } from '../../theme';
import { Avatar, styled } from '@mui/material';

function Logo() {
  return (
    <Avatar sx={{ padding: '3rem', bgcolor: colors.green[600] }}>
      <img width={'100px'} src="logo.svg"></img>
    </Avatar>
  );
}

export default Logo;
