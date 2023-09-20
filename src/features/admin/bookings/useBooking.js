import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getBooking } from '../../../services/bookingService';

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: { data: booking } = {},
    error,
  } = useQuery({
    queryKey: [`booking`, bookingId],
    queryFn: () => getBooking({ bookingId }),
    staleTime: 5 * (60 * 1000), //5 mins
  });

  return { isLoading, error, booking };
}
