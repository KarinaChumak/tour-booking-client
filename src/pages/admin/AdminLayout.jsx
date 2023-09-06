import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import AdminSidebar from '../../ui/AdminSidebar';
import { styled } from '@mui/material';
import { colors } from '../../../theme';
import AdminHeader from '../../ui/AdminHeader';

const StyledAppLayout = styled('div')`
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled('main')`
  background-color: ${colors.grey[100]};
  padding: 3rem 3.8rem 5.4rem;
  overflow: scroll;
`;

const Container = styled('div')`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AdminLayout() {
  return (
    <StyledAppLayout>
      <AdminHeader></AdminHeader>
      <AdminSidebar></AdminSidebar>
      <Main>
        <Container>
          <Outlet></Outlet>
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AdminLayout;
