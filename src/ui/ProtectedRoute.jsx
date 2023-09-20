import { useEffect } from 'react';
import { useCurrentUser } from '../features/auth/useCurrentUser';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1) Load an authenticated user

  const { isLoading, user, errors } = useCurrentUser();
  // 2) If no user redirect to login page
  useEffect(
    function () {
      if (!user && !isLoading) navigate('/login');
    },
    [user, isLoading, navigate]
  );

  // 3) While loading show spinner
  if (isLoading) return <Loader allScreen={true}></Loader>;

  // 4) If is a user, display
  if (user) return children;
}

export default ProtectedRoute;
