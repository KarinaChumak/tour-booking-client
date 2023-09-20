import { styled } from '@mui/system';
import { colors } from '../../../../theme';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import LuggageIcon from '@mui/icons-material/Luggage';

function Stat({ icon, title, value, color }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={'1rem'}
      sx={{
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '10px',
        border: `1px solid ${colors.grey[200]}`,
        flex: 1,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: colors[color][100],
          color: colors[color][700],
        }}
      >
        {icon}
      </Avatar>
      <Box display="flex" flexDirection="column" alignItems={'start'}>
        <Typography
          style={{
            color: colors.grey[500],
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '0.8rem',
          }}
        >
          {title}
        </Typography>
        <Typography
          style={{
            fontWeight: 600,
            fontSize: '1.4rem',
            lineHeight: '1',
          }}
        >
          {value || 0}
        </Typography>
      </Box>
    </Box>
  );
}

export default Stat;
