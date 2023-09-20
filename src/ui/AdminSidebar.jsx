import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { colors } from '../../theme';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import Logo from './Logo';

function AdminSidebar() {
  return (
    <Box
      sx={{
        height: '100vh',
        gridRow: ' 1 / -1',
        borderRight: `1px solid ${colors.grey[200]}`,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={'2rem'}
      paddingTop={'2rem'}
    >
      <Logo></Logo>
      <AdminNav></AdminNav>
    </Box>
  );
}

export default AdminSidebar;
