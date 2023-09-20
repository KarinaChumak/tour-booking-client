import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/authService';

export function useCurrentUser() {
  const { isLoading, data, errors } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['user'],
  });

  return { isLoading, user: data, errors };
}
