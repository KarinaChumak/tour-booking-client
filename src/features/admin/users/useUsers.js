import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllUsers,
  getUserByRole,
} from '../../../services/userService';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../../utils/constants';

export function useUserRole(role) {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: [`role-${role}`],
    queryFn: () => getUserByRole(role),
    staleTime: 100 * (60 * 1000), //5 mins
  });

  return { isLoading, error, users };
}

export function useUsers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // 1) Filter (server-side)
  const filterValue = searchParams.get('role') || 'all';

  const filter =
    filterValue === 'all'
      ? null
      : filterValue === 'guide'
      ? {
          field: 'isGuide',
          value: true,
        }
      : { field: 'role', value: filterValue };

  // 2) Sort (server-side)

  const sortByRaw = searchParams.get('sortBy') || 'createdAt-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = `${direction === 'asc' ? '' : '-'}${field}`;
  // 3) Paginate (server-side)
  const page = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  // 4) Query
  const {
    isLoading,
    data: { data: users, resultsTotal } = {},
    error,
  } = useQuery({
    queryKey: [`users`, filter, sortBy, page],
    queryFn: () => getAllUsers({ filter, sortBy, page }),
    staleTime: 5 * (60 * 1000),
  });

  // 5) Prefetching the next page to ensure more smooth loading
  const pageCount = Math.ceil(resultsTotal / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [`users`, filter, sortBy, page + 1],
      queryFn: () => getAllUsers({ filter, sortBy, page: page + 1 }),
      staleTime: 5 * (60 * 1000),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [`users`, filter, sortBy, page - 1],
      queryFn: () => getAllUsers({ filter, sortBy, page: page - 1 }),
      staleTime: 5 * (60 * 1000),
    });

  return {
    isLoading,
    error,
    users,
    count: resultsTotal,
  };
}
