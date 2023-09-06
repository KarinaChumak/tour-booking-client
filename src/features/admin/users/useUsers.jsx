import { useQuery } from '@tanstack/react-query';
import { getUserByRole } from '../../../services/userService';

export function useUserRole(role) {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: [`${role}s`],
    queryFn: () => getUserByRole(role),
    staleTime: 20 * (60 * 1000), //5 mins
  });

  return { isLoading, error, users };
}
