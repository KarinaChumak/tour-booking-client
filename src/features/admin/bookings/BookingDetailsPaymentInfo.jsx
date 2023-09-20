import { Box, Typography } from '@mui/material';
import { formatCurrency } from '../../../utils/helpers';
import { colors } from '../../../../theme';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

export function BookingDetailsPaymentInfo({ booking }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        backgroundColor: colors.lightGreen[100],
        borderRadius: '10px',
        width: '100%',
        padding: '2rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: colors.green[700],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <MonetizationOnOutlinedIcon color="primary"></MonetizationOnOutlinedIcon>
        <Typography
          style={{
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          Price
        </Typography>
        <p>{formatCurrency(booking?.price)}</p>
      </Box>

      <Typography
        style={{
          fontWeight: 700,
          fontSize: '1rem',
        }}
      >
        {booking?.paid ? 'PAID' : 'UNPAID'}
      </Typography>
    </Box>
  );
}
