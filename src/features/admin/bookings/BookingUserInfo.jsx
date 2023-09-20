import { Avatar, Box } from '@mui/material';
import { colors } from '../../../../theme';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { styled } from '@mui/system';

export const InfoRow = styled('div')`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export function BookingUserInfo({ user }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        border: `1px solid ${colors.grey[200]}`,
        borderRadius: '10px',
        padding: '2rem',
        color: colors.grey[500],
        alignItems: 'start',
      }}
    >
      <h3>Customer information</h3>
      <InfoRow>
        <Avatar src={user?.photo}></Avatar>
        <p>{user?.name}</p>
      </InfoRow>
      <InfoRow>
        <PhoneIphoneOutlinedIcon></PhoneIphoneOutlinedIcon>
        <p>{user?.phone}</p>
      </InfoRow>
      <InfoRow>
        <EmailOutlinedIcon></EmailOutlinedIcon>
        <p>{user?.email}</p>
      </InfoRow>
    </Box>
  );
}
