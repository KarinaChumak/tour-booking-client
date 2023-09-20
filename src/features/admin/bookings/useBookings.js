import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../../services/bookingService';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1) Filter (server-side)
  const filterValue = searchParams.get('tour') || 'all';
  const filter =
    filterValue === 'all'
      ? null
      : { field: 'tour', value: filterValue };

  // 2) Sort (server-side)

  const sortByRaw = searchParams.get('sortBy') || 'createdAt-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = `${direction === 'asc' ? '' : '-'}${field}`;

  // 3) Paginate (server-side)
  const page = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  //4) Query
  const {
    isLoading,

    data: { data: bookings, resultsTotal } = {},
    error,
  } = useQuery({
    queryKey: [`bookings`, filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
    staleTime: 100 * (60 * 1000), //5 mins
  });

  // 5) Prefetching the next page to ensure more smooth loading
  const pageCount = Math.ceil(resultsTotal / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [`bookings`, filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      staleTime: 100 * (60 * 1000), //5 mins
    });
  // 5) Prefetching the previous page to ensure more smooth loading

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [`bookings`, filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      staleTime: 100 * (60 * 1000), //5 mins
    });

  return { isLoading, error, bookings, count: resultsTotal };
}

export function useUniqueBookingTours() {
  const {
    isLoading,
    data: { data: bookings } = {},
    error,
  } = useQuery({
    queryKey: [`unique-booking-tours`],
    queryFn: () => getBookings({}),
    staleTime: 1000 * (60 * 1000), //5 mins
  });

  const uniqueTours = removeDuplicates(
    bookings?.map((booking) => booking?.tour)
  );
  return { isLoading, error, tours: uniqueTours };
}

function removeDuplicates(arr) {
  let unique = arr?.reduce(function (acc, curr) {
    if (!acc.map((i) => i?.id).includes(curr?.id)) acc.push(curr);
    return acc;
  }, []);
  return unique;
}
